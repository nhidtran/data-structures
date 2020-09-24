const { Graph } = require('./index');


describe('Graph', () => {
    describe('Graph Constructor', () => {
        test('by default, returns isDirected is false and empty map of vertices', () => {
            const g = new Graph();
            expect(g).toEqual({
                isDirected: false,
                vertices: new Map(),
            })
        })
        test('constructor returns a map of linked lists and sets isDirected boolean', () => {
            const g = new Graph([9,4,7], true);
            expect(g.isDirected).toEqual(true);
            
            const keys = Array.from(g.vertices.keys())
            expect(keys).toEqual([9,4,7]);

            Array.from(g.vertices.values()).map(ll => expect(ll).toMatchObject({ head: null, tail: null }))
        })
    })
    describe('Add Vertex', () => {
        test('addVertex adds value to vertices map', () => {
            const g = new Graph();
            g.addVertex(1);
            expect(Array.from(g.vertices.keys())).toEqual([1]);
        })
    })
    test('getVertices returns key values as an array', () => {
        const g = new Graph([1,2,3]);
        expect(g.getVertices()).toEqual([1,2,3])
    }),
    test('addConnection adds a node to the connected vertex to another', () => {
        const g = new Graph([1,2]);
        expect(() => g.addConnection(4,5)).toThrow('vertices do not exist to connect')
        expect(() => g.addConnection(3,1)).toThrow('[3] does not exist. Cannot connect');
        g.addConnection(1,2);
        const trim = g.printGraph().replace(/(\r\n|\n|\r)/gm," ");
        expect(trim).toEqual("[1] => 2 => null [2] => null ")

    })
    test('printList', () => {
        const g = new Graph();
        expect(g.printGraph()).toEqual("")
        g.addVertex(1);
        g.addVertex(2);
        const trim = g.printGraph().replace(/(\r\n|\n|\r)/gm," ");
        expect(trim).toEqual("[1] => null [2] => null ")

    })
    test('BFS', () => {
        expect((new Graph().BFS())).toEqual([])
        const g = new Graph([1,2,3,4,5,6]);
        g.addConnection(1,2);
        g.addConnection(1,3);
        g.addConnection(2,4);
        g.addConnection(2,5);
        g.addConnection(3,6);

        expect(g.BFS()).toEqual([1,2,3,4,5,6]);
    })
    test('DFS', () => {
        expect((new Graph().DFS())).toEqual([])
        const g = new Graph([1,2,3,4,5,6]);
        g.addConnection(1,2);
        g.addConnection(1,3);
        g.addConnection(2,4);
        g.addConnection(2,5);
        g.addConnection(3,6);
        
        expect(g.DFS()).toEqual([ 1, 3, 6, 2, 5, 4 ]);
    })
})


























































































// const { Graph, GraphEdge, GraphVertex } = require('./index');

// describe('GraphVertex', () => {
//     test('returns a value input and edges property ', () => {
//         const v = new GraphVertex('foo');
//         expect(v).toMatchObject({
//             value: 'foo',
//             edges: {
//                 head: null,
//                 tail: null
//             }
//         })
//     })
//     test.only('getEdges returns an array of all adjacent edges of the vertex', () => {
//         const a = new GraphVertex('A');
//         const b = new GraphVertex('B');
//         const abEdge = new GraphEdge({
//             startVertex: a,
//             endVertex: b,
//             weight: 1
//         });
//         a.addEdge(abEdge)
//         expect(a.getEdges()).toEqual(['b'])
//     })
//     // test('adds edge node', () => {
//     //     const v = new GraphVertex('foo');
//     //     v.addEdge('bar')
//     //     expect(v.getEdges()).toEqual(['bar']);
//     // })
//     test('getKey returns the vertex value', () => {
//         const v = new GraphVertex('abc');
//         expect(v.getKey()).toEqual('abc')
//     })
//     test('addEdge adds a new edge to the current vertex', () => {
//         const a = new GraphVertex('a');
//         const b = new GraphVertex('b');
//         const abEdge = new GraphEdge({
//             startVertex: a,
//             endVertex: b,
//             weight: 1
//         })
//         a.addEdge(abEdge);
//         // console.log('%ca.edges-', 'color:hotpink', a.edges);
//         // expect(a.getEdges()).toEqual('b')
//         // expect(a.addEdge(abEdge).getEdges()).toEqual([])
//     })
// })

// describe('GraphEdge', () => {
//     test('constructor returns the connection between vertices', () => {
//         const a = new GraphVertex('A');
//         const b = new GraphVertex('B');
//         expect(new GraphEdge({})).toMatchObject({
//             startVertex: null,
//             endVertex: null,
//             weight: 0
//         })
//         expect(new GraphEdge({
//             startVertex: a,
//             endVertex: b,
//             weight: 1
//         })).toMatchObject({
//             startVertex: a,
//             endVertex: b,
//             weight: 1
//         })
//     })
//     test('getKey returns unique edge key which will consist of start to end vertices keys', () => {
        
//         const a = new GraphVertex('A');
//         const b = new GraphVertex('B');
//         const ABEdge = new GraphEdge({
//             startVertex: a,
//             endVertex: b,
//             weight: 1
//         })
//         expect(ABEdge.getKey()).toEqual('A_B')
//     })
// })

// describe('Graph', () => {
//     test('constructor sets isDirected property, and empty objects for vertices and edges', () => {
//         const g  = new Graph();
//         expect(g.isDirected).toEqual(false);
//         expect(g.vertices).toEqual({})
//         expect(g.edges).toEqual({})
//     })
//     test('addVetex adds a vertex instance to the graph', () => {
//         const v = new GraphVertex(1);
//         const g = new Graph();
//         g.addVertex(v);
//         expect(g.vertices[1]).toMatchObject({
//             edges: { 
//                 head: null,
//                 tail: null
//             },
//             value: 1
//         })
//     })
//     test('getVertexByKey returns the vertex by its key from this vertices object', () => {
//         const v = new GraphVertex(1);
//         const g = new Graph();
//         g.addVertex(v);
//         expect(g.getVertexByKey(1)).toMatchObject({
//             edges: { head: null, tail: null },
//             value: 1
//         })
//     })
//     test('getAllVertices returns all vertices of a graph in arrayy format', () => {
//         const v = new GraphVertex(4);
//         const v2 = new GraphVertex(8);
//         const v3 = new GraphVertex(9);
//         const g = new Graph();
//         g.addVertex(v);
//         g.addVertex(v2);
//         g.addVertex(v3);
//         expect(g.getAllVertices()).toMatchObject([
//             {
//               value: 4,
//               edges: { head: null, tail: null }
//             }, 
//             {
//                 value: 8,
//                 edges: { head: null, tail: null }
//             }, 
//             {
//                 value: 9,
//                 edges: { head: null, tail: null }
//             }
//     ]) 
//     })
// })

// // describe('Graph', () => {
// //     test.only('returns a map of vertices and sets if isDirected', () => {
// //         const graph = new Graph([1,2,3]);
// //         expect(graph.isDirected).toEqual(false);

// //         let counter = 1;
// //         for(let [key,value] of graph.vertices) {
// //             expect(key).toEqual(counter++)
// //             // expect(value).toEqual(new LinkedList())
// //         }
// //     })
// //     test('adds vertex', () => {
// //         const g = new Graph();
// //         g.addVertex('foo');
// //         g.addVertex('bar')
// //         expect(g.vertices.has('foo'))
// //         expect(g.vertices.has('bar'))
// //     }),
// //     test('getVertexByKey', () => {
// //         const g = new Graph(['foo']);
// //         expect(g.getVertexByKey('foo')).toMatchObject({
// //             value: 'foo',
// //             edges: {
// //                 head: null,
// //                 tail: null
// //             }
// //         })
// //     })
// // })



// // const { LinkedList } = require('../linkedlist');
// // // const { Graph } = require('./index');

// // // describe('Graph', () => {
// // //     test('constructs Graph object with vertices and empty adjacency list', () => {
// // //         expect(new Graph(2)).toMatchObject({
// // //             vertices: 2,
// // //             adjacencyList: [{head: null, tail: null}, {head: null, tail: null}]
// // //         })
// // //     });

// // //     test('add Edge for directional graph', () => {
// // //         const graph = new Graph(4);
// // //         graph.addDirectionalEdge(0, 1);
// // //         graph.addDirectionalEdge(0, 2);
// // //         graph.addDirectionalEdge(1, 3);
// // //         graph.addDirectionalEdge(2, 3);
// // //         const trim = graph.printGraph().replace(/(\r\n|\n|\r)/gm," ");
// // //         expect(trim).toEqual("|0| => 1 => 2 =>  null  |1| => 3 =>  null  |2| => 3 =>  null  |3| =>  null  ");
// // //     })
// // //     test('add Edge for unidirectional graph', () => {
// // //         const graph = new Graph(3);
// // //         graph.addUnidirectionalEdge(0,1);
// // //         graph.addUnidirectionalEdge(1,2);
// // //         graph.addUnidirectionalEdge(0,2);
// // //         const trim = graph.printGraph().replace(/(\r\n|\n|\r)/gm," ");
// // //         expect(trim).toEqual("|0| => 1 => 2 =>  null  |1| => 0 => 2 =>  null  |2| => 1 => 0 =>  null  ")
// // //     })
// // //     test('BFS - returns a string of node values level by level', () => {
// // //         const graph = new Graph(6);
// // //         // expect(graph.BFS()).toEqual(null)
// // //         graph.addDirectionalEdge(1,2)
// // //         graph.addDirectionalEdge(1,3)
// // //         graph.addDirectionalEdge(2,4)
// // //         graph.addDirectionalEdge(2,5)
// // //         expect(graph.BFS()).toEqual("12345");
// // //     })
// // // })
