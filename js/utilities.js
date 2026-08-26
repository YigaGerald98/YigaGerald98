document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(data.get("subject"));
      const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
      const email = "yigagerald98@gmail.com";
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      const status = document.querySelector("#form-status");
      if (status) status.textContent = "Opening your email application...";
    });
  }
});
