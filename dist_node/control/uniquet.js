/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/uniquet.kep'
 * DO NOT EDIT
*/
"use strict";
var StateT = require("akh")["trans"]["state"],
    UniqueT;
(UniqueT = (function(m) {
    var Instance = StateT(m);
    (Instance.unique = (Instance.prototype.unique = Instance.get.chain((function(x) {
        return Instance.put((x + 1))
            .chain((function() {
                return Instance.of(x);
            }));
    }))));
    return Instance;
}));
(UniqueT.runUniqueT = (function(m, initial) {
    return StateT.evalStateT(m, (initial || 1));
}));
(module.exports = UniqueT);