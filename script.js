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
              <button class="favorite-btn" 
                      data-id="${card.id}" 
                      data-name="${card.name}" 
                      data-image="${card.images.small}" 
                      data-type="${card.types.join(', ')}" 
                      data-rarity="${card.rarity}">⭐ Añadir a favoritos</button>
          `;
          resultsDiv.appendChild(cardElement);
      });
  })
  .catch(error => {
      alert(error.message);
  });
});

// Delegar eventos para botones dentro de las tarjetas
resultsDiv.addEventListener('click', (e) => {
if (e.target.classList.contains('favorite-btn')) {
  // Captura los datos directamente del botón
  const cardData = {
      id: e.target.dataset.id,
      name: e.target.dataset.name,
      image: e.target.dataset.image,
      type: e.target.dataset.type,
      rarity: e.target.dataset.rarity
  };
  addToFavorites(cardData);
}
});

// Función para añadir a favoritos
function addToFavorites(card) {
// Cargar favoritos existentes desde localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Verificar si ya está en favoritos
if (favorites.some(fav => fav.id === card.id)) {
  alert('Esta carta ya está en favoritos.'); // Mostrar alerta y salir
  return;
}

// Si no está, agregarla
favorites.push(card);
localStorage.setItem('favorites', JSON.stringify(favorites));
alert('Carta añadida a favoritos.');
}

// Mostrar favoritos
favoritesButton.addEventListener('click', () => {
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

if (favorites.length === 0) {
  resultsDiv.innerHTML = '<p>No tienes cartas en favoritos.</p>';
  return;
}

favorites.forEach(card => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.innerHTML = `
      <h3>${card.name}</h3>
      <img src="${card.image}" alt="${card.name}">
      <p>Tipo: ${card.type}</p>
      <p>Rareza: ${card.rarity}</p>
      <button class="remove-favorite-btn" data-id="${card.id}">❌ Eliminar favoritos</button>
  `;
  resultsDiv.appendChild(cardElement);
});
});

// Delegar eventos para eliminar de favoritos
resultsDiv.addEventListener('click', (e) => {
if (e.target.classList.contains('remove-favorite-btn')) {
  const id = e.target.dataset.id;
  removeFromFavorites(id);
}
});

// Función para eliminar de favoritos
function removeFromFavorites(id) {
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
favorites = favorites.filter(fav => fav.id !== id); // Eliminar por ID
localStorage.setItem('favorites', JSON.stringify(favorites));
alert('Carta eliminada de favoritos.');

// Actualizar vista de favoritos
favoritesButton.click();
}




document.getElementById('searchButton').addEventListener('click', function() {
  // Obtener el contenedor de la página (body)
  const body = document.body;
  
  // Añadir o quitar la clase 'hide-margins' al body
  body.classList.toggle('hide-margins');
  
  // Aquí puedes agregar el código para hacer la búsqueda, si es necesario
  // (Por ejemplo, mostrar resultados de búsqueda en la sección #results)
  
  // Evitar que el formulario se recargue
  event.preventDefault();
});


