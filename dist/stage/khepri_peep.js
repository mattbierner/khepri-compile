/*
 * THIS FILE IS AUTO GENERATED from 'lib/stage/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "../khepri_peep", "bes/object"], (function(require, exports, khepri_peep, __o) {
    "use strict";
    var setProperty = __o["setProperty"],
        optimize;
    (optimize = (function(input) {
        var ast = input["ast"],
            data = input["data"];
        return setProperty(input, "ast", khepri_peep.optimize(ast, data));
    }));
    (exports["optimize"] = optimize);
}));