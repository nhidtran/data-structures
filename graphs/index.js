const { LinkedList } = require('../linkedlist') 
const { Queue } = require("../queue");
const { Stack } = require("../stack");

function Graph(vertices = [], isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = new Map();

    vertices.map(value => {
        const ll = new LinkedList()
        this.vertices.set(value, ll);
    })

    return this;
}

Graph.prototype = {
    /* adds key to vertices map
    * @param {any}
    * @returns {Graph}
    */
    addVertex: function(val) {
        this.vertices.set(val, new LinkedList())
        return this;
    },
    /* appends destination value to source vertex if isDirected is false,
    /* appends destination to source, and source to destination if isDirected is true
    * @returns {Array}
    */
   addConnection: function(source, destination) {
    if (!this.isDirected) {
        if (!this.vertices.has(source) && !this.vertices.has(destination)) {
            throw new Error('vertices do not exist to connect')
        }
        if (!this.vertices.has(source) || !this.vertices.has(destination)) {
            throw new Error(
                `[${!this.vertices.has(source) ? source : destination}] does not exist. Cannot connect vertices`) 
        }
        // this.vertices[source].append(destination)
        const ll = this.vertices.get(source).append(destination);
    } else {
        // TODO - addConnection for nonDirectional graph
    }
   },
    /* returns key values of vertices map as an array
    * @returns {Array}
    */
   getVertices: function() {
    return Array.from(this.vertices.keys())
   },
   /* prints adjacency list of the graph
   * @returns {string}
   */
   printGraph: function() {
    return this.getVertices().reduce((acc, key, idx) => {
        const list = this.vertices.get(key);
        let ptr = list.getHead();
        acc += `[${key}] => `
        while(ptr !== null) {
            acc += `${ptr.data} => `
            ptr = ptr.next;
        }
        acc += "null\n"
        return acc;
    }, "");
   },
   /*
   * peforms breadth first search traversal on the graph (level by level)
   * Note- uses Queue, adjacent nodes of vertex visited before moving onto neighbors
   * @return {Array} of items visited
   */
   BFS: function() {
    const q = new Queue();
    // const visited = new Array(this.vertices.length).fill(false);
    const visitedSet = new Set();
    return this.getVertices().reduce((acc, key, idx) => {
        if (!visitedSet.has(key)) {
            visitedSet.add(key);
            q.enqueue(key);
        }

        while(!q.isEmpty()) {
            let { data } = q.peek(); // returns  data, next }
            acc.push(data);

            this.vertices.get(key).toArray()
            .filter(n => !visitedSet.has(n))
            .map(n => {
                visitedSet.add(n);
                q.enqueue(n);
            })
            q.dequeue()
        }

        return acc;
    }, []);
   },
  /*
   * peforms depth first search. Deepest level before backtracking
   * Note- uses Stack- visits all of the neighbors
   * @return {Array} of items visited
   */
  DFS: function() {
    //   const Stack = new Array(this.vertices.size) 
      const stack = new Stack()
      const visitedSet  = new Set();
      return this.getVertices().reduce((acc, key, idx) => {
          if (!visitedSet.has(key)) {
              stack.push(key);
              visitedSet.add(key)
          }
          while(stack.size()) {
            const value = stack.getTop();
            stack.pop();
            acc.push(value);
            if (this.vertices.get(value)) {
                this.vertices.get(value).toArray()
                .filter(n => !visitedSet.has(n))
                .map(n => {
                    stack.push(n);
                    visitedSet.add(n);
                })
            }
          }
        return acc;
      }, [])
  }
}

module.exports = { 
    Graph
}


