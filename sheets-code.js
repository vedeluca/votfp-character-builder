DICE_CHAIN = {
	"-": 0,
	"d4": 4,
	"d6": 6,
	"d8": 8,
	"d10": 10,
	"d12": 12
};

function GET_PACE() {
	return 6;
}

function GET_PARRY(fighting) {
	return 2 + DICE_CHAIN[fighting] / 2;
}

function GET_TOUGHNESS(vigor, armor) {
	const halfVigor = DICE_CHAIN[vigor] / 2;
	const total = 2 + halfVigor + armor
	return `${total}(${armor})`;
}