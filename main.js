// Shared interactions: scroll reveal, smooth anchors, parallax utilities
(function(){
  // Smooth anchor scroll
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const el = document.querySelector(a.getAttribute('href'));
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });

  // Intersection-based reveal
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transition='transform .6s ease, opacity .6s ease';
        entry.target.style.transform='translateY(0)';
        entry.target.style.opacity='1';
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});

  document.querySelectorAll('[data-reveal]').forEach(el=>{
    el.style.transform='translateY(16px)';
    el.style.opacity='0';
    observer.observe(el);
  });

  // Simple parallax for elements with data-parallax
  window.addEventListener('scroll', ()=>{
    const t = window.scrollY;
    document.querySelectorAll('[data-parallax]').forEach(el=>{
      const speed = parseFloat(el.getAttribute('data-parallax')) || .2;
      el.style.transform = `translateY(${t*speed}px)`;
    });
  }, {passive:true});
})();
