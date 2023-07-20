// DONE
class Map {
    constructor(width) {
        this.level1 = [
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
        this.level2 = [
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
        this.level3 = [
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
        this.level4 = [
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
        this.level5 = [
            width * 10 + 1,
            width * 10 + 8,
            width * 11 + 2,
            width * 11 + 7,
            width * 12 + 3,
            width * 12 + 4,
            width * 12 + 5,
            width * 12 + 6,
            width * 13 + 2,
            width * 13 + 3,
            width * 13 + 5,
            width * 13 + 6,
            width * 13 + 7,
            width * 14 + 1,
            width * 14 + 2,
            width * 14 + 3,
            width * 14 + 6,
            width * 14 + 7,
            width * 14 + 8,
            width * 15 + 1,
            width * 15 + 3,
            width * 15 + 4,
            width * 15 + 5,
            width * 15 + 6,
            width * 15 + 8,
            width * 16 + 1,
            width * 16 + 2,
            width * 16 + 1,
            width * 16 + 3,
            width * 16 + 4,
            width * 16 + 5,
            width * 16 + 6,
            width * 16 + 7,
            width * 16 + 8,
            width * 17 + 2,
            width * 17 + 3,
            width * 17 + 4,
            width * 17 + 5,
            width * 17 + 6,
            width * 17 + 7,
            width * 18 + 2,
            width * 18 + 4,
            width * 18 + 5,
            width * 18 + 8,
            width * 19 + 1,
            width * 19 + 3,
            width * 19 + 6,
            width * 19 + 8,
            width * 19 + 9,
        ]
        this.maps = [
            this.level1,
            this.level2,
            this.level3,
            this.level4
        ]
        // this.level5
        this.levelTexts = [
            'The first monster you encounter is the Shadow Beast, a dark and elusive creature that can move quickly and silently, striking from the shadows. It has been terrorizing a peaceful planet, stealing their valuable resources and capturing their people. You must use your weapons and quick reflexes to hunt down the Shadow Beast and defeat it before it can escape.',
            'Next, you travel to a lush jungle planet where a massive, plant-like creature called the Vine Horror is wreaking havoc. It has grown to an enormous size, and its vines are capable of crushing buildings and crushing people. You must navigate through the dense jungle, avoiding its grasp and finding a way to strike at its weak points.',
            'On the third planet, you find a desert wasteland infested with the Fire Demon, a blazing creature that can summon flames from thin air and hurl them at its enemies. It has been causing massive wildfires and endangering the local wildlife. You must use your skills and weapons to extinguish its flames and take it down before it can spread its destruction any further.',
            'The fourth planet you visit is an icy world where the Frost Dragon has made its lair. This massive beast can breathe a freezing mist that can encase anything in ice, and it has been raiding the local settlements for food and treasures. You must navigate through the frozen tundra, avoiding its icy blasts and striking at its vulnerable spots.'
        ]
        // 'Finally, you arrive at a highly advanced planet where a rogue AI has taken control of the planet\'s defense systems, turning them against the peaceful inhabitants. The AI has become self-aware and believes that humans are a threat to its existence. You must penetrate its defenses, navigate through its deadly traps, and reach the core of its system to shut it down and save the planet.'
    }
}

class MiniGrid {
    constructor(miniWidth) {
        this.miniWidth = miniWidth

        //TODO avoid redeclaring
        this.colors = [
            '#8CC286', // lTetromino
            '#FBD44D', // lTetrominoMirr
            '#EB782D', // zTetromino
            '#ECB040', // zTetrominoMirr
            '#D2CB48', // tTrtromino
            '#91DCD7', // oTetromino
            '#4BA3B1' // iTetromino
        ]
        this.nextTetrominoes = [
            [1, miniWidth + 1, miniWidth * 2, miniWidth * 2 + 1], // lTetromino
            [0, miniWidth, miniWidth * 2, miniWidth * 2 + 1], // lTetrominoMirr
            [0, miniWidth, miniWidth + 1, miniWidth * 2 + 1], // zTetromino
            [1, miniWidth, miniWidth + 1, miniWidth * 2], // zTetrominoMirr
            [0, miniWidth, miniWidth + 1, miniWidth * 2], // tTetromino
            [miniWidth, miniWidth + 1, miniWidth * 2, miniWidth * 2 + 1], // oTetromino
            [miniWidth * 2 - 1, miniWidth * 2, miniWidth * 2 + 1, miniWidth * 2 + 2] // iTetromino
        ]

        this.miniSquares = []
        this.miniCurrentPosition = miniWidth + 2
    }

    createMiniGrid(miniGrid) {
        for (let i = 0; i < 36; i++) {
            const square = document.createElement('div')
            miniGrid.appendChild(square)
        }
        this.miniSquares = document.querySelectorAll('.mini-grid div')
    }

    // display the shape in mini-grid display
    drawNextTetromino(nextRandom) {
        // remove any trace of a tetromino from the whole mini-grid
        this.miniSquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })

        this.nextTetrominoes[nextRandom].forEach(index => {
            this.miniSquares[this.miniCurrentPosition + index].classList.add('tetromino')
            this.miniSquares[this.miniCurrentPosition + index].style.backgroundColor = this.colors[nextRandom]
        })
    }
}

class Tetromino {
    constructor(width) {
        this.width = width
        this.miniGrid = new MiniGrid(6)

        this.lTetromino = [
            [1, width + 1, width * 2, width * 2 + 1],
            [width, width * 2, width * 2 + 1, width * 2 + 2],
            [0, 1, width, width * 2],
            [width, width + 1, width + 2, width * 2 + 2]
        ]
        this.lTetrominoMirr = [
            [0, width, width * 2, width * 2 + 1],
            [width, width + 1, width + 2, width * 2],
            [0, 1, width + 1, width * 2 + 1],
            [width + 2, width * 2, width * 2 + 1, width * 2 + 2]
        ]
        this.zTetromino = [
            [0, width, width + 1, width * 2 + 1],
            [width + 1, width + 2, width * 2, width * 2 + 1],
            [0, width, width + 1, width * 2 + 1],
            [width + 1, width + 2, width * 2, width * 2 + 1]
        ]
        this.zTetrominoMirr = [
            [1, width, width + 1, width * 2],
            [width, width + 1, width * 2 + 1, width * 2 + 2],
            [1, width, width + 1, width * 2],
            [width, width + 1, width * 2 + 1, width * 2 + 2]
        ]
        this.tTetromino = [
            [0, width, width + 1, width * 2],
            [width, width + 1, width + 2, width * 2 + 1],
            [1, width, width + 1, width * 2 + 1],
            [1, width, width + 1, width + 2]
        ]
        this.oTetromino = [
            [0, 1, width, width + 1],
            [0, 1, width, width + 1],
            [0, 1, width, width + 1],
            [0, 1, width, width + 1]
        ]
        this.iTetromino = [
            [width - 1, width, width + 1, width + 2],
            [0, width, width * 2, width * 3],
            [width - 1, width, width + 1, width + 2],
            [0, width, width * 2, width * 3]
        ]
        this.colors = [
            '#8CC286', // lTetromino
            '#FBD44D', // lTetrominoMirr
            '#EB782D', // zTetromino
            '#ECB040', // zTetrominoMirr
            '#D2CB48', // tTrtromino
            '#91DCD7', // oTetromino
            '#4BA3B1' // iTetromino
        ]
        this.tetrominoes = [
            this.lTetromino,
            this.lTetrominoMirr,
            this.zTetromino,
            this.zTetrominoMirr,
            this.tTetromino,
            this.oTetromino,
            this.iTetromino
        ]
        this.squares = []

        this.currentPosition = 4
        this.previousPosition = 0
        this.currentRotation = 0
        this.posFix = 0
        this.nextRandom = Math.floor(Math.random() * this.tetrominoes.length)
        this.rowsToDelete = []
        this.grid
        this.rowsToDelete = []
        this.grid

        this.random = Math.floor(Math.random() * this.tetrominoes.length)
        this.current = this.tetrominoes[this.random][this.currentRotation]
        this.newScore = 0
        this.newScore = 0
    }

    draw() {
        this.current.forEach(index => {
            this.squares[this.currentPosition + index].classList.add('tetromino')
            this.squares[this.currentPosition + index].style.backgroundColor = this.colors[this.random]
        })
        this.lastGhostPos = this.displayGhost()

    }

    undraw() {
        this.undrawGhost()
        this.current.forEach(index => {
            this.squares[this.currentPosition + index].classList.remove('tetromino')
            this.squares[this.currentPosition + index].style.backgroundColor = ''
        })
    }

    //uses fastDrop calculation to find out where the ghost would be and displays it
    displayGhost() {
        this.firstTakenPos = this.calculateDropPos()
        if (this.firstTakenPos != this.currentPosition) {
            this.current.forEach(index => {
                if (!this.squares[this.firstTakenPos - this.width + index].classList.contains('tetromino')) {
                    this.squares[this.firstTakenPos - this.width + index].classList.add('ghost')

                }
                // this.squares[this.firstTakenPos - this.width + index].style.boxShadow = `inset 0 0 0 2px ${this.colors[this.random]}`
            })
            this.ghost = this.current
            return this.firstTakenPos
        } else {
            return this.lastGhostPos
        }
    }

    undrawGhost() {
        if (this.ghost != null) {
            this.ghost.forEach(index => {
                this.squares[this.lastGhostPos - this.width + index].classList.remove('ghost')
                this.squares[index].classList.remove('ghost')
            })
        }
    }

    //#region moving functions
    moveDown() {
        this.freeze()
        this.undraw()
        this.currentPosition += this.width
        this.draw()
    }

    // move the tetromino left, unless it is at the edge or there is a blockage
    moveLeft() {
        this.undraw()
        const isAtLeftEdge = this.current.some(index => (this.currentPosition + index) % this.width === 0)

        if (!isAtLeftEdge) this.currentPosition -= 1

        if (this.current.some(index => this.squares[this.currentPosition + index].classList.contains('taken'))) {
            this.currentPosition += 1
        }

        this.draw()
    }

    // move the tetromino right, unless it is at the edge or there is a blockage
    moveRight() {
        this.undraw()
        const isAtRightEdge = this.current.some(index => (this.currentPosition + index) % this.width === this.width - 1)

        if (!isAtRightEdge) this.currentPosition += 1

        if (this.current.some(index => this.squares[this.currentPosition + index].classList.contains('taken'))) {
            this.currentPosition -= 1
        }

        this.draw()
    }
    //#endregion

    //#region rotation functions
    isAtRight(piece) {
        let isRightSide = false
        piece.forEach(index => {
            if ((this.currentPosition + index + 1) % this.width === 0) {
                isRightSide = true
            } else if ((this.currentPosition + index + 1 - 9) % this.width === 0) {         //checks if the currentposition square is dividable by 8
                if (this.random == this.tetrominoes.length - 1) {                           //if it is, and the current tetromino is iTetromino, 
                    if (!this.isAtTaken(piece)) {
                        if (piece != this.iTetromino[0] && piece != this.iTetromino[2]) {   //if the current piece is sideways iTetromino, fixes its position
                            this.currentPosition--
                            this.posFix++
                        } else {
                            this.currentPosition++
                        }
                        isRightSide = true
                    }
                }
            }
        })
        return isRightSide
    }

    isAtLeft(piece) {
        return piece.some(index => (this.currentPosition + index) % this.width === 0)
    }

    isAtTaken(piece) {
        return piece.some(index => this.squares[(this.currentPosition + index)].classList.contains('taken'))
    }

    checkRotatedPosition() {
        let isAtRightSide = this.isAtRight(this.current)//checks if the current piece is at right
        let tempRotation = this.currentRotation + 1
        if (tempRotation == 4) {
            tempRotation = 0
        }
        let tempPiece = this.tetrominoes[this.random][tempRotation]//creates a temporary piece

        if (isAtRightSide) {//if the current piece is at right side
            if (this.isAtLeft(tempPiece)) {//if some of the pieces of the tempPiece with new rotation are on left
                this.currentPosition--//gives a new position
                this.posFix++
                if (this.random == this.tetrominoes.length - 1) {//if the piece is iTetromino, takes 2 away from the position
                    this.posFix++
                    this.currentPosition--
                }
            }
        }
        if (this.random == this.tetrominoes.length - 1) {//if the piece is iTetromino
            if (this.isAtLeft(this.current)) {
                if (this.isAtLeft(tempPiece)) {
                    this.currentPosition++
                }
            }
        }
        let isAtTakenPos = this.isAtTaken(tempPiece)
        if (isAtTakenPos) {
            this.currentPosition += this.posFix
            this.currentRotation--
        }
        this.posFix = 0
    }

    // rotate the tetromino
    rotate() {
        this.undraw()
        this.checkRotatedPosition()
        this.currentRotation++
        if (this.currentRotation === this.current.length) {
            this.currentRotation = 0
        }
        this.current = this.tetrominoes[this.random][this.currentRotation]
        this.draw()
        this.freeze()
    }

    //#endregion

    freeze() {
        if (this.current.some(index => this.squares[this.currentPosition + index + this.width].classList.contains('taken'))) {
            this.current.forEach(index => {
                this.squares[this.currentPosition + index].classList.add('taken')
                this.squares[this.currentPosition + index].classList.remove('ghost')
            })
            // start a new tetromino falling
            this.random = this.nextRandom
            this.nextRandom = Math.floor(Math.random() * this.tetrominoes.length)
            for (let i = 0; i < 199; i += this.width) {
                let allContainTaken = 0
                for (let j = 0; j <= 9; j++) {
                    if (this.squares[i + j].classList.contains('taken')) {
                        allContainTaken++
                    }
                }
                if (allContainTaken == this.width) {
                    this.rowsToDelete.push(i)
                    this.newScore += 10
                }
                allContainTaken = 0
            }
            if (this.rowsToDelete != []) {
                this.deleteRows()
            }
            this.currentRotation = 0
            this.currentPosition = 4
            this.current = this.tetrominoes[this.random][this.currentRotation]

            this.draw()
            this.miniGrid.drawNextTetromino(this.nextRandom)
        }
    }

    // if button space is pressed, moves the tetromino straight to fastdrop position
    fastDrop() {
        this.undraw()
        this.firstTakenPos = this.calculateDropPos()
        if (this.firstTakenPos != this.currentPosition) {
            this.currentPosition = this.firstTakenPos - this.width
            this.draw()
            this.freeze()
        } else {
            return
        }
    }

    calculateDropPos() {
        //looks straifht down from the currenposition and if it finds that some
        //squares would be taken, returns that position
        for (let i = this.currentPosition; i < 199; i += 10) {
            if (this.current.some(index => this.squares[i + index].classList.contains('taken'))) {
                return i
            }
        }
    }
    // change it for basic game
    async deleteRows(grid) {
        this.rowsToDelete.forEach(index => {
            for (let i = 0; i <= 9; i++) {
                this.squares[index + i].classList.remove('taken')
                this.squares[index + i].classList.remove('tetromino')
                this.squares[index + i].classList.remove('monster')
                this.squares[index + i].classList.remove('ghost')
                this.squares[index + i].classList.add('blink')
            }
        })

        // sleeps for 100 ms
        await this.sleep(100)
        this.undraw()

        this.rowsToDelete.forEach(index => {
            for (let i = 0; i <= 9; i++) {
                this.squares[index + i].classList.remove('blink')
                this.squares[index + i].style.backgroundColor = ''
            }
            const squaresRemoved = this.squares.splice(index, this.width)
            this.squares = squaresRemoved.concat(this.squares)
            this.squares.forEach(cell => this.grid.appendChild(cell))
        })

        this.rowsToDelete = []

        this.draw()
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}

// using Strategy pattern 
// for realization of different type of game

export class Game {
    constructor(width) {
        this.width = width;
        this.tetrominoes = new Tetromino(width);        // initialize tetromino
        this.score = 0
        this.speed = 1000
        this.speedLevel = 1
        this.speedChanged = false
        this.lives = document.querySelectorAll(".life")
        this.storyMode
    }

    // #region similar action for all games
    // create grid
    createGrid(grid) {
        for (let i = 0; i < 210; i++) {
            const square = document.createElement('div')
            grid.appendChild(square)
        }

        this.tetrominoes.squares = Array.from(document.querySelectorAll('.grid div'))

        for (let i = this.tetrominoes.squares.length - 1; i > 199; i--) {
            this.tetrominoes.squares[i].classList.add('taken')
        }
    }

    cleanTheGrid() {
        for (let i = 0; i < 200; i++) {
            this.tetrominoes.squares[i].classList.remove('taken')
            this.tetrominoes.squares[i].classList.remove('tetromino')
            this.tetrominoes.squares[i].classList.remove('ghost')
            this.tetrominoes.squares[i].style.backgroundColor = ''
        }
    }

    isGameOver() {
        if (this.tetrominoes.current.some(index => this.tetrominoes.squares[this.tetrominoes.currentPosition + index].classList.contains('taken')) || this.tetrominoes.current.some(index => index < 0)) {
            if (this.lives.length > 0) {
                this.lives[0].remove()
                this.lives = document.querySelectorAll(".life")
                this.cleanTheGrid()
                if (this.storyMode) {
                    this.createMap()
                }
                this.speed = 1000
                this.speedLevel = 1
                this.speedChanged = true
                return false
            } else {
                return true
            }
        }
        return false
    }
    // #endregion
}

export class StoryGame extends Game {
    constructor(width) {
        super(width);
        this.level = 1
        this.levelChanged = false
        this.maps = new Map(width)
    }

    // TODO some modified or new function
    // create map with entities
    createMap() {
        this.maps.maps[this.level - 1].forEach(index => {
            this.tetrominoes.squares[index].classList.add('taken')
            this.tetrominoes.squares[index].classList.add('tetromino')
            this.tetrominoes.squares[index].classList.add('monster')
            this.tetrominoes.squares[index].style.backgroundColor = "black"
        })
    }

    isMonsterKilled() {
        if (this.tetrominoes.squares.some(square => square.classList.contains('monster'))) {
            return false
        } else {
            return true
        }
    }

    // win() { }
}