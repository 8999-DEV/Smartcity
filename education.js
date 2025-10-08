// Education: accordion interactions and hover glow
(function(){
  document.querySelectorAll('.card.content').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left; const y = e.clientY - r.top;
      card.style.boxShadow = `0 0 0 2px rgba(0,229,255,.2), 0 0 20px rgba(0,229,255,.2), inset 0 0 40px rgba(138,91,255,.12)`;
      card.style.background = `radial-gradient(200px 120px at ${x}px ${y}px, rgba(0,229,255,.12), rgba(12,16,38,.6))`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.boxShadow='none';
      card.style.background='linear-gradient(180deg, rgba(12,16,38,.85), rgba(12,16,38,.55))';
    });
  });

  // Accordion: close others and update +/- glyph
  document.querySelectorAll('.accordion-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.accordion-item');
      if(!item) return;
      const isOpen = item.classList.contains('active');
      const acc = item.parentElement;
      // close others
      acc.querySelectorAll('.accordion-item.active').forEach(i=>{
        i.classList.remove('active');
        const b = i.querySelector('.accordion-btn span');
        if(b) b.textContent = '+';
      });
      // toggle current
      item.classList.toggle('active', !isOpen);
      const span = btn.querySelector('span');
      if(span) span.textContent = !isOpen ? '−' : '+';
    });
  });

  // Apply form: inline success
  function setupApplyForm(){
    const form = document.getElementById('applyForm');
    const success = document.getElementById('applySuccess');
    if(!form || !success) return;
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      success.style.display = 'block';
      form.reset();
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupApplyForm);
  } else {
    setupApplyForm();
  }
})();
