/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/state.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "hamt", "bes/record", "../ast"], (function(require, exports, hamt, record, __o) {
    "use strict";
    var empty, addReference, getCount, isReachable, getUd = __o["getUd"],
        getUid = __o["getUid"],
        isUserDefined = getUd.bind(null, "userDefined"),
        State = record.declare(null, ["references", "prune"]);
    (empty = State.create(hamt.empty, false));
    var inc = (function(x) {
        return ((x + 1) || 1);
    });
    (addReference = (function(uid, s) {
        return s.setReferences(hamt.modify(uid, inc, s.references));
    }));
    (getCount = (function(uid, s) {
        return (hamt.get(uid, s.references) || 0);
    }));
    (isReachable = (function(id, s) {
        var uid;
        return (((uid = getUid(id)), (hamt.get(uid, s.references) || 0)) || ((!s.prune) &&
            isUserDefined(id)));
    }));
    (exports["empty"] = empty);
    (exports["addReference"] = addReference);
    (exports["getCount"] = getCount);
    (exports["isReachable"] = isReachable);
}));