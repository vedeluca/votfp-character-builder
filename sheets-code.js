DICE_OBJ = {
    "-": 0,
    "d4": 4,
    "d6": 6,
    "d8": 8,
    "d10": 10,
    "d12": 12
};

DICE_ARR = ["-", "d4", "d6", "d8", "d10", "d12"];
ATTR_ARR = ["Agility", "Smarts", "Spirit", "Strength", "Vigor"];

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

function GET_AGILITY_DIE(die) {
    return getDice(die, 0, "d4");
}

function GET_SMARTS_DIE(die) {
    return getDice(die, 0, "d4");
}

function GET_SPIRIT_DIE(die) {
    return getDice(die, 0, "d4");
}

function GET_STRENGTH_DIE(die) {
    return getDice(die, 0, "d4");
}

function GET_VIGOR_DIE(die) {
    return getDice(die, 0, "d4");
}

function GET_AGILITY_MOD(mod) {
    return getMod(mod, 0);
}

function GET_SMARTS_MOD(mod) {
    return getMod(mod, 0);
}

function GET_SPIRIT_MOD(mod) {
    return getMod(mod, 0);
}

function GET_STRENGTH_MOD(mod) {
    return getMod(mod, 0);
}

function GET_VIGOR_MOD(mod) {
    return getMod(mod, 0);
}

function GET_ATTRIBUTE_POINTS(agility, smarts, spirit, strength, vigor) {
    const agilityPts = DICE_ARR.indexOf(agility) - 1;
    const smartsPts = DICE_ARR.indexOf(smarts) - 1;
    const spiritPts = DICE_ARR.indexOf(spirit) - 1;
    const strengthPts = DICE_ARR.indexOf(strength) - 1;
    const vigorPts = DICE_ARR.indexOf(vigor) - 1;
    return 5 - agilityPts - smartsPts - spiritPts - strengthPts - vigorPts;
}

function GET_SKILL_POINTS(skills, linked, attributes, smarts) {
    let pts = 20; // 12 + 8 for starting skills
    for (let i = 0; i < skills.length; i++) {
        const skill = skills[i].toString();
        const link = linked[i].toString();
        const j = ATTR_ARR.indexOf(link);
        const attr = attributes[j].toString();
        const skillVal = DICE_ARR.indexOf(skill);
        const attrVal = DICE_ARR.indexOf(attr);
        let minus = skillVal;
        if (skillVal > attrVal)
            minus += skillVal - attrVal;
        pts -= minus;
    }
    // adjust for common language
    const smartsVal = DICE_ARR.indexOf(smarts.toString());
    if (3 > smartsVal)
        pts += 3 - smartsVal;
    return pts;
}

function GET_SKILL_DIE(die, min) {
    return getDice(die, 0, min);
}

function GET_SKILL_MOD(mod) {
    return getMod(mod, 0);
}

function GET_STEALTH_DIE(die, race) {
    const bonus = (race == SQUIBBEL) ? 1 : 0;
    return getDice(die, bonus, "d4");
}

function GET_NOTICE_MOD(mod, race) {
    let bonus = 0;
    if (race == SQUIBBEL)
        bonus = 2;
    if (race == BABIROG)
        bonus = 1;
    return getMod(mod, bonus);
}

function getDice(die, bonus, min) {
    let index = DICE_ARR.indexOf(die) + bonus;
    if (index < min)
        index = min;
    if (index > 5)
        index = 5;
    return DICE_ARR[index];
}

function getMod(mod, bonus) {
    if (mod == 0 && bonus == 0)
        return;
    return mod + bonus;
}