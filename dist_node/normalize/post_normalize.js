/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/normalize/post_normalize.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    ast_expression = require("khepri-ast")["expression"],
    ast_statement = require("khepri-ast")["statement"],
    ast_value = require("khepri-ast")["value"],
    __o0 = require("../pseudo/pattern"),
    __o1 = require("../ast"),
    __o2 = require("../fun"),
    __o3 = require("../rewriter"),
    __o4 = require("../user_operator"),
    __o5 = require("./unpack"),
    normalize, modify = __o["modify"],
    setUserData = __o["setUserData"],
    Import = __o0["Import"],
    type = __o1["type"],
    isBlockFunction = __o1["isBlockFunction"],
    setUd = __o1["setUd"],
    getUid = __o1["getUid"],
    concat = __o2["concat"],
    flattenr = __o2["flattenr"],
    map = __o2["map"],
    UP = __o3["UP"],
    DOWN = __o3["DOWN"],
    Rewriter = __o3["Rewriter"],
    rewrite = __o3["rewrite"],
    opToName = __o4["opToName"],
    innerPattern = __o5["innerPattern"],
    unpackParameters = __o5["unpackParameters"],
    getParameterNames = __o5["getParameterNames"],
    x, y, markReserved = setUd.bind(null, "reserved", true),
    peepholes = new(Rewriter)(),
    always = (function(_) {
        return true;
    });
peepholes.add("ImportPattern", UP, always, (function(__o6) {
    var pattern = __o6["pattern"],
        from = __o6["from"],
        value = from["value"],
        __o7 = innerPattern(Import.create(null, value), pattern),
        imp = __o7[0],
        rest = [].slice.call(__o7, 1);
    return concat(markReserved(imp), rest);
}));
peepholes.add("Binding", UP, always, (function(binding) {
    return innerPattern(binding.value, binding.pattern);
}));
peepholes.add(["LetExpression", "WithStatement"], UP, always, (function(node) {
    return modify(node, ({
        bindings: flattenr(node.bindings)
    }));
}));
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
var opToIdentifier = (function(node) {
    return setUserData(ast_value.Identifier.create(node.loc, opToName(node.name)), node.ud);
});
peepholes.add(["UnaryOperator", "BinaryOperator"], DOWN, getUid, opToIdentifier);
peepholes.add("BinaryExpression", DOWN, (function(z) {
    return getUid(z.operator);
}), (function(__o6) {
    var loc = __o6["loc"],
        operator = __o6["operator"],
        left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(loc, setUserData(ast_value.Identifier.create(operator.loc,
        opToName(operator.name)), operator.ud), [left, right]);
}));
peepholes.add(["BinaryExpression", "UnaryExpression"], DOWN, (function(z) {
    var z0 = z.operator,
        x = getUid(z0);
    return (!x);
}), (function(node) {
    var operator = node["operator"];
    return modify(node, ({
        operator: operator.name
    }));
}));
peepholes.add("UnaryExpression", DOWN, (function(z) {
    return getUid(z.operator);
}), (function(__o6) {
    var loc = __o6["loc"],
        operator = __o6["operator"],
        argument = __o6["argument"];
    return ast_expression.CallExpression.create(loc, setUserData(ast_value.Identifier.create(operator.loc,
        opToName(operator.name)), operator.ud), [argument]);
}));
var expandAssignment = (function(node) {
    var right;
    return ((type(node.right) === "AssignmentExpression") ? ((right = expandAssignment(node.right)), concat(right,
        ast_expression.AssignmentExpression.create(null, node.left, right[(right.length - 1)].left, node.immutable,
            node.recursive))) : [node]);
});
peepholes.add("ExpressionStatement", UP, (function(z) {
    var z0 = z.expression,
        y = type(z0);
    return ("AssignmentExpression" === y);
}), ((x = map.bind(null, ast_statement.ExpressionStatement.create.bind(null, null))), (y = ast_statement.BlockStatement
    .create.bind(null, null)), (function(z) {
    var right, z0 = z.expression,
        z1 = ((type(z0.right) === "AssignmentExpression") ? ((right = expandAssignment(z0.right)), concat(
            right, ast_expression.AssignmentExpression.create(null, z0.left, right[(right.length -
                1)].left, z0.immutable, z0.recursive))) : [z0]),
        z2 = flattenr(z1);
    return y(x(z2));
})));
peepholes.add("BinaryExpression", UP, (function(z) {
    var y0 = z.operator;
    return ("|>" === y0);
}), (function(__o6) {
    var left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(null, right, [left]);
}));
peepholes.add("BinaryExpression", UP, (function(z) {
    var y0 = z.operator;
    return ("<|" === y0);
}), (function(__o6) {
    var left = __o6["left"],
        right = __o6["right"];
    return ast_expression.CallExpression.create(null, left, [right]);
}));
(normalize = rewrite.bind(null, peepholes));
(exports["normalize"] = normalize);