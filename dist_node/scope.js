/*
 * THIS FILE IS AUTO GENERATED from 'lib/scope.kep'
 * DO NOT EDIT
*/"use strict";
var record = require("bes")["record"],
    hashtrie = require("hashtrie"),
    Scope, addUid, addBinding, addMutableBinding, addImmutableBinding, setBindingMutability, addMapping, push, pop;
(Scope = record.declare(null, ["record", "outer", "mapping", "definitions"]));
(Scope.empty = Scope.create(hashtrie.empty, null, hashtrie.empty, hashtrie.empty));
(Scope.prototype.hasOwnBinding = (function(id) {
    var self = this;
    return hashtrie.has(id, self.record);
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
    return (hashtrie.get(id, self.record) || (self.outer ? self.outer.getBinding(id) : null));
}));
(Scope.prototype.getUid = (function(id) {
    var self = this;
    return (self.hasOwnBinding(id) ? hashtrie.get(id, self.definitions) : (self.outer ? self.outer.getUid(id) :
        null));
}));
(Scope.prototype.hasOwnMapping = (function(id) {
    var self = this;
    return hashtrie.has(id, self.mapping);
}));
(Scope.prototype.hasMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) || (self.outer && self.outer.hasMapping(id)));
}));
(Scope.prototype.getMapping = (function(id) {
    var self = this;
    return (self.hasOwnMapping(id) ? hashtrie.get(id, self.mapping) : (self.outer && self.outer.getMapping(id)));
}));
(Scope.prototype.getUnusedId = (function(id) {
    var self = this;
    if ((!self.hasBinding(id))) return id;
    for (var i = 0;;
        (i = (i + 1)))
        if ((!self.hasBinding((id + i)))) return (id + i);
}));
(addUid = (function(s, id, uid) {
    return s.setDefinitions(hashtrie.set(id, uid, s.definitions));
}));
(addBinding = (function(s, id, info) {
    return s.setRecord(hashtrie.set(id, info, s.record));
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
    return (s.hasOwnBinding(id) ? s.setRecord(hashtrie.modify(id, (function(binding) {
        return ({
            "loc": binding.loc,
            "mutable": (mutable ? 1 : 0)
        });
    }), s.record)) : (s.outer && s.setOuter(setBindingMutability(s.outer, id, mutable))));
}));
(addMapping = (function(s, from, to) {
    return s.setMapping(hashtrie.set(from, to, s.mapping));
}));
(push = (function(s) {
    return Scope.empty.setOuter(s)
        .setDefinitions(s.definitions);
}));
(pop = (function(s) {
    return s.outer;
}));
(exports["Scope"] = Scope);
(exports["addUid"] = addUid);
(exports["addBinding"] = addBinding);
(exports["addMutableBinding"] = addMutableBinding);
(exports["addImmutableBinding"] = addImmutableBinding);
(exports["setBindingMutability"] = setBindingMutability);
(exports["addMapping"] = addMapping);
(exports["push"] = push);
(exports["pop"] = pop);