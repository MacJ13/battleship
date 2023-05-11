import Gameboard from "./gameboard";

const Player = function () {
  const gameboard = Gameboard();

  const getGameBoard = function () {
    return gameboard;
  };

  const attack = function (player, posA, posB) {
    const enemyGameBoard = player.getGameBoard();
    enemyGameBoard.receiveAttack(posA, posB);
  };

  return { getGameBoard };
};
