/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/rename.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast-zipper", "neith/walk", "neith/tree", "khepri-ast/node", "../ast"], (function(
    require, exports, __o, __o0, tree, __o1, __o2) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        preWalk = __o0["preWalk"],
        setData = __o1["setData"],
        type = __o2["type"],
        getUid = __o2["getUid"],
        rename, incCount, updateClosure = (function(node, prefix, list) {
            var closure = ((node.ud && node.ud.closure) || []),
                closure0 = closure.map((function(x) {
                    return ((list.indexOf(x) >= 0) ? ((prefix + "-") + x) : x);
                }));
            return setData(node, "closure", closure0);
        });
    (rename = (function(prefix, list, root) {
        return tree.node(preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return ((uid && (list.indexOf(uid) >= 0)) ? tree.setNode(setData(node, "uid", (
                (prefix + "-") + uid)), ctx) : ((type(node) === "FunctionExpression") ?
                tree.setNode(updateClosure(node, prefix, list), ctx) : ctx));
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
}));