let pokemonRepository = (function () {
  // Code for the modul
  let modalContainer = document.querySelector('#modal-container');

  // Function to show the modal with its data
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.toUpperCase();
    titleElement.classList.add('title');

    let heightElement = document.createElement('p');
    heightElement.innerText = `Height: ${pokemon.height}`;
    heightElement.classList.add('height');

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl;
    imgElement.classList.add('img');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    modal.appendChild(titleElement);
    modal.appendChild(heightElement);
    modal.appendChild(imgElement);
    modal.appendChild(closeButtonElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    if(e.target === modalContainer) {
      hideModal();
    }
  });


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
      showModal(pokemon);
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
