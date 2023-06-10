import{C as s}from"./codemirror.es-9a9a78b9.js";import{U as n,a5 as e,a6 as a,a8 as t}from"./index-30275f20.js";import{i}from"./mode-indent.es-341daf63.js";s.defineMode("graphql-results",r=>{const u=n({eatWhitespace:l=>l.eatSpace(),lexRules:o,parseRules:c,editorConfig:{tabSize:r.tabSize}});return{config:r,startState:u.startState,token:u.token,indent:i,electricInput:/^\s*[}\]]/,fold:"brace",closeBrackets:{pairs:'[]{}""',explode:"[]{}"}}});const o={Punctuation:/^\[|]|\{|\}|:|,/,Number:/^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,String:/^"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/,Keyword:/^true|false|null/},c={Document:[e("{"),a("Entry",e(",")),e("}")],Entry:[t("String","def"),e(":"),"Value"],Value(r){switch(r.kind){case"Number":return"NumberValue";case"String":return"StringValue";case"Punctuation":switch(r.value){case"[":return"ListValue";case"{":return"ObjectValue"}return null;case"Keyword":switch(r.value){case"true":case"false":return"BooleanValue";case"null":return"NullValue"}return null}},NumberValue:[t("Number","number")],StringValue:[t("String","string")],BooleanValue:[t("Keyword","builtin")],NullValue:[t("Keyword","keyword")],ListValue:[e("["),a("Value",e(",")),e("]")],ObjectValue:[e("{"),a("ObjectField",e(",")),e("}")],ObjectField:[t("String","property"),e(":"),"Value"]};
