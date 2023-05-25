const UI = function () {
  const playerMenuEl = document.querySelector(".menu");
  const player1Input = document.getElementById("player1_name");
  const player2Input = document.getElementById("player2_name");
  const computerCheckbox = document.getElementById("computer_name");
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

    if (computerCheckbox.checked) {
      player2Input.value = computerCheckbox.value;
    }

    playerMenuEl.style.display = "none";

    const inputs = playerMenuEl.querySelectorAll(`input[type="text"]`);

    inputs.forEach((input, i) => {
      const playerName = !input.disabled
        ? getInputValue(input.value, i)
        : computerCheckbox.value;
      const playerId = input.dataset.gameboard;

      players.push({ playerId, playerName });
    });

    return players;
  };

  const getCheckboxValue = function () {
    return computerCheckbox.value;
  };

  const onClickCreatePlayer = function (cb) {
    createPlayerBtn.addEventListener("click", () => {
      cb();
    });
  };

  const onClickCheckBox = function () {
    computerCheckbox.addEventListener("change", () => {
      if (computerCheckbox.checked) {
        player2Input.disabled = true;
      } else {
        player2Input.disabled = false;
      }
    });
  };

  return {
    onClickCreatePlayer,
    onClickCheckBox,
    getPlayerNames,
    getCheckboxValue,
  };
};

export default UI;
