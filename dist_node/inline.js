/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    array = require("bes")["array"],
    hashtrie = require("hashtrie"),
    __o = require("khepri-ast-zipper"),
    khepriZipper = __o["khepriZipper"],
    __o0 = require("neith")["walk"],
    neithWalk = __o0["walk"],
    tree = require("neith")["tree"],
    __o1 = require("khepri-ast")["node"],
    Node = __o1["Node"],
    setUserData = __o1["setUserData"],
    setData = __o1["setData"],
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
    builtins = require("./builtin"),
    __o3 = require("./ast"),
    isLambda = __o3["isLambda"],
    fun = require("./fun"),
    optimize, State = record.declare(null, ["bindings", "stack"]),
    M = ZipperT(StateT(Unique)),
    run = (function(c, ctx, seed) {
        return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), new(State)(hashtrie.empty, [])), seed);
    }),
    pass = M.of(null),
    node = M.node,
    modify = M.modifyNode,
    set = M.setNode,
    unique = M.liftInner(Unique.unique),
    addBinding = (function(uid, target) {
        return M.lift(M.inner.modify((function(s) {
            return s.setBindings(hashtrie.set(uid, target, s.bindings));
        })));
    }),
    getBinding = (function(uid) {
        return (uid ? M.lift(M.inner.get)
            .map((function(__o) {
                var bindings = __o["bindings"];
                return hashtrie.get(uid, bindings);
            })) : pass);
    }),
    stack = M.lift(M.inner.get)
        .map((function(s) {
            return s.stack;
        })),
    push = M.lift(M.inner.modify((function(s) {
        return s.setStack(array.push(s.stack, null));
    }))),
    pop = M.lift(M.inner.modify((function(s) {
        return s.setStack(array.pop(s.stack));
    }))),
    rewrite = (function(base, list, root) {
        return tree.node(neithWalk((function(ctx) {
            var node = tree.node(ctx);
            return (((node.ud && node.ud.uid) && (list.indexOf(node.ud.uid) !== -1)) ? tree.modifyNode(
                (function(node) {
                    return setData(node, "uid", ((base + "-") + node.ud.uid));
                }), ctx) : ctx);
        }), (function(x) {
            return x;
        }), khepriZipper(root)));
    }),
    peepholes = ({}),
    addPeephole = (function(types, up, test, f) {
        var entry = ({
            "condition": test,
            "up": up,
            "map": f
        });
        types.forEach((function(type) {
            (peepholes[type] = (peepholes[type] ? fun.concat(peepholes[type], entry) : [entry]));
        }));
    }),
    when = (function(test, body) {
        return node.chain((function(node) {
            return (test(node) ? body(node) : pass);
        }));
    }),
    always = (function(_) {
        return true;
    });
addPeephole(["UnaryOperatorExpression"], true, always, unique.chain((function(xUid) {
    return modify((function(node) {
        var arg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid);
        return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
                null, null, [ast_pattern.IdentifierPattern.create(null, arg)]), ast_expression.UnaryExpression
            .create(null, node.op, arg));
    }));
})));
addPeephole(["BinaryOperatorExpression"], true, always, unique.chain((function(xUid) {
    return unique.chain((function(yUid) {
        return modify((function(node) {
            var xArg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid),
                yArg = setData(ast_value.Identifier.create(null, "y"), "uid", yUid),
                kind = (((node.op === "||") || (node.op === "&&")) ? ast_expression.LogicalExpression
                    .create : ((node.op === ".") ? (function(loc, _, x, y) {
                        return ast_expression.MemberExpression.create(loc, x, y,
                            true);
                    }) : ((node.op === "@") ? (function(loc, _, x, y) {
                        return ast_expression.CurryExpression.create(loc, x, y);
                    }) : ((node.op === "new") ? (function(loc, _, x, y) {
                        return ast_expression.NewExpression.create(loc, x, [
                            y
                        ]);
                    }) : ast_expression.BinaryExpression.create))));
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg),
                    ast_pattern.IdentifierPattern.create(null, yArg)
                ]), (node.flipped ? kind(null, node.op, yArg, xArg) : kind(null, node.op,
                    xArg, yArg)));
        }));
    }));
})));
addPeephole(["VariableDeclarator"], true, (function(node) {
    return ((node.immutable && node.init) && isLambda(node.init));
}), node.chain((function(node) {
    return addBinding(node.id.ud.uid, node.init);
})));
addPeephole(["Binding"], true, (function(node) {
    return ((node.pattern.id && node.pattern.id.ud) && isLambda(node.value));
}), node.chain((function(node) {
    return addBinding(node.pattern.id.ud.uid, node.value);
})));
addPeephole(["CallExpression"], true, (function(node) {
    return isLambda(node.callee);
}), unique.chain((function(uid) {
    return modify((function(node) {
        var map = node.callee.params.elements.map((function(x) {
            return x.id.ud.uid;
        })),
            bindings = node.callee.params.elements.map((function(x, i) {
                return ast_declaration.Binding.create(null, rewrite(uid, map, x), (node.args[
                    i] ? node.args[i] : ast_value.Identifier.create(null,
                    "undefined")));
            }));
        return ast_expression.LetExpression.create(null, bindings, rewrite(uid, map, node.callee.body));
    }));
})));
addPeephole(["CallExpression"], true, (function(node) {
    return ((node.callee.type === "LetExpression") && (node.callee.body.type === "FunctionExpression"));
}), unique.chain((function(uid) {
    return modify((function(node) {
        var map = node.callee.body.params.elements.map((function(x) {
            return x.id.ud.uid;
        })),
            bindings = node.callee.body.params.elements.map((function(x, i) {
                return ast_declaration.Binding.create(null, rewrite(uid, map, x), (node.args[
                    i] ? node.args[i] : ast_value.Identifier.create(null,
                    "undefined")));
            }));
        return ast_expression.LetExpression.create(null, fun.concat(node.callee.bindings, bindings),
            rewrite(uid, map, node.callee.body.body));
    }));
})));
addPeephole(["CallExpression"], true, (function(__o) {
    var callee = __o["callee"];
    return (callee.type === "CurryExpression");
}), modify((function(node) {
    return ast_expression.CallExpression.create(null, node.callee.base, fun.concat((node.callee.args || []),
        node.args));
})));
addPeephole(["CallExpression"], true, (function(node) {
    return ((node.callee.type === "LetExpression") && (node.callee.body.type === "CurryExpression"));
}), modify((function(node) {
    var first = node.callee.body.params.elements[0],
        rest = node.base.body.params.elements.slice(1),
        body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
            null, null, rest, node.base.body.params.self), node.base.body.body);
    return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) || (first.type ===
            "ObjectPattern"))) ? ast_expression.LetExpression.create(null, fun.concat(node.base.bindings,
            ast_declaration.Binding.create(null, first, node.args[0])), body) : ast_expression.LetExpression
        .create(null, node.base.bindings, body));
})));
addPeephole(["CurryExpression"], true, (function(node) {
    return isLambda(node.base);
}), modify((function(node) {
    var first = node.base.params.elements[0],
        rest = node.base.params.elements.slice(1),
        body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
            null, null, rest, node.base.params.self), node.base.body);
    return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) || (first.type ===
        "ObjectPattern"))) ? ast_expression.LetExpression.create(null, [ast_declaration.Binding.create(
        null, first, node.args[0])], body) : body);
})));
addPeephole(["CurryExpression"], true, (function(node) {
    return ((node.base.type === "LetExpression") && isLambda(node.base.body));
}), modify((function(node) {
    var first = node.base.body.params.elements[0],
        rest = node.base.body.params.elements.slice(1),
        body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern.create(
            null, null, rest, node.base.body.params.self), node.base.body.body);
    return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) || (first.type ===
            "ObjectPattern"))) ? ast_expression.LetExpression.create(null, fun.concat(node.base.bindings,
            ast_declaration.Binding.create(null, first, node.args[0])), body) : ast_expression.LetExpression
        .create(null, node.base.bindings, body));
})));
var upTransforms = (function(node) {
    return ((node && peepholes[node.type]) || [])
        .filter((function(x) {
            return (x.up && x.condition(node));
        }));
}),
    downTransforms = (function(node) {
        return ((node && peepholes[node.type]) || [])
            .filter((function(x) {
                return ((!x.up) && x.condition(node));
            }));
    }),
    transform = (function(node, transforms) {
        return (transforms.length ? seqa(transforms.map((function(x) {
            return x.map;
        }))) : pass);
    }),
    _transform = node.chain((function(node) {
        return transform(node, downTransforms(node));
    })),
    _transformPost = node.chain((function(node) {
        return transform(node, upTransforms(node));
    }));
(optimize = (function(ast, data) {
    return run(next(walk(M, _transform, _transformPost), node), khepriZipper(ast), data.unique);
}));
(exports["optimize"] = optimize);