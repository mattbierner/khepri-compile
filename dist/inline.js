/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hashtrie", "khepri-ast-zipper", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper", "zipper-m/walk",
    "./ast", "./builtin", "./fun", "./inline/bindings", "./inline/expand", "./inline/rename"
], (function(require, exports, record, hashtrie, __o, __o0, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_value, __o1, Unique, StateT, ZipperT, walk, __o2, __o3, fun, binding, __o4, rename) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setData = __o0["setData"],
        next = __o1["next"],
        seq = __o1["sequence"],
        seqa = __o1["sequencea"],
        getUd = __o2["getUd"],
        getUid = __o2["getUid"],
        isLambda = __o2["isLambda"],
        isPrimitive = __o2["isPrimitive"],
        isNumberish = __o2["isNumberish"],
        isTruthy = __o2["isTruthy"],
        builtins = __o3["builtins"],
        definitions = __o3["definitions"],
        flattenr = fun["flattenr"],
        flatten = fun["flatten"],
        expandCallee = __o4["expandCallee"],
        expandCurry = __o4["expandCurry"],
        optimize, arithmetic, arithmetic0, MAX_EXPANSION_DEPTH = 4,
        _check, State = record.declare(null, ["bindings", "working", "globals", "outer", "ctx"]);
    (State.empty = new(State)(binding.empty, binding.empty, hashtrie.empty, null, hashtrie.empty));
    (State.prototype.addBinding = (function(uid, target) {
        var s = this;
        return s.setBindings(binding.setBinding(uid, target, s.bindings));
    }));
    (State.prototype.addWorking = (function(uid, target) {
        var s = this;
        return s.setWorking(binding.setBinding(uid, target, s.working));
    }));
    (State.prototype.push = (function() {
        var s = this;
        return s.setOuter(s)
            .setWorking(binding.empty);
    }));
    (State.prototype.pop = (function() {
        var s = this;
        return s.outer.setBindings(s.bindings)
            .setGlobals(s.globals)
            .setWorking(hashtrie.fold((function(p, __o) {
                var key = __o["key"];
                return hashtrie.set(key, null, p);
            }), s.outer.working, s.working));
    }));
    var M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, state, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
        }),
        pass = M.of(null),
        unique = M.liftInner(Unique.unique),
        getState = M.lift(M.inner.get),
        modifyState = (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(M.lift, M.inner.modify),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        up = M.up,
        down = M.down,
        right = M.right,
        moveChild = M.child,
        getChild = M.childNode,
        addBinding = (function(uid, value) {
            return modifyState((function(s) {
                return s.addBinding(uid, value);
            }));
        }),
        addWorking = (function(uid, value) {
            return modifyState((function(s) {
                return s.addWorking(uid, value);
            }));
        }),
        getBinding = (function(uid) {
            return (uid ? getState.map((function(__o) {
                var bindings = __o["bindings"],
                    working = __o["working"];
                return (binding.getBinding(uid, working) || binding.getBinding(uid, bindings));
            })) : pass);
        }),
        canPruneBinding = (function(binding) {
            return (binding && isPrimitive(binding));
        }),
        push = modifyState((function(s) {
            return s.push();
        })),
        pop = modifyState((function(s) {
            return s.pop();
        })),
        block = (function() {
            var body = arguments;
            return seq(push, seqa(body), pop);
        }),
        globals = getState.map((function(s) {
            return s.globals;
        })),
        addGlobal = (function(name) {
            return modifyState((function(s) {
                return s.setGlobals(hashtrie.set(name, name, s.globals));
            }));
        }),
        markExpansion = (function(id, target) {
            return setData(id, "expand", target);
        }),
        getExpansion = getUd.bind(null, "expand"),
        isExpansion = getExpansion,
        getCtx = getState.map((function(s) {
            return s.ctx;
        })),
        modifyCtx = (function(f) {
            return modifyState((function(s) {
                return s.setCtx(f(s.ctx));
            }));
        }),
        canExpand = (function(uid) {
            return getCtx.map((function(ctx) {
                return (hashtrie.get(uid, ctx) < MAX_EXPANSION_DEPTH);
            }));
        }),
        pushCtx = (function(uid) {
            return modifyCtx((function(ctx) {
                return hashtrie.modify(uid, (function(x) {
                    return ((x + 1) || 1);
                }), ctx);
            }));
        }),
        popCtx = (function(uid) {
            return modifyCtx((function(ctx) {
                return hashtrie.modify(uid, (function(x) {
                    return ((x - 1) || 0);
                }), ctx);
            }));
        }),
        expandNode = (function(exp, f) {
            var uid;
            return (isExpansion(exp) ? ((uid = getUid(exp)), canExpand(uid)
                .chain((function(can) {
                    return (can ? seq(pushCtx(uid), f(getExpansion(exp)), popCtx(uid)) : f(
                        setData(exp, "expansion", null)));
                }))) : f(exp));
        }),
        expand = (function(exp, f) {
            return exp.chain((function(node) {
                return expandNode(node, f);
            }));
        }),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
        checkTop = node.chain((function(x) {
            return _check(x);
        })),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        when = (function(test, consequent, alternate) {
            return node.chain((function(node) {
                return (test(node) ? consequent : (alternate || pass));
            }));
        }),
        addBindingForNode = (function(id, value) {
            var uid = getUid(id);
            return (isPrimitive(value) ? addBinding(uid, value) : (isLambda(value) ? addBinding(uid,
                markExpansion(id, value)) : ((value.type === "Identifier") ? getBinding(getUid(
                    value))
                .chain((function(binding) {
                    return (binding ? addBinding(uid, binding) : pass);
                })) : pass)));
        }),
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
    addRewrite("VariableDeclaration", visitChild("declarations"));
    addRewrite("VariableDeclarator", seq(visitChild("init"), when((function(node) {
        return node.init;
    }), node.chain((function(node) {
        return (node.immutable ? seq(addBindingForNode(node.id, node.init), (
            canPruneBinding(node.init) ? set([]) : pass)) : addWorking(getUid(node.id),
            node.init));
    })))));
    addRewrite("Binding", seq(visitChild("value"), when((function(node) {
        return ((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id));
    }), node.chain((function(node) {
        return seq(addBindingForNode(node.pattern.id, node.value), (canPruneBinding(node.value) ?
            set([]) : pass));
    }))), when((function(node) {
        return ((node && (node.type === "Binding")) && (node.value.type === "LetExpression"));
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
    })), seq(visitChild("argument"), when((function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"];
        return (arithmetic[operator] && isPrimitive(argument));
    }), modify((function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"],
            value = arithmetic[operator](argument.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))))));
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
    })), when((function(node) {
        return ((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(node
            .property));
    }), modify((function(node) {
        return (node.object.elements[node.property.value] || ast_value.Identifier.create(
            null, "undefined"));
    })))));
    addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
    addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args"), when((function(node) {
        return ((isExpansion(node.callee) || isLambda(node.callee)) || ((node.callee.type ===
            "LetExpression") && isLambda(node.callee.body)));
    }), expand(node.map((function(node) {
        return node.callee;
    })), (function(callee) {
        return ((isLambda(callee) || ((callee.type === "LetExpression") && isLambda(callee.body))) ?
            seq(unique.chain((function(uid) {
                return modify((function(node) {
                    return expandCallee(uid, callee, node.args);
                }));
            })), checkTop) : pass);
    })))));
    addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args"), when((function(node) {
        return ((isExpansion(node.base) || isLambda(node.base)) || ((node.base.type ===
            "LetExpression") && isLambda(node.base.body)));
    }), expand(node.map((function(node) {
        return node.base;
    })), (function(base) {
        return ((isLambda(base) || ((base.type === "LetExpression") && isLambda(base.body))) ?
            seq(unique.chain((function(uid) {
                return modify((function(node) {
                    return expandCurry(uid, base, node.args);
                }));
            })), checkTop) : pass);
    })))));
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
        if (((node instanceof Node) && peepholes[node.type])) return peepholes[node.type];
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