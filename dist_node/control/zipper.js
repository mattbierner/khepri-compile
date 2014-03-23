/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zipper.kep'
 * DO NOT EDIT
*/"use strict";
var StateT = require("akh")["trans"]["state"],
    State = require("akh")["state"],
    IdentityT = require("akh")["trans"]["identity"],
    zipper = require("neith")["zipper"],
    tree = require("neith")["tree"],
    Zipper, ZipperT = (function(m) {
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
(module.exports = Zipper);