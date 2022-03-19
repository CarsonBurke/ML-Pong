class Unit {
    constructor(z, type, owner) {

        const unit = this

        unit.z = z
        unit.x = Math.floor(z / mapDimensions)
        unit.y = Math.floor(z % mapDimensions)

        unit.type = type
        unit.owner = owner

        unit.lastMoves = []

        unit.el = document.createElement('img')
        unit.el.classList.add('unit', z)
        unitsEl.appendChild(unit.el)

        unit.el.src = 'materials/images/' + type + owner + '.png'

        unit.el.style.left = unit.x * (gameWidth / mapDimensions) + 'px'
        unit.el.style.top = unit.y * (gameHeight / mapDimensions) + 'px'

        unit.el.style.width = gameWidth / mapDimensions + 'px'
        unit.el.style.height = gameHeight / mapDimensions + 'px'

        game.units[z] = unit
    }
}

Unit.prototype.move = function(z) {

    const unit = this

    if (game.units[z]) game.units[z].delete()

    game.units[unit.z] = undefined

    unit.z = z
    unit.x = Math.floor(z / mapDimensions)
    unit.y = Math.floor(z % mapDimensions)

    unit.lastMoves.push(z)

    unit.el.style.left = unit.x * (gameWidth / mapDimensions) + 'px'
    unit.el.style.top = unit.y * (gameHeight / mapDimensions) + 'px'

    game.units[z] = unit
}

Unit.prototype.kill = function() {

    const unit = this

    unit.el.remove()
    unit.dead = true
}

Unit.prototype.delete = function() {

    const unit = this

    unit.el.remove()
    game.units[unit.z] = undefined
}

Unit.prototype.searchByOffsets = function(offsetX, offsetY) {

    const unit = this

    const positions = []

    let x = unit.x,
        y = unit.y

    while (1 == 1) {

        x += offsetX
        y += offsetY

        if (x < 0 || x >= mapDimensions || y < 0 || y >= mapDimensions) break

        const z = x * mapDimensions + y

        const unitAtPos = game.units[z]

        if (unitAtPos) {

            if (unitAtPos.owner == unit.owner) break

            positions.push(z)
            break
        }

        positions.push(z)
    }

    return positions
}