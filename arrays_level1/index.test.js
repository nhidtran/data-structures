const {
  binarySearch,
  checkKeyInSegment,
  checkKeyInSegmentHelper,
  countTheTriplets,
  findCount,
  findMax,
  findMin,
  findKthLargest,
  findUnion,
  kandanealgo,
  merge,
  quickSort,
  reverseArray,
  sortInAsc,
  sortNegPositve,
  subArray,
  intersection,
} = require("./index");

describe("easy array problems", () => {
  describe("find occurrences in an array", () => {
    expect(findCount([0, 5, 5, 5, 4], 5)).toEqual(3);
  });
  describe("kandanes algo.  Given an array of N integers find the contiguous subarray with maximum sum", () => {
    test("case1", () => {
      const N = 5;
      const arr = [1, 2, 3, -2, 5];
      expect(kandanealgo(arr, N)).toBe(9); // Max subarray sum is 9 (1,2,3,-2,5)
    });
    test("case2", () => {
      const N = 4;
      const arr = [-1, -2, -3, -4];
      expect(kandanealgo(arr, N)).toBe(-1); // Max subarray sum is 9 (1,2,3,-2,5)
    });
    test("case3", () => {
      const N = 6;
      const arr = [-1, 2, 3, 8, 9, 4];
      expect(kandanealgo(arr, N)).toEqual(26);
    });
  });

  describe("check if a key is present in every segment of size k in an array", () => {
    test("case1:", () => {
      const arr = [3, 5, 2, 4, 9, 3, 1, 7, 3, 11, 12, 3];
      const x = 3;
      const k = 3;

      expect(checkKeyInSegment(arr, x, k)).toBe(true);
    });
    test("case2:", () => {
      const arr = [21, 23, 56, 65, 34, 54, 76, 32, 23, 45, 21, 23, 25];
      const x = 23;
      const k = 5;
      expect(checkKeyInSegment(arr, x, k)).toBe(true);
    });
    test("case3:", () => {
      const arr = [5, 8, 7, 12, 14, 3, 9];
      const x = 8;
      const k = 2;
      expect(checkKeyInSegment(arr, x, k)).toBe(false);
    });
  });

  describe("mergeSort", () => {
    test("sort the array in ascending order", () => {
      expect(sortInAsc([0, 23, 14, 12, 9])).toEqual([0, 9, 12, 14, 23]);
      expect(sortInAsc([7, 0, 2])).toEqual([0, 2, 7]);
    });

    test("merge returns a sorted array between two sorted arrays", () => {
      expect(merge([3, 4, 5], [1, 2, 3])).toEqual([1, 2, 3, 3, 4, 5]);
    });
  });

  test("reverseArray returns reversed array without having to allocate more space", () => {
    expect(reverseArray([1, 2, 3, 4, 5])).toEqual([5, 4, 3, 2, 1]);
  });
  test("helper returns true if x is found in array", () => {
    expect(checkKeyInSegmentHelper([3, 5, 2], 3)).toBe(true);
  });
  test("findMin of array", () => {
    expect(findMin([12, 1234, 45, 67, 1])).toBe(1);
  });
  test("findMax of array", () => {
    expect(findMax([12, 1234, 45, 67, 1])).toBe(1234);
  });
  test("subarray with a given sum with an unsorted array", () => {
    const N = 5;
    const S = 12;
    const arr = [1, 2, 3, 7, 5];
    expect(subArray(arr, N, S)).toEqual([1, 3]);
  });
  test("given an array of distinct integers. Counts all the triplets such that the sum of two elements equals the third", () => {
    const N = 4;
    const arr = [1, 5, 3, 2];
    expect(countTheTriplets(arr, N)).toBe(2);
  });
});
describe("find Kth largest item in the array", () => {
  test("quickSort returns a sorted array. sorting inplace", () => {
    const arr = [7, 10, 4, 3, 20, 15];
    const k = 3;
    expect(quickSort(arr, 0, arr.length - 1)).toEqual([3, 4, 7, 10, 15, 20]);
  });
  test("case1:", () => {
    const arr = [7, 10, 4, 3, 20, 15];
    const k = 3;
    expect(findKthLargest(arr, 0, arr.length - 1, k)).toEqual(10);
  });
  describe("Binary search", () => {
    // given a sorted array of n elements, write a function to search a given element x in arr = []
    const arr = [2, 5, 8, , 12, 16, 23, 38, 56, 72, 91];
    expect(binarySearch(arr, 23)).toEqual(true);
  });
  test("sort array with duplicates", () => {
    expect(quickSort([0, 1, 2, 0, 1, 2], 0, 5)).toEqual([0, 0, 1, 1, 2, 2]);
  });
  describe("move all negative numbers to beginning, and positive to the right", () => {
    test("case1:", () => {
      expect(sortNegPositve([-12, 11, -13, -5, 6, -7, 5, -3, -6])).toEqual([
        -12,
        -6,
        -13,
        -5,
        -3,
        -7,
        5,
        6,
        11,
      ]);
    });
  });
  describe("findintersection in sorted array", () => {
    test("case1:", () => {
      const arr1 = [1, 3, 4, 5, 7];
      const arr2 = [2, 3, 5, 6];
      expect(intersection(arr1, arr2)).toEqual([3, 5]);
    });
  });
  describe("findUnion in sorted array", () => {
    const arr1 = [1, 3, 4, 5, 7];
    const arr2 = [2, 3, 5, 6];
    expect(findUnion(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});
