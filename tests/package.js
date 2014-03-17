var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;

var options = {
    'package_manager': 'node'
};

var testParser = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile.compile(parser.parseStream(lexer.lex(input)), options))));
};



exports.duplicate_exports = function(test) {
    test.throws(function() {
        testParser("package (x, x) {}");
    });
    
    test.throws(function() {
        testParser("package (x, y, z, x) {}");
    });
    test.done();
};

exports.binding_name_conflict = function(test) {
    test.throws(function() {
        testParser("package (x) with x = 3 {}");
    });
    
    test.throws(function() {
        testParser("package (y, z, x) with [[[x]]] = 3 {}");
    });
    
    test.throws(function() {
        testParser("package (y, z, x) with import 'x' x {}");
    });
    test.done();
};

exports.alias_name_conflict = function(test) {
    test.throws(function() {
        testParser("package ('y' x) with x = 3 {}");
    });
    test.done();
};

exports.body_name_conflict = function(test) {
    test.throws(function() {
        testParser("package (x) { var x; }");
    });
    test.done();
};

exports.packageBlockBodyConflict = function(test) {
    test.throws(function() {
        testParser("package () with x = 3 in { var x; }");
    });
    
    test.ok(
        testParser("package () with x = 3 in { {var x; } }"));
    test.done();
};

exports.multipleParameterSameName = function(test) {
    test.throws(function() {
        testParser("(\\x, x -> x*x)(2)");
    });
    
    test.throws(function() {
        testParser("(\\x, a, b, x -> x*x)(2)");
    });
    
     test.ok(
        testParser("\\x -> \\x -> x;"));
     test.done();
};


