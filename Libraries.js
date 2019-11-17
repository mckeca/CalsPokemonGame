const pokeLib = {
  Bulbasaur: {
    name: 'Bulbasaur',
    type: 'grass',
    moves: ['tackle', 'vineWhip'],
    hitPoints: 150,
    attack: 50
  },
  Charmander: {
    name: 'Charmander',
    type: 'fire',
    moves: ['scratch', 'ember'],
    hitPoints: 140,
    attack: 60
  },
  Squirtle: {
    name: 'Squirtle',
    type: 'water',
    moves: ['scratch', 'waterGun'],
    hitPoints: 165,
    attack: 35
  },
  Pikachu: {
    name: 'Pikachu',
    type: 'electric',
    moves: ['tackle', 'vineWhip'],
    hitPoints: 135,
    attack: 65
  },
  Rattata: {
    name: 'Rattata',
    type: 'normal',
    moves: ['tackle', 'bite'],
    hitPoints: 120,
    attack: 60
  },
  Pidgey: {
    name: 'Pidgey',
    type: 'flying',
    moves: ['tackle', 'gust'],
    hitPoints: 130,
    attack: 45
  },
  Mankey: {
    name: 'Mankey',
    type: 'fighting',
    moves: ['scratch', 'karateChop'],
    hitPoints: 125,
    attack: 55
  }
};

const moveLib = {
  tackle: {
    power: 1.5,
    accuracy: 90,
    type: 'normal'
  },
  scratch: {
    power: 2.0,
    accuracy: 85,
    type: 'normal'
  },
  vineWhip: {
    power: 2.0,
    accuracy: 90,
    type: 'grass'
  },
  ember: {
    power: 2.5,
    accuracy: 80,
    type: 'fire'
  },
  waterGun: {
    power: 2.0,
    accuracy: 85,
    type: 'water'
  },
  thunderShock: {
    power: 2.0,
    accuracy: 85,
    type: 'electric'
  },
  bite: {
    power: 2.5,
    accuracy: 80,
    type: 'normal'
  },
  gust: {
    power: 2.0,
    accuracy: 85,
    type: 'flying'
  },
  karateChop: {
    power: 2.5,
    accuracy: 80,
    type: 'fighting'
  }
};

module.exports = { pokeLib, moveLib };
