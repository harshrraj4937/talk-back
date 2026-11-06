const nodes=[...document.querySelectorAll('.mermaid')];
const sources=new Map(nodes.map(n=>[n,n.dataset.source||n.textContent.trim()]));
const controls=new Map();
let enginePromise,queue=Promise.resolve();
// Reserve controls and source disclosures before loading the renderer. Diagram
// bodies have fixed viewport heights, so SVG dimensions never move later anchors.
for(const n of nodes){
  const card=n.closest('.diagram-card'),details=document.createElement('details');details.className='diagram-source';const summary=document.createElement('summary');summary.textContent='View Mermaid source';const pre=document.createElement('pre');pre.tabIndex=0;pre.textContent=sources.get(n);details.append(summary,pre);card.append(details);
  const actions=card.querySelector('.diagram-actions'),label=document.createElement('span');label.className='zoom-label';label.textContent='100%';
  const out=document.createElement('button'),fit=document.createElement('button'),inc=document.createElement('button');
  [out,fit,inc].forEach(b=>{b.className='tiny-btn';b.type='button';b.disabled=true;});
  out.textContent='−';out.setAttribute('aria-label','Zoom out diagram');fit.textContent='Fit';fit.setAttribute('aria-label','Fit diagram to viewport');inc.textContent='＋';inc.setAttribute('aria-label','Zoom in diagram');
  actions.append(label,out,fit,inc);controls.set(n,{label,out,fit,inc});
}
async function engine(){
  if(!enginePromise)enginePromise=(async()=>{
    let mermaid;
    for(const url of ['https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs','https://unpkg.com/mermaid@11.12.2/dist/mermaid.esm.min.mjs']){
      try {mermaid=(await import(url)).default;break;}catch{}
    }
    if(!mermaid)throw new Error('Diagram renderer is unavailable. Mermaid source is preserved below.');
    mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'base',flowchart:{curve:'basis',htmlLabels:true,nodeSpacing:35,rankSpacing:50,diagramPadding:18},sequence:{actorMargin:45,messageMargin:30},themeVariables:{darkMode:true,background:'#101b29',primaryColor:'#18374b',primaryTextColor:'#e9f5fd',primaryBorderColor:'#6c9fbf',lineColor:'#819ebc',textColor:'#e9f5fd',nodeTextColor:'#e9f5fd',edgeLabelBackground:'#152c40',stateLabelColor:'#e9f5fd',secondaryColor:'#1d354e',tertiaryColor:'#162b3e',clusterBkg:'#142536',clusterBorder:'#49647e',fontFamily:'Arial, sans-serif',fontSize:'13px',actorBkg:'#1b354b',actorBorder:'#6d9fbe',actorTextColor:'#e6f4ff',signalColor:'#a6c4de',signalTextColor:'#dbeaf5',labelBoxBkgColor:'#233c55',labelTextColor:'#c5e4fa',noteBkgColor:'#223b49',noteTextColor:'#e4f1fa'}});
    return mermaid;
  })();
  return enginePromise;
}
async function render(n){
  if(n.dataset.rendered||n.dataset.failed)return;
  try{
    const mermaid=await engine();const result=await mermaid.render('voice-figure-'+nodes.indexOf(n),sources.get(n));n.innerHTML=result.svg;n.dataset.rendered='true';
    const svg=n.querySelector('svg');const box=svg.viewBox.baseVal;const width=Math.max(640,box.width);svg.style.width=width+'px';svg.style.height='auto';svg.setAttribute('role','img');svg.setAttribute('aria-label',n.closest('.diagram-card').querySelector('.diagram-label').textContent.trim());
    // Explicit styles travel with the SVG download as well as the page.
    const style=document.createElementNS('http://www.w3.org/2000/svg','style');style.textContent='text,tspan{fill:#dbeaf5!important}.nodeLabel,.edgeLabel,.nodeLabel p,.edgeLabel p{color:#dbeaf5!important}.edgeLabel rect,.labelBkg{fill:#152c40!important}.edgeLabel p{background:#152c40!important}';svg.prepend(style);
    if(result.bindFunctions)result.bindFunctions(n);
    const card=n.closest('.diagram-card'),{label,out,fit,inc}=controls.get(n);let scale=1;
    const setSize=value=>{scale=Math.max(.35,Math.min(2.4,value));svg.style.width=(width*scale)+'px';label.textContent=Math.round(scale*100)+'%';};
    [out,fit,inc].forEach(b=>b.disabled=false);out.addEventListener('click',()=>setSize(scale-.2));inc.addEventListener('click',()=>setSize(scale+.2));fit.addEventListener('click',()=>setSize((card.querySelector('.diagram-body').clientWidth-40)/width));
  }catch(error){n.dataset.failed='true';n.textContent=sources.get(n);n.classList.add('diagram-fallback');const note=document.createElement('div');note.className='diagram-error';note.textContent='Rendered diagram unavailable. Original Mermaid source is shown; copy is still available.';n.before(note);console.warn(error.message);}
}
function schedule(n){queue=queue.then(()=>render(n));return queue;}
const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);schedule(e.target);}},{rootMargin:'500px 0px'});
nodes.forEach(n=>observer.observe(n));
document.addEventListener('architecturechange',()=>{const active=document.querySelector('.focus-panel.active .mermaid');if(active&&document.getElementById('fullArchitecture').open)schedule(active);});
document.getElementById('fullArchitecture').addEventListener('toggle',e=>{if(e.target.open){const active=document.querySelector('.focus-panel.active .mermaid');if(active)schedule(active);}});
window.renderAllDiagrams=()=>{nodes.forEach(schedule);return queue;};
