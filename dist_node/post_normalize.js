/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/post_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("khepri-ast")["node"],
    modify = __o0["modify"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o1 = require("./ast"),
    isBlockFunction = __o1["isBlockFunction"],
    __o2 = require("./fun"),
    concat = __o2["concat"],
    flattenr = __o2["flattenr"],
    filter = __o2["filter"],
    map = __o2["map"],
    __o3 = require("./unpack"),
    innerPattern = __o3["innerPattern"],
    unpackParameters = __o3["unpackParameters"],
    __o4 = require("./builtin"),
    builtins = __o4["builtins"],
    definitions = __o4["definitions"],
    __o5 = require("./rewriter"),
    UP = __o5["UP"],
    DOWN = __o5["DOWN"],
    Rewriter = __o5["Rewriter"],
    rewrite = __o5["rewrite"],
    normalize, expandBinding, always = (function(_) {
        return true;
    }),
    peepholes = new(Rewriter)();
peepholes.add(["LetExpression", "WithStatement"], UP, always, ((expandBinding = (function(binding) {
    return innerPattern(binding.value, binding.pattern, binding.recursive);
})), (function(node) {
    return modify(node, ({
        "bindings": flattenr(map(expandBinding, node.bindings))
    }), ({}));
})));
peepholes.add("FunctionExpression", UP, always, (function(node) {
    var params = map((function(x) {
        switch (x.type) {
            case "IdentifierPattern":
                return x;
            case "AsPattern":
                return x.id;
            default:
                return x.ud.id;
        }
    }), filter((function(x) {
        return (x.type !== "EllipsisPattern");
    }), node.params.elements)),
        bindings = unpackParameters(node.params.elements),
        body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement.create(
            null, bindings, node.body)]) : ast_expression.LetExpression.create(null, bindings, node.body));
    return ast_expression.FunctionExpression.create(node.loc, node.id, ast_pattern.ArgumentsPattern.create(null,
        node.params.id, params, node.params.self), body);
}));
var expandAssignment = (function(node) {
    var right;
    return ((node.right.type === "AssignmentExpression") ? ((right = expandAssignment(node.right)), concat(right,
        ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right.length - 1)].left))) : [
        node
    ]);
});
peepholes.add("ExpressionStatement", UP, (function(__o6) {
    var expression = __o6["expression"];
    return (expression.type === "AssignmentExpression");
}), (function(node) {
    var node0, right;
    return ast_statement.BlockStatement.create(null, map(ast_statement.ExpressionStatement.create.bind(null,
        null), flattenr(((node0 = node.expression), ((node0.right.type === "AssignmentExpression") ? ((
        right = expandAssignment(node0.right)), concat(right, ast_expression.AssignmentExpression
        .create(null, "=", node0.left, right[(right.length - 1)].left))) : [node0])))));
}));
peepholes.add("BinaryExpression", UP, (function(node) {
    return (node.operator === "|>");
}), (function(__o6) {
    var left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(null, right, [left]);
}));
peepholes.add("BinaryExpression", UP, (function(node) {
    return (node.operator === "<|");
}), (function(__o6) {
    var left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(null, left, [right]);
}));
peepholes.add("BinaryExpression", UP, (function(node) {
    return ((((node.operator === "\\>") || (node.operator === "\\>>")) || (node.operator === "<\\")) || (node.operator ===
        "<<\\"));
}), (function(__o6) {
    var operator = __o6["operator"],
        left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(null, definitions[operator], [left, right]);
}));
var x = khepriZipper,
    y = rewrite.bind(null, peepholes);
(normalize = (function(x0) {
    return y(x(x0));
}));
(exports["normalize"] = normalize);