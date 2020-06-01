document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const miniGrid = document.querySelector('.mini-grid')
    const startButton = document.querySelector('#startgame')
    const scoreElement = document.querySelector('#score')
    const width = 10;
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'red',
        'orange',
        'blue',
        'purple',
        'green'
    ]

    for (let x = 0; x < 200; x++) {
        grid.innerHTML += '<div></div>'
    }
    for (let x = 0; x < 10; x++) {
        grid.innerHTML += '<div class="taken"></div>'
    }
    container.insertBefore(grid, container.childNodes[0])

    for (let x = 0; x < 16; x++) {
        miniGrid.innerHTML += '<div></div>'
    }
    container.insertBefore(miniGrid, container.childNodes[2])
    let squares = Array.from(document.querySelectorAll('.grid div'));

    //shapes modeling

    const lShape = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];

    const zShape = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tShape = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oShape = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iShape = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const shapes = [lShape, zShape, tShape, oShape, iShape];

    let currentPosition = 4;
    let currentRotation = 0;
    //random shapes sequencie
    let random = Math.floor(Math.random() * shapes.length)
    let currentShape = shapes[random][currentRotation]


    //drawning the shapes
    function draw() {
        currentShape.forEach(index => {
            squares[currentPosition + index].classList.add('shapes')
            squares[currentPosition + index].setAttribute(styleMedia, colors[random])
        })
    }

    //remove the shapes
    function undraw() {
        currentShape.forEach(index => {
            squares[currentPosition + index].classList.remove('shapes')
        })
    }

    //timer for moving shapes at 1,5s
    //timerId = setInterval(moveDown, 1000);

    function control(event) {
        if (event.keyCode === 37) {
            moveLeft()
        }

        if (event.keyCode === 38) {
            rotate()
        }

        if (event.keyCode === 39) {
            moveRight()
        }

        if (event.keyCode === 40) {
            moveDown()
        }


    }

    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    document.addEventListener('keyup', control)

    //function that stop shapes of going down the layer.
    function freeze() {
        if (currentShape.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            currentShape.forEach(index => squares[currentPosition + index].classList.add('taken'))
            nextRandom = Math.floor(Math.random() * shapes.length);
            random = nextRandom
            currentShape = shapes[random][currentRotation];
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            gameOver()
        }
    }
    //move the shape to left if it empty and not at the edge.
    function moveLeft() {
        undraw()
        const atLeftEdge = currentShape.some(index => (currentPosition + index) % width === 0)
        if (!atLeftEdge) currentPosition -= 1

        if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1
        }
        draw()

    }
    //move the shape to left if it empty and not at the edge.
    function moveRight() {
        undraw()
        const atRightEdge = currentShape.some(index => (currentPosition + index) % width === width - 1)
        if (!atRightEdge) currentPosition += 1

        if (currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1
        }
        draw()

    }

    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === currentShape.length) {
            currentRotation = 0;
        }
        currentShape = shapes[random][currentRotation]
        draw()
    }

    //shows the next shape on .mini-grid
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0


    const upNextShape = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('shapes')
        });

        upNextShape[nextRandom].forEach(index => { displaySquares[displayIndex + index].classList.add('shapes') })
    }

    //start pause function 
    startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * shapes.length);
            displayShape();
        }
    })

    //add Score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreElement.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('shapes')
                })
                const squareRemoved = squares.splice(i, width)
                squares = squareRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    function gameOver(){
        if(currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))){
            scoreElement.innerHTML += ' Gameover'
            clearInterval(timerId)
        }
    }

})