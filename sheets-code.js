DICE_CHAIN = [0, 4, 6, 8, 10, 12];
const CHARACTER_SHEET = PropertiesService.getUserProperties();
CHARACTER_SHEET.setProperty("AGILITY_DIE", "1");
CHARACTER_SHEET.setProperty("AGILITY_MOD", "0");
CHARACTER_SHEET.setProperty("SMARTS_DIE", "1");
CHARACTER_SHEET.setProperty("SMARTS_MOD", "0");
CHARACTER_SHEET.setProperty("SPIRIT_DIE", "1");
CHARACTER_SHEET.setProperty("SPIRIT_MOD", "0");
CHARACTER_SHEET.setProperty("STRENGTH_DIE", "1");
CHARACTER_SHEET.setProperty("STRENGTH_MOD", "0");
CHARACTER_SHEET.setProperty("VIGOR_DIE", "1");
CHARACTER_SHEET.setProperty("VIGOR_MOD", "0");
CHARACTER_SHEET.setProperty("ATTRIBUTES_POINTS", "5");
CHARACTER_SHEET.setProperty("ATHLETICS_DIE", "1");
CHARACTER_SHEET.setProperty("ATHLETICS_MOD", "0");
CHARACTER_SHEET.setProperty("COMMON_KNOWLEDGE_DIE", "1");
CHARACTER_SHEET.setProperty("COMMON_KNOWLEDGE_MOD", "0");
CHARACTER_SHEET.setProperty("FIGHTING_DIE", "0");
CHARACTER_SHEET.setProperty("FIGHTING_MOD", "0");
CHARACTER_SHEET.setProperty("LANGUAGE_COMMON_DIE", "3");
CHARACTER_SHEET.setProperty("LANGUAGE_COMMON_MOD", "0");
CHARACTER_SHEET.setProperty("NOTICE_DIE", "1");
CHARACTER_SHEET.setProperty("NOTICE_MOD", "0");
CHARACTER_SHEET.setProperty("PERSUASION_DIE", "1");
CHARACTER_SHEET.setProperty("PERSUASION_MOD", "0");
CHARACTER_SHEET.setProperty("STEALTH_DIE", "1");
CHARACTER_SHEET.setProperty("STEALTH_MOD", "0");
CHARACTER_SHEET.setProperty("SKILLS_POINTS", "12");
CHARACTER_SHEET.setProperty("PACE", "6");
CHARACTER_SHEET.setProperty("PARRY", "2");
CHARACTER_SHEET.setProperty("TOUGHNESS", "4");
CHARACTER_SHEET.setProperty("ARMOR", "0");

function GET_VALUE(key){
	return CHARACTER_SHEET.getProperty(key);
}

function GET_DICE(key){
	const val = parseInt(CHARACTER_SHEET.getProperty(`${key}_DIE`));
	const die = `d${DICE_CHAIN[val]}`;
	const mod = CHARACTER_SHEET.getProperty(`${key}_MOD`);
	return (mod == "0") ? die : `${die} + ${mod}`
}

function GET_TOUGHNESS(){
	const vigor = parseInt(CHARACTER_SHEET.getProperty("VIGOR_DIE"));
	const armor = parseInt(CHARACTER_SHEET.getProperty("ARMOR"));
	const halfVigor =DICE_CHAIN[vigor]/2;
	return 2 + halfVigor + armor;
}

function SET_VALUE(key, val){
	CHARACTER_SHEET.setProperty(key, val);
}

class CharacterSheet{
	constructor(){
		CharacterSheet.DICE_CHAIN = [4, 6, 8, 10, 12];
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
	decreaseSmartsMod(i = 1){
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