import evaluateBoard from './eval.mjs';
import moveGenerator from './moveGenerator.mjs';


const miniMax = (board, sideToMove, depth=4) => {
    if (depth === 0) {
        return {value: evaluateBoard(board, sideToMove), i:0};          //always return the evaluation so that parent can choose best
    }
    else{
        if (sideToMove === 0){              //White to move, in this case we maximize
            let allMoves = moveGenerator(board, sideToMove);
            let values = [];
            for (let i = 0; i < allMoves.length; i++){
                values.push(miniMax(allMoves[i], 1, depth-1));      //array with all the values, now to choose the best one
            }
            let max = -Infinity;
            let maxIndex = 0;
            for (let i = 0; i < values.length; i++){
                if (values[i].value > max){
                    max = values[i].value;
                    maxIndex = i;
                }
            }
            return {value: max, i: maxIndex};
        }
        else if (sideToMove === 1){         //black to move, we minimize
            let allMoves = moveGenerator(board, sideToMove);
            let values = [];
            for (let i = 0; i < allMoves.length; i++){
                values.push(miniMax(allMoves[i], 0, depth-1));      //array with all the values, now to choose the best one
            }
            let min = Infinity;
            let minIndex = 0;
            for (let i = 0; i < values.length; i++){
                if (values[i].value < min){
                    min = values[i].value;
                    minIndex = i;
                }
            }
            return {value: min, i: minIndex};
        }
    }
}

export default miniMax;