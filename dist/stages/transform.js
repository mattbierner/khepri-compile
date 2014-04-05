/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stages/transform.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/error", "bes/object", "../transform/transform"], (function(require, exports, Error,
    __o, transformer) {
    "use strict";
    var setProperty = __o["setProperty"],
        transform;
    (transform = (function(input) {
        var options = input["options"],
            tree = input["tree"],
            data = input["data"];
        return Error.of(setProperty(input, "tree", transformer.transform(tree, (options.package_manager ||
            "amd"), data)));
    }));
    return transform;
}));