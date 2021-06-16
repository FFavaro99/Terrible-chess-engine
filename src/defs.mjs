const PIECES = {
    EMPTY: 0,
    W_PAWN: 1,
    W_BISHOP: 2,
    W_KNIGHT: 3,
    W_ROOK: 4,
    W_QUEEN: 5,
    W_KING: 6,
    B_PAWN: 7,
    B_BISHOP: 8,
    B_KNIGHT: 9,
    B_ROOK: 10,
    B_QUEEN: 11,
    B_KING: 12,
    OUT_OF_BOUNDS: 13
};

const PIECE_NAMES = ['empty', 'white pawn', 'white bishop', 'white knight', 'white rook', 'white queen', 'white king',
                    'black pawn', 'black bishop', 'black knight', 'black rook', 'black queen', 'black king'];

const PIECE_REPRESENTATION = ['.', 'P', 'B', 'N', 'R', 'Q', 'K', 'p', 'b', 'n', 'r', 'q', 'k'];

const FILES = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7
};

const RANKS = {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7
}

const COLOURS = {
    WHITE: 0,
    BLACK: 1,
    BOTH: 2
}

const COLOUR_NAMES = ['white', 'black'];

const coordToIndex = ([file, rank]) => {
    // console.log(`coordToIndex([${file}, ${rank}]) --- was called`);
    let rankIndex = 90 - RANKS[String(rank)] * 10;
    let fileIndex = FILES[file] + 1;
    return rankIndex + fileIndex;
}

const indexToCoord = (index) => {
    // console.log(`indexToCoord(${index}) --- was called`);
    let file = index % 10 - 1;
    for (let key in FILES) {
        file = FILES[key] === file ? key : file;
    }
    let rank = 9 - Math.floor(index/10) + 1;
    return [file, rank];
}



// const knightMove = (index, currentBoard) => {
//     let targets = [index - 19, index - 8, index + 12, index + 21, index + 19, index + 8, index - 12, index - 21];
//     let newTargets = targets.map( (i) => {
//     }
// }

export {PIECES, PIECE_NAMES, PIECE_REPRESENTATION, FILES, RANKS, COLOURS, COLOUR_NAMES, coordToIndex, indexToCoord };