// Transport: Animated pins, tooltips, slide-in schedules
(function(){
  const svg = document.getElementById('metroMap');
  if(!svg) return;
  const stations = [
    {x:100,y:380,name:'River Park', eta:'2 min'},
    {x:220,y:340,name:'Tech Square', eta:'5 min'},
    {x:350,y:280,name:'Grand Station', eta:'1 min'},
    {x:500,y:250,name:'Museum Mile', eta:'3 min'},
    {x:700,y:150,name:'Harbor Point', eta:'6 min'}
  ];
  const g = document.getElementById('stations');
  const tooltip = document.getElementById('tooltip');

  stations.forEach(s=>{
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('cx', s.x);
    circle.setAttribute('cy', s.y);
    circle.setAttribute('r', 6);
    circle.setAttribute('fill', 'url(#grad_'+s.name.replace(/\s/g,'' )+')');

    // glowing pin using HTML overlay for animation
    const pin = document.createElement('div');
    pin.className='pin';
    pin.style.position='absolute';
    pin.style.left = (s.x - 6)+'px';
    pin.style.top = (s.y - 6)+'px';
    pin.dataset.name=s.name; pin.dataset.eta=s.eta;

    pin.addEventListener('mousemove', (e)=>{
      tooltip.style.display='block';
      tooltip.style.left = e.offsetX + 16 + 'px';
      tooltip.style.top = e.offsetY + 16 + 'px';
      tooltip.innerHTML = `<strong>${s.name}</strong><br/>Next: ${s.eta}`;
    });
    pin.addEventListener('mouseleave', ()=>{ tooltip.style.display='none'; });

    document.getElementById('mapWrap').appendChild(pin);
    g.appendChild(circle);
  });

  // Slide-in schedules
  const schedule = document.getElementById('schedule');
  const list = document.getElementById('scheduleList');
  const items = stations.map(s=>`<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed rgba(0,229,255,.2)"><span>${s.name}</span><span style="color:var(--neon)">${s.eta}</span></div>`).join('');
  list.innerHTML = items;
  schedule.style.transform='translateX(40px)'; schedule.style.opacity='0';
  requestAnimationFrame(()=>{
    schedule.style.transition='transform .6s ease, opacity .6s ease';
    schedule.style.transform='translateX(0)';
    schedule.style.opacity='1';
  });
})();

// FAQ accordion toggle (transport page)
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

