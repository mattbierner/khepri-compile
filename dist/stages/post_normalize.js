/*
 * THIS FILE IS AUTO GENERATED from 'lib/stages/post_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "../post_normalize", "bes/object"], (function(require, exports, post_normalize, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var tree = input["tree"],
            data = input["data"];
        return setProperty(input, "tree", post_normalize.normalize(tree, data));
    }));
    return optimize;
}));