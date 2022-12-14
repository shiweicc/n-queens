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
// Solution: O(n)


//return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var myBoard = new Board({ n: n });
  var count = 0;

  var backtrackingSolution = function (matrix, row) {
    if (row === n - 1) {
      count++;
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
  console.log('Number of solutions for ' + n + ' rooks:', count);
  return count;
};
// Helper: O(n)
// Solution: O(1)


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  var myBoard = new Board({ n: n });
  var count = 0;
  var solution = myBoard.rows();

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
// Helper: O(n!)
// Solution: O(1)


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var myBoard = new Board({ n: n });
  var count = 0;

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
// Helper: O(n!)
// Solution: O(1)


/* Advanced
- Consider the memory usage of your solver:
Do you have to allocate and duplicate an entire board?
We created a new Board but we didn't duplicate it.

Can you re-use the board?
Yes, we re-used the board on all the solution functions.

- Consider what work you can avoid doing:
Are you doing any work early in the algorithm that you can tell will be fruitless?
For the first time attemp of countNRooksSolutions, we searched the whole board instead of skipping the
rows that already had pieces. We also didn't utilize the methods provided in Board.js at the early time.

How much work do you do on paths which are obviously wrong?
- We didn't think about to use recursion to solve the countNRooksSolutions function. We thought using nested for loops
might be able to solve the problem.
*/