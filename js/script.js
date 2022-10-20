const cards = document.querySelectorAll('.card');
const disabledGame = document.getElementById('id_disabled');
const cardsArea = document.getElementById('cards_area');
const btnPlay = document.getElementById('play_id');
const btnRestart = document.getElementById('restart_id');
const winGame = document.querySelector('.win_game');
const currentTime = document.querySelector('.current_time');

let cardOne, cardTwo;
let disableCard = false;
let marchedCard = 0;

function flipCard(e) {
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableCard) {
        clickedCard.classList.add('flip');
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo =clickedCard;
        disableCard = true;

        let cardOneImg = cardOne.querySelector('img').src;
        let cardTwoImg = cardTwo.querySelector('img').src;
        matchCard(cardOneImg, cardTwoImg);
    }
}

function matchCard (img1, img2) {
    if(img1 === img2) {
        marchedCard++;
        if(marchedCard == 6) {
            clearInterval(interval);
            setTimeout(() => {
                winGame.classList.remove('hide');
                if(millisecond < 9 && seconds < 9) {
                currentTime.textContent = `Your current time: 0${minutes}:0${seconds}:0${millisecond}`;
                } else if (millisecond < 9) {
                currentTime.textContent = `Your current time: 0${minutes}:${seconds}:0${millisecond}`;
                } else if (seconds < 9) {
                currentTime.textContent = `Your current time: 0${minutes}:0${seconds}:${millisecond}`;
                } else {
                currentTime.textContent = `Your current time: 0${minutes}:${seconds}:${millisecond}`;
                }

                
                   if (seconds <= 20 && minutes < 1) {
                document.querySelector('.first').classList.remove('hide');
              } 

                   if (seconds > 20 && seconds < 40 && minutes < 1) {
                document.querySelector('.second').classList.remove('hide');
              }

                   if (seconds >= 40 || minutes >= 1) {
                document.querySelector('.third').classList.remove('hide');
              }
            },
            setTimeout(() => {
                return refreshCards();
            
            }, 300), 2000);
        }
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    cardOne = cardTwo = "";
    return disableCard = false;
}
setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
}, 300);

setTimeout(() => {
    cardOne.classList.remove('shake', 'flip');
    cardTwo.classList.remove('shake', 'flip');
    cardOne = cardTwo = "";
    disableCard = false;
}, 1200);

}

function refreshCards() {
    marchedCard = 0;
    cardOne = cardTwo = "";
    disableCard = false;

    let imageArray = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
    imageArray.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        imgTag.src = `./img/monster_${imageArray[index]}.png`;
        card.addEventListener('click', flipCard);
    })
    disabledGame.classList.remove('hide');
    cardsArea.style.pointerEvents = "none";
        
}
refreshCards();

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

/* Start game */

btnPlay.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
})

btnRestart.addEventListener('click', () => {
    refreshCards();
    clearInterval(interval);
    millisecond = 00;
    seconds = 00;
    minutes = 00;

    tens.textContent = "00";
    sec.textContent = "00";
    min.textContent = "00";

    winGame.classList.add('hide');
    btnPlay.disabled = false;
    document.querySelector('.first').classList.add('hide');
    document.querySelector('.second').classList.add('hide');
    document.querySelector('.third').classList.add('hide');

})

function startGame() {
    btnPlay.disabled = true;
   disabledGame.classList.add('hide');
   cardsArea.style.pointerEvents = "all";
}

/* Time */

const tens = document.querySelector('#tens');
const sec = document.querySelector('#sec');
const min = document.querySelector('#min');

let millisecond = 00;
let seconds = 00;
let minutes = 00;

let interval;



function startTimer () {
  
  /* Milliseconds */
    millisecond++;

  if(millisecond < 9) {
    tens.innerText = "0" + millisecond;
  }

  if(millisecond > 9) {
    tens.innerText = millisecond;
  }


  if(millisecond > 99) {
    seconds++;
    sec.innerText = "0" + seconds;
    millisecond = 0;
    tens.innerText = "0" + millisecond;
  }

  /* Seconds */
  if(seconds < 9) {
    sec.innerText = "0" + seconds;
  }

  if(seconds > 9) {
    sec.innerText = seconds;
  }


  if(seconds > 59) {
    minutes++;
    min.innerText = "0" + minutes;
    seconds = 0;
    sec.innerText = "0" + seconds;
  }

}

/* Win Game */
