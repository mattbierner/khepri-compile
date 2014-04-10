/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/pseudo/pattern.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern"], (function(require, exports, __o, __o0) {
    "use strict";
    var defineNode = __o["defineNode"],
        Node = __o["Node"],
        Pattern = __o0["Pattern"],
        RelativeUnpack, SliceUnpack;
    (RelativeUnpack = defineNode(Pattern, "RelativeUnpack", ["pattern"], ["index", "min"], (function(loc,
        pattern, index, min) {
        var self = this;
        Node.call(self, loc);
        (self.pattern = pattern);
        (self.index = index);
        (self.min = min);
    })));
    (SliceUnpack = defineNode(Pattern, "SliceUnpack", ["pattern"], ["from", "to"], (function(loc, pattern, from,
        to) {
        var self = this;
        Node.call(self, loc);
        (self.pattern = pattern);
        (self.from = from);
        (self.to = to);
    })));
    (exports["RelativeUnpack"] = RelativeUnpack);
    (exports["SliceUnpack"] = SliceUnpack);
}));