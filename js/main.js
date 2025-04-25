// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form data:', data);
        
        // Show success message
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        this.reset();
    });
}

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add animation to skill boxes
document.querySelectorAll('.skill-box').forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Botón Volver Arriba
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Modo Oscuro
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// Verificar preferencia guardada
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Animaciones al Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .card, .timeline-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Contador de Visitas
const visitCountElement = document.querySelector('.visit-count');
if (visitCountElement) {
    const updateVisitCount = () => {
        let count = localStorage.getItem('visitCount') || 0;
        count = parseInt(count) + 1;
        localStorage.setItem('visitCount', count);
        visitCountElement.textContent = count;
    };
    updateVisitCount();
}

// Notificaciones
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Formulario de Contacto
const contactFormElement = document.querySelector('#contactForm');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactFormElement);
        const data = Object.fromEntries(formData);
        
        try {
            const response = await fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Mensaje enviado correctamente');
                contactFormElement.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            showNotification('Error al enviar el mensaje', 'error');
        }
    });
}

// Filtro de Tecnologías
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.tech.includes(filter)) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const tooltip = element.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = element.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }
    });
});

// Lazy Loading de Imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Contador de Estadísticas
const statsElements = document.querySelectorAll('.stats-counter');
statsElements.forEach(element => {
    const target = parseInt(element.textContent);
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const updateCount = () => {
        count += increment;
        if (count < target) {
            element.textContent = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    };
    
    updateCount();
});

// Inicializar todas las animaciones
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const texts = [
        "Ingeniero de sistemas",
        "Especialista en Ciberseguridad",
        "Desarrollador Fullstack",
        "Soporte TI"
    ];
    const element = document.getElementById('typewriter2');
    let currentText = 0;
    let i = 0;
    let isDeleting = false;
    const writeSpeed = 80; // Velocidad de escritura más lenta
    const deleteSpeed = 50; // Velocidad de borrado más lenta
    const pause = 1800; // Pausa más larga entre textos

    function typeWriter() {
        const currentString = texts[currentText];
        
        if (isDeleting) {
            // Borrando
            element.textContent = currentString.substring(0, i - 1);
            i--;
            if (i === 0) {
                isDeleting = false;
                currentText = (currentText + 1) % texts.length;
                setTimeout(typeWriter, 1000); // Pausa antes de empezar a escribir
            } else {
                setTimeout(typeWriter, deleteSpeed);
            }
        } else {
            // Escribiendo
            element.textContent = currentString.substring(0, i + 1);
            i++;
            if (i === currentString.length) {
                isDeleting = true;
                setTimeout(typeWriter, pause); // Pausa antes de borrar
            } else {
                setTimeout(typeWriter, writeSpeed);
            }
        }
    }

    // Limpiar el contenido inicial y comenzar la animación
    if (element) {
        element.textContent = '';
        element.style.opacity = '1';
        setTimeout(typeWriter, 1000); // Pausa inicial más larga
    }
}); 