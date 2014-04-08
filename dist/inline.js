/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "hashtrie", "khepri-ast-zipper", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/package", "khepri-ast/program", "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state",
    "zipper-m/trans/zipper", "zipper-m/walk", "./ast", "./builtin", "./fun", "./inline/bindings", "./inline/expand",
    "./inline/rename"
], (function(require, exports, record, hashtrie, __o, __o0, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_package, ast_program, ast_value, __o1, Unique, StateT, ZipperT, walk, __o2, __o3, fun,
    binding, __o4, __o5) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setData = __o0["setData"],
        modifyNode = __o0["modify"],
        next = __o1["next"],
        seq = __o1["sequence"],
        seqa = __o1["sequencea"],
        isIdentifier = __o2["isIdentifier"],
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
        concat = fun["concat"],
        expandCallee = __o4["expandCallee"],
        expandCurry = __o4["expandCurry"],
        rename = __o5["rename"],
        incCount = __o5["incCount"],
        optimize, x, y, consequent, alternate, consequent0, alternate0, consequent1, alternate1, consequent2,
            alternate2, arithmetic, consequent3, alternate3, consequent4, alternate4, arithmetic0, consequent5,
            alternate5, consequent6, alternate6, consequent7, alternate7, consequent8, alternate8, consequent9,
            alternate9, exp, consequent10, alternate10, consequent11, alternate11, exp0, consequent12,
            alternate12, consequent13, alternate13, consequent14, alternate14, consequent15, alternate15,
            __plus = (function(x) {
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
        _check, Binding = record.declare(null, ["value", "immutable", "simple"]),
        State = record.declare(null, ["bindings", "working", "globals", "outer", "ctx"]);
    (State.empty = new(State)(binding.empty, binding.empty, hashtrie.empty, null, hashtrie.empty));
    (State.prototype.addBinding = (function(uid, target, simple) {
        var s = this;
        return s.setBindings(binding.setBinding(uid, Binding.create(target, true, simple), s.bindings));
    }));
    (State.prototype.addWorking = (function(uid, target, simple) {
        var s = this;
        return s.setWorking(binding.setBinding(uid, Binding.create(target, false, simple), s.working));
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
            .setCtx(s.ctx)
            .setWorking(hashtrie.fold((function(p, __o6) {
                var key = __o6["key"];
                return hashtrie.set(key, null, p);
            }), s.outer.working, s.working));
    }));
    var markExpansion = (function(id, count, target) {
        return setData(id, "expand", ({
            "count": count,
            "value": target
        }));
    }),
        getExpansion = getUd.bind(null, "expand"),
        M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, state, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
        }),
        pass = M.of(null),
        unique = M.chain.bind(null, M.liftInner(Unique.unique)),
        getState = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        extract = M.chain.bind(null, M.node),
        modify = M.modifyNode,
        set = M.setNode,
        up = M.up,
        down = M.down,
        right = M.right,
        moveChild = M.child,
        addBinding = (function(uid, value, simple) {
            return modifyState((function(s) {
                return s.addBinding(uid, value, simple);
            }));
        }),
        addWorking = (function(uid, value, simple) {
            return modifyState((function(s) {
                return s.addWorking(uid, value, simple);
            }));
        }),
        getBinding = (function(uid) {
            return (uid ? getState.map((function(__o6) {
                var bindings = __o6["bindings"],
                    working = __o6["working"];
                return (binding.getBinding(uid, working) || binding.getBinding(uid, bindings));
            })) : pass);
        }),
        tryPrune = (function(id) {
            var uid = getUid(id);
            return getBinding(uid)
                .chain((function(binding0) {
                    return ((((binding0 && binding0.simple) && (!getExpansion(binding0.value))) &&
                        (isPrimitive(binding0.value) || (binding0.immutable && isIdentifier(
                            binding0.value)))) ? set([]) : pass);
                }));
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
        globals = M.chain.bind(null, getState.map((function(s) {
            return hashtrie.keys(s.globals);
        }))),
        addGlobal = (function(name) {
            return modifyState((function(s) {
                return s.setGlobals(hashtrie.set(name, name, s.globals));
            }));
        }),
        createGlobalDeclarations = (function(g) {
            return ast_declaration.VariableDeclaration.create(null, g.map((function(x0) {
                return ast_declaration.VariableDeclarator.create(null, builtins[x0],
                    definitions[x0]);
            })));
        }),
        child = (function(edge) {
            var args = arguments;
            return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
        }),
        checkTop = extract((function(x0) {
            return _check(x0);
        })),
        visitChild = (function(edge) {
            return child(edge, checkTop);
        }),
        addBindingForNode = (function(id, value) {
            var uid = getUid(id);
            return (isPrimitive(value) ? addBinding(uid, value, true) : (isLambda(value) ? addBinding(uid,
                markExpansion(id, 0, value), true) : (isIdentifier(value) ? getBinding(getUid(value))
                .chain((function(binding0) {
                    return ((binding0 && binding0.immutable) ? addBinding(uid, ((binding0.simple &&
                        binding0.value) ? binding0.value : value), true) : addBinding(
                        uid, value, false));
                })) : addBinding(uid, value, false))));
        }),
        peepholes = ({}),
        addRewrite = (function(type, f) {
            if (Array.isArray(type)) type.forEach((function(type0) {
                return addRewrite(type0, f);
            }));
            else {
                (peepholes[type] = f);
            }
        });
    addRewrite("UnaryOperatorExpression", seq(extract((function(__o6) {
        var op = __o6["op"];
        return seq(addGlobal(op), set(builtins[op]));
    })), checkTop));
    addRewrite("BinaryOperatorExpression", seq(extract((function(__o6) {
        var op = __o6["op"],
            flipped = __o6["flipped"],
            name = (flipped ? ("_" + op) : op);
        return seq(addGlobal(name), set(builtins[name]));
    })), checkTop));
    addRewrite("TernaryOperatorExpression", seq(modifyState((function(s) {
        return s.setGlobals(hashtrie.set("?", "?", s.globals));
    })), set(builtins["?"]), checkTop));
    addRewrite("Program", seq(child("body", checkTop), ((consequent = globals((function(globals0) {
        return modify((function(node) {
            return ast_program.Program.create(node.loc, concat(
                createGlobalDeclarations(globals0), node.body));
        }));
    }))), (alternate = undefined), extract((function(node) {
        return ((node.body.type !== "Package") ? consequent : (alternate || pass));
    })))));
    addRewrite("Package", seq(child("body", checkTop), globals((function(globals0) {
        return modify((function(node) {
            return modifyNode(node, ({
                "body": ((node.body.type === "WithStatement") ? ast_statement.WithStatement
                    .create(node.body.loc, node.body.bindings, ast_statement.BlockStatement
                        .create(null, concat(createGlobalDeclarations(globals0),
                            node.body.body.body))) : concat(
                        createGlobalDeclarations(globals0), node.body))
            }), ({}));
        }));
    }))));
    addRewrite("SwitchCase", seq(child("test", checkTop), child("consequent", checkTop)));
    addRewrite("CatchClause", seq(child("param", checkTop), child("body", checkTop)));
    addRewrite("VariableDeclaration", child("declarations", checkTop));
    addRewrite("VariableDeclarator", seq(child("init", checkTop), ((consequent0 = extract((function(node) {
        return (node.immutable ? seq(addBindingForNode(node.id, node.init), tryPrune(
            node.id)) : addWorking(getUid(node.id), node.init, ((isPrimitive(node.init) ||
            isIdentifier(node.init)) || isLambda(node.init))));
    }))), (alternate0 = undefined), extract((function(node) {
        return (node.init ? consequent0 : (alternate0 || pass));
    })))));
    addRewrite("Binding", seq(child("value", checkTop), ((consequent1 = extract((function(node) {
        return seq(addBindingForNode(node.pattern.id, node.value), tryPrune(node.pattern
            .id));
    }))), (alternate1 = undefined), extract((function(node) {
        return (((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id)) ?
            consequent1 : (alternate1 || pass));
    }))), ((consequent2 = extract((function(node) {
        var bindings = fun.flatten(concat(node.value.bindings, ast_declaration.Binding.create(
            null, node.pattern, node.value.body)));
        return seq(set(bindings), visitChild((bindings.length - 1)));
    }))), (alternate2 = undefined), extract((function(node) {
        return ((((node && (node.type === "Binding")) && node.value) && (node.value.type ===
            "LetExpression")) ? consequent2 : (alternate2 || pass));
    })))));
    addRewrite("BlockStatement", child("body", checkTop));
    addRewrite("ExpressionStatement", child("expression", checkTop));
    addRewrite("WithStatement", seq(child("bindings", checkTop), child("body", checkTop)));
    addRewrite("SwitchStatement", seq(child("discriminant", checkTop), child("cases", checkTop)));
    addRewrite(["ReturnStatement", "ThrowStatement"], child("argument", checkTop));
    addRewrite("TryStatement", seq(child("block", checkTop), child("handler", checkTop), child("finalizer",
        checkTop)));
    addRewrite("WhileStatement", block(child("test", checkTop), child("body", checkTop)));
    addRewrite("DoWhileStatement", block(child("body", checkTop), child("test", checkTop)));
    addRewrite("ForStatement", seq(child("init", checkTop), block(child("test", checkTop), child("update",
        checkTop), child("body", checkTop))));
    addRewrite("FunctionExpression", block(child("id", checkTop), child("params", checkTop), child("body",
        checkTop)));
    addRewrite("UnaryExpression", ((arithmetic = ({
        "!": __lnot,
        "~": __bnot,
        "typeof": __typeof,
        "++": __plus,
        "--": __minus
    })), seq(child("argument", checkTop), ((consequent3 = modify((function(node) {
        var operator = node["operator"],
            argument = node["argument"],
            value = arithmetic[operator](argument.value);
        return ast_value.Literal.create(node.loc, (typeof value), value);
    }))), (alternate3 = undefined), extract((function(node) {
        var operator, argument;
        return (((operator = node["operator"]), (argument = node["argument"]), (
            arithmetic[operator] && isPrimitive(argument))) ? consequent3 : (
            alternate3 || pass));
    }))))));
    addRewrite("AssignmentExpression", seq(child("right", checkTop), ((consequent4 = extract((function(node) {
        return addWorking(getUid(node.left), node.right);
    }))), (alternate4 = undefined), extract((function(node) {
        var left;
        return (((left = node["left"]), (left.type === "Identifier")) ? consequent4 : (
            alternate4 || pass));
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
    })), seq(child("left", checkTop), child("right", checkTop), ((consequent5 = modify((function(__o6) {
        var operator = __o6["operator"],
            left = __o6["left"],
            right0 = __o6["right"],
            value = arithmetic0[operator](left.value, right0.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))), (alternate5 = undefined), extract((function(node) {
        var operator, left, right0;
        return (((operator = node["operator"]), (left = node["left"]), (right0 = node[
            "right"]), ((arithmetic0[operator] && isPrimitive(left)) &&
            isPrimitive(right0))) ? consequent5 : (alternate5 || pass));
    }))))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(child("test", checkTop), ((consequent6 = extract((
            function(__o6) {
                var test = __o6["test"],
                    consequent7 = __o6["consequent"],
                    alternate6 = __o6["alternate"];
                return seq(set((isTruthy(test) ? consequent7 : alternate6)), checkTop);
            }))), (alternate6 = seq(child("consequent", checkTop), child("alternate", checkTop))),
        extract((function(node) {
            return (isPrimitive(node.test) ? consequent6 : (alternate6 || pass));
        })))));
    addRewrite("MemberExpression", seq(child("object", checkTop), ((consequent7 = child("property", checkTop)), (
        alternate7 = undefined), extract((function(node) {
        return (node.computed ? consequent7 : (alternate7 || pass));
    }))), ((consequent8 = modify((function(node) {
        return (node.object.elements[node.property.value] || ast_value.Identifier.create(
            null, "undefined"));
    }))), (alternate8 = undefined), extract((function(node) {
        return (((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(
            node.property)) ? consequent8 : (alternate8 || pass));
    }))), ((consequent9 = modify((function(node) {
        var str = node.object.value,
            idx = node.property.value;
        return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) :
            ast_value.Identifier.create(null, "undefined"));
    }))), (alternate9 = undefined), extract((function(node) {
        return (((node.computed && ((node.object.type === "Literal") && (node.object.kind ===
            "string"))) && isNumberish(node.property)) ? consequent9 : (alternate9 ||
            pass));
    })))));
    addRewrite("NewExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CallExpression", seq(child("callee", checkTop), child("args", checkTop), ((exp = M.node.map((
        function(node) {
            return node.callee;
        }))), (consequent10 = exp.chain((function(x0) {
        var exp0, callee = (getExpansion(x0) ? ((exp0 = getExpansion(x0)), ((exp0.count <
                1) ? exp0.value : setData(x0, "expand", null))) : x0);
        return modify((function(node) {
            return incCount(getUid(node.callee), (getExpansion(node.callee)
                    .count || 1), getExpansion(node.callee)
                .countvalue, ast_expression.CallExpression.create(node.loc,
                    callee, node.args));
        }));
    }))), (alternate10 = undefined), extract((function(node) {
        return (getExpansion(node.callee) ? consequent10 : (alternate10 || pass));
    }))), ((consequent11 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCallee(uid, node.callee, node.args);
        }));
    })), checkTop)), (alternate11 = undefined), extract((function(node) {
        return ((isLambda(node.callee) || ((node.callee.type === "LetExpression") &&
            isLambda(node.callee.body))) ? consequent11 : (alternate11 || pass));
    })))));
    addRewrite("CurryExpression", seq(child("base", checkTop), child("args", checkTop), ((exp0 = M.node.map((
        function(node) {
            return node.base;
        }))), (consequent12 = exp0.chain((function(x0) {
        var exp1, base = (getExpansion(x0) ? ((exp1 = getExpansion(x0)), ((exp1.count <
                1) ? exp1.value : setData(x0, "expand", null))) : x0);
        return modify((function(node) {
            return incCount(getUid(node.base), getExpansion(node.base),
                getExpansion(node.base)
                .value, ast_expression.CurryExpression.create(node.loc, base,
                    node.args));
        }));
    }))), (alternate12 = undefined), extract((function(node) {
        return (getExpansion(node.base) ? consequent12 : (alternate12 || pass));
    }))), ((consequent13 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCurry(uid, node.base, node.args);
        }));
    })), checkTop)), (alternate13 = undefined), extract((function(node) {
        return ((isLambda(node.base) || ((node.base.type === "LetExpression") && isLambda(
            node.base.body))) ? consequent13 : (alternate13 || pass));
    })))));
    addRewrite("LetExpression", seq(child("bindings", checkTop), child("body", checkTop), modify((function(__o6) {
        var loc = __o6["loc"],
            bindings = __o6["bindings"],
            body = __o6["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
    })), ((consequent14 = modify((function(__o6) {
        var body = __o6["body"];
        return body;
    }))), (alternate14 = undefined), extract((function(node) {
        var bindings;
        return (((bindings = node["bindings"]), (!bindings.length)) ? consequent14 : (
            alternate14 || pass));
    })))));
    addRewrite("ArgumentsPattern", seq(child("id", checkTop), child("elements", checkTop), child("self",
        checkTop)));
    addRewrite("IdentifierPattern", extract((function(node) {
        return addBinding(getUid(node.id), null, true);
    })));
    addRewrite("ArrayExpression", child("elements", checkTop));
    addRewrite("ObjectExpression", child("properties", checkTop));
    addRewrite("ObjectValue", child("value", checkTop));
    addRewrite("Identifier", ((consequent15 = extract((function(node) {
        return getBinding(getUid(node))
            .chain((function(binding0) {
                return (((binding0 && binding0.value) && binding0.simple) ? set(
                    binding0.value) : pass);
            }));
    }))), (alternate15 = undefined), extract((function(node) {
        return ((getUid(node) && (!getExpansion(node))) ? consequent15 : (alternate15 || pass));
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
        return s.addBinding(getUid(id), markExpansion(id, 0, def), true);
    }), State.empty, Object.keys(builtins));
    (optimize = (function(ast, data) {
        return run(next(checkTop, extract((function(node) {
            return globals((function(g) {
                return unique((function(unique0) {
                    return M.of(({
                        "tree": node,
                        "data": ({
                            "globals": g,
                            "unique": unique0
                        })
                    }));
                }));
            }));
        }))), khepriZipper(ast), initialState, data.unique);
    }));
    (exports["optimize"] = optimize);
}));