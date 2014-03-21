/*
 * THIS FILE IS AUTO GENERATED from 'lib/khepri_peep.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "neith/tree", "neith/zipper", "khepri-ast-zipper", "khepri-ast/node",
    "khepri-ast/declaration", "khepri-ast/statement", "khepri-ast/expression", "khepri-ast/pattern",
    "khepri-ast/value", "akh/state", "./fun", "./tail"
], (function(require, exports, record, tree, zipper, __o, __o0, ast_declaration, ast_statement, ast_expression,
    ast_pattern, ast_value, StateM, fun, __o1) {
    "use strict";
    var modifyNode = tree["modifyNode"],
        khepriZipper = __o["khepriZipper"],
        Node = __o0["Node"],
        setUserData = __o0["setUserData"],
        setData = __o0["setData"],
        Tail = __o1["Tail"],
        trampoline = __o1["trampoline"],
        optimize, State = record.declare(null, ["ctx", "unique"]),
        run = StateM.evalState,
        bind = StateM.chain,
        pass = StateM.of(null),
        binary = (function(a, b, f) {
            return a.chain((function(x) {
                return b.chain((function(y) {
                    return f(x, y);
                }));
            }));
        }),
        next = (function(p, c) {
            return p.chain(fun.constant(c));
        }),
        seqa = (function(arr) {
            return fun.reduce(arr, next);
        }),
        seq = (function() {
            var args = arguments;
            return seqa(args);
        }),
        modifyState = (function(f) {
            return StateM.get.chain((function(s) {
                return StateM.put(f(s));
            }));
        }),
        get = (function(op) {
            return StateM.get.map((function(s) {
                return op(s.ctx);
            }));
        }),
        node = get(tree.node),
        move = (function(op) {
            return modifyState((function(s) {
                return State.setCtx(s, op(s.ctx));
            }));
        }),
        modify = (function(f) {
            return move(tree.modifyNode.bind(null, f));
        }),
        ctx = StateM.get.map((function(s) {
            return s.ctx;
        })),
        unique = StateM.get.chain((function(x) {
            return next(StateM.get.chain((function(s) {
                return StateM.put(s.setUnique((s.unique + 1))(StateM.of(x)));
            })));
        })),
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
        });
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
    }), bind(unique, (function(xUid) {
        return modify((function(node) {
            var arg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid);
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, [ast_pattern.IdentifierPattern.create(null, arg)]),
                ast_expression.UnaryExpression.create(null, node.op, arg));
        }));
    })));
    addPeephole(["BinaryOperatorExpression"], true, (function(_) {
        return true;
    }), binary(unique, unique, (function(xUid, yUid) {
        return modify((function(node) {
            var xArg = setData(ast_value.Identifier.create(null, "x"), "uid", xUid),
                yArg = setData(ast_value.Identifier.create(null, "y"), "uid", yUid),
                kind = (((node.op === "||") || (node.op === "&&")) ? ast_expression.LogicalExpression
                    .create : ((node.op === ".") ? (function(loc, _, x, y) {
                        return ast_expression.MemberExpression.create(loc, x, y,
                            true);
                    }) : ast_expression.BinaryExpression.create));
            return ast_expression.FunctionExpression.create(null, null, ast_pattern.ArgumentsPattern
                .create(null, null, [ast_pattern.IdentifierPattern.create(null, xArg),
                    ast_pattern.IdentifierPattern.create(null, yArg)
                ]), kind(null, node.op, xArg, yArg));
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
        return ast_expression.CallExpression.create(null, ((node.right.type === "CurryExpression") ?
            node.right.base : node.right), fun.concat((node.right.args || []), node.left));
    })));
    addPeephole(["BinaryExpression"], true, (function(__o) {
        var operator = __o["operator"],
            left = __o["left"];
        return ((operator === "<|") && (left.type === "CurryExpression"));
    }), modify((function(node) {
        return ast_expression.CallExpression.create(null, ((node.left.type === "CurryExpression") ?
            node.left.base : node.left), fun.concat((node.left.args || []), node.right));
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
        walk = (function(pre, post) {
            return next(pre, bind(ctx, (function(t) {
                if (zipper.isLeaf(t)) {
                    var loop = next(post, bind(ctx, (function(t) {
                        if (zipper.isLast(t)) {
                            if (zipper.isRoot(t)) return pass;
                            return next(move(zipper.up), loop);
                        } else {
                            return next(move(zipper.right), walk(pre, post));
                        }
                    })));
                    return loop;
                }
                return next(move(zipper.down), walk(pre, post));
            })));
        }),
        _transform = bind(node, (function(node) {
            return transform(node, downTransforms(node));
        })),
        _transformPost = bind(node, (function(node) {
            return transform(node, upTransforms(node));
        })),
        opt = walk.bind(null, _transform, _transformPost);
    (optimize = (function(ast, data) {
        var s = State.create(khepriZipper(ast), data.unique),
            r = run(next(walk(_transform, _transformPost), node), s);
        console.log(r);
        return r;
    }));
    (exports["optimize"] = optimize);
}));