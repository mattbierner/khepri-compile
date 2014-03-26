/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "hashtrie", "khepri-ast-zipper", "neith/walk", "neith/tree", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "akh/base", "akh/unique", "akh/trans/state", "zipper-m/trans/zipper", "zipper-m/walk",
    "./builtin", "./fun", "./unpack"
], (function(require, exports, hashtrie, __o, __o0, tree, __o1, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_value, __o2, Unique, StateT, ZipperT, walk, builtins, fun, innerPattern) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        neithWalk = __o0["walk"],
        Node = __o1["Node"],
        setUserData = __o1["setUserData"],
        setData = __o1["setData"],
        next = __o2["next"],
        seq = __o2["sequence"],
        seqa = __o2["sequencea"],
        optimize, M = ZipperT(StateT(Unique)),
        run = (function(c, ctx, seed) {
            return Unique.runUnique(StateT.evalStateT(ZipperT.runZipperT(c, ctx), hashtrie.empty), seed);
        }),
        pass = M.of(null),
        node = M.node,
        modify = M.modifyNode,
        set = M.setNode,
        unique = M.liftInner(Unique.unique),
        addBinding = (function(uid, target) {
            return M.lift(M.inner.modify((function(bindings) {
                return hashtrie.set(uid, target, bindings);
            })));
        }),
        getBinding = (function(uid) {
            return M.lift(M.inner.get)
                .map((function(bindings) {
                    return hashtrie.get(uid, bindings);
                }));
        }),
        peepholes = ({}),
        addPeephole = (function(types, up, condition, f) {
            var entry = ({
                "condition": condition,
                "map": f,
                "up": up
            });
            types.forEach((function(type) {
                (peepholes[type] = (peepholes[type] ? fun.concat(peepholes[type], entry) : [entry]));
            }));
        }),
        rewrite = (function(base, list, root) {
            return tree.node(neithWalk((function(ctx) {
                var node = tree.node(ctx);
                return (((node.ud && node.ud.uid) && (list.indexOf(node.ud.uid) !== -1)) ? tree
                    .modifyNode((function(node) {
                        return setData(node, "uid", ((base + "-") + node.ud.uid));
                    }), ctx) : ctx);
            }), (function(x) {
                return x;
            }), khepriZipper(root)));
        }),
        isPrimitive = (function(node) {
            return ((node.type === "Literal") && ((((node.kind === "string") || (node.kind === "number")) ||
                (node.kind === "boolean")) || (node.kind === "null")));
        }),
        isTruthy = (function(node) {
            return (isPrimitive(node) && (!(!node.value)));
        }),
        arithmetic = ({
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
            "%": "%",
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
        });
    addPeephole(["BinaryExpression", "LogicalExpression"], true, (function(__o) {
        var operator = __o["operator"],
            left = __o["left"],
            right = __o["right"];
        return ((arithmetic[operator] && isPrimitive(left)) && isPrimitive(right));
    }), modify((function(__o) {
        var operator = __o["operator"],
            left = __o["left"],
            right = __o["right"],
            value = arithmetic[operator](left.value, right.value);
        return ast_value.Literal.create(null, (typeof value), value);
    })));
    var arithmetic0 = ({
        "!": (function(x) {
            return (!x);
        }),
        "~": (function(x) {
            return (~x);
        }),
        "typeof": (function(x) {
            return (typeof x);
        }),
        "+": (function(x) {
            return (+x);
        }),
        "-": (function(x) {
            return (-x);
        })
    });
    addPeephole(["UnaryExpression"], true, (function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"];
        return (arithmetic0[operator] && isPrimitive(argument));
    }), modify((function(__o) {
        var operator = __o["operator"],
            argument = __o["argument"],
            value = arithmetic0[operator](argument.value);
        return ast_value.Literal.create(null, (typeof value), value);
    })));
    addPeephole(["IfStatement"], true, (function(node) {
        return isPrimitive(node.test);
    }), modify((function(__o) {
        var test = __o["test"],
            consequent = __o["consequent"],
            alternate = __o["alternate"];
        return (isTruthy(test) ? consequent : alternate);
    })));
    addPeephole(["ConditionalExpression"], true, (function(node) {
        return isPrimitive(node.test);
    }), modify((function(__o) {
        var test = __o["test"],
            consequent = __o["consequent"],
            alternate = __o["alternate"];
        return (isTruthy(test) ? consequent : alternate);
    })));
    addPeephole(["VariableDeclarator"], true, (function(node) {
        return ((node.immutable && node.init) && ((((node.init.type === "Identifier") && (node.init.ud.uid !==
            node.id.ud.uid)) || isPrimitive(node.init)) || (node.init.type ===
            "FunctionExpression")));
    }), node.chain((function(node) {
        return seq(addBinding(node.id.ud.uid, node.init));
    })));
    addPeephole(["Binding"], true, (function(node) {
        return ((node.pattern.type === "IdentifierPattern") && (((node.value.type === "Identifier") &&
            (node.value.ud.uid !== node.pattern.id.ud.uid)) || isPrimitive(node.value)));
    }), node.chain((function(node) {
        return seq(addBinding(node.pattern.id.ud.uid, node.value), set(null));
    })));
    addPeephole(["Identifier"], true, (function(node) {
        return (node.ud && node.ud.uid);
    }), node.chain((function(node) {
        return getBinding(node.ud.uid)
            .chain((function(binding) {
                return ((binding && (binding.type !== "FunctionExpression")) ? set(binding) :
                    pass);
            }));
    })));
    addPeephole(["LetExpression"], true, (function(node) {
        return true;
    }), modify((function(node) {
        return ast_expression.LetExpression.create(null, fun.flatten(node.bindings), node.body);
    })));
    addPeephole(["CallExpression"], false, (function(node) {
        return (node.callee.type === "Identifier");
    }), node.chain((function(node) {
        return getBinding(node.callee.ud.uid)
            .chain((function(binding) {
                return (binding ? modify((function(node) {
                    return ast_expression.CallExpression.create(null, binding,
                        node.args);
                })) : pass);
            }));
    })));
    addPeephole(["CallExpression"], false, (function(node) {
        return (((node.callee.type === "FunctionExpression") && (node.callee.body.type !==
            "BlockStatement")) && (!node.callee.params.self));
    }), unique.chain((function(uid) {
        return modify((function(node) {
            var bindings = node.callee.params.elements.map((function(x, i) {
                return ast_declaration.Binding.create(null, x, (node.args[i] ? node
                    .args[i] : ast_value.Identifier.create(null, "undefined")));
            }));
            return rewrite(uid, bindings.map((function(x) {
                return x.pattern.id.ud.uid;
            })), ast_expression.LetExpression.create(null, bindings, node.callee.body));
        }));
    })));
    addPeephole(["ReturnStatement"], false, (function(node) {
        return (node.argument && (node.argument.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.argument.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ReturnStatement.create(node.loc, node.argument.body)]));
    })));
    addPeephole(["FunctionExpression"], false, (function(node) {
        return (node.body.type === "LetExpression");
    }), modify((function(node) {
        return ast_expression.FunctionExpression.create(null, node.id, node.params, ast_statement.BlockStatement
            .create(null, [ast_statement.WithStatement.create(null, node.body.bindings,
                ast_statement.BlockStatement.create(null, [ast_statement.ReturnStatement.create(
                    node.loc, node.body.body)]))]));
    })));
    addPeephole(["ExpressionStatement"], true, (function(node) {
        return (node.expression && (node.expression.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.expression.bindings, ast_statement.BlockStatement
            .create(null, [ast_statement.ExpressionStatement.create(node.loc, node.expression.body)])
        );
    })));
    addPeephole(["ExpressionStatement"], true, (function(node) {
        return ((node.expression && (node.expression.type === "AssignmentExpression")) && (node.expression
            .right.type === "LetExpression"));
    }), modify((function(node) {
        return ast_statement.WithStatement.create(null, node.expression.right.bindings,
            ast_statement.BlockStatement.create(null, [ast_statement.ExpressionStatement.create(
                node.loc, ast_expression.AssignmentExpression.create(node.expression.loc,
                    node.expression.operator, node.expression.left, node.expression.right.body
                ))]));
    })));
    addPeephole(["LetExpression"], true, (function(node) {
        return (node.body.type === "LetExpression");
    }), modify((function(node) {
        return ast_expression.LetExpression.create(null, fun.concat(node.bindings, node.body.bindings),
            node.body.body);
    })));
    addPeephole(["UnaryOperatorExpression"], true, (function(_) {
        return true;
    }), unique.chain((function(xUid) {
        return modify((function(node) {
            var arg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid);
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, [ast_pattern.IdentifierPattern.create(null, arg)]),
                ast_expression.UnaryExpression.create(null, node.op, arg));
        }));
    })));
    addPeephole(["BinaryOperatorExpression"], true, (function(_) {
        return true;
    }), unique.chain((function(xUid) {
        return unique.chain((function(yUid) {
            return modify((function(node) {
                var xArg = setData(ast_value.Identifier.create(null, "x"), "uid",
                    xUid),
                    yArg = setData(ast_value.Identifier.create(null, "y"), "uid",
                        yUid),
                    kind = (((node.op === "||") || (node.op === "&&")) ?
                        ast_expression.LogicalExpression.create : ((node.op === ".") ?
                            (function(loc, _, x, y) {
                                return ast_expression.MemberExpression.create(
                                    loc, x, y, true);
                            }) : ((node.op === "@") ? (function(loc, _, x, y) {
                                return ast_expression.CurryExpression.create(
                                    loc, x, y);
                            }) : ((node.op === "new") ? (function(loc, _, x, y) {
                                return ast_expression.NewExpression.create(
                                    loc, x, [y]);
                            }) : ast_expression.BinaryExpression.create))));
                return ast_expression.FunctionExpression.create(null, null,
                    ast_pattern.ArgumentsPattern.create(null, null, [ast_pattern.IdentifierPattern
                        .create(null, xArg), ast_pattern.IdentifierPattern.create(
                            null, yArg)
                    ]), (node.flipped ? kind(null, node.op, yArg, xArg) : kind(null,
                        node.op, xArg, yArg)));
            }));
        }));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return ((node.base.type === "FunctionExpression") && (!node.base.params.id));
    }), modify((function(node) {
        var first = node.base.params.elements[0],
            rest = node.base.params.elements.slice(1),
            body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, rest, node.base.params.self), node.base.body);
        return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
            (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(null, [
            ast_declaration.Binding.create(null, first, node.args[0])
        ], body) : body);
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return (((node.base.type === "LetExpression") && (node.base.body.type === "FunctionExpression")) &&
            (!node.base.body.params.id));
    }), modify((function(node) {
        var first = node.base.body.params.elements[0],
            rest = node.base.body.params.elements.slice(1),
            body = ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, rest, node.base.body.params.self), node.base.body.body);
        return ((first && (((first.type === "IdentifierPattern") || (first.type === "AsPattern")) ||
            (first.type === "ObjectPattern"))) ? ast_expression.LetExpression.create(null, fun.concat(
                node.base.bindings, ast_declaration.Binding.create(null, first, node.args[0])),
            body) : ast_expression.LetExpression.create(null, node.base.bindings, body));
    })));
    addPeephole(["CurryExpression"], true, (function(node) {
        return (node.base.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CurryExpression.create(null, node.base.base, fun.concat(node.base.args,
            node.args));
    })));
    addPeephole(["BinaryExpression"], true, (function(node) {
        return ((node.operator === "|>") && (node.right.type === "CurryExpression"));
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.right.base, fun.concat((node.right.args || []),
            node.left));
    })));
    addPeephole(["BinaryExpression"], true, (function(__o) {
        var operator = __o["operator"],
            left = __o["left"];
        return ((operator === "<|") && (left.type === "CurryExpression"));
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.left.base, fun.concat((node.left.args || []),
            node.right));
    })));
    addPeephole(["CallExpression"], true, (function(__o) {
        var callee = __o["callee"];
        return (callee.type === "CurryExpression");
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, node.callee.base, fun.concat((node.callee
            .args || []), node.args));
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
            var t = downTransforms(node);
            return (t.length ? next(transform(node, [t[0]]), _transform) : pass);
        })),
        _transformPost = node.chain((function(node) {
            return transform(node, upTransforms(node));
        }));
    (optimize = (function(ast, data) {
        return run(next(walk(M, _transform, _transformPost), node), khepriZipper(ast), data.unique);
    }));
    (exports["optimize"] = optimize);
}));