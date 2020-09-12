const { Node, LinkedList } = require('./index');
const linkedlist = require('./index');

describe('Node', () => {
    test('constructs a new node with data and next property', () => {
        expect(new Node()).toMatchObject({
            data: undefined,
            next: undefined
        })
        expect(new Node(10)).toMatchObject({
            data: 10,
            next: undefined
        })
    })
})


describe('LinkedList', () => {
    test('constructs a new linked list', () => {
        expect(new LinkedList()).toMatchObject({
            head: null,
        })
    })
    test('insert at head', () => {
        const ll = new LinkedList();
        expect(ll.toArray()).toEqual([]);
        ll.prepend(10);
        expect(ll.toArray()).toEqual([10])
        ll.prepend(9);
        expect(ll.toArray()).toEqual([9, 10]);
    })
    test('append', () => {
        const ll = new LinkedList();
        ll.append(1);
        expect(ll.toArray()).toEqual([1]);
        ll.append(2);
        expect(ll.toArray()).toEqual([1,2]);
    })
    test('insert at index', () => {
        // Input: 3->5->8->10, data = 2, position = 2
        // Output: 3->2->5->8->10
        const ll = new LinkedList();
        ll.append(3);
        ll.append(5);
        ll.append(8);
        ll.append(10);
        expect(() => {
            ll.insertAtPosition(1, 10)
        }).toThrow("Invalid position");
        ll.insertAtPosition(2, 2);
        expect(ll.toArray()).toEqual([3, 2, 5, 8, 10]);
    })
    test('deletes at head', () => {
        const ll = new LinkedList();
        expect(ll.deleteAtHead()).toMatchObject({
            head: null,
            tail: null
        })
        ll.append(1);
        expect(ll.deleteAtHead()).toMatchObject({
            head: null,
            tail: null
        })
        ll.append(1);
        ll.append(2);
        expect(ll.deleteAtHead().toArray()).toEqual([2])
    })
    test('delete at tail', () => {
        const ll = new LinkedList();
        expect(ll.deleteAtTail()).toMatchObject({
            head: null,
            tail: null
        });
        ll.append(1);
        expect(ll.deleteAtTail()).toMatchObject({
            head: null,
            tail: null
        });
        ll.append(1);
        ll.append(2);
        expect(ll.deleteAtTail().toArray()).toEqual([1]);
    })
    test('delete by value', () => {
        const ll = new LinkedList();
        expect(() => ll.deleteByValue(5)).toThrow('Error - cannot delete from empty list')
        ll.append(1);
        expect(() => ll.deleteByValue(5).toThrow('Error - cannot find value in list'))
        expect(ll.deleteByValue(1)).toMatchObject({
            head: null,
            tail: null
        });
        ll.append(1);
        ll.append(2);
        ll.append(3);
        expect(ll.deleteByValue(2).toArray()).toEqual([1,3]);
    })
    test('reverse a linked list', () => {
        const ll = new LinkedList();
        expect(ll.reverseLinkedList().toArray()).toEqual([]);
        ll.append(1);
        ll.append(2);
        ll.append(3);
        ll.append(4);
        ll.append(5);
        expect(ll.reverseLinkedList().toArray()).toEqual([5,4,3,2,1])
    })
    test('detect a loop', () => {
        // Floyd Tortoise aglorithm
        const ll = new LinkedList();
        expect(ll.hasLoop()).toEqual(false)
        ll.append(1);
        ll.append(2);
        ll.tail.next = ll.head;
        expect(ll.hasLoop()).toEqual(true);
        const ll2 = new LinkedList();
        ll2.append(3);
        ll2.append(4);
        ll.append(5);
        ll2.tail.next = ll2.head;
        expect(ll2.hasLoop()).toEqual(true)
    })
    test('find middle of the list', () => {
        const ll = new LinkedList();
        expect(ll.getMiddle()).toEqual(null);
        ll.append(1);
        expect(ll.getMiddle().data).toEqual(1);
        ll.append(2);
        expect(ll.getMiddle().data).toEqual(2);
        ll.append(3);
        expect(ll.getMiddle().data).toEqual(2);
    });
    test('find returns found node', () => {
        const ll = new LinkedList();
        expect(() => {
            ll.find(1).toThrow('Not found node in list');
        })
        ll.append(1);
        expect(ll.find(1)).toMatchObject({
            data: 1,
            next: null
        })
        ll.append(2);
        expect(ll.find(1).data).toEqual(1)
        expect(ll.find(1).next.data).toEqual(2);
    });
    test('delets node provided node', () => {
        const ll = new LinkedList();
        expect(() => {
            ll.deleteNode().toThrow('Error- cannot delete. Empty list');
        })
        ll.append(1);
        const node = ll.find(1);
        expect(ll.deleteNode(node).toArray()).toEqual([]);
        ll.prepend(1);
        ll.append(2);
        ll.append(3);
        const nodeToDelete = ll.find(2);
        expect(ll.deleteNode(nodeToDelete).toArray()).toEqual([1,3]);
    })
    test('removeDuplicates', () => {
        const ll = new LinkedList();
        expect(ll.removeDuplicates().toArray()).toEqual([])
        ll.append(1);
        ll.append(1);
        expect(ll.removeDuplicates().toArray()).toEqual([1]);
        ll.append(2);
        ll.append(2);
        ll.append(3);
        ll.append(3);
        ll.removeDuplicates();
        expect(ll.toArray()).toEqual([1,2,3])
    })
    test('return the kth node from the end of the list', () => {
        const ll = new LinkedList();

        ll.append(1);
        ll.append(2);
        expect(ll.kthNodeFromTheEnd(1).data).toEqual(1);
        ll.append(3);
        ll.append(4);
        ll.append(5);
        expect(ll.kthNodeFromTheEnd(1).data).toEqual(4);
    })
})