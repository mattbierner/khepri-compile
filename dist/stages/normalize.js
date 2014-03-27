/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/normalize.kep'
 * DO NOT EDIT
*/
define([require, exports, "../normalize"], (function(require, exports, norm) {
    "use strict";
    var normalize;
    (normalize = (function(__o) {
        var options = __o["options"],
            ast = __o["ast"];
        return ({
            "options": options,
            "ast": norm.normalize(ast)
        });
    }));
    return normalize;
}));