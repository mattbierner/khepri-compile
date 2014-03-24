/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/unique.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/identity", "./uniquet"], (function(require, exports, Identity, UniqueT) {
    "use strict";
    var Unique;
    (Unique = UniqueT(Identity));
    (Unique.runUnique = (function(m, initial) {
        return Identity.runIdentity(UniqueT.runUniqueT(m, (initial || 1)));
    }));
    return Unique;
}));