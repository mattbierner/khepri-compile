/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    hashtrie = require("hashtrie"),
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
    Unique = require("akh")["unique"],
    StateT = require("akh")["trans"]["state"],
    ZipperT = require("zipper-m")["trans"]["zipper"],
    walk = require("zipper-m")["walk"],
    __o2 = require("./ast"),
    isIdentifier = __o2["isIdentifier"],
    getUd = __o2["getUd"],
    getUid = __o2["getUid"],
    isLambda = __o2["isLambda"],
    isPrimitive = __o2["isPrimitive"],
    isNumberish = __o2["isNumberish"],
    isTruthy = __o2["isTruthy"],
    __o3 = require("./builtin"),
    builtins = __o3["builtins"],
    definitions = __o3["definitions"],
    fun = require("./fun"),
    flattenr = fun["flattenr"],
    flatten = fun["flatten"],
    binding = require("./inline/bindings"),
    __o4 = require("./inline/expand"),
    expandCallee = __o4["expandCallee"],
    expandCurry = __o4["expandCurry"],
    __o5 = require("./inline/rename"),
    rename = __o5["rename"],
    incCount = __o5["incCount"],
    optimize, arithmetic, arithmetic0, MAX_EXPANSION_DEPTH = 1,
    _check, Binding = record.declare(null, ["value", "immutable", "simple"]),
    IMMUTABLE = true,
    MUTABLE = false,
    State = record.declare(null, ["bindings", "working", "globals", "outer", "ctx"]);
(State.empty = new(State)(binding.empty, binding.empty, hashtrie.empty, null, hashtrie.empty));
(State.prototype.addBinding = (function(uid, target, simple) {
    var s = this;
    return s.setBindings(binding.setBinding(uid, Binding.create(target, IMMUTABLE, simple), s.bindings));
}));
(State.prototype.addWorking = (function(uid, target, simple) {
    var s = this;
    return s.setWorking(binding.setBinding(uid, Binding.create(target, MUTABLE, simple), s.working));
}));
(State.prototype.push = (function() {
    var s = this;
    return s.setOuter(s)
        .setWorking(binding.empty);
}));
(State.prototype.pop = (function() {
    var s = this;
    return s.outer.setBindings(s.bindings)
        .setGlobals(s.globals)
        .setCtx(s.ctx)
        .setWorking(hashtrie.fold((function(p, __o) {
            var key = __o["key"];
            return hashtrie.set(key, null, p);
        }), s.outer.working, s.working));
}));
var markExpansion = (function(id, count, target) {
    return setData(id, "expand", ({
        "count": count,
        "value": target
    }));
}),
    getExpansion = getUd.bind(null, "expand"),
    isExpansion = getExpansion,
    canExpand = (function(exp) {
        return (exp.count < MAX_EXPANSION_DEPTH);
    }),
    expandNode = (function(node) {
        var uid, exp;
        return (isExpansion(node) ? ((uid = getUid(node)), (exp = getExpansion(node)), (canExpand(exp) ? exp.value :
            setData(node, "expand", null))) : node);
    }),
    M = ZipperT(StateT(Unique)),
    run = (function(c, ctx, state, seed) {
        return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
    }),
    pass = M.of(null),
    unique = M.chain.bind(null, M.liftInner(Unique.unique)),
    getState = M.lift(M.inner.get),
    modifyState = (function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(M.lift, M.inner.modify),
    extract = M.chain.bind(null, M.node),
    modify = M.modifyNode,
    set = M.setNode,
    up = M.up,
    down = M.down,
    right = M.right,
    moveChild = M.child,
    expand = (function(exp, f) {
        return exp.chain((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(f, expandNode));
    }),
    addBinding = (function(uid, value, simple) {
        return modifyState((function(s) {
            return s.addBinding(uid, value, simple);
        }));
    }),
    addWorking = (function(uid, value, simple) {
        return modifyState((function(s) {
            return s.addWorking(uid, value, simple);
        }));
    }),
    getBinding = (function(uid) {
        return (uid ? getState.map((function(__o) {
            var bindings = __o["bindings"],
                working = __o["working"];
            return (binding.getBinding(uid, working) || binding.getBinding(uid, bindings));
        })) : pass);
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
    push = modifyState((function(s) {
        return s.push();
    })),
    pop = modifyState((function(s) {
        return s.pop();
    })),
    block = (function() {
        var body = arguments;
        return seq(push, seqa(body), pop);
    }),
    globals = M.chain.bind(null, getState.map((function(s) {
        return s.globals;
    }))),
    addGlobal = (function(name) {
        return modifyState((function(s) {
            return s.setGlobals(hashtrie.set(name, name, s.globals));
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
    when = (function(test, consequent, alternate) {
        return extract((function(node) {
            return (test(node) ? consequent : (alternate || pass));
        }));
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
    peepholes = ({}),
    addRewrite = (function(type, f) {
        if (Array.isArray(type)) type.forEach((function(type) {
            return addRewrite(type, f);
        }));
        else(peepholes[type] = f);
    });
addRewrite("UnaryOperatorExpression", seq(extract((function(__o) {
    var op = __o["op"];
    return seq(addGlobal(op), set(builtins[op]));
})), checkTop));
addRewrite("BinaryOperatorExpression", seq(extract((function(__o) {
    var op = __o["op"],
        flipped = __o["flipped"],
        name = (flipped ? ("_" + op) : op);
    return seq(addGlobal(name), set(builtins[name]));
})), checkTop));
addRewrite("TernaryOperatorExpression", seq(addGlobal("?"), set(builtins["?"]), checkTop));
addRewrite("Program", visitChild("body"));
addRewrite("Package", visitChild("body"));
addRewrite("SwitchCase", seq(visitChild("test"), visitChild("consequent")));
addRewrite("CatchClause", seq(visitChild("param"), visitChild("body")));
addRewrite("VariableDeclaration", visitChild("declarations"));
addRewrite("VariableDeclarator", seq(visitChild("init"), when((function(node) {
    return node.init;
}), extract((function(node) {
    return (node.immutable ? seq(addBindingForNode(node.id, node.init), tryPrune(node.id)) :
        addWorking(getUid(node.id), node.init, ((isPrimitive(node.init) || isIdentifier(node.init)) ||
            isLambda(node.init))));
})))));
addRewrite("Binding", seq(visitChild("value"), when((function(node) {
    return ((node.pattern.type === "IdentifierPattern") && getUid(node.pattern.id));
}), extract((function(node) {
    return seq(addBindingForNode(node.pattern.id, node.value), tryPrune(node.pattern.id));
}))), when((function(node) {
    return ((node && (node.type === "Binding")) && (node.value.type === "LetExpression"));
}), extract((function(node) {
    var bindings = fun.flatten(fun.concat(node.value.bindings, ast_declaration.Binding.create(null,
        node.pattern, node.value.body)));
    return seq(set(bindings), visitChild((bindings.length - 1)));
})))));
addRewrite("BlockStatement", visitChild("body"));
addRewrite("ExpressionStatement", visitChild("expression"));
addRewrite("WithStatement", seq(visitChild("bindings"), visitChild("body")));
addRewrite("SwitchStatement", seq(visitChild("discriminant"), visitChild("cases")));
addRewrite(["ReturnStatement", "ThrowStatement"], visitChild("argument"));
addRewrite("TryStatement", seq(visitChild("block"), visitChild("handler"), visitChild("finalizer")));
addRewrite("WhileStatement", block(visitChild("test"), visitChild("body")));
addRewrite("DoWhileStatement", block(visitChild("body"), visitChild("test")));
addRewrite("ForStatement", seq(visitChild("init"), block(visitChild("test"), visitChild("update"), visitChild("body"))));
addRewrite("FunctionExpression", block(visitChild("id"), visitChild("params"), visitChild("body")));
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
})), seq(visitChild("argument"), when((function(__o) {
    var operator = __o["operator"],
        argument = __o["argument"];
    return (arithmetic[operator] && isPrimitive(argument));
}), modify((function(node) {
    var operator = node["operator"],
        argument = node["argument"],
        value = arithmetic[operator](argument.value);
    return ast_value.Literal.create(node.loc, (typeof value), value);
}))))));
addRewrite("AssignmentExpression", seq(visitChild("right"), when((function(__o) {
    var left = __o["left"];
    return (left.type === "Identifier");
}), extract((function(node) {
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
})), seq(visitChild("left"), visitChild("right"), when((function(__o) {
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
addRewrite(["ConditionalExpression", "IfStatement"], seq(visitChild("test"), when((function(node) {
    return isPrimitive(node.test);
}), extract((function(__o) {
    var test = __o["test"],
        consequent = __o["consequent"],
        alternate = __o["alternate"];
    return seq(set((isTruthy(test) ? consequent : alternate)), checkTop);
})), seq(visitChild("consequent"), visitChild("alternate")))));
addRewrite("MemberExpression", seq(visitChild("object"), when((function(node) {
    return node.computed;
}), visitChild("property")), when((function(node) {
    return ((node.computed && (node.object.type === "ArrayExpression")) && isNumberish(node.property));
}), modify((function(node) {
    return (node.object.elements[node.property.value] || ast_value.Identifier.create(null,
        "undefined"));
}))), when((function(node) {
    return ((node.computed && ((node.object.type === "Literal") && (node.object.kind === "string"))) &&
        isNumberish(node.property));
}), modify((function(node) {
    var str = node.object.value,
        idx = node.property.value;
    return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) : ast_value.Identifier
        .create(null, "undefined"));
})))));
addRewrite("NewExpression", seq(visitChild("callee"), visitChild("args")));
addRewrite("CallExpression", seq(visitChild("callee"), visitChild("args"), when((function(node) {
    return isExpansion(node.callee);
}), expand(M.node.map((function(node) {
    return node.callee;
})), (function(callee) {
    return modify((function(node) {
        return incCount(getUid(node.callee), (getExpansion(node.callee)
                .count || 1), getExpansion(node.callee)
            .countvalue, ast_expression.CallExpression.create(node.loc, callee, node.args));
    }));
}))), when((function(node) {
    return (isLambda(node.callee) || ((node.callee.type === "LetExpression") && isLambda(node.callee.body)));
}), seq(unique((function(uid) {
    return modify((function(node) {
        return expandCallee(uid, node.callee, node.args);
    }));
})), checkTop))));
addRewrite("CurryExpression", seq(visitChild("base"), visitChild("args"), when((function(node) {
    return isExpansion(node.base);
}), expand(M.node.map((function(node) {
    return node.base;
})), (function(base) {
    return modify((function(node) {
        return incCount(getUid(node.base), getExpansion(node.base), getExpansion(node.base)
            .value, ast_expression.CurryExpression.create(node.loc, base, node.args));
    }));
}))), when((function(node) {
    return (isLambda(node.base) || ((node.base.type === "LetExpression") && isLambda(node.base.body)));
}), seq(unique((function(uid) {
    return modify((function(node) {
        return expandCurry(uid, node.base, node.args);
    }));
})), checkTop))));
addRewrite("LetExpression", seq(visitChild("bindings"), visitChild("body"), modify((function(__o) {
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
addRewrite("ArgumentsPattern", seq(visitChild("id"), visitChild("elements"), visitChild("self")));
addRewrite("IdentifierPattern", extract((function(node) {
    return addBinding(getUid(node.id), null, true);
})));
addRewrite("ArrayExpression", visitChild("elements"));
addRewrite("ObjectExpression", visitChild("properties"));
addRewrite("ObjectValue", visitChild("value"));
addRewrite("Identifier", when((function(node) {
    return (getUid(node) && (!isExpansion(node)));
}), extract((function(node) {
    return getBinding(getUid(node))
        .chain((function(binding) {
            return (((binding && binding.value) && binding.simple) ? set(binding.value) : pass);
        }));
}))));
(_check = (function(node) {
    if (Array.isArray(node)) {
        if ((!node.length)) return pass;
        return seq(down, seqa(node.map((function(_, i) {
            return ((i === (node.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node instanceof Node) && peepholes[node.type])) return peepholes[node.type];
    return pass;
}));
var initialState = fun.foldl((function(s, name) {
    var id = builtins[name],
        def = definitions[name];
    return s.addBinding(getUid(id), markExpansion(id, 0, def), true);
}), State.empty, Object.keys(builtins));
(optimize = (function(ast, data) {
    return run(next(checkTop, extract((function(node) {
        return globals((function(g) {
            return unique((function(unique) {
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