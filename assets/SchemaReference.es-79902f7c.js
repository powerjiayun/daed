import{l as a,X as b,F,W as k,Y as S,Z as D,_ as T,$ as o,c as h}from"./index-30275f20.js";import{f as j}from"./forEachState.es-1e367fb2.js";var R=Object.defineProperty,t=(n,r)=>R(n,"name",{value:r,configurable:!0});function V(n,r){const e={schema:n,type:null,parentType:null,inputType:null,directiveDef:null,fieldDef:null,argDef:null,argDefs:null,objectFieldDefs:null};return j(r,i=>{var u,c;switch(i.kind){case"Query":case"ShortQuery":e.type=n.getQueryType();break;case"Mutation":e.type=n.getMutationType();break;case"Subscription":e.type=n.getSubscriptionType();break;case"InlineFragment":case"FragmentDefinition":i.type&&(e.type=n.getType(i.type));break;case"Field":case"AliasedField":e.fieldDef=e.type&&i.name?f(n,e.parentType,i.name):null,e.type=(u=e.fieldDef)===null||u===void 0?void 0:u.type;break;case"SelectionSet":e.parentType=e.type?a(e.type):null;break;case"Directive":e.directiveDef=i.name?n.getDirective(i.name):null;break;case"Arguments":const g=i.prevState?i.prevState.kind==="Field"?e.fieldDef:i.prevState.kind==="Directive"?e.directiveDef:i.prevState.kind==="AliasedField"?i.prevState.name&&f(n,e.parentType,i.prevState.name):null:null;e.argDefs=g?g.args:null;break;case"Argument":if(e.argDef=null,e.argDefs){for(let l=0;l<e.argDefs.length;l++)if(e.argDefs[l].name===i.name){e.argDef=e.argDefs[l];break}}e.inputType=(c=e.argDef)===null||c===void 0?void 0:c.type;break;case"EnumValue":const s=e.inputType?a(e.inputType):null;e.enumValue=s instanceof S?v(s.getValues(),l=>l.value===i.name):null;break;case"ListValue":const y=e.inputType?F(e.inputType):null;e.inputType=y instanceof k?y.ofType:null;break;case"ObjectValue":const m=e.inputType?a(e.inputType):null;e.objectFieldDefs=m instanceof b?m.getFields():null;break;case"ObjectField":const p=i.name&&e.objectFieldDefs?e.objectFieldDefs[i.name]:null;e.inputType=p==null?void 0:p.type;break;case"NamedType":e.type=i.name?n.getType(i.name):null;break}}),e}t(V,"getTypeInfo");function f(n,r,e){if(e===D.name&&n.getQueryType()===r)return D;if(e===T.name&&n.getQueryType()===r)return T;if(e===o.name&&h(r))return o;if(r&&r.getFields)return r.getFields()[e]}t(f,"getFieldDef");function v(n,r){for(let e=0;e<n.length;e++)if(r(n[e]))return n[e]}t(v,"find");function _(n){return{kind:"Field",schema:n.schema,field:n.fieldDef,type:d(n.fieldDef)?null:n.parentType}}t(_,"getFieldReference");function A(n){return{kind:"Directive",schema:n.schema,directive:n.directiveDef}}t(A,"getDirectiveReference");function Q(n){return n.directiveDef?{kind:"Argument",schema:n.schema,argument:n.argDef,directive:n.directiveDef}:{kind:"Argument",schema:n.schema,argument:n.argDef,field:n.fieldDef,type:d(n.fieldDef)?null:n.parentType}}t(Q,"getArgumentReference");function M(n){return{kind:"EnumValue",value:n.enumValue||void 0,type:n.inputType?a(n.inputType):void 0}}t(M,"getEnumValueReference");function E(n,r){return{kind:"Type",schema:n.schema,type:r||n.type}}t(E,"getTypeReference");function d(n){return n.name.slice(0,2)==="__"}t(d,"isMetaField");export{_ as a,A as b,Q as c,M as d,E as e,V as g};
