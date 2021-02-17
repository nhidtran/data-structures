function countTheTriplets(arr = [], N) {
  const trackingSet = new Set();
  let count = 0;
  arr.forEach((item) => {
    trackingSet.forEach((key) => {
      const sum = item + key;

      if (trackingSet.has(sum)) {
        ++count;
      }
    });
    trackingSet.add(item);
  });
  return count;
}

function kandanealgo(arr = [], N) {
  let slow = 0;
  let fast = 0;
  let currMax = arr[slow];
  let currSum = arr[slow];

  while (fast < N - 1) {
    ++fast;
    currSum = currSum + arr[fast];
    if (currSum > currMax) currMax = currSum;
  }

  while (slow <= N - 1) {
    currSum = currSum - arr[slow++];
    ++slow;
    if (currSum > currMax) currMax = currSum;
  }

  return currMax;
}

function subArray(arr = [], N, S) {
  let slowPtr = 0;
  let fastPtr = 0;
  let currSum = arr[slowPtr];
  while (currSum !== S && slowPtr <= N - 1 && fastPtr <= N - 1) {
    if (currSum < S) {
      ++fastPtr;
      currSum += arr[fastPtr];
    } else if (currSum > S) {
      currSum -= arr[slowPtr];
      ++slowPtr;
    }
    if (currSum == S) {
      return [slowPtr, fastPtr];
    }
  }
}

function checkKeyInSegment(arr = [], x, k) {
  if (!arr.length) {
    return true;
  }
  const subarray = arr.slice(0, k);
  if (checkKeyInSegmentHelper(subarray, x)) {
    arr.splice(0, k);
    return checkKeyInSegment(arr, x, k);
  } else {
    return false;
  }
}

function checkKeyInSegmentHelper(arr = [], x) {
  return arr.includes(x);
}

function findMin(arr = []) {
  let min;
  for (let i = 0; i < arr.length; ++i) {
    if (!min || min > arr[i]) min = arr[i];
  }
  return min;
}

function findMax(arr = []) {
  let max;
  for (let i = 0; i < arr.length; ++i) {
    if (!max || max < arr[i]) max = arr[i];
  }
  return max;
}

function reverseArray(arr = []) {
  return reverseArrayHelper(arr, 0, arr.length - 1);
}

function reverseArrayHelper(arr = [], startIdx, endIdx) {
  if (startIdx == endIdx) return arr;
  swap(arr, startIdx, endIdx);
  return reverseArrayHelper(arr, ++startIdx, --endIdx);
}

function swap(arr = [], i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function sortInAsc(arr = []) {
  return mergeSort(arr);
}
function mergeSort(arr = []) {
  if (arr.length < 2) {
    return arr;
  }

  const left = arr.slice(0, arr.length / 2);
  const right = arr.slice(arr.length / 2);

  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);

  return merge(leftSorted, rightSorted);
}

function merge(arrA = [], arrB = []) {
  let i = 0;
  let j = 0;
  let sorted = [];
  while (i < arrA.length && j < arrB.length) {
    if (arrA[i] < arrB[j]) {
      sorted.push(arrA[i++]);
    } else if (arrA[i] > arrB[j]) {
      sorted.push(arrB[j++]);
    } else if (arrA[i] == arrB[j]) {
      sorted.push(arrA[i++]);
      sorted.push(arrB[j++]);
    }
  }

  if (i < arrA.length) {
    sorted = [...sorted, ...arrA.slice(i, arrA.length)];
  }
  if (j < arrB.length) {
    sorted = [...sorted, ...arrB.slice(j, arrB.length)];
  }
  return sorted;
}

function quickSort(items, left, right) {
  if (left >= right) return;
  var index;
  index = partition(items, left, right); //index returned from partition

  quickSort(items, left, index - 1);
  quickSort(items, index, right);
  return items;
}

function partition(items, left, right) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j); //swap two elements
      i++;
      j--;
    }
  }
  return i;
}

function findKthLargest(arr, start, end, k) {
  if (start >= end) {
    return;
  }
  const index = partition(arr, start, end);

  if (index == k) {
    return arr[k];
  } else if (k < index) return findKthLargest(arr, start, index - 1, k);
  else if (k > index) return findKthLargest(arr, index, end, k);
}

function findCount(arr = [], x) {
  return arr.reduce((acc, curr) => {
    if (curr == x) ++acc;
    return acc;
  }, 0);
}

// [2, 5, 8, , 12, 16, 23, 38, 56, 72, 91]
function binarySearch(arr = [], x) {
  if (!arr.length) return;
  // find the midpoint in array
  const midIdx = Math.floor(arr.length / 2);
  const mid = arr[midIdx];
  if (mid > x) {
    // search left
    return binarySearch(arr.slice(0, midIdx), x);
  } else if (mid < x) {
    // search right
    return binarySearch(arr.slice(midIdx + 1), x);
  } else if (mid == x) {
    return true;
  }
}

function sortNegPositve(arr = []) {
  sortNegPositveHelper(arr, 0, arr.length - 1);
  return arr;
}
function sortNegPositveHelper(arr = [], low, high) {
  if (low >= high) return arr;

  const index = partitionNegPositive(arr, low, high);
  sortNegPositveHelper(arr, index, high - 1);
  sortNegPositveHelper(arr, index + 1, high);
  return arr;
}

function partitionNegPositive(arr, low, high) {
  let i = low;
  let j = high;
  while (i <= j) {
    while (arr[i] < 0) {
      ++i;
    }
    while (arr[j] > 0) {
      --j;
    }
    if (i <= j) {
      swap(arr, i, j);
      ++i, --j;
    }
  }
  return i;
}

function intersection(arrA = [], arrB = []) {
  let ptrA = 0;
  let ptrB = 0;
  const intersection = [];

  while (ptrA <= arrA.length - 1 && ptrB <= arrB.length - 1) {
    if (arrA[ptrA] == arrB[ptrB]) {
      intersection.push(arrA[ptrA]);
      ++ptrA;
      ++ptrB;
    } else if (arrA[ptrA] < arrB[ptrB]) {
      ++ptrA;
    } else if (arrA[ptrA] > arrB[ptrB]) {
      ++ptrB;
    }
  }
  return intersection;
}

function findUnion(arrA = [], arrB = []) {
  let ptrA = 0;
  let ptrB = 0;
  let union = [];
  const track = new Set();

  while (ptrA <= arrA.length - 1 && ptrB <= arrB.length - 1) {
    if (arrA[ptrA] < arrB[ptrB]) {
      !track.has(arrA[ptrA]) ? union.push(arrA[ptrA++]) : ++ptrA;
    } else if (arrA[ptrA] > arrB[ptrB]) {
      !track.has(arrA[ptrA]) ? union.push(arrB[ptrB++]) : ++ptrB;
      ++ptrB;
    } else if (arrA[ptrA] == arrB[ptrB]) {
      if (!track.has(arrA[ptrA])) {
        union.push(arrA[ptrA]);
      }
      ++ptrA;
      ++ptrB;
    }
  }

  if (ptrA <= arrA.length - 1) {
    union = [...union, ...arrA.slice(ptrA)];
  }
  if (ptrB <= arrB.length - 1) {
    union = [...union, ...arrB.slice(ptrB)];
  }
  return union;
}

module.exports = {
  binarySearch,
  checkKeyInSegment,
  checkKeyInSegmentHelper,
  countTheTriplets,
  findMax,
  findMin,
  findUnion,
  kandanealgo,
  findCount,
  findKthLargest,
  reverseArray,
  merge,
  mergeSort,
  quickSort,
  sortInAsc,
  sortNegPositve,
  subArray,
  intersection,
};
