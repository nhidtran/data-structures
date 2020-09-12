const { LinkedList } = require('../linkedList');

function Queue () {
    this.list = new LinkedList();
}

Queue.prototype = {
    enqueue: function(val) {
        this.list.append(val);
        return this;
    },
    dequeue: function () {
        this.list.deleteAtHead()
        return this;
    },
    print: function() {
        let str = this.list.toArray().reduce((acc, curr) => {
            acc += curr + " => "
            return acc;
        }, "")
        str += "null"
        return str;
    },
    peek: function() {
        if (!this.list.getHead()) return null;
        return this.list.getHead()
    },
    isEmpty: function () {
        return this.list.size() === 0
    }
}

module.exports = { Queue }

