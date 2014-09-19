/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ast.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    type, isIdentifier, isOperator, isSymbol, isLiteral, isNumberish, isPrimitive, isSimple, isPod, isTruthy,
        isBlockFunction, isLambda, isLambdaWithoutArgs, tryGetUd, getUd, setUd, getUid, setUid, getLocals, setLocals,
        setData = __o["setData"];
(type = (function(y) {
    return (y && y.type);
}));
(isIdentifier = (function(z) {
    var y = type(z);
    return ("Identifier" === y);
}));
(isOperator = (function(node) {
    return (((type(node) === "UnaryOperator") || (type(node) === "BinaryOperator")) || (type(node) ===
        "TernaryOperator"));
}));
(isSymbol = (function(node) {
    return (isIdentifier(node) || (((type(node) === "UnaryOperator") || (type(node) === "BinaryOperator")) || (
        type(node) === "TernaryOperator")));
}));
(isLiteral = (function(z) {
    var y = type(z);
    return ("Literal" === y);
}));
(isNumberish = (function(node) {
    return (isPrimitive(node) && (!isNaN(node.value)));
}));
(isPrimitive = (function(node) {
    return (isLiteral(node) && ((((node.kind === "string") || (node.kind === "number")) || (node.kind ===
        "boolean")) || (node.kind === "null")));
}));
(isSimple = (function(node) {
    return ((isLiteral(node) || (type(node) === "ArrayExpression")) || (type(type) === "ObjectExpression"));
}));
(isPod = (function(node) {
    var y;
    return (((isPrimitive(node) || (type(node) === "ArrayExpression")) && (node.elements.every(isPod) || (type(
        type) === "ObjectExpression"))) && node.elements.every(((y = isPod), (function(z) {
        return y(z.value);
    }))));
}));
(isTruthy = (function(node) {
    return (isPrimitive(node) && (!(!node.value)));
}));
(isBlockFunction = (function(node) {
    return ((type(node) === "FunctionExpression") && (((type(node.body) === "BlockStatement") || (type(node.body) ===
        "WithStatement")) || (type(node.body) === "TryStatement")));
}));
(isLambda = (function(node) {
    return ((((type(node) === "FunctionExpression") && (!node.id)) && (!isBlockFunction(node))) && (!node.params
        .self));
}));
(isLambdaWithoutArgs = (function(node) {
    return (isLambda(node) && (!node.params.id));
}));
(tryGetUd = (function(def, key, node) {
    return (((node && node.ud) && node.ud.hasOwnProperty(key)) ? node.ud[key] : def);
}));
(getUd = (function(key, node) {
    return (((node && node.ud) && node.ud.hasOwnProperty(key)) ? node.ud[key] : null);
}));
(setUd = (function(key, value, node) {
    return setData(node, key, value);
}));
(getUid = (function(node) {
    return (((node && node.ud) && node.ud.hasOwnProperty("uid")) ? node.ud["uid"] : null);
}));
(setUid = (function(value, node) {
    return setData(node, "uid", value);
}));
var def = [];
(getLocals = (function(node) {
    return (((node && node.ud) && node.ud.hasOwnProperty("locals")) ? node.ud["locals"] : def);
}));
(setLocals = (function(value, node) {
    return setData(node, "locals", value);
}));
(exports["type"] = type);
(exports["isIdentifier"] = isIdentifier);
(exports["isOperator"] = isOperator);
(exports["isSymbol"] = isSymbol);
(exports["isLiteral"] = isLiteral);
(exports["isNumberish"] = isNumberish);
(exports["isPrimitive"] = isPrimitive);
(exports["isSimple"] = isSimple);
(exports["isPod"] = isPod);
(exports["isTruthy"] = isTruthy);
(exports["isBlockFunction"] = isBlockFunction);
(exports["isLambda"] = isLambda);
(exports["isLambdaWithoutArgs"] = isLambdaWithoutArgs);
(exports["tryGetUd"] = tryGetUd);
(exports["getUd"] = getUd);
(exports["setUd"] = setUd);
(exports["getUid"] = getUid);
(exports["setUid"] = setUid);
(exports["getLocals"] = getLocals);
(exports["setLocals"] = setLocals);