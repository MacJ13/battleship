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

export default Ship;
