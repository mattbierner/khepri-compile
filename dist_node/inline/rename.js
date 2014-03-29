/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/rename.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("neith")["walk"],
    preWalk = __o0["preWalk"],
    tree = require("neith")["tree"],
    __o1 = require("khepri-ast")["node"],
    setData = __o1["setData"],
    __o2 = require("../ast"),
    getUid = __o2["getUid"],
    rename;
(rename = (function(prefix, list, root) {
    return tree.node(preWalk((function(ctx) {
        var node = tree.node(ctx),
            uid = getUid(node);
        return ((list.indexOf(uid) >= 0) ? tree.setNode(setData(node, "uid", ((prefix + "-") + uid)),
            ctx) : ctx);
    }), khepriZipper(root)));
}));
(module.exports = rename);