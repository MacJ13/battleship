import { splitStr } from "../helpers";

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
  let targetGameBoardEl = null;

  const renderGamePlayerElements = function (players) {
    players.forEach((player) => {
      const targetGameBoardEl = document.getElementById(player.getGameId());
      const gamePlayerEl = targetGameBoardEl.querySelector(".game-playername");
      const gameBoardEl = targetGameBoardEl.querySelector(".game-board");
      const gameShipListEl = targetGameBoardEl.querySelector(".game-ship-list");

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
      const [posA, posB] = splitStr(pos);

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
  function renderShipListAgain(player) {
    const currentBox = document.getElementById(player.getGameId());
    const shipList = currentBox.querySelector(".game-ship-list");
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
    targetGameBoardEl = document.getElementById(gameBoardId);

    const gameBoardCell = targetGameBoardEl.querySelector(
      `span[data-pos="${pos}"]`
    );

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

    const [x, y] = splitStr(pos);

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
    const currentBox = document.getElementById(player.getGameId());

    for (let i = 0; i < reservedPositions.length; i++) {
      const { posA, posB } = reservedPositions[i];
      const boardCell = currentBox.querySelector(
        `span[data-pos="${posA}${posB}"]`
      );
      if (boardCell.childElementCount <= 0) {
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
      const [x, y] = splitStr(pos);
      const { res } = board[+x][+y];
      if (res) {
        cellEl.classList.remove("reserved");
      }
    });
  };

  const showReservedCells = function (board) {
    gameBoardPlayer1.querySelectorAll(".game-cell").forEach((cellEl) => {
      const pos = cellEl.dataset.pos;
      const [x, y] = splitStr(pos);
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

  const onDropShipPick = function (callback, getBoard) {
    // start draggable
    gameShipObjectElement.addEventListener("dragstart", (event) => {
      draggedTarget = event.target;

      showReservedCells(getBoard());
    });

    // gameBoardPlayer1.addEventListener("dragover", (event) => {
    document.body.addEventListener("dragover", (event) => {
      // prevent default to allow drop
      event.preventDefault();
    });

    // gameBoardPlayer1.addEventListener("drop", (event) => {
    document.body.addEventListener("drop", (event) => {
      event.preventDefault();
      // move dragged element to the selected drop target {
      hideReservedCells(getBoard());
      const parent = event.target.closest("#game-player1");

      if (
        !parent ||
        !draggedTarget ||
        !event.target.classList.contains("game-cell")
      )
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
    renderShipListAgain,
    //////////////////////
    renderTargetGameBoardCell,
    renderGamePlayerElements,
    renderShipOnGameBoard,
    renderRandomGameBoard,
    renderShipPick,
    clearGameBoard,
    onDropShipPick,
    onClickShipPick,
    onClickResetBtn,
    onClickRandomBtn,
    onClickPlayBtn,
    onClickGameBoardPlayer2,
    removeClickGameBoardPlayer2,
  };
}

export default GameUI;
