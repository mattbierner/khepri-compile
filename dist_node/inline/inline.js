/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/inline.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_value = require("khepri-ast")["value"],
    __o0 = require("akh")["base"],
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["state"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o1 = require("../ast"),
    builtin = require("../builtin"),
    __o2 = require("../fun"),
    state = require("./state"),
    __o3 = require("./expand"),
    __o4 = require("./expansion"),
    __o5 = require("./rename"),
    optimize, modifyNode = __o["modify"],
    setData = __o["setData"],
    next = __o0["next"],
    seq = __o0["sequence"],
    seqa = __o0["sequencea"],
    type = __o1["type"],
    isIdentifier = __o1["isIdentifier"],
    getUid = __o1["getUid"],
    isLambda = __o1["isLambda"],
    isLambdaWithoutArgs = __o1["isLambdaWithoutArgs"],
    isPrimitive = __o1["isPrimitive"],
    isNumberish = __o1["isNumberish"],
    isTruthy = __o1["isTruthy"],
    builtins = builtin["builtins"],
    definitions = builtin["definitions"],
    flattenr = __o2["flattenr"],
    flatten = __o2["flatten"],
    foldl = __o2["foldl"],
    concat = __o2["concat"],
    map = __o2["map"],
    range = __o2["range"],
    State = state["State"],
    expandCallee = __o3["expandCallee"],
    expandCurry = __o3["expandCurry"],
    markExpansion = __o4["markExpansion"],
    getExpansion = __o4["getExpansion"],
    isExpansion = __o4["isExpansion"],
    expandNode = __o4["expandNode"],
    incCount = __o5["incCount"],
    x, y, x3, y3, __args, ops, consequent0, alternate0, consequent, alternate, __args0, ops0, consequent1, __args1,
        ops1, __args2, ops2, __args3, ops3, __args4, ops4, __args5, ops5, __args7, ops7, consequent2, __args8, ops8,
        consequent3, consequent4, __args11, ops11, __args12, ops12, __args13, ops13, __args14, ops14, __args16, ops16,
        __args17, ops17, __args18, ops18, __args19, ops19, __args20, ops20, __args21, ops21, __args22, ops22, __args23,
        ops23, __args24, ops24, __args25, ops25, __args26, ops26, body1, __args27, ops27, __args28, ops28, __args29,
        ops29, __args30, ops30, consequent5, __args31, ops31, __args32, ops32, consequent6, consequent7, __args33,
        ops33, consequent8, __args34, ops34, __args35, ops35, __args36, ops36, consequent9, alternate1, __args37, ops37,
        __args38, ops38, consequent10, __args39, ops39, __args40, ops40, consequent11, consequent12, consequent13,
        consequent14, __args41, ops41, __args42, ops42, __args43, ops43, __args44, ops44, exp, consequent15,
        consequent16, __args45, ops45, __args46, ops46, exp0, consequent17, consequent18, __args47, ops47, __args48,
        ops48, consequent19, consequent20, __args49, ops49, consequent21, __args51, ops51, __args52, ops52, __args53,
        ops53, x40, y40, __and = (function(x, y) {
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
                return ((((binding && binding.simple) && (!isExpansion(binding.value))) && (isPrimitive(
                        binding.value) || (binding.immutable && isIdentifier(binding.value)))) ? set([]) :
                    pass);
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
            return ast_declaration.VariableDeclarator.create(null, builtins[x0], definitions[x0]);
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
    addBindingForNode = (function(id, value) {
        var uid = getUid(id);
        return (isPrimitive(value) ? addBinding(uid, value, true) : (isLambda(value) ? addBinding(uid,
            markExpansion(id, 0, value), true) : (isIdentifier(value) ? getBinding(getUid(value))
            .chain((function(binding) {
                return ((binding && binding.immutable) ? addBinding(uid, ((binding.simple &&
                    binding.value) ? binding.value : value), true) : addBinding(uid, value,
                    false));
            })) : addBinding(uid, value, false))));
    }),
    addWorkingForNode = (function(id, value) {
        var uid = getUid(id);
        return (isPrimitive(value) ? addWorking(uid, value, true) : (isLambda(value) ? addWorking(uid,
            markExpansion(id, 0, value), true) : (isIdentifier(value) ? getBinding(getUid(value))
            .chain((function(binding) {
                return ((binding && binding.immutable) ? addWorking(uid, ((binding.simple &&
                    binding.value) ? binding.value : value), true) : addWorking(uid, value,
                    false));
            })) : invalidateWorking(uid))));
    }),
    setWorkingForNode = (function(id, value) {
        return getBinding(getUid(id))
            .chain((function(binding) {
                return (binding ? addWorkingForNode(id, value) : invalidateWorking(getUid(id)));
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
    y0 = seq(extract((function(__o6) {
        var name = __o6["name"],
            x1, y1;
        return seq(addGlobal(name), ((x1 = set), (y1 = builtins[name]), x1(y1)));
    })), checkTop);
x0(y0);
var x1 = addRewrite.bind(null, "BinaryOperator"),
    y1 = seq(extract((function(__o6) {
        var name = __o6["name"],
            x2, y2;
        return seq(addGlobal(name), ((x2 = set), (y2 = builtins[name]), x2(y2)));
    })), checkTop);
x1(y1);
var x2 = addRewrite.bind(null, "TernaryOperator"),
    y2 = seq(modifyState(state.addGlobal.bind(null, "?")), ((x3 = set), (y3 = builtins["?"]), x3(y3)), checkTop);
x2(y2);
var x4 = addRewrite.bind(null, "OperatorExpression"),
    y4 = seq(((consequent = seq(unique((function(uid) {
        return modify((function(__o6) {
            var operator = __o6["operator"];
            return builtin.member(operator, uid);
        }));
    })), checkTop)), (alternate = seq(((__args = ["operator", checkTop]), (ops = [__args[1]]), seq(moveChild(
        "operator"), seqa(ops), up)), ((consequent0 = modify((function(__o6) {
        var operator = __o6["operator"];
        return ast_expression.CallExpression.create(null, builtins["_"], [operator]);
    }))), (alternate0 = modify((function(x5) {
        return x5.operator;
    }))), extract((function(node) {
        return (node.flipped ? consequent0 : (alternate0 || pass));
    }))), checkTop)), extract((function(node) {
        var operator;
        return (((operator = node["operator"]), ((type(operator) === "MemberExpression") || (type(
            operator) === "CallExpression"))) ? consequent : (alternate || pass));
    }))));
x4(y4);
var x5 = addRewrite.bind(null, "Program"),
    y5 = seq(((__args0 = ["body", checkTop]), (ops0 = [__args0[1]]), seq(moveChild("body"), seqa(ops0), up)), ((
        consequent1 = globals((function(globals0) {
            return modify((function(node) {
                return modifyNode(node, ({
                    body: concat(createGlobalDeclarations(globals0), node.body)
                }));
            }));
        }))), extract((function(node) {
        var z, y6;
        return (((z = node.body), (y6 = type(z)), ("Package" !== y6)) ? consequent1 : (undefined ||
            pass));
    }))));
x5(y5);
var x6 = addRewrite.bind(null, "Package"),
    y6 = seq(((__args1 = ["body", checkTop]), (ops1 = [__args1[1]]), seq(moveChild("body"), seqa(ops1), up)), globals((
        function(globals0) {
            return modify((function(node) {
                return modifyNode(node, ({
                    "body": ((type(node.body) === "WithStatement") ? ast_statement.WithStatement
                        .create(node.body.loc, node.body.bindings, ast_statement.BlockStatement
                            .create(null, concat(createGlobalDeclarations(globals0), node.body.body
                                .body))) : concat(createGlobalDeclarations(globals0), node.body)
                    )
                }), ({}));
            }));
        })));
x6(y6);
var x7 = addRewrite.bind(null, "SwitchCase"),
    y7 = seq(((__args2 = ["test", checkTop]), (ops2 = [__args2[1]]), seq(moveChild("test"), seqa(ops2), up)), ((__args3 = [
        "consequent", checkTop
    ]), (ops3 = [__args3[1]]), seq(moveChild("consequent"), seqa(ops3), up)));
x7(y7);
var x8 = addRewrite.bind(null, "CatchClause"),
    y8 = seq(((__args4 = ["param", checkTop]), (ops4 = [__args4[1]]), seq(moveChild("param"), seqa(ops4), up)), ((
        __args5 = ["body", checkTop]), (ops5 = [__args5[1]]), seq(moveChild("body"), seqa(ops5), up)));
x8(y8);
var x9 = addRewrite.bind(null, "VariableDeclaration"),
    __args6 = ["declarations", checkTop],
    ops6 = [__args6[1]],
    y9 = seq(moveChild("declarations"), seqa(ops6), up);
x9(y9);
var x10 = addRewrite.bind(null, "VariableDeclarator"),
    y10 = seq(((__args7 = ["init", checkTop]), (ops7 = [__args7[1]]), seq(moveChild("init"), seqa(ops7), up)), ((
        consequent2 = extract((function(__o6) {
            var immutable = __o6["immutable"],
                id = __o6["id"],
                init = __o6["init"];
            return (immutable ? seq(addBindingForNode(id, init), tryPrune(id)) : addWorking(getUid(id),
                init, ((isPrimitive(init) || isIdentifier(init)) || isLambda(init))));
        }))), extract((function(node) {
        return (node.init ? consequent2 : (undefined || pass));
    }))));
x10(y10);
var x11 = addRewrite.bind(null, "Binding"),
    y11 = seq(((__args8 = ["value", checkTop]), (ops8 = [__args8[1]]), seq(moveChild("value"), seqa(ops8), up)),
        extract((function() {
            return pass;
        })), ((consequent3 = extract((function(__o6) {
            var pattern = __o6["pattern"],
                value = __o6["value"];
            return seq(addBindingForNode(pattern.id, value), tryPrune(pattern.id));
        }))), extract((function(node) {
            var pattern;
            return (((pattern = node["pattern"]), ((type(pattern) === "IdentifierPattern") && getUid(
                pattern.id))) ? consequent3 : (undefined || pass));
        }))), ((consequent4 = extract((function(node) {
            var y12 = concat(node.value.bindings, ast_declaration.Binding.create(null, node.pattern,
                node.value.body)),
                bindings = flatten(y12);
            return seq(set(bindings), visitChild((bindings.length - 1)));
        }))), extract((function(node) {
            return (((type(node) === "Binding") && (type(node.value) === "LetExpression")) ? consequent4 :
                (undefined || pass));
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
    y14 = seq(((__args11 = ["bindings", checkTop]), (ops11 = [__args11[1]]), seq(moveChild("bindings"), seqa(ops11), up)), (
        (__args12 = ["body", checkTop]), (ops12 = [__args12[1]]), seq(moveChild("body"), seqa(ops12), up)));
x14(y14);
var x15 = addRewrite.bind(null, "SwitchStatement"),
    y15 = seq(((__args13 = ["discriminant", checkTop]), (ops13 = [__args13[1]]), seq(moveChild("discriminant"), seqa(
        ops13), up)), ((__args14 = ["cases", checkTop]), (ops14 = [__args14[1]]), seq(moveChild("cases"), seqa(
        ops14), up)));
x15(y15);
var x16 = addRewrite.bind(null, ["ReturnStatement", "ThrowStatement"]),
    __args15 = ["argument", checkTop],
    ops15 = [__args15[1]],
    y16 = seq(moveChild("argument"), seqa(ops15), up);
x16(y16);
var x17 = addRewrite.bind(null, "TryStatement"),
    y17 = seq(((__args16 = ["block", checkTop]), (ops16 = [__args16[1]]), seq(moveChild("block"), seqa(ops16), up)), ((
        __args17 = ["handler", checkTop]), (ops17 = [__args17[1]]), seq(moveChild("handler"), seqa(ops17), up)), ((
        __args18 = ["finalizer", checkTop]), (ops18 = [__args18[1]]), seq(moveChild("finalizer"), seqa(ops18),
        up)));
x17(y17);
var x18 = addRewrite.bind(null, "WhileStatement"),
    body = [((__args19 = ["test", checkTop]), (ops19 = [__args19[1]]), seq(moveChild("test"), seqa(ops19), up)), ((
        __args20 = ["body", checkTop]), (ops20 = [__args20[1]]), seq(moveChild("body"), seqa(ops20), up))],
    y18 = seq(push, seqa(body), pop);
x18(y18);
var x19 = addRewrite.bind(null, "DoWhileStatement"),
    body0 = [((__args21 = ["body", checkTop]), (ops21 = [__args21[1]]), seq(moveChild("body"), seqa(ops21), up)), ((
        __args22 = ["test", checkTop]), (ops22 = [__args22[1]]), seq(moveChild("test"), seqa(ops22), up))],
    y19 = seq(push, seqa(body0), pop);
x19(y19);
var x20 = addRewrite.bind(null, "ForStatement"),
    y20 = seq(((__args23 = ["init", checkTop]), (ops23 = [__args23[1]]), seq(moveChild("init"), seqa(ops23), up)), ((
        body1 = [((__args24 = ["test", checkTop]), (ops24 = [__args24[1]]), seq(moveChild("test"), seqa(ops24),
            up)), ((__args25 = ["update", checkTop]), (ops25 = [__args25[1]]), seq(moveChild("update"),
            seqa(ops25), up)), ((__args26 = ["body", checkTop]), (ops26 = [__args26[1]]), seq(moveChild(
            "body"), seqa(ops26), up))]), seq(push, seqa(body1), pop)));
x20(y20);
var x21 = addRewrite.bind(null, "FunctionExpression"),
    body2 = [pushLocals, ((__args27 = ["id", checkTop]), (ops27 = [__args27[1]]), seq(moveChild("id"), seqa(ops27), up)), (
            (__args28 = ["params", checkTop]), (ops28 = [__args28[1]]), seq(moveChild("params"), seqa(ops28), up)), ((
            __args29 = ["body", checkTop]), (ops29 = [__args29[1]]), seq(moveChild("body"), seqa(ops29), up)),
        getLocals.chain((function(locals) {
            return modify((function(node) {
                return setData(node, "locals", concat(node.ud.locals, locals));
            }));
        })), popLocals
    ],
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
    y22 = seq(((__args30 = ["argument", checkTop]), (ops30 = [__args30[1]]), seq(moveChild("argument"), seqa(ops30), up)), (
        (consequent5 = modify((function(__o6) {
            var loc = __o6["loc"],
                operator = __o6["operator"],
                argument = __o6["argument"],
                value = arithmetic[operator](argument.value);
            return ast_value.Literal.create(loc, (typeof value), value);
        }))), extract((function(node) {
            var operator, argument;
            return (((operator = node["operator"]), (argument = node["argument"]), (arithmetic[operator] &&
                isPrimitive(argument))) ? consequent5 : (undefined || pass));
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
    y23 = seq(((__args31 = ["left", checkTop]), (ops31 = [__args31[1]]), seq(moveChild("left"), seqa(ops31), up)), ((
        __args32 = ["right", checkTop]), (ops32 = [__args32[1]]), seq(moveChild("right"), seqa(ops32), up)), ((
        consequent6 = modify((function(__o6) {
            var operator = __o6["operator"],
                left = __o6["left"],
                right0 = __o6["right"],
                value = arithmetic0[operator](left.value, right0.value);
            return ast_value.Literal.create(null, (typeof value), value);
        }))), extract((function(node) {
        var operator, left, right0;
        return (((operator = node["operator"]), (left = node["left"]), (right0 = node["right"]), ((
            arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right0))) ? consequent6 : (
            undefined || pass));
    }))), ((consequent7 = extract((function(__o6) {
        var operator = __o6["operator"],
            left = __o6["left"],
            right0 = __o6["right"],
            x24, y24;
        return seq(addGlobal(operator), ((x24 = set), (y24 = ast_expression.CallExpression.create(
            null, builtins[operator], [left, right0])), x24(y24)), checkTop);
    }))), extract((function(node) {
        var operator;
        return (((operator = node["operator"]), (((((((((operator === "\\>") || (operator === "\\>>")) ||
            (operator === "<\\")) || (operator === "<<\\")) || (operator ===
            "??")) || (operator === "<|")) || (operator === "|>")) || (operator ===
            "<<|")) || (operator === "|>>"))) ? consequent7 : (undefined || pass));
    }))));
x23(y23);
var x24 = addRewrite.bind(null, "AssignmentExpression"),
    y24 = seq(((__args33 = ["right", checkTop]), (ops33 = [__args33[1]]), seq(moveChild("right"), seqa(ops33), up)), ((
        consequent8 = extract((function(__o6) {
            var immutable = __o6["immutable"],
                left = __o6["left"],
                right0 = __o6["right"];
            return (immutable ? addBindingForNode(left, right0) : setWorkingForNode(left, right0));
        }))), extract((function(node) {
        var z, y25;
        return (((z = node.left), (y25 = type(z)), ("Identifier" === y25)) ? consequent8 : (undefined ||
            pass));
    }))));
x24(y24);
var x25 = addRewrite.bind(null, ["ConditionalExpression", "IfStatement"]),
    y25 = seq(((__args34 = ["test", checkTop]), (ops34 = [__args34[1]]), seq(moveChild("test"), seqa(ops34), up)), ((
        consequent9 = extract((function(__o6) {
            var test = __o6["test"],
                consequent10 = __o6["consequent"],
                alternate1 = __o6["alternate"];
            return seq(set((isTruthy(test) ? consequent10 : alternate1)), checkTop);
        }))), (alternate1 = seq(((__args35 = ["consequent", checkTop]), (ops35 = [__args35[1]]), seq(moveChild(
        "consequent"), seqa(ops35), up)), ((__args36 = ["alternate", checkTop]), (ops36 = [__args36[1]]),
        seq(moveChild("alternate"), seqa(ops36), up)))), extract((function(node) {
        return (isPrimitive(node.test) ? consequent9 : (alternate1 || pass));
    }))));
x25(y25);
var x26 = addRewrite.bind(null, "CheckedMemberExpression"),
    y26 = seq(((__args37 = ["object", checkTop]), (ops37 = [__args37[1]]), seq(moveChild("object"), seqa(ops37), up)), (
        (__args38 = ["property", checkTop]), (ops38 = [__args38[1]]), (consequent10 = seq(moveChild("property"),
            seqa(ops38), up)), extract((function(node) {
            return (node.computed ? consequent10 : (undefined || pass));
        }))), extract((function(node) {
        return getBinding(getUid(node.id))
            .chain((function(binding) {
                var x27, y27;
                return (((binding && binding.value) && binding.simple) ? ((x27 = set), (y27 =
                    modifyNode(node, ({
                        "id": binding.value
                    }))), x27(y27)) : pass);
            }));
    })));
x26(y26);
var x27 = addRewrite.bind(null, "MemberExpression"),
    y27 = seq(((__args39 = ["object", checkTop]), (ops39 = [__args39[1]]), seq(moveChild("object"), seqa(ops39), up)), (
        (__args40 = ["property", checkTop]), (ops40 = [__args40[1]]), (consequent11 = seq(moveChild("property"),
            seqa(ops40), up)), extract((function(node) {
            return (node.computed ? consequent11 : (undefined || pass));
        }))), ((consequent12 = modify((function(__o6) {
        var object = __o6["object"],
            property = __o6["property"];
        return (object.elements[property.value] || builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && (type(node.object) === "ArrayExpression")) && isNumberish(node.property)) ?
            consequent12 : (undefined || pass));
    }))), ((consequent13 = modify((function(__o6) {
        var object = __o6["object"];
        return ast_value.Literal.create(null, "number", object.elements.length);
    }))), extract((function(node) {
        return ((((type(node) === "MemberExpression") && (type(node.object) === "ArrayExpression")) &&
                (((!node.computed) && (node.property.name === "length")) || ((node.computed && (type(
                    node.property) === "Literal")) && (node.property.value === "length")))) ?
            consequent13 : (undefined || pass));
    }))), ((consequent14 = modify((function(node) {
        var str = node.object.value,
            idx = node.property.value;
        return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) : builtins.undefined);
    }))), extract((function(node) {
        return (((node.computed && ((type(node.object) === "Literal") && (node.object.kind === "string"))) &&
            isNumberish(node.property)) ? consequent14 : (undefined || pass));
    }))));
x27(y27);
var x28 = addRewrite.bind(null, "NewExpression"),
    y28 = seq(((__args41 = ["callee", checkTop]), (ops41 = [__args41[1]]), seq(moveChild("callee"), seqa(ops41), up)), (
        (__args42 = ["args", checkTop]), (ops42 = [__args42[1]]), seq(moveChild("args"), seqa(ops42), up)));
x28(y28);
var x29 = addRewrite.bind(null, "CallExpression"),
    y29 = seq(((__args43 = ["callee", checkTop]), (ops43 = [__args43[1]]), seq(moveChild("callee"), seqa(ops43), up)), (
        (__args44 = ["args", checkTop]), (ops44 = [__args44[1]]), seq(moveChild("args"), seqa(ops44), up)), ((exp =
        M.node.map((function(x30) {
            return x30.callee;
        }))), (consequent15 = exp.chain((function(z) {
        var callee = expandNode(z);
        return modify((function(node) {
            return incCount(getUid(node.callee), (getExpansion(node.callee)
                    .count || 1), getExpansion(node.callee)
                .value, ast_expression.CallExpression.create(node.loc, callee, node.args));
        }));
    }))), extract((function(node) {
        return (isExpansion(node.callee) ? consequent15 : (undefined || pass));
    }))), ((consequent16 = seq(unique((function(uid) {
        return extract((function(node) {
            var __o6 = expandCallee(uid, node.callee, node.args),
                locals = __o6[0],
                node0 = __o6[1];
            return seq(modifyState(state.addLocals.bind(null, locals)), set(node0));
        }));
    })), checkTop)), extract((function(node) {
        return ((isLambda(node.callee) || ((type(node.callee) === "LetExpression") && isLambda(node.callee
            .body))) ? consequent16 : (undefined || pass));
    }))));
x29(y29);
var x30 = addRewrite.bind(null, "CurryExpression"),
    y30 = seq(((__args45 = ["base", checkTop]), (ops45 = [__args45[1]]), seq(moveChild("base"), seqa(ops45), up)), ((
        __args46 = ["args", checkTop]), (ops46 = [__args46[1]]), seq(moveChild("args"), seqa(ops46), up)), ((exp0 =
        M.node.map((function(x31) {
            return x31.base;
        }))), (consequent17 = exp0.chain((function(z) {
        var base = expandNode(z);
        return modify((function(node) {
            return incCount(getUid(node.base), getExpansion(node.base), getExpansion(node.base)
                .value, ast_expression.CurryExpression.create(node.loc, base, node.args));
        }));
    }))), extract((function(node) {
        return (isExpansion(node.base) ? consequent17 : (undefined || pass));
    }))), ((consequent18 = seq(unique((function(uid) {
        return modify((function(node) {
            return expandCurry(uid, node.base, node.args);
        }));
    })), checkTop)), extract((function(node) {
        var base;
        return (((base = node["base"]), (isLambdaWithoutArgs(base) || ((type(base) === "LetExpression") &&
            isLambdaWithoutArgs(base.body)))) ? consequent18 : (undefined || pass));
    }))));
x30(y30);
var x31 = addRewrite.bind(null, "LetExpression"),
    y31 = seq(((__args47 = ["bindings", checkTop]), (ops47 = [__args47[1]]), seq(moveChild("bindings"), seqa(ops47), up)), (
        (__args48 = ["body", checkTop]), (ops48 = [__args48[1]]), seq(moveChild("body"), seqa(ops48), up)), ((
        consequent19 = modify((function(__o6) {
            var loc = __o6["loc"],
                bindings = __o6["bindings"],
                body3 = __o6["body"];
            return ast_expression.LetExpression.create(loc, concat(bindings, body3.bindings), body3.body);
        }))), extract((function(node) {
        var z, y32;
        return (((z = node.body), (y32 = type(z)), ("LetExpression" === y32)) ? consequent19 : (
            undefined || pass));
    }))), modify((function(__o6) {
        var loc = __o6["loc"],
            bindings = __o6["bindings"],
            body3 = __o6["body"];
        return ast_expression.LetExpression.create(loc, flattenr(bindings), body3);
    })), ((consequent20 = modify((function(x32) {
        return x32.body;
    }))), extract((function(node) {
        var bindings;
        return (((bindings = node["bindings"]), (!bindings.length)) ? consequent20 : (undefined || pass));
    }))));
x31(y31);
var x32 = addRewrite.bind(null, "SliceUnpack"),
    y32 = seq(((__args49 = ["target", checkTop]), (ops49 = [__args49[1]]), seq(moveChild("target"), seqa(ops49), up)), (
        (consequent21 = extract((function(node) {
            return getBinding(getUid(node.target))
                .chain((function(binding) {
                    return (((binding && binding.value) && (type(binding.value) ===
                        "ArrayExpression")) ? modify((function(__o6) {
                        var target = __o6["target"],
                            from = __o6["from"],
                            to = __o6["to"];
                        return ast_expression.ArrayExpression.create(null, map((
                            function(i) {
                                return ast_expression.MemberExpression.create(
                                    null, target, ast_value.Literal.create(
                                        null, "number", i), true);
                            }), range(from, (binding.value.elements.length -
                            to))));
                    })) : pass);
                }));
        }))), extract((function(node) {
            return (getUid(node.target) ? consequent21 : (undefined || pass));
        }))));
x32(y32);
var x33 = addRewrite.bind(null, ["RelativeUnpack"]),
    __args50 = ["target", checkTop],
    ops50 = [__args50[1]],
    y33 = seq(moveChild("target"), seqa(ops50), up);
x33(y33);
var x34 = addRewrite.bind(null, "ArgumentsPattern"),
    y34 = seq(((__args51 = ["id", checkTop]), (ops51 = [__args51[1]]), seq(moveChild("id"), seqa(ops51), up)), ((
        __args52 = ["elements", checkTop]), (ops52 = [__args52[1]]), seq(moveChild("elements"), seqa(ops52), up)), (
        (__args53 = ["self", checkTop]), (ops53 = [__args53[1]]), seq(moveChild("self"), seqa(ops53), up)));
x34(y34);
var x35 = addRewrite.bind(null, "IdentifierPattern"),
    y35 = extract((function(node) {
        return addBinding(getUid(node.id), null, true);
    }));
x35(y35);
var x36 = addRewrite.bind(null, "ArrayExpression"),
    __args54 = ["elements", checkTop],
    ops54 = [__args54[1]],
    y36 = seq(moveChild("elements"), seqa(ops54), up);
x36(y36);
var x37 = addRewrite.bind(null, "ObjectExpression"),
    __args55 = ["properties", checkTop],
    ops55 = [__args55[1]],
    y37 = seq(moveChild("properties"), seqa(ops55), up);
x37(y37);
var x38 = addRewrite.bind(null, "ObjectValue"),
    __args56 = ["value", checkTop],
    ops56 = [__args56[1]],
    y38 = seq(moveChild("value"), seqa(ops56), up);
x38(y38);
var x39 = addRewrite.bind(null, "Identifier"),
    consequent22 = extract((function(node) {
        return getBinding(getUid(node))
            .chain((function(binding) {
                return (((binding && binding.value) && binding.simple) ? set(binding.value) : pass);
            }));
    })),
    y39 = extract((function(node) {
        return ((getUid(node) && (!isExpansion(node))) ? consequent22 : (undefined || pass));
    }));
x39(y39);
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
    initialState = ((x40 = foldl((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return state.addBinding(getUid(id), markExpansion(id, 0, def), true, s);
    }), State.empty, Object.keys(builtins))), (y40 = state.addGlobal.bind(null, "_")), y40(x40));
(optimize = (function(ast, data) {
    return run(inline, ast, initialState, data.unique);
}));
(exports["optimize"] = optimize);