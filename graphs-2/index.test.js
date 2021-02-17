const { minPathMatrix, shortestDistMaze } = require("./index");

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
  console.log("%cshortest dist", "color:pink", shortestDistMaze(arr));
  expect(shortestDistMaze(arr)).toEqual(output);
});

// 1   0   1   2  -1
// 2  -1  -1   1   0
// 3   4   3   2   1
// 3  -1  -1  -1   2
// 2   1   0   1   2
// 3  -1  -1   0   1
