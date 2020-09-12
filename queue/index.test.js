const { Queue } = require('./index');


describe('Queue', () => {
    test('constructs a list', () => {
        expect(new Queue()).toMatchObject({
            list: {
                head: null,
                tail: null
            }
        })
    })
    test('enqueue adds a value to its list', () => {
        const q = new Queue();
        q.enqueue(1);
        q.enqueue(2)
        expect(q.print()).toEqual("1 => 2 => null");
    })
    test('dequeue', () => {
        const q = new Queue();
        q.enqueue(1);
        q.enqueue(2)
        expect(q.dequeue().print()).toEqual("2 => null");
    })
    test('peek returns the value at the top of the list', () => {
        const q = new Queue();
        expect(q.peek()).toEqual(null)
        q.enqueue(1);
        q.enqueue(2);
        expect(q.peek().data).toEqual(1);
        expect(q.peek().next.data).toEqual(2)
        
    })
})