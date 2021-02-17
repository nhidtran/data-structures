// 1 2 3 4 5
// 5 2 3 4 1
// 5 1 3 4 2
// 5 1 2 4 3
// 5 1 2 3 4

function rotateArray(arr, numOfTimes) {
  let count = 0;
  while (count < numOfTimes) {
    rotateArrayHelper(arr, 0, arr.length - 1);
    ++count;
  }
  return arr;
}

function rotateArrayHelper(arr = [], low, high) {
  if (low > Math.floor(high / 2)) return arr;

  let i = low;

  while (i < high) {
    swap(arr, i, high);
    ++i;
  }
}

function swap(arr = [], i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}

function missingInteger(arr = []) {
  const tracked = new Set();
  let smallest;
  let largest;

  arr.forEach((num) => {
    if (!smallest || num < smallest) smallest = num;
    if (!largest || num > largest) largest = num;

    tracked.add(num);
  });

  let missing;
  let curr = smallest;
  while (!missing && curr < largest) {
    if (!tracked.has(curr + 1)) missing = curr + 1;
    ++curr;
  }

  return missing;
}

function countPairsOfSum(arr, target) {
  let tracked = new Set();
  return arr.reduce((acc, curr) => {
    if (!tracked.has(target - curr)) {
      tracked.add(curr);
    } else {
      ++acc;
    }
    return acc;
  }, 0);
}

function countDuplicates(arr = []) {
  const track = new Set();
  const duplicates = new Set();
  const res = arr.reduce((acc, curr) => {
    if (track.has(curr)) {
      duplicates.add(curr);
    } else {
      track.add(curr);
    }
    return acc;
  }, duplicates);
  return [...res];
}

function findCommon(arr1, arr2, arr3) {
  let ptr1 = 0;
  let ptr2 = 0;
  let ptr3 = 0;

  // intersection of arr1 and arr2
  const intersection = new Set();
  while (ptr1 < arr1.length - 1 || ptr2 < arr2.length - 1) {
    if (arr1[ptr1] == arr2[ptr2]) {
      // intersection1.push(arr1[ptr1])
      intersection.add(arr1[ptr1]);
      ++ptr1;
      ++ptr2;
    } else if (arr1[ptr1] < arr2[ptr2]) {
      ++ptr1;
    } else if (arr1[ptr1] > arr2[ptr2]) {
      ++ptr2;
    }
  }

  while (ptr3 < arr3.length - 1) {
    if (!intersection.has(arr3[ptr3])) {
      intersection.delete(arr3[ptr3]);
    }
    ++ptr3;
  }

  // return Array.from(intersection);
  return [...intersection];
}

function subArraySum(arr = []) {
  let slowPtr = 0;
  let fastPtr = 1;
  let currSum = arr[slowPtr] + arr[fastPtr];

  while (slowPtr < arr.length && fastPtr < arr.length && currSum !== 0) {
    if (currSum == arr[slowPtr + arr[fastPtr]]) {
      // encountered 0
      return true;
    }
    if (arr[slowPtr] + arr[fastPtr] < currSum) {
      currSum -= arr[slowPtr];
      ++slowPtr;
    } else if (currSum !== 0) {
      currSum += arr[++fastPtr];
    }
    if (currSum == 0) {
      return true;
    }
  }
  return false;
}

function maxContiguousSum(arr = []) {
  function max(a, b) {
    return a > b ? a : b;
  }
  let currMax = arr[0];
  let maxSoFar = arr[0];
  for (let i = 1; i < arr.length; ++i) {
    currMax = max(arr[i], currMax + arr[i]);
    maxSoFar = max(maxSoFar, currMax);
  }
  return maxSoFar;
}

function maxProductSub(arr = []) {
  function max(a, b) {
    return a > b ? a : b;
  }

  let currMax = arr[0];
  let maxSoFar = arr[0];

  for (let i = 1; i < arr.length; ++i) {
    maxSoFar = max(maxSoFar, currMax);
    currMax = currMax * arr[i];
  }
  return maxSoFar;
}

function longestConsecutiveSub(arr = []) {
  const set = new Set();
  arr.forEach((item) => set.add(item));

  let max;
  set.forEach((item, idx) => {
    let firstItem = item;
    let count = 0;
    if (!set.has(firstItem - 1)) {
      ++count;
      while (set.has(firstItem + 1)) {
        firstItem += 1;
        ++count;
      }
    }
    if (!max || max < count) max = count;
  });
  return max;
}

module.exports = {
  countDuplicates,
  countPairsOfSum,
  findCommon,
  longestConsecutiveSub,
  maxContiguousSum,
  maxProductSub,
  missingInteger,
  rotateArray,
  subArraySum,
};
