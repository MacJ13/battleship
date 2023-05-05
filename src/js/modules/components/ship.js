const Ship = function (l) {
  const length = l;
  let numOfHits = 0;
  let sunk = isSunk();

  function getLength() {
    return length;
  }

  function getSunk() {
    return sunk;
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

  return { getLength, getSunk, hit, getNumOfHits, isSunk };
};

export default Ship;
