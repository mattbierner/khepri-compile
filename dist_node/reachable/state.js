/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/state.kep'
 * DO NOT EDIT
*/
"use strict";
var hamt = require("hamt"),
    empty, addReference, getCount, isReachable;
(empty = hamt.empty);
var inc = (function(x) {
    return ((x + 1) || 1);
});
(addReference = (function(uid, s) {
    return hamt.modify(uid, inc, s);
}));
(getCount = (function(uid, s) {
    return (hamt.get(uid, s) || 0);
}));
(isReachable = getCount);
(exports["empty"] = empty);
(exports["addReference"] = addReference);
(exports["getCount"] = getCount);
(exports["isReachable"] = isReachable);