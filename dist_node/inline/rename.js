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
    modify = __o1["modify"],
    __o2 = require("../ast"),
    type = __o2["type"],
    getUid = __o2["getUid"],
    rename, incCount;
(rename = (function(prefix, list, root) {
    return tree.node(preWalk((function(ctx) {
        var node = tree.node(ctx),
            uid = getUid(node);
        return ((uid && (list.indexOf(uid) < 0)) ? tree.setNode(setData(node, "uid", ((prefix + "-") +
            uid)), ctx) : ctx);
    }), khepriZipper(root)));
}));
(incCount = (function(target, count, value, root) {
    return tree.node(preWalk((function(ctx) {
        var node = tree.node(ctx),
            uid = getUid(node),
            exp = ((node && node.ud) && node.ud.expand);
        if (((target && node) && (target === uid))) {
            return tree.setNode(setData(node, "expand", ({
                "count": (((exp && exp.count) || count) + 1),
                "value": value
            })), ctx);
        }
        return ctx;
    }), khepriZipper(root)));
}));
(exports["rename"] = rename);
(exports["incCount"] = incCount);