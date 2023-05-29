/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/modules/components/computerAI.js":
/*!*************************************************!*\
  !*** ./src/js/modules/components/computerAI.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/js/modules/components/player.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/js/modules/components/helpers.js");



const ComputerAI = function (id, playerName) {
  const positionBoard = [];

  let isShipHit = false;
  let position;
  let currentHitShip = null;

  let player = Object.create((0,_player__WEBPACK_IMPORTED_MODULE_0__["default"])(id, playerName));

  let gameboard = player.getPlayerBoard();

  const saveAllPositionBoard = function () {
    if (positionBoard.length !== 0) positionBoard.length = 0;
    let j = 0;

    const length = gameboard.length;

    for (let i = 0; i <= length; i++) {
      if (i === length) {
        j++;
        i = 0;
      }
      if (j === length) {
        break;
      }
      positionBoard.push(`${j}${i}`);
    }
  };

  const getPositionBoard = function (enemy) {
    if (isShipHit || currentHitShip) {
      const nextPosition = enemy.getHitAdjacentPositions(position);

      position = nextPosition;
      const indexPosition = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.binarySearch)(positionBoard, position);
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

  const checkShipHit = function (ship) {
    if (!currentHitShip) {
      isShipHit = true;
      currentHitShip = ship;
    }
  };

  const uncheckShipHit = function () {
    isShipHit = false;
    currentHitShip = null;
  };

  const clearReservedPositions = function (reservedPostions) {
    reservedPostions.forEach((reserved) => {
      const { posA, posB } = reserved;
      const index = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.binarySearch)(positionBoard, `${posA}${posB}`);
      if (index >= 0) positionBoard.splice(index, 1);
    });
  };

  return Object.assign(player, {
    clearReservedPositions,
    /////////////////////////
    checkShipHit,
    uncheckShipHit,
    saveAllPositionBoard,
    getPositionBoard,
    checkShipHit,
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComputerAI);


/***/ }),

/***/ "./src/js/modules/components/game.js":
/*!*******************************************!*\
  !*** ./src/js/modules/components/game.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ui_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/ui */ "./src/js/modules/components/ui/ui.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/js/modules/components/player.js");
/* harmony import */ var _computerAI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computerAI */ "./src/js/modules/components/computerAI.js");
/* harmony import */ var _ui_gameUI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui/gameUI */ "./src/js/modules/components/ui/gameUI.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers */ "./src/js/modules/components/helpers.js");
/* harmony import */ var _ui_endUI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui/endUI */ "./src/js/modules/components/ui/endUI.js");








const Game = function () {
  const ui = (0,_ui_ui__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const gameUI = (0,_ui_gameUI__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const endUI = (0,_ui_endUI__WEBPACK_IMPORTED_MODULE_5__["default"])();

  const players = [];

  let playing = false;
  let currentPlayer = null;
  let enemyPlayer = null;

  const createPLayers = function () {
    // get players info from inputs
    const playersUI = ui.getPlayerNames();

    //  create players objects and add to players array
    for (let { playerId, playerName } of playersUI) {
      const player =
        // playerName !== ui.getCheckboxValue()
        playerName !== "computer"
          ? (0,_player__WEBPACK_IMPORTED_MODULE_1__["default"])(playerId, playerName)
          : (0,_computerAI__WEBPACK_IMPORTED_MODULE_2__["default"])(playerId, playerName);

      players.push(player);
    }
    // set players?
    currentPlayer = players[0];
    enemyPlayer = players[1];

    // add player 1's ships to queue
    _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.addItems(players[0].getShips());

    // call function to create gameBoards for players;
    createGameBoard();
  };

  const setShipOnBoard = function (gameBoardObj) {
    const shipOnBoard = players[0].getShipOnGameBoard(
      gameBoardObj,
      _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek()
    );
    if (!shipOnBoard) return;

    gameUI.renderShipOnGameBoard(gameBoardObj, _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek());
    _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.dequeue();
    gameUI.renderShipPick(_helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek(), _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.countTypeShip());
  };

  const setRandomShipsOnBoard = function () {
    _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.clearQueue();
    players[0].getRandomShipsPosition();
    const gameBoard = players[0].getPlayerBoard();
    gameUI.renderRandomGameBoard(gameBoard);
  };

  const clearGameBoard = function () {
    players[0].clearGameBoard();
    _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.addItems(players[0].getShips());

    gameUI.clearGameBoard(players[0].getPlayerBoard());
    gameUI.renderShipPick(_helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek(), _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.countTypeShip());
  };

  const switchPlayers = function () {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    enemyPlayer = enemyPlayer === players[1] ? players[0] : players[1];

    gameUI.renderCurrentPlayer(currentPlayer);
  };

  const playGameComputer = function () {
    const randomPosition = currentPlayer.getPositionBoard(enemyPlayer);
    playGame(randomPosition);
  };

  const playGameUser = function (event) {
    if (!playing) return;
    const pos = gameUI.getBoardPositionPlayer2(event);
    if (!pos) return;
    playGame(pos);
  };

  const playGame = function (pos) {
    // check if timeout is truthy to prevent call event
    if (_helpers__WEBPACK_IMPORTED_MODULE_4__.timeout.getTime() || !playing) {
      return;
    }

    // pass pos variable to get gameboard cell object with values of player2
    const enemyCellBoard = currentPlayer.getPlayerBoardCell(enemyPlayer, pos);

    // check if enemyCellBoard is falsy
    if (!enemyCellBoard) {
      // if (currentPlayer === players[1]) playGameComputer();
      return;
    }

    // ship object from board element
    const targetShip = enemyCellBoard.shipCell;

    // render mark on target cell
    gameUI.renderTargetGameBoardCell(pos, targetShip, enemyPlayer.getGameId());

    generateActionAfterHit(targetShip);

    //
    if (currentPlayer.isPlayer()) return;

    _helpers__WEBPACK_IMPORTED_MODULE_4__.timeout.setTime(playGameComputer);
  };

  const generateActionAfterHit = function (targetShip) {
    // check if shipcell exists, if there is a ship on cell
    if (!targetShip) {
      switchPlayers(); // change player if we don't hit ship on cell
      return;
    }

    // if targetShip exist make actions below

    if (!currentPlayer.isPlayer())
      // we draw random position around target ship
      currentPlayer.checkShipHit(targetShip);

    // check if targetShip is fully Sunk
    if (targetShip.isSunk()) {
      if (!currentPlayer.isPlayer()) {
        // check if current player is computer
        currentPlayer.uncheckShipHit(); //after unchecking these settings we draw random position on board
        enemyPlayer.clearComputerPotentialPosition(); // we remove unneeded potential position around ship fields on enemy board
        currentPlayer.clearReservedPositions(targetShip.getReservedPositions()); // we remove also reserved positions around ship fields from potential computer positions
      }

      // set reserved cells as marked around ship cells on enemy board
      enemyPlayer.setReservedCellBoard(targetShip.getReservedPositions());

      // render reserved cell elements on enemy boards elements
      gameUI.renderReservedPostions(
        enemyPlayer,
        targetShip.getReservedPositions()
      );
      // render hit ship element on ship list element
      gameUI.renderSunkShipsOnList(enemyPlayer);
    }

    // check if all enemy ships are sunks
    if (enemyPlayer.allShipsSink()) {
      gameUI.removeClickGameBoardPlayer2(playGameUser);
      _helpers__WEBPACK_IMPORTED_MODULE_4__.timeout.setTime(endGame);
    }
  };

  const endGame = function () {
    playing = false;
    gameUI.toggleGameTrackEl();

    endUI.toggleModal();
    endUI.renderGameResult(currentPlayer.getName());
  };

  // method set player1 ship board and call event listener for
  // game board of player 2
  const runGame = function () {
    // set random ships for player 2
    players[1].getRandomShipsPosition();

    // generate all positions on gameboard for ComputerAI
    players[1].saveAllPositionBoard();

    // if all set we change playing to "true" value
    playing = true;
    gameUI.renderCurrentPlayer(players[0]);

    // call method with player 2 gameboard event listeners
    gameUI.onClickGameBoardPlayer2(playGameUser);
    console.log("run The Game");
  };

  const createGameBoard = function () {
    const ship = _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek();
    const countShipTypes = _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.countTypeShip();

    gameUI.renderGamePlayerElements(players);
    gameUI.renderShipPick(ship, countShipTypes);

    gameUI.onClickShipPick();

    // gameUI.onDropShipPick(setShipOnBoard, players[0].getPlayerBoard);
    gameUI.onDragShipPick(players[0].getPlayerBoard());
    gameUI.onDropShipPick(setShipOnBoard);

    gameUI.onClickResetBtn(clearGameBoard);
    gameUI.onClickRandomBtn(setRandomShipsOnBoard);
    gameUI.onClickPlayBtn(runGame);
  };

  const restartGame = function () {
    if (!currentPlayer.isPlayer()) {
      currentPlayer = players[0];
      enemyPlayer = players[1];
    }

    for (let player of players) {
      player.clearShips();
      player.clearGameBoard();
    }

    gameUI.renderGamePlayerElements(players);

    _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.addItems(players[0].getShips());
    gameUI.renderShipPick(_helpers__WEBPACK_IMPORTED_MODULE_4__.queue.peek(), _helpers__WEBPACK_IMPORTED_MODULE_4__.queue.countTypeShip());

    gameUI.hidePlayButton();
    endUI.toggleModal();
  };

  const init = function () {
    ui.onClickCreatePlayer(createPLayers);
    endUI.onClickRestartBtn(restartGame);

    // ui.onClickCheckBox();
  };

  return { init };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/js/modules/components/gameboard.js":
/*!************************************************!*\
  !*** ./src/js/modules/components/gameboard.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/js/modules/components/ship.js");


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/js/modules/components/helpers.js":
/*!**********************************************!*\
  !*** ./src/js/modules/components/helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binarySearch": () => (/* binding */ binarySearch),
/* harmony export */   "queue": () => (/* binding */ queue),
/* harmony export */   "shipMeasurements": () => (/* binding */ shipMeasurements),
/* harmony export */   "splitStr": () => (/* binding */ splitStr),
/* harmony export */   "timeout": () => (/* binding */ timeout)
/* harmony export */ });
const splitStr = function (str) {
  return str.split("");
};

const shipMeasurements = [4, 4, 3, 3, 2, 2, 1, 1];

const queue = (function () {
  let elements = {};
  let head = 0;
  let tail = 0;

  function clearQueue() {
    elements = {};
    head = 0;
    tail = 0;
  }

  function enqueue(element) {
    elements[tail] = element;
    tail++;
  }

  function dequeue() {
    const item = elements[head];
    delete elements[head];
    head++;
    return item;
  }

  function peek() {
    return elements[head];
  }

  function countTypeShip() {
    let count = 0;
    for (const i in elements) {
      const currentShip = elements[i];
      if (peek().getLength() !== currentShip.getLength()) break;
      count++;
    }
    return count;
  }

  function length() {
    return tail - head;
  }

  function isEmpty() {
    return length() == 0;
  }

  function addItems(items) {
    clearQueue();
    for (let item of items) enqueue(item);
  }

  return {
    enqueue,
    dequeue,
    peek,
    length,
    isEmpty,
    countTypeShip,
    clearQueue,
    addItems,
  };
})();

const binarySearch = function (arr, index) {
  let left = 0;
  let right = arr.length - 1;

  let mid;

  while (right >= left) {
    mid = left + Math.floor((right - left) / 2);

    // If the element is present at the middle
    // itself
    if (arr[mid] == index) return mid;

    // If element is smaller than mid, then
    // it can only be present in left subarray
    if (arr[mid] > index) right = mid - 1;
    // Else the element can only be present
    // in right subarray
    else left = mid + 1;
  }

  return -1;
};

// timeout for computer player two stop time for some time
const timeout = (function () {
  let timeoutVar = null;
  let second = 750;

  const setTime = function (cb) {
    timeoutVar = setTimeout(() => {
      timeoutVar = null;
      cb();
    }, second);
  };

  const getTime = function () {
    return timeoutVar;
  };

  return { setTime, getTime };
})();




/***/ }),

/***/ "./src/js/modules/components/player.js":
/*!*********************************************!*\
  !*** ./src/js/modules/components/player.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/js/modules/components/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/js/modules/components/ship.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/js/modules/components/helpers.js");





const Player = function (id, playerName) {
  let name = playerName;
  let gameId = id;

  const gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();

  const ships = [];

  const createShip = function () {
    _helpers__WEBPACK_IMPORTED_MODULE_2__.shipMeasurements.forEach((measure) => {
      ships.push((0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(measure));
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
    const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.splitStr)(gameBoardObj.pos);

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
    const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.splitStr)(pos);
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
    const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.splitStr)(pos);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);


/***/ }),

/***/ "./src/js/modules/components/ship.js":
/*!*******************************************!*\
  !*** ./src/js/modules/components/ship.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Ship = function (l) {
  const length = l;
  let numOfHits = 0;
  let sunk = isSunk();
  let reservedPositions = [];

  function getLength() {
    return length;
  }

  function getSunk() {
    return sunk;
  }

  function addReservedPositions(pos) {
    reservedPositions.push(pos);
  }

  function hit() {
    if (numOfHits < length) {
      numOfHits++;
    }
    if (isSunk()) sunk = true;
  }

  function getNumOfHits() {
    return numOfHits;
  }

  function isSunk() {
    return length === numOfHits;
  }

  function getReservedPositions() {
    return reservedPositions;
  }

  function clearReservedPositions() {
    reservedPositions.length = 0;
  }

  return {
    clearReservedPositions,
    getReservedPositions,
    getLength,
    getSunk,
    hit,
    getNumOfHits,
    isSunk,
    addReservedPositions,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/js/modules/components/ui/endUI.js":
/*!***********************************************!*\
  !*** ./src/js/modules/components/ui/endUI.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const EndUI = function () {
  const modalEl = document.querySelector(".modal");
  const modalResultEl = document.querySelector(".modal-result");
  const modalRestartBtn = document.getElementById("game-restart-btn");

  const toggleModal = function () {
    modalEl.classList.toggle("hidden");
  };

  const renderGameResult = function (playerName) {
    const winnerName = playerName[0].toUpperCase() + playerName.slice(1);
    const result = `${winnerName} won game!`;
    modalResultEl.textContent = result;
  };

  const onClickRestartBtn = function (cb) {
    modalRestartBtn.addEventListener("click", cb);
  };

  return { toggleModal, renderGameResult, onClickRestartBtn };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EndUI);


/***/ }),

/***/ "./src/js/modules/components/ui/gameUI.js":
/*!************************************************!*\
  !*** ./src/js/modules/components/ui/gameUI.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/js/modules/components/helpers.js");


function GameUI() {
  const gameElement = document.querySelector(".game");

  const gameTrackElement = document.querySelector(".game-track");

  const gameRandomButton = document.getElementById("game-random-btn");
  const gameResetButton = document.getElementById("game-reset-btn");
  const gamePlayButton = document.getElementById("game-play-btn");

  const gamePlayer1Element = document.getElementById("game-player1");
  const gamePlayer2Element = document.getElementById("game-player2");

  const gameBoardPlayer1 = gamePlayer1Element.querySelector(".game-board");
  const gameBoardPlayer2 = gamePlayer2Element.querySelector(".game-board");

  const gameButtonsPlayer1 =
    gamePlayer1Element.querySelector(".game-ship-buttons");

  const gameShipPickElement =
    gamePlayer1Element.querySelector(".game-ship-pick");
  const gameShipObjectElement =
    gamePlayer1Element.querySelector(".game-ship-object");
  const gameShipAmountElement =
    gamePlayer1Element.querySelector(".game-ship-amount");

  let draggedTarget = null;
  let targetGameBoxEl = null;

  const renderGamePlayerElements = function (players) {
    players.forEach((player) => {
      targetGameBoxEl = document.getElementById(player.getGameId());
      const gamePlayerEl = targetGameBoxEl.querySelector(".game-playername");
      const gameBoardEl = targetGameBoxEl.querySelector(".game-board");
      const gameShipListEl = targetGameBoxEl.querySelector(".game-ship-list");

      renderPlayerName(gamePlayerEl, player.getName());
      renderGameBoard(gameBoardEl, player.getPlayerBoard());
      renderShipList(gameShipListEl, player.getShips());
    });

    toggleGameButtons();

    showGameElements();
  };

  function toggleGameButtons() {
    gameButtonsPlayer1.classList.toggle("hidden");
  }

  function showGameElements() {
    gameElement.classList.add("show");
  }

  function renderShipPick(ship, count) {
    showShipPick();

    gameShipObjectElement.innerHTML = "";

    if (!ship) {
      hideShipPick();
      showPlayButton();
      return;
    }

    for (let i = 0; i < ship.getLength(); i++) {
      const span = document.createElement("span");
      span.className = "game-ship-object-part";

      gameShipObjectElement.appendChild(span);
    }

    const { position } = gameShipObjectElement.dataset;

    if (position === "horizontal") {
      gameShipObjectElement.style.gridTemplateColumns = `repeat(${gameShipObjectElement.children.length}, 1fr)`;
    } else {
      gameShipObjectElement.style.gridTemplateColumns = `repeat(1, 1fr)`;
    }

    gameShipAmountElement.textContent = `x${count}`;
  }

  function renderPlayerName(el, playerName) {
    el.textContent = `${playerName} board`;
  }

  function renderGameBoard(el, board) {
    el.innerHTML = "";

    const size = board.length * board.length;

    for (let i = 0; i < size; i++) {
      let pos = i < 10 ? `0${i}` : `${i}`;
      const [posA, posB] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.splitStr)(pos);

      const span = document.createElement("span");
      span.className = "game-cell";

      span.dataset.pos = pos;
      if (board[+posA][+posB].shipCell) {
        span.classList.add("game-ship-cell");
      }

      el.appendChild(span);
    }
  }

  const isShipPickHidden = function () {
    return gameShipPickElement.classList.contains("hidden");
  };

  const hideShipPick = function () {
    if (isShipPickHidden()) return;
    gameShipPickElement.classList.add("hidden");
  };

  const showShipPick = function () {
    if (!isShipPickHidden()) return;
    gameShipPickElement.classList.remove("hidden");
  };

  // Do poprawy funkcja
  function renderSunkShipsOnList(player) {
    targetGameBoxEl = document.getElementById(player.getGameId());
    const shipList = targetGameBoxEl.querySelector(".game-ship-list");
    renderShipList(shipList, player.getShips());
  }

  function renderShipList(el, ships) {
    el.innerHTML = "";
    for (let i = 0; i < ships.length; i++) {
      const li = document.createElement("li");
      li.classList.add("game-ship-item");
      // console.log({ shipSunk: ships[i].isSunk() });
      if (ships[i].isSunk()) {
        li.classList.add("sunk");
      }

      for (let j = 0; j < ships[i].getLength(); j++) {
        const span = document.createElement("span");
        span.classList.add("game-ship-part");
        li.appendChild(span);
      }
      el.appendChild(li);
    }
  }

  const renderTargetGameBoardCell = function (pos, ship, gameBoardId) {
    targetGameBoxEl = document.getElementById(gameBoardId);

    const gameBoardCell = targetGameBoxEl.querySelector(
      `span[data-pos="${pos}"]`
    );
    if (!ship) gameBoardCell.classList.add("reserved");

    const span = document.createElement("span");
    span.className = ship ? "hit" : "miss";

    gameBoardCell.appendChild(span);
  };

  const clearGameBoard = function (gameboard) {
    renderGameBoard(gameBoardPlayer1, gameboard);
    hidePlayButton();
  };

  const renderRandomGameBoard = function (board) {
    renderGameBoard(gameBoardPlayer1, board);
    hideShipPick();
    showPlayButton();
  };

  const renderShipOnGameBoard = function (obj, currentShip) {
    const { pos, position } = obj;

    const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.splitStr)(pos);

    for (let i = 0; i < currentShip.getLength(); i++) {
      const currentPos =
        position === "vertical" ? `${i * 1 + +x}${y}` : `${x}${+y + i * 1}`;

      const partEl = gameBoardPlayer1.querySelector(
        `span[data-pos="${currentPos}"]`
      );
      partEl.classList.add("game-ship-cell");
    }
  };

  const renderReservedPostions = function (player, reservedPositions) {
    targetGameBoxEl = document.getElementById(player.getGameId());

    for (let i = 0; i < reservedPositions.length; i++) {
      const { posA, posB } = reservedPositions[i];
      const boardCell = targetGameBoxEl.querySelector(
        `span[data-pos="${posA}${posB}"]`
      );
      if (boardCell.childElementCount <= 0) {
        boardCell.classList.add("reserved");
        const span = document.createElement("span");
        span.className = "miss";
        boardCell.appendChild(span);
      }
    }
  };

  const changePositionShipPick = function (el) {
    const { position } = el.dataset;

    let newPosition = position === "horizontal" ? "vertical" : "horizontal";

    el.dataset.position = newPosition;

    if (newPosition === "horizontal") {
      el.style.gridTemplateColumns = `repeat(${el.children.length}, 1fr)`;
    } else {
      el.style.gridTemplateColumns = `repeat(1, 1fr)`;
    }
  };

  const hideReservedCells = function (board) {
    gameBoardPlayer1.querySelectorAll(".game-cell").forEach((cellEl) => {
      const pos = cellEl.dataset.pos;
      const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.splitStr)(pos);
      const { res } = board[+x][+y];
      if (res) {
        cellEl.classList.remove("reserved");
      }
    });
  };

  const showReservedCells = function (board) {
    gameBoardPlayer1.querySelectorAll(".game-cell").forEach((cellEl) => {
      const pos = cellEl.dataset.pos;
      const [x, y] = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.splitStr)(pos);
      const { res } = board[+x][+y];
      if (res) {
        cellEl.classList.add("reserved");
      }
    });
  };

  const hidePlayButton = function () {
    if (gamePlayButton.classList.contains("hidden")) return;
    gamePlayButton.classList.add("hidden");
  };

  const showPlayButton = function () {
    if (!gamePlayButton.classList.contains("hidden")) return;
    gamePlayButton.classList.remove("hidden");
  };

  const toggleGameTrackEl = function () {
    gameTrackElement.classList.toggle("hidden");
  };

  const renderCurrentPlayer = function (currentPlayer) {
    gameTrackElement.querySelector(
      ".game-turn"
    ).textContent = `${currentPlayer.getName()}'s turn`;
  };

  const getBoardPositionPlayer2 = function (event) {
    // check if clicked target is element with "game-cell" class
    const target = event.target;
    if (!target.classList.contains("game-cell")) return;

    // get attribute data-pos from element
    const { pos } = event.target.dataset;
    // return pos attribute;
    return pos;
  };

  const onClickShipPick = function () {
    gameShipObjectElement.addEventListener("click", (event) => {
      changePositionShipPick(event.currentTarget);
    });
  };

  const onClickResetBtn = function (callback) {
    gameResetButton.addEventListener("click", callback);
  };

  const onClickRandomBtn = function (callback) {
    gameRandomButton.addEventListener("click", callback);
  };

  const onDragShipPick = function (board) {
    // start draggable
    gameShipObjectElement.addEventListener("dragstart", (event) => {
      draggedTarget = event.target; // target element, which is draggeble
      showReservedCells(board);
    });

    gameShipObjectElement.addEventListener("dragend", () => {
      // fires when user end to drag element
      hideReservedCells(board);
    });
  };

  const onDropShipPick = function (callback) {
    // const onDropShipPick = function (callback, getBoard) {
    gameBoardPlayer1.addEventListener("dragover", (event) => {
      // document.body.addEventListener("dragover", (event) => {
      // prevent default to allow drop
      event.preventDefault();
    });

    gameBoardPlayer1.addEventListener("drop", (event) => {
      // document.body.addEventListener("drop", (event) => {
      event.preventDefault();

      // move dragged element to the selected drop target {
      // const parent = event.target.closest("#game-player1");

      // if (
      //   // !parent ||
      //   !draggedTarget ||
      //   !event.target.classList.contains("game-cell")
      // )
      //

      if (!draggedTarget || !event.target.classList.contains("game-cell"))
        return;

      const obj = {
        pos: event.target.dataset.pos,
        position: draggedTarget.dataset.position,
      };

      draggedTarget = null;
      callback(obj);
    });
  };

  const onClickPlayBtn = function (callback) {
    gamePlayButton.addEventListener("click", () => {
      toggleGameButtons();
      toggleGameTrackEl();
      callback();
    });
  };

  const onClickGameBoardPlayer2 = function (callback) {
    // gameBoardPlayer2.addEventListener("click", (event) => {
    // // check if clicked target is element with "game-cell" class
    // const target = event.target;
    // if (!target.classList.contains("game-cell")) return;

    // // get attribute data-pos from element
    // const { pos } = event.target.dataset;

    // // pass attribute to callback
    // callback(pos);
    // callback(event);
    // });
    gameBoardPlayer2.addEventListener("click", callback);
  };

  const removeClickGameBoardPlayer2 = function (callback) {
    gameBoardPlayer2.removeEventListener("click", callback);
  };

  return {
    getBoardPositionPlayer2,
    hidePlayButton,
    toggleGameTrackEl,
    //////////////////
    renderCurrentPlayer,
    //////////////////////
    renderReservedPostions,
    //////////////////////
    renderSunkShipsOnList,
    //////////////////////
    renderTargetGameBoardCell,
    renderGamePlayerElements,
    renderShipOnGameBoard,
    renderRandomGameBoard,
    renderShipPick,
    clearGameBoard,
    onDragShipPick,
    onDropShipPick,
    onClickShipPick,
    onClickResetBtn,
    onClickRandomBtn,
    onClickPlayBtn,
    onClickGameBoardPlayer2,
    removeClickGameBoardPlayer2,
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameUI);


/***/ }),

/***/ "./src/js/modules/components/ui/ui.js":
/*!********************************************!*\
  !*** ./src/js/modules/components/ui/ui.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const UI = function () {
  const playerMenuEl = document.querySelector(".menu");
  // const player1Input = document.getElementById("player1_name");
  // const player2Input = document.getElementById("player2_name");
  // const computerCheckbox = document.getElementById("computer_name");
  const createPlayerBtn = document.getElementById("create-player-btn");

  const getInputValue = function (value, i) {
    return value || `Player ${i + 1}`;
  };

  const getPlayerNames = function () {
    const players = [];

    // let player1Name = player1Input.value || "Player 1";
    // let player2Name = player2Input.value || "Player 2";
    // console.dir(computerCheckbox);
    // console.log({ checked: computerCheckbox.checked });

    // if (computerCheckbox.checked) {
    //   player2Input.value = computerCheckbox.value;
    // }

    playerMenuEl.style.display = "none";

    const inputs = playerMenuEl.querySelectorAll(`input[data-gameboard]`);

    inputs.forEach((input, i) => {
      // const playerName = !input.disabled
      //   ? getInputValue(input.value, i)
      //   : computerCheckbox.value;
      // const playerId = input.dataset.gameboard;

      const playerName = getInputValue(input.value, i);
      const playerId = input.dataset.gameboard;

      players.push({ playerId, playerName });
    });

    return players;
  };

  // const getCheckboxValue = function () {
  //   return computerCheckbox.value;
  // };

  const onClickCreatePlayer = function (cb) {
    createPlayerBtn.addEventListener("click", cb);
  };

  // const onClickCheckBox = function () {
  //   computerCheckbox.addEventListener("change", () => {
  //     if (computerCheckbox.checked) {
  //       player2Input.disabled = true;
  //     } else {
  //       player2Input.disabled = false;
  //     }
  //   });
  // };

  return {
    onClickCreatePlayer,
    // onClickCheckBox,
    getPlayerNames,
    // getCheckboxValue,
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _modules_components_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/components/game */ "./src/js/modules/components/game.js");



const game = (0,_modules_components_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
game.init();
console.log("Battleship");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNCQUFzQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLEVBQUUsRUFBRSxFQUFFO0FBQzVCLFlBQVksd0JBQXdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsU0FBUyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNVN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRDtBQUNvRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0doQztBQUNWO0FBQzFCO0FBQ3VEO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0RBQVM7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDhEQUF3QjtBQUM1QixpQkFBaUIsaURBQUk7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0RBQVE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrREFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixrREFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLE1BQU0sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakh0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNyRHBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsTUFBTSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUN4WXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsTUFBTTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1DQUFtQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7O1VDcEVsQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04yQjtBQUNrQjtBQUM3QztBQUNBLGFBQWEsb0VBQUk7QUFDakI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2Fzcy9tYWluLnNjc3M/YTRlNiIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2pzL21vZHVsZXMvY29tcG9uZW50cy9jb21wdXRlckFJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9jb21wb25lbnRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL2NvbXBvbmVudHMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9jb21wb25lbnRzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL2NvbXBvbmVudHMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9jb21wb25lbnRzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL2NvbXBvbmVudHMvdWkvZW5kVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9qcy9tb2R1bGVzL2NvbXBvbmVudHMvdWkvZ2FtZVVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvanMvbW9kdWxlcy9jb21wb25lbnRzL3VpL3VpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2pzL2FwcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgeyBiaW5hcnlTZWFyY2ggfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jb25zdCBDb21wdXRlckFJID0gZnVuY3Rpb24gKGlkLCBwbGF5ZXJOYW1lKSB7XHJcbiAgY29uc3QgcG9zaXRpb25Cb2FyZCA9IFtdO1xyXG5cclxuICBsZXQgaXNTaGlwSGl0ID0gZmFsc2U7XHJcbiAgbGV0IHBvc2l0aW9uO1xyXG4gIGxldCBjdXJyZW50SGl0U2hpcCA9IG51bGw7XHJcblxyXG4gIGxldCBwbGF5ZXIgPSBPYmplY3QuY3JlYXRlKFBsYXllcihpZCwgcGxheWVyTmFtZSkpO1xyXG5cclxuICBsZXQgZ2FtZWJvYXJkID0gcGxheWVyLmdldFBsYXllckJvYXJkKCk7XHJcblxyXG4gIGNvbnN0IHNhdmVBbGxQb3NpdGlvbkJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHBvc2l0aW9uQm9hcmQubGVuZ3RoICE9PSAwKSBwb3NpdGlvbkJvYXJkLmxlbmd0aCA9IDA7XHJcbiAgICBsZXQgaiA9IDA7XHJcblxyXG4gICAgY29uc3QgbGVuZ3RoID0gZ2FtZWJvYXJkLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaSA9PT0gbGVuZ3RoKSB7XHJcbiAgICAgICAgaisrO1xyXG4gICAgICAgIGkgPSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChqID09PSBsZW5ndGgpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBwb3NpdGlvbkJvYXJkLnB1c2goYCR7an0ke2l9YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0UG9zaXRpb25Cb2FyZCA9IGZ1bmN0aW9uIChlbmVteSkge1xyXG4gICAgaWYgKGlzU2hpcEhpdCB8fCBjdXJyZW50SGl0U2hpcCkge1xyXG4gICAgICBjb25zdCBuZXh0UG9zaXRpb24gPSBlbmVteS5nZXRIaXRBZGphY2VudFBvc2l0aW9ucyhwb3NpdGlvbik7XHJcblxyXG4gICAgICBwb3NpdGlvbiA9IG5leHRQb3NpdGlvbjtcclxuICAgICAgY29uc3QgaW5kZXhQb3NpdGlvbiA9IGJpbmFyeVNlYXJjaChwb3NpdGlvbkJvYXJkLCBwb3NpdGlvbik7XHJcbiAgICAgIGlmIChpbmRleFBvc2l0aW9uICE9PSAtMSkgcG9zaXRpb25Cb2FyZC5zcGxpY2UoaW5kZXhQb3NpdGlvbiwgMSk7XHJcbiAgICAgIGVsc2UgcG9zaXRpb24gPSBwb3NpdGlvbkJvYXJkLnBvcCgpO1xyXG4gICAgICAvLy8vLy8vLy8vLy8vL1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zaXRpb25Cb2FyZC5sZW5ndGgpO1xyXG5cclxuICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbkJvYXJkW3JhbmRvbU51bWJlcl07XHJcblxyXG4gICAgICBwb3NpdGlvbkJvYXJkLnNwbGljZShyYW5kb21OdW1iZXIsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwb3NpdGlvbjtcclxuICB9O1xyXG5cclxuICBjb25zdCBjaGVja1NoaXBIaXQgPSBmdW5jdGlvbiAoc2hpcCkge1xyXG4gICAgaWYgKCFjdXJyZW50SGl0U2hpcCkge1xyXG4gICAgICBpc1NoaXBIaXQgPSB0cnVlO1xyXG4gICAgICBjdXJyZW50SGl0U2hpcCA9IHNoaXA7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgdW5jaGVja1NoaXBIaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpc1NoaXBIaXQgPSBmYWxzZTtcclxuICAgIGN1cnJlbnRIaXRTaGlwID0gbnVsbDtcclxuICB9O1xyXG5cclxuICBjb25zdCBjbGVhclJlc2VydmVkUG9zaXRpb25zID0gZnVuY3Rpb24gKHJlc2VydmVkUG9zdGlvbnMpIHtcclxuICAgIHJlc2VydmVkUG9zdGlvbnMuZm9yRWFjaCgocmVzZXJ2ZWQpID0+IHtcclxuICAgICAgY29uc3QgeyBwb3NBLCBwb3NCIH0gPSByZXNlcnZlZDtcclxuICAgICAgY29uc3QgaW5kZXggPSBiaW5hcnlTZWFyY2gocG9zaXRpb25Cb2FyZCwgYCR7cG9zQX0ke3Bvc0J9YCk7XHJcbiAgICAgIGlmIChpbmRleCA+PSAwKSBwb3NpdGlvbkJvYXJkLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihwbGF5ZXIsIHtcclxuICAgIGNsZWFyUmVzZXJ2ZWRQb3NpdGlvbnMsXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICBjaGVja1NoaXBIaXQsXHJcbiAgICB1bmNoZWNrU2hpcEhpdCxcclxuICAgIHNhdmVBbGxQb3NpdGlvbkJvYXJkLFxyXG4gICAgZ2V0UG9zaXRpb25Cb2FyZCxcclxuICAgIGNoZWNrU2hpcEhpdCxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbXB1dGVyQUk7XHJcbiIsImltcG9ydCBVSSBmcm9tIFwiLi91aS91aVwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgQ29tcHV0ZXJBSSBmcm9tIFwiLi9jb21wdXRlckFJXCI7XHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vdWkvZ2FtZVVJXCI7XHJcblxyXG5pbXBvcnQgeyBxdWV1ZSwgdGltZW91dCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcclxuaW1wb3J0IEVuZFVJIGZyb20gXCIuL3VpL2VuZFVJXCI7XHJcblxyXG5jb25zdCBHYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHVpID0gVUkoKTtcclxuICBjb25zdCBnYW1lVUkgPSBHYW1lVUkoKTtcclxuICBjb25zdCBlbmRVSSA9IEVuZFVJKCk7XHJcblxyXG4gIGNvbnN0IHBsYXllcnMgPSBbXTtcclxuXHJcbiAgbGV0IHBsYXlpbmcgPSBmYWxzZTtcclxuICBsZXQgY3VycmVudFBsYXllciA9IG51bGw7XHJcbiAgbGV0IGVuZW15UGxheWVyID0gbnVsbDtcclxuXHJcbiAgY29uc3QgY3JlYXRlUExheWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGdldCBwbGF5ZXJzIGluZm8gZnJvbSBpbnB1dHNcclxuICAgIGNvbnN0IHBsYXllcnNVSSA9IHVpLmdldFBsYXllck5hbWVzKCk7XHJcblxyXG4gICAgLy8gIGNyZWF0ZSBwbGF5ZXJzIG9iamVjdHMgYW5kIGFkZCB0byBwbGF5ZXJzIGFycmF5XHJcbiAgICBmb3IgKGxldCB7IHBsYXllcklkLCBwbGF5ZXJOYW1lIH0gb2YgcGxheWVyc1VJKSB7XHJcbiAgICAgIGNvbnN0IHBsYXllciA9XHJcbiAgICAgICAgLy8gcGxheWVyTmFtZSAhPT0gdWkuZ2V0Q2hlY2tib3hWYWx1ZSgpXHJcbiAgICAgICAgcGxheWVyTmFtZSAhPT0gXCJjb21wdXRlclwiXHJcbiAgICAgICAgICA/IFBsYXllcihwbGF5ZXJJZCwgcGxheWVyTmFtZSlcclxuICAgICAgICAgIDogQ29tcHV0ZXJBSShwbGF5ZXJJZCwgcGxheWVyTmFtZSk7XHJcblxyXG4gICAgICBwbGF5ZXJzLnB1c2gocGxheWVyKTtcclxuICAgIH1cclxuICAgIC8vIHNldCBwbGF5ZXJzP1xyXG4gICAgY3VycmVudFBsYXllciA9IHBsYXllcnNbMF07XHJcbiAgICBlbmVteVBsYXllciA9IHBsYXllcnNbMV07XHJcblxyXG4gICAgLy8gYWRkIHBsYXllciAxJ3Mgc2hpcHMgdG8gcXVldWVcclxuICAgIHF1ZXVlLmFkZEl0ZW1zKHBsYXllcnNbMF0uZ2V0U2hpcHMoKSk7XHJcblxyXG4gICAgLy8gY2FsbCBmdW5jdGlvbiB0byBjcmVhdGUgZ2FtZUJvYXJkcyBmb3IgcGxheWVycztcclxuICAgIGNyZWF0ZUdhbWVCb2FyZCgpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNldFNoaXBPbkJvYXJkID0gZnVuY3Rpb24gKGdhbWVCb2FyZE9iaikge1xyXG4gICAgY29uc3Qgc2hpcE9uQm9hcmQgPSBwbGF5ZXJzWzBdLmdldFNoaXBPbkdhbWVCb2FyZChcclxuICAgICAgZ2FtZUJvYXJkT2JqLFxyXG4gICAgICBxdWV1ZS5wZWVrKClcclxuICAgICk7XHJcbiAgICBpZiAoIXNoaXBPbkJvYXJkKSByZXR1cm47XHJcblxyXG4gICAgZ2FtZVVJLnJlbmRlclNoaXBPbkdhbWVCb2FyZChnYW1lQm9hcmRPYmosIHF1ZXVlLnBlZWsoKSk7XHJcbiAgICBxdWV1ZS5kZXF1ZXVlKCk7XHJcbiAgICBnYW1lVUkucmVuZGVyU2hpcFBpY2socXVldWUucGVlaygpLCBxdWV1ZS5jb3VudFR5cGVTaGlwKCkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNldFJhbmRvbVNoaXBzT25Cb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHF1ZXVlLmNsZWFyUXVldWUoKTtcclxuICAgIHBsYXllcnNbMF0uZ2V0UmFuZG9tU2hpcHNQb3NpdGlvbigpO1xyXG4gICAgY29uc3QgZ2FtZUJvYXJkID0gcGxheWVyc1swXS5nZXRQbGF5ZXJCb2FyZCgpO1xyXG4gICAgZ2FtZVVJLnJlbmRlclJhbmRvbUdhbWVCb2FyZChnYW1lQm9hcmQpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNsZWFyR2FtZUJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheWVyc1swXS5jbGVhckdhbWVCb2FyZCgpO1xyXG4gICAgcXVldWUuYWRkSXRlbXMocGxheWVyc1swXS5nZXRTaGlwcygpKTtcclxuXHJcbiAgICBnYW1lVUkuY2xlYXJHYW1lQm9hcmQocGxheWVyc1swXS5nZXRQbGF5ZXJCb2FyZCgpKTtcclxuICAgIGdhbWVVSS5yZW5kZXJTaGlwUGljayhxdWV1ZS5wZWVrKCksIHF1ZXVlLmNvdW50VHlwZVNoaXAoKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc3dpdGNoUGxheWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGN1cnJlbnRQbGF5ZXIgPSBjdXJyZW50UGxheWVyID09PSBwbGF5ZXJzWzBdID8gcGxheWVyc1sxXSA6IHBsYXllcnNbMF07XHJcbiAgICBlbmVteVBsYXllciA9IGVuZW15UGxheWVyID09PSBwbGF5ZXJzWzFdID8gcGxheWVyc1swXSA6IHBsYXllcnNbMV07XHJcblxyXG4gICAgZ2FtZVVJLnJlbmRlckN1cnJlbnRQbGF5ZXIoY3VycmVudFBsYXllcik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcGxheUdhbWVDb21wdXRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHJhbmRvbVBvc2l0aW9uID0gY3VycmVudFBsYXllci5nZXRQb3NpdGlvbkJvYXJkKGVuZW15UGxheWVyKTtcclxuICAgIHBsYXlHYW1lKHJhbmRvbVBvc2l0aW9uKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBwbGF5R2FtZVVzZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgIGlmICghcGxheWluZykgcmV0dXJuO1xyXG4gICAgY29uc3QgcG9zID0gZ2FtZVVJLmdldEJvYXJkUG9zaXRpb25QbGF5ZXIyKGV2ZW50KTtcclxuICAgIGlmICghcG9zKSByZXR1cm47XHJcbiAgICBwbGF5R2FtZShwb3MpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYXlHYW1lID0gZnVuY3Rpb24gKHBvcykge1xyXG4gICAgLy8gY2hlY2sgaWYgdGltZW91dCBpcyB0cnV0aHkgdG8gcHJldmVudCBjYWxsIGV2ZW50XHJcbiAgICBpZiAodGltZW91dC5nZXRUaW1lKCkgfHwgIXBsYXlpbmcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHBhc3MgcG9zIHZhcmlhYmxlIHRvIGdldCBnYW1lYm9hcmQgY2VsbCBvYmplY3Qgd2l0aCB2YWx1ZXMgb2YgcGxheWVyMlxyXG4gICAgY29uc3QgZW5lbXlDZWxsQm9hcmQgPSBjdXJyZW50UGxheWVyLmdldFBsYXllckJvYXJkQ2VsbChlbmVteVBsYXllciwgcG9zKTtcclxuXHJcbiAgICAvLyBjaGVjayBpZiBlbmVteUNlbGxCb2FyZCBpcyBmYWxzeVxyXG4gICAgaWYgKCFlbmVteUNlbGxCb2FyZCkge1xyXG4gICAgICAvLyBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyc1sxXSkgcGxheUdhbWVDb21wdXRlcigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpcCBvYmplY3QgZnJvbSBib2FyZCBlbGVtZW50XHJcbiAgICBjb25zdCB0YXJnZXRTaGlwID0gZW5lbXlDZWxsQm9hcmQuc2hpcENlbGw7XHJcblxyXG4gICAgLy8gcmVuZGVyIG1hcmsgb24gdGFyZ2V0IGNlbGxcclxuICAgIGdhbWVVSS5yZW5kZXJUYXJnZXRHYW1lQm9hcmRDZWxsKHBvcywgdGFyZ2V0U2hpcCwgZW5lbXlQbGF5ZXIuZ2V0R2FtZUlkKCkpO1xyXG5cclxuICAgIGdlbmVyYXRlQWN0aW9uQWZ0ZXJIaXQodGFyZ2V0U2hpcCk7XHJcblxyXG4gICAgLy9cclxuICAgIGlmIChjdXJyZW50UGxheWVyLmlzUGxheWVyKCkpIHJldHVybjtcclxuXHJcbiAgICB0aW1lb3V0LnNldFRpbWUocGxheUdhbWVDb21wdXRlcik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2VuZXJhdGVBY3Rpb25BZnRlckhpdCA9IGZ1bmN0aW9uICh0YXJnZXRTaGlwKSB7XHJcbiAgICAvLyBjaGVjayBpZiBzaGlwY2VsbCBleGlzdHMsIGlmIHRoZXJlIGlzIGEgc2hpcCBvbiBjZWxsXHJcbiAgICBpZiAoIXRhcmdldFNoaXApIHtcclxuICAgICAgc3dpdGNoUGxheWVycygpOyAvLyBjaGFuZ2UgcGxheWVyIGlmIHdlIGRvbid0IGhpdCBzaGlwIG9uIGNlbGxcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHRhcmdldFNoaXAgZXhpc3QgbWFrZSBhY3Rpb25zIGJlbG93XHJcblxyXG4gICAgaWYgKCFjdXJyZW50UGxheWVyLmlzUGxheWVyKCkpXHJcbiAgICAgIC8vIHdlIGRyYXcgcmFuZG9tIHBvc2l0aW9uIGFyb3VuZCB0YXJnZXQgc2hpcFxyXG4gICAgICBjdXJyZW50UGxheWVyLmNoZWNrU2hpcEhpdCh0YXJnZXRTaGlwKTtcclxuXHJcbiAgICAvLyBjaGVjayBpZiB0YXJnZXRTaGlwIGlzIGZ1bGx5IFN1bmtcclxuICAgIGlmICh0YXJnZXRTaGlwLmlzU3VuaygpKSB7XHJcbiAgICAgIGlmICghY3VycmVudFBsYXllci5pc1BsYXllcigpKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCBwbGF5ZXIgaXMgY29tcHV0ZXJcclxuICAgICAgICBjdXJyZW50UGxheWVyLnVuY2hlY2tTaGlwSGl0KCk7IC8vYWZ0ZXIgdW5jaGVja2luZyB0aGVzZSBzZXR0aW5ncyB3ZSBkcmF3IHJhbmRvbSBwb3NpdGlvbiBvbiBib2FyZFxyXG4gICAgICAgIGVuZW15UGxheWVyLmNsZWFyQ29tcHV0ZXJQb3RlbnRpYWxQb3NpdGlvbigpOyAvLyB3ZSByZW1vdmUgdW5uZWVkZWQgcG90ZW50aWFsIHBvc2l0aW9uIGFyb3VuZCBzaGlwIGZpZWxkcyBvbiBlbmVteSBib2FyZFxyXG4gICAgICAgIGN1cnJlbnRQbGF5ZXIuY2xlYXJSZXNlcnZlZFBvc2l0aW9ucyh0YXJnZXRTaGlwLmdldFJlc2VydmVkUG9zaXRpb25zKCkpOyAvLyB3ZSByZW1vdmUgYWxzbyByZXNlcnZlZCBwb3NpdGlvbnMgYXJvdW5kIHNoaXAgZmllbGRzIGZyb20gcG90ZW50aWFsIGNvbXB1dGVyIHBvc2l0aW9uc1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBzZXQgcmVzZXJ2ZWQgY2VsbHMgYXMgbWFya2VkIGFyb3VuZCBzaGlwIGNlbGxzIG9uIGVuZW15IGJvYXJkXHJcbiAgICAgIGVuZW15UGxheWVyLnNldFJlc2VydmVkQ2VsbEJvYXJkKHRhcmdldFNoaXAuZ2V0UmVzZXJ2ZWRQb3NpdGlvbnMoKSk7XHJcblxyXG4gICAgICAvLyByZW5kZXIgcmVzZXJ2ZWQgY2VsbCBlbGVtZW50cyBvbiBlbmVteSBib2FyZHMgZWxlbWVudHNcclxuICAgICAgZ2FtZVVJLnJlbmRlclJlc2VydmVkUG9zdGlvbnMoXHJcbiAgICAgICAgZW5lbXlQbGF5ZXIsXHJcbiAgICAgICAgdGFyZ2V0U2hpcC5nZXRSZXNlcnZlZFBvc2l0aW9ucygpXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIHJlbmRlciBoaXQgc2hpcCBlbGVtZW50IG9uIHNoaXAgbGlzdCBlbGVtZW50XHJcbiAgICAgIGdhbWVVSS5yZW5kZXJTdW5rU2hpcHNPbkxpc3QoZW5lbXlQbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrIGlmIGFsbCBlbmVteSBzaGlwcyBhcmUgc3Vua3NcclxuICAgIGlmIChlbmVteVBsYXllci5hbGxTaGlwc1NpbmsoKSkge1xyXG4gICAgICBnYW1lVUkucmVtb3ZlQ2xpY2tHYW1lQm9hcmRQbGF5ZXIyKHBsYXlHYW1lVXNlcik7XHJcbiAgICAgIHRpbWVvdXQuc2V0VGltZShlbmRHYW1lKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBlbmRHYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcGxheWluZyA9IGZhbHNlO1xyXG4gICAgZ2FtZVVJLnRvZ2dsZUdhbWVUcmFja0VsKCk7XHJcblxyXG4gICAgZW5kVUkudG9nZ2xlTW9kYWwoKTtcclxuICAgIGVuZFVJLnJlbmRlckdhbWVSZXN1bHQoY3VycmVudFBsYXllci5nZXROYW1lKCkpO1xyXG4gIH07XHJcblxyXG4gIC8vIG1ldGhvZCBzZXQgcGxheWVyMSBzaGlwIGJvYXJkIGFuZCBjYWxsIGV2ZW50IGxpc3RlbmVyIGZvclxyXG4gIC8vIGdhbWUgYm9hcmQgb2YgcGxheWVyIDJcclxuICBjb25zdCBydW5HYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gc2V0IHJhbmRvbSBzaGlwcyBmb3IgcGxheWVyIDJcclxuICAgIHBsYXllcnNbMV0uZ2V0UmFuZG9tU2hpcHNQb3NpdGlvbigpO1xyXG5cclxuICAgIC8vIGdlbmVyYXRlIGFsbCBwb3NpdGlvbnMgb24gZ2FtZWJvYXJkIGZvciBDb21wdXRlckFJXHJcbiAgICBwbGF5ZXJzWzFdLnNhdmVBbGxQb3NpdGlvbkJvYXJkKCk7XHJcblxyXG4gICAgLy8gaWYgYWxsIHNldCB3ZSBjaGFuZ2UgcGxheWluZyB0byBcInRydWVcIiB2YWx1ZVxyXG4gICAgcGxheWluZyA9IHRydWU7XHJcbiAgICBnYW1lVUkucmVuZGVyQ3VycmVudFBsYXllcihwbGF5ZXJzWzBdKTtcclxuXHJcbiAgICAvLyBjYWxsIG1ldGhvZCB3aXRoIHBsYXllciAyIGdhbWVib2FyZCBldmVudCBsaXN0ZW5lcnNcclxuICAgIGdhbWVVSS5vbkNsaWNrR2FtZUJvYXJkUGxheWVyMihwbGF5R2FtZVVzZXIpO1xyXG4gICAgY29uc29sZS5sb2coXCJydW4gVGhlIEdhbWVcIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3JlYXRlR2FtZUJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3Qgc2hpcCA9IHF1ZXVlLnBlZWsoKTtcclxuICAgIGNvbnN0IGNvdW50U2hpcFR5cGVzID0gcXVldWUuY291bnRUeXBlU2hpcCgpO1xyXG5cclxuICAgIGdhbWVVSS5yZW5kZXJHYW1lUGxheWVyRWxlbWVudHMocGxheWVycyk7XHJcbiAgICBnYW1lVUkucmVuZGVyU2hpcFBpY2soc2hpcCwgY291bnRTaGlwVHlwZXMpO1xyXG5cclxuICAgIGdhbWVVSS5vbkNsaWNrU2hpcFBpY2soKTtcclxuXHJcbiAgICAvLyBnYW1lVUkub25Ecm9wU2hpcFBpY2soc2V0U2hpcE9uQm9hcmQsIHBsYXllcnNbMF0uZ2V0UGxheWVyQm9hcmQpO1xyXG4gICAgZ2FtZVVJLm9uRHJhZ1NoaXBQaWNrKHBsYXllcnNbMF0uZ2V0UGxheWVyQm9hcmQoKSk7XHJcbiAgICBnYW1lVUkub25Ecm9wU2hpcFBpY2soc2V0U2hpcE9uQm9hcmQpO1xyXG5cclxuICAgIGdhbWVVSS5vbkNsaWNrUmVzZXRCdG4oY2xlYXJHYW1lQm9hcmQpO1xyXG4gICAgZ2FtZVVJLm9uQ2xpY2tSYW5kb21CdG4oc2V0UmFuZG9tU2hpcHNPbkJvYXJkKTtcclxuICAgIGdhbWVVSS5vbkNsaWNrUGxheUJ0bihydW5HYW1lKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZXN0YXJ0R2FtZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghY3VycmVudFBsYXllci5pc1BsYXllcigpKSB7XHJcbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJzWzBdO1xyXG4gICAgICBlbmVteVBsYXllciA9IHBsYXllcnNbMV07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgcGxheWVyIG9mIHBsYXllcnMpIHtcclxuICAgICAgcGxheWVyLmNsZWFyU2hpcHMoKTtcclxuICAgICAgcGxheWVyLmNsZWFyR2FtZUJvYXJkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZVVJLnJlbmRlckdhbWVQbGF5ZXJFbGVtZW50cyhwbGF5ZXJzKTtcclxuXHJcbiAgICBxdWV1ZS5hZGRJdGVtcyhwbGF5ZXJzWzBdLmdldFNoaXBzKCkpO1xyXG4gICAgZ2FtZVVJLnJlbmRlclNoaXBQaWNrKHF1ZXVlLnBlZWsoKSwgcXVldWUuY291bnRUeXBlU2hpcCgpKTtcclxuXHJcbiAgICBnYW1lVUkuaGlkZVBsYXlCdXR0b24oKTtcclxuICAgIGVuZFVJLnRvZ2dsZU1vZGFsKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHVpLm9uQ2xpY2tDcmVhdGVQbGF5ZXIoY3JlYXRlUExheWVycyk7XHJcbiAgICBlbmRVSS5vbkNsaWNrUmVzdGFydEJ0bihyZXN0YXJ0R2FtZSk7XHJcblxyXG4gICAgLy8gdWkub25DbGlja0NoZWNrQm94KCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgaW5pdCB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcC5qc1wiO1xyXG5cclxuY29uc3QgR2FtZWJvYXJkID0gZnVuY3Rpb24gKCkge1xyXG4gIGxldCBib2FyZCA9IFtdO1xyXG4gIGNvbnN0IG1heFNpemUgPSAxMDtcclxuXHJcbiAgLy8gRm9yIENvbXB1dGVyIHBsYXllciB0byBjaG9vc2UgcG90ZW50aWFsIHBvc2l0aW9ucyB3aGVuXHJcbiAgLy8gc2hpcCBpcyBoaXRcclxuICBsZXQgcG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zID0gW107XHJcbiAgbGV0IG5leHRQb3NpdGlvbiA9IFwiXCI7XHJcbiAgbGV0IHBvdGVudGlhbERpcmVjdGlvbnMgPSBbXHJcbiAgICBbLTEsIDBdLCAvLyAgdXAgbmV4dCBwb3NpdGlvblxyXG4gICAgWzAsIDFdLCAvLyByaWdodCBuZXh0IHBvc2l0aW9uXHJcbiAgICBbMSwgMF0sIC8vIGJvdHRvbSBuZXh0IHBvc2l0aW9uXHJcbiAgICBbMCwgLTFdLCAvLyBsZWZ0IG5leHQgcG9zaXRpb25cclxuICBdO1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICBjb25zdCBjbGVhckdhbWVCb2FyZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGJvYXJkLmxlbmd0aCA9IDA7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY3JlYXRlQm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjbGVhckdhbWVCb2FyZCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4U2l6ZTsgaSsrKSB7XHJcbiAgICAgIGJvYXJkW2ldID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGogPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gYm9hcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGkgPT09IGJvYXJkLmxlbmd0aCkge1xyXG4gICAgICAgIGorKztcclxuICAgICAgICBpID0gMDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaiA9PT0gYm9hcmQubGVuZ3RoKSBicmVhaztcclxuXHJcbiAgICAgIGJvYXJkW2pdW2ldID0ge1xyXG4gICAgICAgIC8vIGlkOiArYCR7aX0ke2p9YCxcclxuICAgICAgICBzaGlwQ2VsbDogbnVsbCxcclxuICAgICAgICBtYXJrZWQ6IGZhbHNlLFxyXG4gICAgICAgIHJlczogZmFsc2UsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IG1heFNpemU7IGkrKykge1xyXG4gICAgLy8gICBib2FyZFtpXSA9IFtdO1xyXG4gICAgLy8gICBmb3IgKGxldCBqID0gMDsgaiA8IG1heFNpemU7IGorKykge1xyXG4gICAgLy8gICAgIGJvYXJkW2ldW2pdID0ge1xyXG4gICAgLy8gICAgICAgaWQ6ICtgJHtpfSR7an1gLFxyXG4gICAgLy8gICAgICAgc2hpcENlbGw6IG51bGwsXHJcbiAgICAvLyAgICAgICBtYXJrZWQ6IGZhbHNlLFxyXG4gICAgLy8gICAgICAgcmVzOiBmYWxzZSxcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlQm9hcmQoKTtcclxuXHJcbiAgY29uc3QgZ2V0Qm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gYm9hcmQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmFuZG9tUGxhY2VTaGlwcyA9IGZ1bmN0aW9uIChzaGlwcykge1xyXG4gICAgY3JlYXRlQm9hcmQoKTtcclxuICAgIGNvbnN0IHBvc2l0aW9ucyA9IFtcInZlcnRpY2FsXCIsIFwiaG9yaXpvbnRhbFwiXTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhzaGlwcyk7XHJcbiAgICB3aGlsZSAoc2hpcHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNpemUpO1xyXG4gICAgICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNpemUpO1xyXG4gICAgICBsZXQgcmFuZG9tUG9zaXRpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NpdGlvbnMubGVuZ3RoKTtcclxuICAgICAgY29uc3QgW2ZpcnN0LCAuLi5vdGhlcnNdID0gc2hpcHM7XHJcbiAgICAgIGNvbnN0IHNoaXBPblBvc2l0aW9uID0gcGxhY2VTaGlwcyh4LCB5LCBmaXJzdCwgcG9zaXRpb25zW3JhbmRvbVBvc2l0aW9uXSk7XHJcbiAgICAgIGlmIChzaGlwT25Qb3NpdGlvbikgc2hpcHMgPSBvdGhlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGJvYXJkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSBmdW5jdGlvbiAocG9zQSwgcG9zQiwgc2hpcCwgZGlyID0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICBzaGlwLmNsZWFyUmVzZXJ2ZWRQb3NpdGlvbnMoKTtcclxuICAgIGlmIChib2FyZFtwb3NBXVtwb3NCXS5zaGlwQ2VsbCB8fCBib2FyZFtwb3NBXVtwb3NCXS5yZXMpIHJldHVybjtcclxuICAgIC8vIGZvciBob3Jpem9udGFsIHBsYWNlIGZvciBzaGlwIGxlbmd0aFxyXG4gICAgaWYgKGRpciA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgLy8gY2hlY2sgaWYgd2UgY2FuIHNoaXAgbGVuZ3RoIGNhbiBiZSBwdXQgaW4gY3VycmVudCBjZWxsXHJcbiAgICAgIGlmIChzaGlwLmdldExlbmd0aCgpICsgcG9zQiA+IG1heFNpemUpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGNlbGwgaXMgZW1wdHkgb3IgcmVzZXJ2ZWRcclxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcclxuICAgICAgICBjb25zdCB7IHNoaXBDZWxsLCByZXMgfSA9IGJvYXJkW3Bvc0FdW3Bvc0IgKyBpXTtcclxuICAgICAgICBpZiAoc2hpcENlbGwgfHwgcmVzKSByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGZpbGwgYm9hcmQgcG9zaXRpb24gd2l0aCBzaGlwIGVsZW1lbnRzXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XHJcbiAgICAgICAgYm9hcmRbcG9zQV1bcG9zQiArIGldLnNoaXBDZWxsID0gc2hpcDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gZmlsbCBib2FyZCB3aXRoIHJlc2VydmVkIGNlbGxzIGFyb3VuZCBzaGlwIGVsZW1lbnRzXHJcbiAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8PSAxOyBpKyspIHtcclxuICAgICAgICBpZiAoIWJvYXJkW3Bvc0EgKyBpXSkgY29udGludWU7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IC0xOyBqIDw9IHNoaXAuZ2V0TGVuZ3RoKCk7IGorKykge1xyXG4gICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICBwb3NCICsgaiA8IDAgfHxcclxuICAgICAgICAgICAgcG9zQiArIGogPj0gbWF4U2l6ZSB8fFxyXG4gICAgICAgICAgICBib2FyZFtwb3NBICsgaV1bcG9zQiArIGpdLnNoaXBDZWxsXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgIGJvYXJkW3Bvc0EgKyBpXVtwb3NCICsgal0ucmVzID0gdHJ1ZTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJvYXJkW3Bvc0EgKyBpXVtwb3NCICsgal0pO1xyXG4gICAgICAgICAgLy8gc2hpcC5hZGRSZXNlcnZlZFBvc2l0aW9ucyhib2FyZFtwb3NBICsgaV1bcG9zQiArIGpdKTtcclxuICAgICAgICAgIHNoaXAuYWRkUmVzZXJ2ZWRQb3NpdGlvbnMoeyBwb3NBOiBwb3NBICsgaSwgcG9zQjogcG9zQiArIGogfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBmb3IgdmVydGljYWwgcGxhY2UgZm9yIHNoaXBzXHJcbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFZFUlRJQ0FMXHJcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgIGlmIChzaGlwLmdldExlbmd0aCgpICsgcG9zQSA+IG1heFNpemUpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIGNlbGwgaXMgZW1wdHkgb3IgcmVzZXJ2ZWQgZm9yIHNoaXAgbGVuZ3RoXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5nZXRMZW5ndGgoKTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeyBzaGlwQ2VsbCwgcmVzIH0gPSBib2FyZFtwb3NBICsgaV1bcG9zQl07XHJcbiAgICAgICAgaWYgKHNoaXBDZWxsIHx8IHJlcykgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xyXG4gICAgICAgIGJvYXJkW3Bvc0EgKyBpXVtwb3NCXS5zaGlwQ2VsbCA9IHNoaXA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAtMTsgaSA8PSBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcclxuICAgICAgICBpZiAoIWJvYXJkW3Bvc0EgKyBpXSkgY29udGludWU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGogPSAtMTsgaiA8PSAxOyBqKyspIHtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgcG9zQiArIGogPCAwIHx8XHJcbiAgICAgICAgICAgIHBvc0IgKyBqID49IG1heFNpemUgfHxcclxuICAgICAgICAgICAgYm9hcmRbcG9zQSArIGldW3Bvc0IgKyBqXS5zaGlwQ2VsbFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIGJvYXJkW3Bvc0EgKyBpXVtwb3NCICsgal0ucmVzID0gdHJ1ZTtcclxuICAgICAgICAgIC8vIHNoaXAuYWRkUmVzZXJ2ZWRQb3NpdGlvbnMoYm9hcmRbcG9zQSArIGldW3Bvc0IgKyBqXSk7XHJcbiAgICAgICAgICBzaGlwLmFkZFJlc2VydmVkUG9zaXRpb25zKHsgcG9zQTogcG9zQSArIGksIHBvc0I6IHBvc0IgKyBqIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzaGlwO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xyXG4gICAgY29uc3QgeyBtYXJrZWQsIHNoaXBDZWxsIH0gPSBib2FyZFtwb3NBXVtwb3NCXTtcclxuICAgIC8vIGNoZWNrIGlmIGVsZW1lbnQgaXMgbWFya2VkOlxyXG4gICAgaWYgKG1hcmtlZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIHNldCBtYXJrZWQgcHJvcGVydHkgdG8gdHJ1ZTtcclxuICAgIGJvYXJkW3Bvc0FdW3Bvc0JdLm1hcmtlZCA9IHRydWU7XHJcblxyXG4gICAgLy8gbm90ZSBoaXQgaWYgc2hpQ2VsbCBpcyBvbiBjZWxsXHJcbiAgICBpZiAoc2hpcENlbGwpIHNoaXBDZWxsLmhpdCgpO1xyXG5cclxuICAgIC8vIHJldHVybiBvYmplY3QgZnJvbSBib2FyZCBlbGVtZW50XHJcbiAgICByZXR1cm4gYm9hcmRbcG9zQV1bcG9zQl07XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2V0UmVzZXJ2ZWRDZWxsQm9hcmQgPSBmdW5jdGlvbiAocG9zaXRpb25zKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgeyBwb3NBLCBwb3NCIH0gPSBwb3NpdGlvbnNbaV07XHJcbiAgICAgIGlmICghYm9hcmRbcG9zQV1bcG9zQl0ubWFya2VkKSBib2FyZFtwb3NBXVtwb3NCXS5tYXJrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIGFkZCBldmVyeSBwb3NzaWJsZSBkaXJlY3Rpb24gdG8gY2hlY2sgY29tcHV0ZXIgcG9zaXRpb25zIGFycmF5XHJcbiAgY29uc3QgY3JlYXRlUG90ZW50aWFsUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xyXG4gICAgLy8gYWRkIHBvc3NpYmxlIGRpcmVjdGlvbiB0byBwb3RlbnRpYWwgY29tcHV0ZXIgcG9zaXRpb24gYXJyYXlcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG90ZW50aWFsRGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBbeCwgeV0gPSBwb3RlbnRpYWxEaXJlY3Rpb25zW2ldO1xyXG4gICAgICBjb25zdCBwb3NYID0gcG9zQSArIHg7XHJcbiAgICAgIGNvbnN0IHBvc1kgPSBwb3NCICsgeTtcclxuICAgICAgLy8gY2hlY2sgaWYgcG90ZW50aWFsIGRpcmVjdGlvbiBleGlzdFxyXG4gICAgICBpZiAoYm9hcmRbcG9zWF0/Lltwb3NZXSkge1xyXG4gICAgICAgIGlmICghYm9hcmRbcG9zWF1bcG9zWV0ubWFya2VkKSB7XHJcbiAgICAgICAgICAvLyAgZGlyZWN0aW9uIGRlZmluZXMgYXMgaW5kZXgncyBudW1iZXIgb2YgcG90ZW50aW9uYWxQb3NpdGlvbnMgYXJyYXlcclxuICAgICAgICAgIHBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IFtwb3NYLCBwb3NZXSxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiBpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIChsZXQgcG90ZW50aWFsIG9mIHBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9ucykge1xyXG4gICAgLy8gICBjb25zb2xlLmxvZyhwb3RlbnRpYWxbXCJwb3NpdGlvblwiXSwgeyBkaXJlY3Rpb246IHBvdGVudGlhbFtcImRpcmVjdGlvblwiXSB9KTtcclxuICAgIC8vIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBjaGVja05leHRQb3RlbnRpYWxTaGlwUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBpc0V2ZW4oZGlyZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gJSAyID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzT2RkKGRpcmVjdGlvbikge1xyXG4gICAgICByZXR1cm4gZGlyZWN0aW9uICUgMiA9PT0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLzEuIGZpcnN0IHdlIGdldCByYW5kb20gbnVtYmVyIGZvciBpbmRleCBvZiBhcnJheSBwb3RlbnRpYWxDb21wdXRlclNoaXBQb3NpdGlvbnNcclxuICAgIGNvbnN0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkgKiBwb3RlbnRpYWxDb21wdXRlclNoaXBQb3NpdGlvbnMubGVuZ3RoXHJcbiAgICApO1xyXG5cclxuICAgIC8vIGV2ZW50dWFsbHkgaWYgZWxlbWVudCBpcyBub3QgaW4gYXJyYXkgd2UgcmV0dXJuIGV4aXN0IG5leHRQb3N0aW9uXHJcbiAgICBpZiAoIXBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9uc1tyYW5kb21OdW1iZXJdKSB7XHJcbiAgICAgIGNsZWFyUG90ZW50aWFsUG9zaXRpb24oKTtcclxuICAgICAgcmV0dXJuIG5leHRQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAyLiBuZXh0IHdlIGdldCBwb3NpdGlvbiBhbmQgZGlyZWN0aW9uIGZyb20gZWxlbWVudCBvZiBwb3RlbnRpYWxDb21wdXRlclNoaXBQb3NpdGlvbnNcclxuICAgIGNvbnN0IHsgcG9zaXRpb24sIGRpcmVjdGlvbiB9ID1cclxuICAgICAgcG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zW3JhbmRvbU51bWJlcl07XHJcblxyXG4gICAgLy8zLiBuZXh0IHdlIGFzc2lnbiB0d28gcG9zaXRpb25zIHR3byB2YXJpYWJsZXNcclxuICAgIGNvbnN0IHggPSBwb3NpdGlvblswXTtcclxuICAgIGNvbnN0IHkgPSBwb3NpdGlvblsxXTtcclxuXHJcbiAgICAvLyA0LiB3ZSBhc3Npbmcgc3RyaW5nIHdpdGggcG9zaXRpb24gb25lIGFuZCBwb3NpdGlvbiB0d29cclxuICAgIC8vIGFuZCB3ZSBleHRyYWN0IHNoaXAgY2VsbCwgbWFya2VkLCByZXMgcHJvcGVydHkgZnJvbSBib2FyZCBlbGVtZW50cyB3aXRoIHBvc2l0aW9uczpcclxuICAgIG5leHRQb3NpdGlvbiA9IGAke3h9JHt5fWA7XHJcbiAgICBjb25zdCB7IHNoaXBDZWxsLCBtYXJrZWQsIHJlcyB9ID0gYm9hcmRbeF1beV07XHJcblxyXG4gICAgLy8gNWEuIGNvbmRpdGlvbiBpZiB0aGVyZSBpcyBub3Qgc2hpcCBjZWxsIHdlIHJlbW92aW5nIGVsZW1lbnQgZnJvbSAgcG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zXHJcbiAgICBpZiAoIXNoaXBDZWxsKSB7XHJcbiAgICAgIHBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9ucy5zcGxpY2UocmFuZG9tTnVtYmVyLCAxKTtcclxuICAgIH1cclxuICAgIC8vIC8vICA1Yi4gb3RoZXJ3aXNlIGlzIGlzIHRoZXJlIGFuZCBtYXJrZWQgaXMgZmFsc2Ugd2UgcmVtb3ZlIGFuZFxyXG4gICAgZWxzZSBpZiAoc2hpcENlbGwgJiYgIW1hcmtlZCkge1xyXG4gICAgICAvLyA1Yy4gcmVtb3ZlIGVsZW1lbnQgZnJvbSBwb3RlbnRpYWxDb21wdXRlclNoaXBQb3NpdGlvbnMgYXJyYXlcclxuICAgICAgcG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zLnNwbGljZShyYW5kb21OdW1iZXIsIDEpO1xyXG5cclxuICAgICAgY29uc3QgY29ycmVjdERpcmVjdGlvbiA9IGRpcmVjdGlvbiAlIDIgPT09IDA7XHJcblxyXG4gICAgICAvLyBmaWx0ZXIgZWxlbWVudHMgb25seSAgd2l0aCBjb3JyZWN0IGRpcmVjdGlvbiBkZXBlbmRpbmcgb24gc2hpcCBwb3N0aW9uIG9uIGJvYXJkXHJcbiAgICAgIHBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9ucyA9IHBvdGVudGlhbENvbXB1dGVyU2hpcFBvc2l0aW9ucy5maWx0ZXIoXHJcbiAgICAgICAgKHBvdGVudGlvbmFsUG9zaXRpb24pID0+IHtcclxuICAgICAgICAgIGNvbnN0IHsgZGlyZWN0aW9uIH0gPSBwb3RlbnRpb25hbFBvc2l0aW9uO1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvcnJlY3REaXJlY3Rpb25cclxuICAgICAgICAgICAgPyBpc0V2ZW4oZGlyZWN0aW9uKVxyXG4gICAgICAgICAgICA6IGlzT2RkKGRpcmVjdGlvbik7XHJcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgLy8gNWMuIHdlIHNldCB0byBjaGVjayBuZXh0IHBvc2l0aW9uIGluIHRoZSBzYW1lIGRpcmVjdGlvbiBsaWtlIG91ciBlbGVtZW50XHJcbiAgICAgIGNvbnN0IFtkaXJYLCBkaXJZXSA9IHBvdGVudGlhbERpcmVjdGlvbnNbZGlyZWN0aW9uXTtcclxuXHJcbiAgICAgIGNvbnN0IG5leHRYID0gZGlyWCArIHg7XHJcbiAgICAgIGNvbnN0IG5leHRZID0gZGlyWSArIHk7XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBlbGVtZW50IGZvciBuZXh0IHBvc2l0aW9uXHJcbiAgICAgIGlmIChib2FyZFtuZXh0WF0/LltuZXh0WV0pIHtcclxuICAgICAgICAvLyBjaGVjayBpZiBlbGVtZW50IG9uIGJvYXJkIGlzIG5vdCBtYXJrZWQgYW5kIGhhcyBzaGlwIG9iamVjdFxyXG4gICAgICAgIGlmICghYm9hcmRbbmV4dFhdW25leHRZXS5tYXJrZWQgJiYgYm9hcmRbbmV4dFhdW25leHRZXS5zaGlwQ2VsbCkge1xyXG4gICAgICAgICAgLy8gd2UgYWRkIG5leHQgcG9zc2libGUgcG9zaXRpb24gdG8gcG90ZW50aWFsIGNvbXB1dGVyIHBvc2l0aW9ucyBhcnJheVxyXG4gICAgICAgICAgcG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zLnB1c2goe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogW25leHRYLCBuZXh0WV0sXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIHBvc2l0aW9uIHRvIGNoZWNrIG9uIGJvYXJkXHJcbiAgICByZXR1cm4gbmV4dFBvc2l0aW9uO1xyXG4gIH07XHJcblxyXG4gIC8vIGZ1bmN0aW9uIHRvIGdldCBwb3NzaWJsZSBuZXh0IHBvc2l0aW9uIGZvciBjb21wdXRlciBwbGF5ZXJcclxuICBjb25zdCBnZXRIaXRBZGphY2VudFBvc2l0aW9ucyA9IGZ1bmN0aW9uIChwb3NBLCBwb3NCKSB7XHJcbiAgICBpZiAocG90ZW50aWFsQ29tcHV0ZXJTaGlwUG9zaXRpb25zLmxlbmd0aCA9PT0gMClcclxuICAgICAgY3JlYXRlUG90ZW50aWFsUG9zaXRpb24ocG9zQSwgcG9zQik7XHJcblxyXG4gICAgcmV0dXJuIGNoZWNrTmV4dFBvdGVudGlhbFNoaXBQb3NpdGlvbigpO1xyXG4gIH07XHJcblxyXG4gIC8vIGNsZWFyIHBvdGVudGlhbCBjb21wdXRlciBwb3NpdGlvbnMgbW92ZXMgZnJvbSBhcnJheVxyXG4gIGNvbnN0IGNsZWFyUG90ZW50aWFsUG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBwb3RlbnRpYWxDb21wdXRlclNoaXBQb3NpdGlvbnMubGVuZ3RoID0gMDtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2xlYXJQb3RlbnRpYWxQb3NpdGlvbixcclxuICAgIGdldEhpdEFkamFjZW50UG9zaXRpb25zLFxyXG4gICAgc2V0UmVzZXJ2ZWRDZWxsQm9hcmQsXHJcbiAgICBwbGFjZVNoaXBzLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGNyZWF0ZUJvYXJkLFxyXG4gICAgcmFuZG9tUGxhY2VTaGlwcyxcclxuICAgIGdldEJvYXJkLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImNvbnN0IHNwbGl0U3RyID0gZnVuY3Rpb24gKHN0cikge1xyXG4gIHJldHVybiBzdHIuc3BsaXQoXCJcIik7XHJcbn07XHJcblxyXG5jb25zdCBzaGlwTWVhc3VyZW1lbnRzID0gWzQsIDQsIDMsIDMsIDIsIDIsIDEsIDFdO1xyXG5cclxuY29uc3QgcXVldWUgPSAoZnVuY3Rpb24gKCkge1xyXG4gIGxldCBlbGVtZW50cyA9IHt9O1xyXG4gIGxldCBoZWFkID0gMDtcclxuICBsZXQgdGFpbCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIGNsZWFyUXVldWUoKSB7XHJcbiAgICBlbGVtZW50cyA9IHt9O1xyXG4gICAgaGVhZCA9IDA7XHJcbiAgICB0YWlsID0gMDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGVucXVldWUoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudHNbdGFpbF0gPSBlbGVtZW50O1xyXG4gICAgdGFpbCsrO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZGVxdWV1ZSgpIHtcclxuICAgIGNvbnN0IGl0ZW0gPSBlbGVtZW50c1toZWFkXTtcclxuICAgIGRlbGV0ZSBlbGVtZW50c1toZWFkXTtcclxuICAgIGhlYWQrKztcclxuICAgIHJldHVybiBpdGVtO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGVlaygpIHtcclxuICAgIHJldHVybiBlbGVtZW50c1toZWFkXTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNvdW50VHlwZVNoaXAoKSB7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgZm9yIChjb25zdCBpIGluIGVsZW1lbnRzKSB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZWxlbWVudHNbaV07XHJcbiAgICAgIGlmIChwZWVrKCkuZ2V0TGVuZ3RoKCkgIT09IGN1cnJlbnRTaGlwLmdldExlbmd0aCgpKSBicmVhaztcclxuICAgICAgY291bnQrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGxlbmd0aCgpIHtcclxuICAgIHJldHVybiB0YWlsIC0gaGVhZDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGlzRW1wdHkoKSB7XHJcbiAgICByZXR1cm4gbGVuZ3RoKCkgPT0gMDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZEl0ZW1zKGl0ZW1zKSB7XHJcbiAgICBjbGVhclF1ZXVlKCk7XHJcbiAgICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSBlbnF1ZXVlKGl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGVucXVldWUsXHJcbiAgICBkZXF1ZXVlLFxyXG4gICAgcGVlayxcclxuICAgIGxlbmd0aCxcclxuICAgIGlzRW1wdHksXHJcbiAgICBjb3VudFR5cGVTaGlwLFxyXG4gICAgY2xlYXJRdWV1ZSxcclxuICAgIGFkZEl0ZW1zLFxyXG4gIH07XHJcbn0pKCk7XHJcblxyXG5jb25zdCBiaW5hcnlTZWFyY2ggPSBmdW5jdGlvbiAoYXJyLCBpbmRleCkge1xyXG4gIGxldCBsZWZ0ID0gMDtcclxuICBsZXQgcmlnaHQgPSBhcnIubGVuZ3RoIC0gMTtcclxuXHJcbiAgbGV0IG1pZDtcclxuXHJcbiAgd2hpbGUgKHJpZ2h0ID49IGxlZnQpIHtcclxuICAgIG1pZCA9IGxlZnQgKyBNYXRoLmZsb29yKChyaWdodCAtIGxlZnQpIC8gMik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgaXMgcHJlc2VudCBhdCB0aGUgbWlkZGxlXHJcbiAgICAvLyBpdHNlbGZcclxuICAgIGlmIChhcnJbbWlkXSA9PSBpbmRleCkgcmV0dXJuIG1pZDtcclxuXHJcbiAgICAvLyBJZiBlbGVtZW50IGlzIHNtYWxsZXIgdGhhbiBtaWQsIHRoZW5cclxuICAgIC8vIGl0IGNhbiBvbmx5IGJlIHByZXNlbnQgaW4gbGVmdCBzdWJhcnJheVxyXG4gICAgaWYgKGFyclttaWRdID4gaW5kZXgpIHJpZ2h0ID0gbWlkIC0gMTtcclxuICAgIC8vIEVsc2UgdGhlIGVsZW1lbnQgY2FuIG9ubHkgYmUgcHJlc2VudFxyXG4gICAgLy8gaW4gcmlnaHQgc3ViYXJyYXlcclxuICAgIGVsc2UgbGVmdCA9IG1pZCArIDE7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gLTE7XHJcbn07XHJcblxyXG4vLyB0aW1lb3V0IGZvciBjb21wdXRlciBwbGF5ZXIgdHdvIHN0b3AgdGltZSBmb3Igc29tZSB0aW1lXHJcbmNvbnN0IHRpbWVvdXQgPSAoZnVuY3Rpb24gKCkge1xyXG4gIGxldCB0aW1lb3V0VmFyID0gbnVsbDtcclxuICBsZXQgc2Vjb25kID0gNzUwO1xyXG5cclxuICBjb25zdCBzZXRUaW1lID0gZnVuY3Rpb24gKGNiKSB7XHJcbiAgICB0aW1lb3V0VmFyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRpbWVvdXRWYXIgPSBudWxsO1xyXG4gICAgICBjYigpO1xyXG4gICAgfSwgc2Vjb25kKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRUaW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRpbWVvdXRWYXI7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgc2V0VGltZSwgZ2V0VGltZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHsgcXVldWUsIGJpbmFyeVNlYXJjaCwgdGltZW91dCwgc3BsaXRTdHIsIHNoaXBNZWFzdXJlbWVudHMgfTtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuaW1wb3J0IHsgc3BsaXRTdHIsIHNoaXBNZWFzdXJlbWVudHMgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XHJcblxyXG5jb25zdCBQbGF5ZXIgPSBmdW5jdGlvbiAoaWQsIHBsYXllck5hbWUpIHtcclxuICBsZXQgbmFtZSA9IHBsYXllck5hbWU7XHJcbiAgbGV0IGdhbWVJZCA9IGlkO1xyXG5cclxuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcclxuXHJcbiAgY29uc3Qgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgY3JlYXRlU2hpcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHNoaXBNZWFzdXJlbWVudHMuZm9yRWFjaCgobWVhc3VyZSkgPT4ge1xyXG4gICAgICBzaGlwcy5wdXNoKFNoaXAobWVhc3VyZSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY3JlYXRlU2hpcCgpO1xyXG5cclxuICBjb25zdCBjbGVhclNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc2hpcHMubGVuZ3RoID0gMDtcclxuICAgIGNyZWF0ZVNoaXAoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRHYW1lSWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2FtZUlkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFNoaXBzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHNoaXBzO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldE5hbWUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gbmFtZTtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRTaGlwT25HYW1lQm9hcmQgPSBmdW5jdGlvbiAoZ2FtZUJvYXJkT2JqLCBzaGlwKSB7XHJcbiAgICAvLyBjb25zdCBbeCwgeV0gPSBnYW1lQm9hcmRPYmoucG9zLnNwbGl0KFwiXCIpO1xyXG4gICAgY29uc3QgW3gsIHldID0gc3BsaXRTdHIoZ2FtZUJvYXJkT2JqLnBvcyk7XHJcblxyXG4gICAgY29uc3Qgc2hpcEJvYXJkID0gZ2FtZWJvYXJkLnBsYWNlU2hpcHMoK3gsICt5LCBzaGlwLCBnYW1lQm9hcmRPYmoucG9zaXRpb24pO1xyXG4gICAgaWYgKCFzaGlwQm9hcmQpIHJldHVybjtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFsbFNoaXBzU2luayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0UmFuZG9tU2hpcHNQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIGNvbnN0IHNoaXBzQXJyID0gWy4uLnNoaXBzXTtcclxuICAgIC8vIGdhbWVib2FyZC5yYW5kb21QbGFjZVNoaXBzKHNoaXBzQXJyKTtcclxuXHJcbiAgICBnYW1lYm9hcmQucmFuZG9tUGxhY2VTaGlwcyhzaGlwcyk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0UGxheWVyQm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gZ2FtZWJvYXJkLmdldEJvYXJkKCk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJHYW1lQm9hcmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBnYW1lYm9hcmQuY3JlYXRlQm9hcmQoKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhdHRhY2sgPSBmdW5jdGlvbiAocG9zKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBzcGxpdFN0cihwb3MpO1xyXG4gICAgcmV0dXJuIGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKCt4LCAreSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2V0UGxheWVyQm9hcmRDZWxsID0gZnVuY3Rpb24gKGVuZW15UGxheWVyLCBwb3MpIHtcclxuICAgIC8vIGVuZW15R2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socG9zKTtcclxuICAgIHJldHVybiBlbmVteVBsYXllci5hdHRhY2socG9zKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzZXRSZXNlcnZlZENlbGxCb2FyZCA9IGZ1bmN0aW9uIChwb3NpdGlvbnMpIHtcclxuICAgIGdhbWVib2FyZC5zZXRSZXNlcnZlZENlbGxCb2FyZChwb3NpdGlvbnMpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldEhpdEFkamFjZW50UG9zaXRpb25zID0gZnVuY3Rpb24gKHBvcywgY3VycmVudFNoaXApIHtcclxuICAgIGNvbnN0IFt4LCB5XSA9IHNwbGl0U3RyKHBvcyk7XHJcbiAgICByZXR1cm4gZ2FtZWJvYXJkLmdldEhpdEFkamFjZW50UG9zaXRpb25zKCt4LCAreSwgY3VycmVudFNoaXApO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzUGxheWVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGdldE5hbWUoKSAhPT0gXCJjb21wdXRlclwiO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNsZWFyQ29tcHV0ZXJQb3RlbnRpYWxQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdhbWVib2FyZC5jbGVhclBvdGVudGlhbFBvc2l0aW9uKCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNsZWFyU2hpcHMsXHJcbiAgICBzZXRSZXNlcnZlZENlbGxCb2FyZCxcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgYWxsU2hpcHNTaW5rLFxyXG4gICAgY2xlYXJDb21wdXRlclBvdGVudGlhbFBvc2l0aW9uLFxyXG4gICAgZ2V0SGl0QWRqYWNlbnRQb3NpdGlvbnMsXHJcbiAgICBpc1BsYXllcixcclxuICAgIGdldEdhbWVJZCxcclxuICAgIGF0dGFjayxcclxuICAgIGdldFBsYXllckJvYXJkLFxyXG4gICAgZ2V0TmFtZSxcclxuICAgIGdldFNoaXBzLFxyXG4gICAgZ2V0U2hpcE9uR2FtZUJvYXJkLFxyXG4gICAgY2xlYXJHYW1lQm9hcmQsXHJcbiAgICBnZXRSYW5kb21TaGlwc1Bvc2l0aW9uLFxyXG4gICAgZ2V0UGxheWVyQm9hcmRDZWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImNvbnN0IFNoaXAgPSBmdW5jdGlvbiAobCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGw7XHJcbiAgbGV0IG51bU9mSGl0cyA9IDA7XHJcbiAgbGV0IHN1bmsgPSBpc1N1bmsoKTtcclxuICBsZXQgcmVzZXJ2ZWRQb3NpdGlvbnMgPSBbXTtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0TGVuZ3RoKCkge1xyXG4gICAgcmV0dXJuIGxlbmd0aDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFN1bmsoKSB7XHJcbiAgICByZXR1cm4gc3VuaztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZFJlc2VydmVkUG9zaXRpb25zKHBvcykge1xyXG4gICAgcmVzZXJ2ZWRQb3NpdGlvbnMucHVzaChwb3MpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGl0KCkge1xyXG4gICAgaWYgKG51bU9mSGl0cyA8IGxlbmd0aCkge1xyXG4gICAgICBudW1PZkhpdHMrKztcclxuICAgIH1cclxuICAgIGlmIChpc1N1bmsoKSkgc3VuayA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXROdW1PZkhpdHMoKSB7XHJcbiAgICByZXR1cm4gbnVtT2ZIaXRzO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xyXG4gICAgcmV0dXJuIGxlbmd0aCA9PT0gbnVtT2ZIaXRzO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0UmVzZXJ2ZWRQb3NpdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gcmVzZXJ2ZWRQb3NpdGlvbnM7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjbGVhclJlc2VydmVkUG9zaXRpb25zKCkge1xyXG4gICAgcmVzZXJ2ZWRQb3NpdGlvbnMubGVuZ3RoID0gMDtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjbGVhclJlc2VydmVkUG9zaXRpb25zLFxyXG4gICAgZ2V0UmVzZXJ2ZWRQb3NpdGlvbnMsXHJcbiAgICBnZXRMZW5ndGgsXHJcbiAgICBnZXRTdW5rLFxyXG4gICAgaGl0LFxyXG4gICAgZ2V0TnVtT2ZIaXRzLFxyXG4gICAgaXNTdW5rLFxyXG4gICAgYWRkUmVzZXJ2ZWRQb3NpdGlvbnMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsImNvbnN0IEVuZFVJID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IG1vZGFsRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpO1xyXG4gIGNvbnN0IG1vZGFsUmVzdWx0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsLXJlc3VsdFwiKTtcclxuICBjb25zdCBtb2RhbFJlc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdhbWUtcmVzdGFydC1idG5cIik7XHJcblxyXG4gIGNvbnN0IHRvZ2dsZU1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbW9kYWxFbC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbmRlckdhbWVSZXN1bHQgPSBmdW5jdGlvbiAocGxheWVyTmFtZSkge1xyXG4gICAgY29uc3Qgd2lubmVyTmFtZSA9IHBsYXllck5hbWVbMF0udG9VcHBlckNhc2UoKSArIHBsYXllck5hbWUuc2xpY2UoMSk7XHJcbiAgICBjb25zdCByZXN1bHQgPSBgJHt3aW5uZXJOYW1lfSB3b24gZ2FtZSFgO1xyXG4gICAgbW9kYWxSZXN1bHRFbC50ZXh0Q29udGVudCA9IHJlc3VsdDtcclxuICB9O1xyXG5cclxuICBjb25zdCBvbkNsaWNrUmVzdGFydEJ0biA9IGZ1bmN0aW9uIChjYikge1xyXG4gICAgbW9kYWxSZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYik7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHsgdG9nZ2xlTW9kYWwsIHJlbmRlckdhbWVSZXN1bHQsIG9uQ2xpY2tSZXN0YXJ0QnRuIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbmRVSTtcclxuIiwiaW1wb3J0IHsgc3BsaXRTdHIgfSBmcm9tIFwiLi4vaGVscGVyc1wiO1xyXG5cclxuZnVuY3Rpb24gR2FtZVVJKCkge1xyXG4gIGNvbnN0IGdhbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lXCIpO1xyXG5cclxuICBjb25zdCBnYW1lVHJhY2tFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLXRyYWNrXCIpO1xyXG5cclxuICBjb25zdCBnYW1lUmFuZG9tQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXJhbmRvbS1idG5cIik7XHJcbiAgY29uc3QgZ2FtZVJlc2V0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXJlc2V0LWJ0blwiKTtcclxuICBjb25zdCBnYW1lUGxheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZS1wbGF5LWJ0blwiKTtcclxuXHJcbiAgY29uc3QgZ2FtZVBsYXllcjFFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXBsYXllcjFcIik7XHJcbiAgY29uc3QgZ2FtZVBsYXllcjJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lLXBsYXllcjJcIik7XHJcblxyXG4gIGNvbnN0IGdhbWVCb2FyZFBsYXllcjEgPSBnYW1lUGxheWVyMUVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWJvYXJkXCIpO1xyXG4gIGNvbnN0IGdhbWVCb2FyZFBsYXllcjIgPSBnYW1lUGxheWVyMkVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWJvYXJkXCIpO1xyXG5cclxuICBjb25zdCBnYW1lQnV0dG9uc1BsYXllcjEgPVxyXG4gICAgZ2FtZVBsYXllcjFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1zaGlwLWJ1dHRvbnNcIik7XHJcblxyXG4gIGNvbnN0IGdhbWVTaGlwUGlja0VsZW1lbnQgPVxyXG4gICAgZ2FtZVBsYXllcjFFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZS1zaGlwLXBpY2tcIik7XHJcbiAgY29uc3QgZ2FtZVNoaXBPYmplY3RFbGVtZW50ID1cclxuICAgIGdhbWVQbGF5ZXIxRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc2hpcC1vYmplY3RcIik7XHJcbiAgY29uc3QgZ2FtZVNoaXBBbW91bnRFbGVtZW50ID1cclxuICAgIGdhbWVQbGF5ZXIxRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc2hpcC1hbW91bnRcIik7XHJcblxyXG4gIGxldCBkcmFnZ2VkVGFyZ2V0ID0gbnVsbDtcclxuICBsZXQgdGFyZ2V0R2FtZUJveEVsID0gbnVsbDtcclxuXHJcbiAgY29uc3QgcmVuZGVyR2FtZVBsYXllckVsZW1lbnRzID0gZnVuY3Rpb24gKHBsYXllcnMpIHtcclxuICAgIHBsYXllcnMuZm9yRWFjaCgocGxheWVyKSA9PiB7XHJcbiAgICAgIHRhcmdldEdhbWVCb3hFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllci5nZXRHYW1lSWQoKSk7XHJcbiAgICAgIGNvbnN0IGdhbWVQbGF5ZXJFbCA9IHRhcmdldEdhbWVCb3hFbC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtcGxheWVybmFtZVwiKTtcclxuICAgICAgY29uc3QgZ2FtZUJvYXJkRWwgPSB0YXJnZXRHYW1lQm94RWwucXVlcnlTZWxlY3RvcihcIi5nYW1lLWJvYXJkXCIpO1xyXG4gICAgICBjb25zdCBnYW1lU2hpcExpc3RFbCA9IHRhcmdldEdhbWVCb3hFbC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc2hpcC1saXN0XCIpO1xyXG5cclxuICAgICAgcmVuZGVyUGxheWVyTmFtZShnYW1lUGxheWVyRWwsIHBsYXllci5nZXROYW1lKCkpO1xyXG4gICAgICByZW5kZXJHYW1lQm9hcmQoZ2FtZUJvYXJkRWwsIHBsYXllci5nZXRQbGF5ZXJCb2FyZCgpKTtcclxuICAgICAgcmVuZGVyU2hpcExpc3QoZ2FtZVNoaXBMaXN0RWwsIHBsYXllci5nZXRTaGlwcygpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRvZ2dsZUdhbWVCdXR0b25zKCk7XHJcblxyXG4gICAgc2hvd0dhbWVFbGVtZW50cygpO1xyXG4gIH07XHJcblxyXG4gIGZ1bmN0aW9uIHRvZ2dsZUdhbWVCdXR0b25zKCkge1xyXG4gICAgZ2FtZUJ1dHRvbnNQbGF5ZXIxLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzaG93R2FtZUVsZW1lbnRzKCkge1xyXG4gICAgZ2FtZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJTaGlwUGljayhzaGlwLCBjb3VudCkge1xyXG4gICAgc2hvd1NoaXBQaWNrKCk7XHJcblxyXG4gICAgZ2FtZVNoaXBPYmplY3RFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKCFzaGlwKSB7XHJcbiAgICAgIGhpZGVTaGlwUGljaygpO1xyXG4gICAgICBzaG93UGxheUJ1dHRvbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmdldExlbmd0aCgpOyBpKyspIHtcclxuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgICBzcGFuLmNsYXNzTmFtZSA9IFwiZ2FtZS1zaGlwLW9iamVjdC1wYXJ0XCI7XHJcblxyXG4gICAgICBnYW1lU2hpcE9iamVjdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgeyBwb3NpdGlvbiB9ID0gZ2FtZVNoaXBPYmplY3RFbGVtZW50LmRhdGFzZXQ7XHJcblxyXG4gICAgaWYgKHBvc2l0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgICBnYW1lU2hpcE9iamVjdEVsZW1lbnQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtnYW1lU2hpcE9iamVjdEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RofSwgMWZyKWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBnYW1lU2hpcE9iamVjdEVsZW1lbnQuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoMSwgMWZyKWA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2FtZVNoaXBBbW91bnRFbGVtZW50LnRleHRDb250ZW50ID0gYHgke2NvdW50fWA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJQbGF5ZXJOYW1lKGVsLCBwbGF5ZXJOYW1lKSB7XHJcbiAgICBlbC50ZXh0Q29udGVudCA9IGAke3BsYXllck5hbWV9IGJvYXJkYDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckdhbWVCb2FyZChlbCwgYm9hcmQpIHtcclxuICAgIGVsLmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgY29uc3Qgc2l6ZSA9IGJvYXJkLmxlbmd0aCAqIGJvYXJkLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICBsZXQgcG9zID0gaSA8IDEwID8gYDAke2l9YCA6IGAke2l9YDtcclxuICAgICAgY29uc3QgW3Bvc0EsIHBvc0JdID0gc3BsaXRTdHIocG9zKTtcclxuXHJcbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgc3Bhbi5jbGFzc05hbWUgPSBcImdhbWUtY2VsbFwiO1xyXG5cclxuICAgICAgc3Bhbi5kYXRhc2V0LnBvcyA9IHBvcztcclxuICAgICAgaWYgKGJvYXJkWytwb3NBXVsrcG9zQl0uc2hpcENlbGwpIHtcclxuICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJnYW1lLXNoaXAtY2VsbFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZWwuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBpc1NoaXBQaWNrSGlkZGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIGdhbWVTaGlwUGlja0VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhpZGVTaGlwUGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChpc1NoaXBQaWNrSGlkZGVuKCkpIHJldHVybjtcclxuICAgIGdhbWVTaGlwUGlja0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBzaG93U2hpcFBpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWlzU2hpcFBpY2tIaWRkZW4oKSkgcmV0dXJuO1xyXG4gICAgZ2FtZVNoaXBQaWNrRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gIH07XHJcblxyXG4gIC8vIERvIHBvcHJhd3kgZnVua2NqYVxyXG4gIGZ1bmN0aW9uIHJlbmRlclN1bmtTaGlwc09uTGlzdChwbGF5ZXIpIHtcclxuICAgIHRhcmdldEdhbWVCb3hFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllci5nZXRHYW1lSWQoKSk7XHJcbiAgICBjb25zdCBzaGlwTGlzdCA9IHRhcmdldEdhbWVCb3hFbC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtc2hpcC1saXN0XCIpO1xyXG4gICAgcmVuZGVyU2hpcExpc3Qoc2hpcExpc3QsIHBsYXllci5nZXRTaGlwcygpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlclNoaXBMaXN0KGVsLCBzaGlwcykge1xyXG4gICAgZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJnYW1lLXNoaXAtaXRlbVwiKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coeyBzaGlwU3Vuazogc2hpcHNbaV0uaXNTdW5rKCkgfSk7XHJcbiAgICAgIGlmIChzaGlwc1tpXS5pc1N1bmsoKSkge1xyXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLmdldExlbmd0aCgpOyBqKyspIHtcclxuICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcbiAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwiZ2FtZS1zaGlwLXBhcnRcIik7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoc3Bhbik7XHJcbiAgICAgIH1cclxuICAgICAgZWwuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVuZGVyVGFyZ2V0R2FtZUJvYXJkQ2VsbCA9IGZ1bmN0aW9uIChwb3MsIHNoaXAsIGdhbWVCb2FyZElkKSB7XHJcbiAgICB0YXJnZXRHYW1lQm94RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnYW1lQm9hcmRJZCk7XHJcblxyXG4gICAgY29uc3QgZ2FtZUJvYXJkQ2VsbCA9IHRhcmdldEdhbWVCb3hFbC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgc3BhbltkYXRhLXBvcz1cIiR7cG9zfVwiXWBcclxuICAgICk7XHJcbiAgICBpZiAoIXNoaXApIGdhbWVCb2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInJlc2VydmVkXCIpO1xyXG5cclxuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHNwYW4uY2xhc3NOYW1lID0gc2hpcCA/IFwiaGl0XCIgOiBcIm1pc3NcIjtcclxuXHJcbiAgICBnYW1lQm9hcmRDZWxsLmFwcGVuZENoaWxkKHNwYW4pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNsZWFyR2FtZUJvYXJkID0gZnVuY3Rpb24gKGdhbWVib2FyZCkge1xyXG4gICAgcmVuZGVyR2FtZUJvYXJkKGdhbWVCb2FyZFBsYXllcjEsIGdhbWVib2FyZCk7XHJcbiAgICBoaWRlUGxheUJ1dHRvbigpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlbmRlclJhbmRvbUdhbWVCb2FyZCA9IGZ1bmN0aW9uIChib2FyZCkge1xyXG4gICAgcmVuZGVyR2FtZUJvYXJkKGdhbWVCb2FyZFBsYXllcjEsIGJvYXJkKTtcclxuICAgIGhpZGVTaGlwUGljaygpO1xyXG4gICAgc2hvd1BsYXlCdXR0b24oKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW5kZXJTaGlwT25HYW1lQm9hcmQgPSBmdW5jdGlvbiAob2JqLCBjdXJyZW50U2hpcCkge1xyXG4gICAgY29uc3QgeyBwb3MsIHBvc2l0aW9uIH0gPSBvYmo7XHJcblxyXG4gICAgY29uc3QgW3gsIHldID0gc3BsaXRTdHIocG9zKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRTaGlwLmdldExlbmd0aCgpOyBpKyspIHtcclxuICAgICAgY29uc3QgY3VycmVudFBvcyA9XHJcbiAgICAgICAgcG9zaXRpb24gPT09IFwidmVydGljYWxcIiA/IGAke2kgKiAxICsgK3h9JHt5fWAgOiBgJHt4fSR7K3kgKyBpICogMX1gO1xyXG5cclxuICAgICAgY29uc3QgcGFydEVsID0gZ2FtZUJvYXJkUGxheWVyMS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgIGBzcGFuW2RhdGEtcG9zPVwiJHtjdXJyZW50UG9zfVwiXWBcclxuICAgICAgKTtcclxuICAgICAgcGFydEVsLmNsYXNzTGlzdC5hZGQoXCJnYW1lLXNoaXAtY2VsbFwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCByZW5kZXJSZXNlcnZlZFBvc3Rpb25zID0gZnVuY3Rpb24gKHBsYXllciwgcmVzZXJ2ZWRQb3NpdGlvbnMpIHtcclxuICAgIHRhcmdldEdhbWVCb3hFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllci5nZXRHYW1lSWQoKSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNlcnZlZFBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB7IHBvc0EsIHBvc0IgfSA9IHJlc2VydmVkUG9zaXRpb25zW2ldO1xyXG4gICAgICBjb25zdCBib2FyZENlbGwgPSB0YXJnZXRHYW1lQm94RWwucXVlcnlTZWxlY3RvcihcclxuICAgICAgICBgc3BhbltkYXRhLXBvcz1cIiR7cG9zQX0ke3Bvc0J9XCJdYFxyXG4gICAgICApO1xyXG4gICAgICBpZiAoYm9hcmRDZWxsLmNoaWxkRWxlbWVudENvdW50IDw9IDApIHtcclxuICAgICAgICBib2FyZENlbGwuY2xhc3NMaXN0LmFkZChcInJlc2VydmVkXCIpO1xyXG4gICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgICAgICBzcGFuLmNsYXNzTmFtZSA9IFwibWlzc1wiO1xyXG4gICAgICAgIGJvYXJkQ2VsbC5hcHBlbmRDaGlsZChzcGFuKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGNoYW5nZVBvc2l0aW9uU2hpcFBpY2sgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAgIGNvbnN0IHsgcG9zaXRpb24gfSA9IGVsLmRhdGFzZXQ7XHJcblxyXG4gICAgbGV0IG5ld1Bvc2l0aW9uID0gcG9zaXRpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XHJcblxyXG4gICAgZWwuZGF0YXNldC5wb3NpdGlvbiA9IG5ld1Bvc2l0aW9uO1xyXG5cclxuICAgIGlmIChuZXdQb3NpdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgICAgZWwuc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGByZXBlYXQoJHtlbC5jaGlsZHJlbi5sZW5ndGh9LCAxZnIpYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgcmVwZWF0KDEsIDFmcilgO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhpZGVSZXNlcnZlZENlbGxzID0gZnVuY3Rpb24gKGJvYXJkKSB7XHJcbiAgICBnYW1lQm9hcmRQbGF5ZXIxLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZS1jZWxsXCIpLmZvckVhY2goKGNlbGxFbCkgPT4ge1xyXG4gICAgICBjb25zdCBwb3MgPSBjZWxsRWwuZGF0YXNldC5wb3M7XHJcbiAgICAgIGNvbnN0IFt4LCB5XSA9IHNwbGl0U3RyKHBvcyk7XHJcbiAgICAgIGNvbnN0IHsgcmVzIH0gPSBib2FyZFsreF1bK3ldO1xyXG4gICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgY2VsbEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJyZXNlcnZlZFwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2hvd1Jlc2VydmVkQ2VsbHMgPSBmdW5jdGlvbiAoYm9hcmQpIHtcclxuICAgIGdhbWVCb2FyZFBsYXllcjEucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lLWNlbGxcIikuZm9yRWFjaCgoY2VsbEVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBvcyA9IGNlbGxFbC5kYXRhc2V0LnBvcztcclxuICAgICAgY29uc3QgW3gsIHldID0gc3BsaXRTdHIocG9zKTtcclxuICAgICAgY29uc3QgeyByZXMgfSA9IGJvYXJkWyt4XVsreV07XHJcbiAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICBjZWxsRWwuY2xhc3NMaXN0LmFkZChcInJlc2VydmVkXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBoaWRlUGxheUJ1dHRvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChnYW1lUGxheUJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHJldHVybjtcclxuICAgIGdhbWVQbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2hvd1BsYXlCdXR0b24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIWdhbWVQbGF5QnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkgcmV0dXJuO1xyXG4gICAgZ2FtZVBsYXlCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICB9O1xyXG5cclxuICBjb25zdCB0b2dnbGVHYW1lVHJhY2tFbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdhbWVUcmFja0VsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZW5kZXJDdXJyZW50UGxheWVyID0gZnVuY3Rpb24gKGN1cnJlbnRQbGF5ZXIpIHtcclxuICAgIGdhbWVUcmFja0VsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuZ2FtZS10dXJuXCJcclxuICAgICkudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50UGxheWVyLmdldE5hbWUoKX0ncyB0dXJuYDtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRCb2FyZFBvc2l0aW9uUGxheWVyMiA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgLy8gY2hlY2sgaWYgY2xpY2tlZCB0YXJnZXQgaXMgZWxlbWVudCB3aXRoIFwiZ2FtZS1jZWxsXCIgY2xhc3NcclxuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcclxuICAgIGlmICghdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWUtY2VsbFwiKSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIGdldCBhdHRyaWJ1dGUgZGF0YS1wb3MgZnJvbSBlbGVtZW50XHJcbiAgICBjb25zdCB7IHBvcyB9ID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQ7XHJcbiAgICAvLyByZXR1cm4gcG9zIGF0dHJpYnV0ZTtcclxuICAgIHJldHVybiBwb3M7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25DbGlja1NoaXBQaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2FtZVNoaXBPYmplY3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgY2hhbmdlUG9zaXRpb25TaGlwUGljayhldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uQ2xpY2tSZXNldEJ0biA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgZ2FtZVJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjayk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25DbGlja1JhbmRvbUJ0biA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgZ2FtZVJhbmRvbUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2spO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uRHJhZ1NoaXBQaWNrID0gZnVuY3Rpb24gKGJvYXJkKSB7XHJcbiAgICAvLyBzdGFydCBkcmFnZ2FibGVcclxuICAgIGdhbWVTaGlwT2JqZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIChldmVudCkgPT4ge1xyXG4gICAgICBkcmFnZ2VkVGFyZ2V0ID0gZXZlbnQudGFyZ2V0OyAvLyB0YXJnZXQgZWxlbWVudCwgd2hpY2ggaXMgZHJhZ2dlYmxlXHJcbiAgICAgIHNob3dSZXNlcnZlZENlbGxzKGJvYXJkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWVTaGlwT2JqZWN0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoKSA9PiB7XHJcbiAgICAgIC8vIGZpcmVzIHdoZW4gdXNlciBlbmQgdG8gZHJhZyBlbGVtZW50XHJcbiAgICAgIGhpZGVSZXNlcnZlZENlbGxzKGJvYXJkKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uRHJvcFNoaXBQaWNrID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAvLyBjb25zdCBvbkRyb3BTaGlwUGljayA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZ2V0Qm9hcmQpIHtcclxuICAgIGdhbWVCb2FyZFBsYXllcjEuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAvLyBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgLy8gcHJldmVudCBkZWZhdWx0IHRvIGFsbG93IGRyb3BcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGdhbWVCb2FyZFBsYXllcjEuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAvLyBtb3ZlIGRyYWdnZWQgZWxlbWVudCB0byB0aGUgc2VsZWN0ZWQgZHJvcCB0YXJnZXQge1xyXG4gICAgICAvLyBjb25zdCBwYXJlbnQgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIiNnYW1lLXBsYXllcjFcIik7XHJcblxyXG4gICAgICAvLyBpZiAoXHJcbiAgICAgIC8vICAgLy8gIXBhcmVudCB8fFxyXG4gICAgICAvLyAgICFkcmFnZ2VkVGFyZ2V0IHx8XHJcbiAgICAgIC8vICAgIWV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJnYW1lLWNlbGxcIilcclxuICAgICAgLy8gKVxyXG4gICAgICAvL1xyXG5cclxuICAgICAgaWYgKCFkcmFnZ2VkVGFyZ2V0IHx8ICFldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2FtZS1jZWxsXCIpKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG9iaiA9IHtcclxuICAgICAgICBwb3M6IGV2ZW50LnRhcmdldC5kYXRhc2V0LnBvcyxcclxuICAgICAgICBwb3NpdGlvbjogZHJhZ2dlZFRhcmdldC5kYXRhc2V0LnBvc2l0aW9uLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgZHJhZ2dlZFRhcmdldCA9IG51bGw7XHJcbiAgICAgIGNhbGxiYWNrKG9iaik7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvbkNsaWNrUGxheUJ0biA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgZ2FtZVBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgdG9nZ2xlR2FtZUJ1dHRvbnMoKTtcclxuICAgICAgdG9nZ2xlR2FtZVRyYWNrRWwoKTtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uQ2xpY2tHYW1lQm9hcmRQbGF5ZXIyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAvLyBnYW1lQm9hcmRQbGF5ZXIyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIC8vIC8vIGNoZWNrIGlmIGNsaWNrZWQgdGFyZ2V0IGlzIGVsZW1lbnQgd2l0aCBcImdhbWUtY2VsbFwiIGNsYXNzXHJcbiAgICAvLyBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAvLyBpZiAoIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJnYW1lLWNlbGxcIikpIHJldHVybjtcclxuXHJcbiAgICAvLyAvLyBnZXQgYXR0cmlidXRlIGRhdGEtcG9zIGZyb20gZWxlbWVudFxyXG4gICAgLy8gY29uc3QgeyBwb3MgfSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0O1xyXG5cclxuICAgIC8vIC8vIHBhc3MgYXR0cmlidXRlIHRvIGNhbGxiYWNrXHJcbiAgICAvLyBjYWxsYmFjayhwb3MpO1xyXG4gICAgLy8gY2FsbGJhY2soZXZlbnQpO1xyXG4gICAgLy8gfSk7XHJcbiAgICBnYW1lQm9hcmRQbGF5ZXIyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjayk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVtb3ZlQ2xpY2tHYW1lQm9hcmRQbGF5ZXIyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICBnYW1lQm9hcmRQbGF5ZXIyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjayk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdldEJvYXJkUG9zaXRpb25QbGF5ZXIyLFxyXG4gICAgaGlkZVBsYXlCdXR0b24sXHJcbiAgICB0b2dnbGVHYW1lVHJhY2tFbCxcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgcmVuZGVyQ3VycmVudFBsYXllcixcclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIHJlbmRlclJlc2VydmVkUG9zdGlvbnMsXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICByZW5kZXJTdW5rU2hpcHNPbkxpc3QsXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICByZW5kZXJUYXJnZXRHYW1lQm9hcmRDZWxsLFxyXG4gICAgcmVuZGVyR2FtZVBsYXllckVsZW1lbnRzLFxyXG4gICAgcmVuZGVyU2hpcE9uR2FtZUJvYXJkLFxyXG4gICAgcmVuZGVyUmFuZG9tR2FtZUJvYXJkLFxyXG4gICAgcmVuZGVyU2hpcFBpY2ssXHJcbiAgICBjbGVhckdhbWVCb2FyZCxcclxuICAgIG9uRHJhZ1NoaXBQaWNrLFxyXG4gICAgb25Ecm9wU2hpcFBpY2ssXHJcbiAgICBvbkNsaWNrU2hpcFBpY2ssXHJcbiAgICBvbkNsaWNrUmVzZXRCdG4sXHJcbiAgICBvbkNsaWNrUmFuZG9tQnRuLFxyXG4gICAgb25DbGlja1BsYXlCdG4sXHJcbiAgICBvbkNsaWNrR2FtZUJvYXJkUGxheWVyMixcclxuICAgIHJlbW92ZUNsaWNrR2FtZUJvYXJkUGxheWVyMixcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lVUk7XHJcbiIsImNvbnN0IFVJID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IHBsYXllck1lbnVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudVwiKTtcclxuICAvLyBjb25zdCBwbGF5ZXIxSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFfbmFtZVwiKTtcclxuICAvLyBjb25zdCBwbGF5ZXIySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJfbmFtZVwiKTtcclxuICAvLyBjb25zdCBjb21wdXRlckNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb21wdXRlcl9uYW1lXCIpO1xyXG4gIGNvbnN0IGNyZWF0ZVBsYXllckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLXBsYXllci1idG5cIik7XHJcblxyXG4gIGNvbnN0IGdldElucHV0VmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGkpIHtcclxuICAgIHJldHVybiB2YWx1ZSB8fCBgUGxheWVyICR7aSArIDF9YDtcclxuICB9O1xyXG5cclxuICBjb25zdCBnZXRQbGF5ZXJOYW1lcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHBsYXllcnMgPSBbXTtcclxuXHJcbiAgICAvLyBsZXQgcGxheWVyMU5hbWUgPSBwbGF5ZXIxSW5wdXQudmFsdWUgfHwgXCJQbGF5ZXIgMVwiO1xyXG4gICAgLy8gbGV0IHBsYXllcjJOYW1lID0gcGxheWVyMklucHV0LnZhbHVlIHx8IFwiUGxheWVyIDJcIjtcclxuICAgIC8vIGNvbnNvbGUuZGlyKGNvbXB1dGVyQ2hlY2tib3gpO1xyXG4gICAgLy8gY29uc29sZS5sb2coeyBjaGVja2VkOiBjb21wdXRlckNoZWNrYm94LmNoZWNrZWQgfSk7XHJcblxyXG4gICAgLy8gaWYgKGNvbXB1dGVyQ2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgLy8gICBwbGF5ZXIySW5wdXQudmFsdWUgPSBjb21wdXRlckNoZWNrYm94LnZhbHVlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHBsYXllck1lbnVFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblxyXG4gICAgY29uc3QgaW5wdXRzID0gcGxheWVyTWVudUVsLnF1ZXJ5U2VsZWN0b3JBbGwoYGlucHV0W2RhdGEtZ2FtZWJvYXJkXWApO1xyXG5cclxuICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dCwgaSkgPT4ge1xyXG4gICAgICAvLyBjb25zdCBwbGF5ZXJOYW1lID0gIWlucHV0LmRpc2FibGVkXHJcbiAgICAgIC8vICAgPyBnZXRJbnB1dFZhbHVlKGlucHV0LnZhbHVlLCBpKVxyXG4gICAgICAvLyAgIDogY29tcHV0ZXJDaGVja2JveC52YWx1ZTtcclxuICAgICAgLy8gY29uc3QgcGxheWVySWQgPSBpbnB1dC5kYXRhc2V0LmdhbWVib2FyZDtcclxuXHJcbiAgICAgIGNvbnN0IHBsYXllck5hbWUgPSBnZXRJbnB1dFZhbHVlKGlucHV0LnZhbHVlLCBpKTtcclxuICAgICAgY29uc3QgcGxheWVySWQgPSBpbnB1dC5kYXRhc2V0LmdhbWVib2FyZDtcclxuXHJcbiAgICAgIHBsYXllcnMucHVzaCh7IHBsYXllcklkLCBwbGF5ZXJOYW1lIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllcnM7XHJcbiAgfTtcclxuXHJcbiAgLy8gY29uc3QgZ2V0Q2hlY2tib3hWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyAgIHJldHVybiBjb21wdXRlckNoZWNrYm94LnZhbHVlO1xyXG4gIC8vIH07XHJcblxyXG4gIGNvbnN0IG9uQ2xpY2tDcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbiAoY2IpIHtcclxuICAgIGNyZWF0ZVBsYXllckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2IpO1xyXG4gIH07XHJcblxyXG4gIC8vIGNvbnN0IG9uQ2xpY2tDaGVja0JveCA9IGZ1bmN0aW9uICgpIHtcclxuICAvLyAgIGNvbXB1dGVyQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgLy8gICAgIGlmIChjb21wdXRlckNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAvLyAgICAgICBwbGF5ZXIySW5wdXQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gIC8vICAgICB9IGVsc2Uge1xyXG4gIC8vICAgICAgIHBsYXllcjJJbnB1dC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KTtcclxuICAvLyB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb25DbGlja0NyZWF0ZVBsYXllcixcclxuICAgIC8vIG9uQ2xpY2tDaGVja0JveCxcclxuICAgIGdldFBsYXllck5hbWVzLFxyXG4gICAgLy8gZ2V0Q2hlY2tib3hWYWx1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVUk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Fzcy9tYWluLnNjc3NcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vbW9kdWxlcy9jb21wb25lbnRzL2dhbWVcIjtcclxuXHJcbmNvbnN0IGdhbWUgPSBHYW1lKCk7XHJcbmdhbWUuaW5pdCgpO1xyXG5jb25zb2xlLmxvZyhcIkJhdHRsZXNoaXBcIik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==