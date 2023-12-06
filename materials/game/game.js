class Game {
    constructor() {

        const game = this

        game.ID = env.newID()
        game.players = {}
        game.objects = {}
        game.running = true

        env.games[game.ID] = game
    }
}

Game.prototype.init = function(inputs, outputs, weightLayers, activationLayers) {

    const game = this

    // Create players

    /* new Player('person', game.ID) */

    // Create a ball

    const ballWidth = 19,
        ballHeight = 19

    new Ball(game.ID, Object.keys(game.players)[0], env.width / 2 + ballWidth, env.height / 2 + ballHeight, ballWidth, ballHeight)

    // Create x number of paddles

    for (let i = 0; i < 2; i++) {

        new Paddle(game.ID, Object.keys(game.players)[i], 10, 10, 4, 68, inputs, outputs, weightLayers, activationLayers)
    }
}

Game.prototype.reset = function() {

    const game = this

    game.players = {}

    for (const type in game.objects) {

        for (const ID in game.objects[type]) {

            const gameObj = game.objects[type][ID]

            gameObj.delete()
        }
    }

    game.running = true
}

Game.prototype.visualize = function() {

    const game = this

    for (const type in game.objects) {

        for (const ID in game.objects[type]) {

            const gameObj = game.objects[type][ID]

            gameObj.draw()
        }
    }
}