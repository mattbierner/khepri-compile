/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/ecma_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../ecma_peep"], (function(require, exports, ecma_peep) {
    "use strict";
    var optimize;
    (optimize = (function(__o) {
        var options = __o["options"],
            ast = __o["ast"];
        return ({
            "options": options,
            "ast": ecma_peep.optimize(ast)
        });
    }));
    return optimize;
}));