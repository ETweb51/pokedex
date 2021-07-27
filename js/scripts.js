let pokemonList = [
  {
    name : 'Bulbasaur',
    type : ['grass', 'poison'],
    height : 0.7
  },

  {
    name : 'Charmander',
    type : 'fire',
    height : 0.6
  },

  {
    name : 'Squirtle',
    type : 'water',
    height : 0.5
  }
];

pokemonList.forEach(function(pokemon) {
  if (pokemon.type.includes('poison')) {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height}) - Beware I am a poisonous Pokémon</p>`);
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})<p>`);
  }
});
