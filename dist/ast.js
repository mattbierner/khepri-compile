/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/ast.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var type, isIdentifier, isLiteral, isNumberish, isPrimitive, isSimple, isPod, isTruthy, isBlockFunction,
            isLambda, getUd, getUid;
    (type = (function(node) {
        return (node && node.type);
    }));
    (isIdentifier = (function(node) {
        return (type(node) === "Identifier");
    }));
    (isLiteral = (function(node) {
        return (type(node) === "Literal");
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
        return ((type(node) === "FunctionExpression") && (type(node.body) === "BlockStatement"));
    }));
    (isLambda = (function(node) {
        return (((((type(node) === "FunctionExpression") && (!node.id)) && (!isBlockFunction(node))) &&
            (!node.params.self)) && (!node.params.id));
    }));
    (getUd = (function(name, node) {
        return ((node && node.ud) && node.ud[name]);
    }));
    (getUid = getUd.bind(null, "uid"));
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
    (exports["getUd"] = getUd);
    (exports["getUid"] = getUid);
}));