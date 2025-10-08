// Lifestyle: hover-animated cards with neon glow
(function(){
  document.querySelectorAll('.grid > .card').forEach(card=>{
    card.style.transition='transform .25s ease, box-shadow .25s ease';
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      card.style.transform='translateY(-2px)';
      card.style.boxShadow = `0 0 0 2px rgba(0,229,255,.2), 0 0 28px rgba(138,91,255,.3), inset 0 0 60px rgba(0,229,255,.1)`;
      card.style.background = `radial-gradient(220px 140px at ${x}px ${y}px, rgba(0,229,255,.12), rgba(12,16,38,.6))`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform='translateY(0)';
      card.style.boxShadow='none';
      card.style.background='linear-gradient(180deg, rgba(12,16,38,.85), rgba(12,16,38,.55))';
    });
  });
})();

// FAQ accordion toggle (lifestyle page)
(function(){
  function setupAccordion(){
    document.querySelectorAll('.accordion .accordion-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const item = btn.closest('.accordion-item');
        if(!item) return;
        const content = item.querySelector('.accordion-content');
        const open = item.classList.contains('active');
        // close others
        item.parentElement.querySelectorAll('.accordion-item.active').forEach(i=>{
          if(i!==item){ i.classList.remove('active'); }
        });
        // toggle current
        item.classList.toggle('active', !open);
        if(content){ content.style.transition = 'max-height .35s ease'; }
      });
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupAccordion);
  }else{ setupAccordion(); }
})();

