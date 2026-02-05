const discoveries = [
    { id: 1, name: 'Café Kitsuné', coords: [48.8634, 2.3320], price: '€€', rating: 4.8, visited: false },
    { id: 2, name: 'Galerie Vivienne', coords: [48.8682, 2.3394], price: 'Gratuit', rating: 4.9, visited: false },
    { id: 3, name: 'L\'As du Fallafel', coords: [48.8575, 2.3595], price: '€', rating: 4.9, visited: false }
];

let visitedCount = 0;
const map = L.map('map').setView([48.8600, 2.3450], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function renderCards(filterPrice = 'all') {
    const container = document.getElementById('discoveryCards');
    container.innerHTML = '';
    
    discoveries.filter(d => filterPrice === 'all' || d.price === filterPrice).forEach(place => {
        const card = document.createElement('div');
        card.className = `discovery-card ${place.visited ? 'visited' : ''}`;
        card.innerHTML = `
            <strong>${place.name}</strong><br>
            <small>${place.price} • ⭐ ${place.rating}</small>
            <div style="margin-top:10px;">
                <button onclick="event.stopPropagation(); openReview(${place.id}, '${place.name}')" style="font-size:0.7rem;">Noter</button>
            </div>
        `;
        card.onclick = () => {
            map.flyTo(place.coords, 17);
            if(!place.visited) {
                place.visited = true;
                visitedCount++;
                updateProgress();
                renderCards(filterPrice);
            }
        };
        container.appendChild(card);
    });
}

function updateProgress() {
    const percent = (visitedCount / discoveries.length) * 100;
    document.getElementById('progressBar').style.width = percent + '%';
    document.getElementById('progressText').textContent = `${visitedCount}/${discoveries.length} pépites`;
}

// Filtres
document.querySelectorAll('#priceFilters .filter-tab').forEach(btn => {
    btn.onclick = () => {
        document.querySelector('#priceFilters .active').classList.remove('active');
        btn.classList.add('active');
        renderCards(btn.dataset.price);
    };
});

// Modal Avis
let currentId = null;
function openReview(id, name) {
    currentId = id;
    document.getElementById('modalTitle').textContent = name;
    document.getElementById('reviewModal').style.display = 'flex';
}
function closeReview() { document.getElementById('reviewModal').style.display = 'none'; }
function submitReview() {
    alert("Merci pour votre avis !");
    closeReview();
}

// Partage
function shareItinerary() {
    navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('shareBtn');
    btn.textContent = "Lien copié !";
    btn.classList.add('share-success');
}

renderCards();