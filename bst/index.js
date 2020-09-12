const { cloneWithoutLoc, classPrivateMethod } = require("@babel/types");


function TreeNode ({ left = null, right = null, parent = null, value = null}) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.value = value;
    return this;
}

TreeNode.prototype = {
    getNodeValue: function() {
        return this.value
    },
    // TODO
    setLeft: function() {

    },
    setRight: function() {

    }
}

function BST (root) {
    this.root = root;
    return this;
}

BST.prototype = {
    insert: function(val) {
        if (!this.root) {
            const node = new TreeNode({ value: val })
            this.root = node;
        }  
        return this.insertHelper({ val, node: this.root })
 
    },
    insertHelper: function({ val, node }) {
        if (node.value > val) {
            if (node.left) {
                this.insertHelper({ val, node: node.left })
            } else {
                node.left = new TreeNode({ value: val });
                node.left.parent = node;
                return node;
            }
        }
        if (node.value < val) {
            if (node.right) {
                this.insertHelper({ val, node: node.right})
            } else {
                node.right = new TreeNode({ value: val });
                node.right.parent = node
                return node;
            }
        }
    },
    preOrderTraversal: function() {
        let traversed = [];
        traversed = [...this.preOrderTraversalHelper(traversed, this.root)]
        return traversed;
    },
    preOrderTraversalHelper: function(acc = [], node) {
        if (node && node.value) {
            acc.push(node.value)
            if (!node.left) acc.push(null)
            this.preOrderTraversalHelper(acc, node.left);
            if (!node.right) acc.push(null)
            this.preOrderTraversalHelper(acc, node.right);
            
            return acc;
        }
        return acc;
    },
    postOrderTraversal: function() {
        let traversed = [];
        traversed = [...this.postOrderTraversalHelper(traversed, this.root)]
        return traversed;
    },
    postOrderTraversalHelper: function(acc = [], node) {
        if (node) {
            if (node.left) {this.postOrderTraversalHelper(acc, node.left)}
            if (node.right) this.postOrderTraversalHelper(acc, node.right);
            acc.push(node.value)
        }
        return acc;
    },
    inOrderTraversal: function() {
        let traversed = [];
        traversed = [...this.inOrderTraversalHelper(traversed, this.root)]
        return traversed;
    },
    inOrderTraversalHelper: function (acc = [], node) {
        if (node) {
            if (node.left) this.inOrderTraversalHelper(acc, node.left);
            acc.push(node.value)
            if (node.right) this.inOrderTraversalHelper(acc, node.right)
        }
        return acc;
    },
    find: function (val) {  
        const res = this.findHelper(val, this.root);
        return res;
    },
    findHelper: function(val, node) {
        if (node) {
            if (node.value === val) {
                return node;
            }
            if (node.value > val) {
                this.findHelper(val, node.left);
            }
            if (node.value < val) {
                this.findHelper(val, node.right)
            }
            if (node.value === val) {
                return node;
            } 
        }
    },
    delete: function (val) {
        const nodeToDelete = this.deleteHelper(val, this.root);
        return nodeToDelete;
    },
    deleteHelper: function(val, node) {
        // empty bst
        if (!node) return;
        if (node.value === val) {
            const foundNode = new TreeNode(node);
            // leaf node
            if (!node.left && !node.right) {
                node.value = null;
                return foundNode;
            }
            if (node.right) {
                node.value = node.right.value;
                node.right = null;
                return foundNode
            }
        }
        if (node.value < val) {
            this.deleteHelper(val, node.right);
        }
        if (node.value > val) {
            this.deleteHelper(val, node.left)
        }
        return;
    },
    deleteTree: function () {
        return this.deleteTreeHelper(this.root);
    },
    deleteTreeHelper: function(node, acc = []) {
        // implements postOrderTraversal
        if (node) {
            if (node.left) {
                this.deleteTreeHelper(node.left, acc);
            }
            if (node.right) {
                this.deleteTreeHelper(node.right, acc)
            }
            acc.push(node.value); // keeping track nodes that are deleted
            this.deleteHelper(node.value, node)
        }
        return acc;
    },
    findMin: function() {
        return this.findMinHelper(this.root)
    },
    findMinHelper: function (node) {
        if (!node) {
            return null;
        }
        if (node && node.left) {
            return this.findMinHelper(node.left);
        }
        return node;
    },
    findMax: function() {
        return this.findMaxHelper(this.root);
    },
    findMaxHelper: function(node) {
        if (!node) return null;
        if (node && node.right) {
            return this.findMaxHelper(node.right);
        }
        return node;
    },
    findKthMaxValue: function(k) {
        const max = this.findMaxHelper(this.root);
        return this.findKthMaxHelper(max, k);
    },
    findKthMaxHelper: function(node, k) {
        // const inOrderArray = this.inOrderTraversal(node);
        // return inOrderArray[inOrderArray.length - k];
        // reverse in order - left root right
        // if (node) {
        //     if (node.left) this.inOrderTraversalHelper(acc, node.left);
        //     acc.push(node.value)
        //     if (node.right) this.inOrderTraversalHelper(acc, node.right)
        // }
        // return acc;
        if (k === 1) {
            return node;
        }
        // right root left (reversed in order)
        if (node) {
            if (node.left && node.left.value > node.parent.value) {
                return this.findKthMaxHelper(node.left, --k);
            }
            return this.findKthMaxHelper(node.parent, --k);
        }


    },
    findKthMinValue: function(k) {
        const min = this.findMin();
        return this.findKthMinValueHelper(min, k);

    },
    findKthMinValueHelper: function(node, k) {
        if (k === 1) {
            return node;
        }
        if (node) {
            if (node.right && node.right.value < node.parent.value) {
                return this.findKthMinValueHelper(node.right, --k);
            }
            return this.findKthMinValueHelper(node.parent, --k)
        }
    },
    print: function() {
        let acc = [];
        return this.preOrderPrint(this.root, acc);
    },
    preOrderPrint(currentNode, acc = []) {
        if (currentNode!==null) {
            acc.push(currentNode.value);
            this.preOrderPrint(currentNode.left, acc);
            this.preOrderPrint(currentNode.right, acc);
        }
        return acc;
    },
    findAncestors: function(k) {
        let ancestors = [];
        return this.findAncestorsHelper(this.root, k, ancestors)
        
    },
    findAncestorsHelper: function(node, k, arr = []) {
        if (!node) return arr;
        if (node.value === k) {
            return arr;
        }
        arr.push(node.value);
        if (node.value < k) return this.findAncestorsHelper(node.right, k, arr);
        if (node.value > k) return this.findAncestorsHelper(node.left, k, arr);
        
    },
    height: function() {
        return this.maxDepth(this.root)
    },
    maxDepth: function(node) {
        // should do Depth 1st search- expand the deepest nodes, and pop back up
        if (!node) return 0;
        if (node) {
            const maxLeft = this.maxDepth(node.left) + 1;
            const maxRight = this.maxDepth(node.right) + 1;
            return maxLeft > maxRight ? maxLeft : maxRight;
        }
    },
    findKthNodes: function(k) {
        return this.findKthNodesHelper(this.root, k);
    },
    findKthNodesHelper: function(node, k) {
        if (!node) return [];
        if (k === 1) {
            return [node.left.value, node.right.value];
        }
        if (node) {
            const left = this.findKthNodesHelper(node.left, k - 1);
            const right = this.findKthNodesHelper(node.right, k - 1);
            return [...left, ...right];

        }
    },
    // TODO
    // // https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
    // findAllNodesKthFromTarget: function(k, target) {
    //     // find nodes in ancestoral tree - Do this without parental pointer
    //     // find nodes in subtree from target
    //     return this.findAllNodesKthFromTargetHelper(this.root, k)
    // },
    // findAllNodesKthFromTargetHelper: function(node, k) {

    // },
}


// in order - left root right
// preorder - root left right
// postorder - left right root

module.exports = {
    TreeNode: TreeNode,
    BST: BST
}
