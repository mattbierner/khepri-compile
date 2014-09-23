var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;

var run = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};
  

exports.basic_mutable_binding = function(test) {
    test.equal(
        run("var a = 10; a = 3; { a = 3; }; a = 6; a;"),
        6);
    
    test.equal(
        run("var a; a = 3; { a = 3; }; a = 6; a;"),
        6);
    test.done();
};

exports.setting_mutable_to_immutable_cannot_set_after = function(test) {
    test.equal(
        run("var a = 10; a := 3; a; a + 10;"),
        13);
    
    test.throws(
        run.bind(null, "var a; a := 3; a = 10;"));
    
        
    test.throws(
        run.bind(null, "var a; a := 3; {a = 10;}"));
    
    test.done();
};

exports.setting_mutable_to_immutable_must_be_in_block = function(test) {
    test.equal(
        run("var a = 10; a := 3; a;"),
        3);
    
    test.throws(
        run.bind(null, "var a; { a := 3; }; a;"));
    
    test.throws(
        run.bind(null, "var a; if (false) a := 3; a;"));
    
    test.done();
};

exports.var_mutated_in_inner_scope_cannot_be_marked_immutable = function(test) {
    test.equal(
        run("var a = 10; a = 3; a := 10; a;"),
        10);
    
    test.throws(
        run.bind(null, "var a; { a = 3; }; a := 5; a;"));
    
    test.throws(
        run.bind(null, "var a; if (false) a = 3; a := 5; a;"));
    
    test.done();
};
