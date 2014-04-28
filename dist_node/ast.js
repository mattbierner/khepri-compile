/*
 * THIS FILE IS AUTO GENERATED from 'lib/ast.kep'
 * DO NOT EDIT
*/"use strict";
var type, isIdentifier, isLiteral, isNumberish, isPrimitive, isSimple, isPod, isTruthy, isBlockFunction, isLambda,
        isLambdaWithoutArgs, getUd, getUid;
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
    return (((isPrimitive(node) || ((node && node.type) === "ArrayExpression")) && (node.elements.every(isPod) ||
        ((type && type.type) === "ObjectExpression"))) && node.elements.every((function(x) {
        return isPod(x.value);
    })));
}));
(isTruthy = (function(node) {
    return (isPrimitive(node) && (!(!node.value)));
}));
(isBlockFunction = (function(node) {
    var node0;
    return (((node && node.type) === "FunctionExpression") && (((node0 = node.body), (node0 && node0.type)) ===
        "BlockStatement"));
}));
(isLambda = (function(node) {
    return (((((node && node.type) === "FunctionExpression") && (!node.id)) && (!isBlockFunction(node))) && (!
        node.params.self));
}));
(isLambdaWithoutArgs = (function(node) {
    return ((isLambda(node) && (!node.params.id)) && (!(node.params.ud && node.params.ud.arguments)));
}));
(getUd = (function(name, node) {
    return ((node && node.ud) && node.ud[name]);
}));
(getUid = (function(node) {
    return ((node && node.ud) && node.ud["uid"]);
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
(exports["getUd"] = getUd);
(exports["getUid"] = getUid);