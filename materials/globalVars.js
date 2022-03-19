const gameWidth = 676,
    gameHeight = 676,

    mapDimensions = 26,

    unitTypes = ['ball', 'paddle'],

    unitsEl = document.getElementsByClassName('unitsParent')[0],

    game = new Game()

let ID = 0

function newID() {

    return ID++
}