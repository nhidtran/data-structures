function minPathMatrix(arr = []) {
  function getNeighbors(x, y) {
    const top =
      x > 0 && arr[x - 1][y] ? { x: x - 1, y, value: arr[x - 1][y] } : null;
    const bottom =
      x + 1 < arr.length && arr[x + 1][y]
        ? { x: x + 1, y, value: arr[x + 1][y] }
        : null;
    const left =
      y > 0 && arr[x][y - 1] ? { x, y: y - 1, value: arr[x][y - 1] } : null;
    const right =
      y + 1 < arr[x].length && arr[x][y + 1]
        ? { x, y: y + 1, value: arr[x][y + 1] }
        : null;
    return [top, bottom, left, right].filter(
      (x) => x !== null && x.value == "0"
    );
  }

  let queue1 = [];
  let queue2 = [];

  // initialize queue 1 with all positive values coordinates from array1
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length; ++j) {
      if (arr[i][j] >= 0 && arr[i][j] !== null) {
        queue1.push({ x: i, y: j, value: arr[i][j] });
      }
    }
  }

  let count = 0;
  while (queue1.length) {
    queue2 = [...queue1];
    queue1 = [];
    while (queue2.length) {
      // 1-by-1 process each positive values for the neighbors
      const element = queue2.shift();
      const neighbors = getNeighbors(element.x, element.y);
      // swap negative values to positive in original array.
      neighbors.forEach(({ x, y, value }) => {
        arr[x][y] = Math.abs(value);
        // copy neighbors into queue1 for processing
        // the neighbors we are able to switch from positive to negative, will be pushed to the queue to process
        queue1.push({ x, y, value: Math.abs(value) });
      });
      ++count;
    }
    if (!queue1.length) {
      return count;
    }
  }
}

function shortestDistMaze(arr = []) {
  function getNeighbors(x, y) {
    const top = x > 0 ? { x: x - 1, y, value: arr[x - 1][y] } : null;
    const bottom =
      x + 1 < arr.length ? { x: x + 1, y, value: arr[x + 1][y] } : null;
    const left = y > 0 ? { x, y: y - 1, value: arr[x][y - 1] } : null;
    const right =
      y + 1 < arr[x].length ? { x, y: y + 1, value: arr[x][y + 1] } : null;

    // get unprocessed open cell elements
    return [top, bottom, left, right].filter(
      (x) => x !== null && x.value == "O"
    );
  }
  let xQueue = [];
  let mQueue = [];
  let queue1 = [];
  let queue2 = [];

  // traverse array
  // - swap "0" to 0
  // - swap X to -1
  // - "M" as 0 . push M coordinates into queue1
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length; ++j) {
      if (arr[i][j] == "X") {
        xQueue.push({ x: i, y: j, value: "X" });
      }
      if (arr[i][j] == "M") {
        mQueue.push({ x: i, y: j, value: 0 });
        queue1.push({ x: i, y: j, value: 0 });
      }
    }
  }

  while (queue1.length) {
    queue2 = [...queue1];
    queue1 = [];
    while (queue2.length) {
      // 1-by-1 process each positive values for the neighbors
      const element = queue2.shift();
      const neighbors = getNeighbors(element.x, element.y);
      // swap negative values to positive in original array.
      neighbors.forEach(({ x, y }) => {
        arr[x][y] = element.value + 1;
        // copy neighbors into queue1 for processing
        // the neighbors we are able to switch from positive to negative, will be pushed to the queue to process
        queue1.push({ x, y, value: arr[x][y] });
      });
    }
    if (!queue1.length) {
      // return count;
    }
  }
  mQueue.map(({ x, y }) => {
    arr[x][y] = 0;
  });
  xQueue.map(({ x, y }) => {
    arr[x][y] = -1;
  });
  return arr;
}

function shortestDistSourceDest(arr) {
  function getNeighbors({ x, y }) {
    const top = x > 0 ? { x: x - 1, y } : null;
    const bottom = x < arr.length - 1 ? { x: x + 1, y } : null;
    const left = y > 0 ? { x, y: y - 1 } : null;
    const right = y < arr[x].length ? { x, y: y + 1 } : null;
    return [top, bottom, left, right].filter(
      (elem) =>
        elem !== null &&
        (arr[elem.x][elem.y] == "s" || arr[elem.x][elem.y] == "*") &&
        !visited.has(`[${elem.x},${elem.y}]`)
    );
  }
  const visited = new Set();
  let queue1 = [];
  let queue2 = [];

  // traverse array, push the destination coordinate into the queue
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr[i].length; ++j) {
      if (arr[i][j] == "d") {
        queue1.push({ x: i, y: j });
        visited.add(`[${i},${j}]`);
        break;
      }
    }
  }

  // keep count of steps. Incrememnt count everytime we search cor an elements enighbors
  let count = 0;
  // while queue is not empty, remove a element from the queue
  // find valid neighbors
  while (queue1.length) {
    queue2 = [...queue1];
    queue1 = [];
    while (queue2.length) {
      const elem = queue2.shift();
      if (arr[elem.x][elem.y] == "s") {
        return count;
      }
      if (!visited.has(`[${elem.x},${elem.y}]`)) {
        visited.add(`[${elem.x},${elem.y}]`);
      }

      let neighbors = getNeighbors(elem);
      neighbors.forEach((neighbor) => {
        if (!visited.has(`[${neighbor.x},${neighbor.y}]`)) {
          visited.add(`[${neighbor.x},${neighbor.y}]`);
          queue1.push({ x: neighbor.x, y: neighbor.y });
        }
      });
    }
    ++count;
  }
}

function floodFill(arr, coor, newColor) {
  function getNeighbors(node, initialColor) {
    const { x, y } = node;

    const top = x > 0 ? { x: x - 1, y, color: arr[x - 1][y] } : null;
    const bottom =
      x < arr.length - 1 ? { x: x + 1, y, color: arr[x + 1][y] } : null;
    const left = y > 0 ? { x, y: y - 1, color: arr[x][y - 1] } : null;
    const right =
      y < arr[x].length ? { x, y: y + 1, color: arr[x][y + 1] } : null;
    return [top, bottom, left, right].filter(
      (node) => node != null && node.color == initialColor
    );
  }

  const visited = new Set();
  let queue = [];
  let queue2 = [];
  const initialColor = arr[coor.x][coor.y];

  queue.push(coor);

  while (queue.length) {
    queue2 = [...queue];
    queue = [];
    while (queue2.length) {
      const node = queue2.shift();
      if (!visited.has(`[${node.x},${node.y}]`)) {
        visited.add(`[${node.x},${node.y}]`);
      }
      arr[node.x][node.y] = newColor;

      let neighbors = getNeighbors(node, initialColor);
      neighbors.forEach((neighbor) => {
        if (!visited.has(`[${neighbor.x},${neighbor.y}]`)) {
          visited.add(`[${neighbor.x},${neighbor.y}]`);
          queue.push({ x: neighbor.x, y: neighbor.y });
        }
      });
    }
  }
  return arr;
}

//4,3

module.exports = {
  floodFill,
  minPathMatrix,
  shortestDistMaze,
  shortestDistSourceDest,
};
