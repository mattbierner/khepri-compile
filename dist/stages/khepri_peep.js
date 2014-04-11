/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "bes/object", "../khepri_peep"], (function(require, exports, Error, __o,
    khepri_peep) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return Error.of(setProperty(input, "tree", khepri_peep.optimize(tree, data)));
    }));
    return optimize;
}));