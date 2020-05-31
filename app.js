document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container')
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const startButton = document.querySelector('#startgame')
    const scoreElement = document.querySelector('#score')
    const width = 10;
    let nextRandom = 0;

    for (let x = 0; x < 200; x++) {
        grid.innerHTML += '<div></div>'
    }
    for (let x=0; x<10; x++){
        grid.innerHTML +='<div class="taken"></div>'
    }
    container.insertBefore(grid, container.childNodes[0])

    let squares = Array.from(document.querySelectorAll('.grid div'));

    //shapes modeling

    const lShape = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2,width*2+2],
        [1, width+1,width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ];

    const zShape = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
      ]
    
      const tShape = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oShape = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]

    const iShape = [
        [1,width+1,width*2+1,width*3+1],
        [width, width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width, width+1, width+2,width+3]
    ]

    const shapes = [lShape,zShape,tShape,oShape, iShape];

    let currentPosition = 4;
    let currentRotation = 0;
    //random shapes sequencie
    let random = Math.floor(Math.random()*shapes.length)
    let currentShape = shapes[random][currentRotation];
  

    //drawning the shapes
    function draw(){
        currentShape.forEach(index => {
            squares[currentPosition+index].classList.add('shapes')
        })
    }

    //remove the shapes
    function undraw(){
        currentShape.forEach(index => {
            squares[currentPosition+index].classList.remove('shapes')
        })
    }

    //timer for moving shapes at 1,5s
    timerId = setInterval(moveDown, 1000);

    function control(event){
        if(event.keyCode === 37){
            moveLeft()
        }
         
        if(event.keyCode === 38){
           rotate()
        }
         
        if(event.keyCode === 39){
            moveRight()
        }
         
        if(event.keyCode === 40){
            moveDown()
        }
         

    }

    function moveDown() {
        undraw()
        currentPosition+= width
        draw()
        freeze()
    }

    document.addEventListener('keyup', control)

    //function that stop shapes of going down the layer.
    function freeze() {
        if(currentShape.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            currentShape.forEach(index => squares[currentPosition + index].classList.add('taken'));
            nextRandom = Math.floor(Math.random() * shapes.length);
            random = nextRandom
            currentShape = shapes[random][currentRotation];
            currentPosition = 4;
            draw()      
            displayShape()     
        }
    }
    //move the shape to left if it empty and not at the edge.
    function moveLeft(){
        undraw()
        const atLeftEdge = currentShape.some(index => (currentPosition+index)% width === 0 )
        if(!atLeftEdge) currentPosition -= 1

        if(currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition+=1
        }
        draw()
        
    }
    //move the shape to left if it empty and not at the edge.
    function moveRight(){
        undraw()
        const atRightEdge = currentShape.some(index => (currentPosition+index)% width === width -1 )
        if(!atRightEdge) currentPosition += 1

        if(currentShape.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition-=1
        }
        draw()
        
    }

    function rotate(){
        undraw()
        currentRotation++
        if(currentRotation===currentShape.length) {
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
        [1,displayWidth+1, displayWidth*2+1,2],
        [0,displayWidth, displayWidth+1, displayWidth*2+1],
        [1,displayWidth, displayWidth+1,displayWidth+2],
        [0,1,displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('shapes')
        });

        upNextShape[nextRandom].forEach(index => { displaySquares[displayIndex + index].classList.add('shapes')})
    }

})