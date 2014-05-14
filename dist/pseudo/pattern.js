/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/pseudo/pattern.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "khepri-ast/node", "khepri-ast/pattern"], (function(require, exports, __o, __o0) {
    "use strict";
    var RelativeUnpack, SliceUnpack, MemberUnpack, Import, defineNode = __o["defineNode"],
        Node = __o["Node"],
        Pattern = __o0["Pattern"];
    (RelativeUnpack = defineNode(Pattern, "RelativeUnpack", ["pattern", "target"], ["index", "min"], (function(
        loc, pattern, target, index, min) {
        var self = this;
        Node.call(self, loc);
        (self.pattern = pattern);
        (self.target = target);
        (self.index = index);
        (self.min = min);
    })));
    (SliceUnpack = defineNode(Pattern, "SliceUnpack", ["pattern", "target"], ["from", "to"], (function(loc,
        pattern, target, from, to) {
        var self = this;
        Node.call(self, loc);
        (self.pattern = pattern);
        (self.target = target);
        (self.from = from);
        (self.to = to);
    })));
    (MemberUnpack = defineNode(Pattern, "MemberUnpack", ["target", "key"], [], (function(loc, target, key) {
        var self = this;
        Node.call(self, loc);
        (self.target = target);
        (self.key = key);
    })));
    (Import = defineNode(Pattern, "Import", [], ["from"], (function(loc, from) {
        var self = this;
        Node.call(self, loc);
        (self.from = from);
    })));
    (exports["RelativeUnpack"] = RelativeUnpack);
    (exports["SliceUnpack"] = SliceUnpack);
    (exports["MemberUnpack"] = MemberUnpack);
    (exports["Import"] = Import);
}));