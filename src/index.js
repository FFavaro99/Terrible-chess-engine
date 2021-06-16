import {PIECES, COLOURS, coordToIndex} from './defs.mjs';
import Board from './board.mjs';
import p from 'prompt-sync';
import moveGenerator from './moveGenerator.mjs';
import search from './search.mjs';


/// MISSING FEATURES ///
/* 
    //RULES
        - Castling     should I implement it in the movementInstructions or trim the moveGenerator array? I am for the second...
        - En passant        for this I need to memorize the last 2 chessboards (or maybe moves?) and see if the new chessboard
        - User move legality check          find what piece is on the starting square, go through the moveInstructions to generate the possible chessboards, then find the chessboards where the target square contains that piece and loop through it to verify it's exactly the same.
*/


const prompt = p();

const initiateBoard = () => {
    Board.colours = Board.populateColours();
    Board.pieces = Board.populatePieces();
}

initiateBoard();


let chosenColour = -1;

do {
    let playerColour = prompt('What colour do you want to play as? (W=white, B=black)');
    if ( playerColour.toUpperCase().indexOf('W') >= 0 )
        chosenColour = COLOURS.WHITE;
    else if (playerColour.toUpperCase().indexOf('B') >= 0 )
        chosenColour = COLOURS.BLACK;
} while (chosenColour === -1);


let gameRunning = true;
console.log('Game is running. Type "exit" to exit the game');

Board.printBoard();

while (gameRunning) {

    if (Board.sideToMove === chosenColour){
        let move = prompt('What is your move?');
        if (move === 'exit'){
            gameRunning = false;
        }     //D5 to D6
        else {
            let coordinates = move.match(/\D\d/g);
            let startingSquare = coordinates[0];
            let targetSquare = coordinates[1];
            startingSquare = coordToIndex([startingSquare[0], startingSquare[1]]);
            targetSquare = coordToIndex([targetSquare[0], targetSquare[1]]);
            Board.pieces[targetSquare] = Board.pieces[startingSquare];
            Board.pieces[startingSquare] = PIECES.EMPTY;
            Board.log.push(0);
            console.clear();
            Board.printBoard();
        }
    }
    else {
        let allMoves = [];
        allMoves = [...allMoves, ...moveGenerator(Board.pieces, Board.sideToMove)];
        if (allMoves.length === 0){
            console.log('Game is over');
            gameRunning = false;
        }
        else {
            // Board.pieces = allMoves[Math.floor(Math.random() * allMoves.length)];
            let searchResult;
            if (Board.log.length < 50) {
                searchResult = search(Board.pieces, Board.sideToMove, 4);
            }
            else if(Board.log.length < 90) {
                searchResult = search(Board.pieces, Board.sideToMove, 5);
            }
            else if(Board.log.length < 120) {
                searchResult = search(Board.pieces, Board.sideToMove, 7);
            }
            else if(Board.log.length < 150) {
                searchResult = search(Board.pieces, Board.sideToMove, 10);
            }
            let bestMove = allMoves[searchResult.i];
            console.clear();
            Board.pieces = bestMove;
            Board.printBoard();
            console.log('/// Current Evaluation: ', searchResult.value, '///');
            Board.log.push(0);
        }
    }

    switch(Board.sideToMove){
        case COLOURS.WHITE:
            Board.sideToMove = COLOURS.BLACK;
            break;
        case COLOURS.BLACK:
            Board.sideToMove = COLOURS.WHITE;
            break;
    }
}