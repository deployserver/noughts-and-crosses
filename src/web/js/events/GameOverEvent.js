define(function () {

   function GameOverEvent(winner) {
      this.winner = winner || null;
   }

   GameOverEvent.prototype.toString = GameOverEvent.toString = function () {
      return "GameOverEvent";
   };

   return GameOverEvent;

});
