/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/uniquet.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/trans/state"], (function(require, exports, StateT) {
    "use strict";
    var UniqueT;
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
    return UniqueT;
}));