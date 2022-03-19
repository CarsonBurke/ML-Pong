class Unit {
    constructor(type, x, y, width, height) {

        const unit = this

        unit.x = x - width / 2
        unit.y = y - height / 2

        unit.type = type
        unit.ID = newID()

        unit.el = document.createElement('div')
        unit.el.classList.add('unit', type, unit.ID)
        unitsEl.appendChild(unit.el)

        unit.el.style.left = unit.x + 'px'
        unit.el.style.top = unit.y + 'px'

        unit.el.style.width = width + 'px'
        unit.el.style.height = height + 'px'

        game.units[type][unit.ID] = unit
    }
}

Unit.prototype.move = function(x, y) {

    const unit = this

    unit.x = x
    unit.y = y

    unit.el.style.left = unit.x + 'px'
    unit.el.style.top = unit.y + 'px'
}

Unit.prototype.kill = function() {

    const unit = this

    unit.el.remove()
    delete game.units[unit.type][unit.ID]
}

Unit.prototype.isOutOfBounds = function(x, y) {

    const unit = this

    if (x < 0 || x >= mapDimensions || y < 0 || y >= mapDimensions) return true

    unit.x = x
    unit.y = y

    unit.el.style.left = unit.x + 'px'
    unit.el.style.top = unit.y + 'px'

    return false
}