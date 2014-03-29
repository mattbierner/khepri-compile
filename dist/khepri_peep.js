/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "hashtrie", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/declaration",
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
    addPeephole(["MemberExpression"], true, (function(node) {
        return ((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(node.property));
    }), modify((function(node) {
        return (node.object.elements[node.property.value] || ast_value.Identifier.create(null,
            "undefined"));
    })));
    addPeephole(["Binding"], false, (function(node) {
        return (node.value.type === "LetExpression");
    }), modify((function(node) {
        return fun.flatten(node.value.bindings.concat(ast_declaration.Binding.create(null, node.pattern,
            node.value.body)));
    })));
    addPeephole(["VariableDeclaration"], true, (function(_) {
        return true;
    }), modify((function(__o) {
        var declarations = __o["declarations"],
            bound = fun.flattenr(declarations);
        return (bound.length ? ast_declaration.VariableDeclaration.create(null, bound) : null);
    })));
    addPeephole(["LetExpression"], true, (function(_) {
        return true;
    }), modify((function(__o) {
        var bindings = __o["bindings"],
            body = __o["body"],
            bound = fun.flattenr(bindings);
        return (bound.length ? ast_expression.LetExpression.create(null, bound, body) : body);
    })));
    addPeephole(["WithStatement"], true, (function(_) {
        return true;
    }), modify((function(__o) {
        var bindings = __o["bindings"],
            body = __o["body"],
            bound = fun.flattenr(bindings);
        return (bound.length ? ast_statement.WithStatement.create(null, bound, body) : body);
    })));
    addPeephole(["LetExpression"], true, (function(node) {
        return (node.body.type === "LetExpression");
    }), modify((function(node) {
        return ((node.body.type === "LetExpression") ? ast_expression.LetExpression.create(null,
            fun.concat(node.bindings, node.body.bindings), node.body.body) : node);
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return (node.base.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CurryExpression.create(null, node.base.base, fun.concat(node.base.args,
            node.args));
    })));
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