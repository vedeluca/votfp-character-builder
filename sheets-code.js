DICE_OBJ = {
    "-": 0,
    "d4": 4,
    "d6": 6,
    "d8": 8,
    "d10": 10,
    "d12": 12
};

D4 = "d4";
D6 = "d6";
DICE_ARR = ["-", "d4", "d6", "d8", "d10", "d12"];
ATTR_ARR = ["Agility", "Smarts", "Spirit", "Strength", "Vigor"];

BABIROG = "Babirog";
HUMAN = "Human";
MONODO = "Monodo";
SQUIBBEL = "Squibbel";
TOADYBOG = "Toadybog";

CLUELESS = "Clueless";
CLUMSY = "Clumsy";
ELDERLY = "Elderly";
OBESE = "Obese";
SLOW = "Slow";
SMALL = "Small";
UGLY = "Ugly";
YELLOW = "Yellow";
YOUNG = "Young";
MIN_MAJ_OBJ = {
    "-": 0,
    "Minor": 1,
    "Major": 2
}
SPEND_OBJ = {
    "-": 0,
    "Attribute Point": 2,
    "Edge Point": 2,
    "Skill Point": 1,
    "1000 non": 1
}
ATTRIBUTE_POINT = "Attribute Point";
EDGE_POINT = "Edge Point";
SKILL_POINT = "Skill Point";
ONE_THOUSAND_NON = "1000 non";

function GET_SIZE(hindrances) {
    let size = 0;
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(SMALL))
        size--;
    if (hindranceArr.includes(OBESE))
        size++;
    return size;
}

function GET_PACE(hindrances, minMajs) {
    let pace = 6;
    for (let i = 0; i < hindrances.length; i++) {
        const hindrance = hindrances[i].toString();
        const minMaj = minMajs[i].toString();
        if ([ELDERLY, OBESE].includes(hindrance))
            pace -= 1;
        if (hindrance === SLOW)
            pace -= MIN_MAJ_OBJ[minMaj];
    }
    return pace;
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
    return getDice(die, 0, D4);
}

function GET_SMARTS_DIE(die) {
    return getDice(die, 0, D4);
}

function GET_SPIRIT_DIE(die) {
    return getDice(die, 0, D4);
}

function GET_STRENGTH_DIE(die) {
    return getDice(die, 0, D4);
}

function GET_VIGOR_DIE(die) {
    return getDice(die, 0, D4);
}

function GET_AGILITY_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(ELDERLY))
        return getMod(mod, -1);
    return getMod(mod, 0);
}

function GET_SMARTS_MOD(mod) {
    return getMod(mod, 0);
}

function GET_SPIRIT_MOD(mod) {
    return getMod(mod, 0);
}

function GET_STRENGTH_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(ELDERLY))
        return getMod(mod, -1);
    return getMod(mod, 0);
}

function GET_VIGOR_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(ELDERLY))
        return getMod(mod, -1);
    return getMod(mod, 0);
}

function GET_ATTRIBUTE_POINTS(attributeDice, attributeMods, hindrances, spends) {
    let pts = 5;
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(YOUNG))
        pts = 4;
    const diceArray = cellsToArray(attributeDice);
    for (die of diceArray)
        pts -= DICE_ARR.indexOf(die) - 1;
    pts -= sumCells(attributeMods);
    const spendArr = cellsToArray(spends);
    for (spend of spendArr) {
        if (spend === ATTRIBUTE_POINT)
            pts++;
    }
    return pts;
}

function GET_SKILL_POINTS(skills, linked, attributes, smarts, hindrances) {
    let pts = 20; // 12 + 8 for starting skills
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(YOUNG))
        pts = 18; // 10 + 8 for starting skills
    if (hindranceArr.includes(ELDERLY))
        pts = 25 // 12 + 8 for starting skills + 5 to be used for smarts based skills
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
    return getDice(die, bonus, D4);
}

function GET_STEALTH_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(CLUMSY))
        return getMod(mod, -2);
    return getMod(mod, 0);
}

function GET_NOTICE_MOD(mod, race, hindrances) {
    let bonus = 0;
    if (race == SQUIBBEL)
        bonus = 2;
    if (race == BABIROG)
        bonus = 1;
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(CLUELESS)) {
        bonus--;
        return getMod(mod, bonus);
    }
    return getMod(mod, bonus);
}

function GET_COMMON_KNOW_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(CLUELESS))
        return getMod(mod, -1);
    return getMod(mod, 0);
}

function GET_ATHLETICS_MOD(mod, hindrances) {
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(CLUMSY))
        return getMod(mod, -2);
    return getMod(mod, 0);
}

function GET_PERSUASION_MOD(mod, hindrances, minMajs) {
    for (let i = 0; i < hindrances.length; i++) {
        const hindrance = hindrances[i].toString();
        const minMaj = minMajs[i].toString();
        if (hindrance === UGLY)
            return getMod(mod, -MIN_MAJ_OBJ[minMaj]);
    }
    return getMod(mod, 0);
}

function GET_RACIAL_HINDRANCE(race) {
    return ([SQUIBBEL, TOADYBOG].includes(race)) ? SMALL : "-";
}

function GET_RUNNING_DIE(hindrances) {
    let bonus = 0;
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(SLOW))
        bonus--;
    if (hindranceArr.includes(OBESE))
        bonus--;
    return getDice(D6, bonus, D4);
}

function GET_RUNNING_MOD(hindrances) {
    let bonus = 0;
    const hindranceArr = cellsToArray(hindrances);
    if (hindranceArr.includes(ELDERLY))
        bonus--;
    return getMod(0, bonus);
}

function GET_HINDRANCE_POINTS(minMajs, spends) {
    let pts = 0;
    const minMajArray = cellsToArray(minMajs);
    for (minMaj of minMajArray)
        pts += MIN_MAJ_OBJ[minMaj];
    const spendsArray = cellsToArray(spends);
    for (spend of spendsArray)
        pts -= SPEND_OBJ[spend];
    return pts;
}

function getDice(die, bonus, min) {
    let index = DICE_ARR.indexOf(die) + bonus;
    const minIndex = DICE_ARR.indexOf(min);
    if (index < minIndex)
        index = minIndex;
    if (index > 5)
        index = 5;
    return DICE_ARR[index];
}

function getMod(mod, bonus) {
    if (mod == 0 && bonus == 0)
        return;
    return mod + bonus;
}

function cellsToArray(cells) {
    const arr = [];
    for (let i = 0; i < cells.length; i++)
        arr.push(cells[i].toString());
    return arr;
}

function sumCells(cells) {
    let sum = 0;
    for (let i = 0; i < cells.length; i++) {
        const cell = parseInt(cells[i]);
        if (!isNaN(cell))
            sum += cell;
    }
    return sum;
}