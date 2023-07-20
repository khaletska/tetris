import { Game, StoryGame } from './game.js';
const width = 10
let game

const grid = document.querySelector('.grid')
const miniGrid = document.querySelector('.mini-grid')

let startTime, pauseTime, timerUpdate, pressTimer
let elapsedTime = 0

let gameStarted = false
let isPaused = false
let storyMode = false
let storyWin = false
//for fps
let animFrame
let fpsElement = document.getElementById('fps')
const times = []
let fps
let lastTime = performance.now()


//query
const modeScreen = document.querySelector('#mode-screen')
const basicModeBtn = document.querySelector('#basic-mode-btn')
const storyModeBtn = document.querySelector('#story-mode-btn')

const livesContainer = document.querySelector('#lives')
const scoreDisplay = document.querySelector('#score')
const timerDisplay = document.querySelector('#timer')
const grayScreen = document.querySelector('#gray-screen')
const pauseMenu = document.querySelector('#pause-menu')
const pauseMenuRestartBtn = document.querySelector('#pause-menu-restart-btn')
const pauseMenuResumeBtn = document.querySelector('#pause-menu-resume-btn')
const enterNameMenu = document.querySelector('#enter-name-menu')
const gameOverMenuBtn = document.querySelector('#game-over-menu-btn')
const winMenuBtn = document.querySelector('#win-menu-btn')
const submitScore = document.querySelector('#submitscore')
const progressScreen = document.querySelector('#progress')

//#region OLYA
document.querySelector('#players-list-close-btn').addEventListener('click', () => {
    grayScreen.style.display = 'none'
    document.getElementById('players-list').style.display = 'none'
    btnPause()
})

document.querySelector('#open-players-board-btn').addEventListener('click', () => {
    grayScreen.style.display = 'flex'
    btnPause()
})
//#endregion OLYA

//TODO move this line to css:?
pauseMenu.style.display = 'none'
enterNameMenu.style.display = 'none'

//#region general listeners
pauseMenuRestartBtn.addEventListener('click', () => {
    pauseMenu.style.display = 'none'
    grayScreen.style.display = 'none'
    startGame()
})

pauseMenuResumeBtn.addEventListener('click', () => {
    btnPause()
})

submitScore.addEventListener('submit', () => {
    enterNameMenu.style.display = 'none'
    if (storyMode) {
        if (storyWin) {
            winMenu.style.display = 'flex'
            storyWin = false
            storyMode = false
            isPaused = false
        } else {
            gameOverMenu.style.display = 'flex'
            storyMode = false
            isPaused = false
        }
    } else {
        modeScreen.style.display = 'flex'
    }
})
//#endregion

//#region basic game
basicModeBtn.addEventListener('click', () => {
    modeScreen.style.display = 'none'
    grayScreen.style.display = 'none'
    startGame()
})

function startGame() {
    livesContainer.innerHTML = `
        <img class='life' alt='life' src='app/img/life.svg'>
        <img class='life' alt='life' src='app/img/life.svg'>
        <img class='life' alt='life' src='app/img/life.svg'>`

    clearInterval(timerUpdate)
    timerUpdate = null
    elapsedTime = 0
    switch (storyMode) {
        case true:
            game = new StoryGame(width)
            // progressScreen.innerHTML = `Speed: <span id="speedScreen">1</span><br>  Level: <span id="level">1</span>`
            document.querySelector('#level').game = game.level
            game.storyMode = true
            break
        default:
            game = new Game(width)
            progressScreen.innerHTML = `<p id="progress-speed" class="title-text">Speed: <span id="speedScreen">1</span></p>`
    }

    miniGrid.innerHTML = ''
    grid.innerHTML = ''
    game.tetrominoes.miniGrid.createMiniGrid(miniGrid)
    game.createGrid(grid)
    game.tetrominoes.grid = grid
    scoreDisplay.innerHTML = game.score
    document.querySelector('#speedScreen').innerHTML = game.speedLevel
    if (storyMode) {
        game.createMap()
    }

    timerDisplay.innerHTML = '00:00:00'
    startTime = new Date().getTime()
    timerUpdate = setInterval(updateTimer, 1000)

    gameStarted = true
    isPaused = false

    game.tetrominoes.draw()
    game.tetrominoes.miniGrid.drawNextTetromino(game.tetrominoes.nextRandom)
    document.addEventListener('keydown', control)
    document.addEventListener('keyup', () => {
        window.clearTimeout(pressTimer)
    })
    animateGame()
}


function animateGame() {
    animFrame = window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        fpsElement.innerHTML = fps.toFixed(2)
        const elapsed = now - lastTime;
        if (elapsed > game.speed) {
            lastTime = now
            game.tetrominoes.moveDown()
            updateGameData(game)
        }

        if (!game.isGameOver()) {
            if (!isPaused) {
                animateGame()
            }
        } else {
            gameOverMenuBtn.addEventListener('click', () => {
                gameOverMenu.style.display = 'none'
                modeScreen.style.display = 'flex'
            })
            cancelAnimationFrame(animFrame)
            gameOver()
        }
    })
}

function updateGameData(game) {
    if (game.tetrominoes.newScore != 0) {
        game.score += game.tetrominoes.newScore
        if (game.score % 200 === 0) {
            game.speed = game.speed / 1.25
            game.speedLevel++
            game.speedChanged = true
        }
        game.tetrominoes.newScore = 0
        scoreDisplay.innerHTML = game.score
        if (storyMode) {
            if (game.isMonsterKilled()) { // end of the level
                game.level++
                game.levelChanged = true
                game.speed = 1000
                game.speedLevel = 1
                game.speedChanged = true
            }
            if (game.levelChanged) {
                game.levelChanged = false
                btnPause()
                pauseMenu.style.display = 'none'
                if (game.level > game.maps.maps.length) {
                    winMenuBtn.addEventListener('click', () => {
                        winMenu.style.display = 'none'
                        modeScreen.style.display = 'flex'
                    })
                    storyWin = true
                    cancelAnimationFrame(animFrame)
                    win()
                } else {
                    game.cleanTheGrid()
                    game.createMap()

                    newLevelText.innerHTML = game.maps.levelTexts[game.level - 1]
                    newLevelPopUp.style.display = 'flex'
                    newLevelNumber.innerHTML = game.level
                    document.querySelector('#level').innerHTML = game.level
                }
            }
        }
    }
    if (game.speedChanged) {
        game.speedChanged = false
        document.querySelector('#speedScreen').innerHTML = game.speedLevel
    }
}
//#endregion basic game

//#region story game
const storyMainIntroduction = document.querySelector('#story-main-introduction')
const storyMainIntroductionBtn = document.querySelector('#story-main-introduction-btn')
const newLevelPopUp = document.querySelector('#new-level-pop-up')
const newLevelText = document.querySelector('#new-level-text')
const newLevelBtn = document.querySelector('#new-level-btn')
const newLevelNumber = document.querySelector('#level-number')
const winMenu = document.querySelector('#win-menu')
const gameOverMenu = document.querySelector('#game-over-menu')
//TODO move this lines to css:?
storyMainIntroduction.style.display = 'none'
newLevelPopUp.style.display = 'none'
winMenu.style.display = 'none'
gameOverMenu.style.display = 'none'
storyModeBtn.addEventListener('click', () => {
    storyMode = true
    modeScreen.style.display = 'none'
    storyMainIntroduction.style.display = 'flex'
})
storyMainIntroductionBtn.addEventListener('click', () => {
    storyMainIntroduction.style.display = 'none'
    newLevelPopUp.style.display = 'flex'
})
newLevelBtn.addEventListener('click', () => {
    newLevelPopUp.style.display = 'none'
    grayScreen.style.display = 'none'
    btnPause()
})

//#endregion

function win() {
    gameStarted = false
    clearInterval(timerUpdate)
    timerUpdate = null
    enterNameMenu.style.display = 'flex'
}

function gameOver() {
    gameStarted = false
    clearInterval(timerUpdate)
    timerUpdate = null
    grayScreen.style.display = 'block'
    enterNameMenu.style.display = 'flex'
}

//#endregion story game

//#region assign functions to keyCodes, event listeners for keyboard
function control(e) {
    if (!isPaused) {
        if (e.keyCode === 37) { // arrow left
            pressTimer = window.setTimeout(function () {
                game.tetrominoes.moveLeft()
            }, 10);
        } else if (e.keyCode === 38) { // arrow up
            game.tetrominoes.rotate()
        } else if (e.keyCode === 39) { // arrow right
            pressTimer = window.setTimeout(function () {
                game.tetrominoes.moveRight()
            }, 10);
        } else if (e.keyCode === 40) { // arrow down
            pressTimer = window.setTimeout(function () {
                game.tetrominoes.moveDown()
            }, 10);
        } else if (e.keyCode === 32) { // space
            game.tetrominoes.fastDrop()
        }
    }

    if (e.keyCode === 27) { // ESC
        document.getElementById('players-list').style.display = 'none'
        btnPause()
    }
}

function btnPause() {
    if (isPaused && gameStarted) { // resume the game
        let pauseDuration = new Date().getTime() - pauseTime
        startTime += pauseDuration
        isPaused = false
        timerUpdate = setInterval(updateTimer, 1000)
        animateGame()
        grayScreen.style.display = 'none'
        pauseMenu.style.display = 'none'
    } else if (!isPaused && gameStarted) { // pause the game
        clearInterval(timerUpdate)
        timerUpdate = null
        pauseTime = new Date().getTime()
        isPaused = true
        cancelAnimationFrame(animFrame)
        grayScreen.style.display = 'block'
        pauseMenu.style.display = 'flex'
    } else { // start over
        startGame()
    }
}

function updateTimer() {
    let currentTime = new Date().getTime()

    elapsedTime = currentTime - startTime

    // calculate hours, minutes, and seconds
    let hours = Math.floor(elapsedTime / 3600000)
    let minutes = Math.floor((elapsedTime % 3600000) / 60000)
    let seconds = Math.floor((elapsedTime % 60000) / 1000)

    // format output with leading zeros
    let timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0')

    timerDisplay.innerHTML = timeString
}
//#endregion control
