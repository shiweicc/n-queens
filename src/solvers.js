/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  var myBoard = new Board({ n: n });
  for (var i = 0; i < n; i++) {
    myBoard.togglePiece(i, i);
  }
  var solution = myBoard.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

//return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var myBoard = new Board({ n: n });
  var solutionCount = 0;

  var backtrackingSolution = function (matrix, row) {
    if (row === n - 1) {
      solutionCount++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        matrix.togglePiece(row, i);
        if (!matrix.hasColConflictAt(i)) {
          backtrackingSolution(matrix, row + 1);
        }
        matrix.togglePiece(row, i);
      }
    }
  };
  backtrackingSolution(myBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var myBoard = new Board({ n: n });
  var count = 0;
  var solution = myBoard.rows();
  if (n === 2 || n === 3) {
    return myBoard.rows();
  }
  var backtrackingSolution = function (row) {
    if (row === n) {
      count ++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        myBoard.togglePiece(row, i);
        if (!myBoard.hasAnyQueensConflicts()) {
          backtrackingSolution(row + 1);
        }
        if (count > 0) {
          return myBoard.rows();
        }
        myBoard.togglePiece(row, i);
      }
    }
  };
  backtrackingSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var myBoard = new Board({ n: n });
  var count = 0;
  if (n === 0) {
    return 1;
  }

  if (n === 2 || n === 3) {
    return 0;
  }
  var backtrackingSolution = function (row) {
    if (row === n) {
      count++;
      return;
    } else {
      for (var i = 0; i < n; i++) {
        myBoard.togglePiece(row, i);
        if (!myBoard.hasAnyQueensConflicts()) {
          backtrackingSolution(row + 1);
        }
        myBoard.togglePiece(row, i);
      }
    }
  };
  backtrackingSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', count);
  return count;
};

//Advanced
/*Consider the memory usage of your solver:
Do you have to allocate and duplicate an entire board?
Yes, we create a new Board.
Can you re-use the board?
yes, in the countNRooksSolutions function, when we invoked backtracking menthod, we re-used the board.
Can you get by with less information?

Consider what work you can avoid doing:
Are you doing any work early in the algorithm that you can tell will be fruitless?
- At the early time we do the countNrooksolutions, we searched the whole matrix instead of skipping the
rows that already had pieces.
- We skipped more methods that can be used in Board.js.
How much work do you do on paths which are obviously wrong?
- We didn't figure it out to use recursion to solve the findsolution problem. We insited in using lots
of for loops to get result.
*/