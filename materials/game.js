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

    game.players.left = new Player('left')

    game.players.right = new Player('right')
}

Game.prototype.initUnits = function() {

    // Ball

    new Ball(gameWidth / 2, gameHeight / 2)

    // Left

    new Paddle(20, gameHeight / 2, 'left')

    // Right

    new Paddle(gameWidth - 20, gameHeight / 2, 'right')
}

Game.prototype.newMatch = function(looserType, inputs, outputs) {

    game.tick = 0

    const looser = game.players[looserType]

    const winner = game.players[looserType == 'left' ? 'right' : 'left']

    winner.network.learn()
    winner.score = 0
    console.log('WIN: ' + winner.type)

    looser.network.visualsParent.remove()
    delete looser.network

    looser.network = winner.network.clone(inputs, outputs)
    looser.score = 0

    for (const type in game.units) {

        for (const unitID in game.units[type]) {

            game.units[type][unitID].delete()
        }
    }

    game.initUnits()
}