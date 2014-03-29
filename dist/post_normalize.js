/*
 * THIS FILE IS AUTO GENERATED from 'lib/post_normalize.kep'
 * DO NOT EDIT
*/define(["require", "exports", "neith/tree", "neith/walk", "neith/zipper", "khepri-ast-zipper", "khepri-ast/statement",
    "khepri-ast/expression", "khepri-ast/pattern", "khepri-ast/value", "./ast", "./fun", "./unpack", "./builtin"
], (function(require, exports, tree, __o, zipper, __o0, ast_statement, ast_expression, ast_pattern, ast_value, __o1,
    __o2, __o3, __o4) {
    "use strict";
    var walk = __o["walk"],
        khepriZipper = __o0["khepriZipper"],
        isBlockFunction = __o1["isBlockFunction"],
        concat = __o2["concat"],
        flattenr = __o2["flattenr"],
        filter = __o2["filter"],
        map = __o2["map"],
        innerPattern = __o3["innerPattern"],
        unpackParameters = __o3["unpackParameters"],
        builtins = __o4["builtins"],
        definitions = __o4["definitions"],
        normalize, expandBinding, DOWN = false,
        UP = true,
        always = (function(_) {
            return true;
        }),
        peepholes = ({}),
        addPeephole = (function(types, up, condition, f) {
            var entry = ({
                "condition": condition,
                "map": f,
                "up": up
            });
            types.forEach((function(type) {
                (peepholes[type] = concat((peepholes[type] || []), entry));
            }));
        });
    addPeephole(["LetExpression"], UP, always, ((expandBinding = (function(binding) {
        return innerPattern(binding.value, binding.pattern, binding.recursive);
    })), (function(node) {
        return ast_expression.LetExpression.create(node.loc, flattenr(map(expandBinding, node.bindings)),
            node.body);
    })));
    addPeephole(["FunctionExpression"], UP, always, (function(node) {
        var params = map((function(x) {
            switch (x.type) {
                case "IdentifierPattern":
                    return x;
                default:
                    return ast_pattern.IdentifierPattern.create(null, ((x.id && x.id.id) || x.ud
                        .id));
            }
        }), filter((function(x) {
            return (x.type !== "EllipsisPattern");
        }), node.params.elements)),
            bindings = unpackParameters(node.params.elements),
            body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement
                .create(null, bindings, node.body)
            ]) : ast_expression.LetExpression.create(null, bindings, node.body));
        return ast_expression.FunctionExpression.create(null, node.id, ast_pattern.ArgumentsPattern.create(
            null, node.params.id, params, node.params.self), body);
    }));
    var expandAssignment = (function(node) {
        var right;
        return ((node.right.type === "AssignmentExpression") ? ((right = expandAssignment(node.right)),
            concat(right, ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right
                .length - 1)].left))) : [node]);
    });
    addPeephole(["ExpressionStatement"], UP, (function(__o) {
        var expression = __o["expression"];
        return (expression.type === "AssignmentExpression");
    }), (function(node) {
        return ast_statement.BlockStatement.create(null, map(ast_statement.ExpressionStatement.create.bind(
            null, null), flattenr(expandAssignment(node.expression))));
    }));
    addPeephole(["BinaryExpression"], UP, (function(node) {
        return (node.operator === "|>");
    }), (function(__o) {
        var left = __o["left"],
            right = __o["right"];
        return ast_expression.CallExpression.create(null, right, [left]);
    }));
    addPeephole(["BinaryExpression"], UP, (function(node) {
        return (node.operator === "<|");
    }), (function(__o) {
        var left = __o["left"],
            right = __o["right"];
        return ast_expression.CallExpression.create(null, left, [right]);
    }));
    addPeephole(["BinaryExpression"], UP, (function(node) {
        return ((((node.operator === "\\>") || (node.operator === "\\>>")) || (node.operator === "<\\")) ||
            (node.operator === "<<\\"));
    }), (function(__o) {
        var operator = __o["operator"],
            left = __o["left"],
            right = __o["right"];
        return ast_expression.CallExpression.create(null, definitions[operator], [left, right]);
    }));
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
        transform = (function(ctx, transforms) {
            return (transforms.length ? tree.modifyNode((function(node) {
                return transforms.reduce((function(p, c) {
                    return c.map(p);
                }), node);
            }), ctx) : ctx);
        }),
        opt = walk.bind(null, (function(ctx) {
            var node = tree.node(ctx);
            return transform(ctx, downTransforms(node));
        }), (function(ctx) {
            var node = tree.node(ctx);
            return transform(ctx, upTransforms(node));
        }));
    (normalize = (function(ast) {
        return tree.node(zipper.root(opt(khepriZipper(ast))));
    }));
    (exports["normalize"] = normalize);
}));