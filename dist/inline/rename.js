/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/rename.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast-zipper", "neith/walk", "neith/tree", "khepri-ast/node", "../fun", "../ast",
    "./expansion"
], (function(require, exports, __o, __o0, tree, __o1, __o2, __o3, __o4) {
    "use strict";
    var getLocals, rename, incCount, khepriZipper = __o["khepriZipper"],
        preWalk = __o0["preWalk"],
        setData = __o1["setData"],
        modify = __o1["modify"],
        contains = __o2["contains"],
        type = __o3["type"],
        tryGetUd = __o3["tryGetUd"],
        getUid = __o3["getUid"],
        setUid = __o3["setUid"],
        incrementCount = __o4["incrementCount"];
    (getLocals = (function(node, prefix) {
        return tryGetUd([], "locals", node)
            .map((function(uid) {
                return ((prefix + "-") + uid);
            }));
    }));
    var updateClosure = (function(node, prefix, list) {
        var closure = tryGetUd([], "locals", node),
            closure0 = closure.map((function(x) {
                return (contains(list, x) ? ((prefix + "-") + x) : x);
            }));
        return setData(node, "locals", closure0);
    });
    (rename = (function(prefix, list, root) {
        return tree.node(preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return (contains(list, uid) ? tree.setNode(setUid(((prefix + "-") + uid), node),
                ctx) : ((type(node) === "FunctionExpression") ? tree.setNode(
                updateClosure(node, prefix, list), ctx) : ((type(node) ===
                "CheckedMemberExpression") ? tree.setNode(modify(node, ({
                "id": rename(prefix, list, tree.node(khepriZipper(
                    node.id)))
            })), ctx) : ctx)));
        }), khepriZipper(root)));
    }));
    (incCount = (function(target, count, value, root) {
        return tree.node(preWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return ((node && (target === uid)) ? tree.setNode(incrementCount(node, count,
                value), ctx) : ctx);
        }), khepriZipper(root)));
    }));
    (exports["getLocals"] = getLocals);
    (exports["rename"] = rename);
    (exports["incCount"] = incCount);
}));