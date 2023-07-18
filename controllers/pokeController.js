const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'https://pokeapi.co/api/v2';

exports.fetchPokeInfo = async function fetchPokeInfo() {
    try {
        const response = await axios.get(`${BASE_URL}/pokemon?limit=90`);
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
        return pokemonData;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching Pokémon data');
    }
};

exports.fetchBotData = async () => {
    try {
        const randomPokemonIndex = Math.floor(Math.random() * 1000) + 1;
        const apiUrl = `${BASE_URL}/pokemon/${randomPokemonIndex}`;
        const response = await axios.get(apiUrl);
        const randomPokemonData = response.data;
        const { name, sprites, stats, types, height, weight } = randomPokemonData;
        return { name, sprites, stats, types, height, weight };
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching Pokémon data');
    }
};

exports.fetchBattle = async function fetchBotPoke(selectedname, numBots, res) {
    try {
        const botResults = [];
        for (let i = 0; i < numBots; i++) {
            const botResult = await exports.fetchBotData(); 
            botResults.push(botResult);
        }

        res.render('Pokemon/Pokebattle.ejs', { selectedBots: numBots, botResults, selectedname });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Pokémon data');
    }
};



// * logic for if userwanna select pokemon by name

// !  module.exports.fetchUserPoke = async function fetchUserPoke(pokemonName) {
// !  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

//  ! try {
//  !   const response = await axios.get(apiUrl);
//  !   const pokemonData = response.data;
//  !   const { name, sprites, stats, types, height, weight } = pokemonData;
//  !   return { name, sprites, stats, types, height, weight };
//  ! } catch (error) {
//  !   console.error(error);
//  !   throw new Error('Error fetching Pokémon data');
// !  }
// ! };

// * END HERE
