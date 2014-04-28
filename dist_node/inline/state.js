/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/state.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    hamt = require("hamt"),
    binding = require("./bindings"),
    __o = require("./binding"),
    Binding = __o["Binding"],
    MUTABLE = __o["MUTABLE"],
    IMMUTABLE = __o["IMMUTABLE"],
    State, getBinding, push, pop, getGlobals, addGlobal;
(State = record.declare(null, ["bindings", "working", "globals", "outer"]));
(State.empty = new(State)(binding.empty, binding.empty, hamt.empty, null));
(State.prototype.addBinding = (function(uid, target, simple) {
    var s = this;
    return s.setBindings(binding.setBinding(uid, Binding.create(target, IMMUTABLE, simple), s.bindings));
}));
(State.prototype.addWorking = (function(uid, target, simple) {
    var s = this;
    return s.setWorking(binding.setBinding(uid, Binding.create(target, MUTABLE, simple), s.working));
}));
(push = (function(s) {
    return s.setOuter(s)
        .setWorking(binding.empty);
}));
(pop = (function(s) {
    return s.outer.setBindings(s.bindings)
        .setGlobals(s.globals)
        .setWorking(hamt.fold((function(p, __o0) {
            var key = __o0["key"];
            return hamt.set(key, null, p);
        }), s.outer.working, s.working));
}));
(getBinding = (function(uid, s) {
    return (binding.getBinding(uid, s.bindings) || binding.getBinding(uid, s.working));
}));
var y = hamt.keys;
(getGlobals = (function(z) {
    return y(z.globals);
}));
(addGlobal = (function(name, s) {
    return s.setGlobals(hamt.set(name, name, s.globals));
}));
(exports["State"] = State);
(exports["getBinding"] = getBinding);
(exports["push"] = push);
(exports["pop"] = pop);
(exports["getGlobals"] = getGlobals);
(exports["addGlobal"] = addGlobal);