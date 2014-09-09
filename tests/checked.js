var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;


var testParser = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};



exports.simple_checked = function(test) {
    test.equal(
        testParser("null ?? .x;"),
        null);
    
    test.equal(
        testParser("var o = {'x':3}; o ?? .x;"),
        undefined);
    
    test.done();
};

exports.does_not_eval_rhs_if_lhs_false = function(test) {
    test.equal(
        testParser("var g = 0; var f = \-> { g = g + 1; }; null ?? f;"),
        0);
    
    test.done();
};

exports.checked_member_evals_arg_at_most_once = function(test) {
    test.equal(
        testParser("var g = 0; var o = {'x':{'y': 3}}; var f = \\-> { g = g + 1; return 'x'; }; o.?(f()).y; g;"),
        1);
    
    test.equal(
        testParser("var g = 0; var o = null; var f = \\-> { g = g + 1; return 'x'; }; o.?(f()).?y; g;"),
        0);
    
    test.done();
};
