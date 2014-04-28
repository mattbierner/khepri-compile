/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/lexical/lexical.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    setData = __o["setData"],
    getData = __o["getData"],
    __o0 = require("akh")["base"],
    next = __o0["next"],
    seq = __o0["sequence"],
    seqa = __o0["sequencea"],
    StateT = require("akh")["trans"]["statei"],
    Error = require("akh")["error"],
    ErrorT = require("akh")["trans"]["error"],
    Unique = require("akh")["unique"],
    TreeZipperT = require("zipper-m")["trans"]["tree"],
    __o1 = require("../ast"),
    type = __o1["type"],
    isIdentifier = __o1["isIdentifier"],
    __o2 = require("../fun"),
    foldl = __o2["foldl"],
    scope = require("./scope"),
    Scope = scope["Scope"],
    ScopeT = require("./scopet"),
    check, x, y, x0, y0, x1, y1, x2, y2, body, __args, actions, __args, actions, __args, actions, body0, __args,
        actions, __args0, actions1, x3, consequent, __args, actions, alternate, __args, actions, __args1, actions0,
        __args, actions, __args, actions, bind, consequent0, alternate0, __args, actions, __args, actions, __args,
        actions, __args, actions, consequent1, alternate1, __args, actions, __args, actions, __args, actions, __args,
        actions, body1, __args, actions, __args, actions, __args, actions, body2, __args, actions, body3, __args,
        actions, body4, __args, actions, __args2, actions2, __args, actions, body5, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, body6, __args, actions, body7, __args,
        actions, body8, __args, actions, __args3, actions3, __args, actions, __args, actions, body9, __args, actions,
        body10, __args, actions, __args, actions, body11, __args, actions, __args, actions, __args, actions, body12,
        __args, actions, body13, consequent2, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, __args, actions, consequent3, __args, actions, __args, actions, body14, __args,
        actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions,
        __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args, actions, __args,
        actions, __args, actions, reserved = (function(node) {
            return getData(node, "reserved");
        }),
    _check, M = ErrorT(TreeZipperT(ScopeT(Unique))),
    run = (function(p, s, ctx, ok, err) {
        var y, y0;
        return Unique.runUnique(StateT.evalStateT(TreeZipperT.runTreeZipperT(ErrorT.runErrorT(p, ((y = M.inner.of), (
            function(z) {
                return y(ok(z));
            })), ((y0 = M.inner.of), (function(z) {
            return y0(err(z));
        }))), ctx), s), 1000);
    }),
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
    pass = M.of(),
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
addCheck("PackageExports", ((__args = ["exports", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "exports"), seqa(actions), up)));
addCheck("PackageExport", seq(inspect((function(__o3) {
    var id = __o3["id"];
    return addMutableBindingChecked(id.name, id.loc);
})), ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"), seqa(actions), up))));
addCheck("Package", ((body0 = [((__args = ["exports", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "exports"), seqa(actions), up)), ((__args0 = ["body", ((x3 = type), (consequent = seq(((__args = [
        "bindings", checkTop
    ]), (actions = [].slice.call(__args, 1)), seq(moveChild("bindings"), seqa(
        actions), up)), ((__args1 = ["body", ((__args = ["body", checkTop]), (
        actions = [].slice.call(__args, 1)), seq(moveChild("body"),
        seqa(actions), up))]), (actions0 = [].slice.call(__args1, 1)), seq(
        moveChild("body"), seqa(actions0), up)))), (__args = ["body", checkTop]), (actions = []
        .slice.call(__args, 1)), (alternate = seq(moveChild("body"), seqa(actions), up)),
    inspect((function(node) {
        var y3;
        return (((y3 = x3(node)), ("WithStatement" === y3)) ? consequent : (
            alternate || pass));
    })))]), (actions1 = [].slice.call(__args0, 1)), seq(moveChild("body"), seqa(actions1), up))]), seq(push,
    seqa(body0), pop)));
addCheck(["StaticDeclaration", "VariableDeclaration"], ((__args = ["declarations", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("declarations"), seqa(actions), up)));
addCheck("StaticDeclarator", inspect((function(__o3) {
    var id = __o3["id"];
    return addStaticBindingChecked(id.name, id.loc);
})));
addCheck("VariableDeclarator", ((bind = (function(node) {
    return (node.immutable ? addImmutableBindingChecked(node.id.name, node.loc) :
        addMutableBindingChecked(node.id.name, node.loc));
})), (consequent0 = seq(inspect(bind), ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("id"), seqa(actions), up)), ((__args = ["init", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("init"), seqa(actions), up)))), (alternate0 = seq(((__args = ["init", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("init"), seqa(actions), up)), inspect(bind), ((
    __args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"), seqa(
    actions), up)))), inspect((function(node) {
    return (node.recursive ? consequent0 : (alternate0 || pass));
}))));
addCheck("Binding", ((consequent1 = seq(((__args = ["pattern", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("pattern"), seqa(actions), up)), ((__args = ["value", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("value"), seqa(actions), up)))), (alternate1 = seq(((__args = ["value", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("value"), seqa(actions), up)), ((__args = [
    "pattern", checkTop
]), (actions = [].slice.call(__args, 1)), seq(moveChild("pattern"), seqa(actions), up)))), inspect((function(
    node) {
    return (node.recursive ? consequent1 : (alternate1 || pass));
}))));
addCheck("BlockStatement", ((body1 = [((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("body"), seqa(actions), up))]), seq(push, seqa(body1), pop)));
addCheck("ExpressionStatement", ((__args = ["expression", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("expression"), seqa(actions), up)));
addCheck("IfStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("test"),
    seqa(actions), up)), ((body2 = [((__args = ["consequent", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("consequent"), seqa(actions), up))]), seq(push, seqa(body2), pop)), ((body3 = [((__args = [
    "alternate", checkTop
]), (actions = [].slice.call(__args, 1)), seq(moveChild("alternate"), seqa(actions), up))]), seq(push, seqa(
    body3), pop))));
addCheck("WithStatement", ((body4 = [((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("bindings"), seqa(actions), up)), ((__args2 = ["body", ((__args = ["body", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("body"), seqa(actions), up))]), (actions2 = []
    .slice.call(__args2, 1)), seq(moveChild("body"), seqa(actions2), up))]), seq(push, seqa(body4), pop)));
addCheck("SwitchStatement", ((body5 = [((__args = ["discriminant", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("discriminant"), seqa(actions), up)), ((__args = ["cases", checkTop]), (actions = [].slice
    .call(__args, 1)), seq(moveChild("cases"), seqa(actions), up))]), seq(push, seqa(body5), pop)));
addCheck("SwitchCase", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("test"),
    seqa(actions), up)), ((__args = ["consequent", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("consequent"), seqa(actions), up))));
addCheck(["ReturnStatement", "ThrowStatement"], ((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("argument"), seqa(actions), up)));
addCheck("TryStatement", seq(((__args = ["block", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "block"), seqa(actions), up)), ((body6 = [((__args = ["handler", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("handler"), seqa(actions), up))]), seq(push, seqa(body6), pop)), ((body7 = [((
    __args = ["finalizer", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "finalizer"), seqa(actions), up))]), seq(push, seqa(body7), pop))));
addCheck("CatchClause", ((body8 = [inspect((function(__o3) {
    var param = __o3["param"];
    return addImmutableBindingChecked(param.name, param.loc);
})), ((__args = ["param", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("param"),
    seqa(actions), up)), ((__args3 = ["body", ((__args = ["body", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("body"), seqa(actions), up))]), (actions3 = [].slice.call(__args3, 1)),
    seq(moveChild("body"), seqa(actions3), up))]), seq(push, seqa(body8), pop)));
addCheck("WhileStatement", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "test"), seqa(actions), up)), ((body9 = [((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body9), pop))));
addCheck("DoWhileStatement", seq(((body10 = [((__args = ["body", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("body"), seqa(actions), up))]), seq(push, seqa(body10), pop)), ((__args = ["test", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("test"), seqa(actions), up))));
addCheck("ForStatement", ((body11 = [((__args = ["init", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("init"), seqa(actions), up)), ((__args = ["test", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("test"), seqa(actions), up)), ((__args = ["update", checkTop]), (actions = []
    .slice.call(__args, 1)), seq(moveChild("update"), seqa(actions), up)), ((body12 = [((__args = [
    "body", checkTop
]), (actions = [].slice.call(__args, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push,
    seqa(body12), pop))]), seq(push, seqa(body11), pop)));
addCheck("FunctionExpression", ((body13 = [((consequent2 = seq(inspect((function(__o3) {
    var id = __o3["id"];
    return addImmutableBinding(id.name, id.loc);
})), ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"),
    seqa(actions), up)))), inspect((function(node) {
    return (node.id ? consequent2 : (undefined || pass));
}))), getClosure((function(closure) {
    var __args, actions, __args4, actions4, x4, __args, actions;
    return seq(((__args = ["params", checkTop]), (actions = [].slice.call(__args, 1)), seq(
        moveChild("params"), seqa(actions), up)), ((__args4 = ["body", when(((x4 = type), (
        function(z) {
            var y3 = x4(z);
            return ("BlockStatement" === y3);
        })), ((__args = ["body", checkTop]), (actions = [].slice.call(
        __args, 1)), seq(moveChild("body"), seqa(actions), up)), checkTop)]), (actions4 = []
        .slice.call(__args4, 1)), seq(moveChild("body"), seqa(actions4), up)), getClosure((
        function(locals) {
            return modifyNode((function(node) {
                return setData(node, "locals", locals.filter((function(x5) {
                    return (closure.indexOf(x5) < 0);
                })));
            }));
        })));
}))]), seq(push, seqa(body13), pop)));
addCheck("UnaryExpression", ((__args = ["argument", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "argument"), seqa(actions), up)));
addCheck("AssignmentExpression", seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("left"), seqa(actions), up)), inspect((function(__o3) {
    var operator = __o3["operator"],
        left = __o3["left"];
    return (isIdentifier(left) ? seq(checkCanAssign(left.name, left.loc), ((operator === ":=") ?
        markBindingImmutable(left.name, left.loc) : pass)) : pass);
})), ((__args = ["right", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("right"), seqa(
    actions), up))));
addCheck(["LogicalExpression", "BinaryExpression"], seq(((__args = ["left", checkTop]), (actions = [].slice.call(__args,
    1)), seq(moveChild("left"), seqa(actions), up)), ((__args = ["right", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("right"), seqa(actions), up))));
addCheck("ConditionalExpression", seq(((__args = ["test", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("test"), seqa(actions), up)), ((__args = ["consequent", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("consequent"), seqa(actions), up)), ((__args = ["alternate", checkTop]), (
    actions = [].slice.call(__args, 1)), seq(moveChild("alternate"), seqa(actions), up))));
addCheck(["CallExpression", "NewExpression"], seq(((__args = ["callee", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("callee"), seqa(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("args"), seqa(actions), up))));
addCheck("MemberExpression", seq(((__args = ["object", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "object"), seqa(actions), up)), ((__args = ["property", checkTop]), (actions = [].slice.call(__args, 1)), (
    consequent3 = seq(moveChild("property"), seqa(actions), up)), inspect((function(node) {
    return (node.computed ? consequent3 : (undefined || pass));
})))));
addCheck("ArrayExpression", ((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "elements"), seqa(actions), up)));
addCheck("ObjectExpression", ((__args = ["properties", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "properties"), seqa(actions), up)));
addCheck("LetExpression", ((body14 = [((__args = ["bindings", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("bindings"), seqa(actions), up)), ((__args = ["body", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("body"), seqa(actions), up))]), seq(push, seqa(body14), pop)));
addCheck("CurryExpression", seq(((__args = ["base", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "base"), seqa(actions), up)), ((__args = ["args", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("args"), seqa(actions), up))));
addCheck("EllipsisPattern", ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"),
    seqa(actions), up)));
addCheck(["SliceUnpack", "RelativeUnpack", "ImportPattern"], ((__args = ["pattern", checkTop]), (actions = [].slice.call(
    __args, 1)), seq(moveChild("pattern"), seqa(actions), up)));
addCheck("IdentifierPattern", seq(inspect((function(node) {
    var loc = node["loc"],
        id = node["id"];
    return (reserved(node) ? addImmutableBinding(id.name, loc) : addImmutableBindingChecked(id.name,
        loc));
})), ((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"), seqa(actions), up))));
addCheck("AsPattern", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"), seqa(
    actions), up)), inspect((function(node) {
    var __args4 = ["target", modifyNode((function(target) {
        return setData(target, "id", node.id);
    })), checkTop],
        actions4 = [].slice.call(__args4, 1);
    return seq(moveChild("target"), seqa(actions4), up);
}))));
addCheck("ObjectPattern", ((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild(
    "elements"), seqa(actions), up)));
addCheck("ObjectPatternElement", seq(((__args = ["target", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("target"), seqa(actions), up)), ((__args = ["key", checkTop]), (actions = [].slice.call(__args, 1)),
    seq(moveChild("key"), seqa(actions), up))));
addCheck("ArgumentsPattern", seq(((__args = ["id", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("id"),
    seqa(actions), up)), ((__args = ["elements", checkTop]), (actions = [].slice.call(__args, 1)), seq(
    moveChild("elements"), seqa(actions), up)), ((__args = ["self", checkTop]), (actions = [].slice.call(__args,
    1)), seq(moveChild("self"), seqa(actions), up))));
addCheck("ObjectValue", ((__args = ["value", checkTop]), (actions = [].slice.call(__args, 1)), seq(moveChild("value"),
    seqa(actions), up)));
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
    return (checks[type(node)] || pass);
}));
var addBindings = foldl.bind(null, scope.addImmutableBinding, Scope.empty);
(check = (function(ast, globals, seed) {
    return run(seq(checkTop, root, extractCtx.chain((function(x4) {
        return unique((function(unique0) {
            return extractScope.map((function(s) {
                return ({
                    tree: x4,
                    data: ({
                        unique: unique0
                    })
                });
            }));
        }));
    }))), addBindings((globals || [])), ast, Error.of, Error.fail, seed);
}));
(exports["check"] = check);