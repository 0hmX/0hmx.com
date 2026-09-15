// One continuous forest behind every vehicle, with cached parallax layers.
const forest=document.createElement('canvas');forest.className='jungle-scene';forest.setAttribute('aria-hidden','true');fleet.prepend(forest);
const forestCtx=forest.getContext('2d');let forestW=0,forestH=0,forestDpr=1,forestLayers=[],forestDistance=0,forestLast=0;
function seeded(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function makeForestLayer(depth){
 const tile=document.createElement('canvas'),tw=1500,th=forestH;tile.width=tw*forestDpr;tile.height=th*forestDpr;const c=tile.getContext('2d');c.scale(forestDpr,forestDpr);
 const rand=seeded(741+depth*913),base=th*.91;
 if(depth===0){c.fillStyle='#171719';c.beginPath();c.moveTo(0,th);for(let x=0;x<=tw;x+=5)c.lineTo(x,th*(.46+.10*Math.sin(x*.006)+.045*Math.sin(x*.017)));c.lineTo(tw,th);c.fill();return {tile,width:tw,rate:.045};}
 const colors=['','#1b1b1e','#19191b','#101012'];c.fillStyle=colors[depth];c.strokeStyle=colors[depth];
 const spacing=depth===1?53:depth===2?95:165;
 for(let x=-100;x<tw+100;x+=spacing){
  const px=x+rand()*spacing*.65,height=th*(.34+rand()*.46),top=base-height,trunk=th*(depth===1?.006:depth===2?.012:.018),lean=(rand()-.5)*28;
  c.beginPath();c.moveTo(px-trunk,base);c.quadraticCurveTo(px+lean*.4,top+height*.5,px+lean,top);c.lineTo(px+lean+trunk*.6,top);c.quadraticCurveTo(px+trunk+lean*.4,top+height*.5,px+trunk,base);c.fill();
  // Branches, hanging vines, and overlapping broadleaf crowns.
  for(let branch=0;branch<3;branch++){
   const cy=top+height*(.12+branch*.16),side=branch%2?1:-1,reach=25+rand()*45;
   c.lineWidth=Math.max(1,trunk*.36);c.beginPath();c.moveTo(px+lean*.7,cy+height*.19);c.quadraticCurveTo(px+side*reach*.35,cy,px+side*reach,cy-5);c.stroke();
   for(let leaf=0;leaf<5;leaf++){const lx=px+side*reach+(rand()-.5)*46,ly=cy+(rand()-.5)*24;c.beginPath();c.ellipse(lx,ly,th*(.035+rand()*.06),th*(.018+rand()*.028),(rand()-.5)*.8,0,Math.PI*2);c.fill();}
   if(depth>1&&rand()>.45){c.lineWidth=.8;c.beginPath();c.moveTo(px+side*reach,cy);c.bezierCurveTo(px+side*reach-10,cy+25,px+side*reach+12,cy+46,px+side*reach-3,cy+65);c.stroke();}
  }
  c.beginPath();c.ellipse(px+lean,top+5,th*(.06+rand()*.05),th*(.025+rand()*.035),0,0,Math.PI*2);c.fill();
 }
 // Dense undergrowth, mostly below the wheel line.
 for(let x=0;x<tw;x+=13){const h=10+rand()*27;c.beginPath();c.moveTo(x,th);c.quadraticCurveTo(x-13,base-h,x-27,base-h-8);c.quadraticCurveTo(x-5,base-h,x+2,base);c.quadraticCurveTo(x+15,base-h-15,x+30,base-h);c.quadraticCurveTo(x+12,base-h+15,x+6,th);c.fill();}
 return {tile,width:tw,rate:[0,.12,.3,.65][depth]};
}
function resizeForest(){forestW=fleet.clientWidth;forestH=fleet.clientHeight;forestDpr=Math.min(devicePixelRatio||1,2);forest.width=forestW*forestDpr;forest.height=forestH*forestDpr;forestCtx.setTransform(forestDpr,0,0,forestDpr,0,0);forestLayers=[0,1,2,3].map(makeForestLayer);}
new ResizeObserver(resizeForest).observe(fleet);resizeForest();
function drawForest(now){
 const dt=forestLast?Math.min((now-forestLast)/1000,.05):0;forestLast=now;
 if(!document.hidden&&forestW&&forestH){
  const visible=controllers.filter(c=>c&&!fleet.querySelector('[data-vehicle="'+c.getState().vehicle+'"]').hidden);
  if(playing&&visible.length)forestDistance+=visible.reduce((sum,c)=>sum+c.getState().actualSpeed,0)/visible.length*dt*24;
  const c=forestCtx,w=forestW,h=forestH;
  const sky=c.createLinearGradient(0,0,0,h);sky.addColorStop(0,'#080809');sky.addColorStop(.65,'#1a1a1d');sky.addColorStop(1,'#0c0c0d');c.fillStyle=sky;c.fillRect(0,0,w,h);
  const stars=seeded(812);for(let i=0;i<Math.max(20,w/22);i++){const sx=stars()*w,sy=stars()*h*.51,r=.35+stars()*.45;c.globalAlpha=.16+stars()*.24;c.fillStyle='#d9d9df';c.beginPath();c.arc(sx,sy,r,0,Math.PI*2);c.fill();}c.globalAlpha=1;
  const moonX=w*.77,moonY=h*.16,glow=c.createRadialGradient(moonX,moonY,2,moonX,moonY,h*.45);glow.addColorStop(0,'#d5d5d522');glow.addColorStop(1,'#d5d5d500');c.fillStyle=glow;c.fillRect(0,0,w,h);c.fillStyle='#d0d0d088';c.beginPath();c.arc(moonX,moonY,Math.max(4,h*.022),0,Math.PI*2);c.fill();
  for(let layer=0;layer<forestLayers.length;layer++){
   const {tile,width,rate}=forestLayers[layer],offset=forestDistance*rate%width;
   for(let x=-offset-width;x<w;x+=width)c.drawImage(tile,x,0,width,h);
   if(layer===1||layer===2){const mist=c.createLinearGradient(0,h*.35,0,h*.9);mist.addColorStop(0,'#b8b8bc00');mist.addColorStop(.55,layer===1?'#b8b8bc10':'#b8b8bc09');mist.addColorStop(1,'#b8b8bc00');c.fillStyle=mist;c.fillRect(0,0,w,h);}
  }
 }
 requestAnimationFrame(drawForest);
}
requestAnimationFrame(drawForest);
