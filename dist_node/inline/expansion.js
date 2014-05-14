/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/expansion.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    __o = require("khepri-ast")["node"],
    __o0 = require("../ast"),
    markExpansion, incrementCount, getExpansion, isExpansion, expandNode, setData = __o["setData"],
    getUd = __o0["getUd"],
    Expansion = record.declare(null, ["count", "value"]);
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
    return (getExpansion(node) ? ((exp = getExpansion(node)), ((exp.count < 1) ? exp.value : setData(node,
        "expand", null))) : node);
}));
(exports["markExpansion"] = markExpansion);
(exports["incrementCount"] = incrementCount);
(exports["getExpansion"] = getExpansion);
(exports["isExpansion"] = isExpansion);
(exports["expandNode"] = expandNode);