// ==============================
//  OPEN CLOSED MENU MOBILE BUTON
// ==============================

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');

function toggleMenu() {
    menu.classList.toggle('open-menu');
}

btnMenu.addEventListener('click', toggleMenu);
menu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);


// =====================
// SOCIAL MEDIA BUTTONS
// =====================

function setupSocialButtons() {
    const socialLinks = [
        "https://instagram.com/danizelrocha/",
        "https://linkedin.com/in/daniel-alves-da-rocha/",
        "https://medium.com/@danizelrocha",
        "https://github.com/danizelrocha"      
    ];
    
    // Seleciona TODOS os botões sociais, independentemente de onde estão
    const buttons = document.querySelectorAll('.btn-social a.social-link');
    
    buttons.forEach((button, index) => {
        const linkIndex = index % socialLinks.length; // Para evitar erros se houver mais botões que links
        button.href = socialLinks[linkIndex];
        button.target = '_blank';
        
        // Remove o conteúdo desnecessário, mantendo apenas o ícone
        const icon = button.querySelector('i');
        if (icon) {
            button.innerHTML = '';
            button.appendChild(icon);
        }
    });
}

document.addEventListener('DOMContentLoaded', setupSocialButtons);



// ==============
// SUBMIT E-MAIL
// ==============
// Função para mostrar mensagem de agradecimento
// Função para mostrar mensagem de agradecimento melhorada
function showThankYouMessage() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'floating-message message-success';
  msgDiv.innerHTML = `
    <svg class="message-icon" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
    </svg>
    <div class="message-content">
      <strong>Obrigado pelo seu contato!</strong>
      <div style="margin-top: 5px; font-size: 0.9em;">
        Sua mensagem foi enviada com sucesso para danizelrocha@gmail.com.<br>
        Agradeço pelo contato e responderei o mais breve possível.
      </div>
    </div>
  `;
  
  document.body.appendChild(msgDiv);
  
  // Remove a mensagem após 8 segundos
  setTimeout(() => {
    msgDiv.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => msgDiv.remove(), 300);
  }, 8000);
}

// Função para mensagens de erro
function showAlert(message, type = 'error') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `floating-message message-${type}`;
  alertDiv.textContent = message;
  
  document.body.appendChild(alertDiv);
  
  setTimeout(() => {
    alertDiv.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => alertDiv.remove(), 300);
  }, 5000);
}

// Configuração completa do envio do formulário
function setupFormSubmission() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btnEnviar = this.querySelector('[type="submit"]');
    const textoOriginal = btnEnviar.value;
    
    // Feedback visual do botão
    btnEnviar.value = "Enviando...";
    btnEnviar.disabled = true;
    btnEnviar.classList.add('form-submit-btn');
    
    try {
      // Simulação de envio (substitua pela sua API real)
      const response = await fetch(this.action || 'https://formsubmit.co/danizelrocha@gmail.com', {
        method: 'POST',
        body: new FormData(this),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        showThankYouMessage();
        this.reset();
        
        // Focar no primeiro campo após envio (opcional)
        setTimeout(() => {
          const firstInput = this.querySelector('input, textarea');
          if (firstInput) firstInput.focus();
        }, 500);
      } else {
        throw new Error('Falha no envio. Status: ' + response.status);
      }
    } catch (error) {
      showAlert('Erro: ' + error.message);
      console.error('Erro no envio:', error);
    } finally {
      // Restaura o botão independente do resultado
      setTimeout(() => {
        btnEnviar.value = textoOriginal;
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('form-submit-btn');
      }, 1000);
    }
  });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  setupFormSubmission();
  
  // Adiciona o input reset hidden se não existir
  if (!document.getElementById('reset-form')) {
    const resetInput = document.createElement('input');
    resetInput.type = 'reset';
    resetInput.id = 'reset-form';
    resetInput.style.display = 'none';
    document.body.appendChild(resetInput);
  }
});