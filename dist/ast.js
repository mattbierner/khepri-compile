/*
 * THIS FILE IS AUTO GENERATED from 'lib/ast.kep'
 * DO NOT EDIT
*/define(["require", "exports"], (function(require, exports) {
    "use strict";
    var isPrimitive, isSimple, isTruthy, isLambda;
    (isPrimitive = (function(node) {
        return ((node.type === "Literal") && ((((node.kind === "string") || (node.kind === "number")) ||
            (node.kind === "boolean")) || (node.kind === "null")));
    }));
    (isSimple = (function(node) {
        return ((isPrimitive(node) || (node.type === "ArrayExpression")) || (node.type ===
            "ObjectExpression"));
    }));
    (isTruthy = (function(node) {
        return (isPrimitive(node) && (!(!node.value)));
    }));
    (isLambda = (function(node) {
        return ((((node.type === "FunctionExpression") && (node.body.type !== "BlockStatement")) && (!
            node.params.self)) && (!node.params.id));
    }));
    (exports["isPrimitive"] = isPrimitive);
    (exports["isSimple"] = isSimple);
    (exports["isTruthy"] = isTruthy);
    (exports["isLambda"] = isLambda);
}));