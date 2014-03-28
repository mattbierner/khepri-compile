/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../ecma_peep"], (function(require, exports, ecma_peep) {
    "use strict";
    var optimize;
    (optimize = (function(__o) {
        var options = __o["options"],
            tree = __o["tree"];
        return ({
            "options": options,
            "tree": ecma_peep.optimize(tree)
        });
    }));
    return optimize;
}));