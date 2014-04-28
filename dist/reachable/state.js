/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable/state.kep'
 * DO NOT EDIT
*/define(["require", "exports", "hamt"], (function(require, exports, hamt) {
    "use strict";
    var empty, addReference, getCount, isReachable;
    (empty = hamt.empty);
    var inc = (function(x) {
        return ((x + 1) || 1);
    });
    (addReference = (function(uid, bindings) {
        return hamt.modify(uid, inc, bindings);
    }));
    (getCount = (function(uid, bindings) {
        return (hamt.get(uid, bindings) || 0);
    }));
    (isReachable = getCount);
    (exports["empty"] = empty);
    (exports["addReference"] = addReference);
    (exports["getCount"] = getCount);
    (exports["isReachable"] = isReachable);
}));