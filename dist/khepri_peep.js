/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/value", "akh/base", "akh/unique", "./fun",
    "./control/zippert", "./control/walk"
], (function(require, exports, __o, __o0, ast_declaration, ast_statement, ast_expression, ast_pattern, ast_value,
    __o1, Unique, fun, ZipperT, walk) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setUserData = __o0["setUserData"],
        setData = __o0["setData"],
        next = __o1["next"],
        seq = __o1["sequence"],
        seqa = __o1["sequencea"],
        optimize, M = ZipperT(Unique),
        run = (function(c, ctx, seed) {
            return Unique.runUnique(ZipperT.run(c, ctx), seed);
        }),
        pass = M.of(null),
        node = M.node,
        modify = M.modifyNode,
        unique = M.lift(Unique.unique),
        peepholes = ({}),
        addPeephole = (function(types, up, condition, f) {
            var entry = ({
                "condition": condition,
                "map": f,
                "up": up
            });
            types.forEach((function(type) {
                (peepholes[type] = (peepholes[type] ? fun.concat(peepholes[type], entry) : [entry]));
            }));
        });
    addPeephole(["ReturnStatement"], false, (function(node) {
        return (node.argument && (node.argument.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    })));
    addPeephole(["FunctionExpression"], false, (function(node) {
        return (node.body.type === "LetExpression");
    }), modify((function(node) {
        return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
            .create(null, [ast_statement.WithStatement.create(null, node.body.bindings,
                ast_statement.BlockStatement.create(null, [ast_statement.ReturnStatement.create(
                    node.loc, node.body.body)]))]));
    })));
    addPeephole(["ExpressionStatement"], true, (function(node) {
        return (node.expression && (node.expression.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)])
        );
    })));
    addPeephole(["ExpressionStatement"], true, (function(node) {
        return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression
            .right.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.expression.right.bindings,
            ast_statement.BlockStatement.create(null, [ast_statement.ExpressionStatement.create(
                node.loc, ast_expression.AssignmentExpression.create(node.expression.loc,
                    node.expression.operator, node.expression.left, node.expression.right.body
                ))]));
    })));
    addPeephole(["LetExpression"], true, (function(node) {
        return (node.body.type === "LetExpression");
    }), modify((function(node) {
        return ast_expression.LetExpression.create(null, fun.concat(node.bindings, node.body.bindings),
            node.body.body);
    })));
    addPeephole(["UnaryOperatorExpression"], true, (function(_) {
        return true;
    }), unique.chain((function(xUid) {
        return modify((function(node) {
            var arg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid);
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, [ast_pattern.IdentifierPattern.create(null, arg)]),
                ast_expression.UnaryExpression.create(null, node.op, arg));
        }));
    })));
    addPeephole(["BinaryOperatorExpression"], true, (function(_) {
        return true;
    }), unique.chain((function(xUid) {
        return unique.chain((function(yUid) {
            return modify((function(node) {
                var xArg = setData(ast_value.Identifier.create(null, "x"), "uid",
                    xUid),
                    yArg = setData(ast_value.Identifier.create(null, "y"), "uid",
                        yUid),
                    kind = (((node.op === "||") || (node.op === "&&")) ?
                        ast_expression.LogicalExpression.create : ((node.op === ".") ?
                            (function(loc, _, x, y) {
                                return ast_expression.MemberExpression.create(
                                    loc, x, y, true);
                            }) : ((node.op === "@") ? (function(loc, _, x, y) {
                                return ast_expression.CurryExpression.create(
                                    loc, x, y);
                            }) : ((node.op === "new") ? (function(loc, _, x, y) {
                                return ast_expression.NewExpression.create(
                                    loc, x, [y]);
                            }) : ast_expression.BinaryExpression.create))));
                return ast_expression.FunctionExpression.create(null, null,
                    ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
                        .create(null, xArg), ast_pattern.IdentifierPattern.create(
                            null, yArg)
                    ]), (node.flipped ? kind(null, node.op, yArg, xArg) : kind(null,
                        node.op, xArg, yArg)));
            }));
        }));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return ((node.base.type === "FunctionExpression") && (!node.base.params.id));
    }), modify((function(node) {
        var first = node.base.params.elements[0],
            rest = node.base.params.elements.slice(1),
            body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, rest, node.base.params.self), node.base.body);
        return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
            (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(null, [
            ast_declaration.Binding.create(null, first, node.args[0])
        ], body) : body);
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return (((node.base.type === "LetExpression") && (node.base.body.type === "FunctionExpression")) &&
            (!node.base.body.params.id));
    }), modify((function(node) {
        var first = node.base.body.params.elements[0],
            rest = node.base.body.params.elements.slice(1),
            body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, rest, node.base.body.params.self), node.base.body.body);
        return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
            (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(null, fun.concat(
                node.base.bindings, ast_declaration.Binding.create(null, first, node.args[0])),
            body) : ast_expression.LetExpression.create(null, node.base.bindings, body));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return (node.base.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CurryExpression.create(null, node.base.base, fun.concat(node.base.args,
            node.args));
    })));
    addPeephole(["BinaryExpression"], true, (function(node) {
        return ((node.operator === "|>") && (node.right.type === "CurryExpression"));
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.right.base, fun.concat((node.right.args || []),
            node.left));
    })));
    addPeephole(["BinaryExpression"], true, (function(__o) {
        var operator = __o["operator"],
            left = __o["left"];
        return ((operator === "<|") && (left.type === "CurryExpression"));
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.left.base, fun.concat((node.left.args || []),
            node.right));
    })));
    addPeephole(["CallExpression"], true, (function(__o) {
        var callee = __o["callee"];
        return (callee.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.callee.base, fun.concat((node.callee
            .args || []), node.args));
    })));
    var upTransforms = (function(node) {
        return ((node && peepholes[node.type]) || [])
            .filter((function(x) {
                return (x.up && x.condition(node));
            }));
    }),
        downTransforms = (function(node) {
            return ((node && peepholes[node.type]) || [])
                .filter((function(x) {
                    return ((!x.up) && x.condition(node));
                }));
        }),
        transform = (function(node, transforms) {
            return (transforms.length ? seqa(transforms.map((function(x) {
                return x.map;
            }))) : pass);
        }),
        _transform = node.chain((function(node) {
            return transform(node, downTransforms(node));
        })),
        _transformPost = node.chain((function(node) {
            return transform(node, upTransforms(node));
        }));
    (optimize = (function(ast, data) {
        return run(next(walk(M, _transform, _transformPost), node), khepriZipper(ast), data.unique);
    }));
    (exports["optimize"] = optimize);
}));