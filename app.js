/******  PIG DICE GAME  *********/

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as they wish. Each result gets added to their ROUND score
- BUT, if the player rolls a 1, all of their ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that their ROUND score gets added to their GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game :)

*/

 
//todo
//  - add how to play rules (mayb a mouse hover over thing ) 


//variables
var scores, roundScore, activePlayer, gamePlaying;

//intinalize the game
init();

//Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1.random number
        var dice = Math.floor(Math.random() * 6) + 1;
        
        //2.display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3.update the round score only if rolled number was not a 1
        if (dice !== 1) {
            //add  score
            roundScore += dice 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //nextplayer.03
            nextPlayer();
        }
    }
});

//Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        //add current score to global score. 
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }    
    }
});

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

//functions 
//Next Player function
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//Initialize function
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0; 
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
