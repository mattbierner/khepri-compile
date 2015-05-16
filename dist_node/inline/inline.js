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
    ast = require("../ast"),
    builtin = require("../builtin"),
    __o1 = require("../fun"),
    state = require("./state"),
    __o2 = require("./expand"),
    __o3 = require("./expansion"),
    __o4 = require("./rename"),
    optimize, modifyNode = __o["modify"],
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
    x, y, __args, ops, consequent0, alternate0, consequent, alternate, __args0, ops0, consequent1, __args1, ops1,
        __args2, ops2, __args3, ops3, __args4, ops4, __args5, ops5, __args6, ops6, __args7, ops7, consequent2,
        alternate1, __args8, ops8, consequent3, consequent4, __args9, ops9, __args10, ops10, __args11, ops11, __args12,
        ops12, __args13, ops13, __args14, ops14, __args15, ops15, __args16, ops16, __args17, ops17, __args18, ops18,
        __args19, ops19, __args20, ops20, body, __args21, ops21, __args22, ops22, body0, __args23, ops23, __args24,
        ops24, __args25, ops25, __args26, ops26, body1, __args27, ops27, __args28, ops28, __args29, ops29, body2,
        arithmetic, __args30, ops30, consequent5, arithmetic0, __args31, ops31, __args32, ops32, consequent6,
        consequent7, __args33, ops33, consequent8, __args34, ops34, __args35, ops35, __args36, ops36, __args37, ops37,
        consequent9, alternate2, __args38, ops38, __args39, ops39, consequent10, __args40, ops40, __args41, ops41,
        consequent11, consequent12, consequent13, consequent14, __args42, ops42, __args43, ops43, __args44, ops44,
        __args45, ops45, exp, consequent15, consequent16, __args46, ops46, __args47, ops47, exp0, consequent17,
        consequent18, __args48, ops48, __args49, ops49, consequent19, consequent20, __args50, ops50, consequent21,
        __args51, ops51, __args52, ops52, __args53, ops53, __args54, ops54, __args55, ops55, __args56, ops56, __args57,
        ops57, consequent22, __and = (function(x, y) {
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
    __eq = (function(x, y) {
        return (x == y);
    }),
    __bras = (function(x, y) {
        return (x >> y);
    }),
    __lnot = (function(x) {
        return (!x);
    }),
    __sneq = (function(x, y) {
        return (x !== y);
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
    __neq = (function(x, y) {
        return (x != y);
    }),
    __bor = (function(x, y) {
        return (x | y);
    }),
    __seq = (function(x, y) {
        return (x === y);
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
    push = modifyState(state.push),
    pop = modifyState(state.pop),
    globals = M.chain.bind(null, getState.map(state.getGlobals)),
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
    getBindingType = (function(id, value) {
        var uid;
        return (isPrimitive(value) ? M.of([SIMPLE, value]) : (isLambda(value) ? M.of([SIMPLE, markExpansion(id, 0,
            value)]) : (isIdentifier(value) ? ((uid = getUid(value)), (uid ? getState.map(state.getBinding.bind(
                null, uid)) : pass))
            .chain((function(binding) {
                return ((binding && binding.immutable) ? M.of([SIMPLE, ((binding.simple && binding.value) ?
                    mergeExpansions(binding.value, value) : value)]) : M.of([SIMPLE, value]));
            })) : M.of([COMPLEX, value]))));
    }),
    addBindingForNode = (function(id, value) {
        return getBindingType(id, value)
            .chain((function(__o5) {
                var kind = __o5[0],
                    value0 = __o5[1],
                    uid = getUid(id);
                return modifyState(state.addBinding.bind(null, uid, value0, kind));
            }));
    }),
    addWorkingForNode = (function(id, value) {
        return getBindingType(id, value)
            .chain((function(__o5) {
                var kind = __o5[0],
                    value0 = __o5[1],
                    uid = getUid(id);
                return modifyState(state.addWorking.bind(null, uid, value0, kind));
            }));
    }),
    setWorkingForNode = (function(id, value) {
        var uid = getUid(id);
        return (uid ? getState.map(state.getBinding.bind(null, uid)) : pass)
            .chain((function(binding) {
                return (binding ? addWorkingForNode(id, value) : modifyState(state.invalidateWorking.bind(
                    null, uid)));
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
    });
addRewrite("UnaryOperator", seq(extract((function(__o5) {
    var name = __o5["name"];
    return seq(modifyState(state.addGlobal.bind(null, name)), set(builtins[name]));
})), checkTop));
addRewrite("BinaryOperator", seq(extract((function(__o5) {
    var name = __o5["name"];
    return seq(modifyState(state.addGlobal.bind(null, name)), set(builtins[name]));
})), checkTop));
addRewrite("TernaryOperator", seq(modifyState(state.addGlobal.bind(null, "?")), set(builtins["?"]), checkTop));
addRewrite("OperatorExpression", seq(((consequent = unique((function(uid) {
    return modify((function(__o5) {
        var operator = __o5["operator"];
        return builtin.member(operator, uid);
    }));
}))), (alternate = seq(((__args = ["operator", checkTop]), (ops = [__args[1]]), seq(moveChild("operator"),
    seqa(ops), up)), ((consequent0 = modify((function(__o5) {
    var operator = __o5["operator"];
    return ast_expression.CallExpression.create(null, builtins["_"], [operator]);
}))), (alternate0 = modify((function(x0) {
    return x0.operator;
}))), extract((function(node) {
    return (node.flipped ? consequent0 : (alternate0 || pass));
}))))), extract((function(node) {
    var operator;
    return (((operator = node["operator"]), ((type(operator) === "MemberExpression") || (type(
        operator) === "CallExpression"))) ? consequent : (alternate || pass));
}))), checkTop));
addRewrite("Program", seq(((__args0 = ["body", checkTop]), (ops0 = [__args0[1]]), seq(moveChild("body"), seqa(ops0), up)), (
    (consequent1 = globals((function(globals0) {
        return modify((function(node) {
            return modifyNode(node, ({
                "body": concat(createGlobalDeclarations(globals0), node.body)
            }));
        }));
    }))), extract((function(node) {
        var z, y0;
        return (((z = node.body), (y0 = type(z)), ("Package" !== y0)) ? consequent1 : (undefined ||
            pass));
    })))));
addRewrite("Package", seq(((__args1 = ["body", checkTop]), (ops1 = [__args1[1]]), seq(moveChild("body"), seqa(ops1), up)),
    globals((function(globals0) {
        return modify((function(node) {
            var body = node["body"];
            return modifyNode(node, ({
                "body": ((type(body) === "WithStatement") ? modifyNode(body, ({
                    "body": ast_statement.BlockStatement.create(null, concat(
                        createGlobalDeclarations(globals0), body.body.body))
                })) : concat(createGlobalDeclarations(globals0), body))
            }));
        }));
    }))));
addRewrite("SwitchCase", seq(((__args2 = ["test", checkTop]), (ops2 = [__args2[1]]), seq(moveChild("test"), seqa(ops2),
    up)), ((__args3 = ["consequent", checkTop]), (ops3 = [__args3[1]]), seq(moveChild("consequent"), seqa(ops3),
    up))));
addRewrite("CatchClause", seq(((__args4 = ["param", checkTop]), (ops4 = [__args4[1]]), seq(moveChild("param"), seqa(
    ops4), up)), ((__args5 = ["body", checkTop]), (ops5 = [__args5[1]]), seq(moveChild("body"), seqa(ops5), up))));
addRewrite("VariableDeclaration", ((__args6 = ["declarations", checkTop]), (ops6 = [__args6[1]]), seq(moveChild(
    "declarations"), seqa(ops6), up)));
addRewrite("VariableDeclarator", seq(((__args7 = ["init", checkTop]), (ops7 = [__args7[1]]), seq(moveChild("init"),
    seqa(ops7), up)), ((consequent2 = extract((function(__o5) {
    var immutable = __o5["immutable"],
        id = __o5["id"],
        init = __o5["init"],
        uid;
    return (immutable ? seq(addBindingForNode(id, init), ((uid = getUid(id)), (uid ? getState.map(
            state.getBinding.bind(null, uid)) : pass)
        .chain((function(binding) {
            return ((((binding && binding.simple) && (!isExpansion(binding.value))) &&
                (isPrimitive(binding.value) || (binding.immutable &&
                    isIdentifier(binding.value)))) ? set([]) : pass);
        })))) : addWorkingForNode(id, init));
}))), (alternate1 = extract((function(__o5) {
    var id = __o5["id"];
    return addWorkingForNode(id, builtins.undefined);
}))), extract((function(node) {
    return (node.init ? consequent2 : (alternate1 || pass));
})))));
addRewrite("Binding", seq(((__args8 = ["value", checkTop]), (ops8 = [__args8[1]]), seq(moveChild("value"), seqa(ops8),
    up)), ((consequent3 = extract((function(__o5) {
    var pattern = __o5["pattern"],
        value = __o5["value"],
        id, uid;
    return seq(addBindingForNode(pattern.id, value), ((id = pattern.id), (uid = getUid(id)), (
            uid ? getState.map(state.getBinding.bind(null, uid)) : pass)
        .chain((function(binding) {
            return ((((binding && binding.simple) && (!isExpansion(binding.value))) &&
                (isPrimitive(binding.value) || (binding.immutable &&
                    isIdentifier(binding.value)))) ? set([]) : pass);
        }))));
}))), extract((function(node) {
    var pattern;
    return (((pattern = node["pattern"]), ((type(pattern) === "IdentifierPattern") && getUid(
        pattern.id))) ? consequent3 : (undefined || pass));
}))), ((consequent4 = extract((function(node) {
    var bindings = flatten(concat(node.value.bindings, ast_declaration.Binding.create(null,
        node.pattern, node.value.body)));
    return seq(set(bindings), visitChild((bindings.length - 1)));
}))), extract((function(node) {
    return (((type(node) === "Binding") && (type(node.value) === "LetExpression")) ? consequent4 :
        (undefined || pass));
})))));
addRewrite("BlockStatement", ((__args9 = ["body", checkTop]), (ops9 = [__args9[1]]), seq(moveChild("body"), seqa(ops9),
    up)));
addRewrite("ExpressionStatement", ((__args10 = ["expression", checkTop]), (ops10 = [__args10[1]]), seq(moveChild(
    "expression"), seqa(ops10), up)));
addRewrite("WithStatement", seq(((__args11 = ["bindings", checkTop]), (ops11 = [__args11[1]]), seq(moveChild("bindings"),
    seqa(ops11), up)), ((__args12 = ["body", checkTop]), (ops12 = [__args12[1]]), seq(moveChild("body"), seqa(
    ops12), up))));
addRewrite("SwitchStatement", seq(((__args13 = ["discriminant", checkTop]), (ops13 = [__args13[1]]), seq(moveChild(
    "discriminant"), seqa(ops13), up)), ((__args14 = ["cases", checkTop]), (ops14 = [__args14[1]]), seq(
    moveChild("cases"), seqa(ops14), up))));
addRewrite(["ReturnStatement", "ThrowStatement"], ((__args15 = ["argument", checkTop]), (ops15 = [__args15[1]]), seq(
    moveChild("argument"), seqa(ops15), up)));
addRewrite("TryStatement", seq(((__args16 = ["block", checkTop]), (ops16 = [__args16[1]]), seq(moveChild("block"), seqa(
    ops16), up)), ((__args17 = ["handler", checkTop]), (ops17 = [__args17[1]]), seq(moveChild("handler"), seqa(
    ops17), up)), ((__args18 = ["finalizer", checkTop]), (ops18 = [__args18[1]]), seq(moveChild("finalizer"),
    seqa(ops18), up))));
addRewrite("WhileStatement", ((body = [((__args19 = ["test", checkTop]), (ops19 = [__args19[1]]), seq(moveChild("test"),
    seqa(ops19), up)), ((__args20 = ["body", checkTop]), (ops20 = [__args20[1]]), seq(moveChild("body"),
    seqa(ops20), up))]), seq(push, seqa(body), pop)));
addRewrite("DoWhileStatement", ((body0 = [((__args21 = ["body", checkTop]), (ops21 = [__args21[1]]), seq(moveChild(
    "body"), seqa(ops21), up)), ((__args22 = ["test", checkTop]), (ops22 = [__args22[1]]), seq(
    moveChild("test"), seqa(ops22), up))]), seq(push, seqa(body0), pop)));
addRewrite("ForStatement", seq(((__args23 = ["init", checkTop]), (ops23 = [__args23[1]]), seq(moveChild("init"), seqa(
    ops23), up)), ((body1 = [((__args24 = ["test", checkTop]), (ops24 = [__args24[1]]), seq(moveChild("test"),
    seqa(ops24), up)), ((__args25 = ["update", checkTop]), (ops25 = [__args25[1]]), seq(moveChild(
    "update"), seqa(ops25), up)), ((__args26 = ["body", checkTop]), (ops26 = [__args26[1]]), seq(
    moveChild("body"), seqa(ops26), up))]), seq(push, seqa(body1), pop))));
addRewrite("FunctionExpression", ((body2 = [pushLocals, ((__args27 = ["id", checkTop]), (ops27 = [__args27[1]]), seq(
    moveChild("id"), seqa(ops27), up)), ((__args28 = ["params", checkTop]), (ops28 = [__args28[1]]),
    seq(moveChild("params"), seqa(ops28), up)), ((__args29 = ["body", checkTop]), (ops29 = [__args29[1]]),
    seq(moveChild("body"), seqa(ops29), up)), getLocals.chain((function(locals) {
    return modify((function(node) {
        return ast.setLocals(concat(ast.getLocals(node), locals), node);
    }));
})), popLocals]), seq(push, seqa(body2), pop)));
addRewrite("UnaryExpression", ((arithmetic = ({
    "!": __lnot,
    "~": __bnot,
    "typeof": __typeof,
    "++": __plus,
    "--": __minus
})), seq(((__args30 = ["argument", checkTop]), (ops30 = [__args30[1]]), seq(moveChild("argument"), seqa(ops30),
    up)), ((consequent5 = modify((function(__o5) {
    var loc = __o5["loc"],
        operator = __o5["operator"],
        argument = __o5["argument"],
        value = arithmetic[operator](argument.value);
    return ast_value.Literal.create(loc, (typeof value), value);
}))), extract((function(node) {
    var operator, argument;
    return (((operator = node["operator"]), (argument = node["argument"]), (arithmetic[operator] &&
        isPrimitive(argument))) ? consequent5 : (undefined || pass));
}))))));
addRewrite("BinaryExpression", ((arithmetic0 = ({
    "+": __add,
    "-": __sub,
    "*": __mul,
    "/": __div,
    "%": __mod,
    "<<": __blas,
    ">>": __bras,
    ">>>": __brls,
    "==": __eq,
    "!=": __neq,
    "===": __seq,
    "!==": __sneq,
    "<": __lt,
    ">": __gt,
    "<=": __lte,
    ">=": __gte,
    "|": __bor,
    "&": __band,
    "^": __bxor,
    "&&": __and,
    "||": __or
})), seq(((__args31 = ["left", checkTop]), (ops31 = [__args31[1]]), seq(moveChild("left"), seqa(ops31), up)), (
    (__args32 = ["right", checkTop]), (ops32 = [__args32[1]]), seq(moveChild("right"), seqa(ops32), up)), (
    (consequent6 = modify((function(__o5) {
        var operator = __o5["operator"],
            left = __o5["left"],
            right0 = __o5["right"],
            value = arithmetic0[operator](left.value, right0.value);
        return ast_value.Literal.create(null, (typeof value), value);
    }))), extract((function(node) {
        var operator, left, right0;
        return (((operator = node["operator"]), (left = node["left"]), (right0 = node["right"]), ((
                arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right0))) ? consequent6 :
            (undefined || pass));
    }))), ((consequent7 = extract((function(__o5) {
    var operator = __o5["operator"],
        left = __o5["left"],
        right0 = __o5["right"];
    return seq(modifyState(state.addGlobal.bind(null, operator)), set(ast_expression.CallExpression
        .create(null, builtins[operator], [left, right0])), checkTop);
}))), extract((function(node) {
    var operator;
    return (((operator = node["operator"]), (((((((((operator === "\\>") || (operator ===
            "\\>>")) || (operator === "<\\")) || (operator ===
            "<<\\")) || (operator === "??")) || (operator === "<|")) || (
            operator === "|>")) || (operator === "<<|")) || (operator === "|>>"))) ?
        consequent7 : (undefined || pass));
}))))));
addRewrite("AssignmentExpression", seq(((__args33 = ["right", checkTop]), (ops33 = [__args33[1]]), seq(moveChild(
    "right"), seqa(ops33), up)), ((consequent8 = extract((function(__o5) {
    var immutable = __o5["immutable"],
        left = __o5["left"],
        right0 = __o5["right"];
    return (immutable ? addBindingForNode(left, right0) : setWorkingForNode(left, right0));
}))), extract((function(node) {
    var z, y0;
    return (((z = node.left), (y0 = type(z)), ("Identifier" === y0)) ? consequent8 : (undefined ||
        pass));
})))));
addRewrite("DeleteExpression", ((__args34 = ["argument", checkTop]), (ops34 = [__args34[1]]), seq(moveChild("argument"),
    seqa(ops34), up)));
addRewrite(["ConditionalExpression", "IfStatement"], seq(((__args35 = ["test", checkTop]), (ops35 = [__args35[1]]), seq(
    moveChild("test"), seqa(ops35), up)), ((consequent9 = extract((function(__o5) {
    var test = __o5["test"],
        consequent10 = __o5["consequent"],
        alternate2 = __o5["alternate"];
    return seq(set((isTruthy(test) ? consequent10 : alternate2)), checkTop);
}))), (alternate2 = seq(((__args36 = ["consequent", checkTop]), (ops36 = [__args36[1]]), seq(moveChild(
    "consequent"), seqa(ops36), up)), ((__args37 = ["alternate", checkTop]), (ops37 = [__args37[1]]),
    seq(moveChild("alternate"), seqa(ops37), up)))), extract((function(node) {
    return (isPrimitive(node.test) ? consequent9 : (alternate2 || pass));
})))));
addRewrite("CheckedMemberExpression", seq(((__args38 = ["object", checkTop]), (ops38 = [__args38[1]]), seq(moveChild(
    "object"), seqa(ops38), up)), ((__args39 = ["property", checkTop]), (ops39 = [__args39[1]]), (consequent10 =
    seq(moveChild("property"), seqa(ops39), up)), extract((function(node) {
    return (node.computed ? consequent10 : (undefined || pass));
}))), extract((function(node) {
    var uid;
    return ((uid = getUid(node.id)), (uid ? getState.map(state.getBinding.bind(null, uid)) : pass))
        .chain((function(binding) {
            return (((binding && binding.value) && binding.simple) ? set(modifyNode(node, ({
                id: binding.value
            }))) : pass);
        }));
}))));
addRewrite("MemberExpression", seq(((__args40 = ["object", checkTop]), (ops40 = [__args40[1]]), seq(moveChild("object"),
    seqa(ops40), up)), ((__args41 = ["property", checkTop]), (ops41 = [__args41[1]]), (consequent11 = seq(
    moveChild("property"), seqa(ops41), up)), extract((function(node) {
    return (node.computed ? consequent11 : (undefined || pass));
}))), ((consequent12 = modify((function(__o5) {
    var object = __o5["object"],
        property = __o5["property"];
    return (object.elements[property.value] || builtins.undefined);
}))), extract((function(node) {
    return (((node.computed && (type(node.object) === "ArrayExpression")) && isNumberish(node.property)) ?
        consequent12 : (undefined || pass));
}))), ((consequent13 = modify((function(__o5) {
    var object = __o5["object"];
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
    return (((node.computed && isString(node.object)) && isNumberish(node.property)) ? consequent14 :
        (undefined || pass));
})))));
addRewrite(["NewExpression", "ApplyExpression"], seq(((__args42 = ["callee", checkTop]), (ops42 = [__args42[1]]), seq(
    moveChild("callee"), seqa(ops42), up)), ((__args43 = ["args", checkTop]), (ops43 = [__args43[1]]), seq(
    moveChild("args"), seqa(ops43), up))));
addRewrite("CallExpression", seq(((__args44 = ["callee", checkTop]), (ops44 = [__args44[1]]), seq(moveChild("callee"),
    seqa(ops44), up)), ((__args45 = ["args", checkTop]), (ops45 = [__args45[1]]), seq(moveChild("args"), seqa(
    ops45), up)), ((exp = M.node.map((function(x0) {
    return x0.callee;
}))), (consequent15 = exp.chain((function(z) {
    var newCallee = expandNode(z);
    return modify((function(node) {
        var callee = node["callee"];
        return incCount(getUid(callee), (getExpansionDepth(callee) || 1),
            getExpansionValue(callee), modifyNode(node, ({
                callee: newCallee
            })));
    }));
}))), extract((function(node) {
    return (isExpansion(node.callee) ? consequent15 : (undefined || pass));
}))), ((consequent16 = seq(unique((function(uid) {
    return extract((function(node) {
        var __o5 = expandCallee(uid, node.callee, node.args),
            locals = __o5[0],
            node0 = __o5[1];
        return seq(modifyState(state.addLocals.bind(null, locals)), set(node0));
    }));
})), checkTop)), extract((function(node) {
    var callee;
    return (((callee = node["callee"]), (isLambda(callee) || ((type(callee) === "LetExpression") &&
        isLambda(callee.body)))) ? consequent16 : (undefined || pass));
})))));
addRewrite("CurryExpression", seq(((__args46 = ["base", checkTop]), (ops46 = [__args46[1]]), seq(moveChild("base"),
    seqa(ops46), up)), ((__args47 = ["args", checkTop]), (ops47 = [__args47[1]]), seq(moveChild("args"), seqa(
    ops47), up)), ((exp0 = M.node.map((function(x0) {
    return x0.base;
}))), (consequent17 = exp0.chain((function(z) {
    var expandedBase = expandNode(z);
    return modify((function(node) {
        var base = node["base"];
        return incCount(getUid(base), getExpansion(base), getExpansionValue(base),
            modifyNode(node, ({
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
    return (((base = node["base"]), (isLambdaWithoutArgs(base) || ((type(base) === "LetExpression") &&
        isLambdaWithoutArgs(base.body)))) ? consequent18 : (undefined || pass));
})))));
addRewrite("LetExpression", seq(((__args48 = ["bindings", checkTop]), (ops48 = [__args48[1]]), seq(moveChild("bindings"),
    seqa(ops48), up)), ((__args49 = ["body", checkTop]), (ops49 = [__args49[1]]), seq(moveChild("body"), seqa(
    ops49), up)), ((consequent19 = modify((function(__o5) {
    var loc = __o5["loc"],
        bindings = __o5["bindings"],
        body3 = __o5["body"];
    return ast_expression.LetExpression.create(loc, concat(bindings, body3.bindings), body3.body);
}))), extract((function(node) {
    var z, y0;
    return (((z = node.body), (y0 = type(z)), ("LetExpression" === y0)) ? consequent19 : (undefined ||
        pass));
}))), modify((function(node) {
    return modifyNode(node, ({
        bindings: flattenr(node.bindings)
    }));
})), ((consequent20 = modify((function(x0) {
    return x0.body;
}))), extract((function(node) {
    var x0;
    return (((x0 = node.bindings.length), (!x0)) ? consequent20 : (undefined || pass));
})))));
addRewrite("SliceUnpack", seq(((__args50 = ["target", checkTop]), (ops50 = [__args50[1]]), seq(moveChild("target"),
    seqa(ops50), up)), ((consequent21 = extract((function(node) {
    var uid;
    return ((uid = getUid(node.target)), (uid ? getState.map(state.getBinding.bind(null, uid)) :
        pass))
        .chain((function(binding) {
            return (((binding && binding.value) && (type(binding.value) ===
                "ArrayExpression")) ? modify((function(__o5) {
                var target = __o5["target"],
                    from = __o5["from"],
                    to = __o5["to"];
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
})))));
addRewrite(["RelativeUnpack"], ((__args51 = ["target", checkTop]), (ops51 = [__args51[1]]), seq(moveChild("target"),
    seqa(ops51), up)));
addRewrite("ArgumentsPattern", seq(((__args52 = ["id", checkTop]), (ops52 = [__args52[1]]), seq(moveChild("id"), seqa(
    ops52), up)), ((__args53 = ["elements", checkTop]), (ops53 = [__args53[1]]), seq(moveChild("elements"),
    seqa(ops53), up)), ((__args54 = ["self", checkTop]), (ops54 = [__args54[1]]), seq(moveChild("self"), seqa(
    ops54), up))));
addRewrite("IdentifierPattern", extract((function(__o5) {
    var id = __o5["id"],
        uid = getUid(id),
        simple = SIMPLE;
    return modifyState(state.addBinding.bind(null, uid, null, simple));
})));
addRewrite("ArrayExpression", ((__args55 = ["elements", checkTop]), (ops55 = [__args55[1]]), seq(moveChild("elements"),
    seqa(ops55), up)));
addRewrite("ObjectExpression", ((__args56 = ["properties", checkTop]), (ops56 = [__args56[1]]), seq(moveChild(
    "properties"), seqa(ops56), up)));
addRewrite("ObjectValue", ((__args57 = ["value", checkTop]), (ops57 = [__args57[1]]), seq(moveChild("value"), seqa(
    ops57), up)));
addRewrite("Identifier", ((consequent22 = extract((function(node) {
    var uid;
    return ((uid = getUid(node)), (uid ? getState.map(state.getBinding.bind(null, uid)) : pass))
        .chain((function(binding) {
            return (((binding && binding.value) && binding.simple) ? set(binding.value) :
                pass);
        }));
}))), extract((function(node) {
    return ((getUid(node) && (!isExpansion(node))) ? consequent22 : (undefined || pass));
}))));
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
    initialState = state.addGlobal("_", foldl((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return state.addBinding(getUid(id), markExpansion(id, 0, def), SIMPLE, s);
    }), State.empty, Object.keys(builtins)));
(optimize = (function(ast0, data) {
    return run(inline, ast0, initialState, data.unique);
}));
(exports["optimize"] = optimize);