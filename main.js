'Use strict'
let playerScore = document.querySelectorAll('.scoreBoard div p')[0]
let computerScore = document.querySelectorAll('.scoreBoard div p')[1]

const myOptions = document.querySelectorAll('.playerPickContainer div')
const computerChoiceImg = document.querySelector('.computerSelect')
let myCountDown = document.querySelector('.countDown');
const replayBtn = document.querySelectorAll('.playAgainBtn button')



console.log('hey')
// localStorage.clear()
let globalPlayerValue;
if (localStorage.getItem('youScore') && localStorage.getItem('computerScore')) {
    playerScore.innerText = localStorage.getItem('youScore');
    computerScore.innerText = localStorage.getItem('computerScore')
}
else if (localStorage.getItem('youScore')) {
    playerScore.innerText = localStorage.getItem('youScore')
}
else if (localStorage.getItem('computerScore')) {
    computerScore.innerText = localStorage.getItem('computerScore')
}

else {
    playerScore.innerText = 0
    computerScore.innerText = 0
}


for (let i = 0; i < myOptions.length; i++) {
    myOptions[i].addEventListener('click', (e) => {

        let playerNumScore = 0;
        let computerNumScore = 0;
        e.target.style.pointerEvents = 'none'

        let computerValue;

        // define fuction
        const generateComputerRandomValue = () => {
            let computerOption = ['rock', 'paper', 'scissors']
            let randomNumber = Math.floor(Math.random() * computerOption.length)
            computerValue = computerOption[randomNumber];
            console.log(computerValue)
            if (computerValue === 'rock') {
                computerChoiceImg.style.display = 'block';
                computerChoiceImg.innerText = `✊`
            }
            else if (computerValue === 'paper') {
                computerChoiceImg.style.display = 'block';
                computerChoiceImg.innerText = `🖐`
            }
            else {
                computerChoiceImg.style.display = 'block';
                computerChoiceImg.innerText = `✌`
            }
        }


        let optionContainer = myOptions[0].parentElement;
        computerCountDown()
        setTimeout(generateComputerRandomValue, 4000)

        let playerValue;
        let winner;

        if (i === 0) {
            playerValue = 'rock';
            optionContainer.classList.add('selectedRock');
        }
        else if (i === 1) {
            playerValue = 'paper';
            optionContainer.classList.add('selectedPaper')
        }
        else {
            playerValue = 'scissors';
            optionContainer.classList.add('selectedScissors')
        }

        const evaluate = () => {
            if (playerValue === computerValue) {

                winner = 'no-one';
            }
            else if (playerValue === 'rock' && computerValue === 'scissors') {
                playerNumScore++
                winner = 'You'
            }
            else if (computerValue === 'rock' && playerValue === 'scissors') {
                computerNumScore++
                winner = 'Computer'
            }
            else if (computerValue === 'rock' && playerValue === 'paper') {
                playerNumScore++
                winner = 'You'
            }
            else if (computerValue === 'paper' && playerValue === 'rock') {
                computerNumScore++
                winner = 'Computer';
            }
            else if (computerValue === 'paper' && playerValue === 'scissors') {
                playerNumScore++
                winner = 'You'
            }
            else if (computerValue === 'scissors' && playerValue === 'paper') {
                computerNumScore++
                winner = 'Computer'
            }

            console.log(playerNumScore)
            console.log(computerNumScore)

            if (winner === 'You') {
                console.log(winner)
                let youCount = Number(playerScore.innerText)
                youCount++
                playerScore.innerText = youCount;
                localStorage.setItem('youScore', youCount)
                setTimeout(function () {
                    document.querySelector('.winnerMes div').innerText = 'You Win'
                    document.querySelector('.winnerContainer').style.display = 'block'
                }, 500)

                document.querySelector('.winnerMes button').addEventListener('click', () => {

                    document.querySelector('.winnerContainer').style.display = 'none'
                    document.querySelector('.playAgainContainer').style.display = 'block'


                })


            }
            else if (winner === 'Computer') {
                console.log(winner)
                let computerCount = Number(computerScore.innerText)
                computerCount++
                computerScore.innerText = computerCount
                localStorage.setItem('computerScore', computerCount);
                setTimeout(function () {
                    document.querySelector('.winnerMes div').innerText = 'Computer Wins'
                    document.querySelector('.winnerContainer').style.display = 'block'
                }, 500)
                document.querySelector('.winnerMes button').addEventListener('click', () => {
                    document.querySelector('.winnerContainer').style.display = 'none'
                    document.querySelector('.playAgainContainer').style.display = 'block'
                })

            }
            else {
                setTimeout(function () {
                    document.querySelector('.winnerMes div').innerText = 'Its a Tie'
                    document.querySelector('.winnerContainer').style.display = 'block'
                }, 1000)
                document.querySelector('.winnerMes button').addEventListener('click', () => {
                    document.querySelector('.winnerContainer').style.display = 'none'
                    document.querySelector('.playAgainContainer').style.display = 'block'
                })
                console.log(winner)
            }



        }

        setTimeout(evaluate, 4000);
        console.log(winner)


        console.log(winner)
        for (let i = 0; i < 2; i++) {
            {
                replayBtn[i].addEventListener('click', () => {
                    if (i === 0) {
                        location.reload()
                    }
                    else {
                        document.querySelector('.playAgainContainer').style.display = 'none'
                        document.querySelector('.winnerContainer .winnerMes div').innerText = 'Are you sure you want to quit';
                        document.querySelector('.winnerContainer').style.display = 'block';
                        document.querySelector('.winnerContainer .winnerMes button').addEventListener('click', () => {
                            window.close()
                        })
                        window.close()
                    }
                })
            }
        }
    })
}







const computerCountDown = () => {
    myCountDown.style.display = 'block';
    let countStringToNum = Number('1')
    let count = setInterval(function () {
        if (countStringToNum === 4) {
            clearInterval(count)
            myCountDown.style.display = 'none';
        }
        myCountDown.innerHTML = countStringToNum++
    }, 800)
}


// computerCountDown()