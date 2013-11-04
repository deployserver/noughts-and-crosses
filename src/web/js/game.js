define(['events/CellSelectionEvent'], function(CellSelectionEvent) {

   /**
    *
    * @param {Board} board
    * @param {Grid} grid
    * @param {User[]} users
    * @constructor
    */
   function Game(board, grid, users) {
      this._users = users;
      this._grid = grid;
      this._board = board.setGrid(grid).on(CellSelectionEvent, this._onCellSelected, this);
   }

   /**
    * @type {Board} The playing board for this game
    */
   Game.prototype._board = null;

   /**
    * @type {User[]} The Users that are playing the game
    */
   Game.prototype._users = null;

   Game.prototype._onCellSelected = function(cellSelectionEvent) {
      var cell = this._grid.getAt(cellSelectionEvent.x, cellSelectionEvent.y);
      if(!cell) {
         this._grid.setAt(cellSelectionEvent.x, cellSelectionEvent.y, this.currentUser);
         this.currentUser = this.nextUser();
         this._board.render();
      }
   };

   /**
    * @type {User} The currently selected user
    * @name Game#currentUser
    */
   Object.defineProperty(Game.prototype, 'currentUser', {
      get: function() {
         return this._currentUser || (this._currentUser = this._users[0]);
      },
      set: function(user) {
         if(this._users.indexOf(user) < 0) {
            throw new ReferenceError("Setting current user to an unknown user.");
         }
         this._currentUser = user;
      }
   });

   /**
    * Gets the next available user for the game
    * @returns {User}
    */
   Game.prototype.nextUser = function() {
      var index = this._users.indexOf(this.currentUser) + 1;
      if(index >= this._users.length) {
         index = 0;
      }

      return this._users[index];
   };


   return Game;

});
