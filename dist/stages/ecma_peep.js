/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/error", "../ecma_peep"], (function(require, exports, Error, ecma_peep) {
    "use strict";
    var optimize;
    (optimize = (function(__o) {
        var options = __o["options"],
            tree = __o["tree"];
        return Error.of(({
            "options": options,
            "tree": ecma_peep.optimize(tree)
        }));
    }));
    return optimize;
}));