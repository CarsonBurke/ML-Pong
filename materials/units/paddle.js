class Paddle extends Unit {
    constructor(x, y, owner) {

        super('paddle', x, y, 8, 100)

        const paddle = this

        paddle.owner = owner
        paddle.speed = 3
    }
}