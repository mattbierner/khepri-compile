/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/normalize/post_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/statement", "khepri-ast/expression", "../ast", "../fun",
    "../inline/unpack", "../builtin", "../rewriter"
], (function(require, exports, __o, ast_statement, ast_expression, __o0, __o1, __o2, __o3, __o4) {
    "use strict";
    var modify = __o["modify"],
        type = __o0["type"],
        isBlockFunction = __o0["isBlockFunction"],
        concat = __o1["concat"],
        flattenr = __o1["flattenr"],
        map = __o1["map"],
        innerPattern = __o2["innerPattern"],
        unpackParameters = __o2["unpackParameters"],
        builtins = __o3["builtins"],
        definitions = __o3["definitions"],
        UP = __o4["UP"],
        DOWN = __o4["DOWN"],
        Rewriter = __o4["Rewriter"],
        rewrite = __o4["rewrite"],
        normalize, x, y, expandBinding, getParameterNames = ((x = flattenr), (y = map.bind(null, (function(x0) {
            switch (x0.type) {
                case "IdentifierPattern":
                    return x0;
                case "AsPattern":
                    return x0.id;
                case "SliceUnpack":
                case "RelativeUnpack":
                    return [];
                default:
                    return x0.ud.id;
            }
        }))), (function(x0) {
            return x(y(x0));
        })),
        peepholes = new(Rewriter)(),
        always = (function(_) {
            return true;
        });
    peepholes.add(["LetExpression", "WithStatement"], UP, always, ((expandBinding = (function(binding) {
        return ((type(binding) === "ImportPattern") ? binding : innerPattern(binding.value,
            binding.pattern, binding.recursive));
    })), (function(node) {
        return modify(node, ({
            "bindings": flattenr(map(expandBinding, node.bindings))
        }));
    })));
    peepholes.add("FunctionExpression", UP, always, (function(node) {
        var params = getParameterNames(node.params.elements),
            bindings = unpackParameters(node.params.id, node.params.elements),
            body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement
                .create(null, bindings, node.body)
            ]) : ast_expression.LetExpression.create(null, bindings, node.body));
        return modify(node, ({
            params: modify(node.params, ({
                "elements": params
            })),
            body: body
        }));
    }));
    var expandAssignment = (function(node) {
        var right;
        return ((node.right.type === "AssignmentExpression") ? ((right = expandAssignment(node.right)),
            concat(right, ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right
                .length - 1)].left))) : [node]);
    });
    peepholes.add("ExpressionStatement", UP, (function(__o5) {
        var expression = __o5["expression"];
        return (expression.type === "AssignmentExpression");
    }), (function(node) {
        var node0, right;
        return ast_statement.BlockStatement.create(null, map(ast_statement.ExpressionStatement.create.bind(
            null, null), flattenr(((node0 = node.expression), ((node0.right.type ===
            "AssignmentExpression") ? ((right = expandAssignment(node0.right)),
            concat(right, ast_expression.AssignmentExpression.create(null, "=",
                node0.left, right[(right.length - 1)].left))) : [node0])))));
    }));
    peepholes.add("BinaryExpression", UP, (function(node) {
        return (node.operator === "|>");
    }), (function(__o5) {
        var left = __o5["left"],
            right = __o5["right"];
        return ast_expression.CallExpression.create(null, right, [left]);
    }));
    peepholes.add("BinaryExpression", UP, (function(node) {
        return (node.operator === "<|");
    }), (function(__o5) {
        var left = __o5["left"],
            right = __o5["right"];
        return ast_expression.CallExpression.create(null, left, [right]);
    }));
    peepholes.add("BinaryExpression", UP, (function(node) {
        return ((((node.operator === "\\>") || (node.operator === "\\>>")) || (node.operator === "<\\")) ||
            (node.operator === "<<\\"));
    }), (function(__o5) {
        var operator = __o5["operator"],
            left = __o5["left"],
            right = __o5["right"];
        return ast_expression.CallExpression.create(null, definitions[operator], [left, right]);
    }));
    (normalize = rewrite.bind(null, peepholes));
    (exports["normalize"] = normalize);
}));