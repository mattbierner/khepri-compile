/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "hashtrie", "khepri-ast-zipper", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper", "zipper-m/walk",
    "./ast", "./builtin", "./fun", "./inline/bindings", "./inline/expand", "./inline/rename"
], (function(require, exports, record, hashtrie, __o, __o0, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_value, __o1, Unique, StateT, ZipperT, walk, __o2, __o3, fun, binding, __o4, rename) {
    "use strict";
    var __plus = (function(x) {
        return (+x);
    }),
        __blas = (function(x, y) {
            return (x << y);
        }),
        __or = (function(x, y) {
            return (x || y);
        }),
        __minus = (function(x) {
            return (-x);
        }),
        __and = (function(x, y) {
            return (x && y);
        }),
        __bras = (function(x, y) {
            return (x >> y);
        }),
        __lnot = (function(x) {
            return (!x);
        }),
        __lte = (function(x, y) {
            return (x <= y);
        }),
        __typeof = (function(x) {
            return (typeof x);
        }),
        __mod = (function(x, y) {
            return (x % y);
        }),
        __mul = (function(x, y) {
            return (x * y);
        }),
        __add = (function(x, y) {
            return (x + y);
        }),
        __lt = (function(x, y) {
            return (x < y);
        }),
        __sub = (function(x, y) {
            return (x - y);
        }),
        __gt = (function(x, y) {
            return (x > y);
        }),
        __bnot = (function(x) {
            return (~x);
        }),
        __brls = (function(x, y) {
            return (x >>> y);
        }),
        __div = (function(x, y) {
            return (x / y);
        }),
        __gte = (function(x, y) {
            return (x >= y);
        }),
        khepriZipper = __o["khepriZipper"],
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
        optimize, x, y, arithmetic, arithmetic0, MAX_EXPANSION_DEPTH = 4,
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
            .setWorking(hashtrie.fold((function(p, __o5) {
                var key = __o5["key"];
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
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
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
            return (uid ? getState.map((function(__o5) {
                var bindings = __o5["bindings"],
                    working = __o5["working"];
                return (binding.getBinding(uid, working) || binding.getBinding(uid, bindings));
            })) : pass);
        }),
        canPruneBinding = (function(binding0) {
            return (binding0 && isPrimitive(binding0));
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
                return (hashtrie.get(uid, ctx) < 4);
            }));
        }),
        pushCtx = (function(uid) {
            return modifyCtx((function(ctx) {
                return hashtrie.modify(uid, (function(x0) {
                    return ((x0 + 1) || 1);
                }), ctx);
            }));
        }),
        popCtx = (function(uid) {
            return modifyCtx((function(ctx) {
                return hashtrie.modify(uid, (function(x0) {
                    return ((x0 - 1) || 0);
                }), ctx);
            }));
        }),
        expandNode = (function(exp, f) {
            var uid;
            return (getExpansion(exp) ? ((uid = getUid(exp)), canExpand(uid)
                .chain((function(can) {
                    return (can ? seq(pushCtx(uid), f(getExpansion(exp)), popCtx(uid)) : f(
                        setData(exp, "expansion", null)));
                }))) : f(exp));
        }),
        expand = (function(exp, f) {
            return exp.chain((function(node0) {
                return expandNode(node0, f);
            }));
        }),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
        checkTop = node.chain((function(x0) {
            return _check(x0);
        })),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        when = (function(test, consequent, alternate) {
            return node.chain((function(node0) {
                return (test(node0) ? consequent : (alternate || pass));
            }));
        }),
        addBindingForNode = (function(id, value) {
            var uid = getUid(id);
            return (isPrimitive(value) ? addBinding(uid, value) : (isLambda(value) ? addBinding(uid,
                markExpansion(id, value)) : ((value.type === "Identifier") ? getBinding(getUid(
                    value))
                .chain((function(binding0) {
                    return (binding0 ? addBinding(uid, binding0) : pass);
                })) : pass)));
        }),
        peepholes = ({}),
        addRewrite = (function(type, f) {
            if (Array.isArray(type)) type.forEach((function(type0) {
                return addRewrite(type0, f);
            }));
            else(peepholes[type] = f);
        });
    addRewrite("UnaryOperatorExpression", seq(node.chain((function(__o5) {
        var op = __o5["op"];
        return seq(addGlobal(op), set(builtins[op]));
    })), checkTop));
    addRewrite("BinaryOperatorExpression", seq(node.chain((function(__o5) {
        var op = __o5["op"],
            flipped = __o5["flipped"],
            name = (flipped ? ("_" + op) : op);
        return seq(addGlobal(name), set(builtins[name]));
    })), checkTop));
    addRewrite("TernaryOperatorExpression", seq(addGlobal("?"), set(builtins["?"]), checkTop));
    addRewrite("Program", visitChild("body"));
    addRewrite("Package", visitChild("body"));
    addRewrite("SwitchCase", seq(visitChild("test"), visitChild("consequent")));
    addRewrite("CatchClause", seq(visitChild("param"), visitChild("body")));
    addRewrite("VariableDeclaration", visitChild("declarations"));
    addRewrite("VariableDeclarator", seq(visitChild("init"), when((function(node0) {
        return node0.init;
    }), node.chain((function(node0) {
        return (node0.immutable ? seq(addBindingForNode(node0.id, node0.init), (
            canPruneBinding(node0.init) ? set([]) : pass)) : addWorking(getUid(node0.id),
            node0.init));
    })))));
    addRewrite("Binding", seq(visitChild("value"), when((function(node0) {
        return ((node0.pattern.type === "IdentifierPattern") && getUid(node0.pattern.id));
    }), node.chain((function(node0) {
        return seq(addBindingForNode(node0.pattern.id, node0.value), (canPruneBinding(node0
            .value) ? set([]) : pass));
    }))), when((function(node0) {
        return ((node0 && (node0.type === "Binding")) && (node0.value.type === "LetExpression"));
    }), node.chain((function(node0) {
        var bindings = fun.flatten(fun.concat(node0.value.bindings, ast_declaration.Binding
            .create(null, node0.pattern, node0.value.body)));
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
        "!": __lnot,
        "~": __bnot,
        "typeof": __typeof,
        "++": __plus,
        "--": __minus
    })), seq(visitChild("argument"), when((function(__o5) {
        var operator = __o5["operator"],
            argument = __o5["argument"];
        return (arithmetic[operator] && isPrimitive(argument));
    }), modify((function(__o5) {
        var operator = __o5["operator"],
            argument = __o5["argument"],
            value = arithmetic[operator](argument.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))))));
    addRewrite("AssignmentExpression", seq(visitChild("right"), when((function(__o5) {
        var left = __o5["left"];
        return (left.type === "Identifier");
    }), node.chain((function(node0) {
        return addWorking(getUid(node0.left), node0.right);
    })))));
    addRewrite(["LogicalExpression", "BinaryExpression"], ((arithmetic0 = ({
        "+": __add,
        "-": __sub,
        "*": __mul,
        "/": __div,
        "%": __mod,
        "<<": __blas,
        ">>": __bras,
        ">>>": __brls,
        "<": __lt,
        ">": __gt,
        "<=": __lte,
        ">=": __gte,
        "||": __or,
        "&&": __and
    })), seq(visitChild("left"), visitChild("right"), when((function(__o5) {
        var operator = __o5["operator"],
            left = __o5["left"],
            right0 = __o5["right"];
        return ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right0));
    }), modify((function(__o5) {
        var operator = __o5["operator"],
            left = __o5["left"],
            right0 = __o5["right"],
            value = arithmetic0[operator](left.value, right0.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(visitChild("test"), when((function(node0) {
        return isPrimitive(node0.test);
    }), node.chain((function(__o5) {
        var test = __o5["test"],
            consequent = __o5["consequent"],
            alternate = __o5["alternate"];
        return seq(set((isTruthy(test) ? consequent : alternate)), checkTop);
    })), seq(visitChild("consequent"), visitChild("alternate")))));
    addRewrite("MemberExpression", seq(visitChild("object"), when((function(node0) {
        return node0.computed;
    }), visitChild("property")), when((function(node0) {
        return ((node0.computed && (node0.object.type === "ArrayExpression")) && isNumberish(
            node0.property));
    }), modify((function(node0) {
        return (node0.object.elements[node0.property.value] || ast_value.Identifier.create(
            null, "undefined"));
    }))), when((function(node0) {
        return ((node0.computed && ((node0.object.type === "Literal") && (node0.object.kind ===
            "string"))) && isNumberish(node0.property));
    }), modify((function(node0) {
        var str = node0.object.value,
            idx = node0.property.value;
        return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) :
            ast_value.Identifier.create(null, "undefined"));
    })))));
    addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
    addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args"), when((function(node0) {
        return ((getExpansion(node0.callee) || isLambda(node0.callee)) || ((node0.callee.type ===
            "LetExpression") && isLambda(node0.callee.body)));
    }), expand(node.map((function(node0) {
        return node0.callee;
    })), (function(callee) {
        return ((isLambda(callee) || ((callee.type === "LetExpression") && isLambda(callee.body))) ?
            seq(unique.chain((function(uid) {
                return modify((function(node0) {
                    return expandCallee(uid, callee, node0.args);
                }));
            })), checkTop) : pass);
    })))));
    addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args"), when((function(node0) {
        return ((getExpansion(node0.base) || isLambda(node0.base)) || ((node0.base.type ===
            "LetExpression") && isLambda(node0.base.body)));
    }), expand(node.map((function(node0) {
        return node0.base;
    })), (function(base) {
        return ((isLambda(base) || ((base.type === "LetExpression") && isLambda(base.body))) ?
            seq(unique.chain((function(uid) {
                return modify((function(node0) {
                    return expandCurry(uid, base, node0.args);
                }));
            })), checkTop) : pass);
    })))));
    addRewrite("LetExpression", seq(visitChild("bindings"), visitChild("body"), modify((function(__o5) {
        var loc = __o5["loc"],
            bindings = __o5["bindings"],
            body = __o5["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
    })), when((function(__o5) {
        var bindings = __o5["bindings"];
        return (!bindings.length);
    }), modify((function(__o5) {
        var body = __o5["body"];
        return body;
    })))));
    addRewrite("ArrayExpression", visitChild("elements"));
    addRewrite("ObjectExpression", visitChild("properties"));
    addRewrite("ObjectValue", visitChild("value"));
    addRewrite("Identifier", when((function(node0) {
        return getUid(node0);
    }), node.chain((function(node0) {
        return getBinding(getUid(node0))
            .chain((function(binding0) {
                return ((binding0 && ((isPrimitive(binding0) || (binding0.type ===
                    "Identifier")) || isLambda(binding0))) ? set(binding0) : pass);
            }));
    }))));
    (_check = (function(node0) {
        if (Array.isArray(node0)) {
            if ((!node0.length)) return pass;
            return seq(down, seqa(node0.map((function(_, i) {
                return ((i === (node0.length - 1)) ? checkTop : next(checkTop, right));
            }))), up);
        }
        if (((node0 instanceof Node) && peepholes[node0.type])) return peepholes[node0.type];
        return pass;
    }));
    var initialState = fun.foldl((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return s.setBindings(hashtrie.set(getUid(id), markExpansion(id, def), s.bindings));
    }), State.empty, Object.keys(builtins));
    (optimize = (function(ast, data) {
        return run(next(checkTop, node.chain((function(node0) {
            return globals.chain((function(g) {
                return unique.chain((function(unique0) {
                    return M.of(({
                        "tree": node0,
                        "data": ({
                            "globals": hashtrie.keys(g),
                            "unique": unique0
                        })
                    }));
                }));
            }));
        }))), khepriZipper(ast), initialState, data.unique);
    }));
    (exports["optimize"] = optimize);
}));