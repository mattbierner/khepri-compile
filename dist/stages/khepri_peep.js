/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../khepri_peep", "bes/object"], (function(require, exports, khepri_peep, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return setProperty(input, "tree", khepri_peep.optimize(tree, data));
    }));
    return optimize;
}));