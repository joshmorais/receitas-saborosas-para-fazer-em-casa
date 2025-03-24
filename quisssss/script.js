function goToPage(page) {
    const pages = document.querySelectorAll('.quiz-page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById('page' + page).style.display = 'block';
}

// Inicia com a Página 1 visível
document.addEventListener('DOMContentLoaded', () => {
    goToPage(1);
});
