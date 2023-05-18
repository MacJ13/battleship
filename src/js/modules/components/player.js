import Gameboard from "./gameboard";
import Ship from "./ship";

const Player = function (playerName) {
  let name = playerName;
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

  const getCountShips = function (currentShip) {
    return ships.filter((ship) => ship.getLength() === currentShip.getLength())
      .length;
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

    return gameboard.randomPlaceShips(shipsArr);
  };

  const getGameBoard = function () {
    return gameboard.getGameBoard();
  };

  const clearGameBoard = function () {
    gameboard.createBoard();
  };

  const attack = function (player, posA, posB) {
    const enemyGameBoard = player.getGameBoard();
    enemyGameBoard.receiveAttack(posA, posB);
  };

  return {
    getCountShips,
    getGameBoard,
    getName,
    getShips,
    getShipOnGameBoard,
    clearGameBoard,
    getRandomShipsPosition,
  };
};

export default Player;
