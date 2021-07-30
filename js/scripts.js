let pokemonRepository = (function () {
  // Creating an empty ARRAY for the Pokémons
  let pokemonList = [];
  // Assigning the API Url to a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  // Declaring a function to load the list of Pokémons from the url and to add the into the pokemonList array
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.log(e);
    })
  }

  // Function to create a list of Pokémons
  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    list.appendChild(listItem);
    // Printing the Pokémons name to console when clicked
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  // Loading the deatils from the url and adding them to the Pokémons
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  // Fucntion created for eventListener
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
}) ();

// Loading the list of Pokémons from the Url and adding them to the pokemonList array
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
