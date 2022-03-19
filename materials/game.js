class Game {
    constructor() {

        const game = this

        game.players = {
            white: undefined,
            black: undefined
        }
        game.terrain = []
        game.units = []
    }
}

Game.prototype.init = function() {

    game.tick = 0

    game.map = document.getElementsByClassName('map')[0]

    // Style canvas

    game.map.style.width = gameWidth + 'px'
    game.map.style.height = gameHeight + 'px'

    game.initUnits()
    game.initPlayers()
}

Game.prototype.initPlayers = function() {

    game.players.white = new Player('white')

    game.players.black = new Player('black')
}

Game.prototype.initUnits = function() {

    // Black units

    // Rooks

    new Rook(0 * mapDimensions + 0, 'black')
    new Rook(7 * mapDimensions + 0, 'black')

    // Knights

    new Knight(1 * mapDimensions + 0, 'black')
    new Knight(6 * mapDimensions + 0, 'black')

    // Bishops

    new Bishop(2 * mapDimensions + 0, 'black')
    new Bishop(5 * mapDimensions + 0, 'black')

    // Royalty

    new King(3 * mapDimensions + 0, 'black')
    new Queen(4 * mapDimensions + 0, 'black')

    // Pawns

    for (let x = 0; x < mapDimensions; x++) {
        for (let y = 1; y < 2; y++) {

            new Pawn(x * mapDimensions + y, 'black')
        }
    }

    // White units

    // Rooks

    new Rook(0 * mapDimensions + 7, 'white')
    new Rook(7 * mapDimensions + 7, 'white')

    // Knights

    new Knight(1 * mapDimensions + 7, 'white')
    new Knight(6 * mapDimensions + 7, 'white')

    // Bishops

    new Bishop(2 * mapDimensions + 7, 'white')
    new Bishop(5 * mapDimensions + 7, 'white')

    // Royalty

    new King(4 * mapDimensions + 7, 'white')
    new Queen(3 * mapDimensions + 7, 'white')

    // Pawns

    for (let x = 0; x < mapDimensions; x++) {
        for (let y = 6; y < 7; y++) {

            new Pawn(x * mapDimensions + y, 'white')
        }
    }
}

Game.prototype.newMatch = function(looser, inputs, outputs) {

    game.tick = 0

    const winner = game.players[looser.type == 'white' ? 'black' : 'white']

    winner.network.learn()
    winner.score = 0
    console.log('WIN: ' + winner.type)

    looser.network.visualsParent.remove()
    delete looser.network

    looser.network = winner.network.clone(inputs, outputs)
    looser.score = 0

    for (const unit of game.units) {

        if (!unit) continue

        unit.delete()
    }

    game.initUnits()
}