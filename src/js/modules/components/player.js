import Gameboard from "./gameboard";
import Ship from "./ship";

const Player = function (id, playerName) {
  let name = playerName;
  let gameId = id;

  const positionBoard = [];

  const gameboard = Gameboard();

  const ships = [
    Ship(4),
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2),
    Ship(2),
    Ship(1),
    Ship(1),
  ];

  const saveAllPositionBoard = function (board) {
    let j = 0;

    console.log(board);
    for (let i = 0; i <= board.length; i++) {
      if (i === board.length) {
        j++;
        i = 0;
      }
      if (j === 10) {
        break;
      }
      positionBoard.push(`${j}${i}`);
      // console.log(`[${j}${i}]`);
    }
    // console.log(positionBoard);
    // console.log(boardTest);
  };

  const getGameId = function () {
    return gameId;
  };

  const getShips = function () {
    return ships;
  };

  const getName = function () {
    return name;
  };

  const getShipOnGameBoard = function (gameBoardObj, ship) {
    // console.log(gameBoardObj, ship);
    const [x, y] = gameBoardObj.pos.split("");

    const shipBoard = gameboard.placeShips(+x, +y, ship, gameBoardObj.position);
    if (!shipBoard) return;
    return true;
  };

  const getRandomShipsPosition = function () {
    const shipsArr = [...ships];
    gameboard.randomPlaceShips(shipsArr);
  };

  const getPlayerBoard = function () {
    return gameboard.getBoard();
  };

  const clearGameBoard = function () {
    gameboard.createBoard();
  };

  const attack = function (pos) {
    const [x, y] = pos.split("");
    return gameboard.receiveAttack(+x, +y);
  };

  const getPlayerBoardCell = function (enemyPlayer, pos) {
    // enemyGameBoard.receiveAttack(pos);
    return enemyPlayer.attack(pos);
  };

  return {
    saveAllPositionBoard,
    getGameId,
    attack,
    getPlayerBoard,
    getName,
    getShips,
    getShipOnGameBoard,
    clearGameBoard,
    getRandomShipsPosition,
    getPlayerBoardCell,
  };
};

export default Player;
