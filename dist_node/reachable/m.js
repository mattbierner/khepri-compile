/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/m.kep'
 * DO NOT EDIT
*/
"use strict";
var Identity = require("akh")["identity"],
    StateT = require("akh")["trans"]["state"],
    state = require("./state"),
    Reachable, ReachableMonad = (function(Instance) {
        (Instance.addReference = (function(uid) {
            return (uid ? Instance.modify(state.addReference.bind(null, uid)) : Instance.of(null));
        }));
        (Instance.isReachable = (function(uid) {
            return Instance.get.map(state.isReachable.bind(null, uid));
        }));
        return Instance;
    });
(Reachable = ReachableMonad(StateT(Identity)));
(module.exports = Reachable);