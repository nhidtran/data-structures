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











































// const { LinkedList } = require('../linkedlist');
// const { Queue } = require("../queue");

// function GraphVertex(value) {
//     this.value = value;
//     this.edges = new LinkedList();
//     return this;
// }

// GraphVertex.prototype = {
//     /*
//     * adds a new edge to the vertex
//     * @param {GraphEdge} edge
//     * @returns {GraphVertex}
//     */
//     addEdge: function(edge) {
//         this.edges.append(edge);
//         return this;
//     },
//     // deleteEdge,
//     // hasEdge,
//     // getNeighbors
//     getEdges: function() {
//         // returns an array of if all adjacent edges of the vertex
//         // converts the edge's linkedList into an array of linkedlist vertices and goes through each vertex and 
//         // extracts the values

//         // return this.edges.toArray();
//         // return this.edges.toArray().map(node => node.value)
//         return this.edges.toArray()
//     },
//     getKey: function() {
//         return this.value;
//     }
// }

// function GraphEdge({startVertex = null, endVertex = null, weight = 0}) {
//     this.startVertex = startVertex;
//     this.endVertex = endVertex;
//     this.weight = weight;

//     return this;
// }

// GraphEdge.prototype = {
//     /*
//     * returns the connection between vertices
//     * @param
//     * @return {string}
//     * */
//    getKey: function() {
//        return `${this.startVertex.getKey()}_${this.endVertex.getKey()}`
//    }
// }

// function Graph(isDirected = false) {
//     // this.vertices = new Map();
//     this.vertices = {},
//     this.isDirected = isDirected;
//     this.edges = {}; // store all vertices and edges that are added to the graph
//     return this;
// }

// Graph.prototype = {
//     /* 
//     * Add new vertex to the graph
//     * @param {GraphVeertex} newVertex
//     * @returns {Graph}
//     */
//    addVertex: function(newVertex) {
//     this.vertices[newVertex.getKey()] = newVertex;
//     return this;
//    },
//     /* 
//     * returns the vertex by vertex value from Graph vertices array
//     * @param {string} key
//     * @returns {GraphVertex}
//     */
//    getVertexByKey: function(key) {
//        return this.vertices[key]
//    },
//     /* 
//     * returns all of the vertices in array format
//     * @param 
//     * @returns {GraphVertex []}
//     */
//    getAllVertices: function() {
//        return Object.values(this.vertices);
//     // return Object.keys(this.vertices);
//    }
// }

// module.exports = {
//     Graph,
//     GraphEdge,
//     GraphVertex
// }



// // function Graph(vertices, isDirected = false) {
// //     this.isDirected = isDirected;
// //     this.vertices = new Map();

// //     vertices.forEach(vertex => {
// //         // const v = new GraphVertex(vertex)
// //         this.vertices.set(vertex)
// //     })
// //     return this;
// // }

// // Graph.prototype =  {
// //     addVertex: function(value) {
// //         // const v = new GraphVertex(value)
// //         this.vertices.set(value);

// //         return this;
// //     },
// //     /*
// //     Get vertex by its key
// //     @param { string } vertexKey
// //     @returns GraphVertex
// //     */
// //     getVertexByKey: function(key) {
// //         console.log('%cgetting.....-', 'color:hotpink', key, this.vertices);
// //         return this.vertices.get(key);
// //     }
// // }

// // // function Graph (vertices) {
// // //     this.vertices = vertices;
// // //     this.adjacencyList = [];

// // //     for(let i = 0; i < vertices; ++i) {
// // //         const temp = new LinkedList()
// // //         this.adjacencyList[i] = temp;
// // //     }
// // //     return this;
// // // }

// // // Graph.prototype = {
// // //     addDirectionalEdge: function(source, destination) {
// // //         this.adjacencyList[source].append(destination);
// // //         return this;
// // //     },
// // //     addUnidirectionalEdge: function(source, destination) {
// // //         this.adjacencyList[source].append(destination);
// // //         this.adjacencyList[destination].append(source)
// // //         return this;
// // //         // this.adjacencyList[destination - 1].append(source);

// // //         return this;
// // //     },
// // //     printGraph: function () {
// // //         let graphStr = "";
// // //         for(let i = 0; i < this.adjacencyList.length; ++i) {
// // //             graphStr += `|${i}| => `;
// // //             let ptr = this.adjacencyList[i].getHead();
// // //             while(ptr !== null) {
// // //                 graphStr += `${ptr.data} => `
// // //                 ptr = ptr.next;
// // //             }
// // //             graphStr += " null \n"
// // //         }
// // //         return graphStr;
// // //     },
// // //     BFS: function() {
// // //         const queue = new Queue();
// // //         const visited = new Array(this.vertices).fill(false)
// // //         return this.adjacencyList.reduce((acc, list, idx) => {
// // //             if (list.size()) {
// // //                 if (!visited[idx]) {
// // //                     visited[idx] = true;
// // //                     queue.enqueue(idx);
// // //                 }
// // //                 let ptr = list.getHead();
// // //                 while(ptr!==null) {
// // //                     if (!visited[ptr.data]) {
// // //                         visited[ptr.data] = true;
// // //                         queue.enqueue(ptr.data)
// // //                     }
// // //                     ptr = ptr.next
// // //                 }
// // //             }
// // //             while(!queue.isEmpty()) {
// // //                 acc += `${queue.peek().data}`
// // //                 queue.dequeue();
// // //             }
// // //             return acc;
// // //         }, "")
// // //     }
// // // }

