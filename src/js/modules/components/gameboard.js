import Ship from "./ship.js";

const Gameboard = function () {
  let board = [];
  const maxSize = 10;

  const createBoard = function () {
    board = [];

    for (let i = 0; i < maxSize; i++) {
      board[i] = [];
      for (let j = 0; j < maxSize; j++) {
        board[i][j] = {
          id: +`${i}${j}`,
          shipCell: null,
          marked: false,
          res: false,
        };
      }
    }
  };

  createBoard();

  const getGameBoard = function () {
    return board;
  };

  const randomPlaceShips = function (ships) {
    createBoard();
    const positions = ["vertical", "horizontal"];

    // console.log(ships);
    while (ships.length > 0) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      let randomPosition = Math.floor(Math.random() * positions.length);
      const [first, ...others] = ships;
      const shipOnPosition = placeShips(x, y, first, positions[randomPosition]);
      if (shipOnPosition) ships = others;
    }

    return board;
  };

  const placeShips = function (posA, posB, ship, dir = "vertical") {
    if (board[posA][posB].shipCell || board[posA][posB].res) return;
    // for horizontal place for ship length
    if (dir === "horizontal") {
      // check if we can ship length can be put in current cell
      if (ship.getLength() + posB > maxSize) return;

      // check if cell is empty or reserved
      for (let i = 1; i < ship.getLength(); i++) {
        const { shipCell, res } = board[posA][posB + i];
        if (shipCell || res) return;
      }

      for (let i = -1; i <= 1; i++) {
        if (!board[posA + i]) continue;
        for (let j = -1; j <= ship.getLength(); j++) {
          if (
            posB + j < 0 ||
            posB + j >= maxSize ||
            board[posA + i][posB + j].res === true
          )
            continue;

          board[posA + i][posB + j].res = true;
          // console.log(board[posA + i][posB + j]);
          ship.addPositions(board[posA + i][posB + j]);
        }
      }

      // fill board position with ship elements
      for (let i = 0; i < ship.getLength(); i++) {
        board[posA][posB + i].shipCell = ship;
      }

      // for vertical place for ships
      /////////////////////// VERTICAL
    } else if (dir === "vertical") {
      if (ship.getLength() + posA > maxSize) return;

      // check if cell is empty or reserved for ship length
      for (let i = 0; i < ship.getLength(); i++) {
        const { shipCell, res } = board[posA + i][posB];
        if (shipCell || res) return;
      }

      for (let i = -1; i <= ship.getLength(); i++) {
        if (!board[posA + i]) continue;

        for (let j = -1; j <= 1; j++) {
          if (
            posB + j < 0 ||
            posB + j >= maxSize ||
            board[posA + i][posB + j].res === true
          )
            continue;
          board[posA + i][posB + j].res = true;
          ship.addPositions(board[posA + i][posB + j]);
        }
      }

      for (let i = 0; i < ship.getLength(); i++) {
        board[posA + i][posB].shipCell = ship;
      }
    }

    return ship;
  };

  const receiveAttack = function (posA, posB) {
    const { marked, shipCell } = board[posA][posB];
    if (marked) {
      console.log("you already marked cell !!!!!");
      return;
    }
    board[posA][posB].marked = true;

    if (shipCell) {
      shipCell.hit();
      if (shipCell.isSunk()) {
        console.log("you hit all ship elements!!!!");
      } else {
        console.log("you hit ship!!!");
      }
    }
  };

  return {
    board,
    placeShips,
    receiveAttack,
    createBoard,
    randomPlaceShips,
    getGameBoard,
  };
};

const gameboard = Gameboard();
const ship_four_1 = Ship(4);
const ship_four_2 = Ship(4);
const ship_three_1 = Ship(3);
const ship_three_2 = Ship(3);
const ship_two_1 = Ship(2);
const ship_two_2 = Ship(2);
const ship_one_1 = Ship(1);
const ship_one_2 = Ship(1);

gameboard.placeShips(0, 0, ship_four_1, "vertical");
gameboard.placeShips(6, 3, ship_four_2, "vertical");
gameboard.placeShips(5, 0, ship_three_1, "vertical");
gameboard.placeShips(9, 6, ship_three_2, "horizontal"); //
gameboard.placeShips(1, 2, ship_two_1, "vertical");
gameboard.placeShips(2, 5, ship_two_2, "horizontal");
gameboard.placeShips(4, 5, ship_one_1, "vertical");
gameboard.placeShips(4, 7, ship_one_2, "horizontal");

// console.log(gameboard.board);
gameboard.receiveAttack(0, 0);
gameboard.receiveAttack(1, 0);
gameboard.receiveAttack(2, 0);
gameboard.receiveAttack(3, 0);
// console.log(ship_four_1.getPositions());
// console.log(gameboard.board);
// const shipTest = new Ship(4);
// gameboard.placeShips(5, 0, shipTest, "hori");

// // console.log(gameboard.board);
// console.log(shipTest.position);
export default Gameboard;
