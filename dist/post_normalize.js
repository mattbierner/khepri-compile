/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/post_normalize.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast-zipper", "khepri-ast/node", "khepri-ast/statement", "khepri-ast/expression",
    "khepri-ast/pattern", "khepri-ast/value", "./ast", "./fun", "./unpack", "./builtin", "./rewriter"
], (function(require, exports, __o, __o0, ast_statement, ast_expression, ast_pattern, ast_value, __o1, __o2, __o3,
    __o4, __o5) {
    "use strict";
    var khepriZipper = __o["khepriZipper"],
        modify = __o0["modify"],
        type = __o1["type"],
        isBlockFunction = __o1["isBlockFunction"],
        concat = __o2["concat"],
        flattenr = __o2["flattenr"],
        filter = __o2["filter"],
        map = __o2["map"],
        innerPattern = __o3["innerPattern"],
        unpackParameters = __o3["unpackParameters"],
        builtins = __o4["builtins"],
        definitions = __o4["definitions"],
        UP = __o5["UP"],
        DOWN = __o5["DOWN"],
        Rewriter = __o5["Rewriter"],
        rewrite = __o5["rewrite"],
        normalize, expandBinding, always = (function(_) {
            return true;
        }),
        peepholes = new(Rewriter)();
    peepholes.add(["LetExpression", "WithStatement"], UP, always, ((expandBinding = (function(binding) {
        return ((binding.type === "ImportPattern") ? binding : innerPattern(binding.value,
            binding.pattern, binding.recursive));
    })), (function(node) {
        return modify(node, ({
            "bindings": flattenr(map(expandBinding, node.bindings))
        }), ({}));
    })));
    var splitArrayPattern = (function(elements) {
        var indx = elements.map(type)
            .indexOf("EllipsisPattern");
        return ((indx < 0) ? [elements, null, []] : [elements.slice(0, indx), elements[indx], elements.slice(
            (indx + 1))]);
    });
    peepholes.add("FunctionExpression", UP, always, (function(node) {
        var __o6 = splitArrayPattern(node.params.elements),
            pre = __o6[0],
            mid = __o6[1],
            post = __o6[2],
            params = map((function(x) {
                switch (x.type) {
                    case "IdentifierPattern":
                        return x;
                    case "AsPattern":
                        return x.id;
                    default:
                        return x.ud.id;
                }
            }), pre),
            bindings = unpackParameters(node.params.id, pre, mid, post),
            body = (isBlockFunction(node) ? ast_statement.BlockStatement.create(null, [ast_statement.WithStatement
                .create(null, bindings, node.body)
            ]) : ast_expression.LetExpression.create(null, bindings, node.body));
        return ast_expression.FunctionExpression.create(node.loc, node.id, modify(node.params, ({
            "elements": params
        }), ({})), body);
    }));
    var expandAssignment = (function(node) {
        var right;
        return ((node.right.type === "AssignmentExpression") ? ((right = expandAssignment(node.right)),
            concat(right, ast_expression.AssignmentExpression.create(null, "=", node.left, right[(right
                .length - 1)].left))) : [node]);
    });
    peepholes.add("ExpressionStatement", UP, (function(__o6) {
        var expression = __o6["expression"];
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
    }), (function(__o6) {
        var left = __o6["left"],
            right = __o6["right"];
        return ast_expression.CallExpression.create(null, right, [left]);
    }));
    peepholes.add("BinaryExpression", UP, (function(node) {
        return (node.operator === "<|");
    }), (function(__o6) {
        var left = __o6["left"],
            right = __o6["right"];
        return ast_expression.CallExpression.create(null, left, [right]);
    }));
    peepholes.add("BinaryExpression", UP, (function(node) {
        return ((((node.operator === "\\>") || (node.operator === "\\>>")) || (node.operator === "<\\")) ||
            (node.operator === "<<\\"));
    }), (function(__o6) {
        var operator = __o6["operator"],
            left = __o6["left"],
            right = __o6["right"];
        return ast_expression.CallExpression.create(null, definitions[operator], [left, right]);
    }));
    var x = khepriZipper,
        y = rewrite.bind(null, peepholes);
    (normalize = (function(x0) {
        return y(x(x0));
    }));
    (exports["normalize"] = normalize);
}));