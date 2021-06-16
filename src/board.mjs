import {COLOURS, PIECES, PIECE_REPRESENTATION, RANKS, FILES, indexToCoord} from './defs.mjs';


const Board = {
    colours: [],        //Representation of the board's colours
    pieces: [],         //Representation of where the pieces are on the board
    sideToMove: COLOURS.WHITE,     //Who is gonna move. Determines which moveGenerator to use
    castlingRights: {
        bShort: true,
        bLong: true,
        wShort: true,
        wLong: true
    },
    log: [],
    populateColours: () => {
        const colourBoard = [];
    
        for (let i = 0; i < 120; i++){
            if (i < 21 || i > 98) {
                colourBoard[i] = COLOURS.BOTH;
            }
            else if (i % 10 === 0 || (i - 9) % 10 === 0){
                colourBoard[i] = COLOURS.BOTH;
            }
            else {
                let [file, rank] = indexToCoord(i);
                // console.log(FILES[file], RANKS[rank]);
    
                if (RANKS[rank]%2 !== FILES[file]%2) {
                    colourBoard[i] = COLOURS.WHITE;
                }
                else {
                    colourBoard[i] = COLOURS.BLACK;
                }
            }
        }
        return colourBoard;
    },

    populatePieces: () => {
        const piecesBoard = [];
        for (let i = 0; i < 120; i++){
            if (i < 21 || i > 98) {
                piecesBoard[i] = PIECES.OUT_OF_BOUNDS;
            }
            else if (i % 10 === 0 || (i - 9) % 10 === 0){
                piecesBoard[i] = PIECES.OUT_OF_BOUNDS;
            }
            else if (i < 79 && i > 40) {
                piecesBoard[i] = PIECES.EMPTY;
            }
            else {
                let [file, rank] = indexToCoord(i);
                if (RANKS[rank] === 6)
                    piecesBoard[i] = PIECES.B_PAWN;
                else if (RANKS[rank] === 1)
                    // piecesBoard[i] = PIECES.EMPTY;          //TESTING ROOK MOVEMENTS
                    piecesBoard[i] = PIECES.W_PAWN;
                else if ((FILES[file] === 0 || FILES[file] === 7)){
                    if (RANKS[rank] == 0)
                        piecesBoard[i] = PIECES.W_ROOK;
                    else 
                        piecesBoard[i] = PIECES.B_ROOK;
                }
                else if (FILES[file] === 1 || FILES[file] === 6)
                    if (RANKS[rank] === 0)
                        piecesBoard[i] = PIECES.W_KNIGHT;
                    else 
                        piecesBoard[i] = PIECES.B_KNIGHT;
                else if (FILES[file] === 2 || FILES[file] === 5)
                    if (RANKS[rank] === 0)
                        piecesBoard[i] = PIECES.W_BISHOP;
                    else 
                        piecesBoard[i] = PIECES.B_BISHOP;
                else if (FILES[file] === 4)
                    if (RANKS[rank] === 7)
                        piecesBoard[i] = PIECES.B_KING;
                    else
                        piecesBoard[i] = PIECES.W_KING;
                else if (RANKS[rank] === 0 && FILES[file] === 3)
                    piecesBoard[i] = PIECES.W_QUEEN;
                else if (RANKS[rank] === 7 && FILES[file] === 3)
                    piecesBoard[i] = PIECES.B_QUEEN;
            }
        }
        return piecesBoard;
    },

    printBoard: () => {
        console.log('\n    a b c d e f g h');
        console.log('    ---------------');
        let colCount = 0;
        let rowCount = 8;
        let row = `${rowCount} | `;
        for (let piece of Board.pieces) {
            if (piece !== PIECES.OUT_OF_BOUNDS) {
                row = row + PIECE_REPRESENTATION[piece] + ' ';
                colCount++;
            }
            if (colCount === 8){
                row += " |";
                console.log(row);
                rowCount--;
                row = `${rowCount ? rowCount : ''} | `;
                colCount = 0;
            }
        }
    },
    
    
};





export default Board;



