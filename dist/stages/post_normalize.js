/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../post_normalize", "bes/object"], (function(require, exports, post_normalize, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var ast = input["ast"],
            data = input["data"];
        return setProperty(input, "ast", post_normalize.normalize(ast, data));
    }));
    return optimize;
}));