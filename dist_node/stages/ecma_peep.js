/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/"use strict";
var ecma_peep = require("../ecma_peep"),
    optimize;
(optimize = (function(__o) {
    var options = __o["options"],
        ast = __o["ast"];
    return ({
        "options": options,
        "tree": ecma_peep.optimize(ast)
    });
}));
(module.exports = optimize);