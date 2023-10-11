 const playgame = (function() {
    const gameCells = ["","","","","","","","",""];
    let circleTurn;
    const cross_class = 'cross';
    const circle_class = 'circle'
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
     
    //cacheDom
    const winelement = document.querySelector(".winning-msg")
    const winningtext = document.querySelector(".winning-msg-text")
    const gameBoard = document.querySelector(".gameboard");
    const restart = document.querySelector("#restartButton");
    const info = document.querySelector(".info");
    startGame();

    restart.addEventListener('click',startGame)
     
    function startGame () {
        render();
        circleTurn = false;
        winelement.classList.remove("show");
        info.innerText = "START";
    }

    //render function
    function render() {
        gameBoard.innerHTML = '';
        gameCells.forEach((_cell,index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('square');
            cellElement.id = index;
            cellElement.removeEventListener('click',handleClick);
            cellElement.addEventListener('click',handleClick,{once:true})
            gameBoard.append(cellElement);
        })
    }
    
    function handleClick(e) {
        const cell = e.target;
        const currentClass = circleTurn ? circle_class : cross_class;
        info.innerText =   `${currentClass == circle_class? "X's turn" : "Os's turn"} `
        placeMark(cell,currentClass);
        if(checkWin(currentClass)) {
            endGame(false)
        } else if(isDraw()) {
            endGame(true)
        } else {
            swapTurns();
        }
        
    }


    function endGame (draw) {
        if(draw) {
            winningtext.innerText = "its a Draw!"
        }
        else {
          winningtext.innerText = `${circleTurn? "O's Win!" : "X's Win!"}`  
        }
        winelement.classList.add('show');
    }

    function isDraw() {
        const cellElements = document.querySelectorAll(".square");
        return [...cellElements].every(cell => {
            return cell.firstChild?.classList.contains(circle_class) || cell.firstChild?.classList.contains(cross_class)
        })
    }

    function placeMark (cell,currentClass) {
        marker = document.createElement('div');
        marker.classList.add(currentClass);
        cell.append(marker);
    
    }

    function swapTurns() {
        circleTurn = !circleTurn;
    }

    function checkWin(currentClass) {
        const cellElements = document.querySelectorAll(".square");
         return winConditions.some(comb => {
             return comb.every(cell => { 
                return cellElements[cell].firstChild?.classList.contains(currentClass);
            })
        })
    }
 })();
    
 

    
