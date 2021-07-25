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

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 0.6) {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - I am a small Pokémon</p>`);
  } else {
    document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);
  }
}
