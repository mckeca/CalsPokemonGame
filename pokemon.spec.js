const { Trainer, Pokemon, Battle } = require('./Constructors');
const { pokeLib } = require('./Libraries');
const { expect } = require('chai');

describe('Trainer', () => {
  it('should creater a trainer with a name passed in as an argument', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    expect(Ash.name).to.equal('Ash');
  });
  it('should have a starter pokemon passed in as an argument in its party', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    expect(Ash.party[0].name).to.equal('Pikachu');
  });
  it('should set the starter pokemon to trainers active pokemon', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    expect(Ash.activePoke.name).to.equal('Pikachu');
  });
  it('should be able to add pokemon to the party through the catch method', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    Ash.catch('Bulbasaur');
    expect(Ash.party[1].name).to.equal('Bulbasaur');
  });
  it('should cap the trainers party at six pokemon', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    Ash.catch('Bulbasaur');
    Ash.catch('Charmander');
    Ash.catch('Squirtle');
    Ash.catch('Bulbasaur');
    Ash.catch('Charmander');
    Ash.catch('Squrtle');
    expect(Ash.party.length).to.equal(6);
  });
});
describe('Pokemon', () => {
  it('should pick a pokemon from the pokelibrary based on a name passed in as an arg', () => {
    const Bulbasaur = new Pokemon('Bulbasaur');
    expect(Bulbasaur.name).to.equal('Bulbasaur');
  });
  it('should have the correct type attached', () => {
    const Charmander = new Pokemon('Charmander');
    expect(Charmander.type).to.equal('fire');
  });
  it('should have two moves stored in an array', () => {
    const Squirtle = new Pokemon('Squirtle');
    expect(Squirtle.moves).to.eql(['scratch', 'waterGun']);
  });
  it('should slightly randomise the stats vs the base version of that pokemon in the library', () => {
    const Pikachu = new Pokemon('Pikachu');
    expect(Pikachu.hitPoints).to.not.equal(pokeLib['Pikachu'].hitPoints);
    expect(Pikachu.attack).to.not.equal(pokeLib['Pikachu'].attack);
  });
  it('should be able to use a move on another pokemon', () => {
    const Pikachu = new Pokemon('Pikachu');
    const Squirtle = new Pokemon('Squirtle');
    Pikachu.useMove('tackle', Squirtle);
    expect(Squirtle.hitPoints < 165).to.equal(true);
  });
});
describe('Battle', () => {
  it('should take two trainers as args and asign them to player1 and player2', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    const Gary = new Trainer('Gary', 'Squirtle');
    const leagueFinal = new Battle(Ash, Gary);
    expect(leagueFinal.playerOne).to.equal(Ash);
    expect(leagueFinal.playerTwo).to.equal(Gary);
  });
  it('should start on playerOnes turn', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    const Gary = new Trainer('Gary', 'Squirtle');
    const leagueFinal = new Battle(Ash, Gary);
    expect(leagueFinal.playerOneTurn).to.equal(true);
  });
  it('should have a fight method that takes whichever trainers turn it is and has their pokemon use a move on their opponent', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    const Gary = new Trainer('Gary', 'Squirtle');
    const leagueFinal = new Battle(Ash, Gary);
    leagueFinal.fight(this.playerOne, this.playerTwo);
    expect(Gary.party[0].hitPoints < 165).to.equal(true);
  });
  it('fight method should switch turns after every attack', () => {
    const Ash = new Trainer('Ash', 'Pikachu');
    const Gary = new Trainer('Gary', 'Squirtle');
    const leagueFinal = new Battle(Ash, Gary);
    leagueFinal.fight(this.playerOne, this.playerTwo);
    expect(leagueFinal.playerOneTurn).to.equal(false);
  });
});
