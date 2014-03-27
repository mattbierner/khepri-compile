/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "../inline", "bes/object"], (function(require, exports, inline, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var ast = input["ast"],
            data = input["data"];
        return setProperty(input, "ast", inline.optimize(ast, data));
    }));
    return optimize;
}));