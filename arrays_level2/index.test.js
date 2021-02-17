const {
  countDuplicates,
  countPairsOfSum,
  findCommon,
  longestConsecutiveSub,
  maxContiguousSum,
  maxProductSub,
  missingInteger,
  rotateArray,
  subArraySum,
} = require("./index");

describe("level2 array problem set https://www.geeksforgeeks.org/top-50-array-coding-problems-for-interviews/", () => {
  test("1. rotate array clockwise by 1", () => {
    const arr = [1, 2, 3, 4, 5];
    const output = [5, 1, 2, 3, 4];
    const numOfTimes = 1;

    expect(rotateArray(arr, numOfTimes)).toEqual(output);
  });
  test("2. find the missing integer", () => {
    const arr = [1, 2, 4, 6, 3, 7, 8];
    expect(missingInteger(arr)).toEqual(5);
  });
  test("3. count pairs with given sum", () => {
    const arr = [1, 5, 7, -1];
    const sum = 6;
    const output = 2;

    expect(countPairsOfSum(arr, sum)).toEqual(output);
  });
  test("4. countDuplicates", () => {
    const arr = [1, 2, 3, 6, 3, 1];
    expect(countDuplicates(arr)).toMatchObject([3, 1]);
  });
  test("5. find common elements in 3 sorted arrays", () => {
    const arr1 = [1, 5, 10, 20, 40, 80];
    const arr2 = [6, 7, 20, 80, 100];
    const arr3 = [3, 4, 15, 20, 30, 70, 80, 120];

    expect(findCommon(arr1, arr2, arr3)).toEqual([20, 80]);
  });
  test("11. find the subarray with sum is 0", () => {
    expect(subArraySum([4, 2, -3, 1, 6])).toEqual(true); // 2 -3 1
    expect(subArraySum([-3, 2, 3, 1, 6])).toEqual(false);
    expect(subArraySum([4, 2, 0, 1, 6])).toEqual(true); // index 2
  });
  test("12. max contiguous subarray", () => {
    // -2, -3, 4, -1, -2, 1, 5, -3
    const arr = [-2, -3, 4, -1, -2, 1, 5, -3];
    expect(maxContiguousSum(arr)).toEqual(7);
  });
  test("14. find max product subarray", () => {
    const arr = [6, -3, -10, 0, 2];
    const output = 180; // [6, -3, -10]
    expect(maxProductSub(arr)).toEqual(output);
  });
  test("15. find the Longest consecutive subsequence", () => {
    const arr = [1, 9, 3, 10, 4, 20, 2];
    expect(longestConsecutiveSub(arr)).toEqual(4); // 1,3,4,2
  });
});
