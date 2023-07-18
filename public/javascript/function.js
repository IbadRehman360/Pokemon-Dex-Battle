const axios = require('axios');

// logic for if userwanna select pokemon by name

// module.exports.fetchUserPoke = async function fetchUserPoke(pokemonName) {
//   const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const pokemonData = response.data;
//     const { name, sprites, stats, types, height, weight } = pokemonData;
//     return { name, sprites, stats, types, height, weight };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error fetching Pokémon data');
//   }
// };


module.exports.fetchPokeInfo = async function fetchPokeINFO(data)  {
  try {
  const response = await axios.get(`${BASE_URL}/pokemon?limit=150`);
  const pokemons = response.data.results;
  const pokemonData = await Promise.all(
      pokemons.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          return {
              name: pokemonResponse.data.name,
              image: pokemonResponse.data.sprites.front_default,
          };
      })
  );
  res.render('Pokemon/Pokegallery.ejs', { pokemonData });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}} 

module.exports.fetchBotPoke = async function fetchBotPoke() {
  try {
    const randomPokemonIndex = Math.floor(Math.random() * 1000) + 1;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemonIndex}`;
    const response = await axios.get(apiUrl);
    const randomPokemonData = response.data;
    const { name, sprites, stats, types, height, weight } = randomPokemonData;
    return { name, sprites, stats, types, height, weight };
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching Pokémon data');
  }
};
