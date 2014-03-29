/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "bes/array", "hashtrie", "khepri-ast-zipper", "neith/zipper", "neith/walk",
    "neith/tree", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression",
    "khepri-ast/pattern", "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper",
    "zipper-m/walk", "./ast", "./builtin", "./fun"
], (function(require, exports, record, array, hashtrie, __o, __o0, __o1, tree, ast_node, ast_declaration,
    ast_statement, ast_expression, ast_pattern, ast_value, __o2, Unique, StateT, ZipperT, walk, __o3, __o4, fun
) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        detach = __o0["detach"],
        neithWalk = __o1["walk"],
        Node = ast_node["Node"],
        setUserData = ast_node["setUserData"],
        setData = ast_node["setData"],
        next = __o2["next"],
        seq = __o2["sequence"],
        seqa = __o2["sequencea"],
        getUid = __o3["getUid"],
        isLambda = __o3["isLambda"],
        isPrimitive = __o3["isPrimitive"],
        isNumberish = __o3["isNumberish"],
        isTruthy = __o3["isTruthy"],
        builtins = __o4["builtins"],
        definitions = __o4["definitions"],
        flattenr = fun["flattenr"],
        flatten = fun["flatten"],
        optimize, arithmetic, arithmetic0, MAX_EXPANSION_DEPTH = 2,
        _check, State = record.declare(null, ["bindings", "working", "globals", "outer", "ctx"]);
    (State.empty = new(State)(hashtrie.empty, hashtrie.empty, hashtrie.empty, null, hashtrie.empty));
    var M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, state, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
        }),
        pass = M.of(null),
        unique = M.liftInner(Unique.unique),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        up = M.up,
        down = M.down,
        right = M.right,
        moveChild = M.child,
        addBinding = (function(uid, target) {
            return M.lift(M.inner.modify((function(s) {
                return s.setBindings(hashtrie.set(uid, target, s.bindings));
            })));
        }),
        addWorking = (function(uid, target) {
            return M.lift(M.inner.modify((function(s) {
                return s.setWorking(hashtrie.set(uid, target, s.working));
            })));
        }),
        getBinding = (function(uid) {
            return (uid ? M.lift(M.inner.get)
                .map((function(__o) {
                    var bindings = __o["bindings"],
                        working = __o["working"];
                    return (hashtrie.get(uid, working) || hashtrie.get(uid, bindings));
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
        push = M.lift(M.inner.modify((function(s) {
            return new(State)(s.bindings, hashtrie.empty, s.globals, s);
        }))),
        pop = M.lift(M.inner.modify((function(s) {
            return s.outer.setBindings(s.bindings)
                .setGlobals(s.globals)
                .setWorking(hashtrie.fold((function(p, __o) {
                    var key = __o["key"];
                    return hashtrie.set(key, null, p);
                }), s.outer.working, s.working));
        }))),
        block = (function() {
            var body = arguments;
            return seq(push, seqa(body), pop);
        }),
        rewrite = (function(base, list, root) {
            return tree.node(neithWalk((function(ctx) {
                var node = tree.node(ctx),
                    uid = getUid(node);
                return ((list.indexOf(uid) >= 0) ? tree.modifyNode((function(node) {
                    return setData(node, "uid", ((base + "-") + uid));
                }), ctx) : ctx);
            }), (function(x) {
                return x;
            }), khepriZipper(root)));
        }),
        markExpansion = (function(id, target) {
            return setData(id, "expand", target);
        }),
        isExpansion = (function(node) {
            return ((node.ud && node.ud) && node.ud.expand);
        }),
        getCtx = M.lift(M.inner.get)
            .map((function(s) {
                return s.ctx;
            })),
        modifyCtx = (function(f) {
            return M.lift(M.inner.modify((function(s) {
                return s.setCtx(f(s.ctx));
            })));
        }),
        expand = (function(exp, f) {
            return (isExpansion(exp) ? getCtx.chain((function(ctx) {
                return (hashtrie.has(getUid(exp), ctx) ? f(exp) : seq(modifyCtx((function(ctx) {
                    return hashtrie.set(getUid(exp), ctx);
                })), f(exp.ud.expand), modifyCtx((function(ctx) {
                    return hashtrie.remove(getUid(exp), ctx);
                }))));
            })) : f(exp));
        }),
        checkTop = node.chain((function(x) {
            return _check(x);
        })),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        when = (function(test, consequent, alternate) {
            return node.chain((function(node) {
                return (test(node) ? consequent : (alternate || pass));
            }));
        }),
        UP = true,
        DOWN = false,
        peepholes = ({}),
        addRewrite = (function(type, f) {
            if (Array.isArray(type)) type.forEach((function(type) {
                return addRewrite(type, f);
            }));
            else(peepholes[type] = f);
        });
    addRewrite("UnaryOperatorExpression", seq(node.chain((function(__o) {
        var op = __o["op"];
        return seq(addGlobal(op), set(builtins[op]));
    })), checkTop));
    addRewrite("BinaryOperatorExpression", seq(node.chain((function(__o) {
        var op = __o["op"],
            flipped = __o["flipped"],
            name = (flipped ? ("_" + op) : op);
        return seq(addGlobal(name), set(builtins[name]));
    })), checkTop));
    addRewrite("TernaryOperatorExpression", seq(addGlobal("?"), set(builtins["?"]), checkTop));
    addRewrite("Program", visitChild("body"));
    addRewrite("Package", visitChild("body"));
    addRewrite("SwitchCase", seq(visitChild("test"), visitChild("consequent")));
    addRewrite("CatchClause", seq(visitChild("param"), visitChild("body")));
    addRewrite(["StaticDeclaration", "VariableDeclaration"], visitChild("declarations"));
    addRewrite("VariableDeclarator", seq(visitChild("init"), node.chain((function(node) {
        return (node.init ? (node.immutable ? addBinding(getUid(node.id), node.init) :
            addWorking(getUid(node.id), node.init)) : pass);
    }))));
    addRewrite("Binding", seq(visitChild("value"), when((function(node) {
        return ((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id));
    }), node.chain((function(node) {
        var uid = getUid(node.pattern.id);
        return (isPrimitive(node.value) ? addBinding(uid, node.value) : (isLambda(node.value) ?
            markExpansion(node.pattern.id, node.value)
            .chain((function(entry) {
                return addBinding(uid, entry);
            })) : ((node.value.type === "Identifier") ? getBinding(getUid(node.value))
                .chain((function(binding) {
                    return (binding ? addBinding(uid, node.value) : pass);
                })) : pass)));
    }))), when((function(node) {
        return (node.value.type === "LetExpression");
    }), node.chain((function(node) {
        var bindings = fun.flatten(fun.concat(node.value.bindings, ast_declaration.Binding.create(
            null, node.pattern, node.value.body)));
        return seq(set(bindings), visitChild((bindings.length - 1)));
    })))));
    addRewrite("BlockStatement", visitChild("body"));
    addRewrite("ExpressionStatement", visitChild("expression"));
    addRewrite("WithStatement", seq(visitChild("bindings"), visitChild("body")));
    addRewrite("SwitchStatement", seq(visitChild("discriminant"), visitChild("cases")));
    addRewrite(["ReturnStatement", "ThrowStatement"], visitChild("argument"));
    addRewrite("TryStatement", seq(visitChild("block"), visitChild("handler"), visitChild("finalizer")));
    addRewrite("WhileStatement", block(visitChild("test"), visitChild("body")));
    addRewrite("DoWhileStatement", block(visitChild("body"), visitChild("test")));
    addRewrite("ForStatement", seq(visitChild("init"), block(visitChild("test"), visitChild("update"),
        visitChild("body"))));
    addRewrite("FunctionExpression", block(visitChild("id"), visitChild("params"), visitChild("body")));
    addRewrite("UnaryExpression", ((arithmetic = ({
        "!": (function(x) {
            return (!x);
        }),
        "~": (function(x) {
            return (~x);
        }),
        "typeof": (function(x) {
            return (typeof x);
        }),
        "++": (function(x) {
            return (+x);
        }),
        "--": (function(x) {
            return (-x);
        })
    })), when((function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"];
        return (arithmetic[operator] && isPrimitive(argument));
    }), modify((function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"],
            value = arithmetic[operator](argument.value);
        return ast_value.Literal.create(null, (typeof value), value);
    })))));
    addRewrite("AssignmentExpression", seq(visitChild("right"), when((function(__o) {
        var left = __o["left"];
        return (left.type === "Identifier");
    }), node.chain((function(node) {
        return addWorking(getUid(node.left), node.right);
    })))));
    addRewrite(["LogicalExpression", "BinaryExpression"], ((arithmetic0 = ({
        "+": (function(x, y) {
            return (x + y);
        }),
        "-": (function(x, y) {
            return (x - y);
        }),
        "*": (function(x, y) {
            return (x * y);
        }),
        "/": (function(x, y) {
            return (x / y);
        }),
        "%": (function(x, y) {
            return (x % y);
        }),
        "<<": (function(x, y) {
            return (x << y);
        }),
        ">>": (function(x, y) {
            return (x >> y);
        }),
        ">>>": (function(x, y) {
            return (x >>> y);
        }),
        "<": (function(x, y) {
            return (x < y);
        }),
        ">": (function(x, y) {
            return (x > y);
        }),
        "<=": (function(x, y) {
            return (x <= y);
        }),
        ">=": (function(x, y) {
            return (x >= y);
        }),
        "||": (function(x, y) {
            return (x || y);
        }),
        "&&": (function(x, y) {
            return (x && y);
        })
    })), seq(visitChild("left"), visitChild("right"), when((function(__o) {
        var operator = __o["operator"],
            left = __o["left"],
            right = __o["right"];
        return ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right));
    }), modify((function(__o) {
        var operator = __o["operator"],
            left = __o["left"],
            right = __o["right"],
            value = arithmetic0[operator](left.value, right.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(visitChild("test"), when((function(node) {
        return isPrimitive(node.test);
    }), node.chain((function(__o) {
        var test = __o["test"],
            consequent = __o["consequent"],
            alternate = __o["alternate"];
        return seq(set((isTruthy(test) ? consequent : alternate)), checkTop);
    })), seq(visitChild("consequent"), visitChild("alternate")))));
    addRewrite("MemberExpression", seq(visitChild("object"), node.chain((function(node) {
        return (node.computed ? visitChild("property") : pass);
    }))));
    addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
    addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args"), when((function(node) {
        return ((isLambda(node.callee) || isExpansion(node.callee)) || ((node.callee.type ===
            "LetExpression") && isLambda(node.callee.body)));
    }), node.chain((function(node) {
        return expand(node.callee, (function(callee) {
            return seq(unique.chain((function(uid) {
                return modify((function(node) {
                    var target, map, bindings;
                    return ((callee.type === "Identifier") ?
                        ast_expression.CallExpression.create(
                            node.loc, callee, node.args) : ((
                            target = ((callee.type ===
                                    "LetExpression") ?
                                callee.body : callee)), (
                            map = target.params.elements.map(
                                (function(x) {
                                    return getUid(x.id);
                                }))), (bindings = target.params
                            .elements.map((function(x, i) {
                                return ast_declaration
                                    .Binding.create(
                                        null, x, (
                                            node.args[
                                                i] ?
                                            node.args[
                                                i] :
                                            ast_value
                                            .Identifier
                                            .create(
                                                null,
                                                "undefined"
                                            )));
                            }))), rewrite(uid, map,
                            ast_expression.LetExpression.create(
                                null, fun.concat((callee.bindings || []),
                                    bindings), target.body)
                        )));
                }));
            })), ((callee.type === "Identifier") ? pass : checkTop));
        }));
    })))));
    addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args"), when((function(node) {
        return (isLambda(node.base) || ((node.base.type === "LetExpression") && isLambda(node.base
            .body)));
    }), seq(unique.chain((function(uid) {
        return modify((function(node) {
            var first, rest, map, body, target = ((node.base.type ===
                    "LetExpression") ? node.base.body : node.base);
            return ((!target.params.elements.length) ? node.base : ((first =
                target.params.elements[0]), (rest = target.params.elements
                .slice(1)), (map = [getUid(first.id)]), (body =
                ast_expression.FunctionExpression.create(null, null,
                    ast_pattern.ArgumentsPattern.create(null, null,
                        rest, target.params.self), rewrite(uid, map,
                        target.body))), ((first && (((first.type ===
                "IdentifierPattern") || (first.type ===
                "AsPattern")) || (first.type ===
                "ObjectPattern"))) ? ast_expression.LetExpression.create(
                null, fun.concat((node.base.bindings || []),
                    rewrite(uid, map, ast_declaration.Binding.create(
                        null, first, node.args[0]))), body) : body)));
        }));
    })), checkTop))));
    addRewrite("LetExpression", seq(visitChild("bindings"), visitChild("body"), modify((function(__o) {
        var loc = __o["loc"],
            bindings = __o["bindings"],
            body = __o["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
    })), when((function(__o) {
        var bindings = __o["bindings"];
        return (!bindings.length);
    }), modify((function(__o) {
        var body = __o["body"];
        return body;
    })))));
    addRewrite("ArrayExpression", visitChild("elements"));
    addRewrite("ObjectExpression", visitChild("properties"));
    addRewrite("ObjectValue", visitChild("value"));
    addRewrite("Identifier", when((function(node) {
        return getUid(node);
    }), node.chain((function(node) {
        return getBinding(getUid(node))
            .chain((function(binding) {
                return ((binding && ((isPrimitive(binding) || (binding.type ===
                    "Identifier")) || isLambda(binding))) ? set(binding) : pass);
            }));
    }))));
    (_check = (function(node) {
        if (Array.isArray(node)) {
            if ((!node.length)) return pass;
            return seq(down, seqa(node.map((function(_, i) {
                return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
            }))), up);
        }
        if (((node instanceof ast_node.Node) && peepholes[node.type])) return peepholes[node.type];
        return pass;
    }));
    var initialState = fun.foldl((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return s.setBindings(hashtrie.set(getUid(id), markExpansion(id, def), s.bindings));
    }), State.empty, Object.keys(builtins));
    (optimize = (function(ast, data) {
        return run(next(checkTop, node.chain((function(node) {
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