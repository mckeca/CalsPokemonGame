const { pokeLib, moveLib } = require('./Libraries');
const inquirer = require('inquirer');

class Trainer {
  constructor(name, starter) {
    this.name = name;
    const myStarter = new Pokemon(starter);
    this.party = [myStarter];
    this.activePoke = this.party[0];
  }

  catch(pokemon) {
    if (this.party.length < 6) {
      this.party.push(new Pokemon(pokemon));
      console.log(`${this.name} added ${pokemon} to their party!`);
    } else {
      console.log('Your party is full!');
    }
  }
}

class Pokemon {
  constructor(name) {
    this.name = pokeLib[name].name;
    this.type = pokeLib[name].type;
    this.moves = pokeLib[name].moves;
    this.fainted = false;
    this.hitPoints =
      pokeLib[name].hitPoints + this.getVariance(pokeLib[name].hitPoints);
    this.attack = pokeLib[name].attack + this.getVariance(pokeLib[name].attack);
  }

  getVariance(base, percent = 5) {
    return Math.floor(Math.random() * Math.floor(base / percent));
  }

  useMove(move, opponent) {
    console.log(`${this.name} used ${move}!`);
    let movePower = moveLib[move].power * this.attack;
    if (move.type === opponent.type && move.type !== 'normal') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'grass' && opponent.type === 'fire') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'grass' && opponent.type === 'water') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'grass' && opponent.type === 'flying') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'fire' && opponent.type === 'grass') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'fire' && opponent.type === 'water') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'water' && opponent.type === 'fire') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'water' && opponent.type === 'grass') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'electric' && opponent.type === 'water') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'electric' && opponent.type === 'grass') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'electric' && opponent.type === 'flying') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'flying' && opponent.type === 'grass') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'flying' && opponent.type === 'fighting') {
      movePower = movePower * 1.25;
    } else if (move.type === 'flying' && opponent.type === 'electric') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    } else if (move.type === 'fighting' && opponent.type === 'normal') {
      movePower = movePower * 1.25;
      console.log('It was super effective!');
    } else if (move.type === 'fighting' && opponent.type === 'flying') {
      movePower = movePower * 0.75;
      console.log('It was not very effective.');
    }
    console.log(`${opponent.name} took ${movePower} damage!`);
    opponent.hitPoints -= movePower;
  }
}

class Battle {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.playerOneTurn = true;
  }

  fight() {
    if (this.playerOneTurn) {
      this.playerOneTurnGo();
    } else {
      this.playerTwoTurnGo();
    }
  }

  playerOneTurnGo() {
    if ((this.playerOne.activePoke.fainted = true)) {
      console.log('Your Pokemon has fainted! Choose another!');
      this.playerOneSwap();
    }
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'attackOrSwap',
          message: `${this.playerOne.name}, what would you like to do?`,
          choices: ['Attack!', 'Swap Pokemon']
        }
      ])
      .then(turnChoice => {
        if (turnChoice.attackOrSwap === 'Attack!') {
          this.playerOneAttack();
        } else {
          this.playerOneSwap();
          this.playerOneTurn = false;
          this.fight();
        }
      });
  }

  playerTwoTurnGo() {
    if ((this.playerTwo.activePoke.fainted = true)) {
      console.log('Your Pokemon has fainted! Choose another!');
      this.playerTwoSwap();
    }
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'attackOrSwap',
          message: `${this.playerTwo.name}, what would you like to do?`,
          choices: ['Attack!', 'Swap Pokemon']
        }
      ])
      .then(turnChoice => {
        if (turnChoice.attackOrSwap === 'Attack!') {
          this.playerTwoAttack();
        } else {
          this.playerTwoSwap();
          this.playerOneTurn = true;
          this.fight();
        }
      });
  }

  playerOneAttack() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'playerOneAttack',
          message: 'Choose your move!',
          choices: this.playerOne.activePoke.moves
        }
      ])
      .then(chosenMove => {
        this.playerOne.activePoke.useMove(
          chosenMove.playerOneAttack,
          this.playerTwo.activePoke
        );
      });
    if (this.playerTwo.activePoke.hitPoints <= 0) {
      console.log(`${this.playerTwo.activePoke.name} fainted!`);
      this.playerTwo.activePoke.fainted = true;
      if ((this.playerTwo.party.filter(poke => !poke.fainted).length = 0)) {
        console.log(
          `${this.playerTwo.name} has no more Pokemon! ${this.playerOne.name} wins!`
        );
        process.exit();
      }
    }
    this.playerOneTurn = false;
    this.fight();
  }

  playerTwoAttack() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'playerTwoAttack',
          message: 'Choose your move!',
          choices: this.playerTwo.activePoke.moves
        }
      ])
      .then(chosenMove => {
        this.playerTwo.activePoke.useMove(
          chosenMove.playerTwoAttack,
          this.playerOne.activePoke
        );
      });
    if (this.playerOne.activePoke.hitPoints <= 0) {
      console.log(`${this.playerOne.activePoke.name} fainted!`);
      this.playerOne.activePoke.fainted = true;
      if (
        (this.playerOne.party.filter(poke => (poke.fainted = false)).length = 0)
      ) {
        console.log(
          `${this.playerOne.name} has no more Pokemon! ${this.playerTwo.name} wins!`
        );
        process.exit();
      }
    }
    this.playerOneTurn = true;
    this.fight();
  }

  playerOneSwap() {
    console.log(
      `${this.playerOne.name} withdrew ${this.playerOne.activePoke.name}!`
    );
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'playerOneParty',
          message: 'Choose your Pokemon!',
          choices: this.playerOne.party.filter(poke => (poke.fainted = false))
        }
      ])
      .then(chosenPoke => {
        this.playerOne.activePoke = chosenPoke.playerOneParty;
      });
    console.log(
      `${this.playerOne.name} sent out ${this.playerOne.activePoke.name}!`
    );
  }

  playerTwoSwap() {
    console.log(
      `${this.playerTwo.name} withdrew ${this.playerTwo.activePoke.name}!`
    );
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'playerTwoParty',
          message: 'Choose your Pokemon!',
          choices: this.playerTwo.party.filter(poke => (poke.fainted = false))
        }
      ])
      .then(chosenPoke => {
        this.playerTwo.activePoke = chosenPoke.playerTwoParty;
      });
    console.log(
      `${this.playerTwo.name} sent out ${this.playerTwo.activePoke.name}!`
    );
  }
}

module.exports = {
  Trainer,
  Pokemon,
  Battle
};
