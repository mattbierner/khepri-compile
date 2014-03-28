/*
 * THIS FILE IS AUTO GENERATED from 'lib/builtin.kep'
 * DO NOT EDIT
*/"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    builtins, definitions, xArg, yArg, zArg, unique = (function() {
        var x = 0;
        return (function() {
            (x = (x + 1));
            return x;
        });
    })(),
    identifier = (function(loc, name, uid) {
        return setData(ast_value.Identifier.create(loc, name), "uid", uid);
    });
(definitions = ({}));
var addSymbol = (function(name, id, def) {
    (builtins[name] = id);
    (definitions[name] = def);
}),
    registerAliasedSymbol = (function(name, alias, def) {
        addSymbol(name, identifier(null, alias, unique()), def);
    }),
    registerSymbol = (function(name, def) {
        return registerAliasedSymbol(name, name, def);
    });
(builtins = ({
    "require": setData(new(ast_value.Identifier)(null, "require"), "uid", unique()),
    "exports": setData(new(ast_value.Identifier)(null, "exports"), "uid", unique()),
    "module": setData(new(ast_value.Identifier)(null, "module"), "uid", unique())
}));
var unary = (function(op) {
    var xArg = identifier(null, "x", unique());
    return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
        ast_pattern.IdentifierPattern.create(null, xArg)
    ]), op(xArg));
}),
    unaryOp = (function(op) {
        return unary((function(x) {
            return ast_expression.UnaryExpression.create(null, op, x);
        }));
    });
[
    ["typeof", "__typeof"],
    ["void", "__void"],
    ["~", "__bnot"],
    ["!", "__lnot"],
    ["++", "__plus"],
    ["--", "__minus"]
].forEach((function(__o) {
    var op = __o[0],
        name = __o[1];
    registerAliasedSymbol(op, name, unaryOp(op));
}));
var ternaryOperator = ((xArg = identifier(null, "x", unique())), (yArg = identifier(null, "y", unique())), (zArg =
    identifier(null, "z", unique())), ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
    .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern.create(
        null, yArg), ast_pattern.IdentifierPattern.create(null, zArg)]), ast_expression.ConditionalExpression.create(
        null, xArg, yArg, zArg)));
registerAliasedSymbol("?", "__cond", ternaryOperator);
var binary = (function(flipped, op) {
    var xArg = identifier(null, "x", unique()),
        yArg = identifier(null, "y", unique());
    return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
        ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern.create(null, yArg)
    ]), (flipped ? op(yArg, xArg) : op(xArg, yArg)));
}),
    binaryOp = (function(op, flipped) {
        return binary(flipped, (function(x, y) {
            return ast_expression.BinaryExpression.create(null, op, x, y);
        }));
    }),
    logicalOp = (function(op, flipped) {
        return binary(flipped, (function(x, y) {
            return ast_expression.LogicalExpression.create(null, op, x, y);
        }));
    });
[
    ["+", "__add"],
    ["-", "__sub"],
    ["*", "__mul"],
    ["/", "__div"],
    ["%", "__mod"],
    ["<<", "__blas"],
    [">>", "__bras"],
    [">>>", "__brls"],
    ["&", "__band"],
    ["^", "__bxor"],
    ["|", "__bor"],
    ["<", "__lt"],
    [">", "__gt"],
    ["<=", "__lte"],
    [">=", "__gte"],
    ["==", "__eq"],
    ["!=", "__neq"],
    ["===", "__seq"],
    ["!==", "__sneq"],
    ["instanceof", "__instanceof"]
].forEach((function(__o) {
    var op = __o[0],
        name = __o[1];
    registerAliasedSymbol(op, name, binaryOp(op));
    registerAliasedSymbol(("_" + op), (name + "r"), binaryOp(op, true));
}));
[
    ["||", "__or"],
    ["&&", "__and"]
].forEach((function(__o) {
    var op = __o[0],
        name = __o[1];
    registerSymbol(op, logicalOp(op));
    registerSymbol(("_" + op), logicalOp(op, true));
}));
registerAliasedSymbol("new", "__new", binary(false, (function(x, y) {
    return ast_expression.NewExpression.create(null, x, [y]);
})));
registerAliasedSymbol("_new", "__newr", binary(true, (function(x, y) {
    return ast_expression.NewExpression.create(null, x, [y]);
})));
registerAliasedSymbol(".", "__dot", binary(false, (function(x, y) {
    return ast_expression.MemberExpression.create(null, x, y, true);
})));
registerAliasedSymbol("_.", "__dotr", binary(true, (function(x, y) {
    return ast_expression.MemberExpression.create(null, x, y, true);
})));
registerAliasedSymbol("@", "__curry", binary(false, (function(x, y) {
    return ast_expression.CurryExpression.create(null, x, [y]);
})));
registerAliasedSymbol("_@", "__curryr", binary(true, (function(x, y) {
    return ast_expression.CurryExpression.create(null, x, [y]);
})));
var pipe = (function(callee, arg) {
    return ast_expression.CallExpression.create(null, callee, [arg]);
}),
    lPipe = binary(false, pipe),
    rPipe = binary(true, pipe);
registerAliasedSymbol("<|", "__pipe", lPipe);
registerAliasedSymbol("_|>", "__rpiper", lPipe);
registerAliasedSymbol("|>", "__rpipe", rPipe);
registerAliasedSymbol("_<|", "__piper", rPipe);
var singleCompose = (function(f, g) {
    var fo = identifier(null, "f", unique()),
        go = identifier(null, "g", unique()),
        x = identifier(null, "x", unique());
    return ast_expression.CallExpression.create(null, ast_expression.FunctionExpression.create(null, null,
        ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null, fo),
            ast_pattern.IdentifierPattern.create(null, go)
        ]), ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
            ast_pattern.IdentifierPattern.create(null, x)
        ]), ast_expression.CallExpression.create(null, fo, [ast_expression.CallExpression.create(null, go, [
            x
        ])]))), [f, g]);
}),
    multiCompose = (function(f, g) {
        var fo = identifier(null, "f", unique()),
            go = identifier(null, "g", unique());
        return ast_expression.CallExpression.create(null, ast_expression.FunctionExpression.create(null, null,
            ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null, fo),
                ast_pattern.IdentifierPattern.create(null, go)
            ]), ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
                null, []), ast_expression.CallExpression.create(null, fo, [ast_expression.CallExpression.create(
                null, ast_expression.MemberExpression.create(null, go, identifier(null, "apply")), [
                    ast_value.Literal.create(null, "null"), identifier(null, "arguments")
                ])]))), [f, g]);
    }),
    rCompose = binary(false, singleCompose),
    lCompose = binary(true, singleCompose);
registerAliasedSymbol("<\\", "__compose", rCompose);
registerAliasedSymbol("_\\>", "__rcomposer", rCompose);
registerAliasedSymbol("\\>", "__rcompose", lCompose);
registerAliasedSymbol("_<\\", "__composer", lCompose);
var rNCompose = binary(false, multiCompose),
    lNCompose = binary(true, multiCompose);
registerAliasedSymbol("<<\\", "__composen", rNCompose);
registerAliasedSymbol("_\\>>", "__rcomposenr", rNCompose);
registerAliasedSymbol("\\>>", "__rcomposen", lNCompose);
registerAliasedSymbol("_<<\\", "__composenr", lNCompose);
(exports["builtins"] = builtins);
(exports["definitions"] = definitions);