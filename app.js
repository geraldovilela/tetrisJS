document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    for (let x = 0; x < 200; x++) {
        grid.innerHTML += '<div></div>'
    }
    for (let x=0; x<10; x++){
        grid.innerHTML +='<div class="taken"></div>'
    }
    document.body.insertBefore(grid, document.body.childNodes[4])

    let squares = Array.from(document.querySelectorAll('.grid div'));

    const body = document.querySelector('body');
    const startButton = document.querySelector('#startgame')
    const scoreElement = document.querySelector('#score')
    const width = 10;


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
    //random shapes sequencie
    let random = Math.floor(Math.random()*shapes.length)
    let currentShape = shapes[random][0];
  

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

    function moveDown() {
        undraw()
        currentPosition+= width
        draw()
    }


})