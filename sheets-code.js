const characterSheet = new CharacterSheet();

function TOUGHNESS() {
  return characterSheet.toughness;
}

class CharacterSheet{
	static DICE_CHAIN = [4, 6, 8, 10, 12];
	
	constructor(){
		this._attributes = new Attributes();
		this._pace = 6;
		this._armor = 0;
		this._toughness = this.calcToughness();
	}
	get attributes(){
		return this._attributes;
	}
	get pace(){
		return this._pace;
	}
	get armor(){
		return this._armor;
	}
	get toughness(){
		return this._toughness;
	}
	calcToughness(){
		const halfVigor = CharacterSheet.DICE_CHAIN[this._attributes.vigorDie]/2;
		this._toughness = 2 + halfVigor + this._armor;
	}
}

class Attributes{
	constructor(toughness){
		this._agility = new Attribute();
		this._smarts = new Attribute();
		this._spirit = new Attribute();
		this._strength = new Attribute();
		this._vigor = new Attribute();
		this._points = 5;
	}
	get points(){
		return this._points;
	}
	get agilityDie(){
		return this._agility.die;
	}
	get agilityMod(){
		return this._agility.mod;
	}
	increaseAgilityDie(i = 1){
		if (this._points >= i)
			this._points -= i - this._agility.increaseDie(i);
	}
	decreaseAgilityDie(i = 1){
		this._points += i - this._agility.decreaseDie(i);
	}
	increaseAgilityMod(i = 1){
		this._agility.increaseMod(i);
	}
	decreaseAgilityMod(i = 1){
		this._agility.decreaseMod(i);
	}
	get smartsDie(){
		return this._smarts.die;
	}
	get smartsMod(){
		return this._smarts.mod;
	}
	increaseSmartsDie(i = 1){
		if (this._points >= i)
			this._points -= i - this._smarts.increaseDie(i);
	}
	decreaseSmartsDie(i = 1){
		this._points += i - this._smarts.decreaseDie(i);
	}
	increaseSmartsMod(i = 1){
		this._smarts.increaseMod(i);
	}
	decreaseSmarts|smartsMod(i = 1){
		this._smarts.decreaseMod(i);
	}
	get spiritDie(){
		return this._spirit.die;
	}
	get spiritMod(){
		return this._spirit.mod;
	}
	increaseSpiritDie(i = 1){
		if (this._points >= i)
			this._points -= i - this._spirit.increaseDie(i);
	}
	decreaseSpiritDie(i = 1){
		this._points += i - this._spirit.decreaseDie(i);
	}
	increaseSpiritMod(i = 1){
		this._spirit.increaseMod(i);
	}
	decreaseSpiritMod(i = 1){
		this._spirit.decreaseMod(i);
	}
	get strengthDie(){
		return this._strength.die;
	}
	get strengthMod(){
		return this._strength.mod;
	}
	increaseStrengthDie(i = 1){
		if (this._points >= i)
			this._points -= i - this._strength.increaseDie(i);
	}
	decreaseStrengthDie(i = 1){
		this._points += i - this._strength.decreaseDie(i);
	}
	increaseStrengthMod(i = 1){
		this._strength.increaseMod(i);
	}
	decreaseStrengthMod(i = 1){
		this._strength.decreaseMod(i);
	}
	get vigorDie(){
		return this._vigor.die;
	}
	get vigorMod(){
		return this._vigor.mod;
	}
	increaseVigorDie(i = 1){
		if (this._points >= i)
			this._points -= i - this._vigor.increaseDie(i);
	}
	decreaseVigorDie(i = 1){
		this._points += i - this._vigor.decreaseDie(i);
	}
	increaseVigorMod(i = 1){
		this._vigor.increaseMod(i);
	}
	decreaseVigorMod(i = 1){
		this._vigor.decreaseMod(i);
	}
}

class Attribute{
  constructor(){
    this._die = 0;
    this._mod = 0;
  }
  set die(d){
    this._die = d; 
  }
  get die(){
    return this._die;
  }
  increaseDie(i){
	  let temp = this._die;
	  temp += i;
	  this._die = (temp > 4) ? 4 : temp;
	  return temp - this._die;
	  // TODO: check if this will also change the mod
  }
  decreaseDie(i){
	  let temp = this._die;
	  temp -= i;
	  this._die = (temp < 0) ? 0 : temp;
	  return this._die - temp;
  }
  set mod(m){
    this._mod = m;
  }
  get mod(){
    return this._mod;
  }
  increaseMod(i){
	  this._mod += i;
  }
  decreaseMod(i){
	  this._mod -= i;
  }
}