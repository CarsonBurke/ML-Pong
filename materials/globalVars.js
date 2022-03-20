const gameWidth = 676,
    gameHeight = 676,

    mapDimensions = 26,

    unitTypes = ['ball', 'paddle'],

    unitsEl = document.getElementsByClassName('unitsParent')[0],

    game = new Game()



let ID = 0,
    speedMultiplier = 100

function newID() {

    return ID++
}

function findDistance(x1, y1, x2, y2) {

    // Configure positions

    const xDifference = x1 - x2
    const yDifference = y1 - y2

    // Find range using pythagorus and inform it

    return Math.floor(Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2)))
}