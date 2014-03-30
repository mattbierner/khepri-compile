/*
 * THIS FILE IS AUTO GENERATED from 'lib/ast.kep'
 * DO NOT EDIT
*/define(["require", "exports"], (function(require, exports) {
    "use strict";
    var isLiteral, isNumberish, isPrimitive, isSimple, isPod, isTruthy, isBlockFunction, isLambda, getUd,
            getUid;
    (isLiteral = (function(node) {
        return (node.type === "Literal");
    }));
    (isNumberish = (function(node) {
        return (isPrimitive(node) && (!isNaN(node.value)));
    }));
    (isPrimitive = (function(node) {
        return (isLiteral(node) && ((((node.kind === "string") || (node.kind === "number")) || (node.kind ===
            "boolean")) || (node.kind === "null")));
    }));
    (isSimple = (function(node) {
        return ((isLiteral(node) || (node.type === "ArrayExpression")) || (node.type ===
            "ObjectExpression"));
    }));
    (isPod = (function(node) {
        return (((isPrimitive(node) || (node.type === "ArrayExpression")) && (node.elements.every(isPod) ||
            (node.type === "ObjectExpression"))) && node.elements.every((function(x) {
            return isPod(x.value);
        })));
    }));
    (isTruthy = (function(node) {
        return (isPrimitive(node) && (!(!node.value)));
    }));
    (isBlockFunction = (function(node) {
        return ((node.type === "FunctionExpression") && (node.body.type === "BlockStatement"));
    }));
    (isLambda = (function(node) {
        return (((((node.type === "FunctionExpression") && (!node.id)) && (!isBlockFunction(node))) &&
            (!node.params.self)) && (!node.params.id));
    }));
    (getUd = (function(name, node) {
        return ((node && node.ud) && node.ud[name]);
    }));
    (getUid = getUd.bind(null, "uid"));
    (exports["isLiteral"] = isLiteral);
    (exports["isNumberish"] = isNumberish);
    (exports["isPrimitive"] = isPrimitive);
    (exports["isSimple"] = isSimple);
    (exports["isPod"] = isPod);
    (exports["isTruthy"] = isTruthy);
    (exports["isBlockFunction"] = isBlockFunction);
    (exports["isLambda"] = isLambda);
    (exports["getUd"] = getUd);
    (exports["getUid"] = getUid);
}));