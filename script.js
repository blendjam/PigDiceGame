var scores, currentScore, playing, name1, name2, preScore;
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = 1;
var ludo = new Audio('./audio/ludo.mp3');
var one = new Audio('./audio/one.wav');
var six = new Audio('./audio/six.wav');
var doubleSix = new Audio('./audio/doublesix.wav');

var diceDOM = document.querySelector('.dice');
var diceBlock = document.querySelector('.dice-div');
diceDOM.style.display = 'block';
diceBlock.style.display = 'block';

function changePlayer() {
    currentScore = 0;
    preScore = 0;
    document.querySelector('.p' + activePlayer + '-current').textContent = 0;
    activePlayer = (activePlayer === 1 ? 0 : 1);
    document.querySelector('.left').classList.toggle('active');
    document.querySelector('.right').classList.toggle('active');

}

function roll() {
    if (playing) {
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.src = './img/dice-' + dice + '.png';
        if(preScore === 6 && dice === 6){
            doubleSix.play();
            scores[activePlayer] = 0;
            dice = 0;
            diceDOM.classList.remove('move2');
            window.requestAnimationFrame(function () {
                diceDOM.classList.add('move2');
            });
            document.querySelector('.p' + activePlayer + '-score').classList.remove('move');
            window.requestAnimationFrame(function(){
                activePlayer = (activePlayer === 1 ? 0 : 1);
                document.querySelector('.p' + activePlayer + '-score').classList.add('move');
                activePlayer = (activePlayer === 1 ? 0 : 1);
            })
            document.querySelector('.p' + activePlayer + '-score').textContent = scores[activePlayer];
            changePlayer();
        }else if (dice != 1) {
            ludo.play();
            currentScore += dice;
            if(dice === 6)
                six.play();
            diceBlock.classList.remove('rotate');
            window.requestAnimationFrame(function () {
                diceBlock.classList.add('rotate');
            });
            document.querySelector('.p' + activePlayer + '-current').textContent = currentScore;
        } else {
            one.play();
            diceDOM.classList.remove('move');
            window.requestAnimationFrame(function () {
                diceDOM.classList.add('move');
            });
            changePlayer();
        }
        preScore = dice;
    }
}

function hold() {
    if (playing && currentScore > 0) {
        scores[activePlayer] += currentScore
        if (scores[activePlayer] >= 100) {
            document.querySelector('.p' + activePlayer + '-score').textContent = scores[activePlayer];
            document.querySelector('.p' + activePlayer + '-name').textContent = 'Winner!!';
            document.querySelector('.active').classList.add('winner');
            playing = 0;
        } else {
            document.querySelector('.p' + activePlayer + '-score').textContent = scores[activePlayer];
            changePlayer();
        }
    }
}

function newGame() {
    scores = [0, 0];
    currentScore = 0;
    playing = 1;
    document.querySelector('.p' + activePlayer + '-current').textContent = '0';
    document.querySelector('.p' + activePlayer + '-name').textContent = 'Player ' + (activePlayer + 1);
    document.querySelector('.active').classList.remove('winner');
    document.querySelector('.left').classList.add('active');
    document.querySelector('.right').classList.remove('active');
    document.querySelector('.p0-score').textContent = '0';
    document.querySelector('.p1-score').textContent = '0';
    activePlayer = 0;
}
document.querySelector('.roll-dice').addEventListener('click', roll);
document.querySelector('.hold').addEventListener('click', hold);
document.querySelector('.new-game').addEventListener('click', newGame);