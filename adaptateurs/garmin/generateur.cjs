"use strict";
const fs=require("node:fs"),path=require("node:path");
const ROOT=path.resolve(__dirname,"../..");
const TABLE=[0,0xCC01,0xD801,0x1400,0xF001,0x3C00,0x2800,0xE401,0xA001,0x6C00,0x7800,0xB401,0x5000,0x9C01,0x8801,0x4400];
function crcFit(bytes){let crc=0;for(const b of bytes){let tmp=TABLE[crc&15];crc=((crc>>4)&0x0fff)^tmp^TABLE[b&15];tmp=TABLE[crc&15];crc=((crc>>4)&0x0fff)^tmp^TABLE[(b>>4)&15];}return crc;}
const TYPES={enum:0,uint16:0x84,uint32:0x86,uint32z:0x8c,string:7},SIZE={enum:1,uint16:2,uint32:4,uint32z:4};
function value(type,v,n){if(type==="string"){const b=Buffer.alloc(n),source=Buffer.from(v,"utf8");if(source.length>=n)throw Error("Nom FIT trop long");source.copy(b);return b;}const b=Buffer.alloc(SIZE[type]);if(type==="enum")b.writeUInt8(v);else if(type==="uint16")b.writeUInt16LE(v);else b.writeUInt32LE(v>>>0);return b;}
function def(local,global,fields){const b=Buffer.alloc(6+3*fields.length);b[0]=0x40|local;b.writeUInt16LE(global,3);b[5]=fields.length;fields.forEach(([field,type,size],i)=>{b[6+3*i]=field;b[7+3*i]=size||SIZE[type];b[8+3*i]=TYPES[type];});return b;}
function data(local,fields,values){return Buffer.concat([Buffer.from([local]),...fields.map(([_,type,size],i)=>value(type,values[i],size||SIZE[type]))]);}
function serial(id){let n=2166136261;for(const b of Buffer.from(id,"utf8")){n^=b;n=Math.imul(n,16777619)>>>0;}return n||1;}
// Renfo : l'effort dépend des répétitions et des maintiens dans une plage de temps.
// Utiliser des pas FIT "open" (avancement manuel), sans inventer de durée exacte.
// Adaptateur FIT : prescriptions STRUCTURÉES, sans dépendance aux libellés du Web.
function asciiOnly(t){return String(t).normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[–—]/g,"-").replace(/[’]/g,"'").replace(/×/g,"x");}
function parseRenfo(s){
 if(s&&Array.isArray(s.blocs)&&s.blocs.some(b=>b&&b.nature==="retour_au_calme"))throw Error("Renfo : retour au calme redondant avec les étirements");
 if(!s||s.type!=="renfo"||!/^renfo-\d{4}-\d{2}-\d{2}$/.test(s.id)||
    !Array.isArray(s.blocs)||s.blocs.length!==5)throw Error("Renfo structuré requis");
 const first=s.blocs[0],end=s.blocs.at(-1),exercises=s.blocs.slice(1,-1);
 if(first.nature!=="mise_en_route"||end.nature!=="etirements"||
    !Number.isInteger(first.dureeSecondes)||!Number.isInteger(end.dureeSecondes)||
    first.dureeSecondes<60||end.dureeSecondes<60||end.dureeSecondes>600)throw Error("Renfo : mise en route et étirements chronométrés nécessaires");
 const aliases={"pont-sol":"Pont sol","ouverture-genou":"Ouv. genou","dead-bug":"Bras/jambe dos","bird-dog":"4 pattes","pont-ballon":"Pont ballon"};
 const steps=[{name:"Mise en route",seconds:first.dureeSecondes,intensity:2}];
 for(const b of exercises){
  if(b.nature==="retour_au_calme")throw Error("Renfo : retour au calme redondant avec les étirements");
  const alias=aliases[b.mouvementId];
  if(b.nature!=="exercice"||!alias)throw Error("Exercice de renfo non reconnu");
  if(!Number.isInteger(b.series)||b.series<1||b.series>8||!Number.isInteger(b.repetitions)||b.repetitions<1||b.repetitions>40||
     !Number.isInteger(b.reposEntreSeriesSecondes)||b.reposEntreSeriesSecondes<1||b.reposEntreSeriesSecondes>300)throw Error("Séries, répétitions ou repos non vérifiables");
  const fullInstruction=b.consignes+b.separateurRepos+b.reposEntreSeriesSecondes+" s entre séries"+(b.complement?" ; "+b.complement:"");
  const notes=asciiOnly(b.repetitions+" reps"+(b.parCote?" par cote":"")+"; "+fullInstruction);
  if(Buffer.byteLength(notes,"utf8")>=160)throw Error("Consignes FIT trop longues");
  for(let k=1;k<=b.series;k++){
   steps.push({name:alias+" "+k+"/"+b.series,seconds:0,durationType:5,intensity:0,notes});
   if(k<b.series)steps.push({name:"Repos "+alias,seconds:b.reposEntreSeriesSecondes,intensity:1});
  }
 }
 steps.push({name:"Etirements doux",seconds:end.dureeSecondes,intensity:3,notes:asciiOnly(end.consignes)});
 if(steps.length>64)throw Error("Renfo trop long");
 return {id:s.id,date:s.date,steps,durationSeconds:null,timedSeconds:steps.reduce((a,b)=>a+b.seconds,0),sport:5,name:"Renfo "+s.date.slice(5).replace("-","/")};
}
function parseSession(s){
 if(s&&s.type==="renfo")return parseRenfo(s);
 if(!s||!/^course-\d{4}-\d{2}-\d{2}$/.test(s.id)||!Array.isArray(s.blocs))throw Error("Course structurée requise");
 const b=s.blocs,first=b[0],last=b[1];
 if(!first||first.nature!=="fractions"||!last||last.nature!=="marche_finale")throw Error("Séquence de course non prise en charge");
 const tail=b.at(-1)?.nature==="etirements"?b.at(-1):null;
 if(!tail&&s.fait!==true)throw Error("Les courses prévues doivent comporter des étirements");
 const extras=b.slice(2,tail?-1:undefined);
 if(extras.length>2||extras.some((x,i)=>i===0?x.nature!=="allure"||x.niveau!=="facile":x.nature!=="option"||x.consignes!=="si très à l'aise : 3 min marche + 21 min course continue + 3 min marche"))
  throw Error("Étapes supplémentaires non prises en charge");
 const reps=first.repetitions,walk=first.marcheSecondes,run=first.courseSecondes,end=last.dureeSecondes;
 if(!Number.isInteger(reps)||reps<1||reps>20||!Number.isInteger(walk)||walk<60||walk>5400||!Number.isInteger(run)||run<60||run>7200||
    !Number.isInteger(end)||end<60||end>5400)throw Error("Temps de course incorrects");
 const steps=[];
 for(let k=0;k<reps;k++){
  steps.push({name:"Marche "+(k+1),seconds:walk,intensity:k===0?2:1});
  steps.push({name:"Course "+(k+1),seconds:run,intensity:0});
 }
 steps.push({name:"Marche finale",seconds:end,intensity:3});
 if(tail){if(!Number.isInteger(tail.dureeSecondes)||tail.dureeSecondes<60||tail.dureeSecondes>600)throw Error("Étirements incorrects");steps.push({name:"Etirements doux",seconds:tail.dureeSecondes,intensity:3});}
 const seconds=steps.reduce((a,b)=>a+b.seconds,0);
 if(s.dureeEstimeeMinutes?.min&&s.dureeEstimeeMinutes.min===s.dureeEstimeeMinutes.max&&s.dureeEstimeeMinutes.min*60!==seconds)throw Error("Durée et prescription incohérentes");
 return {id:s.id,date:s.date,steps,durationSeconds:seconds,timedSeconds:seconds,sport:1,name:s.date.slice(5).replace("-","/")+" "+(walk/60)+"M+"+(run/60)+"C"};
}
function createWorkout(plan){
 if(plan.steps.length<1||plan.steps.length>64)throw Error("Nombre de pas FIT invalide");
 const fid=[[0,"enum"],[1,"uint16"],[2,"uint16"],[3,"uint32z"],[4,"uint32"]];
 const workout=[[4,"enum"],[6,"uint16"],[8,"string",32]];
 const step=[[254,"uint16"],[0,"string",24],[1,"enum"],[2,"uint32"],[3,"enum"],[4,"uint32"],[7,"enum"]];
 const strength=plan.sport===5;
 if(strength)step.push([8,"string",160]);
 const created=Math.floor(Date.now()/1000-Date.parse("1989-12-31T00:00:00Z")/1000);
 const chunks=[def(0,0,fid),data(0,fid,[5,255,0,serial(plan.id),created]),def(1,26,workout),data(1,workout,[plan.sport||1,plan.steps.length,plan.name]),def(2,27,step)];
 plan.steps.forEach((s,i)=>{
  const fields=[i,s.name,s.durationType||0,s.seconds*1000,2,0,s.intensity];
  if(strength)fields.push(s.notes||"");
  chunks.push(data(2,step,fields));
 });
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
 if(offset!==end||messages.length!==plan.steps.length+2||messages[0].number!==0||messages[0].fields[0]!==5||messages[1].number!==26||messages[1].fields[6]!==plan.steps.length||messages[1].fields[4]!==(plan.sport||1))throw Error("Messages FIT Workout incohérents");
 for(let i=0;i<plan.steps.length;i++){
  const m=messages[i+2],s=plan.steps[i];
  if(m.number!==27||m.fields[254]!==i||m.fields[2]!==s.seconds*1000||
    m.fields[7]!==s.intensity||m.fields[0]!==s.name||
    m.fields[1]!==(s.durationType||0)||m.fields[3]!==2)
    throw Error("Étape FIT invalide : "+i);
  if(plan.sport===5&&typeof m.fields[8]!=="string")throw Error("Notes Renfo manquantes");
 }
 return {steps:plan.steps.length,seconds:plan.durationSeconds,
  timedSeconds:plan.timedSeconds??plan.durationSeconds,
  sport:plan.sport===5?"strength_training":"running"};
}
function generate(session,root=ROOT){
 const plan=parseSession(session),buffer=createWorkout(plan),check=validateWorkoutFile(buffer,plan);
 const filename=path.join(root,"adaptateurs/garmin/fichiers",plan.id+".fit");
 fs.mkdirSync(path.dirname(filename),{recursive:true});fs.writeFileSync(filename,buffer);
 return {filename,size:buffer.length,plan,check};
}
function main(args=process.argv.slice(2)){
 const id=args[0];if(!id||!/^(?:course|renfo)-\d{4}-\d{2}-\d{2}$/.test(id))throw Error("Usage: node scripts/generer-garmin.cjs <course|renfo>-AAAA-MM-JJ");
 const date=id.slice(-10),rel="domaines/planification/donnees/seances";
 const pathPlan=path.join(ROOT,rel,date.slice(0,4),date.slice(5,7),id+".json");
 const session=JSON.parse(fs.readFileSync(pathPlan,"utf8"));if(session.id!==id)throw Error("Identifiant de plan incohérent");
 const done=fs.existsSync(path.join(ROOT,"domaines/activites/donnees/seances",date.slice(0,4),date.slice(5,7),id+".json"));
 console.log(JSON.stringify(generate({...session,fait:done})));
}
if(require.main===module)main();
module.exports={parseSession,parseRenfo,createWorkout,validateWorkoutFile,generate,crcFit,main};
