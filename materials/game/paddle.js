class Paddle extends GameObject {
    constructor(gameID, ownerID, left, top, width, height, inputs, outputs, weightLayers, activationLayers) {

        super('paddle', gameID, ownerID, left, top, width, height)

        const paddle = this

        paddle.owner = owner
        paddle.speed = 3
    }
}