// Simpel mobilmenu
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
  });
}

// Sæt årstal i footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Simpel "fake" form-håndtering (kan senere kobles til backend/mail)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Ukendt";

    formStatus.textContent =
      "Tak for din forespørgsel, " + name + ". Vi vender tilbage hurtigst muligt.";
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 8000);
  });
}
