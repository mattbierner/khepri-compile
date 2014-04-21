/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/inline.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hamt", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/package", "khepri-ast/program", "khepri-ast/value",
    "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/tree", "zipper-m/walk", "../ast", "../builtin",
    "../fun", "./bindings", "./expand", "./rename"
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
        optimize, x, y, __args, ops, consequent, __args0, ops0, __args1, ops1, __args2, ops2, __args3, ops3,
            __args4, ops4, __args5, ops5, __args6, ops6, consequent0, __args7, ops7, consequent1, consequent2,
            __args8, ops8, __args9, ops9, __args10, ops10, __args11, ops11, __args12, ops12, __args13, ops13,
            __args14, ops14, __args15, ops15, __args16, ops16, __args17, ops17, body, __args18, ops18, __args19,
            ops19, body0, __args20, ops20, __args21, ops21, __args22, ops22, body1, __args23, ops23, __args24,
            ops24, __args25, ops25, body2, __args26, ops26, __args27, ops27, __args28, ops28, arithmetic,
            __args29, ops29, consequent3, __args30, ops30, x0, consequent4, arithmetic0, __args31, ops31,
            __args32, ops32, consequent5, consequent6, __args33, ops33, y0, consequent7, alternate, __args34,
            ops34, __args35, ops35, __args36, ops36, __args37, ops37, consequent8, consequent9, consequent10,
            consequent11, __args38, ops38, __args39, ops39, __args40, ops40, __args41, ops41, exp, consequent12,
            consequent13, __args42, ops42, __args43, ops43, exp0, consequent14, consequent15, __args44, ops44,
            __args45, ops45, x1, consequent16, consequent17, __args46, ops46, __args47, ops47, __args48, ops48,
            __args49, ops49, __args50, ops50, __args51, ops51, consequent18, __and = (function(x, y) {
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
        modifyState = ((x = M.lift), (y = M.inner.modify), (function(z) {
            return x(y(z));
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
    addRewrite("Program", seq(((__args = ["body", checkTop]), (ops = [].slice.call(__args, 1)), seq(moveChild(
        "body"), seqa(ops), up)), ((consequent = globals((function(globals0) {
        return modify((function(node) {
            return ast_program.Program.create(node.loc, concat(
                createGlobalDeclarations(globals0), node.body));
        }));
    }))), extract((function(node) {
        return ((node.body.type !== "Package") ? consequent : (undefined || pass));
    })))));
    addRewrite("Package", seq(((__args0 = ["body", checkTop]), (ops0 = [].slice.call(__args0, 1)), seq(
        moveChild("body"), seqa(ops0), up)), globals((function(globals0) {
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
    addRewrite("SwitchCase", seq(((__args1 = ["test", checkTop]), (ops1 = [].slice.call(__args1, 1)), seq(
        moveChild("test"), seqa(ops1), up)), ((__args2 = ["consequent", checkTop]), (ops2 = [].slice.call(
        __args2, 1)), seq(moveChild("consequent"), seqa(ops2), up))));
    addRewrite("CatchClause", seq(((__args3 = ["param", checkTop]), (ops3 = [].slice.call(__args3, 1)), seq(
        moveChild("param"), seqa(ops3), up)), ((__args4 = ["body", checkTop]), (ops4 = [].slice.call(
        __args4, 1)), seq(moveChild("body"), seqa(ops4), up))));
    addRewrite("VariableDeclaration", ((__args5 = ["declarations", checkTop]), (ops5 = [].slice.call(__args5, 1)),
        seq(moveChild("declarations"), seqa(ops5), up)));
    addRewrite("VariableDeclarator", seq(((__args6 = ["init", checkTop]), (ops6 = [].slice.call(__args6, 1)),
        seq(moveChild("init"), seqa(ops6), up)), ((consequent0 = extract((function(node) {
        return (node.immutable ? seq(addBindingForNode(node.id, node.init), tryPrune(
            node.id)) : addWorking(getUid(node.id), node.init, ((isPrimitive(node.init) ||
            isIdentifier(node.init)) || isLambda(node.init))));
    }))), extract((function(node) {
        return (node.init ? consequent0 : (undefined || pass));
    })))));
    addRewrite("Binding", seq(((__args7 = ["value", checkTop]), (ops7 = [].slice.call(__args7, 1)), seq(
        moveChild("value"), seqa(ops7), up)), ((consequent1 = extract((function(node) {
        return seq(addBindingForNode(node.pattern.id, node.value), tryPrune(node.pattern
            .id));
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
    addRewrite("BlockStatement", ((__args8 = ["body", checkTop]), (ops8 = [].slice.call(__args8, 1)), seq(
        moveChild("body"), seqa(ops8), up)));
    addRewrite("ExpressionStatement", ((__args9 = ["expression", checkTop]), (ops9 = [].slice.call(__args9, 1)),
        seq(moveChild("expression"), seqa(ops9), up)));
    addRewrite("WithStatement", seq(((__args10 = ["bindings", checkTop]), (ops10 = [].slice.call(__args10, 1)),
        seq(moveChild("bindings"), seqa(ops10), up)), ((__args11 = ["body", checkTop]), (ops11 = [].slice
        .call(__args11, 1)), seq(moveChild("body"), seqa(ops11), up))));
    addRewrite("SwitchStatement", seq(((__args12 = ["discriminant", checkTop]), (ops12 = [].slice.call(__args12,
        1)), seq(moveChild("discriminant"), seqa(ops12), up)), ((__args13 = ["cases", checkTop]), (
        ops13 = [].slice.call(__args13, 1)), seq(moveChild("cases"), seqa(ops13), up))));
    addRewrite(["ReturnStatement", "ThrowStatement"], ((__args14 = ["argument", checkTop]), (ops14 = [].slice.call(
        __args14, 1)), seq(moveChild("argument"), seqa(ops14), up)));
    addRewrite("TryStatement", seq(((__args15 = ["block", checkTop]), (ops15 = [].slice.call(__args15, 1)), seq(
        moveChild("block"), seqa(ops15), up)), ((__args16 = ["handler", checkTop]), (ops16 = [].slice.call(
        __args16, 1)), seq(moveChild("handler"), seqa(ops16), up)), ((__args17 = ["finalizer", checkTop]), (
        ops17 = [].slice.call(__args17, 1)), seq(moveChild("finalizer"), seqa(ops17), up))));
    addRewrite("WhileStatement", ((body = [((__args18 = ["test", checkTop]), (ops18 = [].slice.call(__args18, 1)),
        seq(moveChild("test"), seqa(ops18), up)), ((__args19 = ["body", checkTop]), (ops19 = []
        .slice.call(__args19, 1)), seq(moveChild("body"), seqa(ops19), up))]), seq(push, seqa(body),
        pop)));
    addRewrite("DoWhileStatement", ((body0 = [((__args20 = ["body", checkTop]), (ops20 = [].slice.call(__args20,
        1)), seq(moveChild("body"), seqa(ops20), up)), ((__args21 = ["test", checkTop]), (ops21 = []
        .slice.call(__args21, 1)), seq(moveChild("test"), seqa(ops21), up))]), seq(push, seqa(body0),
        pop)));
    addRewrite("ForStatement", seq(((__args22 = ["init", checkTop]), (ops22 = [].slice.call(__args22, 1)), seq(
        moveChild("init"), seqa(ops22), up)), ((body1 = [((__args23 = ["test", checkTop]), (ops23 = [].slice
        .call(__args23, 1)), seq(moveChild("test"), seqa(ops23), up)), ((__args24 = [
        "update", checkTop
    ]), (ops24 = [].slice.call(__args24, 1)), seq(moveChild("update"), seqa(ops24), up)), (
        (__args25 = ["body", checkTop]), (ops25 = [].slice.call(__args25, 1)), seq(
            moveChild("body"), seqa(ops25), up))]), seq(push, seqa(body1), pop))));
    addRewrite("FunctionExpression", ((body2 = [((__args26 = ["id", checkTop]), (ops26 = [].slice.call(__args26,
        1)), seq(moveChild("id"), seqa(ops26), up)), ((__args27 = ["params", checkTop]), (ops27 = []
        .slice.call(__args27, 1)), seq(moveChild("params"), seqa(ops27), up)), ((__args28 = [
        "body", checkTop
    ]), (ops28 = [].slice.call(__args28, 1)), seq(moveChild("body"), seqa(ops28), up))]), seq(push,
        seqa(body2), pop)));
    addRewrite("UnaryExpression", ((arithmetic = ({
        "!": __lnot,
        "~": __bnot,
        "typeof": __typeof,
        "++": __plus,
        "--": __minus
    })), seq(((__args29 = ["argument", checkTop]), (ops29 = [].slice.call(__args29, 1)), seq(moveChild(
        "argument"), seqa(ops29), up)), ((consequent3 = modify((function(__o4) {
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
    addRewrite("AssignmentExpression", seq(((__args30 = ["right", checkTop]), (ops30 = [].slice.call(__args30,
        1)), seq(moveChild("right"), seqa(ops30), up)), ((x0 = type), (consequent4 = extract((function(
        __o4) {
        var operator = __o4["operator"],
            left = __o4["left"],
            right0 = __o4["right"];
        return ((operator === "=") ? addWorkingForNode(left, right0) :
            addBindingForNode(left, right0));
    }))), extract((function(node) {
        var z, y0;
        return (((z = node.left), (y0 = x0(z)), ("Identifier" === y0)) ? consequent4 : (
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
    })), seq(((__args31 = ["left", checkTop]), (ops31 = [].slice.call(__args31, 1)), seq(moveChild(
        "left"), seqa(ops31), up)), ((__args32 = ["right", checkTop]), (ops32 = [].slice.call(
        __args32, 1)), seq(moveChild("right"), seqa(ops32), up)), ((consequent5 = modify((function(
        __o4) {
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
    }))), ((consequent6 = extract((function(__o4) {
        var operator = __o4["operator"],
            left = __o4["left"],
            right0 = __o4["right"];
        return seq(addGlobal(operator), set(ast_expression.CallExpression.create(
            null, builtins[operator], [left, right0])), checkTop);
    }))), extract((function(node) {
        var operator;
        return (((operator = node["operator"]), ((((operator === "\\>") || (operator ===
                "\\>>")) || (operator === "<\\")) || (operator === "<<\\"))) ?
            consequent6 : (undefined || pass));
    }))))));
    addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args33 = ["test", checkTop]), (ops33 = [].slice
        .call(__args33, 1)), seq(moveChild("test"), seqa(ops33), up)), ((y0 = isPrimitive), (
        consequent7 = extract((function(__o4) {
            var test = __o4["test"],
                consequent8 = __o4["consequent"],
                alternate = __o4["alternate"];
            return seq(set((isTruthy(test) ? consequent8 : alternate)), checkTop);
        }))), (alternate = seq(((__args34 = ["consequent", checkTop]), (ops34 = [].slice.call(
        __args34, 1)), seq(moveChild("consequent"), seqa(ops34), up)), ((__args35 = [
        "alternate", checkTop
    ]), (ops35 = [].slice.call(__args35, 1)), seq(moveChild("alternate"), seqa(ops35),
        up)))), extract((function(node) {
        return (y0(node.test) ? consequent7 : (alternate || pass));
    })))));
    addRewrite("MemberExpression", seq(((__args36 = ["object", checkTop]), (ops36 = [].slice.call(__args36, 1)),
        seq(moveChild("object"), seqa(ops36), up)), ((__args37 = ["property", checkTop]), (ops37 = [].slice
        .call(__args37, 1)), (consequent8 = seq(moveChild("property"), seqa(ops37), up)), extract((
        function(node) {
            return (node.computed ? consequent8 : (undefined || pass));
        }))), ((consequent9 = modify((function(__o4) {
        var object = __o4["object"],
            property = __o4["property"];
        return (object.elements[property.value] || builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(
            node.property)) ? consequent9 : (undefined || pass));
    }))), ((consequent10 = modify((function(__o4) {
        var object = __o4["object"];
        return ast_value.Literal.create(null, "number", object.elements.length);
    }))), extract((function(node) {
        return ((((node.type === "MemberExpression") && (node.object.type ===
            "ArrayExpression")) && (((!node.computed) && (node.property.name ===
            "length")) || ((node.computed && (node.property.type === "Literal")) &&
            (node.property.value === "length")))) ? consequent10 : (undefined || pass));
    }))), ((consequent11 = modify((function(node) {
        var str = node.object.value,
            idx = node.property.value;
        return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) :
            builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && ((node.object.type === "Literal") && (node.object.kind ===
            "string"))) && isNumberish(node.property)) ? consequent11 : (undefined ||
            pass));
    })))));
    addRewrite("NewExpression", seq(((__args38 = ["callee", checkTop]), (ops38 = [].slice.call(__args38, 1)),
        seq(moveChild("callee"), seqa(ops38), up)), ((__args39 = ["args", checkTop]), (ops39 = [].slice
        .call(__args39, 1)), seq(moveChild("args"), seqa(ops39), up))));
    addRewrite("CallExpression", seq(((__args40 = ["callee", checkTop]), (ops40 = [].slice.call(__args40, 1)),
        seq(moveChild("callee"), seqa(ops40), up)), ((__args41 = ["args", checkTop]), (ops41 = [].slice
        .call(__args41, 1)), seq(moveChild("args"), seqa(ops41), up)), ((exp = M.node.map((function(x1) {
        return x1.callee;
    }))), (consequent12 = exp.chain((function(z) {
        var exp0, callee = (getExpansion(z) ? ((exp0 = getExpansion(z)), ((exp0.count <
                1) ? exp0.value : setData(z, "expand", null))) : z);
        return modify((function(node) {
            return incCount(getUid(node.callee), (getExpansion(node.callee)
                    .count || 1), getExpansion(node.callee)
                .countvalue, ast_expression.CallExpression.create(node.loc,
                    callee, node.args));
        }));
    }))), extract((function(node) {
        return (getExpansion(node.callee) ? consequent12 : (undefined || pass));
    }))), ((consequent13 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCallee(uid, node.callee, node.args);
        }));
    })), checkTop)), extract((function(node) {
        return ((isLambda(node.callee) || ((node.callee.type === "LetExpression") &&
            isLambda(node.callee.body))) ? consequent13 : (undefined || pass));
    })))));
    addRewrite("CurryExpression", seq(((__args42 = ["base", checkTop]), (ops42 = [].slice.call(__args42, 1)),
        seq(moveChild("base"), seqa(ops42), up)), ((__args43 = ["args", checkTop]), (ops43 = [].slice.call(
        __args43, 1)), seq(moveChild("args"), seqa(ops43), up)), ((exp0 = M.node.map((function(x1) {
        return x1.base;
    }))), (consequent14 = exp0.chain((function(z) {
        var exp1, base = (getExpansion(z) ? ((exp1 = getExpansion(z)), ((exp1.count < 1) ?
                exp1.value : setData(z, "expand", null))) : z);
        return modify((function(node) {
            return incCount(getUid(node.base), getExpansion(node.base),
                getExpansion(node.base)
                .value, ast_expression.CurryExpression.create(node.loc, base,
                    node.args));
        }));
    }))), extract((function(node) {
        return (getExpansion(node.base) ? consequent14 : (undefined || pass));
    }))), ((consequent15 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCurry(uid, node.base, node.args);
        }));
    })), checkTop)), extract((function(node) {
        return ((isLambdaWithoutArgs(node.base) || ((node.base.type === "LetExpression") &&
            isLambdaWithoutArgs(node.base.body))) ? consequent15 : (undefined || pass));
    })))));
    addRewrite("LetExpression", seq(((__args44 = ["bindings", checkTop]), (ops44 = [].slice.call(__args44, 1)),
        seq(moveChild("bindings"), seqa(ops44), up)), ((__args45 = ["body", checkTop]), (ops45 = [].slice
        .call(__args45, 1)), seq(moveChild("body"), seqa(ops45), up)), ((x1 = type), (consequent16 =
        modify((function(__o4) {
            var loc = __o4["loc"],
                bindings = __o4["bindings"],
                body3 = __o4["body"];
            return ast_expression.LetExpression.create(loc, concat(bindings, body3.bindings),
                body3.body);
        }))), extract((function(node) {
        var z, y1;
        return (((z = node.body), (y1 = x1(z)), ("LetExpression" === y1)) ? consequent16 :
            (undefined || pass));
    }))), modify((function(__o4) {
        var loc = __o4["loc"],
            bindings = __o4["bindings"],
            body3 = __o4["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body3);
    })), ((consequent17 = modify((function(x2) {
        return x2.body;
    }))), extract((function(node) {
        var bindings;
        return (((bindings = node["bindings"]), (!bindings.length)) ? consequent17 : (
            undefined || pass));
    })))));
    addRewrite("ArgumentsPattern", seq(((__args46 = ["id", checkTop]), (ops46 = [].slice.call(__args46, 1)),
        seq(moveChild("id"), seqa(ops46), up)), ((__args47 = ["elements", checkTop]), (ops47 = [].slice
        .call(__args47, 1)), seq(moveChild("elements"), seqa(ops47), up)), ((__args48 = ["self",
        checkTop
    ]), (ops48 = [].slice.call(__args48, 1)), seq(moveChild("self"), seqa(ops48), up))));
    addRewrite("IdentifierPattern", extract((function(node) {
        return addBinding(getUid(node.id), null, true);
    })));
    addRewrite("ArrayExpression", ((__args49 = ["elements", checkTop]), (ops49 = [].slice.call(__args49, 1)),
        seq(moveChild("elements"), seqa(ops49), up)));
    addRewrite("ObjectExpression", ((__args50 = ["properties", checkTop]), (ops50 = [].slice.call(__args50, 1)),
        seq(moveChild("properties"), seqa(ops50), up)));
    addRewrite("ObjectValue", ((__args51 = ["value", checkTop]), (ops51 = [].slice.call(__args51, 1)), seq(
        moveChild("value"), seqa(ops51), up)));
    addRewrite("Identifier", ((consequent18 = extract((function(node) {
        return getBinding(getUid(node))
            .chain((function(binding0) {
                return (((binding0 && binding0.value) && binding0.simple) ? set(
                    binding0.value) : pass);
            }));
    }))), extract((function(node) {
        return ((getUid(node) && (!getExpansion(node))) ? consequent18 : (undefined || pass));
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