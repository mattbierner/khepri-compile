/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/rename.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast-zipper", "neith/walk", "neith/tree", "khepri-ast/node", "../fun", "../ast",
    "./closure", "./expansion"
], (function(require, exports, __o, __o0, tree, __o1, __o2, __o3, __o4, __o5) {
    "use strict";
    var rename, incCount, getLocals, khepriZipper = __o["khepriZipper"],
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
        return tree.node(preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return (contains(list, uid) ? tree.setNode(setUid(((prefix + "-") + uid), node),
                ctx) : ((type(node) === "FunctionExpression") ? tree.setNode(
                prefixClosure(node, prefix, list), ctx) : ctx));
        }), khepriZipper(root)));
    }));
    (incCount = (function(target, count, value, root) {
        return tree.node(preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return ((target === uid) ? tree.setNode(incrementCount(node, count, value), ctx) :
                ctx);
        }), khepriZipper(root)));
    }));
    (exports["rename"] = rename);
    (exports["incCount"] = incCount);
    (exports["getLocals"] = getLocals);
}));