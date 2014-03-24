/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/unique.kep'
 * DO NOT EDIT
*/
"use strict";
var Identity = require("akh")["identity"],
    UniqueT = require("./uniquet"),
    Unique;
(Unique = UniqueT(Identity));
(Unique.runUnique = (function(m, initial) {
    return Identity.runIdentity(UniqueT.runUniqueT(m, (initial || 1)));
}));
(module.exports = Unique);