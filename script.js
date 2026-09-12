let currentPlayer = "X";
let gameOver = false;

let xScore = 0;
let oScore = 0;


const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".status");

const xScoreDisplay = document.querySelector("#x-score");
const oScoreDisplay = document.querySelector("#o-score");


/* Player moves */

for (const cell of cells) {

    cell.addEventListener("click", function() {

        /* Stop if game is over */

        if (gameOver === true) {
            return;
        }


        /* Check if cell is empty */

        if (cell.textContent === "") {

            cell.textContent = currentPlayer;


            /* Add X or O class */

            if (currentPlayer === "X") {
                cell.classList.add("x");
            } else {
                cell.classList.add("o");
            }


            /* Check winner */

            const winner = checkWinner();

            if (winner) {

                if (winner === "X") {

                    xScore = xScore + 1;
                    xScoreDisplay.textContent = xScore;

                } else {

                    oScore = oScore + 1;
                    oScoreDisplay.textContent = oScore;

                }

                status.textContent = "Player " + winner + " Wins!";

                gameOver = true;

                return;
            }


            /* Check draw */

            let isDraw = true;

            for (const cell of cells) {

                if (cell.textContent === "") {
                    isDraw = false;
                }

            }

            if (isDraw) {

                status.textContent = "It's a Draw!";

                gameOver = true;

                return;
            }


            /* Change player */

            if (currentPlayer === "X") {
                currentPlayer = "O";
            } else {
                currentPlayer = "X";
            }


            status.textContent = "Player " + currentPlayer + "'s Turn";

        }

    });

}


/* Winning combinations */

const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


/* Check winner */

function checkWinner() {

    for (const combination of winningCombinations) {

        if (
            cells[combination[0]].textContent !== "" &&
            cells[combination[0]].textContent === cells[combination[1]].textContent &&
            cells[combination[1]].textContent === cells[combination[2]].textContent
        ) {

            /* Highlight winning cells */

            cells[combination[0]].classList.add("winner");
            cells[combination[1]].classList.add("winner");
            cells[combination[2]].classList.add("winner");


            return cells[combination[0]].textContent;

        }

    }

    return null;
}


/* Restart game */

const restart = document.querySelector(".restart");

restart.addEventListener("click", function() {

    for (const cell of cells) {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");

    }


    currentPlayer = "X";
    gameOver = false;

    status.textContent = "Player X's Turn";

});


/* Reset score */

const resetScore = document.querySelector(".reset-score");

resetScore.addEventListener("click", function() {

    xScore = 0;
    oScore = 0;

    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;

});

/* Theme */

const themeButtons = document.querySelectorAll(".theme-button");


for (const button of themeButtons) {

    button.addEventListener("click", function() {

        const selectedTheme = button.getAttribute("data-theme");


        /* Remove old themes */

        document.body.classList.remove("blue");
        document.body.classList.remove("dark");


        /* Apply selected theme */

        if (selectedTheme === "blue") {

            document.body.classList.add("blue");

        } else if (selectedTheme === "dark") {

            document.body.classList.add("dark");

        }


        /* Change active button */

        for (const themeButton of themeButtons) {

            themeButton.classList.remove("active");

        }

        button.classList.add("active");

    });

}
//subnc