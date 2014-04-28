/*
 * THIS FILE IS AUTO GENERATED from 'lib/inline/state.kep'
 * DO NOT EDIT
*/define(["require", "exports", "bes/record", "hamt", "./binding"], (function(require, exports, record, hamt, __o) {
    "use strict";
    var Binding = __o["Binding"],
        MUTABLE = __o["MUTABLE"],
        IMMUTABLE = __o["IMMUTABLE"],
        State, getBinding, addBinding, addWorking, push, pop, getGlobals, addGlobal;
    (State = record.declare(null, ["bindings", "working", "globals", "outer"]));
    (State.empty = new(State)(hamt.empty, hamt.empty, hamt.empty, null));
    (push = (function(s) {
        return s.setOuter(s)
            .setWorking(hamt.empty);
    }));
    var nullWorking = hamt.fold.bind(null, (function(p, __o0) {
        var key = __o0["key"];
        return hamt.set(key, null, p);
    }));
    (pop = (function(s) {
        return s.outer.setBindings(s.bindings)
            .setGlobals(s.globals)
            .setWorking(nullWorking(s.outer.working, s.working));
    }));
    (getBinding = (function(uid, s) {
        return (hamt.get(uid, s.bindings) || hamt.get(uid, s.working));
    }));
    (addBinding = (function(uid, value, simple, s) {
        var binding = Binding.create(value, IMMUTABLE, simple);
        return s.setBindings(hamt.set(uid, binding, s.bindings));
    }));
    (addWorking = (function(uid, value, simple, s) {
        var binding = Binding.create(value, MUTABLE, simple);
        return s.setWorking(hamt.set(uid, binding, s.working));
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
    (exports["addBinding"] = addBinding);
    (exports["addWorking"] = addWorking);
    (exports["push"] = push);
    (exports["pop"] = pop);
    (exports["getGlobals"] = getGlobals);
    (exports["addGlobal"] = addGlobal);
}));