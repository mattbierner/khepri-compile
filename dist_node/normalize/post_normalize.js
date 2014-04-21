/*
 * THIS FILE IS AUTO GENERATED from 'lib/normalize/post_normalize.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast")["node"],
    modify = __o["modify"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    __o0 = require("../ast"),
    type = __o0["type"],
    isBlockFunction = __o0["isBlockFunction"],
    __o1 = require("../fun"),
    concat = __o1["concat"],
    flattenr = __o1["flattenr"],
    map = __o1["map"],
    __o2 = require("../inline/unpack"),
    innerPattern = __o2["innerPattern"],
    unpackParameters = __o2["unpackParameters"],
    __o3 = require("../builtin"),
    builtins = __o3["builtins"],
    definitions = __o3["definitions"],
    __o4 = require("../rewriter"),
    UP = __o4["UP"],
    DOWN = __o4["DOWN"],
    Rewriter = __o4["Rewriter"],
    rewrite = __o4["rewrite"],
    normalize, x, y, expandBinding, x0, x1, x2, y0, getParameterNames = ((x = flattenr), (y = map.bind(null, (function(
        x0) {
        switch (type(x0)) {
            case "IdentifierPattern":
                return x0;
            case "AsPattern":
                return x0.id;
            case "SliceUnpack":
            case "RelativeUnpack":
                return [];
            default:
                return x0.ud.id;
        }
    }))), (function(z) {
        return x(y(z));
    })),
    peepholes = new(Rewriter)(),
    always = (function(_) {
        return true;
    });
peepholes.add(["LetExpression", "WithStatement"], UP, always, ((expandBinding = (function(binding) {
    return ((type(binding) === "ImportPattern") ? binding : innerPattern(binding.value, binding.pattern));
})), (function(node) {
    return modify(node, ({
        bindings: flattenr(map(expandBinding, node.bindings))
    }));
})));
peepholes.add("FunctionExpression", UP, always, (function(node) {
    var params = getParameterNames(node.params.elements),
        bindings = unpackParameters(node.params.id, node.params.elements),
        body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement.create(
            null, bindings, node.body)]) : ast_expression.LetExpression.create(null, bindings, node.body));
    return modify(node, ({
        params: modify(node.params, ({
            elements: params
        })),
        body: body
    }));
}));
var expandAssignment = (function(node) {
    var right;
    return ((type(node.right) === "AssignmentExpression") ? ((right = expandAssignment(node.right)), concat(right,
        ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right.length - 1)].left))) : [
        node
    ]);
});
peepholes.add("ExpressionStatement", UP, ((x0 = type), (function(z) {
    var z0 = z.expression,
        y0 = x0(z0);
    return ("AssignmentExpression" === y0);
})), ((x1 = flattenr), (x2 = map.bind(null, ast_statement.ExpressionStatement.create.bind(null, null))), (y0 =
    ast_statement.BlockStatement.create.bind(null, null)), (function(z) {
    var right, z0 = z.expression,
        z1 = ((type(z0.right) === "AssignmentExpression") ? ((right = expandAssignment(z0.right)), concat(
            right, ast_expression.AssignmentExpression.create(null, "=", z0.left, right[(right.length -
                1)].left))) : [z0]),
        z2 = x1(z1);
    return y0(x2(z2));
})));
peepholes.add("BinaryExpression", UP, (function(z) {
    var y1 = z.operator;
    return ("|>" === y1);
}), (function(__o5) {
    var left = __o5["left"],
        right = __o5["right"];
    return ast_expression.CallExpression.create(null, right, [left]);
}));
peepholes.add("BinaryExpression", UP, (function(z) {
    var y1 = z.operator;
    return ("<|" === y1);
}), (function(__o5) {
    var left = __o5["left"],
        right = __o5["right"];
    return ast_expression.CallExpression.create(null, left, [right]);
}));
(normalize = rewrite.bind(null, peepholes));
(exports["normalize"] = normalize);