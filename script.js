let canvas = document.querySelector("#snake")
let context = canvas.getContext("2d")
let box = 32 // tamanho do quadrado
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box,
}
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0,0 ,16 * box, 16 * box)
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
         context.fillStyle = "green";
         context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box); 
}

//chama a update e chama o evento de tecla
document.addEventListener('keydown', update);

function update(event){
    //37 direito ou 38 pra baixo 39 pra esquerda e 40 pra cima
    if(event.keyCode == 37 && direction !== "right") direction = 'left';
    if(event.keyCode == 38 && direction !== "down") direction = 'up';
    if(event.keyCode == 39 && direction !== "left") direction = 'right';
    if(event.keyCode == 40 && direction !== "up") direction = 'down';
}

function iniciarJogo(){  

    //snake[0] e a cabeça dela
    //plano cartesiano
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box

    for (let i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert('Game Over :(');
        }

    }

    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x;//array na posicao 0 de x
    let snakeY = snake[0].y;//array na posicao 0 de y

    if(direction === 'right') snakeX += box;//acrescenta 1 quadrado a mais uma box a mais pro lado direito
    if(direction === 'left') snakeX -= box;
    if(direction === 'up') snakeY -= box;
    if(direction === 'down') snakeY += box;

    if(snakeX !== food.x || snakeY !== food.y){
        snake.pop();//retira o ultimo el do array
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    
    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead) //unshift acrescenta uma no primeiro elemento

}
//atualiza o jogo a cada 100 ms
let jogo = setInterval(iniciarJogo, 100);

 