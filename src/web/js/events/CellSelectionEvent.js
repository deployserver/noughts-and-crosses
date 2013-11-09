define(function () {

   function CellSelectionEvent(x, y) {
      this.x = x;
      this.y = y;
   }

   CellSelectionEvent.prototype.toString = CellSelectionEvent.toString = function () {
      return "CellSelectionEvent";
   };

   CellSelectionEvent.create = function (x, y) {
      return new CellSelectionEvent(x, y);
   };

   return CellSelectionEvent;

});
