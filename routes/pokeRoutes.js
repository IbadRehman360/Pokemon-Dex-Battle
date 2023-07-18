const express = require('express');
const router = express.Router();
const controllers = require('../controllers/pokeController');

router.get('/', function (req, res) {
    res.render('Pokemon/index.ejs');
});

router.get('/gallery', async (req, res) => {
    try {
        const pokemonData = await controllers.fetchPokeInfo();
        res.render('Pokemon/Pokegallery.ejs', { pokemonData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Pokémon data');
    }
});

router.get('/battle', function (req, res) {
  if (req.isAuthenticated()) {
      const username = req.user.username;
      res.render('Pokemon/Pokepick.ejs', { username });
  } else {
      res.redirect('/login'); 
  }
});


router.post('/battle', async (req, res) => {
    try {
      const { selectedname, numBots} = req.body;
      await controllers.fetchBattle(selectedname, numBots, res);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching Pokémon data');
    }
  });

module.exports = router;
