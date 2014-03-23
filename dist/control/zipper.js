/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zipper.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/trans/state", "akh/state", "akh/trans/identity", "neith/zipper", "neith/tree"], (
    function(require, exports, StateT, State, IdentityT, zipper, tree) {
        "use strict";
        var Zipper, ZipperT = (function(m) {
                var Instance = StateT(m);
                (Instance.move = Instance.modifyState);
                (Instance.move = Instance.modifyState);
                return Instance;
            });
        (Zipper = IdentityT(State));
        (Zipper.extract = Zipper.lift(State.get));
        (Zipper.move = (function(op) {
            return Zipper.lift(State.modify(op));
        }));
        (Zipper.up = Zipper.move(zipper.up));
        (Zipper.down = Zipper.move(zipper.down));
        (Zipper.left = Zipper.move(zipper.left));
        (Zipper.right = Zipper.move(zipper.right));
        (Zipper.modifyNode = (function(f) {
            return Zipper.move(tree.modifyNode.bind(null, f));
        }));
        (Zipper.setNode = (function(x) {
            return Zipper.move(tree.setNode.bind(null, x));
        }));
        (Zipper.run = (function(m, ctx) {
            return State.evalState(IdentityT.runIdentityT(m), ctx);
        }));
        return Zipper;
    }));