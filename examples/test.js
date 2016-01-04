/**
 * Created by dsar941 on 1/4/2016.
 */

var x = function () {
    var genetic = Genetic.create();

    var graph1 = new Graph();

    genetic.optimize = Genetic.Optimize.Minimize;
    genetic.select1 = Genetic.Select1.Tournament2;
    genetic.select2 = Genetic.Select2.Tournament2;

    
    console.log("Hello");
    var g = new Graph();
    console.log(g);
}();