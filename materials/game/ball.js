class Ball extends GameObject {
    constructor(gameID, ownerID, left, top, width, height) {

        super('ball', gameID, ownerID, left, top, width, height)

        const ball = this

        ball.speed = 2
        ball.verticalDirection = Math.floor(Math.random() * 2)
        ball.horizontalDirection = Math.floor(Math.random() * 2)
    }
}