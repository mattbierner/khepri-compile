/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical.kep'
 * DO NOT EDIT
*/"use strict";
var ast_node = require("khepri-ast")["node"],
    setData = ast_node["setData"],
    setUserData = ast_node["setUserData"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o = require("akh")["base"],
    next = __o["next"],
    seq = __o["sequence"],
    seqa = __o["sequencea"],
    StateT = require("akh")["trans"]["statei"],
    Identity = require("akh")["identity"],
    Error = require("akh")["error"],
    ErrorT = require("akh")["trans"]["error"],
    Unique = require("akh")["unique"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o0 = require("./ast"),
    type = __o0["type"],
    isIdentifier = __o0["isIdentifier"],
    scope = require("./scope"),
    Scope = scope["Scope"],
    __o1 = require("./fun"),
    foldl = __o1["foldl"],
    check, x, y, x0, y0, x1, y1, x2, y2, body, __args, actions, __args0, actions, __args1, actions, body0, __args2,
        actions, __args3, actions, x3, consequent, __args7, actions, alternate, __args4, actions, __args5, actions,
        __args6, actions, __args8, actions, bind, consequent0, alternate0, __args9, actions, __args10, actions,
        __args11, actions, __args12, actions, consequent1, alternate1, __args13, actions, __args14, actions, __args15,
        actions, __args16, actions, body1, __args17, actions, __args18, actions, __args19, actions, body2, __args20,
        actions, body3, __args21, actions, body4, __args22, actions, __args23, actions, __args24, actions, body5,
        __args25, actions, __args26, actions, __args27, actions, __args28, actions, __args29, actions, __args30,
        actions, body6, __args31, actions, body7, __args32, actions, body8, __args33, actions, __args34, actions,
        __args35, actions, __args36, actions, body9, __args37, actions, body10, __args38, actions, __args39, actions,
        body11, __args40, actions, __args41, actions, __args42, actions, body12, __args43, actions, body13, __args44,
        actions, __args45, actions, __args46, actions, x4, __args47, actions, consequent2, alternate2, __args48,
        actions, __args49, actions, __args50, actions, __args51, actions, __args52, actions, __args53, actions,
        __args54, actions, __args55, actions, __args56, actions, __args57, actions, __args58, actions, __args59,
        actions, consequent3, __args60, actions, __args61, actions, body14, __args62, actions, __args63, actions,
        __args64, actions, __args65, actions, __args66, actions, __args67, actions, __args68, actions, __args69,
        actions, __args70, actions, __args71, actions, __args72, actions, __args73, actions, __args74, actions,
        __args75, actions, __args76, actions, reserved = (function(node) {
            return ((node && node.ud) && node.ud.reserved);
        }),
    _check, M = ErrorT(TreeZipperT(StateT(Unique))),
    run = (function(p, s, ctx, ok, err) {
        var y, y0;
        return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(ErrorT.runErrorT(p, ((y = M.inner.of), (
            function(x) {
                return y(ok(x));
            })), ((y0 = M.inner.of), (function(x) {
            return y0(err(x));
        }))), ctx), s), 1000);
    }),
    error = M.fail,
    lift = M.lift,
    unique = M.chain.bind(null, M.liftInner.liftInner(Unique.unique)),
    extractScope = M.liftInner(M.inner.inner.get),
    examineScope = M.chain.bind(null, extractScope),
    modifyScope = ((x = M.liftInner), (y = M.inner.inner.modify), (function(x0) {
        return x(y(x0));
    })),
    push = modifyScope(scope.push),
    pop = modifyScope(scope.pop),
    extractCtx = lift(M.inner.get),
    extract = lift(M.inner.node),
    inspect = M.chain.bind(null, extract),
    up = lift(M.inner.up),
    root = lift(M.inner.root),
    moveChild = ((x0 = lift), (y0 = M.inner.child), (function(x1) {
        return x0(y0(x1));
    })),
    modifyNode = ((x1 = lift), (y1 = M.inner.modifyNode), (function(x2) {
        return x1(y1(x2));
    })),
    setNode = ((x2 = lift), (y2 = M.inner.setNode), (function(x3) {
        return x2(y2(x3));
    })),
    checkTop = inspect((function(x3) {
        return _check(x3);
    })),
    child = (function(edge) {
        var __args = arguments,
            actions = [].slice.call(__args, 1);
        return seq(moveChild(edge), seqa(actions), up);
    }),
    pass = M.of(),
    addUid = (function(id) {
        return unique((function(uid) {
            return modifyScope((function(s) {
                return scope.addUid(s, id, uid);
            }));
        }));
    }),
    checkHasBinding = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasBinding(id) ? pass : error(((("Undeclared identifier:'" + id) + "' at:") + loc)));
        }));
    }),
    checkCanAddBinding = (function(id, loc) {
        return examineScope((function(s) {
            var start, binding, end;
            return (s.hasOwnBinding(id) ? ((start = (loc && loc.start)), (binding = s.getBinding(id)), (end =
                (binding.loc && binding.loc.start)), error(((((("'" + id) + "' at:") + start) +
                " already bound for scope from:") + end))) : pass);
        }));
    }),
    checkCanAssign = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasMutableBinding(id) ? pass : error(((("Assign to immutable variable:'" + id) +
                "' at:") + loc.start)));
        }));
    }),
    markBindingImmutable = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasOwnBinding(id) ? modifyScope((function(s0) {
                return scope.setBindingMutability(s0, id, false);
            })) : error((((("Cannot mark variable:'" + id) + "' at:") + loc.start) +
                " immutable in enclosed scope")));
        }));
    }),
    addMutableBinding = (function(id, loc) {
        return seq(modifyScope((function(s) {
            return scope.addMutableBinding(s, id, loc);
        })), addUid(id));
    }),
    addStaticBinding = (function(id, loc) {
        return modifyScope((function(s) {
            return scope.addImmutableBinding(s, id, loc);
        }));
    }),
    addImmutableBinding = (function(id, loc) {
        return seq(modifyScope((function(s) {
            return scope.addImmutableBinding(s, id, loc);
        })), addUid(id));
    }),
    addMutableBindingChecked = (function(id, loc) {
        return seq(checkCanAddBinding(id, loc), addMutableBinding(id, loc));
    }),
    addImmutableBindingChecked = (function(id, loc) {
        return seq(checkCanAddBinding(id, loc), addImmutableBinding(id, loc));
    }),
    addStaticBindingChecked = (function(id, loc) {
        return seq(checkCanAddBinding(id, loc), addStaticBinding(id, loc));
    }),
    checks = ({}),
    addCheck = (function(type0, check) {
        if (Array.isArray(type0)) type0.forEach((function(x3) {
            return addCheck(x3, check);
        }));
        else {
            (checks[type0] = check);
        }
    });
addCheck("Program", ((body = [((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "body"), seqa(actions), up))]), seq(push, seqa(body), pop)));
addCheck("PackageExports", ((__args0 = ["exports", checkTop]), (actions = [].slice.call(__args0, 1)), seq(moveChild(
    "exports"), seqa(actions), up)));
addCheck("PackageExport", seq(inspect((function(__o2) {
    var id = __o2["id"];
    return addMutableBindingChecked(id.name, id.loc);
})), ((__args1 = ["id", checkTop]), (actions = [].slice.call(__args1, 1)), seq(moveChild("id"), seqa(actions),
    up))));
addCheck("Package", ((body0 = [((__args2 = ["exports", checkTop]), (actions = [].slice.call(__args2, 1)), seq(moveChild(
    "exports"), seqa(actions), up)), ((__args3 = ["body", ((x3 = type), (consequent = seq(((__args4 = [
        "bindings", checkTop
    ]), (actions = [].slice.call(__args4, 1)), seq(moveChild("bindings"), seqa(
        actions), up)), ((__args5 = ["body", ((__args6 = ["body", checkTop]), (
        actions = [].slice.call(__args6, 1)), seq(moveChild("body"),
        seqa(actions), up))]), (actions = [].slice.call(__args5, 1)), seq(
        moveChild("body"), seqa(actions), up)))), (__args7 = ["body", checkTop]), (actions = []
        .slice.call(__args7, 1)), (alternate = seq(moveChild("body"), seqa(actions), up)),
    inspect((function(node) {
        var y3;
        return (((y3 = x3(node)), ("WithStatement" === y3)) ? consequent : (
            alternate || pass));
    })))]), (actions = [].slice.call(__args3, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(
    body0), pop)));
addCheck(["StaticDeclaration", "VariableDeclaration"], ((__args8 = ["declarations", checkTop]), (actions = [].slice.call(
    __args8, 1)), seq(moveChild("declarations"), seqa(actions), up)));
addCheck("StaticDeclarator", inspect((function(__o2) {
    var id = __o2["id"];
    return addStaticBindingChecked(id.name, id.loc);
})));
addCheck("VariableDeclarator", ((bind = (function(node) {
    return (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
        addMutableBindingChecked(node.id.name, node.loc));
})), (consequent0 = seq(inspect(bind), ((__args9 = ["id", checkTop]), (actions = [].slice.call(__args9, 1)),
    seq(moveChild("id"), seqa(actions), up)), ((__args10 = ["init", checkTop]), (actions = [].slice.call(
    __args10, 1)), seq(moveChild("init"), seqa(actions), up)))), (alternate0 = seq(((__args11 = ["init",
    checkTop
]), (actions = [].slice.call(__args11, 1)), seq(moveChild("init"), seqa(actions), up)), inspect(bind), (
    (__args12 = ["id", checkTop]), (actions = [].slice.call(__args12, 1)), seq(moveChild("id"), seqa(
        actions), up)))), inspect((function(node) {
    return (node.recursive ? consequent0 : (alternate0 || pass));
}))));
addCheck("Binding", ((consequent1 = seq(((__args13 = ["pattern", checkTop]), (actions = [].slice.call(__args13, 1)),
    seq(moveChild("pattern"), seqa(actions), up)), ((__args14 = ["value", checkTop]), (actions = [].slice
    .call(__args14, 1)), seq(moveChild("value"), seqa(actions), up)))), (alternate1 = seq(((__args15 = ["value",
    checkTop
]), (actions = [].slice.call(__args15, 1)), seq(moveChild("value"), seqa(actions), up)), ((__args16 = [
    "pattern", checkTop
]), (actions = [].slice.call(__args16, 1)), seq(moveChild("pattern"), seqa(actions), up)))), inspect((function(
    node) {
    return (node.recursive ? consequent1 : (alternate1 || pass));
}))));
addCheck("BlockStatement", ((body1 = [((__args17 = ["body", checkTop]), (actions = [].slice.call(__args17, 1)), seq(
    moveChild("body"), seqa(actions), up))]), seq(push, seqa(body1), pop)));
addCheck("ExpressionStatement", ((__args18 = ["expression", checkTop]), (actions = [].slice.call(__args18, 1)), seq(
    moveChild("expression"), seqa(actions), up)));
addCheck("IfStatement", seq(((__args19 = ["test", checkTop]), (actions = [].slice.call(__args19, 1)), seq(moveChild(
    "test"), seqa(actions), up)), ((body2 = [((__args20 = ["consequent", checkTop]), (actions = [].slice.call(
    __args20, 1)), seq(moveChild("consequent"), seqa(actions), up))]), seq(push, seqa(body2), pop)), ((body3 = [
    ((__args21 = ["alternate", checkTop]), (actions = [].slice.call(__args21, 1)), seq(moveChild(
        "alternate"), seqa(actions), up))
]), seq(push, seqa(body3), pop))));
addCheck("WithStatement", ((body4 = [((__args22 = ["bindings", checkTop]), (actions = [].slice.call(__args22, 1)), seq(
    moveChild("bindings"), seqa(actions), up)), ((__args23 = ["body", ((__args24 = ["body", checkTop]), (
    actions = [].slice.call(__args24, 1)), seq(moveChild("body"), seqa(actions), up))]), (actions = []
    .slice.call(__args23, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body4), pop)));
addCheck("SwitchStatement", ((body5 = [((__args25 = ["discriminant", checkTop]), (actions = [].slice.call(__args25, 1)),
    seq(moveChild("discriminant"), seqa(actions), up)), ((__args26 = ["cases", checkTop]), (actions = []
    .slice.call(__args26, 1)), seq(moveChild("cases"), seqa(actions), up))]), seq(push, seqa(body5), pop)));
addCheck("SwitchCase", seq(((__args27 = ["test", checkTop]), (actions = [].slice.call(__args27, 1)), seq(moveChild(
    "test"), seqa(actions), up)), ((__args28 = ["consequent", checkTop]), (actions = [].slice.call(__args28, 1)),
    seq(moveChild("consequent"), seqa(actions), up))));
addCheck(["ReturnStatement", "ThrowStatement"], ((__args29 = ["argument", checkTop]), (actions = [].slice.call(__args29,
    1)), seq(moveChild("argument"), seqa(actions), up)));
addCheck("TryStatement", seq(((__args30 = ["block", checkTop]), (actions = [].slice.call(__args30, 1)), seq(moveChild(
    "block"), seqa(actions), up)), ((body6 = [((__args31 = ["handler", checkTop]), (actions = [].slice.call(
    __args31, 1)), seq(moveChild("handler"), seqa(actions), up))]), seq(push, seqa(body6), pop)), ((body7 = [((
    __args32 = ["finalizer", checkTop]), (actions = [].slice.call(__args32, 1)), seq(moveChild(
    "finalizer"), seqa(actions), up))]), seq(push, seqa(body7), pop))));
addCheck("CatchClause", ((body8 = [inspect((function(__o2) {
    var param = __o2["param"];
    return addImmutableBindingChecked(param.name, param.loc);
})), ((__args33 = ["param", checkTop]), (actions = [].slice.call(__args33, 1)), seq(moveChild("param"),
    seqa(actions), up)), ((__args34 = ["body", ((__args35 = ["body", checkTop]), (actions = [].slice.call(
    __args35, 1)), seq(moveChild("body"), seqa(actions), up))]), (actions = [].slice.call(__args34,
    1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body8), pop)));
addCheck("WhileStatement", seq(((__args36 = ["test", checkTop]), (actions = [].slice.call(__args36, 1)), seq(moveChild(
    "test"), seqa(actions), up)), ((body9 = [((__args37 = ["body", checkTop]), (actions = [].slice.call(
    __args37, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body9), pop))));
addCheck("DoWhileStatement", seq(((body10 = [((__args38 = ["body", checkTop]), (actions = [].slice.call(__args38, 1)),
    seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body10), pop)), ((__args39 = ["test", checkTop]), (
    actions = [].slice.call(__args39, 1)), seq(moveChild("test"), seqa(actions), up))));
addCheck("ForStatement", ((body11 = [((__args40 = ["init", checkTop]), (actions = [].slice.call(__args40, 1)), seq(
    moveChild("init"), seqa(actions), up)), ((__args41 = ["test", checkTop]), (actions = [].slice.call(
    __args41, 1)), seq(moveChild("test"), seqa(actions), up)), ((__args42 = ["update", checkTop]), (
    actions = [].slice.call(__args42, 1)), seq(moveChild("update"), seqa(actions), up)), ((body12 = [((
    __args43 = ["body", checkTop]), (actions = [].slice.call(__args43, 1)), seq(
    moveChild("body"), seqa(actions), up))]), seq(push, seqa(body12), pop))]), seq(push, seqa(body11), pop)));
addCheck("FunctionExpression", ((body13 = [inspect((function(__o2) {
    var id = __o2["id"];
    return (id ? addImmutableBinding(id.name, id.loc) : pass);
})), ((__args44 = ["id", checkTop]), (actions = [].slice.call(__args44, 1)), seq(moveChild("id"), seqa(
    actions), up)), ((__args45 = ["params", checkTop]), (actions = [].slice.call(__args45, 1)), seq(
    moveChild("params"), seqa(actions), up)), ((__args46 = ["body", ((x4 = type), (__args47 = ["body",
    checkTop
]), (actions = [].slice.call(__args47, 1)), (consequent2 = seq(moveChild("body"), seqa(
    actions), up)), (alternate2 = checkTop), inspect((function(node) {
    var y3;
    return (((y3 = x4(node)), ("BlockStatement" === y3)) ? consequent2 : (
        alternate2 || pass));
})))]), (actions = [].slice.call(__args46, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(
    body13), pop)));
addCheck("UnaryExpression", ((__args48 = ["argument", checkTop]), (actions = [].slice.call(__args48, 1)), seq(moveChild(
    "argument"), seqa(actions), up)));
addCheck("AssignmentExpression", seq(((__args49 = ["left", checkTop]), (actions = [].slice.call(__args49, 1)), seq(
    moveChild("left"), seqa(actions), up)), inspect((function(__o2) {
    var operator = __o2["operator"],
        left = __o2["left"];
    return (isIdentifier(left) ? seq(checkCanAssign(left.name, left.loc), ((operator === ":=") ?
        markBindingImmutable(left.name, left.loc) : pass)) : pass);
})), ((__args50 = ["right", checkTop]), (actions = [].slice.call(__args50, 1)), seq(moveChild("right"), seqa(
    actions), up))));
addCheck(["LogicalExpression", "BinaryExpression"], seq(((__args51 = ["left", checkTop]), (actions = [].slice.call(
    __args51, 1)), seq(moveChild("left"), seqa(actions), up)), ((__args52 = ["right", checkTop]), (actions = []
    .slice.call(__args52, 1)), seq(moveChild("right"), seqa(actions), up))));
addCheck("ConditionalExpression", seq(((__args53 = ["test", checkTop]), (actions = [].slice.call(__args53, 1)), seq(
    moveChild("test"), seqa(actions), up)), ((__args54 = ["consequent", checkTop]), (actions = [].slice.call(
    __args54, 1)), seq(moveChild("consequent"), seqa(actions), up)), ((__args55 = ["alternate", checkTop]), (
    actions = [].slice.call(__args55, 1)), seq(moveChild("alternate"), seqa(actions), up))));
addCheck(["CallExpression", "NewExpression"], seq(((__args56 = ["callee", checkTop]), (actions = [].slice.call(__args56,
    1)), seq(moveChild("callee"), seqa(actions), up)), ((__args57 = ["args", checkTop]), (actions = [].slice.call(
    __args57, 1)), seq(moveChild("args"), seqa(actions), up))));
addCheck("MemberExpression", seq(((__args58 = ["object", checkTop]), (actions = [].slice.call(__args58, 1)), seq(
    moveChild("object"), seqa(actions), up)), ((__args59 = ["property", checkTop]), (actions = [].slice.call(
    __args59, 1)), (consequent3 = seq(moveChild("property"), seqa(actions), up)), inspect((function(node) {
    return (node.computed ? consequent3 : (undefined || pass));
})))));
addCheck("ArrayExpression", ((__args60 = ["elements", checkTop]), (actions = [].slice.call(__args60, 1)), seq(moveChild(
    "elements"), seqa(actions), up)));
addCheck("ObjectExpression", ((__args61 = ["properties", checkTop]), (actions = [].slice.call(__args61, 1)), seq(
    moveChild("properties"), seqa(actions), up)));
addCheck("LetExpression", ((body14 = [((__args62 = ["bindings", checkTop]), (actions = [].slice.call(__args62, 1)), seq(
    moveChild("bindings"), seqa(actions), up)), ((__args63 = ["body", checkTop]), (actions = [].slice.call(
    __args63, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body14), pop)));
addCheck("CurryExpression", seq(((__args64 = ["base", checkTop]), (actions = [].slice.call(__args64, 1)), seq(moveChild(
    "base"), seqa(actions), up)), ((__args65 = ["args", checkTop]), (actions = [].slice.call(__args65, 1)), seq(
    moveChild("args"), seqa(actions), up))));
addCheck("EllipsisPattern", ((__args66 = ["id", checkTop]), (actions = [].slice.call(__args66, 1)), seq(moveChild("id"),
    seqa(actions), up)));
addCheck(["SliceUnpack", "RelativeUnpack", "ImportPattern"], ((__args67 = ["pattern", checkTop]), (actions = [].slice.call(
    __args67, 1)), seq(moveChild("pattern"), seqa(actions), up)));
addCheck("IdentifierPattern", seq(inspect((function(node) {
    var loc = node["loc"],
        id = node["id"];
    return (reserved(node) ? addImmutableBinding(id.name, loc) : addImmutableBindingChecked(id.name,
        loc));
})), ((__args68 = ["id", checkTop]), (actions = [].slice.call(__args68, 1)), seq(moveChild("id"), seqa(actions),
    up))));
addCheck("AsPattern", seq(((__args69 = ["id", checkTop]), (actions = [].slice.call(__args69, 1)), seq(moveChild("id"),
    seqa(actions), up)), inspect((function(node) {
    return child("target", modifyNode((function(target) {
        return setData(target, "id", node.id);
    })), checkTop);
}))));
addCheck("ObjectPattern", ((__args70 = ["elements", checkTop]), (actions = [].slice.call(__args70, 1)), seq(moveChild(
    "elements"), seqa(actions), up)));
addCheck("ObjectPatternElement", seq(((__args71 = ["target", checkTop]), (actions = [].slice.call(__args71, 1)), seq(
    moveChild("target"), seqa(actions), up)), ((__args72 = ["key", checkTop]), (actions = [].slice.call(
    __args72, 1)), seq(moveChild("key"), seqa(actions), up))));
addCheck("ArgumentsPattern", seq(((__args73 = ["id", checkTop]), (actions = [].slice.call(__args73, 1)), seq(moveChild(
    "id"), seqa(actions), up)), ((__args74 = ["elements", checkTop]), (actions = [].slice.call(__args74, 1)),
    seq(moveChild("elements"), seqa(actions), up)), ((__args75 = ["self", checkTop]), (actions = [].slice.call(
    __args75, 1)), seq(moveChild("self"), seqa(actions), up))));
addCheck("ObjectValue", ((__args76 = ["value", checkTop]), (actions = [].slice.call(__args76, 1)), seq(moveChild(
    "value"), seqa(actions), up)));
addCheck("Identifier", inspect((function(node) {
    var loc = node["loc"],
        name = node["name"];
    return seq(examineScope((function(s) {
        return setNode(setData(node, "uid", s.getUid(name)));
    })), checkHasBinding(name, loc));
})));
(_check = (function(node) {
    if (Array.isArray(node)) {
        if ((!node.length)) return pass;
        return seq(down, seqa(node.map((function(_, i) {
            return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node instanceof ast_node.Node) && checks[node.type])) return checks[node.type];
    return pass;
}));
var addBindings = foldl.bind(null, scope.addImmutableBinding, Scope.empty);
(check = (function(ast, globals, seed) {
    return run(seq(checkTop, root, extractCtx.chain((function(x5) {
        return unique((function(unique0) {
            return extractScope.map((function(s) {
                return ({
                    "tree": x5,
                    "data": ({
                        "unique": unique0
                    })
                });
            }));
        }));
    }))), addBindings((globals || [])), ast, Error.of, Error.fail, seed);
}));
(exports["check"] = check);