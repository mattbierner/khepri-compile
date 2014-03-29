/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline.kep'
 * DO NOT EDIT
*/
"use strict";
var record = require("bes")["record"],
    array = require("bes")["array"],
    hashtrie = require("hashtrie"),
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("neith")["zipper"],
    detach = __o0["detach"],
    __o1 = require("neith")["walk"],
    neithWalk = __o1["walk"],
    tree = require("neith")["tree"],
    ast_node = require("khepri-ast")["node"],
    Node = ast_node["Node"],
    setUserData = ast_node["setUserData"],
    setData = ast_node["setData"],
    ast_declaration = require("khepri-ast")["declaration"],
    ast_statement = require("khepri-ast")["statement"],
    ast_expression = require("khepri-ast")["expression"],
    ast_pattern = require("khepri-ast")["pattern"],
    ast_value = require("khepri-ast")["value"],
    __o2 = require("akh")["base"],
    next = __o2["next"],
    seq = __o2["sequence"],
    seqa = __o2["sequencea"],
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["state"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    walk = require("zipper-m")["walk"],
    __o3 = require("./ast"),
    getUid = __o3["getUid"],
    isLambda = __o3["isLambda"],
    isPrimitive = __o3["isPrimitive"],
    isNumberish = __o3["isNumberish"],
    isTruthy = __o3["isTruthy"],
    __o4 = require("./builtin"),
    builtins = __o4["builtins"],
    definitions = __o4["definitions"],
    fun = require("./fun"),
    flattenr = fun["flattenr"],
    flatten = fun["flatten"],
    __plus = (function(x) {
        return (+x);
    }),
    __blas = (function(x, y) {
        return (x << y);
    }),
    __or = (function(x, y) {
        return (x || y);
    }),
    __minus = (function(x) {
        return (-x);
    }),
    __and = (function(x, y) {
        return (x && y);
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
    __typeof = (function(x) {
        return (typeof x);
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
    __lt = (function(x, y) {
        return (x < y);
    }),
    __sub = (function(x, y) {
        return (x - y);
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
    __div = (function(x, y) {
        return (x / y);
    }),
    __gte = (function(x, y) {
        return (x >= y);
    }),
    optimize, arithmetic, arithmetic0, _check, State = record.declare(null, ["bindings", "working", "globals", "outer"]),
    M = ZipperT(StateT(Unique)),
    run = (function(c, ctx, state, seed) {
        return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
    }),
    pass = M.of(null),
    node = M.node,
    modify = M.modifyNode,
    set = M.setNode,
    up = M.up,
    down = M.down,
    right = M.right,
    moveChild = M.child,
    unique = M.liftInner(Unique.unique),
    addBinding = (function(uid, target) {
        return M.lift(M.inner.modify((function(s) {
            return s.setBindings(hashtrie.set(uid, target, s.bindings));
        })));
    }),
    addWorking = (function(uid, target) {
        return M.lift(M.inner.modify((function(s) {
            return s.setWorking(hashtrie.set(uid, target, s.working));
        })));
    }),
    getBinding = (function(uid) {
        return (uid ? M.lift(M.inner.get)
            .map((function(__o5) {
                var bindings = __o5["bindings"],
                    working = __o5["working"];
                return (hashtrie.get(uid, working) || hashtrie.get(uid, bindings));
            })) : pass);
    }),
    addGlobal = (function(name) {
        return M.lift(M.inner.modify((function(s) {
            return s.setGlobals(hashtrie.set(name, name, s.globals));
        })));
    }),
    globals = M.lift(M.inner.get)
        .map((function(s) {
            return s.globals;
        })),
    stack = M.lift(M.inner.get)
        .map((function(s) {
            return s.stack;
        })),
    push = M.lift(M.inner.modify((function(s) {
        return new(State)(s.bindings, hashtrie.empty, s.globals, s);
    }))),
    pop = M.lift(M.inner.modify((function(s) {
        return s.outer.setBindings(s.bindings)
            .setGlobals(s.globals)
            .setWorking(hashtrie.fold((function(p, __o5) {
                var key = __o5["key"];
                return hashtrie.set(key, null, p);
            }), s.outer.working, s.working));
    }))),
    block = (function() {
        var body = arguments;
        return seq(push, seqa(body), pop);
    }),
    rewrite = (function(base, list, root) {
        return tree.node(neithWalk((function(ctx) {
            var node0 = tree.node(ctx),
                uid = getUid(node0);
            return ((list.indexOf(uid) >= 0) ? tree.modifyNode((function(node1) {
                return setData(node1, "uid", ((base + "-") + uid));
            }), ctx) : ctx);
        }), (function(x) {
            return x;
        }), khepriZipper(root)));
    }),
    UP = true,
    DOWN = false,
    peepholes = ({}),
    addRewrite = (function(type, f) {
        if (Array.isArray(type)) type.forEach((function(type0) {
            return addRewrite(type0, f);
        }));
        else(peepholes[type] = f);
    }),
    checkTop = node.chain((function(x) {
        return _check(x);
    })),
    child = (function(edge) {
        var args = arguments;
        return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
    }),
    checkChild = (function(edge) {
        return child(edge, checkTop);
    }),
    when = (function(test, consequent, alternate) {
        return node.chain((function(node0) {
            return (test(node0) ? consequent : (alternate || pass));
        }));
    }),
    Expansion = record.declare(null, ["ctx", "id", "target"]);
(Expansion.prototype.expand = null);
addRewrite("UnaryOperatorExpression", seq(node.chain((function(__o5) {
    var op = __o5["op"];
    return seq(addGlobal(op), set(builtins[op]));
})), checkTop));
addRewrite("BinaryOperatorExpression", seq(node.chain((function(__o5) {
    var op = __o5["op"],
        flipped = __o5["flipped"],
        name = (flipped ? ("_" + op) : op);
    return seq(addGlobal(name), set(builtins[name]));
})), checkTop));
addRewrite("TernaryOperatorExpression", seq(addGlobal("?"), set(builtins["?"]), checkTop));
addRewrite("Program", checkChild("body"));
addRewrite("Package", checkChild("body"));
addRewrite("SwitchCase", seq(checkChild("test"), checkChild("consequent")));
addRewrite("CatchClause", seq(checkChild("param"), checkChild("body")));
addRewrite(["StaticDeclaration", "VariableDeclaration"], checkChild("declarations"));
addRewrite("VariableDeclarator", seq(checkChild("init"), node.chain((function(node0) {
    return (node0.init ? (node0.immutable ? addBinding(getUid(node0.id), node0.init) : addWorking(
        getUid(node0.id), node0.init)) : pass);
}))));
addRewrite("Binding", seq(checkChild("value"), when((function(node0) {
    return ((node0.pattern.type === "IdentifierPattern") && getUid(node0.pattern.id));
}), node.chain((function(node0) {
    var uid = getUid(node0.pattern.id);
    return ((isPrimitive(node0.value) || isLambda(node0.value)) ? addBinding(uid, node0.value) : ((
            node0.value.type === "Identifier") ? getBinding(getUid(node0.value))
        .chain((function(binding) {
            return (binding ? addBinding(uid, node0.value) : pass);
        })) : pass));
}))), when((function(node0) {
    return (node0.value.type === "LetExpression");
}), node.chain((function(node0) {
    var bindings = fun.flatten(fun.concat(node0.value.bindings, ast_declaration.Binding.create(null,
        node0.pattern, node0.value.body)));
    return seq(set(bindings), checkChild((bindings.length - 1)));
})))));
addRewrite("BlockStatement", checkChild("body"));
addRewrite("ExpressionStatement", checkChild("expression"));
addRewrite("WithStatement", seq(checkChild("bindings"), checkChild("body")));
addRewrite("SwitchStatement", seq(checkChild("discriminant"), checkChild("cases")));
addRewrite(["ReturnStatement", "ThrowStatement"], checkChild("argument"));
addRewrite("TryStatement", seq(checkChild("block"), checkChild("handler"), checkChild("finalizer")));
addRewrite("WhileStatement", block(checkChild("test"), checkChild("body")));
addRewrite("DoWhileStatement", block(checkChild("body"), checkChild("test")));
addRewrite("ForStatement", seq(checkChild("init"), block(checkChild("test"), checkChild("update"), checkChild("body"))));
addRewrite("FunctionExpression", block(checkChild("id"), checkChild("params"), checkChild("body")));
addRewrite("UnaryExpression", ((arithmetic = ({
    "!": __lnot,
    "~": __bnot,
    "typeof": __typeof,
    "++": __plus,
    "--": __minus
})), when((function(__o5) {
    var operator = __o5["operator"],
        argument = __o5["argument"];
    return (arithmetic[operator] && isPrimitive(argument));
}), modify((function(__o5) {
    var operator = __o5["operator"],
        argument = __o5["argument"],
        value = arithmetic[operator](argument.value);
    return ast_value.Literal.create(null, (typeof value), value);
})))));
addRewrite("AssignmentExpression", seq(checkChild("right"), when((function(__o5) {
    var left = __o5["left"];
    return (left.type === "Identifier");
}), node.chain((function(node0) {
    return addWorking(getUid(node0.left), node0.right);
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
})), seq(checkChild("left"), checkChild("right"), when((function(__o5) {
    var operator = __o5["operator"],
        left = __o5["left"],
        right0 = __o5["right"];
    return ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right0));
}), modify((function(__o5) {
    var operator = __o5["operator"],
        left = __o5["left"],
        right0 = __o5["right"],
        value = arithmetic0[operator](left.value, right0.value);
    return ast_value.Literal.create(null, (typeof value), value);
}))))));
addRewrite(["ConditionalExpression", "IfStatement"], seq(checkChild("test"), when((function(node0) {
    return isPrimitive(node0.test);
}), node.chain((function(__o5) {
    var test = __o5["test"],
        consequent = __o5["consequent"],
        alternate = __o5["alternate"];
    return seq(set((isTruthy(test) ? consequent : alternate)), checkTop);
})), seq(checkChild("consequent"), checkChild("alternate")))));
addRewrite("MemberExpression", seq(checkChild("object"), node.chain((function(node0) {
    return (node0.computed ? checkChild("property") : pass);
}))));
addRewrite("NewExpression", seq(checkChild("callee"), checkChild("args")));
addRewrite("CallExpression", seq(checkChild("callee"), checkChild("args"), when((function(node0) {
    return (isLambda(node0.callee) || ((node0.callee.type === "LetExpression") && isLambda(node0.callee
        .body)));
}), seq(unique.chain((function(uid) {
    return modify((function(node0) {
        var target = ((node0.callee.type === "LetExpression") ? node0.callee.body :
            node0.callee),
            map = target.params.elements.map((function(x) {
                return getUid(x.id);
            })),
            bindings = target.params.elements.map((function(x, i) {
                return ast_declaration.Binding.create(null, x, (node0.args[i] ?
                    node0.args[i] : ast_value.Identifier.create(null,
                        "undefined")));
            }));
        return rewrite(uid, map, ast_expression.LetExpression.create(null, fun.concat((
            node0.callee.bindings || []), bindings), target.body));
    }));
})), checkTop))));
addRewrite("CurryExpression", seq(checkChild("base"), checkChild("args"), when((function(node0) {
    return (isLambda(node0.base) || ((node0.base.type === "LetExpression") && isLambda(node0.base.body)));
}), seq(unique.chain((function(uid) {
    return modify((function(node0) {
        var first, rest, map, body, target = ((node0.base.type === "LetExpression") ?
                node0.base.body : node0.base);
        return ((!target.params.elements.length) ? node0.base : ((first = target.params
            .elements[0]), (rest = target.params.elements.slice(1)), (map = [
            getUid(first.id)
        ]), (body = ast_expression.FunctionExpression.create(null, null,
            ast_pattern.ArgumentsPattern.create(null, null, rest, target.params
                .self), rewrite(uid, map, target.body))), ((first && (((first.type ===
                    "IdentifierPattern") || (first.type === "AsPattern")) ||
                (first.type === "ObjectPattern"))) ? ast_expression.LetExpression
            .create(null, fun.concat((node0.base.bindings || []), rewrite(uid,
                map, ast_declaration.Binding.create(null, first, node0.args[
                    0]))), body) : body)));
    }));
})), checkTop))));
addRewrite("ArrayExpression", checkChild("elements"));
addRewrite("ObjectExpression", checkChild("properties"));
addRewrite("LetExpression", seq(checkChild("bindings"), checkChild("body"), modify((function(__o5) {
    var loc = __o5["loc"],
        bindings = __o5["bindings"],
        body = __o5["body"];
    return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
})), when((function(__o5) {
    var bindings = __o5["bindings"];
    return (!bindings.length);
}), modify((function(__o5) {
    var body = __o5["body"];
    return body;
})))));
addRewrite("IdentifierPattern", checkChild("id"));
addRewrite("AsPattern", seq(checkChild("id"), checkChild("target")));
addRewrite("ObjectPattern", checkChild("elements"));
addRewrite("ObjectPatternElement", seq(checkChild("target"), checkChild("key")));
addRewrite("ArgumentsPattern", seq(checkChild("id"), checkChild("elements"), checkChild("self")));
addRewrite("ObjectValue", checkChild("value"));
addRewrite("Identifier", when((function(node0) {
    return getUid(node0);
}), node.chain((function(node0) {
    return getBinding(getUid(node0))
        .chain((function(binding) {
            return ((binding && ((isPrimitive(binding) || (binding.type === "Identifier")) ||
                isLambda(binding))) ? set(binding) : pass);
        }));
}))));
(_check = (function(node0) {
    if (Array.isArray(node0)) {
        if ((!node0.length)) return pass;
        return seq(down, seqa(node0.map((function(_, i) {
            return ((i === (node0.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node0 instanceof ast_node.Node) && peepholes[node0.type])) return peepholes[node0.type];
    return pass;
}));
var initialState = Object.keys(builtins)
    .reduce((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return s.setBindings(hashtrie.set(getUid(id), def, s.bindings));
    }), new(State)(hashtrie.empty, hashtrie.empty, hashtrie.empty, null));
(optimize = (function(ast, data) {
    return run(next(checkTop, node.chain((function(node0) {
        return globals.chain((function(g) {
            return unique.chain((function(unique0) {
                return M.of(({
                    "tree": node0,
                    "data": ({
                        "globals": hashtrie.keys(g),
                        "unique": unique0
                    })
                }));
            }));
        }));
    }))), khepriZipper(ast), initialState, data.unique);
}));
(exports["optimize"] = optimize);