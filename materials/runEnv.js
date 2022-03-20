const inputs = [
        { name: 'Ball y', value: 0 },
        { name: 'Paddle y', value: 0 },
    ],

    outputs = [
        { name: 'Move up' },
        { name: 'Move down' }
    ]

function runEnv() {

    game.tick += 1

    const ball = Object.values(game.units.ball)[0]
    const paddles = Object.values(game.units.paddle)

    manageBall()

    function manageBall() {

        if (ball.x < 0 || ball.x + ball.width >= gameWidth) {

            ball.horizontalDirection == 0 ? game.newMatch('left', inputs, outputs) : game.newMatch('right', inputs, outputs)
        }

        if (ball.y < 0 || ball.y + ball.height >= gameHeight) {

            ball.verticalDirection == 0 ? ball.verticalDirection = 1 : ball.verticalDirection = 0
        }

        for (const paddle of paddles) {

            if (!isInside(paddle, ball)) continue

            ball.horizontalDirection == 0 ? ball.horizontalDirection = 1 : ball.horizontalDirection = 0
        }

        const xChange = ball.horizontalDirection == 0 ? ball.speed * -1 : ball.speed,
            yChange = ball.verticalDirection == 0 ? ball.speed * -1 : ball.speed

        ball.move(ball.x + xChange, ball.y + yChange)
    }

    for (const playerType in game.players) {

        const player = game.players[playerType]

        if (player.network) player.network.visualsParent.classList.add('visualsParentHide')

        const paddle = paddles.filter(paddle => paddle.owner == playerType)[0]

        inputs[0].value = ball.y + ball.width / 2
        inputs[1].value = paddle.y + paddle.width / 2

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

            const yChange = perceptronWithLargestValue.name == 0 ? paddle.speed * -1 : paddle.speed

            if (paddle.isOutOfBounds(paddle.x, paddle.y + yChange)) return

            paddle.move(paddle.x, paddle.y + yChange)
        }
    }

    document.getElementById('tick').innerText = game.tick
    document.getElementById('games').innerText = game.games
}