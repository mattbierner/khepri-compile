/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/inline.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/declaration", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/tree",
    "../ast", "../builtin", "../fun", "./state", "./expand", "./expansion", "./rename"
], (function(require, exports, __o, ast_declaration, ast_statement, ast_expression, ast_value, __o0, Unique, StateT,
    TreeZipperT, ast, builtin, __o1, state, __o2, __o3, __o4) {
    "use strict";
    var optimize, modifyNode = __o["modify"],
        next = __o0["next"],
        seq = __o0["sequence"],
        seqa = __o0["sequencea"],
        type = ast["type"],
        isIdentifier = ast["isIdentifier"],
        getUid = ast["getUid"],
        isLambda = ast["isLambda"],
        isLambdaWithoutArgs = ast["isLambdaWithoutArgs"],
        isPrimitive = ast["isPrimitive"],
        isString = ast["isString"],
        isNumberish = ast["isNumberish"],
        isTruthy = ast["isTruthy"],
        builtins = builtin["builtins"],
        definitions = builtin["definitions"],
        flattenr = __o1["flattenr"],
        flatten = __o1["flatten"],
        foldl = __o1["foldl"],
        concat = __o1["concat"],
        map = __o1["map"],
        range = __o1["range"],
        State = state["State"],
        expandCallee = __o2["expandCallee"],
        expandCurry = __o2["expandCurry"],
        markExpansion = __o3["markExpansion"],
        mergeExpansions = __o3["mergeExpansions"],
        getExpansion = __o3["getExpansion"],
        getExpansionDepth = __o3["getExpansionDepth"],
        getExpansionValue = __o3["getExpansionValue"],
        isExpansion = __o3["isExpansion"],
        expandNode = __o3["expandNode"],
        incCount = __o4["incCount"],
        x, y, x3, y3, __args, ops, consequent0, alternate0, consequent, alternate, __args0, ops0, consequent1,
            __args1, ops1, __args2, ops2, __args3, ops3, __args4, ops4, __args5, ops5, __args7, ops7,
            consequent2, __args8, ops8, consequent3, consequent4, __args11, ops11, __args12, ops12, __args13,
            ops13, __args14, ops14, __args16, ops16, __args17, ops17, __args18, ops18, __args19, ops19,
            __args20, ops20, __args21, ops21, __args22, ops22, __args23, ops23, __args24, ops24, __args25,
            ops25, __args26, ops26, body1, __args27, ops27, __args28, ops28, __args29, ops29, __args30, ops30,
            consequent5, __args31, ops31, __args32, ops32, consequent6, consequent7, __args33, ops33,
            consequent8, __args35, ops35, __args36, ops36, __args37, ops37, consequent9, alternate1, __args38,
            ops38, __args39, ops39, consequent10, __args40, ops40, __args41, ops41, consequent11, consequent12,
            consequent13, consequent14, __args42, ops42, __args43, ops43, __args44, ops44, __args45, ops45, exp,
            consequent15, consequent16, __args46, ops46, __args47, ops47, exp0, consequent17, consequent18,
            __args48, ops48, __args49, ops49, consequent19, consequent20, __args50, ops50, consequent21,
            __args52, ops52, __args53, ops53, __args54, ops54, x41, y41, __and = (function(x, y) {
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
        __band = (function(x, y) {
            return (x & y);
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
        __bor = (function(x, y) {
            return (x | y);
        }),
        __gt = (function(x, y) {
            return (x > y);
        }),
        __bxor = (function(x, y) {
            return (x ^ y);
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
        SIMPLE = true,
        COMPLEX = false,
        _check, M = TreeZipperT(StateT(Unique)),
        run = (function(c, ctx, state0, seed) {
            return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(c, ctx), state0), seed);
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
            return modifyState(state.addBinding.bind(null, uid, value, simple));
        }),
        addWorking = (function(uid, value, simple) {
            return modifyState(state.addWorking.bind(null, uid, value, simple));
        }),
        invalidateWorking = (function(uid) {
            return modifyState(state.invalidateWorking.bind(null, uid));
        }),
        getBinding = (function(uid) {
            return (uid ? getState.map(state.getBinding.bind(null, uid)) : pass);
        }),
        tryPrune = (function(id) {
            var uid = getUid(id);
            return getBinding(uid)
                .chain((function(binding) {
                    return ((((binding && binding.simple) && (!isExpansion(binding.value))) && (
                        isPrimitive(binding.value) || (binding.immutable && isIdentifier(
                            binding.value)))) ? set([]) : pass);
                }));
        }),
        push = modifyState(state.push),
        pop = modifyState(state.pop),
        globals = M.chain.bind(null, getState.map(state.getGlobals)),
        addGlobal = (function(name) {
            return modifyState(state.addGlobal.bind(null, name));
        }),
        createGlobalDeclarations = (function(g) {
            return ast_declaration.VariableDeclaration.create(null, g.map((function(x0) {
                return ast_declaration.VariableDeclarator.create(null, builtins[x0],
                    definitions[x0]);
            })));
        }),
        getLocals = getState.map(state.getLocals),
        pushLocals = modifyState(state.pushLocals),
        popLocals = modifyState(state.popLocals),
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
        getBindingType = (function(id, value) {
            return (isPrimitive(value) ? M.of([SIMPLE, value]) : (isLambda(value) ? M.of([SIMPLE,
                markExpansion(id, 0, value)
            ]) : (isIdentifier(value) ? getBinding(getUid(value))
                .chain((function(binding) {
                    return ((binding && binding.immutable) ? M.of([SIMPLE, ((binding.simple &&
                        binding.value) ? mergeExpansions(binding.value,
                        value) : value)]) : M.of([COMPLEX, value]));
                })) : M.of([COMPLEX, value]))));
        }),
        addBindingForNode = (function(id, value) {
            return getBindingType(id, value)
                .chain((function(__o5) {
                    var kind = __o5[0],
                        value0 = __o5[1];
                    return addBinding(getUid(id), value0, kind);
                }));
        }),
        addWorkingForNode = (function(id, value) {
            return getBindingType(id, value)
                .chain((function(__o5) {
                    var kind = __o5[0],
                        value0 = __o5[1];
                    return addWorking(getUid(id), value0, kind);
                }));
        }),
        setWorkingForNode = (function(id, value) {
            var uid = getUid(id);
            return getBinding(uid)
                .chain((function(binding) {
                    return (binding ? addWorkingForNode(id, value) : invalidateWorking(uid));
                }));
        }),
        peepholes = ({}),
        addRewrite = (function(type0, f) {
            if (Array.isArray(type0)) type0.forEach((function(type1) {
                return addRewrite(type1, f);
            }));
            else {
                (peepholes[type0] = f);
            }
        }),
        x0 = addRewrite.bind(null, "UnaryOperator"),
        y0 = seq(extract((function(__o5) {
            var name = __o5["name"],
                x1, y1;
            return seq(addGlobal(name), ((x1 = set), (y1 = builtins[name]), x1(y1)));
        })), checkTop);
    x0(y0);
    var x1 = addRewrite.bind(null, "BinaryOperator"),
        y1 = seq(extract((function(__o5) {
            var name = __o5["name"],
                x2, y2;
            return seq(addGlobal(name), ((x2 = set), (y2 = builtins[name]), x2(y2)));
        })), checkTop);
    x1(y1);
    var x2 = addRewrite.bind(null, "TernaryOperator"),
        y2 = seq(modifyState(state.addGlobal.bind(null, "?")), ((x3 = set), (y3 = builtins["?"]), x3(y3)),
            checkTop);
    x2(y2);
    var x4 = addRewrite.bind(null, "OperatorExpression"),
        y4 = seq(((consequent = unique((function(uid) {
            return modify((function(__o5) {
                var operator = __o5["operator"];
                return builtin.member(operator, uid);
            }));
        }))), (alternate = seq(((__args = ["operator", checkTop]), (ops = [__args[1]]), seq(moveChild(
            "operator"), seqa(ops), up)), ((consequent0 = modify((function(__o5) {
            var operator = __o5["operator"];
            return ast_expression.CallExpression.create(null, builtins["_"], [
                operator
            ]);
        }))), (alternate0 = modify((function(x5) {
            return x5.operator;
        }))), extract((function(node) {
            return (node.flipped ? consequent0 : (alternate0 || pass));
        }))))), extract((function(node) {
            var operator;
            return (((operator = node["operator"]), ((type(operator) === "MemberExpression") ||
                (type(operator) === "CallExpression"))) ? consequent : (alternate || pass));
        }))), checkTop);
    x4(y4);
    var x5 = addRewrite.bind(null, "Program"),
        y5 = seq(((__args0 = ["body", checkTop]), (ops0 = [__args0[1]]), seq(moveChild("body"), seqa(ops0), up)), (
            (consequent1 = globals((function(globals0) {
                return modify((function(node) {
                    return modifyNode(node, ({
                        "body": concat(createGlobalDeclarations(globals0), node
                            .body)
                    }));
                }));
            }))), extract((function(node) {
                var z, y6;
                return (((z = node.body), (y6 = type(z)), ("Package" !== y6)) ? consequent1 : (
                    undefined || pass));
            }))));
    x5(y5);
    var x6 = addRewrite.bind(null, "Package"),
        y6 = seq(((__args1 = ["body", checkTop]), (ops1 = [__args1[1]]), seq(moveChild("body"), seqa(ops1), up)),
            globals((function(globals0) {
                return modify((function(node) {
                    var body = node["body"];
                    return modifyNode(node, ({
                        "body": ((type(body) === "WithStatement") ? modifyNode(body, ({
                            "body": ast_statement.BlockStatement.create(
                                null, concat(createGlobalDeclarations(
                                    globals0), body.body.body))
                        })) : concat(createGlobalDeclarations(globals0), body))
                    }));
                }));
            })));
    x6(y6);
    var x7 = addRewrite.bind(null, "SwitchCase"),
        y7 = seq(((__args2 = ["test", checkTop]), (ops2 = [__args2[1]]), seq(moveChild("test"), seqa(ops2), up)), (
            (__args3 = ["consequent", checkTop]), (ops3 = [__args3[1]]), seq(moveChild("consequent"), seqa(
                ops3), up)));
    x7(y7);
    var x8 = addRewrite.bind(null, "CatchClause"),
        y8 = seq(((__args4 = ["param", checkTop]), (ops4 = [__args4[1]]), seq(moveChild("param"), seqa(ops4),
            up)), ((__args5 = ["body", checkTop]), (ops5 = [__args5[1]]), seq(moveChild("body"), seqa(ops5),
            up)));
    x8(y8);
    var x9 = addRewrite.bind(null, "VariableDeclaration"),
        __args6 = ["declarations", checkTop],
        ops6 = [__args6[1]],
        y9 = seq(moveChild("declarations"), seqa(ops6), up);
    x9(y9);
    var x10 = addRewrite.bind(null, "VariableDeclarator"),
        y10 = seq(((__args7 = ["init", checkTop]), (ops7 = [__args7[1]]), seq(moveChild("init"), seqa(ops7), up)), (
            (consequent2 = extract((function(__o5) {
                var immutable = __o5["immutable"],
                    id = __o5["id"],
                    init = __o5["init"];
                return (immutable ? seq(addBindingForNode(id, init), tryPrune(id)) : addWorking(
                    getUid(id), init, ((isPrimitive(init) || isIdentifier(init)) ||
                        isLambda(init))));
            }))), extract((function(node) {
                return (node.init ? consequent2 : (undefined || pass));
            }))));
    x10(y10);
    var x11 = addRewrite.bind(null, "Binding"),
        y11 = seq(((__args8 = ["value", checkTop]), (ops8 = [__args8[1]]), seq(moveChild("value"), seqa(ops8),
            up)), ((consequent3 = extract((function(__o5) {
            var pattern = __o5["pattern"],
                value = __o5["value"];
            return seq(addBindingForNode(pattern.id, value), tryPrune(pattern.id));
        }))), extract((function(node) {
            var pattern;
            return (((pattern = node["pattern"]), ((type(pattern) === "IdentifierPattern") &&
                getUid(pattern.id))) ? consequent3 : (undefined || pass));
        }))), ((consequent4 = extract((function(node) {
            var y12 = concat(node.value.bindings, ast_declaration.Binding.create(null, node
                .pattern, node.value.body)),
                bindings = flatten(y12);
            return seq(set(bindings), visitChild((bindings.length - 1)));
        }))), extract((function(node) {
            return (((type(node) === "Binding") && (type(node.value) === "LetExpression")) ?
                consequent4 : (undefined || pass));
        }))));
    x11(y11);
    var x12 = addRewrite.bind(null, "BlockStatement"),
        __args9 = ["body", checkTop],
        ops9 = [__args9[1]],
        y12 = seq(moveChild("body"), seqa(ops9), up);
    x12(y12);
    var x13 = addRewrite.bind(null, "ExpressionStatement"),
        __args10 = ["expression", checkTop],
        ops10 = [__args10[1]],
        y13 = seq(moveChild("expression"), seqa(ops10), up);
    x13(y13);
    var x14 = addRewrite.bind(null, "WithStatement"),
        y14 = seq(((__args11 = ["bindings", checkTop]), (ops11 = [__args11[1]]), seq(moveChild("bindings"),
            seqa(ops11), up)), ((__args12 = ["body", checkTop]), (ops12 = [__args12[1]]), seq(moveChild(
            "body"), seqa(ops12), up)));
    x14(y14);
    var x15 = addRewrite.bind(null, "SwitchStatement"),
        y15 = seq(((__args13 = ["discriminant", checkTop]), (ops13 = [__args13[1]]), seq(moveChild(
            "discriminant"), seqa(ops13), up)), ((__args14 = ["cases", checkTop]), (ops14 = [__args14[1]]),
            seq(moveChild("cases"), seqa(ops14), up)));
    x15(y15);
    var x16 = addRewrite.bind(null, ["ReturnStatement", "ThrowStatement"]),
        __args15 = ["argument", checkTop],
        ops15 = [__args15[1]],
        y16 = seq(moveChild("argument"), seqa(ops15), up);
    x16(y16);
    var x17 = addRewrite.bind(null, "TryStatement"),
        y17 = seq(((__args16 = ["block", checkTop]), (ops16 = [__args16[1]]), seq(moveChild("block"), seqa(
            ops16), up)), ((__args17 = ["handler", checkTop]), (ops17 = [__args17[1]]), seq(moveChild(
            "handler"), seqa(ops17), up)), ((__args18 = ["finalizer", checkTop]), (ops18 = [__args18[1]]),
            seq(moveChild("finalizer"), seqa(ops18), up)));
    x17(y17);
    var x18 = addRewrite.bind(null, "WhileStatement"),
        body = [((__args19 = ["test", checkTop]), (ops19 = [__args19[1]]), seq(moveChild("test"), seqa(ops19),
            up)), ((__args20 = ["body", checkTop]), (ops20 = [__args20[1]]), seq(moveChild("body"), seqa(
            ops20), up))],
        y18 = seq(push, seqa(body), pop);
    x18(y18);
    var x19 = addRewrite.bind(null, "DoWhileStatement"),
        body0 = [((__args21 = ["body", checkTop]), (ops21 = [__args21[1]]), seq(moveChild("body"), seqa(ops21),
            up)), ((__args22 = ["test", checkTop]), (ops22 = [__args22[1]]), seq(moveChild("test"), seqa(
            ops22), up))],
        y19 = seq(push, seqa(body0), pop);
    x19(y19);
    var x20 = addRewrite.bind(null, "ForStatement"),
        y20 = seq(((__args23 = ["init", checkTop]), (ops23 = [__args23[1]]), seq(moveChild("init"), seqa(ops23),
            up)), ((body1 = [((__args24 = ["test", checkTop]), (ops24 = [__args24[1]]), seq(moveChild(
            "test"), seqa(ops24), up)), ((__args25 = ["update", checkTop]), (ops25 = [__args25[
            1]]), seq(moveChild("update"), seqa(ops25), up)), ((__args26 = ["body", checkTop]), (
            ops26 = [__args26[1]]), seq(moveChild("body"), seqa(ops26), up))]), seq(push, seqa(body1),
            pop)));
    x20(y20);
    var x21 = addRewrite.bind(null, "FunctionExpression"),
        body2 = [pushLocals, ((__args27 = ["id", checkTop]), (ops27 = [__args27[1]]), seq(moveChild("id"), seqa(
            ops27), up)), ((__args28 = ["params", checkTop]), (ops28 = [__args28[1]]), seq(moveChild(
            "params"), seqa(ops28), up)), ((__args29 = ["body", checkTop]), (ops29 = [__args29[1]]), seq(
            moveChild("body"), seqa(ops29), up)), getLocals.chain((function(locals) {
            return modify((function(node) {
                return ast.setLocals(concat(ast.getLocals(node), locals), node);
            }));
        })), popLocals],
        y21 = seq(push, seqa(body2), pop);
    x21(y21);
    var x22 = addRewrite.bind(null, "UnaryExpression"),
        arithmetic = ({
            "!": __lnot,
            "~": __bnot,
            "typeof": __typeof,
            "++": __plus,
            "--": __minus
        }),
        y22 = seq(((__args30 = ["argument", checkTop]), (ops30 = [__args30[1]]), seq(moveChild("argument"),
            seqa(ops30), up)), ((consequent5 = modify((function(__o5) {
            var loc = __o5["loc"],
                operator = __o5["operator"],
                argument = __o5["argument"],
                value = arithmetic[operator](argument.value);
            return ast_value.Literal.create(loc, (typeof value), value);
        }))), extract((function(node) {
            var operator, argument;
            return (((operator = node["operator"]), (argument = node["argument"]), (arithmetic[
                operator] && isPrimitive(argument))) ? consequent5 : (undefined || pass));
        }))));
    x22(y22);
    var x23 = addRewrite.bind(null, "BinaryExpression"),
        arithmetic0 = ({
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
            "|": __bor,
            "&": __band,
            "^": __bxor,
            "&&": __and,
            "||": __or
        }),
        y23 = seq(((__args31 = ["left", checkTop]), (ops31 = [__args31[1]]), seq(moveChild("left"), seqa(ops31),
            up)), ((__args32 = ["right", checkTop]), (ops32 = [__args32[1]]), seq(moveChild("right"), seqa(
            ops32), up)), ((consequent6 = modify((function(__o5) {
            var operator = __o5["operator"],
                left = __o5["left"],
                right0 = __o5["right"],
                value = arithmetic0[operator](left.value, right0.value);
            return ast_value.Literal.create(null, (typeof value), value);
        }))), extract((function(node) {
            var operator, left, right0;
            return (((operator = node["operator"]), (left = node["left"]), (right0 = node[
                "right"]), ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(
                right0))) ? consequent6 : (undefined || pass));
        }))), ((consequent7 = extract((function(__o5) {
            var operator = __o5["operator"],
                left = __o5["left"],
                right0 = __o5["right"],
                x24, y24;
            return seq(addGlobal(operator), ((x24 = set), (y24 = ast_expression.CallExpression
                .create(null, builtins[operator], [left, right0])), x24(y24)), checkTop);
        }))), extract((function(node) {
            var operator;
            return (((operator = node["operator"]), (((((((((operator === "\\>") || (operator ===
                    "\\>>")) || (operator === "<\\")) || (operator ===
                    "<<\\")) || (operator === "??")) || (operator === "<|")) ||
                (operator === "|>")) || (operator === "<<|")) || (operator ===
                "|>>"))) ? consequent7 : (undefined || pass));
        }))));
    x23(y23);
    var x24 = addRewrite.bind(null, "AssignmentExpression"),
        y24 = seq(((__args33 = ["right", checkTop]), (ops33 = [__args33[1]]), seq(moveChild("right"), seqa(
            ops33), up)), ((consequent8 = extract((function(__o5) {
            var immutable = __o5["immutable"],
                left = __o5["left"],
                right0 = __o5["right"];
            return (immutable ? addBindingForNode(left, right0) : setWorkingForNode(left,
                right0));
        }))), extract((function(node) {
            var z, y25;
            return (((z = node.left), (y25 = type(z)), ("Identifier" === y25)) ? consequent8 :
                (undefined || pass));
        }))));
    x24(y24);
    var x25 = addRewrite.bind(null, "DeleteExpression"),
        __args34 = ["argument", checkTop],
        ops34 = [__args34[1]],
        y25 = seq(moveChild("argument"), seqa(ops34), up);
    x25(y25);
    var x26 = addRewrite.bind(null, ["ConditionalExpression", "IfStatement"]),
        y26 = seq(((__args35 = ["test", checkTop]), (ops35 = [__args35[1]]), seq(moveChild("test"), seqa(ops35),
            up)), ((consequent9 = extract((function(__o5) {
            var test = __o5["test"],
                consequent10 = __o5["consequent"],
                alternate1 = __o5["alternate"];
            return seq(set((isTruthy(test) ? consequent10 : alternate1)), checkTop);
        }))), (alternate1 = seq(((__args36 = ["consequent", checkTop]), (ops36 = [__args36[1]]), seq(
            moveChild("consequent"), seqa(ops36), up)), ((__args37 = ["alternate", checkTop]), (
            ops37 = [__args37[1]]), seq(moveChild("alternate"), seqa(ops37), up)))), extract((function(
            node) {
            return (isPrimitive(node.test) ? consequent9 : (alternate1 || pass));
        }))));
    x26(y26);
    var x27 = addRewrite.bind(null, "CheckedMemberExpression"),
        y27 = seq(((__args38 = ["object", checkTop]), (ops38 = [__args38[1]]), seq(moveChild("object"), seqa(
            ops38), up)), ((__args39 = ["property", checkTop]), (ops39 = [__args39[1]]), (consequent10 =
            seq(moveChild("property"), seqa(ops39), up)), extract((function(node) {
            return (node.computed ? consequent10 : (undefined || pass));
        }))), extract((function(node) {
            return getBinding(getUid(node.id))
                .chain((function(binding) {
                    var x28, y28;
                    return (((binding && binding.value) && binding.simple) ? ((x28 = set), (
                        y28 = modifyNode(node, ({
                            "id": binding.value
                        }))), x28(y28)) : pass);
                }));
        })));
    x27(y27);
    var x28 = addRewrite.bind(null, "MemberExpression"),
        y28 = seq(((__args40 = ["object", checkTop]), (ops40 = [__args40[1]]), seq(moveChild("object"), seqa(
            ops40), up)), ((__args41 = ["property", checkTop]), (ops41 = [__args41[1]]), (consequent11 =
            seq(moveChild("property"), seqa(ops41), up)), extract((function(node) {
            return (node.computed ? consequent11 : (undefined || pass));
        }))), ((consequent12 = modify((function(__o5) {
            var object = __o5["object"],
                property = __o5["property"];
            return (object.elements[property.value] || builtins.undefined);
        }))), extract((function(node) {
            return (((node.computed && (type(node.object) === "ArrayExpression")) &&
                isNumberish(node.property)) ? consequent12 : (undefined || pass));
        }))), ((consequent13 = modify((function(__o5) {
            var object = __o5["object"];
            return ast_value.Literal.create(null, "number", object.elements.length);
        }))), extract((function(node) {
            return ((((type(node) === "MemberExpression") && (type(node.object) ===
                "ArrayExpression")) && (((!node.computed) && (node.property.name ===
                "length")) || ((node.computed && (type(node.property) === "Literal")) &&
                (node.property.value === "length")))) ? consequent13 : (undefined || pass));
        }))), ((consequent14 = modify((function(node) {
            var str = node.object.value,
                idx = node.property.value;
            return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) :
                builtins.undefined);
        }))), extract((function(node) {
            return (((node.computed && isString(node.object)) && isNumberish(node.property)) ?
                consequent14 : (undefined || pass));
        }))));
    x28(y28);
    var x29 = addRewrite.bind(null, ["NewExpression", "ApplyExpression"]),
        y29 = seq(((__args42 = ["callee", checkTop]), (ops42 = [__args42[1]]), seq(moveChild("callee"), seqa(
            ops42), up)), ((__args43 = ["args", checkTop]), (ops43 = [__args43[1]]), seq(moveChild("args"),
            seqa(ops43), up)));
    x29(y29);
    var x30 = addRewrite.bind(null, "CallExpression"),
        y30 = seq(((__args44 = ["callee", checkTop]), (ops44 = [__args44[1]]), seq(moveChild("callee"), seqa(
            ops44), up)), ((__args45 = ["args", checkTop]), (ops45 = [__args45[1]]), seq(moveChild("args"),
            seqa(ops45), up)), ((exp = M.node.map((function(x31) {
            return x31.callee;
        }))), (consequent15 = exp.chain((function(z) {
            var newCallee = expandNode(z);
            return modify((function(node) {
                var callee = node["callee"];
                return incCount(getUid(callee), (getExpansionDepth(callee) || 1),
                    getExpansionValue(callee), modifyNode(node, ({
                        "callee": newCallee
                    })));
            }));
        }))), extract((function(node) {
            return (isExpansion(node.callee) ? consequent15 : (undefined || pass));
        }))), ((consequent16 = seq(unique((function(uid) {
            return extract((function(node) {
                var __o5 = expandCallee(uid, node.callee, node.args),
                    locals = __o5[0],
                    node0 = __o5[1];
                return seq(modifyState(state.addLocals.bind(null, locals)), set(
                    node0));
            }));
        })), checkTop)), extract((function(node) {
            var callee;
            return (((callee = node["callee"]), (isLambda(callee) || ((type(callee) ===
                "LetExpression") && isLambda(callee.body)))) ? consequent16 : (undefined ||
                pass));
        }))));
    x30(y30);
    var x31 = addRewrite.bind(null, "CurryExpression"),
        y31 = seq(((__args46 = ["base", checkTop]), (ops46 = [__args46[1]]), seq(moveChild("base"), seqa(ops46),
            up)), ((__args47 = ["args", checkTop]), (ops47 = [__args47[1]]), seq(moveChild("args"), seqa(
            ops47), up)), ((exp0 = M.node.map((function(x32) {
            return x32.base;
        }))), (consequent17 = exp0.chain((function(z) {
            var expandedBase = expandNode(z);
            return modify((function(node) {
                var base = node["base"];
                return incCount(getUid(base), getExpansion(base), getExpansionValue(
                    base), modifyNode(node, ({
                    "base": expandedBase
                })));
            }));
        }))), extract((function(node) {
            return (isExpansion(node.base) ? consequent17 : (undefined || pass));
        }))), ((consequent18 = seq(unique((function(uid) {
            return modify((function(node) {
                return expandCurry(uid, node.base, node.args);
            }));
        })), checkTop)), extract((function(node) {
            var base;
            return (((base = node["base"]), (isLambdaWithoutArgs(base) || ((type(base) ===
                "LetExpression") && isLambdaWithoutArgs(base.body)))) ? consequent18 : (
                undefined || pass));
        }))));
    x31(y31);
    var x32 = addRewrite.bind(null, "LetExpression"),
        y32 = seq(((__args48 = ["bindings", checkTop]), (ops48 = [__args48[1]]), seq(moveChild("bindings"),
            seqa(ops48), up)), ((__args49 = ["body", checkTop]), (ops49 = [__args49[1]]), seq(moveChild(
            "body"), seqa(ops49), up)), ((consequent19 = modify((function(__o5) {
            var loc = __o5["loc"],
                bindings = __o5["bindings"],
                body3 = __o5["body"];
            return ast_expression.LetExpression.create(loc, concat(bindings, body3.bindings),
                body3.body);
        }))), extract((function(node) {
            var z, y33;
            return (((z = node.body), (y33 = type(z)), ("LetExpression" === y33)) ?
                consequent19 : (undefined || pass));
        }))), modify((function(node) {
            return modifyNode(node, ({
                "bindings": flattenr(node.bindings)
            }));
        })), ((consequent20 = modify((function(x33) {
            return x33.body;
        }))), extract((function(node) {
            var x33;
            return (((x33 = node.bindings.length), (!x33)) ? consequent20 : (undefined || pass));
        }))));
    x32(y32);
    var x33 = addRewrite.bind(null, "SliceUnpack"),
        y33 = seq(((__args50 = ["target", checkTop]), (ops50 = [__args50[1]]), seq(moveChild("target"), seqa(
            ops50), up)), ((consequent21 = extract((function(node) {
            return getBinding(getUid(node.target))
                .chain((function(binding) {
                    return (((binding && binding.value) && (type(binding.value) ===
                        "ArrayExpression")) ? modify((function(__o5) {
                        var target = __o5["target"],
                            from = __o5["from"],
                            to = __o5["to"];
                        return ast_expression.ArrayExpression.create(
                            null, map((function(i) {
                                return ast_expression.MemberExpression
                                    .create(null, target,
                                        ast_value.Literal.create(
                                            null, "number", i),
                                        true);
                            }), range(from, (binding.value.elements
                                .length - to))));
                    })) : pass);
                }));
        }))), extract((function(node) {
            return (getUid(node.target) ? consequent21 : (undefined || pass));
        }))));
    x33(y33);
    var x34 = addRewrite.bind(null, ["RelativeUnpack"]),
        __args51 = ["target", checkTop],
        ops51 = [__args51[1]],
        y34 = seq(moveChild("target"), seqa(ops51), up);
    x34(y34);
    var x35 = addRewrite.bind(null, "ArgumentsPattern"),
        y35 = seq(((__args52 = ["id", checkTop]), (ops52 = [__args52[1]]), seq(moveChild("id"), seqa(ops52), up)), (
            (__args53 = ["elements", checkTop]), (ops53 = [__args53[1]]), seq(moveChild("elements"), seqa(
                ops53), up)), ((__args54 = ["self", checkTop]), (ops54 = [__args54[1]]), seq(moveChild(
            "self"), seqa(ops54), up)));
    x35(y35);
    var x36 = addRewrite.bind(null, "IdentifierPattern"),
        y36 = extract((function(__o5) {
            var id = __o5["id"];
            return addBinding(getUid(id), null, SIMPLE);
        }));
    x36(y36);
    var x37 = addRewrite.bind(null, "ArrayExpression"),
        __args55 = ["elements", checkTop],
        ops55 = [__args55[1]],
        y37 = seq(moveChild("elements"), seqa(ops55), up);
    x37(y37);
    var x38 = addRewrite.bind(null, "ObjectExpression"),
        __args56 = ["properties", checkTop],
        ops56 = [__args56[1]],
        y38 = seq(moveChild("properties"), seqa(ops56), up);
    x38(y38);
    var x39 = addRewrite.bind(null, "ObjectValue"),
        __args57 = ["value", checkTop],
        ops57 = [__args57[1]],
        y39 = seq(moveChild("value"), seqa(ops57), up);
    x39(y39);
    var x40 = addRewrite.bind(null, "Identifier"),
        consequent22 = extract((function(node) {
            return getBinding(getUid(node))
                .chain((function(binding) {
                    return (((binding && binding.value) && binding.simple) ? set(binding.value) :
                        pass);
                }));
        })),
        y40 = extract((function(node) {
            return ((getUid(node) && (!isExpansion(node))) ? consequent22 : (undefined || pass));
        }));
    x40(y40);
    (_check = (function(node) {
        if (Array.isArray(node)) {
            if ((!node.length)) return pass;
            return seq(down, seqa(node.map((function(_, i) {
                return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
            }))), up);
        }
        return (peepholes[type(node)] || pass);
    }));
    var inline = seq(checkTop, extractCtx.chain((function(node) {
        return unique((function(unique0) {
            return M.of(({
                tree: node,
                data: ({
                    unique: unique0
                })
            }));
        }));
    }))),
        initialState = ((x41 = foldl((function(s, name) {
            var id = builtins[name],
                def = definitions[name];
            return state.addBinding(getUid(id), markExpansion(id, 0, def), SIMPLE, s);
        }), State.empty, Object.keys(builtins))), (y41 = state.addGlobal.bind(null, "_")), y41(x41));
    (optimize = (function(ast0, data) {
        return run(inline, ast0, initialState, data.unique);
    }));
    (exports["optimize"] = optimize);
}));