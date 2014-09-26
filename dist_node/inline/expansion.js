/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/expansion.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    __o = require("../ast"),
    getExpansion, isExpansion, getExpansionDepth, getExpansionValue, setExpansion, deleteExpansion, canExpand,
        markExpansion, incrementCount, mergeExpansions, expandNode, getUd = __o["getUd"],
    setUd = __o["setUd"],
    Expansion = record.declare(null, ["count", "value"]);
(getExpansion = getUd.bind(null, "expand"));
(isExpansion = getExpansion);
(getExpansionDepth = (function(node) {
    var exp = getExpansion(node);
    return (exp ? exp.count : 0);
}));
(getExpansionValue = (function(z) {
    var y = getExpansion(z);
    return (y && y.value);
}));
(setExpansion = setUd.bind(null, "expand"));
(deleteExpansion = setExpansion.bind(null, null));
(canExpand = (function(node) {
    return (getExpansion(node) && (getExpansionValue(node) < 1));
}));
(markExpansion = (function(node, count, value) {
    var exp;
    return (getExpansion(value) ? setExpansion(getExpansion(value), node) : setExpansion(Expansion.create(Math.max(
        count, ((exp = getExpansion(node)), (exp ? exp.count : 0))), value), node));
}));
(mergeExpansions = (function(val, other) {
    var exp, exp0;
    return ((getExpansion(other) && getExpansion(val)) ? setExpansion(Expansion.create(Math.max(((exp =
            getExpansion(val)), (exp ? exp.count : 0)), ((exp0 = getExpansion(other)), (exp0 ? exp0
            .count : 0))), getExpansion(val)
        .value), val) : val);
}));
(incrementCount = (function(node, count, value) {
    var exp, count0 = ((((exp = getExpansion(node)), (exp ? exp.count : 0)) || count) + 1),
        exp0;
    return (getExpansion(value) ? setExpansion(getExpansion(value), node) : setExpansion(Expansion.create(Math.max(
        count0, ((exp0 = getExpansion(node)), (exp0 ? exp0.count : 0))), value), node));
}));
(expandNode = (function(node) {
    return (getExpansion(node) ? ((getExpansion(node) && (getExpansionValue(node) < 1)) ? getExpansionValue(
        node) : deleteExpansion(node)) : node);
}));
(exports["getExpansion"] = getExpansion);
(exports["isExpansion"] = isExpansion);
(exports["getExpansionDepth"] = getExpansionDepth);
(exports["getExpansionValue"] = getExpansionValue);
(exports["setExpansion"] = setExpansion);
(exports["deleteExpansion"] = deleteExpansion);
(exports["canExpand"] = canExpand);
(exports["markExpansion"] = markExpansion);
(exports["incrementCount"] = incrementCount);
(exports["mergeExpansions"] = mergeExpansions);
(exports["expandNode"] = expandNode);