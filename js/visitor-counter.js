// Contador de visitas
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el contador del localStorage o inicializarlo
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 0;
    }
    
    // Incrementar el contador
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    
    // Mostrar el contador
    const counterElement = document.getElementById('visitor-counter');
    if (counterElement) {
        counterElement.textContent = `Visitas: ${visitCount}`;
    }
}); 