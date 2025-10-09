/* Animate on scroll */
const revealEls = document.querySelectorAll(".slide-up, .slide-left, .slide-right");
function reveal() {
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger)
      el.classList.add("visible");
  });
}
window.addEventListener("scroll", reveal);
reveal();

/* Header shrink */
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scrolled", window.scrollY > 60);
});

/* Tab switching */
document.querySelectorAll(".tab-btn").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

/* Mobile menu toggle */
const menuBtn = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
    nav.classList.remove("show");
  }
});

/* Helpers */
function buildMessage() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value;
  const plan = document.getElementById("plan").value;
  const msg = document.getElementById("message").value.trim();

  return `Salam! I would like to enroll in Learn Quran Online Academy.

👤 Name: ${name}
📧 Email: ${email}
📱 WhatsApp: ${phone}
🌍 Country: ${country}
📘 Plan: ${plan}
📝 Message: ${msg || "N/A"}`;
}

function validateForm() {
  const form = document.getElementById("enrollForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }
  return true;
}

/* Toast Notification */
function showToast(text = "Copied!") {
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* WhatsApp Enroll */
document.getElementById("whatsappBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  const message = encodeURIComponent(buildMessage());
  const desktopUrl = `whatsapp://send?phone=61420808755&text=${message}`;
  const webUrl = `https://wa.me/61420808755?text=${message}`;

  const a = document.createElement("a");
  a.href = desktopUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  setTimeout(() => {
    window.open(webUrl, "_blank");
  }, 800);
});

/* Email Enroll */
document.getElementById("emailBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  const message = encodeURIComponent(buildMessage());
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=saleemhafizj@gmail.com&su=Enrollment%20Request%20-%20Learn%20Quran%20Online&body=${message}`;
  window.open(gmailUrl, "_blank");
});

/* Copy Info Button */
document.getElementById("copyInfoBtn").addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm()) return;
  navigator.clipboard.writeText(buildMessage())
    .then(() => showToast("Information copied!"));
});
