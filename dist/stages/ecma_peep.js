/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "bes/object", "../ecma_peep"], (function(require, exports, Error, __o,
    ecma_peep) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(data) {
        var tree = data["tree"];
        return Error.of(setProperty(data, "tree", ecma_peep.optimize(tree)));
    }));
    return optimize;
}));