import{a as _}from"./codemirror.es-9a9a78b9.js";import"./index-30275f20.js";var O=Object.defineProperty,m=(g,v)=>O(g,"name",{value:v,configurable:!0});function N(g,v){return v.forEach(function(e){e&&typeof e!="string"&&!Array.isArray(e)&&Object.keys(e).forEach(function(c){if(c!=="default"&&!(c in g)){var d=Object.getOwnPropertyDescriptor(e,c);Object.defineProperty(g,c,d.get?d:{enumerable:!0,get:function(){return e[c]}})}})}),Object.freeze(Object.defineProperty(g,Symbol.toStringTag,{value:"Module"}))}m(N,"_mergeNamespaces");var b={exports:{}};(function(g,v){(function(e){e(_.exports)})(function(e){function c(f,u,n){var o=f.getWrapperElement(),l;return l=o.appendChild(document.createElement("div")),n?l.className="CodeMirror-dialog CodeMirror-dialog-bottom":l.className="CodeMirror-dialog CodeMirror-dialog-top",typeof u=="string"?l.innerHTML=u:l.appendChild(u),e.addClass(o,"dialog-opened"),l}m(c,"dialogDiv");function d(f,u){f.state.currentNotificationClose&&f.state.currentNotificationClose(),f.state.currentNotificationClose=u}m(d,"closeNotification"),e.defineExtension("openDialog",function(f,u,n){n||(n={}),d(this,null);var o=c(this,f,n.bottom),l=!1,r=this;function i(t){if(typeof t=="string")a.value=t;else{if(l)return;l=!0,e.rmClass(o.parentNode,"dialog-opened"),o.parentNode.removeChild(o),r.focus(),n.onClose&&n.onClose(o)}}m(i,"close");var a=o.getElementsByTagName("input")[0],s;return a?(a.focus(),n.value&&(a.value=n.value,n.selectValueOnOpen!==!1&&a.select()),n.onInput&&e.on(a,"input",function(t){n.onInput(t,a.value,i)}),n.onKeyUp&&e.on(a,"keyup",function(t){n.onKeyUp(t,a.value,i)}),e.on(a,"keydown",function(t){n&&n.onKeyDown&&n.onKeyDown(t,a.value,i)||((t.keyCode==27||n.closeOnEnter!==!1&&t.keyCode==13)&&(a.blur(),e.e_stop(t),i()),t.keyCode==13&&u(a.value,t))}),n.closeOnBlur!==!1&&e.on(o,"focusout",function(t){t.relatedTarget!==null&&i()})):(s=o.getElementsByTagName("button")[0])&&(e.on(s,"click",function(){i(),r.focus()}),n.closeOnBlur!==!1&&e.on(s,"blur",i),s.focus()),i}),e.defineExtension("openConfirm",function(f,u,n){d(this,null);var o=c(this,f,n&&n.bottom),l=o.getElementsByTagName("button"),r=!1,i=this,a=1;function s(){r||(r=!0,e.rmClass(o.parentNode,"dialog-opened"),o.parentNode.removeChild(o),i.focus())}m(s,"close"),l[0].focus();for(var t=0;t<l.length;++t){var p=l[t];(function(y){e.on(p,"click",function(h){e.e_preventDefault(h),s(),y&&y(i)})})(u[t]),e.on(p,"blur",function(){--a,setTimeout(function(){a<=0&&s()},200)}),e.on(p,"focus",function(){++a})}}),e.defineExtension("openNotification",function(f,u){d(this,i);var n=c(this,f,u&&u.bottom),o=!1,l,r=u&&typeof u.duration<"u"?u.duration:5e3;function i(){o||(o=!0,clearTimeout(l),e.rmClass(n.parentNode,"dialog-opened"),n.parentNode.removeChild(n))}return m(i,"close"),e.on(n,"click",function(a){e.e_preventDefault(a),i()}),r&&(l=setTimeout(i,r)),i})})})();var E=b.exports,D=N({__proto__:null,default:E},[b.exports]);export{b as a,D as d};
