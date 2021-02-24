const {
  floodFill,
  minPathMatrix,
  shortestDistSourceDest,
  shortestDistMaze,
} = require("./index");

test("find minimum passes required to convert all negative numbers in a matrix", () => {
  const matrix = [
    [-1, -9, null, -1, null],
    [-8, -3, -3, 9, -7],
    [2, null, null, -6, null],
    [null, -7, -3, 5, -4],
  ];
  expect(minPathMatrix(matrix)).toEqual(3);
});
test("Find shortest distance of every cell from landmine in a Maze", () => {
  // given a maze filled with 0, X, M where:
  // 0 represents an open cell,
  // X represents a blocked cell
  // M represents a landmine
  // * find the shortest distance of every open cell in the maze from the nearest mine
  const arr = [
    ["O", "M", "O", "O", "X"],
    ["O", "X", "X", "O", "M"],
    ["O", "O", "O", "O", "O"],
    ["O", "X", "X", "X", "O"],
    ["O", "O", "M", "O", "O"],
    ["O", "X", "X", "M", "O"],
  ];
  const output = [
    [1, 0, 1, 2, -1],
    [2, -1, -1, 1, 0],
    [3, 4, 3, 2, 1],
    [3, -1, -1, -1, 2],
    [2, 1, 0, 1, 2],
    [3, -1, -1, 0, 1],
  ];
  expect(shortestDistMaze(arr)).toEqual(output);
});
test("find the shortest distance from a source cell to a destination cell, only going from left to right and accessible coordinates", () => {
  const arr = [
    ["0", "*", "0", "s"],
    ["*", "0", "*", "*"],
    ["0", "*", "*", "*"],
    ["d", "*", "*", "*"],
  ];
  expect(shortestDistSourceDest(arr)).toEqual(6);
});
// test("count the number of islands", () => {
//   const arr = [
//     [1, 1, 0, 0, 0],
//     [0, 1, 0, 0, 1],
//     [1, 0, 0, 1, 1],
//     [0, 0, 0, 0, 0],
//     [1, 0, 1, 0, 1],
//   ];
//   expect(countIslands(arr)).toEqual(5);
// });
test("flood fill algorithm", () => {
  // start coordinate, target color and replacement color
  const arr = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 1, 1],
    [1, 2, 2, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 0, 1, 0],
    [1, 1, 1, 2, 2, 2, 2, 0],
    [1, 1, 1, 1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 1],
  ];
  expect(floodFill(arr, { x: 4, y: 4 }, 3)).toEqual([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 0, 1, 1, 0, 1, 1],
    [1, 3, 3, 3, 3, 0, 1, 0],
    [1, 1, 1, 3, 3, 0, 1, 0],
    [1, 1, 1, 3, 3, 3, 3, 0],
    [1, 1, 1, 1, 1, 3, 1, 1],
    [1, 1, 1, 1, 1, 3, 3, 1],
  ]);
});

// 4,4
// 3,4,
// 5,4
// 3,4
