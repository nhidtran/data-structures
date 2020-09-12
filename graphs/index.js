const { LinkedList } = require('../linkedlist');
const { Queue } = require("../queue");

function Graph (vertices) {
    this.vertices = vertices;
    this.adjacencyList = [];

    for(let i = 0; i < vertices; ++i) {
        const temp = new LinkedList()
        this.adjacencyList[i] = temp;
    }
    return this;
}

Graph.prototype = {
    addDirectionalEdge: function(source, destination) {
        this.adjacencyList[source].append(destination);
        return this;
    },
    addUnidirectionalEdge: function(source, destination) {
        this.adjacencyList[source].append(destination);
        this.adjacencyList[destination].append(source)
        return this;
        // this.adjacencyList[destination - 1].append(source);

        return this;
    },
    printGraph: function () {
        let graphStr = "";
        for(let i = 0; i < this.adjacencyList.length; ++i) {
            graphStr += `|${i}| => `;
            let ptr = this.adjacencyList[i].getHead();
            while(ptr !== null) {
                graphStr += `${ptr.data} => `
                ptr = ptr.next;
            }
            graphStr += " null \n"
        }
        return graphStr;
    },
    BFS: function() {
        const queue = new Queue();
        if (!this.adjacencyList) return null;
        let str = "";
        str = this.adjacencyList.reduce((acc, list, idx) => {
            if (list.size()) {
                let ptr = list.getHead();
                queue.enqueue(ptr.data);
                while(!queue.isEmpty()) {
                    console.log('%c!empty-', 'color:hotpink', queue.peek());
                    acc += `${idx}`
                    acc += queue.peek().data

                    queue.dequeue()
                }
                return acc;
            }
        }, "")

        return str;
    }
}



module.exports = { Graph }