const inputs = [
        { name: 'Ball x', value: 0 },
        { name: 'Ball y', value: 0 },
        { name: 'Paddle x', value: 0 },
        { name: 'Paddle y', value: 0 },
    ],

    outputs = [
        { name: 'Move up' },
        { name: 'Move down' }
    ]

function runEnv() {

    game.tick += 1

    const ball = Object.values(game.units.ball)[0]

    manageBall()

    function manageBall() {

        if (ball.x < 0 || ball.x + ball.width >= gameWidth) {

            ball.horizontalDirection == 0 ? game.newMatch('left', inputs, outputs) : game.newMatch('right', inputs, outputs)
        }

        if (ball.y < 0 || ball.y + ball.height >= gameHeight) {

            ball.verticalDirection == 0 ? ball.verticalDirection = 1 : ball.verticalDirection = 0
        }

        const xChange = ball.horizontalDirection == 0 ? ball.speed * -1 : ball.speed,
            yChange = ball.verticalDirection == 0 ? ball.speed * -1 : ball.speed

        ball.move(ball.x + xChange, ball.y + yChange)
    }

    for (const playerType in game.players) {

        const player = game.players[playerType]

        if (player.network) player.network.visualsParent.classList.add('visualsParentHide')

        const paddle = Object.values(game.units.paddle).filter(paddle => paddle.owner == playerType)[0]

        inputs[0].value = ball.x
        inputs[1].value = ball.y
        inputs[2].value = paddle.x
        inputs[3].value = paddle.y

        if (!player.network) player.newNetwork(inputs, outputs)

        player.network.forwardPropagate(inputs)
        player.network.updateVisuals()
        player.network.visualsParent.classList.remove('visualsParentHide')

        // Find last layer

        const lastLayer = player.network.layers[Object.keys(player.network.layers).length - 1],
            lastLayerPerceptrons = Object.values(lastLayer.perceptrons)

        // Sort perceptrons by activateValue and get the largest one

        const perceptronWithLargestValue = lastLayerPerceptrons.sort((a, b) => a.activateValue - b.activateValue).reverse()[0]

        if (perceptronWithLargestValue.activateValue > 0) {

            const yChange = lastLayerPerceptrons.indexOf(perceptronWithLargestValue) == 0 ? paddle.speed * -1 : paddle.speed

            if (paddle.isOutOfBounds(paddle.x, paddle.y + yChange)) return

            paddle.move(paddle.x, paddle.y + yChange)
        }
    }
}