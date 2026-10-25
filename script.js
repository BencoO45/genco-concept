function initCarousels(){
  document.querySelectorAll('[data-carousel]').forEach((root, idx)=>{
    const slides=[...root.querySelectorAll('.slide')];
    const thumbs=[...root.querySelectorAll('.carousel-thumb')];
    const dots=[...root.querySelectorAll('.carousel-dot')];
    if(!slides.length) return;
    let current=0, timer;
    const show=(n)=>{
      current=(n+slides.length)%slides.length;
      slides.forEach((s,i)=>s.classList.toggle('active',i===current));
      thumbs.forEach((t,i)=>t.classList.toggle('active',i===current));
      dots.forEach((d,i)=>d.classList.toggle('active',i===current));
      if(thumbs[current]) thumbs[current].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    };
    const restart=()=>{ clearInterval(timer); timer=setInterval(()=>show(current+1),4500); };
    root.querySelector('.carousel-prev')?.addEventListener('click',()=>{show(current-1);restart()});
    root.querySelector('.carousel-next')?.addEventListener('click',()=>{show(current+1);restart()});
    thumbs.forEach((t,i)=>t.addEventListener('click',()=>{show(i);restart()}));
    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);restart()}));
    root.addEventListener('mouseenter',()=>clearInterval(timer));
    root.addEventListener('mouseleave',restart);
    let touchX=null;
    root.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
    root.addEventListener('touchend',e=>{if(touchX===null)return; const dx=e.changedTouches[0].clientX-touchX; if(Math.abs(dx)>45){show(current+(dx<0?1:-1));restart();} touchX=null;},{passive:true});
    show(0); restart();
  });
}
function initQuote(){ /* Le formulaire est envoyé directement par son action HTTPS. */ }
document.addEventListener('DOMContentLoaded',()=>{initCarousels();initQuote()});
