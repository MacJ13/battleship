import Ship from "./ship.js";

const Gameboard = function () {
  let board = [];
  const maxSize = 10;

  // For Computer player to choose potential positions when
  // ship is hit
  let potentialComputerShipPositions = [];
  let nextPosition = "";
  let potentialDirections = [
    [-1, 0], //  up next position
    [0, 1], // right next position
    [1, 0], // bottom next position
    [0, -1], // left next position
  ];
  //////////////////////////////////////////////////////

  const clearGameBoard = function () {
    board.length = 0;
  };

  const createBoard = function () {
    clearGameBoard();

    for (let i = 0; i < maxSize; i++) {
      board[i] = [];
    }

    let j = 0;
    for (let i = 0; i <= board.length; i++) {
      if (i === board.length) {
        j++;
        i = 0;
      }
      if (j === board.length) break;

      board[j][i] = {
        // id: +`${i}${j}`,
        shipCell: null,
        marked: false,
        res: false,
      };
    }
    // for (let i = 0; i < maxSize; i++) {
    //   board[i] = [];
    //   for (let j = 0; j < maxSize; j++) {
    //     board[i][j] = {
    //       id: +`${i}${j}`,
    //       shipCell: null,
    //       marked: false,
    //       res: false,
    //     };
    //   }
    // }
  };

  createBoard();

  const getBoard = function () {
    return board;
  };

  const randomPlaceShips = function (ships) {
    createBoard();
    const positions = ["vertical", "horizontal"];

    // console.log(ships);
    while (ships.length > 0) {
      let x = Math.floor(Math.random() * maxSize);
      let y = Math.floor(Math.random() * maxSize);
      let randomPosition = Math.floor(Math.random() * positions.length);
      const [first, ...others] = ships;
      const shipOnPosition = placeShips(x, y, first, positions[randomPosition]);
      if (shipOnPosition) ships = others;
    }

    return board;
  };

  const placeShips = function (posA, posB, ship, dir = "vertical") {
    ship.clearReservedPositions();
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

      // fill board position with ship elements
      for (let i = 0; i < ship.getLength(); i++) {
        board[posA][posB + i].shipCell = ship;
      }

      // fill board with reserved cells around ship elements
      for (let i = -1; i <= 1; i++) {
        if (!board[posA + i]) continue;
        for (let j = -1; j <= ship.getLength(); j++) {
          if (
            posB + j < 0 ||
            posB + j >= maxSize ||
            board[posA + i][posB + j].shipCell
          )
            continue;

          board[posA + i][posB + j].res = true;
          // console.log(board[posA + i][posB + j]);
          // ship.addReservedPositions(board[posA + i][posB + j]);
          ship.addReservedPositions({ posA: posA + i, posB: posB + j });
        }
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

      for (let i = 0; i < ship.getLength(); i++) {
        board[posA + i][posB].shipCell = ship;
      }

      for (let i = -1; i <= ship.getLength(); i++) {
        if (!board[posA + i]) continue;

        for (let j = -1; j <= 1; j++) {
          if (
            posB + j < 0 ||
            posB + j >= maxSize ||
            board[posA + i][posB + j].shipCell
          )
            continue;
          board[posA + i][posB + j].res = true;
          // ship.addReservedPositions(board[posA + i][posB + j]);
          ship.addReservedPositions({ posA: posA + i, posB: posB + j });
        }
      }
    }

    return ship;
  };

  const receiveAttack = function (posA, posB) {
    const { marked, shipCell } = board[posA][posB];
    // check if element is marked:
    if (marked) return;

    // set marked property to true;
    board[posA][posB].marked = true;

    // note hit if shiCell is on cell
    if (shipCell) shipCell.hit();

    // return object from board element
    return board[posA][posB];
  };

  const setReservedCellBoard = function (positions) {
    for (let i = 0; i < positions.length; i++) {
      let { posA, posB } = positions[i];
      if (!board[posA][posB].marked) board[posA][posB].marked = true;
    }
  };

  // add every possible direction to check computer positions array
  const createPotentialPosition = function (posA, posB) {
    // add possible direction to potential computer position array
    for (let i = 0; i < potentialDirections.length; i++) {
      const [x, y] = potentialDirections[i];
      const posX = posA + x;
      const posY = posB + y;
      // check if potential direction exist
      if (board[posX]?.[posY]) {
        if (!board[posX][posY].marked) {
          //  direction defines as index's number of potentionalPositions array
          potentialComputerShipPositions.push({
            position: [posX, posY],
            direction: i,
          });
        }
      }
    }

    // for (let potential of potentialComputerShipPositions) {
    //   console.log(potential["position"], { direction: potential["direction"] });
    // }
  };

  const checkNextPotentialShipPosition = function () {
    function isEven(direction) {
      return direction % 2 === 0;
    }

    function isOdd(direction) {
      return direction % 2 === 1;
    }

    //1. first we get random number for index of array potentialComputerShipPositions
    const randomNumber = Math.floor(
      Math.random() * potentialComputerShipPositions.length
    );

    // eventually if element is not in array we return exist nextPostion
    if (!potentialComputerShipPositions[randomNumber]) {
      clearPotentialPosition();
      return nextPosition;
    }

    // 2. next we get position and direction from element of potentialComputerShipPositions
    const { position, direction } =
      potentialComputerShipPositions[randomNumber];

    //3. next we assign two positions two variables
    const x = position[0];
    const y = position[1];

    // 4. we assing string with position one and position two
    // and we extract ship cell, marked, res property from board elements with positions:
    nextPosition = `${x}${y}`;
    const { shipCell, marked, res } = board[x][y];

    // 5a. condition if there is not ship cell we removing element from  potentialComputerShipPositions
    if (!shipCell) {
      potentialComputerShipPositions.splice(randomNumber, 1);
    }
    // //  5b. otherwise is is there and marked is false we remove and
    else if (shipCell && !marked) {
      // 5c. remove element from potentialComputerShipPositions array
      potentialComputerShipPositions.splice(randomNumber, 1);

      const correctDirection = direction % 2 === 0;

      // filter elements only  with correct direction depending on ship postion on board
      potentialComputerShipPositions = potentialComputerShipPositions.filter(
        (potentionalPosition) => {
          const { direction } = potentionalPosition;

          const result = correctDirection
            ? isEven(direction)
            : isOdd(direction);
          return result;
        }
      );
      // 5c. we set to check next position in the same direction like our element
      const [dirX, dirY] = potentialDirections[direction];

      const nextX = dirX + x;
      const nextY = dirY + y;

      // check if there is element for next position
      if (board[nextX]?.[nextY]) {
        // check if element on board is not marked and has ship object
        if (!board[nextX][nextY].marked && board[nextX][nextY].shipCell) {
          // we add next possible position to potential computer positions array
          potentialComputerShipPositions.push({
            position: [nextX, nextY],
            direction,
          });
        }
      }
    }
    // return position to check on board
    return nextPosition;
  };

  // function to get possible next position for computer player
  const getHitAdjacentPositions = function (posA, posB) {
    if (potentialComputerShipPositions.length === 0)
      createPotentialPosition(posA, posB);

    return checkNextPotentialShipPosition();
  };

  // clear potential computer positions moves from array
  const clearPotentialPosition = function () {
    potentialComputerShipPositions.length = 0;
  };

  return {
    clearPotentialPosition,
    getHitAdjacentPositions,
    setReservedCellBoard,
    placeShips,
    receiveAttack,
    createBoard,
    randomPlaceShips,
    getBoard,
  };
};

export default Gameboard;
