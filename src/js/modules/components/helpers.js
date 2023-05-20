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

export { queue };
