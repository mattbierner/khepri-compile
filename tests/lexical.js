var parser = require('khepri-parse').parse.parser;
var lexer = require('khepri-parse').lex.lexer;

var unparse = require('ecma-unparse').unparse;
var unparse_print = require('ecma-unparse').print;

var compile = require('../index').compile;

var run = function(input) {
    return eval(unparse_print.print(unparse.unparse(compile(parser.parseStream(lexer.lex(input))))));
};
  

exports.basic_block_scope = function(test) {
    test.equal(
        run("var a = 10; { var a = 3; }; a;"),
        10);
    
    test.done();
};

exports.block_scoping_undefined_var = function(test) {
    test.throws(function() {
        run("b;");
    });
    
    test.throws(function(){
        run("{ var b = 3; }; b;")
    });
    
    test.done();
};

exports.declaration_order = function(test) {
    test.throws(function() {
        run("b; var b;");
    });
    test.done();
};

exports.if_body_always_introduces_scope = function(test) {
    test.throws(function() {
        run(" if (true) var b; b;");
    });
    test.done();
};

exports.switch_cases_do_not_introduce_scope = function(test) {
    test.throws(function(){
        run("switch (1) { case 0: var a = 1; break; case 1: case 2: var a = 10; };");
    });
    test.done();
};


exports.duplicateDeclarationsInOneScope = function(test) {
    test.throws(function() {
        run("var a; var c; var a;");
    });
    
    test.throws(function() {
        run("{ var a; var c; var a; }");
    });
    
    var result = run("var a; { var a; }");
    test.ok(true);
    test.done();
};

exports.switchBodyIntroducesNewScopeButNotCases = function(test) {
    test.throws(function() {
        run("var a; switch(a) {case 0: var a; default: var a; }");
    });
    test.ok(
        run("var a; switch(a) { default: var a; }"));
    
    var result = run("var a; switch(a) { default: var a; }");
    //test.ok(result.body[0].declarations[0].id.name != result.body[1].cases[0].consequent[0].declarations[0].id.name);
    test.done();
};

exports.multipleParameterSameName = function(test) {
    test.throws(function() {
        run("(\\x, x -> x*x)(2)");
    });
    
    test.throws(function() {
        run("(\\x, a, b, x -> x*x)(2)");
    });
    
     test.ok(
        run("\\x -> \\x -> x;"));
     test.done();
};


