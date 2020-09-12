const { BST, TreeNode } = require('./index.js');
const { exitCode } = require('process');
const { exec } = require('child_process');


describe('TreeNode', () => {
    test('creates an object with a left pointer, right pointer, parents pointer and value', () => {
        expect(new TreeNode({})).toMatchObject({
            left: null,
            right: null,
            parent: null,
            value: null,
        });
        expect(new TreeNode({ left: 'a', right: 'b', parent: 'mom', value: 10 })).toMatchObject({
            left: 'a',
            right: 'b',
            parent: 'mom',
            value: 10
        });
    })
    test('updates instnace values', () => {
        const node = new TreeNode({});
        expect(node).toMatchObject({
            left: null,
            right: null,
            parent: null,
            value: null,
        })
        node.value = 'foo';
        expect(node).toMatchObject({
            left: null,
            right: null,
            parent: null,
            value: 'foo'
        })
    })
});

describe('BST', () => {
    test('creates an object with a root property', () => {
        expect(new BST()).toMatchObject({ root: undefined})
        expect(new BST('foo')).toMatchObject({ root: 'foo' })
    })
    test('updates root', () => {
        const tree = new BST();
        tree.root = "foo";
        expect(tree).toMatchObject({ root: "foo" });
    })
    test('inserts nodes correctly in the tree', () => {
        const tree = new BST();
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.preOrderTraversal()).toEqual( [6, 4, 2, null, null, 5, null, null, 9, 8, null, null, 12, 10, null, null, 14, null, null]);
    })
    test('postOrderTraversal', () => {
        const tree = new BST();
        tree.insert(10)
        tree.insert(7)
        tree.insert(12)
        expect(tree.postOrderTraversal()).toEqual([7, 12, 10])
    })
    test('inOrderTraversal', () => {
        const tree = new BST();
        tree.insert(10)
        tree.insert(7)
        tree.insert(12)
        expect(tree.inOrderTraversal()).toEqual([7, 10, 12])
    })
    test('find', () => {
        const tree = new BST();
        expect(!!tree.find('foo')).toBe(false)
        tree.insert(10);
        tree.insert(7)
        tree.insert(12)
        expect(!!tree.find(10)).toBe(true)
        expect(!!tree.find(15)).toBe(false)
    })
    describe('delete', () => {
        test('expect undefined if trying to delete in an emptry tree', () => {
            const tree = new BST();
            // test - no node
            expect(!!tree.delete('foo')).toBe(false)
        })
        test('deletes leaf node', () => {
            const tree = new BST();
            // // test - leaf node
            tree.insert(10);
            expect(tree.delete(10).getNodeValue()).toBe(10)
            expect(tree.preOrderTraversal()).toEqual([]);
        })
        test('deletes root node', () => {
            const tree = new BST();
            // test- root node
            tree.insert(10);
            tree.insert(7)
            tree.insert(12)
            tree.delete(10);
            expect(tree.preOrderTraversal()).toEqual([12, 7, null, null, null])
        })
    });
    describe('delete entire tree', () => {
        test('tree.root is null and returns an empty array if trying to delete an empty tree', () => {
            const tree = new BST();
            tree.deleteTree();
            expect(!!tree.root).toBe(false);
        })
        test('deletes with one tree node', () => {
            const tree = new BST();
            tree.insert(1);
            expect(tree.preOrderTraversal()).toEqual([1, null, null])
            tree.deleteTree();
            expect(tree.preOrderTraversal()).toEqual([])
        })
        test('deletes a tree with multiple elements,', () => {
            const tree = new BST();
            // test- root node
            tree.insert(10);
            tree.insert(7)
            tree.insert(12)
            expect(tree.deleteTree()).toEqual([7,12,10]);
            expect(tree.preOrderTraversal()).toEqual([]);
        })
    })
    test('findMinuimum', () => {
        const tree = new BST();
        expect(tree.findMin()).toEqual(null);
        tree.insert(30);
        expect(tree.findMin().value).toEqual(30)
        tree.insert(15);
        tree.insert(50);
        expect(tree.findMin().value).toEqual(15)
    })
    test('findMaximum', () => {
        const tree = new BST();
        expect(tree.findMax()).toEqual(null);
        tree.insert(30);
        expect(tree.findMax().value).toEqual(30)
        tree.insert(15);
        tree.insert(50);
        expect(tree.findMax().value).toEqual(50)
    })
    test('findMax', () => {
        const tree = new BST();
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.findMax().value).toEqual(14)
        expect(tree.preOrderTraversal()).toEqual( [6, 4, 2, null, null, 5, null, null, 9, 8, null, null, 12, 10, null, null, 14, null, null]);
    })
    test('findKthMaxValue', () => {
        const tree = new BST();
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.preOrderTraversal()).toEqual([6, 4, 2, null, null, 5, null, null, 9, 8, null, null, 12, 10, null, null, 14, null, null]);
        expect(tree.findKthMaxValue(3).value).toEqual(10)
    }),
    test('findKthMinValue', () => {
        const tree = new BST();
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.findMin().value).toEqual(2)
        expect(tree.preOrderTraversal()).toEqual([6, 4, 2, null, null, 5, null, null, 9, 8, null, null, 12, 10, null, null, 14, null, null]);
        expect(tree.findKthMinValue(3).value).toEqual(5)
    })
    test('find Ancestors of a given node in a bst', () => {
        const tree = new BST();
        expect(tree.findAncestors()).toEqual([]);
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.preOrderTraversal()).toEqual([6, 4, 2, null, null, 5, null, null, 9, 8, null, null, 12, 10, null, null, 14, null, null]);
        expect(tree.findAncestors(10)).toMatchObject([6, 9, 12])
    });
    test('findHeight', () => {
        const tree = new BST();
        expect(tree.height()).toEqual(0)
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.height()).toEqual(4)
    }),
    test('findKthNodes', () => {
        const tree = new BST();
        expect(tree.findKthNodes(2)).toEqual([])
        tree.insert(6);
        tree.insert(4);
        tree.insert(9);
        tree.insert(2);
        tree.insert(5);
        tree.insert(8);
        tree.insert(12);
        tree.insert(10);
        tree.insert(14);
        expect(tree.findKthNodes(2)).toEqual([2,5,8,12]);
    })
    // TODO
    // test('insertItems', () => {
        // provided an array create a tree
    // })
})
