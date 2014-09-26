/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/expansion.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "khepri-ast/node", "../ast"], (function(require, exports, record, __o, __o0) {
    "use strict";
    var markExpansion, incrementCount, getExpansion, isExpansion, mergeExpansions, expandNode, setData = __o[
            "setData"],
        getUd = __o0["getUd"],
        Expansion = record.declare(null, ["count", "value"]);
    (getExpansion = getUd.bind(null, "expand"));
    (isExpansion = getExpansion);
    (markExpansion = (function(node, count, value) {
        var expansion, expansion0;
        return (getExpansion(value) ? ((expansion = getExpansion(value)), setData(node, "expand",
            expansion)) : ((expansion0 = Expansion.create(Math.max(count, (getExpansion(node) ?
            getExpansion(node)
            .count : 0)), value)), setData(node, "expand", expansion0)));
    }));
    (mergeExpansions = (function(val, other) {
        var expansion;
        return ((getExpansion(other) && getExpansion(val)) ? ((expansion = Expansion.create(Math.max(
            getExpansion(val)
            .count, getExpansion(other)
            .count))), setData(val, "expand", expansion)) : val);
    }));
    (incrementCount = (function(node, count, value) {
        var exp = getExpansion(node),
            count0 = (((exp && exp.count) || count) + 1),
            expansion, expansion0;
        return (getExpansion(value) ? ((expansion = getExpansion(value)), setData(node, "expand",
            expansion)) : ((expansion0 = Expansion.create(Math.max(count0, (getExpansion(node) ?
            getExpansion(node)
            .count : 0)), value)), setData(node, "expand", expansion0)));
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
    (exports["mergeExpansions"] = mergeExpansions);
    (exports["expandNode"] = expandNode);
}));