const Ship = function (l) {
  const length = l;
  let numOfHits = 0;
  let sunk = isSunk();
  let positions = [];

  function getLength() {
    return length;
  }

  function getPositions() {
    return positions;
  }

  function getSunk() {
    return sunk;
  }

  function addPositions(pos) {
    positions.push(pos);
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
    return length === numOfHits ? true : false;
  }

  function getReservedPositions() {
    return positions;
  }

  return {
    getReservedPositions,
    getLength,
    getSunk,
    hit,
    getNumOfHits,
    isSunk,
    addPositions,
    getPositions,
  };
};

export default Ship;
