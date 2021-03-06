/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ast.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node"], (function(require, exports, __o) {
    "use strict";
    var type, isIdentifier, isOperator, isSymbol, isLiteral, isString, isNumberish, isPrimitive, isSimple,
            isPod, isTruthy, isBlockFunction, isLambda, isLambdaWithoutArgs, tryGetUd, getUd, setUd, modify,
            getUid, setUid, getLocals, setLocals, getClosure, setClosure, setData = __o["setData"],
        modifyAstNode = __o["modify"];
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
        return (isIdentifier(node) || (((type(node) === "UnaryOperator") || (type(node) ===
            "BinaryOperator")) || (type(node) === "TernaryOperator")));
    }));
    (isLiteral = (function(z) {
        var y = type(z);
        return ("Literal" === y);
    }));
    (isString = (function(node) {
        return (isLiteral(node) && (node.kind === "string"));
    }));
    (isNumberish = (function(node) {
        return (isPrimitive(node) && (!isNaN(node.value)));
    }));
    (isPrimitive = (function(node) {
        return (isLiteral(node) && ((((node.kind === "string") || (node.kind === "number")) || (node.kind ===
            "boolean")) || (node.kind === "null")));
    }));
    (isSimple = (function(node) {
        return ((isLiteral(node) || (type(node) === "ArrayExpression")) || (type(type) ===
            "ObjectExpression"));
    }));
    (isPod = (function(node) {
        var y;
        return (((isPrimitive(node) || (type(node) === "ArrayExpression")) && (node.elements.every(
            isPod) || (type(type) === "ObjectExpression"))) && node.elements.every(((y = isPod), (
            function(z) {
                return y(z.value);
            }))));
    }));
    (isTruthy = (function(node) {
        return (isPrimitive(node) && (!(!node.value)));
    }));
    (isBlockFunction = (function(node) {
        return ((type(node) === "FunctionExpression") && (((type(node.body) === "BlockStatement") || (
            type(node.body) === "WithStatement")) || (type(node.body) === "TryStatement")));
    }));
    (isLambda = (function(node) {
        return ((((type(node) === "FunctionExpression") && (!node.id)) && (!isBlockFunction(node))) &&
            (!node.params.self));
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
    (modify = (function(f, node) {
        return modifyAstNode(node, f);
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
    var def0 = [];
    (getClosure = (function(node) {
        return (((node && node.ud) && node.ud.hasOwnProperty("closure")) ? node.ud["closure"] : def0);
    }));
    (setClosure = (function(value, node) {
        return setData(node, "closure", value);
    }));
    (exports["type"] = type);
    (exports["isIdentifier"] = isIdentifier);
    (exports["isOperator"] = isOperator);
    (exports["isSymbol"] = isSymbol);
    (exports["isLiteral"] = isLiteral);
    (exports["isString"] = isString);
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
    (exports["modify"] = modify);
    (exports["getUid"] = getUid);
    (exports["setUid"] = setUid);
    (exports["getLocals"] = getLocals);
    (exports["setLocals"] = setLocals);
    (exports["getClosure"] = getClosure);
    (exports["setClosure"] = setClosure);
}));