import UI from "./ui/ui";
import Player from "./player";
import ComputerAI from "./computerAI";
import GameUI from "./ui/gameUI";

import { queue, timeout } from "./helpers";

const Game = function () {
  const ui = UI();
  let gameUI = GameUI();
  const players = [];

  let currentPlayer = null;
  let enemyPlayer = null;

  // let timeout = null;
  // const queue = Queue();

  const createPLayers = function () {
    // get players info from inputs
    const playersUI = ui.getPlayerNames();

    //  create players objects and add to players array
    for (let { playerId, playerName } of playersUI) {
      const player =
        playerName !== ui.getCheckboxValue()
          ? Player(playerId, playerName)
          : ComputerAI(playerId, playerName);

      // console.log("is Player: ", player.isPlayer());
      players.push(player);
    }

    // set current Player

    // add player 1's ships to queue
    queue.addItems(players[0].getShips());

    // create GameInterface object
    // gameUI = GameUI();

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
  };

  const playGameComputer = function () {
    // timeout = setTimeout(() => {
    //   timeout = null;
    //   const randomPosition = currentPlayer.getPositionBoard(enemyPlayer);

    //   playGame(randomPosition);
    // }, 550);
    const randomPosition = currentPlayer.getPositionBoard(enemyPlayer);
    playGame(randomPosition);
  };

  const playGame = function (pos) {
    // check if timeout is truthy to prevent call event
    if (timeout.getTime()) {
      return;
    }

    // let currentShip = null;

    // pass pos variable to get gameboard cell object with values of player2
    const enemyCellBoard = currentPlayer.getPlayerBoardCell(enemyPlayer, pos);

    // check if enemyCellBoard is falsy
    if (!enemyCellBoard) {
      if (currentPlayer === players[1]) playGameComputer();
      return;
    }

    // ship object from board element
    const targetShip = enemyCellBoard.shipCell;

    // render mark on target cell
    gameUI.renderTargetGameBoardCell(pos, targetShip, enemyPlayer.getGameId());

    // check if shipcell exists, if there is a ship on cell
    if (!targetShip) {
      // change player if we don't hit ship on cell
      switchPlayers();
      // if (currentPlayer !== players[1]) {
      //   switchPlayers();
      // }
    } else {
      if (currentPlayer === players[1]) {
        if (!currentPlayer.getCurrentShip()) {
          currentPlayer.checkShipHit();
          currentPlayer.setCurrentShip(targetShip);
        }
        // currentShip = enemyCellBoard.shipCell;
      }

      if (targetShip.isSunk()) {
        // if (
        //   enemyPlayer.getShips().every((ship) => {
        //     return ship.isSunk();
        //   })
        // ) {
        //   console.log("Winner");
        // }

        ///
        if (currentPlayer === players[1]) {
          currentPlayer.uncheckShipHit();
          currentPlayer.setCurrentShip(null);
          enemyPlayer.clearComputerPotentialPosition();
          currentPlayer.clearReservedPositions(
            targetShip.getReservedPositions()
          );
          currentPlayer.clearComputerPotentialPosition();
        }

        enemyPlayer.setReservedCellBoard(targetShip.getReservedPositions());
        gameUI.renderReservedPostions(
          enemyPlayer,
          targetShip.getReservedPositions()
        );
        gameUI.renderShipListAgain(enemyPlayer);
        // currentShip = null;
      }
    }
    if (currentPlayer.isPlayer()) return;

    timeout.setTime(playGameComputer);
  };

  // method set player1 ship board and call event listener for
  // game board of player 2
  const runGame = function () {
    // set random ships for player 2
    players[1].getRandomShipsPosition();

    // generate all positions on gameboard for ComputerAI
    players[1].saveAllPositionBoard();

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
