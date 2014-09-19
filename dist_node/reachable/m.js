/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/m.kep'
 * DO NOT EDIT
*/
"use strict";
var StateM = require("akh")["state"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    ReachableMonad, runReachable;
(ReachableMonad = TreeZipperT(StateM));
(runReachable = (function(state, c, ctx) {
    return StateM.evalState(TreeZipperT.runTreeZipperT(c, ctx), state);
}));
(exports["ReachableMonad"] = ReachableMonad);
(exports["runReachable"] = runReachable);