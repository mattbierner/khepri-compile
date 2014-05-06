/*
 * THIS FILE IS AUTO GENERATED from 'lib/builtin.kep'
 * DO NOT EDIT
*/"use strict";
var ast_pattern = require("khepri-ast")["pattern"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    __o = require("./ast"),
    __o0 = require("./fun"),
    builtins, definitions, member, setUd = __o["setUd"],
    getUid = __o["getUid"],
    setUid = __o["setUid"],
    flip = __o0["flip"],
    identifier = (function(name, uid) {
        return setUid(uid, ast_value.Identifier.create(null, name));
    }),
    unique = (function() {
        var x = 0;
        return (function() {
            (x = (x + 1));
            return x;
        });
    })();
(definitions = ({}));
(builtins = ({}));
var addSymbol = (function(name, id, def) {
    (builtins[name] = id);
    (definitions[name] = def);
}),
    registerAliasedSymbol = (function(name, alias, def) {
        addSymbol(name, identifier(alias, unique()), def);
    }),
    uid = unique();
(builtins["require"] = setUid(uid, ast_value.Identifier.create(null, "require")));
var uid0 = unique();
(builtins["exports"] = setUid(uid0, ast_value.Identifier.create(null, "exports")));
var uid1 = unique();
(builtins["module"] = setUid(uid1, ast_value.Identifier.create(null, "module")));
var uid2 = unique();
(builtins["undefined"] = setUid(uid2, ast_value.Identifier.create(null, "undefined")));
var uid3, uid5, xArg0, uid6, yArg, node0, locals, uid4, xArg, node, locals0;
[
    ["typeof", "__typeof"],
    ["void", "__void"],
    ["~", "__bnot"],
    ["!", "__lnot"],
    ["++", "__plus"],
    ["--", "__minus"]
].forEach((function(__o1) {
    var op = __o1[0],
        name = __o1[1],
        xArg, node, locals;
    registerAliasedSymbol(op, name, ((xArg = identifier("x", unique())), (node = ast_expression.FunctionExpression
        .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
            .create(null, xArg)
        ]), ast_expression.UnaryExpression.create(null, op, xArg))), (locals = [getUid(xArg)]), setUd(
        "locals", locals, node)));
}));
addSymbol("_", ((uid3 = unique()), setUid(uid3, ast_value.Identifier.create(null, "_"))), ((uid4 = unique()), (xArg =
    setUid(uid4, ast_value.Identifier.create(null, "x"))), (node = ast_expression.FunctionExpression.create(
    null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(null,
        xArg)]), ((uid5 = unique()), (xArg0 = setUid(uid5, ast_value.Identifier.create(null, "x"))), (uid6 =
        unique()), (yArg = setUid(uid6, ast_value.Identifier.create(null, "y"))), (node0 =
        ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
            null, [ast_pattern.IdentifierPattern.create(null, xArg0), ast_pattern.IdentifierPattern
                .create(null, yArg)
            ]), ast_expression.CallExpression.create(null, xArg, [yArg, xArg0]))), (locals = [getUid(
        xArg0), getUid(yArg)]), setUd("locals", locals, node0)))), (locals0 = [getUid(xArg)]), setUd("locals",
    locals0, node)));
var uid7 = unique(),
    xArg1 = setUid(uid7, ast_value.Identifier.create(null, "x")),
    uid8 = unique(),
    yArg0 = setUid(uid8, ast_value.Identifier.create(null, "y")),
    uid9 = unique(),
    zArg = setUid(uid9, ast_value.Identifier.create(null, "z")),
    node1 = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
        ast_pattern.IdentifierPattern.create(null, xArg1), ast_pattern.IdentifierPattern.create(null, yArg0),
        ast_pattern.IdentifierPattern.create(null, zArg)
    ]), ast_expression.ConditionalExpression.create(null, xArg1, yArg0, zArg)),
    locals1 = [getUid(xArg1), getUid(yArg0), getUid(zArg)],
    ternaryOperator = setUd("locals", locals1, node1);
registerAliasedSymbol("?", "__cond", ternaryOperator);
var binary = (function(op) {
    var xArg2 = identifier("x", unique()),
        yArg1 = identifier("y", unique()),
        node2 = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
            ast_pattern.IdentifierPattern.create(null, xArg2), ast_pattern.IdentifierPattern.create(null,
                yArg1)
        ]), op(xArg2, yArg1)),
        locals2 = [getUid(xArg2), getUid(yArg1)];
    return setUd("locals", locals2, node2);
}),
    registerBinary = (function(op, name, impl) {
        registerAliasedSymbol(op, name, binary(impl));
    }),
    binaryOp = (function(op) {
        return (function(x, y) {
            return ast_expression.BinaryExpression.create(null, op, x, y);
        });
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
    ["instanceof", "__instanceof"],
    ["||", "__or"],
    ["&&", "__and"]
].forEach((function(__o1) {
    var op = __o1[0],
        name = __o1[1];
    registerBinary(op, name, binaryOp(op));
}));
registerBinary("new", "__new", (function(x, y) {
    return ast_expression.NewExpression.create(null, x, [y]);
}));
registerBinary(".", "__dot", (function(x, y) {
    return ast_expression.MemberExpression.create(null, x, y, true);
}));
registerBinary("@", "__curry", (function(x, y) {
    return ast_expression.CurryExpression.create(null, x, [y]);
}));
var pipe = (function(callee, arg) {
    return ast_expression.CallExpression.create(null, callee, [arg]);
});
registerBinary("<|", "__pipe", pipe);
registerBinary("|>", "__rpipe", flip(pipe));
var singleCompose = (function(f, g) {
    var x = identifier("z", unique()),
        node2 = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [
            ast_pattern.IdentifierPattern.create(null, x)
        ]), ast_expression.CallExpression.create(null, f, [ast_expression.CallExpression.create(null, g, [x])])),
        locals2 = [getUid(x)];
    return setUd("locals", locals2, node2);
});
registerBinary("<\\", "__compose", singleCompose);
registerBinary("\\>", "__rcompose", flip(singleCompose));
var multiCompose = (function(f, g) {
    var args = identifier("args", unique()),
        node2 = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
            ast_pattern.IdentifierPattern.create(null, args), [], null), ast_expression.CallExpression.create(
            null, f, [ast_expression.CallExpression.create(null, ast_expression.MemberExpression.create(null, g,
                identifier("apply")), [ast_value.Literal.create(null, "null"), args])])),
        locals2 = [getUid(args)];
    return setUd("locals", locals2, node2);
});
registerBinary("<<\\", "__composen", multiCompose);
registerBinary("\\>>", "__rcomposen", flip(multiCompose));
(member = (function(id, uid10) {
    var xArg2 = identifier("x", uid10),
        node2 = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(null,
            null, [ast_pattern.IdentifierPattern.create(null, xArg2)]), ast_expression.MemberExpression.create(
            null, xArg2, identifier(id), false)),
        locals2 = [getUid(xArg2)];
    return setUd("locals", locals2, node2);
}));
(exports["builtins"] = builtins);
(exports["definitions"] = definitions);
(exports["member"] = member);