/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/lexical.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("akh")["base"],
    StateT = require("akh")["trans"]["statei"],
    Error = require("akh")["error"],
    ErrorT = require("akh")["trans"]["error"],
    Unique = require("akh")["unique"],
    ast_expression = require("khepri-ast")["expression"],
    __o0 = require("khepri-ast")["node"],
    ast_value = require("khepri-ast")["value"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o1 = require("../ast"),
    __o2 = require("../fun"),
    __o3 = require("../user_operator"),
    scope = require("./scope"),
    ScopeT = require("./scopet"),
    check, next = __o["next"],
    seq = __o["sequence"],
    seqa = __o["sequencea"],
    modifyAstNode = __o0["modify"],
    type = __o1["type"],
    isSymbol = __o1["isSymbol"],
    getUd = __o1["getUd"],
    setUd = __o1["setUd"],
    setUid = __o1["setUid"],
    setLocals = __o1["setLocals"],
    flip = __o2["flip"],
    foldl = __o2["foldl"],
    splitOp = __o3["splitOp"],
    Scope = scope["Scope"],
    x, y, x0, y0, x1, y1, x2, y2, visit, __args, actions, __args1, actions0, __args0, actions1, checkWith, __args2,
        actions2, checkBlock, __args3, actions3, body, __args4, actions4, __args5, actions5, __args6, actions6, __args8,
        actions7, __args7, actions8, body0, __args9, actions9, __args10, actions10, __args11, actions11, __args12,
        actions12, __args13, actions13, bind, consequent, alternate, __args14, actions14, __args15, actions15, __args16,
        actions16, __args17, actions17, consequent0, alternate0, __args18, actions18, body1, __args19, actions19,
        __args20, actions20, __args21, actions21, body2, __args22, actions22, body3, __args23, actions23, __args25,
        actions24, __args24, actions25, body4, __args26, actions26, __args27, actions27, body5, __args28, actions28,
        __args29, actions29, __args30, actions30, __args31, actions31, __args32, actions32, body6, __args33, actions33,
        body7, __args34, actions34, __args36, actions35, __args35, actions36, body8, __args37, actions37, __args38,
        actions38, body9, __args39, actions39, body10, __args40, actions40, __args41, actions41, __args42, actions42,
        __args43, actions43, __args44, actions44, body12, body11, __args45, actions45, consequent1, body13, __args46,
        actions46, __args47, actions47, consequent2, __args48, actions48, __args49, actions49, __args50, actions50,
        __args51, actions51, __args52, actions52, __args53, actions53, __args54, actions54, __args55, actions55,
        __args56, actions56, __args57, actions57, __args58, actions58, consequent3, __args59, actions59, __args60,
        actions60, consequent4, __args61, actions61, __args62, actions62, __args63, actions63, __args64, actions64,
        body14, __args65, actions65, __args66, actions66, __args67, actions67, __args68, actions68, __args69, actions69,
        __args70, actions70, __args71, actions71, __args72, actions72, __args73, actions73, __args74, actions74,
        __args75, actions75, __args76, actions76, __args77, actions77, __args78, actions78, _check, reserved = getUd.bind(
            null, "reserved"),
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
    getClosure = M.chain.bind(null, M.liftInner(M.inner.inner.getClosure)),
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
    addUid = (function(id) {
        return unique((function(uid) {
            return modifyScope(scope.addUid.bind(null, id, uid));
        }));
    }),
    checkHasBinding = (function(id, loc) {
        return examineScope((function(s) {
            return (scope.hasBinding(id, s) ? pass : error(((("Undeclared symbol:'" + id) + "' at:") + (loc &&
                loc.start))));
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
            return (scope.hasMutableBinding(id, s) ? pass : error(((("Assign to immutable symbol:'" + id) +
                "' at:") + (loc && loc.start))));
        }));
    }),
    markBindingImmutable = (function(id, loc) {
        return examineScope((function(s) {
            return (s.hasOwnBinding(id) ? modifyScope(scope.setBindingMutability.bind(null, id, false)) :
                error((((("Cannot mark symbol:'" + id) + "' at:") + (loc && loc.start)) +
                    " immutable in enclosed scope")));
        }));
    }),
    addMutableBinding = (function(id, loc) {
        return seq(modifyScope(scope.addMutableBinding.bind(null, id, loc)), addUid(id));
    }),
    addStaticBinding = (function(id, loc) {
        return modifyScope(scope.addImmutableBinding.bind(null, id, loc));
    }),
    addImmutableBinding = (function(id, loc) {
        return seq(modifyScope(scope.addImmutableBinding.bind(null, id, loc)), addUid(id));
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
    splitUnary = (function(name) {
        return extractScope.map((function(s) {
            return splitOp(name, scope.getOperators(s))
                .map((function(c) {
                    return setUid(c[1], ast_value.UnaryOperator.create(null, c[0]));
                }));
        }));
    }),
    addOperator = (function(name, uid) {
        return modifyScope(scope.addOperator.bind(null, name, uid));
    }),
    checkBlockSameScope = ((checkWith = seq(((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)),
        seq(moveChild("bindings"), seqa(actions), up)), ((__args0 = ["body", ((__args1 = ["body", checkTop]), (
        actions0 = [].slice.call(__args1, 1)), seq(moveChild("body"), seqa(actions0), up))]), (actions1 = []
        .slice.call(__args0, 1)), seq(moveChild("body"), seqa(actions1), up)))), (__args2 = ["body", checkTop]), (
        actions2 = [].slice.call(__args2, 1)), (checkBlock = seq(moveChild("body"), seqa(actions2), up)), (function(
        alt) {
        return inspect((function(node) {
            return ((type(node) === "WithStatement") ? checkWith : ((type(node) === "BlockStatement") ?
                checkBlock : alt));
        }));
    })),
    checks = ({}),
    addCheck = (function(type0, check) {
        if (Array.isArray(type0)) type0.forEach((function(x3) {
            return addCheck(x3, check);
        }));
        else {
            (checks[type0] = check);
        }
    });
addCheck("Program", ((body = [((__args3 = ["body", checkTop]), (actions3 = [].slice.call(__args3, 1)), seq(moveChild(
    "body"), seqa(actions3), up))]), seq(push, seqa(body), pop)));
addCheck("PackageExports", ((__args4 = ["exports", checkTop]), (actions4 = [].slice.call(__args4, 1)), seq(moveChild(
    "exports"), seqa(actions4), up)));
addCheck("PackageExport", seq(inspect((function(__o4) {
    var id = __o4["id"];
    return addMutableBindingChecked(id.name, id.loc);
})), ((__args5 = ["id", checkTop]), (actions5 = [].slice.call(__args5, 1)), seq(moveChild("id"), seqa(actions5),
    up))));
addCheck("Package", ((body0 = [((__args6 = ["exports", checkTop]), (actions6 = [].slice.call(__args6, 1)), seq(
    moveChild("exports"), seqa(actions6), up)), ((__args7 = ["body", checkBlockSameScope(((__args8 = [
    "body", checkTop
]), (actions7 = [].slice.call(__args8, 1)), seq(moveChild("body"), seqa(actions7),
    up)))]), (actions8 = [].slice.call(__args7, 1)), seq(moveChild("body"), seqa(actions8), up))]), seq(push,
    seqa(body0), pop)));
addCheck(["StaticDeclaration", "VariableDeclaration"], ((__args9 = ["declarations", checkTop]), (actions9 = [].slice.call(
    __args9, 1)), seq(moveChild("declarations"), seqa(actions9), up)));
addCheck("StaticDeclarator", inspect((function(__o4) {
    var id = __o4["id"];
    return addStaticBindingChecked(id.name, id.loc);
})));
addCheck("VariableDeclarator", ((bind = (function(node) {
    return (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
        addMutableBindingChecked(node.id.name, node.loc));
})), (consequent = seq(inspect(bind), ((__args10 = ["id", checkTop]), (actions10 = [].slice.call(__args10, 1)),
    seq(moveChild("id"), seqa(actions10), up)), ((__args11 = ["init", checkTop]), (actions11 = [].slice
    .call(__args11, 1)), seq(moveChild("init"), seqa(actions11), up)))), (alternate = seq(((__args12 = ["init",
    checkTop
]), (actions12 = [].slice.call(__args12, 1)), seq(moveChild("init"), seqa(actions12), up)), inspect(
    bind), ((__args13 = ["id", checkTop]), (actions13 = [].slice.call(__args13, 1)), seq(moveChild("id"),
    seqa(actions13), up)))), inspect((function(node) {
    return (node.recursive ? consequent : (alternate || pass));
}))));
addCheck("Binding", ((consequent0 = seq(((__args14 = ["pattern", checkTop]), (actions14 = [].slice.call(__args14, 1)),
    seq(moveChild("pattern"), seqa(actions14), up)), ((__args15 = ["value", checkTop]), (actions15 = []
    .slice.call(__args15, 1)), seq(moveChild("value"), seqa(actions15), up)))), (alternate0 = seq(((__args16 = [
    "value", checkTop
]), (actions16 = [].slice.call(__args16, 1)), seq(moveChild("value"), seqa(actions16), up)), ((__args17 = [
    "pattern", checkTop
]), (actions17 = [].slice.call(__args17, 1)), seq(moveChild("pattern"), seqa(actions17), up)))), inspect((
    function(node) {
        return (node.recursive ? consequent0 : (alternate0 || pass));
    }))));
addCheck("BlockStatement", ((body1 = [((__args18 = ["body", checkTop]), (actions18 = [].slice.call(__args18, 1)), seq(
    moveChild("body"), seqa(actions18), up))]), seq(push, seqa(body1), pop)));
addCheck("ExpressionStatement", ((__args19 = ["expression", checkTop]), (actions19 = [].slice.call(__args19, 1)), seq(
    moveChild("expression"), seqa(actions19), up)));
addCheck("IfStatement", seq(((__args20 = ["test", checkTop]), (actions20 = [].slice.call(__args20, 1)), seq(moveChild(
    "test"), seqa(actions20), up)), ((body2 = [((__args21 = ["consequent", checkTop]), (actions21 = [].slice.call(
    __args21, 1)), seq(moveChild("consequent"), seqa(actions21), up))]), seq(push, seqa(body2), pop)), ((body3 = [
    ((__args22 = ["alternate", checkTop]), (actions22 = [].slice.call(__args22, 1)), seq(moveChild(
        "alternate"), seqa(actions22), up))
]), seq(push, seqa(body3), pop))));
addCheck("WithStatement", ((body4 = [((__args23 = ["bindings", checkTop]), (actions23 = [].slice.call(__args23, 1)),
    seq(moveChild("bindings"), seqa(actions23), up)), ((__args24 = ["body", ((__args25 = ["body",
    checkTop
]), (actions24 = [].slice.call(__args25, 1)), seq(moveChild("body"), seqa(actions24),
    up))]), (actions25 = [].slice.call(__args24, 1)), seq(moveChild("body"), seqa(actions25), up))]), seq(push,
    seqa(body4), pop)));
addCheck("SwitchStatement", ((body5 = [((__args26 = ["discriminant", checkTop]), (actions26 = [].slice.call(__args26, 1)),
    seq(moveChild("discriminant"), seqa(actions26), up)), ((__args27 = ["cases", checkTop]), (actions27 = []
    .slice.call(__args27, 1)), seq(moveChild("cases"), seqa(actions27), up))]), seq(push, seqa(body5), pop)));
addCheck("SwitchCase", seq(((__args28 = ["test", checkTop]), (actions28 = [].slice.call(__args28, 1)), seq(moveChild(
    "test"), seqa(actions28), up)), ((__args29 = ["consequent", checkTop]), (actions29 = [].slice.call(__args29,
    1)), seq(moveChild("consequent"), seqa(actions29), up))));
addCheck(["ReturnStatement", "ThrowStatement"], ((__args30 = ["argument", checkTop]), (actions30 = [].slice.call(
    __args30, 1)), seq(moveChild("argument"), seqa(actions30), up)));
addCheck("TryStatement", seq(((__args31 = ["block", checkTop]), (actions31 = [].slice.call(__args31, 1)), seq(moveChild(
    "block"), seqa(actions31), up)), ((body6 = [((__args32 = ["handler", checkTop]), (actions32 = [].slice.call(
    __args32, 1)), seq(moveChild("handler"), seqa(actions32), up))]), seq(push, seqa(body6), pop)), ((body7 = [
    ((__args33 = ["finalizer", checkTop]), (actions33 = [].slice.call(__args33, 1)), seq(moveChild(
        "finalizer"), seqa(actions33), up))
]), seq(push, seqa(body7), pop))));
addCheck("CatchClause", ((body8 = [inspect((function(__o4) {
    var param = __o4["param"];
    return addImmutableBindingChecked(param.name, param.loc);
})), ((__args34 = ["param", checkTop]), (actions34 = [].slice.call(__args34, 1)), seq(moveChild("param"),
    seqa(actions34), up)), ((__args35 = ["body", ((__args36 = ["body", checkTop]), (actions35 = [].slice
    .call(__args36, 1)), seq(moveChild("body"), seqa(actions35), up))]), (actions36 = [].slice.call(
    __args35, 1)), seq(moveChild("body"), seqa(actions36), up))]), seq(push, seqa(body8), pop)));
addCheck("WhileStatement", seq(((__args37 = ["test", checkTop]), (actions37 = [].slice.call(__args37, 1)), seq(
    moveChild("test"), seqa(actions37), up)), ((body9 = [((__args38 = ["body", checkTop]), (actions38 = [].slice
    .call(__args38, 1)), seq(moveChild("body"), seqa(actions38), up))]), seq(push, seqa(body9), pop))));
addCheck("DoWhileStatement", seq(((body10 = [((__args39 = ["body", checkTop]), (actions39 = [].slice.call(__args39, 1)),
    seq(moveChild("body"), seqa(actions39), up))]), seq(push, seqa(body10), pop)), ((__args40 = ["test",
    checkTop
]), (actions40 = [].slice.call(__args40, 1)), seq(moveChild("test"), seqa(actions40), up))));
addCheck("ForStatement", ((body11 = [((__args41 = ["init", checkTop]), (actions41 = [].slice.call(__args41, 1)), seq(
    moveChild("init"), seqa(actions41), up)), ((__args42 = ["test", checkTop]), (actions42 = [].slice.call(
    __args42, 1)), seq(moveChild("test"), seqa(actions42), up)), ((__args43 = ["update", checkTop]), (
    actions43 = [].slice.call(__args43, 1)), seq(moveChild("update"), seqa(actions43), up)), ((body12 = [
    ((__args44 = ["body", checkTop]), (actions44 = [].slice.call(__args44, 1)), seq(moveChild(
        "body"), seqa(actions44), up))
]), seq(push, seqa(body12), pop))]), seq(push, seqa(body11), pop)));
addCheck("FunctionExpression", ((body13 = [((consequent1 = seq(inspect((function(__o4) {
    var id = __o4["id"];
    return addImmutableBinding(id.name, id.loc);
})), ((__args45 = ["id", checkTop]), (actions45 = [].slice.call(__args45, 1)), seq(
    moveChild("id"), seqa(actions45), up)))), inspect((function(node) {
    return (node.id ? consequent1 : (undefined || pass));
}))), getClosure((function(closure) {
    var __args46, actions46, __args47, actions47;
    return seq(((__args46 = ["params", checkTop]), (actions46 = [].slice.call(__args46, 1)),
        seq(moveChild("params"), seqa(actions46), up)), ((__args47 = ["body",
        checkBlockSameScope(checkTop)
    ]), (actions47 = [].slice.call(__args47, 1)), seq(moveChild("body"), seqa(actions47),
        up)), getClosure((function(locals) {
        return modifyNode((function(node) {
            return setLocals(node, locals.filter((function(x3) {
                return (closure.indexOf(x3) < 0);
            })));
        }));
    })));
}))]), seq(push, seqa(body13), pop)));
addCheck("UnaryExpression", seq(((__args46 = ["argument", checkTop]), (actions46 = [].slice.call(__args46, 1)), seq(
    moveChild("argument"), seqa(actions46), up)), inspect((function(__o4) {
    var loc = __o4["loc"],
        operator = __o4["operator"],
        argument = __o4["argument"];
    return splitUnary(operator.name)
        .chain((function(ops) {
            var __args47, actions47;
            return ((ops.length > 1) ? seq(setNode(ops.reduceRight((function(p, c) {
                return ast_expression.UnaryExpression.create(loc, c, p);
            }), argument)), checkTop) : ((__args47 = ["operator", checkTop]), (actions47 = []
                .slice.call(__args47, 1)), seq(moveChild("operator"), seqa(actions47),
                up)));
        }));
}))));
addCheck("AssignmentExpression", seq(((__args47 = ["left", checkTop]), (actions47 = [].slice.call(__args47, 1)), seq(
    moveChild("left"), seqa(actions47), up)), ((consequent2 = inspect((function(__o4) {
    var immutable = __o4["immutable"],
        left = __o4["left"],
        name = left["name"],
        loc = left["loc"];
    return seq(checkCanAssign(name, loc), (immutable ? markBindingImmutable(name, loc) : pass));
}))), inspect((function(node) {
    return (isSymbol(node.left) ? consequent2 : (undefined || pass));
}))), ((__args48 = ["right", checkTop]), (actions48 = [].slice.call(__args48, 1)), seq(moveChild("right"), seqa(
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
addCheck("CheckedMemberExpression", seq(((__args59 = ["object", checkTop]), (actions59 = [].slice.call(__args59, 1)),
    seq(moveChild("object"), seqa(actions59), up)), ((__args60 = ["property", checkTop]), (actions60 = [].slice
    .call(__args60, 1)), (consequent4 = seq(moveChild("property"), seqa(actions60), up)), inspect((function(
    node) {
    return (node.computed ? consequent4 : (undefined || pass));
}))), unique((function(uid) {
    return modifyNode((function(node) {
        return modifyAstNode(node, ({
            "id": setUid(uid, ast_value.Identifier.create(null, "__x"))
        }));
    }));
}))));
addCheck("ArrayExpression", ((__args61 = ["elements", checkTop]), (actions61 = [].slice.call(__args61, 1)), seq(
    moveChild("elements"), seqa(actions61), up)));
addCheck("ObjectExpression", ((__args62 = ["properties", checkTop]), (actions62 = [].slice.call(__args62, 1)), seq(
    moveChild("properties"), seqa(actions62), up)));
addCheck("LetExpression", ((body14 = [((__args63 = ["bindings", checkTop]), (actions63 = [].slice.call(__args63, 1)),
    seq(moveChild("bindings"), seqa(actions63), up)), ((__args64 = ["body", checkTop]), (actions64 = []
    .slice.call(__args64, 1)), seq(moveChild("body"), seqa(actions64), up))]), seq(push, seqa(body14), pop)));
addCheck("CurryExpression", seq(((__args65 = ["base", checkTop]), (actions65 = [].slice.call(__args65, 1)), seq(
    moveChild("base"), seqa(actions65), up)), ((__args66 = ["args", checkTop]), (actions66 = [].slice.call(
    __args66, 1)), seq(moveChild("args"), seqa(actions66), up))));
addCheck("OperatorExpression", ((__args67 = ["operator", checkTop]), (actions67 = [].slice.call(__args67, 1)), seq(
    moveChild("operator"), seqa(actions67), up)));
addCheck("EllipsisPattern", ((__args68 = ["id", checkTop]), (actions68 = [].slice.call(__args68, 1)), seq(moveChild(
    "id"), seqa(actions68), up)));
addCheck(["SliceUnpack", "RelativeUnpack", "ImportPattern"], ((__args69 = ["pattern", checkTop]), (actions69 = [].slice
    .call(__args69, 1)), seq(moveChild("pattern"), seqa(actions69), up)));
addCheck("IdentifierPattern", seq(inspect((function(node) {
    var loc = node["loc"],
        id = node["id"];
    return (reserved(node) ? addImmutableBinding(id.name, loc) : addImmutableBindingChecked(id.name,
        loc));
})), ((__args70 = ["id", checkTop]), (actions70 = [].slice.call(__args70, 1)), seq(moveChild("id"), seqa(
    actions70), up))));
addCheck("AsPattern", seq(((__args71 = ["id", checkTop]), (actions71 = [].slice.call(__args71, 1)), seq(moveChild("id"),
    seqa(actions71), up)), inspect((function(node) {
    var __args72 = ["target", modifyNode((function(target) {
        return setUd("id", node.id, target);
    })), checkTop],
        actions72 = [].slice.call(__args72, 1);
    return seq(moveChild("target"), seqa(actions72), up);
}))));
addCheck("ObjectPattern", ((__args72 = ["elements", checkTop]), (actions72 = [].slice.call(__args72, 1)), seq(moveChild(
    "elements"), seqa(actions72), up)));
addCheck("ObjectPatternElement", seq(((__args73 = ["target", checkTop]), (actions73 = [].slice.call(__args73, 1)), seq(
    moveChild("target"), seqa(actions73), up)), ((__args74 = ["key", checkTop]), (actions74 = [].slice.call(
    __args74, 1)), seq(moveChild("key"), seqa(actions74), up))));
addCheck("ArgumentsPattern", seq(((__args75 = ["id", checkTop]), (actions75 = [].slice.call(__args75, 1)), seq(
    moveChild("id"), seqa(actions75), up)), ((__args76 = ["elements", checkTop]), (actions76 = [].slice.call(
    __args76, 1)), seq(moveChild("elements"), seqa(actions76), up)), ((__args77 = ["self", checkTop]), (
    actions77 = [].slice.call(__args77, 1)), seq(moveChild("self"), seqa(actions77), up))));
addCheck("ObjectValue", ((__args78 = ["value", checkTop]), (actions78 = [].slice.call(__args78, 1)), seq(moveChild(
    "value"), seqa(actions78), up)));
addCheck(["Identifier", "BinaryOperator"], inspect((function(node) {
    var loc = node["loc"],
        name = node["name"];
    return seq(checkHasBinding(name, loc), examineScope((function(s) {
        return setNode(setUid(scope.getUid(name, s), node));
    })));
})));
addCheck(["UnaryOperator"], inspect((function(node) {
    var loc = node["loc"],
        name = node["name"];
    return seq(checkHasBinding(name, loc), examineScope((function(s) {
        var uid = scope.getUid(name, s);
        return seq(setNode(setUid(uid, node)), addOperator(name, uid));
    })));
})));
(_check = (function(node) {
    return (Array.isArray(node) ? checkArray(node) : (checks[type(node)] || pass));
}));
var addGlobals = flip(foldl.bind(null, (function(s, c) {
    return scope.addImmutableBinding(c, "global", s);
}))),
    addUnaryOps = flip(foldl.bind(null, (function(s, c) {
        return scope.addOperator(c, "global", s);
    }))),
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
(check = (function(ast, globals, builtinBinary, builtinUnary) {
    return run(rewrite, addUnaryOps((builtinUnary || []), addGlobals((builtinBinary || []), addGlobals((globals || []),
        Scope.empty))), ast, Error.of, Error.fail);
}));
(exports["check"] = check);