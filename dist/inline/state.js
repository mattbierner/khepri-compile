/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/inline/state.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "hamt", "../fun", "./binding"], (function(require, exports, record, hamt,
    __o, __o0) {
    "use strict";
    var concat = __o["concat"],
        Binding = __o0["Binding"],
        MUTABLE = __o0["MUTABLE"],
        IMMUTABLE = __o0["IMMUTABLE"],
        State, getBinding, addBinding, addWorking, push, pop, getGlobals, addGlobal, addLocals, getLocals,
            pushLocals, popLocals;
    (State = record.declare(null, ["bindings", "working", "globals", "outer", "locals"]));
    (State.empty = new(State)(hamt.empty, hamt.empty, hamt.empty, null, [
        [], null
    ]));
    (push = (function(s) {
        return s.setOuter(s)
            .setWorking(hamt.empty);
    }));
    var nullWorking = hamt.fold.bind(null, (function(p, __o1) {
        var key = __o1["key"];
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
    (addLocals = (function(locals, s) {
        return s.setLocals([concat(locals, s.locals[0]), s.locals[1]]);
    }));
    (getLocals = (function(s) {
        return s.locals[0];
    }));
    (pushLocals = (function(s) {
        return s.setLocals([
            [], s.locals
        ]);
    }));
    (popLocals = (function(s) {
        return s.setLocals(s.locals[1]);
    }));
    (exports["State"] = State);
    (exports["getBinding"] = getBinding);
    (exports["addBinding"] = addBinding);
    (exports["addWorking"] = addWorking);
    (exports["push"] = push);
    (exports["pop"] = pop);
    (exports["getGlobals"] = getGlobals);
    (exports["addGlobal"] = addGlobal);
    (exports["addLocals"] = addLocals);
    (exports["getLocals"] = getLocals);
    (exports["pushLocals"] = pushLocals);
    (exports["popLocals"] = popLocals);
}));