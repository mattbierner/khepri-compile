/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/builtin.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/expression", "khepri-ast/value",
    "./ast"
], (function(require, exports, ast_node, ast_pattern, ast_expression, ast_value, __o) {
    "use strict";
    var setData = ast_node["setData"],
        setUserData = ast_node["setUserData"],
        getUid = __o["getUid"],
        builtins, definitions, member, unique = (function() {
            var x = 0;
            return (function() {
                (x = (x + 1));
                return x;
            });
        })(),
        identifier = (function(name, uid) {
            return setData(ast_value.Identifier.create(null, name), "uid", uid);
        });
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
    (builtins["require"] = setData(ast_value.Identifier.create(null, "require"), "uid", uid));
    var uid0 = unique();
    (builtins["exports"] = setData(ast_value.Identifier.create(null, "exports"), "uid", uid0));
    var uid1 = unique();
    (builtins["module"] = setData(ast_value.Identifier.create(null, "module"), "uid", uid1));
    var uid2 = unique();
    (builtins["undefined"] = setData(ast_value.Identifier.create(null, "undefined"), "uid", uid2));
    [
        ["typeof", "__typeof"],
        ["void", "__void"],
        ["~", "__bnot"],
        ["!", "__lnot"],
        ["++", "__plus"],
        ["--", "__minus"]
    ].forEach((function(__o0) {
        var xArg, op = __o0[0],
            name = __o0[1];
        registerAliasedSymbol(op, name, ((xArg = identifier("x", unique())), setData(ast_expression.FunctionExpression
            .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
                .create(null, xArg)
            ]), ast_expression.UnaryExpression.create(null, op, xArg)), "locals", [getUid(xArg)]
        )));
    }));
    var uid3 = unique(),
        xArg = setData(ast_value.Identifier.create(null, "x"), "uid", uid3),
        uid4 = unique(),
        yArg = setData(ast_value.Identifier.create(null, "y"), "uid", uid4),
        uid5 = unique(),
        zArg = setData(ast_value.Identifier.create(null, "z"), "uid", uid5),
        ternaryOperator = setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern
                .create(null, yArg), ast_pattern.IdentifierPattern.create(null, zArg)
            ]), ast_expression.ConditionalExpression.create(null, xArg, yArg, zArg)), "locals", [getUid(
            xArg), getUid(yArg), getUid(zArg)]);
    registerAliasedSymbol("?", "__cond", ternaryOperator);
    var binary = (function(op) {
        var xArg0 = identifier("x", unique()),
            yArg0 = identifier("y", unique());
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
            null, null, [ast_pattern.IdentifierPattern.create(null, xArg0), ast_pattern.IdentifierPattern
                .create(null, yArg0)
            ]), op(xArg0, yArg0)), "locals", [getUid(xArg0), getUid(yArg0)]);
    }),
        registerBinary = (function(op, name, impl) {
            registerAliasedSymbol(op, name, binary(impl));
            registerAliasedSymbol(("_" + op), (name + "r"), binary((function(x, y) {
                return impl(y, x);
            })));
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
        ["instanceof", "__instanceof"]
    ].forEach((function(__o0) {
        var op = __o0[0],
            name = __o0[1];
        registerBinary(op, name, binaryOp(op));
    }));
    [
        ["||", "__or"],
        ["&&", "__and"]
    ].forEach((function(__o0) {
        var op = __o0[0],
            name = __o0[1];
        registerBinary(op, name, (function(x, y) {
            return ast_expression.LogicalExpression.create(null, op, x, y);
        }));
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
    registerBinary("|>", "__rpipe", (function(x, y) {
        return ast_expression.CallExpression.create(null, y, [x]);
    }));
    var singleCompose = (function(f, g) {
        var x = identifier("z", unique());
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, x)]), ast_expression.CallExpression
            .create(null, f, [ast_expression.CallExpression.create(null, g, [x])])), "locals", [getUid(
            x)]);
    });
    registerBinary("<\\", "__compose", singleCompose);
    registerBinary("\\>", "__rcompose", (function(x, y) {
        var x0 = identifier("z", unique());
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, null, [ast_pattern.IdentifierPattern.create(null, x0)]), ast_expression.CallExpression
            .create(null, y, [ast_expression.CallExpression.create(null, x, [x0])])), "locals", [
            getUid(x0)
        ]);
    }));
    var multiCompose = (function(f, g) {
        var args = identifier("args", unique());
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, ast_pattern.IdentifierPattern.create(null, args), [], null), ast_expression.CallExpression
            .create(null, f, [ast_expression.CallExpression.create(null, ast_expression.MemberExpression
                .create(null, g, identifier("apply")), [ast_value.Literal.create(null, "null"),
                    args
                ])])), "locals", [getUid(args)]);
    });
    registerBinary("<<\\", "__composen", multiCompose);
    registerBinary("\\>>", "__rcomposen", (function(x, y) {
        var args = identifier("args", unique());
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, ast_pattern.IdentifierPattern.create(null, args), [], null),
            ast_expression.CallExpression.create(null, y, [ast_expression.CallExpression.create(
                null, ast_expression.MemberExpression.create(null, x, identifier("apply")), [
                    ast_value.Literal.create(null, "null"), args
                ])])), "locals", [getUid(args)]);
    }));
    (member = (function(id, uid6) {
        var xArg0 = identifier("x", uid6);
        return setData(ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
            .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg0)]),
            ast_expression.MemberExpression.create(null, xArg0, identifier(id), false)), "locals", [
            getUid(xArg0)
        ]);
    }));
    (exports["builtins"] = builtins);
    (exports["definitions"] = definitions);
    (exports["member"] = member);
}));