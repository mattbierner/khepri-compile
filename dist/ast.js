/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ast.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node"], (function(require, exports, __o) {
    "use strict";
    var setData = __o["setData"],
        type, isIdentifier, isLiteral, isNumberish, isPrimitive, isSimple, isPod, isTruthy, isBlockFunction,
            isLambda, isLambdaWithoutArgs, tryGetUd, getUd, setUd, getUid, setUid;
    (type = (function(node) {
        return (node && node.type);
    }));
    (isIdentifier = (function(z) {
        var y = (z && z.type);
        return ("Identifier" === y);
    }));
    (isLiteral = (function(z) {
        var y = (z && z.type);
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
        return ((isLiteral(node) || ((node && node.type) === "ArrayExpression")) || ((type && type.type) ===
            "ObjectExpression"));
    }));
    (isPod = (function(node) {
        var y;
        return (((isPrimitive(node) || ((node && node.type) === "ArrayExpression")) && (node.elements.every(
            isPod) || ((type && type.type) === "ObjectExpression"))) && node.elements.every(((y =
            isPod), (function(z) {
            return y(z.value);
        }))));
    }));
    (isTruthy = (function(node) {
        return (isPrimitive(node) && (!(!node.value)));
    }));
    (isBlockFunction = (function(node) {
        var node0;
        return (((node && node.type) === "FunctionExpression") && (((node0 = node.body), (node0 &&
            node0.type)) === "BlockStatement"));
    }));
    (isLambda = (function(node) {
        return (((((node && node.type) === "FunctionExpression") && (!node.id)) && (!isBlockFunction(
            node))) && (!node.params.self));
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
    (exports["type"] = type);
    (exports["isIdentifier"] = isIdentifier);
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
}));