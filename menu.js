// ==============================
//  OPEN CLOSED MENU MOBILE BUTON
// ==============================

const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay-menu");

function toggleMenu() {
  menu.classList.toggle("open-menu");
}

btnMenu.addEventListener("click", toggleMenu);
menu.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// =====================
// SOCIAL MEDIA BUTTONS
// =====================

function setupSocialButtons() {
  const socialLinks = [
    "https://instagram.com/danizelrocha/",
    "https://linkedin.com/in/daniel-alves-da-rocha/",
    "https://medium.com/@danizelrocha",
    "https://github.com/danizelrocha",
  ];

  // Selects ALL social buttons, regardless of where they are
  const buttons = document.querySelectorAll(".btn-social a.social-link");

  buttons.forEach((button, index) => {
    const linkIndex = index % socialLinks.length; // To avoid errors if there are more buttons than links
    button.href = socialLinks[linkIndex];
    button.target = "_blank";

    // Remove unnecessary content, keeping only the icon
    const icon = button.querySelector("i");
    if (icon) {
      button.innerHTML = "";
      button.appendChild(icon);
    }
  });
}

document.addEventListener("DOMContentLoaded", setupSocialButtons);

// ==============
// SUBMIT E-MAIL
// ==============

// Constants for reuse
const DEFAULT_SUCCESS_DURATION = 8000;
const DEFAULT_ERROR_DURATION = 5000;

function showMessage(
  content = "",
  type = "success",
  duration = type === "success"
    ? DEFAULT_SUCCESS_DURATION
    : DEFAULT_ERROR_DURATION
) {
  const iconPaths = {
    success: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z",
    error:
      "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  };

  const msgDiv = document.createElement("div");
  msgDiv.className = `floating-message message-${type}`;

  msgDiv.innerHTML = `
        <svg class="message-icon" viewBox="0 0 24 24">
            <path d="${iconPaths[type]}"/>
        </svg>
        ${
          type === "success"
            ? `
        <div class="message-content">
            <strong>Obrigado pelo seu contato!</strong>
            <div class="message-detail">
                Sua mensagem foi enviada com sucesso para danizelrocha@gmail.com<br>
                Agradeço pelo contato e responderei em breve.
            </div>
        </div>
        `
            : `<div class="message-text">${content}</div>`
        }
    `;

  document.body.appendChild(msgDiv);

  setTimeout(() => {
    msgDiv.style.animation = "fadeOut 0.3s ease-out forwards";
    setTimeout(() => msgDiv.remove(), 300);
  }, duration - 300);
}

// Send function
async function handleFormSubmit(form) {
  const btnSubmit = form.querySelector('[type="submit"]');
  const originalText = btnSubmit.value;

  btnSubmit.value = "Enviando...";
  btnSubmit.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok)
      throw new Error(`Erro ${response.status}: ${response.statusText}`);

    showMessage("", "success");
    form.reset();
    form.querySelector("input, textarea")?.focus();
  } catch (error) {
    showMessage(
      error.message.includes("Erro") ? error.message : `Erro: ${error.message}`,
      "error"
    );
    console.error("Erro no envio:", error);
  } finally {
    btnSubmit.value = originalText;
    btnSubmit.disabled = false;
  }
}

function setupFormSubmission() {
  document.querySelector("form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(e.target);
  });
}

document.addEventListener("DOMContentLoaded", setupFormSubmission);
