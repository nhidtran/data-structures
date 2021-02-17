function maxIndex(arr) {
  let max;
  let low = 0;
  let high = arr.length - 1;

  while (low < high) {
    while (arr[high] < arr[low] && high > low) {
      --high;
    }
    if (!max || high - low > max.output) {
      max = {
        output: high - low,
        i: low,
        j: high,
      };
    }
    high = arr.length - 1;
    ++low;
  }
  return max;
}

function maxSumPath(arr1 = [], arr2 = []) {
  let ptr1 = 0;
  let ptr2 = 0;
  let sum1 = 0;
  let sum2 = 0;
  let maxSum = 0;

  while (ptr1 < arr1.length && ptr2 < arr2.length) {
    if (arr1[ptr1] > arr2[ptr2]) {
      sum2 += arr2[ptr2];
      ++ptr2;
    } else if (arr1[ptr1] < arr2[ptr2]) {
      sum1 += arr1[ptr1];
      ++ptr1;
    }
    if (arr1[ptr1] == arr2[ptr2]) {
      sum1 += arr1[ptr1];
      sum2 += arr2[ptr2];
      if (sum1 > sum2) {
        maxSum += sum1;
      } else if (sum1 < sum2) {
        maxSum += sum2;
      }
      ++ptr1;
      ++ptr2;
      sum1 = 0;
      sum2 = 0;
    }
  }

  while (ptr1 < arr1.length) {
    sum1 += arr1[ptr1];
    ++ptr1;
  }

  while (ptr2 < arr2.length) {
    sum2 += arr1[ptr2];
    ++ptr2;
  }

  if (sum1 > sum2) {
    maxSum += sum1;
  } else if (sum2 > sum1) {
    maxSum += sum2;
  } else {
    maxSum += sum1;
  }

  return maxSum;
}

module.exports = {
  maxIndex,
  maxSumPath,
};
