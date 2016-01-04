/**
 * Created by dsar941 on 1/4/2016.
 */

var x = function () {
    var genetic = Genetic.create();

    var graph1 = new Graph();

    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    genetic.seed = function () {

        /*
         * create random seed that are equal in length to solution
         * If random number is divisible by 2 Then put 1
         * Else put 0
         */

        console.log("SEED");
        var len = this.userData["edges"].length;
        var i = Math.floor(Math.random() * len);

        var a = [];
        for (var j = 0; j < len; j++) {
            var i = Math.floor(Math.random() * len);
            if (i % 2 == 0)
                a[j] = 1;
            else
                a[j] = 0;
        }

        return a;
    };

    genetic.mutate = function (entity) {

        var len = entity.length;
        var ca = Math.floor(Math.random() * len);
        var cb = Math.floor(Math.random() * len);

        /*
         * swap corresponding bits between ca and cb positions
         */
        var tmp = entity[cb];
        entity[cb] = entity[ca];
        entity[ca] = tmp;

        return entity;
    };

    genetic.crossover = function (mother, father) {

        /*
         * two-point crossover
         */
        var len = mother.length;
        var ca = Math.floor(Math.random() * len);
        var cb = Math.floor(Math.random() * len);

        if (ca > cb) {
            var tmp = cb;
            cb = ca;
            ca = tmp;
        }

        var son = father.slice(0, ca).concat(mother.slice(ca, cb)).concat(father.slice(cb));
        var daughter = mother.slice(0, ca).concat(father.slice(ca, cb)).concat(mother.slice(cb));

        return [son, daughter];
    };

    genetic.fitness = function (entity) {

        console.log("Fitness Funtions: " + entity);

        var fitness = 0;

        /*
         * Filtering entity Chromosome by checking bit 1 (on) and 0 (off)
         * Map the corresponding 1 bit with original edge list and save these in GAEdges array
         * Calculate sum of all edges in GAEdges and find maximum edge from it
         */
        var sumEdges = 0, maxEdge = 0, GAEdges = [];
        var len = this.userData["edges"].length;
        var edges = this.userData["edges"];
        for (var i = 0; i < len; i++) {
            if (entity[i] == 1) {
                if (edges[i][2] > maxEdge)
                    maxEdge = edges[i][2];

                sumEdges += edges[i][2];
                GAEdges.push(edges[i]);
            }
        }

        /*
         * Creating graph from the GA edges using Graph.js
         */

        console.log("GAEdges: " + GAEdges);

        for (var i = 0; i < GAEdges.length; i++) {
            console.log(GAEdges[i][0], GAEdges[i][1], GAEdges[i][2]);
            graph1.createEdge(GAEdges[i][0], GAEdges[i][1], GAEdges[i][2]);
            graph1.spanEdge(GAEdges[i][1], GAEdges[i][0], GAEdges[i][2]);
        }

        console.log("connected edges: " + GAEdges);
        console.log("connected length of edge: " + GAEdges.length + " sum: " + sumEdges + " max: " + maxEdge);

        var RequiredNodeList = [1, 2, 3, 4, 5, 6];
        var DisconnectedValuesList = [0, 0, 0, 0, 0, 0];

        var SearchList = [];
        var FoundList = [];
        var AttemptedList = [false, false, false, false, false, false];
        var MaxDisconnected = RequiredNodeList.length - 1;

        /*
         * Assign RequiredList values to SearchList
         */
        for (var i = 0; i < RequiredNodeList.length; i++)
            SearchList[i] = RequiredNodeList[i];

        /*
         * For All SearchList[i] Not in Graph, assign MaxDisconnected
         * value to DisconnectedValueList and "true" to AttemptedList
         * Check using “graph.hasVertex(key) ⇒ boolean”
         */
        for (var i = 0; i < SearchList.length; i++) {
            if (!(graph1.hasVertex(SearchList[i]))) {
                DisconnectedValuesList[i] = MaxDisconnected;
                AttemptedList[i] = true;
            }
        }

        /*
         * We should not have any nodes in required node list that do not
         * exist into the GA solution beyond this point.
         */
        for (var i = 0; i < SearchList.length; i++) {
            /*
             * If true Then this node is not in our Graph
             */
            if (AttemptedList[i]) continue;

            AttemptedList[i] = true;
            FoundList = FoundList.concat(i);
            for (var j = i + 1; j < SearchList.length; j++) {
                /*
                 * If true Then this node is not in our Graph
                 */
                if (AttemptedList[j]) continue;

                /*
                 * If SearchList[i] has a path to or from SearchList[j]
                 * Then update FoundList and AttemptedList
                 */
                if (graph1.hasPath(SearchList[i], SearchList[j])) {
                    FoundList = FoundList.concat(j);
                    AttemptedList[j] = true;
                }
            }

            /*
             * Populate DisconnectedValuesList corresponding
             * positions for nodes in SourceList and FoundList
             */
            DisconnectedValuesList[i] = RequiredNodeList.length - FoundList.length;
            for (var m = 0; m < FoundList.length; m++) {
                DisconnectedValuesList[FoundList[m]] = RequiredNodeList.length - FoundList.length;
            }

            /*
             * Empty FoundList
             */
            FoundList = [];
        }

        /*
         * TotalDisconnected value is is Sum of DisconnectedValuesList
         */
        var TotalDisconnected = 0;
        for (var i = 0; i < DisconnectedValuesList.length; i++)
            TotalDisconnected += DisconnectedValuesList[i];

        console.log("disconnected nodes: " + TotalDisconnected);

        fitness = sumEdges + (maxEdge * TotalDisconnected);

        console.log("Fitness: " + fitness, maxEdge);
        return fitness;
    };


    console.log("Hello");
    var g = new Graph();
    console.log(g);
}();