document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#site-header");
  const footer = document.querySelector("#site-footer");
  const depth = location.pathname.includes("/pages/") || location.pathname.includes("/tutorials/") || location.pathname.includes("/assessments/") ? "../" : "";
  const nav = SITE_DATA.navigation.map(item => {
    const active = document.body.dataset.page === item.page ? "active" : "";
    return `<a class="${active}" href="${depth}${item.href}">${item.label}</a>`;
  }).join("");

  if (header) header.innerHTML = `
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="${depth}index.html" aria-label="Yiga Gerald home">
          <span class="brand-mark">YG</span><span><strong>Yiga Gerald</strong><small>ICT Teacher & Digital Creator</small></span>
        </a>
        <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
        <nav class="site-nav">${nav}</nav>
        <button class="theme-toggle" type="button" aria-label="Toggle theme">◐</button>
      </div>
    </header>`;

  if (footer) footer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div><a class="brand footer-brand" href="${depth}index.html"><span class="brand-mark">YG</span><span><strong>Yiga Gerald</strong><small>Prowess Technologies</small></span></a><p>Crafting tech-savvy minds.</p></div>
        <div><h3>Explore</h3><a href="${depth}pages/teaching.html">Teaching</a><a href="${depth}pages/projects.html">Projects</a><a href="${depth}tutorials/index.html">Tutorials</a></div>
        <div><h3>Learn</h3><a href="${depth}pages/resources.html">Resources</a><a href="${depth}assessments/index.html">Assessment Lab</a><a href="${depth}pages/contact.html">Contact</a></div>
      </div>
      <div class="container footer-bottom"><span>© <span data-year></span> Yiga Gerald</span><span>Built with HTML, CSS & JavaScript.</span></div>
    </footer>`;

  const menu = document.querySelector(".menu-toggle");
  const navEl = document.querySelector(".site-nav");
  menu?.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
  });

  document.querySelector(".theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("yg-theme", next);
  });
});
