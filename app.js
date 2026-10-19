'use strict';
const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let state = 'wheel';
let soundOn = false;
let audio;
let selectedDrink = 0;
let lastDrink = -1;
let rotation = 0;
const drinks = [
  {name:'Trà sữa trân châu',note:'Ngọt ngào vừa đủ, đáng yêu hết nấc.',top:'#eddbc3',bottom:'#bc8966',fruit:false},
  {name:'Trà đào cam sả',note:'Một chút nắng vàng cho ngày thêm rạng rỡ.',top:'#ffd99b',bottom:'#e99550',fruit:true,flavor:'peach'},
  {name:'Trà sữa matcha',note:'Dịu dàng như cách bạn làm thế giới xanh hơn.',top:'#d7dfb3',bottom:'#8baf83',fruit:false},
  {name:'Trà vải hoa hồng',note:'Thơm một chút, xinh một chút, thương thật nhiều.',top:'#f7dedc',bottom:'#da9daa',fruit:true,flavor:'lychee'},
  {name:'Trà sữa khoai môn',note:'Một sắc tím dịu êm, một ngày thật ấm áp.',top:'#e3d5ec',bottom:'#b294c7',fruit:false},
  {name:'Trà dâu nhiệt đới',note:'Tươi tắn như nụ cười của bạn hôm nay.',top:'#ffd5b8',bottom:'#df7c87',fruit:true,flavor:'berry'}
];
const miniFlower = '<g fill="currentColor"><ellipse cy="-10" rx="5" ry="10"/><ellipse cy="-10" rx="5" ry="10" transform="rotate(60)"/><ellipse cy="-10" rx="5" ry="10" transform="rotate(120)"/><ellipse cy="-10" rx="5" ry="10" transform="rotate(180)"/><ellipse cy="-10" rx="5" ry="10" transform="rotate(240)"/><ellipse cy="-10" rx="5" ry="10" transform="rotate(300)"/><circle r="6" fill="#fff8ec"/></g>';
const miniCup = '<path d="m-13-14 4 34h18l4-34Z" fill="currentColor" opacity=".5"/><path d="M-15-15h30m-10 0 5-15" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><g fill="currentColor"><circle cx="-5" cy="12" r="2"/><circle cx="3" cy="10" r="2"/><circle cx="0" cy="16" r="2"/></g>';
const miniStar = '<path d="M0-22 5-6 21 0 5 5 0 22-5 5-21 0-5-6Z" fill="currentColor" opacity=".7"/>';
const miniHeart = '<path d="M0 17C-37-4-14-27 0-11 14-27 37-4 0 17Z" fill="currentColor" opacity=".65"/>';
function drawWheel(){
  const colors=['#efd0d7','#fbefdb','#dce2d6','#f0c3c9','#f7e4cb','#decfdc','#ecd8ca','#e8b5c4'];
  const inks=['#a65b70','#b78c63','#7b9279','#aa586e','#b48560','#937690','#b58b76','#a3526a'];
  const icons=[miniFlower,miniCup,miniStar,miniHeart,miniCup,miniFlower,miniHeart,miniStar];
  let svg='';
  for(let i=0;i<8;i++){
    const a=(i*45-90)*Math.PI/180,b=((i+1)*45-90)*Math.PI/180;
    const x1=200+199*Math.cos(a),y1=200+199*Math.sin(a),x2=200+199*Math.cos(b),y2=200+199*Math.sin(b);
    svg+=`<path d="M200 200L${x1} ${y1}A199 199 0 0 1 ${x2} ${y2}Z" fill="${colors[i]}" stroke="#fff7ed" stroke-width="1.5"/>`;
    const center=(i*45-67.5)*Math.PI/180;
    svg+=`<g transform="translate(${200+126*Math.cos(center)} ${200+126*Math.sin(center)}) rotate(${i*45+22.5})" style="color:${inks[i]}">${icons[i]}</g>`;
  }
  for(let i=0;i<40;i++){const a=i*Math.PI/20;svg+=`<circle cx="${200+187*Math.cos(a)}" cy="${200+187*Math.sin(a)}" r="2" fill="#fffaf0" opacity=".85"/>`;}
  $('wheel-art').innerHTML=svg;
}
function randomIndex(n){const a=new Uint32Array(1);const max=Math.floor(4294967296/n)*n;do{crypto.getRandomValues(a);}while(a[0]>=max);return a[0]%n;}
function chime(notes=[523.25,659.25,783.99],volume=.045){
  if(!soundOn)return;
  try{audio ||= new (window.AudioContext||window.webkitAudioContext)();audio.resume();notes.forEach((f,i)=>{const o=audio.createOscillator(),g=audio.createGain(),t=audio.currentTime+i*.12;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.5);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.55);});}catch{soundOn=false;$('sound').setAttribute('aria-pressed','false');$('sound').setAttribute('aria-label','Bật âm thanh');}
}
function action(label,text,hint){$('action-label').textContent=label;$('action-text').textContent=text;$('action-hint').textContent=hint;}
function spin(){
  if(state!=='wheel')return;
  state='spinning';$('action').disabled=true;$('wheel-center').disabled=true;
  action('Một chút may mắn đang đến…','Đang quay…','Món quà nhỏ đang trên đường đến bạn.');
  const pool=drinks.map((_,i)=>i).filter(i=>i!==lastDrink);selectedDrink=pool[randomIndex(pool.length)];
  rotation+=360*5+randomIndex(360);
  $('wheel').style.transition=reducedMotion?'none':'transform 1.8s cubic-bezier(.12,.65,.12,1)';
  $('wheel').style.transform=`rotate(${rotation}deg)`;
  chime([392,440,523,587,659],.025);
  window.setTimeout(()=>{
    state='gift';$('experience').dataset.stage='gift';$('wheel-stage').hidden=true;$('gift-stage').hidden=false;$('side-note').hidden=true;
    $('intro-text').innerHTML='Một món quà nhỏ đã chọn bạn rồi.<br>Chạm vào hộp quà để mở điều bất ngờ nhé.';
    action('Một món quà dành riêng cho bạn','Mở quà','Chạm vào hộp quà hoặc nút bên trên.');
    $('action').disabled=false;chime();
    if(document.activeElement===$('wheel-center'))$('gift').focus({preventScroll:true});
  },1800);
}
function openGift(){
  if(state!=='gift')return;
  state='opening';$('action').disabled=true;$('gift').disabled=true;$('stage-art').classList.add('opening');
  action('Một chút lấp lánh, dành cho bạn…','Đang mở quà…','Điều ngọt ngào sắp xuất hiện.');chime([659,784,988,1318],.035);
  window.setTimeout(()=>{
    state='drink';lastDrink=selectedDrink;
    $('experience').dataset.stage='drink';$('stage-art').classList.remove('opening');$('gift-stage').hidden=true;$('drink-stage').hidden=false;
    const drink=drinks[selectedDrink];$('drink-art').innerHTML=drinkSVG(drink);$('drink-name').textContent=drink.name;$('drink-description').textContent=drink.note;
    $('headline').innerHTML='Chúc bạn một ngày<br><em>thật ngọt ngào</em><span class="title-dot">.</span>';
    $('intro-text').hidden=true;$('letter').hidden=false;
    action('Cốc nước này, gửi bạn nhé ♡','Nhận thêm chút may mắn','Niềm vui nhỏ có thể bắt đầu lại bất cứ lúc nào.');
    $('action').disabled=false;celebrate();chime([523,659,784,1047],.045);
    if(document.activeElement===$('gift'))$('action').focus({preventScroll:true});
  },1000);
}
function reset(){
  if(state!=='drink')return;
  state='wheel';$('experience').dataset.stage='wheel';$('drink-stage').hidden=true;$('wheel-stage').hidden=false;$('side-note').hidden=false;$('gift').disabled=false;$('wheel-center').disabled=false;
  $('wheel').style.transition='none';rotation=0;$('wheel').style.transform='rotate(0deg)';
  $('headline').innerHTML='Một chút<br><em>ngọt ngào,</em><br>dành cho bạn<span class="title-dot">.</span>';
  $('intro-text').hidden=false;$('intro-text').innerHTML='Hôm nay, vũ trụ có một món quà nhỏ gửi đến bạn.<br>Thử một chút may mắn, nhận một chút yêu thương.';
  $('letter').hidden=true;$('confetti').replaceChildren();
  action('Quay để nhận phần quà bí ấn','Quay một chút may mắn','Một vòng quay nhỏ. Cả một trời yêu thương.');
}
function drinkSVG(d){
  let toppings='';
  if(!d.fruit){for(let i=0;i<22;i++){const x=84+(i*31%87),y=235+Math.floor(i/7)*12+(i%3)*3;toppings+=`<circle cx="${x}" cy="${y}" r="7" fill="#594047" opacity=".9"/><circle cx="${x-2}" cy="${y-2}" r="2" fill="#99716e" opacity=".6"/>`;}}
  else if(d.flavor==='peach'){toppings='<g transform="translate(112 239) rotate(-14)"><circle r="31" fill="#f8cb68"/><circle r="25" fill="#ffe2a0"/><path d="M0-23V23M-23 0h46m-39-17L17 17m0-34L-17 17" stroke="#f5c779" stroke-width="2"/></g><path d="M140 255q40-58 48-6-20 35-48 6" fill="#efa27a"/><path d="m144 253 35-8" stroke="#f9d1a2" stroke-width="4"/>';}
  else if(d.flavor==='lychee'){toppings='<g fill="#fff4e5" stroke="#ecd3c4" stroke-width="1.5"><circle cx="106" cy="251" r="19"/><circle cx="151" cy="270" r="19"/><circle cx="153" cy="229" r="18"/></g><g fill="#c46a8a" opacity=".7"><ellipse cx="113" cy="205" rx="7" ry="3" transform="rotate(30 113 205)"/><ellipse cx="157" cy="188" rx="7" ry="3" transform="rotate(-20 157 188)"/><ellipse cx="143" cy="249" rx="6" ry="3"/></g>';}
  else{toppings='<g fill="#cc536a"><path d="M86 237q21-18 35 2-13 40-21 31Z"/><path d="M139 258q20-19 35 0-12 35-21 29Z"/></g><g fill="#f9dda4"><circle cx="99" cy="245" r="1.5"/><circle cx="108" cy="249" r="1.5"/><circle cx="103" cy="259" r="1.5"/><circle cx="151" cy="267" r="1.5"/><circle cx="160" cy="271" r="1.5"/></g><path d="m95 237-7-10 13 5 8-7-2 11m37 22-4-12 12 7 9-7-2 13" fill="#7a9871"/>';}
  return `<svg viewBox="0 0 260 340" role="img" aria-label="Cốc ${d.name} mát lạnh"><defs><linearGradient id="tea" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="${d.top}"/><stop offset="1" stop-color="${d.bottom}"/></linearGradient><linearGradient id="glass" x2="1"><stop stop-color="#ffffff" stop-opacity=".5"/><stop offset=".25" stop-color="#ffffff" stop-opacity=".1"/><stop offset=".8" stop-color="#ffffff" stop-opacity=".08"/><stop offset="1" stop-color="#ffffff" stop-opacity=".4"/></linearGradient><clipPath id="cupClip"><path d="m65 115 19 175q1 12 46 12t46-12l19-175Z"/></clipPath></defs><ellipse cx="131" cy="316" rx="62" ry="8" fill="#a56e711a"/><path d="m143 37-22 145" stroke="#b96c80" stroke-width="13" stroke-linecap="round"/><path d="m140 38-20 140" stroke="#e7b3bc" stroke-width="3" stroke-linecap="round"/><path d="m65 115 19 175q1 12 46 12t46-12l19-175Z" fill="url(#tea)"/><g clip-path="url(#cupClip)">${toppings}<g fill="#fff" fill-opacity=".28" stroke="#fff7e9" stroke-opacity=".5" stroke-width="1.5"><rect x="79" y="125" width="32" height="28" rx="7" transform="rotate(13 95 139)"/><rect x="128" y="120" width="34" height="29" rx="7" transform="rotate(-14 145 134)"/><rect x="148" y="157" width="31" height="29" rx="6" transform="rotate(16 163 171)"/><rect x="101" y="161" width="29" height="27" rx="6" transform="rotate(-12 115 175)"/></g><path d="m65 115 19 175q1 12 46 12t46-12l19-175Z" fill="url(#glass)"/></g><path d="m65 115 19 175q1 12 46 12t46-12l19-175" fill="none" stroke="#fff9ec" stroke-width="2.5" opacity=".85"/><ellipse cx="130" cy="113" rx="67" ry="15" fill="#fff5e8" opacity=".78"/><ellipse cx="130" cy="112" rx="60" ry="10" fill="${d.top}"/><path d="M62 111q67 23 136 0v10q-66 25-136 0Z" fill="#fff9ee" opacity=".75"/><path d="m133 99-4 26" stroke="#bc7788" stroke-width="13"/><path d="m130 99-4 26" stroke="#e6adba" stroke-width="3"/><path d="m80 145 12 104" stroke="#fffdf5" stroke-width="4" stroke-linecap="round" opacity=".55"/><g fill="#fff" opacity=".65"><ellipse cx="179" cy="181" rx="3" ry="5"/><ellipse cx="83" cy="205" rx="2" ry="3"/><ellipse cx="175" cy="222" rx="2.5" ry="4"/></g><g transform="translate(131 209)"><circle r="25" fill="#fff4e5" opacity=".92"/><g transform="scale(.65)" style="color:#b96c80">${miniFlower}</g><text y="35" text-anchor="middle" fill="#8e5c69" font-family="sans-serif" font-size="6" letter-spacing="2">JUST FOR YOU</text></g>${d.fruit?'<g transform="translate(178 98) rotate(22)"><path d="M0 0q-8-33 25-32Q28-8 0 0" fill="#879c72"/><path d="M0 0 20-26" fill="none" stroke="#d0d5a2" stroke-width="1.3"/></g>':''}<g fill="#b98590"><path d="m41 127 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z"/><path d="m219 213 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/></g></svg>`;
}
let confettiTimer;
function celebrate(){
  if(reducedMotion)return;
  clearTimeout(confettiTimer);
  const colors=['#c27f92','#e1c38b','#eac0c8','#9aa987','#b6a2c5'];
  const fragment=document.createDocumentFragment();
  for(let i=0;i<48;i++){const p=document.createElement('i');p.style.cssText=`--x:${Math.random()*100}%;--w:${4+Math.random()*4}px;--c:${colors[i%colors.length]};--duration:${3+Math.random()*2}s;--delay:${Math.random()*.5}s;--drift:${Math.random()*160-80}px;--rotation:${Math.random()*720-360}deg;`;fragment.appendChild(p);}
  $('confetti').replaceChildren(fragment);confettiTimer=setTimeout(()=>$('confetti').replaceChildren(),6000);
}
$('action').addEventListener('click',()=>{if(state==='wheel')spin();else if(state==='gift')openGift();else if(state==='drink')reset();});
$('wheel-center').addEventListener('click',spin);
$('gift').addEventListener('click',openGift);
$('sound').addEventListener('click',()=>{soundOn=!soundOn;$('sound').setAttribute('aria-pressed',String(soundOn));$('sound').setAttribute('aria-label',soundOn?'Tắt âm thanh':'Bật âm thanh');if(soundOn)chime([659,784],.025);});
drawWheel();
