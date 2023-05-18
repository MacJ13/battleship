function GameUI() {
  const gameElement = document.querySelector(".game");

  const gameRandomButton = document.getElementById("game-random-btn");
  const gameResetButton = document.getElementById("game-reset-btn");
  const gamePlayButton = document.getElementById("game-play-btn");

  const gamePlayer1Element = document.getElementById("game-player1");
  const gamePlayer2Element = document.getElementById("game-player2");

  const gameBoardPlayer1 = gamePlayer1Element.querySelector(".game-board");

  // const gameShipListElement = document.querySelector(".game-ship-list");

  const gameShipPickElement = gamePlayer1Element.querySelector(".ship-pick");
  const gameShipAmountElement =
    gamePlayer1Element.querySelector(".ship-pick-amount");

  let draggedTarget = null;

  // let shipData = null;
  // let currentShip = null;

  // // const getData = function (data) {
  // //   shipData = [...data];
  // // };

  const renderGamePlayerElements = function (players) {
    console.log(players);
    gameElement.style.display = "block";

    [gamePlayer1Element, gamePlayer2Element].forEach((playerEl, i) => {
      const gameBoardEl = playerEl.querySelector(".game-board");
      const gamePlayerEl = playerEl.querySelector(".game-playername");
      const gameShipListEl = playerEl.querySelector(".game-ship-list");

      renderPlayerName(gamePlayerEl, players[i].getName());
      renderGameBoard(gameBoardEl, players[i].getGameBoard());
      renderShipList(gameShipListEl, players[i].getShips());
    });
  };

  function renderShipPick(ship, count) {
    const parentEl = gameShipPickElement.closest(".game-ship-pick-place");
    parentEl.style.display = "block";
    gameShipPickElement.innerHTML = "";

    if (!ship) {
      clearShipPick();
      showPlayButton();
      return;
    }

    for (let i = 0; i < ship.getLength(); i++) {
      const span = document.createElement("span");
      span.className = "ship-pick-part";

      gameShipPickElement.appendChild(span);
    }

    const { position } = gameShipPickElement.dataset;

    if (position === "horizontal") {
      gameShipPickElement.style.gridTemplateColumns = `repeat(${gameShipPickElement.children.length}, 1fr)`;
    } else {
      gameShipPickElement.style.gridTemplateColumns = `repeat(1, 1fr)`;
    }

    gameShipAmountElement.textContent = `x${count}`;
  }

  function renderPlayerName(el, playerName) {
    el.textContent = playerName;
  }

  function renderGameBoard(el, board) {
    el.innerHTML = "";

    const size = board.length * board.length;

    for (let i = 0; i < size; i++) {
      let pos = i < 10 ? `0${i}` : `${i}`;
      const [posA, posB] = pos.split("");

      const span = document.createElement("span");
      span.className = "game-cell";

      span.dataset.pos = pos;
      if (board[+posA][+posB].shipCell) {
        span.classList.add("game-ship-cell");
      }

      el.appendChild(span);
    }
  }

  function renderShipList(el, ships) {
    for (let i = 0; i < ships.length; i++) {
      const li = document.createElement("li");
      li.classList.add("game-ship-item");

      for (let j = 0; j < ships[i].getLength(); j++) {
        const span = document.createElement("span");
        span.classList.add("game-ship-part");
        li.appendChild(span);
      }
      el.appendChild(li);
    }
  }

  const clearGameBoard = function (player) {
    renderGameBoard(gameBoardPlayer1, player.getGameBoard());
    hidePlayButton();
  };

  const clearShipPick = function () {
    const parentEl = gameShipPickElement.closest(".game-ship-pick-place");
    parentEl.style.display = "none";
  };

  const renderRandomGameBoard = function (board) {
    renderGameBoard(gameBoardPlayer1, board);
    clearShipPick();
    showPlayButton();
  };

  // function renderShipPick() {
  //   const parentEl = gameShipPickElement.closest(".game-ship-pick-place");
  //   parentEl.style.display = "block";
  //   gameShipPickElement.innerHTML = "";

  //   if (shipData.length <= 0) {
  //     clearShipPick();
  //     return;
  //   }

  //   // const [first] = shipData.pop;
  //   // console.log({ first });
  //   console.log();
  //   currentShip = shipData.shift();

  //   const amountTypeShip =
  //     shipData.filter((ship) => ship.getLength() === currentShip.getLength())
  //       .length + 1;

  //   for (let i = 0; i < currentShip.getLength(); i++) {
  //     const span = document.createElement("span");
  //     span.className = "ship-pick-part";

  //     gameShipPickElement.appendChild(span);
  //   }

  //   const { position } = gameShipPickElement.dataset;

  //   if (position === "horizontal") {
  //     gameShipPickElement.style.gridTemplateColumns = `repeat(${currentShip.getLength()}, 1fr)`;
  //   } else {
  //     gameShipPickElement.style.gridTemplateColumns = `repeat(1, 1fr)`;
  //   }

  //   gameShipAmountElement.textContent = `x${amountTypeShip}`;

  //   // const [first] = shipData;

  //   // currentShip = first;
  //   // shipData = shipData.slice(1);

  //   console.log(currentShip, { length: shipData.length });
  // }

  const renderShipOnGameBoard = function (obj, currentShip) {
    const { pos, position } = obj;

    const [x, y] = pos.split("");

    for (let i = 0; i < currentShip.getLength(); i++) {
      const currentPos =
        position === "vertical" ? `${i * 1 + +x}${y}` : `${x}${+y + i * 1}`;

      const partEl = gameBoardPlayer1.querySelector(
        `span[data-pos="${currentPos}"]`
      );
      partEl.classList.add("game-ship-cell");
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
      const [x, y] = pos.split("");
      const { res } = board[+x][+y];
      if (res) {
        cellEl.classList.remove("reserved");
      }
    });
  };

  const showReservedCells = function (board) {
    gameBoardPlayer1.querySelectorAll(".game-cell").forEach((cellEl) => {
      const pos = cellEl.dataset.pos;
      const [x, y] = pos.split("");
      const { res } = board[+x][+y];
      if (res) {
        cellEl.classList.add("reserved");
      }
    });
  };

  // const toggleReservedCells = function (board) {
  //   gameBoardPlayer1.querySelectorAll(".game-cell").forEach((cellEl) => {
  //     const pos = cellEl.dataset.pos;
  //     const [x, y] = pos.split("");
  //     const { res } = board[+x][+y];
  //     if (res) {
  //       cellEl.classList.toggle("reserved");
  //     }
  //   });
  // };

  const hidePlayButton = function () {
    if (gamePlayButton.classList.contains("hidden")) return;
    gamePlayButton.classList.add("hidden");
  };

  const showPlayButton = function () {
    if (!gamePlayButton.classList.contains("hidden")) return;
    gamePlayButton.classList.remove("hidden");
  };

  const onClickShipPick = function () {
    gameShipPickElement.addEventListener("click", (event) => {
      changePositionShipPick(event.currentTarget);
    });
  };

  const onClickResetBtn = function (callback) {
    gameResetButton.addEventListener("click", callback);
  };

  const onClickRandomBtn = function (callback) {
    gameRandomButton.addEventListener("click", callback);
  };

  // const onDragStartShipPick = function (playerBoard) {
  //   gameShipPickElement.addEventListener("dragstart", (event) => {
  //     // start draggable
  //     draggedTarget = event.target;
  //     showReservedCells(playerBoard);
  //   });
  // };

  const onDropShipPick = function (callback, getPlayerBoard) {
    // let dragged = null;
    // start draggable
    gameShipPickElement.addEventListener("dragstart", (event) => {
      draggedTarget = event.target;

      showReservedCells(getPlayerBoard());
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
      hideReservedCells(getPlayerBoard());
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
      //   if (
      //     !parent ||
      //     !draggedTarget ||
      //     !event.target.classList.contains("game-cell")
      //   )
      //     return;
      //   console.log({ target: event.target });
      //   console.log("PASS IT !!!!!!!!!!!!!!!!");
      //   const obj = {
      //     pos: event.target.dataset.pos,
      //     currentShip,
      //     position: draggedTarget.dataset.position,
      //   };

      //   cb1(obj);
      //   draggedTarget = null;
      //   // if (shipData.length === 0 && currentShip) {
      //   //   currentShip = null;
      //   // }

      //   if (shipData.length === 0) {
      //     gamePlayButton.classList.remove("hidden");
      //   }

      //   hideReservedCells(getPlayerBoard());
    });
  };

  return {
    renderGamePlayerElements,
    renderShipOnGameBoard,
    renderRandomGameBoard,
    renderShipPick,
    clearGameBoard,
    clearShipPick,
    onDropShipPick,
    onClickShipPick,
    onClickResetBtn,
    onClickRandomBtn,
  };
}

export default GameUI;
