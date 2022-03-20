const gameWidth = 800,
    gameHeight = 600,

    unitTypes = ['ball', 'paddle'],

    unitsEl = document.getElementsByClassName('unitsParent')[0],

    game = new Game()



let ID = 0,
    speedMultiplier = 100

function newID() {

    return ID++
}

function isInside(unit1, unit2) {

    if (unit1.x + unit1.width >= unit2.x &&
        unit1.x <= unit2.x + unit2.width &&
        unit1.y + unit1.height >= unit2.y &&
        unit1.y <= unit2.y + unit2.height) return true

    return false
}