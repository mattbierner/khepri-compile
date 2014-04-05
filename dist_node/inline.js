/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline.kep'
 * DO NOT EDIT
*/
"use strict";
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
    optimize, x, y, test, consequent, alternate, test0, consequent0, alternate0, test1, consequent1, alternate1,
        arithmetic, test2, consequent2, alternate2, test3, consequent3, alternate3, arithmetic0, test4, consequent4,
        alternate4, test5, consequent5, alternate5, test6, consequent6, alternate6, test7, consequent7, alternate7,
        test8, consequent8, alternate8, test9, exp, f, consequent9, alternate9, test10, consequent10, alternate10,
        test11, exp0, f0, consequent11, alternate11, test12, consequent12, alternate12, test13, consequent13,
        alternate13, test14, consequent14, alternate14, _check, State = record.declare(null, ["bindings", "working",
            "globals", "outer", "ctx"
        ]);
(State.empty = new(State)(binding.empty, binding.empty, hashtrie.empty, null, hashtrie.empty));
(State.prototype.addBinding = (function(uid, target) {
    var s = this;
    return s.setBindings(binding.setBinding(uid, target, s.bindings));
}));
(State.prototype.addWorking = (function(uid, target) {
    var s = this;
    return s.setWorking(binding.setBinding(uid, target, s.working));
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
        .setWorking(hashtrie.fold((function(p, __o6) {
            var key = __o6["key"];
            return hashtrie.set(key, null, p);
        }), s.outer.working, s.working));
}));
var M = ZipperT(StateT(Unique)),
    run = (function(c, ctx, state, seed) {
        return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), state), seed);
    }),
    pass = M.of(null),
    unique = M.liftInner(Unique.unique),
    getState = M.lift(M.inner.get),
    modifyState = ((x = M.lift), (y = M.inner.modify), (function(x0) {
        return x(y(x0));
    })),
    node = M.node,
    modify = M.modifyNode,
    set = M.setNode,
    up = M.up,
    down = M.down,
    right = M.right,
    moveChild = M.child,
    getChild = M.childNode,
    addBinding = (function(uid, value) {
        return modifyState((function(s) {
            return s.addBinding(uid, value);
        }));
    }),
    addWorking = (function(uid, value) {
        return modifyState((function(s) {
            return s.addWorking(uid, value);
        }));
    }),
    getBinding = (function(uid) {
        return (uid ? getState.map((function(__o6) {
            var bindings = __o6["bindings"],
                working = __o6["working"];
            return (binding.getBinding(uid, working) || binding.getBinding(uid, bindings));
        })) : pass);
    }),
    canPruneBinding = (function(binding0) {
        return (binding0 && isPrimitive(binding0));
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
    globals = getState.map((function(s) {
        return s.globals;
    })),
    addGlobal = (function(name) {
        return modifyState((function(s) {
            return s.setGlobals(hashtrie.set(name, name, s.globals));
        }));
    }),
    markExpansion = (function(id, count, target) {
        return setData(id, "expand", ({
            "count": count,
            "value": target
        }));
    }),
    getExpansion = getUd.bind(null, "expand"),
    isExpansion = getExpansion,
    getCtx = getState.map((function(s) {
        return s.ctx;
    })),
    modifyCtx = (function(f) {
        return modifyState((function(s) {
            return s.setCtx(f(s.ctx));
        }));
    }),
    canExpand = (function(exp, uid) {
        return getCtx.map((function(ctx) {
            return ((exp.count < 1) && (hashtrie.get(uid, ctx) < 1));
        }));
    }),
    pushCtx = (function(uid) {
        return modifyCtx((function(ctx) {
            return hashtrie.modify(uid, (function(x0) {
                return ((x0 + 1) || 1);
            }), ctx);
        }));
    }),
    popCtx = (function(uid) {
        return modifyCtx((function(ctx) {
            return hashtrie.modify(uid, (function(x0) {
                return ((x0 - 1) || 0);
            }), ctx);
        }));
    }),
    expandNode = (function(node0, f) {
        var uid, exp, exp0, uid0;
        return (isExpansion(node0) ? ((uid = getUid(node0)), (exp = getExpansion(node0)), ((exp0 = exp), (uid0 =
                uid), getCtx.map((function(ctx) {
                return ((exp0.count < 1) && (hashtrie.get(uid0, ctx) < 1));
            })))
            .chain((function(can) {
                return (can ? f(exp.value) : f(setData(node0, "expand", null)));
            }))) : f(node0));
    }),
    expand = (function(exp, f) {
        return exp.chain((function(node0) {
            return expandNode(node0, f);
        }));
    }),
    child = (function(edge) {
        var args = arguments;
        return seq(moveChild(edge), seqa([].slice.call(args, 1)), up);
    }),
    checkTop = node.chain((function(x0) {
        return _check(x0);
    })),
    visitChild = (function(edge) {
        return child(edge, checkTop);
    }),
    when = (function(test, consequent, alternate) {
        return node.chain((function(node0) {
            return (test(node0) ? consequent : (alternate || pass));
        }));
    }),
    addBindingForNode = (function(id, value) {
        var uid = getUid(id);
        return (isPrimitive(value) ? addBinding(uid, value) : (isLambda(value) ? addBinding(uid, markExpansion(id,
            0, value)) : ((value.type === "Identifier") ? getBinding(getUid(value))
            .chain((function(binding0) {
                return (binding0 ? addBinding(uid, binding0) : pass);
            })) : pass)));
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
addRewrite.bind(null, "UnaryOperatorExpression")(seq(node.chain((function(__o6) {
    var op = __o6["op"];
    return seq(addGlobal(op), set(builtins[op]));
})), checkTop));
addRewrite.bind(null, "BinaryOperatorExpression")(seq(node.chain((function(__o6) {
    var op = __o6["op"],
        flipped = __o6["flipped"],
        name = (flipped ? ("_" + op) : op);
    return seq(addGlobal(name), set(builtins[name]));
})), checkTop));
addRewrite.bind(null, "TernaryOperatorExpression")(seq(modifyState((function(s) {
    return s.setGlobals(hashtrie.set("?", "?", s.globals));
})), set(builtins["?"]), checkTop));
addRewrite.bind(null, "Program")(child("body", checkTop));
addRewrite.bind(null, "Package")(child("body", checkTop));
addRewrite.bind(null, "SwitchCase")(seq(child("test", checkTop), child("consequent", checkTop)));
addRewrite.bind(null, "CatchClause")(seq(child("param", checkTop), child("body", checkTop)));
addRewrite.bind(null, "VariableDeclaration")(child("declarations", checkTop));
addRewrite.bind(null, "VariableDeclarator")(seq(child("init", checkTop), ((test = (function(node0) {
    return node0.init;
})), (consequent = node.chain((function(node0) {
    return (node0.immutable ? seq(addBindingForNode(node0.id, node0.init), (canPruneBinding(
        node0.init) ? set([]) : pass)) : addWorking(getUid(node0.id), node0.init));
}))), (alternate = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), node1.init) ? consequent : (alternate || pass));
})))));
addRewrite.bind(null, "Binding")(seq(child("value", checkTop), ((test0 = (function(node0) {
    return ((node0.pattern.type === "IdentifierPattern") && getUid(node0.pattern.id));
})), (consequent0 = node.chain((function(node0) {
    return seq(addBindingForNode(node0.pattern.id, node0.value), (canPruneBinding(node0.value) ?
        set([]) : pass));
}))), (alternate0 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), ((node1.pattern.type === "IdentifierPattern") && getUid(node1.pattern
        .id))) ? consequent0 : (alternate0 || pass));
}))), ((test1 = (function(node0) {
    return ((node0 && (node0.type === "Binding")) && (node0.value.type === "LetExpression"));
})), (consequent1 = node.chain((function(node0) {
    var bindings = fun.flatten(fun.concat(node0.value.bindings, ast_declaration.Binding.create(
        null, node0.pattern, node0.value.body)));
    return seq(set(bindings), visitChild((bindings.length - 1)));
}))), (alternate1 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), ((node1 && (node1.type === "Binding")) && (node1.value.type ===
        "LetExpression"))) ? consequent1 : (alternate1 || pass));
})))));
addRewrite.bind(null, "BlockStatement")(child("body", checkTop));
addRewrite.bind(null, "ExpressionStatement")(child("expression", checkTop));
addRewrite.bind(null, "WithStatement")(seq(child("bindings", checkTop), child("body", checkTop)));
addRewrite.bind(null, "SwitchStatement")(seq(child("discriminant", checkTop), child("cases", checkTop)));
addRewrite.bind(null, ["ReturnStatement", "ThrowStatement"])(child("argument", checkTop));
addRewrite.bind(null, "TryStatement")(seq(child("block", checkTop), child("handler", checkTop), child("finalizer",
    checkTop)));
addRewrite.bind(null, "WhileStatement")(block(child("test", checkTop), child("body", checkTop)));
addRewrite.bind(null, "DoWhileStatement")(block(child("body", checkTop), child("test", checkTop)));
addRewrite.bind(null, "ForStatement")(seq(child("init", checkTop), block(child("test", checkTop), child("update",
    checkTop), child("body", checkTop))));
addRewrite.bind(null, "FunctionExpression")(block(child("id", checkTop), child("params", checkTop), child("body",
    checkTop)));
addRewrite.bind(null, "UnaryExpression")(((arithmetic = ({
    "!": __lnot,
    "~": __bnot,
    "typeof": __typeof,
    "++": __plus,
    "--": __minus
})), seq(child("argument", checkTop), ((test2 = (function(__o6) {
    var operator = __o6["operator"],
        argument = __o6["argument"];
    return (arithmetic[operator] && isPrimitive(argument));
})), (consequent2 = modify((function(__o6) {
    var operator = __o6["operator"],
        argument = __o6["argument"],
        value = arithmetic[operator](argument.value);
    return ast_value.Literal.create(null, (typeof value), value);
}))), (alternate2 = undefined), node.chain((function(node0) {
    var __o6, operator, argument;
    return (((__o6 = node0), (operator = __o6["operator"]), (argument = __o6["argument"]), (
        arithmetic[operator] && isPrimitive(argument))) ? consequent2 : (alternate2 || pass));
}))))));
addRewrite.bind(null, "AssignmentExpression")(seq(child("right", checkTop), ((test3 = (function(__o6) {
    var left = __o6["left"];
    return (left.type === "Identifier");
})), (consequent3 = node.chain((function(node0) {
    return addWorking(getUid(node0.left), node0.right);
}))), (alternate3 = undefined), node.chain((function(node0) {
    var __o6, left;
    return (((__o6 = node0), (left = __o6["left"]), (left.type === "Identifier")) ? consequent3 : (
        alternate3 || pass));
})))));
addRewrite.bind(null, ["LogicalExpression", "BinaryExpression"])(((arithmetic0 = ({
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
})), seq(child("left", checkTop), child("right", checkTop), ((test4 = (function(__o6) {
    var operator = __o6["operator"],
        left = __o6["left"],
        right0 = __o6["right"];
    return ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(right0));
})), (consequent4 = modify((function(__o6) {
    var operator = __o6["operator"],
        left = __o6["left"],
        right0 = __o6["right"],
        value = arithmetic0[operator](left.value, right0.value);
    return ast_value.Literal.create(null, (typeof value), value);
}))), (alternate4 = undefined), node.chain((function(node0) {
    var __o6, operator, left, right0;
    return (((__o6 = node0), (operator = __o6["operator"]), (left = __o6["left"]), (right0 =
        __o6["right"]), ((arithmetic0[operator] && isPrimitive(left)) && isPrimitive(
        right0))) ? consequent4 : (alternate4 || pass));
}))))));
addRewrite.bind(null, ["ConditionalExpression", "IfStatement"])(seq(child("test", checkTop), ((test5 = (function(node0) {
    return isPrimitive(node0.test);
})), (consequent5 = node.chain((function(__o6) {
    var test6 = __o6["test"],
        consequent6 = __o6["consequent"],
        alternate5 = __o6["alternate"];
    return seq(set((isTruthy(test6) ? consequent6 : alternate5)), checkTop);
}))), (alternate5 = seq(child("consequent", checkTop), child("alternate", checkTop))), node.chain((function(
    node0) {
    var node1;
    return (((node1 = node0), isPrimitive(node1.test)) ? consequent5 : (alternate5 || pass));
})))));
addRewrite.bind(null, "MemberExpression")(seq(child("object", checkTop), ((test6 = (function(node0) {
    return node0.computed;
})), (consequent6 = child("property", checkTop)), (alternate6 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), node1.computed) ? consequent6 : (alternate6 || pass));
}))), ((test7 = (function(node0) {
    return ((node0.computed && (node0.object.type === "ArrayExpression")) && isNumberish(node0.property));
})), (consequent7 = modify((function(node0) {
    return (node0.object.elements[node0.property.value] || ast_value.Identifier.create(null,
        "undefined"));
}))), (alternate7 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), ((node1.computed && (node1.object.type === "ArrayExpression")) &&
        isNumberish(node1.property))) ? consequent7 : (alternate7 || pass));
}))), ((test8 = (function(node0) {
    return ((node0.computed && ((node0.object.type === "Literal") && (node0.object.kind ===
        "string"))) && isNumberish(node0.property));
})), (consequent8 = modify((function(node0) {
    var str = node0.object.value,
        idx = node0.property.value;
    return ((idx < str.length) ? ast_value.Literal.create(null, "string", str[idx]) : ast_value
        .Identifier.create(null, "undefined"));
}))), (alternate8 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), ((node1.computed && ((node1.object.type === "Literal") && (node1.object
        .kind === "string"))) && isNumberish(node1.property))) ? consequent8 : (alternate8 ||
        pass));
})))));
addRewrite.bind(null, "NewExpression")(seq(child("callee", checkTop), child("args", checkTop)));
addRewrite.bind(null, "CallExpression")(seq(child("callee", checkTop), child("args", checkTop), ((test9 = (function(
    node0) {
    return isExpansion(node0.callee);
})), (exp = node.map((function(node0) {
    return node0.callee;
}))), (f = (function(callee) {
    return modify((function(node0) {
        return incCount(getUid(node0.callee), (getExpansion(node0.callee)
                .count || 1), getExpansion(node0.callee)
            .countvalue, ast_expression.CallExpression.create(node0.loc, callee, node0.args)
        );
    }));
})), (consequent9 = exp.chain((function(node0) {
    return expandNode(node0, f);
}))), (alternate9 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), isExpansion(node1.callee)) ? consequent9 : (alternate9 || pass));
}))), ((test10 = (function(node0) {
    return (isLambda(node0.callee) || ((node0.callee.type === "LetExpression") && isLambda(node0.callee
        .body)));
})), (consequent10 = seq(unique.chain((function(uid) {
    return modify((function(node0) {
        return expandCallee(uid, node0.callee, node0.args);
    }));
})), checkTop)), (alternate10 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), (isLambda(node1.callee) || ((node1.callee.type === "LetExpression") &&
        isLambda(node1.callee.body)))) ? consequent10 : (alternate10 || pass));
})))));
addRewrite.bind(null, "CurryExpression")(seq(child("base", checkTop), child("args", checkTop), ((test11 = (function(
    node0) {
    return isExpansion(node0.base);
})), (exp0 = node.map((function(node0) {
    return node0.base;
}))), (f0 = (function(base) {
    return modify((function(node0) {
        return incCount(getUid(node0.base), getExpansion(node0.base), getExpansion(node0.base)
            .value, ast_expression.CurryExpression.create(node0.loc, base, node0.args));
    }));
})), (consequent11 = exp0.chain((function(node0) {
    return expandNode(node0, f0);
}))), (alternate11 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), isExpansion(node1.base)) ? consequent11 : (alternate11 || pass));
}))), ((test12 = (function(node0) {
    return (isLambda(node0.base) || ((node0.base.type === "LetExpression") && isLambda(node0.base.body)));
})), (consequent12 = seq(unique.chain((function(uid) {
    return modify((function(node0) {
        return expandCurry(uid, node0.base, node0.args);
    }));
})), checkTop)), (alternate12 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), (isLambda(node1.base) || ((node1.base.type === "LetExpression") &&
        isLambda(node1.base.body)))) ? consequent12 : (alternate12 || pass));
})))));
addRewrite.bind(null, "LetExpression")(seq(child("bindings", checkTop), child("body", checkTop), modify((function(__o6) {
    var loc = __o6["loc"],
        bindings = __o6["bindings"],
        body = __o6["body"];
    return ast_expression.LetExpression.create(loc, flattenr(bindings), body);
})), ((test13 = (function(__o6) {
    var bindings = __o6["bindings"];
    return (!bindings.length);
})), (consequent13 = modify((function(__o6) {
    var body = __o6["body"];
    return body;
}))), (alternate13 = undefined), node.chain((function(node0) {
    var __o6, bindings;
    return (((__o6 = node0), (bindings = __o6["bindings"]), (!bindings.length)) ? consequent13 : (
        alternate13 || pass));
})))));
addRewrite.bind(null, "ArrayExpression")(child("elements", checkTop));
addRewrite.bind(null, "ObjectExpression")(child("properties", checkTop));
addRewrite.bind(null, "ObjectValue")(child("value", checkTop));
addRewrite.bind(null, "Identifier")(((test14 = (function(node0) {
    return (getUid(node0) && (!isExpansion(node0)));
})), (consequent14 = node.chain((function(node0) {
    return getBinding(getUid(node0))
        .chain((function(binding0) {
            return ((binding0 && ((isPrimitive(binding0) || (binding0.type === "Identifier")) ||
                isLambda(binding0))) ? set(binding0) : pass);
        }));
}))), (alternate14 = undefined), node.chain((function(node0) {
    var node1;
    return (((node1 = node0), (getUid(node1) && (!isExpansion(node1)))) ? consequent14 : (alternate14 ||
        pass));
}))));
(_check = (function(node0) {
    if (Array.isArray(node0)) {
        if ((!node0.length)) return pass;
        return seq(down, seqa(node0.map((function(_, i) {
            return ((i === (node0.length - 1)) ? checkTop : next(checkTop, right));
        }))), up);
    }
    if (((node0 instanceof Node) && peepholes[node0.type])) return peepholes[node0.type];
    return pass;
}));
var initialState = fun.foldl((function(s, name) {
    var id = builtins[name],
        def = definitions[name];
    return s.setBindings(hashtrie.set(getUid(id), markExpansion(id, 0, def), s.bindings));
}), State.empty, Object.keys(builtins));
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