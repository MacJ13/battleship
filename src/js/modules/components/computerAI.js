import Player from "./player";
import { binarySearch } from "./helpers";

const ComputerAI = function (id, playerName) {
  const positionBoard = [];

  let isShipHit = false;
  let position;
  let currentHitShip = null;

  let player = Object.create(Player(id, playerName));

  let gameboard = player.getPlayerBoard();

  const saveAllPositionBoard = function () {
    let j = 0;

    const length = gameboard.length;

    for (let i = 0; i <= length; i++) {
      if (i === length) {
        j++;
        i = 0;
      }
      if (j === 10) {
        break;
      }
      positionBoard.push(`${j}${i}`);
    }
  };

  const getPositionBoard = function (enemy) {
    if (isShipHit || getCurrentShip()) {
      const nextPosition = enemy.getHitAdjacentPositions(position);

      position = nextPosition;
      const indexPosition = binarySearch(positionBoard, position);
      if (indexPosition !== -1) positionBoard.splice(indexPosition, 1);
      else position = positionBoard.pop();
      //////////////
    } else {
      const randomNumber = Math.floor(Math.random() * positionBoard.length);

      position = positionBoard[randomNumber];

      positionBoard.splice(randomNumber, 1);
    }

    return position;
  };

  const checkShipHit = function () {
    isShipHit = true;
  };

  const uncheckShipHit = function () {
    isShipHit = false;
  };

  const setCurrentShip = function (ship) {
    currentHitShip = ship;
  };

  const getCurrentShip = function () {
    return currentHitShip;
  };

  const clearReservedPositions = function (reservedPostions) {
    reservedPostions.forEach((reserved) => {
      const { posA, posB } = reserved;
      const index = binarySearch(positionBoard, `${posA}${posB}`);
      if (index >= 0) positionBoard.splice(index, 1);
    });
  };

  return Object.assign(player, {
    clearReservedPositions,
    /////////////////////////
    getCurrentShip,
    setCurrentShip,
    checkShipHit,
    uncheckShipHit,
    saveAllPositionBoard,
    getPositionBoard,
    checkShipHit,
  });
};

export default ComputerAI;
