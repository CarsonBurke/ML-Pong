class Game {
    constructor() {

        const game = this

        game.players = {
            left: undefined,
            right: undefined
        }
        game.units = {}

        for (const unitType of unitTypes) game.units[unitType] = {}
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

    game.players.white = new Player('left')

    game.players.black = new Player('right')
}

Game.prototype.initUnits = function() {

    // Ball

    new Ball(gameWidth / 2, gameHeight / 2)

    // Left

    new Paddle(20, gameHeight / 2)

    // Right

    new Paddle(gameWidth - 20, gameHeight / 2)
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