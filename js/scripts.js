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
    if (typeof pokemon === 'object' && Object.keys(pokemon) === 'name', 'type', 'height') {
      pokemonList.push(pokemon);
    }
  }

  return {
    add: add,
    getAll: getAll,
  };
}) ();

// Adding an item, which fullfill the criteria
pokemonRepository.add({name: 'Pikachu', type: ['electric'], height: 0.4});

// Adding an item, which does not fulfill the criterie of beeing an object
pokemonRepository.add('name: Pikachu, type: ["electric"], height: 0.4');

// Adding an item, which fullfill the criteria of beeing an object but not fullfilling the keys criteria
pokemonRepository.add({country: 'Germany', city: 'Berlin', type: 'capital city'});

// Prints the list with Pokémons, which are returned by the getAll()-function
pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.type.includes('poison')) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Beware I am a poisonous Pokémon</p>`);
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})<p>`);
  }
});
