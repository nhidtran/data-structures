const { maxIndex, maxSumPath } = require("./index");

describe("Level3 - https://www.geeksforgeeks.org/top-50-array-coding-problems-for-interviews/", () => {
  test("1. maximum index", () => {
    //Given an array arr[], find the maximum j – i such that arr[j] > arr[i].
    const input = [34, 8, 10, 3, 2, 80, 30, 33, 1];
    const output = {
      output: 6,
      j: 7,
      i: 1,
    };

    expect(maxIndex(input)).toEqual(output);
  });
  test("2: case1. max sum path in two arrays", () => {
    const arr1 = [2, 3, 7, 10, 12];
    const arr2 = [1, 5, 7, 8];
    // 1 5 7 10 12 = 35 
    expect(maxSumPath(arr1, arr2)).toEqual(35);
  });
});
