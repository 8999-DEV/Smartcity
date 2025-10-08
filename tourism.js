// Tourism: parallax on hero images and cinematic carousel
(function(){
  // Parallax strength for gallery images
  window.addEventListener('scroll', ()=>{
    document.querySelectorAll('.gallery .item img').forEach((img,i)=>{
      const rect = img.getBoundingClientRect();
      const offset = (window.innerHeight - rect.top) / window.innerHeight;
      img.style.transform = `scale(1.05) translateY(${offset* -10}px)`;
    });
  }, {passive:true});

  // Carousel cinematic slide
  const slides = Array.from(document.querySelectorAll('.carousel .slide'));
  let idx=0;
  slides.forEach(s=>{
    s.style.padding='40px';
    s.style.fontFamily='Orbitron, sans-serif';
    s.style.fontWeight='700';
    s.style.fontSize='22px';
    s.style.border='1px solid rgba(0,229,255,.2)';
    s.style.margin='8px 0';
    s.style.borderRadius='12px';
    s.style.background='linear-gradient(180deg, rgba(12,16,38,.8), rgba(12,16,38,.5))';
  });
  function next(){
    slides.forEach((s,i)=>{
      s.style.opacity = i===idx? '1':'0';
      s.style.transform = i===idx? 'translateX(0)':'translateX(20px)';
      s.style.transition='opacity .6s ease, transform .6s ease';
    });
    idx = (idx+1)%slides.length;
  }
  next();
  setInterval(next, 2800);
})();
