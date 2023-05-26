import UI from "./ui/ui";
import Player from "./player";
import ComputerAI from "./computerAI";
import GameUI from "./ui/gameUI";

import { queue, timeout } from "./helpers";
import EndUI from "./ui/endUI";

const Game = function () {
  const ui = UI();
  const gameUI = GameUI();
  const endUI = EndUI();

  const players = [];

  let playing = false;
  let currentPlayer = null;
  let enemyPlayer = null;

  const createPLayers = function () {
    // get players info from inputs
    const playersUI = ui.getPlayerNames();

    //  create players objects and add to players array
    for (let { playerId, playerName } of playersUI) {
      const player =
        // playerName !== ui.getCheckboxValue()
        playerName !== "computer"
          ? Player(playerId, playerName)
          : ComputerAI(playerId, playerName);

      // console.log("is Player: ", player.isPlayer());
      players.push(player);
    }

    // set current Player

    // add player 1's ships to queue
    queue.addItems(players[0].getShips());

    // call function to create gameBoards for players;
    createGameBoard();

    // ????????????????????????????
    // set players?
    // switchPlayers();
    currentPlayer = players[0];
    enemyPlayer = players[1];
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

    gameUI.renderCurrentPlayer(currentPlayer);
  };

  const playGameComputer = function () {
    const randomPosition = currentPlayer.getPositionBoard(enemyPlayer);
    playGame(randomPosition);
  };

  const playGameUser = function (event) {
    if (!playing) return;
    const pos = gameUI.getBoardPositionPlayer2(event);
    if (!pos) return;
    playGame(pos);
  };

  const playGame = function (pos) {
    // check if timeout is truthy to prevent call event
    if (timeout.getTime() || !playing) {
      return;
    }

    // pass pos variable to get gameboard cell object with values of player2
    const enemyCellBoard = currentPlayer.getPlayerBoardCell(enemyPlayer, pos);

    // check if enemyCellBoard is falsy
    if (!enemyCellBoard) {
      // if (currentPlayer === players[1]) playGameComputer();
      return;
    }

    // ship object from board element
    const targetShip = enemyCellBoard.shipCell;

    // render mark on target cell
    gameUI.renderTargetGameBoardCell(pos, targetShip, enemyPlayer.getGameId());

    generateActionAfterHit(targetShip);

    //
    if (currentPlayer.isPlayer()) return;

    timeout.setTime(playGameComputer);
  };

  const generateActionAfterHit = function (targetShip) {
    // check if shipcell exists, if there is a ship on cell
    if (!targetShip) {
      switchPlayers(); // change player if we don't hit ship on cell
      return;
    }

    // if targetShip exist make actions below

    if (!currentPlayer.isPlayer())
      // we draw random position around target ship
      currentPlayer.checkShipHit(targetShip);

    // check if targetShip is fully Sunk
    if (targetShip.isSunk()) {
      if (!currentPlayer.isPlayer()) {
        // check if current player is computer
        currentPlayer.uncheckShipHit(); //after unchecking these settings we draw random position on board
        enemyPlayer.clearComputerPotentialPosition(); // we remove unneeded potential position around ship fields on enemy board
        currentPlayer.clearReservedPositions(targetShip.getReservedPositions()); // we remove also reserved positions around ship fields from potential computer positions
      }

      // set reserved cells as marked around ship cells on enemy board
      enemyPlayer.setReservedCellBoard(targetShip.getReservedPositions());

      // render reserved cell elements on enemy boards elements
      gameUI.renderReservedPostions(
        enemyPlayer,
        targetShip.getReservedPositions()
      );
      // render hit ship element on ship list element
      gameUI.renderShipListAgain(enemyPlayer);
    }

    // check if all enemy ships are sunks
    if (enemyPlayer.allShipsSink()) {
      gameUI.removeClickGameBoardPlayer2(playGameUser);
      endGame();
    }
  };

  const endGame = function () {
    playing = false;
    gameUI.toggleGameTrackEl();

    endUI.toggleModal();
    endUI.renderGameResult(currentPlayer.getName());
  };

  // method set player1 ship board and call event listener for
  // game board of player 2
  const runGame = function () {
    // set random ships for player 2
    players[1].getRandomShipsPosition();

    // generate all positions on gameboard for ComputerAI
    players[1].saveAllPositionBoard();

    // if all set we change playing to "true" value
    playing = true;
    gameUI.renderCurrentPlayer(players[0]);

    // call method with player 2 gameboard event listeners
    gameUI.onClickGameBoardPlayer2(playGameUser);
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

  const restartGame = function () {
    if (!currentPlayer.isPlayer()) {
      currentPlayer = players[0];
      enemyPlayer = players[1];
    }

    for (let player of players) {
      player.clearShips();
      player.clearGameBoard();
    }

    gameUI.renderGamePlayerElements(players);

    queue.addItems(players[0].getShips());
    gameUI.renderShipPick(queue.peek(), queue.countTypeShip());

    gameUI.hidePlayButton();
    endUI.toggleModal();
  };

  const init = function () {
    ui.onClickCreatePlayer(createPLayers);
    endUI.onClickRestartBtn(restartGame);

    // ui.onClickCheckBox();
  };

  return { init };
};

export default Game;
