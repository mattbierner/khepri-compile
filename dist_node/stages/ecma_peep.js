/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/
"use strict";
var Error = require("akh")["error"],
    ecma_peep = require("../ecma_peep"),
    optimize;
(optimize = (function(__o) {
    var options = __o["options"],
        tree = __o["tree"];
    return Error.of(({
        "options": options,
        "tree": ecma_peep.optimize(tree)
    }));
}));
(module.exports = optimize);