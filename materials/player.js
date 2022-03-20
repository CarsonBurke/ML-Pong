class Player {
    constructor(type) {

        const player = this

        player.type = type
        player.score = 0
    }
}

Player.prototype.newNetwork = function(inputs, outputs) {

    const player = this

    // Create neural network

    const network = new NeuralNetwork()

    // Create layers

    let layerCount = 3

    for (let i = 0; i < layerCount; i++) network.addLayer()

    // Create perceptrons

    // Create input perceptrons

    for (let i = 0; i < inputs.length; i++) network.layers[0].addPerceptron()

    // Create hidden perceptrons

    let hiddenPerceptronsNeed = 3

    // Loop through layers

    for (let layerName in network.layers) {

        // Filter only hidden layers

        let layersCount = Object.keys(network.layers).length

        if (layerName > 0 && layerName < layersCount - 1) {

            let layer = network.layers[layerName]

            for (let i = 0; i < hiddenPerceptronsNeed; i++) layer.addPerceptron()
        }
    }

    // Create output perceptrons

    for (let i = 0; i < outputs.length; i++) network.layers[layerCount - 1].addPerceptron()

    //

    network.init(inputs, outputs)

    player.network = network
}