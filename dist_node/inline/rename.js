/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/rename.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast-zipper"),
    __o0 = require("neith")["walk"],
    tree = require("neith")["tree"],
    __o1 = require("khepri-ast")["node"],
    __o2 = require("../fun"),
    __o3 = require("../ast"),
    __o4 = require("./closure"),
    __o5 = require("./expansion"),
    rename, incCount, getLocals, khepriZipper = __o["khepriZipper"],
    preWalk = __o0["preWalk"],
    contains = __o2["contains"],
    type = __o3["type"],
    getUid = __o3["getUid"],
    setUid = __o3["setUid"],
    getNodeLocals = __o3["getLocals"],
    updateClosure = __o4["updateClosure"],
    incrementCount = __o5["incrementCount"],
    prefixClosure = (function(node, prefix, list) {
        return updateClosure((function(uid) {
            return ((prefix + "-") + uid);
        }), node, list);
    });
(getLocals = (function(node, prefix) {
    return getNodeLocals(node)
        .map((function(uid) {
            return ((prefix + "-") + uid);
        }));
}));
(rename = (function(prefix, list, root) {
    var x = tree.node,
        y = preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return (contains(list, uid) ? tree.setNode(setUid(((prefix + "-") + uid), node), ctx) : ((
                type(node) === "FunctionExpression") ? tree.setNode(prefixClosure(node, prefix,
                list), ctx) : ctx));
        }), khepriZipper(root));
    return x(y);
}));
(incCount = (function(target, count, value, root) {
    var x = tree.node,
        y = preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return ((target === uid) ? tree.setNode(incrementCount(node, count, value), ctx) : ctx);
        }), khepriZipper(root));
    return x(y);
}));
(exports["rename"] = rename);
(exports["incCount"] = incCount);
(exports["getLocals"] = getLocals);