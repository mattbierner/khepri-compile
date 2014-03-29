/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/value", "akh/base", "akh/unique", "zipper-m/trans/zipper", "zipper-m/walk",
    "./fun"
], (function(require, exports, __o, __o0, ast_declaration, ast_statement, ast_expression, ast_value, __o1, Unique,
    ZipperT, walk, fun) {
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
            return Unique.runUnique(ZipperT.runZipperT(c, ctx), seed);
        }),
        pass = M.of(null),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        unique = M.liftInner(Unique.unique),
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
    addPeephole(["VariableDeclaration"], true, (function(_) {
        return true;
    }), modify((function(__o2) {
        var declarations = __o2["declarations"],
            bound = fun.flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(null, bound) : null);
    })));
    addPeephole(["LetExpression"], true, (function(_) {
        return true;
    }), modify((function(__o2) {
        var bindings = __o2["bindings"],
            body = __o2["body"],
            bound = fun.flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(null, bound, body) : body);
    })));
    addPeephole(["WithStatement"], true, (function(_) {
        return true;
    }), modify((function(__o2) {
        var bindings = __o2["bindings"],
            body = __o2["body"],
            bound = fun.flattenr(bindings);
        return (bound.length ? ast_statement.WithStatement.create(null, bound, body) : body);
    })));
    addPeephole(["LetExpression"], true, (function(node0) {
        return (node0.body.type === "LetExpression");
    }), modify((function(node0) {
        return ((node0.body.type === "LetExpression") ? ast_expression.LetExpression.create(null,
            fun.concat(node0.bindings, node0.body.bindings), node0.body.body) : node0);
    })));
    addPeephole(["CurryExpression"], true, (function(node0) {
        return (node0.base.type === "CurryExpression");
    }), modify((function(node0) {
        return ast_expression.CurryExpression.create(null, node0.base.base, fun.concat(node0.base.args,
            node0.args));
    })));
    addPeephole(["ReturnStatement"], false, (function(node0) {
        return (node0.argument && (node0.argument.type === "LetExpression"));
    }), modify((function(node0) {
        return ast_statement.WithStatement.create(null, node0.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node0.loc, node0.argument.body)]));
    })));
    addPeephole(["FunctionExpression"], false, (function(node0) {
        return (node0.body.type === "LetExpression");
    }), modify((function(node0) {
        return ast_expression.FunctionExpression.create(null, node0.id, node0.params, ast_statement
            .BlockStatement.create(null, [ast_statement.WithStatement.create(null, node0.body.bindings,
                ast_statement.BlockStatement.create(null, [ast_statement.ReturnStatement.create(
                    node0.loc, node0.body.body)]))]));
    })));
    addPeephole(["ExpressionStatement"], true, (function(node0) {
        return (node0.expression && (node0.expression.type === "LetExpression"));
    }), modify((function(node0) {
        return ast_statement.WithStatement.create(null, node0.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node0.loc, node0.expression.body)])
        );
    })));
    addPeephole(["ExpressionStatement"], true, (function(node0) {
        return ((node0.expression && (node0.expression.type === "AssignmentExpression")) && (node0.expression
            .right.type === "LetExpression"));
    }), modify((function(node0) {
        return ast_statement.WithStatement.create(null, node0.expression.right.bindings,
            ast_statement.BlockStatement.create(null, [ast_statement.ExpressionStatement.create(
                node0.loc, ast_expression.AssignmentExpression.create(node0.expression.loc,
                    node0.expression.operator, node0.expression.left, node0.expression.right
                    .body))]));
    })));
    var upTransforms = (function(node0) {
        return ((node0 && peepholes[node0.type]) || [])
            .filter((function(x) {
                return (x.up && x.condition(node0));
            }));
    }),
        downTransforms = (function(node0) {
            return ((node0 && peepholes[node0.type]) || [])
                .filter((function(x) {
                    return ((!x.up) && x.condition(node0));
                }));
        }),
        transform = (function(node0, transforms) {
            return (transforms.length ? seqa(transforms.map((function(x) {
                return x.map;
            }))) : pass);
        }),
        _transform = node.chain((function(node0) {
            return transform(node0, downTransforms(node0));
        })),
        _transformPost = node.chain((function(node0) {
            return transform(node0, upTransforms(node0));
        }));
    (optimize = (function(ast, data) {
        return run(next(walk(M, _transform, _transformPost), node), khepriZipper(ast), data.unique);
    }));
    (exports["optimize"] = optimize);
}));