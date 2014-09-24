/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable/m.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/identity", "akh/trans/state", "./state"], (function(require, exports, Identity,
    StateT, state) {
    "use strict";
    var Reachable, ReachableMonad = (function(Instance) {
            (Instance.addReference = (function(uid) {
                return (uid ? Instance.modify(state.addReference.bind(null, uid)) : Instance.of(
                    null));
            }));
            (Instance.isReachable = (function(uid) {
                return Instance.get.map(state.isReachable.bind(null, uid));
            }));
            return Instance;
        });
    (Reachable = ReachableMonad(StateT(Identity)));
    return Reachable;
}));