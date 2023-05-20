import UI from "./ui/ui";
import Player from "./player";
import GameUI from "./ui/gameUI";

import { queue } from "./helpers";

const Game = function () {
  const ui = UI();
  let gameUI = null;
  const players = [];

  let currentPlayer = null;
  let enemyPlayer = null;

  let timeout = null;
  // const queue = Queue();

  const createPLayers = function () {
    // get players info from inputs
    const playersUI = ui.getPlayerNames();
    // console.log(playersUI);

    //  create players objects and add to players array
    for (let { playerId, playerName } of playersUI)
      players.push(Player(playerId, playerName));

    // set current Player
    // currentPlayer = players[0];

    // add player 1's ships to queue
    queue.addItems(players[0].getShips());

    // create GameInterface object
    gameUI = GameUI();

    // call function to create gameBoards for players;
    createGameBoard();

    // ????????????????????????????
    // set players?
    switchPlayers();
  };

  const setShipOnBoard = function (gameBoardObj) {
    const shipOnBoard = players[0].getShipOnGameBoard(
      gameBoardObj,
      queue.peek()
    );
    if (!shipOnBoard) return;

    gameUI.renderShipOnGameBoard(gameBoardObj, queue.peek());
    queue.dequeue();
    gameUI.renderShipPick(queue.peek(), queue.countTypeShip());
  };

  const setRandomShipsOnBoard = function () {
    queue.clearQueue();
    players[0].getRandomShipsPosition();
    const gameBoard = players[0].getPlayerBoard();
    gameUI.renderRandomGameBoard(gameBoard);
  };

  const clearGameBoard = function () {
    players[0].clearGameBoard();
    queue.addItems(players[0].getShips());

    gameUI.clearGameBoard(players[0].getPlayerBoard());
    gameUI.renderShipPick(queue.peek(), queue.countTypeShip());
  };

  const switchPlayers = function () {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    enemyPlayer = enemyPlayer === players[1] ? players[0] : players[1];
  };

  const playGameComputer = function () {
    if (currentPlayer === players[0]) return;

    timeout = setTimeout(() => {
      console.log("Computer: ", { timeout });
      const randomNumber = Math.floor(Math.random() * 100);
      const pos = randomNumber < 10 ? "0" + randomNumber : "" + randomNumber;
      timeout = null;
      playGame(pos);
    }, 500);
  };

  const playGame = function (pos) {
    // console.log("player: ", { timeout });

    if (timeout) {
      return;
    }
    console.log("player: ", { timeout });
    // pass pos variable to get gameboard cell of player2
    const enemyCellBoard = currentPlayer.getPlayerBoardCell(enemyPlayer, pos);

    // check if enemyCellBoard is falsy
    if (!enemyCellBoard) {
      if (currentPlayer === players[1]) playGameComputer();
      return;
    }

    gameUI.renderTargetGameBoardCell(
      pos,
      enemyCellBoard.shipCell,
      enemyPlayer.getGameId()
    );

    // console.log({ shipCell: enemyCellBoard.shipCell });

    if (!enemyCellBoard.shipCell) {
      switchPlayers();
    }
    playGameComputer();
  };

  // method set player1 ship board and call event listener for
  // game board of player 2
  const runGame = function () {
    // set random ships for player 2
    players[1].getRandomShipsPosition();

    // players[1].saveAllPositionBoard(players[1].getPlayerBoard());
    // call method with player 2 gameboard event listeners
    gameUI.onClickGameBoardPlayer2(playGame);
    console.log("run The Game");
  };

  const createGameBoard = function () {
    const ship = queue.peek();
    const countShipTypes = queue.countTypeShip();

    gameUI.renderGamePlayerElements(players);
    gameUI.renderShipPick(ship, countShipTypes);

    gameUI.onClickShipPick();
    gameUI.onDropShipPick(setShipOnBoard, players[0].getPlayerBoard);
    gameUI.onClickResetBtn(clearGameBoard);
    gameUI.onClickRandomBtn(setRandomShipsOnBoard);
    gameUI.onClickPlayBtn(runGame);
  };

  const init = function () {
    ui.onClickCreatePlayer(createPLayers);
    ui.onClickCheckBox();
  };

  return { init };
};

export default Game;
