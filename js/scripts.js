let pokemonRepository = (function () {

  // Creating an empty ARRAY for the Pokémons
  let pokemonList = [];
  // Assigning the API Url to a variable
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    }
  }

  // Function to create a list of Pokémons
  function addListItem(pokemon) {
    let list = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');
    let button = document.createElement('button')
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add('btn-list');
    button.setAttribute('data-target', '#pokeModal');
    button.setAttribute('data-toggle', 'modal');
    listItem.appendChild(button);
    list.appendChild(listItem);
    // Printing the Pokémons name to console when clicked
    button.addEventListener('click', function () {
      console.log(pokemon);
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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      for (let i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
        for (let i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  // Function to show the modal with its data
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalBody.empty();
    modalTitle.empty();

    let poke = pokemon.name.toUpperCase();

    let pokeName = $(`<h1>${poke}</h1>`);
    let imgFront = $('<img class="modal-img" style="width:50%">');
    imgFront.attr('src', pokemon.imageUrlFront);
    let imgBack = $('<img class="modal-img" style="width:50%">');
    imgBack.attr('src', pokemon.imageUrlBack);
    let pokeType = $(`<p>Type: ${pokemon.types}</p>`);
    let pokeHeight = $(`<p>Height: ${pokemon.height}</p>`);
    let pokeWeight = $(`<p>Weight: ${pokemon.weight}</p>`);
    let pokeAbilities = $(`<p>Abilities: ${pokemon.abilities}</p>`);

    modalTitle.append(pokeName);
    modalBody.append(imgFront);
    modalBody.append(imgBack);
    modalBody.append(pokeType);
    modalBody.append(pokeHeight);
    modalBody.append(pokeWeight);
    modalBody.append(pokeAbilities);
  }

  // Fucntion created for eventListener
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
}) ();

// Loading the list of Pokémons from the Url and adding them to the pokemonList array
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
