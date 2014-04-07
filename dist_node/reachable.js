/*
 * THIS FILE IS AUTO GENERATED from 'lib/reachable.kep'
 * DO NOT EDIT
*/"use strict";
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
    optimize, State = record.declare(null, ["bindings", "scope"]);
(State.empty = State.create(hashtrie.empty, [hashtrie.empty, null]));
(State.prototype.addReference = (function(uid) {
    var __o = this,
        bindings = __o["bindings"],
        scope = __o["scope"];
    return State.create(hashtrie.set(uid, null, bindings), [hashtrie.set(uid, null, scope[0]), scope[1]]);
}));
(State.prototype.isReachable = (function(uid) {
    var __o = this,
        bindings = __o["bindings"],
        scope = __o["scope"];
    return hashtrie.has(uid, bindings);
}));
var _check, M = ZipperT(StateM),
    run = (function(c, ctx) {
        return StateM.evalState(ZipperT.runZipperT(c, ctx), State.empty);
    }),
    pass = M.of(null),
    getState = M.lift(M.inner.get),
    modifyState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(M.lift, M.inner.modify),
    addReference = (function(uid) {
        return (uid ? modifyState((function(s) {
            return s.addReference(uid);
        })) : pass);
    }),
    isReachable = (function(uid) {
        return (uid ? getState.map((function(s) {
            return s.isReachable(uid);
        })) : M.of(true));
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
    checkTop = extract((function(x) {
        return _check(x);
    })),
    visitChild = (function(edge) {
        return child(edge, checkTop);
    }),
    peepholes = ({}),
    addRewrite = (function(type, f) {
        if (Array.isArray(type)) type.forEach((function(type) {
            return addRewrite(type, f);
        }));
        else(peepholes[type] = f);
    });
addRewrite("Program", visitChild("body"));
addRewrite("Package", visitChild("body"));
addRewrite("SwitchCase", seq(visitChild("test"), visitChild("consequent")));
addRewrite("CatchClause", seq(visitChild("param"), visitChild("body")));
addRewrite("VariableDeclaration", visitChild("declarations"));
addRewrite("VariableDeclarator", seq(visitChild("id"), when((function(node) {
    return node.init;
}), extract((function(node) {
    return isReachable(getUid(node.id))
        .chain((function(reachable) {
            return (reachable ? visitChild("init") : set([]));
        }));
})))));
addRewrite("Binding", seq(visitChild("pattern"), extract((function(node) {
    return isReachable(getUid(node.pattern.id))
        .chain((function(reachable) {
            return (reachable ? visitChild("value") : set([]));
        }));
}))));
addRewrite("BlockStatement", visitChild("body"));
addRewrite("ExpressionStatement", visitChild("expression"));
addRewrite("WithStatement", seq(visitChild("body"), visitChild("bindings")));
addRewrite("SwitchStatement", seq(visitChild("discriminant"), visitChild("cases")));
addRewrite(["ReturnStatement", "ThrowStatement"], visitChild("argument"));
addRewrite("TryStatement", seq(visitChild("block"), visitChild("handler"), visitChild("finalizer")));
addRewrite("WhileStatement", seq(visitChild("test"), visitChild("body")));
addRewrite("DoWhileStatement", seq(visitChild("body"), visitChild("test")));
addRewrite("ForStatement", seq(visitChild("init"), visitChild("test"), visitChild("update"), visitChild("body")));
addRewrite(["ConditionalExpression", "IfStatement"], seq(visitChild("test"), visitChild("consequent"), visitChild(
    "alternate")));
addRewrite("FunctionExpression", seq(visitChild("id"), visitChild("params"), visitChild("body")));
addRewrite("UnaryExpression", visitChild("argument"));
addRewrite(["AssignmentExpression", "LogicalExpression", "BinaryExpression"], seq(visitChild("left"), visitChild(
    "right")));
addRewrite("MemberExpression", seq(visitChild("object"), when((function(node) {
    return node.computed;
}), visitChild("property"))));
addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args")));
addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args")));
addRewrite("LetExpression", seq(visitChild("body"), visitChild("bindings")));
addRewrite("ArgumentsPattern", seq(visitChild("id"), visitChild("elements"), visitChild("self")));
addRewrite("ArrayExpression", visitChild("elements"));
addRewrite("ObjectExpression", visitChild("properties"));
addRewrite("ObjectValue", visitChild("value"));
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