let pokemonRepository = (function() {
  let pokemonList = [
    {
      name : 'Bulbasaur',
      type : ['grass', 'poison'],
      height : 0.7
    },

    {
      name : 'Charmander',
      type : ['fire'],
      height : 0.6
    },

    {
      name : 'Squirtle',
      type : ['water'],
      height : 0.5
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon).includes('name') && Object.keys(pokemon).includes('type') && Object.keys(pokemon).includes('height')) {
      pokemonList.push(pokemon);
    }
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
  // Fucntion created for eventListener
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
}) ();

// Prints the list with Pokémons
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
