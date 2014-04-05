var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input)))));
};

var evalParser = function(input) {
    return eval(testParser(input));
};



exports.recursive_fn = function(test) {
    test.equal(
        evalParser("let mod10 := \\x -> ? x < 10 : x : mod10 (x -10) in mod10 101;"),
        1);
    test.done();
};

exports.recursive_curry = function(test) {
    testParser("let f := \\x y -> f @ (x + 1, y + 1) in f(0, 0);");
    test.ok(true);
    test.done();
    
};

/// Ensure that `x` binding captures reference to current `a` not later one.
exports.capture_mutable= function(test) {
    // Mutable `a` binding
    test.equal(
        evalParser("var a = [1, 2, 3]; var f = let x = a in \\-> x.(0); a = [4, 5, 6]; f();"),
        1);
    
    // Immutable `a` binding
    test.equal(
        evalParser("var a := [1, 2, 3]; var f = let x = a in \\-> x.(0); f();"),
        1);
    
    test.done();
};