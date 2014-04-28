/*
 * THIS FILE IS AUTO GENERATED from 'lib/lexical/scope.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    hamt = require("hamt"),
    Scope, addUid, addBinding, addMutableBinding, addImmutableBinding, setBindingMutability, addMapping, getClosure,
        push, pop;
(Scope = record.declare(null, ["record", "outer", "mapping", "definitions", "mutated"]));
(Scope.empty = Scope.create(hamt.empty, null, hamt.empty, hamt.empty, hamt.empty));
(Scope.prototype.hasOwnBinding = (function(id) {
    var self = this;
    return hamt.has(id, self.record);
}));
(Scope.prototype.hasBinding = (function(id) {
    var self = this;
    return (self.hasOwnBinding(id) || (self.outer && self.outer.hasBinding(id)));
}));
(Scope.prototype.hasMutableBinding = (function(id) {
    var self = this,
        binding = self.getBinding(id);
    return (binding && binding.mutable);
}));
(Scope.prototype.getBinding = (function(id) {
    var self = this;
    return (hamt.get(id, self.record) || (self.outer ? self.outer.getBinding(id) : null));
}));
(Scope.prototype.getUid = (function(id) {
    var self = this;
    return (self.hasOwnBinding(id) ? hamt.get(id, self.definitions) : (self.outer ? self.outer.getUid(id) :
        null));
}));
(Scope.prototype.hasOwnMapping = (function(id) {
    var self = this;
    return hamt.has(id, self.mapping);
}));
(Scope.prototype.hasMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) || (self.outer && self.outer.hasMapping(id)));
}));
(Scope.prototype.getMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) ? hamt.get(id, self.mapping) : (self.outer && self.outer.getMapping(id)));
}));
(Scope.prototype.getUnusedId = (function(id) {
    var self = this;
    if ((!self.hasBinding(id))) return id;
    for (var i = 0;;
        (i = (i + 1)))
        if ((!self.hasBinding((id + i)))) return (id + i);
}));
(addUid = (function(id, uid, s) {
    return s.setDefinitions(hamt.set(id, uid, s.definitions));
}));
(addBinding = (function(s, id, info) {
    return s.setRecord(hamt.set(id, info, s.record));
}));
(addMutableBinding = (function(s, id, loc) {
    return addBinding(s, id, ({
        "mutable": 1,
        "loc": loc
    }));
}));
(addImmutableBinding = (function(s, id, loc) {
    return addBinding(s, id, ({
        "mutable": 0,
        "loc": loc
    }));
}));
(setBindingMutability = (function(s, id, mutable) {
    return (s.hasOwnBinding(id) ? addBinding(s, id, ({
        loc: s.getBinding(id)
            .loc,
        mutable: (mutable ? 1 : 0)
    })) : (s.outer && s.setOuter(setBindingMutability(s.outer, id, mutable))));
}));
(addMapping = (function(s, from, to) {
    return s.setMapping(hamt.set(from, to, s.mapping));
}));
var y = hamt.values;
(getClosure = (function(z) {
    return y(z.definitions);
}));
(push = (function(s) {
    return Scope.empty.setOuter(s)
        .setDefinitions(s.definitions);
}));
(pop = (function(x) {
    return x.outer;
}));
(exports["Scope"] = Scope);
(exports["addUid"] = addUid);
(exports["addBinding"] = addBinding);
(exports["addMutableBinding"] = addMutableBinding);
(exports["addImmutableBinding"] = addImmutableBinding);
(exports["setBindingMutability"] = setBindingMutability);
(exports["addMapping"] = addMapping);
(exports["getClosure"] = getClosure);
(exports["push"] = push);
(exports["pop"] = pop);