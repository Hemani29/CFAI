let gameData = [];
let originalData = [];

let score = 0;
let lives = 3;
let timer = 60;
let interval;

let difficulty = "easy";

function setDifficulty(level){

    difficulty = level;

    document.getElementById(
        "message"
    ).innerHTML =
    "Difficulty Selected: " +
    level.toUpperCase();
}

document
.getElementById("startBtn")
.addEventListener(
    "click",
    startGame
);

function startGame(){

    clearInterval(interval);

    score = 0;
    lives = 3;

    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;

    document.getElementById("message").innerHTML = "";
    document.getElementById("resultsPanel").innerHTML = "";

    gameData = [];

    let count;
    let maxValue;

    if(difficulty === "easy"){

        count =
        Math.floor(Math.random()*6)+10;

        maxValue = 9;
        timer = 60;
    }

    else if(difficulty === "medium"){

        count =
        Math.floor(Math.random()*11)+17;

        maxValue = 99;
        timer = 90;
    }

    else{

        count =
        Math.floor(Math.random()*11)+17;

        maxValue = 799;
        timer = 120;
    }

    document.getElementById(
        "timer"
    ).textContent = timer;

    for(let i=0;i<count;i++){

        gameData.push(
            Math.floor(
                Math.random()*maxValue
            ) + 1
        );
    }

    for(let i=0;i<Math.floor(count/4);i++){

        const randomIndex =
        Math.floor(
            Math.random()*gameData.length
        );

        gameData.push(
            gameData[randomIndex]
        );
    }

    originalData = [...gameData];

    renderBoard();

    interval = setInterval(() => {

        timer--;

        document.getElementById(
        "timer"
        ).textContent = timer;

        if(timer <= 0){

            gameOver(false);
        }

    },1000);
}

function renderBoard(){

    const board =
    document.getElementById(
    "gameBoard"
    );

    board.innerHTML = "";

    gameData.forEach((value,index)=>{

        const block =
        document.createElement("div");

        block.className = "block";

        block.textContent = value;

        block.onclick =
        ()=>removeDuplicate(index);

        board.appendChild(block);
    });
}

function removeDuplicate(index){

    const value = gameData[index];

    const count =
    gameData.filter(
        item => item === value
    ).length;

    if(count > 1){

        gameData.splice(index,1);

        score += 10;

        document.getElementById(
        "score"
        ).textContent = score;

        renderBoard();

        checkVictory();
    }

    else{

        lives--;

        document.getElementById(
        "lives"
        ).textContent = lives;

        if(lives <= 0){

            gameOver(false);
        }
    }
}

function checkVictory(){

    const unique =
    [...new Set(gameData)];

    if(unique.length === gameData.length){

        gameOver(true);
    }
}

function gameOver(win){

    clearInterval(interval);

    if(!win){

        document.getElementById(
        "message"
        ).innerHTML =
        "💀 GAME OVER";

        return;
    }

    const duplicates =
    originalData.filter(
        (item,index)=>
        originalData.indexOf(item)!==index
    );

    const uniqueDuplicates =
    [...new Set(duplicates)];

    document.getElementById(
    "message"
    ).innerHTML =
    "🏆 VICTORY! ALL DUPLICATES REMOVED";

    document.getElementById(
    "resultsPanel"
    ).innerHTML = `

    <div class="results-card">

        <h2>Game Analysis</h2>

        <p><b>Difficulty:</b>
        ${difficulty.toUpperCase()}</p>

        <p><b>Original Data:</b>
        [${originalData}]</p>

        <p><b>Duplicate Elements:</b>
        [${uniqueDuplicates}]</p>

        <p><b>Final Unique Data:</b>
        [${gameData}]</p>

        <p><b>Faster Method:</b>
        Array Method</p>

        <p><b>Array Time Complexity:</b>
        O(n)</p>

        <p><b>Linked List Time Complexity:</b>
        O(n)</p>

        <p><b>Reason:</b>
        Arrays generally perform faster due to
        contiguous memory access.</p>

        <p><b>Final Score:</b>
        ${score}</p>

    </div>
    `;
}