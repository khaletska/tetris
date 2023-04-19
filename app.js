// import { maps } from './maps.js'

const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const timerDisplay = document.querySelector('#timer')
// const startBtn = document.querySelector('#btn-start')
const startBtnPopUp = document.querySelector("#start-btn-pop-up")
const restartBtnPopUp = document.querySelector("#restart-btn-pop-up")
const resumeBtnPopUp = document.querySelector("#resume-btn-pop-up")
let lives = document.querySelectorAll(".life")

const width = 10
let squares = []
let nextRandom = 0
// timers
let startTime, pauseTime, gameTimer, timerUpdate, pressTimer
let isPaused = false
let gameStart = false
let gameOver = false
let elapsedTime = 0
let score = 0
let level = 1
let speed = 1000
let animFrame

const colors = [
    '#8CC286', // lTetromino
    '#FBD44D', // lTetrominoMirr
    '#EB782D', // zTetromino
    '#ECB040', // zTetrominoMirr

    '#D2CB48', // tTrtromino
    '#91DCD7', // oTetromino
    '#4BA3B1' // iTetromino
    // '#BE7C4D', // lTetromino
    // '#8F694F', // lTetrominoMirr
    // '#7C4219', // zTetromino
    // '#DFA47B', // zTetrominoMirr

    // '#DFB496', // tTrtromino
    // '#B3612B', // oTetromino
    // '#86683A' // iTetromino
]

// #region maps

const level1 = [
    width * 12 + 6,
    width * 13 + 3,
    width * 13 + 6,
    width * 14 + 2,
    width * 14 + 3,
    width * 14 + 4,
    width * 14 + 5,
    width * 14 + 6,
    width * 15 + 1,
    width * 15 + 2,
    width * 15 + 3,
    width * 15 + 6,
    width * 15 + 7,
    width * 15 + 8,
    width * 16 + 2,
    width * 16 + 3,
    width * 16 + 4,
    width * 16 + 6,
    width * 16 + 7,
    width * 17 + 2,
    width * 17 + 3,
    width * 17 + 4,
    width * 17 + 5,
    width * 17 + 6,
    width * 17 + 7,
    width * 18 + 3,
    width * 18 + 4,
    width * 18 + 5,
    width * 18 + 6,
    width * 19 + 3,
    width * 19 + 6
]

const level2 = [
    width * 11 + 4,
    width * 11 + 8,
    width * 12 + 4,
    width * 12 + 5,
    width * 12 + 6,
    width * 12 + 7,
    width * 12 + 8,
    width * 13 + 3,
    width * 13 + 4,
    width * 13 + 5,
    width * 13 + 6,
    width * 13 + 7,
    width * 13 + 8,
    width * 13 + 9,
    width * 14 + 3,
    width * 14 + 5,
    width * 14 + 6,
    width * 14 + 7,
    width * 14 + 9,
    width * 15 + 3,
    width * 15 + 4,
    width * 15 + 3,
    width * 15 + 8,
    width * 15 + 9,
    width * 16 + 4,
    width * 16 + 5,
    width * 16 + 6,
    width * 16 + 7,
    width * 16 + 8,
    width * 17 + 0,
    width * 17 + 2,
    width * 17 + 5,
    width * 17 + 6,
    width * 17 + 7,
    width * 18 + 1,
    width * 18 + 4,
    width * 18 + 5,
    width * 18 + 6,
    width * 18 + 7,
    width * 19 + 2,
    width * 19 + 3,
    width * 19 + 4,
    width * 19 + 5,
    width * 19 + 6,
]

const level3 = [
    width * 10 + 2,
    width * 10 + 7,
    width * 11 + 3,
    width * 11 + 6,
    width * 12 + 6,
    width * 12 + 3,
    width * 13 + 3,
    width * 13 + 6,
    width * 14 + 3,
    width * 14 + 4,
    width * 14 + 5,
    width * 14 + 6,
    width * 15 + 2,
    width * 15 + 3,
    width * 15 + 4,
    width * 15 + 6,
    width * 15 + 7,
    width * 15 + 0,
    width * 16 + 1,
    width * 16 + 2,
    width * 16 + 3,
    width * 16 + 4,
    width * 16 + 7,
    width * 16 + 8,
    width * 15 + 9,
    width * 17 + 1,
    width * 17 + 2,
    width * 17 + 3,
    width * 17 + 4,
    width * 17 + 5,
    width * 17 + 6,
    width * 17 + 7,
    width * 17 + 8,
    width * 18 + 1,
    width * 18 + 3,
    width * 18 + 5,
    width * 18 + 6,
    width * 18 + 8,
    width * 19 + 1,
    width * 19 + 4,
    width * 19 + 5,
    width * 19 + 8,

]

const level4 = [
    width * 10 + 2,
    width * 10 + 7,
    width * 11 + 1,
    width * 11 + 4,
    width * 11 + 5,
    width * 11 + 8,
    width * 12 + 2,
    width * 12 + 4,
    width * 12 + 5,
    width * 12 + 7,
    width * 13 + 3,
    width * 13 + 4,
    width * 13 + 5,
    width * 13 + 6,
    width * 14 + 2,
    width * 14 + 3,
    width * 14 + 4,
    width * 14 + 5,
    width * 14 + 6,
    width * 14 + 7,
    width * 15 + 0,
    width * 15 + 1,
    width * 15 + 2,
    width * 15 + 4,
    width * 15 + 5,
    width * 15 + 7,
    width * 15 + 8,
    width * 15 + 9,
    width * 16 + 1,
    width * 16 + 2,
    width * 16 + 4,
    width * 16 + 5,
    width * 16 + 7,
    width * 16 + 8,
    width * 17 + 2,
    width * 17 + 3,
    width * 17 + 4,
    width * 17 + 5,
    width * 17 + 6,
    width * 17 + 7,
    width * 18 + 0,
    width * 18 + 3,
    width * 18 + 6,
    width * 18 + 9,
    width * 19 + 1,
    width * 19 + 2,
    width * 19 + 4,
    width * 19 + 5,
    width * 19 + 7,
    width * 19 + 8,
]

const maps = [
    // [],
    level1,
    level2,
    level3,
    level4
]

function createGrid() {
    for (let i = 0; i < 210; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }

    squares = Array.from(document.querySelectorAll('.grid div'))

    for (let i = squares.length - 1; i > 199; i--) {
        squares[i].classList.add('taken')
    }
}

createGrid()

function createMap(map) {
    map.forEach(index => {
        squares[index].classList.add('taken')
        squares[index].classList.add('tetromino')
        squares[index].classList.add('monster')
        squares[index].style.backgroundColor = "black"
    })
}

// #endregion

//#region tetrominoes

const lTetromino = [
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
    [0, 1, width, width * 2],
    [width, width + 1, width + 2, width * 2 + 2]
]

const lTetrominoMirr = [
    [0, width, width * 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2],
    [0, 1, width + 1, width * 2 + 1],
    [width + 2, width * 2, width * 2 + 1, width * 2 + 2]
]

const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
]

const zTetrominoMirr = [
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
]

const tTetromino = [
    [0, width, width + 1, width * 2],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
    [1, width, width + 1, width + 2]
]

const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
]

const iTetromino = [
    [width - 1, width, width + 1, width + 2],
    [0, width, width * 2, width * 3],
    [width - 1, width, width + 1, width + 2],
    [0, width, width * 2, width * 3]
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

//#region assign functions to keyCodes, event listeners for keyboard
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

//#endregion

//#region moving and freezing functions

function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
}

function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        // start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * tetrominoes.length)
        currentRotation = 0
        current = tetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        checkGameOver()
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

//#endregion

//#region rotation functions
function isAtRight() {
    return current.some(index => (currentPosition + index + 1) % width === 0)
}

function isAtLeft() {
    return current.some(index => (currentPosition + index) % width === 0)
}

function isAtTaken() {
    return current.some(index => squares[(currentPosition + index)].classList.contains('taken'))
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
    if (isAtTaken()) {
        currentPosition -= width
        if (currentPosition < 0) {
            checkGameOver()
        }
        checkRotatedPosition(P)
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
    freeze()
}

//#endregion

//#region mini-grid

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
    [1, displayWidth + 1, displayWidth * 2, displayWidth * 2 + 1], // lTetromino
    [0, displayWidth, displayWidth * 2, displayWidth * 2 + 1], // lTetrominoMirr
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth * 2], // zTetrominoMirr
    [0, displayWidth, displayWidth + 1, displayWidth * 2], // tTetromino
    [displayWidth, displayWidth + 1, displayWidth * 2, displayWidth * 2 + 1], // oTetromino
    [displayWidth * 2 - 1, displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2] // iTetromino
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

//#region buttons

let grayScreen = document.querySelector("#gray-screen")
let pauseMenu = document.querySelector("#pause-menu")
let levelScreen = document.querySelector("#level")
let newLevelMenu = document.querySelector("#new-level-menu")
let gameOverMenu = document.querySelector("#game-over-menu")
newLevelMenu.style.display = "none"
gameOverMenu.style.display = "none"

// add functionality to a button
function btnPause() {
    if (isPaused && !gameOver) { // resume the game
        grayScreen.style.display = "none"
        pauseMenu.style.display = "none"
        newLevelMenu.style.display = "none"
        gameOverMenu.style.display = "none"
        let pauseDuration = new Date().getTime() - pauseTime
        startTime += pauseDuration
        isPaused = false
        timerUpdate = setInterval(updateTimer, 1000)
        console.log(timerUpdate)
        animate()

        draw()
    } else if (!isPaused && gameStart && !gameOver) { // pause the game
        startBtnPopUp.innerHTML = "restart"
        grayScreen.style.display = "block"
        pauseMenu.style.display = "flex"
        cancelAnimationFrame(animFrame)
        pauseTime = new Date().getTime()
        isPaused = true
        console.log("paused")
        clearInterval(gameTimer)
        gameTimer = null
        clearInterval(timerUpdate)
        timerUpdate = null
    } else { // start over
        btnStart()
        gameOver = false
    }
}

function btnStart() {
    //remove everything
    if (squares.length > 0) {
        cleanTheGrid()
    }
    level = 1
    levelScreen.innerHTML = level
    createMap(maps[level - 1])
    // console.log()
    // undraw()
    clearInterval(gameTimer)
    gameTimer = null
    clearInterval(timerUpdate)
    timerUpdate = null
    score = 0
    speed = 1000
    scoreDisplay.innerHTML = score
    timerDisplay.innerHTML = "00:00:00"
    startTime = new Date().getTime()
    isPaused = false
    elapsedTime = 0

    // close pause pop-up
    grayScreen.style.display = "none"
    pauseMenu.style.display = "none"
    newLevelMenu.style.display = "none"
    gameOverMenu.style.display = "none"

    // set parameters again
    animate()
    timerUpdate = setInterval(updateTimer, 1000)
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    displayShape()
    random = Math.floor(Math.random() * tetrominoes.length)
    current = tetrominoes[random][currentRotation]
    currentPosition = 4
    currentRotation = 0
    gameStart = true
    draw()
}

// startBtn.addEventListener('click', btnPause)
startBtnPopUp.addEventListener('click', btnStart)
resumeBtnPopUp.addEventListener('click', btnPause)

//#endregion

//#region scores & game over

var newScore = 0

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
                squares[index].classList.remove('monster')
                squares[index].style.backgroundColor = ''
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
            draw()

            if (newScore === 200) {
                speed = speed / 1.25
                newScore = 0
            }

            if (isMonsterKilled()) { // end of the level
                level++
                speed = 1000
                // gameTimer = null
                levelScreen.innerHTML = level
                btnPause()
                pauseMenu.style.display = "none"
                newLevelMenu.style.display = "flex"
                newLevelMenu.innerHTML = `level: ${level}`
                // console.log(level)
                cleanTheGrid()
                createMap(maps[level - 1])
                // console.log("level is ended")
            }
        }

        // console.log("score", score)
        // console.log("new score",newScore)

    }
}

function isMonsterKilled() {
    if (squares.some(square => square.classList.contains('monster'))) {
        return false
    } else {
        return true
    }
}

// game over
function checkGameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken')) || current.some(index => index < 0)) {
        if (lives.length > 0) {
            lives[0].remove()
            lives = document.querySelectorAll(".life");
            cleanTheGrid()
            createMap(maps[level - 1])
            speed = 1000
        } else {
            gameOverMenu.style.display = "flex"
            restartBtnPopUp.addEventListener('click', btnStart)
            gameOver = true
            clearInterval(timerUpdate)
            cancelAnimationFrame(animFrame)
        }
    }
}

function cleanTheGrid() {
    for (let i = 0; i < 200; i++) {
        squares[i].classList.remove('taken')
        squares[i].classList.remove('tetromino')
        squares[i].style.backgroundColor = ''
    }
}

//#endregion
let fpsElement = document.getElementById("fps")
const times = [];
let fps;
let frames = 0
function animate() {
    animFrame = window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - speed) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        fpsElement.innerHTML = fps.toFixed(2)
        frames++
        if (frames >= fps) {
            moveDown()
            frames = 0
        }
        if (!gameOver) {
            animate();
        } else {
            console.log(gameOver)
            checkGameOver()
        }

    });
}
