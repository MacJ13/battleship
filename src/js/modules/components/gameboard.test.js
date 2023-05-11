import Gameboard from "./gameboard";
import Ship from "./ship";

describe("test Gameboard factory function", () => {
  const testBoard = Gameboard();

  test("test cell board", () => {
    const testShip = Ship(4);
    testBoard.board[30].ship = 4;
    let testCell = testBoard.placeShips(0, 0, testShip);

    expect(testCell).toEqual({ id: 0, x: 0, y: 0, ship: 4, marked: false });
    console.log(testBoard.board);
    // testBoard.board[52].ship = 5;
    // testCell = testBoard.placeShips(5, 1, testShip);
    // expect(testCell).toEqual({ id: 51, x: 5, y: 1, ship: null, marked: false });
    // console.log(testBoard.board);
    // testCell = testBoard.placeShips(0, 7, testShip);
    // expect(testCell).toBeFalsy();
  });
});
