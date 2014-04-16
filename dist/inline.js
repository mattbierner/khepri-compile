/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hamt", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/package", "khepri-ast/program", "khepri-ast/value",
    "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/tree", "zipper-m/walk", "./ast", "./builtin",
    "./fun", "./inline/bindings", "./inline/expand", "./inline/rename"
], (function(require, exports, record, hamt, __o, ast_declaration, ast_statement, ast_expression, ast_pattern,
    ast_package, ast_program, ast_value, __o0, Unique, StateT, TreeZipperT, walk, __o1, builtin, fun, binding,
    __o2, __o3) {
    "use strict";
    var Node = __o["Node"],
        setData = __o["setData"],
        modifyNode = __o["modify"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        type = __o1["type"],
        isIdentifier = __o1["isIdentifier"],
        getUd = __o1["getUd"],
        getUid = __o1["getUid"],
        isLambda = __o1["isLambda"],
        isLambdaWithoutArgs = __o1["isLambdaWithoutArgs"],
        isPrimitive = __o1["isPrimitive"],
        isNumberish = __o1["isNumberish"],
        isTruthy = __o1["isTruthy"],
        builtins = builtin["builtins"],
        definitions = builtin["definitions"],
        flattenr = fun["flattenr"],
        flatten = fun["flatten"],
        concat = fun["concat"],
        expandCallee = __o2["expandCallee"],
        expandCurry = __o2["expandCurry"],
        rename = __o3["rename"],
        incCount = __o3["incCount"],
        optimize, x, y, consequent, consequent0, consequent1, consequent2, arithmetic, consequent3, x0,
            consequent4, arithmetic0, consequent5, y0, consequent6, alternate, consequent7, consequent8,
            consequent9, consequent10, exp, consequent11, consequent12, exp0, consequent13, consequent14,
            consequent15, consequent16, __and = (function(x, y) {
                return (x && y);
            }),
        __plus = (function(x) {
            return (+x);
        }),
        __minus = (function(x) {
            return (-x);
        }),
        __blas = (function(x, y) {
            return (x << y);
        }),
        __or = (function(x, y) {
            return (x || y);
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
        __mod = (function(x, y) {
            return (x % y);
        }),
        __mul = (function(x, y) {
            return (x * y);
        }),
        __add = (function(x, y) {
            return (x + y);
        }),
        __sub = (function(x, y) {
            return (x - y);
        }),
        __div = (function(x, y) {
            return (x / y);
        }),
        __typeof = (function(x) {
            return (typeof x);
        }),
        __lt = (function(x, y) {
            return (x < y);
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
        __gte = (function(x, y) {
            return (x >= y);
        }),
        _check, Binding = record.declare(null, ["value", "immutable", "simple"]),
        State = record.declare(null, ["bindings", "working", "globals", "outer"]);
    (State.empty = new(State)(binding.empty, binding.empty, hamt.empty, null));
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
            .setWorking(hamt.fold((function(p, __o4) {
                var key = __o4["key"];
                return hamt.set(key, null, p);
            }), s.outer.working, s.working));
    }));
    var markExpansion = (function(id, count, target) {
        return setData(id, "expand", ({
            "count": count,
            "value": target
        }));
    }),
        getExpansion = getUd.bind(null, "expand"),
        M = TreeZipperT(StateT(Unique)),
        run = (function(c, ctx, state, seed) {
            return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(c, ctx), state), seed);
        }),
        pass = M.of(null),
        unique = M.chain.bind(null, M.liftInner(Unique.unique)),
        getState = M.lift(M.inner.get),
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
            return x(y(x0));
        })),
        extractCtx = M.get,
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
            return (uid ? getState.map((function(__o4) {
                var bindings = __o4["bindings"],
                    working = __o4["working"];
                return (binding.getBinding(uid, bindings) || binding.getBinding(uid, working));
            })) : pass);
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
            return hamt.keys(s.globals);
        }))),
        addGlobal = (function(name) {
            return modifyState((function(s) {
                return s.setGlobals(hamt.set(name, name, s.globals));
            }));
        }),
        createGlobalDeclarations = (function(g) {
            return ast_declaration.VariableDeclaration.create(null, g.map((function(x0) {
                return ast_declaration.VariableDeclarator.create(null, builtins[x0],
                    definitions[x0]);
            })));
        }),
        child = (function(edge) {
            var __args = arguments,
                ops = [].slice.call(__args, 1);
            return seq(moveChild(edge), seqa(ops), up);
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
        addWorkingForNode = (function(id, value) {
            var uid = getUid(id);
            return (isPrimitive(value) ? addWorking(uid, value, true) : (isLambda(value) ? addWorking(uid,
                markExpansion(id, 0, value), true) : (isIdentifier(value) ? getBinding(getUid(value))
                .chain((function(binding0) {
                    return ((binding0 && binding0.immutable) ? addWorking(uid, ((binding0.simple &&
                        binding0.value) ? binding0.value : value), true) : addWorking(
                        uid, value, false));
                })) : addWorking(uid, value, false))));
        }),
        peepholes = ({}),
        addRewrite = (function(type0, f) {
            if (Array.isArray(type0)) type0.forEach((function(type1) {
                return addRewrite(type1, f);
            }));
            else {
                (peepholes[type0] = f);
            }
        });
    addRewrite("UnaryOperatorExpression", seq(extract((function(__o4) {
        var op = __o4["op"];
        return (builtins[op] ? seq(addGlobal(op), set(builtins[op])) : unique((function(uid) {
            return set(builtin.member(op, uid));
        })));
    })), checkTop));
    addRewrite("BinaryOperatorExpression", seq(extract((function(__o4) {
        var op = __o4["op"],
            flipped = __o4["flipped"],
            name = (flipped ? ("_" + op) : op);
        return seq(addGlobal(name), set(builtins[name]));
    })), checkTop));
    addRewrite("TernaryOperatorExpression", seq(modifyState((function(s) {
        return s.setGlobals(hamt.set("?", "?", s.globals));
    })), set(builtins["?"]), checkTop));
    addRewrite("Program", seq(child("body", checkTop), ((consequent = globals((function(globals0) {
        return modify((function(node) {
            return ast_program.Program.create(node.loc, concat(
                createGlobalDeclarations(globals0), node.body));
        }));
    }))), extract((function(node) {
        return ((node.body.type !== "Package") ? consequent : (undefined || pass));
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
        return (node.immutable ? addBindingForNode(node.id, node.init) : addWorking(
            getUid(node.id), node.init, ((isPrimitive(node.init) || isIdentifier(
                node.init)) || isLambda(node.init))));
    }))), extract((function(node) {
        return (node.init ? consequent0 : (undefined || pass));
    })))));
    addRewrite("Binding", seq(child("value", checkTop), ((consequent1 = extract((function(node) {
        return addBindingForNode(node.pattern.id, node.value);
    }))), extract((function(node) {
        return (((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id)) ?
            consequent1 : (undefined || pass));
    }))), ((consequent2 = extract((function(node) {
        var bindings = fun.flatten(concat(node.value.bindings, ast_declaration.Binding.create(
            null, node.pattern, node.value.body)));
        return seq(set(bindings), visitChild((bindings.length - 1)));
    }))), extract((function(node) {
        return ((((node && (node.type === "Binding")) && node.value) && (node.value.type ===
            "LetExpression")) ? consequent2 : (undefined || pass));
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
    })), seq(child("argument", checkTop), ((consequent3 = modify((function(__o4) {
        var loc = __o4["loc"],
            operator = __o4["operator"],
            argument = __o4["argument"],
            value = arithmetic[operator](argument.value);
        return ast_value.Literal.create(loc, (typeof value), value);
    }))), extract((function(node) {
        var operator, argument;
        return (((operator = node["operator"]), (argument = node["argument"]), (
            arithmetic[operator] && isPrimitive(argument))) ? consequent3 : (
            undefined || pass));
    }))))));
    addRewrite("AssignmentExpression", seq(child("right", checkTop), ((x0 = type), (consequent4 = extract((
        function(__o4) {
            var operator = __o4["operator"],
                left = __o4["left"],
                right0 = __o4["right"];
            return ((operator === "=") ? addWorkingForNode(left, right0) :
                addBindingForNode(left, right0));
        }))), extract((function(node) {
        var x1, y0;
        return (((x1 = node.left), (y0 = x0(x1)), ("Identifier" === y0)) ? consequent4 : (
            undefined || pass));
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
    })), seq(child("left", checkTop), child("right", checkTop), ((consequent5 = modify((function(__o4) {
        var operator = __o4["operator"],
            left = __o4["left"],
            right0 = __o4["right"],
            value = arithmetic0[operator](left.value, right0.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))), extract((function(node) {
        var operator, left, right0;
        return (((operator = node["operator"]), (left = node["left"]), (right0 = node[
            "right"]), ((arithmetic0[operator] && isPrimitive(left)) &&
            isPrimitive(right0))) ? consequent5 : (undefined || pass));
    }))))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(child("test", checkTop), ((y0 = isPrimitive), (
            consequent6 = extract((function(__o4) {
                var test = __o4["test"],
                    consequent7 = __o4["consequent"],
                    alternate = __o4["alternate"];
                return seq(set((isTruthy(test) ? consequent7 : alternate)), checkTop);
            }))), (alternate = seq(child("consequent", checkTop), child("alternate", checkTop))),
        extract((function(node) {
            return (y0(node.test) ? consequent6 : (alternate || pass));
        })))));
    addRewrite("MemberExpression", seq(child("object", checkTop), ((consequent7 = child("property", checkTop)),
        extract((function(node) {
            return (node.computed ? consequent7 : (undefined || pass));
        }))), ((consequent8 = modify((function(__o4) {
        var object = __o4["object"],
            property = __o4["property"];
        return (object.elements[property.value] || builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(
            node.property)) ? consequent8 : (undefined || pass));
    }))), ((consequent9 = modify((function(__o4) {
        var object = __o4["object"];
        return ast_value.Literal.create(null, "number", object.elements.length);
    }))), extract((function(node) {
        return ((((node.type === "MemberExpression") && (node.object.type ===
            "ArrayExpression")) && (((!node.computed) && (node.property.name ===
            "length")) || ((node.computed && (node.property.type === "Literal")) &&
            (node.property.value === "length")))) ? consequent9 : (undefined || pass));
    }))), ((consequent10 = modify((function(node) {
        var str = node.object.value,
            idx = node.property.value;
        return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) :
            builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && ((node.object.type === "Literal") && (node.object.kind ===
            "string"))) && isNumberish(node.property)) ? consequent10 : (undefined ||
            pass));
    })))));
    addRewrite("NewExpression", seq(child("callee", checkTop), child("args", checkTop)));
    addRewrite("CallExpression", seq(child("callee", checkTop), child("args", checkTop), ((exp = M.node.map((
        function(x1) {
            return x1.callee;
        }))), (consequent11 = exp.chain((function(x1) {
        var exp0, callee = (getExpansion(x1) ? ((exp0 = getExpansion(x1)), ((exp0.count <
                1) ? exp0.value : setData(x1, "expand", null))) : x1);
        return modify((function(node) {
            return incCount(getUid(node.callee), (getExpansion(node.callee)
                    .count || 1), getExpansion(node.callee)
                .countvalue, ast_expression.CallExpression.create(node.loc,
                    callee, node.args));
        }));
    }))), extract((function(node) {
        return (getExpansion(node.callee) ? consequent11 : (undefined || pass));
    }))), ((consequent12 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCallee(uid, node.callee, node.args);
        }));
    })), checkTop)), extract((function(node) {
        return ((isLambda(node.callee) || ((node.callee.type === "LetExpression") &&
            isLambda(node.callee.body))) ? consequent12 : (undefined || pass));
    })))));
    addRewrite("CurryExpression", seq(child("base", checkTop), child("args", checkTop), ((exp0 = M.node.map((
        function(x1) {
            return x1.base;
        }))), (consequent13 = exp0.chain((function(x1) {
        var exp1, base = (getExpansion(x1) ? ((exp1 = getExpansion(x1)), ((exp1.count <
                1) ? exp1.value : setData(x1, "expand", null))) : x1);
        return modify((function(node) {
            return incCount(getUid(node.base), getExpansion(node.base),
                getExpansion(node.base)
                .value, ast_expression.CurryExpression.create(node.loc, base,
                    node.args));
        }));
    }))), extract((function(node) {
        return (getExpansion(node.base) ? consequent13 : (undefined || pass));
    }))), ((consequent14 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCurry(uid, node.base, node.args);
        }));
    })), checkTop)), extract((function(node) {
        return ((isLambdaWithoutArgs(node.base) || ((node.base.type === "LetExpression") &&
            isLambdaWithoutArgs(node.base.body))) ? consequent14 : (undefined || pass));
    })))));
    addRewrite("LetExpression", seq(child("bindings", checkTop), child("body", checkTop), modify((function(__o4) {
        var loc = __o4["loc"],
            bindings = __o4["bindings"],
            body = __o4["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
    })), ((consequent15 = modify((function(__o4) {
        var body = __o4["body"];
        return body;
    }))), extract((function(node) {
        var bindings;
        return (((bindings = node["bindings"]), (!bindings.length)) ? consequent15 : (
            undefined || pass));
    })))));
    addRewrite("ArgumentsPattern", seq(child("id", checkTop), child("elements", checkTop), child("self",
        checkTop)));
    addRewrite("IdentifierPattern", extract((function(node) {
        return addBinding(getUid(node.id), null, true);
    })));
    addRewrite("ArrayExpression", child("elements", checkTop));
    addRewrite("ObjectExpression", child("properties", checkTop));
    addRewrite("ObjectValue", child("value", checkTop));
    addRewrite("Identifier", ((consequent16 = extract((function(node) {
        return getBinding(getUid(node))
            .chain((function(binding0) {
                return (((binding0 && binding0.value) && binding0.simple) ? set(
                    binding0.value) : pass);
            }));
    }))), extract((function(node) {
        return ((getUid(node) && (!getExpansion(node))) ? consequent16 : (undefined || pass));
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
        return run(next(checkTop, extractCtx.chain((function(node) {
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
        }))), ast, initialState, data.unique);
    }));
    (exports["optimize"] = optimize);
}));