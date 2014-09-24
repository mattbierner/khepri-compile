/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/pseudo/expression.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/expression"], (function(require, exports, __o, __o0) {
    "use strict";
    var CheckedMemberExpression, ApplyExpression, defineNode = __o["defineNode"],
        Node = __o["Node"],
        Expression = __o0["Expression"];
    (CheckedMemberExpression = defineNode(Expression, "CheckedMemberExpression", ["object", "property", "id"], [
        "computed"
    ], (function(loc, object, property, id, computed) {
        var self = this;
        Node.call(self, loc);
        (self.object = object);
        (self.property = property);
        (self.id = id);
        (self.computed = (!(!computed)));
    })));
    (ApplyExpression = defineNode(Expression, "ApplyExpression", ["callee", "args"], [], (function(loc, callee,
        args) {
        var self = this;
        Node.call(self, loc);
        (self.callee = callee);
        (self.args = args);
    })));
    (exports["CheckedMemberExpression"] = CheckedMemberExpression);
    (exports["ApplyExpression"] = ApplyExpression);
}));