import UI from "./ui/ui";
import Player from "./player";
import GameUI from "./ui/gameUI";

const Queue = function () {
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

  return {
    enqueue,
    dequeue,
    peek,
    length,
    isEmpty,
    countTypeShip,
    clearQueue,
  };
};

const Game = function () {
  const ui = UI();
  let gameUI = null;
  const players = [];
  let currentPlayer = null;
  const queue = Queue();

  const createPLayers = function () {
    // Create players
    const playersUI = ui.getPlayerNames();

    for (let pl in playersUI) {
      const name = playersUI[pl];
      players.push(Player(name));
    }

    currentPlayer = players[0];
    for (let ship of players[0].getShips()) {
      queue.enqueue(ship);
    }

    gameUI = GameUI();

    createGameBoard();
  };

  const setShipOnBoard = function (gameBoardObj) {
    const shipOnBoard = players[0].getShipOnGameBoard(
      gameBoardObj,
      queue.peek()
    );
    if (!shipOnBoard) return;

    gameUI.renderShipOnGameBoard(gameBoardObj, queue.peek());

    queue.dequeue();

    gameUI.renderShipPick(queue.peek(), queue.countTypeShip());
  };

  const setRandomShipsOnBoard = function () {
    queue.clearQueue();
    const randomGameBoard = players[0].getRandomShipsPosition();
    gameUI.renderRandomGameBoard(randomGameBoard);
  };

  const clearGameBoard = function () {
    queue.clearQueue();
    players[0].clearGameBoard();
    for (let ship of players[0].getShips()) {
      queue.enqueue(ship);
    }

    gameUI.clearGameBoard(players[0]);
    gameUI.renderShipPick(queue.peek(), queue.countTypeShip());
  };

  const createGameBoard = function () {
    const ship = queue.peek();
    const countShipTypes = queue.countTypeShip();

    gameUI.renderGamePlayerElements(players);
    gameUI.renderShipPick(ship, countShipTypes);

    gameUI.onClickShipPick();
    gameUI.onDropShipPick(setShipOnBoard, players[0].getGameBoard);
    gameUI.onClickResetBtn(clearGameBoard);
    gameUI.onClickRandomBtn(setRandomShipsOnBoard);
  };

  const init = function () {
    ui.onClickCreatePlayer(createPLayers);
    ui.onClickCheckBox();
  };

  return { init };
};

export default Game;
