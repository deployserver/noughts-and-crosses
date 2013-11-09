define(['subscribable', 'events/GameOverEvent'], function(subscribable, GameOverEvent) {

   /**
    *
    * @param size
    * @constructor
    */
   function Grid(size) {
      this._size = size;
      this._cells = String(new Array(size * size)).split(",").map(function () {});
   }

   (Grid.prototype = Object.create(subscribable.prototype)).constructor = Grid;

   /**
    * @type {Number} The number of cells per row / column
    */
   Grid.prototype._size = null;

   /**
    * @type {Number[]} Array of cells where each cell can be available or the player that took that cell
    */
   Grid.prototype._cells = null;

   /**
    * Gets the value set against the cell at the given coordinates.
    *
    * @param {Number} row
    * @param {Number} col
    * @return {User}
    */
   Grid.prototype.getAt = function(row, col) {
      return this._cells[this._indexOf(row, col)];
   };

   /**
    * Sets the user that owns a particular cell.
    *
    * @param {Number} row
    * @param {Number} col
    * @param {User} user
    */
   Grid.prototype.setAt = function(row, col, user) {
      if(!this.getAt(row, col)) {
         this._cells[this._indexOf(row, col)] = user;
         if(this.winningPath(row, col)) {
            this.fire(new GameOverEvent(user));
         }
         else if(this.isBoardComplete()) {
            this.fire(new GameOverEvent);
         }
      }
      return this;
   };

   /**
    * Gets all available paths that could make a satisfactory route
    * @param {Number} row
    * @param {Number} col
    * @returns {{x: Array, y: Array, dtl: Array, dbl: Array}}
    * @private
    */
   Grid.prototype._getPaths = function(row, col) {
      var paths = {x: [], y: [], dtl: [], dbl: []};
      for(var i = 0; i < this._size; i++) {
         paths.x.push(this.getAt(row, i));
         paths.y.push(this.getAt(i, col));
         paths.dtl.push(this.getAt(i, i));
         paths.dbl.push(this.getAt(i, this._size - 1 - i));
      }

      return paths;
   };

   /**
    * Validates whether the supplied coordinates are in a winning path, and when they are, returns the user that won
    * as a result of that path.
    *
    * @param {Number} row
    * @param {Number} col
    * @returns {?User}
    */
   Grid.prototype.winningPath = function(row, col) {
      var paths = this._getPaths(row, col);
      for(var path in paths) {
         if(paths.hasOwnProperty(path) && paths[path].every(Grid._uniqueUserValidation)) {
            return paths[path][0];
         }
      }
      return null;
   };

   /**
    * Gets whether there are any empty spaces left
    * @returns {boolean}
    */
   Grid.prototype.isBoardComplete = function() {
      return this._cells.every(function(user) {
         return !!user;
      });
   };

   /**
    * Gets the normalised index of the specified row and column
    */
   Grid.prototype._indexOf = function(row, col) {
      return row * this._size + col;
   };

   /**
    * Gets the dimensions of the grid
    */
   Grid.prototype.getSize = function() {
      return this._size;
   };

   /**
    * Used as a helper function in the validation of a winning row
    */
   Grid._uniqueUserValidation = function(user, index, users) {
      return user && user === users[0];
   };

   return Grid;

});
