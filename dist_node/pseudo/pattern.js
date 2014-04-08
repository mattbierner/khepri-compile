/*
 * THIS FILE IS AUTO GENERATED from 'lib/pseudo/pattern.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("khepri-ast")["node"],
    defineNode = __o["defineNode"],
    Node = __o["Node"],
    __o0 = require("khepri-ast")["pattern"],
    Pattern = __o0["Pattern"],
    RelativeUnpack, SliceUnpack;
(RelativeUnpack = defineNode(Pattern, "RelativeUnpack", ["pattern"], ["index", "min"], (function(loc, pattern, index,
    min) {
    var self = this;
    Node.call(self, loc);
    (self.pattern = pattern);
    (self.index = index);
    (self.min = min);
})));
(SliceUnpack = defineNode(Pattern, "SliceUnpack", ["pattern"], ["from", "to"], (function(loc, pattern, from, to) {
    var self = this;
    Node.call(self, loc);
    (self.pattern = pattern);
    (self.from = from);
    (self.to = to);
})));
(exports["RelativeUnpack"] = RelativeUnpack);
(exports["SliceUnpack"] = SliceUnpack);