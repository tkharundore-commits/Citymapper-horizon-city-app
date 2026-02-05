const discoveries = [
    { id: 1, name: 'Café Kitsuné', coords: [48.8634, 2.3320], category: 'cafe', price: '€€', rating: 4.8 },
    { id: 2, name: 'Galerie Vivienne', coords: [48.8682, 2.3394], category: 'culture', price: 'Gratuit', rating: 4.9 },
    { id: 3, name: 'L\'As du Fallafel', coords: [48.8575, 2.3595], category: 'food', price: '€', rating: 4.9 }
];

const map = L.map('map').setView([48.8600, 2.3450], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function renderCards(filter = 'all') {
    const container = document.getElementById('discoveryCards');
    container.innerHTML = '';
    
    discoveries.filter(d => filter === 'all' || d.category === filter).forEach(place => {
        const card = document.createElement('div');
        card.className = 'discovery-card';
        card.innerHTML = `<strong>${place.name}</strong><br><small>${place.category} • ⭐ ${place.rating}</small>`;
        card.onclick = () => map.flyTo(place.coords, 17);
        container.appendChild(card);
        L.marker(place.coords).addTo(map).bindPopup(place.name);
    });
}

// Simulation de recherche de destination
document.getElementById('endInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const destination = e.target.value;
        document.getElementById('currentRouteTitle').innerText = `Vers ${destination}`;
        alert(`Horizon analyse votre trajet vers ${destination}... 6 pépites trouvées !`);
        map.flyTo([48.8575, 2.3595], 15);
    }
});

renderCards();
