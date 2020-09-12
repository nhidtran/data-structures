const { Graph } = require('./index');

describe('Graph', () => {
    test('constructs Graph object with vertices and empty adjacency list', () => {
        expect(new Graph(2)).toMatchObject({
            vertices: 2,
            adjacencyList: [{head: null, tail: null}, {head: null, tail: null}]
        })
    });

    test('add Edge for directional graph', () => {
        const graph = new Graph(4);
        graph.addDirectionalEdge(0, 1);
        graph.addDirectionalEdge(0, 2);
        graph.addDirectionalEdge(1, 3);
        graph.addDirectionalEdge(2, 3);
        const trim = graph.printGraph().replace(/(\r\n|\n|\r)/gm," ");
        expect(trim).toEqual("|0| => 1 => 2 =>  null  |1| => 3 =>  null  |2| => 3 =>  null  |3| =>  null  ");
    })
    test('add Edge for unidirectional graph', () => {
        const graph = new Graph(3);
        graph.addUnidirectionalEdge(0,1);
        graph.addUnidirectionalEdge(1,2);
        graph.addUnidirectionalEdge(0,2);
        const trim = graph.printGraph().replace(/(\r\n|\n|\r)/gm," ");
        expect(trim).toEqual("|0| => 1 => 2 =>  null  |1| => 0 => 2 =>  null  |2| => 1 => 0 =>  null  ")
    })
    test('BFS - returns a string of node values level by level', () => {
        const graph = new Graph(6);
        // expect(graph.BFS()).toEqual(null)
        graph.addDirectionalEdge(1,2)
        graph.addDirectionalEdge(1,3)
        graph.addDirectionalEdge(2,4)
        graph.addDirectionalEdge(2,5)
        console.log('%cprintgraph-', 'color:hotpink', graph.printGraph());
        expect(graph.BFS()).toEqual("12345");
    })
})