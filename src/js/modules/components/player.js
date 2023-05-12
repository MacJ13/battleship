import Gameboard from "./gameboard";

const Player = function (playerName) {
  let name = playerName;
  const gameboard = Gameboard();

  const getName = function () {
    return name;
  };

  const getGameBoard = function () {
    return gameboard;
  };

  const attack = function (player, posA, posB) {
    const enemyGameBoard = player.getGameBoard();
    enemyGameBoard.receiveAttack(posA, posB);
  };

  return { getGameBoard, getName };
};

export default Player;
