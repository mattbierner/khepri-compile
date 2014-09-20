/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/transform/state.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "bes/record", "nu-stream/stream", "../lexical/scope"], (function(require, exports, record,
    stream, scope) {
    "use strict";
    var NORMAL_CTX, LOOP_CTX, State, getBindings, addBindings, pushBindings, popBindings, append = stream[
            "append"],
        first = stream["first"],
        rest = stream["rest"],
        cons = stream["cons"],
        NIL = stream["NIL"],
        toArray = stream["toArray"],
        Scope = scope["Scope"];
    (NORMAL_CTX = 0);
    (LOOP_CTX = 1);
    (State = record.declare(null, ["scope", "packageManager", "bindings", "ctx"]));
    (State.empty = State.create(Scope.empty, null, cons(NIL, NIL), 0));
    (getBindings = (function(z) {
        var z0 = z.bindings;
        return toArray(first(z0));
    }));
    (addBindings = (function(bindings, s) {
        return s.setBindings(cons(append(first(s.bindings), stream.from(bindings)), rest(s.bindings)));
    }));
    (pushBindings = (function(s) {
        return s.setBindings(cons(NIL, s.bindings));
    }));
    (popBindings = (function(s) {
        return s.setBindings(rest(s.bindings));
    }));
    (exports["NORMAL_CTX"] = NORMAL_CTX);
    (exports["LOOP_CTX"] = LOOP_CTX);
    (exports["State"] = State);
    (exports["getBindings"] = getBindings);
    (exports["addBindings"] = addBindings);
    (exports["pushBindings"] = pushBindings);
    (exports["popBindings"] = popBindings);
}));