const { Trainer, Pokemon, Battle } = require('./Constructors');
const { pokeLib } = require('./Libraries');
const inquirer = require('inquirer');

choices = {
  characterCreation: [
    {
      type: 'input',
      name: 'p1Name',
      message: 'Player 1: What is your name?'
    },
    {
      type: 'list',
      name: 'p1Starter',
      message: 'Choose your starter!',
      choices: ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu']
    },
    {
      type: 'input',
      name: 'p2Name',
      message: 'Player 2: What is your name?'
    },
    {
      type: 'list',
      name: 'p2Starter',
      message: 'Choose your starter!',
      choices: ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu']
    }
  ],
  battleOrCatch: [
    {
      type: 'list',
      name: 'battleOrCatch',
      message: 'Would you like to battle now or catch more Pokemon?',
      choices: ['Bring on the battle!', 'Gotta catch em all!']
    }
  ]
};

async function startGame() {
  await inquirer.prompt(choices.characterCreation).then(playerData => {
    playerOne = new Trainer(playerData.p1Name, playerData.p1Starter);
    playerTwo = new Trainer(playerData.p2Name, playerData.p2Starter);
  });
  battleCatch();
}

async function battleCatch() {
  await inquirer.prompt(choices.battleOrCatch).then(firstChoice => {
    if (firstChoice.battleOrCatch === 'Bring on the battle!') {
      console.log('Battle! Go!');
      const battleInstance = new Battle(playerOne, playerTwo);
      console.log(`${playerOne.name} sent out ${playerOne.activePoke.name}!`);
      console.log(`${playerTwo.name} sent out ${playerTwo.activePoke.name}!`);
      battleInstance.fight();
    } else if (firstChoice.battleOrCatch === 'Gotta catch em all!') {
      playerOneCatch();
    }
  });
}

async function playerOneCatch() {
  const pokeArray = Object.keys(pokeLib);
  const pokeOne =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  const pokeTwo =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  const pokeThree =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'catchablePoke',
        message:
          'A pack of wild pokemon appears! Which one would you like to catch?',
        choices: [pokeOne, pokeTwo, pokeThree]
      }
    ])
    .then(chosenPoke => {
      playerOne.catch(chosenPoke.catchablePoke);
      playerTwoCatch();
    });
}

async function playerTwoCatch() {
  const pokeArray = Object.keys(pokeLib);
  const pokeOne =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  const pokeTwo =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  const pokeThree =
    pokeArray[Math.floor(Math.random() * Math.floor(pokeArray.length))];
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'catchablePoke',
        message:
          'A pack of wild pokemon appears! Which one would you like to catch?',
        choices: [pokeOne, pokeTwo, pokeThree]
      }
    ])
    .then(chosenPoke => {
      playerTwo.catch(chosenPoke.catchablePoke);
      battleCatch();
    });
}

startGame();
