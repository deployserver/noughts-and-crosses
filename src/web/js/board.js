define(['jquery', 'subscribable', 'events/CellSelectionEvent'], function (jQuery, Subscribable, CellSelectionEvent) {

   /**
    *
    * @param {HTMLElement} el
    * @constructor
    */
   function Board(el) {
      this._el = jQuery(el)
                     .on('click', 'li', this._onCellClicked.bind(this));
   }

   (Board.prototype = Object.create(Subscribable.prototype)).constructor = Board;

   /**
    * @type {jQuery} The jQuery wrapped element that the board controls
    */
   Board.prototype._el = null;

   /**
    * Sets the grid on the board and triggers a re-render
    * @param {Grid} grid
    */
   Board.prototype.setGrid = function(grid) {
      this._grid = grid;
      return this.render();
   };

   /**
    * Renders the board
    */
   Board.prototype.render = function () {
      var size = this._grid.getSize();
      var ul = jQuery('<ul class="game-board" />');

      for (var y = 0; y < size; y++) {
         for (var x = 0; x < size; x++) {
            var li = jQuery('<li />');
            var user = this._grid.getAt(x, y);

            if(user) {
               li.addClass('cell-used cell-used-by-' + user.index);
            }

            ul.append(li.data('x', x).data('y', y));
         }
      }

      this._el.empty().append(ul);
      return this;
   };

   Board.prototype._onCellClicked = function(e) {
      var cell = jQuery(e.target);
      this.fire(new CellSelectionEvent(cell.data('x'), cell.data('y')))
   };


   return Board;

});
