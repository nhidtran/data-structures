const { 
    findMinimum,
    removeEven,
    mergeTwoSortedArrays,
    productExceptSelf,
    findPairSumValue,
    findFirstUnique,
    findSecondMax
} = require('./index');

test('removeEven', () => {
    expect(removeEven([])).toEqual([]);
    expect(removeEven([1])).toEqual([1]);
    expect(removeEven([2,1,4,3,8])).toEqual([1,3]);
})

test('mergeTwoSortedArrays', () => {
    expect(mergeTwoSortedArrays([],[])).toEqual([]);
    expect(mergeTwoSortedArrays([1],[1])).toEqual([1]);
    expect(mergeTwoSortedArrays([1,3,5,7],[2,4,6])).toEqual([1,2,3,4,5,6,7]);
})

test('findPairSumValue', () => {
    expect(() => {
        findPairSumValue([], 10).toThrow("Error - no pairs found")
    })
    expect(findPairSumValue([1,21,3,14,5,60,7,6], 81)).toEqual([21, 60]);
})

test('productExceptSelf', () => {
    // each index returns the product of all of the elements except itself
    expect(productExceptSelf([])).toEqual([])
    expect(productExceptSelf([1,2,3,4])).toEqual([24,12,8,6])
})

test('findMinimum', () => {
    expect(() => {
        findMinimum([]).toThrow('Error - no elements')
    })
    expect(findMinimum([9,2,3,6])).toEqual(2)
})
// TODO
// test('findFirstUnique', () => {
//     expect(findFirstUnique([])).toEqual(null);
//     expect(findFirstUnique([9,2,3,2,6,6])).toEqual(9);
// })

test('find second maximum value in an array', () => {
    expect(findSecondMax([9,2,3,6])).toEqual(6);
})

test('rotate array by n', () => {
    
})