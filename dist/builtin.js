/*
 * THIS FILE IS AUTO GENERATED from 'lib/builtin.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern", "khepri-ast/expression", "khepri-ast/value"], (
    function(require, exports, ast_node, ast_pattern, ast_expression, ast_value) {
        "use strict";
        var setData = ast_node["setData"],
            setUserData = ast_node["setUserData"],
            builtins, unique = (function() {
                var x = 0;
                return (function() {
                    (x = (x + 1));
                    return x;
                });
            })();
        (builtins = ({
            "require": setData(new(ast_value.Identifier)(null, "require"), "uid", unique()),
            "exports": setData(new(ast_value.Identifier)(null, "exports"), "uid", unique()),
            "module": setData(new(ast_value.Identifier)(null, "module"), "uid", unique())
        }));
        var unary = (function(uid, op) {
            var xArg = setData(ast_value.Identifier.create(null, "x"), "uid", unique());
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, xArg)]), op(xArg));
        }),
            unaryOp = (function(op) {
                return unary(unique(), (function(x) {
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
            (builtins[op] = unaryOp(op));
        }));
        var binary = (function(uid, flipped, op) {
            var xArg = setData(ast_value.Identifier.create(null, "x"), "uid", unique()),
                yArg = setData(ast_value.Identifier.create(null, "y"), "uid", unique());
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, xArg), ast_pattern.IdentifierPattern
                    .create(null, yArg)
                ]), (flipped ? op(yArg, xArg) : op(xArg, yArg)));
        }),
            binaryOp = (function(op, flipped) {
                return binary(unique(), flipped, (function(x, y) {
                    return ast_expression.BinaryExpression.create(null, op, x, y);
                }));
            }),
            logicalOp = (function(op, flipped) {
                return binary(unique(), flipped, (function(x, y) {
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
            (builtins[op] = binaryOp(op));
            (builtins[("_" + op)] = binaryOp(op, true));
        }));
        [
            ["||", "__or"],
            ["&&", "__and"]
        ].forEach((function(__o) {
            var op = __o[0],
                name = __o[1];
            (builtins[op] = logicalOp(op));
            (builtins[("_" + op)] = logicalOp(op, true));
        }));
        (builtins["new"] = binary(unique(), false, (function(x, y) {
            return ast_expression.NewExpression.create(null, x, [y]);
        })));
        (builtins["_new"] = binary(unique(), true, (function(x, y) {
            return ast_expression.NewExpression.create(null, x, [y]);
        })));
        (builtins["."] = binary(unique(), false, (function(x, y) {
            return ast_expression.MemberExpression.create(null, x, y, true);
        })));
        (builtins["_."] = binary(unique(), true, (function(x, y) {
            return ast_expression.MemberExpression.create(null, x, y, true);
        })));
        (builtins["@"] = binary(unique(), false, (function(x, y) {
            return ast_expression.CurryExpression.create(null, x, y);
        })));
        (builtins["_@"] = binary(unique(), true, (function(x, y) {
            return ast_expression.CurryExpression.create(null, x, y);
        })));
        var pipe = (function(callee, arg) {
            return ast_expression.CallExpression.create(null, callee, [arg]);
        });
        (builtins["<|"] = (builtins["_|>"] = binary(unique(), false, pipe)));
        (builtins["|>"] = (builtins["_<|"] = binary(unique(), true, pipe)));
        var identifier = (function(loc, name, uid) {
            return setData(ast_value.Identifier.create(loc, name), "uid", uid);
        }),
            singleCompose = (function(f, g) {
                var fo = identifier(null, "f", unique()),
                    go = identifier(null, "g", unique()),
                    x = identifier(null, "x", unique());
                return ast_expression.CallExpression.create(null, ast_expression.FunctionExpression.create(null,
                    null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(
                        null, fo), ast_pattern.IdentifierPattern.create(null, go)]), ast_expression.FunctionExpression
                    .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
                        .create(null, x)
                    ]), ast_expression.CallExpression.create(null, fo, [ast_expression.CallExpression.create(
                        null, go, [x])]))), [f, g]);
            }),
            multiCompose = (function(f, g) {
                var fo = identifier(null, "f", unique()),
                    go = identifier(null, "g", unique());
                return ast_expression.CallExpression.create(null, ast_expression.FunctionExpression.create(null,
                    null, ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern.create(
                        null, fo), ast_pattern.IdentifierPattern.create(null, go)]), ast_expression.FunctionExpression
                    .create(null, null, ast_pattern.ArgumentsPattern.create(null, null, []), ast_expression
                        .CallExpression.create(null, fo, [ast_expression.CallExpression.create(null,
                            ast_expression.MemberExpression.create(null, go, identifier(null,
                                "apply")), [ast_value.Literal.create(null, "null"), identifier(null,
                                "arguments")])]))), [f, g]);
            });
        (builtins["<\\"] = (builtins["_\\>"] = binary(unique(), false, singleCompose)));
        (builtins["\\>"] = (builtins["_<\\"] = binary(unique(), true, singleCompose)));
        (builtins["<<\\"] = (builtins["_\\>>"] = binary(unique(), false, multiCompose)));
        (builtins["\\>>"] = (builtins["_<<\\"] = binary(unique(), true, multiCompose)));
        return builtins;
    }));