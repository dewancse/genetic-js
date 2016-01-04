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

    console.log("Hello");
    var g = new Graph();
    console.log(g);
}();