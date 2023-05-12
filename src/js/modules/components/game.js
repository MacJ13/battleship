import UI from "./ui/ui";
import Player from "./player";

const Game = function () {
  const ui = UI();
  let player1 = null;
  let player2 = null;

  const createGame = function () {
    const players = ui.getPlayerNames();
    player1 = Player(players.player1);
    player2 = Player(players.player2);
    console.log(player1.getName(), player2.getName());
  };

  const init = function () {
    ui.onClickCreatePlayer(createGame);
    ui.onClickCheckBox();
  };

  return { init };
};

export default Game;
