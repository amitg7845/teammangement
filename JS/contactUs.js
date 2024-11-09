var map = L.map('map').setView([19.193470, 72.859700], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([19.193470, 72.859700]).addTo(map)
// .bindPopup('A sample marker.')
// .openPopup();
