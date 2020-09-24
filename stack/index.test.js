const { Stack } = require('./index');

// push(element)
// pop()
// isEmpty()
// getTop()
// size()

describe('Stack', () => {
    test('constructor returns an object that holds an array of items and pointer to the "top"', () => {
        expect(new Stack()).toEqual({
            items: [],
            top: null
        })
    })
    test('push adds items to the top of the stack', () => {
        const s = new Stack();
        s.push(1);
        s.push(2);
        expect(s).toEqual({
            items: [1, 2],
            top: 2
        })
    })
    test('getTop returns the last added item', () => {
        const s = new Stack([1,2,3])
        expect(s.getTop()).toEqual(3)
    })
    test('pop removes the last added item', () => {
        const s = new Stack([1,2,3]);
        expect(s.pop()).toEqual({
            items: [1,2],
            top: 2
        })
    })
})