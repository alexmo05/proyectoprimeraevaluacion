const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

// Filtrar por tipo y rareza
const typeSelect = document.getElementById('type');
const raritySelect = document.getElementById('rarity');

// Realizar búsqueda
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  const type = typeSelect.value;  // Obtener el tipo seleccionado
  const rarity = raritySelect.value;  // Obtener la rareza seleccionada

  if (!query) return alert('Por favor, escribe un nombre para buscar.');

  let url = `https://api.pokemontcg.io/v2/cards?q=name:${query}`;

  // Filtrar por tipo si se ha seleccionado uno
  if (type !== 'all') {
    url += `+types:${type}`;
  }

  // Filtrar por rareza si se ha seleccionado una
  if (rarity !== 'all') {
    url += `+rarity:${rarity}`;
  }

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('No se encontraron resultados.');
      return response.json();
    })
    .then(data => {
      resultsDiv.innerHTML = ''; // Limpiar resultados anteriores
      data.data.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
          <h3>${card.name}</h3>
          <img src="${card.images.small}" alt="${card.name}">
          <p>Tipo: ${card.types.join(', ')}</p>
          <p>Rareza: ${card.rarity}</p>
        `;
        resultsDiv.appendChild(cardElement);
      });
    })
    .catch(error => {
      alert(error.message);
    });
});
