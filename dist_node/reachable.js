/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/reachable.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    hashtrie = require("hashtrie"),
    zipper = require("neith")["zipper"],
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("khepri-ast")["node"],
    Node = __o0["Node"],
    setData = __o0["setData"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o1 = require("akh")["base"],
    next = __o1["next"],
    seq = __o1["sequence"],
    seqa = __o1["sequencea"],
    StateM = require("akh")["state"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    walk = require("zipper-m")["walk"],
    __o2 = require("./ast"),
    getUd = __o2["getUd"],
    getUid = __o2["getUid"],
    optimize, x, y, test, consequent, alternate, test0, consequent0, alternate0, State = record.declare(null, [
        "bindings", "scope"
    ]);
(State.empty = State.create(hashtrie.empty, [hashtrie.empty, null]));
(State.prototype.addReference = (function(uid) {
    var __o3 = this,
        bindings = __o3["bindings"],
        scope = __o3["scope"];
    return State.create(hashtrie.set(uid, null, bindings), [hashtrie.set(uid, null, scope[0]), scope[1]]);
}));
(State.prototype.isReachable = (function(uid) {
    var __o3 = this,
        bindings = __o3["bindings"],
        scope = __o3["scope"];
    return hashtrie.has(uid, bindings);
}));
var _check, M = ZipperT(StateM),
    run = (function(c, ctx) {
        return StateM.evalState(ZipperT.runZipperT(c, ctx), State.empty);
    }),
    pass = M.of(null),
    getState = M.lift(M.inner.get),
    modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
        return x(y(x0));
    })),
    addReference = (function(uid) {
        return modifyState((function(s) {
            return s.addReference(uid);
        }));
    }),
    isReachable = (function(uid) {
        return getState.map((function(s) {
            return s.isReachable(uid);
        }));
    }),
    extract = M.chain.bind(null, M.node),
    modify = M.modifyNode,
    set = M.setNode,
    up = M.up,
    down = M.down,
    left = M.left,
    rightmost = M.move(zipper.rightmost),
    moveChild = M.child,
    when = (function(test, consequent, alternate) {
        return extract((function(node) {
            return (test(node) ? consequent : (alternate || pass));
        }));
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
    peepholes = ({}),
    addRewrite = (function(type, f) {
        if (Array.isArray(type)) type.forEach((function(type0) {
            return addRewrite(type0, f);
        }));
        else {
            (peepholes[type] = f);
        }
    });
addRewrite("Program", child("body", checkTop));
addRewrite("Package", child("body", checkTop));
addRewrite("SwitchCase", seq(child("test", checkTop), child("consequent", checkTop)));
addRewrite("CatchClause", seq(child("param", checkTop), child("body", checkTop)));
addRewrite("VariableDeclaration", child("declarations", checkTop));
addRewrite("VariableDeclarator", seq(child("id", checkTop), ((test = (function(node) {
    return node.init;
})), (consequent = extract((function(node) {
    return isReachable(getUid(node.id))
        .chain((function(reachable) {
            return (reachable ? visitChild("init") : set([]));
        }));
}))), (alternate = undefined), extract((function(node) {
    var node0;
    return (((node0 = node), node0.init) ? consequent : (alternate || pass));
})))));
addRewrite("Binding", seq(child("pattern", checkTop), extract((function(node) {
    return isReachable(getUid(node.pattern.id))
        .chain((function(reachable) {
            return (reachable ? visitChild("value") : set([]));
        }));
}))));
addRewrite("BlockStatement", child("body", checkTop));
addRewrite("ExpressionStatement", child("expression", checkTop));
addRewrite("WithStatement", seq(child("body", checkTop), child("bindings", checkTop)));
addRewrite("SwitchStatement", seq(child("discriminant", checkTop), child("cases", checkTop)));
addRewrite(["ReturnStatement", "ThrowStatement"], child("argument", checkTop));
addRewrite("TryStatement", seq(child("block", checkTop), child("handler", checkTop), child("finalizer", checkTop)));
addRewrite("WhileStatement", seq(child("test", checkTop), child("body", checkTop)));
addRewrite("DoWhileStatement", seq(child("body", checkTop), child("test", checkTop)));
addRewrite("ForStatement", seq(child("init", checkTop), child("test", checkTop), child("update", checkTop), child(
    "body", checkTop)));
addRewrite("FunctionExpression", seq(child("id", checkTop), child("params", checkTop), child("body", checkTop)));
addRewrite("UnaryExpression", child("argument", checkTop));
addRewrite(["AssignmentExpression", "LogicalExpression", "BinaryExpression"], seq(child("left", checkTop), child(
    "right", checkTop)));
addRewrite("MemberExpression", seq(child("object", checkTop), ((test0 = (function(node) {
    return node.computed;
})), (consequent0 = child("property", checkTop)), (alternate0 = undefined), extract((function(node) {
    var node0;
    return (((node0 = node), node0.computed) ? consequent0 : (alternate0 || pass));
})))));
addRewrite("NewExpression", seq(child("callee", checkTop), child("args", checkTop)));
addRewrite("CallExpression", seq(child("callee", checkTop), child("args", checkTop)));
addRewrite("CurryExpression", seq(child("base", checkTop), child("args", checkTop)));
addRewrite("LetExpression", seq(child("body", checkTop), child("bindings", checkTop)));
addRewrite("ArgumentsPattern", seq(child("id", checkTop), child("elements", checkTop), child("self", checkTop)));
addRewrite("ArrayExpression", child("elements", checkTop));
addRewrite("ObjectExpression", child("properties", checkTop));
addRewrite("ObjectValue", child("value", checkTop));
addRewrite("Identifier", extract((function(node) {
    return addReference(getUid(node));
})));
(_check = (function(node) {
    if (Array.isArray(node)) {
        if ((!node.length)) return pass;
        return seq(down, rightmost, node.reduceRight((function(p, c, i) {
            return next(p, (i ? next(checkTop, left) : checkTop));
        }), pass), up);
    }
    if (((node instanceof Node) && peepholes[node.type])) return peepholes[node.type];
    return pass;
}));
(optimize = (function(ast, data) {
    return run(next(checkTop, extract((function(node) {
        return M.of(({
            "tree": node
        }));
    }))), khepriZipper(ast));
}));
(exports["optimize"] = optimize);