/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../inline", "bes/object"], (function(require, exports, inline, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var ast = input["ast"],
            data = input["data"],
            out = inline.optimize(ast, data);
        return setProperty(setProperty(input, "ast", out.tree), "data", out.data);
    }));
    return optimize;
}));