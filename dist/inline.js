/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "bes/array", "hashtrie", "khepri-ast-zipper", "neith/walk", "neith/tree",
    "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression",
    "khepri-ast/pattern", "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper",
    "zipper-m/walk", "./ast", "./builtin", "./fun"
], (function(require, exports, record, array, hashtrie, __o, __o0, tree, __o1, ast_declaration, ast_statement,
    ast_expression, ast_pattern, ast_value, __o2, Unique, StateT, ZipperT, walk, __o3, __o4, fun) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        neithWalk = __o0["walk"],
        Node = __o1["Node"],
        setUserData = __o1["setUserData"],
        setData = __o1["setData"],
        next = __o2["next"],
        seq = __o2["sequence"],
        seqa = __o2["sequencea"],
        getUid = __o3["getUid"],
        isLambda = __o3["isLambda"],
        builtins = __o4["builtins"],
        definitions = __o4["definitions"],
        optimize, State = record.declare(null, ["bindings", "globals"]),
        M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, state, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
        }),
        pass = M.of(null),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        unique = M.liftInner(Unique.unique),
        addBinding = (function(uid, target) {
            return M.lift(M.inner.modify((function(s) {
                return s.setBindings(hashtrie.set(uid, target, s.bindings));
            })));
        }),
        getBinding = (function(uid) {
            return (uid ? M.lift(M.inner.get)
                .map((function(__o) {
                    var bindings = __o["bindings"];
                    return hashtrie.get(uid, bindings);
                })) : pass);
        }),
        addGlobal = (function(name) {
            return M.lift(M.inner.modify((function(s) {
                return s.setGlobals(hashtrie.set(name, name, s.globals));
            })));
        }),
        globals = M.lift(M.inner.get)
            .map((function(s) {
                return s.globals;
            })),
        stack = M.lift(M.inner.get)
            .map((function(s) {
                return s.stack;
            })),
        push = M.lift(M.inner.modify((function(s) {
            return s.setStack(array.push(s.stack, null));
        }))),
        pop = M.lift(M.inner.modify((function(s) {
            return s.setStack(array.pop(s.stack));
        }))),
        rewrite = (function(base, list, root) {
            return tree.node(neithWalk((function(ctx) {
                var node = tree.node(ctx),
                    uid = getUid(node);
                return ((list.indexOf(uid) !== -1) ? tree.modifyNode((function(node) {
                    return setData(node, "uid", ((base + "-") + uid));
                }), ctx) : ctx);
            }), (function(x) {
                return x;
            }), khepriZipper(root)));
        }),
        peepholes = ({}),
        addPeephole = (function(types, up, test, f) {
            var entry = ({
                "condition": test,
                "up": up,
                "map": f
            });
            types.forEach((function(type) {
                (peepholes[type] = (peepholes[type] ? fun.concat(peepholes[type], entry) : [entry]));
            }));
        }),
        always = (function(_) {
            return true;
        });
    addPeephole(["UnaryOperatorExpression"], false, always, node.chain((function(__o) {
        var op = __o["op"];
        return seq(addGlobal(op), set(builtins[op]));
    })));
    addPeephole(["BinaryOperatorExpression"], false, always, node.chain((function(__o) {
        var op = __o["op"],
            flipped = __o["flipped"],
            name = (flipped ? ("_" + op) : op);
        return seq(addGlobal(name), set(builtins[name]));
    })));
    addPeephole(["TernaryOperatorExpression"], false, always, seq(addGlobal("?"), set(builtins["?"])));
    addPeephole(["VariableDeclarator"], true, (function(node) {
        return (((node.immutable && node.init) && isLambda(node.init)) && false);
    }), node.chain((function(node) {
        return addBinding(getUid(node.id), node.init);
    })));
    addPeephole(["Binding"], true, (function(node) {
        return (((node.pattern.id && node.pattern.id.ud) && (!node.recursive)) && isLambda(node.value));
    }), node.chain((function(node) {
        return addBinding(getUid(node.pattern.id), node.value);
    })));
    addPeephole(["CallExpression"], true, (function(node) {
        return ((node.callee.type === "Identifier") && getUid(node.callee));
    }), node.chain((function(node) {
        return getBinding(getUid(node.callee))
            .chain((function(binding) {
                return (binding ? modify((function(node) {
                    return ast_expression.CallExpression.create(null, binding,
                        node.args);
                })) : pass);
            }));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return ((node.base.type === "Identifier") && getUid(node.base));
    }), node.chain((function(node) {
        return getBinding(getUid(node.base))
            .chain((function(binding) {
                return (binding ? modify((function(node) {
                    return ast_expression.CurryExpression.create(null, binding,
                        node.args);
                })) : pass);
            }));
    })));
    addPeephole(["CallExpression"], true, (function(node) {
        return isLambda(node.callee);
    }), unique.chain((function(uid) {
        return modify((function(node) {
            var map = node.callee.params.elements.map((function(x) {
                return getUid(x.id);
            })),
                bindings = node.callee.params.elements.map((function(x, i) {
                    return ast_declaration.Binding.create(null, rewrite(uid, map, x), (
                        node.args[i] ? node.args[i] : ast_value.Identifier.create(
                            null, "undefined")));
                }));
            return ast_expression.LetExpression.create(null, bindings, rewrite(uid, map,
                node.callee.body));
        }));
    })));
    addPeephole(["CallExpression"], true, (function(node) {
        return ((node.callee.type === "LetExpression") && (node.callee.body.type ===
            "FunctionExpression"));
    }), unique.chain((function(uid) {
        return modify((function(node) {
            var map = node.callee.body.params.elements.map((function(x) {
                return getUid(x.id);
            })),
                bindings = node.callee.body.params.elements.map((function(x, i) {
                    return ast_declaration.Binding.create(null, rewrite(uid, map, x), (
                        node.args[i] ? node.args[i] : ast_value.Identifier.create(
                            null, "undefined")));
                }));
            return ast_expression.LetExpression.create(null, fun.concat(node.callee.bindings,
                bindings), rewrite(uid, map, node.callee.body.body));
        }));
    })));
    addPeephole(["CallExpression"], true, (function(__o) {
        var callee = __o["callee"];
        return (callee.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.callee.base, fun.concat((node.callee
            .args || []), node.args));
    })));
    addPeephole(["CallExpression"], true, (function(node) {
        return ((node.callee.type === "LetExpression") && (node.callee.body.type === "CurryExpression"));
    }), modify((function(node) {
        var first = node.callee.body.params.elements[0],
            rest = node.base.body.params.elements.slice(1),
            body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, rest, node.base.body.params.self), node.base.body.body);
        return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
            (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(null, fun.concat(
                node.base.bindings, ast_declaration.Binding.create(null, first, node.args[0])),
            body) : ast_expression.LetExpression.create(null, node.base.bindings, body));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return isLambda(node.base);
    }), unique.chain((function(uid) {
        return modify((function(node) {
            var first, rest, map, body;
            return ((!node.base.params.elements.length) ? node.base : ((first = node.base.params
                .elements[0]), (rest = node.base.params.elements.slice(1)), (map = [
                getUid(first.id)
            ]), (body = ast_expression.FunctionExpression.create(null, null,
                ast_pattern.ArgumentsPattern.create(null, null, rest, node.base
                    .params.self), rewrite(uid, map, node.base.body))), ((first &&
                    (((first.type === "IdentifierPattern") || (first.type ===
                        "AsPattern")) || (first.type === "ObjectPattern"))) ?
                ast_expression.LetExpression.create(null, [rewrite(uid, map,
                    ast_declaration.Binding.create(null, first, node.args[0])
                )], body) : body)));
        }));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return ((node.base.type === "LetExpression") && isLambda(node.base.body));
    }), unique.chain((function(uid) {
        return modify((function(node) {
            var first, rest, map, body;
            return ((!node.base.body.params.elements.length) ? node.base : ((first = node.base
                .body.params.elements[0]), (rest = node.base.body.params.elements.slice(
                1)), (map = [getUid(first.id)]), (body = ast_expression.FunctionExpression
                .create(null, null, ast_pattern.ArgumentsPattern.create(null, null,
                    rest, node.base.body.params.self), rewrite(uid, map, node.base
                    .body.body))), ((first && (((first.type === "IdentifierPattern") ||
                (first.type === "AsPattern")) || (first.type ===
                "ObjectPattern"))) ? ast_expression.LetExpression.create(null,
                fun.concat(node.base.bindings, rewrite(uid, map,
                    ast_declaration.Binding.create(null, first, node.args[0])
                )), body) : ast_expression.LetExpression.create(null, node.base
                .bindings, body))));
        }));
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
        _transformPost = node.chain((function(n) {
            var t = upTransforms(n);
            return (t.length ? next(transform(n, [t[0]]), node)
                .chain((function(x) {
                    return ((x && (x !== n)) ? _transformPost : pass);
                })) : pass);
        })),
        initialState = Object.keys(builtins)
            .reduce((function(s, name) {
                var id = builtins[name],
                    def = definitions[name];
                return s.setBindings(hashtrie.set(id.ud.uid, def, s.bindings));
            }), new(State)(hashtrie.empty, hashtrie.empty));
    (optimize = (function(ast, data) {
        return run(next(walk(M, _transform, _transformPost), node.chain((function(node) {
            return globals.chain((function(g) {
                return unique.chain((function(unique) {
                    return M.of(({
                        "tree": node,
                        "data": ({
                            "globals": hashtrie.keys(g),
                            "unique": unique
                        })
                    }));
                }));
            }));
        }))), khepriZipper(ast), initialState, data.unique);
    }));
    (exports["optimize"] = optimize);
}));