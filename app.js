const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const timerDisplay = document.querySelector('#timer')
const startBtn = document.querySelector('#btn-start')
const width = 10
let nextRandom = 0
// timers
let startTime // time when the game started
let pauseTime // time when the pause started
let gameTimer // timer to move the tetrominoes
let timerUpdate // timer to tick the clock
let isPaused = false
let elapsedTime = 0

let pressTimer // to check how long is the button pressed
let score = 0
const colors = [
    '#F6E194', // lTetromino
    '#e4f694', // lTetrominoMirr
    '#F69F83', // zTetromino
    '#f683a9', // zTetrominoMirr
    '#BFB0D2', // tTrtromino
    '#D3DFAF', // oTetromino
    '#AFE2E9' // iTetromino
]

for (let i = 0; i < 210; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}

let squares = Array.from(document.querySelectorAll('.grid div'))

for (let i = squares.length - 1; i > 199; i--) {
    squares[i].classList.add('taken')
}

// #region tetrominoes

const lTetromino = [
    [0, width, width * 2, 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
]

const lTetrominoMirr = [
    [0, 1, width + 1, width * 2 + 1],
    [2, width, width + 1, width + 2],
    [0, width, width * 2, width * 2 + 1],
    [0, 1, 2, width]
]

const zTetromino = [
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1]
]

const zTetrominoMirr = [
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2],
    [0, 1, width + 1, width + 2],
    [1, width, width + 1, width * 2]
]

const tTetromino = [
    [1, width, width + 1, width + 2],
    [0, width, width + 1, width * 2],
    [0, 1, 2, width + 1],
    [1, width, width + 1, width * 2 + 1]
]

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const iTetromino = [
    [0, width, width * 2, width * 3],
    [width - 1, width, width + 1, width + 2],
    [0, width, width * 2, width * 3],
    [width - 1, width, width + 1, width + 2]
]

const tetrominoes = [lTetromino, lTetrominoMirr, zTetromino, zTetrominoMirr, tTetromino, oTetromino, iTetromino]

let currentPosition = 4
let currentRotation = 0

// randomly select a Tetromino
let random = Math.floor(Math.random() * tetrominoes.length)
let current = tetrominoes[random][currentRotation]

// draw the tetromino
function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
    })
}

// undraw the tetromino
function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
    })
}

// #endregion tetrominoes

// assign functions to keyCodes
function control(e) {
    if (!isPaused) {
        if (e.keyCode === 37) { // arrow left
            pressTimer = window.setTimeout(function () {
                moveLeft()
            }, 10);
        } else if (e.keyCode === 38) { // arrow up
            rotate()
        } else if (e.keyCode === 39) { // arrow right
            pressTimer = window.setTimeout(function () {
                moveRight()
            }, 10);
        } else if (e.keyCode === 40) { // arrow down
            pressTimer = window.setTimeout(function () {
                moveDown()
            }, 10);
        }
    } 

    if (e.keyCode === 32) { // space
        btnPause()
    }
}

document.addEventListener('keydown', control)
document.addEventListener('keyup', () => {
    window.clearTimeout(pressTimer)
})


function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        // start a ew tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * tetrominoes.length)
        current = tetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
        // requestAnimationFrame(freeze)
    }
}

// move the tetromino left, unless it is at the edge or there is a blockage
function moveLeft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition += 1
    }

    draw()
}

// move the tetromino right, unless it is at the edge or there is a blockage
function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if (!isAtRightEdge) currentPosition += 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -= 1
    }

    draw()
}


///FIX ROTATION OF TETROMINOS A THE EDGE 
function isAtRight() {
    return current.some(index => (currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
    return current.some(index => (currentPosition + index) % width === 0)
}

function checkRotatedPosition(P) {
    P = P || currentPosition       //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) {         //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).     
        if (isAtRight()) {            //use actual position to check if it's flipped over to right side
            currentPosition += 1    //if so, add one to wrap it back around
            checkRotatedPosition(P) //check again.  Pass position from start, since long block might need to move more.
        }
    }
    else if (P % width > 5) {
        if (isAtLeft()) {
            currentPosition -= 1
            checkRotatedPosition(P)
        }
    }
}

// rotate the tetromino
function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
        currentRotation = 0
    }

    current = tetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
}

// #region mini-grid

const miniGrid = document.querySelector('.mini-grid')

for (let i = 0; i < 36; i++) {
    const square = document.createElement('div')
    miniGrid.appendChild(square)
}

// show up next tetromino in mini-grid
const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 6
const displayIndex = displayWidth + 2

// tetrominoes without rotations
const upNextTetrominoes = [
    [0, displayWidth, displayWidth * 2, 1], // lTetromino
    [0, 1, displayWidth + 1, displayWidth * 2 + 1], // lTetrominoMirr
    [1, 2, displayWidth, displayWidth + 1], // zTetromino
    [0, 1, displayWidth + 1, displayWidth + 2], // zTetrominoMirr
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
    [0, 1, displayWidth, displayWidth + 1], // oTetromino
    [0, displayWidth, displayWidth * 2, displayWidth * 3] // iTetromino
]

// display the shape in mini-grid display
function displayShape() {
    // remove any trace of a tetromino from the whole mini-grid
    displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
    })

    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
}

function updateTimer() {
    let currentTime = new Date().getTime()

    elapsedTime = currentTime - startTime

    // calculate hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600000)
    let minutes = Math.floor((elapsedTime % 3600000) / 60000)
    let seconds = Math.floor((elapsedTime % 60000) / 1000)

    // format output with leading zeros
    let timeString = hours.toString().padStart(2, "0") + ":" +
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0")

    timerDisplay.innerHTML = timeString
}

// #endregion mini-grid

// add functionality to a button
function btnPause() {
    if (isPaused) { // resume the game
        let pauseDuration = new Date().getTime() - pauseTime
        startTime += pauseDuration
        isPaused = false

        gameTimer = setInterval(moveDown, 1000)
        timerUpdate = setInterval(updateTimer, 1000)
        draw()
    } else if (!isPaused && gameTimer) { // pause the game
        pauseTime = new Date().getTime()
        isPaused = true

        clearInterval(gameTimer)
        gameTimer = null
        clearInterval(timerUpdate)
        timerUpdate = null
    } else { // start over
        btnStart()
    }
}

function btnStart() {
    startTime = new Date().getTime()
    isPaused = false
    elapsedTime = 0

    gameTimer = setInterval(moveDown, 1000)
    timerUpdate = setInterval(updateTimer, 1000)
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    displayShape()
    draw()
}

startBtn.addEventListener('click', btnPause)

// add score
function addScore() {
    for (let i = 0; i < 199; i += width) {
        const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
        // let row = []
        // for (j = 0; j < width; j++) {
        //     row.push(i+j)
        // }
        if (row.every(index => squares[index].classList.contains('taken'))) {
            undraw()
            score += 10
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove('taken')
                squares[index].classList.remove('tetromino')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
            draw()
        }
    }
}

// game over
function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(gameTimer)
        gameTimer = null
        clearInterval(timerUpdate)
        timerUpdate = null
    }
}

// animation frame
function animate() {
    // 60fps
    freeze()
    requestAnimationFrame(animate)
}

animate()