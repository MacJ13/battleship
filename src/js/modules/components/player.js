import Gameboard from "./gameboard";
import Ship from "./ship";

const Player = function (id, playerName) {
  let name = playerName;
  let gameId = id;

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
    const [x, y] = gameBoardObj.pos.split("");

    const shipBoard = gameboard.placeShips(+x, +y, ship, gameBoardObj.position);
    if (!shipBoard) return;
    return true;
  };

  const getRandomShipsPosition = function () {
    // const shipsArr = [...ships];
    // gameboard.randomPlaceShips(shipsArr);

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

  const setReservedCellBoard = function (positions) {
    gameboard.setReservedCellBoard(positions);
  };

  const getHitAdjacentPositions = function (pos, currentShip) {
    const [x, y] = pos.split("");
    return gameboard.getHitAdjacentPositions(x, y, currentShip);
  };

  const isPlayer = function () {
    return getName() !== "computer";
  };

  const clearComputerPotentialPosition = function () {
    gameboard.clearPotentialPosition();
  };

  return {
    setReservedCellBoard,
    ////////////////////////

    clearComputerPotentialPosition,
    getHitAdjacentPositions,
    isPlayer,
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
