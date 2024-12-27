let game = function (){
    let boardSideSize = 3;
    let gameBoard = [0,0,0,0,0,0,0,0,0];
    let playerName = prompt("Enter player name: ");
    const PLAYER = 1;
    const BOT = 2;

    function play(){
        for(let i=0; i<boardSideSize*boardSideSize; i++){
            let boardCell = document.createElement('div');
            boardCell.classList.add('boardCell');
            boardCell.id = i.toString();
            boardCell.addEventListener('click', choose);

            let H3 = document.createElement('h3');
            boardCell.appendChild(H3);

            board.appendChild(boardCell);
        }

        button.addEventListener('click', reset)
        button.addEventListener('click', play)
    }

    function choose(event){
        let boardID = parseInt(event.target.id)
        if (gameBoard[boardID] !== 0){
            return;
        }
        gameBoard[boardID] = 1;
        let H3 = event.target.querySelector('h3');
        H3.textContent = 'X';
        if (checkWin(PLAYER, playerName)){
            button.disabled = false;
            return;
        }
        randomBot();
        if (checkWin(BOT, 'Bot')){
            button.disabled = false;
        }

    }

    function reset(){
        button.disabled = true;
        announcePara.textContent = '';
        gameBoard = [0,0,0,0,0,0,0,0,0];
        board.replaceChildren();
    }

    function check_space(){ // false for no more space
        const availablePositions = gameBoard
        .map((value, index) => value === 0 ? index : null)
        .filter(index => index !== null);

        // Check if there are any available positions
        if (availablePositions.length === 0) {
            console.log("No available moves left. Game over.");
            return false;
        }
        return true
    }

    function randomBot(){
        const availablePositions = gameBoard
        .map((value, index) => value === 0 ? index : null)
        .filter(index => index !== null);

        // Check if there are any available positions
        if (availablePositions.length === 0) {
            console.log("No available moves left. Game over.");
            return;
        }

        // Select a random index from the available positions
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        const chosen = availablePositions[randomIndex];

        gameBoard[chosen] = 2;
        let cell = document.getElementById(chosen.toString());
        let H3 = cell.querySelector('h3');
        H3.textContent = 'O';
    }

    function checkWin(actor, name){ // actor 1 is player, 2 is bot
        if (gameBoard[0] === actor && gameBoard[4] === actor && gameBoard[8] === actor){
            announcePara.textContent = `${name} wins!`;
            return true;
        }
        else if (gameBoard[2] === actor && gameBoard[4] === actor && gameBoard[6] === actor){
            announcePara.textContent = `${name} wins!`;
            return true;
        }

        for(let i=0; i<boardSideSize*boardSideSize; i+=3){ // Check horizontal
            let status = true;
            for(let j=i; j<i+3; j++){
                if (gameBoard[j] !== actor){
                    status = false;
                    break;
                }
            }
            if (status){
                announcePara.textContent = `${name} wins!`;
                return true;
            }
        }

        for(let i=0; i<boardSideSize; i++){ // Check vertical
            let status = true;
            for(let j=i; j<boardSideSize*boardSideSize; j+=3){
                if (gameBoard[j] !== actor){
                    status = false;
                    break;
                }
            }
            if (status){
                announcePara.textContent = `${name} wins!`;
                return true;
            }
        }

        if (!check_space()){
            announcePara.textContent = 'Tie!';
            return true;
        }

        return false;
    }

    return {play, playerName};
}()

let board = document.querySelector('#board');
let announcePara = document.querySelector('#announce p');
let button = document.querySelector('button');

game.play();