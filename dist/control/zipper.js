/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/control/zipper.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "akh/identity", "./zippert"], (function(require, exports, Identity, ZipperT) {
    "use strict";
    var Zipper;
    (Zipper = ZipperT(Identity));
    (Zipper.run = (function(m, ctx) {
        return Identity.runIdentity(ZipperT.run(m, ctx));
    }));
    return Zipper;
}));