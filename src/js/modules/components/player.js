import Gameboard from "./gameboard";
import Ship from "./ship";

import { splitStr, shipMeasurements } from "./helpers";

const Player = function (id, playerName) {
  let name = playerName;
  let gameId = id;

  const gameboard = Gameboard();

  const ships = [];

  const createShip = function () {
    shipMeasurements.forEach((measure) => {
      ships.push(Ship(measure));
    });
  };

  createShip();

  const clearShips = function () {
    ships.length = 0;
    createShip();
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
    // const [x, y] = gameBoardObj.pos.split("");
    const [x, y] = splitStr(gameBoardObj.pos);

    const shipBoard = gameboard.placeShips(+x, +y, ship, gameBoardObj.position);
    if (!shipBoard) return;
    return true;
  };

  const allShipsSink = function () {
    return ships.every((ship) => ship.isSunk());
  };

  const getRandomShipsPosition = function () {
    // const shipsArr = [...ships];
    // gameboard.randomPlaceShips(shipsArr);

    gameboard.randomPlaceShips(ships);
  };

  const getPlayerBoard = function () {
    return gameboard.getBoard();
  };

  const clearGameBoard = function () {
    gameboard.createBoard();
  };

  const attack = function (pos) {
    const [x, y] = splitStr(pos);
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
    const [x, y] = splitStr(pos);
    return gameboard.getHitAdjacentPositions(+x, +y, currentShip);
  };

  const isPlayer = function () {
    return getName() !== "computer";
  };

  const clearComputerPotentialPosition = function () {
    gameboard.clearPotentialPosition();
  };

  return {
    clearShips,
    setReservedCellBoard,
    ////////////////////////
    allShipsSink,
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
