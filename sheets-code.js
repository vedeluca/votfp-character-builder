DICE_OBJ = {
	"-": 0,
	"d4": 4,
	"d6": 6,
	"d8": 8,
	"d10": 10,
	"d12": 12
};

DICE_ARR = ["-", "d4", "d6", "d8", "d10", "d12"];

BABIROG = "Babirog";
HUMAN = "Human";
MONODO = "Monodo";
SQUIBBEL = "Squibbel";
TOADYBOG = "Toadybog";


function GET_SIZE(race) {
	let size = 0;
	if ([SQUIBBEL, TOADYBOG].includes(race))
		size--;
	return size;
}

function GET_PACE() {
	return 6;
}

function GET_PARRY(fighting) {
	return 2 + DICE_OBJ[fighting] / 2;
}

function GET_TOUGHNESS(vigor, armor, race, size) {
	const halfVigor = DICE_OBJ[vigor] / 2;
	let total = 2 + halfVigor + parseInt(armor) + parseInt(size);
	if (race == MONODO)
		total++;
	return `${total}(${armor})`;
}

function GET_AGILITY(die, mod) {
	return getDice(die, mod, 0, "d4");
}

function GET_SMARTS(die, mod) {
	return getDice(die, mod, 0, "d4");
}

function GET_SPIRIT(die, mod) {
	return getDice(die, mod, 0, "d4");
}

function GET_STRENGTH(die, mod) {
	return getDice(die, mod, 0, "d4");
}

function GET_VIGOR(die, mod) {
	return getDice(die, mod, 0, "d4");
}

function GET_ATTRIBUTE_POINTS(agility, smarts, spirit, strength, vigor) {
	const agilityPts = DICE_ARR.indexOf(agility) - 1;
	const smartsPts = DICE_ARR.indexOf(smarts) - 1;
	const spiritPts = DICE_ARR.indexOf(spirit) - 1;
	const strengthPts = DICE_ARR.indexOf(strength) - 1;
	const vigorPts = DICE_ARR.indexOf(vigor) - 1;
	return 5 - agilityPts - smartsPts - spiritPts - strengthPts - vigorPts;
}

function getDice(die, mod, bonus, min) {
	let index = DICE_ARR.indexOf(die) + bonus;
	if (index < min)
		index = min;
	if (index > 5)
		index = 5;
	if (mod)
		return `${DICE_ARR[index]} + ${mod}`;
	return DICE_ARR[index];
}