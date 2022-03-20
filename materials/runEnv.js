function runEnv() {

    game.tick += 1

    for (const playerType in game.players) {

        const player = game.players[playerType]

        const paddle = Object.values(game.units.paddle).filter(paddle => paddle.owner == playerType)[0]

        /* console.log(paddle) */

        const x = paddle.x,
            y = paddle.y + Math.random() * 100 - Math.random() * 100

        if (paddle.isOutOfBounds(x, y)) return

        paddle.move(x, y)

        /* if (player.network) player.network.visualsParent.classList.add('visualsParentHide')

        if (playersTurn == playerType) continue

        const { inputs, outputs } = player.getOptions()

        if (game.tick > 200) {

            game.newMatch(player, inputs, outputs)
            break
        }

        if (!aliveKings[playerType]) game.newMatch(player, inputs, outputs)

        if (!player.network) player.newNetwork(inputs, outputs)

        player.network.forwardPropagate(inputs)
        player.network.updateVisuals()
        player.network.visualsParent.classList.remove('visualsParentHide')

        // Find last layer

        const lastLayer = player.network.layers[Object.keys(player.network.layers).length - 1]

        // Sort perceptrons by activateValue and get the largest one

        const perceptronWithLargestValue = Object.values(lastLayer.perceptrons).sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

        //

        if (perceptronWithLargestValue.activateValue > 0) {

            const output = outputs[perceptronWithLargestValue.name]

            output.unit.move(output.name)
            output.unit.firstMove = false
        }

        playersTurn = player.type

        break */
    }
}