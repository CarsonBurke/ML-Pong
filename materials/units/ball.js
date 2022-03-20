class Ball extends Unit {
    constructor(x, y) {

        super('ball', x, y, 30, 30)

        const ball = this

        ball.speed = 2

        ball.verticalDirection = Math.floor(Math.random() * 2)
        ball.horizontalDirection = Math.floor(Math.random() * 2)
    }
}