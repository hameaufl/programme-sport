"use strict";
const fs=require("node:fs"),path=require("node:path");
const ROOT=path.resolve(__dirname,"..");
const TABLE=[0,0xCC01,0xD801,0x1400,0xF001,0x3C00,0x2800,0xE401,0xA001,0x6C00,0x7800,0xB401,0x5000,0x9C01,0x8801,0x4400];
function crcFit(bytes){let crc=0;for(const b of bytes){let tmp=TABLE[crc&15];crc=((crc>>4)&0x0fff)^tmp^TABLE[b&15];tmp=TABLE[crc&15];crc=((crc>>4)&0x0fff)^tmp^TABLE[(b>>4)&15];}return crc;}
const TYPES={enum:0,uint16:0x84,uint32:0x86,uint32z:0x8c,string:7},SIZE={enum:1,uint16:2,uint32:4,uint32z:4};
function value(type,v,n){if(type==="string"){const b=Buffer.alloc(n),source=Buffer.from(v,"utf8");if(source.length>=n)throw Error("Nom FIT trop long");source.copy(b);return b;}const b=Buffer.alloc(SIZE[type]);if(type==="enum")b.writeUInt8(v);else if(type==="uint16")b.writeUInt16LE(v);else b.writeUInt32LE(v>>>0);return b;}
function def(local,global,fields){const b=Buffer.alloc(6+3*fields.length);b[0]=0x40|local;b.writeUInt16LE(global,3);b[5]=fields.length;fields.forEach(([field,type,size],i)=>{b[6+3*i]=field;b[7+3*i]=size||SIZE[type];b[8+3*i]=TYPES[type];});return b;}
function data(local,fields,values){return Buffer.concat([Buffer.from([local]),...fields.map(([_,type,size],i)=>value(type,values[i],size||SIZE[type]))]);}
function serial(id){let n=2166136261;for(const b of Buffer.from(id,"utf8")){n^=b;n=Math.imul(n,16777619)>>>0;}return n||1;}
function parseSession(s){
 if(!s||!/^course-\d{4}-\d\d-\d\d$/.test(s.id))throw Error("Séance de course identifiée requise");
 const etapes=s.etapes||[];
 const pattern=String(etapes[0]||"").match(/^(\d+)\s*[×x]\s*\(\s*(\d+)\s*min\s+marche\s*\+\s*(\d+)\s*min\s+course\s*\)$/i);
 const last=String(etapes[1]||"").match(/^(\d+)\s*min\s+de\s+marche\s+finale$/i);
 if(!pattern||!last||etapes.length<2||etapes.length>3||etapes.some((e,i)=>i>=2&&e!=="Allure facile"))throw Error("Étapes non prises en charge, pas de FIT approximatif");
 const [reps,walk,run]=pattern.slice(1).map(Number),end=Number(last[1]);
 if(reps<1||reps>20||walk<1||walk>90||run<1||run>120||end<1||end>90)throw Error("Paramètres FIT invalides");
 const steps=[];
 for(let i=0;i<reps;i++){steps.push({name:"Marche "+(i+1),seconds:walk*60,intensity:i===0?2:1});steps.push({name:"Course "+(i+1),seconds:run*60,intensity:0});}
 steps.push({name:"Marche finale",seconds:end*60,intensity:3});
 const seconds=steps.reduce((a,x)=>a+x.seconds,0),reported=String(s.duree||"").match(/^(\d+)\s*min$/);
 if(reported&&Number(reported[1])*60!==seconds)throw Error("Durée incohérente avec le programme");
 return {id:s.id,date:s.date,steps,durationSeconds:seconds,name:s.date.slice(5).replace("-","/")+" "+walk+"M+"+run+"C"};
}
function createWorkout(plan){
 if(plan.steps.length<1||plan.steps.length>64)throw Error("Nombre de pas FIT invalide");
 const fid=[[0,"enum"],[1,"uint16"],[2,"uint16"],[3,"uint32z"],[4,"uint32"]];
 const workout=[[4,"enum"],[6,"uint16"],[8,"string",32]];
 const step=[[254,"uint16"],[0,"string",24],[1,"enum"],[2,"uint32"],[3,"enum"],[4,"uint32"],[7,"enum"]];
 const created=Math.floor(Date.now()/1000-Date.parse("1989-12-31T00:00:00Z")/1000);
 const chunks=[def(0,0,fid),data(0,fid,[5,255,0,serial(plan.id),created]),def(1,26,workout),data(1,workout,[1,plan.steps.length,plan.name]),def(2,27,step)];
 plan.steps.forEach((s,i)=>chunks.push(data(2,step,[i,s.name,0,s.seconds*1000,2,0,s.intensity])));
 const content=Buffer.concat(chunks),header=Buffer.alloc(14);header[0]=14;header[1]=0x10;header.writeUInt16LE(2145,2);header.writeUInt32LE(content.length,4);header.write(".FIT",8,"ascii");header.writeUInt16LE(crcFit(header.subarray(0,12)),12);
 const beforeCrc=Buffer.concat([header,content]),fileCrc=Buffer.alloc(2);fileCrc.writeUInt16LE(crcFit(beforeCrc));return Buffer.concat([beforeCrc,fileCrc]);
}
function validateWorkoutFile(file,plan){
 if(file.length<16||file[0]!==14||file.toString("ascii",8,12)!==".FIT")throw Error("En-tête FIT invalide");
 if(file.readUInt16LE(12)!==crcFit(file.subarray(0,12)))throw Error("CRC en-tête invalide");
 if(file.readUInt32LE(4)+16!==file.length)throw Error("Taille fichier invalide");
 if(file.readUInt16LE(file.length-2)!==crcFit(file.subarray(0,-2)))throw Error("CRC fichier invalide");
 let offset=14;const end=file.length-2,defs=new Map(),messages=[];
 while(offset<end){
  const h=file[offset++],local=h&15;
  if(h&0x40){
   if(h&0x20)throw Error("Données développeur inattendues");
   const arch=file[offset+1],number=arch?file.readUInt16BE(offset+2):file.readUInt16LE(offset+2),count=file[offset+4];offset+=5;
   const fields=[];for(let i=0;i<count;i++){fields.push({field:file[offset++],size:file[offset++],type:file[offset++]});}
   defs.set(local,{number,fields});
  }else{
   const schema=defs.get(local);if(!schema)throw Error("Définition absente");
   const values={};for(const f of schema.fields){const bytes=file.subarray(offset,offset+f.size);offset+=f.size;
    if(f.type===7)values[f.field]=bytes.toString("utf8").split("\0")[0];
    else if(f.size===1)values[f.field]=bytes[0];else if(f.size===2)values[f.field]=bytes.readUInt16LE(0);
    else if(f.size===4)values[f.field]=bytes.readUInt32LE(0);
   }
   messages.push({number:schema.number,fields:values});
  }
 }
 if(offset!==end||messages.length!==plan.steps.length+2||messages[0].number!==0||messages[0].fields[0]!==5||messages[1].number!==26||messages[1].fields[6]!==plan.steps.length||messages[1].fields[4]!==1)throw Error("Messages FIT Workout incohérents");
 for(let i=0;i<plan.steps.length;i++){
  const m=messages[i+2],s=plan.steps[i];
  if(m.number!==27||m.fields[254]!==i||m.fields[2]!==s.seconds*1000||m.fields[7]!==s.intensity||m.fields[0]!==s.name||m.fields[1]!==0||m.fields[3]!==2)throw Error("Étape FIT invalide : "+i);
 }
 return {steps:plan.steps.length,seconds:plan.durationSeconds,sport:"running"};
}
function generate(session,root=ROOT){
 const plan=parseSession(session),buffer=createWorkout(plan),check=validateWorkoutFile(buffer,plan);
 const filename=path.join(root,"personnel/pieces-jointes/seances",plan.id,"prevu",plan.id+".fit");
 fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,buffer);
 return {filename,size:buffer.length,plan,check};
}
if(require.main===module){
 const id=process.argv[2];
 if(!id||!/^course-\d{4}-\d\d-\d\d$/.test(id))throw Error("Usage: node scripts/generer-garmin.cjs course-AAAA-MM-JJ");
 const input=path.join(ROOT,"personnel/seances",id.slice(7,11),id.slice(12,14),id+".json");
 const session=JSON.parse(fs.readFileSync(input,"utf8"));if(session.id!==id)throw Error("ID incohérent");
 console.log(JSON.stringify(generate(session)));
}
module.exports={parseSession,createWorkout,validateWorkoutFile,generate,crcFit};
