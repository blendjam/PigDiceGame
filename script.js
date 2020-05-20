var scores, currentScore, playing, name1, name2, preScore, ludo, one, six, doubleSix, maxScore;
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = 1;
ludo = new Audio('./audio/ludo.mp3');
one = new Audio('./audio/one.wav');
six = new Audio('./audio/six.wav');
doubleSix = new Audio('./audio/doublesix.wav');

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
var read = 1;
function roll() {
    if (playing) {
        //Calculaing the dice
        var dice = Math.floor(Math.random() * 6) + 1;
        diceDOM.src = './img/dice-' + dice + '.png';

        //Removing the animation
        diceDOM.classList.remove('move2');
        diceDOM.classList.remove('move');
        diceBlock.classList.remove('rotate');

        //Naming
        if (read) {
            name1 = document.getElementById('name0').value;
            name2 = document.getElementById('name1').value;
            if(name1.length == 0 || name2.length == 0){
                name1 = 'Player 1';
                name2 = 'Player 2';
            }
            document.querySelector('.p0-name').textContent = name1;
            document.querySelector('.p1-name').textContent = name2;
            read = 0;
        }

        //Dice conditions
        if (preScore === 6 && dice === 6) {
            doubleSix.play();
            scores[activePlayer] = 0;
            dice = 0;

            //Jitter animation
            window.requestAnimationFrame(function () {
                diceDOM.classList.add('move2');
            });
            //Jitter animation for the number
            document.querySelector('.p' + activePlayer + '-score').classList.remove('move');
            window.requestAnimationFrame(function () {
                activePlayer = (activePlayer === 1 ? 0 : 1);
                document.querySelector('.p' + activePlayer + '-score').classList.add('move');
                activePlayer = (activePlayer === 1 ? 0 : 1);
            })

            //Update the score
            document.querySelector('.p' + activePlayer + '-score').textContent = '0';
            changePlayer();
        } else if (dice != 1) {
            ludo.play();
            currentScore += dice;
            if (dice === 6)
                six.play();
            //Rotation animation on dice
            window.requestAnimationFrame(function () {
                diceBlock.classList.add('rotate');
            });

            //Display the score
            document.querySelector('.p' + activePlayer + '-current').textContent = currentScore;
        } else {
            one.play();

            //Jitter animation on one
            window.requestAnimationFrame(function () {
                diceDOM.classList.add('move');
            });
            changePlayer();
        }
        //Storing the previous score
        preScore = dice;
    }
}

function hold() {
    if (playing && currentScore > 0) {
        scores[activePlayer] += currentScore
        maxScore = document.getElementById('max').value;
        if(maxScore.length == 0)
            maxScore = 100;

        //Winning Condition
        if (scores[activePlayer] >= maxScore) {
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
    document.querySelector('.p0-name').textContent = name1;
    document.querySelector('.p1-name').textContent = name2;
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