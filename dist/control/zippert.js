/*
 * THIS FILE IS AUTO GENERATED from 'lib/control/zippert.kep'
 * DO NOT EDIT
*/define(["require", "exports", "akh/trans/state", "neith/zipper", "neith/tree"], (function(require, exports, StateT,
    zipper, tree) {
    "use strict";
    var ZipperT;
    (ZipperT = (function(m) {
        var Instance = StateT(m);
        (Instance.get = Instance.get);
        (Instance.put = Instance.put);
        (Instance.extract = Instance.get.chain(zipper.extract));
        (Instance.inspect = Instance.get.map.bind(Instance.get));
        (Instance.inspectWith = Instance.extract.chain.bind(Instance.extract));
        (Instance.move = Instance.modify);
        (Instance.up = Instance.move(zipper.up));
        (Instance.down = Instance.move(zipper.down));
        (Instance.left = Instance.move(zipper.left));
        (Instance.right = Instance.move(zipper.right));
        (Instance.root = Instance.move(zipper.root));
        (Instance.node = Instance.inspect(tree.node));
        (Instance.modifyNode = (function(f) {
            return Instance.move(tree.modifyNode.bind(null, f));
        }));
        (Instance.setNode = (function(x) {
            return Instance.move(tree.setNode.bind(null, x));
        }));
        (Instance.child = (function(edge) {
            return Instance.move(tree.child.bind(null, edge));
        }));
        return Instance;
    }));
    (ZipperT.run = (function(m, ctx) {
        return StateT.evalStateT(m, ctx);
    }));
    return ZipperT;
}));