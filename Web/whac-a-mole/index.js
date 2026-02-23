const squares=document.querySelectorAll('.square');
const mole =document.querySelector('.mole');
const timeLeft=document.querySelector('.time');
const score=document.querySelector('.score');

let result=0;
let squareId;
let timeId;
let currentTime=60;
let falsePoistion=0;





function randomSquare(){
    squares.forEach(square=>{
        square.classList.remove('mole');
    })

    let randomSquare=squares[Math.floor(Math.random()*9)];
    randomSquare.classList.add('mole');
    squareId=randomSquare.id;


}


function moveMole(){
    timeId=setInterval(randomSquare,1000)
}
moveMole();


function countDown(){
    currentTime--;
    timeLeft.textContent=currentTime;

    if(currentTime===0){
        clearInterval(countDownId);
        clearInterval(timeId);
        if(result>=5){
            alert("Good")
        }else{
        alert("GAME OVER !Your score is "+result);

        }

    }

}

let countDownId=setInterval(countDown,1000);


squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        if(square.id===squareId){
            result++;
            score.textContent=result;
            squareId=null;

        }else{
            falsePoistion++;
            if(falsePoistion===5){
                if(result>=5){
                    alert("Good")
                }else{
                    alert('GAME OVER')
                }
                clearInterval(countDownId);
                clearInterval(timeId);
            }

        }
    })
})