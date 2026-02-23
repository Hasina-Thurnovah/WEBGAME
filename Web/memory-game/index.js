//object to state to store
let state = {
  level: null,
  phase: null,
  time: null,
  levelImages: [],
  randomIndex: null,
  imageQuestionId: null,
  correctContainer: null,
  title: null,
  wins: 0,
  losses: 0,
  manualLevel: false,
};
//tou doit passer par state

const li = document.querySelectorAll(".level-content ul li");

const gridContainer = document.querySelector(".grid-container");

let levelCount = 1;

document.querySelector(".left-btn").addEventListener("click", () => {
  if (levelCount > 1) {
    levelCount--;
  }
  state.manualLevel = true;
  state.level = Number(levelCount);
  state.wins=0
  document.querySelector(".current-level").textContent = state.level;

  saveToStorage();
  startGame();
});
document.querySelector(".right-btn").addEventListener("click", () => {
  if (levelCount < 6) {
    levelCount++;
  }
  state.manualLevel = true;
  state.level = Number(levelCount);
  state.wins=0
  document.querySelector(".current-level").textContent = state.level;

  saveToStorage();
  startGame();
});

let hideIntervallId;
let countDownIntervallId;

//function resetGame
function resetGame() {
  clearInterval(hideIntervallId);
  clearInterval(countDownIntervallId);

  imageContainer = document.querySelectorAll(".image-container");
  imageContainer.forEach((container) => {
   container.removeEventListener("click", handleClick);
   container.addEventListener("click", handleClick);


  });

  levelImages = [];
  randomIndex = null;
  imageQuestionId = null;
  correctContainer = null;

  scoreCard.innerHTML = "";
  question.innerHTML = "";
  timeSpan.textContent = "";
}

//creeate a image array
const cardArray = [
  {
    id: "",
    name: "fottball",
    image: "images/ball.jpeg",
  },
  {
    id: "",
    name: "basketball",
    image: "images/baskball.png",
  },
  {
    id: "",
    name: "bird",
    image: "images/bird.png",
  },
  {
    id: "",
    name: "car",
    image: "images/car.png",
  },

  {
    id: "",
    name: "cow",
    image: "images/cow.jpeg",
  },
  {
    id: "",
    name: "dog",
    image: "images/dog.jpeg",
  },
  {
    id: "",
    name: "fish",
    image: "images/fish.jpeg",
  },
  {
    id: "",
    name: "hen",
    image: "images/hen.png",
  },
  {
    id: "",
    name: "hotdog",
    image: "images/hot.png",
  },
  {
    id: "",
    name: "human",
    image: "images/human.jpeg",
  },
  {
    id: "",
    name: "ice",
    image: "images/ice.jpeg",
  },
  {
    id: "",
    name: "moto",
    image: "images/moto.jpeg",
  },
  {
    id: "",
    name: "pain",
    image: "images/pain.jpeg",
  },
  {
    id: "",
    name: "pate",
    image: "images/pate.jpeg",
  },
  {
    id: "",
    name: "pizza",
    image: "images/pizza.jpeg",
  },
  {
    id: "",
    name: "sandwich",
    image: "images/sand.png",
  },
  {
    id: "",
    name: "sirop",
    image: "images/sirop.jpeg",
  },
  {
    id: "",
    name: "cat",
    image: "images/cat.jpeg",
  },
];

//DOM
let imageContainer = document.querySelectorAll(".image-container");
const question = document.querySelector(".question");
const timeSpan = document.querySelector(".time-stamp span");
const image = document.querySelectorAll(".image-container img");
const scoreCard = document.querySelector(".score-card-message");

//LEVEL Comportements
let levelImages = [];

//generate a random and create a variable to random
let randomIndex;
let imageQuestionId; //id of all image
let correctContainer;

//put image on the imageContainer
function putAndShowImage() {
  for (let i = 0; i < imageContainer.length; i++) {
    const container = document.getElementById(imageContainer[i].id);
    const containerId = container.id; //get his id
    levelImages[i].id = containerId; //affect the id of container to the image on
    imageContainer[i].innerHTML =
      `<img id="${containerId}" src="${levelImages[i].image}">`;
  }
  question.style.borderRadius = "5px";
  question.style.transition = "all .5s";
}

//random array function
function aleatoireSort(array) {
  const newArray = [...array]; //pro methode
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

//function before the show
function showNumber() {
  for (let i = 0; i < imageContainer.length; i++) {
    imageContainer[i].innerHTML = i + 1;
    imageContainer[i].classList.add("before-show");
  }

  question.style.transition = "all .2s";

  //get the id of random array to imageId variable
  imageQuestionId = levelImages[randomIndex].id;
  const imageQuestion = levelImages[randomIndex].image;
  question.innerHTML = `<img src="${imageQuestion}">`;
  correctContainer = document.getElementById(imageQuestionId);
}

//function hide image
function hideImage() {
  let timeHide = 0;
  clearInterval(hideIntervallId);
  hideIntervallId = setInterval(() => {
    if (timeHide < 10) {
      timeHide++;
      if (timeHide > 6) {
        timeSpan.style.color = "red";
      }
      timeSpan.textContent = timeHide;
      putAndShowImage();
    } else {
      showNumber();
      clearInterval(hideIntervallId);

      //stop for 3 seconds
      setTimeout(() => {
        decreaseTimer();
        timeSpan.style.color = "green";
      }, 1000);
    }

    state.phase = "hide";
    state.time = timeHide;
    saveToStorage();
  }, 1000);
}

//count down intervall

function decreaseTimer() {
  let time = 10;

  clearInterval(countDownIntervallId);
  countDownIntervallId = setInterval(() => {
    if (time > 1) {
      time--;
      if (time < 4) {
        timeSpan.style.color = "red";
      }
      timeSpan.textContent = time;
    } else {
      clearInterval(countDownIntervallId);

      scoreCard.innerHTML = "You lose";
      timeSpan.textContent = "Temps ecoulé";
      correctContainer.innerHTML = `<img src="${levelImages[randomIndex].image}">`;
      state.correctContainer = correctContainer.innerHTML;
       

      if(state.wins>0) state.wins-=1;

      document.querySelector('.score').textContent=state.wins;
      saveToStorage();
      
      setTimeout(startGame, 5000);

      imageContainer.forEach((container) => {
        container.removeEventListener("click", handleClick);
      });


    }

    state.phase = "countdown";
    state.time = time;
    saveToStorage();
  }, 1000);
}

//function to check the id of image clicked and the id imageContainer of true answer
function checkAnswer(clickedId) {
  correctContainer.innerHTML = `<img src="${levelImages[randomIndex].image}">`;
  if (clickedId === imageQuestionId) {
    imageContainer.forEach(() => {
      correctContainer.innerHTML = `<img  src="${levelImages[randomIndex].image}">`;
      scoreCard.innerHTML = "Good Job 🤨";

      state.correctContainer = correctContainer.innerHTML;

       //show the score to the page

      imageContainer.forEach((container) => {
        container.removeEventListener("click", handleClick);
      });

    });
    state.wins += 1;
  } else {
    scoreCard.innerHTML = "You lose 😢";

    correctContainer.innerHTML = `<img src="${levelImages[randomIndex].image}">`;
    state.correctContainer = correctContainer.innerHTML;
   if(state.wins>0) state.wins -= 1;
  }

  saveToStorage();

  setTimeout(startGame, 3000);

  clearInterval(hideIntervallId);
  clearInterval(countDownIntervallId);

console.log(state.wins)

}

//handleClick
function handleClick(e) {
  checkAnswer(e.currentTarget.id);
}

imageContainer.forEach((container) => {
  container.addEventListener("click", handleClick);
});

function level() {
  imageContainer = document.querySelectorAll(".image-container");
  if (imageContainer.length === 0) return; //pour refuse le bug au moment de lenght egale 0

  const randomArray = aleatoireSort(cardArray);
  levelImages = randomArray.slice(0, imageContainer.length); //decouper le tableau random au meme nombre de imageContainer
  randomIndex = Math.floor(Math.random() * levelImages.length);

  prepareQuestion();
  putAndShowImage();
  hideImage();

  saveToStorage();
}

function clearAllTimers() {
  clearInterval(hideIntervallId);
  clearInterval(countDownIntervallId);
  hideIntervallId = null;
  countDownIntervallId = null;
}

//generate level 1
function level1() {
  level();
}

//level 2
function level2() {
  level();
}
function level3() {
  level();
}
function level4() {
  level();
}

function level5() {
  level();
}
function level6() {
  level();
}

//generate all html of all level

function htmlLevel1() {
  let html = `
          <div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
`;
  return html;
}
function htmlLevel2() {
  let html = `     
          <div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
          <div id="4" class="image-container"></div>
          <div id="5" class="image-container"></div>
          <div id="6" class="image-container"></div>
          
`;
  return html;
}
function htmlLevel3() {
  let html = `<div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
          <div id="4" class="image-container"></div>
          <div id="5" class="image-container"></div>
          <div id="6" class="image-container"></div>
          <div id="7" class="image-container"></div>
          <div id="8" class="image-container"></div>
          <div id="9" class="image-container"></div>
  `;
  return html;
}
function htmlLevel4() {
  let html = `
          <div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
          <div id="4" class="image-container"></div>
          <div id="5" class="image-container"></div>
          <div id="6" class="image-container"></div>
          <div id="7" class="image-container"></div>
          <div id="8" class="image-container"></div>
          <div id="9" class="image-container"></div>
          <div id="10" class="image-container"></div>
          <div id="11" class="image-container"></div>
          <div id="12" class="image-container"></div>
        `;
  return html;
}
function htmlLevel5() {
  let html = `
          <div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
          <div id="4" class="image-container"></div>
          <div id="5" class="image-container"></div>
          <div id="6" class="image-container"></div>
          <div id="7" class="image-container"></div>
          <div id="8" class="image-container"></div>
          <div id="9" class="image-container"></div>
          <div id="10" class="image-container"></div>
          <div id="11" class="image-container"></div>
          <div id="12" class="image-container"></div>
          <div id="13" class="image-container"></div>
          <div id="14" class="image-container"></div>
          <div id="15" class="image-container"></div>
        `;
  return html;
}
function htmlLevel6() {
  let html = `
          <div id="1" class="image-container"></div>
          <div id="2" class="image-container"></div>
          <div id="3" class="image-container"></div>
          <div id="4" class="image-container"></div>
          <div id="5" class="image-container"></div>
          <div id="6" class="image-container"></div>
          <div id="7" class="image-container"></div>
          <div id="8" class="image-container"></div>
          <div id="9" class="image-container"></div>
          <div id="10" class="image-container"></div>
          <div id="11" class="image-container"></div>
          <div id="12" class="image-container"></div>
          <div id="13" class="image-container"></div>
          <div id="14" class="image-container"></div>
          <div id="15" class="image-container"></div>
          <div id="16" class="image-container"></div>
          <div id="17" class="image-container"></div>
          <div id="18" class="image-container"></div>
        
        `;
  return html;
}

//function save to storage
function saveToStorage() {
  localStorage.setItem("memoryState", JSON.stringify(state));
}

//function to load the game and the level from the storage
function loadGameAndLevel() {
  const saved = JSON.parse(localStorage.getItem("memoryState"));

  if (saved) {
    state = saved;
  } else {
    state.level = 1;
    score.wins = 0;
    score.losses = 0;
  }

  startGame();
}

window.addEventListener("load", () => {
  loadGameAndLevel();
});

function prepareQuestion() {
  imageQuestionId = levelImages[randomIndex].id;
  state.imageQuestionId = imageQuestionId;
  saveToStorage();
}

//

function renderLevel(level) {
    switch (level) {
      case 1:
        gridContainer.innerHTML = htmlLevel1();
        break;
      case 2:
        gridContainer.innerHTML = htmlLevel2();
        break;
      case 3:
        gridContainer.innerHTML = htmlLevel3();
        break;
      case 4:
        gridContainer.innerHTML = htmlLevel4();
        break;
      case 5:
        gridContainer.innerHTML = htmlLevel5();
        break;
      case 6:
        gridContainer.innerHTML = htmlLevel6();
        break;
    }
  }


  function renderLevelByWin() {
    if (state.wins >= 15) return 6;
    if (state.wins >= 12) return 5;
    if (state.wins >= 9) return 4;
    if (state.wins >= 6) return 3;
    if (state.wins >= 3) return 2;
    return 1;
  }



function startGame() {
  clearAllTimers();
  //pour le level automatique

  
  if(!state.manualLevel){
    renderLevelByWin();
  }

  renderLevel(state.level);

  imageContainer = document.querySelectorAll(".image-container");
  resetGame();
  level();
  document.querySelector(".current-level").innerHTML = state.level;
 

  saveToStorage();
    document.querySelector('.score').textContent=state.wins;


}
