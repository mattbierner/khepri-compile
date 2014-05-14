/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "bes/object", "../khepri_peep"], (function(require, exports, Error, __o,
    khepri_peep) {
    "use strict";
    var optimize, setProperty = __o["setProperty"];
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return Error.of(setProperty(input, "tree", khepri_peep.optimize(tree, data)));
    }));
    return optimize;
}));