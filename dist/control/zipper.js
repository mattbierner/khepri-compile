/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zipper.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/trans/state", "akh/state", "akh/trans/identity", "neith/zipper", "neith/tree"], (
    function(require, exports, StateT, State, IdentityT, zipper, tree) {
        "use strict";
        var Zipper;
        (Zipper = IdentityT(State));
        var lift = Zipper.lift;
        (Zipper.get = lift(State.get));
        (Zipper.put = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(lift, State.put));
        (Zipper.move = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(lift, State.modify));
        (Zipper.extract = Zipper.get.chain(zipper.extract));
        (Zipper.inspect = Zipper.get.map.bind(Zipper.get));
        (Zipper.inspectWith = Zipper.extract.map.bind(Zipper.extract));
        (Zipper.move = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(lift, State.modify));
        (Zipper.up = Zipper.move(zipper.up));
        (Zipper.down = Zipper.move(zipper.down));
        (Zipper.left = Zipper.move(zipper.left));
        (Zipper.right = Zipper.move(zipper.right));
        (Zipper.node = Zipper.inspect(tree.node));
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