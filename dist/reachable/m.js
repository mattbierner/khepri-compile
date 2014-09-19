/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/m.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/state", "zipper-m/trans/tree"], (function(require, exports, StateM, TreeZipperT) {
    "use strict";
    var ReachableMonad, runReachable;
    (ReachableMonad = TreeZipperT(StateM));
    (runReachable = (function(state, c, ctx) {
        return StateM.evalState(TreeZipperT.runTreeZipperT(c, ctx), state);
    }));
    (exports["ReachableMonad"] = ReachableMonad);
    (exports["runReachable"] = runReachable);
}));