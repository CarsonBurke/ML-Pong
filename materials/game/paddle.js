class Paddle extends GameObject {
    constructor(gameID, ownerID, left, top, width, height, inputs, outputs, weightLayers, activationLayers) {

        super('paddle', gameID, ownerID, left, top, width, height)

        const paddle = this

        paddle.owner = owner
        paddle.speed = 3
        paddle.fitness = 0

        if (weightLayers && activationLayers) {

            exampleUnit.network = new NeuralNetwork(weightLayers, activationLayers)

        } else {

            exampleUnit.network = new NeuralNetwork()
            exampleUnit.network.construct(inputs.length, outputs.length)
        }

        exampleUnit.network.learn()
    }
}