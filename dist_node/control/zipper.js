/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/zipper.kep'
 * DO NOT EDIT
*/
"use strict";
var StateT = require("akh")["trans"]["state"],
    State = require("akh")["state"],
    IdentityT = require("akh")["trans"]["identity"],
    zipper = require("neith")["zipper"],
    tree = require("neith")["tree"],
    Zipper;
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
(module.exports = Zipper);