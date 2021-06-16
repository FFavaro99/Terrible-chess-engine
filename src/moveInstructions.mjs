import { PIECES } from './defs.mjs';
import {indexToCoord, RANKS} from './defs.mjs';


const moveToPosition = (board, startingIndex, targetIndex) => {
    let boardCopy = [...board];
    let piece = boardCopy[startingIndex];
    boardCopy[startingIndex] = PIECES.EMPTY;
    boardCopy[targetIndex] = piece;
    return boardCopy;
}

const MoveInstructions = {
    wPawnMoves: (board, i) => {
        let possibleMoves = [];
        let [file, rank] = indexToCoord(i);

        if (RANKS[rank] === 6) {
            if (board[i - 10] === PIECES.EMPTY){
                let boardCopy = [...board];
                boardCopy[i] = PIECES.EMPTY;
                boardCopy[i-10] = PIECES.W_QUEEN;
                possibleMoves.push(boardCopy);
            }
            if  (board[i - 11] === PIECES.B_PAWN || 
                board[i - 11] === PIECES.B_BISHOP ||
                board[i - 11] === PIECES.B_KNIGHT ||
                board[i - 11] === PIECES.B_ROOK ||
                board[i - 11] === PIECES.B_QUEEN ||
                board[i - 11] === PIECES.B_KING) {
                    let boardCopy = [...board];
                    boardCopy[i] = PIECES.EMPTY;
                    boardCopy[i-11] = PIECES.W_QUEEN;
            }
            if (board[i - 9] === PIECES.B_PAWN || 
                board[i - 9] === PIECES.B_BISHOP ||
                board[i - 9] === PIECES.B_KNIGHT ||
                board[i - 9] === PIECES.B_ROOK ||
                board[i - 9] === PIECES.B_QUEEN ||
                board[i - 9] === PIECES.B_KING) {
                    let boardCopy = [...board];
                    boardCopy[i] = PIECES.EMPTY;
                    boardCopy[i-9] = PIECES.W_QUEEN;
                    possibleMoves.push(boardCopy);
            }    
        }
        if (board[i - 10] === PIECES.EMPTY) {   //check if moving 1 square ahead is legal
            possibleMoves.push(moveToPosition(board, i, i - 10));
        }
        if (RANKS[rank] === 1 && board[i - 10] === PIECES.EMPTY && board[i - 20] === PIECES.EMPTY) {    //check if moving 2 squares ahead is legal
            // console.log(`Pawn can move from ${file}${rank} to ${file}${Number(rank) + 2}`);   
            possibleMoves.push(moveToPosition(board, i, i - 20));
        }
        if (board[i - 11] === PIECES.B_PAWN || 
            board[i - 11] === PIECES.B_BISHOP ||
            board[i - 11] === PIECES.B_KNIGHT ||
            board[i - 11] === PIECES.B_ROOK ||
            board[i - 11] === PIECES.B_QUEEN ||
            board[i - 11] === PIECES.B_KING) {
                possibleMoves.push(moveToPosition(board, i, i - 11));
            }
        if (board[i - 9] === PIECES.B_PAWN || 
            board[i - 9] === PIECES.B_BISHOP ||
            board[i - 9] === PIECES.B_KNIGHT ||
            board[i - 9] === PIECES.B_ROOK ||
            board[i - 9] === PIECES.B_QUEEN ||
            board[i - 9] === PIECES.B_KING) {
                possibleMoves.push(moveToPosition(board, i, i - 9));
            }
        else if (rank === 4) {
            //check for en passant, need to have the last move memorized for this tho
        }
        // console.log(`Pawn can move from ${file}${rank} to ${file}${Number(rank) + 1}`);
        return(possibleMoves);
    },
    
    wBishopMoves: (board, i) => {
        let possibleMoves = [];
        for (let position = i + 9, obstacle = false; !obstacle; position+=9 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 9, obstacle = false; !obstacle; position-=9 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 11, obstacle = false; !obstacle; position+=11 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 11, obstacle = false; !obstacle; position-=11 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },
    
    wKnightMoves: (board, i) => {   //possible moves: -12 -21 -19 -8 +8 +12 +19 +21
        let possibleMoves = [];
        switch (board[i - 21]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 21)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i - 21));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 21)}`);
                possibleMoves.push(moveToPosition(board, i, i - 21));
            }
        }
        switch (board[i - 19]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 19)} awith capture`);
                let boardCopy = [...board];
                boardCopy[i] = PIECES.EMPTY;
                boardCopy[i - 19] = PIECES.W_KNIGHT;
                possibleMoves.push(moveToPosition(board, i, i - 19));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 19)}`);
                possibleMoves.push(moveToPosition(board, i, i - 19));
            }
        }
        switch (board[i - 12]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 12)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i- 12));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 12)}`);
                possibleMoves.push(moveToPosition(board, i, i - 12));
            }
        }
        switch (board[i - 8]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 8)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i-8));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 8)}`);
                possibleMoves.push(moveToPosition(board, i, i-8));
            }
        }
        switch (board[i + 8]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 8)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i+8));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 8)}`);
                possibleMoves.push(moveToPosition(board, i, i+8));
            }
        }
        switch (board[i + 12]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 12)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i+12));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 12)}`);
                possibleMoves.push(moveToPosition(board, i, i+12));
            }
        }
        switch (board[i + 19]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 19)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i+19));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 19)}`);
                possibleMoves.push(moveToPosition(board, i, i+19));
            }
        }
        switch (board[i + 21]){
            case PIECES.B_PAWN:
            case PIECES.B_BISHOP:
            case PIECES.B_KNIGHT:
            case PIECES.B_ROOK:
            case PIECES.B_QUEEN:
            case PIECES.B_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 21)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i+21));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 21)}`);
                possibleMoves.push(moveToPosition(board, i, i+21));
            }
        }
        return possibleMoves;
    },
    
    wRookMoves: (board, i) => {     //Loop going in one direction until encounter obstacle. If obstacle is a black piece, can move there.
        let possibleMoves = [];
        for (let position = i + 10, obstacle = false; !obstacle; position+=10 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 10, obstacle = false; !obstacle; position-=10 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 1, obstacle = false; !obstacle; position++ ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 1, obstacle = false; !obstacle; position-- ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },
    
    wQueenMoves: (board, i) => {
        let possibleMoves = [];
        for (let position = i + 10, obstacle = false; !obstacle; position+=10 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 10, obstacle = false; !obstacle; position-=10 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 1, obstacle = false; !obstacle; position+=1 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 1, obstacle = false; !obstacle; position-=1 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 9, obstacle = false; !obstacle; position+=9 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 9, obstacle = false; !obstacle; position-=9 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 11, obstacle = false; !obstacle; position+=11 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 11, obstacle = false; !obstacle; position-=11 ){
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },
    
    wKingMoves: (board, i) => {
        let positions = [i+1, i-1, i+9, i-9, i+10, i-10, i+11, i-11];
        let possibleMoves = [];
        for (let position of positions) {
            switch(board[position]){
                case PIECES.B_PAWN:
                case PIECES.B_BISHOP:
                case PIECES.B_KNIGHT:
                case PIECES.B_ROOK:
                case PIECES.B_QUEEN:
                case PIECES.B_KING: {
                    // console.log(`King can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`King can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                }
            }
        }
        //MISSING CASTLING LOGIC
        return possibleMoves;
    },

    bPawnMoves: (board, i) => {
        let possibleMoves = [];
        let [file, rank] = indexToCoord(i);

        if (RANKS[rank] === 1) {
            if (board[i + 10] === PIECES.EMPTY){
                let boardCopy = [...board];
                boardCopy[i] = PIECES.EMPTY;
                boardCopy[i+10] = PIECES.B_QUEEN;
                possibleMoves.push(boardCopy);
            }
            if  (board[i+11] === PIECES.W_PAWN || 
                board[i + 11] === PIECES.W_BISHOP ||
                board[i + 11] === PIECES.W_KNIGHT ||
                board[i + 11] === PIECES.W_ROOK ||
                board[i + 11] === PIECES.W_QUEEN ||
                board[i + 11] === PIECES.W_KING) {
                    let boardCopy = [...board];
                    boardCopy[i] = PIECES.EMPTY;
                    boardCopy[i+11] = PIECES.B_QUEEN;
            }
            if (board[i + 9] === PIECES.W_PAWN || 
                board[i + 9] === PIECES.W_BISHOP ||
                board[i + 9] === PIECES.W_KNIGHT ||
                board[i + 9] === PIECES.W_ROOK ||
                board[i + 9] === PIECES.W_QUEEN ||
                board[i + 9] === PIECES.W_KING) {
                    let boardCopy = [...board];
                    boardCopy[i] = PIECES.EMPTY;
                    boardCopy[i+9] = PIECES.B_QUEEN;
                    possibleMoves.push(boardCopy);
            }    
        }

        if (board[i + 10] === PIECES.EMPTY) {   //check if moving 1 square ahead is legal
            possibleMoves.push(moveToPosition(board, i, i + 10));
        }
        if (RANKS[rank] === 6 && board[i + 10] === PIECES.EMPTY && board[i + 20] === PIECES.EMPTY) {    //check if moving 2 squares ahead is legal
            // console.log(`Pawn can move from ${file}${rank} to ${file}${Number(rank) + 2}`);   
            possibleMoves.push(moveToPosition(board, i, i + 20));
        }
        if (board[i + 11] === PIECES.W_PAWN || 
            board[i + 11] === PIECES.W_BISHOP ||
            board[i + 11] === PIECES.W_KNIGHT ||
            board[i + 11] === PIECES.W_ROOK ||
            board[i + 11] === PIECES.W_QUEEN ||
            board[i + 11] === PIECES.W_KING) {
                possibleMoves.push(moveToPosition(board, i, i + 11));
            }
        if (board[i + 9] === PIECES.W_PAWN || 
            board[i + 9] === PIECES.W_BISHOP ||
            board[i + 9] === PIECES.W_KNIGHT ||
            board[i + 9] === PIECES.W_ROOK ||
            board[i + 9] === PIECES.W_QUEEN ||
            board[i + 9] === PIECES.W_KING) {
                possibleMoves.push(moveToPosition(board, i, i + 9));
            }
        else if (rank === 4) {
            //check for en passant, need to have the last move memorized for this tho
        }
        // console.log(`Pawn can move from ${file}${rank} to ${file}${Number(rank) + 1}`);
        return(possibleMoves);
    },

    bBishopMoves: (board, i) => {
        let possibleMoves = [];
        for (let position = i + 9, obstacle = false; !obstacle; position+=9 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 9, obstacle = false; !obstacle; position-=9 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 11, obstacle = false; !obstacle; position+=11 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 11, obstacle = false; !obstacle; position-=11 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Bishop can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);

                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },

    bKnightMoves: (board, i) => {   //possible moves: -12 -21 -19 -8 +8 +12 +19 +21
        let possibleMoves = [];
        switch (board[i - 21]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 21)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i - 21));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 21)}`);
                possibleMoves.push(moveToPosition(board, i, i - 21));
            }
        }
        switch (board[i - 19]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 19)} awith capture`);
                possibleMoves.push(moveToPosition(board, i, i - 19));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 19)}`);
                possibleMoves.push(moveToPosition(board, i, i - 19));
            }
        }
        switch (board[i - 12]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 12)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i - 12));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 12)}`);
                possibleMoves.push(moveToPosition(board, i, i - 12));
            }
        }
        switch (board[i - 8]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 8)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i - 8));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i - 8)}`);
                possibleMoves.push(moveToPosition(board, i, i - 8));
            }
        }
        switch (board[i + 8]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 8)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i + 8));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 8)}`);
                possibleMoves.push(moveToPosition(board, i, i + 8));
            }
        }
        switch (board[i + 12]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 12)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i + 12));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 12)}`);
                possibleMoves.push(moveToPosition(board, i, i + 12));
            }
        }
        switch (board[i + 19]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 19)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i + 19));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 19)}`);
                possibleMoves.push(moveToPosition(board, i, i + 19));
            }
        }
        switch (board[i + 21]){
            case PIECES.W_PAWN:
            case PIECES.W_BISHOP:
            case PIECES.W_KNIGHT:
            case PIECES.W_ROOK:
            case PIECES.W_QUEEN:
            case PIECES.W_KING: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 21)} with capture`);
                possibleMoves.push(moveToPosition(board, i, i + 21));
                break;
            }
            case PIECES.EMPTY: {
                // console.log(`knight can move from ${indexToCoord(i)} to ${indexToCoord(i + 21)}`);
                possibleMoves.push(moveToPosition(board, i, i + 21));
            }
        }
        return possibleMoves;
        
    },

    bRookMoves: (board, i) => {     //Loop going in one direction until encounter obstacle. If obstacle is a black piece, can move there.
        let possibleMoves = [];
        for (let position = i + 10, obstacle = false; !obstacle; position+=10 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 10, obstacle = false; !obstacle; position-=10 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 1, obstacle = false; !obstacle; position++ ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 1, obstacle = false; !obstacle; position-- ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Rook can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },
    
    bQueenMoves: (board, i) => {
        let possibleMoves = [];
        for (let position = i + 10, obstacle = false; !obstacle; position+=10 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 10, obstacle = false; !obstacle; position-=10 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 1, obstacle = false; !obstacle; position+=1 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 1, obstacle = false; !obstacle; position-=1 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 9, obstacle = false; !obstacle; position+=9 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 9, obstacle = false; !obstacle; position-=9 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i + 11, obstacle = false; !obstacle; position+=11 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        for (let position = i - 11, obstacle = false; !obstacle; position-=11 ){
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    obstacle = true;
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`Queen can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                default:
                    obstacle = true;
            }
        }
        return possibleMoves;
    },

    bKingMoves: (board, i) => {
        let positions = [i+1, i-1, i+9, i-9, i+10, i-10, i+11, i-11];
        let possibleMoves = [];
        for (let position of positions) {
            switch(board[position]){
                case PIECES.W_PAWN:
                case PIECES.W_BISHOP:
                case PIECES.W_KNIGHT:
                case PIECES.W_ROOK:
                case PIECES.W_QUEEN:
                case PIECES.W_KING: {
                    // console.log(`King can move from ${indexToCoord(i)} to ${indexToCoord(position)} with capture`);
                    possibleMoves.push(moveToPosition(board, i, position));
                    break;
                }
                case PIECES.EMPTY: {
                    // console.log(`King can move from ${indexToCoord(i)} to ${indexToCoord(position)}`);
                    possibleMoves.push(moveToPosition(board, i, position));
                }
            }
        }
        //MISSING CASTLING LOGIC
        return possibleMoves;
    },
}

export default MoveInstructions;

