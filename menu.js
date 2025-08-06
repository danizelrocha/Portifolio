// ==============================
//  OPEN CLOSED MENU MOBILE BUTTON (VERSÃO CORRIGIDA)
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  // Elementos do DOM
  const btnMenu = document.getElementById("btn-menu");
  const menuMobile = document.getElementById("menu-mobile");
  const overlayMenu = document.getElementById("overlay-menu");
  const btnClose = document.querySelector(".btn-close");
  const body = document.body;
  const navDesktop = document.querySelector(".menu-desktop .nav-list");

  // Função para abrir/fechar menu
  function toggleMenu() {
    if (!menuMobile.classList.contains("open-menu")) {
      // Clona os itens do desktop (exceto mobile-only)
      const navMobile = navDesktop.cloneNode(true);
      const mobileOnlyItems = navMobile.querySelectorAll(".mobile-only");
      mobileOnlyItems.forEach((item) => item.remove());

      // Adiciona o item Contato
      const contactItem = document.createElement("li");
      contactItem.innerHTML = '<a href="#contato">Contato</a>';
      navMobile.appendChild(contactItem);

      // Injeta no menu mobile
      const menuContent = menuMobile.querySelector(".menu-content");
      menuContent.innerHTML = "";
      menuContent.appendChild(document.createElement("nav")).appendChild(navMobile);
    }

    menuMobile.classList.toggle("open-menu");
    body.classList.toggle("menu-open");
    overlayMenu.style.display = menuMobile.classList.contains("open-menu") ? "block" : "none";
    
    // Acessibilidade: Foca no botão apropriado
    if (menuMobile.classList.contains("open-menu")) {
      btnClose.focus();
    } else {
      btnMenu.focus();
    }
  }

  // Event listeners para abrir/fechar menu
  btnMenu.addEventListener("click", toggleMenu);
  btnClose.addEventListener("click", toggleMenu);
  overlayMenu.addEventListener("click", toggleMenu);

  // ==============================
  //  NAVEGAÇÃO COM FECHAMENTO DO MENU (CORREÇÃO PRINCIPAL)
  // ==============================
  function handleMenuLinkClick(e) {
    // Fecha o menu primeiro
    if (menuMobile.classList.contains("open-menu")) {
      toggleMenu();
    }
    
    // Rolagem suave será tratada pelo CSS (scroll-behavior: smooth)
    // Não precisa prevenir o comportamento padrão se os IDs estiverem corretos
  }

  // Adiciona event listeners aos links do menu mobile
  menuMobile.addEventListener("click", function(e) {
    // Verifica se o clique foi em um link âncora
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      handleMenuLinkClick(e);
    }
  });

  // ==============================
  //  HIGHLIGHT ACTIVE SECTION
  // ==============================
  function highlightActiveSection() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-list a, .menu-mobile nav a");

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${section.id}`) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      }
    });
  }

  // Ativa o highlight quando a página é rolada
  window.addEventListener("scroll", highlightActiveSection);
  highlightActiveSection();
});

// ... (o resto do seu código permanece igual)

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

  document.querySelectorAll(".btn-social a.social-link").forEach((button, index) => {
    const linkIndex = index % socialLinks.length;
    button.href = socialLinks[linkIndex];
    button.target = "_blank";
    button.rel = "noopener noreferrer"; // Segurança
    
    // Acessibilidade
    const platform = ["Instagram", "LinkedIn", "Medium", "GitHub"][linkIndex];
    button.setAttribute("aria-label", `Meu perfil no ${platform}`);
    
    // Mantém apenas o ícone
    const icon = button.querySelector("i");
    if (icon) {
      button.innerHTML = "";
      button.appendChild(icon);
    }
  });
}

// ==============
// SUBMIT E-MAIL
// ==============
const DEFAULT_SUCCESS_DURATION = 8000;
const DEFAULT_ERROR_DURATION = 5000;

function showMessage(content = "", type = "success", duration = type === "success" 
  ? DEFAULT_SUCCESS_DURATION 
  : DEFAULT_ERROR_DURATION) {
  
  const iconPaths = {
    success: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z",
    error: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  };

  const msgDiv = document.createElement("div");
  msgDiv.className = `floating-message message-${type}`;
  msgDiv.setAttribute("role", "alert");
  msgDiv.setAttribute("aria-live", "assertive");

  msgDiv.innerHTML = `
    <svg class="message-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="${iconPaths[type]}"/>
    </svg>
    ${type === "success" ? `
      <div class="message-content">
        <strong>Obrigado pelo seu contato!</strong>
        <div class="message-detail">
          Sua mensagem foi enviada com sucesso para danizelrocha@gmail.com<br>
          Agradeço pelo contato e responderei em breve.
        </div>
      </div>
    ` : `<div class="message-text">${content}</div>`}
  `;

  document.body.appendChild(msgDiv);

  setTimeout(() => {
    msgDiv.style.animation = "fadeOut 0.3s ease-out forwards";
    setTimeout(() => msgDiv.remove(), 300);
  }, duration - 300);
}

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

    if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);

    showMessage("", "success");
    form.reset();
  } catch (error) {
    showMessage(
      error.message.includes("Erro") ? error.message : `Erro: ${error.message}`,
      "error"
    );
  } finally {
    btnSubmit.value = originalText;
    btnSubmit.disabled = false;
  }
}

function setupFormSubmission() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleFormSubmit(e.target);
  });

  // Acessibilidade: Validação
  form.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("invalid", () => {
      input.setAttribute("aria-invalid", "true");
    });
    input.addEventListener("input", () => {
      if (input.validity.valid) {
        input.removeAttribute("aria-invalid");
      }
    });
  });
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  setupSocialButtons();
  setupFormSubmission();
});