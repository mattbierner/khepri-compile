/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "../pre_normalize"], (function(require, exports, pre_normalize) {
    "use strict";
    var normalize;
    (normalize = (function(__o) {
        var options = __o["options"],
            ast = __o["ast"];
        return ({
            "options": options,
            "ast": pre_normalize.normalize(ast)
        });
    }));
    return normalize;
}));