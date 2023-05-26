const EndUI = function () {
  const modalEl = document.querySelector(".modal");
  const modalResultEl = document.querySelector(".modal-result");
  const modalRestartBtn = document.getElementById("game-restart-btn");

  const toggleModal = function () {
    modalEl.classList.toggle("hidden");
  };

  const renderGameResult = function (playerName) {
    const winnerName = playerName[0].toUpperCase() + playerName.slice(1);
    const result = `${winnerName} won`;
    modalResultEl.textContent = result;
  };

  const onClickRestartBtn = function (cb) {
    modalRestartBtn.addEventListener("click", cb);
  };

  return { toggleModal, renderGameResult, onClickRestartBtn };
};

export default EndUI;
