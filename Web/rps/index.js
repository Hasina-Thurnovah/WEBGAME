//click the choice add event and all event
document.querySelector(".rock").addEventListener("click", () => {
  playGame("rock");
  hideConfirmation();
});
document.querySelector(".paper").addEventListener("click", () => {
  playGame("paper");
  hideConfirmation();
});
document.querySelector(".scissors").addEventListener("click", () => {
  playGame("scissors");
  hideConfirmation();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();
    console.log('a event');
    hideConfirmation();
  }
});
document.body.addEventListener("keydown", () => {});
document.querySelector(".autoplay").addEventListener("click", () => {
  autoPlay();
  hideConfirmation();
});
//reset score event

let getkey = true;
document.body.addEventListener("keydown", (event) => {
  function stopAutoplay() {
clearInterval(intervallId);
document.querySelector('.autoplay').textContent='Autoplay'
 
}
 stopAutoplay();
 
  if (event.key === "r") {
    //function to stop  autoplay mode if autoplay is true
 
    if (getkey) {
      showMessageConfirmation();
      getkey = false;
    } else {
      getkey = true;
      hideConfirmation();
    }
}

});

//choice yes event

document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    resetScore();
    hideConfirmation();
  } else if (event.key === "ArrowRight") {
    //call function return all button
    returnYesNoBtn();
    document.querySelector(".yes").style.backgroundColor = "whitesmoke";
    document.querySelector(".no").style.backgroundColor = "blue";
    if (event.key === "Enter") {
      hideConfirmation();
    }
  } else if (event.key === "ArrowLeft") {
    returnYesNoBtn();
    document.querySelector(".yes").style.backgroundColor = "blue";
    document.querySelector(".no").style.backgroundColor = "whitesmoke";
    if (event.key === "Enter") {
      resetScore();

    }
  }
});

const left = document.querySelector(".left");
const right = document.querySelector(".right");

//object to store the score
//and now let get the score from the localStorage
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
}; //but if it has not yet a score give the default value 000

//create an storage of computer'Score
let scoreComputer = JSON.parse(localStorage.getItem("scoreComputer")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement(); //that take page if reload
//let show the score in the page

function updateScoreElement() {
  document.querySelector(
    ".user"
  ).innerHTML = `🏆: ${score.wins}, 😥: ${score.losses}, 🙄: ${score.ties}`;
  document.querySelector(
    ".computer"
  ).innerHTML = `🏆: ${scoreComputer.wins}, 😥: ${scoreComputer.losses}, 🙄: ${scoreComputer.ties}`;
}

//function playgame
function playGame(playerMove) {
  const computerMove = pickerComputerMove();

  let result = "";

  //of all case in  playerMove choose scissors
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "😥 Tu as perdu.";
    } else if (computerMove === "paper") {
      result = "🏆 Tu as réussi.";
    } else if (computerMove === "scissors") {
      result = "🙄 Egal.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "🏆 Tu as réussi.";
    } else if (computerMove === "paper") {
      result = "🙄 Egal.";
    } else if (computerMove === "scissors") {
      result = "😥 Tu as perdu.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "🙄 Egal.";
    } else if (computerMove === "paper") {
      result = "😥 Tu as perdu.";
    } else if (computerMove === "scissors") {
      result = "🏆 Tu as réussi.";
    }
  }

  //prepare the result and the accomplissement
  function win() {
    left.classList.add("left-win");
    right.classList.add("right-lose");

    left.classList.remove("left-lose");
    left.classList.remove("left-tie");

    right.classList.remove("right-win");
    right.classList.remove("right-tie");
  }

  function tie() {
    left.classList.add("left-tie");
    right.classList.add("right-tie");

    left.classList.remove("left-lose");
    left.classList.remove("left-win");

    right.classList.remove("right-lose");
    right.classList.remove("right-win");
  }

  function lose() {
    left.classList.add("left-lose");
    right.classList.add("right-win");

    left.classList.remove("left-win");
    left.classList.remove("left-tie");

    right.classList.remove("right-lose");
    right.classList.remove("right-tie");
  }

  if (result === "🏆 Tu as réussi.") {
    score.wins += 1;
    scoreComputer.losses += 1;

    win();
  } else if (result === "😥 Tu as perdu.") {
    score.losses += 1;
    scoreComputer.wins += 1;
    lose();
  } else if (result === "🙄 Egal.") {
    score.ties += 1;
    scoreComputer.ties += 1;
    tie();
  }

  //let store that score to the localStorage

  localStorage.setItem("score", JSON.stringify(score));
  localStorage.setItem("scoreComputer", JSON.stringify(scoreComputer));

  //call the function to show the score on the page

  updateScoreElement();

  //call function generateWinCongratulations

  generateCongratulations();

  //show the result
  document.querySelector(".result").innerHTML = result;

  //show the choice of both in the case VS

  left.innerHTML = `<img src="images/${playerMove}-emoji.png">`;
  right.innerHTML = `<img src="images/${computerMove}-emoji.png">`;
}

//render the computer move heart of this game

function pickerComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

//reset score
function showMessageConfirmation() {
  document.querySelector(".confirmation").innerHTML = `
    Are you sure you want to reset score ?
    <button class="yes" onclick="
    
    resetScore();
    //<!-- on doit supprimer le score definitivement le score dans le localStorag-->
    localStorage.removeItem('score');
    localStorage.removeItem('scoreComputer');
    updateScoreElement();
    hideConfirmation();
    " style="background-color:blue" >Yes</button>
    <button class="no" onclick="
    hideConfirmation();
    " >No</button>
    `;
}

//function return yes and no button
function returnYesNoBtn() {
  return (html = `<button class="yes" onclick="
    " style="background-color:blue" >Yes</button>
    <button class="no" onclick="
    " >No</button>'`);
}
function hideConfirmation() {
  document.querySelector(".confirmation").innerHTML = "";
}

//reset score to 0
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  scoreComputer.wins = 0;
  scoreComputer.losses = 0;
  scoreComputer.ties = 0;
  localStorage.removeItem("score");
  localStorage.removeItem("scoreComputer");
  updateScoreElement();
}

//reset event click
document.querySelector(".reset").addEventListener("click", () => {
  showMessageConfirmation();
});

//autoplay
let isAutoplay = false;
//create a variable for stoping the intervall
let intervallId;

function autoPlay() {
  if (!isAutoplay) {
    intervallId = setInterval(() => {
      const playerMove = pickerComputerMove();
      playGame(playerMove);
    }, 2000); //even 1000 play game
    isAutoplay = true;
    document.querySelector(".autoplay").innerHTML = "Stop Playing";
  } else {
    isAutoplay = false;
    clearInterval(intervallId);
    document.querySelector(".autoplay").innerHTML = "AutoPlay";
  }
}

//function to return the clearIntervalId cause i need it in the eventListener on stopAutoplay
function returnIntervallId(){
    intervallId=setInterval(()=>{
      const playerMove=pickerComputerMove();
      playGame(playerMove);
      isAutoplay=true;
    })
 

  return intervallId;
}

//generate the win in the game or the congratulations
function generateCongratulations() {
  if (
    score.wins - scoreComputer.wins === 5 ||
    scoreComputer.wins - score.wins === 5
  ) {
    if (score.wins > scoreComputer) {
  
    } else if (scoreComputer.wins > score.wins) {
    }
  }
}

//help btn
document.querySelector('.help-btn').addEventListener('click',()=>{
  document.querySelector('.notation-content').classList.toggle('active');
  console.log('hello')
})