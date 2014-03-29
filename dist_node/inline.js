/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/"use strict";
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
            .map((function(__o) {
                var bindings = __o["bindings"],
                    working = __o["working"];
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
            .setGlobals(s.globals);
    }))),
    block = (function() {
        var body = arguments;
        return seq(push, seqa(body), pop);
    }),
    rewrite = (function(base, list, root) {
        return tree.node(neithWalk((function(ctx) {
            var node = tree.node(ctx),
                uid = getUid(node);
            return ((list.indexOf(uid) >= 0) ? tree.modifyNode((function(node) {
                return setData(node, "uid", ((base + "-") + uid));
            }), ctx) : ctx);
        }), (function(x) {
            return x;
        }), khepriZipper(root)));
    }),
    UP = true,
    DOWN = false,
    peepholes = ({}),
    addRewrite = (function(type, f) {
        if (Array.isArray(type)) type.forEach((function(type) {
            return addRewrite(type, f);
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
        return node.chain((function(node) {
            return (test(node) ? consequent : (alternate || pass));
        }));
    }),
    Expansion = record.declare(null, ["ctx", "id", "target"]);
(Expansion.prototype.expand = null);
addRewrite("Program", checkChild("body"));
addRewrite("Package", checkChild("body"));
addRewrite("SwitchCase", seq(checkChild("test"), checkChild("consequent")));
addRewrite("CatchClause", seq(checkChild("param"), checkChild("body")));
addRewrite(["StaticDeclaration", "VariableDeclaration"], checkChild("declarations"));
addRewrite("VariableDeclarator", seq(checkChild("init"), node.chain((function(node) {
    return (node.init ? (node.immutable ? addBinding(getUid(node.id), node.init) : addWorking(getUid(
        node.id), node.init)) : pass);
}))));
addRewrite("Binding", seq(checkChild("pattern"), checkChild("value"), when((function(node) {
    return ((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id));
}), node.chain((function(node) {
    var uid = getUid(node.pattern.id);
    return ((isPrimitive(node.value) || isLambda(node.value)) ? seq(addBinding(uid, node.value),
        set([])) : ((node.value.type === "Identifier") ? getBinding(getUid(node.value))
        .chain((function(binding) {
            return (binding ? seq(addBinding(uid, node.value), set([])) : pass);
        })) : pass));
})))));
addRewrite("BlockStatement", checkChild("body"));
addRewrite("ExpressionStatement", checkChild("expression"));
addRewrite("WithStatement", seq(checkChild("bindings"), child("body", checkChild("body"))));
addRewrite("SwitchStatement", seq(checkChild("discriminant"), checkChild("cases")));
addRewrite(["ReturnStatement", "ThrowStatement"], checkChild("argument"));
addRewrite("TryStatement", seq(checkChild("block"), seq(checkChild("handler")), seq(checkChild("finalizer"))));
addRewrite("WhileStatement", seq(checkChild("test"), seq(checkChild("body"))));
addRewrite("DoWhileStatement", seq(seq(checkChild("body")), checkChild("test")));
addRewrite("ForStatement", seq(checkChild("init"), checkChild("test"), checkChild("update"), seq(checkChild("body"))));
addRewrite("FunctionExpression", block(checkChild("id"), checkChild("params"), checkChild("body")));
addRewrite("UnaryExpression", ((arithmetic = ({
    "!": (function(x) {
        return (!x);
    }),
    "~": (function(x) {
        return (~x);
    }),
    "typeof": (function(x) {
        return (typeof x);
    }),
    "++": (function(x) {
        return (+x);
    }),
    "--": (function(x) {
        return (-x);
    })
})), when((function(__o) {
    var operator = __o["operator"],
        argument = __o["argument"];
    return (arithmetic[operator] && isPrimitive(argument));
}), modify((function(__o) {
    var operator = __o["operator"],
        argument = __o["argument"],
        value = arithmetic[operator](argument.value);
    return ast_value.Literal.create(null, (typeof value), value);
})))));
addRewrite("AssignmentExpression", seq(checkChild("right"), when((function(__o) {
    var left = __o["left"];
    return (left.type === "Identifier");
}), node.chain((function(node) {
    return addWorking(getUid(node.left), node.right);
})))));
addRewrite(["LogicalExpression", "BinaryExpression"], ((arithmetic0 = ({
    "+": (function(x, y) {
        return (x + y);
    }),
    "-": (function(x, y) {
        return (x - y);
    }),
    "*": (function(x, y) {
        return (x * y);
    }),
    "/": (function(x, y) {
        return (x / y);
    }),
    "%": (function(x, y) {
        return (x % y);
    }),
    "<<": (function(x, y) {
        return (x << y);
    }),
    ">>": (function(x, y) {
        return (x >> y);
    }),
    ">>>": (function(x, y) {
        return (x >>> y);
    }),
    "<": (function(x, y) {
        return (x < y);
    }),
    ">": (function(x, y) {
        return (x > y);
    }),
    "<=": (function(x, y) {
        return (x <= y);
    }),
    ">=": (function(x, y) {
        return (x >= y);
    }),
    "||": (function(x, y) {
        return (x || y);
    }),
    "&&": (function(x, y) {
        return (x && y);
    })
})), seq(checkChild("left"), checkChild("right"), when((function(__o) {
    var operator = __o["operator"],
        left = __o["left"],
        right = __o["right"];
    return ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right));
}), modify((function(__o) {
    var operator = __o["operator"],
        left = __o["left"],
        right = __o["right"],
        value = arithmetic0[operator](left.value, right.value);
    return ast_value.Literal.create(null, (typeof value), value);
}))))));
addRewrite(["ConditionalExpression", "IfStatement"], seq(checkChild("test"), when((function(node) {
    return isPrimitive(node.test);
}), node.chain((function(__o) {
    var test = __o["test"],
        consequent = __o["consequent"],
        alternate = __o["alternate"];
    return seq(set((isTruthy(test) ? consequent : alternate)), checkTop);
})), seq(checkChild("consequent"), checkChild("alternate")))));
addRewrite("NewExpression", seq(checkChild("callee"), checkChild("args")));
addRewrite("CallExpression", seq(checkChild("callee"), checkChild("args"), when((function(node) {
    return (isLambda(node.callee) || ((node.callee.type === "LetExpression") && isLambda(node.callee.body)));
}), seq(unique.chain((function(uid) {
    return modify((function(node) {
        var target = ((node.callee.type === "LetExpression") ? node.callee.body : node.callee),
            map = target.params.elements.map((function(x) {
                return getUid(x.id);
            })),
            bindings = target.params.elements.map((function(x, i) {
                return ast_declaration.Binding.create(null, x, (node.args[i] ?
                    node.args[i] : ast_value.Identifier.create(null,
                        "undefined")));
            }));
        return rewrite(uid, map, ast_expression.LetExpression.create(null, fun.concat((
            node.callee.bindings || []), bindings), target.body));
    }));
})), checkTop))));
addRewrite("MemberExpression", seq(checkChild("object"), node.chain((function(node) {
    return (node.computed ? checkChild("property") : pass);
}))));
addRewrite("ArrayExpression", checkChild("elements"));
addRewrite("ObjectExpression", checkChild("properties"));
addRewrite("LetExpression", seq(checkChild("bindings"), checkChild("body"), modify((function(__o) {
    var loc = __o["loc"],
        bindings = __o["bindings"],
        body = __o["body"];
    return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
})), when((function(__o) {
    var bindings = __o["bindings"];
    return (!bindings.length);
}), modify((function(__o) {
    var body = __o["body"];
    return body;
})))));
addRewrite("CurryExpression", seq(checkChild("base"), checkChild("args")));
addRewrite("SinkPattern", unique.chain((function(uid) {
    return modify((function(node) {
        return setData(node, "id", setData(ast_value.Identifier.create(null, "_"), "uid", uid));
    }));
})));
addRewrite("IdentifierPattern", checkChild("id"));
addRewrite("ImportPattern", checkChild("pattern"));
addRewrite("AsPattern", seq(checkChild("id"), checkChild("target")));
addRewrite("ObjectPattern", checkChild("elements"));
addRewrite("ObjectPatternElement", seq(checkChild("target"), checkChild("key")));
addRewrite("ArgumentsPattern", seq(checkChild("id"), checkChild("elements"), checkChild("self")));
addRewrite("ObjectValue", checkChild("value"));
addRewrite("Identifier", when((function(node) {
    return getUid(node);
}), node.chain((function(node) {
    return getBinding(getUid(node))
        .chain((function(binding) {
            return ((binding && ((isPrimitive(binding) || (binding.type === "Identifier")) ||
                isLambda(binding))) ? set(binding) : pass);
        }));
}))));
(_check = (function(node) {
    if (Array.isArray(node)) {
        if ((!node.length)) return pass;
        return seq(down, seqa(node.map((function(_, i) {
            return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node instanceof ast_node.Node) && peepholes[node.type])) return peepholes[node.type];
    return pass;
}));
var initialState = Object.keys(builtins)
    .reduce((function(s, name) {
        var id = builtins[name],
            def = definitions[name];
        return s.setBindings(hashtrie.set(id.ud.uid, def, s.bindings));
    }), new(State)(hashtrie.empty, hashtrie.empty, hashtrie.empty, null));
(optimize = (function(ast, data) {
    return run(next(checkTop, node.chain((function(node) {
        return globals.chain((function(g) {
            return unique.chain((function(unique) {
                return M.of(({
                    "tree": node,
                    "data": ({
                        "globals": hashtrie.keys(g),
                        "unique": unique
                    })
                }));
            }));
        }));
    }))), khepriZipper(ast), initialState, data.unique);
}));
(exports["optimize"] = optimize);