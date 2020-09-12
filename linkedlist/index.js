function Node(data, nextElement) {
    this.data = data;
    this.next = nextElement;
}

function LinkedList() {
    this.head = null;
    this.tail = null;
}

LinkedList.prototype = {
    // toArray: function() {
    //     let arr = [];
    //     return this.toArrayHelper(this.head, arr)
    // },
    // toArrayHelper: function(node, arr = []) {
    //     if (!node) return arr;
    //     arr.push(node.data);
    //     this.toArrayHelper(node.next, arr);
    //     return arr;
    // },
    toArray: function() {
        if (!this.head) return [];
        let arr = [];
        let temp = this.head;
        while (temp && temp.data) {
            arr.push(temp.data);
            temp = temp.next;
        }
        return arr;
    },
    prepend: function(value) {
        const node = new Node(value, this.head);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.head = node;
        return this;
    },
    append: function(value) {
        const node = new Node(value, null);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
    },
    getHead: function () {
        return this.head;
    },
    insertAtPosition: function(value, position) {
        const node = new Node(value);
        let curr = this.head;
        let counter = 1;
        if (position < 1 || position > this.size() + 1) {
            throw new Error("Invalid position")
        } else {
            while (counter < position -1) {
                curr = curr.next;
                ++counter;
            }
            node.next = curr.next;
            curr.next = node;
        }
        return this;
    },
    size: function() {
        let counter = 0;
        let curr = this.head;
        while(curr !== null) {
            ++counter;
            curr = curr.next;
        }
        return counter;
    },
    deleteAtHead: function() {
        if (this.head == this.tail) {
            this.head = null;
            this.tail = null;
            return this;
        }
        let temp = this.head;
        this.head = temp.next;
        temp.next = null;
        return this;
    },
    deleteAtTail: function() {
        if(this.head == this.tail) {
            this.head = null;
            this.tail = null;
            return this;
        }
        let curr = this.head;
        while(curr.next !== this.tail) {
            curr = curr.next;
        }
        this.tail = curr;
        this.tail.next = null;
        return this;
    },
    deleteByValue: function(value) {
        // Solution: moving pointer
        // if (!this.head) throw new Error('Error - cannot delete from empty list')
        // // one item
        // if (this.head.data === value) {
            //     this.head = null;
            //     return this;
            // }
            // let curr = this.head;
            // while(curr !== null) {
            //     if (curr.next && curr.next.data === value) {
                //         const match = curr.next.data;
                //         curr.next = curr.next.next;
                //         match.next = null;
                //         return this;
                //     }
                //     curr = curr.next;
                // }
            // throw new Error('Error - cannot find value in list');
        // Solution: replace value
        if (!this.head) throw new Error('Error - cannot delete from empty list')
        let curr = this.head;
        while (curr !== null) {
            if (curr.data === value) {
                if (curr === this.head) {
                    this.head = null;
                    this.tail = null;
                    return this;
                }
                curr.data = curr.next ? curr.next.data : null;
                curr.next = curr.next ? curr.next.next : null;
                return this;
            }
            curr = curr.next;
        }
        throw new Error('Error - cannot find value in list');
    },
    reverseLinkedList: function() {
        if (!this.head) return this;
        let curr = this.head;
        let prev = null;
        let next = null;

        while (curr !== null) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        const tempHead = this.head;
        this.head = this.tail,
        this.tail = tempHead;
        return this;
    },
    hasLoop: function() {
        // Floyd Tortoise Hare algorithm
        if (!this.head) return false;
        let slowPtr = this.head;
        let fastPtr = this.head;
        while(slowPtr !== this.tail && fastPtr !== null) {
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next
            if (fastPtr.next = slowPtr) {
                return true;
            }
        }
        return false;
    },
    getMiddle: function() {
        if (!this.head) return null;
        let slowPtr = this.head;
        let fastPtr = this.head;
        while(fastPtr && fastPtr.next) {
            slowPtr = slowPtr.next;
            fastPtr = fastPtr.next.next;
        }
        return slowPtr;
    
    },
    find: function(value) {
        let ptr = this.head;
        while(ptr !== null) {
            if (ptr.data === value) {
                return ptr;
            }
            ptr = ptr.next;
        }
        throw new Error('Not found node in list')
    },
    removeDuplicates: function() {
        const set = new Set();
        let ptr = this.head;
        while(ptr !== null) {
            if (set.has(ptr.data)) {
                let tempNext = ptr.next;
                this.deleteNode(ptr);
                ptr = tempNext;
            } else {
                set.add(ptr.data);
                ptr = ptr.next;
            }
        }
        return this;
    },
    deleteNode: function(node) {
        if (!this.head) throw new Error('Error- cannot delete. Empty list');
        if (this.head === node && this.tail === node) {
            // only oneitem
            this.head = null;
            this.tail = null;
            return this;
        }
        if (this.head === node) {
            // delete at head mplementation:
            // let temp = this.head;
            // this.head = temp.next;
            // temp.next = null;
            this.deleteAtHead(); 
            return this;
        }
        if (this.tail === node) {
            this.deleteAtTail();
            return this;
        }
        node.data = node.next ? node.next.data : null;
        node.next = node.next.next ? node.next.next : null;
        return this;
    },
    kthNodeFromTheEnd: function(k) {
        if (k < 0 || !this.size() || k > this.size() - 1) {
            throw new Error('Error- position not in list size range');
        }
        let fastPtr = this.head;
        let slowPtr = this.head;
        while(fastPtr !== this.tail) {
            slowPtr = fastPtr;
            let counter = 0;
            while (counter < k && fastPtr) {
                fastPtr = fastPtr.next;
                ++counter;
            }
        }
        return slowPtr;

    }
    // union and intersection of linked list
}


module.exports = {
    Node,
    LinkedList
}