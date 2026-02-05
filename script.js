function moveCarousel(gridId, direction) {
    const grid = document.getElementById(gridId);
    const scrollAmount = 320; // Largeur d'une carte + gap
    grid.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}
