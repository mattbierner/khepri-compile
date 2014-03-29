/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "hashtrie", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/declaration",
    "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/value", "akh/base",
    "akh/unique", "akh/trans/state", "zipper-m/trans/zipper", "zipper-m/walk", "./builtin", "./fun", "./ast"
], (function(require, exports, hashtrie, __o, __o0, ast_declaration, ast_statement, ast_expression, ast_pattern,
    ast_value, __o1, Unique, StateT, ZipperT, walk, __o2, fun, __o3) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setUserData = __o0["setUserData"],
        setData = __o0["setData"],
        next = __o1["next"],
        seq = __o1["sequence"],
        seqa = __o1["sequencea"],
        builtins = __o2["builtins"],
        isPrimitive = __o3["isPrimitive"],
        isNumberish = __o3["isNumberish"],
        isTruthy = __o3["isTruthy"],
        getUid = __o3["getUid"],
        optimize, M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), hashtrie.empty), seed);
        }),
        pass = M.of(null),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        unique = M.liftInner(Unique.unique),
        getBinding = (function(uid) {
            return (uid ? M.lift(M.inner.get)
                .map((function(bindings) {
                    return hashtrie.get(uid, bindings);
                })) : pass);
        }),
        addBinding = (function(uid, target) {
            return M.lift(M.inner.modify((function(bindings) {
                return hashtrie.set(uid, target, bindings);
            })));
        }),
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
    addPeephole(["MemberExpression"], true, (function(node0) {
        return ((node0.computed && (node0.object.type === "ArrayExpression")) && isNumberish(node0.property));
    }), modify((function(node0) {
        return (node0.object.elements[node0.property.value] || ast_value.Identifier.create(null,
            "undefined"));
    })));
    addPeephole(["Binding"], false, (function(node0) {
        return (node0.value.type === "LetExpression");
    }), modify((function(node0) {
        return fun.flatten(node0.value.bindings.concat(ast_declaration.Binding.create(null, node0.pattern,
            node0.value.body)));
    })));
    addPeephole(["VariableDeclaration"], true, (function(_) {
        return true;
    }), modify((function(__o4) {
        var declarations = __o4["declarations"],
            bound = fun.flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(null, bound) : null);
    })));
    addPeephole(["LetExpression"], true, (function(_) {
        return true;
    }), modify((function(__o4) {
        var bindings = __o4["bindings"],
            body = __o4["body"],
            bound = fun.flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(null, bound, body) : body);
    })));
    addPeephole(["WithStatement"], true, (function(_) {
        return true;
    }), modify((function(__o4) {
        var bindings = __o4["bindings"],
            body = __o4["body"],
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