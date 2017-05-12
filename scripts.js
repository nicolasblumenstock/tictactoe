// console.log('taco')
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var takenSquares = [];
var winningCombos = [
	['A1','B1', 'C1'],
	['A2','B2', 'C2'],
	['A3','B3', 'C3'],
	['A1','A2', 'A3'],
	['B1','B2', 'B3'],
	['C1','C2', 'C3'],
	['A1','B2', 'C3'],
	['A3','B2', 'C1']
]
var squares = document.getElementsByClassName('square');
var gameEnd = false;
var onePlayerGame = true;


function singlePlayer(){
	if (onePlayerGame != true){
		onePlayerGame = true;
	};
}

function twoPlayer(){
	if(onePlayerGame == true){
		onePlayerGame = false;
	};
};

function newGame(){
	if (takenSquares.length >= 1){
		takenSquares.length = 0;
		player1Squares.length = 0;
		player2Squares.length = 0;
		whosTurn = 1;
		gameEnd = false;
		for (i = 0; i < squares.length; i++){
			squares[i].innerHTML = "";
			if (squares[i].className == " winning-square"){
			squares[i].className -= " winning-square";
			};
		};
	};
};


function markSquare(currentSquare, whoJustWent){
	var messageElement = document.getElementById('message');
	var squareResult = "";
	if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
		// console.log("This Square is Taken.");
		squareResult = "Sorry, this space is taken.";
	}
	else if (whosTurn == 1){
	currentSquare.innerHTML = "X";
	whosTurn = 2;
	squareResult = "";
	player1Squares.push(currentSquare.id);
	takenSquares.push(currentSquare.id);
	console.log(takenSquares)
	document.getElementById('player1').style.backgroundColor = "white";
	document.getElementById('player2').style.backgroundColor = "green";	
	checkWin(player1Squares,1);
	if (onePlayerGame == true){
		computerMove();
	}
	}else if (onePlayerGame == false){
		currentSquare.innerHTML = "O";
		whosTurn = 1;
		squareResult = "";
		player2Squares.push(currentSquare.id);
		takenSquares.push(currentSquare.id);
		document.getElementById('player1').style.backgroundColor = "green";
		document.getElementById('player2').style.backgroundColor = "white";
		checkWin(player2Squares,2);	
	}
	messageElement.innerHTML = squareResult;
};


for (i = 0; i < squares.length; i++){
	// console.log(squares[i]);
	squares[i].addEventListener('click', function(event){
		// console.log('user clicked square');
		if (!gameEnd){
		markSquare(this);
	};
	});
};

function checkWin(currentPlayersSquares,whosTurn){
	for (let i = 0; i < winningCombos.length; i++){
		var squareCount = 0;
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j];
			if (currentPlayersSquares.indexOf(winningSquare) > -1){
				squareCount++;
			};
		};
	if(squareCount == 3){
		console.log('Player ' + whosTurn + " Won the Game!");
		gameOver(whosTurn,winningCombos[i]);
		break;
	};
};
};

function gameOver(whoJustWon,winningCombo){
	var messageElement = document.getElementById('message')
	var item = "Congratulations to Player " + whoJustWon + ". You won with " + winningCombo + "!";
	messageElement.innerHTML = item;
	for (let i = 0; i < winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square'
	};
	gameEnd = true;
};

function computerMove(){
	var randomCircle = Math.floor(Math.random() * 9);
	console.log(randomCircle);
	if (!gameEnd){
	for (j = 0; j < squares.length; j++){
		if ((squares[randomCircle].innerHTML == "X") || (squares[randomCircle].innerHTML == "O")){
			randomCircle = Math.floor(Math.random() * 9);
			console.log(randomCircle);
		} else if(squares[randomCircle].innerHTML != "X" || squares[randomCircle].innerHTML != "O") {
			squares[randomCircle].innerHTML = "O";
			whosTurn = 1;
			squareResult = "";
			player2Squares.push(squares[randomCircle].id);
			takenSquares.push(squares[randomCircle].id);
			console.log(takenSquares);
			document.getElementById('player1').style.backgroundColor = "green";
			document.getElementById('player2').style.backgroundColor = "white";
			checkWin(player2Squares,2);
			break;
		};
		};

	};
};










