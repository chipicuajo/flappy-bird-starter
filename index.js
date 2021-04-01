let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';


// load all images
//let bg = document.createElement('img')
let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;
let score = 0
let pipeX = 200
let birdX = 30, birdY = 30, birdIncr = 2;

// event listeners for the bird movements
document.addEventListener('mousedown', () => {
    birdIncr = -5
})

document.addEventListener('mouseup', () => {
    birdIncr = 2
})

// number of pipes you need
let pipes = [
    {x: 200, y: -150},
    {x: 400, y: -100}
]

function draw(){
    // adding background image
    ctx.drawImage(bg, 0, 0)

    //adding bird image
    ctx.drawImage(bird, birdX, birdY)
    let distanceBetweenPipes = 100
    let constant = pipeNorth.height + distanceBetweenPipes

    // making the pipes moves
    for(let i=0; i< pipes.length; i++) {
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y)
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant )
        pipes[i].x = pipes[i].x - 2
        
        if (pipes[i].x == 20) {
            score++
        }

        // making an infinite loop for the pipes
        if (pipes[i].x +  pipeNorth.width < 0) {
            pipes[i] = {
                x: 400, 
                y: -Math.floor(Math.random() * pipeNorth.height)
            }
        }
        
        //collision
        //top
        if (birdY <= pipes[i].y + pipeNorth.height && birdX + bird.width == pipes[i].x){ 
            isGameOver = true;s
            console.log(1)
        }else if(birdY <= pipes[i].y + pipeNorth.height && birdX >= pipes[i].x){
                isGameOver = true;
                console.log(2)
         
        }

        if (birdY >= pipes[i].y + constant  && birdX + bird.width == pipes[i].x){ 
            isGameOver = true;
            console.log(1)
        }
        else if(birdY + bird.height >= pipes[i].y + constant  && birdX + bird.width >= pipes[i].x){
                isGameOver = true;
                console.log(2)
         
        }


        
            
        
        
        
    }
    ctx.drawImage(fg, 0 , canvas.height - fg.height)

    ctx.font = '22px Verdana'
    ctx.fillText(`Score is: ${score}`, 20, canvas.height - 50)


    if (birdY + bird.height > canvas.height - fg.height) {
        isGameOver = true
    }
    else {
        //bird animation
        birdY = birdY + birdIncr
    }

    //animation conditions
    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        audio.pause()
    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
}


let audio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1615874740/aom/home_bhfqfk.mp3')
window.addEventListener('load', () => {
    audio.play()
    draw()
})