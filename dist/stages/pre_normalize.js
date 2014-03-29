/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/pre_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "../pre_normalize"], (function(require, exports, pre_normalize) {
    "use strict";
    var normalize;
    (normalize = (function(__o) {
        var options = __o["options"],
            tree = __o["tree"];
        return ({
            "options": options,
            "tree": pre_normalize.normalize(tree)
        });
    }));
    return normalize;
}));