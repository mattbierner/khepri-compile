/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical/lexical.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("akh")["base"],
    StateT = require("akh")["trans"]["statei"],
    Error = require("akh")["error"],
    ErrorT = require("akh")["trans"]["error"],
    Unique = require("akh")["unique"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o0 = require("../ast"),
    __o1 = require("../fun"),
    scope = require("./scope"),
    ScopeT = require("./scopet"),
    check, next = __o["next"],
    seq = __o["sequence"],
    seqa = __o["sequencea"],
    type = __o0["type"],
    isIdentifier = __o0["isIdentifier"],
    getUd = __o0["getUd"],
    setUd = __o0["setUd"],
    setUid = __o0["setUid"],
    foldl = __o1["foldl"],
    Scope = scope["Scope"],
    x, y, x0, y0, x1, y1, x2, y2, visit, __args, actions, body, __args0, actions0, __args1, actions1, __args2, actions2,
        __args4, actions3, __args6, actions4, __args5, actions5, consequent, __args7, actions6, alternate, __args3,
        actions7, body0, __args8, actions8, __args9, actions9, __args10, actions10, __args11, actions11, __args12,
        actions12, bind, consequent0, alternate0, __args13, actions13, __args14, actions14, __args15, actions15,
        __args16, actions16, consequent1, alternate1, __args17, actions17, body1, __args18, actions18, __args19,
        actions19, __args20, actions20, body2, __args21, actions21, body3, __args22, actions22, __args24, actions23,
        __args23, actions24, body4, __args25, actions25, __args26, actions26, body5, __args27, actions27, __args28,
        actions28, __args29, actions29, __args30, actions30, __args31, actions31, body6, __args32, actions32, body7,
        __args33, actions33, __args35, actions34, __args34, actions35, body8, __args36, actions36, __args37, actions37,
        body9, __args38, actions38, body10, __args39, actions39, __args40, actions40, __args41, actions41, __args42,
        actions42, __args43, actions43, body12, body11, __args44, actions44, consequent2, body13, __args45, actions45,
        __args46, actions46, __args47, actions47, __args48, actions48, __args49, actions49, __args50, actions50,
        __args51, actions51, __args52, actions52, __args53, actions53, __args54, actions54, __args55, actions55,
        __args56, actions56, __args57, actions57, __args58, actions58, consequent3, __args59, actions59, __args60,
        actions60, __args61, actions61, __args62, actions62, body14, __args63, actions63, __args64, actions64, __args65,
        actions65, __args66, actions66, __args67, actions67, __args68, actions68, __args69, actions69, __args70,
        actions70, __args71, actions71, __args72, actions72, __args73, actions73, __args74, actions74, __args75,
        actions75, __args76, actions76, _check, reserved = getUd.bind(null, "reserved"),
    M = ErrorT(TreeZipperT(ScopeT(Unique))),
    run = (function(p, s, ctx, ok, err) {
        var y, y0;
        return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(ErrorT.runErrorT(p, ((y = M.inner.of), (
            function(z) {
                return y(ok(z));
            })), ((y0 = M.inner.of), (function(z) {
            return y0(err(z));
        }))), ctx), s), 1000);
    }),
    pass = M.of(null),
    error = M.fail,
    lift = M.lift,
    unique = M.chain.bind(null, M.liftInner.liftInner(Unique.unique)),
    extractScope = M.liftInner(M.inner.inner.extractScope),
    examineScope = M.chain.bind(null, extractScope),
    modifyScope = ((x = M.liftInner), (y = M.inner.inner.modify), (function(z) {
        return x(y(z));
    })),
    push = M.liftInner(M.inner.inner.push),
    pop = M.liftInner(M.inner.inner.pop),
    getClosure = M.chain.bind(null, extractScope.map(scope.getClosure)),
    extractCtx = lift(M.inner.get),
    extract = lift(M.inner.node),
    inspect = M.chain.bind(null, extract),
    up = lift(M.inner.up),
    down = lift(M.inner.down),
    right = lift(M.inner.right),
    root = lift(M.inner.root),
    moveChild = ((x0 = lift), (y0 = M.inner.child), (function(z) {
        return x0(y0(z));
    })),
    modifyNode = ((x1 = lift), (y1 = M.inner.modifyNode), (function(z) {
        return x1(y1(z));
    })),
    setNode = ((x2 = lift), (y2 = M.inner.setNode), (function(z) {
        return x2(y2(z));
    })),
    checkTop = inspect((function(x3) {
        return _check(x3);
    })),
    checkArray = ((visit = (function(_, i, arr) {
        return ((i === (arr.length - 1)) ? checkTop : next(checkTop, right));
    })), (function(arr) {
        return (arr.length ? seq(down, seqa(arr.map(visit)), up) : pass);
    })),
    when = (function(test, consequent, alternate) {
        return inspect((function(node) {
            return (test(node) ? consequent : (alternate || pass));
        }));
    }),
    addUid = (function(id) {
        return unique((function(uid) {
            return modifyScope(scope.addUid.bind(null, id, uid));
        }));
    }),
    checkHasBinding = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasBinding(id) ? pass : error(((("Undeclared symbol:'" + id) + "' at:") + (loc && loc
                .start))));
        }));
    }),
    checkCanAddBinding = (function(id, loc) {
        return examineScope((function(s) {
            var binding, loc0;
            return (s.hasOwnBinding(id) ? ((binding = s.getBinding(id)), error(((((("'" + id) + "' at:") +
                (loc && loc.start)) + " already bound for scope from:") + ((loc0 = binding.loc), (
                loc0 && loc0.start))))) : pass);
        }));
    }),
    checkCanAssign = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasMutableBinding(id) ? pass : error(((("Assign to immutable variable:'" + id) +
                "' at:") + (loc && loc.start))));
        }));
    }),
    markBindingImmutable = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasOwnBinding(id) ? modifyScope((function(s0) {
                return scope.setBindingMutability(s0, id, false);
            })) : error((((("Cannot mark variable:'" + id) + "' at:") + (loc && loc.start)) +
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
addCheck("PackageExports", ((__args0 = ["exports", checkTop]), (actions0 = [].slice.call(__args0, 1)), seq(moveChild(
    "exports"), seqa(actions0), up)));
addCheck("PackageExport", seq(inspect((function(__o2) {
    var id = __o2["id"];
    return addMutableBindingChecked(id.name, id.loc);
})), ((__args1 = ["id", checkTop]), (actions1 = [].slice.call(__args1, 1)), seq(moveChild("id"), seqa(actions1),
    up))));
addCheck("Package", ((body0 = [((__args2 = ["exports", checkTop]), (actions2 = [].slice.call(__args2, 1)), seq(
    moveChild("exports"), seqa(actions2), up)), ((__args3 = ["body", ((consequent = seq(((__args4 = [
    "bindings", checkTop
]), (actions3 = [].slice.call(__args4, 1)), seq(moveChild("bindings"), seqa(
    actions3), up)), ((__args5 = ["body", ((__args6 = ["body", checkTop]), (
    actions4 = [].slice.call(__args6, 1)), seq(moveChild("body"),
    seqa(actions4), up))]), (actions5 = [].slice.call(__args5, 1)), seq(
    moveChild("body"), seqa(actions5), up)))), (__args7 = ["body", checkTop]), (
    actions6 = [].slice.call(__args7, 1)), (alternate = seq(moveChild("body"), seqa(
    actions6), up)), inspect((function(node) {
    var y3;
    return (((y3 = type(node)), ("WithStatement" === y3)) ? consequent : (
        alternate || pass));
})))]), (actions7 = [].slice.call(__args3, 1)), seq(moveChild("body"), seqa(actions7), up))]), seq(push, seqa(
    body0), pop)));
addCheck(["StaticDeclaration", "VariableDeclaration"], ((__args8 = ["declarations", checkTop]), (actions8 = [].slice.call(
    __args8, 1)), seq(moveChild("declarations"), seqa(actions8), up)));
addCheck("StaticDeclarator", inspect((function(__o2) {
    var id = __o2["id"];
    return addStaticBindingChecked(id.name, id.loc);
})));
addCheck("VariableDeclarator", ((bind = (function(node) {
    return (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
        addMutableBindingChecked(node.id.name, node.loc));
})), (consequent0 = seq(inspect(bind), ((__args9 = ["id", checkTop]), (actions9 = [].slice.call(__args9, 1)),
    seq(moveChild("id"), seqa(actions9), up)), ((__args10 = ["init", checkTop]), (actions10 = [].slice.call(
    __args10, 1)), seq(moveChild("init"), seqa(actions10), up)))), (alternate0 = seq(((__args11 = ["init",
    checkTop
]), (actions11 = [].slice.call(__args11, 1)), seq(moveChild("init"), seqa(actions11), up)), inspect(
    bind), ((__args12 = ["id", checkTop]), (actions12 = [].slice.call(__args12, 1)), seq(moveChild("id"),
    seqa(actions12), up)))), inspect((function(node) {
    return (node.recursive ? consequent0 : (alternate0 || pass));
}))));
addCheck("Binding", ((consequent1 = seq(((__args13 = ["pattern", checkTop]), (actions13 = [].slice.call(__args13, 1)),
    seq(moveChild("pattern"), seqa(actions13), up)), ((__args14 = ["value", checkTop]), (actions14 = []
    .slice.call(__args14, 1)), seq(moveChild("value"), seqa(actions14), up)))), (alternate1 = seq(((__args15 = [
    "value", checkTop
]), (actions15 = [].slice.call(__args15, 1)), seq(moveChild("value"), seqa(actions15), up)), ((__args16 = [
    "pattern", checkTop
]), (actions16 = [].slice.call(__args16, 1)), seq(moveChild("pattern"), seqa(actions16), up)))), inspect((
    function(node) {
        return (node.recursive ? consequent1 : (alternate1 || pass));
    }))));
addCheck("BlockStatement", ((body1 = [((__args17 = ["body", checkTop]), (actions17 = [].slice.call(__args17, 1)), seq(
    moveChild("body"), seqa(actions17), up))]), seq(push, seqa(body1), pop)));
addCheck("ExpressionStatement", ((__args18 = ["expression", checkTop]), (actions18 = [].slice.call(__args18, 1)), seq(
    moveChild("expression"), seqa(actions18), up)));
addCheck("IfStatement", seq(((__args19 = ["test", checkTop]), (actions19 = [].slice.call(__args19, 1)), seq(moveChild(
    "test"), seqa(actions19), up)), ((body2 = [((__args20 = ["consequent", checkTop]), (actions20 = [].slice.call(
    __args20, 1)), seq(moveChild("consequent"), seqa(actions20), up))]), seq(push, seqa(body2), pop)), ((body3 = [
    ((__args21 = ["alternate", checkTop]), (actions21 = [].slice.call(__args21, 1)), seq(moveChild(
        "alternate"), seqa(actions21), up))
]), seq(push, seqa(body3), pop))));
addCheck("WithStatement", ((body4 = [((__args22 = ["bindings", checkTop]), (actions22 = [].slice.call(__args22, 1)),
    seq(moveChild("bindings"), seqa(actions22), up)), ((__args23 = ["body", ((__args24 = ["body",
    checkTop
]), (actions23 = [].slice.call(__args24, 1)), seq(moveChild("body"), seqa(actions23),
    up))]), (actions24 = [].slice.call(__args23, 1)), seq(moveChild("body"), seqa(actions24), up))]), seq(push,
    seqa(body4), pop)));
addCheck("SwitchStatement", ((body5 = [((__args25 = ["discriminant", checkTop]), (actions25 = [].slice.call(__args25, 1)),
    seq(moveChild("discriminant"), seqa(actions25), up)), ((__args26 = ["cases", checkTop]), (actions26 = []
    .slice.call(__args26, 1)), seq(moveChild("cases"), seqa(actions26), up))]), seq(push, seqa(body5), pop)));
addCheck("SwitchCase", seq(((__args27 = ["test", checkTop]), (actions27 = [].slice.call(__args27, 1)), seq(moveChild(
    "test"), seqa(actions27), up)), ((__args28 = ["consequent", checkTop]), (actions28 = [].slice.call(__args28,
    1)), seq(moveChild("consequent"), seqa(actions28), up))));
addCheck(["ReturnStatement", "ThrowStatement"], ((__args29 = ["argument", checkTop]), (actions29 = [].slice.call(
    __args29, 1)), seq(moveChild("argument"), seqa(actions29), up)));
addCheck("TryStatement", seq(((__args30 = ["block", checkTop]), (actions30 = [].slice.call(__args30, 1)), seq(moveChild(
    "block"), seqa(actions30), up)), ((body6 = [((__args31 = ["handler", checkTop]), (actions31 = [].slice.call(
    __args31, 1)), seq(moveChild("handler"), seqa(actions31), up))]), seq(push, seqa(body6), pop)), ((body7 = [
    ((__args32 = ["finalizer", checkTop]), (actions32 = [].slice.call(__args32, 1)), seq(moveChild(
        "finalizer"), seqa(actions32), up))
]), seq(push, seqa(body7), pop))));
addCheck("CatchClause", ((body8 = [inspect((function(__o2) {
    var param = __o2["param"];
    return addImmutableBindingChecked(param.name, param.loc);
})), ((__args33 = ["param", checkTop]), (actions33 = [].slice.call(__args33, 1)), seq(moveChild("param"),
    seqa(actions33), up)), ((__args34 = ["body", ((__args35 = ["body", checkTop]), (actions34 = [].slice
    .call(__args35, 1)), seq(moveChild("body"), seqa(actions34), up))]), (actions35 = [].slice.call(
    __args34, 1)), seq(moveChild("body"), seqa(actions35), up))]), seq(push, seqa(body8), pop)));
addCheck("WhileStatement", seq(((__args36 = ["test", checkTop]), (actions36 = [].slice.call(__args36, 1)), seq(
    moveChild("test"), seqa(actions36), up)), ((body9 = [((__args37 = ["body", checkTop]), (actions37 = [].slice
    .call(__args37, 1)), seq(moveChild("body"), seqa(actions37), up))]), seq(push, seqa(body9), pop))));
addCheck("DoWhileStatement", seq(((body10 = [((__args38 = ["body", checkTop]), (actions38 = [].slice.call(__args38, 1)),
    seq(moveChild("body"), seqa(actions38), up))]), seq(push, seqa(body10), pop)), ((__args39 = ["test",
    checkTop
]), (actions39 = [].slice.call(__args39, 1)), seq(moveChild("test"), seqa(actions39), up))));
addCheck("ForStatement", ((body11 = [((__args40 = ["init", checkTop]), (actions40 = [].slice.call(__args40, 1)), seq(
    moveChild("init"), seqa(actions40), up)), ((__args41 = ["test", checkTop]), (actions41 = [].slice.call(
    __args41, 1)), seq(moveChild("test"), seqa(actions41), up)), ((__args42 = ["update", checkTop]), (
    actions42 = [].slice.call(__args42, 1)), seq(moveChild("update"), seqa(actions42), up)), ((body12 = [
    ((__args43 = ["body", checkTop]), (actions43 = [].slice.call(__args43, 1)), seq(moveChild(
        "body"), seqa(actions43), up))
]), seq(push, seqa(body12), pop))]), seq(push, seqa(body11), pop)));
addCheck("FunctionExpression", ((body13 = [((consequent2 = seq(inspect((function(__o2) {
    var id = __o2["id"];
    return addImmutableBinding(id.name, id.loc);
})), ((__args44 = ["id", checkTop]), (actions44 = [].slice.call(__args44, 1)), seq(
    moveChild("id"), seqa(actions44), up)))), inspect((function(node) {
    return (node.id ? consequent2 : (undefined || pass));
}))), getClosure((function(closure) {
    var __args45, actions45, __args47, actions46, __args46, actions47;
    return seq(((__args45 = ["params", checkTop]), (actions45 = [].slice.call(__args45, 1)),
        seq(moveChild("params"), seqa(actions45), up)), ((__args46 = ["body", when((
            function(z) {
                var y3 = type(z);
                return ("BlockStatement" === y3);
            }), ((__args47 = ["body", checkTop]), (actions46 = [].slice.call(
            __args47, 1)), seq(moveChild("body"), seqa(actions46), up)),
        checkTop)]), (actions47 = [].slice.call(__args46, 1)), seq(moveChild("body"),
        seqa(actions47), up)), getClosure((function(locals) {
        return modifyNode((function(node) {
            return setUd("locals", locals.filter((function(x3) {
                return (closure.indexOf(x3) < 0);
            })), node);
        }));
    })));
}))]), seq(push, seqa(body13), pop)));
addCheck("UnaryExpression", seq(((__args45 = ["operator", checkTop]), (actions45 = [].slice.call(__args45, 1)), seq(
    moveChild("operator"), seqa(actions45), up)), ((__args46 = ["argument", checkTop]), (actions46 = [].slice.call(
    __args46, 1)), seq(moveChild("argument"), seqa(actions46), up))));
addCheck("AssignmentExpression", seq(((__args47 = ["left", checkTop]), (actions47 = [].slice.call(__args47, 1)), seq(
    moveChild("left"), seqa(actions47), up)), inspect((function(__o2) {
    var operator = __o2["operator"],
        left = __o2["left"];
    return (isIdentifier(left) ? seq(checkCanAssign(left.name, left.loc), ((operator === ":=") ?
        markBindingImmutable(left.name, left.loc) : pass)) : pass);
})), ((__args48 = ["right", checkTop]), (actions48 = [].slice.call(__args48, 1)), seq(moveChild("right"), seqa(
    actions48), up))));
addCheck("BinaryExpression", seq(((__args49 = ["operator", checkTop]), (actions49 = [].slice.call(__args49, 1)), seq(
    moveChild("operator"), seqa(actions49), up)), ((__args50 = ["left", checkTop]), (actions50 = [].slice.call(
    __args50, 1)), seq(moveChild("left"), seqa(actions50), up)), ((__args51 = ["right", checkTop]), (actions51 = []
    .slice.call(__args51, 1)), seq(moveChild("right"), seqa(actions51), up))));
addCheck("ConditionalExpression", seq(((__args52 = ["test", checkTop]), (actions52 = [].slice.call(__args52, 1)), seq(
    moveChild("test"), seqa(actions52), up)), ((__args53 = ["consequent", checkTop]), (actions53 = [].slice.call(
    __args53, 1)), seq(moveChild("consequent"), seqa(actions53), up)), ((__args54 = ["alternate", checkTop]), (
    actions54 = [].slice.call(__args54, 1)), seq(moveChild("alternate"), seqa(actions54), up))));
addCheck(["CallExpression", "NewExpression"], seq(((__args55 = ["callee", checkTop]), (actions55 = [].slice.call(
    __args55, 1)), seq(moveChild("callee"), seqa(actions55), up)), ((__args56 = ["args", checkTop]), (actions56 = []
    .slice.call(__args56, 1)), seq(moveChild("args"), seqa(actions56), up))));
addCheck("MemberExpression", seq(((__args57 = ["object", checkTop]), (actions57 = [].slice.call(__args57, 1)), seq(
    moveChild("object"), seqa(actions57), up)), ((__args58 = ["property", checkTop]), (actions58 = [].slice.call(
    __args58, 1)), (consequent3 = seq(moveChild("property"), seqa(actions58), up)), inspect((function(node) {
    return (node.computed ? consequent3 : (undefined || pass));
})))));
addCheck("ArrayExpression", ((__args59 = ["elements", checkTop]), (actions59 = [].slice.call(__args59, 1)), seq(
    moveChild("elements"), seqa(actions59), up)));
addCheck("ObjectExpression", ((__args60 = ["properties", checkTop]), (actions60 = [].slice.call(__args60, 1)), seq(
    moveChild("properties"), seqa(actions60), up)));
addCheck("LetExpression", ((body14 = [((__args61 = ["bindings", checkTop]), (actions61 = [].slice.call(__args61, 1)),
    seq(moveChild("bindings"), seqa(actions61), up)), ((__args62 = ["body", checkTop]), (actions62 = []
    .slice.call(__args62, 1)), seq(moveChild("body"), seqa(actions62), up))]), seq(push, seqa(body14), pop)));
addCheck("CurryExpression", seq(((__args63 = ["base", checkTop]), (actions63 = [].slice.call(__args63, 1)), seq(
    moveChild("base"), seqa(actions63), up)), ((__args64 = ["args", checkTop]), (actions64 = [].slice.call(
    __args64, 1)), seq(moveChild("args"), seqa(actions64), up))));
addCheck("OperatorExpression", ((__args65 = ["operator", checkTop]), (actions65 = [].slice.call(__args65, 1)), seq(
    moveChild("operator"), seqa(actions65), up)));
addCheck("EllipsisPattern", ((__args66 = ["id", checkTop]), (actions66 = [].slice.call(__args66, 1)), seq(moveChild(
    "id"), seqa(actions66), up)));
addCheck(["SliceUnpack", "RelativeUnpack", "ImportPattern"], ((__args67 = ["pattern", checkTop]), (actions67 = [].slice
    .call(__args67, 1)), seq(moveChild("pattern"), seqa(actions67), up)));
addCheck("IdentifierPattern", seq(inspect((function(node) {
    var loc = node["loc"],
        id = node["id"];
    return (reserved(node) ? addImmutableBinding(id.name, loc) : addImmutableBindingChecked(id.name,
        loc));
})), ((__args68 = ["id", checkTop]), (actions68 = [].slice.call(__args68, 1)), seq(moveChild("id"), seqa(
    actions68), up))));
addCheck("AsPattern", seq(((__args69 = ["id", checkTop]), (actions69 = [].slice.call(__args69, 1)), seq(moveChild("id"),
    seqa(actions69), up)), inspect((function(node) {
    var __args70 = ["target", modifyNode((function(target) {
        return setUd("id", node.id, target);
    })), checkTop],
        actions70 = [].slice.call(__args70, 1);
    return seq(moveChild("target"), seqa(actions70), up);
}))));
addCheck("ObjectPattern", ((__args70 = ["elements", checkTop]), (actions70 = [].slice.call(__args70, 1)), seq(moveChild(
    "elements"), seqa(actions70), up)));
addCheck("ObjectPatternElement", seq(((__args71 = ["target", checkTop]), (actions71 = [].slice.call(__args71, 1)), seq(
    moveChild("target"), seqa(actions71), up)), ((__args72 = ["key", checkTop]), (actions72 = [].slice.call(
    __args72, 1)), seq(moveChild("key"), seqa(actions72), up))));
addCheck("ArgumentsPattern", seq(((__args73 = ["id", checkTop]), (actions73 = [].slice.call(__args73, 1)), seq(
    moveChild("id"), seqa(actions73), up)), ((__args74 = ["elements", checkTop]), (actions74 = [].slice.call(
    __args74, 1)), seq(moveChild("elements"), seqa(actions74), up)), ((__args75 = ["self", checkTop]), (
    actions75 = [].slice.call(__args75, 1)), seq(moveChild("self"), seqa(actions75), up))));
addCheck("ObjectValue", ((__args76 = ["value", checkTop]), (actions76 = [].slice.call(__args76, 1)), seq(moveChild(
    "value"), seqa(actions76), up)));
addCheck(["Identifier", "BinaryOperator"], inspect((function(node) {
    var loc = node["loc"],
        name = node["name"];
    return seq(checkHasBinding(name, loc), examineScope((function(s) {
        return setNode(setUid(s.getUid(name), node));
    })));
})));
addCheck(["UnaryOperator"], inspect((function(node) {
    var loc = node["loc"],
        name = node["name"];
    return seq(((name[0] === ".") ? pass : checkHasBinding(name, loc)), examineScope((function(s) {
        return setNode(setUid(s.getUid(name), node));
    })));
})));
(_check = (function(node) {
    return (Array.isArray(node) ? checkArray(node) : (checks[type(node)] || pass));
}));
var initialScope = foldl(scope.addImmutableBinding, Scope.empty, ["*", "/", "+", "-", "%", "<<", ">>", ">>>", "<", ">",
    "<=", ">=", "==", "!=", "===", "!==", "&", "^", "|", "||", "&&", "|>", "\\>", "\\>>", "<|", "<\\", "<<\\", "!",
    "++", "--", "~", ".", "@"
]),
    addBindings = foldl.bind(null, scope.addImmutableBinding, initialScope),
    rewrite = seq(checkTop, root, extractCtx.chain((function(x3) {
        return unique((function(unique0) {
            return extractScope.map((function(s) {
                return ({
                    tree: x3,
                    data: ({
                        unique: unique0
                    })
                });
            }));
        }));
    })));
(check = (function(ast, globals) {
    return run(rewrite, addBindings((globals || [])), ast, Error.of, Error.fail);
}));
(exports["check"] = check);