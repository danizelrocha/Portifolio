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
