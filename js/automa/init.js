/* INIT *****************************/

var playerOptions = [
	'Autometta',
	'none',
	'Human',
	'none',	
	'none',
	'none'
];


GAME.newGame(playerOptions);

var jug = GAME.getCurrentPlayer();

jug = GAME.advanceCurrentPlayer();

var card = AUTOMA.getCard();


