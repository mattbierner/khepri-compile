/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/"use strict";
var ecma_peep = require("../ecma_peep"),
    optimize;
(optimize = (function(__o) {
    var options = __o["options"],
        tree = __o["tree"];
    return ({
        "options": options,
        "tree": ecma_peep.optimize(tree)
    });
}));
(module.exports = optimize);