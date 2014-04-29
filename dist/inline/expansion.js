/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/expansion.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "khepri-ast/node", "../ast"], (function(require, exports, record, __o, __o0) {
    "use strict";
    var setData = __o["setData"],
        getUid = __o0["getUid"],
        getUd = __o0["getUd"],
        markExpansion, incrementCount, getExpansion, isExpansion, expandNode, Expansion = record.declare(null, [
            "count", "value"
        ]);
    (getExpansion = getUd.bind(null, "expand"));
    (isExpansion = getExpansion);
    (markExpansion = (function(node, count, value) {
        var expansion = Expansion.create(count, value);
        return setData(node, "expand", expansion);
    }));
    (incrementCount = (function(node, count, value) {
        var exp = getExpansion(node),
            count0 = (((exp && exp.count) || count) + 1),
            expansion = Expansion.create(count0, value);
        return setData(node, "expand", expansion);
    }));
    (expandNode = (function(node) {
        var exp;
        return (getExpansion(node) ? ((exp = getExpansion(node)), ((exp.count < 1) ? exp.value :
            setData(node, "expand", null))) : node);
    }));
    (exports["markExpansion"] = markExpansion);
    (exports["incrementCount"] = incrementCount);
    (exports["getExpansion"] = getExpansion);
    (exports["isExpansion"] = isExpansion);
    (exports["expandNode"] = expandNode);
}));