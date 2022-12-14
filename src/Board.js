// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      row.forEach(function (item) {
        if (item === 1) {
          count++;
        }
      });
      if (count > 1) {
        return true;
      }
      return false;
    },
    // O(n)


    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      var matrix = this.rows();
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },
    // O(n^2)


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var count = 0;
      var matrix = this.rows();
      matrix.forEach(function (item) {
        if (item[colIndex] === 1) {
          count++;
        }
      });
      if (count > 1) {
        return true;
      }
      return false;
    },
    // O(n)


    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var matrix = this.rows();
      for (var i = 0; i < matrix.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },
    // O(n^2)


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      var col = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var count = 0;
      var matrix = this.rows();
      var n = this.get('n');

      while (col < n && row < n) {
        if (matrix[row][col] === 1) {
          count++;
        }
        row++;
        col++;
      }
      return count > 1;

      // var matrix = this.rows();
      // var col = majorDiagonalColumnIndexAtFirstRow;
      // var arr = [];
      // var count = 0;

      // for (var i = 0; i < matrix.length - 1; i++) {
      //   if (matrix[i][col] === 1) {
      //     var index = this._getFirstRowColumnIndexForMajorDiagonalOn(i, col);
      //     arr.push(index);
      //   }
      // }
      // for (var i = 0; i < matrix.length; i++) {
      //   for (var j = 0; j < matrix.length; j++) {
      //     var index = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
      //     var value = matrix[i][j];
      //     if (arr.includes(index) && value === 1) {
      //       count++;
      //     }
      //   }
      // }
      // if ((count - arr.length) > 0) {
      //   return true;
      // }
      // return false;
      // O(n^2)
    },
    // O(n)

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      var n = this.get('n');
      //var start = n - (n + ((n - 1) * 1));
      var start = 1 - n;
      for (var i = start; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;

      // var matrix = this.rows();
      // for (var i = 0; i < matrix.length - 1; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;
      // O(n^3)
    },
    // O(n^2)


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      var matrix = this.rows();
      var count = 0;
      var col = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var n = this.get('n');

      while (col >= 0 && row < n) {
        if (matrix[row][col] === 1) {
          count++;
        }
        col--;
        row++;
      }
      return count > 1;

      // var matrix = this.rows();
      // var col = minorDiagonalColumnIndexAtFirstRow;
      // var arr = [];
      // var count = 0;

      // for (var i = 0; i < matrix.length - 1; i++) {
      //   if (matrix[i][col] === 1) {
      //     var index = this._getFirstRowColumnIndexForMinorDiagonalOn(i, col);
      //     arr.push(index);
      //   }
      // }
      // for (var i = 0; i < matrix.length; i++) {
      //   for (var j = 0; j < matrix.length; j++) {
      //     var index = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
      //     var value = matrix[i][j];
      //     if (arr.includes(index) && value === 1) {
      //       count++;
      //     }
      //   }
      // }
      // if ((count - arr.length) > 0) {
      //   return true;
      // }
      // return false;
      // O(n^2)
    },
    // O(n)


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      var matrix = this.rows();
      var n = matrix.length;
      var start = n + (n - 2);
      for (var i = 0; i < start; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;

      // var matrix = this.rows();
      // for (var i = 0; i < matrix.length; i++) {
      //   if (this.hasMinorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // return false;
      // O(n^3)
    }
    // O(n^2)

    /*--------------------  End of Helper Functions  ---------------------*/
  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
