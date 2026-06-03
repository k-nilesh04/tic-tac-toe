let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let header = document.getElementById("myHeader");

const originalText = document.getElementById("myHeader").innerText;
const originalFont =  document.getElementById("myHeader").style.fontFamily;
const originalColor = document.getElementById("myHeader").style.color;

const winSound = new Audio("fahhh.mp3"); 
const drawSound = new Audio("draw.mp3");   

let turnO = true;
let gameOver = false;

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click" , () =>{
        if (gameOver) {
            return;
        }
        if (turnO) {
            box.innerText = "O";
            box.style.color = '#0400ff'
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = 'red'
            turnO = true;
        }

        box.disabled = true;
        box.style.backgroundColor = "#ffffff";
        checkWinner();
    });
});


const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                gameOver = true;
                showWinner(pos1Val);
                disableBoxes();
                return;
            }
        }
    }

    const isDraw = [...boxes].every((box) => box.innerText.trim() !== "");
    if (isDraw) {
        gameOver = true;
        header.textContent = "It's a draw!";
        header.style.fontSize = "9vmin";
        header.style.fontWeight = 'bold'    
        header.style.color = "#490527";
        drawSound.currentTime = 0;
        drawSound.play();
    }
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
        if (box.innerText.trim() === "") {
            box.style.backgroundColor = "#430091";
            box.innerText = '🤫'
            
        }
    });
};

const resetGame = () => {
    turnO = true;
    gameOver = false;
    boxes.forEach((box) => {
        // window.location.reload();

        box.innerText = "";
        box.disabled = false;
        box.style.backgroundColor = "white"
    });
    document.getElementById("myHeader").style.fontFamily = originalFont;
    document.getElementById("myHeader").innerText = originalText;
    document.getElementById("myHeader").style.color = originalColor;
    document.getElementById("myHeader").style.fontWeight = 'bold'
    document.getElementById("myHeader").style.fontSize = '9vmin';

    winSound.pause();
    drawSound.pause();
    winSound.currentTime = 0;
    drawSound.currentTime = 0;

};

function showWinner(player) {
    header.style.fontWeight = 'bold'
    header.style.fontSize = '7vmin';
    winSound.currentTime = 0;
    winSound.play();

    if (player === 'O') {
            header.textContent = 'O is winner 🗿';   
            header.style.color = '#001aff';        
        } else {
            header.textContent = 'X is winner 🗿';
            header.style.color = '#f00000';
        }
}

resetButton.addEventListener("click", resetGame);



