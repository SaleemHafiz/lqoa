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

/* Country-based WhatsApp number */
async function setWhatsAppNumber() {
  const phoneNumbers = {
    AU: { num: "61420808755", display: "+61 420 808 755" },
    UK: { num: "447400123456", display: "+44 7400 123456" },
    AE: { num: "971501234567", display: "+971 50 123 4567" },
    PK: { num: "923001234567", display: "+92 300 1234567" },
  };

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    const code = data.country_code || "AU";
    const info = phoneNumbers[code] || phoneNumbers["AU"];

    // Update contact section number
    const link = document.getElementById("whatsapp-link");
    link.href = `https://wa.me/${info.num}?text=Salam%20I%20want%20to%20learn%20Quran%20Online`;
    link.textContent = info.display;

    // Also update enrollment WhatsApp button
    document
      .getElementById("whatsappBtn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const message = encodeURIComponent(buildMessage());
        const desktopUrl = `whatsapp://send?phone=${info.num}&text=${message}`;
        const webUrl = `https://wa.me/${info.num}?text=${message}`;

        const a = document.createElement("a");
        a.href = desktopUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 800);
      });
  } catch (err) {
    console.error("Location fetch failed:", err);
    // fallback (Australia)
    const link = document.getElementById("whatsapp-link");
    link.href = `https://wa.me/61420808755?text=Salam%20I%20want%20to%20learn%20Quran%20Online`;
    link.textContent = "+61 420 808 755";
  }
}

setWhatsAppNumber();
