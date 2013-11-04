define(function () {

   function CellSelectionEvent(x, y) {
      this.x = x;
      this.y = y;
   }

   CellSelectionEvent.create = function (x, y) {
      return new CellSelectionEvent(x, y);
   };

   return CellSelectionEvent;

});
