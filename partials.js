// Inject shared header and footer across pages
(function(){
  const header = `
  <header class="site-header">
    <nav class="navbar">
      <div class="brand"><span class="dot"></span><span>SmartCity</span></div>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="transport.html">Transport</a>
        <a href="healthcare.html">Healthcare</a>
        <a href="education.html">Education</a>
        <a href="tourism.html">Tourism</a>
        <a href="events.html">Events</a>
        <a href="dashboard.html">Dashboard</a>
        <a href="sustainability.html">Sustainability</a>
        <a href="lifestyle.html">Lifestyle</a>
        <a href="emergency.html">Emergency</a>
        <a href="contact.html">Contact</a>
      </div>
    </nav>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div>© <span id="year"></span> SmartCity Portal</div>
      <div>Built with <span style="color:var(--neon)">❤</span> Neon UI</div>
    </div>
  </footer>`;

  const headerMount = document.getElementById('app-header');
  const footerMount = document.getElementById('app-footer');
  if(headerMount) headerMount.innerHTML = header;
  if(footerMount) footerMount.innerHTML = footer;
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
})();
