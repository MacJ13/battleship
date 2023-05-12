const UI = function () {
  const playerMenuEl = document.querySelector(".menu");
  const player1Input = document.getElementById("player1_name");
  const player2Input = document.getElementById("player2_name");
  const computerCheckbox = document.getElementById("computer_name");
  const createPlayerBtn = document.getElementById("create-player-btn");

  const getPlayerNames = function () {
    let player1 = player1Input.value || "Player 1";
    let player2 = player2Input.value || "Player 2";
    // console.dir(computerCheckbox);
    // console.log({ checked: computerCheckbox.checked });

    if (computerCheckbox.checked) {
      player2 = "Computer";
    }

    playerMenuEl.style.display = "none";

    return { player1, player2 };
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

  return { onClickCreatePlayer, onClickCheckBox, getPlayerNames };
};

export default UI;
