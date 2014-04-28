/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/expansion.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast")["node"],
    setData = __o["setData"],
    __o0 = require("../ast"),
    getUid = __o0["getUid"],
    getUd = __o0["getUd"],
    markExpansion, getExpansion, isExpansion, expandNode;
(getExpansion = getUd.bind(null, "expand"));
(isExpansion = getExpansion);
(markExpansion = (function(node, count, target) {
    var expansion = ({
        "count": count,
        "value": target
    });
    return setData(node, "expand", expansion);
}));
(expandNode = (function(node) {
    var exp;
    return (getExpansion(node) ? ((exp = getExpansion(node)), ((exp.count < 1) ? exp.value : setData(node,
        "expand", null))) : node);
}));
(exports["markExpansion"] = markExpansion);
(exports["getExpansion"] = getExpansion);
(exports["isExpansion"] = isExpansion);
(exports["expandNode"] = expandNode);