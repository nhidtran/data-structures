function removeEven(arr = []) {
    if (!arr.length) return [];
    return arr.reduce((acc, curr) => {
        if ((curr % 2) !== 0 ) {
            acc.push(curr)
        }
        return acc;
    }, [])
}

function mergeTwoSortedArrays(arr1 = [], arr2 = []) {
    let counterA = 0;
    let counterB = 0;
    let acc = [];
    while(counterA < arr1.length && counterB < arr2.length) {
        if (arr1[counterA] < arr2[counterB]) {
          acc.push(arr1[counterA++])
        } else if (arr1[counterA] > arr2[counterB]) {
          acc.push(arr2[counterB++]);
        } else {
          acc.push(arr1[counterA]);
          ++counterA;
          ++counterB;
        }
    }

    if (counterA < arr1.length) {
        acc = [...acc, ...arr1.slice(counterA, arr1.length)]
    }
    if (counterB < arr2.length) {
        acc = [...acc, ...arr2.slice(counterB, arr2.length)];
    }
    return acc;
}

// find a pair that adds to a certain value
function findPairSumValue(arr = [], target) {
    const set = new Set();
    arr.forEach(val => set.add(val));
    for(let i = 0; i< arr.length; ++i) {
        if (set.has(target - arr[i])) {
            return [arr[i], target - arr[i]]
        }
    }
    throw new Error("Error - no pairs found");
}

// array of products of all elements
function productExceptSelf(arr = []) {
    if (!arr.length) return [];
    const res = arr.reduce((acc, curr, index) => {
        const leftProduct = arr.slice(0, index).reduce((acc, curr) => {
            acc *= curr;
            return acc;
        }, 1)
        const rightProduct = arr.slice(index + 1, arr.length).reduce((acc, curr) => {
            acc *= curr;
            return acc;
        }, 1);
        acc.push(leftProduct * rightProduct)
        return acc;
    }, [])
    return res;
}

function findMinimum(arr = []) {
    if (!arr.length) {
        throw new Error('Error - no elements');
    }
    let minimum;
    for (let i = 0; i < arr.length; ++i) {
        if (!minimum) {
            minimum = arr[i];
        }
        if (minimum > arr[i]) {
            minimum = arr[i];
        }
    }
    return minimum;
}
// TODO
function findFirstUnique(arr = []) {
    const set = new Set();
    return arr.filter()
}

function findSecondMax(arr = []) {
    let secondMax;
    let max;
    for (val of arr) {
        if (!max) {
            max = val;
        }
        if (val > max) {
            max = val;
        } else {
            secondMax = val;
        }
        if (secondMax < max && secondMax > val) {
            secondMax = val;
        }
    }
    return secondMax;
}

// rotate clockWise by 1 - to the left
function rotateClockWise(arr = [], n = 1) {

}
// rotate anticlockwise - to the right
function rotateAntiClockWise(arr = [], n = 1) {

}






module.exports = {
    findPairSumValue,
    mergeTwoSortedArrays,
    productExceptSelf,
    removeEven,
    findMinimum,
    findFirstUnique,
    findSecondMax
}