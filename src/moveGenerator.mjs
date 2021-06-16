import {PIECES, COLOURS} from './defs.mjs';
import MoveInstructions from './moveInstructions.mjs';

const checkDetection = (allMoves, sideToMove) => {
    let legalArray = [];
    
    if (sideToMove === COLOURS.WHITE) {
        for (let i = 0; i < allMoves.length; i++) {     //for each chessboard
            let kingIndex = allMoves[i].findIndex( (piece) => piece === PIECES.W_KING);
            let counterMoves = moveGenerator(allMoves[i], 1);       //find all the countermoves
            let legal = true;
    
            for (let board of counterMoves) {
                if (board[kingIndex] !== PIECES.W_KING){        //the king has been eaten
                    legal = false;
                    break;
                }
            }
            legalArray[i] = legal;
        }
    }
    else {
        for (let i = 0; i < allMoves.length; i++) {     //for each chessboard
            let kingIndex = allMoves[i].findIndex( (piece) => piece === PIECES.B_KING);
            let counterMoves = moveGenerator(allMoves[i], 0);       //find all the countermoves
            let legal = true;
    
            for (let board of counterMoves) {
                if (board[kingIndex] !== PIECES.B_KING){        //the king has been eaten
                    legal = false;
                    break;
                }
            }
            legalArray[i] = legal;
        }
    }
   
    // console.log(legalArray);
    let allLegalMoves = allMoves.filter( (board, index) => legalArray[index]);
    // console.log(`There are ${allLegalMoves.length} LEGAL moves in this position`);
    // console.log(allLegalMoves);

    return allLegalMoves;
}

const moveGenerator = (board, sideToMove) => {
    let allMoves = [];

    if (sideToMove === COLOURS.WHITE){
        for (let i = 0; i < 120; i++) {
            switch (board[i]) {
                case PIECES.W_PAWN:
                    allMoves = [...allMoves, ...MoveInstructions.wPawnMoves(board, i)];
                    break;
                case PIECES.W_BISHOP:
                    allMoves = [...allMoves, ...MoveInstructions.wBishopMoves(board, i)];
                    break;
                case PIECES.W_KNIGHT:
                    allMoves = [...allMoves, ...MoveInstructions.wKnightMoves(board, i)];
                    break;
                case PIECES.W_ROOK:
                    allMoves = [...allMoves, ...MoveInstructions.wRookMoves(board, i)];
                    break;
                case PIECES.W_QUEEN:
                    allMoves = [...allMoves, ...MoveInstructions.wQueenMoves(board, i)];
                    break;
                case PIECES.W_KING:
                    allMoves = [...allMoves, ...MoveInstructions.wKingMoves(board, i)];
            }
        }
    }

    else {
        for (let i = 0; i < 120; i++) {
            switch (board[i]) {
                case PIECES.B_PAWN:
                    allMoves = [...allMoves, ...MoveInstructions.bPawnMoves(board, i)];
                    break;
                case PIECES.B_BISHOP:
                    allMoves = [...allMoves, ...MoveInstructions.bBishopMoves(board, i)];
                    break;
                case PIECES.B_KNIGHT:
                    allMoves = [...allMoves, ...MoveInstructions.bKnightMoves(board, i)];
                    break;
                case PIECES.B_ROOK:
                    allMoves = [...allMoves, ...MoveInstructions.bRookMoves(board, i)];
                    break;
                case PIECES.B_QUEEN:
                    allMoves = [...allMoves, ...MoveInstructions.bQueenMoves(board, i)];
                    break;
                case PIECES.B_KING:
                    allMoves = [...allMoves, ...MoveInstructions.bKingMoves(board, i)];
            }
        }
    }

    // console.log(`There are ${allMoves.length} possible moves in this position`);
    return allMoves;
    
}

const generateAndDetectCheck = (board, sideToMove) => {
    // if (sideToMove === 0){
    //     console.log('White to move');
    // } else {
    //     console.log('black to move');
    // }
    let allMoves = moveGenerator(board, sideToMove);
    // console.log(allMoves.length + ' possible moves');
    let allLegalMoves = checkDetection(allMoves, sideToMove);
    // console.log(allLegalMoves.length + ' legal moves');
    return allLegalMoves;
}

export default generateAndDetectCheck;