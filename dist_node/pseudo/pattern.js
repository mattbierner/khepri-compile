/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/pseudo/pattern.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("khepri-ast")["node"],
    defineNode = __o["defineNode"],
    Node = __o["Node"],
    __o0 = require("khepri-ast")["pattern"],
    Pattern = __o0["Pattern"],
    RelativeUnpack, SliceUnpack, Import;
(RelativeUnpack = defineNode(Pattern, "RelativeUnpack", ["pattern", "target"], ["index", "min"], (function(loc, pattern,
    target, index, min) {
    var self = this;
    Node.call(self, loc);
    (self.pattern = pattern);
    (self.target = target);
    (self.index = index);
    (self.min = min);
})));
(SliceUnpack = defineNode(Pattern, "SliceUnpack", ["pattern", "target"], ["from", "to"], (function(loc, pattern, target,
    from, to) {
    var self = this;
    Node.call(self, loc);
    (self.pattern = pattern);
    (self.target = target);
    (self.from = from);
    (self.to = to);
})));
(Import = defineNode(Pattern, "Import", [], ["from"], (function(loc, from) {
    var self = this;
    Node.call(self, loc);
    (self.from = from);
})));
(exports["RelativeUnpack"] = RelativeUnpack);
(exports["SliceUnpack"] = SliceUnpack);
(exports["Import"] = Import);