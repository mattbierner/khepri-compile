var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};


exports.basic_compose = function(test) {
    test.equal(
        testParser("var f = (+ 10), g = (_ / 2); (f \\> g) 6;"),
        8);
    
    test.done();
};

exports.chained_compose = function(test) {
    test.equal(
        testParser("var f = (+ 10), g = (_/ 2); (f \\> g \\> (+, 3)) 6;"),
        11);
    
    test.done();
};

exports.compose_evals_args_once = function(test) {
    test.equal(
        testParser(
            "var global = 0;" +
            "var f = \\ -> { global = global + 1; return (+, 10); }, g = (_/, 2);" +
            "(f() \\> g) 6; global;"),
        1);
    
    test.done();
};

exports.basic_composen = function(test) {
    test.equal(
        testParser("var f = (/), g = (+, 3); (f \\>> g)(10, 5);"),
        5);
    
    test.done();
};

exports.composen_slice = function(test) {
    test.equal(
        testParser("var last = \\...xs l -> l, g = (+, 3); (last \\>> g)(1, 10, 100);"),
        103);
    
    test.done();
};
