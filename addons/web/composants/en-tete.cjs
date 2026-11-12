"use strict";
/* Source unique pour l'en-tête, composée au build : navigation disponible sans JS. */
const pages=Object.freeze([
  {id:"index",label:"Mon programme",href:"./"},
  {id:"coach",label:"Le cap du Coach",href:"./coach.html"},
  {id:"sante",label:"Mon suivi santé",href:"./sante.html"},
  {id:"equipements",label:"Mes équipements",href:"./equipements.html"}
]);
function rendreEnTete(page){
  if(!pages.some(p=>p.id===page))throw new Error("Page inconnue : "+page);
  const liens=pages.map(p=>p.id===page
    ? `        <span class="site-nav-link is-current" aria-current="page">${p.label}</span>`
    : `        <a class="site-nav-link" href="${p.href}">${p.label}</a>`
  ).join("\n");
  return `<header class="site-header">
      <div class="site-brand-wrap">
        <a class="brand" href="./" aria-label="Accueil Mon Rythme"><span class="brand-icon" aria-hidden="true">↗</span><span>mon rythme.</span></a>
        <time id="todayLabel"></time>
      </div>
      <nav class="site-navigation" aria-label="Navigation entre les pages de Mon Rythme">
${liens}
      </nav>
    </header>`;
}
function composerPage(source,page){
  if(typeof source!=="string")throw new TypeError("HTML source attendu");
  const marker=`<div data-mon-rythme-en-tete="${page}"></div>`;
  if(source.split(marker).length!==2||/data-mon-rythme-en-tete="[^"]+"/.test(source.replace(marker,"")))
    throw new Error("Un unique emplacement d'en-tête est requis : "+page);
  return source.replace(marker,rendreEnTete(page));
}
module.exports={rendreEnTete,composerPage};
