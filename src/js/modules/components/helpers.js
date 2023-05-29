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

export { queue, binarySearch, timeout, splitStr, shipMeasurements };
