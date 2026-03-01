// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header?.offsetHeight || 70;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de fade-in para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.cert-card, .skill-category, .contato-item').forEach(el => {
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm?.querySelector('button[type="submit"]');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validação simples
    if (!data.name || !data.email || !data.message) {
        showNotification('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, insira um email válido.', 'error');
        return;
    }
    
    // Simular envio
    if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
        submitBtn.disabled = true;
        
        try {
            // Simular delay de envio
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Aqui você normalmente enviaria os dados para um servidor
            console.log('Dados do formulário:', data);
            
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});

// Validação de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos para notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Adicionar evento de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }
    }, 5000);
}

// Efeito de digitação para o título (opcional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Animação de contador para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observar estatísticas para animação
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect para hero section (opcional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Carregar mais certificações (se houver)
function loadMoreCerts() {
    const certContainer = document.querySelector('.certificacoes-grid');
    const moreCerts = [
        {
            icon: 'fas fa-certificate',
            title: 'M365 Fundamentals',
            code: 'MS-900',
            level: 'Fundamentals'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Network Security',
            code: 'NSE-1',
            level: 'Professional'
        }
    ];
    
    moreCerts.forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = 'cert-card fade-in-up';
        certCard.innerHTML = `
            <div class="cert-icon">
                <i class="${cert.icon}"></i>
            </div>
            <h3>${cert.title}</h3>
            <p>${cert.code}</p>
            <span class="cert-badge">${cert.level}</span>
        `;
        certContainer.appendChild(certCard);
    });
}

// Verificar se o usuário está offline
window.addEventListener('offline', () => {
    showNotification('Você está offline. Algumas funcionalidades podem estar indisponíveis.', 'error');
});

window.addEventListener('online', () => {
    showNotification('Conexão restaurada!', 'success');
});

// Console log para debugging
console.log('%c🚀 Portfólio de Carlos Freitas', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%c📧 Contato: carloscesarcorp@outlook.com', 'color: #6b7280; font-size: 14px;');
console.log('%c🔗 LinkedIn: linkedin.com/in/carlos-silva-freitas', 'color: #6b7280; font-size: 14px;');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfólio carregado com sucesso!');
    
    // Adicionar classe de suporte a JavaScript
    document.body.classList.add('js-enabled');
    
    // Remover preload class (se existir)
    document.body.classList.remove('preload');
});