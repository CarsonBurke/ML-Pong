game.init()

function changeSpeed() {

    speedMultiplier = document.getElementById('newSpeed').value || speedMultiplier

    let i = 0

    while (i < speedMultiplier) {

        runTick()

        async function runTick() {

            while (1 == 1) {

                await timeout(speedMultiplier - 1000)

                runEnv()
            }
        }

        i++
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}