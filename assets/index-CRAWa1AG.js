function Z0(n,o){for(var i=0;i<o.length;i++){const l=o[i];if(typeof l!="string"&&!Array.isArray(l)){for(const c in l)if(c!=="default"&&!(c in n)){const d=Object.getOwnPropertyDescriptor(l,c);d&&Object.defineProperty(n,c,d.get?d:{enumerable:!0,get:()=>l[c]})}}}return Object.freeze(Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}))}(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const f of d.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&l(f)}).observe(document,{childList:!0,subtree:!0});function i(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function l(c){if(c.ep)return;c.ep=!0;const d=i(c);fetch(c.href,d)}})();var Ig=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ps(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Fu={exports:{}},ni={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hg;function Q0(){if(Hg)return ni;Hg=1;var n=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function i(l,c,d){var f=null;if(d!==void 0&&(f=""+d),c.key!==void 0&&(f=""+c.key),"key"in c){d={};for(var p in c)p!=="key"&&(d[p]=c[p])}else d=c;return c=d.ref,{$$typeof:n,type:l,key:f,ref:c!==void 0?c:null,props:d}}return ni.Fragment=o,ni.jsx=i,ni.jsxs=i,ni}var Fg;function K0(){return Fg||(Fg=1,Fu.exports=Q0()),Fu.exports}var k=K0(),Gu={exports:{}},he={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gg;function J0(){if(Gg)return he;Gg=1;var n=Symbol.for("react.transitional.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),b=Symbol.iterator;function x(N){return N===null||typeof N!="object"?null:(N=b&&N[b]||N["@@iterator"],typeof N=="function"?N:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,E={};function z(N,W,ee){this.props=N,this.context=W,this.refs=E,this.updater=ee||D}z.prototype.isReactComponent={},z.prototype.setState=function(N,W){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,W,"setState")},z.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function O(){}O.prototype=z.prototype;function C(N,W,ee){this.props=N,this.context=W,this.refs=E,this.updater=ee||D}var T=C.prototype=new O;T.constructor=C,M(T,z.prototype),T.isPureReactComponent=!0;var R=Array.isArray,w={H:null,A:null,T:null,S:null,V:null},_=Object.prototype.hasOwnProperty;function j(N,W,ee,ne,oe,me){return ee=me.ref,{$$typeof:n,type:N,key:W,ref:ee!==void 0?ee:null,props:me}}function G(N,W){return j(N.type,W,void 0,void 0,void 0,N.props)}function I(N){return typeof N=="object"&&N!==null&&N.$$typeof===n}function S(N){var W={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(ee){return W[ee]})}var Z=/\/+/g;function te(N,W){return typeof N=="object"&&N!==null&&N.key!=null?S(""+N.key):W.toString(36)}function ie(){}function re(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(ie,ie):(N.status="pending",N.then(function(W){N.status==="pending"&&(N.status="fulfilled",N.value=W)},function(W){N.status==="pending"&&(N.status="rejected",N.reason=W)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function le(N,W,ee,ne,oe){var me=typeof N;(me==="undefined"||me==="boolean")&&(N=null);var ue=!1;if(N===null)ue=!0;else switch(me){case"bigint":case"string":case"number":ue=!0;break;case"object":switch(N.$$typeof){case n:case o:ue=!0;break;case y:return ue=N._init,le(ue(N._payload),W,ee,ne,oe)}}if(ue)return oe=oe(N),ue=ne===""?"."+te(N,0):ne,R(oe)?(ee="",ue!=null&&(ee=ue.replace(Z,"$&/")+"/"),le(oe,W,ee,"",function(Et){return Et})):oe!=null&&(I(oe)&&(oe=G(oe,ee+(oe.key==null||N&&N.key===oe.key?"":(""+oe.key).replace(Z,"$&/")+"/")+ue)),W.push(oe)),1;ue=0;var Ve=ne===""?".":ne+":";if(R(N))for(var Te=0;Te<N.length;Te++)ne=N[Te],me=Ve+te(ne,Te),ue+=le(ne,W,ee,me,oe);else if(Te=x(N),typeof Te=="function")for(N=Te.call(N),Te=0;!(ne=N.next()).done;)ne=ne.value,me=Ve+te(ne,Te++),ue+=le(ne,W,ee,me,oe);else if(me==="object"){if(typeof N.then=="function")return le(re(N),W,ee,ne,oe);throw W=String(N),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.")}return ue}function $(N,W,ee){if(N==null)return N;var ne=[],oe=0;return le(N,ne,"","",function(me){return W.call(ee,me,oe++)}),ne}function J(N){if(N._status===-1){var W=N._result;W=W(),W.then(function(ee){(N._status===0||N._status===-1)&&(N._status=1,N._result=ee)},function(ee){(N._status===0||N._status===-1)&&(N._status=2,N._result=ee)}),N._status===-1&&(N._status=0,N._result=W)}if(N._status===1)return N._result.default;throw N._result}var K=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var W=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(W))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)};function ae(){}return he.Children={map:$,forEach:function(N,W,ee){$(N,function(){W.apply(this,arguments)},ee)},count:function(N){var W=0;return $(N,function(){W++}),W},toArray:function(N){return $(N,function(W){return W})||[]},only:function(N){if(!I(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},he.Component=z,he.Fragment=i,he.Profiler=c,he.PureComponent=C,he.StrictMode=l,he.Suspense=g,he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,he.__COMPILER_RUNTIME={__proto__:null,c:function(N){return w.H.useMemoCache(N)}},he.cache=function(N){return function(){return N.apply(null,arguments)}},he.cloneElement=function(N,W,ee){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var ne=M({},N.props),oe=N.key,me=void 0;if(W!=null)for(ue in W.ref!==void 0&&(me=void 0),W.key!==void 0&&(oe=""+W.key),W)!_.call(W,ue)||ue==="key"||ue==="__self"||ue==="__source"||ue==="ref"&&W.ref===void 0||(ne[ue]=W[ue]);var ue=arguments.length-2;if(ue===1)ne.children=ee;else if(1<ue){for(var Ve=Array(ue),Te=0;Te<ue;Te++)Ve[Te]=arguments[Te+2];ne.children=Ve}return j(N.type,oe,void 0,void 0,me,ne)},he.createContext=function(N){return N={$$typeof:f,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:d,_context:N},N},he.createElement=function(N,W,ee){var ne,oe={},me=null;if(W!=null)for(ne in W.key!==void 0&&(me=""+W.key),W)_.call(W,ne)&&ne!=="key"&&ne!=="__self"&&ne!=="__source"&&(oe[ne]=W[ne]);var ue=arguments.length-2;if(ue===1)oe.children=ee;else if(1<ue){for(var Ve=Array(ue),Te=0;Te<ue;Te++)Ve[Te]=arguments[Te+2];oe.children=Ve}if(N&&N.defaultProps)for(ne in ue=N.defaultProps,ue)oe[ne]===void 0&&(oe[ne]=ue[ne]);return j(N,me,void 0,void 0,null,oe)},he.createRef=function(){return{current:null}},he.forwardRef=function(N){return{$$typeof:p,render:N}},he.isValidElement=I,he.lazy=function(N){return{$$typeof:y,_payload:{_status:-1,_result:N},_init:J}},he.memo=function(N,W){return{$$typeof:m,type:N,compare:W===void 0?null:W}},he.startTransition=function(N){var W=w.T,ee={};w.T=ee;try{var ne=N(),oe=w.S;oe!==null&&oe(ee,ne),typeof ne=="object"&&ne!==null&&typeof ne.then=="function"&&ne.then(ae,K)}catch(me){K(me)}finally{w.T=W}},he.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},he.use=function(N){return w.H.use(N)},he.useActionState=function(N,W,ee){return w.H.useActionState(N,W,ee)},he.useCallback=function(N,W){return w.H.useCallback(N,W)},he.useContext=function(N){return w.H.useContext(N)},he.useDebugValue=function(){},he.useDeferredValue=function(N,W){return w.H.useDeferredValue(N,W)},he.useEffect=function(N,W,ee){var ne=w.H;if(typeof ee=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return ne.useEffect(N,W)},he.useId=function(){return w.H.useId()},he.useImperativeHandle=function(N,W,ee){return w.H.useImperativeHandle(N,W,ee)},he.useInsertionEffect=function(N,W){return w.H.useInsertionEffect(N,W)},he.useLayoutEffect=function(N,W){return w.H.useLayoutEffect(N,W)},he.useMemo=function(N,W){return w.H.useMemo(N,W)},he.useOptimistic=function(N,W){return w.H.useOptimistic(N,W)},he.useReducer=function(N,W,ee){return w.H.useReducer(N,W,ee)},he.useRef=function(N){return w.H.useRef(N)},he.useState=function(N){return w.H.useState(N)},he.useSyncExternalStore=function(N,W,ee){return w.H.useSyncExternalStore(N,W,ee)},he.useTransition=function(){return w.H.useTransition()},he.version="19.1.0",he}var Vg;function Td(){return Vg||(Vg=1,Gu.exports=J0()),Gu.exports}var A=Td();const Ft=ps(A),os=Z0({__proto__:null,default:Ft},[A]);var Vu={exports:{}},ai={},Yu={exports:{}},Wu={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yg;function eS(){return Yg||(Yg=1,function(n){function o($,J){var K=$.length;$.push(J);e:for(;0<K;){var ae=K-1>>>1,N=$[ae];if(0<c(N,J))$[ae]=J,$[K]=N,K=ae;else break e}}function i($){return $.length===0?null:$[0]}function l($){if($.length===0)return null;var J=$[0],K=$.pop();if(K!==J){$[0]=K;e:for(var ae=0,N=$.length,W=N>>>1;ae<W;){var ee=2*(ae+1)-1,ne=$[ee],oe=ee+1,me=$[oe];if(0>c(ne,K))oe<N&&0>c(me,ne)?($[ae]=me,$[oe]=K,ae=oe):($[ae]=ne,$[ee]=K,ae=ee);else if(oe<N&&0>c(me,K))$[ae]=me,$[oe]=K,ae=oe;else break e}}return J}function c($,J){var K=$.sortIndex-J.sortIndex;return K!==0?K:$.id-J.id}if(n.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var d=performance;n.unstable_now=function(){return d.now()}}else{var f=Date,p=f.now();n.unstable_now=function(){return f.now()-p}}var g=[],m=[],y=1,b=null,x=3,D=!1,M=!1,E=!1,z=!1,O=typeof setTimeout=="function"?setTimeout:null,C=typeof clearTimeout=="function"?clearTimeout:null,T=typeof setImmediate<"u"?setImmediate:null;function R($){for(var J=i(m);J!==null;){if(J.callback===null)l(m);else if(J.startTime<=$)l(m),J.sortIndex=J.expirationTime,o(g,J);else break;J=i(m)}}function w($){if(E=!1,R($),!M)if(i(g)!==null)M=!0,_||(_=!0,te());else{var J=i(m);J!==null&&le(w,J.startTime-$)}}var _=!1,j=-1,G=5,I=-1;function S(){return z?!0:!(n.unstable_now()-I<G)}function Z(){if(z=!1,_){var $=n.unstable_now();I=$;var J=!0;try{e:{M=!1,E&&(E=!1,C(j),j=-1),D=!0;var K=x;try{t:{for(R($),b=i(g);b!==null&&!(b.expirationTime>$&&S());){var ae=b.callback;if(typeof ae=="function"){b.callback=null,x=b.priorityLevel;var N=ae(b.expirationTime<=$);if($=n.unstable_now(),typeof N=="function"){b.callback=N,R($),J=!0;break t}b===i(g)&&l(g),R($)}else l(g);b=i(g)}if(b!==null)J=!0;else{var W=i(m);W!==null&&le(w,W.startTime-$),J=!1}}break e}finally{b=null,x=K,D=!1}J=void 0}}finally{J?te():_=!1}}}var te;if(typeof T=="function")te=function(){T(Z)};else if(typeof MessageChannel<"u"){var ie=new MessageChannel,re=ie.port2;ie.port1.onmessage=Z,te=function(){re.postMessage(null)}}else te=function(){O(Z,0)};function le($,J){j=O(function(){$(n.unstable_now())},J)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function($){$.callback=null},n.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):G=0<$?Math.floor(1e3/$):5},n.unstable_getCurrentPriorityLevel=function(){return x},n.unstable_next=function($){switch(x){case 1:case 2:case 3:var J=3;break;default:J=x}var K=x;x=J;try{return $()}finally{x=K}},n.unstable_requestPaint=function(){z=!0},n.unstable_runWithPriority=function($,J){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var K=x;x=$;try{return J()}finally{x=K}},n.unstable_scheduleCallback=function($,J,K){var ae=n.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?ae+K:ae):K=ae,$){case 1:var N=-1;break;case 2:N=250;break;case 5:N=1073741823;break;case 4:N=1e4;break;default:N=5e3}return N=K+N,$={id:y++,callback:J,priorityLevel:$,startTime:K,expirationTime:N,sortIndex:-1},K>ae?($.sortIndex=K,o(m,$),i(g)===null&&$===i(m)&&(E?(C(j),j=-1):E=!0,le(w,K-ae))):($.sortIndex=N,o(g,$),M||D||(M=!0,_||(_=!0,te()))),$},n.unstable_shouldYield=S,n.unstable_wrapCallback=function($){var J=x;return function(){var K=x;x=J;try{return $.apply(this,arguments)}finally{x=K}}}}(Wu)),Wu}var Wg;function tS(){return Wg||(Wg=1,Yu.exports=eS()),Yu.exports}var Xu={exports:{}},St={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xg;function nS(){if(Xg)return St;Xg=1;var n=Td();function o(g){var m="https://react.dev/errors/"+g;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var y=2;y<arguments.length;y++)m+="&args[]="+encodeURIComponent(arguments[y])}return"Minified React error #"+g+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var l={d:{f:i,r:function(){throw Error(o(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},c=Symbol.for("react.portal");function d(g,m,y){var b=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:c,key:b==null?null:""+b,children:g,containerInfo:m,implementation:y}}var f=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function p(g,m){if(g==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return St.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=l,St.createPortal=function(g,m){var y=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(o(299));return d(g,m,null,y)},St.flushSync=function(g){var m=f.T,y=l.p;try{if(f.T=null,l.p=2,g)return g()}finally{f.T=m,l.p=y,l.d.f()}},St.preconnect=function(g,m){typeof g=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,l.d.C(g,m))},St.prefetchDNS=function(g){typeof g=="string"&&l.d.D(g)},St.preinit=function(g,m){if(typeof g=="string"&&m&&typeof m.as=="string"){var y=m.as,b=p(y,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,D=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;y==="style"?l.d.S(g,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:b,integrity:x,fetchPriority:D}):y==="script"&&l.d.X(g,{crossOrigin:b,integrity:x,fetchPriority:D,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},St.preinitModule=function(g,m){if(typeof g=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var y=p(m.as,m.crossOrigin);l.d.M(g,{crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&l.d.M(g)},St.preload=function(g,m){if(typeof g=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var y=m.as,b=p(y,m.crossOrigin);l.d.L(g,y,{crossOrigin:b,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},St.preloadModule=function(g,m){if(typeof g=="string")if(m){var y=p(m.as,m.crossOrigin);l.d.m(g,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:y,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else l.d.m(g)},St.requestFormReset=function(g){l.d.r(g)},St.unstable_batchedUpdates=function(g,m){return g(m)},St.useFormState=function(g,m,y){return f.H.useFormState(g,m,y)},St.useFormStatus=function(){return f.H.useHostTransitionStatus()},St.version="19.1.0",St}var Zg;function ly(){if(Zg)return Xu.exports;Zg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(o){console.error(o)}}return n(),Xu.exports=nS(),Xu.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qg;function aS(){if(Qg)return ai;Qg=1;var n=tS(),o=Td(),i=ly();function l(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)t+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function c(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function d(e){var t=e,a=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(a=t.return),e=t.return;while(e)}return t.tag===3?a:null}function f(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function p(e){if(d(e)!==e)throw Error(l(188))}function g(e){var t=e.alternate;if(!t){if(t=d(e),t===null)throw Error(l(188));return t!==e?null:e}for(var a=e,r=t;;){var s=a.return;if(s===null)break;var u=s.alternate;if(u===null){if(r=s.return,r!==null){a=r;continue}break}if(s.child===u.child){for(u=s.child;u;){if(u===a)return p(s),e;if(u===r)return p(s),t;u=u.sibling}throw Error(l(188))}if(a.return!==r.return)a=s,r=u;else{for(var h=!1,v=s.child;v;){if(v===a){h=!0,a=s,r=u;break}if(v===r){h=!0,r=s,a=u;break}v=v.sibling}if(!h){for(v=u.child;v;){if(v===a){h=!0,a=u,r=s;break}if(v===r){h=!0,r=u,a=s;break}v=v.sibling}if(!h)throw Error(l(189))}}if(a.alternate!==r)throw Error(l(190))}if(a.tag!==3)throw Error(l(188));return a.stateNode.current===a?e:t}function m(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=m(e),t!==null)return t;e=e.sibling}return null}var y=Object.assign,b=Symbol.for("react.element"),x=Symbol.for("react.transitional.element"),D=Symbol.for("react.portal"),M=Symbol.for("react.fragment"),E=Symbol.for("react.strict_mode"),z=Symbol.for("react.profiler"),O=Symbol.for("react.provider"),C=Symbol.for("react.consumer"),T=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),_=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),G=Symbol.for("react.lazy"),I=Symbol.for("react.activity"),S=Symbol.for("react.memo_cache_sentinel"),Z=Symbol.iterator;function te(e){return e===null||typeof e!="object"?null:(e=Z&&e[Z]||e["@@iterator"],typeof e=="function"?e:null)}var ie=Symbol.for("react.client.reference");function re(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===ie?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case M:return"Fragment";case z:return"Profiler";case E:return"StrictMode";case w:return"Suspense";case _:return"SuspenseList";case I:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case D:return"Portal";case T:return(e.displayName||"Context")+".Provider";case C:return(e._context.displayName||"Context")+".Consumer";case R:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case j:return t=e.displayName||null,t!==null?t:re(e.type)||"Memo";case G:t=e._payload,e=e._init;try{return re(e(t))}catch{}}return null}var le=Array.isArray,$=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,J=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},ae=[],N=-1;function W(e){return{current:e}}function ee(e){0>N||(e.current=ae[N],ae[N]=null,N--)}function ne(e,t){N++,ae[N]=e.current,e.current=t}var oe=W(null),me=W(null),ue=W(null),Ve=W(null);function Te(e,t){switch(ne(ue,t),ne(me,e),ne(oe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?hg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=hg(t),e=yg(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}ee(oe),ne(oe,e)}function Et(){ee(oe),ee(me),ee(ue)}function At(e){e.memoizedState!==null&&ne(Ve,e);var t=oe.current,a=yg(t,e.type);t!==a&&(ne(me,e),ne(oe,a))}function Tt(e){me.current===e&&(ee(oe),ee(me)),Ve.current===e&&(ee(Ve),Qo._currentValue=K)}var Aa=Object.prototype.hasOwnProperty,Mn=n.unstable_scheduleCallback,Ta=n.unstable_cancelCallback,Bs=n.unstable_shouldYield,Ds=n.unstable_requestPaint,Ct=n.unstable_now,Ca=n.unstable_getCurrentPriorityLevel,Oi=n.unstable_ImmediatePriority,ao=n.unstable_UserBlockingPriority,Qa=n.unstable_NormalPriority,ge=n.unstable_LowPriority,Qd=n.unstable_IdlePriority,Dv=n.log,Nv=n.unstable_setDisableYieldValue,ro=null,zt=null;function Zn(e){if(typeof Dv=="function"&&Nv(e),zt&&typeof zt.setStrictMode=="function")try{zt.setStrictMode(ro,e)}catch{}}var Lt=Math.clz32?Math.clz32:kv,zv=Math.log,Lv=Math.LN2;function kv(e){return e>>>=0,e===0?32:31-(zv(e)/Lv|0)|0}var _i=256,Bi=4194304;function Ra(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194048;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Di(e,t,a){var r=e.pendingLanes;if(r===0)return 0;var s=0,u=e.suspendedLanes,h=e.pingedLanes;e=e.warmLanes;var v=r&134217727;return v!==0?(r=v&~u,r!==0?s=Ra(r):(h&=v,h!==0?s=Ra(h):a||(a=v&~e,a!==0&&(s=Ra(a))))):(v=r&~u,v!==0?s=Ra(v):h!==0?s=Ra(h):a||(a=r&~e,a!==0&&(s=Ra(a)))),s===0?0:t!==0&&t!==s&&(t&u)===0&&(u=s&-s,a=t&-t,u>=a||u===32&&(a&4194048)!==0)?t:s}function oo(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function jv(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Kd(){var e=_i;return _i<<=1,(_i&4194048)===0&&(_i=256),e}function Jd(){var e=Bi;return Bi<<=1,(Bi&62914560)===0&&(Bi=4194304),e}function Ns(e){for(var t=[],a=0;31>a;a++)t.push(e);return t}function io(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Uv(e,t,a,r,s,u){var h=e.pendingLanes;e.pendingLanes=a,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=a,e.entangledLanes&=a,e.errorRecoveryDisabledLanes&=a,e.shellSuspendCounter=0;var v=e.entanglements,B=e.expirationTimes,P=e.hiddenUpdates;for(a=h&~a;0<a;){var Y=31-Lt(a),Q=1<<Y;v[Y]=0,B[Y]=-1;var H=P[Y];if(H!==null)for(P[Y]=null,Y=0;Y<H.length;Y++){var F=H[Y];F!==null&&(F.lane&=-536870913)}a&=~Q}r!==0&&ef(e,r,0),u!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=u&~(h&~t))}function ef(e,t,a){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Lt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|a&4194090}function tf(e,t){var a=e.entangledLanes|=t;for(e=e.entanglements;a;){var r=31-Lt(a),s=1<<r;s&t|e[r]&t&&(e[r]|=t),a&=~s}}function zs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ls(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function nf(){var e=J.p;return e!==0?e:(e=window.event,e===void 0?32:kg(e.type))}function $v(e,t){var a=J.p;try{return J.p=e,t()}finally{J.p=a}}var Qn=Math.random().toString(36).slice(2),vt="__reactFiber$"+Qn,Mt="__reactProps$"+Qn,Ka="__reactContainer$"+Qn,ks="__reactEvents$"+Qn,qv="__reactListeners$"+Qn,Pv="__reactHandles$"+Qn,af="__reactResources$"+Qn,lo="__reactMarker$"+Qn;function js(e){delete e[vt],delete e[Mt],delete e[ks],delete e[qv],delete e[Pv]}function Ja(e){var t=e[vt];if(t)return t;for(var a=e.parentNode;a;){if(t=a[Ka]||a[vt]){if(a=t.alternate,t.child!==null||a!==null&&a.child!==null)for(e=xg(e);e!==null;){if(a=e[vt])return a;e=xg(e)}return t}e=a,a=e.parentNode}return null}function er(e){if(e=e[vt]||e[Ka]){var t=e.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return e}return null}function so(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(l(33))}function tr(e){var t=e[af];return t||(t=e[af]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function st(e){e[lo]=!0}var rf=new Set,of={};function wa(e,t){nr(e,t),nr(e+"Capture",t)}function nr(e,t){for(of[e]=t,e=0;e<t.length;e++)rf.add(t[e])}var Iv=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),lf={},sf={};function Hv(e){return Aa.call(sf,e)?!0:Aa.call(lf,e)?!1:Iv.test(e)?sf[e]=!0:(lf[e]=!0,!1)}function Ni(e,t,a){if(Hv(t))if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var r=t.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+a)}}function zi(e,t,a){if(a===null)e.removeAttribute(t);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+a)}}function On(e,t,a,r){if(r===null)e.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(a);return}e.setAttributeNS(t,a,""+r)}}var Us,cf;function ar(e){if(Us===void 0)try{throw Error()}catch(a){var t=a.stack.trim().match(/\n( *(at )?)/);Us=t&&t[1]||"",cf=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Us+e+cf}var $s=!1;function qs(e,t){if(!e||$s)return"";$s=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var Q=function(){throw Error()};if(Object.defineProperty(Q.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Q,[])}catch(F){var H=F}Reflect.construct(e,[],Q)}else{try{Q.call()}catch(F){H=F}e.call(Q.prototype)}}else{try{throw Error()}catch(F){H=F}(Q=e())&&typeof Q.catch=="function"&&Q.catch(function(){})}}catch(F){if(F&&H&&typeof F.stack=="string")return[F.stack,H.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=r.DetermineComponentFrameRoot(),h=u[0],v=u[1];if(h&&v){var B=h.split(`
`),P=v.split(`
`);for(s=r=0;r<B.length&&!B[r].includes("DetermineComponentFrameRoot");)r++;for(;s<P.length&&!P[s].includes("DetermineComponentFrameRoot");)s++;if(r===B.length||s===P.length)for(r=B.length-1,s=P.length-1;1<=r&&0<=s&&B[r]!==P[s];)s--;for(;1<=r&&0<=s;r--,s--)if(B[r]!==P[s]){if(r!==1||s!==1)do if(r--,s--,0>s||B[r]!==P[s]){var Y=`
`+B[r].replace(" at new "," at ");return e.displayName&&Y.includes("<anonymous>")&&(Y=Y.replace("<anonymous>",e.displayName)),Y}while(1<=r&&0<=s);break}}}finally{$s=!1,Error.prepareStackTrace=a}return(a=e?e.displayName||e.name:"")?ar(a):""}function Fv(e){switch(e.tag){case 26:case 27:case 5:return ar(e.type);case 16:return ar("Lazy");case 13:return ar("Suspense");case 19:return ar("SuspenseList");case 0:case 15:return qs(e.type,!1);case 11:return qs(e.type.render,!1);case 1:return qs(e.type,!0);case 31:return ar("Activity");default:return""}}function uf(e){try{var t="";do t+=Fv(e),e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}function Yt(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function df(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Gv(e){var t=df(e)?"checked":"value",a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var s=a.get,u=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(h){r=""+h,u.call(this,h)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return r},setValue:function(h){r=""+h},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Li(e){e._valueTracker||(e._valueTracker=Gv(e))}function ff(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var a=t.getValue(),r="";return e&&(r=df(e)?e.checked?"true":"false":e.value),e=r,e!==a?(t.setValue(e),!0):!1}function ki(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var Vv=/[\n"\\]/g;function Wt(e){return e.replace(Vv,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Ps(e,t,a,r,s,u,h,v){e.name="",h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"?e.type=h:e.removeAttribute("type"),t!=null?h==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Yt(t)):e.value!==""+Yt(t)&&(e.value=""+Yt(t)):h!=="submit"&&h!=="reset"||e.removeAttribute("value"),t!=null?Is(e,h,Yt(t)):a!=null?Is(e,h,Yt(a)):r!=null&&e.removeAttribute("value"),s==null&&u!=null&&(e.defaultChecked=!!u),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),v!=null&&typeof v!="function"&&typeof v!="symbol"&&typeof v!="boolean"?e.name=""+Yt(v):e.removeAttribute("name")}function pf(e,t,a,r,s,u,h,v){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(e.type=u),t!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||t!=null))return;a=a!=null?""+Yt(a):"",t=t!=null?""+Yt(t):a,v||t===e.value||(e.value=t),e.defaultValue=t}r=r??s,r=typeof r!="function"&&typeof r!="symbol"&&!!r,e.checked=v?e.checked:!!r,e.defaultChecked=!!r,h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.name=h)}function Is(e,t,a){t==="number"&&ki(e.ownerDocument)===e||e.defaultValue===""+a||(e.defaultValue=""+a)}function rr(e,t,a,r){if(e=e.options,t){t={};for(var s=0;s<a.length;s++)t["$"+a[s]]=!0;for(a=0;a<e.length;a++)s=t.hasOwnProperty("$"+e[a].value),e[a].selected!==s&&(e[a].selected=s),s&&r&&(e[a].defaultSelected=!0)}else{for(a=""+Yt(a),t=null,s=0;s<e.length;s++){if(e[s].value===a){e[s].selected=!0,r&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function mf(e,t,a){if(t!=null&&(t=""+Yt(t),t!==e.value&&(e.value=t),a==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=a!=null?""+Yt(a):""}function gf(e,t,a,r){if(t==null){if(r!=null){if(a!=null)throw Error(l(92));if(le(r)){if(1<r.length)throw Error(l(93));r=r[0]}a=r}a==null&&(a=""),t=a}a=Yt(t),e.defaultValue=a,r=e.textContent,r===a&&r!==""&&r!==null&&(e.value=r)}function or(e,t){if(t){var a=e.firstChild;if(a&&a===e.lastChild&&a.nodeType===3){a.nodeValue=t;return}}e.textContent=t}var Yv=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hf(e,t,a){var r=t.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":r?e.setProperty(t,a):typeof a!="number"||a===0||Yv.has(t)?t==="float"?e.cssFloat=a:e[t]=(""+a).trim():e[t]=a+"px"}function yf(e,t,a){if(t!=null&&typeof t!="object")throw Error(l(62));if(e=e.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf("--")===0?e.setProperty(r,""):r==="float"?e.cssFloat="":e[r]="");for(var s in t)r=t[s],t.hasOwnProperty(s)&&a[s]!==r&&hf(e,s,r)}else for(var u in t)t.hasOwnProperty(u)&&hf(e,u,t[u])}function Hs(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Wv=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Xv=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function ji(e){return Xv.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}var Fs=null;function Gs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ir=null,lr=null;function vf(e){var t=er(e);if(t&&(e=t.stateNode)){var a=e[Mt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Ps(e,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),t=a.name,a.type==="radio"&&t!=null){for(a=e;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Wt(""+t)+'"][type="radio"]'),t=0;t<a.length;t++){var r=a[t];if(r!==e&&r.form===e.form){var s=r[Mt]||null;if(!s)throw Error(l(90));Ps(r,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<a.length;t++)r=a[t],r.form===e.form&&ff(r)}break e;case"textarea":mf(e,a.value,a.defaultValue);break e;case"select":t=a.value,t!=null&&rr(e,!!a.multiple,t,!1)}}}var Vs=!1;function bf(e,t,a){if(Vs)return e(t,a);Vs=!0;try{var r=e(t);return r}finally{if(Vs=!1,(ir!==null||lr!==null)&&(El(),ir&&(t=ir,e=lr,lr=ir=null,vf(t),e)))for(t=0;t<e.length;t++)vf(e[t])}}function co(e,t){var a=e.stateNode;if(a===null)return null;var r=a[Mt]||null;if(r===null)return null;a=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(a&&typeof a!="function")throw Error(l(231,t,typeof a));return a}var _n=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ys=!1;if(_n)try{var uo={};Object.defineProperty(uo,"passive",{get:function(){Ys=!0}}),window.addEventListener("test",uo,uo),window.removeEventListener("test",uo,uo)}catch{Ys=!1}var Kn=null,Ws=null,Ui=null;function Sf(){if(Ui)return Ui;var e,t=Ws,a=t.length,r,s="value"in Kn?Kn.value:Kn.textContent,u=s.length;for(e=0;e<a&&t[e]===s[e];e++);var h=a-e;for(r=1;r<=h&&t[a-r]===s[u-r];r++);return Ui=s.slice(e,1<r?1-r:void 0)}function $i(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qi(){return!0}function xf(){return!1}function Ot(e){function t(a,r,s,u,h){this._reactName=a,this._targetInst=s,this.type=r,this.nativeEvent=u,this.target=h,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(a=e[v],this[v]=a?a(u):u[v]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?qi:xf,this.isPropagationStopped=xf,this}return y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=qi)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=qi)},persist:function(){},isPersistent:qi}),t}var Ma={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pi=Ot(Ma),fo=y({},Ma,{view:0,detail:0}),Zv=Ot(fo),Xs,Zs,po,Ii=y({},fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ks,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==po&&(po&&e.type==="mousemove"?(Xs=e.screenX-po.screenX,Zs=e.screenY-po.screenY):Zs=Xs=0,po=e),Xs)},movementY:function(e){return"movementY"in e?e.movementY:Zs}}),Ef=Ot(Ii),Qv=y({},Ii,{dataTransfer:0}),Kv=Ot(Qv),Jv=y({},fo,{relatedTarget:0}),Qs=Ot(Jv),eb=y({},Ma,{animationName:0,elapsedTime:0,pseudoElement:0}),tb=Ot(eb),nb=y({},Ma,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),ab=Ot(nb),rb=y({},Ma,{data:0}),Af=Ot(rb),ob={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ib={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},lb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function sb(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=lb[e])?!!t[e]:!1}function Ks(){return sb}var cb=y({},fo,{key:function(e){if(e.key){var t=ob[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=$i(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ib[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ks,charCode:function(e){return e.type==="keypress"?$i(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?$i(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),ub=Ot(cb),db=y({},Ii,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Tf=Ot(db),fb=y({},fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ks}),pb=Ot(fb),mb=y({},Ma,{propertyName:0,elapsedTime:0,pseudoElement:0}),gb=Ot(mb),hb=y({},Ii,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),yb=Ot(hb),vb=y({},Ma,{newState:0,oldState:0}),bb=Ot(vb),Sb=[9,13,27,32],Js=_n&&"CompositionEvent"in window,mo=null;_n&&"documentMode"in document&&(mo=document.documentMode);var xb=_n&&"TextEvent"in window&&!mo,Cf=_n&&(!Js||mo&&8<mo&&11>=mo),Rf=" ",wf=!1;function Mf(e,t){switch(e){case"keyup":return Sb.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Of(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var sr=!1;function Eb(e,t){switch(e){case"compositionend":return Of(t);case"keypress":return t.which!==32?null:(wf=!0,Rf);case"textInput":return e=t.data,e===Rf&&wf?null:e;default:return null}}function Ab(e,t){if(sr)return e==="compositionend"||!Js&&Mf(e,t)?(e=Sf(),Ui=Ws=Kn=null,sr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Cf&&t.locale!=="ko"?null:t.data;default:return null}}var Tb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function _f(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Tb[e.type]:t==="textarea"}function Bf(e,t,a,r){ir?lr?lr.push(r):lr=[r]:ir=r,t=Ml(t,"onChange"),0<t.length&&(a=new Pi("onChange","change",null,a,r),e.push({event:a,listeners:t}))}var go=null,ho=null;function Cb(e){dg(e,0)}function Hi(e){var t=so(e);if(ff(t))return e}function Df(e,t){if(e==="change")return t}var Nf=!1;if(_n){var ec;if(_n){var tc="oninput"in document;if(!tc){var zf=document.createElement("div");zf.setAttribute("oninput","return;"),tc=typeof zf.oninput=="function"}ec=tc}else ec=!1;Nf=ec&&(!document.documentMode||9<document.documentMode)}function Lf(){go&&(go.detachEvent("onpropertychange",kf),ho=go=null)}function kf(e){if(e.propertyName==="value"&&Hi(ho)){var t=[];Bf(t,ho,e,Gs(e)),bf(Cb,t)}}function Rb(e,t,a){e==="focusin"?(Lf(),go=t,ho=a,go.attachEvent("onpropertychange",kf)):e==="focusout"&&Lf()}function wb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Hi(ho)}function Mb(e,t){if(e==="click")return Hi(t)}function Ob(e,t){if(e==="input"||e==="change")return Hi(t)}function _b(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var kt=typeof Object.is=="function"?Object.is:_b;function yo(e,t){if(kt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var a=Object.keys(e),r=Object.keys(t);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var s=a[r];if(!Aa.call(t,s)||!kt(e[s],t[s]))return!1}return!0}function jf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Uf(e,t){var a=jf(e);e=0;for(var r;a;){if(a.nodeType===3){if(r=e+a.textContent.length,e<=t&&r>=t)return{node:a,offset:t-e};e=r}e:{for(;a;){if(a.nextSibling){a=a.nextSibling;break e}a=a.parentNode}a=void 0}a=jf(a)}}function $f(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?$f(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qf(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ki(e.document);t instanceof e.HTMLIFrameElement;){try{var a=typeof t.contentWindow.location.href=="string"}catch{a=!1}if(a)e=t.contentWindow;else break;t=ki(e.document)}return t}function nc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var Bb=_n&&"documentMode"in document&&11>=document.documentMode,cr=null,ac=null,vo=null,rc=!1;function Pf(e,t,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;rc||cr==null||cr!==ki(r)||(r=cr,"selectionStart"in r&&nc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),vo&&yo(vo,r)||(vo=r,r=Ml(ac,"onSelect"),0<r.length&&(t=new Pi("onSelect","select",null,t,a),e.push({event:t,listeners:r}),t.target=cr)))}function Oa(e,t){var a={};return a[e.toLowerCase()]=t.toLowerCase(),a["Webkit"+e]="webkit"+t,a["Moz"+e]="moz"+t,a}var ur={animationend:Oa("Animation","AnimationEnd"),animationiteration:Oa("Animation","AnimationIteration"),animationstart:Oa("Animation","AnimationStart"),transitionrun:Oa("Transition","TransitionRun"),transitionstart:Oa("Transition","TransitionStart"),transitioncancel:Oa("Transition","TransitionCancel"),transitionend:Oa("Transition","TransitionEnd")},oc={},If={};_n&&(If=document.createElement("div").style,"AnimationEvent"in window||(delete ur.animationend.animation,delete ur.animationiteration.animation,delete ur.animationstart.animation),"TransitionEvent"in window||delete ur.transitionend.transition);function _a(e){if(oc[e])return oc[e];if(!ur[e])return e;var t=ur[e],a;for(a in t)if(t.hasOwnProperty(a)&&a in If)return oc[e]=t[a];return e}var Hf=_a("animationend"),Ff=_a("animationiteration"),Gf=_a("animationstart"),Db=_a("transitionrun"),Nb=_a("transitionstart"),zb=_a("transitioncancel"),Vf=_a("transitionend"),Yf=new Map,ic="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ic.push("scrollEnd");function on(e,t){Yf.set(e,t),wa(t,[e])}var Wf=new WeakMap;function Xt(e,t){if(typeof e=="object"&&e!==null){var a=Wf.get(e);return a!==void 0?a:(t={value:e,source:t,stack:uf(t)},Wf.set(e,t),t)}return{value:e,source:t,stack:uf(t)}}var Zt=[],dr=0,lc=0;function Fi(){for(var e=dr,t=lc=dr=0;t<e;){var a=Zt[t];Zt[t++]=null;var r=Zt[t];Zt[t++]=null;var s=Zt[t];Zt[t++]=null;var u=Zt[t];if(Zt[t++]=null,r!==null&&s!==null){var h=r.pending;h===null?s.next=s:(s.next=h.next,h.next=s),r.pending=s}u!==0&&Xf(a,s,u)}}function Gi(e,t,a,r){Zt[dr++]=e,Zt[dr++]=t,Zt[dr++]=a,Zt[dr++]=r,lc|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function sc(e,t,a,r){return Gi(e,t,a,r),Vi(e)}function fr(e,t){return Gi(e,null,null,t),Vi(e)}function Xf(e,t,a){e.lanes|=a;var r=e.alternate;r!==null&&(r.lanes|=a);for(var s=!1,u=e.return;u!==null;)u.childLanes|=a,r=u.alternate,r!==null&&(r.childLanes|=a),u.tag===22&&(e=u.stateNode,e===null||e._visibility&1||(s=!0)),e=u,u=u.return;return e.tag===3?(u=e.stateNode,s&&t!==null&&(s=31-Lt(a),e=u.hiddenUpdates,r=e[s],r===null?e[s]=[t]:r.push(t),t.lane=a|536870912),u):null}function Vi(e){if(50<Ho)throw Ho=0,mu=null,Error(l(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var pr={};function Lb(e,t,a,r){this.tag=e,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function jt(e,t,a,r){return new Lb(e,t,a,r)}function cc(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Bn(e,t){var a=e.alternate;return a===null?(a=jt(e.tag,t,e.key,e.mode),a.elementType=e.elementType,a.type=e.type,a.stateNode=e.stateNode,a.alternate=e,e.alternate=a):(a.pendingProps=t,a.type=e.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=e.flags&65011712,a.childLanes=e.childLanes,a.lanes=e.lanes,a.child=e.child,a.memoizedProps=e.memoizedProps,a.memoizedState=e.memoizedState,a.updateQueue=e.updateQueue,t=e.dependencies,a.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},a.sibling=e.sibling,a.index=e.index,a.ref=e.ref,a.refCleanup=e.refCleanup,a}function Zf(e,t){e.flags&=65011714;var a=e.alternate;return a===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=a.childLanes,e.lanes=a.lanes,e.child=a.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=a.memoizedProps,e.memoizedState=a.memoizedState,e.updateQueue=a.updateQueue,e.type=a.type,t=a.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Yi(e,t,a,r,s,u){var h=0;if(r=e,typeof e=="function")cc(e)&&(h=1);else if(typeof e=="string")h=j0(e,a,oe.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case I:return e=jt(31,a,t,s),e.elementType=I,e.lanes=u,e;case M:return Ba(a.children,s,u,t);case E:h=8,s|=24;break;case z:return e=jt(12,a,t,s|2),e.elementType=z,e.lanes=u,e;case w:return e=jt(13,a,t,s),e.elementType=w,e.lanes=u,e;case _:return e=jt(19,a,t,s),e.elementType=_,e.lanes=u,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case O:case T:h=10;break e;case C:h=9;break e;case R:h=11;break e;case j:h=14;break e;case G:h=16,r=null;break e}h=29,a=Error(l(130,e===null?"null":typeof e,"")),r=null}return t=jt(h,a,t,s),t.elementType=e,t.type=r,t.lanes=u,t}function Ba(e,t,a,r){return e=jt(7,e,r,t),e.lanes=a,e}function uc(e,t,a){return e=jt(6,e,null,t),e.lanes=a,e}function dc(e,t,a){return t=jt(4,e.children!==null?e.children:[],e.key,t),t.lanes=a,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var mr=[],gr=0,Wi=null,Xi=0,Qt=[],Kt=0,Da=null,Dn=1,Nn="";function Na(e,t){mr[gr++]=Xi,mr[gr++]=Wi,Wi=e,Xi=t}function Qf(e,t,a){Qt[Kt++]=Dn,Qt[Kt++]=Nn,Qt[Kt++]=Da,Da=e;var r=Dn;e=Nn;var s=32-Lt(r)-1;r&=~(1<<s),a+=1;var u=32-Lt(t)+s;if(30<u){var h=s-s%5;u=(r&(1<<h)-1).toString(32),r>>=h,s-=h,Dn=1<<32-Lt(t)+s|a<<s|r,Nn=u+e}else Dn=1<<u|a<<s|r,Nn=e}function fc(e){e.return!==null&&(Na(e,1),Qf(e,1,0))}function pc(e){for(;e===Wi;)Wi=mr[--gr],mr[gr]=null,Xi=mr[--gr],mr[gr]=null;for(;e===Da;)Da=Qt[--Kt],Qt[Kt]=null,Nn=Qt[--Kt],Qt[Kt]=null,Dn=Qt[--Kt],Qt[Kt]=null}var Rt=null,Ye=null,we=!1,za=null,fn=!1,mc=Error(l(519));function La(e){var t=Error(l(418,""));throw xo(Xt(t,e)),mc}function Kf(e){var t=e.stateNode,a=e.type,r=e.memoizedProps;switch(t[vt]=e,t[Mt]=r,a){case"dialog":Ee("cancel",t),Ee("close",t);break;case"iframe":case"object":case"embed":Ee("load",t);break;case"video":case"audio":for(a=0;a<Go.length;a++)Ee(Go[a],t);break;case"source":Ee("error",t);break;case"img":case"image":case"link":Ee("error",t),Ee("load",t);break;case"details":Ee("toggle",t);break;case"input":Ee("invalid",t),pf(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0),Li(t);break;case"select":Ee("invalid",t);break;case"textarea":Ee("invalid",t),gf(t,r.value,r.defaultValue,r.children),Li(t)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||t.textContent===""+a||r.suppressHydrationWarning===!0||gg(t.textContent,a)?(r.popover!=null&&(Ee("beforetoggle",t),Ee("toggle",t)),r.onScroll!=null&&Ee("scroll",t),r.onScrollEnd!=null&&Ee("scrollend",t),r.onClick!=null&&(t.onclick=Ol),t=!0):t=!1,t||La(e)}function Jf(e){for(Rt=e.return;Rt;)switch(Rt.tag){case 5:case 13:fn=!1;return;case 27:case 3:fn=!0;return;default:Rt=Rt.return}}function bo(e){if(e!==Rt)return!1;if(!we)return Jf(e),we=!0,!1;var t=e.tag,a;if((a=t!==3&&t!==27)&&((a=t===5)&&(a=e.type,a=!(a!=="form"&&a!=="button")||_u(e.type,e.memoizedProps)),a=!a),a&&Ye&&La(e),Jf(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8)if(a=e.data,a==="/$"){if(t===0){Ye=sn(e.nextSibling);break e}t--}else a!=="$"&&a!=="$!"&&a!=="$?"||t++;e=e.nextSibling}Ye=null}}else t===27?(t=Ye,ma(e.type)?(e=zu,zu=null,Ye=e):Ye=t):Ye=Rt?sn(e.stateNode.nextSibling):null;return!0}function So(){Ye=Rt=null,we=!1}function ep(){var e=za;return e!==null&&(Dt===null?Dt=e:Dt.push.apply(Dt,e),za=null),e}function xo(e){za===null?za=[e]:za.push(e)}var gc=W(null),ka=null,zn=null;function Jn(e,t,a){ne(gc,t._currentValue),t._currentValue=a}function Ln(e){e._currentValue=gc.current,ee(gc)}function hc(e,t,a){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===a)break;e=e.return}}function yc(e,t,a,r){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var u=s.dependencies;if(u!==null){var h=s.child;u=u.firstContext;e:for(;u!==null;){var v=u;u=s;for(var B=0;B<t.length;B++)if(v.context===t[B]){u.lanes|=a,v=u.alternate,v!==null&&(v.lanes|=a),hc(u.return,a,e),r||(h=null);break e}u=v.next}}else if(s.tag===18){if(h=s.return,h===null)throw Error(l(341));h.lanes|=a,u=h.alternate,u!==null&&(u.lanes|=a),hc(h,a,e),h=null}else h=s.child;if(h!==null)h.return=s;else for(h=s;h!==null;){if(h===e){h=null;break}if(s=h.sibling,s!==null){s.return=h.return,h=s;break}h=h.return}s=h}}function Eo(e,t,a,r){e=null;for(var s=t,u=!1;s!==null;){if(!u){if((s.flags&524288)!==0)u=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var h=s.alternate;if(h===null)throw Error(l(387));if(h=h.memoizedProps,h!==null){var v=s.type;kt(s.pendingProps.value,h.value)||(e!==null?e.push(v):e=[v])}}else if(s===Ve.current){if(h=s.alternate,h===null)throw Error(l(387));h.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(Qo):e=[Qo])}s=s.return}e!==null&&yc(t,e,a,r),t.flags|=262144}function Zi(e){for(e=e.firstContext;e!==null;){if(!kt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ja(e){ka=e,zn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function bt(e){return tp(ka,e)}function Qi(e,t){return ka===null&&ja(e),tp(e,t)}function tp(e,t){var a=t._currentValue;if(t={context:t,memoizedValue:a,next:null},zn===null){if(e===null)throw Error(l(308));zn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else zn=zn.next=t;return a}var kb=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(a,r){e.push(r)}};this.abort=function(){t.aborted=!0,e.forEach(function(a){return a()})}},jb=n.unstable_scheduleCallback,Ub=n.unstable_NormalPriority,rt={$$typeof:T,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function vc(){return{controller:new kb,data:new Map,refCount:0}}function Ao(e){e.refCount--,e.refCount===0&&jb(Ub,function(){e.controller.abort()})}var To=null,bc=0,hr=0,yr=null;function $b(e,t){if(To===null){var a=To=[];bc=0,hr=xu(),yr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return bc++,t.then(np,np),t}function np(){if(--bc===0&&To!==null){yr!==null&&(yr.status="fulfilled");var e=To;To=null,hr=0,yr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function qb(e,t){var a=[],r={status:"pending",value:null,reason:null,then:function(s){a.push(s)}};return e.then(function(){r.status="fulfilled",r.value=t;for(var s=0;s<a.length;s++)(0,a[s])(t)},function(s){for(r.status="rejected",r.reason=s,s=0;s<a.length;s++)(0,a[s])(void 0)}),r}var ap=$.S;$.S=function(e,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&$b(e,t),ap!==null&&ap(e,t)};var Ua=W(null);function Sc(){var e=Ua.current;return e!==null?e:qe.pooledCache}function Ki(e,t){t===null?ne(Ua,Ua.current):ne(Ua,t.pool)}function rp(){var e=Sc();return e===null?null:{parent:rt._currentValue,pool:e}}var Co=Error(l(460)),op=Error(l(474)),Ji=Error(l(542)),xc={then:function(){}};function ip(e){return e=e.status,e==="fulfilled"||e==="rejected"}function el(){}function lp(e,t,a){switch(a=e[a],a===void 0?e.push(t):a!==t&&(t.then(el,el),t=a),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cp(e),e;default:if(typeof t.status=="string")t.then(el,el);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(l(482));e=t,e.status="pending",e.then(function(r){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=r}},function(r){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=r}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,cp(e),e}throw Ro=t,Co}}var Ro=null;function sp(){if(Ro===null)throw Error(l(459));var e=Ro;return Ro=null,e}function cp(e){if(e===Co||e===Ji)throw Error(l(483))}var ea=!1;function Ec(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ac(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ta(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function na(e,t,a){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,(Be&2)!==0){var s=r.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),r.pending=t,t=Vi(e),Xf(e,null,a),t}return Gi(e,r,t,a),Vi(e)}function wo(e,t,a){if(t=t.updateQueue,t!==null&&(t=t.shared,(a&4194048)!==0)){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,tf(e,a)}}function Tc(e,t){var a=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var s=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var h={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?s=u=h:u=u.next=h,a=a.next}while(a!==null);u===null?s=u=t:u=u.next=t}else s=u=t;a={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},e.updateQueue=a;return}e=a.lastBaseUpdate,e===null?a.firstBaseUpdate=t:e.next=t,a.lastBaseUpdate=t}var Cc=!1;function Mo(){if(Cc){var e=yr;if(e!==null)throw e}}function Oo(e,t,a,r){Cc=!1;var s=e.updateQueue;ea=!1;var u=s.firstBaseUpdate,h=s.lastBaseUpdate,v=s.shared.pending;if(v!==null){s.shared.pending=null;var B=v,P=B.next;B.next=null,h===null?u=P:h.next=P,h=B;var Y=e.alternate;Y!==null&&(Y=Y.updateQueue,v=Y.lastBaseUpdate,v!==h&&(v===null?Y.firstBaseUpdate=P:v.next=P,Y.lastBaseUpdate=B))}if(u!==null){var Q=s.baseState;h=0,Y=P=B=null,v=u;do{var H=v.lane&-536870913,F=H!==v.lane;if(F?(Ae&H)===H:(r&H)===H){H!==0&&H===hr&&(Cc=!0),Y!==null&&(Y=Y.next={lane:0,tag:v.tag,payload:v.payload,callback:null,next:null});e:{var pe=e,de=v;H=t;var Le=a;switch(de.tag){case 1:if(pe=de.payload,typeof pe=="function"){Q=pe.call(Le,Q,H);break e}Q=pe;break e;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=de.payload,H=typeof pe=="function"?pe.call(Le,Q,H):pe,H==null)break e;Q=y({},Q,H);break e;case 2:ea=!0}}H=v.callback,H!==null&&(e.flags|=64,F&&(e.flags|=8192),F=s.callbacks,F===null?s.callbacks=[H]:F.push(H))}else F={lane:H,tag:v.tag,payload:v.payload,callback:v.callback,next:null},Y===null?(P=Y=F,B=Q):Y=Y.next=F,h|=H;if(v=v.next,v===null){if(v=s.shared.pending,v===null)break;F=v,v=F.next,F.next=null,s.lastBaseUpdate=F,s.shared.pending=null}}while(!0);Y===null&&(B=Q),s.baseState=B,s.firstBaseUpdate=P,s.lastBaseUpdate=Y,u===null&&(s.shared.lanes=0),ua|=h,e.lanes=h,e.memoizedState=Q}}function up(e,t){if(typeof e!="function")throw Error(l(191,e));e.call(t)}function dp(e,t){var a=e.callbacks;if(a!==null)for(e.callbacks=null,e=0;e<a.length;e++)up(a[e],t)}var vr=W(null),tl=W(0);function fp(e,t){e=In,ne(tl,e),ne(vr,t),In=e|t.baseLanes}function Rc(){ne(tl,In),ne(vr,vr.current)}function wc(){In=tl.current,ee(vr),ee(tl)}var aa=0,ve=null,Ne=null,et=null,nl=!1,br=!1,$a=!1,al=0,_o=0,Sr=null,Pb=0;function Qe(){throw Error(l(321))}function Mc(e,t){if(t===null)return!1;for(var a=0;a<t.length&&a<e.length;a++)if(!kt(e[a],t[a]))return!1;return!0}function Oc(e,t,a,r,s,u){return aa=u,ve=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,$.H=e===null||e.memoizedState===null?Xp:Zp,$a=!1,u=a(r,s),$a=!1,br&&(u=mp(t,a,r,s)),pp(e),u}function pp(e){$.H=cl;var t=Ne!==null&&Ne.next!==null;if(aa=0,et=Ne=ve=null,nl=!1,_o=0,Sr=null,t)throw Error(l(300));e===null||ct||(e=e.dependencies,e!==null&&Zi(e)&&(ct=!0))}function mp(e,t,a,r){ve=e;var s=0;do{if(br&&(Sr=null),_o=0,br=!1,25<=s)throw Error(l(301));if(s+=1,et=Ne=null,e.updateQueue!=null){var u=e.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}$.H=Wb,u=t(a,r)}while(br);return u}function Ib(){var e=$.H,t=e.useState()[0];return t=typeof t.then=="function"?Bo(t):t,e=e.useState()[0],(Ne!==null?Ne.memoizedState:null)!==e&&(ve.flags|=1024),t}function _c(){var e=al!==0;return al=0,e}function Bc(e,t,a){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a}function Dc(e){if(nl){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}nl=!1}aa=0,et=Ne=ve=null,br=!1,_o=al=0,Sr=null}function _t(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return et===null?ve.memoizedState=et=e:et=et.next=e,et}function tt(){if(Ne===null){var e=ve.alternate;e=e!==null?e.memoizedState:null}else e=Ne.next;var t=et===null?ve.memoizedState:et.next;if(t!==null)et=t,Ne=e;else{if(e===null)throw ve.alternate===null?Error(l(467)):Error(l(310));Ne=e,e={memoizedState:Ne.memoizedState,baseState:Ne.baseState,baseQueue:Ne.baseQueue,queue:Ne.queue,next:null},et===null?ve.memoizedState=et=e:et=et.next=e}return et}function Nc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Bo(e){var t=_o;return _o+=1,Sr===null&&(Sr=[]),e=lp(Sr,e,t),t=ve,(et===null?t.memoizedState:et.next)===null&&(t=t.alternate,$.H=t===null||t.memoizedState===null?Xp:Zp),e}function rl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Bo(e);if(e.$$typeof===T)return bt(e)}throw Error(l(438,String(e)))}function zc(e){var t=null,a=ve.updateQueue;if(a!==null&&(t=a.memoCache),t==null){var r=ve.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),a===null&&(a=Nc(),ve.updateQueue=a),a.memoCache=t,a=t.data[t.index],a===void 0)for(a=t.data[t.index]=Array(e),r=0;r<e;r++)a[r]=S;return t.index++,a}function kn(e,t){return typeof t=="function"?t(e):t}function ol(e){var t=tt();return Lc(t,Ne,e)}function Lc(e,t,a){var r=e.queue;if(r===null)throw Error(l(311));r.lastRenderedReducer=a;var s=e.baseQueue,u=r.pending;if(u!==null){if(s!==null){var h=s.next;s.next=u.next,u.next=h}t.baseQueue=s=u,r.pending=null}if(u=e.baseState,s===null)e.memoizedState=u;else{t=s.next;var v=h=null,B=null,P=t,Y=!1;do{var Q=P.lane&-536870913;if(Q!==P.lane?(Ae&Q)===Q:(aa&Q)===Q){var H=P.revertLane;if(H===0)B!==null&&(B=B.next={lane:0,revertLane:0,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null}),Q===hr&&(Y=!0);else if((aa&H)===H){P=P.next,H===hr&&(Y=!0);continue}else Q={lane:0,revertLane:P.revertLane,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null},B===null?(v=B=Q,h=u):B=B.next=Q,ve.lanes|=H,ua|=H;Q=P.action,$a&&a(u,Q),u=P.hasEagerState?P.eagerState:a(u,Q)}else H={lane:Q,revertLane:P.revertLane,action:P.action,hasEagerState:P.hasEagerState,eagerState:P.eagerState,next:null},B===null?(v=B=H,h=u):B=B.next=H,ve.lanes|=Q,ua|=Q;P=P.next}while(P!==null&&P!==t);if(B===null?h=u:B.next=v,!kt(u,e.memoizedState)&&(ct=!0,Y&&(a=yr,a!==null)))throw a;e.memoizedState=u,e.baseState=h,e.baseQueue=B,r.lastRenderedState=u}return s===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function kc(e){var t=tt(),a=t.queue;if(a===null)throw Error(l(311));a.lastRenderedReducer=e;var r=a.dispatch,s=a.pending,u=t.memoizedState;if(s!==null){a.pending=null;var h=s=s.next;do u=e(u,h.action),h=h.next;while(h!==s);kt(u,t.memoizedState)||(ct=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),a.lastRenderedState=u}return[u,r]}function gp(e,t,a){var r=ve,s=tt(),u=we;if(u){if(a===void 0)throw Error(l(407));a=a()}else a=t();var h=!kt((Ne||s).memoizedState,a);h&&(s.memoizedState=a,ct=!0),s=s.queue;var v=vp.bind(null,r,s,e);if(Do(2048,8,v,[e]),s.getSnapshot!==t||h||et!==null&&et.memoizedState.tag&1){if(r.flags|=2048,xr(9,il(),yp.bind(null,r,s,a,t),null),qe===null)throw Error(l(349));u||(aa&124)!==0||hp(r,t,a)}return a}function hp(e,t,a){e.flags|=16384,e={getSnapshot:t,value:a},t=ve.updateQueue,t===null?(t=Nc(),ve.updateQueue=t,t.stores=[e]):(a=t.stores,a===null?t.stores=[e]:a.push(e))}function yp(e,t,a,r){t.value=a,t.getSnapshot=r,bp(t)&&Sp(e)}function vp(e,t,a){return a(function(){bp(t)&&Sp(e)})}function bp(e){var t=e.getSnapshot;e=e.value;try{var a=t();return!kt(e,a)}catch{return!0}}function Sp(e){var t=fr(e,2);t!==null&&It(t,e,2)}function jc(e){var t=_t();if(typeof e=="function"){var a=e;if(e=a(),$a){Zn(!0);try{a()}finally{Zn(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:e},t}function xp(e,t,a,r){return e.baseState=a,Lc(e,Ne,typeof r=="function"?r:kn)}function Hb(e,t,a,r,s){if(sl(e))throw Error(l(485));if(e=t.action,e!==null){var u={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(h){u.listeners.push(h)}};$.T!==null?a(!0):u.isTransition=!1,r(u),a=t.pending,a===null?(u.next=t.pending=u,Ep(t,u)):(u.next=a.next,t.pending=a.next=u)}}function Ep(e,t){var a=t.action,r=t.payload,s=e.state;if(t.isTransition){var u=$.T,h={};$.T=h;try{var v=a(s,r),B=$.S;B!==null&&B(h,v),Ap(e,t,v)}catch(P){Uc(e,t,P)}finally{$.T=u}}else try{u=a(s,r),Ap(e,t,u)}catch(P){Uc(e,t,P)}}function Ap(e,t,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Tp(e,t,r)},function(r){return Uc(e,t,r)}):Tp(e,t,a)}function Tp(e,t,a){t.status="fulfilled",t.value=a,Cp(t),e.state=a,t=e.pending,t!==null&&(a=t.next,a===t?e.pending=null:(a=a.next,t.next=a,Ep(e,a)))}function Uc(e,t,a){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status="rejected",t.reason=a,Cp(t),t=t.next;while(t!==r)}e.action=null}function Cp(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Rp(e,t){return t}function wp(e,t){if(we){var a=qe.formState;if(a!==null){e:{var r=ve;if(we){if(Ye){t:{for(var s=Ye,u=fn;s.nodeType!==8;){if(!u){s=null;break t}if(s=sn(s.nextSibling),s===null){s=null;break t}}u=s.data,s=u==="F!"||u==="F"?s:null}if(s){Ye=sn(s.nextSibling),r=s.data==="F!";break e}}La(r)}r=!1}r&&(t=a[0])}}return a=_t(),a.memoizedState=a.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rp,lastRenderedState:t},a.queue=r,a=Vp.bind(null,ve,r),r.dispatch=a,r=jc(!1),u=Hc.bind(null,ve,!1,r.queue),r=_t(),s={state:t,dispatch:null,action:e,pending:null},r.queue=s,a=Hb.bind(null,ve,s,u,a),s.dispatch=a,r.memoizedState=e,[t,a,!1]}function Mp(e){var t=tt();return Op(t,Ne,e)}function Op(e,t,a){if(t=Lc(e,t,Rp)[0],e=ol(kn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var r=Bo(t)}catch(h){throw h===Co?Ji:h}else r=t;t=tt();var s=t.queue,u=s.dispatch;return a!==t.memoizedState&&(ve.flags|=2048,xr(9,il(),Fb.bind(null,s,a),null)),[r,u,e]}function Fb(e,t){e.action=t}function _p(e){var t=tt(),a=Ne;if(a!==null)return Op(t,a,e);tt(),t=t.memoizedState,a=tt();var r=a.queue.dispatch;return a.memoizedState=e,[t,r,!1]}function xr(e,t,a,r){return e={tag:e,create:a,deps:r,inst:t,next:null},t=ve.updateQueue,t===null&&(t=Nc(),ve.updateQueue=t),a=t.lastEffect,a===null?t.lastEffect=e.next=e:(r=a.next,a.next=e,e.next=r,t.lastEffect=e),e}function il(){return{destroy:void 0,resource:void 0}}function Bp(){return tt().memoizedState}function ll(e,t,a,r){var s=_t();r=r===void 0?null:r,ve.flags|=e,s.memoizedState=xr(1|t,il(),a,r)}function Do(e,t,a,r){var s=tt();r=r===void 0?null:r;var u=s.memoizedState.inst;Ne!==null&&r!==null&&Mc(r,Ne.memoizedState.deps)?s.memoizedState=xr(t,u,a,r):(ve.flags|=e,s.memoizedState=xr(1|t,u,a,r))}function Dp(e,t){ll(8390656,8,e,t)}function Np(e,t){Do(2048,8,e,t)}function zp(e,t){return Do(4,2,e,t)}function Lp(e,t){return Do(4,4,e,t)}function kp(e,t){if(typeof t=="function"){e=e();var a=t(e);return function(){typeof a=="function"?a():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function jp(e,t,a){a=a!=null?a.concat([e]):null,Do(4,4,kp.bind(null,t,e),a)}function $c(){}function Up(e,t){var a=tt();t=t===void 0?null:t;var r=a.memoizedState;return t!==null&&Mc(t,r[1])?r[0]:(a.memoizedState=[e,t],e)}function $p(e,t){var a=tt();t=t===void 0?null:t;var r=a.memoizedState;if(t!==null&&Mc(t,r[1]))return r[0];if(r=e(),$a){Zn(!0);try{e()}finally{Zn(!1)}}return a.memoizedState=[r,t],r}function qc(e,t,a){return a===void 0||(aa&1073741824)!==0?e.memoizedState=t:(e.memoizedState=a,e=Im(),ve.lanes|=e,ua|=e,a)}function qp(e,t,a,r){return kt(a,t)?a:vr.current!==null?(e=qc(e,a,r),kt(e,t)||(ct=!0),e):(aa&42)===0?(ct=!0,e.memoizedState=a):(e=Im(),ve.lanes|=e,ua|=e,t)}function Pp(e,t,a,r,s){var u=J.p;J.p=u!==0&&8>u?u:8;var h=$.T,v={};$.T=v,Hc(e,!1,t,a);try{var B=s(),P=$.S;if(P!==null&&P(v,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var Y=qb(B,r);No(e,t,Y,Pt(e))}else No(e,t,r,Pt(e))}catch(Q){No(e,t,{then:function(){},status:"rejected",reason:Q},Pt())}finally{J.p=u,$.T=h}}function Gb(){}function Pc(e,t,a,r){if(e.tag!==5)throw Error(l(476));var s=Ip(e).queue;Pp(e,s,t,K,a===null?Gb:function(){return Hp(e),a(r)})}function Ip(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:K},next:null};var a={};return t.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:kn,lastRenderedState:a},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Hp(e){var t=Ip(e).next.queue;No(e,t,{},Pt())}function Ic(){return bt(Qo)}function Fp(){return tt().memoizedState}function Gp(){return tt().memoizedState}function Vb(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var a=Pt();e=ta(a);var r=na(t,e,a);r!==null&&(It(r,t,a),wo(r,t,a)),t={cache:vc()},e.payload=t;return}t=t.return}}function Yb(e,t,a){var r=Pt();a={lane:r,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null},sl(e)?Yp(t,a):(a=sc(e,t,a,r),a!==null&&(It(a,e,r),Wp(a,t,r)))}function Vp(e,t,a){var r=Pt();No(e,t,a,r)}function No(e,t,a,r){var s={lane:r,revertLane:0,action:a,hasEagerState:!1,eagerState:null,next:null};if(sl(e))Yp(t,s);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var h=t.lastRenderedState,v=u(h,a);if(s.hasEagerState=!0,s.eagerState=v,kt(v,h))return Gi(e,t,s,0),qe===null&&Fi(),!1}catch{}finally{}if(a=sc(e,t,s,r),a!==null)return It(a,e,r),Wp(a,t,r),!0}return!1}function Hc(e,t,a,r){if(r={lane:2,revertLane:xu(),action:r,hasEagerState:!1,eagerState:null,next:null},sl(e)){if(t)throw Error(l(479))}else t=sc(e,a,r,2),t!==null&&It(t,e,2)}function sl(e){var t=e.alternate;return e===ve||t!==null&&t===ve}function Yp(e,t){br=nl=!0;var a=e.pending;a===null?t.next=t:(t.next=a.next,a.next=t),e.pending=t}function Wp(e,t,a){if((a&4194048)!==0){var r=t.lanes;r&=e.pendingLanes,a|=r,t.lanes=a,tf(e,a)}}var cl={readContext:bt,use:rl,useCallback:Qe,useContext:Qe,useEffect:Qe,useImperativeHandle:Qe,useLayoutEffect:Qe,useInsertionEffect:Qe,useMemo:Qe,useReducer:Qe,useRef:Qe,useState:Qe,useDebugValue:Qe,useDeferredValue:Qe,useTransition:Qe,useSyncExternalStore:Qe,useId:Qe,useHostTransitionStatus:Qe,useFormState:Qe,useActionState:Qe,useOptimistic:Qe,useMemoCache:Qe,useCacheRefresh:Qe},Xp={readContext:bt,use:rl,useCallback:function(e,t){return _t().memoizedState=[e,t===void 0?null:t],e},useContext:bt,useEffect:Dp,useImperativeHandle:function(e,t,a){a=a!=null?a.concat([e]):null,ll(4194308,4,kp.bind(null,t,e),a)},useLayoutEffect:function(e,t){return ll(4194308,4,e,t)},useInsertionEffect:function(e,t){ll(4,2,e,t)},useMemo:function(e,t){var a=_t();t=t===void 0?null:t;var r=e();if($a){Zn(!0);try{e()}finally{Zn(!1)}}return a.memoizedState=[r,t],r},useReducer:function(e,t,a){var r=_t();if(a!==void 0){var s=a(t);if($a){Zn(!0);try{a(t)}finally{Zn(!1)}}}else s=t;return r.memoizedState=r.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},r.queue=e,e=e.dispatch=Yb.bind(null,ve,e),[r.memoizedState,e]},useRef:function(e){var t=_t();return e={current:e},t.memoizedState=e},useState:function(e){e=jc(e);var t=e.queue,a=Vp.bind(null,ve,t);return t.dispatch=a,[e.memoizedState,a]},useDebugValue:$c,useDeferredValue:function(e,t){var a=_t();return qc(a,e,t)},useTransition:function(){var e=jc(!1);return e=Pp.bind(null,ve,e.queue,!0,!1),_t().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,a){var r=ve,s=_t();if(we){if(a===void 0)throw Error(l(407));a=a()}else{if(a=t(),qe===null)throw Error(l(349));(Ae&124)!==0||hp(r,t,a)}s.memoizedState=a;var u={value:a,getSnapshot:t};return s.queue=u,Dp(vp.bind(null,r,u,e),[e]),r.flags|=2048,xr(9,il(),yp.bind(null,r,u,a,t),null),a},useId:function(){var e=_t(),t=qe.identifierPrefix;if(we){var a=Nn,r=Dn;a=(r&~(1<<32-Lt(r)-1)).toString(32)+a,t="«"+t+"R"+a,a=al++,0<a&&(t+="H"+a.toString(32)),t+="»"}else a=Pb++,t="«"+t+"r"+a.toString(32)+"»";return e.memoizedState=t},useHostTransitionStatus:Ic,useFormState:wp,useActionState:wp,useOptimistic:function(e){var t=_t();t.memoizedState=t.baseState=e;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=a,t=Hc.bind(null,ve,!0,a),a.dispatch=t,[e,t]},useMemoCache:zc,useCacheRefresh:function(){return _t().memoizedState=Vb.bind(null,ve)}},Zp={readContext:bt,use:rl,useCallback:Up,useContext:bt,useEffect:Np,useImperativeHandle:jp,useInsertionEffect:zp,useLayoutEffect:Lp,useMemo:$p,useReducer:ol,useRef:Bp,useState:function(){return ol(kn)},useDebugValue:$c,useDeferredValue:function(e,t){var a=tt();return qp(a,Ne.memoizedState,e,t)},useTransition:function(){var e=ol(kn)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:Bo(e),t]},useSyncExternalStore:gp,useId:Fp,useHostTransitionStatus:Ic,useFormState:Mp,useActionState:Mp,useOptimistic:function(e,t){var a=tt();return xp(a,Ne,e,t)},useMemoCache:zc,useCacheRefresh:Gp},Wb={readContext:bt,use:rl,useCallback:Up,useContext:bt,useEffect:Np,useImperativeHandle:jp,useInsertionEffect:zp,useLayoutEffect:Lp,useMemo:$p,useReducer:kc,useRef:Bp,useState:function(){return kc(kn)},useDebugValue:$c,useDeferredValue:function(e,t){var a=tt();return Ne===null?qc(a,e,t):qp(a,Ne.memoizedState,e,t)},useTransition:function(){var e=kc(kn)[0],t=tt().memoizedState;return[typeof e=="boolean"?e:Bo(e),t]},useSyncExternalStore:gp,useId:Fp,useHostTransitionStatus:Ic,useFormState:_p,useActionState:_p,useOptimistic:function(e,t){var a=tt();return Ne!==null?xp(a,Ne,e,t):(a.baseState=e,[e,a.queue.dispatch])},useMemoCache:zc,useCacheRefresh:Gp},Er=null,zo=0;function ul(e){var t=zo;return zo+=1,Er===null&&(Er=[]),lp(Er,e,t)}function Lo(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function dl(e,t){throw t.$$typeof===b?Error(l(525)):(e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Qp(e){var t=e._init;return t(e._payload)}function Kp(e){function t(U,L){if(e){var q=U.deletions;q===null?(U.deletions=[L],U.flags|=16):q.push(L)}}function a(U,L){if(!e)return null;for(;L!==null;)t(U,L),L=L.sibling;return null}function r(U){for(var L=new Map;U!==null;)U.key!==null?L.set(U.key,U):L.set(U.index,U),U=U.sibling;return L}function s(U,L){return U=Bn(U,L),U.index=0,U.sibling=null,U}function u(U,L,q){return U.index=q,e?(q=U.alternate,q!==null?(q=q.index,q<L?(U.flags|=67108866,L):q):(U.flags|=67108866,L)):(U.flags|=1048576,L)}function h(U){return e&&U.alternate===null&&(U.flags|=67108866),U}function v(U,L,q,X){return L===null||L.tag!==6?(L=uc(q,U.mode,X),L.return=U,L):(L=s(L,q),L.return=U,L)}function B(U,L,q,X){var se=q.type;return se===M?Y(U,L,q.props.children,X,q.key):L!==null&&(L.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===G&&Qp(se)===L.type)?(L=s(L,q.props),Lo(L,q),L.return=U,L):(L=Yi(q.type,q.key,q.props,null,U.mode,X),Lo(L,q),L.return=U,L)}function P(U,L,q,X){return L===null||L.tag!==4||L.stateNode.containerInfo!==q.containerInfo||L.stateNode.implementation!==q.implementation?(L=dc(q,U.mode,X),L.return=U,L):(L=s(L,q.children||[]),L.return=U,L)}function Y(U,L,q,X,se){return L===null||L.tag!==7?(L=Ba(q,U.mode,X,se),L.return=U,L):(L=s(L,q),L.return=U,L)}function Q(U,L,q){if(typeof L=="string"&&L!==""||typeof L=="number"||typeof L=="bigint")return L=uc(""+L,U.mode,q),L.return=U,L;if(typeof L=="object"&&L!==null){switch(L.$$typeof){case x:return q=Yi(L.type,L.key,L.props,null,U.mode,q),Lo(q,L),q.return=U,q;case D:return L=dc(L,U.mode,q),L.return=U,L;case G:var X=L._init;return L=X(L._payload),Q(U,L,q)}if(le(L)||te(L))return L=Ba(L,U.mode,q,null),L.return=U,L;if(typeof L.then=="function")return Q(U,ul(L),q);if(L.$$typeof===T)return Q(U,Qi(U,L),q);dl(U,L)}return null}function H(U,L,q,X){var se=L!==null?L.key:null;if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return se!==null?null:v(U,L,""+q,X);if(typeof q=="object"&&q!==null){switch(q.$$typeof){case x:return q.key===se?B(U,L,q,X):null;case D:return q.key===se?P(U,L,q,X):null;case G:return se=q._init,q=se(q._payload),H(U,L,q,X)}if(le(q)||te(q))return se!==null?null:Y(U,L,q,X,null);if(typeof q.then=="function")return H(U,L,ul(q),X);if(q.$$typeof===T)return H(U,L,Qi(U,q),X);dl(U,q)}return null}function F(U,L,q,X,se){if(typeof X=="string"&&X!==""||typeof X=="number"||typeof X=="bigint")return U=U.get(q)||null,v(L,U,""+X,se);if(typeof X=="object"&&X!==null){switch(X.$$typeof){case x:return U=U.get(X.key===null?q:X.key)||null,B(L,U,X,se);case D:return U=U.get(X.key===null?q:X.key)||null,P(L,U,X,se);case G:var be=X._init;return X=be(X._payload),F(U,L,q,X,se)}if(le(X)||te(X))return U=U.get(q)||null,Y(L,U,X,se,null);if(typeof X.then=="function")return F(U,L,q,ul(X),se);if(X.$$typeof===T)return F(U,L,q,Qi(L,X),se);dl(L,X)}return null}function pe(U,L,q,X){for(var se=null,be=null,ce=L,fe=L=0,dt=null;ce!==null&&fe<q.length;fe++){ce.index>fe?(dt=ce,ce=null):dt=ce.sibling;var Ce=H(U,ce,q[fe],X);if(Ce===null){ce===null&&(ce=dt);break}e&&ce&&Ce.alternate===null&&t(U,ce),L=u(Ce,L,fe),be===null?se=Ce:be.sibling=Ce,be=Ce,ce=dt}if(fe===q.length)return a(U,ce),we&&Na(U,fe),se;if(ce===null){for(;fe<q.length;fe++)ce=Q(U,q[fe],X),ce!==null&&(L=u(ce,L,fe),be===null?se=ce:be.sibling=ce,be=ce);return we&&Na(U,fe),se}for(ce=r(ce);fe<q.length;fe++)dt=F(ce,U,fe,q[fe],X),dt!==null&&(e&&dt.alternate!==null&&ce.delete(dt.key===null?fe:dt.key),L=u(dt,L,fe),be===null?se=dt:be.sibling=dt,be=dt);return e&&ce.forEach(function(ba){return t(U,ba)}),we&&Na(U,fe),se}function de(U,L,q,X){if(q==null)throw Error(l(151));for(var se=null,be=null,ce=L,fe=L=0,dt=null,Ce=q.next();ce!==null&&!Ce.done;fe++,Ce=q.next()){ce.index>fe?(dt=ce,ce=null):dt=ce.sibling;var ba=H(U,ce,Ce.value,X);if(ba===null){ce===null&&(ce=dt);break}e&&ce&&ba.alternate===null&&t(U,ce),L=u(ba,L,fe),be===null?se=ba:be.sibling=ba,be=ba,ce=dt}if(Ce.done)return a(U,ce),we&&Na(U,fe),se;if(ce===null){for(;!Ce.done;fe++,Ce=q.next())Ce=Q(U,Ce.value,X),Ce!==null&&(L=u(Ce,L,fe),be===null?se=Ce:be.sibling=Ce,be=Ce);return we&&Na(U,fe),se}for(ce=r(ce);!Ce.done;fe++,Ce=q.next())Ce=F(ce,U,fe,Ce.value,X),Ce!==null&&(e&&Ce.alternate!==null&&ce.delete(Ce.key===null?fe:Ce.key),L=u(Ce,L,fe),be===null?se=Ce:be.sibling=Ce,be=Ce);return e&&ce.forEach(function(X0){return t(U,X0)}),we&&Na(U,fe),se}function Le(U,L,q,X){if(typeof q=="object"&&q!==null&&q.type===M&&q.key===null&&(q=q.props.children),typeof q=="object"&&q!==null){switch(q.$$typeof){case x:e:{for(var se=q.key;L!==null;){if(L.key===se){if(se=q.type,se===M){if(L.tag===7){a(U,L.sibling),X=s(L,q.props.children),X.return=U,U=X;break e}}else if(L.elementType===se||typeof se=="object"&&se!==null&&se.$$typeof===G&&Qp(se)===L.type){a(U,L.sibling),X=s(L,q.props),Lo(X,q),X.return=U,U=X;break e}a(U,L);break}else t(U,L);L=L.sibling}q.type===M?(X=Ba(q.props.children,U.mode,X,q.key),X.return=U,U=X):(X=Yi(q.type,q.key,q.props,null,U.mode,X),Lo(X,q),X.return=U,U=X)}return h(U);case D:e:{for(se=q.key;L!==null;){if(L.key===se)if(L.tag===4&&L.stateNode.containerInfo===q.containerInfo&&L.stateNode.implementation===q.implementation){a(U,L.sibling),X=s(L,q.children||[]),X.return=U,U=X;break e}else{a(U,L);break}else t(U,L);L=L.sibling}X=dc(q,U.mode,X),X.return=U,U=X}return h(U);case G:return se=q._init,q=se(q._payload),Le(U,L,q,X)}if(le(q))return pe(U,L,q,X);if(te(q)){if(se=te(q),typeof se!="function")throw Error(l(150));return q=se.call(q),de(U,L,q,X)}if(typeof q.then=="function")return Le(U,L,ul(q),X);if(q.$$typeof===T)return Le(U,L,Qi(U,q),X);dl(U,q)}return typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint"?(q=""+q,L!==null&&L.tag===6?(a(U,L.sibling),X=s(L,q),X.return=U,U=X):(a(U,L),X=uc(q,U.mode,X),X.return=U,U=X),h(U)):a(U,L)}return function(U,L,q,X){try{zo=0;var se=Le(U,L,q,X);return Er=null,se}catch(ce){if(ce===Co||ce===Ji)throw ce;var be=jt(29,ce,null,U.mode);return be.lanes=X,be.return=U,be}finally{}}}var Ar=Kp(!0),Jp=Kp(!1),Jt=W(null),pn=null;function ra(e){var t=e.alternate;ne(ot,ot.current&1),ne(Jt,e),pn===null&&(t===null||vr.current!==null||t.memoizedState!==null)&&(pn=e)}function em(e){if(e.tag===22){if(ne(ot,ot.current),ne(Jt,e),pn===null){var t=e.alternate;t!==null&&t.memoizedState!==null&&(pn=e)}}else oa()}function oa(){ne(ot,ot.current),ne(Jt,Jt.current)}function jn(e){ee(Jt),pn===e&&(pn=null),ee(ot)}var ot=W(0);function fl(e){for(var t=e;t!==null;){if(t.tag===13){var a=t.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||a.data==="$?"||Nu(a)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}function Fc(e,t,a,r){t=e.memoizedState,a=a(r,t),a=a==null?t:y({},t,a),e.memoizedState=a,e.lanes===0&&(e.updateQueue.baseState=a)}var Gc={enqueueSetState:function(e,t,a){e=e._reactInternals;var r=Pt(),s=ta(r);s.payload=t,a!=null&&(s.callback=a),t=na(e,s,r),t!==null&&(It(t,e,r),wo(t,e,r))},enqueueReplaceState:function(e,t,a){e=e._reactInternals;var r=Pt(),s=ta(r);s.tag=1,s.payload=t,a!=null&&(s.callback=a),t=na(e,s,r),t!==null&&(It(t,e,r),wo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var a=Pt(),r=ta(a);r.tag=2,t!=null&&(r.callback=t),t=na(e,r,a),t!==null&&(It(t,e,a),wo(t,e,a))}};function tm(e,t,a,r,s,u,h){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,u,h):t.prototype&&t.prototype.isPureReactComponent?!yo(a,r)||!yo(s,u):!0}function nm(e,t,a,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(a,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(a,r),t.state!==e&&Gc.enqueueReplaceState(t,t.state,null)}function qa(e,t){var a=t;if("ref"in t){a={};for(var r in t)r!=="ref"&&(a[r]=t[r])}if(e=e.defaultProps){a===t&&(a=y({},a));for(var s in e)a[s]===void 0&&(a[s]=e[s])}return a}var pl=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function am(e){pl(e)}function rm(e){console.error(e)}function om(e){pl(e)}function ml(e,t){try{var a=e.onUncaughtError;a(t.value,{componentStack:t.stack})}catch(r){setTimeout(function(){throw r})}}function im(e,t,a){try{var r=e.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function Vc(e,t,a){return a=ta(a),a.tag=3,a.payload={element:null},a.callback=function(){ml(e,t)},a}function lm(e){return e=ta(e),e.tag=3,e}function sm(e,t,a,r){var s=a.type.getDerivedStateFromError;if(typeof s=="function"){var u=r.value;e.payload=function(){return s(u)},e.callback=function(){im(t,a,r)}}var h=a.stateNode;h!==null&&typeof h.componentDidCatch=="function"&&(e.callback=function(){im(t,a,r),typeof s!="function"&&(da===null?da=new Set([this]):da.add(this));var v=r.stack;this.componentDidCatch(r.value,{componentStack:v!==null?v:""})})}function Xb(e,t,a,r,s){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(t=a.alternate,t!==null&&Eo(t,a,s,!0),a=Jt.current,a!==null){switch(a.tag){case 13:return pn===null?hu():a.alternate===null&&We===0&&(We=3),a.flags&=-257,a.flags|=65536,a.lanes=s,r===xc?a.flags|=16384:(t=a.updateQueue,t===null?a.updateQueue=new Set([r]):t.add(r),vu(e,r,s)),!1;case 22:return a.flags|=65536,r===xc?a.flags|=16384:(t=a.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=t):(a=t.retryQueue,a===null?t.retryQueue=new Set([r]):a.add(r)),vu(e,r,s)),!1}throw Error(l(435,a.tag))}return vu(e,r,s),hu(),!1}if(we)return t=Jt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,r!==mc&&(e=Error(l(422),{cause:r}),xo(Xt(e,a)))):(r!==mc&&(t=Error(l(423),{cause:r}),xo(Xt(t,a))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,r=Xt(r,a),s=Vc(e.stateNode,r,s),Tc(e,s),We!==4&&(We=2)),!1;var u=Error(l(520),{cause:r});if(u=Xt(u,a),Io===null?Io=[u]:Io.push(u),We!==4&&(We=2),t===null)return!0;r=Xt(r,a),a=t;do{switch(a.tag){case 3:return a.flags|=65536,e=s&-s,a.lanes|=e,e=Vc(a.stateNode,r,e),Tc(a,e),!1;case 1:if(t=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(da===null||!da.has(u))))return a.flags|=65536,s&=-s,a.lanes|=s,s=lm(s),sm(s,e,a,r),Tc(a,s),!1}a=a.return}while(a!==null);return!1}var cm=Error(l(461)),ct=!1;function pt(e,t,a,r){t.child=e===null?Jp(t,null,a,r):Ar(t,e.child,a,r)}function um(e,t,a,r,s){a=a.render;var u=t.ref;if("ref"in r){var h={};for(var v in r)v!=="ref"&&(h[v]=r[v])}else h=r;return ja(t),r=Oc(e,t,a,h,u,s),v=_c(),e!==null&&!ct?(Bc(e,t,s),Un(e,t,s)):(we&&v&&fc(t),t.flags|=1,pt(e,t,r,s),t.child)}function dm(e,t,a,r,s){if(e===null){var u=a.type;return typeof u=="function"&&!cc(u)&&u.defaultProps===void 0&&a.compare===null?(t.tag=15,t.type=u,fm(e,t,u,r,s)):(e=Yi(a.type,null,r,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,!eu(e,s)){var h=u.memoizedProps;if(a=a.compare,a=a!==null?a:yo,a(h,r)&&e.ref===t.ref)return Un(e,t,s)}return t.flags|=1,e=Bn(u,r),e.ref=t.ref,e.return=t,t.child=e}function fm(e,t,a,r,s){if(e!==null){var u=e.memoizedProps;if(yo(u,r)&&e.ref===t.ref)if(ct=!1,t.pendingProps=r=u,eu(e,s))(e.flags&131072)!==0&&(ct=!0);else return t.lanes=e.lanes,Un(e,t,s)}return Yc(e,t,a,r,s)}function pm(e,t,a){var r=t.pendingProps,s=r.children,u=e!==null?e.memoizedState:null;if(r.mode==="hidden"){if((t.flags&128)!==0){if(r=u!==null?u.baseLanes|a:a,e!==null){for(s=t.child=e.child,u=0;s!==null;)u=u|s.lanes|s.childLanes,s=s.sibling;t.childLanes=u&~r}else t.childLanes=0,t.child=null;return mm(e,t,r,a)}if((a&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ki(t,u!==null?u.cachePool:null),u!==null?fp(t,u):Rc(),em(t);else return t.lanes=t.childLanes=536870912,mm(e,t,u!==null?u.baseLanes|a:a,a)}else u!==null?(Ki(t,u.cachePool),fp(t,u),oa(),t.memoizedState=null):(e!==null&&Ki(t,null),Rc(),oa());return pt(e,t,s,a),t.child}function mm(e,t,a,r){var s=Sc();return s=s===null?null:{parent:rt._currentValue,pool:s},t.memoizedState={baseLanes:a,cachePool:s},e!==null&&Ki(t,null),Rc(),em(t),e!==null&&Eo(e,t,r,!0),null}function gl(e,t){var a=t.ref;if(a===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(l(284));(e===null||e.ref!==a)&&(t.flags|=4194816)}}function Yc(e,t,a,r,s){return ja(t),a=Oc(e,t,a,r,void 0,s),r=_c(),e!==null&&!ct?(Bc(e,t,s),Un(e,t,s)):(we&&r&&fc(t),t.flags|=1,pt(e,t,a,s),t.child)}function gm(e,t,a,r,s,u){return ja(t),t.updateQueue=null,a=mp(t,r,a,s),pp(e),r=_c(),e!==null&&!ct?(Bc(e,t,u),Un(e,t,u)):(we&&r&&fc(t),t.flags|=1,pt(e,t,a,u),t.child)}function hm(e,t,a,r,s){if(ja(t),t.stateNode===null){var u=pr,h=a.contextType;typeof h=="object"&&h!==null&&(u=bt(h)),u=new a(r,u),t.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=Gc,t.stateNode=u,u._reactInternals=t,u=t.stateNode,u.props=r,u.state=t.memoizedState,u.refs={},Ec(t),h=a.contextType,u.context=typeof h=="object"&&h!==null?bt(h):pr,u.state=t.memoizedState,h=a.getDerivedStateFromProps,typeof h=="function"&&(Fc(t,a,h,r),u.state=t.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(h=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),h!==u.state&&Gc.enqueueReplaceState(u,u.state,null),Oo(t,r,u,s),Mo(),u.state=t.memoizedState),typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!0}else if(e===null){u=t.stateNode;var v=t.memoizedProps,B=qa(a,v);u.props=B;var P=u.context,Y=a.contextType;h=pr,typeof Y=="object"&&Y!==null&&(h=bt(Y));var Q=a.getDerivedStateFromProps;Y=typeof Q=="function"||typeof u.getSnapshotBeforeUpdate=="function",v=t.pendingProps!==v,Y||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(v||P!==h)&&nm(t,u,r,h),ea=!1;var H=t.memoizedState;u.state=H,Oo(t,r,u,s),Mo(),P=t.memoizedState,v||H!==P||ea?(typeof Q=="function"&&(Fc(t,a,Q,r),P=t.memoizedState),(B=ea||tm(t,a,B,r,H,P,h))?(Y||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(t.flags|=4194308)):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=P),u.props=r,u.state=P,u.context=h,r=B):(typeof u.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{u=t.stateNode,Ac(e,t),h=t.memoizedProps,Y=qa(a,h),u.props=Y,Q=t.pendingProps,H=u.context,P=a.contextType,B=pr,typeof P=="object"&&P!==null&&(B=bt(P)),v=a.getDerivedStateFromProps,(P=typeof v=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(h!==Q||H!==B)&&nm(t,u,r,B),ea=!1,H=t.memoizedState,u.state=H,Oo(t,r,u,s),Mo();var F=t.memoizedState;h!==Q||H!==F||ea||e!==null&&e.dependencies!==null&&Zi(e.dependencies)?(typeof v=="function"&&(Fc(t,a,v,r),F=t.memoizedState),(Y=ea||tm(t,a,Y,r,H,F,B)||e!==null&&e.dependencies!==null&&Zi(e.dependencies))?(P||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,F,B),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,F,B)),typeof u.componentDidUpdate=="function"&&(t.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof u.componentDidUpdate!="function"||h===e.memoizedProps&&H===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&H===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=F),u.props=r,u.state=F,u.context=B,r=Y):(typeof u.componentDidUpdate!="function"||h===e.memoizedProps&&H===e.memoizedState||(t.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&H===e.memoizedState||(t.flags|=1024),r=!1)}return u=r,gl(e,t),r=(t.flags&128)!==0,u||r?(u=t.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:u.render(),t.flags|=1,e!==null&&r?(t.child=Ar(t,e.child,null,s),t.child=Ar(t,null,a,s)):pt(e,t,a,s),t.memoizedState=u.state,e=t.child):e=Un(e,t,s),e}function ym(e,t,a,r){return So(),t.flags|=256,pt(e,t,a,r),t.child}var Wc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Xc(e){return{baseLanes:e,cachePool:rp()}}function Zc(e,t,a){return e=e!==null?e.childLanes&~a:0,t&&(e|=en),e}function vm(e,t,a){var r=t.pendingProps,s=!1,u=(t.flags&128)!==0,h;if((h=u)||(h=e!==null&&e.memoizedState===null?!1:(ot.current&2)!==0),h&&(s=!0,t.flags&=-129),h=(t.flags&32)!==0,t.flags&=-33,e===null){if(we){if(s?ra(t):oa(),we){var v=Ye,B;if(B=v){e:{for(B=v,v=fn;B.nodeType!==8;){if(!v){v=null;break e}if(B=sn(B.nextSibling),B===null){v=null;break e}}v=B}v!==null?(t.memoizedState={dehydrated:v,treeContext:Da!==null?{id:Dn,overflow:Nn}:null,retryLane:536870912,hydrationErrors:null},B=jt(18,null,null,0),B.stateNode=v,B.return=t,t.child=B,Rt=t,Ye=null,B=!0):B=!1}B||La(t)}if(v=t.memoizedState,v!==null&&(v=v.dehydrated,v!==null))return Nu(v)?t.lanes=32:t.lanes=536870912,null;jn(t)}return v=r.children,r=r.fallback,s?(oa(),s=t.mode,v=hl({mode:"hidden",children:v},s),r=Ba(r,s,a,null),v.return=t,r.return=t,v.sibling=r,t.child=v,s=t.child,s.memoizedState=Xc(a),s.childLanes=Zc(e,h,a),t.memoizedState=Wc,r):(ra(t),Qc(t,v))}if(B=e.memoizedState,B!==null&&(v=B.dehydrated,v!==null)){if(u)t.flags&256?(ra(t),t.flags&=-257,t=Kc(e,t,a)):t.memoizedState!==null?(oa(),t.child=e.child,t.flags|=128,t=null):(oa(),s=r.fallback,v=t.mode,r=hl({mode:"visible",children:r.children},v),s=Ba(s,v,a,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,Ar(t,e.child,null,a),r=t.child,r.memoizedState=Xc(a),r.childLanes=Zc(e,h,a),t.memoizedState=Wc,t=s);else if(ra(t),Nu(v)){if(h=v.nextSibling&&v.nextSibling.dataset,h)var P=h.dgst;h=P,r=Error(l(419)),r.stack="",r.digest=h,xo({value:r,source:null,stack:null}),t=Kc(e,t,a)}else if(ct||Eo(e,t,a,!1),h=(a&e.childLanes)!==0,ct||h){if(h=qe,h!==null&&(r=a&-a,r=(r&42)!==0?1:zs(r),r=(r&(h.suspendedLanes|a))!==0?0:r,r!==0&&r!==B.retryLane))throw B.retryLane=r,fr(e,r),It(h,e,r),cm;v.data==="$?"||hu(),t=Kc(e,t,a)}else v.data==="$?"?(t.flags|=192,t.child=e.child,t=null):(e=B.treeContext,Ye=sn(v.nextSibling),Rt=t,we=!0,za=null,fn=!1,e!==null&&(Qt[Kt++]=Dn,Qt[Kt++]=Nn,Qt[Kt++]=Da,Dn=e.id,Nn=e.overflow,Da=t),t=Qc(t,r.children),t.flags|=4096);return t}return s?(oa(),s=r.fallback,v=t.mode,B=e.child,P=B.sibling,r=Bn(B,{mode:"hidden",children:r.children}),r.subtreeFlags=B.subtreeFlags&65011712,P!==null?s=Bn(P,s):(s=Ba(s,v,a,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,v=e.child.memoizedState,v===null?v=Xc(a):(B=v.cachePool,B!==null?(P=rt._currentValue,B=B.parent!==P?{parent:P,pool:P}:B):B=rp(),v={baseLanes:v.baseLanes|a,cachePool:B}),s.memoizedState=v,s.childLanes=Zc(e,h,a),t.memoizedState=Wc,r):(ra(t),a=e.child,e=a.sibling,a=Bn(a,{mode:"visible",children:r.children}),a.return=t,a.sibling=null,e!==null&&(h=t.deletions,h===null?(t.deletions=[e],t.flags|=16):h.push(e)),t.child=a,t.memoizedState=null,a)}function Qc(e,t){return t=hl({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function hl(e,t){return e=jt(22,e,null,t),e.lanes=0,e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null},e}function Kc(e,t,a){return Ar(t,e.child,null,a),e=Qc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function bm(e,t,a){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),hc(e.return,t,a)}function Jc(e,t,a,r,s){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:s}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=r,u.tail=a,u.tailMode=s)}function Sm(e,t,a){var r=t.pendingProps,s=r.revealOrder,u=r.tail;if(pt(e,t,r.children,a),r=ot.current,(r&2)!==0)r=r&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&bm(e,a,t);else if(e.tag===19)bm(e,a,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}switch(ne(ot,r),s){case"forwards":for(a=t.child,s=null;a!==null;)e=a.alternate,e!==null&&fl(e)===null&&(s=a),a=a.sibling;a=s,a===null?(s=t.child,t.child=null):(s=a.sibling,a.sibling=null),Jc(t,!1,s,a,u);break;case"backwards":for(a=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&fl(e)===null){t.child=s;break}e=s.sibling,s.sibling=a,a=s,s=e}Jc(t,!0,a,null,u);break;case"together":Jc(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Un(e,t,a){if(e!==null&&(t.dependencies=e.dependencies),ua|=t.lanes,(a&t.childLanes)===0)if(e!==null){if(Eo(e,t,a,!1),(a&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,a=Bn(e,e.pendingProps),t.child=a,a.return=t;e.sibling!==null;)e=e.sibling,a=a.sibling=Bn(e,e.pendingProps),a.return=t;a.sibling=null}return t.child}function eu(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Zi(e)))}function Zb(e,t,a){switch(t.tag){case 3:Te(t,t.stateNode.containerInfo),Jn(t,rt,e.memoizedState.cache),So();break;case 27:case 5:At(t);break;case 4:Te(t,t.stateNode.containerInfo);break;case 10:Jn(t,t.type,t.memoizedProps.value);break;case 13:var r=t.memoizedState;if(r!==null)return r.dehydrated!==null?(ra(t),t.flags|=128,null):(a&t.child.childLanes)!==0?vm(e,t,a):(ra(t),e=Un(e,t,a),e!==null?e.sibling:null);ra(t);break;case 19:var s=(e.flags&128)!==0;if(r=(a&t.childLanes)!==0,r||(Eo(e,t,a,!1),r=(a&t.childLanes)!==0),s){if(r)return Sm(e,t,a);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),ne(ot,ot.current),r)break;return null;case 22:case 23:return t.lanes=0,pm(e,t,a);case 24:Jn(t,rt,e.memoizedState.cache)}return Un(e,t,a)}function xm(e,t,a){if(e!==null)if(e.memoizedProps!==t.pendingProps)ct=!0;else{if(!eu(e,a)&&(t.flags&128)===0)return ct=!1,Zb(e,t,a);ct=(e.flags&131072)!==0}else ct=!1,we&&(t.flags&1048576)!==0&&Qf(t,Xi,t.index);switch(t.lanes=0,t.tag){case 16:e:{e=t.pendingProps;var r=t.elementType,s=r._init;if(r=s(r._payload),t.type=r,typeof r=="function")cc(r)?(e=qa(r,e),t.tag=1,t=hm(null,t,r,e,a)):(t.tag=0,t=Yc(null,t,r,e,a));else{if(r!=null){if(s=r.$$typeof,s===R){t.tag=11,t=um(null,t,r,e,a);break e}else if(s===j){t.tag=14,t=dm(null,t,r,e,a);break e}}throw t=re(r)||r,Error(l(306,t,""))}}return t;case 0:return Yc(e,t,t.type,t.pendingProps,a);case 1:return r=t.type,s=qa(r,t.pendingProps),hm(e,t,r,s,a);case 3:e:{if(Te(t,t.stateNode.containerInfo),e===null)throw Error(l(387));r=t.pendingProps;var u=t.memoizedState;s=u.element,Ac(e,t),Oo(t,r,null,a);var h=t.memoizedState;if(r=h.cache,Jn(t,rt,r),r!==u.cache&&yc(t,[rt],a,!0),Mo(),r=h.element,u.isDehydrated)if(u={element:r,isDehydrated:!1,cache:h.cache},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){t=ym(e,t,r,a);break e}else if(r!==s){s=Xt(Error(l(424)),t),xo(s),t=ym(e,t,r,a);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ye=sn(e.firstChild),Rt=t,we=!0,za=null,fn=!0,a=Jp(t,null,r,a),t.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(So(),r===s){t=Un(e,t,a);break e}pt(e,t,r,a)}t=t.child}return t;case 26:return gl(e,t),e===null?(a=Cg(t.type,null,t.pendingProps,null))?t.memoizedState=a:we||(a=t.type,e=t.pendingProps,r=_l(ue.current).createElement(a),r[vt]=t,r[Mt]=e,gt(r,a,e),st(r),t.stateNode=r):t.memoizedState=Cg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return At(t),e===null&&we&&(r=t.stateNode=Eg(t.type,t.pendingProps,ue.current),Rt=t,fn=!0,s=Ye,ma(t.type)?(zu=s,Ye=sn(r.firstChild)):Ye=s),pt(e,t,t.pendingProps.children,a),gl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&we&&((s=r=Ye)&&(r=T0(r,t.type,t.pendingProps,fn),r!==null?(t.stateNode=r,Rt=t,Ye=sn(r.firstChild),fn=!1,s=!0):s=!1),s||La(t)),At(t),s=t.type,u=t.pendingProps,h=e!==null?e.memoizedProps:null,r=u.children,_u(s,u)?r=null:h!==null&&_u(s,h)&&(t.flags|=32),t.memoizedState!==null&&(s=Oc(e,t,Ib,null,null,a),Qo._currentValue=s),gl(e,t),pt(e,t,r,a),t.child;case 6:return e===null&&we&&((e=a=Ye)&&(a=C0(a,t.pendingProps,fn),a!==null?(t.stateNode=a,Rt=t,Ye=null,e=!0):e=!1),e||La(t)),null;case 13:return vm(e,t,a);case 4:return Te(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Ar(t,null,r,a):pt(e,t,r,a),t.child;case 11:return um(e,t,t.type,t.pendingProps,a);case 7:return pt(e,t,t.pendingProps,a),t.child;case 8:return pt(e,t,t.pendingProps.children,a),t.child;case 12:return pt(e,t,t.pendingProps.children,a),t.child;case 10:return r=t.pendingProps,Jn(t,t.type,r.value),pt(e,t,r.children,a),t.child;case 9:return s=t.type._context,r=t.pendingProps.children,ja(t),s=bt(s),r=r(s),t.flags|=1,pt(e,t,r,a),t.child;case 14:return dm(e,t,t.type,t.pendingProps,a);case 15:return fm(e,t,t.type,t.pendingProps,a);case 19:return Sm(e,t,a);case 31:return r=t.pendingProps,a=t.mode,r={mode:r.mode,children:r.children},e===null?(a=hl(r,a),a.ref=t.ref,t.child=a,a.return=t,t=a):(a=Bn(e.child,r),a.ref=t.ref,t.child=a,a.return=t,t=a),t;case 22:return pm(e,t,a);case 24:return ja(t),r=bt(rt),e===null?(s=Sc(),s===null&&(s=qe,u=vc(),s.pooledCache=u,u.refCount++,u!==null&&(s.pooledCacheLanes|=a),s=u),t.memoizedState={parent:r,cache:s},Ec(t),Jn(t,rt,s)):((e.lanes&a)!==0&&(Ac(e,t),Oo(t,null,null,a),Mo()),s=e.memoizedState,u=t.memoizedState,s.parent!==r?(s={parent:r,cache:r},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),Jn(t,rt,r)):(r=u.cache,Jn(t,rt,r),r!==s.cache&&yc(t,[rt],a,!0))),pt(e,t,t.pendingProps.children,a),t.child;case 29:throw t.pendingProps}throw Error(l(156,t.tag))}function $n(e){e.flags|=4}function Em(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!_g(t)){if(t=Jt.current,t!==null&&((Ae&4194048)===Ae?pn!==null:(Ae&62914560)!==Ae&&(Ae&536870912)===0||t!==pn))throw Ro=xc,op;e.flags|=8192}}function yl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Jd():536870912,e.lanes|=t,wr|=t)}function ko(e,t){if(!we)switch(e.tailMode){case"hidden":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?e.tail=null:a.sibling=null;break;case"collapsed":a=e.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Fe(e){var t=e.alternate!==null&&e.alternate.child===e.child,a=0,r=0;if(t)for(var s=e.child;s!==null;)a|=s.lanes|s.childLanes,r|=s.subtreeFlags&65011712,r|=s.flags&65011712,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)a|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=r,e.childLanes=a,t}function Qb(e,t,a){var r=t.pendingProps;switch(pc(t),t.tag){case 31:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Fe(t),null;case 1:return Fe(t),null;case 3:return a=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),Ln(rt),Et(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(bo(t)?$n(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ep())),Fe(t),null;case 26:return a=t.memoizedState,e===null?($n(t),a!==null?(Fe(t),Em(t,a)):(Fe(t),t.flags&=-16777217)):a?a!==e.memoizedState?($n(t),Fe(t),Em(t,a)):(Fe(t),t.flags&=-16777217):(e.memoizedProps!==r&&$n(t),Fe(t),t.flags&=-16777217),null;case 27:Tt(t),a=ue.current;var s=t.type;if(e!==null&&t.stateNode!=null)e.memoizedProps!==r&&$n(t);else{if(!r){if(t.stateNode===null)throw Error(l(166));return Fe(t),null}e=oe.current,bo(t)?Kf(t):(e=Eg(s,r,a),t.stateNode=e,$n(t))}return Fe(t),null;case 5:if(Tt(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&$n(t);else{if(!r){if(t.stateNode===null)throw Error(l(166));return Fe(t),null}if(e=oe.current,bo(t))Kf(t);else{switch(s=_l(ue.current),e){case 1:e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":e=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":e=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild);break;case"select":e=typeof r.is=="string"?s.createElement("select",{is:r.is}):s.createElement("select"),r.multiple?e.multiple=!0:r.size&&(e.size=r.size);break;default:e=typeof r.is=="string"?s.createElement(a,{is:r.is}):s.createElement(a)}}e[vt]=t,e[Mt]=r;e:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)e.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break e;for(;s.sibling===null;){if(s.return===null||s.return===t)break e;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=e;e:switch(gt(e,a,r),a){case"button":case"input":case"select":case"textarea":e=!!r.autoFocus;break e;case"img":e=!0;break e;default:e=!1}e&&$n(t)}}return Fe(t),t.flags&=-16777217,null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&$n(t);else{if(typeof r!="string"&&t.stateNode===null)throw Error(l(166));if(e=ue.current,bo(t)){if(e=t.stateNode,a=t.memoizedProps,r=null,s=Rt,s!==null)switch(s.tag){case 27:case 5:r=s.memoizedProps}e[vt]=t,e=!!(e.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||gg(e.nodeValue,a)),e||La(t)}else e=_l(e).createTextNode(r),e[vt]=t,t.stateNode=e}return Fe(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=bo(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(l(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(l(317));s[vt]=t}else So(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Fe(t),s=!1}else s=ep(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(jn(t),t):(jn(t),null)}if(jn(t),(t.flags&128)!==0)return t.lanes=a,t;if(a=r!==null,e=e!==null&&e.memoizedState!==null,a){r=t.child,s=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(s=r.alternate.memoizedState.cachePool.pool);var u=null;r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==s&&(r.flags|=2048)}return a!==e&&a&&(t.child.flags|=8192),yl(t,t.updateQueue),Fe(t),null;case 4:return Et(),e===null&&Cu(t.stateNode.containerInfo),Fe(t),null;case 10:return Ln(t.type),Fe(t),null;case 19:if(ee(ot),s=t.memoizedState,s===null)return Fe(t),null;if(r=(t.flags&128)!==0,u=s.rendering,u===null)if(r)ko(s,!1);else{if(We!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(u=fl(e),u!==null){for(t.flags|=128,ko(s,!1),e=u.updateQueue,t.updateQueue=e,yl(t,e),t.subtreeFlags=0,e=a,a=t.child;a!==null;)Zf(a,e),a=a.sibling;return ne(ot,ot.current&1|2),t.child}e=e.sibling}s.tail!==null&&Ct()>Sl&&(t.flags|=128,r=!0,ko(s,!1),t.lanes=4194304)}else{if(!r)if(e=fl(u),e!==null){if(t.flags|=128,r=!0,e=e.updateQueue,t.updateQueue=e,yl(t,e),ko(s,!0),s.tail===null&&s.tailMode==="hidden"&&!u.alternate&&!we)return Fe(t),null}else 2*Ct()-s.renderingStartTime>Sl&&a!==536870912&&(t.flags|=128,r=!0,ko(s,!1),t.lanes=4194304);s.isBackwards?(u.sibling=t.child,t.child=u):(e=s.last,e!==null?e.sibling=u:t.child=u,s.last=u)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Ct(),t.sibling=null,e=ot.current,ne(ot,r?e&1|2:e&1),t):(Fe(t),null);case 22:case 23:return jn(t),wc(),r=t.memoizedState!==null,e!==null?e.memoizedState!==null!==r&&(t.flags|=8192):r&&(t.flags|=8192),r?(a&536870912)!==0&&(t.flags&128)===0&&(Fe(t),t.subtreeFlags&6&&(t.flags|=8192)):Fe(t),a=t.updateQueue,a!==null&&yl(t,a.retryQueue),a=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==a&&(t.flags|=2048),e!==null&&ee(Ua),null;case 24:return a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Ln(rt),Fe(t),null;case 25:return null;case 30:return null}throw Error(l(156,t.tag))}function Kb(e,t){switch(pc(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Ln(rt),Et(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Tt(t),null;case 13:if(jn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));So()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ee(ot),null;case 4:return Et(),null;case 10:return Ln(t.type),null;case 22:case 23:return jn(t),wc(),e!==null&&ee(Ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Ln(rt),null;case 25:return null;default:return null}}function Am(e,t){switch(pc(t),t.tag){case 3:Ln(rt),Et();break;case 26:case 27:case 5:Tt(t);break;case 4:Et();break;case 13:jn(t);break;case 19:ee(ot);break;case 10:Ln(t.type);break;case 22:case 23:jn(t),wc(),e!==null&&ee(Ua);break;case 24:Ln(rt)}}function jo(e,t){try{var a=t.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var s=r.next;a=s;do{if((a.tag&e)===e){r=void 0;var u=a.create,h=a.inst;r=u(),h.destroy=r}a=a.next}while(a!==s)}}catch(v){je(t,t.return,v)}}function ia(e,t,a){try{var r=t.updateQueue,s=r!==null?r.lastEffect:null;if(s!==null){var u=s.next;r=u;do{if((r.tag&e)===e){var h=r.inst,v=h.destroy;if(v!==void 0){h.destroy=void 0,s=t;var B=a,P=v;try{P()}catch(Y){je(s,B,Y)}}}r=r.next}while(r!==u)}}catch(Y){je(t,t.return,Y)}}function Tm(e){var t=e.updateQueue;if(t!==null){var a=e.stateNode;try{dp(t,a)}catch(r){je(e,e.return,r)}}}function Cm(e,t,a){a.props=qa(e.type,e.memoizedProps),a.state=e.memoizedState;try{a.componentWillUnmount()}catch(r){je(e,t,r)}}function Uo(e,t){try{var a=e.ref;if(a!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:r=e.stateNode;break;default:r=e.stateNode}typeof a=="function"?e.refCleanup=a(r):a.current=r}}catch(s){je(e,t,s)}}function mn(e,t){var a=e.ref,r=e.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(s){je(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(s){je(e,t,s)}else a.current=null}function Rm(e){var t=e.type,a=e.memoizedProps,r=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break e;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(s){je(e,e.return,s)}}function tu(e,t,a){try{var r=e.stateNode;b0(r,e.type,a,t),r[Mt]=t}catch(s){je(e,e.return,s)}}function wm(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ma(e.type)||e.tag===4}function nu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wm(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ma(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function au(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(e,t):(t=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,t.appendChild(e),a=a._reactRootContainer,a!=null||t.onclick!==null||(t.onclick=Ol));else if(r!==4&&(r===27&&ma(e.type)&&(a=e.stateNode,t=null),e=e.child,e!==null))for(au(e,t,a),e=e.sibling;e!==null;)au(e,t,a),e=e.sibling}function vl(e,t,a){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?a.insertBefore(e,t):a.appendChild(e);else if(r!==4&&(r===27&&ma(e.type)&&(a=e.stateNode),e=e.child,e!==null))for(vl(e,t,a),e=e.sibling;e!==null;)vl(e,t,a),e=e.sibling}function Mm(e){var t=e.stateNode,a=e.memoizedProps;try{for(var r=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);gt(t,r,a),t[vt]=e,t[Mt]=a}catch(u){je(e,e.return,u)}}var qn=!1,Ke=!1,ru=!1,Om=typeof WeakSet=="function"?WeakSet:Set,ut=null;function Jb(e,t){if(e=e.containerInfo,Mu=kl,e=qf(e),nc(e)){if("selectionStart"in e)var a={start:e.selectionStart,end:e.selectionEnd};else e:{a=(a=e.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var s=r.anchorOffset,u=r.focusNode;r=r.focusOffset;try{a.nodeType,u.nodeType}catch{a=null;break e}var h=0,v=-1,B=-1,P=0,Y=0,Q=e,H=null;t:for(;;){for(var F;Q!==a||s!==0&&Q.nodeType!==3||(v=h+s),Q!==u||r!==0&&Q.nodeType!==3||(B=h+r),Q.nodeType===3&&(h+=Q.nodeValue.length),(F=Q.firstChild)!==null;)H=Q,Q=F;for(;;){if(Q===e)break t;if(H===a&&++P===s&&(v=h),H===u&&++Y===r&&(B=h),(F=Q.nextSibling)!==null)break;Q=H,H=Q.parentNode}Q=F}a=v===-1||B===-1?null:{start:v,end:B}}else a=null}a=a||{start:0,end:0}}else a=null;for(Ou={focusedElem:e,selectionRange:a},kl=!1,ut=t;ut!==null;)if(t=ut,e=t.child,(t.subtreeFlags&1024)!==0&&e!==null)e.return=t,ut=e;else for(;ut!==null;){switch(t=ut,u=t.alternate,e=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((e&1024)!==0&&u!==null){e=void 0,a=t,s=u.memoizedProps,u=u.memoizedState,r=a.stateNode;try{var pe=qa(a.type,s,a.elementType===a.type);e=r.getSnapshotBeforeUpdate(pe,u),r.__reactInternalSnapshotBeforeUpdate=e}catch(de){je(a,a.return,de)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,a=e.nodeType,a===9)Du(e);else if(a===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Du(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(l(163))}if(e=t.sibling,e!==null){e.return=t.return,ut=e;break}ut=t.return}}function _m(e,t,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:la(e,a),r&4&&jo(5,a);break;case 1:if(la(e,a),r&4)if(e=a.stateNode,t===null)try{e.componentDidMount()}catch(h){je(a,a.return,h)}else{var s=qa(a.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(h){je(a,a.return,h)}}r&64&&Tm(a),r&512&&Uo(a,a.return);break;case 3:if(la(e,a),r&64&&(e=a.updateQueue,e!==null)){if(t=null,a.child!==null)switch(a.child.tag){case 27:case 5:t=a.child.stateNode;break;case 1:t=a.child.stateNode}try{dp(e,t)}catch(h){je(a,a.return,h)}}break;case 27:t===null&&r&4&&Mm(a);case 26:case 5:la(e,a),t===null&&r&4&&Rm(a),r&512&&Uo(a,a.return);break;case 12:la(e,a);break;case 13:la(e,a),r&4&&Nm(e,a),r&64&&(e=a.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(a=s0.bind(null,a),R0(e,a))));break;case 22:if(r=a.memoizedState!==null||qn,!r){t=t!==null&&t.memoizedState!==null||Ke,s=qn;var u=Ke;qn=r,(Ke=t)&&!u?sa(e,a,(a.subtreeFlags&8772)!==0):la(e,a),qn=s,Ke=u}break;case 30:break;default:la(e,a)}}function Bm(e){var t=e.alternate;t!==null&&(e.alternate=null,Bm(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&js(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ie=null,Bt=!1;function Pn(e,t,a){for(a=a.child;a!==null;)Dm(e,t,a),a=a.sibling}function Dm(e,t,a){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(ro,a)}catch{}switch(a.tag){case 26:Ke||mn(a,t),Pn(e,t,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Ke||mn(a,t);var r=Ie,s=Bt;ma(a.type)&&(Ie=a.stateNode,Bt=!1),Pn(e,t,a),Yo(a.stateNode),Ie=r,Bt=s;break;case 5:Ke||mn(a,t);case 6:if(r=Ie,s=Bt,Ie=null,Pn(e,t,a),Ie=r,Bt=s,Ie!==null)if(Bt)try{(Ie.nodeType===9?Ie.body:Ie.nodeName==="HTML"?Ie.ownerDocument.body:Ie).removeChild(a.stateNode)}catch(u){je(a,t,u)}else try{Ie.removeChild(a.stateNode)}catch(u){je(a,t,u)}break;case 18:Ie!==null&&(Bt?(e=Ie,Sg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,a.stateNode),ti(e)):Sg(Ie,a.stateNode));break;case 4:r=Ie,s=Bt,Ie=a.stateNode.containerInfo,Bt=!0,Pn(e,t,a),Ie=r,Bt=s;break;case 0:case 11:case 14:case 15:Ke||ia(2,a,t),Ke||ia(4,a,t),Pn(e,t,a);break;case 1:Ke||(mn(a,t),r=a.stateNode,typeof r.componentWillUnmount=="function"&&Cm(a,t,r)),Pn(e,t,a);break;case 21:Pn(e,t,a);break;case 22:Ke=(r=Ke)||a.memoizedState!==null,Pn(e,t,a),Ke=r;break;default:Pn(e,t,a)}}function Nm(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{ti(e)}catch(a){je(t,t.return,a)}}function e0(e){switch(e.tag){case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Om),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Om),t;default:throw Error(l(435,e.tag))}}function ou(e,t){var a=e0(e);t.forEach(function(r){var s=c0.bind(null,e,r);a.has(r)||(a.add(r),r.then(s,s))})}function Ut(e,t){var a=t.deletions;if(a!==null)for(var r=0;r<a.length;r++){var s=a[r],u=e,h=t,v=h;e:for(;v!==null;){switch(v.tag){case 27:if(ma(v.type)){Ie=v.stateNode,Bt=!1;break e}break;case 5:Ie=v.stateNode,Bt=!1;break e;case 3:case 4:Ie=v.stateNode.containerInfo,Bt=!0;break e}v=v.return}if(Ie===null)throw Error(l(160));Dm(u,h,s),Ie=null,Bt=!1,u=s.alternate,u!==null&&(u.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)zm(t,e),t=t.sibling}var ln=null;function zm(e,t){var a=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ut(t,e),$t(e),r&4&&(ia(3,e,e.return),jo(3,e),ia(5,e,e.return));break;case 1:Ut(t,e),$t(e),r&512&&(Ke||a===null||mn(a,a.return)),r&64&&qn&&(e=e.updateQueue,e!==null&&(r=e.callbacks,r!==null&&(a=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var s=ln;if(Ut(t,e),$t(e),r&512&&(Ke||a===null||mn(a,a.return)),r&4){var u=a!==null?a.memoizedState:null;if(r=e.memoizedState,a===null)if(r===null)if(e.stateNode===null){e:{r=e.type,a=e.memoizedProps,s=s.ownerDocument||s;t:switch(r){case"title":u=s.getElementsByTagName("title")[0],(!u||u[lo]||u[vt]||u.namespaceURI==="http://www.w3.org/2000/svg"||u.hasAttribute("itemprop"))&&(u=s.createElement(r),s.head.insertBefore(u,s.querySelector("head > title"))),gt(u,r,a),u[vt]=e,st(u),r=u;break e;case"link":var h=Mg("link","href",s).get(r+(a.href||""));if(h){for(var v=0;v<h.length;v++)if(u=h[v],u.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&u.getAttribute("rel")===(a.rel==null?null:a.rel)&&u.getAttribute("title")===(a.title==null?null:a.title)&&u.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){h.splice(v,1);break t}}u=s.createElement(r),gt(u,r,a),s.head.appendChild(u);break;case"meta":if(h=Mg("meta","content",s).get(r+(a.content||""))){for(v=0;v<h.length;v++)if(u=h[v],u.getAttribute("content")===(a.content==null?null:""+a.content)&&u.getAttribute("name")===(a.name==null?null:a.name)&&u.getAttribute("property")===(a.property==null?null:a.property)&&u.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&u.getAttribute("charset")===(a.charSet==null?null:a.charSet)){h.splice(v,1);break t}}u=s.createElement(r),gt(u,r,a),s.head.appendChild(u);break;default:throw Error(l(468,r))}u[vt]=e,st(u),r=u}e.stateNode=r}else Og(s,e.type,e.stateNode);else e.stateNode=wg(s,r,e.memoizedProps);else u!==r?(u===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):u.count--,r===null?Og(s,e.type,e.stateNode):wg(s,r,e.memoizedProps)):r===null&&e.stateNode!==null&&tu(e,e.memoizedProps,a.memoizedProps)}break;case 27:Ut(t,e),$t(e),r&512&&(Ke||a===null||mn(a,a.return)),a!==null&&r&4&&tu(e,e.memoizedProps,a.memoizedProps);break;case 5:if(Ut(t,e),$t(e),r&512&&(Ke||a===null||mn(a,a.return)),e.flags&32){s=e.stateNode;try{or(s,"")}catch(F){je(e,e.return,F)}}r&4&&e.stateNode!=null&&(s=e.memoizedProps,tu(e,s,a!==null?a.memoizedProps:s)),r&1024&&(ru=!0);break;case 6:if(Ut(t,e),$t(e),r&4){if(e.stateNode===null)throw Error(l(162));r=e.memoizedProps,a=e.stateNode;try{a.nodeValue=r}catch(F){je(e,e.return,F)}}break;case 3:if(Nl=null,s=ln,ln=Bl(t.containerInfo),Ut(t,e),ln=s,$t(e),r&4&&a!==null&&a.memoizedState.isDehydrated)try{ti(t.containerInfo)}catch(F){je(e,e.return,F)}ru&&(ru=!1,Lm(e));break;case 4:r=ln,ln=Bl(e.stateNode.containerInfo),Ut(t,e),$t(e),ln=r;break;case 12:Ut(t,e),$t(e);break;case 13:Ut(t,e),$t(e),e.child.flags&8192&&e.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(du=Ct()),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ou(e,r)));break;case 22:s=e.memoizedState!==null;var B=a!==null&&a.memoizedState!==null,P=qn,Y=Ke;if(qn=P||s,Ke=Y||B,Ut(t,e),Ke=Y,qn=P,$t(e),r&8192)e:for(t=e.stateNode,t._visibility=s?t._visibility&-2:t._visibility|1,s&&(a===null||B||qn||Ke||Pa(e)),a=null,t=e;;){if(t.tag===5||t.tag===26){if(a===null){B=a=t;try{if(u=B.stateNode,s)h=u.style,typeof h.setProperty=="function"?h.setProperty("display","none","important"):h.display="none";else{v=B.stateNode;var Q=B.memoizedProps.style,H=Q!=null&&Q.hasOwnProperty("display")?Q.display:null;v.style.display=H==null||typeof H=="boolean"?"":(""+H).trim()}}catch(F){je(B,B.return,F)}}}else if(t.tag===6){if(a===null){B=t;try{B.stateNode.nodeValue=s?"":B.memoizedProps}catch(F){je(B,B.return,F)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;a===t&&(a=null),t=t.return}a===t&&(a=null),t.sibling.return=t.return,t=t.sibling}r&4&&(r=e.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,ou(e,a))));break;case 19:Ut(t,e),$t(e),r&4&&(r=e.updateQueue,r!==null&&(e.updateQueue=null,ou(e,r)));break;case 30:break;case 21:break;default:Ut(t,e),$t(e)}}function $t(e){var t=e.flags;if(t&2){try{for(var a,r=e.return;r!==null;){if(wm(r)){a=r;break}r=r.return}if(a==null)throw Error(l(160));switch(a.tag){case 27:var s=a.stateNode,u=nu(e);vl(e,u,s);break;case 5:var h=a.stateNode;a.flags&32&&(or(h,""),a.flags&=-33);var v=nu(e);vl(e,v,h);break;case 3:case 4:var B=a.stateNode.containerInfo,P=nu(e);au(e,P,B);break;default:throw Error(l(161))}}catch(Y){je(e,e.return,Y)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Lm(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Lm(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function la(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_m(e,t.alternate,t),t=t.sibling}function Pa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ia(4,t,t.return),Pa(t);break;case 1:mn(t,t.return);var a=t.stateNode;typeof a.componentWillUnmount=="function"&&Cm(t,t.return,a),Pa(t);break;case 27:Yo(t.stateNode);case 26:case 5:mn(t,t.return),Pa(t);break;case 22:t.memoizedState===null&&Pa(t);break;case 30:Pa(t);break;default:Pa(t)}e=e.sibling}}function sa(e,t,a){for(a=a&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var r=t.alternate,s=e,u=t,h=u.flags;switch(u.tag){case 0:case 11:case 15:sa(s,u,a),jo(4,u);break;case 1:if(sa(s,u,a),r=u,s=r.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(P){je(r,r.return,P)}if(r=u,s=r.updateQueue,s!==null){var v=r.stateNode;try{var B=s.shared.hiddenCallbacks;if(B!==null)for(s.shared.hiddenCallbacks=null,s=0;s<B.length;s++)up(B[s],v)}catch(P){je(r,r.return,P)}}a&&h&64&&Tm(u),Uo(u,u.return);break;case 27:Mm(u);case 26:case 5:sa(s,u,a),a&&r===null&&h&4&&Rm(u),Uo(u,u.return);break;case 12:sa(s,u,a);break;case 13:sa(s,u,a),a&&h&4&&Nm(s,u);break;case 22:u.memoizedState===null&&sa(s,u,a),Uo(u,u.return);break;case 30:break;default:sa(s,u,a)}t=t.sibling}}function iu(e,t){var a=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(a=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==a&&(e!=null&&e.refCount++,a!=null&&Ao(a))}function lu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ao(e))}function gn(e,t,a,r){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)km(e,t,a,r),t=t.sibling}function km(e,t,a,r){var s=t.flags;switch(t.tag){case 0:case 11:case 15:gn(e,t,a,r),s&2048&&jo(9,t);break;case 1:gn(e,t,a,r);break;case 3:gn(e,t,a,r),s&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Ao(e)));break;case 12:if(s&2048){gn(e,t,a,r),e=t.stateNode;try{var u=t.memoizedProps,h=u.id,v=u.onPostCommit;typeof v=="function"&&v(h,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(B){je(t,t.return,B)}}else gn(e,t,a,r);break;case 13:gn(e,t,a,r);break;case 23:break;case 22:u=t.stateNode,h=t.alternate,t.memoizedState!==null?u._visibility&2?gn(e,t,a,r):$o(e,t):u._visibility&2?gn(e,t,a,r):(u._visibility|=2,Tr(e,t,a,r,(t.subtreeFlags&10256)!==0)),s&2048&&iu(h,t);break;case 24:gn(e,t,a,r),s&2048&&lu(t.alternate,t);break;default:gn(e,t,a,r)}}function Tr(e,t,a,r,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var u=e,h=t,v=a,B=r,P=h.flags;switch(h.tag){case 0:case 11:case 15:Tr(u,h,v,B,s),jo(8,h);break;case 23:break;case 22:var Y=h.stateNode;h.memoizedState!==null?Y._visibility&2?Tr(u,h,v,B,s):$o(u,h):(Y._visibility|=2,Tr(u,h,v,B,s)),s&&P&2048&&iu(h.alternate,h);break;case 24:Tr(u,h,v,B,s),s&&P&2048&&lu(h.alternate,h);break;default:Tr(u,h,v,B,s)}t=t.sibling}}function $o(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var a=e,r=t,s=r.flags;switch(r.tag){case 22:$o(a,r),s&2048&&iu(r.alternate,r);break;case 24:$o(a,r),s&2048&&lu(r.alternate,r);break;default:$o(a,r)}t=t.sibling}}var qo=8192;function Cr(e){if(e.subtreeFlags&qo)for(e=e.child;e!==null;)jm(e),e=e.sibling}function jm(e){switch(e.tag){case 26:Cr(e),e.flags&qo&&e.memoizedState!==null&&$0(ln,e.memoizedState,e.memoizedProps);break;case 5:Cr(e);break;case 3:case 4:var t=ln;ln=Bl(e.stateNode.containerInfo),Cr(e),ln=t;break;case 22:e.memoizedState===null&&(t=e.alternate,t!==null&&t.memoizedState!==null?(t=qo,qo=16777216,Cr(e),qo=t):Cr(e));break;default:Cr(e)}}function Um(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Po(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var r=t[a];ut=r,qm(r,e)}Um(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)$m(e),e=e.sibling}function $m(e){switch(e.tag){case 0:case 11:case 15:Po(e),e.flags&2048&&ia(9,e,e.return);break;case 3:Po(e);break;case 12:Po(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,bl(e)):Po(e);break;default:Po(e)}}function bl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var a=0;a<t.length;a++){var r=t[a];ut=r,qm(r,e)}Um(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ia(8,t,t.return),bl(t);break;case 22:a=t.stateNode,a._visibility&2&&(a._visibility&=-3,bl(t));break;default:bl(t)}e=e.sibling}}function qm(e,t){for(;ut!==null;){var a=ut;switch(a.tag){case 0:case 11:case 15:ia(8,a,t);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Ao(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,ut=r;else e:for(a=e;ut!==null;){r=ut;var s=r.sibling,u=r.return;if(Bm(r),r===a){ut=null;break e}if(s!==null){s.return=u,ut=s;break e}ut=u}}}var t0={getCacheForType:function(e){var t=bt(rt),a=t.data.get(e);return a===void 0&&(a=e(),t.data.set(e,a)),a}},n0=typeof WeakMap=="function"?WeakMap:Map,Be=0,qe=null,xe=null,Ae=0,De=0,qt=null,ca=!1,Rr=!1,su=!1,In=0,We=0,ua=0,Ia=0,cu=0,en=0,wr=0,Io=null,Dt=null,uu=!1,du=0,Sl=1/0,xl=null,da=null,mt=0,fa=null,Mr=null,Or=0,fu=0,pu=null,Pm=null,Ho=0,mu=null;function Pt(){if((Be&2)!==0&&Ae!==0)return Ae&-Ae;if($.T!==null){var e=hr;return e!==0?e:xu()}return nf()}function Im(){en===0&&(en=(Ae&536870912)===0||we?Kd():536870912);var e=Jt.current;return e!==null&&(e.flags|=32),en}function It(e,t,a){(e===qe&&(De===2||De===9)||e.cancelPendingCommit!==null)&&(_r(e,0),pa(e,Ae,en,!1)),io(e,a),((Be&2)===0||e!==qe)&&(e===qe&&((Be&2)===0&&(Ia|=a),We===4&&pa(e,Ae,en,!1)),hn(e))}function Hm(e,t,a){if((Be&6)!==0)throw Error(l(327));var r=!a&&(t&124)===0&&(t&e.expiredLanes)===0||oo(e,t),s=r?o0(e,t):yu(e,t,!0),u=r;do{if(s===0){Rr&&!r&&pa(e,t,0,!1);break}else{if(a=e.current.alternate,u&&!a0(a)){s=yu(e,t,!1),u=!1;continue}if(s===2){if(u=t,e.errorRecoveryDisabledLanes&u)var h=0;else h=e.pendingLanes&-536870913,h=h!==0?h:h&536870912?536870912:0;if(h!==0){t=h;e:{var v=e;s=Io;var B=v.current.memoizedState.isDehydrated;if(B&&(_r(v,h).flags|=256),h=yu(v,h,!1),h!==2){if(su&&!B){v.errorRecoveryDisabledLanes|=u,Ia|=u,s=4;break e}u=Dt,Dt=s,u!==null&&(Dt===null?Dt=u:Dt.push.apply(Dt,u))}s=h}if(u=!1,s!==2)continue}}if(s===1){_r(e,0),pa(e,t,0,!0);break}e:{switch(r=e,u=s,u){case 0:case 1:throw Error(l(345));case 4:if((t&4194048)!==t)break;case 6:pa(r,t,en,!ca);break e;case 2:Dt=null;break;case 3:case 5:break;default:throw Error(l(329))}if((t&62914560)===t&&(s=du+300-Ct(),10<s)){if(pa(r,t,en,!ca),Di(r,0,!0)!==0)break e;r.timeoutHandle=vg(Fm.bind(null,r,a,Dt,xl,uu,t,en,Ia,wr,ca,u,2,-0,0),s);break e}Fm(r,a,Dt,xl,uu,t,en,Ia,wr,ca,u,0,-0,0)}}break}while(!0);hn(e)}function Fm(e,t,a,r,s,u,h,v,B,P,Y,Q,H,F){if(e.timeoutHandle=-1,Q=t.subtreeFlags,(Q&8192||(Q&16785408)===16785408)&&(Zo={stylesheets:null,count:0,unsuspend:U0},jm(t),Q=q0(),Q!==null)){e.cancelPendingCommit=Q(Qm.bind(null,e,t,u,a,r,s,h,v,B,Y,1,H,F)),pa(e,u,h,!P);return}Qm(e,t,u,a,r,s,h,v,B)}function a0(e){for(var t=e;;){var a=t.tag;if((a===0||a===11||a===15)&&t.flags&16384&&(a=t.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var s=a[r],u=s.getSnapshot;s=s.value;try{if(!kt(u(),s))return!1}catch{return!1}}if(a=t.child,t.subtreeFlags&16384&&a!==null)a.return=t,t=a;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function pa(e,t,a,r){t&=~cu,t&=~Ia,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var s=t;0<s;){var u=31-Lt(s),h=1<<u;r[u]=-1,s&=~h}a!==0&&ef(e,a,t)}function El(){return(Be&6)===0?(Fo(0),!1):!0}function gu(){if(xe!==null){if(De===0)var e=xe.return;else e=xe,zn=ka=null,Dc(e),Er=null,zo=0,e=xe;for(;e!==null;)Am(e.alternate,e),e=e.return;xe=null}}function _r(e,t){var a=e.timeoutHandle;a!==-1&&(e.timeoutHandle=-1,x0(a)),a=e.cancelPendingCommit,a!==null&&(e.cancelPendingCommit=null,a()),gu(),qe=e,xe=a=Bn(e.current,null),Ae=t,De=0,qt=null,ca=!1,Rr=oo(e,t),su=!1,wr=en=cu=Ia=ua=We=0,Dt=Io=null,uu=!1,(t&8)!==0&&(t|=t&32);var r=e.entangledLanes;if(r!==0)for(e=e.entanglements,r&=t;0<r;){var s=31-Lt(r),u=1<<s;t|=e[s],r&=~u}return In=t,Fi(),a}function Gm(e,t){ve=null,$.H=cl,t===Co||t===Ji?(t=sp(),De=3):t===op?(t=sp(),De=4):De=t===cm?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,qt=t,xe===null&&(We=1,ml(e,Xt(t,e.current)))}function Vm(){var e=$.H;return $.H=cl,e===null?cl:e}function Ym(){var e=$.A;return $.A=t0,e}function hu(){We=4,ca||(Ae&4194048)!==Ae&&Jt.current!==null||(Rr=!0),(ua&134217727)===0&&(Ia&134217727)===0||qe===null||pa(qe,Ae,en,!1)}function yu(e,t,a){var r=Be;Be|=2;var s=Vm(),u=Ym();(qe!==e||Ae!==t)&&(xl=null,_r(e,t)),t=!1;var h=We;e:do try{if(De!==0&&xe!==null){var v=xe,B=qt;switch(De){case 8:gu(),h=6;break e;case 3:case 2:case 9:case 6:Jt.current===null&&(t=!0);var P=De;if(De=0,qt=null,Br(e,v,B,P),a&&Rr){h=0;break e}break;default:P=De,De=0,qt=null,Br(e,v,B,P)}}r0(),h=We;break}catch(Y){Gm(e,Y)}while(!0);return t&&e.shellSuspendCounter++,zn=ka=null,Be=r,$.H=s,$.A=u,xe===null&&(qe=null,Ae=0,Fi()),h}function r0(){for(;xe!==null;)Wm(xe)}function o0(e,t){var a=Be;Be|=2;var r=Vm(),s=Ym();qe!==e||Ae!==t?(xl=null,Sl=Ct()+500,_r(e,t)):Rr=oo(e,t);e:do try{if(De!==0&&xe!==null){t=xe;var u=qt;t:switch(De){case 1:De=0,qt=null,Br(e,t,u,1);break;case 2:case 9:if(ip(u)){De=0,qt=null,Xm(t);break}t=function(){De!==2&&De!==9||qe!==e||(De=7),hn(e)},u.then(t,t);break e;case 3:De=7;break e;case 4:De=5;break e;case 7:ip(u)?(De=0,qt=null,Xm(t)):(De=0,qt=null,Br(e,t,u,7));break;case 5:var h=null;switch(xe.tag){case 26:h=xe.memoizedState;case 5:case 27:var v=xe;if(!h||_g(h)){De=0,qt=null;var B=v.sibling;if(B!==null)xe=B;else{var P=v.return;P!==null?(xe=P,Al(P)):xe=null}break t}}De=0,qt=null,Br(e,t,u,5);break;case 6:De=0,qt=null,Br(e,t,u,6);break;case 8:gu(),We=6;break e;default:throw Error(l(462))}}i0();break}catch(Y){Gm(e,Y)}while(!0);return zn=ka=null,$.H=r,$.A=s,Be=a,xe!==null?0:(qe=null,Ae=0,Fi(),We)}function i0(){for(;xe!==null&&!Bs();)Wm(xe)}function Wm(e){var t=xm(e.alternate,e,In);e.memoizedProps=e.pendingProps,t===null?Al(e):xe=t}function Xm(e){var t=e,a=t.alternate;switch(t.tag){case 15:case 0:t=gm(a,t,t.pendingProps,t.type,void 0,Ae);break;case 11:t=gm(a,t,t.pendingProps,t.type.render,t.ref,Ae);break;case 5:Dc(t);default:Am(a,t),t=xe=Zf(t,In),t=xm(a,t,In)}e.memoizedProps=e.pendingProps,t===null?Al(e):xe=t}function Br(e,t,a,r){zn=ka=null,Dc(t),Er=null,zo=0;var s=t.return;try{if(Xb(e,s,t,a,Ae)){We=1,ml(e,Xt(a,e.current)),xe=null;return}}catch(u){if(s!==null)throw xe=s,u;We=1,ml(e,Xt(a,e.current)),xe=null;return}t.flags&32768?(we||r===1?e=!0:Rr||(Ae&536870912)!==0?e=!1:(ca=e=!0,(r===2||r===9||r===3||r===6)&&(r=Jt.current,r!==null&&r.tag===13&&(r.flags|=16384))),Zm(t,e)):Al(t)}function Al(e){var t=e;do{if((t.flags&32768)!==0){Zm(t,ca);return}e=t.return;var a=Qb(t.alternate,t,In);if(a!==null){xe=a;return}if(t=t.sibling,t!==null){xe=t;return}xe=t=e}while(t!==null);We===0&&(We=5)}function Zm(e,t){do{var a=Kb(e.alternate,e);if(a!==null){a.flags&=32767,xe=a;return}if(a=e.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!t&&(e=e.sibling,e!==null)){xe=e;return}xe=e=a}while(e!==null);We=6,xe=null}function Qm(e,t,a,r,s,u,h,v,B){e.cancelPendingCommit=null;do Tl();while(mt!==0);if((Be&6)!==0)throw Error(l(327));if(t!==null){if(t===e.current)throw Error(l(177));if(u=t.lanes|t.childLanes,u|=lc,Uv(e,a,u,h,v,B),e===qe&&(xe=qe=null,Ae=0),Mr=t,fa=e,Or=a,fu=u,pu=s,Pm=r,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,u0(Qa,function(){return ng(),null})):(e.callbackNode=null,e.callbackPriority=0),r=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||r){r=$.T,$.T=null,s=J.p,J.p=2,h=Be,Be|=4;try{Jb(e,t,a)}finally{Be=h,J.p=s,$.T=r}}mt=1,Km(),Jm(),eg()}}function Km(){if(mt===1){mt=0;var e=fa,t=Mr,a=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||a){a=$.T,$.T=null;var r=J.p;J.p=2;var s=Be;Be|=4;try{zm(t,e);var u=Ou,h=qf(e.containerInfo),v=u.focusedElem,B=u.selectionRange;if(h!==v&&v&&v.ownerDocument&&$f(v.ownerDocument.documentElement,v)){if(B!==null&&nc(v)){var P=B.start,Y=B.end;if(Y===void 0&&(Y=P),"selectionStart"in v)v.selectionStart=P,v.selectionEnd=Math.min(Y,v.value.length);else{var Q=v.ownerDocument||document,H=Q&&Q.defaultView||window;if(H.getSelection){var F=H.getSelection(),pe=v.textContent.length,de=Math.min(B.start,pe),Le=B.end===void 0?de:Math.min(B.end,pe);!F.extend&&de>Le&&(h=Le,Le=de,de=h);var U=Uf(v,de),L=Uf(v,Le);if(U&&L&&(F.rangeCount!==1||F.anchorNode!==U.node||F.anchorOffset!==U.offset||F.focusNode!==L.node||F.focusOffset!==L.offset)){var q=Q.createRange();q.setStart(U.node,U.offset),F.removeAllRanges(),de>Le?(F.addRange(q),F.extend(L.node,L.offset)):(q.setEnd(L.node,L.offset),F.addRange(q))}}}}for(Q=[],F=v;F=F.parentNode;)F.nodeType===1&&Q.push({element:F,left:F.scrollLeft,top:F.scrollTop});for(typeof v.focus=="function"&&v.focus(),v=0;v<Q.length;v++){var X=Q[v];X.element.scrollLeft=X.left,X.element.scrollTop=X.top}}kl=!!Mu,Ou=Mu=null}finally{Be=s,J.p=r,$.T=a}}e.current=t,mt=2}}function Jm(){if(mt===2){mt=0;var e=fa,t=Mr,a=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||a){a=$.T,$.T=null;var r=J.p;J.p=2;var s=Be;Be|=4;try{_m(e,t.alternate,t)}finally{Be=s,J.p=r,$.T=a}}mt=3}}function eg(){if(mt===4||mt===3){mt=0,Ds();var e=fa,t=Mr,a=Or,r=Pm;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?mt=5:(mt=0,Mr=fa=null,tg(e,e.pendingLanes));var s=e.pendingLanes;if(s===0&&(da=null),Ls(a),t=t.stateNode,zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(ro,t,void 0,(t.current.flags&128)===128)}catch{}if(r!==null){t=$.T,s=J.p,J.p=2,$.T=null;try{for(var u=e.onRecoverableError,h=0;h<r.length;h++){var v=r[h];u(v.value,{componentStack:v.stack})}}finally{$.T=t,J.p=s}}(Or&3)!==0&&Tl(),hn(e),s=e.pendingLanes,(a&4194090)!==0&&(s&42)!==0?e===mu?Ho++:(Ho=0,mu=e):Ho=0,Fo(0)}}function tg(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Ao(t)))}function Tl(e){return Km(),Jm(),eg(),ng()}function ng(){if(mt!==5)return!1;var e=fa,t=fu;fu=0;var a=Ls(Or),r=$.T,s=J.p;try{J.p=32>a?32:a,$.T=null,a=pu,pu=null;var u=fa,h=Or;if(mt=0,Mr=fa=null,Or=0,(Be&6)!==0)throw Error(l(331));var v=Be;if(Be|=4,$m(u.current),km(u,u.current,h,a),Be=v,Fo(0,!1),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot(ro,u)}catch{}return!0}finally{J.p=s,$.T=r,tg(e,t)}}function ag(e,t,a){t=Xt(a,t),t=Vc(e.stateNode,t,2),e=na(e,t,2),e!==null&&(io(e,2),hn(e))}function je(e,t,a){if(e.tag===3)ag(e,e,a);else for(;t!==null;){if(t.tag===3){ag(t,e,a);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(da===null||!da.has(r))){e=Xt(a,e),a=lm(2),r=na(t,a,2),r!==null&&(sm(a,r,t,e),io(r,2),hn(r));break}}t=t.return}}function vu(e,t,a){var r=e.pingCache;if(r===null){r=e.pingCache=new n0;var s=new Set;r.set(t,s)}else s=r.get(t),s===void 0&&(s=new Set,r.set(t,s));s.has(a)||(su=!0,s.add(a),e=l0.bind(null,e,t,a),t.then(e,e))}function l0(e,t,a){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&a,e.warmLanes&=~a,qe===e&&(Ae&a)===a&&(We===4||We===3&&(Ae&62914560)===Ae&&300>Ct()-du?(Be&2)===0&&_r(e,0):cu|=a,wr===Ae&&(wr=0)),hn(e)}function rg(e,t){t===0&&(t=Jd()),e=fr(e,t),e!==null&&(io(e,t),hn(e))}function s0(e){var t=e.memoizedState,a=0;t!==null&&(a=t.retryLane),rg(e,a)}function c0(e,t){var a=0;switch(e.tag){case 13:var r=e.stateNode,s=e.memoizedState;s!==null&&(a=s.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(l(314))}r!==null&&r.delete(t),rg(e,a)}function u0(e,t){return Mn(e,t)}var Cl=null,Dr=null,bu=!1,Rl=!1,Su=!1,Ha=0;function hn(e){e!==Dr&&e.next===null&&(Dr===null?Cl=Dr=e:Dr=Dr.next=e),Rl=!0,bu||(bu=!0,f0())}function Fo(e,t){if(!Su&&Rl){Su=!0;do for(var a=!1,r=Cl;r!==null;){if(e!==0){var s=r.pendingLanes;if(s===0)var u=0;else{var h=r.suspendedLanes,v=r.pingedLanes;u=(1<<31-Lt(42|e)+1)-1,u&=s&~(h&~v),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,sg(r,u))}else u=Ae,u=Di(r,r===qe?u:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(u&3)===0||oo(r,u)||(a=!0,sg(r,u));r=r.next}while(a);Su=!1}}function d0(){og()}function og(){Rl=bu=!1;var e=0;Ha!==0&&(S0()&&(e=Ha),Ha=0);for(var t=Ct(),a=null,r=Cl;r!==null;){var s=r.next,u=ig(r,t);u===0?(r.next=null,a===null?Cl=s:a.next=s,s===null&&(Dr=a)):(a=r,(e!==0||(u&3)!==0)&&(Rl=!0)),r=s}Fo(e)}function ig(e,t){for(var a=e.suspendedLanes,r=e.pingedLanes,s=e.expirationTimes,u=e.pendingLanes&-62914561;0<u;){var h=31-Lt(u),v=1<<h,B=s[h];B===-1?((v&a)===0||(v&r)!==0)&&(s[h]=jv(v,t)):B<=t&&(e.expiredLanes|=v),u&=~v}if(t=qe,a=Ae,a=Di(e,e===t?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,a===0||e===t&&(De===2||De===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Ta(r),e.callbackNode=null,e.callbackPriority=0;if((a&3)===0||oo(e,a)){if(t=a&-a,t===e.callbackPriority)return t;switch(r!==null&&Ta(r),Ls(a)){case 2:case 8:a=ao;break;case 32:a=Qa;break;case 268435456:a=Qd;break;default:a=Qa}return r=lg.bind(null,e),a=Mn(a,r),e.callbackPriority=t,e.callbackNode=a,t}return r!==null&&r!==null&&Ta(r),e.callbackPriority=2,e.callbackNode=null,2}function lg(e,t){if(mt!==0&&mt!==5)return e.callbackNode=null,e.callbackPriority=0,null;var a=e.callbackNode;if(Tl()&&e.callbackNode!==a)return null;var r=Ae;return r=Di(e,e===qe?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Hm(e,r,t),ig(e,Ct()),e.callbackNode!=null&&e.callbackNode===a?lg.bind(null,e):null)}function sg(e,t){if(Tl())return null;Hm(e,t,!0)}function f0(){E0(function(){(Be&6)!==0?Mn(Oi,d0):og()})}function xu(){return Ha===0&&(Ha=Kd()),Ha}function cg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:ji(""+e)}function ug(e,t){var a=t.ownerDocument.createElement("input");return a.name=t.name,a.value=t.value,e.id&&a.setAttribute("form",e.id),t.parentNode.insertBefore(a,t),e=new FormData(e),a.parentNode.removeChild(a),e}function p0(e,t,a,r,s){if(t==="submit"&&a&&a.stateNode===s){var u=cg((s[Mt]||null).action),h=r.submitter;h&&(t=(t=h[Mt]||null)?cg(t.formAction):h.getAttribute("formAction"),t!==null&&(u=t,h=null));var v=new Pi("action","action",null,r,s);e.push({event:v,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Ha!==0){var B=h?ug(s,h):new FormData(s);Pc(a,{pending:!0,data:B,method:s.method,action:u},null,B)}}else typeof u=="function"&&(v.preventDefault(),B=h?ug(s,h):new FormData(s),Pc(a,{pending:!0,data:B,method:s.method,action:u},u,B))},currentTarget:s}]})}}for(var Eu=0;Eu<ic.length;Eu++){var Au=ic[Eu],m0=Au.toLowerCase(),g0=Au[0].toUpperCase()+Au.slice(1);on(m0,"on"+g0)}on(Hf,"onAnimationEnd"),on(Ff,"onAnimationIteration"),on(Gf,"onAnimationStart"),on("dblclick","onDoubleClick"),on("focusin","onFocus"),on("focusout","onBlur"),on(Db,"onTransitionRun"),on(Nb,"onTransitionStart"),on(zb,"onTransitionCancel"),on(Vf,"onTransitionEnd"),nr("onMouseEnter",["mouseout","mouseover"]),nr("onMouseLeave",["mouseout","mouseover"]),nr("onPointerEnter",["pointerout","pointerover"]),nr("onPointerLeave",["pointerout","pointerover"]),wa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),wa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),wa("onBeforeInput",["compositionend","keypress","textInput","paste"]),wa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),wa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),wa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),h0=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Go));function dg(e,t){t=(t&4)!==0;for(var a=0;a<e.length;a++){var r=e[a],s=r.event;r=r.listeners;e:{var u=void 0;if(t)for(var h=r.length-1;0<=h;h--){var v=r[h],B=v.instance,P=v.currentTarget;if(v=v.listener,B!==u&&s.isPropagationStopped())break e;u=v,s.currentTarget=P;try{u(s)}catch(Y){pl(Y)}s.currentTarget=null,u=B}else for(h=0;h<r.length;h++){if(v=r[h],B=v.instance,P=v.currentTarget,v=v.listener,B!==u&&s.isPropagationStopped())break e;u=v,s.currentTarget=P;try{u(s)}catch(Y){pl(Y)}s.currentTarget=null,u=B}}}}function Ee(e,t){var a=t[ks];a===void 0&&(a=t[ks]=new Set);var r=e+"__bubble";a.has(r)||(fg(t,e,2,!1),a.add(r))}function Tu(e,t,a){var r=0;t&&(r|=4),fg(a,e,r,t)}var wl="_reactListening"+Math.random().toString(36).slice(2);function Cu(e){if(!e[wl]){e[wl]=!0,rf.forEach(function(a){a!=="selectionchange"&&(h0.has(a)||Tu(a,!1,e),Tu(a,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[wl]||(t[wl]=!0,Tu("selectionchange",!1,t))}}function fg(e,t,a,r){switch(kg(t)){case 2:var s=H0;break;case 8:s=F0;break;default:s=$u}a=s.bind(null,t,a,e),s=void 0,!Ys||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),r?s!==void 0?e.addEventListener(t,a,{capture:!0,passive:s}):e.addEventListener(t,a,!0):s!==void 0?e.addEventListener(t,a,{passive:s}):e.addEventListener(t,a,!1)}function Ru(e,t,a,r,s){var u=r;if((t&1)===0&&(t&2)===0&&r!==null)e:for(;;){if(r===null)return;var h=r.tag;if(h===3||h===4){var v=r.stateNode.containerInfo;if(v===s)break;if(h===4)for(h=r.return;h!==null;){var B=h.tag;if((B===3||B===4)&&h.stateNode.containerInfo===s)return;h=h.return}for(;v!==null;){if(h=Ja(v),h===null)return;if(B=h.tag,B===5||B===6||B===26||B===27){r=u=h;continue e}v=v.parentNode}}r=r.return}bf(function(){var P=u,Y=Gs(a),Q=[];e:{var H=Yf.get(e);if(H!==void 0){var F=Pi,pe=e;switch(e){case"keypress":if($i(a)===0)break e;case"keydown":case"keyup":F=ub;break;case"focusin":pe="focus",F=Qs;break;case"focusout":pe="blur",F=Qs;break;case"beforeblur":case"afterblur":F=Qs;break;case"click":if(a.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":F=Ef;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":F=Kv;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":F=pb;break;case Hf:case Ff:case Gf:F=tb;break;case Vf:F=gb;break;case"scroll":case"scrollend":F=Zv;break;case"wheel":F=yb;break;case"copy":case"cut":case"paste":F=ab;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":F=Tf;break;case"toggle":case"beforetoggle":F=bb}var de=(t&4)!==0,Le=!de&&(e==="scroll"||e==="scrollend"),U=de?H!==null?H+"Capture":null:H;de=[];for(var L=P,q;L!==null;){var X=L;if(q=X.stateNode,X=X.tag,X!==5&&X!==26&&X!==27||q===null||U===null||(X=co(L,U),X!=null&&de.push(Vo(L,X,q))),Le)break;L=L.return}0<de.length&&(H=new F(H,pe,null,a,Y),Q.push({event:H,listeners:de}))}}if((t&7)===0){e:{if(H=e==="mouseover"||e==="pointerover",F=e==="mouseout"||e==="pointerout",H&&a!==Fs&&(pe=a.relatedTarget||a.fromElement)&&(Ja(pe)||pe[Ka]))break e;if((F||H)&&(H=Y.window===Y?Y:(H=Y.ownerDocument)?H.defaultView||H.parentWindow:window,F?(pe=a.relatedTarget||a.toElement,F=P,pe=pe?Ja(pe):null,pe!==null&&(Le=d(pe),de=pe.tag,pe!==Le||de!==5&&de!==27&&de!==6)&&(pe=null)):(F=null,pe=P),F!==pe)){if(de=Ef,X="onMouseLeave",U="onMouseEnter",L="mouse",(e==="pointerout"||e==="pointerover")&&(de=Tf,X="onPointerLeave",U="onPointerEnter",L="pointer"),Le=F==null?H:so(F),q=pe==null?H:so(pe),H=new de(X,L+"leave",F,a,Y),H.target=Le,H.relatedTarget=q,X=null,Ja(Y)===P&&(de=new de(U,L+"enter",pe,a,Y),de.target=q,de.relatedTarget=Le,X=de),Le=X,F&&pe)t:{for(de=F,U=pe,L=0,q=de;q;q=Nr(q))L++;for(q=0,X=U;X;X=Nr(X))q++;for(;0<L-q;)de=Nr(de),L--;for(;0<q-L;)U=Nr(U),q--;for(;L--;){if(de===U||U!==null&&de===U.alternate)break t;de=Nr(de),U=Nr(U)}de=null}else de=null;F!==null&&pg(Q,H,F,de,!1),pe!==null&&Le!==null&&pg(Q,Le,pe,de,!0)}}e:{if(H=P?so(P):window,F=H.nodeName&&H.nodeName.toLowerCase(),F==="select"||F==="input"&&H.type==="file")var se=Df;else if(_f(H))if(Nf)se=Ob;else{se=wb;var be=Rb}else F=H.nodeName,!F||F.toLowerCase()!=="input"||H.type!=="checkbox"&&H.type!=="radio"?P&&Hs(P.elementType)&&(se=Df):se=Mb;if(se&&(se=se(e,P))){Bf(Q,se,a,Y);break e}be&&be(e,H,P),e==="focusout"&&P&&H.type==="number"&&P.memoizedProps.value!=null&&Is(H,"number",H.value)}switch(be=P?so(P):window,e){case"focusin":(_f(be)||be.contentEditable==="true")&&(cr=be,ac=P,vo=null);break;case"focusout":vo=ac=cr=null;break;case"mousedown":rc=!0;break;case"contextmenu":case"mouseup":case"dragend":rc=!1,Pf(Q,a,Y);break;case"selectionchange":if(Bb)break;case"keydown":case"keyup":Pf(Q,a,Y)}var ce;if(Js)e:{switch(e){case"compositionstart":var fe="onCompositionStart";break e;case"compositionend":fe="onCompositionEnd";break e;case"compositionupdate":fe="onCompositionUpdate";break e}fe=void 0}else sr?Mf(e,a)&&(fe="onCompositionEnd"):e==="keydown"&&a.keyCode===229&&(fe="onCompositionStart");fe&&(Cf&&a.locale!=="ko"&&(sr||fe!=="onCompositionStart"?fe==="onCompositionEnd"&&sr&&(ce=Sf()):(Kn=Y,Ws="value"in Kn?Kn.value:Kn.textContent,sr=!0)),be=Ml(P,fe),0<be.length&&(fe=new Af(fe,e,null,a,Y),Q.push({event:fe,listeners:be}),ce?fe.data=ce:(ce=Of(a),ce!==null&&(fe.data=ce)))),(ce=xb?Eb(e,a):Ab(e,a))&&(fe=Ml(P,"onBeforeInput"),0<fe.length&&(be=new Af("onBeforeInput","beforeinput",null,a,Y),Q.push({event:be,listeners:fe}),be.data=ce)),p0(Q,e,P,a,Y)}dg(Q,t)})}function Vo(e,t,a){return{instance:e,listener:t,currentTarget:a}}function Ml(e,t){for(var a=t+"Capture",r=[];e!==null;){var s=e,u=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||u===null||(s=co(e,a),s!=null&&r.unshift(Vo(e,s,u)),s=co(e,t),s!=null&&r.push(Vo(e,s,u))),e.tag===3)return r;e=e.return}return[]}function Nr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function pg(e,t,a,r,s){for(var u=t._reactName,h=[];a!==null&&a!==r;){var v=a,B=v.alternate,P=v.stateNode;if(v=v.tag,B!==null&&B===r)break;v!==5&&v!==26&&v!==27||P===null||(B=P,s?(P=co(a,u),P!=null&&h.unshift(Vo(a,P,B))):s||(P=co(a,u),P!=null&&h.push(Vo(a,P,B)))),a=a.return}h.length!==0&&e.push({event:t,listeners:h})}var y0=/\r\n?/g,v0=/\u0000|\uFFFD/g;function mg(e){return(typeof e=="string"?e:""+e).replace(y0,`
`).replace(v0,"")}function gg(e,t){return t=mg(t),mg(e)===t}function Ol(){}function ze(e,t,a,r,s,u){switch(a){case"children":typeof r=="string"?t==="body"||t==="textarea"&&r===""||or(e,r):(typeof r=="number"||typeof r=="bigint")&&t!=="body"&&or(e,""+r);break;case"className":zi(e,"class",r);break;case"tabIndex":zi(e,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":zi(e,a,r);break;case"style":yf(e,r,u);break;case"data":if(t!=="object"){zi(e,"data",r);break}case"src":case"href":if(r===""&&(t!=="a"||a!=="href")){e.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=ji(""+r),e.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){e.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(t!=="input"&&ze(e,t,"name",s.name,s,null),ze(e,t,"formEncType",s.formEncType,s,null),ze(e,t,"formMethod",s.formMethod,s,null),ze(e,t,"formTarget",s.formTarget,s,null)):(ze(e,t,"encType",s.encType,s,null),ze(e,t,"method",s.method,s,null),ze(e,t,"target",s.target,s,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){e.removeAttribute(a);break}r=ji(""+r),e.setAttribute(a,r);break;case"onClick":r!=null&&(e.onclick=Ol);break;case"onScroll":r!=null&&Ee("scroll",e);break;case"onScrollEnd":r!=null&&Ee("scrollend",e);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(l(61));if(a=r.__html,a!=null){if(s.children!=null)throw Error(l(60));e.innerHTML=a}}break;case"multiple":e.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":e.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){e.removeAttribute("xlink:href");break}a=ji(""+r),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""+r):e.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,""):e.removeAttribute(a);break;case"capture":case"download":r===!0?e.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?e.setAttribute(a,r):e.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?e.setAttribute(a,r):e.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?e.removeAttribute(a):e.setAttribute(a,r);break;case"popover":Ee("beforetoggle",e),Ee("toggle",e),Ni(e,"popover",r);break;case"xlinkActuate":On(e,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":On(e,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":On(e,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":On(e,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":On(e,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":On(e,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":On(e,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":On(e,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":On(e,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Ni(e,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=Wv.get(a)||a,Ni(e,a,r))}}function wu(e,t,a,r,s,u){switch(a){case"style":yf(e,r,u);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(l(61));if(a=r.__html,a!=null){if(s.children!=null)throw Error(l(60));e.innerHTML=a}}break;case"children":typeof r=="string"?or(e,r):(typeof r=="number"||typeof r=="bigint")&&or(e,""+r);break;case"onScroll":r!=null&&Ee("scroll",e);break;case"onScrollEnd":r!=null&&Ee("scrollend",e);break;case"onClick":r!=null&&(e.onclick=Ol);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!of.hasOwnProperty(a))e:{if(a[0]==="o"&&a[1]==="n"&&(s=a.endsWith("Capture"),t=a.slice(2,s?a.length-7:void 0),u=e[Mt]||null,u=u!=null?u[a]:null,typeof u=="function"&&e.removeEventListener(t,u,s),typeof r=="function")){typeof u!="function"&&u!==null&&(a in e?e[a]=null:e.hasAttribute(a)&&e.removeAttribute(a)),e.addEventListener(t,r,s);break e}a in e?e[a]=r:r===!0?e.setAttribute(a,""):Ni(e,a,r)}}}function gt(e,t,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ee("error",e),Ee("load",e);var r=!1,s=!1,u;for(u in a)if(a.hasOwnProperty(u)){var h=a[u];if(h!=null)switch(u){case"src":r=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:ze(e,t,u,h,a,null)}}s&&ze(e,t,"srcSet",a.srcSet,a,null),r&&ze(e,t,"src",a.src,a,null);return;case"input":Ee("invalid",e);var v=u=h=s=null,B=null,P=null;for(r in a)if(a.hasOwnProperty(r)){var Y=a[r];if(Y!=null)switch(r){case"name":s=Y;break;case"type":h=Y;break;case"checked":B=Y;break;case"defaultChecked":P=Y;break;case"value":u=Y;break;case"defaultValue":v=Y;break;case"children":case"dangerouslySetInnerHTML":if(Y!=null)throw Error(l(137,t));break;default:ze(e,t,r,Y,a,null)}}pf(e,u,v,B,P,h,s,!1),Li(e);return;case"select":Ee("invalid",e),r=h=u=null;for(s in a)if(a.hasOwnProperty(s)&&(v=a[s],v!=null))switch(s){case"value":u=v;break;case"defaultValue":h=v;break;case"multiple":r=v;default:ze(e,t,s,v,a,null)}t=u,a=h,e.multiple=!!r,t!=null?rr(e,!!r,t,!1):a!=null&&rr(e,!!r,a,!0);return;case"textarea":Ee("invalid",e),u=s=r=null;for(h in a)if(a.hasOwnProperty(h)&&(v=a[h],v!=null))switch(h){case"value":r=v;break;case"defaultValue":s=v;break;case"children":u=v;break;case"dangerouslySetInnerHTML":if(v!=null)throw Error(l(91));break;default:ze(e,t,h,v,a,null)}gf(e,r,s,u),Li(e);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(r=a[B],r!=null))switch(B){case"selected":e.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:ze(e,t,B,r,a,null)}return;case"dialog":Ee("beforetoggle",e),Ee("toggle",e),Ee("cancel",e),Ee("close",e);break;case"iframe":case"object":Ee("load",e);break;case"video":case"audio":for(r=0;r<Go.length;r++)Ee(Go[r],e);break;case"image":Ee("error",e),Ee("load",e);break;case"details":Ee("toggle",e);break;case"embed":case"source":case"link":Ee("error",e),Ee("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(P in a)if(a.hasOwnProperty(P)&&(r=a[P],r!=null))switch(P){case"children":case"dangerouslySetInnerHTML":throw Error(l(137,t));default:ze(e,t,P,r,a,null)}return;default:if(Hs(t)){for(Y in a)a.hasOwnProperty(Y)&&(r=a[Y],r!==void 0&&wu(e,t,Y,r,a,void 0));return}}for(v in a)a.hasOwnProperty(v)&&(r=a[v],r!=null&&ze(e,t,v,r,a,null))}function b0(e,t,a,r){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,u=null,h=null,v=null,B=null,P=null,Y=null;for(F in a){var Q=a[F];if(a.hasOwnProperty(F)&&Q!=null)switch(F){case"checked":break;case"value":break;case"defaultValue":B=Q;default:r.hasOwnProperty(F)||ze(e,t,F,null,r,Q)}}for(var H in r){var F=r[H];if(Q=a[H],r.hasOwnProperty(H)&&(F!=null||Q!=null))switch(H){case"type":u=F;break;case"name":s=F;break;case"checked":P=F;break;case"defaultChecked":Y=F;break;case"value":h=F;break;case"defaultValue":v=F;break;case"children":case"dangerouslySetInnerHTML":if(F!=null)throw Error(l(137,t));break;default:F!==Q&&ze(e,t,H,F,r,Q)}}Ps(e,h,v,B,P,Y,u,s);return;case"select":F=h=v=H=null;for(u in a)if(B=a[u],a.hasOwnProperty(u)&&B!=null)switch(u){case"value":break;case"multiple":F=B;default:r.hasOwnProperty(u)||ze(e,t,u,null,r,B)}for(s in r)if(u=r[s],B=a[s],r.hasOwnProperty(s)&&(u!=null||B!=null))switch(s){case"value":H=u;break;case"defaultValue":v=u;break;case"multiple":h=u;default:u!==B&&ze(e,t,s,u,r,B)}t=v,a=h,r=F,H!=null?rr(e,!!a,H,!1):!!r!=!!a&&(t!=null?rr(e,!!a,t,!0):rr(e,!!a,a?[]:"",!1));return;case"textarea":F=H=null;for(v in a)if(s=a[v],a.hasOwnProperty(v)&&s!=null&&!r.hasOwnProperty(v))switch(v){case"value":break;case"children":break;default:ze(e,t,v,null,r,s)}for(h in r)if(s=r[h],u=a[h],r.hasOwnProperty(h)&&(s!=null||u!=null))switch(h){case"value":H=s;break;case"defaultValue":F=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(l(91));break;default:s!==u&&ze(e,t,h,s,r,u)}mf(e,H,F);return;case"option":for(var pe in a)if(H=a[pe],a.hasOwnProperty(pe)&&H!=null&&!r.hasOwnProperty(pe))switch(pe){case"selected":e.selected=!1;break;default:ze(e,t,pe,null,r,H)}for(B in r)if(H=r[B],F=a[B],r.hasOwnProperty(B)&&H!==F&&(H!=null||F!=null))switch(B){case"selected":e.selected=H&&typeof H!="function"&&typeof H!="symbol";break;default:ze(e,t,B,H,r,F)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var de in a)H=a[de],a.hasOwnProperty(de)&&H!=null&&!r.hasOwnProperty(de)&&ze(e,t,de,null,r,H);for(P in r)if(H=r[P],F=a[P],r.hasOwnProperty(P)&&H!==F&&(H!=null||F!=null))switch(P){case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(l(137,t));break;default:ze(e,t,P,H,r,F)}return;default:if(Hs(t)){for(var Le in a)H=a[Le],a.hasOwnProperty(Le)&&H!==void 0&&!r.hasOwnProperty(Le)&&wu(e,t,Le,void 0,r,H);for(Y in r)H=r[Y],F=a[Y],!r.hasOwnProperty(Y)||H===F||H===void 0&&F===void 0||wu(e,t,Y,H,r,F);return}}for(var U in a)H=a[U],a.hasOwnProperty(U)&&H!=null&&!r.hasOwnProperty(U)&&ze(e,t,U,null,r,H);for(Q in r)H=r[Q],F=a[Q],!r.hasOwnProperty(Q)||H===F||H==null&&F==null||ze(e,t,Q,H,r,F)}var Mu=null,Ou=null;function _l(e){return e.nodeType===9?e:e.ownerDocument}function hg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function yg(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function _u(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bu=null;function S0(){var e=window.event;return e&&e.type==="popstate"?e===Bu?!1:(Bu=e,!0):(Bu=null,!1)}var vg=typeof setTimeout=="function"?setTimeout:void 0,x0=typeof clearTimeout=="function"?clearTimeout:void 0,bg=typeof Promise=="function"?Promise:void 0,E0=typeof queueMicrotask=="function"?queueMicrotask:typeof bg<"u"?function(e){return bg.resolve(null).then(e).catch(A0)}:vg;function A0(e){setTimeout(function(){throw e})}function ma(e){return e==="head"}function Sg(e,t){var a=t,r=0,s=0;do{var u=a.nextSibling;if(e.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"){if(0<r&&8>r){a=r;var h=e.ownerDocument;if(a&1&&Yo(h.documentElement),a&2&&Yo(h.body),a&4)for(a=h.head,Yo(a),h=a.firstChild;h;){var v=h.nextSibling,B=h.nodeName;h[lo]||B==="SCRIPT"||B==="STYLE"||B==="LINK"&&h.rel.toLowerCase()==="stylesheet"||a.removeChild(h),h=v}}if(s===0){e.removeChild(u),ti(t);return}s--}else a==="$"||a==="$?"||a==="$!"?s++:r=a.charCodeAt(0)-48;else r=0;a=u}while(a);ti(t)}function Du(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var a=t;switch(t=t.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Du(a),js(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}e.removeChild(a)}}function T0(e,t,a,r){for(;e.nodeType===1;){var s=a;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(r){if(!e[lo])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(u=e.getAttribute("rel"),u==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(u!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(u=e.getAttribute("src"),(u!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&u&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var u=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===u)return e}else return e;if(e=sn(e.nextSibling),e===null)break}return null}function C0(e,t,a){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!a||(e=sn(e.nextSibling),e===null))return null;return e}function Nu(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState==="complete"}function R0(e,t){var a=e.ownerDocument;if(e.data!=="$?"||a.readyState==="complete")t();else{var r=function(){t(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),e._reactRetry=r}}function sn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return e}var zu=null;function xg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var a=e.data;if(a==="$"||a==="$!"||a==="$?"){if(t===0)return e;t--}else a==="/$"&&t++}e=e.previousSibling}return null}function Eg(e,t,a){switch(t=_l(a),e){case"html":if(e=t.documentElement,!e)throw Error(l(452));return e;case"head":if(e=t.head,!e)throw Error(l(453));return e;case"body":if(e=t.body,!e)throw Error(l(454));return e;default:throw Error(l(451))}}function Yo(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);js(e)}var tn=new Map,Ag=new Set;function Bl(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Hn=J.d;J.d={f:w0,r:M0,D:O0,C:_0,L:B0,m:D0,X:z0,S:N0,M:L0};function w0(){var e=Hn.f(),t=El();return e||t}function M0(e){var t=er(e);t!==null&&t.tag===5&&t.type==="form"?Hp(t):Hn.r(e)}var zr=typeof document>"u"?null:document;function Tg(e,t,a){var r=zr;if(r&&typeof t=="string"&&t){var s=Wt(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof a=="string"&&(s+='[crossorigin="'+a+'"]'),Ag.has(s)||(Ag.add(s),e={rel:e,crossOrigin:a,href:t},r.querySelector(s)===null&&(t=r.createElement("link"),gt(t,"link",e),st(t),r.head.appendChild(t)))}}function O0(e){Hn.D(e),Tg("dns-prefetch",e,null)}function _0(e,t){Hn.C(e,t),Tg("preconnect",e,t)}function B0(e,t,a){Hn.L(e,t,a);var r=zr;if(r&&e&&t){var s='link[rel="preload"][as="'+Wt(t)+'"]';t==="image"&&a&&a.imageSrcSet?(s+='[imagesrcset="'+Wt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(s+='[imagesizes="'+Wt(a.imageSizes)+'"]')):s+='[href="'+Wt(e)+'"]';var u=s;switch(t){case"style":u=Lr(e);break;case"script":u=kr(e)}tn.has(u)||(e=y({rel:"preload",href:t==="image"&&a&&a.imageSrcSet?void 0:e,as:t},a),tn.set(u,e),r.querySelector(s)!==null||t==="style"&&r.querySelector(Wo(u))||t==="script"&&r.querySelector(Xo(u))||(t=r.createElement("link"),gt(t,"link",e),st(t),r.head.appendChild(t)))}}function D0(e,t){Hn.m(e,t);var a=zr;if(a&&e){var r=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Wt(r)+'"][href="'+Wt(e)+'"]',u=s;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=kr(e)}if(!tn.has(u)&&(e=y({rel:"modulepreload",href:e},t),tn.set(u,e),a.querySelector(s)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Xo(u)))return}r=a.createElement("link"),gt(r,"link",e),st(r),a.head.appendChild(r)}}}function N0(e,t,a){Hn.S(e,t,a);var r=zr;if(r&&e){var s=tr(r).hoistableStyles,u=Lr(e);t=t||"default";var h=s.get(u);if(!h){var v={loading:0,preload:null};if(h=r.querySelector(Wo(u)))v.loading=5;else{e=y({rel:"stylesheet",href:e,"data-precedence":t},a),(a=tn.get(u))&&Lu(e,a);var B=h=r.createElement("link");st(B),gt(B,"link",e),B._p=new Promise(function(P,Y){B.onload=P,B.onerror=Y}),B.addEventListener("load",function(){v.loading|=1}),B.addEventListener("error",function(){v.loading|=2}),v.loading|=4,Dl(h,t,r)}h={type:"stylesheet",instance:h,count:1,state:v},s.set(u,h)}}}function z0(e,t){Hn.X(e,t);var a=zr;if(a&&e){var r=tr(a).hoistableScripts,s=kr(e),u=r.get(s);u||(u=a.querySelector(Xo(s)),u||(e=y({src:e,async:!0},t),(t=tn.get(s))&&ku(e,t),u=a.createElement("script"),st(u),gt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(s,u))}}function L0(e,t){Hn.M(e,t);var a=zr;if(a&&e){var r=tr(a).hoistableScripts,s=kr(e),u=r.get(s);u||(u=a.querySelector(Xo(s)),u||(e=y({src:e,async:!0,type:"module"},t),(t=tn.get(s))&&ku(e,t),u=a.createElement("script"),st(u),gt(u,"link",e),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(s,u))}}function Cg(e,t,a,r){var s=(s=ue.current)?Bl(s):null;if(!s)throw Error(l(446));switch(e){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(t=Lr(a.href),a=tr(s).hoistableStyles,r=a.get(t),r||(r={type:"style",instance:null,count:0,state:null},a.set(t,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){e=Lr(a.href);var u=tr(s).hoistableStyles,h=u.get(e);if(h||(s=s.ownerDocument||s,h={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(e,h),(u=s.querySelector(Wo(e)))&&!u._p&&(h.instance=u,h.state.loading=5),tn.has(e)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},tn.set(e,a),u||k0(s,e,a,h.state))),t&&r===null)throw Error(l(528,""));return h}if(t&&r!==null)throw Error(l(529,""));return null;case"script":return t=a.async,a=a.src,typeof a=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=kr(a),a=tr(s).hoistableScripts,r=a.get(t),r||(r={type:"script",instance:null,count:0,state:null},a.set(t,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(l(444,e))}}function Lr(e){return'href="'+Wt(e)+'"'}function Wo(e){return'link[rel="stylesheet"]['+e+"]"}function Rg(e){return y({},e,{"data-precedence":e.precedence,precedence:null})}function k0(e,t,a,r){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?r.loading=1:(t=e.createElement("link"),r.preload=t,t.addEventListener("load",function(){return r.loading|=1}),t.addEventListener("error",function(){return r.loading|=2}),gt(t,"link",a),st(t),e.head.appendChild(t))}function kr(e){return'[src="'+Wt(e)+'"]'}function Xo(e){return"script[async]"+e}function wg(e,t,a){if(t.count++,t.instance===null)switch(t.type){case"style":var r=e.querySelector('style[data-href~="'+Wt(a.href)+'"]');if(r)return t.instance=r,st(r),r;var s=y({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement("style"),st(r),gt(r,"style",s),Dl(r,a.precedence,e),t.instance=r;case"stylesheet":s=Lr(a.href);var u=e.querySelector(Wo(s));if(u)return t.state.loading|=4,t.instance=u,st(u),u;r=Rg(a),(s=tn.get(s))&&Lu(r,s),u=(e.ownerDocument||e).createElement("link"),st(u);var h=u;return h._p=new Promise(function(v,B){h.onload=v,h.onerror=B}),gt(u,"link",r),t.state.loading|=4,Dl(u,a.precedence,e),t.instance=u;case"script":return u=kr(a.src),(s=e.querySelector(Xo(u)))?(t.instance=s,st(s),s):(r=a,(s=tn.get(u))&&(r=y({},a),ku(r,s)),e=e.ownerDocument||e,s=e.createElement("script"),st(s),gt(s,"link",r),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(l(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(r=t.instance,t.state.loading|=4,Dl(r,a.precedence,e));return t.instance}function Dl(e,t,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=r.length?r[r.length-1]:null,u=s,h=0;h<r.length;h++){var v=r[h];if(v.dataset.precedence===t)u=v;else if(u!==s)break}u?u.parentNode.insertBefore(e,u.nextSibling):(t=a.nodeType===9?a.head:a,t.insertBefore(e,t.firstChild))}function Lu(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function ku(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Nl=null;function Mg(e,t,a){if(Nl===null){var r=new Map,s=Nl=new Map;s.set(a,r)}else s=Nl,r=s.get(a),r||(r=new Map,s.set(a,r));if(r.has(e))return r;for(r.set(e,null),a=a.getElementsByTagName(e),s=0;s<a.length;s++){var u=a[s];if(!(u[lo]||u[vt]||e==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var h=u.getAttribute(t)||"";h=e+h;var v=r.get(h);v?v.push(u):r.set(h,[u])}}return r}function Og(e,t,a){e=e.ownerDocument||e,e.head.insertBefore(a,t==="title"?e.querySelector("head > title"):null)}function j0(e,t,a){if(a===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function _g(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}var Zo=null;function U0(){}function $0(e,t,a){if(Zo===null)throw Error(l(475));var r=Zo;if(t.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=Lr(a.href),u=e.querySelector(Wo(s));if(u){e=u._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(r.count++,r=zl.bind(r),e.then(r,r)),t.state.loading|=4,t.instance=u,st(u);return}u=e.ownerDocument||e,a=Rg(a),(s=tn.get(s))&&Lu(a,s),u=u.createElement("link"),st(u);var h=u;h._p=new Promise(function(v,B){h.onload=v,h.onerror=B}),gt(u,"link",a),t.instance=u}r.stylesheets===null&&(r.stylesheets=new Map),r.stylesheets.set(t,e),(e=t.state.preload)&&(t.state.loading&3)===0&&(r.count++,t=zl.bind(r),e.addEventListener("load",t),e.addEventListener("error",t))}}function q0(){if(Zo===null)throw Error(l(475));var e=Zo;return e.stylesheets&&e.count===0&&ju(e,e.stylesheets),0<e.count?function(t){var a=setTimeout(function(){if(e.stylesheets&&ju(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4);return e.unsuspend=t,function(){e.unsuspend=null,clearTimeout(a)}}:null}function zl(){if(this.count--,this.count===0){if(this.stylesheets)ju(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Ll=null;function ju(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Ll=new Map,t.forEach(P0,e),Ll=null,zl.call(e))}function P0(e,t){if(!(t.state.loading&4)){var a=Ll.get(e);if(a)var r=a.get(null);else{a=new Map,Ll.set(e,a);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<s.length;u++){var h=s[u];(h.nodeName==="LINK"||h.getAttribute("media")!=="not all")&&(a.set(h.dataset.precedence,h),r=h)}r&&a.set(null,r)}s=t.instance,h=s.getAttribute("data-precedence"),u=a.get(h)||r,u===r&&a.set(null,s),a.set(h,s),this.count++,r=zl.bind(this),s.addEventListener("load",r),s.addEventListener("error",r),u?u.parentNode.insertBefore(s,u.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var Qo={$$typeof:T,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function I0(e,t,a,r,s,u,h,v){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ns(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ns(0),this.hiddenUpdates=Ns(null),this.identifierPrefix=r,this.onUncaughtError=s,this.onCaughtError=u,this.onRecoverableError=h,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=v,this.incompleteTransitions=new Map}function Bg(e,t,a,r,s,u,h,v,B,P,Y,Q){return e=new I0(e,t,a,h,v,B,P,Q),t=1,u===!0&&(t|=24),u=jt(3,null,null,t),e.current=u,u.stateNode=e,t=vc(),t.refCount++,e.pooledCache=t,t.refCount++,u.memoizedState={element:r,isDehydrated:a,cache:t},Ec(u),e}function Dg(e){return e?(e=pr,e):pr}function Ng(e,t,a,r,s,u){s=Dg(s),r.context===null?r.context=s:r.pendingContext=s,r=ta(t),r.payload={element:a},u=u===void 0?null:u,u!==null&&(r.callback=u),a=na(e,r,t),a!==null&&(It(a,e,t),wo(a,e,t))}function zg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var a=e.retryLane;e.retryLane=a!==0&&a<t?a:t}}function Uu(e,t){zg(e,t),(e=e.alternate)&&zg(e,t)}function Lg(e){if(e.tag===13){var t=fr(e,67108864);t!==null&&It(t,e,67108864),Uu(e,67108864)}}var kl=!0;function H0(e,t,a,r){var s=$.T;$.T=null;var u=J.p;try{J.p=2,$u(e,t,a,r)}finally{J.p=u,$.T=s}}function F0(e,t,a,r){var s=$.T;$.T=null;var u=J.p;try{J.p=8,$u(e,t,a,r)}finally{J.p=u,$.T=s}}function $u(e,t,a,r){if(kl){var s=qu(r);if(s===null)Ru(e,t,r,jl,a),jg(e,r);else if(V0(s,e,t,a,r))r.stopPropagation();else if(jg(e,r),t&4&&-1<G0.indexOf(e)){for(;s!==null;){var u=er(s);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var h=Ra(u.pendingLanes);if(h!==0){var v=u;for(v.pendingLanes|=2,v.entangledLanes|=2;h;){var B=1<<31-Lt(h);v.entanglements[1]|=B,h&=~B}hn(u),(Be&6)===0&&(Sl=Ct()+500,Fo(0))}}break;case 13:v=fr(u,2),v!==null&&It(v,u,2),El(),Uu(u,2)}if(u=qu(r),u===null&&Ru(e,t,r,jl,a),u===s)break;s=u}s!==null&&r.stopPropagation()}else Ru(e,t,r,null,a)}}function qu(e){return e=Gs(e),Pu(e)}var jl=null;function Pu(e){if(jl=null,e=Ja(e),e!==null){var t=d(e);if(t===null)e=null;else{var a=t.tag;if(a===13){if(e=f(t),e!==null)return e;e=null}else if(a===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return jl=e,null}function kg(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(Ca()){case Oi:return 2;case ao:return 8;case Qa:case ge:return 32;case Qd:return 268435456;default:return 32}default:return 32}}var Iu=!1,ga=null,ha=null,ya=null,Ko=new Map,Jo=new Map,va=[],G0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function jg(e,t){switch(e){case"focusin":case"focusout":ga=null;break;case"dragenter":case"dragleave":ha=null;break;case"mouseover":case"mouseout":ya=null;break;case"pointerover":case"pointerout":Ko.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Jo.delete(t.pointerId)}}function ei(e,t,a,r,s,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:a,eventSystemFlags:r,nativeEvent:u,targetContainers:[s]},t!==null&&(t=er(t),t!==null&&Lg(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function V0(e,t,a,r,s){switch(t){case"focusin":return ga=ei(ga,e,t,a,r,s),!0;case"dragenter":return ha=ei(ha,e,t,a,r,s),!0;case"mouseover":return ya=ei(ya,e,t,a,r,s),!0;case"pointerover":var u=s.pointerId;return Ko.set(u,ei(Ko.get(u)||null,e,t,a,r,s)),!0;case"gotpointercapture":return u=s.pointerId,Jo.set(u,ei(Jo.get(u)||null,e,t,a,r,s)),!0}return!1}function Ug(e){var t=Ja(e.target);if(t!==null){var a=d(t);if(a!==null){if(t=a.tag,t===13){if(t=f(a),t!==null){e.blockedOn=t,$v(e.priority,function(){if(a.tag===13){var r=Pt();r=zs(r);var s=fr(a,r);s!==null&&It(s,a,r),Uu(a,r)}});return}}else if(t===3&&a.stateNode.current.memoizedState.isDehydrated){e.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ul(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var a=qu(e.nativeEvent);if(a===null){a=e.nativeEvent;var r=new a.constructor(a.type,a);Fs=r,a.target.dispatchEvent(r),Fs=null}else return t=er(a),t!==null&&Lg(t),e.blockedOn=a,!1;t.shift()}return!0}function $g(e,t,a){Ul(e)&&a.delete(t)}function Y0(){Iu=!1,ga!==null&&Ul(ga)&&(ga=null),ha!==null&&Ul(ha)&&(ha=null),ya!==null&&Ul(ya)&&(ya=null),Ko.forEach($g),Jo.forEach($g)}function $l(e,t){e.blockedOn===t&&(e.blockedOn=null,Iu||(Iu=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,Y0)))}var ql=null;function qg(e){ql!==e&&(ql=e,n.unstable_scheduleCallback(n.unstable_NormalPriority,function(){ql===e&&(ql=null);for(var t=0;t<e.length;t+=3){var a=e[t],r=e[t+1],s=e[t+2];if(typeof r!="function"){if(Pu(r||a)===null)continue;break}var u=er(a);u!==null&&(e.splice(t,3),t-=3,Pc(u,{pending:!0,data:s,method:a.method,action:r},r,s))}}))}function ti(e){function t(B){return $l(B,e)}ga!==null&&$l(ga,e),ha!==null&&$l(ha,e),ya!==null&&$l(ya,e),Ko.forEach(t),Jo.forEach(t);for(var a=0;a<va.length;a++){var r=va[a];r.blockedOn===e&&(r.blockedOn=null)}for(;0<va.length&&(a=va[0],a.blockedOn===null);)Ug(a),a.blockedOn===null&&va.shift();if(a=(e.ownerDocument||e).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var s=a[r],u=a[r+1],h=s[Mt]||null;if(typeof u=="function")h||qg(a);else if(h){var v=null;if(u&&u.hasAttribute("formAction")){if(s=u,h=u[Mt]||null)v=h.formAction;else if(Pu(s)!==null)continue}else v=h.action;typeof v=="function"?a[r+1]=v:(a.splice(r,3),r-=3),qg(a)}}}function Hu(e){this._internalRoot=e}Pl.prototype.render=Hu.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));var a=t.current,r=Pt();Ng(a,r,e,t,null,null)},Pl.prototype.unmount=Hu.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ng(e.current,2,null,e,null,null),El(),t[Ka]=null}};function Pl(e){this._internalRoot=e}Pl.prototype.unstable_scheduleHydration=function(e){if(e){var t=nf();e={blockedOn:null,target:e,priority:t};for(var a=0;a<va.length&&t!==0&&t<va[a].priority;a++);va.splice(a,0,e),a===0&&Ug(e)}};var Pg=o.version;if(Pg!=="19.1.0")throw Error(l(527,Pg,"19.1.0"));J.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=g(t),e=e!==null?m(e):null,e=e===null?null:e.stateNode,e};var W0={bundleType:0,version:"19.1.0",rendererPackageName:"react-dom",currentDispatcherRef:$,reconcilerVersion:"19.1.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Il=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Il.isDisabled&&Il.supportsFiber)try{ro=Il.inject(W0),zt=Il}catch{}}return ai.createRoot=function(e,t){if(!c(e))throw Error(l(299));var a=!1,r="",s=am,u=rm,h=om,v=null;return t!=null&&(t.unstable_strictMode===!0&&(a=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(u=t.onCaughtError),t.onRecoverableError!==void 0&&(h=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(v=t.unstable_transitionCallbacks)),t=Bg(e,1,!1,null,null,a,r,s,u,h,v,null),e[Ka]=t.current,Cu(e),new Hu(t)},ai.hydrateRoot=function(e,t,a){if(!c(e))throw Error(l(299));var r=!1,s="",u=am,h=rm,v=om,B=null,P=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(s=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(h=a.onCaughtError),a.onRecoverableError!==void 0&&(v=a.onRecoverableError),a.unstable_transitionCallbacks!==void 0&&(B=a.unstable_transitionCallbacks),a.formState!==void 0&&(P=a.formState)),t=Bg(e,1,!0,t,a??null,r,s,u,h,v,B,P),t.context=Dg(null),a=t.current,r=Pt(),r=zs(r),s=ta(r),s.callback=null,na(a,s,r),a=r,t.current.lanes=a,io(t,a),hn(t),e[Ka]=t.current,Cu(e),new Pl(t)},ai.version="19.1.0",ai}var Kg;function rS(){if(Kg)return Vu.exports;Kg=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(o){console.error(o)}}return n(),Vu.exports=aS(),Vu.exports}var oS=rS();const iS=ps(oS);var ri={},Jg;function lS(){if(Jg)return ri;Jg=1,Object.defineProperty(ri,"__esModule",{value:!0}),ri.parse=f,ri.serialize=m;const n=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,o=/^[\u0021-\u003A\u003C-\u007E]*$/,i=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,l=/^[\u0020-\u003A\u003D-\u007E]*$/,c=Object.prototype.toString,d=(()=>{const x=function(){};return x.prototype=Object.create(null),x})();function f(x,D){const M=new d,E=x.length;if(E<2)return M;const z=D?.decode||y;let O=0;do{const C=x.indexOf("=",O);if(C===-1)break;const T=x.indexOf(";",O),R=T===-1?E:T;if(C>R){O=x.lastIndexOf(";",C-1)+1;continue}const w=p(x,O,C),_=g(x,C,w),j=x.slice(w,_);if(M[j]===void 0){let G=p(x,C+1,R),I=g(x,R,G);const S=z(x.slice(G,I));M[j]=S}O=R+1}while(O<E);return M}function p(x,D,M){do{const E=x.charCodeAt(D);if(E!==32&&E!==9)return D}while(++D<M);return M}function g(x,D,M){for(;D>M;){const E=x.charCodeAt(--D);if(E!==32&&E!==9)return D+1}return M}function m(x,D,M){const E=M?.encode||encodeURIComponent;if(!n.test(x))throw new TypeError(`argument name is invalid: ${x}`);const z=E(D);if(!o.test(z))throw new TypeError(`argument val is invalid: ${D}`);let O=x+"="+z;if(!M)return O;if(M.maxAge!==void 0){if(!Number.isInteger(M.maxAge))throw new TypeError(`option maxAge is invalid: ${M.maxAge}`);O+="; Max-Age="+M.maxAge}if(M.domain){if(!i.test(M.domain))throw new TypeError(`option domain is invalid: ${M.domain}`);O+="; Domain="+M.domain}if(M.path){if(!l.test(M.path))throw new TypeError(`option path is invalid: ${M.path}`);O+="; Path="+M.path}if(M.expires){if(!b(M.expires)||!Number.isFinite(M.expires.valueOf()))throw new TypeError(`option expires is invalid: ${M.expires}`);O+="; Expires="+M.expires.toUTCString()}if(M.httpOnly&&(O+="; HttpOnly"),M.secure&&(O+="; Secure"),M.partitioned&&(O+="; Partitioned"),M.priority)switch(typeof M.priority=="string"?M.priority.toLowerCase():void 0){case"low":O+="; Priority=Low";break;case"medium":O+="; Priority=Medium";break;case"high":O+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${M.priority}`)}if(M.sameSite)switch(typeof M.sameSite=="string"?M.sameSite.toLowerCase():M.sameSite){case!0:case"strict":O+="; SameSite=Strict";break;case"lax":O+="; SameSite=Lax";break;case"none":O+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${M.sameSite}`)}return O}function y(x){if(x.indexOf("%")===-1)return x;try{return decodeURIComponent(x)}catch{return x}}function b(x){return c.call(x)==="[object Date]"}return ri}lS();var eh="popstate";function sS(n={}){function o(l,c){let{pathname:d,search:f,hash:p}=l.location;return ld("",{pathname:d,search:f,hash:p},c.state&&c.state.usr||null,c.state&&c.state.key||"default")}function i(l,c){return typeof c=="string"?c:pi(c)}return uS(o,i,null,n)}function Ge(n,o){if(n===!1||n===null||typeof n>"u")throw new Error(o)}function En(n,o){if(!n){typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function cS(){return Math.random().toString(36).substring(2,10)}function th(n,o){return{usr:n.state,key:n.key,idx:o}}function ld(n,o,i=null,l){return{pathname:typeof n=="string"?n:n.pathname,search:"",hash:"",...typeof o=="string"?Jr(o):o,state:i,key:o&&o.key||l||cS()}}function pi({pathname:n="/",search:o="",hash:i=""}){return o&&o!=="?"&&(n+=o.charAt(0)==="?"?o:"?"+o),i&&i!=="#"&&(n+=i.charAt(0)==="#"?i:"#"+i),n}function Jr(n){let o={};if(n){let i=n.indexOf("#");i>=0&&(o.hash=n.substring(i),n=n.substring(0,i));let l=n.indexOf("?");l>=0&&(o.search=n.substring(l),n=n.substring(0,l)),n&&(o.pathname=n)}return o}function uS(n,o,i,l={}){let{window:c=document.defaultView,v5Compat:d=!1}=l,f=c.history,p="POP",g=null,m=y();m==null&&(m=0,f.replaceState({...f.state,idx:m},""));function y(){return(f.state||{idx:null}).idx}function b(){p="POP";let z=y(),O=z==null?null:z-m;m=z,g&&g({action:p,location:E.location,delta:O})}function x(z,O){p="PUSH";let C=ld(E.location,z,O);m=y()+1;let T=th(C,m),R=E.createHref(C);try{f.pushState(T,"",R)}catch(w){if(w instanceof DOMException&&w.name==="DataCloneError")throw w;c.location.assign(R)}d&&g&&g({action:p,location:E.location,delta:1})}function D(z,O){p="REPLACE";let C=ld(E.location,z,O);m=y();let T=th(C,m),R=E.createHref(C);f.replaceState(T,"",R),d&&g&&g({action:p,location:E.location,delta:0})}function M(z){return dS(z)}let E={get action(){return p},get location(){return n(c,f)},listen(z){if(g)throw new Error("A history only accepts one active listener");return c.addEventListener(eh,b),g=z,()=>{c.removeEventListener(eh,b),g=null}},createHref(z){return o(c,z)},createURL:M,encodeLocation(z){let O=M(z);return{pathname:O.pathname,search:O.search,hash:O.hash}},push:x,replace:D,go(z){return f.go(z)}};return E}function dS(n,o=!1){let i="http://localhost";typeof window<"u"&&(i=window.location.origin!=="null"?window.location.origin:window.location.href),Ge(i,"No window.location.(origin|href) available to create URL");let l=typeof n=="string"?n:pi(n);return l=l.replace(/ $/,"%20"),!o&&l.startsWith("//")&&(l=i+l),new URL(l,i)}function sy(n,o,i="/"){return fS(n,o,i,!1)}function fS(n,o,i,l){let c=typeof o=="string"?Jr(o):o,d=Yn(c.pathname||"/",i);if(d==null)return null;let f=cy(n);pS(f);let p=null;for(let g=0;p==null&&g<f.length;++g){let m=TS(d);p=ES(f[g],m,l)}return p}function cy(n,o=[],i=[],l=""){let c=(d,f,p)=>{let g={relativePath:p===void 0?d.path||"":p,caseSensitive:d.caseSensitive===!0,childrenIndex:f,route:d};g.relativePath.startsWith("/")&&(Ge(g.relativePath.startsWith(l),`Absolute route path "${g.relativePath}" nested under path "${l}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(l.length));let m=Vn([l,g.relativePath]),y=i.concat(g);d.children&&d.children.length>0&&(Ge(d.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),cy(d.children,o,y,m)),!(d.path==null&&!d.index)&&o.push({path:m,score:SS(m,d.index),routesMeta:y})};return n.forEach((d,f)=>{if(d.path===""||!d.path?.includes("?"))c(d,f);else for(let p of uy(d.path))c(d,f,p)}),o}function uy(n){let o=n.split("/");if(o.length===0)return[];let[i,...l]=o,c=i.endsWith("?"),d=i.replace(/\?$/,"");if(l.length===0)return c?[d,""]:[d];let f=uy(l.join("/")),p=[];return p.push(...f.map(g=>g===""?d:[d,g].join("/"))),c&&p.push(...f),p.map(g=>n.startsWith("/")&&g===""?"/":g)}function pS(n){n.sort((o,i)=>o.score!==i.score?i.score-o.score:xS(o.routesMeta.map(l=>l.childrenIndex),i.routesMeta.map(l=>l.childrenIndex)))}var mS=/^:[\w-]+$/,gS=3,hS=2,yS=1,vS=10,bS=-2,nh=n=>n==="*";function SS(n,o){let i=n.split("/"),l=i.length;return i.some(nh)&&(l+=bS),o&&(l+=hS),i.filter(c=>!nh(c)).reduce((c,d)=>c+(mS.test(d)?gS:d===""?yS:vS),l)}function xS(n,o){return n.length===o.length&&n.slice(0,-1).every((l,c)=>l===o[c])?n[n.length-1]-o[o.length-1]:0}function ES(n,o,i=!1){let{routesMeta:l}=n,c={},d="/",f=[];for(let p=0;p<l.length;++p){let g=l[p],m=p===l.length-1,y=d==="/"?o:o.slice(d.length)||"/",b=is({path:g.relativePath,caseSensitive:g.caseSensitive,end:m},y),x=g.route;if(!b&&m&&i&&!l[l.length-1].route.index&&(b=is({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},y)),!b)return null;Object.assign(c,b.params),f.push({params:c,pathname:Vn([d,b.pathname]),pathnameBase:MS(Vn([d,b.pathnameBase])),route:x}),b.pathnameBase!=="/"&&(d=Vn([d,b.pathnameBase]))}return f}function is(n,o){typeof n=="string"&&(n={path:n,caseSensitive:!1,end:!0});let[i,l]=AS(n.path,n.caseSensitive,n.end),c=o.match(i);if(!c)return null;let d=c[0],f=d.replace(/(.)\/+$/,"$1"),p=c.slice(1);return{params:l.reduce((m,{paramName:y,isOptional:b},x)=>{if(y==="*"){let M=p[x]||"";f=d.slice(0,d.length-M.length).replace(/(.)\/+$/,"$1")}const D=p[x];return b&&!D?m[y]=void 0:m[y]=(D||"").replace(/%2F/g,"/"),m},{}),pathname:d,pathnameBase:f,pattern:n}}function AS(n,o=!1,i=!0){En(n==="*"||!n.endsWith("*")||n.endsWith("/*"),`Route path "${n}" will be treated as if it were "${n.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/,"/*")}".`);let l=[],c="^"+n.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(f,p,g)=>(l.push({paramName:p,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)"));return n.endsWith("*")?(l.push({paramName:"*"}),c+=n==="*"||n==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):i?c+="\\/*$":n!==""&&n!=="/"&&(c+="(?:(?=\\/|$))"),[new RegExp(c,o?void 0:"i"),l]}function TS(n){try{return n.split("/").map(o=>decodeURIComponent(o).replace(/\//g,"%2F")).join("/")}catch(o){return En(!1,`The URL path "${n}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`),n}}function Yn(n,o){if(o==="/")return n;if(!n.toLowerCase().startsWith(o.toLowerCase()))return null;let i=o.endsWith("/")?o.length-1:o.length,l=n.charAt(i);return l&&l!=="/"?null:n.slice(i)||"/"}function CS(n,o="/"){let{pathname:i,search:l="",hash:c=""}=typeof n=="string"?Jr(n):n;return{pathname:i?i.startsWith("/")?i:RS(i,o):o,search:OS(l),hash:_S(c)}}function RS(n,o){let i=o.replace(/\/+$/,"").split("/");return n.split("/").forEach(c=>{c===".."?i.length>1&&i.pop():c!=="."&&i.push(c)}),i.length>1?i.join("/"):"/"}function Zu(n,o,i,l){return`Cannot include a '${n}' character in a manually specified \`to.${o}\` field [${JSON.stringify(l)}].  Please separate it out to the \`to.${i}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function wS(n){return n.filter((o,i)=>i===0||o.route.path&&o.route.path.length>0)}function dy(n){let o=wS(n);return o.map((i,l)=>l===o.length-1?i.pathname:i.pathnameBase)}function fy(n,o,i,l=!1){let c;typeof n=="string"?c=Jr(n):(c={...n},Ge(!c.pathname||!c.pathname.includes("?"),Zu("?","pathname","search",c)),Ge(!c.pathname||!c.pathname.includes("#"),Zu("#","pathname","hash",c)),Ge(!c.search||!c.search.includes("#"),Zu("#","search","hash",c)));let d=n===""||c.pathname==="",f=d?"/":c.pathname,p;if(f==null)p=i;else{let b=o.length-1;if(!l&&f.startsWith("..")){let x=f.split("/");for(;x[0]==="..";)x.shift(),b-=1;c.pathname=x.join("/")}p=b>=0?o[b]:"/"}let g=CS(c,p),m=f&&f!=="/"&&f.endsWith("/"),y=(d||f===".")&&i.endsWith("/");return!g.pathname.endsWith("/")&&(m||y)&&(g.pathname+="/"),g}var Vn=n=>n.join("/").replace(/\/\/+/g,"/"),MS=n=>n.replace(/\/+$/,"").replace(/^\/*/,"/"),OS=n=>!n||n==="?"?"":n.startsWith("?")?n:"?"+n,_S=n=>!n||n==="#"?"":n.startsWith("#")?n:"#"+n;function BS(n){return n!=null&&typeof n.status=="number"&&typeof n.statusText=="string"&&typeof n.internal=="boolean"&&"data"in n}var py=["POST","PUT","PATCH","DELETE"];new Set(py);var DS=["GET",...py];new Set(DS);var eo=A.createContext(null);eo.displayName="DataRouter";var ms=A.createContext(null);ms.displayName="DataRouterState";var my=A.createContext({isTransitioning:!1});my.displayName="ViewTransition";var NS=A.createContext(new Map);NS.displayName="Fetchers";var zS=A.createContext(null);zS.displayName="Await";var Tn=A.createContext(null);Tn.displayName="Navigation";var xi=A.createContext(null);xi.displayName="Location";var Cn=A.createContext({outlet:null,matches:[],isDataRoute:!1});Cn.displayName="Route";var Cd=A.createContext(null);Cd.displayName="RouteError";function LS(n,{relative:o}={}){Ge(Ei(),"useHref() may be used only in the context of a <Router> component.");let{basename:i,navigator:l}=A.useContext(Tn),{hash:c,pathname:d,search:f}=Ai(n,{relative:o}),p=d;return i!=="/"&&(p=d==="/"?i:Vn([i,d])),l.createHref({pathname:p,search:f,hash:c})}function Ei(){return A.useContext(xi)!=null}function Rn(){return Ge(Ei(),"useLocation() may be used only in the context of a <Router> component."),A.useContext(xi).location}var gy="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function hy(n){A.useContext(Tn).static||A.useLayoutEffect(n)}function yy(){let{isDataRoute:n}=A.useContext(Cn);return n?XS():kS()}function kS(){Ge(Ei(),"useNavigate() may be used only in the context of a <Router> component.");let n=A.useContext(eo),{basename:o,navigator:i}=A.useContext(Tn),{matches:l}=A.useContext(Cn),{pathname:c}=Rn(),d=JSON.stringify(dy(l)),f=A.useRef(!1);return hy(()=>{f.current=!0}),A.useCallback((g,m={})=>{if(En(f.current,gy),!f.current)return;if(typeof g=="number"){i.go(g);return}let y=fy(g,JSON.parse(d),c,m.relative==="path");n==null&&o!=="/"&&(y.pathname=y.pathname==="/"?o:Vn([o,y.pathname])),(m.replace?i.replace:i.push)(y,m.state,m)},[o,i,d,c,n])}A.createContext(null);function jS(){let{matches:n}=A.useContext(Cn),o=n[n.length-1];return o?o.params:{}}function Ai(n,{relative:o}={}){let{matches:i}=A.useContext(Cn),{pathname:l}=Rn(),c=JSON.stringify(dy(i));return A.useMemo(()=>fy(n,JSON.parse(c),l,o==="path"),[n,c,l,o])}function US(n,o){return vy(n,o)}function vy(n,o,i,l){Ge(Ei(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:c}=A.useContext(Tn),{matches:d}=A.useContext(Cn),f=d[d.length-1],p=f?f.params:{},g=f?f.pathname:"/",m=f?f.pathnameBase:"/",y=f&&f.route;{let O=y&&y.path||"";by(g,!y||O.endsWith("*")||O.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${g}" (under <Route path="${O}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${O}"> to <Route path="${O==="/"?"*":`${O}/*`}">.`)}let b=Rn(),x;if(o){let O=typeof o=="string"?Jr(o):o;Ge(m==="/"||O.pathname?.startsWith(m),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${m}" but pathname "${O.pathname}" was given in the \`location\` prop.`),x=O}else x=b;let D=x.pathname||"/",M=D;if(m!=="/"){let O=m.replace(/^\//,"").split("/");M="/"+D.replace(/^\//,"").split("/").slice(O.length).join("/")}let E=sy(n,{pathname:M});En(y||E!=null,`No routes matched location "${x.pathname}${x.search}${x.hash}" `),En(E==null||E[E.length-1].route.element!==void 0||E[E.length-1].route.Component!==void 0||E[E.length-1].route.lazy!==void 0,`Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let z=HS(E&&E.map(O=>Object.assign({},O,{params:Object.assign({},p,O.params),pathname:Vn([m,c.encodeLocation?c.encodeLocation(O.pathname).pathname:O.pathname]),pathnameBase:O.pathnameBase==="/"?m:Vn([m,c.encodeLocation?c.encodeLocation(O.pathnameBase).pathname:O.pathnameBase])})),d,i,l);return o&&z?A.createElement(xi.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...x},navigationType:"POP"}},z):z}function $S(){let n=WS(),o=BS(n)?`${n.status} ${n.statusText}`:n instanceof Error?n.message:JSON.stringify(n),i=n instanceof Error?n.stack:null,l="rgba(200,200,200, 0.5)",c={padding:"0.5rem",backgroundColor:l},d={padding:"2px 4px",backgroundColor:l},f=null;return console.error("Error handled by React Router default ErrorBoundary:",n),f=A.createElement(A.Fragment,null,A.createElement("p",null,"💿 Hey developer 👋"),A.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",A.createElement("code",{style:d},"ErrorBoundary")," or"," ",A.createElement("code",{style:d},"errorElement")," prop on your route.")),A.createElement(A.Fragment,null,A.createElement("h2",null,"Unexpected Application Error!"),A.createElement("h3",{style:{fontStyle:"italic"}},o),i?A.createElement("pre",{style:c},i):null,f)}var qS=A.createElement($S,null),PS=class extends A.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,o){return o.location!==n.location||o.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:o.error,location:o.location,revalidation:n.revalidation||o.revalidation}}componentDidCatch(n,o){console.error("React Router caught the following error during render",n,o)}render(){return this.state.error!==void 0?A.createElement(Cn.Provider,{value:this.props.routeContext},A.createElement(Cd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function IS({routeContext:n,match:o,children:i}){let l=A.useContext(eo);return l&&l.static&&l.staticContext&&(o.route.errorElement||o.route.ErrorBoundary)&&(l.staticContext._deepestRenderedBoundaryId=o.route.id),A.createElement(Cn.Provider,{value:n},i)}function HS(n,o=[],i=null,l=null){if(n==null){if(!i)return null;if(i.errors)n=i.matches;else if(o.length===0&&!i.initialized&&i.matches.length>0)n=i.matches;else return null}let c=n,d=i?.errors;if(d!=null){let g=c.findIndex(m=>m.route.id&&d?.[m.route.id]!==void 0);Ge(g>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`),c=c.slice(0,Math.min(c.length,g+1))}let f=!1,p=-1;if(i)for(let g=0;g<c.length;g++){let m=c[g];if((m.route.HydrateFallback||m.route.hydrateFallbackElement)&&(p=g),m.route.id){let{loaderData:y,errors:b}=i,x=m.route.loader&&!y.hasOwnProperty(m.route.id)&&(!b||b[m.route.id]===void 0);if(m.route.lazy||x){f=!0,p>=0?c=c.slice(0,p+1):c=[c[0]];break}}}return c.reduceRight((g,m,y)=>{let b,x=!1,D=null,M=null;i&&(b=d&&m.route.id?d[m.route.id]:void 0,D=m.route.errorElement||qS,f&&(p<0&&y===0?(by("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),x=!0,M=null):p===y&&(x=!0,M=m.route.hydrateFallbackElement||null)));let E=o.concat(c.slice(0,y+1)),z=()=>{let O;return b?O=D:x?O=M:m.route.Component?O=A.createElement(m.route.Component,null):m.route.element?O=m.route.element:O=g,A.createElement(IS,{match:m,routeContext:{outlet:g,matches:E,isDataRoute:i!=null},children:O})};return i&&(m.route.ErrorBoundary||m.route.errorElement||y===0)?A.createElement(PS,{location:i.location,revalidation:i.revalidation,component:D,error:b,children:z(),routeContext:{outlet:null,matches:E,isDataRoute:!0}}):z()},null)}function Rd(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function FS(n){let o=A.useContext(eo);return Ge(o,Rd(n)),o}function GS(n){let o=A.useContext(ms);return Ge(o,Rd(n)),o}function VS(n){let o=A.useContext(Cn);return Ge(o,Rd(n)),o}function wd(n){let o=VS(n),i=o.matches[o.matches.length-1];return Ge(i.route.id,`${n} can only be used on routes that contain a unique "id"`),i.route.id}function YS(){return wd("useRouteId")}function WS(){let n=A.useContext(Cd),o=GS("useRouteError"),i=wd("useRouteError");return n!==void 0?n:o.errors?.[i]}function XS(){let{router:n}=FS("useNavigate"),o=wd("useNavigate"),i=A.useRef(!1);return hy(()=>{i.current=!0}),A.useCallback(async(c,d={})=>{En(i.current,gy),i.current&&(typeof c=="number"?n.navigate(c):await n.navigate(c,{fromRouteId:o,...d}))},[n,o])}var ah={};function by(n,o,i){!o&&!ah[n]&&(ah[n]=!0,En(!1,i))}A.memo(ZS);function ZS({routes:n,future:o,state:i}){return vy(n,void 0,i,o)}function Kl(n){Ge(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function QS({basename:n="/",children:o=null,location:i,navigationType:l="POP",navigator:c,static:d=!1}){Ge(!Ei(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let f=n.replace(/^\/*/,"/"),p=A.useMemo(()=>({basename:f,navigator:c,static:d,future:{}}),[f,c,d]);typeof i=="string"&&(i=Jr(i));let{pathname:g="/",search:m="",hash:y="",state:b=null,key:x="default"}=i,D=A.useMemo(()=>{let M=Yn(g,f);return M==null?null:{location:{pathname:M,search:m,hash:y,state:b,key:x},navigationType:l}},[f,g,m,y,b,x,l]);return En(D!=null,`<Router basename="${f}"> is not able to match the URL "${g}${m}${y}" because it does not start with the basename, so the <Router> won't render anything.`),D==null?null:A.createElement(Tn.Provider,{value:p},A.createElement(xi.Provider,{children:o,value:D}))}function KS({children:n,location:o}){return US(sd(n),o)}function sd(n,o=[]){let i=[];return A.Children.forEach(n,(l,c)=>{if(!A.isValidElement(l))return;let d=[...o,c];if(l.type===A.Fragment){i.push.apply(i,sd(l.props.children,d));return}Ge(l.type===Kl,`[${typeof l.type=="string"?l.type:l.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Ge(!l.props.index||!l.props.children,"An index route cannot have child routes.");let f={id:l.props.id||d.join("-"),caseSensitive:l.props.caseSensitive,element:l.props.element,Component:l.props.Component,index:l.props.index,path:l.props.path,loader:l.props.loader,action:l.props.action,hydrateFallbackElement:l.props.hydrateFallbackElement,HydrateFallback:l.props.HydrateFallback,errorElement:l.props.errorElement,ErrorBoundary:l.props.ErrorBoundary,hasErrorBoundary:l.props.hasErrorBoundary===!0||l.props.ErrorBoundary!=null||l.props.errorElement!=null,shouldRevalidate:l.props.shouldRevalidate,handle:l.props.handle,lazy:l.props.lazy};l.props.children&&(f.children=sd(l.props.children,d)),i.push(f)}),i}var Jl="get",es="application/x-www-form-urlencoded";function gs(n){return n!=null&&typeof n.tagName=="string"}function JS(n){return gs(n)&&n.tagName.toLowerCase()==="button"}function e1(n){return gs(n)&&n.tagName.toLowerCase()==="form"}function t1(n){return gs(n)&&n.tagName.toLowerCase()==="input"}function n1(n){return!!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)}function a1(n,o){return n.button===0&&(!o||o==="_self")&&!n1(n)}var Hl=null;function r1(){if(Hl===null)try{new FormData(document.createElement("form"),0),Hl=!1}catch{Hl=!0}return Hl}var o1=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Qu(n){return n!=null&&!o1.has(n)?(En(!1,`"${n}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${es}"`),null):n}function i1(n,o){let i,l,c,d,f;if(e1(n)){let p=n.getAttribute("action");l=p?Yn(p,o):null,i=n.getAttribute("method")||Jl,c=Qu(n.getAttribute("enctype"))||es,d=new FormData(n)}else if(JS(n)||t1(n)&&(n.type==="submit"||n.type==="image")){let p=n.form;if(p==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let g=n.getAttribute("formaction")||p.getAttribute("action");if(l=g?Yn(g,o):null,i=n.getAttribute("formmethod")||p.getAttribute("method")||Jl,c=Qu(n.getAttribute("formenctype"))||Qu(p.getAttribute("enctype"))||es,d=new FormData(p,n),!r1()){let{name:m,type:y,value:b}=n;if(y==="image"){let x=m?`${m}.`:"";d.append(`${x}x`,"0"),d.append(`${x}y`,"0")}else m&&d.append(m,b)}}else{if(gs(n))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');i=Jl,l=null,c=es,f=n}return d&&c==="text/plain"&&(f=d,d=void 0),{action:l,method:i.toLowerCase(),encType:c,formData:d,body:f}}function Md(n,o){if(n===!1||n===null||typeof n>"u")throw new Error(o)}async function l1(n,o){if(n.id in o)return o[n.id];try{let i=await import(n.module);return o[n.id]=i,i}catch(i){return console.error(`Error loading route module \`${n.module}\`, reloading page...`),console.error(i),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function s1(n){return n==null?!1:n.href==null?n.rel==="preload"&&typeof n.imageSrcSet=="string"&&typeof n.imageSizes=="string":typeof n.rel=="string"&&typeof n.href=="string"}async function c1(n,o,i){let l=await Promise.all(n.map(async c=>{let d=o.routes[c.route.id];if(d){let f=await l1(d,i);return f.links?f.links():[]}return[]}));return p1(l.flat(1).filter(s1).filter(c=>c.rel==="stylesheet"||c.rel==="preload").map(c=>c.rel==="stylesheet"?{...c,rel:"prefetch",as:"style"}:{...c,rel:"prefetch"}))}function rh(n,o,i,l,c,d){let f=(g,m)=>i[m]?g.route.id!==i[m].route.id:!0,p=(g,m)=>i[m].pathname!==g.pathname||i[m].route.path?.endsWith("*")&&i[m].params["*"]!==g.params["*"];return d==="assets"?o.filter((g,m)=>f(g,m)||p(g,m)):d==="data"?o.filter((g,m)=>{let y=l.routes[g.route.id];if(!y||!y.hasLoader)return!1;if(f(g,m)||p(g,m))return!0;if(g.route.shouldRevalidate){let b=g.route.shouldRevalidate({currentUrl:new URL(c.pathname+c.search+c.hash,window.origin),currentParams:i[0]?.params||{},nextUrl:new URL(n,window.origin),nextParams:g.params,defaultShouldRevalidate:!0});if(typeof b=="boolean")return b}return!0}):[]}function u1(n,o,{includeHydrateFallback:i}={}){return d1(n.map(l=>{let c=o.routes[l.route.id];if(!c)return[];let d=[c.module];return c.clientActionModule&&(d=d.concat(c.clientActionModule)),c.clientLoaderModule&&(d=d.concat(c.clientLoaderModule)),i&&c.hydrateFallbackModule&&(d=d.concat(c.hydrateFallbackModule)),c.imports&&(d=d.concat(c.imports)),d}).flat(1))}function d1(n){return[...new Set(n)]}function f1(n){let o={},i=Object.keys(n).sort();for(let l of i)o[l]=n[l];return o}function p1(n,o){let i=new Set;return new Set(o),n.reduce((l,c)=>{let d=JSON.stringify(f1(c));return i.has(d)||(i.add(d),l.push({key:d,link:c})),l},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var m1=new Set([100,101,204,205]);function g1(n,o){let i=typeof n=="string"?new URL(n,typeof window>"u"?"server://singlefetch/":window.location.origin):n;return i.pathname==="/"?i.pathname="_root.data":o&&Yn(i.pathname,o)==="/"?i.pathname=`${o.replace(/\/$/,"")}/_root.data`:i.pathname=`${i.pathname.replace(/\/$/,"")}.data`,i}function Sy(){let n=A.useContext(eo);return Md(n,"You must render this element inside a <DataRouterContext.Provider> element"),n}function h1(){let n=A.useContext(ms);return Md(n,"You must render this element inside a <DataRouterStateContext.Provider> element"),n}var Od=A.createContext(void 0);Od.displayName="FrameworkContext";function xy(){let n=A.useContext(Od);return Md(n,"You must render this element inside a <HydratedRouter> element"),n}function y1(n,o){let i=A.useContext(Od),[l,c]=A.useState(!1),[d,f]=A.useState(!1),{onFocus:p,onBlur:g,onMouseEnter:m,onMouseLeave:y,onTouchStart:b}=o,x=A.useRef(null);A.useEffect(()=>{if(n==="render"&&f(!0),n==="viewport"){let E=O=>{O.forEach(C=>{f(C.isIntersecting)})},z=new IntersectionObserver(E,{threshold:.5});return x.current&&z.observe(x.current),()=>{z.disconnect()}}},[n]),A.useEffect(()=>{if(l){let E=setTimeout(()=>{f(!0)},100);return()=>{clearTimeout(E)}}},[l]);let D=()=>{c(!0)},M=()=>{c(!1),f(!1)};return i?n!=="intent"?[d,x,{}]:[d,x,{onFocus:oi(p,D),onBlur:oi(g,M),onMouseEnter:oi(m,D),onMouseLeave:oi(y,M),onTouchStart:oi(b,D)}]:[!1,x,{}]}function oi(n,o){return i=>{n&&n(i),i.defaultPrevented||o(i)}}function v1({page:n,...o}){let{router:i}=Sy(),l=A.useMemo(()=>sy(i.routes,n,i.basename),[i.routes,n,i.basename]);return l?A.createElement(S1,{page:n,matches:l,...o}):null}function b1(n){let{manifest:o,routeModules:i}=xy(),[l,c]=A.useState([]);return A.useEffect(()=>{let d=!1;return c1(n,o,i).then(f=>{d||c(f)}),()=>{d=!0}},[n,o,i]),l}function S1({page:n,matches:o,...i}){let l=Rn(),{manifest:c,routeModules:d}=xy(),{basename:f}=Sy(),{loaderData:p,matches:g}=h1(),m=A.useMemo(()=>rh(n,o,g,c,l,"data"),[n,o,g,c,l]),y=A.useMemo(()=>rh(n,o,g,c,l,"assets"),[n,o,g,c,l]),b=A.useMemo(()=>{if(n===l.pathname+l.search+l.hash)return[];let M=new Set,E=!1;if(o.forEach(O=>{let C=c.routes[O.route.id];!C||!C.hasLoader||(!m.some(T=>T.route.id===O.route.id)&&O.route.id in p&&d[O.route.id]?.shouldRevalidate||C.hasClientLoader?E=!0:M.add(O.route.id))}),M.size===0)return[];let z=g1(n,f);return E&&M.size>0&&z.searchParams.set("_routes",o.filter(O=>M.has(O.route.id)).map(O=>O.route.id).join(",")),[z.pathname+z.search]},[f,p,l,c,m,o,n,d]),x=A.useMemo(()=>u1(y,c),[y,c]),D=b1(y);return A.createElement(A.Fragment,null,b.map(M=>A.createElement("link",{key:M,rel:"prefetch",as:"fetch",href:M,...i})),x.map(M=>A.createElement("link",{key:M,rel:"modulepreload",href:M,...i})),D.map(({key:M,link:E})=>A.createElement("link",{key:M,...E})))}function x1(...n){return o=>{n.forEach(i=>{typeof i=="function"?i(o):i!=null&&(i.current=o)})}}var Ey=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Ey&&(window.__reactRouterVersion="7.6.2")}catch{}function E1({basename:n,children:o,window:i}){let l=A.useRef();l.current==null&&(l.current=sS({window:i,v5Compat:!0}));let c=l.current,[d,f]=A.useState({action:c.action,location:c.location}),p=A.useCallback(g=>{A.startTransition(()=>f(g))},[f]);return A.useLayoutEffect(()=>c.listen(p),[c,p]),A.createElement(QS,{basename:n,children:o,location:d.location,navigationType:d.action,navigator:c})}var Ay=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_d=A.forwardRef(function({onClick:o,discover:i="render",prefetch:l="none",relative:c,reloadDocument:d,replace:f,state:p,target:g,to:m,preventScrollReset:y,viewTransition:b,...x},D){let{basename:M}=A.useContext(Tn),E=typeof m=="string"&&Ay.test(m),z,O=!1;if(typeof m=="string"&&E&&(z=m,Ey))try{let I=new URL(window.location.href),S=m.startsWith("//")?new URL(I.protocol+m):new URL(m),Z=Yn(S.pathname,M);S.origin===I.origin&&Z!=null?m=Z+S.search+S.hash:O=!0}catch{En(!1,`<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let C=LS(m,{relative:c}),[T,R,w]=y1(l,x),_=R1(m,{replace:f,state:p,target:g,preventScrollReset:y,relative:c,viewTransition:b});function j(I){o&&o(I),I.defaultPrevented||_(I)}let G=A.createElement("a",{...x,...w,href:z||C,onClick:O||d?o:j,ref:x1(D,R),target:g,"data-discover":!E&&i==="render"?"true":void 0});return T&&!E?A.createElement(A.Fragment,null,G,A.createElement(v1,{page:C})):G});_d.displayName="Link";var A1=A.forwardRef(function({"aria-current":o="page",caseSensitive:i=!1,className:l="",end:c=!1,style:d,to:f,viewTransition:p,children:g,...m},y){let b=Ai(f,{relative:m.relative}),x=Rn(),D=A.useContext(ms),{navigator:M,basename:E}=A.useContext(Tn),z=D!=null&&B1(b)&&p===!0,O=M.encodeLocation?M.encodeLocation(b).pathname:b.pathname,C=x.pathname,T=D&&D.navigation&&D.navigation.location?D.navigation.location.pathname:null;i||(C=C.toLowerCase(),T=T?T.toLowerCase():null,O=O.toLowerCase()),T&&E&&(T=Yn(T,E)||T);const R=O!=="/"&&O.endsWith("/")?O.length-1:O.length;let w=C===O||!c&&C.startsWith(O)&&C.charAt(R)==="/",_=T!=null&&(T===O||!c&&T.startsWith(O)&&T.charAt(O.length)==="/"),j={isActive:w,isPending:_,isTransitioning:z},G=w?o:void 0,I;typeof l=="function"?I=l(j):I=[l,w?"active":null,_?"pending":null,z?"transitioning":null].filter(Boolean).join(" ");let S=typeof d=="function"?d(j):d;return A.createElement(_d,{...m,"aria-current":G,className:I,ref:y,style:S,to:f,viewTransition:p},typeof g=="function"?g(j):g)});A1.displayName="NavLink";var T1=A.forwardRef(({discover:n="render",fetcherKey:o,navigate:i,reloadDocument:l,replace:c,state:d,method:f=Jl,action:p,onSubmit:g,relative:m,preventScrollReset:y,viewTransition:b,...x},D)=>{let M=O1(),E=_1(p,{relative:m}),z=f.toLowerCase()==="get"?"get":"post",O=typeof p=="string"&&Ay.test(p),C=T=>{if(g&&g(T),T.defaultPrevented)return;T.preventDefault();let R=T.nativeEvent.submitter,w=R?.getAttribute("formmethod")||f;M(R||T.currentTarget,{fetcherKey:o,method:w,navigate:i,replace:c,state:d,relative:m,preventScrollReset:y,viewTransition:b})};return A.createElement("form",{ref:D,method:z,action:E,onSubmit:l?g:C,...x,"data-discover":!O&&n==="render"?"true":void 0})});T1.displayName="Form";function C1(n){return`${n} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ty(n){let o=A.useContext(eo);return Ge(o,C1(n)),o}function R1(n,{target:o,replace:i,state:l,preventScrollReset:c,relative:d,viewTransition:f}={}){let p=yy(),g=Rn(),m=Ai(n,{relative:d});return A.useCallback(y=>{if(a1(y,o)){y.preventDefault();let b=i!==void 0?i:pi(g)===pi(m);p(n,{replace:b,state:l,preventScrollReset:c,relative:d,viewTransition:f})}},[g,p,m,i,l,o,n,c,d,f])}var w1=0,M1=()=>`__${String(++w1)}__`;function O1(){let{router:n}=Ty("useSubmit"),{basename:o}=A.useContext(Tn),i=YS();return A.useCallback(async(l,c={})=>{let{action:d,method:f,encType:p,formData:g,body:m}=i1(l,o);if(c.navigate===!1){let y=c.fetcherKey||M1();await n.fetch(y,i,c.action||d,{preventScrollReset:c.preventScrollReset,formData:g,body:m,formMethod:c.method||f,formEncType:c.encType||p,flushSync:c.flushSync})}else await n.navigate(c.action||d,{preventScrollReset:c.preventScrollReset,formData:g,body:m,formMethod:c.method||f,formEncType:c.encType||p,replace:c.replace,state:c.state,fromRouteId:i,flushSync:c.flushSync,viewTransition:c.viewTransition})},[n,o,i])}function _1(n,{relative:o}={}){let{basename:i}=A.useContext(Tn),l=A.useContext(Cn);Ge(l,"useFormAction must be used inside a RouteContext");let[c]=l.matches.slice(-1),d={...Ai(n||".",{relative:o})},f=Rn();if(n==null){d.search=f.search;let p=new URLSearchParams(d.search),g=p.getAll("index");if(g.some(y=>y==="")){p.delete("index"),g.filter(b=>b).forEach(b=>p.append("index",b));let y=p.toString();d.search=y?`?${y}`:""}}return(!n||n===".")&&c.route.index&&(d.search=d.search?d.search.replace(/^\?/,"?index&"):"?index"),i!=="/"&&(d.pathname=d.pathname==="/"?i:Vn([i,d.pathname])),pi(d)}function B1(n,o={}){let i=A.useContext(my);Ge(i!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:l}=Ty("useViewTransitionState"),c=Ai(n,{relative:o.relative});if(!i.isTransitioning)return!1;let d=Yn(i.currentLocation.pathname,l)||i.currentLocation.pathname,f=Yn(i.nextLocation.pathname,l)||i.nextLocation.pathname;return is(c.pathname,f)!=null||is(c.pathname,d)!=null}[...m1];var Cy=ly();const Fl=ps(Cy);function Wa(n,...o){const i=new URL(`https://mui.com/production-error/?code=${n}`);return o.forEach(l=>i.searchParams.append("args[]",l)),`Minified MUI error #${n}; visit ${i} for the full message.`}function ls(){return ls=Object.assign?Object.assign.bind():function(n){for(var o=1;o<arguments.length;o++){var i=arguments[o];for(var l in i)({}).hasOwnProperty.call(i,l)&&(n[l]=i[l])}return n},ls.apply(null,arguments)}function D1(n){if(n.sheet)return n.sheet;for(var o=0;o<document.styleSheets.length;o++)if(document.styleSheets[o].ownerNode===n)return document.styleSheets[o]}function N1(n){var o=document.createElement("style");return o.setAttribute("data-emotion",n.key),n.nonce!==void 0&&o.setAttribute("nonce",n.nonce),o.appendChild(document.createTextNode("")),o.setAttribute("data-s",""),o}var z1=function(){function n(i){var l=this;this._insertTag=function(c){var d;l.tags.length===0?l.insertionPoint?d=l.insertionPoint.nextSibling:l.prepend?d=l.container.firstChild:d=l.before:d=l.tags[l.tags.length-1].nextSibling,l.container.insertBefore(c,d),l.tags.push(c)},this.isSpeedy=i.speedy===void 0?!0:i.speedy,this.tags=[],this.ctr=0,this.nonce=i.nonce,this.key=i.key,this.container=i.container,this.prepend=i.prepend,this.insertionPoint=i.insertionPoint,this.before=null}var o=n.prototype;return o.hydrate=function(l){l.forEach(this._insertTag)},o.insert=function(l){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(N1(this));var c=this.tags[this.tags.length-1];if(this.isSpeedy){var d=D1(c);try{d.insertRule(l,d.cssRules.length)}catch{}}else c.appendChild(document.createTextNode(l));this.ctr++},o.flush=function(){this.tags.forEach(function(l){var c;return(c=l.parentNode)==null?void 0:c.removeChild(l)}),this.tags=[],this.ctr=0},n}(),xt="-ms-",ss="-moz-",Me="-webkit-",Ry="comm",Bd="rule",Dd="decl",L1="@import",wy="@keyframes",k1="@layer",j1=Math.abs,hs=String.fromCharCode,U1=Object.assign;function $1(n,o){return ht(n,0)^45?(((o<<2^ht(n,0))<<2^ht(n,1))<<2^ht(n,2))<<2^ht(n,3):0}function My(n){return n.trim()}function q1(n,o){return(n=o.exec(n))?n[0]:n}function Oe(n,o,i){return n.replace(o,i)}function cd(n,o){return n.indexOf(o)}function ht(n,o){return n.charCodeAt(o)|0}function mi(n,o,i){return n.slice(o,i)}function vn(n){return n.length}function Nd(n){return n.length}function Gl(n,o){return o.push(n),n}function P1(n,o){return n.map(o).join("")}var ys=1,Zr=1,Oy=0,Nt=0,nt=0,to="";function vs(n,o,i,l,c,d,f){return{value:n,root:o,parent:i,type:l,props:c,children:d,line:ys,column:Zr,length:f,return:""}}function ii(n,o){return U1(vs("",null,null,"",null,null,0),n,{length:-n.length},o)}function I1(){return nt}function H1(){return nt=Nt>0?ht(to,--Nt):0,Zr--,nt===10&&(Zr=1,ys--),nt}function Gt(){return nt=Nt<Oy?ht(to,Nt++):0,Zr++,nt===10&&(Zr=1,ys++),nt}function xn(){return ht(to,Nt)}function ts(){return Nt}function Ti(n,o){return mi(to,n,o)}function gi(n){switch(n){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function _y(n){return ys=Zr=1,Oy=vn(to=n),Nt=0,[]}function By(n){return to="",n}function ns(n){return My(Ti(Nt-1,ud(n===91?n+2:n===40?n+1:n)))}function F1(n){for(;(nt=xn())&&nt<33;)Gt();return gi(n)>2||gi(nt)>3?"":" "}function G1(n,o){for(;--o&&Gt()&&!(nt<48||nt>102||nt>57&&nt<65||nt>70&&nt<97););return Ti(n,ts()+(o<6&&xn()==32&&Gt()==32))}function ud(n){for(;Gt();)switch(nt){case n:return Nt;case 34:case 39:n!==34&&n!==39&&ud(nt);break;case 40:n===41&&ud(n);break;case 92:Gt();break}return Nt}function V1(n,o){for(;Gt()&&n+nt!==57;)if(n+nt===84&&xn()===47)break;return"/*"+Ti(o,Nt-1)+"*"+hs(n===47?n:Gt())}function Y1(n){for(;!gi(xn());)Gt();return Ti(n,Nt)}function W1(n){return By(as("",null,null,null,[""],n=_y(n),0,[0],n))}function as(n,o,i,l,c,d,f,p,g){for(var m=0,y=0,b=f,x=0,D=0,M=0,E=1,z=1,O=1,C=0,T="",R=c,w=d,_=l,j=T;z;)switch(M=C,C=Gt()){case 40:if(M!=108&&ht(j,b-1)==58){cd(j+=Oe(ns(C),"&","&\f"),"&\f")!=-1&&(O=-1);break}case 34:case 39:case 91:j+=ns(C);break;case 9:case 10:case 13:case 32:j+=F1(M);break;case 92:j+=G1(ts()-1,7);continue;case 47:switch(xn()){case 42:case 47:Gl(X1(V1(Gt(),ts()),o,i),g);break;default:j+="/"}break;case 123*E:p[m++]=vn(j)*O;case 125*E:case 59:case 0:switch(C){case 0:case 125:z=0;case 59+y:O==-1&&(j=Oe(j,/\f/g,"")),D>0&&vn(j)-b&&Gl(D>32?ih(j+";",l,i,b-1):ih(Oe(j," ","")+";",l,i,b-2),g);break;case 59:j+=";";default:if(Gl(_=oh(j,o,i,m,y,c,p,T,R=[],w=[],b),d),C===123)if(y===0)as(j,o,_,_,R,d,b,p,w);else switch(x===99&&ht(j,3)===110?100:x){case 100:case 108:case 109:case 115:as(n,_,_,l&&Gl(oh(n,_,_,0,0,c,p,T,c,R=[],b),w),c,w,b,p,l?R:w);break;default:as(j,_,_,_,[""],w,0,p,w)}}m=y=D=0,E=O=1,T=j="",b=f;break;case 58:b=1+vn(j),D=M;default:if(E<1){if(C==123)--E;else if(C==125&&E++==0&&H1()==125)continue}switch(j+=hs(C),C*E){case 38:O=y>0?1:(j+="\f",-1);break;case 44:p[m++]=(vn(j)-1)*O,O=1;break;case 64:xn()===45&&(j+=ns(Gt())),x=xn(),y=b=vn(T=j+=Y1(ts())),C++;break;case 45:M===45&&vn(j)==2&&(E=0)}}return d}function oh(n,o,i,l,c,d,f,p,g,m,y){for(var b=c-1,x=c===0?d:[""],D=Nd(x),M=0,E=0,z=0;M<l;++M)for(var O=0,C=mi(n,b+1,b=j1(E=f[M])),T=n;O<D;++O)(T=My(E>0?x[O]+" "+C:Oe(C,/&\f/g,x[O])))&&(g[z++]=T);return vs(n,o,i,c===0?Bd:p,g,m,y)}function X1(n,o,i){return vs(n,o,i,Ry,hs(I1()),mi(n,2,-2),0)}function ih(n,o,i,l){return vs(n,o,i,Dd,mi(n,0,l),mi(n,l+1,-1),l)}function Vr(n,o){for(var i="",l=Nd(n),c=0;c<l;c++)i+=o(n[c],c,n,o)||"";return i}function Z1(n,o,i,l){switch(n.type){case k1:if(n.children.length)break;case L1:case Dd:return n.return=n.return||n.value;case Ry:return"";case wy:return n.return=n.value+"{"+Vr(n.children,l)+"}";case Bd:n.value=n.props.join(",")}return vn(i=Vr(n.children,l))?n.return=n.value+"{"+i+"}":""}function Q1(n){var o=Nd(n);return function(i,l,c,d){for(var f="",p=0;p<o;p++)f+=n[p](i,l,c,d)||"";return f}}function K1(n){return function(o){o.root||(o=o.return)&&n(o)}}function Dy(n){var o=Object.create(null);return function(i){return o[i]===void 0&&(o[i]=n(i)),o[i]}}var J1=function(o,i,l){for(var c=0,d=0;c=d,d=xn(),c===38&&d===12&&(i[l]=1),!gi(d);)Gt();return Ti(o,Nt)},ex=function(o,i){var l=-1,c=44;do switch(gi(c)){case 0:c===38&&xn()===12&&(i[l]=1),o[l]+=J1(Nt-1,i,l);break;case 2:o[l]+=ns(c);break;case 4:if(c===44){o[++l]=xn()===58?"&\f":"",i[l]=o[l].length;break}default:o[l]+=hs(c)}while(c=Gt());return o},tx=function(o,i){return By(ex(_y(o),i))},lh=new WeakMap,nx=function(o){if(!(o.type!=="rule"||!o.parent||o.length<1)){for(var i=o.value,l=o.parent,c=o.column===l.column&&o.line===l.line;l.type!=="rule";)if(l=l.parent,!l)return;if(!(o.props.length===1&&i.charCodeAt(0)!==58&&!lh.get(l))&&!c){lh.set(o,!0);for(var d=[],f=tx(i,d),p=l.props,g=0,m=0;g<f.length;g++)for(var y=0;y<p.length;y++,m++)o.props[m]=d[g]?f[g].replace(/&\f/g,p[y]):p[y]+" "+f[g]}}},ax=function(o){if(o.type==="decl"){var i=o.value;i.charCodeAt(0)===108&&i.charCodeAt(2)===98&&(o.return="",o.value="")}};function Ny(n,o){switch($1(n,o)){case 5103:return Me+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return Me+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return Me+n+ss+n+xt+n+n;case 6828:case 4268:return Me+n+xt+n+n;case 6165:return Me+n+xt+"flex-"+n+n;case 5187:return Me+n+Oe(n,/(\w+).+(:[^]+)/,Me+"box-$1$2"+xt+"flex-$1$2")+n;case 5443:return Me+n+xt+"flex-item-"+Oe(n,/flex-|-self/,"")+n;case 4675:return Me+n+xt+"flex-line-pack"+Oe(n,/align-content|flex-|-self/,"")+n;case 5548:return Me+n+xt+Oe(n,"shrink","negative")+n;case 5292:return Me+n+xt+Oe(n,"basis","preferred-size")+n;case 6060:return Me+"box-"+Oe(n,"-grow","")+Me+n+xt+Oe(n,"grow","positive")+n;case 4554:return Me+Oe(n,/([^-])(transform)/g,"$1"+Me+"$2")+n;case 6187:return Oe(Oe(Oe(n,/(zoom-|grab)/,Me+"$1"),/(image-set)/,Me+"$1"),n,"")+n;case 5495:case 3959:return Oe(n,/(image-set\([^]*)/,Me+"$1$`$1");case 4968:return Oe(Oe(n,/(.+:)(flex-)?(.*)/,Me+"box-pack:$3"+xt+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+Me+n+n;case 4095:case 3583:case 4068:case 2532:return Oe(n,/(.+)-inline(.+)/,Me+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(vn(n)-1-o>6)switch(ht(n,o+1)){case 109:if(ht(n,o+4)!==45)break;case 102:return Oe(n,/(.+:)(.+)-([^]+)/,"$1"+Me+"$2-$3$1"+ss+(ht(n,o+3)==108?"$3":"$2-$3"))+n;case 115:return~cd(n,"stretch")?Ny(Oe(n,"stretch","fill-available"),o)+n:n}break;case 4949:if(ht(n,o+1)!==115)break;case 6444:switch(ht(n,vn(n)-3-(~cd(n,"!important")&&10))){case 107:return Oe(n,":",":"+Me)+n;case 101:return Oe(n,/(.+:)([^;!]+)(;|!.+)?/,"$1"+Me+(ht(n,14)===45?"inline-":"")+"box$3$1"+Me+"$2$3$1"+xt+"$2box$3")+n}break;case 5936:switch(ht(n,o+11)){case 114:return Me+n+xt+Oe(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return Me+n+xt+Oe(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return Me+n+xt+Oe(n,/[svh]\w+-[tblr]{2}/,"lr")+n}return Me+n+xt+n+n}return n}var rx=function(o,i,l,c){if(o.length>-1&&!o.return)switch(o.type){case Dd:o.return=Ny(o.value,o.length);break;case wy:return Vr([ii(o,{value:Oe(o.value,"@","@"+Me)})],c);case Bd:if(o.length)return P1(o.props,function(d){switch(q1(d,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Vr([ii(o,{props:[Oe(d,/:(read-\w+)/,":"+ss+"$1")]})],c);case"::placeholder":return Vr([ii(o,{props:[Oe(d,/:(plac\w+)/,":"+Me+"input-$1")]}),ii(o,{props:[Oe(d,/:(plac\w+)/,":"+ss+"$1")]}),ii(o,{props:[Oe(d,/:(plac\w+)/,xt+"input-$1")]})],c)}return""})}},ox=[rx],ix=function(o){var i=o.key;if(i==="css"){var l=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(l,function(E){var z=E.getAttribute("data-emotion");z.indexOf(" ")!==-1&&(document.head.appendChild(E),E.setAttribute("data-s",""))})}var c=o.stylisPlugins||ox,d={},f,p=[];f=o.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+i+' "]'),function(E){for(var z=E.getAttribute("data-emotion").split(" "),O=1;O<z.length;O++)d[z[O]]=!0;p.push(E)});var g,m=[nx,ax];{var y,b=[Z1,K1(function(E){y.insert(E)})],x=Q1(m.concat(c,b)),D=function(z){return Vr(W1(z),x)};g=function(z,O,C,T){y=C,D(z?z+"{"+O.styles+"}":O.styles),T&&(M.inserted[O.name]=!0)}}var M={key:i,sheet:new z1({key:i,container:f,nonce:o.nonce,speedy:o.speedy,prepend:o.prepend,insertionPoint:o.insertionPoint}),nonce:o.nonce,inserted:d,registered:{},insert:g};return M.sheet.hydrate(p),M},Ku={exports:{}},_e={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sh;function lx(){if(sh)return _e;sh=1;var n=typeof Symbol=="function"&&Symbol.for,o=n?Symbol.for("react.element"):60103,i=n?Symbol.for("react.portal"):60106,l=n?Symbol.for("react.fragment"):60107,c=n?Symbol.for("react.strict_mode"):60108,d=n?Symbol.for("react.profiler"):60114,f=n?Symbol.for("react.provider"):60109,p=n?Symbol.for("react.context"):60110,g=n?Symbol.for("react.async_mode"):60111,m=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,b=n?Symbol.for("react.suspense"):60113,x=n?Symbol.for("react.suspense_list"):60120,D=n?Symbol.for("react.memo"):60115,M=n?Symbol.for("react.lazy"):60116,E=n?Symbol.for("react.block"):60121,z=n?Symbol.for("react.fundamental"):60117,O=n?Symbol.for("react.responder"):60118,C=n?Symbol.for("react.scope"):60119;function T(w){if(typeof w=="object"&&w!==null){var _=w.$$typeof;switch(_){case o:switch(w=w.type,w){case g:case m:case l:case d:case c:case b:return w;default:switch(w=w&&w.$$typeof,w){case p:case y:case M:case D:case f:return w;default:return _}}case i:return _}}}function R(w){return T(w)===m}return _e.AsyncMode=g,_e.ConcurrentMode=m,_e.ContextConsumer=p,_e.ContextProvider=f,_e.Element=o,_e.ForwardRef=y,_e.Fragment=l,_e.Lazy=M,_e.Memo=D,_e.Portal=i,_e.Profiler=d,_e.StrictMode=c,_e.Suspense=b,_e.isAsyncMode=function(w){return R(w)||T(w)===g},_e.isConcurrentMode=R,_e.isContextConsumer=function(w){return T(w)===p},_e.isContextProvider=function(w){return T(w)===f},_e.isElement=function(w){return typeof w=="object"&&w!==null&&w.$$typeof===o},_e.isForwardRef=function(w){return T(w)===y},_e.isFragment=function(w){return T(w)===l},_e.isLazy=function(w){return T(w)===M},_e.isMemo=function(w){return T(w)===D},_e.isPortal=function(w){return T(w)===i},_e.isProfiler=function(w){return T(w)===d},_e.isStrictMode=function(w){return T(w)===c},_e.isSuspense=function(w){return T(w)===b},_e.isValidElementType=function(w){return typeof w=="string"||typeof w=="function"||w===l||w===m||w===d||w===c||w===b||w===x||typeof w=="object"&&w!==null&&(w.$$typeof===M||w.$$typeof===D||w.$$typeof===f||w.$$typeof===p||w.$$typeof===y||w.$$typeof===z||w.$$typeof===O||w.$$typeof===C||w.$$typeof===E)},_e.typeOf=T,_e}var ch;function sx(){return ch||(ch=1,Ku.exports=lx()),Ku.exports}var Ju,uh;function cx(){if(uh)return Ju;uh=1;var n=sx(),o={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},i={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},l={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},c={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},d={};d[n.ForwardRef]=l,d[n.Memo]=c;function f(M){return n.isMemo(M)?c:d[M.$$typeof]||o}var p=Object.defineProperty,g=Object.getOwnPropertyNames,m=Object.getOwnPropertySymbols,y=Object.getOwnPropertyDescriptor,b=Object.getPrototypeOf,x=Object.prototype;function D(M,E,z){if(typeof E!="string"){if(x){var O=b(E);O&&O!==x&&D(M,O,z)}var C=g(E);m&&(C=C.concat(m(E)));for(var T=f(M),R=f(E),w=0;w<C.length;++w){var _=C[w];if(!i[_]&&!(z&&z[_])&&!(R&&R[_])&&!(T&&T[_])){var j=y(E,_);try{p(M,_,j)}catch{}}}}return M}return Ju=D,Ju}cx();var ux=!0;function zy(n,o,i){var l="";return i.split(" ").forEach(function(c){n[c]!==void 0?o.push(n[c]+";"):c&&(l+=c+" ")}),l}var zd=function(o,i,l){var c=o.key+"-"+i.name;(l===!1||ux===!1)&&o.registered[c]===void 0&&(o.registered[c]=i.styles)},Ly=function(o,i,l){zd(o,i,l);var c=o.key+"-"+i.name;if(o.inserted[i.name]===void 0){var d=i;do o.insert(i===d?"."+c:"",d,o.sheet,!0),d=d.next;while(d!==void 0)}};function dx(n){for(var o=0,i,l=0,c=n.length;c>=4;++l,c-=4)i=n.charCodeAt(l)&255|(n.charCodeAt(++l)&255)<<8|(n.charCodeAt(++l)&255)<<16|(n.charCodeAt(++l)&255)<<24,i=(i&65535)*1540483477+((i>>>16)*59797<<16),i^=i>>>24,o=(i&65535)*1540483477+((i>>>16)*59797<<16)^(o&65535)*1540483477+((o>>>16)*59797<<16);switch(c){case 3:o^=(n.charCodeAt(l+2)&255)<<16;case 2:o^=(n.charCodeAt(l+1)&255)<<8;case 1:o^=n.charCodeAt(l)&255,o=(o&65535)*1540483477+((o>>>16)*59797<<16)}return o^=o>>>13,o=(o&65535)*1540483477+((o>>>16)*59797<<16),((o^o>>>15)>>>0).toString(36)}var fx={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},px=/[A-Z]|^ms/g,mx=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ky=function(o){return o.charCodeAt(1)===45},dh=function(o){return o!=null&&typeof o!="boolean"},ed=Dy(function(n){return ky(n)?n:n.replace(px,"-$&").toLowerCase()}),fh=function(o,i){switch(o){case"animation":case"animationName":if(typeof i=="string")return i.replace(mx,function(l,c,d){return bn={name:c,styles:d,next:bn},c})}return fx[o]!==1&&!ky(o)&&typeof i=="number"&&i!==0?i+"px":i};function hi(n,o,i){if(i==null)return"";var l=i;if(l.__emotion_styles!==void 0)return l;switch(typeof i){case"boolean":return"";case"object":{var c=i;if(c.anim===1)return bn={name:c.name,styles:c.styles,next:bn},c.name;var d=i;if(d.styles!==void 0){var f=d.next;if(f!==void 0)for(;f!==void 0;)bn={name:f.name,styles:f.styles,next:bn},f=f.next;var p=d.styles+";";return p}return gx(n,o,i)}case"function":{if(n!==void 0){var g=bn,m=i(n);return bn=g,hi(n,o,m)}break}}var y=i;if(o==null)return y;var b=o[y];return b!==void 0?b:y}function gx(n,o,i){var l="";if(Array.isArray(i))for(var c=0;c<i.length;c++)l+=hi(n,o,i[c])+";";else for(var d in i){var f=i[d];if(typeof f!="object"){var p=f;o!=null&&o[p]!==void 0?l+=d+"{"+o[p]+"}":dh(p)&&(l+=ed(d)+":"+fh(d,p)+";")}else if(Array.isArray(f)&&typeof f[0]=="string"&&(o==null||o[f[0]]===void 0))for(var g=0;g<f.length;g++)dh(f[g])&&(l+=ed(d)+":"+fh(d,f[g])+";");else{var m=hi(n,o,f);switch(d){case"animation":case"animationName":{l+=ed(d)+":"+m+";";break}default:l+=d+"{"+m+"}"}}}return l}var ph=/label:\s*([^\s;{]+)\s*(;|$)/g,bn;function bs(n,o,i){if(n.length===1&&typeof n[0]=="object"&&n[0]!==null&&n[0].styles!==void 0)return n[0];var l=!0,c="";bn=void 0;var d=n[0];if(d==null||d.raw===void 0)l=!1,c+=hi(i,o,d);else{var f=d;c+=f[0]}for(var p=1;p<n.length;p++)if(c+=hi(i,o,n[p]),l){var g=d;c+=g[p]}ph.lastIndex=0;for(var m="",y;(y=ph.exec(c))!==null;)m+="-"+y[1];var b=dx(c)+m;return{name:b,styles:c,next:bn}}var hx=function(o){return o()},yx=os.useInsertionEffect?os.useInsertionEffect:!1,jy=yx||hx,Uy=A.createContext(typeof HTMLElement<"u"?ix({key:"css"}):null);Uy.Provider;var $y=function(o){return A.forwardRef(function(i,l){var c=A.useContext(Uy);return o(i,c,l)})},Ld=A.createContext({}),kd={}.hasOwnProperty,dd="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",vx=function(o,i){var l={};for(var c in i)kd.call(i,c)&&(l[c]=i[c]);return l[dd]=o,l},bx=function(o){var i=o.cache,l=o.serialized,c=o.isStringTag;return zd(i,l,c),jy(function(){return Ly(i,l,c)}),null},Sx=$y(function(n,o,i){var l=n.css;typeof l=="string"&&o.registered[l]!==void 0&&(l=o.registered[l]);var c=n[dd],d=[l],f="";typeof n.className=="string"?f=zy(o.registered,d,n.className):n.className!=null&&(f=n.className+" ");var p=bs(d,void 0,A.useContext(Ld));f+=o.key+"-"+p.name;var g={};for(var m in n)kd.call(n,m)&&m!=="css"&&m!==dd&&(g[m]=n[m]);return g.className=f,i&&(g.ref=i),A.createElement(A.Fragment,null,A.createElement(bx,{cache:o,serialized:p,isStringTag:typeof c=="string"}),A.createElement(c,g))}),xx=Sx,mh=function(o,i){var l=arguments;if(i==null||!kd.call(i,"css"))return A.createElement.apply(void 0,l);var c=l.length,d=new Array(c);d[0]=xx,d[1]=vx(o,i);for(var f=2;f<c;f++)d[f]=l[f];return A.createElement.apply(null,d)};(function(n){var o;o||(o=n.JSX||(n.JSX={}))})(mh||(mh={}));function jd(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return bs(o)}function Ci(){var n=jd.apply(void 0,arguments),o="animation-"+n.name;return{name:o,styles:"@keyframes "+o+"{"+n.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}}var Ex=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Ax=Dy(function(n){return Ex.test(n)||n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)<91}),Tx=Ax,Cx=function(o){return o!=="theme"},gh=function(o){return typeof o=="string"&&o.charCodeAt(0)>96?Tx:Cx},hh=function(o,i,l){var c;if(i){var d=i.shouldForwardProp;c=o.__emotion_forwardProp&&d?function(f){return o.__emotion_forwardProp(f)&&d(f)}:d}return typeof c!="function"&&l&&(c=o.__emotion_forwardProp),c},Rx=function(o){var i=o.cache,l=o.serialized,c=o.isStringTag;return zd(i,l,c),jy(function(){return Ly(i,l,c)}),null},wx=function n(o,i){var l=o.__emotion_real===o,c=l&&o.__emotion_base||o,d,f;i!==void 0&&(d=i.label,f=i.target);var p=hh(o,i,l),g=p||gh(c),m=!g("as");return function(){var y=arguments,b=l&&o.__emotion_styles!==void 0?o.__emotion_styles.slice(0):[];if(d!==void 0&&b.push("label:"+d+";"),y[0]==null||y[0].raw===void 0)b.push.apply(b,y);else{var x=y[0];b.push(x[0]);for(var D=y.length,M=1;M<D;M++)b.push(y[M],x[M])}var E=$y(function(z,O,C){var T=m&&z.as||c,R="",w=[],_=z;if(z.theme==null){_={};for(var j in z)_[j]=z[j];_.theme=A.useContext(Ld)}typeof z.className=="string"?R=zy(O.registered,w,z.className):z.className!=null&&(R=z.className+" ");var G=bs(b.concat(w),O.registered,_);R+=O.key+"-"+G.name,f!==void 0&&(R+=" "+f);var I=m&&p===void 0?gh(T):g,S={};for(var Z in z)m&&Z==="as"||I(Z)&&(S[Z]=z[Z]);return S.className=R,C&&(S.ref=C),A.createElement(A.Fragment,null,A.createElement(Rx,{cache:O,serialized:G,isStringTag:typeof T=="string"}),A.createElement(T,S))});return E.displayName=d!==void 0?d:"Styled("+(typeof c=="string"?c:c.displayName||c.name||"Component")+")",E.defaultProps=o.defaultProps,E.__emotion_real=E,E.__emotion_base=c,E.__emotion_styles=b,E.__emotion_forwardProp=p,Object.defineProperty(E,"toString",{value:function(){return"."+f}}),E.withComponent=function(z,O){var C=n(z,ls({},i,O,{shouldForwardProp:hh(E,O,!0)}));return C.apply(void 0,b)},E}},Mx=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],fd=wx.bind(null);Mx.forEach(function(n){fd[n]=fd(n)});function qy(n,o){return fd(n,o)}function Ox(n,o){Array.isArray(n.__emotion_styles)&&(n.__emotion_styles=o(n.__emotion_styles))}const yh=[];function vh(n){return yh[0]=n,bs(yh)}var td={exports:{}},ke={};/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bh;function _x(){if(bh)return ke;bh=1;var n=Symbol.for("react.transitional.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),l=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),d=Symbol.for("react.consumer"),f=Symbol.for("react.context"),p=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),m=Symbol.for("react.suspense_list"),y=Symbol.for("react.memo"),b=Symbol.for("react.lazy"),x=Symbol.for("react.view_transition"),D=Symbol.for("react.client.reference");function M(E){if(typeof E=="object"&&E!==null){var z=E.$$typeof;switch(z){case n:switch(E=E.type,E){case i:case c:case l:case g:case m:case x:return E;default:switch(E=E&&E.$$typeof,E){case f:case p:case b:case y:return E;case d:return E;default:return z}}case o:return z}}}return ke.ContextConsumer=d,ke.ContextProvider=f,ke.Element=n,ke.ForwardRef=p,ke.Fragment=i,ke.Lazy=b,ke.Memo=y,ke.Portal=o,ke.Profiler=c,ke.StrictMode=l,ke.Suspense=g,ke.SuspenseList=m,ke.isContextConsumer=function(E){return M(E)===d},ke.isContextProvider=function(E){return M(E)===f},ke.isElement=function(E){return typeof E=="object"&&E!==null&&E.$$typeof===n},ke.isForwardRef=function(E){return M(E)===p},ke.isFragment=function(E){return M(E)===i},ke.isLazy=function(E){return M(E)===b},ke.isMemo=function(E){return M(E)===y},ke.isPortal=function(E){return M(E)===o},ke.isProfiler=function(E){return M(E)===c},ke.isStrictMode=function(E){return M(E)===l},ke.isSuspense=function(E){return M(E)===g},ke.isSuspenseList=function(E){return M(E)===m},ke.isValidElementType=function(E){return typeof E=="string"||typeof E=="function"||E===i||E===c||E===l||E===g||E===m||typeof E=="object"&&E!==null&&(E.$$typeof===b||E.$$typeof===y||E.$$typeof===f||E.$$typeof===d||E.$$typeof===p||E.$$typeof===D||E.getModuleId!==void 0)},ke.typeOf=M,ke}var Sh;function Bx(){return Sh||(Sh=1,td.exports=_x()),td.exports}var Py=Bx();function Sn(n){if(typeof n!="object"||n===null)return!1;const o=Object.getPrototypeOf(n);return(o===null||o===Object.prototype||Object.getPrototypeOf(o)===null)&&!(Symbol.toStringTag in n)&&!(Symbol.iterator in n)}function Iy(n){if(A.isValidElement(n)||Py.isValidElementType(n)||!Sn(n))return n;const o={};return Object.keys(n).forEach(i=>{o[i]=Iy(n[i])}),o}function Vt(n,o,i={clone:!0}){const l=i.clone?{...n}:n;return Sn(n)&&Sn(o)&&Object.keys(o).forEach(c=>{A.isValidElement(o[c])||Py.isValidElementType(o[c])?l[c]=o[c]:Sn(o[c])&&Object.prototype.hasOwnProperty.call(n,c)&&Sn(n[c])?l[c]=Vt(n[c],o[c],i):i.clone?l[c]=Sn(o[c])?Iy(o[c]):o[c]:l[c]=o[c]}),l}const Dx=n=>{const o=Object.keys(n).map(i=>({key:i,val:n[i]}))||[];return o.sort((i,l)=>i.val-l.val),o.reduce((i,l)=>({...i,[l.key]:l.val}),{})};function Nx(n){const{values:o={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:i="px",step:l=5,...c}=n,d=Dx(o),f=Object.keys(d);function p(x){return`@media (min-width:${typeof o[x]=="number"?o[x]:x}${i})`}function g(x){return`@media (max-width:${(typeof o[x]=="number"?o[x]:x)-l/100}${i})`}function m(x,D){const M=f.indexOf(D);return`@media (min-width:${typeof o[x]=="number"?o[x]:x}${i}) and (max-width:${(M!==-1&&typeof o[f[M]]=="number"?o[f[M]]:D)-l/100}${i})`}function y(x){return f.indexOf(x)+1<f.length?m(x,f[f.indexOf(x)+1]):p(x)}function b(x){const D=f.indexOf(x);return D===0?p(f[1]):D===f.length-1?g(f[D]):m(x,f[f.indexOf(x)+1]).replace("@media","@media not all and")}return{keys:f,values:d,up:p,down:g,between:m,only:y,not:b,unit:i,...c}}function zx(n,o){if(!n.containerQueries)return o;const i=Object.keys(o).filter(l=>l.startsWith("@container")).sort((l,c)=>{const d=/min-width:\s*([0-9.]+)/;return+(l.match(d)?.[1]||0)-+(c.match(d)?.[1]||0)});return i.length?i.reduce((l,c)=>{const d=o[c];return delete l[c],l[c]=d,l},{...o}):o}function Lx(n,o){return o==="@"||o.startsWith("@")&&(n.some(i=>o.startsWith(`@${i}`))||!!o.match(/^@\d/))}function kx(n,o){const i=o.match(/^@([^/]+)?\/?(.+)?$/);if(!i)return null;const[,l,c]=i,d=Number.isNaN(+l)?l||0:+l;return n.containerQueries(c).up(d)}function jx(n){const o=(d,f)=>d.replace("@media",f?`@container ${f}`:"@container");function i(d,f){d.up=(...p)=>o(n.breakpoints.up(...p),f),d.down=(...p)=>o(n.breakpoints.down(...p),f),d.between=(...p)=>o(n.breakpoints.between(...p),f),d.only=(...p)=>o(n.breakpoints.only(...p),f),d.not=(...p)=>{const g=o(n.breakpoints.not(...p),f);return g.includes("not all and")?g.replace("not all and ","").replace("min-width:","width<").replace("max-width:","width>").replace("and","or"):g}}const l={},c=d=>(i(l,d),l);return i(c),{...n,containerQueries:c}}const Ux={borderRadius:4};function di(n,o){return o?Vt(n,o,{clone:!1}):n}const Ss={xs:0,sm:600,md:900,lg:1200,xl:1536},xh={keys:["xs","sm","md","lg","xl"],up:n=>`@media (min-width:${Ss[n]}px)`},$x={containerQueries:n=>({up:o=>{let i=typeof o=="number"?o:Ss[o]||o;return typeof i=="number"&&(i=`${i}px`),n?`@container ${n} (min-width:${i})`:`@container (min-width:${i})`}})};function Wn(n,o,i){const l=n.theme||{};if(Array.isArray(o)){const d=l.breakpoints||xh;return o.reduce((f,p,g)=>(f[d.up(d.keys[g])]=i(o[g]),f),{})}if(typeof o=="object"){const d=l.breakpoints||xh;return Object.keys(o).reduce((f,p)=>{if(Lx(d.keys,p)){const g=kx(l.containerQueries?l:$x,p);g&&(f[g]=i(o[p],p))}else if(Object.keys(d.values||Ss).includes(p)){const g=d.up(p);f[g]=i(o[p],p)}else{const g=p;f[g]=o[g]}return f},{})}return i(o)}function qx(n={}){return n.keys?.reduce((i,l)=>{const c=n.up(l);return i[c]={},i},{})||{}}function Px(n,o){return n.reduce((i,l)=>{const c=i[l];return(!c||Object.keys(c).length===0)&&delete i[l],i},o)}function ye(n){if(typeof n!="string")throw new Error(Wa(7));return n.charAt(0).toUpperCase()+n.slice(1)}function xs(n,o,i=!0){if(!o||typeof o!="string")return null;if(n&&n.vars&&i){const l=`vars.${o}`.split(".").reduce((c,d)=>c&&c[d]?c[d]:null,n);if(l!=null)return l}return o.split(".").reduce((l,c)=>l&&l[c]!=null?l[c]:null,n)}function cs(n,o,i,l=i){let c;return typeof n=="function"?c=n(i):Array.isArray(n)?c=n[i]||l:c=xs(n,i)||l,o&&(c=o(c,l,n)),c}function Je(n){const{prop:o,cssProperty:i=n.prop,themeKey:l,transform:c}=n,d=f=>{if(f[o]==null)return null;const p=f[o],g=f.theme,m=xs(g,l)||{};return Wn(f,p,b=>{let x=cs(m,c,b);return b===x&&typeof b=="string"&&(x=cs(m,c,`${o}${b==="default"?"":ye(b)}`,b)),i===!1?x:{[i]:x}})};return d.propTypes={},d.filterProps=[o],d}function Ix(n){const o={};return i=>(o[i]===void 0&&(o[i]=n(i)),o[i])}const Hx={m:"margin",p:"padding"},Fx={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Eh={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},Gx=Ix(n=>{if(n.length>2)if(Eh[n])n=Eh[n];else return[n];const[o,i]=n.split(""),l=Hx[o],c=Fx[i]||"";return Array.isArray(c)?c.map(d=>l+d):[l+c]}),Ud=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],$d=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];[...Ud,...$d];function Ri(n,o,i,l){const c=xs(n,o,!0)??i;return typeof c=="number"||typeof c=="string"?d=>typeof d=="string"?d:typeof c=="string"?c.startsWith("var(")&&d===0?0:c.startsWith("var(")&&d===1?c:`calc(${d} * ${c})`:c*d:Array.isArray(c)?d=>{if(typeof d=="string")return d;const f=Math.abs(d),p=c[f];return d>=0?p:typeof p=="number"?-p:typeof p=="string"&&p.startsWith("var(")?`calc(-1 * ${p})`:`-${p}`}:typeof c=="function"?c:()=>{}}function qd(n){return Ri(n,"spacing",8)}function wi(n,o){return typeof o=="string"||o==null?o:n(o)}function Vx(n,o){return i=>n.reduce((l,c)=>(l[c]=wi(o,i),l),{})}function Yx(n,o,i,l){if(!o.includes(i))return null;const c=Gx(i),d=Vx(c,l),f=n[i];return Wn(n,f,d)}function Hy(n,o){const i=qd(n.theme);return Object.keys(n).map(l=>Yx(n,o,l,i)).reduce(di,{})}function Xe(n){return Hy(n,Ud)}Xe.propTypes={};Xe.filterProps=Ud;function Ze(n){return Hy(n,$d)}Ze.propTypes={};Ze.filterProps=$d;function Fy(n=8,o=qd({spacing:n})){if(n.mui)return n;const i=(...l)=>(l.length===0?[1]:l).map(d=>{const f=o(d);return typeof f=="number"?`${f}px`:f}).join(" ");return i.mui=!0,i}function Es(...n){const o=n.reduce((l,c)=>(c.filterProps.forEach(d=>{l[d]=c}),l),{}),i=l=>Object.keys(l).reduce((c,d)=>o[d]?di(c,o[d](l)):c,{});return i.propTypes={},i.filterProps=n.reduce((l,c)=>l.concat(c.filterProps),[]),i}function an(n){return typeof n!="number"?n:`${n}px solid`}function rn(n,o){return Je({prop:n,themeKey:"borders",transform:o})}const Wx=rn("border",an),Xx=rn("borderTop",an),Zx=rn("borderRight",an),Qx=rn("borderBottom",an),Kx=rn("borderLeft",an),Jx=rn("borderColor"),eE=rn("borderTopColor"),tE=rn("borderRightColor"),nE=rn("borderBottomColor"),aE=rn("borderLeftColor"),rE=rn("outline",an),oE=rn("outlineColor"),As=n=>{if(n.borderRadius!==void 0&&n.borderRadius!==null){const o=Ri(n.theme,"shape.borderRadius",4),i=l=>({borderRadius:wi(o,l)});return Wn(n,n.borderRadius,i)}return null};As.propTypes={};As.filterProps=["borderRadius"];Es(Wx,Xx,Zx,Qx,Kx,Jx,eE,tE,nE,aE,As,rE,oE);const Ts=n=>{if(n.gap!==void 0&&n.gap!==null){const o=Ri(n.theme,"spacing",8),i=l=>({gap:wi(o,l)});return Wn(n,n.gap,i)}return null};Ts.propTypes={};Ts.filterProps=["gap"];const Cs=n=>{if(n.columnGap!==void 0&&n.columnGap!==null){const o=Ri(n.theme,"spacing",8),i=l=>({columnGap:wi(o,l)});return Wn(n,n.columnGap,i)}return null};Cs.propTypes={};Cs.filterProps=["columnGap"];const Rs=n=>{if(n.rowGap!==void 0&&n.rowGap!==null){const o=Ri(n.theme,"spacing",8),i=l=>({rowGap:wi(o,l)});return Wn(n,n.rowGap,i)}return null};Rs.propTypes={};Rs.filterProps=["rowGap"];const iE=Je({prop:"gridColumn"}),lE=Je({prop:"gridRow"}),sE=Je({prop:"gridAutoFlow"}),cE=Je({prop:"gridAutoColumns"}),uE=Je({prop:"gridAutoRows"}),dE=Je({prop:"gridTemplateColumns"}),fE=Je({prop:"gridTemplateRows"}),pE=Je({prop:"gridTemplateAreas"}),mE=Je({prop:"gridArea"});Es(Ts,Cs,Rs,iE,lE,sE,cE,uE,dE,fE,pE,mE);function Yr(n,o){return o==="grey"?o:n}const gE=Je({prop:"color",themeKey:"palette",transform:Yr}),hE=Je({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Yr}),yE=Je({prop:"backgroundColor",themeKey:"palette",transform:Yr});Es(gE,hE,yE);function Ht(n){return n<=1&&n!==0?`${n*100}%`:n}const vE=Je({prop:"width",transform:Ht}),Pd=n=>{if(n.maxWidth!==void 0&&n.maxWidth!==null){const o=i=>{const l=n.theme?.breakpoints?.values?.[i]||Ss[i];return l?n.theme?.breakpoints?.unit!=="px"?{maxWidth:`${l}${n.theme.breakpoints.unit}`}:{maxWidth:l}:{maxWidth:Ht(i)}};return Wn(n,n.maxWidth,o)}return null};Pd.filterProps=["maxWidth"];const bE=Je({prop:"minWidth",transform:Ht}),SE=Je({prop:"height",transform:Ht}),xE=Je({prop:"maxHeight",transform:Ht}),EE=Je({prop:"minHeight",transform:Ht});Je({prop:"size",cssProperty:"width",transform:Ht});Je({prop:"size",cssProperty:"height",transform:Ht});const AE=Je({prop:"boxSizing"});Es(vE,Pd,bE,SE,xE,EE,AE);const Mi={border:{themeKey:"borders",transform:an},borderTop:{themeKey:"borders",transform:an},borderRight:{themeKey:"borders",transform:an},borderBottom:{themeKey:"borders",transform:an},borderLeft:{themeKey:"borders",transform:an},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:an},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:As},color:{themeKey:"palette",transform:Yr},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Yr},backgroundColor:{themeKey:"palette",transform:Yr},p:{style:Ze},pt:{style:Ze},pr:{style:Ze},pb:{style:Ze},pl:{style:Ze},px:{style:Ze},py:{style:Ze},padding:{style:Ze},paddingTop:{style:Ze},paddingRight:{style:Ze},paddingBottom:{style:Ze},paddingLeft:{style:Ze},paddingX:{style:Ze},paddingY:{style:Ze},paddingInline:{style:Ze},paddingInlineStart:{style:Ze},paddingInlineEnd:{style:Ze},paddingBlock:{style:Ze},paddingBlockStart:{style:Ze},paddingBlockEnd:{style:Ze},m:{style:Xe},mt:{style:Xe},mr:{style:Xe},mb:{style:Xe},ml:{style:Xe},mx:{style:Xe},my:{style:Xe},margin:{style:Xe},marginTop:{style:Xe},marginRight:{style:Xe},marginBottom:{style:Xe},marginLeft:{style:Xe},marginX:{style:Xe},marginY:{style:Xe},marginInline:{style:Xe},marginInlineStart:{style:Xe},marginInlineEnd:{style:Xe},marginBlock:{style:Xe},marginBlockStart:{style:Xe},marginBlockEnd:{style:Xe},displayPrint:{cssProperty:!1,transform:n=>({"@media print":{display:n}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Ts},rowGap:{style:Rs},columnGap:{style:Cs},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:Ht},maxWidth:{style:Pd},minWidth:{transform:Ht},height:{transform:Ht},maxHeight:{transform:Ht},minHeight:{transform:Ht},boxSizing:{},font:{themeKey:"font"},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}};function TE(...n){const o=n.reduce((l,c)=>l.concat(Object.keys(c)),[]),i=new Set(o);return n.every(l=>i.size===Object.keys(l).length)}function CE(n,o){return typeof n=="function"?n(o):n}function RE(){function n(i,l,c,d){const f={[i]:l,theme:c},p=d[i];if(!p)return{[i]:l};const{cssProperty:g=i,themeKey:m,transform:y,style:b}=p;if(l==null)return null;if(m==="typography"&&l==="inherit")return{[i]:l};const x=xs(c,m)||{};return b?b(f):Wn(f,l,M=>{let E=cs(x,y,M);return M===E&&typeof M=="string"&&(E=cs(x,y,`${i}${M==="default"?"":ye(M)}`,M)),g===!1?E:{[g]:E}})}function o(i){const{sx:l,theme:c={}}=i||{};if(!l)return null;const d=c.unstable_sxConfig??Mi;function f(p){let g=p;if(typeof p=="function")g=p(c);else if(typeof p!="object")return p;if(!g)return null;const m=qx(c.breakpoints),y=Object.keys(m);let b=m;return Object.keys(g).forEach(x=>{const D=CE(g[x],c);if(D!=null)if(typeof D=="object")if(d[x])b=di(b,n(x,D,c,d));else{const M=Wn({theme:c},D,E=>({[x]:E}));TE(M,D)?b[x]=o({sx:D,theme:c}):b=di(b,M)}else b=di(b,n(x,D,c,d))}),zx(c,Px(y,b))}return Array.isArray(l)?l.map(f):f(l)}return o}const Xa=RE();Xa.filterProps=["sx"];function wE(n,o){const i=this;if(i.vars){if(!i.colorSchemes?.[n]||typeof i.getColorSchemeSelector!="function")return{};let l=i.getColorSchemeSelector(n);return l==="&"?o:((l.includes("data-")||l.includes("."))&&(l=`*:where(${l.replace(/\s*&$/,"")}) &`),{[l]:o})}return i.palette.mode===n?o:{}}function Id(n={},...o){const{breakpoints:i={},palette:l={},spacing:c,shape:d={},...f}=n,p=Nx(i),g=Fy(c);let m=Vt({breakpoints:p,direction:"ltr",components:{},palette:{mode:"light",...l},spacing:g,shape:{...Ux,...d}},f);return m=jx(m),m.applyStyles=wE,m=o.reduce((y,b)=>Vt(y,b),m),m.unstable_sxConfig={...Mi,...f?.unstable_sxConfig},m.unstable_sx=function(b){return Xa({sx:b,theme:this})},m}function ME(n){return Object.keys(n).length===0}function Gy(n=null){const o=A.useContext(Ld);return!o||ME(o)?n:o}const OE=Id();function Vy(n=OE){return Gy(n)}const _E=n=>{const o={systemProps:{},otherProps:{}},i=n?.theme?.unstable_sxConfig??Mi;return Object.keys(n).forEach(l=>{i[l]?o.systemProps[l]=n[l]:o.otherProps[l]=n[l]}),o};function Yy(n){const{sx:o,...i}=n,{systemProps:l,otherProps:c}=_E(i);let d;return Array.isArray(o)?d=[l,...o]:typeof o=="function"?d=(...f)=>{const p=o(...f);return Sn(p)?{...l,...p}:l}:d={...l,...o},{...c,sx:d}}const Ah=n=>n,BE=()=>{let n=Ah;return{configure(o){n=o},generate(o){return n(o)},reset(){n=Ah}}},Wy=BE();function Xy(n){var o,i,l="";if(typeof n=="string"||typeof n=="number")l+=n;else if(typeof n=="object")if(Array.isArray(n)){var c=n.length;for(o=0;o<c;o++)n[o]&&(i=Xy(n[o]))&&(l&&(l+=" "),l+=i)}else for(i in n)n[i]&&(l&&(l+=" "),l+=i);return l}function Se(){for(var n,o,i=0,l="",c=arguments.length;i<c;i++)(n=arguments[i])&&(o=Xy(n))&&(l&&(l+=" "),l+=o);return l}function DE(n={}){const{themeId:o,defaultTheme:i,defaultClassName:l="MuiBox-root",generateClassName:c}=n,d=qy("div",{shouldForwardProp:p=>p!=="theme"&&p!=="sx"&&p!=="as"})(Xa);return A.forwardRef(function(g,m){const y=Vy(i),{className:b,component:x="div",...D}=Yy(g);return k.jsx(d,{as:x,ref:m,className:Se(b,c?c(l):l),theme:o&&y[o]||y,...D})})}const NE={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function it(n,o,i="Mui"){const l=NE[o];return l?`${i}-${l}`:`${Wy.generate(n)}-${o}`}function at(n,o,i="Mui"){const l={};return o.forEach(c=>{l[c]=it(n,c,i)}),l}function Zy(n){const{variants:o,...i}=n,l={variants:o,style:vh(i),isProcessed:!0};return l.style===i||o&&o.forEach(c=>{typeof c.style!="function"&&(c.style=vh(c.style))}),l}const zE=Id();function nd(n){return n!=="ownerState"&&n!=="theme"&&n!=="sx"&&n!=="as"}function LE(n){return n?(o,i)=>i[n]:null}function kE(n,o,i){n.theme=$E(n.theme)?i:n.theme[o]||n.theme}function rs(n,o){const i=typeof o=="function"?o(n):o;if(Array.isArray(i))return i.flatMap(l=>rs(n,l));if(Array.isArray(i?.variants)){let l;if(i.isProcessed)l=i.style;else{const{variants:c,...d}=i;l=d}return Qy(n,i.variants,[l])}return i?.isProcessed?i.style:i}function Qy(n,o,i=[]){let l;e:for(let c=0;c<o.length;c+=1){const d=o[c];if(typeof d.props=="function"){if(l??={...n,...n.ownerState,ownerState:n.ownerState},!d.props(l))continue}else for(const f in d.props)if(n[f]!==d.props[f]&&n.ownerState?.[f]!==d.props[f])continue e;typeof d.style=="function"?(l??={...n,...n.ownerState,ownerState:n.ownerState},i.push(d.style(l))):i.push(d.style)}return i}function jE(n={}){const{themeId:o,defaultTheme:i=zE,rootShouldForwardProp:l=nd,slotShouldForwardProp:c=nd}=n;function d(p){kE(p,o,i)}return(p,g={})=>{Ox(p,w=>w.filter(_=>_!==Xa));const{name:m,slot:y,skipVariantsResolver:b,skipSx:x,overridesResolver:D=LE(PE(y)),...M}=g,E=b!==void 0?b:y&&y!=="Root"&&y!=="root"||!1,z=x||!1;let O=nd;y==="Root"||y==="root"?O=l:y?O=c:qE(p)&&(O=void 0);const C=qy(p,{shouldForwardProp:O,label:UE(),...M}),T=w=>{if(w.__emotion_real===w)return w;if(typeof w=="function")return function(j){return rs(j,w)};if(Sn(w)){const _=Zy(w);return _.variants?function(G){return rs(G,_)}:_.style}return w},R=(...w)=>{const _=[],j=w.map(T),G=[];if(_.push(d),m&&D&&G.push(function(te){const re=te.theme.components?.[m]?.styleOverrides;if(!re)return null;const le={};for(const $ in re)le[$]=rs(te,re[$]);return D(te,le)}),m&&!E&&G.push(function(te){const re=te.theme?.components?.[m]?.variants;return re?Qy(te,re):null}),z||G.push(Xa),Array.isArray(j[0])){const Z=j.shift(),te=new Array(_.length).fill(""),ie=new Array(G.length).fill("");let re;re=[...te,...Z,...ie],re.raw=[...te,...Z.raw,...ie],_.unshift(re)}const I=[..._,...j,...G],S=C(...I);return p.muiName&&(S.muiName=p.muiName),S};return C.withConfig&&(R.withConfig=C.withConfig),R}}function UE(n,o){return void 0}function $E(n){for(const o in n)return!1;return!0}function qE(n){return typeof n=="string"&&n.charCodeAt(0)>96}function PE(n){return n&&n.charAt(0).toLowerCase()+n.slice(1)}function yi(n,o){const i={...o};for(const l in n)if(Object.prototype.hasOwnProperty.call(n,l)){const c=l;if(c==="components"||c==="slots")i[c]={...n[c],...i[c]};else if(c==="componentsProps"||c==="slotProps"){const d=n[c],f=o[c];if(!f)i[c]=d||{};else if(!d)i[c]=f;else{i[c]={...f};for(const p in d)if(Object.prototype.hasOwnProperty.call(d,p)){const g=p;i[c][g]=yi(d[g],f[g])}}}else i[c]===void 0&&(i[c]=n[c])}return i}function IE(n){const{theme:o,name:i,props:l}=n;return!o||!o.components||!o.components[i]||!o.components[i].defaultProps?l:yi(o.components[i].defaultProps,l)}const vi=typeof window<"u"?A.useLayoutEffect:A.useEffect;function HE(n,o,i,l,c){const[d,f]=A.useState(()=>c&&i?i(n).matches:l?l(n).matches:o);return vi(()=>{if(!i)return;const p=i(n),g=()=>{f(p.matches)};return g(),p.addEventListener("change",g),()=>{p.removeEventListener("change",g)}},[n,i]),d}const FE={...os},Ky=FE.useSyncExternalStore;function GE(n,o,i,l,c){const d=A.useCallback(()=>o,[o]),f=A.useMemo(()=>{if(c&&i)return()=>i(n).matches;if(l!==null){const{matches:y}=l(n);return()=>y}return d},[d,n,l,c,i]),[p,g]=A.useMemo(()=>{if(i===null)return[d,()=>()=>{}];const y=i(n);return[()=>y.matches,b=>(y.addEventListener("change",b),()=>{y.removeEventListener("change",b)})]},[d,i,n]);return Ky(g,p,f)}function Jy(n={}){const{themeId:o}=n;return function(l,c={}){let d=Gy();d&&o&&(d=d[o]||d);const f=typeof window<"u"&&typeof window.matchMedia<"u",{defaultMatches:p=!1,matchMedia:g=f?window.matchMedia:null,ssrMatchMedia:m=null,noSsr:y=!1}=IE({name:"MuiUseMediaQuery",props:c,theme:d});let b=typeof l=="function"?l(d):l;return b=b.replace(/^@media( ?)/m,""),b.includes("print")&&console.warn(["MUI: You have provided a `print` query to the `useMediaQuery` hook.","Using the print media query to modify print styles can lead to unexpected results.","Consider using the `displayPrint` field in the `sx` prop instead.","More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print."].join(`
`)),(Ky!==void 0?GE:HE)(b,p,g,m,y)}}Jy();function VE(n,o=Number.MIN_SAFE_INTEGER,i=Number.MAX_SAFE_INTEGER){return Math.max(o,Math.min(n,i))}function Hd(n,o=0,i=1){return VE(n,o,i)}function YE(n){n=n.slice(1);const o=new RegExp(`.{1,${n.length>=6?2:1}}`,"g");let i=n.match(o);return i&&i[0].length===1&&(i=i.map(l=>l+l)),i?`rgb${i.length===4?"a":""}(${i.map((l,c)=>c<3?parseInt(l,16):Math.round(parseInt(l,16)/255*1e3)/1e3).join(", ")})`:""}function Ea(n){if(n.type)return n;if(n.charAt(0)==="#")return Ea(YE(n));const o=n.indexOf("("),i=n.substring(0,o);if(!["rgb","rgba","hsl","hsla","color"].includes(i))throw new Error(Wa(9,n));let l=n.substring(o+1,n.length-1),c;if(i==="color"){if(l=l.split(" "),c=l.shift(),l.length===4&&l[3].charAt(0)==="/"&&(l[3]=l[3].slice(1)),!["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].includes(c))throw new Error(Wa(10,c))}else l=l.split(",");return l=l.map(d=>parseFloat(d)),{type:i,values:l,colorSpace:c}}const WE=n=>{const o=Ea(n);return o.values.slice(0,3).map((i,l)=>o.type.includes("hsl")&&l!==0?`${i}%`:i).join(" ")},si=(n,o)=>{try{return WE(n)}catch{return n}};function ws(n){const{type:o,colorSpace:i}=n;let{values:l}=n;return o.includes("rgb")?l=l.map((c,d)=>d<3?parseInt(c,10):c):o.includes("hsl")&&(l[1]=`${l[1]}%`,l[2]=`${l[2]}%`),o.includes("color")?l=`${i} ${l.join(" ")}`:l=`${l.join(", ")}`,`${o}(${l})`}function ev(n){n=Ea(n);const{values:o}=n,i=o[0],l=o[1]/100,c=o[2]/100,d=l*Math.min(c,1-c),f=(m,y=(m+i/30)%12)=>c-d*Math.max(Math.min(y-3,9-y,1),-1);let p="rgb";const g=[Math.round(f(0)*255),Math.round(f(8)*255),Math.round(f(4)*255)];return n.type==="hsla"&&(p+="a",g.push(o[3])),ws({type:p,values:g})}function pd(n){n=Ea(n);let o=n.type==="hsl"||n.type==="hsla"?Ea(ev(n)).values:n.values;return o=o.map(i=>(n.type!=="color"&&(i/=255),i<=.03928?i/12.92:((i+.055)/1.055)**2.4)),Number((.2126*o[0]+.7152*o[1]+.0722*o[2]).toFixed(3))}function XE(n,o){const i=pd(n),l=pd(o);return(Math.max(i,l)+.05)/(Math.min(i,l)+.05)}function wt(n,o){return n=Ea(n),o=Hd(o),(n.type==="rgb"||n.type==="hsl")&&(n.type+="a"),n.type==="color"?n.values[3]=`/${o}`:n.values[3]=o,ws(n)}function Vl(n,o,i){try{return wt(n,o)}catch{return n}}function Fd(n,o){if(n=Ea(n),o=Hd(o),n.type.includes("hsl"))n.values[2]*=1-o;else if(n.type.includes("rgb")||n.type.includes("color"))for(let i=0;i<3;i+=1)n.values[i]*=1-o;return ws(n)}function Ue(n,o,i){try{return Fd(n,o)}catch{return n}}function Gd(n,o){if(n=Ea(n),o=Hd(o),n.type.includes("hsl"))n.values[2]+=(100-n.values[2])*o;else if(n.type.includes("rgb"))for(let i=0;i<3;i+=1)n.values[i]+=(255-n.values[i])*o;else if(n.type.includes("color"))for(let i=0;i<3;i+=1)n.values[i]+=(1-n.values[i])*o;return ws(n)}function $e(n,o,i){try{return Gd(n,o)}catch{return n}}function ZE(n,o=.15){return pd(n)>.5?Fd(n,o):Gd(n,o)}function Yl(n,o,i){try{return ZE(n,o)}catch{return n}}const QE=A.createContext(),KE=()=>A.useContext(QE)??!1,JE=A.createContext(void 0);function eA(n){const{theme:o,name:i,props:l}=n;if(!o||!o.components||!o.components[i])return l;const c=o.components[i];return c.defaultProps?yi(c.defaultProps,l):!c.styleOverrides&&!c.variants?yi(c,l):l}function tA({props:n,name:o}){const i=A.useContext(JE);return eA({props:n,name:o,theme:{components:i}})}const Th={theme:void 0};function nA(n){let o,i;return function(c){let d=o;return(d===void 0||c.theme!==i)&&(Th.theme=c.theme,d=Zy(n(Th)),o=d,i=c.theme),d}}function aA(n=""){function o(...l){if(!l.length)return"";const c=l[0];return typeof c=="string"&&!c.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/)?`, var(--${n?`${n}-`:""}${c}${o(...l.slice(1))})`:`, ${c}`}return(l,...c)=>`var(--${n?`${n}-`:""}${l}${o(...c)})`}const Ch=(n,o,i,l=[])=>{let c=n;o.forEach((d,f)=>{f===o.length-1?Array.isArray(c)?c[Number(d)]=i:c&&typeof c=="object"&&(c[d]=i):c&&typeof c=="object"&&(c[d]||(c[d]=l.includes(d)?[]:{}),c=c[d])})},rA=(n,o,i)=>{function l(c,d=[],f=[]){Object.entries(c).forEach(([p,g])=>{(!i||i&&!i([...d,p]))&&g!=null&&(typeof g=="object"&&Object.keys(g).length>0?l(g,[...d,p],Array.isArray(g)?[...f,p]:f):o([...d,p],g,f))})}l(n)},oA=(n,o)=>typeof o=="number"?["lineHeight","fontWeight","opacity","zIndex"].some(l=>n.includes(l))||n[n.length-1].toLowerCase().includes("opacity")?o:`${o}px`:o;function ad(n,o){const{prefix:i,shouldSkipGeneratingVar:l}=o||{},c={},d={},f={};return rA(n,(p,g,m)=>{if((typeof g=="string"||typeof g=="number")&&(!l||!l(p,g))){const y=`--${i?`${i}-`:""}${p.join("-")}`,b=oA(p,g);Object.assign(c,{[y]:b}),Ch(d,p,`var(${y})`,m),Ch(f,p,`var(${y}, ${b})`,m)}},p=>p[0]==="vars"),{css:c,vars:d,varsWithDefaults:f}}function iA(n,o={}){const{getSelector:i=z,disableCssColorScheme:l,colorSchemeSelector:c}=o,{colorSchemes:d={},components:f,defaultColorScheme:p="light",...g}=n,{vars:m,css:y,varsWithDefaults:b}=ad(g,o);let x=b;const D={},{[p]:M,...E}=d;if(Object.entries(E||{}).forEach(([T,R])=>{const{vars:w,css:_,varsWithDefaults:j}=ad(R,o);x=Vt(x,j),D[T]={css:_,vars:w}}),M){const{css:T,vars:R,varsWithDefaults:w}=ad(M,o);x=Vt(x,w),D[p]={css:T,vars:R}}function z(T,R){let w=c;if(c==="class"&&(w=".%s"),c==="data"&&(w="[data-%s]"),c?.startsWith("data-")&&!c.includes("%s")&&(w=`[${c}="%s"]`),T){if(w==="media")return n.defaultColorScheme===T?":root":{[`@media (prefers-color-scheme: ${d[T]?.palette?.mode||T})`]:{":root":R}};if(w)return n.defaultColorScheme===T?`:root, ${w.replace("%s",String(T))}`:w.replace("%s",String(T))}return":root"}return{vars:x,generateThemeVars:()=>{let T={...m};return Object.entries(D).forEach(([,{vars:R}])=>{T=Vt(T,R)}),T},generateStyleSheets:()=>{const T=[],R=n.defaultColorScheme||"light";function w(G,I){Object.keys(I).length&&T.push(typeof G=="string"?{[G]:{...I}}:G)}w(i(void 0,{...y}),y);const{[R]:_,...j}=D;if(_){const{css:G}=_,I=d[R]?.palette?.mode,S=!l&&I?{colorScheme:I,...G}:{...G};w(i(R,{...S}),S)}return Object.entries(j).forEach(([G,{css:I}])=>{const S=d[G]?.palette?.mode,Z=!l&&S?{colorScheme:S,...I}:{...I};w(i(G,{...Z}),Z)}),T}}}function lA(n){return function(i){return n==="media"?`@media (prefers-color-scheme: ${i})`:n?n.startsWith("data-")&&!n.includes("%s")?`[${n}="${i}"] &`:n==="class"?`.${i} &`:n==="data"?`[data-${i}] &`:`${n.replace("%s",i)} &`:"&"}}function ft(n,o,i=void 0){const l={};for(const c in n){const d=n[c];let f="",p=!0;for(let g=0;g<d.length;g+=1){const m=d[g];m&&(f+=(p===!0?"":" ")+o(m),p=!1,i&&i[m]&&(f+=" "+i[m]))}l[c]=f}return l}function sA(n,o){return A.isValidElement(n)&&o.indexOf(n.type.muiName??n.type?._payload?.value?.muiName)!==-1}const Ms="$$material",bi={black:"#000",white:"#fff"},cA={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},jr={50:"#f3e5f5",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",700:"#7b1fa2"},Ur={300:"#e57373",400:"#ef5350",500:"#f44336",700:"#d32f2f",800:"#c62828"},li={300:"#ffb74d",400:"#ffa726",500:"#ff9800",700:"#f57c00",900:"#e65100"},$r={50:"#e3f2fd",200:"#90caf9",400:"#42a5f5",700:"#1976d2",800:"#1565c0"},qr={300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",700:"#0288d1",900:"#01579b"},Pr={300:"#81c784",400:"#66bb6a",500:"#4caf50",700:"#388e3c",800:"#2e7d32",900:"#1b5e20"};function tv(){return{text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:bi.white,default:bi.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}}}const uA=tv();function nv(){return{text:{primary:bi.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:bi.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}}}const Rh=nv();function wh(n,o,i,l){const c=l.light||l,d=l.dark||l*1.5;n[o]||(n.hasOwnProperty(i)?n[o]=n[i]:o==="light"?n.light=Gd(n.main,c):o==="dark"&&(n.dark=Fd(n.main,d)))}function dA(n="light"){return n==="dark"?{main:$r[200],light:$r[50],dark:$r[400]}:{main:$r[700],light:$r[400],dark:$r[800]}}function fA(n="light"){return n==="dark"?{main:jr[200],light:jr[50],dark:jr[400]}:{main:jr[500],light:jr[300],dark:jr[700]}}function pA(n="light"){return n==="dark"?{main:Ur[500],light:Ur[300],dark:Ur[700]}:{main:Ur[700],light:Ur[400],dark:Ur[800]}}function mA(n="light"){return n==="dark"?{main:qr[400],light:qr[300],dark:qr[700]}:{main:qr[700],light:qr[500],dark:qr[900]}}function gA(n="light"){return n==="dark"?{main:Pr[400],light:Pr[300],dark:Pr[700]}:{main:Pr[800],light:Pr[500],dark:Pr[900]}}function hA(n="light"){return n==="dark"?{main:li[400],light:li[300],dark:li[700]}:{main:"#ed6c02",light:li[500],dark:li[900]}}function Vd(n){const{mode:o="light",contrastThreshold:i=3,tonalOffset:l=.2,...c}=n,d=n.primary||dA(o),f=n.secondary||fA(o),p=n.error||pA(o),g=n.info||mA(o),m=n.success||gA(o),y=n.warning||hA(o);function b(E){return XE(E,Rh.text.primary)>=i?Rh.text.primary:uA.text.primary}const x=({color:E,name:z,mainShade:O=500,lightShade:C=300,darkShade:T=700})=>{if(E={...E},!E.main&&E[O]&&(E.main=E[O]),!E.hasOwnProperty("main"))throw new Error(Wa(11,z?` (${z})`:"",O));if(typeof E.main!="string")throw new Error(Wa(12,z?` (${z})`:"",JSON.stringify(E.main)));return wh(E,"light",C,l),wh(E,"dark",T,l),E.contrastText||(E.contrastText=b(E.main)),E};let D;return o==="light"?D=tv():o==="dark"&&(D=nv()),Vt({common:{...bi},mode:o,primary:x({color:d,name:"primary"}),secondary:x({color:f,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:x({color:p,name:"error"}),warning:x({color:y,name:"warning"}),info:x({color:g,name:"info"}),success:x({color:m,name:"success"}),grey:cA,contrastThreshold:i,getContrastText:b,augmentColor:x,tonalOffset:l,...D},c)}function yA(n){const o={};return Object.entries(n).forEach(l=>{const[c,d]=l;typeof d=="object"&&(o[c]=`${d.fontStyle?`${d.fontStyle} `:""}${d.fontVariant?`${d.fontVariant} `:""}${d.fontWeight?`${d.fontWeight} `:""}${d.fontStretch?`${d.fontStretch} `:""}${d.fontSize||""}${d.lineHeight?`/${d.lineHeight} `:""}${d.fontFamily||""}`)}),o}function vA(n,o){return{toolbar:{minHeight:56,[n.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[n.up("sm")]:{minHeight:64}},...o}}function bA(n){return Math.round(n*1e5)/1e5}const Mh={textTransform:"uppercase"},Oh='"Roboto", "Helvetica", "Arial", sans-serif';function SA(n,o){const{fontFamily:i=Oh,fontSize:l=14,fontWeightLight:c=300,fontWeightRegular:d=400,fontWeightMedium:f=500,fontWeightBold:p=700,htmlFontSize:g=16,allVariants:m,pxToRem:y,...b}=typeof o=="function"?o(n):o,x=l/14,D=y||(z=>`${z/g*x}rem`),M=(z,O,C,T,R)=>({fontFamily:i,fontWeight:z,fontSize:D(O),lineHeight:C,...i===Oh?{letterSpacing:`${bA(T/O)}em`}:{},...R,...m}),E={h1:M(c,96,1.167,-1.5),h2:M(c,60,1.2,-.5),h3:M(d,48,1.167,0),h4:M(d,34,1.235,.25),h5:M(d,24,1.334,0),h6:M(f,20,1.6,.15),subtitle1:M(d,16,1.75,.15),subtitle2:M(f,14,1.57,.1),body1:M(d,16,1.5,.15),body2:M(d,14,1.43,.15),button:M(f,14,1.75,.4,Mh),caption:M(d,12,1.66,.4),overline:M(d,12,2.66,1,Mh),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return Vt({htmlFontSize:g,pxToRem:D,fontFamily:i,fontSize:l,fontWeightLight:c,fontWeightRegular:d,fontWeightMedium:f,fontWeightBold:p,...E},b,{clone:!1})}const xA=.2,EA=.14,AA=.12;function He(...n){return[`${n[0]}px ${n[1]}px ${n[2]}px ${n[3]}px rgba(0,0,0,${xA})`,`${n[4]}px ${n[5]}px ${n[6]}px ${n[7]}px rgba(0,0,0,${EA})`,`${n[8]}px ${n[9]}px ${n[10]}px ${n[11]}px rgba(0,0,0,${AA})`].join(",")}const TA=["none",He(0,2,1,-1,0,1,1,0,0,1,3,0),He(0,3,1,-2,0,2,2,0,0,1,5,0),He(0,3,3,-2,0,3,4,0,0,1,8,0),He(0,2,4,-1,0,4,5,0,0,1,10,0),He(0,3,5,-1,0,5,8,0,0,1,14,0),He(0,3,5,-1,0,6,10,0,0,1,18,0),He(0,4,5,-2,0,7,10,1,0,2,16,1),He(0,5,5,-3,0,8,10,1,0,3,14,2),He(0,5,6,-3,0,9,12,1,0,3,16,2),He(0,6,6,-3,0,10,14,1,0,4,18,3),He(0,6,7,-4,0,11,15,1,0,4,20,3),He(0,7,8,-4,0,12,17,2,0,5,22,4),He(0,7,8,-4,0,13,19,2,0,5,24,4),He(0,7,9,-4,0,14,21,2,0,5,26,4),He(0,8,9,-5,0,15,22,2,0,6,28,5),He(0,8,10,-5,0,16,24,2,0,6,30,5),He(0,8,11,-5,0,17,26,2,0,6,32,5),He(0,9,11,-5,0,18,28,2,0,7,34,6),He(0,9,12,-6,0,19,29,2,0,7,36,6),He(0,10,13,-6,0,20,31,3,0,8,38,7),He(0,10,13,-6,0,21,33,3,0,8,40,7),He(0,10,14,-6,0,22,35,3,0,8,42,7),He(0,11,14,-7,0,23,36,3,0,9,44,8),He(0,11,15,-7,0,24,38,3,0,9,46,8)],CA={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},RA={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function _h(n){return`${Math.round(n)}ms`}function wA(n){if(!n)return 0;const o=n/36;return Math.min(Math.round((4+15*o**.25+o/5)*10),3e3)}function MA(n){const o={...CA,...n.easing},i={...RA,...n.duration};return{getAutoHeightDuration:wA,create:(c=["all"],d={})=>{const{duration:f=i.standard,easing:p=o.easeInOut,delay:g=0,...m}=d;return(Array.isArray(c)?c:[c]).map(y=>`${y} ${typeof f=="string"?f:_h(f)} ${p} ${typeof g=="string"?g:_h(g)}`).join(",")},...n,easing:o,duration:i}}const OA={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500};function _A(n){return Sn(n)||typeof n>"u"||typeof n=="string"||typeof n=="boolean"||typeof n=="number"||Array.isArray(n)}function av(n={}){const o={...n};function i(l){const c=Object.entries(l);for(let d=0;d<c.length;d++){const[f,p]=c[d];!_A(p)||f.startsWith("unstable_")?delete l[f]:Sn(p)&&(l[f]={...p},i(l[f]))}}return i(o),`import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(o,null,2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`}function md(n={},...o){const{breakpoints:i,mixins:l={},spacing:c,palette:d={},transitions:f={},typography:p={},shape:g,...m}=n;if(n.vars&&n.generateThemeVars===void 0)throw new Error(Wa(20));const y=Vd(d),b=Id(n);let x=Vt(b,{mixins:vA(b.breakpoints,l),palette:y,shadows:TA.slice(),typography:SA(y,p),transitions:MA(f),zIndex:{...OA}});return x=Vt(x,m),x=o.reduce((D,M)=>Vt(D,M),x),x.unstable_sxConfig={...Mi,...m?.unstable_sxConfig},x.unstable_sx=function(M){return Xa({sx:M,theme:this})},x.toRuntimeSource=av,x}function gd(n){let o;return n<1?o=5.11916*n**2:o=4.5*Math.log(n+1)+2,Math.round(o*10)/1e3}const BA=[...Array(25)].map((n,o)=>{if(o===0)return"none";const i=gd(o);return`linear-gradient(rgba(255 255 255 / ${i}), rgba(255 255 255 / ${i}))`});function rv(n){return{inputPlaceholder:n==="dark"?.5:.42,inputUnderline:n==="dark"?.7:.42,switchTrackDisabled:n==="dark"?.2:.12,switchTrack:n==="dark"?.3:.38}}function ov(n){return n==="dark"?BA:[]}function DA(n){const{palette:o={mode:"light"},opacity:i,overlays:l,...c}=n,d=Vd(o);return{palette:d,opacity:{...rv(d.mode),...i},overlays:l||ov(d.mode),...c}}function NA(n){return!!n[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/)||!!n[0].match(/sxConfig$/)||n[0]==="palette"&&!!n[1]?.match(/(mode|contrastThreshold|tonalOffset)/)}const zA=n=>[...[...Array(25)].map((o,i)=>`--${n?`${n}-`:""}overlays-${i}`),`--${n?`${n}-`:""}palette-AppBar-darkBg`,`--${n?`${n}-`:""}palette-AppBar-darkColor`],LA=n=>(o,i)=>{const l=n.rootSelector||":root",c=n.colorSchemeSelector;let d=c;if(c==="class"&&(d=".%s"),c==="data"&&(d="[data-%s]"),c?.startsWith("data-")&&!c.includes("%s")&&(d=`[${c}="%s"]`),n.defaultColorScheme===o){if(o==="dark"){const f={};return zA(n.cssVarPrefix).forEach(p=>{f[p]=i[p],delete i[p]}),d==="media"?{[l]:i,"@media (prefers-color-scheme: dark)":{[l]:f}}:d?{[d.replace("%s",o)]:f,[`${l}, ${d.replace("%s",o)}`]:i}:{[l]:{...i,...f}}}if(d&&d!=="media")return`${l}, ${d.replace("%s",String(o))}`}else if(o){if(d==="media")return{[`@media (prefers-color-scheme: ${String(o)})`]:{[l]:i}};if(d)return d.replace("%s",String(o))}return l};function kA(n,o){o.forEach(i=>{n[i]||(n[i]={})})}function V(n,o,i){!n[o]&&i&&(n[o]=i)}function ci(n){return typeof n!="string"||!n.startsWith("hsl")?n:ev(n)}function Fn(n,o){`${o}Channel`in n||(n[`${o}Channel`]=si(ci(n[o])))}function jA(n){return typeof n=="number"?`${n}px`:typeof n=="string"||typeof n=="function"||Array.isArray(n)?n:"8px"}const yn=n=>{try{return n()}catch{}},UA=(n="mui")=>aA(n);function rd(n,o,i,l){if(!o)return;o=o===!0?{}:o;const c=l==="dark"?"dark":"light";if(!i){n[l]=DA({...o,palette:{mode:c,...o?.palette}});return}const{palette:d,...f}=md({...i,palette:{mode:c,...o?.palette}});return n[l]={...o,palette:d,opacity:{...rv(c),...o?.opacity},overlays:o?.overlays||ov(c)},f}function $A(n={},...o){const{colorSchemes:i={light:!0},defaultColorScheme:l,disableCssColorScheme:c=!1,cssVarPrefix:d="mui",shouldSkipGeneratingVar:f=NA,colorSchemeSelector:p=i.light&&i.dark?"media":void 0,rootSelector:g=":root",...m}=n,y=Object.keys(i)[0],b=l||(i.light&&y!=="light"?"light":y),x=UA(d),{[b]:D,light:M,dark:E,...z}=i,O={...z};let C=D;if((b==="dark"&&!("dark"in i)||b==="light"&&!("light"in i))&&(C=!0),!C)throw new Error(Wa(21,b));const T=rd(O,C,m,b);M&&!O.light&&rd(O,M,void 0,"light"),E&&!O.dark&&rd(O,E,void 0,"dark");let R={defaultColorScheme:b,...T,cssVarPrefix:d,colorSchemeSelector:p,rootSelector:g,getCssVar:x,colorSchemes:O,font:{...yA(T.typography),...T.font},spacing:jA(m.spacing)};Object.keys(R.colorSchemes).forEach(I=>{const S=R.colorSchemes[I].palette,Z=te=>{const ie=te.split("-"),re=ie[1],le=ie[2];return x(te,S[re][le])};if(S.mode==="light"&&(V(S.common,"background","#fff"),V(S.common,"onBackground","#000")),S.mode==="dark"&&(V(S.common,"background","#000"),V(S.common,"onBackground","#fff")),kA(S,["Alert","AppBar","Avatar","Button","Chip","FilledInput","LinearProgress","Skeleton","Slider","SnackbarContent","SpeedDialAction","StepConnector","StepContent","Switch","TableCell","Tooltip"]),S.mode==="light"){V(S.Alert,"errorColor",Ue(S.error.light,.6)),V(S.Alert,"infoColor",Ue(S.info.light,.6)),V(S.Alert,"successColor",Ue(S.success.light,.6)),V(S.Alert,"warningColor",Ue(S.warning.light,.6)),V(S.Alert,"errorFilledBg",Z("palette-error-main")),V(S.Alert,"infoFilledBg",Z("palette-info-main")),V(S.Alert,"successFilledBg",Z("palette-success-main")),V(S.Alert,"warningFilledBg",Z("palette-warning-main")),V(S.Alert,"errorFilledColor",yn(()=>S.getContrastText(S.error.main))),V(S.Alert,"infoFilledColor",yn(()=>S.getContrastText(S.info.main))),V(S.Alert,"successFilledColor",yn(()=>S.getContrastText(S.success.main))),V(S.Alert,"warningFilledColor",yn(()=>S.getContrastText(S.warning.main))),V(S.Alert,"errorStandardBg",$e(S.error.light,.9)),V(S.Alert,"infoStandardBg",$e(S.info.light,.9)),V(S.Alert,"successStandardBg",$e(S.success.light,.9)),V(S.Alert,"warningStandardBg",$e(S.warning.light,.9)),V(S.Alert,"errorIconColor",Z("palette-error-main")),V(S.Alert,"infoIconColor",Z("palette-info-main")),V(S.Alert,"successIconColor",Z("palette-success-main")),V(S.Alert,"warningIconColor",Z("palette-warning-main")),V(S.AppBar,"defaultBg",Z("palette-grey-100")),V(S.Avatar,"defaultBg",Z("palette-grey-400")),V(S.Button,"inheritContainedBg",Z("palette-grey-300")),V(S.Button,"inheritContainedHoverBg",Z("palette-grey-A100")),V(S.Chip,"defaultBorder",Z("palette-grey-400")),V(S.Chip,"defaultAvatarColor",Z("palette-grey-700")),V(S.Chip,"defaultIconColor",Z("palette-grey-700")),V(S.FilledInput,"bg","rgba(0, 0, 0, 0.06)"),V(S.FilledInput,"hoverBg","rgba(0, 0, 0, 0.09)"),V(S.FilledInput,"disabledBg","rgba(0, 0, 0, 0.12)"),V(S.LinearProgress,"primaryBg",$e(S.primary.main,.62)),V(S.LinearProgress,"secondaryBg",$e(S.secondary.main,.62)),V(S.LinearProgress,"errorBg",$e(S.error.main,.62)),V(S.LinearProgress,"infoBg",$e(S.info.main,.62)),V(S.LinearProgress,"successBg",$e(S.success.main,.62)),V(S.LinearProgress,"warningBg",$e(S.warning.main,.62)),V(S.Skeleton,"bg",`rgba(${Z("palette-text-primaryChannel")} / 0.11)`),V(S.Slider,"primaryTrack",$e(S.primary.main,.62)),V(S.Slider,"secondaryTrack",$e(S.secondary.main,.62)),V(S.Slider,"errorTrack",$e(S.error.main,.62)),V(S.Slider,"infoTrack",$e(S.info.main,.62)),V(S.Slider,"successTrack",$e(S.success.main,.62)),V(S.Slider,"warningTrack",$e(S.warning.main,.62));const te=Yl(S.background.default,.8);V(S.SnackbarContent,"bg",te),V(S.SnackbarContent,"color",yn(()=>S.getContrastText(te))),V(S.SpeedDialAction,"fabHoverBg",Yl(S.background.paper,.15)),V(S.StepConnector,"border",Z("palette-grey-400")),V(S.StepContent,"border",Z("palette-grey-400")),V(S.Switch,"defaultColor",Z("palette-common-white")),V(S.Switch,"defaultDisabledColor",Z("palette-grey-100")),V(S.Switch,"primaryDisabledColor",$e(S.primary.main,.62)),V(S.Switch,"secondaryDisabledColor",$e(S.secondary.main,.62)),V(S.Switch,"errorDisabledColor",$e(S.error.main,.62)),V(S.Switch,"infoDisabledColor",$e(S.info.main,.62)),V(S.Switch,"successDisabledColor",$e(S.success.main,.62)),V(S.Switch,"warningDisabledColor",$e(S.warning.main,.62)),V(S.TableCell,"border",$e(Vl(S.divider,1),.88)),V(S.Tooltip,"bg",Vl(S.grey[700],.92))}if(S.mode==="dark"){V(S.Alert,"errorColor",$e(S.error.light,.6)),V(S.Alert,"infoColor",$e(S.info.light,.6)),V(S.Alert,"successColor",$e(S.success.light,.6)),V(S.Alert,"warningColor",$e(S.warning.light,.6)),V(S.Alert,"errorFilledBg",Z("palette-error-dark")),V(S.Alert,"infoFilledBg",Z("palette-info-dark")),V(S.Alert,"successFilledBg",Z("palette-success-dark")),V(S.Alert,"warningFilledBg",Z("palette-warning-dark")),V(S.Alert,"errorFilledColor",yn(()=>S.getContrastText(S.error.dark))),V(S.Alert,"infoFilledColor",yn(()=>S.getContrastText(S.info.dark))),V(S.Alert,"successFilledColor",yn(()=>S.getContrastText(S.success.dark))),V(S.Alert,"warningFilledColor",yn(()=>S.getContrastText(S.warning.dark))),V(S.Alert,"errorStandardBg",Ue(S.error.light,.9)),V(S.Alert,"infoStandardBg",Ue(S.info.light,.9)),V(S.Alert,"successStandardBg",Ue(S.success.light,.9)),V(S.Alert,"warningStandardBg",Ue(S.warning.light,.9)),V(S.Alert,"errorIconColor",Z("palette-error-main")),V(S.Alert,"infoIconColor",Z("palette-info-main")),V(S.Alert,"successIconColor",Z("palette-success-main")),V(S.Alert,"warningIconColor",Z("palette-warning-main")),V(S.AppBar,"defaultBg",Z("palette-grey-900")),V(S.AppBar,"darkBg",Z("palette-background-paper")),V(S.AppBar,"darkColor",Z("palette-text-primary")),V(S.Avatar,"defaultBg",Z("palette-grey-600")),V(S.Button,"inheritContainedBg",Z("palette-grey-800")),V(S.Button,"inheritContainedHoverBg",Z("palette-grey-700")),V(S.Chip,"defaultBorder",Z("palette-grey-700")),V(S.Chip,"defaultAvatarColor",Z("palette-grey-300")),V(S.Chip,"defaultIconColor",Z("palette-grey-300")),V(S.FilledInput,"bg","rgba(255, 255, 255, 0.09)"),V(S.FilledInput,"hoverBg","rgba(255, 255, 255, 0.13)"),V(S.FilledInput,"disabledBg","rgba(255, 255, 255, 0.12)"),V(S.LinearProgress,"primaryBg",Ue(S.primary.main,.5)),V(S.LinearProgress,"secondaryBg",Ue(S.secondary.main,.5)),V(S.LinearProgress,"errorBg",Ue(S.error.main,.5)),V(S.LinearProgress,"infoBg",Ue(S.info.main,.5)),V(S.LinearProgress,"successBg",Ue(S.success.main,.5)),V(S.LinearProgress,"warningBg",Ue(S.warning.main,.5)),V(S.Skeleton,"bg",`rgba(${Z("palette-text-primaryChannel")} / 0.13)`),V(S.Slider,"primaryTrack",Ue(S.primary.main,.5)),V(S.Slider,"secondaryTrack",Ue(S.secondary.main,.5)),V(S.Slider,"errorTrack",Ue(S.error.main,.5)),V(S.Slider,"infoTrack",Ue(S.info.main,.5)),V(S.Slider,"successTrack",Ue(S.success.main,.5)),V(S.Slider,"warningTrack",Ue(S.warning.main,.5));const te=Yl(S.background.default,.98);V(S.SnackbarContent,"bg",te),V(S.SnackbarContent,"color",yn(()=>S.getContrastText(te))),V(S.SpeedDialAction,"fabHoverBg",Yl(S.background.paper,.15)),V(S.StepConnector,"border",Z("palette-grey-600")),V(S.StepContent,"border",Z("palette-grey-600")),V(S.Switch,"defaultColor",Z("palette-grey-300")),V(S.Switch,"defaultDisabledColor",Z("palette-grey-600")),V(S.Switch,"primaryDisabledColor",Ue(S.primary.main,.55)),V(S.Switch,"secondaryDisabledColor",Ue(S.secondary.main,.55)),V(S.Switch,"errorDisabledColor",Ue(S.error.main,.55)),V(S.Switch,"infoDisabledColor",Ue(S.info.main,.55)),V(S.Switch,"successDisabledColor",Ue(S.success.main,.55)),V(S.Switch,"warningDisabledColor",Ue(S.warning.main,.55)),V(S.TableCell,"border",Ue(Vl(S.divider,1),.68)),V(S.Tooltip,"bg",Vl(S.grey[700],.92))}Fn(S.background,"default"),Fn(S.background,"paper"),Fn(S.common,"background"),Fn(S.common,"onBackground"),Fn(S,"divider"),Object.keys(S).forEach(te=>{const ie=S[te];te!=="tonalOffset"&&ie&&typeof ie=="object"&&(ie.main&&V(S[te],"mainChannel",si(ci(ie.main))),ie.light&&V(S[te],"lightChannel",si(ci(ie.light))),ie.dark&&V(S[te],"darkChannel",si(ci(ie.dark))),ie.contrastText&&V(S[te],"contrastTextChannel",si(ci(ie.contrastText))),te==="text"&&(Fn(S[te],"primary"),Fn(S[te],"secondary")),te==="action"&&(ie.active&&Fn(S[te],"active"),ie.selected&&Fn(S[te],"selected")))})}),R=o.reduce((I,S)=>Vt(I,S),R);const w={prefix:d,disableCssColorScheme:c,shouldSkipGeneratingVar:f,getSelector:LA(R)},{vars:_,generateThemeVars:j,generateStyleSheets:G}=iA(R,w);return R.vars=_,Object.entries(R.colorSchemes[R.defaultColorScheme]).forEach(([I,S])=>{R[I]=S}),R.generateThemeVars=j,R.generateStyleSheets=G,R.generateSpacing=function(){return Fy(m.spacing,qd(this))},R.getColorSchemeSelector=lA(p),R.spacing=R.generateSpacing(),R.shouldSkipGeneratingVar=f,R.unstable_sxConfig={...Mi,...m?.unstable_sxConfig},R.unstable_sx=function(S){return Xa({sx:S,theme:this})},R.toRuntimeSource=av,R}function Bh(n,o,i){n.colorSchemes&&i&&(n.colorSchemes[o]={...i!==!0&&i,palette:Vd({...i===!0?{}:i.palette,mode:o})})}function iv(n={},...o){const{palette:i,cssVariables:l=!1,colorSchemes:c=i?void 0:{light:!0},defaultColorScheme:d=i?.mode,...f}=n,p=d||"light",g=c?.[p],m={...c,...i?{[p]:{...typeof g!="boolean"&&g,palette:i}}:void 0};if(l===!1){if(!("colorSchemes"in n))return md(n,...o);let y=i;"palette"in n||m[p]&&(m[p]!==!0?y=m[p].palette:p==="dark"&&(y={mode:"dark"}));const b=md({...n,palette:y},...o);return b.defaultColorScheme=p,b.colorSchemes=m,b.palette.mode==="light"&&(b.colorSchemes.light={...m.light!==!0&&m.light,palette:b.palette},Bh(b,"dark",m.dark)),b.palette.mode==="dark"&&(b.colorSchemes.dark={...m.dark!==!0&&m.dark,palette:b.palette},Bh(b,"light",m.light)),b}return!i&&!("light"in m)&&p==="light"&&(m.light=!0),$A({...f,colorSchemes:m,defaultColorScheme:p,...typeof l!="boolean"&&l},...o)}const lv=iv();function no(){const n=Vy(lv);return n[Ms]||n}function qA(n){return n!=="ownerState"&&n!=="theme"&&n!=="sx"&&n!=="as"}const Os=n=>qA(n)&&n!=="classes",Re=jE({themeId:Ms,defaultTheme:lv,rootShouldForwardProp:Os}),PA=at("MuiBox",["root"]),IA=iv(),Pe=DE({themeId:Ms,defaultTheme:IA,defaultClassName:PA.root,generateClassName:Wy.generate});function Za(n){return n&&n.ownerDocument||document}function Qr(n){return Za(n).defaultView||window}function HA(n=window){const o=n.document.documentElement.clientWidth;return n.innerWidth-o}function FA(n){const o=Za(n);return o.body===n?Qr(n).innerWidth>o.documentElement.clientWidth:n.scrollHeight>n.clientHeight}function fi(n,o){o?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden")}function Dh(n){return parseInt(Qr(n).getComputedStyle(n).paddingRight,10)||0}function GA(n){const i=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].includes(n.tagName),l=n.tagName==="INPUT"&&n.getAttribute("type")==="hidden";return i||l}function Nh(n,o,i,l,c){const d=[o,i,...l];[].forEach.call(n.children,f=>{const p=!d.includes(f),g=!GA(f);p&&g&&fi(f,c)})}function od(n,o){let i=-1;return n.some((l,c)=>o(l)?(i=c,!0):!1),i}function VA(n,o){const i=[],l=n.container;if(!o.disableScrollLock){if(FA(l)){const f=HA(Qr(l));i.push({value:l.style.paddingRight,property:"padding-right",el:l}),l.style.paddingRight=`${Dh(l)+f}px`;const p=Za(l).querySelectorAll(".mui-fixed");[].forEach.call(p,g=>{i.push({value:g.style.paddingRight,property:"padding-right",el:g}),g.style.paddingRight=`${Dh(g)+f}px`})}let d;if(l.parentNode instanceof DocumentFragment)d=Za(l).body;else{const f=l.parentElement,p=Qr(l);d=f?.nodeName==="HTML"&&p.getComputedStyle(f).overflowY==="scroll"?f:l}i.push({value:d.style.overflow,property:"overflow",el:d},{value:d.style.overflowX,property:"overflow-x",el:d},{value:d.style.overflowY,property:"overflow-y",el:d}),d.style.overflow="hidden"}return()=>{i.forEach(({value:d,el:f,property:p})=>{d?f.style.setProperty(p,d):f.style.removeProperty(p)})}}function YA(n){const o=[];return[].forEach.call(n.children,i=>{i.getAttribute("aria-hidden")==="true"&&o.push(i)}),o}class WA{constructor(){this.modals=[],this.containers=[]}add(o,i){let l=this.modals.indexOf(o);if(l!==-1)return l;l=this.modals.length,this.modals.push(o),o.modalRef&&fi(o.modalRef,!1);const c=YA(i);Nh(i,o.mount,o.modalRef,c,!0);const d=od(this.containers,f=>f.container===i);return d!==-1?(this.containers[d].modals.push(o),l):(this.containers.push({modals:[o],container:i,restore:null,hiddenSiblings:c}),l)}mount(o,i){const l=od(this.containers,d=>d.modals.includes(o)),c=this.containers[l];c.restore||(c.restore=VA(c,i))}remove(o,i=!0){const l=this.modals.indexOf(o);if(l===-1)return l;const c=od(this.containers,f=>f.modals.includes(o)),d=this.containers[c];if(d.modals.splice(d.modals.indexOf(o),1),this.modals.splice(l,1),d.modals.length===0)d.restore&&d.restore(),o.modalRef&&fi(o.modalRef,i),Nh(d.container,o.mount,o.modalRef,d.hiddenSiblings,!1),this.containers.splice(c,1);else{const f=d.modals[d.modals.length-1];f.modalRef&&fi(f.modalRef,!1)}return l}isTopModal(o){return this.modals.length>0&&this.modals[this.modals.length-1]===o}}function An(...n){const o=A.useRef(void 0),i=A.useCallback(l=>{const c=n.map(d=>{if(d==null)return null;if(typeof d=="function"){const f=d,p=f(l);return typeof p=="function"?p:()=>{f(null)}}return d.current=l,()=>{d.current=null}});return()=>{c.forEach(d=>d?.())}},n);return A.useMemo(()=>n.every(l=>l==null)?null:l=>{o.current&&(o.current(),o.current=void 0),l!=null&&(o.current=i(l))},n)}function _s(n){return parseInt(A.version,10)>=19?n?.props?.ref||null:n?.ref||null}const XA=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function ZA(n){const o=parseInt(n.getAttribute("tabindex")||"",10);return Number.isNaN(o)?n.contentEditable==="true"||(n.nodeName==="AUDIO"||n.nodeName==="VIDEO"||n.nodeName==="DETAILS")&&n.getAttribute("tabindex")===null?0:n.tabIndex:o}function QA(n){if(n.tagName!=="INPUT"||n.type!=="radio"||!n.name)return!1;const o=l=>n.ownerDocument.querySelector(`input[type="radio"]${l}`);let i=o(`[name="${n.name}"]:checked`);return i||(i=o(`[name="${n.name}"]`)),i!==n}function KA(n){return!(n.disabled||n.tagName==="INPUT"&&n.type==="hidden"||QA(n))}function JA(n){const o=[],i=[];return Array.from(n.querySelectorAll(XA)).forEach((l,c)=>{const d=ZA(l);d===-1||!KA(l)||(d===0?o.push(l):i.push({documentOrder:c,tabIndex:d,node:l}))}),i.sort((l,c)=>l.tabIndex===c.tabIndex?l.documentOrder-c.documentOrder:l.tabIndex-c.tabIndex).map(l=>l.node).concat(o)}function eT(){return!0}function tT(n){const{children:o,disableAutoFocus:i=!1,disableEnforceFocus:l=!1,disableRestoreFocus:c=!1,getTabbable:d=JA,isEnabled:f=eT,open:p}=n,g=A.useRef(!1),m=A.useRef(null),y=A.useRef(null),b=A.useRef(null),x=A.useRef(null),D=A.useRef(!1),M=A.useRef(null),E=An(_s(o),M),z=A.useRef(null);A.useEffect(()=>{!p||!M.current||(D.current=!i)},[i,p]),A.useEffect(()=>{if(!p||!M.current)return;const T=Za(M.current);return M.current.contains(T.activeElement)||(M.current.hasAttribute("tabIndex")||M.current.setAttribute("tabIndex","-1"),D.current&&M.current.focus()),()=>{c||(b.current&&b.current.focus&&(g.current=!0,b.current.focus()),b.current=null)}},[p]),A.useEffect(()=>{if(!p||!M.current)return;const T=Za(M.current),R=j=>{z.current=j,!(l||!f()||j.key!=="Tab")&&T.activeElement===M.current&&j.shiftKey&&(g.current=!0,y.current&&y.current.focus())},w=()=>{const j=M.current;if(j===null)return;if(!T.hasFocus()||!f()||g.current){g.current=!1;return}if(j.contains(T.activeElement)||l&&T.activeElement!==m.current&&T.activeElement!==y.current)return;if(T.activeElement!==x.current)x.current=null;else if(x.current!==null)return;if(!D.current)return;let G=[];if((T.activeElement===m.current||T.activeElement===y.current)&&(G=d(M.current)),G.length>0){const I=!!(z.current?.shiftKey&&z.current?.key==="Tab"),S=G[0],Z=G[G.length-1];typeof S!="string"&&typeof Z!="string"&&(I?Z.focus():S.focus())}else j.focus()};T.addEventListener("focusin",w),T.addEventListener("keydown",R,!0);const _=setInterval(()=>{T.activeElement&&T.activeElement.tagName==="BODY"&&w()},50);return()=>{clearInterval(_),T.removeEventListener("focusin",w),T.removeEventListener("keydown",R,!0)}},[i,l,c,f,p,d]);const O=T=>{b.current===null&&(b.current=T.relatedTarget),D.current=!0,x.current=T.target;const R=o.props.onFocus;R&&R(T)},C=T=>{b.current===null&&(b.current=T.relatedTarget),D.current=!0};return k.jsxs(A.Fragment,{children:[k.jsx("div",{tabIndex:p?0:-1,onFocus:C,ref:m,"data-testid":"sentinelStart"}),A.cloneElement(o,{ref:E,onFocus:O}),k.jsx("div",{tabIndex:p?0:-1,onFocus:C,ref:y,"data-testid":"sentinelEnd"})]})}function zh(n,o){typeof n=="function"?n(o):n&&(n.current=o)}function nT(n){return typeof n=="function"?n():n}const aT=A.forwardRef(function(o,i){const{children:l,container:c,disablePortal:d=!1}=o,[f,p]=A.useState(null),g=An(A.isValidElement(l)?_s(l):null,i);if(vi(()=>{d||p(nT(c)||document.body)},[c,d]),vi(()=>{if(f&&!d)return zh(i,f),()=>{zh(i,null)}},[i,f,d]),d){if(A.isValidElement(l)){const m={ref:g};return A.cloneElement(l,m)}return l}return f&&Cy.createPortal(l,f)});function rT(){return Yy}const yt=nA;function lt(n){return tA(n)}function oT(n){return typeof n=="string"}function iT(n,o,i){return n===void 0||oT(n)?o:{...o,ownerState:{...o.ownerState,...i}}}function lT(n,o,i){return typeof n=="function"?n(o,i):n}function sv(n,o=[]){if(n===void 0)return{};const i={};return Object.keys(n).filter(l=>l.match(/^on[A-Z]/)&&typeof n[l]=="function"&&!o.includes(l)).forEach(l=>{i[l]=n[l]}),i}function Lh(n){if(n===void 0)return{};const o={};return Object.keys(n).filter(i=>!(i.match(/^on[A-Z]/)&&typeof n[i]=="function")).forEach(i=>{o[i]=n[i]}),o}function sT(n){const{getSlotProps:o,additionalProps:i,externalSlotProps:l,externalForwardedProps:c,className:d}=n;if(!o){const D=Se(i?.className,d,c?.className,l?.className),M={...i?.style,...c?.style,...l?.style},E={...i,...c,...l};return D.length>0&&(E.className=D),Object.keys(M).length>0&&(E.style=M),{props:E,internalRef:void 0}}const f=sv({...c,...l}),p=Lh(l),g=Lh(c),m=o(f),y=Se(m?.className,i?.className,d,c?.className,l?.className),b={...m?.style,...i?.style,...c?.style,...l?.style},x={...m,...i,...g,...p};return y.length>0&&(x.className=y),Object.keys(b).length>0&&(x.style=b),{props:x,internalRef:m.ref}}function cn(n,o){const{className:i,elementType:l,ownerState:c,externalForwardedProps:d,internalForwardedProps:f,shouldForwardComponentProp:p=!1,...g}=o,{component:m,slots:y={[n]:void 0},slotProps:b={[n]:void 0},...x}=d,D=y[n]||l,M=lT(b[n],c),{props:{component:E,...z},internalRef:O}=sT({className:i,...g,externalForwardedProps:n==="root"?x:void 0,externalSlotProps:M}),C=An(O,M?.ref,o.ref),T=n==="root"?E||m:E,R=iT(D,{...n==="root"&&!m&&!y[n]&&f,...n!=="root"&&!y[n]&&f,...z,...T&&!p&&{as:T},...T&&p&&{component:T},ref:C},c);return[D,R]}function cv(n,o){if(n==null)return{};var i={};for(var l in n)if({}.hasOwnProperty.call(n,l)){if(o.indexOf(l)!==-1)continue;i[l]=n[l]}return i}function hd(n,o){return hd=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,l){return i.__proto__=l,i},hd(n,o)}function uv(n,o){n.prototype=Object.create(o.prototype),n.prototype.constructor=n,hd(n,o)}const kh={disabled:!1},us=Ft.createContext(null);var cT=function(o){return o.scrollTop},ui="unmounted",Ga="exited",Va="entering",Fr="entered",yd="exiting",wn=function(n){uv(o,n);function o(l,c){var d;d=n.call(this,l,c)||this;var f=c,p=f&&!f.isMounting?l.enter:l.appear,g;return d.appearStatus=null,l.in?p?(g=Ga,d.appearStatus=Va):g=Fr:l.unmountOnExit||l.mountOnEnter?g=ui:g=Ga,d.state={status:g},d.nextCallback=null,d}o.getDerivedStateFromProps=function(c,d){var f=c.in;return f&&d.status===ui?{status:Ga}:null};var i=o.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(c){var d=null;if(c!==this.props){var f=this.state.status;this.props.in?f!==Va&&f!==Fr&&(d=Va):(f===Va||f===Fr)&&(d=yd)}this.updateStatus(!1,d)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var c=this.props.timeout,d,f,p;return d=f=p=c,c!=null&&typeof c!="number"&&(d=c.exit,f=c.enter,p=c.appear!==void 0?c.appear:f),{exit:d,enter:f,appear:p}},i.updateStatus=function(c,d){if(c===void 0&&(c=!1),d!==null)if(this.cancelNextCallback(),d===Va){if(this.props.unmountOnExit||this.props.mountOnEnter){var f=this.props.nodeRef?this.props.nodeRef.current:Fl.findDOMNode(this);f&&cT(f)}this.performEnter(c)}else this.performExit();else this.props.unmountOnExit&&this.state.status===Ga&&this.setState({status:ui})},i.performEnter=function(c){var d=this,f=this.props.enter,p=this.context?this.context.isMounting:c,g=this.props.nodeRef?[p]:[Fl.findDOMNode(this),p],m=g[0],y=g[1],b=this.getTimeouts(),x=p?b.appear:b.enter;if(!c&&!f||kh.disabled){this.safeSetState({status:Fr},function(){d.props.onEntered(m)});return}this.props.onEnter(m,y),this.safeSetState({status:Va},function(){d.props.onEntering(m,y),d.onTransitionEnd(x,function(){d.safeSetState({status:Fr},function(){d.props.onEntered(m,y)})})})},i.performExit=function(){var c=this,d=this.props.exit,f=this.getTimeouts(),p=this.props.nodeRef?void 0:Fl.findDOMNode(this);if(!d||kh.disabled){this.safeSetState({status:Ga},function(){c.props.onExited(p)});return}this.props.onExit(p),this.safeSetState({status:yd},function(){c.props.onExiting(p),c.onTransitionEnd(f.exit,function(){c.safeSetState({status:Ga},function(){c.props.onExited(p)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(c,d){d=this.setNextCallback(d),this.setState(c,d)},i.setNextCallback=function(c){var d=this,f=!0;return this.nextCallback=function(p){f&&(f=!1,d.nextCallback=null,c(p))},this.nextCallback.cancel=function(){f=!1},this.nextCallback},i.onTransitionEnd=function(c,d){this.setNextCallback(d);var f=this.props.nodeRef?this.props.nodeRef.current:Fl.findDOMNode(this),p=c==null&&!this.props.addEndListener;if(!f||p){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var g=this.props.nodeRef?[this.nextCallback]:[f,this.nextCallback],m=g[0],y=g[1];this.props.addEndListener(m,y)}c!=null&&setTimeout(this.nextCallback,c)},i.render=function(){var c=this.state.status;if(c===ui)return null;var d=this.props,f=d.children;d.in,d.mountOnEnter,d.unmountOnExit,d.appear,d.enter,d.exit,d.timeout,d.addEndListener,d.onEnter,d.onEntering,d.onEntered,d.onExit,d.onExiting,d.onExited,d.nodeRef;var p=cv(d,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return Ft.createElement(us.Provider,{value:null},typeof f=="function"?f(c,p):Ft.cloneElement(Ft.Children.only(f),p))},o}(Ft.Component);wn.contextType=us;wn.propTypes={};function Ir(){}wn.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:Ir,onEntering:Ir,onEntered:Ir,onExit:Ir,onExiting:Ir,onExited:Ir};wn.UNMOUNTED=ui;wn.EXITED=Ga;wn.ENTERING=Va;wn.ENTERED=Fr;wn.EXITING=yd;function uT(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Yd(n,o){var i=function(d){return o&&A.isValidElement(d)?o(d):d},l=Object.create(null);return n&&A.Children.map(n,function(c){return c}).forEach(function(c){l[c.key]=i(c)}),l}function dT(n,o){n=n||{},o=o||{};function i(y){return y in o?o[y]:n[y]}var l=Object.create(null),c=[];for(var d in n)d in o?c.length&&(l[d]=c,c=[]):c.push(d);var f,p={};for(var g in o){if(l[g])for(f=0;f<l[g].length;f++){var m=l[g][f];p[l[g][f]]=i(m)}p[g]=i(g)}for(f=0;f<c.length;f++)p[c[f]]=i(c[f]);return p}function Ya(n,o,i){return i[o]!=null?i[o]:n.props[o]}function fT(n,o){return Yd(n.children,function(i){return A.cloneElement(i,{onExited:o.bind(null,i),in:!0,appear:Ya(i,"appear",n),enter:Ya(i,"enter",n),exit:Ya(i,"exit",n)})})}function pT(n,o,i){var l=Yd(n.children),c=dT(o,l);return Object.keys(c).forEach(function(d){var f=c[d];if(A.isValidElement(f)){var p=d in o,g=d in l,m=o[d],y=A.isValidElement(m)&&!m.props.in;g&&(!p||y)?c[d]=A.cloneElement(f,{onExited:i.bind(null,f),in:!0,exit:Ya(f,"exit",n),enter:Ya(f,"enter",n)}):!g&&p&&!y?c[d]=A.cloneElement(f,{in:!1}):g&&p&&A.isValidElement(m)&&(c[d]=A.cloneElement(f,{onExited:i.bind(null,f),in:m.props.in,exit:Ya(f,"exit",n),enter:Ya(f,"enter",n)}))}}),c}var mT=Object.values||function(n){return Object.keys(n).map(function(o){return n[o]})},gT={component:"div",childFactory:function(o){return o}},Wd=function(n){uv(o,n);function o(l,c){var d;d=n.call(this,l,c)||this;var f=d.handleExited.bind(uT(d));return d.state={contextValue:{isMounting:!0},handleExited:f,firstRender:!0},d}var i=o.prototype;return i.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},i.componentWillUnmount=function(){this.mounted=!1},o.getDerivedStateFromProps=function(c,d){var f=d.children,p=d.handleExited,g=d.firstRender;return{children:g?fT(c,p):pT(c,f,p),firstRender:!1}},i.handleExited=function(c,d){var f=Yd(this.props.children);c.key in f||(c.props.onExited&&c.props.onExited(d),this.mounted&&this.setState(function(p){var g=ls({},p.children);return delete g[c.key],{children:g}}))},i.render=function(){var c=this.props,d=c.component,f=c.childFactory,p=cv(c,["component","childFactory"]),g=this.state.contextValue,m=mT(this.state.children).map(f);return delete p.appear,delete p.enter,delete p.exit,d===null?Ft.createElement(us.Provider,{value:g},m):Ft.createElement(us.Provider,{value:g},Ft.createElement(d,p,m))},o}(Ft.Component);Wd.propTypes={};Wd.defaultProps=gT;const dv=n=>n.scrollTop;function ds(n,o){const{timeout:i,easing:l,style:c={}}=n;return{duration:c.transitionDuration??(typeof i=="number"?i:i[o.mode]||0),easing:c.transitionTimingFunction??(typeof l=="object"?l[o.mode]:l),delay:c.transitionDelay}}const hT={entering:{opacity:1},entered:{opacity:1}},yT=A.forwardRef(function(o,i){const l=no(),c={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{addEndListener:d,appear:f=!0,children:p,easing:g,in:m,onEnter:y,onEntered:b,onEntering:x,onExit:D,onExited:M,onExiting:E,style:z,timeout:O=c,TransitionComponent:C=wn,...T}=o,R=A.useRef(null),w=An(R,_s(p),i),_=re=>le=>{if(re){const $=R.current;le===void 0?re($):re($,le)}},j=_(x),G=_((re,le)=>{dv(re);const $=ds({style:z,timeout:O,easing:g},{mode:"enter"});re.style.webkitTransition=l.transitions.create("opacity",$),re.style.transition=l.transitions.create("opacity",$),y&&y(re,le)}),I=_(b),S=_(E),Z=_(re=>{const le=ds({style:z,timeout:O,easing:g},{mode:"exit"});re.style.webkitTransition=l.transitions.create("opacity",le),re.style.transition=l.transitions.create("opacity",le),D&&D(re)}),te=_(M),ie=re=>{d&&d(R.current,re)};return k.jsx(C,{appear:f,in:m,nodeRef:R,onEnter:G,onEntered:I,onEntering:j,onExit:Z,onExited:te,onExiting:S,addEndListener:ie,timeout:O,...T,children:(re,{ownerState:le,...$})=>A.cloneElement(p,{style:{opacity:0,visibility:re==="exited"&&!m?"hidden":void 0,...hT[re],...z,...p.props.style},ref:w,...$})})});function vT(n){return it("MuiBackdrop",n)}at("MuiBackdrop",["root","invisible"]);const bT=n=>{const{classes:o,invisible:i}=n;return ft({root:["root",i&&"invisible"]},vT,o)},ST=Re("div",{name:"MuiBackdrop",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.invisible&&o.invisible]}})({position:"fixed",display:"flex",alignItems:"center",justifyContent:"center",right:0,bottom:0,top:0,left:0,backgroundColor:"rgba(0, 0, 0, 0.5)",WebkitTapHighlightColor:"transparent",variants:[{props:{invisible:!0},style:{backgroundColor:"transparent"}}]}),xT=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiBackdrop"}),{children:c,className:d,component:f="div",invisible:p=!1,open:g,components:m={},componentsProps:y={},slotProps:b={},slots:x={},TransitionComponent:D,transitionDuration:M,...E}=l,z={...l,component:f,invisible:p},O=bT(z),C={transition:D,root:m.Root,...x},T={...y,...b},R={slots:C,slotProps:T},[w,_]=cn("root",{elementType:ST,externalForwardedProps:R,className:Se(O.root,d),ownerState:z}),[j,G]=cn("transition",{elementType:yT,externalForwardedProps:R,ownerState:z});return k.jsx(j,{in:g,timeout:M,...E,...G,children:k.jsx(w,{"aria-hidden":!0,..._,classes:O,ref:i,children:c})})});function Wr(n){const o=A.useRef(n);return vi(()=>{o.current=n}),A.useRef((...i)=>(0,o.current)(...i)).current}function jh(...n){return n.reduce((o,i)=>i==null?o:function(...c){o.apply(this,c),i.apply(this,c)},()=>{})}function ET(n){return typeof n=="function"?n():n}function AT(n){return n?n.props.hasOwnProperty("in"):!1}const Uh=()=>{},Wl=new WA;function TT(n){const{container:o,disableEscapeKeyDown:i=!1,disableScrollLock:l=!1,closeAfterTransition:c=!1,onTransitionEnter:d,onTransitionExited:f,children:p,onClose:g,open:m,rootRef:y}=n,b=A.useRef({}),x=A.useRef(null),D=A.useRef(null),M=An(D,y),[E,z]=A.useState(!m),O=AT(p);let C=!0;(n["aria-hidden"]==="false"||n["aria-hidden"]===!1)&&(C=!1);const T=()=>Za(x.current),R=()=>(b.current.modalRef=D.current,b.current.mount=x.current,b.current),w=()=>{Wl.mount(R(),{disableScrollLock:l}),D.current&&(D.current.scrollTop=0)},_=Wr(()=>{const le=ET(o)||T().body;Wl.add(R(),le),D.current&&w()}),j=()=>Wl.isTopModal(R()),G=Wr(le=>{x.current=le,le&&(m&&j()?w():D.current&&fi(D.current,C))}),I=A.useCallback(()=>{Wl.remove(R(),C)},[C]);A.useEffect(()=>()=>{I()},[I]),A.useEffect(()=>{m?_():(!O||!c)&&I()},[m,I,O,c,_]);const S=le=>$=>{le.onKeyDown?.($),!($.key!=="Escape"||$.which===229||!j())&&(i||($.stopPropagation(),g&&g($,"escapeKeyDown")))},Z=le=>$=>{le.onClick?.($),$.target===$.currentTarget&&g&&g($,"backdropClick")};return{getRootProps:(le={})=>{const $=sv(n);delete $.onTransitionEnter,delete $.onTransitionExited;const J={...$,...le};return{role:"presentation",...J,onKeyDown:S(J),ref:M}},getBackdropProps:(le={})=>{const $=le;return{"aria-hidden":!0,...$,onClick:Z($),open:m}},getTransitionProps:()=>{const le=()=>{z(!1),d&&d()},$=()=>{z(!0),f&&f(),c&&I()};return{onEnter:jh(le,p?.props.onEnter??Uh),onExited:jh($,p?.props.onExited??Uh)}},rootRef:M,portalRef:G,isTopModal:j,exited:E,hasTransition:O}}function CT(n){return it("MuiModal",n)}at("MuiModal",["root","hidden","backdrop"]);const RT=n=>{const{open:o,exited:i,classes:l}=n;return ft({root:["root",!o&&i&&"hidden"],backdrop:["backdrop"]},CT,l)},wT=Re("div",{name:"MuiModal",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,!i.open&&i.exited&&o.hidden]}})(yt(({theme:n})=>({position:"fixed",zIndex:(n.vars||n).zIndex.modal,right:0,bottom:0,top:0,left:0,variants:[{props:({ownerState:o})=>!o.open&&o.exited,style:{visibility:"hidden"}}]}))),MT=Re(xT,{name:"MuiModal",slot:"Backdrop"})({zIndex:-1}),OT=A.forwardRef(function(o,i){const l=lt({name:"MuiModal",props:o}),{BackdropComponent:c=MT,BackdropProps:d,classes:f,className:p,closeAfterTransition:g=!1,children:m,container:y,component:b,components:x={},componentsProps:D={},disableAutoFocus:M=!1,disableEnforceFocus:E=!1,disableEscapeKeyDown:z=!1,disablePortal:O=!1,disableRestoreFocus:C=!1,disableScrollLock:T=!1,hideBackdrop:R=!1,keepMounted:w=!1,onClose:_,onTransitionEnter:j,onTransitionExited:G,open:I,slotProps:S={},slots:Z={},theme:te,...ie}=l,re={...l,closeAfterTransition:g,disableAutoFocus:M,disableEnforceFocus:E,disableEscapeKeyDown:z,disablePortal:O,disableRestoreFocus:C,disableScrollLock:T,hideBackdrop:R,keepMounted:w},{getRootProps:le,getBackdropProps:$,getTransitionProps:J,portalRef:K,isTopModal:ae,exited:N,hasTransition:W}=TT({...re,rootRef:i}),ee={...re,exited:N},ne=RT(ee),oe={};if(m.props.tabIndex===void 0&&(oe.tabIndex="-1"),W){const{onEnter:At,onExited:Tt}=J();oe.onEnter=At,oe.onExited=Tt}const me={slots:{root:x.Root,backdrop:x.Backdrop,...Z},slotProps:{...D,...S}},[ue,Ve]=cn("root",{ref:i,elementType:wT,externalForwardedProps:{...me,...ie,component:b},getSlotProps:le,ownerState:ee,className:Se(p,ne?.root,!ee.open&&ee.exited&&ne?.hidden)}),[Te,Et]=cn("backdrop",{ref:d?.ref,elementType:c,externalForwardedProps:me,shouldForwardComponentProp:!0,additionalProps:d,getSlotProps:At=>$({...At,onClick:Tt=>{At?.onClick&&At.onClick(Tt)}}),className:Se(d?.className,ne?.backdrop),ownerState:ee});return!w&&!I&&(!W||N)?null:k.jsx(aT,{ref:K,container:y,disablePortal:O,children:k.jsxs(ue,{...Ve,children:[!R&&c?k.jsx(Te,{...Et}):null,k.jsx(tT,{disableEnforceFocus:E,disableAutoFocus:M,disableRestoreFocus:C,isEnabled:ae,open:I,children:A.cloneElement(m,oe)})]})})});function _T(n,o=166){let i;function l(...c){const d=()=>{n.apply(this,c)};clearTimeout(i),i=setTimeout(d,o)}return l.clear=()=>{clearTimeout(i)},l}function BT(n){return it("MuiSvgIcon",n)}at("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const DT=n=>{const{color:o,fontSize:i,classes:l}=n,c={root:["root",o!=="inherit"&&`color${ye(o)}`,`fontSize${ye(i)}`]};return ft(c,BT,l)},NT=Re("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.color!=="inherit"&&o[`color${ye(i.color)}`],o[`fontSize${ye(i.fontSize)}`]]}})(yt(({theme:n})=>({userSelect:"none",width:"1em",height:"1em",display:"inline-block",flexShrink:0,transition:n.transitions?.create?.("fill",{duration:(n.vars??n).transitions?.duration?.shorter}),variants:[{props:o=>!o.hasSvgAsChild,style:{fill:"currentColor"}},{props:{fontSize:"inherit"},style:{fontSize:"inherit"}},{props:{fontSize:"small"},style:{fontSize:n.typography?.pxToRem?.(20)||"1.25rem"}},{props:{fontSize:"medium"},style:{fontSize:n.typography?.pxToRem?.(24)||"1.5rem"}},{props:{fontSize:"large"},style:{fontSize:n.typography?.pxToRem?.(35)||"2.1875rem"}},...Object.entries((n.vars??n).palette).filter(([,o])=>o&&o.main).map(([o])=>({props:{color:o},style:{color:(n.vars??n).palette?.[o]?.main}})),{props:{color:"action"},style:{color:(n.vars??n).palette?.action?.active}},{props:{color:"disabled"},style:{color:(n.vars??n).palette?.action?.disabled}},{props:{color:"inherit"},style:{color:void 0}}]}))),vd=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiSvgIcon"}),{children:c,className:d,color:f="inherit",component:p="svg",fontSize:g="medium",htmlColor:m,inheritViewBox:y=!1,titleAccess:b,viewBox:x="0 0 24 24",...D}=l,M=A.isValidElement(c)&&c.type==="svg",E={...l,color:f,component:p,fontSize:g,instanceFontSize:o.fontSize,inheritViewBox:y,viewBox:x,hasSvgAsChild:M},z={};y||(z.viewBox=x);const O=DT(E);return k.jsxs(NT,{as:p,className:Se(O.root,d),focusable:"false",color:m,"aria-hidden":b?void 0:!0,role:b?"img":void 0,ref:i,...z,...D,...M&&c.props,ownerState:E,children:[M?c.props.children:c,b?k.jsx("title",{children:b}):null]})});vd.muiName="SvgIcon";function dn(n,o){function i(l,c){return k.jsx(vd,{"data-testid":void 0,ref:c,...l,children:n})}return i.muiName=vd.muiName,A.memo(A.forwardRef(i))}let $h=0;function zT(n){const[o,i]=A.useState(n),l=n||o;return A.useEffect(()=>{o==null&&($h+=1,i(`mui-${$h}`))},[o]),l}const LT={...os},qh=LT.useId;function fv(n){if(qh!==void 0){const o=qh();return n??o}return zT(n)}function kT(n,o){const i=n.charCodeAt(2);return n[0]==="o"&&n[1]==="n"&&i>=65&&i<=90&&typeof o=="function"}function jT(n,o){if(!n)return o;function i(f,p){const g={};return Object.keys(p).forEach(m=>{kT(m,p[m])&&typeof f[m]=="function"&&(g[m]=(...y)=>{f[m](...y),p[m](...y)})}),g}if(typeof n=="function"||typeof o=="function")return f=>{const p=typeof o=="function"?o(f):o,g=typeof n=="function"?n({...f,...p}):n,m=Se(f?.className,p?.className,g?.className),y=i(g,p);return{...p,...g,...y,...!!m&&{className:m},...p?.style&&g?.style&&{style:{...p.style,...g.style}},...p?.sx&&g?.sx&&{sx:[...Array.isArray(p.sx)?p.sx:[p.sx],...Array.isArray(g.sx)?g.sx:[g.sx]]}}};const l=o,c=i(n,l),d=Se(l?.className,n?.className);return{...o,...n,...c,...!!d&&{className:d},...l?.style&&n?.style&&{style:{...l.style,...n.style}},...l?.sx&&n?.sx&&{sx:[...Array.isArray(l.sx)?l.sx:[l.sx],...Array.isArray(n.sx)?n.sx:[n.sx]]}}}function UT(n,o,i){const l=o.getBoundingClientRect(),c=i&&i.getBoundingClientRect(),d=Qr(o);let f;if(o.fakeTransform)f=o.fakeTransform;else{const m=d.getComputedStyle(o);f=m.getPropertyValue("-webkit-transform")||m.getPropertyValue("transform")}let p=0,g=0;if(f&&f!=="none"&&typeof f=="string"){const m=f.split("(")[1].split(")")[0].split(",");p=parseInt(m[4],10),g=parseInt(m[5],10)}return n==="left"?c?`translateX(${c.right+p-l.left}px)`:`translateX(${d.innerWidth+p-l.left}px)`:n==="right"?c?`translateX(-${l.right-c.left-p}px)`:`translateX(-${l.left+l.width-p}px)`:n==="up"?c?`translateY(${c.bottom+g-l.top}px)`:`translateY(${d.innerHeight+g-l.top}px)`:c?`translateY(-${l.top-c.top+l.height-g}px)`:`translateY(-${l.top+l.height-g}px)`}function $T(n){return typeof n=="function"?n():n}function Xl(n,o,i){const l=$T(i),c=UT(n,o,l);c&&(o.style.webkitTransform=c,o.style.transform=c)}const qT=A.forwardRef(function(o,i){const l=no(),c={enter:l.transitions.easing.easeOut,exit:l.transitions.easing.sharp},d={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{addEndListener:f,appear:p=!0,children:g,container:m,direction:y="down",easing:b=c,in:x,onEnter:D,onEntered:M,onEntering:E,onExit:z,onExited:O,onExiting:C,style:T,timeout:R=d,TransitionComponent:w=wn,..._}=o,j=A.useRef(null),G=An(_s(g),j,i),I=K=>ae=>{K&&(ae===void 0?K(j.current):K(j.current,ae))},S=I((K,ae)=>{Xl(y,K,m),dv(K),D&&D(K,ae)}),Z=I((K,ae)=>{const N=ds({timeout:R,style:T,easing:b},{mode:"enter"});K.style.webkitTransition=l.transitions.create("-webkit-transform",{...N}),K.style.transition=l.transitions.create("transform",{...N}),K.style.webkitTransform="none",K.style.transform="none",E&&E(K,ae)}),te=I(M),ie=I(C),re=I(K=>{const ae=ds({timeout:R,style:T,easing:b},{mode:"exit"});K.style.webkitTransition=l.transitions.create("-webkit-transform",ae),K.style.transition=l.transitions.create("transform",ae),Xl(y,K,m),z&&z(K)}),le=I(K=>{K.style.webkitTransition="",K.style.transition="",O&&O(K)}),$=K=>{f&&f(j.current,K)},J=A.useCallback(()=>{j.current&&Xl(y,j.current,m)},[y,m]);return A.useEffect(()=>{if(x||y==="down"||y==="right")return;const K=_T(()=>{j.current&&Xl(y,j.current,m)}),ae=Qr(j.current);return ae.addEventListener("resize",K),()=>{K.clear(),ae.removeEventListener("resize",K)}},[y,x,m]),A.useEffect(()=>{x||J()},[x,J]),k.jsx(w,{nodeRef:j,onEnter:S,onEntered:te,onEntering:Z,onExit:re,onExited:le,onExiting:ie,addEndListener:$,appear:p,in:x,timeout:R,..._,children:(K,{ownerState:ae,...N})=>A.cloneElement(g,{ref:G,style:{visibility:K==="exited"&&!x?"hidden":void 0,...T,...g.props.style},...N})})});function PT(n){return it("MuiPaper",n)}at("MuiPaper",["root","rounded","outlined","elevation","elevation0","elevation1","elevation2","elevation3","elevation4","elevation5","elevation6","elevation7","elevation8","elevation9","elevation10","elevation11","elevation12","elevation13","elevation14","elevation15","elevation16","elevation17","elevation18","elevation19","elevation20","elevation21","elevation22","elevation23","elevation24"]);const IT=n=>{const{square:o,elevation:i,variant:l,classes:c}=n,d={root:["root",l,!o&&"rounded",l==="elevation"&&`elevation${i}`]};return ft(d,PT,c)},HT=Re("div",{name:"MuiPaper",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,o[i.variant],!i.square&&o.rounded,i.variant==="elevation"&&o[`elevation${i.elevation}`]]}})(yt(({theme:n})=>({backgroundColor:(n.vars||n).palette.background.paper,color:(n.vars||n).palette.text.primary,transition:n.transitions.create("box-shadow"),variants:[{props:({ownerState:o})=>!o.square,style:{borderRadius:n.shape.borderRadius}},{props:{variant:"outlined"},style:{border:`1px solid ${(n.vars||n).palette.divider}`}},{props:{variant:"elevation"},style:{boxShadow:"var(--Paper-shadow)",backgroundImage:"var(--Paper-overlay)"}}]}))),pv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiPaper"}),c=no(),{className:d,component:f="div",elevation:p=1,square:g=!1,variant:m="elevation",...y}=l,b={...l,component:f,elevation:p,square:g,variant:m},x=IT(b);return k.jsx(HT,{as:f,ownerState:b,className:Se(x.root,d),ref:i,...y,style:{...m==="elevation"&&{"--Paper-shadow":(c.vars||c).shadows[p],...c.vars&&{"--Paper-overlay":c.vars.overlays?.[p]},...!c.vars&&c.palette.mode==="dark"&&{"--Paper-overlay":`linear-gradient(${wt("#fff",gd(p))}, ${wt("#fff",gd(p))})`}},...y.style}})});function FT(n){return it("MuiDrawer",n)}at("MuiDrawer",["root","docked","paper","anchorLeft","anchorRight","anchorTop","anchorBottom","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const mv=(n,o)=>{const{ownerState:i}=n;return[o.root,(i.variant==="permanent"||i.variant==="persistent")&&o.docked,o.modal]},GT=n=>{const{classes:o,anchor:i,variant:l}=n,c={root:["root",`anchor${ye(i)}`],docked:[(l==="permanent"||l==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${ye(i)}`,l!=="temporary"&&`paperAnchorDocked${ye(i)}`]};return ft(c,FT,o)},VT=Re(OT,{name:"MuiDrawer",slot:"Root",overridesResolver:mv})(yt(({theme:n})=>({zIndex:(n.vars||n).zIndex.drawer}))),YT=Re("div",{shouldForwardProp:Os,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:mv})({flex:"0 0 auto"}),WT=Re(pv,{name:"MuiDrawer",slot:"Paper",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.paper,o[`paperAnchor${ye(i.anchor)}`],i.variant!=="temporary"&&o[`paperAnchorDocked${ye(i.anchor)}`]]}})(yt(({theme:n})=>({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(n.vars||n).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0,variants:[{props:{anchor:"left"},style:{left:0}},{props:{anchor:"top"},style:{top:0,left:0,right:0,height:"auto",maxHeight:"100%"}},{props:{anchor:"right"},style:{right:0}},{props:{anchor:"bottom"},style:{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"}},{props:({ownerState:o})=>o.anchor==="left"&&o.variant!=="temporary",style:{borderRight:`1px solid ${(n.vars||n).palette.divider}`}},{props:({ownerState:o})=>o.anchor==="top"&&o.variant!=="temporary",style:{borderBottom:`1px solid ${(n.vars||n).palette.divider}`}},{props:({ownerState:o})=>o.anchor==="right"&&o.variant!=="temporary",style:{borderLeft:`1px solid ${(n.vars||n).palette.divider}`}},{props:({ownerState:o})=>o.anchor==="bottom"&&o.variant!=="temporary",style:{borderTop:`1px solid ${(n.vars||n).palette.divider}`}}]}))),gv={left:"right",right:"left",top:"down",bottom:"up"};function XT(n){return["left","right"].includes(n)}function ZT({direction:n},o){return n==="rtl"&&XT(o)?gv[o]:o}const QT=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiDrawer"}),c=no(),d=KE(),f={enter:c.transitions.duration.enteringScreen,exit:c.transitions.duration.leavingScreen},{anchor:p="left",BackdropProps:g,children:m,className:y,elevation:b=16,hideBackdrop:x=!1,ModalProps:{BackdropProps:D,...M}={},onClose:E,open:z=!1,PaperProps:O={},SlideProps:C,TransitionComponent:T,transitionDuration:R=f,variant:w="temporary",slots:_={},slotProps:j={},...G}=l,I=A.useRef(!1);A.useEffect(()=>{I.current=!0},[]);const S=ZT({direction:d?"rtl":"ltr"},p),te={...l,anchor:p,elevation:b,open:z,variant:w,...G},ie=GT(te),re={slots:{transition:T,..._},slotProps:{paper:O,transition:C,...j,backdrop:jT(j.backdrop||{...g,...D},{transitionDuration:R})}},[le,$]=cn("root",{ref:i,elementType:VT,className:Se(ie.root,ie.modal,y),shouldForwardComponentProp:!0,ownerState:te,externalForwardedProps:{...re,...G,...M},additionalProps:{open:z,onClose:E,hideBackdrop:x,slots:{backdrop:re.slots.backdrop},slotProps:{backdrop:re.slotProps.backdrop}}}),[J,K]=cn("paper",{elementType:WT,shouldForwardComponentProp:!0,className:Se(ie.paper,O.className),ownerState:te,externalForwardedProps:re,additionalProps:{elevation:w==="temporary"?b:0,square:!0}}),[ae,N]=cn("docked",{elementType:YT,ref:i,className:Se(ie.root,ie.docked,y),ownerState:te,externalForwardedProps:re,additionalProps:G}),[W,ee]=cn("transition",{elementType:qT,ownerState:te,externalForwardedProps:re,additionalProps:{in:z,direction:gv[S],timeout:R,appear:I.current}}),ne=k.jsx(J,{...K,children:m});if(w==="permanent")return k.jsx(ae,{...N,children:ne});const oe=k.jsx(W,{...ee,children:ne});return w==="persistent"?k.jsx(ae,{...N,children:oe}):k.jsx(le,{...$,children:oe})}),xa=A.createContext({});function KT(n){return it("MuiList",n)}at("MuiList",["root","padding","dense","subheader"]);const JT=n=>{const{classes:o,disablePadding:i,dense:l,subheader:c}=n;return ft({root:["root",!i&&"padding",l&&"dense",c&&"subheader"]},KT,o)},e2=Re("ul",{name:"MuiList",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,!i.disablePadding&&o.padding,i.dense&&o.dense,i.subheader&&o.subheader]}})({listStyle:"none",margin:0,padding:0,position:"relative",variants:[{props:({ownerState:n})=>!n.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:n})=>n.subheader,style:{paddingTop:0}}]}),hv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiList"}),{children:c,className:d,component:f="ul",dense:p=!1,disablePadding:g=!1,subheader:m,...y}=l,b=A.useMemo(()=>({dense:p}),[p]),x={...l,component:f,dense:p,disablePadding:g},D=JT(x);return k.jsx(xa.Provider,{value:b,children:k.jsxs(e2,{as:f,className:Se(D.root,d),ref:i,ownerState:x,...y,children:[m,c]})})});function Ph(n){try{return n.matches(":focus-visible")}catch{}return!1}const Ih={};function yv(n,o){const i=A.useRef(Ih);return i.current===Ih&&(i.current=n(o)),i}class fs{static create(){return new fs}static use(){const o=yv(fs.create).current,[i,l]=A.useState(!1);return o.shouldMount=i,o.setShouldMount=l,A.useEffect(o.mountEffect,[i]),o}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=n2(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...o){this.mount().then(()=>this.ref.current?.start(...o))}stop(...o){this.mount().then(()=>this.ref.current?.stop(...o))}pulsate(...o){this.mount().then(()=>this.ref.current?.pulsate(...o))}}function t2(){return fs.use()}function n2(){let n,o;const i=new Promise((l,c)=>{n=l,o=c});return i.resolve=n,i.reject=o,i}const a2=[];function r2(n){A.useEffect(n,a2)}class Xd{static create(){return new Xd}currentId=null;start(o,i){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,i()},o)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear}function o2(){const n=yv(Xd.create).current;return r2(n.disposeEffect),n}function i2(n){const{className:o,classes:i,pulsate:l=!1,rippleX:c,rippleY:d,rippleSize:f,in:p,onExited:g,timeout:m}=n,[y,b]=A.useState(!1),x=Se(o,i.ripple,i.rippleVisible,l&&i.ripplePulsate),D={width:f,height:f,top:-(f/2)+d,left:-(f/2)+c},M=Se(i.child,y&&i.childLeaving,l&&i.childPulsate);return!p&&!y&&b(!0),A.useEffect(()=>{if(!p&&g!=null){const E=setTimeout(g,m);return()=>{clearTimeout(E)}}},[g,p,m]),k.jsx("span",{className:x,style:D,children:k.jsx("span",{className:M})})}const nn=at("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),bd=550,l2=80,s2=Ci`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,c2=Ci`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,u2=Ci`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,d2=Re("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),f2=Re(i2,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${nn.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${s2};
    animation-duration: ${bd}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  &.${nn.ripplePulsate} {
    animation-duration: ${({theme:n})=>n.transitions.duration.shorter}ms;
  }

  & .${nn.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${nn.childLeaving} {
    opacity: 0;
    animation-name: ${c2};
    animation-duration: ${bd}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  & .${nn.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${u2};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,p2=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiTouchRipple"}),{center:c=!1,classes:d={},className:f,...p}=l,[g,m]=A.useState([]),y=A.useRef(0),b=A.useRef(null);A.useEffect(()=>{b.current&&(b.current(),b.current=null)},[g]);const x=A.useRef(!1),D=o2(),M=A.useRef(null),E=A.useRef(null),z=A.useCallback(R=>{const{pulsate:w,rippleX:_,rippleY:j,rippleSize:G,cb:I}=R;m(S=>[...S,k.jsx(f2,{classes:{ripple:Se(d.ripple,nn.ripple),rippleVisible:Se(d.rippleVisible,nn.rippleVisible),ripplePulsate:Se(d.ripplePulsate,nn.ripplePulsate),child:Se(d.child,nn.child),childLeaving:Se(d.childLeaving,nn.childLeaving),childPulsate:Se(d.childPulsate,nn.childPulsate)},timeout:bd,pulsate:w,rippleX:_,rippleY:j,rippleSize:G},y.current)]),y.current+=1,b.current=I},[d]),O=A.useCallback((R={},w={},_=()=>{})=>{const{pulsate:j=!1,center:G=c||w.pulsate,fakeElement:I=!1}=w;if(R?.type==="mousedown"&&x.current){x.current=!1;return}R?.type==="touchstart"&&(x.current=!0);const S=I?null:E.current,Z=S?S.getBoundingClientRect():{width:0,height:0,left:0,top:0};let te,ie,re;if(G||R===void 0||R.clientX===0&&R.clientY===0||!R.clientX&&!R.touches)te=Math.round(Z.width/2),ie=Math.round(Z.height/2);else{const{clientX:le,clientY:$}=R.touches&&R.touches.length>0?R.touches[0]:R;te=Math.round(le-Z.left),ie=Math.round($-Z.top)}if(G)re=Math.sqrt((2*Z.width**2+Z.height**2)/3),re%2===0&&(re+=1);else{const le=Math.max(Math.abs((S?S.clientWidth:0)-te),te)*2+2,$=Math.max(Math.abs((S?S.clientHeight:0)-ie),ie)*2+2;re=Math.sqrt(le**2+$**2)}R?.touches?M.current===null&&(M.current=()=>{z({pulsate:j,rippleX:te,rippleY:ie,rippleSize:re,cb:_})},D.start(l2,()=>{M.current&&(M.current(),M.current=null)})):z({pulsate:j,rippleX:te,rippleY:ie,rippleSize:re,cb:_})},[c,z,D]),C=A.useCallback(()=>{O({},{pulsate:!0})},[O]),T=A.useCallback((R,w)=>{if(D.clear(),R?.type==="touchend"&&M.current){M.current(),M.current=null,D.start(0,()=>{T(R,w)});return}M.current=null,m(_=>_.length>0?_.slice(1):_),b.current=w},[D]);return A.useImperativeHandle(i,()=>({pulsate:C,start:O,stop:T}),[C,O,T]),k.jsx(d2,{className:Se(nn.root,d.root,f),ref:E,...p,children:k.jsx(Wd,{component:null,exit:!0,children:g})})});function m2(n){return it("MuiButtonBase",n)}const g2=at("MuiButtonBase",["root","disabled","focusVisible"]),h2=n=>{const{disabled:o,focusVisible:i,focusVisibleClassName:l,classes:c}=n,f=ft({root:["root",o&&"disabled",i&&"focusVisible"]},m2,c);return i&&l&&(f.root+=` ${l}`),f},y2=Re("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${g2.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Zd=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiButtonBase"}),{action:c,centerRipple:d=!1,children:f,className:p,component:g="button",disabled:m=!1,disableRipple:y=!1,disableTouchRipple:b=!1,focusRipple:x=!1,focusVisibleClassName:D,LinkComponent:M="a",onBlur:E,onClick:z,onContextMenu:O,onDragLeave:C,onFocus:T,onFocusVisible:R,onKeyDown:w,onKeyUp:_,onMouseDown:j,onMouseLeave:G,onMouseUp:I,onTouchEnd:S,onTouchMove:Z,onTouchStart:te,tabIndex:ie=0,TouchRippleProps:re,touchRippleRef:le,type:$,...J}=l,K=A.useRef(null),ae=t2(),N=An(ae.ref,le),[W,ee]=A.useState(!1);m&&W&&ee(!1),A.useImperativeHandle(c,()=>({focusVisible:()=>{ee(!0),K.current.focus()}}),[]);const ne=ae.shouldMount&&!y&&!m;A.useEffect(()=>{W&&x&&!y&&ae.pulsate()},[y,x,W,ae]);const oe=Gn(ae,"start",j,b),me=Gn(ae,"stop",O,b),ue=Gn(ae,"stop",C,b),Ve=Gn(ae,"stop",I,b),Te=Gn(ae,"stop",ge=>{W&&ge.preventDefault(),G&&G(ge)},b),Et=Gn(ae,"start",te,b),At=Gn(ae,"stop",S,b),Tt=Gn(ae,"stop",Z,b),Aa=Gn(ae,"stop",ge=>{Ph(ge.target)||ee(!1),E&&E(ge)},!1),Mn=Wr(ge=>{K.current||(K.current=ge.currentTarget),Ph(ge.target)&&(ee(!0),R&&R(ge)),T&&T(ge)}),Ta=()=>{const ge=K.current;return g&&g!=="button"&&!(ge.tagName==="A"&&ge.href)},Bs=Wr(ge=>{x&&!ge.repeat&&W&&ge.key===" "&&ae.stop(ge,()=>{ae.start(ge)}),ge.target===ge.currentTarget&&Ta()&&ge.key===" "&&ge.preventDefault(),w&&w(ge),ge.target===ge.currentTarget&&Ta()&&ge.key==="Enter"&&!m&&(ge.preventDefault(),z&&z(ge))}),Ds=Wr(ge=>{x&&ge.key===" "&&W&&!ge.defaultPrevented&&ae.stop(ge,()=>{ae.pulsate(ge)}),_&&_(ge),z&&ge.target===ge.currentTarget&&Ta()&&ge.key===" "&&!ge.defaultPrevented&&z(ge)});let Ct=g;Ct==="button"&&(J.href||J.to)&&(Ct=M);const Ca={};Ct==="button"?(Ca.type=$===void 0?"button":$,Ca.disabled=m):(!J.href&&!J.to&&(Ca.role="button"),m&&(Ca["aria-disabled"]=m));const Oi=An(i,K),ao={...l,centerRipple:d,component:g,disabled:m,disableRipple:y,disableTouchRipple:b,focusRipple:x,tabIndex:ie,focusVisible:W},Qa=h2(ao);return k.jsxs(y2,{as:Ct,className:Se(Qa.root,p),ownerState:ao,onBlur:Aa,onClick:z,onContextMenu:me,onFocus:Mn,onKeyDown:Bs,onKeyUp:Ds,onMouseDown:oe,onMouseLeave:Te,onMouseUp:Ve,onDragLeave:ue,onTouchEnd:At,onTouchMove:Tt,onTouchStart:Et,ref:Oi,tabIndex:m?-1:ie,type:$,...Ca,...J,children:[f,ne?k.jsx(p2,{ref:N,center:d,...re}):null]})});function Gn(n,o,i,l=!1){return Wr(c=>(i&&i(c),l||n[o](c),!0))}function v2(n){return it("MuiListItemButton",n)}const Gr=at("MuiListItemButton",["root","focusVisible","dense","alignItemsFlexStart","disabled","divider","gutters","selected"]),b2=(n,o)=>{const{ownerState:i}=n;return[o.root,i.dense&&o.dense,i.alignItems==="flex-start"&&o.alignItemsFlexStart,i.divider&&o.divider,!i.disableGutters&&o.gutters]},S2=n=>{const{alignItems:o,classes:i,dense:l,disabled:c,disableGutters:d,divider:f,selected:p}=n,m=ft({root:["root",l&&"dense",!d&&"gutters",f&&"divider",c&&"disabled",o==="flex-start"&&"alignItemsFlexStart",p&&"selected"]},v2,i);return{...i,...m}},x2=Re(Zd,{shouldForwardProp:n=>Os(n)||n==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:b2})(yt(({theme:n})=>({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:n.transitions.create("background-color",{duration:n.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(n.vars||n).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${Gr.selected}`]:{backgroundColor:n.vars?`rgba(${n.vars.palette.primary.mainChannel} / ${n.vars.palette.action.selectedOpacity})`:wt(n.palette.primary.main,n.palette.action.selectedOpacity),[`&.${Gr.focusVisible}`]:{backgroundColor:n.vars?`rgba(${n.vars.palette.primary.mainChannel} / calc(${n.vars.palette.action.selectedOpacity} + ${n.vars.palette.action.focusOpacity}))`:wt(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.focusOpacity)}},[`&.${Gr.selected}:hover`]:{backgroundColor:n.vars?`rgba(${n.vars.palette.primary.mainChannel} / calc(${n.vars.palette.action.selectedOpacity} + ${n.vars.palette.action.hoverOpacity}))`:wt(n.palette.primary.main,n.palette.action.selectedOpacity+n.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:n.vars?`rgba(${n.vars.palette.primary.mainChannel} / ${n.vars.palette.action.selectedOpacity})`:wt(n.palette.primary.main,n.palette.action.selectedOpacity)}},[`&.${Gr.focusVisible}`]:{backgroundColor:(n.vars||n).palette.action.focus},[`&.${Gr.disabled}`]:{opacity:(n.vars||n).palette.action.disabledOpacity},variants:[{props:({ownerState:o})=>o.divider,style:{borderBottom:`1px solid ${(n.vars||n).palette.divider}`,backgroundClip:"padding-box"}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:o})=>!o.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:o})=>o.dense,style:{paddingTop:4,paddingBottom:4}}]}))),vv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiListItemButton"}),{alignItems:c="center",autoFocus:d=!1,component:f="div",children:p,dense:g=!1,disableGutters:m=!1,divider:y=!1,focusVisibleClassName:b,selected:x=!1,className:D,...M}=l,E=A.useContext(xa),z=A.useMemo(()=>({dense:g||E.dense||!1,alignItems:c,disableGutters:m}),[c,E.dense,g,m]),O=A.useRef(null);vi(()=>{d&&O.current&&O.current.focus()},[d]);const C={...l,alignItems:c,dense:z.dense,disableGutters:m,divider:y,selected:x},T=S2(C),R=An(O,i);return k.jsx(xa.Provider,{value:z,children:k.jsx(x2,{ref:R,href:M.href||M.to,component:(M.href||M.to)&&f==="div"?"button":f,focusVisibleClassName:Se(T.focusVisible,b),ownerState:C,className:Se(T.root,D),...M,classes:T,children:p})})});function E2(n){return typeof n.main=="string"}function A2(n,o=[]){if(!E2(n))return!1;for(const i of o)if(!n.hasOwnProperty(i)||typeof n[i]!="string")return!1;return!0}function Kr(n=[]){return([,o])=>o&&A2(o,n)}function T2(n){return it("MuiTypography",n)}const Hh=at("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]),C2={primary:!0,secondary:!0,error:!0,info:!0,success:!0,warning:!0,textPrimary:!0,textSecondary:!0,textDisabled:!0},R2=rT(),w2=n=>{const{align:o,gutterBottom:i,noWrap:l,paragraph:c,variant:d,classes:f}=n,p={root:["root",d,n.align!=="inherit"&&`align${ye(o)}`,i&&"gutterBottom",l&&"noWrap",c&&"paragraph"]};return ft(p,T2,f)},M2=Re("span",{name:"MuiTypography",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.variant&&o[i.variant],i.align!=="inherit"&&o[`align${ye(i.align)}`],i.noWrap&&o.noWrap,i.gutterBottom&&o.gutterBottom,i.paragraph&&o.paragraph]}})(yt(({theme:n})=>({margin:0,variants:[{props:{variant:"inherit"},style:{font:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}},...Object.entries(n.typography).filter(([o,i])=>o!=="inherit"&&i&&typeof i=="object").map(([o,i])=>({props:{variant:o},style:i})),...Object.entries(n.palette).filter(Kr()).map(([o])=>({props:{color:o},style:{color:(n.vars||n).palette[o].main}})),...Object.entries(n.palette?.text||{}).filter(([,o])=>typeof o=="string").map(([o])=>({props:{color:`text${ye(o)}`},style:{color:(n.vars||n).palette.text[o]}})),{props:({ownerState:o})=>o.align!=="inherit",style:{textAlign:"var(--Typography-textAlign)"}},{props:({ownerState:o})=>o.noWrap,style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},{props:({ownerState:o})=>o.gutterBottom,style:{marginBottom:"0.35em"}},{props:({ownerState:o})=>o.paragraph,style:{marginBottom:16}}]}))),Fh={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},un=A.forwardRef(function(o,i){const{color:l,...c}=lt({props:o,name:"MuiTypography"}),d=!C2[l],f=R2({...c,...d&&{color:l}}),{align:p="inherit",className:g,component:m,gutterBottom:y=!1,noWrap:b=!1,paragraph:x=!1,variant:D="body1",variantMapping:M=Fh,...E}=f,z={...f,align:p,color:l,className:g,component:m,gutterBottom:y,noWrap:b,paragraph:x,variant:D,variantMapping:M},O=m||(x?"p":M[D]||Fh[D])||"span",C=w2(z);return k.jsx(M2,{as:O,ref:i,className:Se(C.root,g),...E,ownerState:z,style:{...p!=="inherit"&&{"--Typography-textAlign":p},...E.style}})});function O2(n){return it("MuiListItemText",n)}const Zl=at("MuiListItemText",["root","multiline","dense","inset","primary","secondary"]),_2=n=>{const{classes:o,inset:i,primary:l,secondary:c,dense:d}=n;return ft({root:["root",i&&"inset",d&&"dense",l&&c&&"multiline"],primary:["primary"],secondary:["secondary"]},O2,o)},B2=Re("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[{[`& .${Zl.primary}`]:o.primary},{[`& .${Zl.secondary}`]:o.secondary},o.root,i.inset&&o.inset,i.primary&&i.secondary&&o.multiline,i.dense&&o.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${Hh.root}:where(& .${Zl.primary})`]:{display:"block"},[`.${Hh.root}:where(& .${Zl.secondary})`]:{display:"block"},variants:[{props:({ownerState:n})=>n.primary&&n.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:n})=>n.inset,style:{paddingLeft:56}}]}),bv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiListItemText"}),{children:c,className:d,disableTypography:f=!1,inset:p=!1,primary:g,primaryTypographyProps:m,secondary:y,secondaryTypographyProps:b,slots:x={},slotProps:D={},...M}=l,{dense:E}=A.useContext(xa);let z=g??c,O=y;const C={...l,disableTypography:f,inset:p,primary:!!z,secondary:!!O,dense:E},T=_2(C),R={slots:x,slotProps:{primary:m,secondary:b,...D}},[w,_]=cn("root",{className:Se(T.root,d),elementType:B2,externalForwardedProps:{...R,...M},ownerState:C,ref:i}),[j,G]=cn("primary",{className:T.primary,elementType:un,externalForwardedProps:R,ownerState:C}),[I,S]=cn("secondary",{className:T.secondary,elementType:un,externalForwardedProps:R,ownerState:C});return z!=null&&z.type!==un&&!f&&(z=k.jsx(j,{variant:E?"body2":"body1",component:G?.variant?void 0:"span",...G,children:z})),O!=null&&O.type!==un&&!f&&(O=k.jsx(I,{variant:"body2",color:"textSecondary",...S,children:O})),k.jsxs(w,{..._,children:[z,O]})});function D2(n){return it("MuiAppBar",n)}at("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);const N2=n=>{const{color:o,position:i,classes:l}=n,c={root:["root",`color${ye(o)}`,`position${ye(i)}`]};return ft(c,D2,l)},Gh=(n,o)=>n?`${n?.replace(")","")}, ${o})`:o,z2=Re(pv,{name:"MuiAppBar",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,o[`position${ye(i.position)}`],o[`color${ye(i.color)}`]]}})(yt(({theme:n})=>({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0,variants:[{props:{position:"fixed"},style:{position:"fixed",zIndex:(n.vars||n).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}}},{props:{position:"absolute"},style:{position:"absolute",zIndex:(n.vars||n).zIndex.appBar,top:0,left:"auto",right:0}},{props:{position:"sticky"},style:{position:"sticky",zIndex:(n.vars||n).zIndex.appBar,top:0,left:"auto",right:0}},{props:{position:"static"},style:{position:"static"}},{props:{position:"relative"},style:{position:"relative"}},{props:{color:"inherit"},style:{"--AppBar-color":"inherit"}},{props:{color:"default"},style:{"--AppBar-background":n.vars?n.vars.palette.AppBar.defaultBg:n.palette.grey[100],"--AppBar-color":n.vars?n.vars.palette.text.primary:n.palette.getContrastText(n.palette.grey[100]),...n.applyStyles("dark",{"--AppBar-background":n.vars?n.vars.palette.AppBar.defaultBg:n.palette.grey[900],"--AppBar-color":n.vars?n.vars.palette.text.primary:n.palette.getContrastText(n.palette.grey[900])})}},...Object.entries(n.palette).filter(Kr(["contrastText"])).map(([o])=>({props:{color:o},style:{"--AppBar-background":(n.vars??n).palette[o].main,"--AppBar-color":(n.vars??n).palette[o].contrastText}})),{props:o=>o.enableColorOnDark===!0&&!["inherit","transparent"].includes(o.color),style:{backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)"}},{props:o=>o.enableColorOnDark===!1&&!["inherit","transparent"].includes(o.color),style:{backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)",...n.applyStyles("dark",{backgroundColor:n.vars?Gh(n.vars.palette.AppBar.darkBg,"var(--AppBar-background)"):null,color:n.vars?Gh(n.vars.palette.AppBar.darkColor,"var(--AppBar-color)"):null})}},{props:{color:"transparent"},style:{"--AppBar-background":"transparent","--AppBar-color":"inherit",backgroundColor:"var(--AppBar-background)",color:"var(--AppBar-color)",...n.applyStyles("dark",{backgroundImage:"none"})}}]}))),L2=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiAppBar"}),{className:c,color:d="primary",enableColorOnDark:f=!1,position:p="fixed",...g}=l,m={...l,color:d,position:p,enableColorOnDark:f},y=N2(m);return k.jsx(z2,{square:!0,component:"header",ownerState:m,elevation:4,className:Se(y.root,c,p==="fixed"&&"mui-fixed"),ref:i,...g})});function k2(n){return it("MuiToolbar",n)}at("MuiToolbar",["root","gutters","regular","dense"]);const j2=n=>{const{classes:o,disableGutters:i,variant:l}=n;return ft({root:["root",!i&&"gutters",l]},k2,o)},U2=Re("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,!i.disableGutters&&o.gutters,o[i.variant]]}})(yt(({theme:n})=>({position:"relative",display:"flex",alignItems:"center",variants:[{props:({ownerState:o})=>!o.disableGutters,style:{paddingLeft:n.spacing(2),paddingRight:n.spacing(2),[n.breakpoints.up("sm")]:{paddingLeft:n.spacing(3),paddingRight:n.spacing(3)}}},{props:{variant:"dense"},style:{minHeight:48}},{props:{variant:"regular"},style:n.mixins.toolbar}]}))),$2=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiToolbar"}),{className:c,component:d="div",disableGutters:f=!1,variant:p="regular",...g}=l,m={...l,component:d,disableGutters:f,variant:p},y=j2(m);return k.jsx(U2,{as:d,className:Se(y.root,c),ref:i,ownerState:m,...g})});function q2(n){return it("MuiCircularProgress",n)}at("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const Sa=44,Sd=Ci`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,xd=Ci`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,P2=typeof Sd!="string"?jd`
        animation: ${Sd} 1.4s linear infinite;
      `:null,I2=typeof xd!="string"?jd`
        animation: ${xd} 1.4s ease-in-out infinite;
      `:null,H2=n=>{const{classes:o,variant:i,color:l,disableShrink:c}=n,d={root:["root",i,`color${ye(l)}`],svg:["svg"],circle:["circle",`circle${ye(i)}`,c&&"circleDisableShrink"]};return ft(d,q2,o)},F2=Re("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,o[i.variant],o[`color${ye(i.color)}`]]}})(yt(({theme:n})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:n.transitions.create("transform")}},{props:{variant:"indeterminate"},style:P2||{animation:`${Sd} 1.4s linear infinite`}},...Object.entries(n.palette).filter(Kr()).map(([o])=>({props:{color:o},style:{color:(n.vars||n).palette[o].main}}))]}))),G2=Re("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),V2=Re("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.circle,o[`circle${ye(i.variant)}`],i.disableShrink&&o.circleDisableShrink]}})(yt(({theme:n})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:n.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:o})=>o.variant==="indeterminate"&&!o.disableShrink,style:I2||{animation:`${xd} 1.4s ease-in-out infinite`}}]}))),Sv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiCircularProgress"}),{className:c,color:d="primary",disableShrink:f=!1,size:p=40,style:g,thickness:m=3.6,value:y=0,variant:b="indeterminate",...x}=l,D={...l,color:d,disableShrink:f,size:p,thickness:m,value:y,variant:b},M=H2(D),E={},z={},O={};if(b==="determinate"){const C=2*Math.PI*((Sa-m)/2);E.strokeDasharray=C.toFixed(3),O["aria-valuenow"]=Math.round(y),E.strokeDashoffset=`${((100-y)/100*C).toFixed(3)}px`,z.transform="rotate(-90deg)"}return k.jsx(F2,{className:Se(M.root,c),style:{width:p,height:p,...z,...g},ownerState:D,ref:i,role:"progressbar",...O,...x,children:k.jsx(G2,{className:M.svg,ownerState:D,viewBox:`${Sa/2} ${Sa/2} ${Sa} ${Sa}`,children:k.jsx(V2,{className:M.circle,style:E,ownerState:D,cx:Sa,cy:Sa,r:(Sa-m)/2,fill:"none",strokeWidth:m})})})});function Y2(n){return it("MuiIconButton",n)}const Vh=at("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge","loading","loadingIndicator","loadingWrapper"]),W2=n=>{const{classes:o,disabled:i,color:l,edge:c,size:d,loading:f}=n,p={root:["root",f&&"loading",i&&"disabled",l!=="default"&&`color${ye(l)}`,c&&`edge${ye(c)}`,`size${ye(d)}`],loadingIndicator:["loadingIndicator"],loadingWrapper:["loadingWrapper"]};return ft(p,Y2,o)},X2=Re(Zd,{name:"MuiIconButton",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.loading&&o.loading,i.color!=="default"&&o[`color${ye(i.color)}`],i.edge&&o[`edge${ye(i.edge)}`],o[`size${ye(i.size)}`]]}})(yt(({theme:n})=>({textAlign:"center",flex:"0 0 auto",fontSize:n.typography.pxToRem(24),padding:8,borderRadius:"50%",color:(n.vars||n).palette.action.active,transition:n.transitions.create("background-color",{duration:n.transitions.duration.shortest}),variants:[{props:o=>!o.disableRipple,style:{"--IconButton-hoverBg":n.vars?`rgba(${n.vars.palette.action.activeChannel} / ${n.vars.palette.action.hoverOpacity})`:wt(n.palette.action.active,n.palette.action.hoverOpacity),"&:hover":{backgroundColor:"var(--IconButton-hoverBg)","@media (hover: none)":{backgroundColor:"transparent"}}}},{props:{edge:"start"},style:{marginLeft:-12}},{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:{edge:"end"},style:{marginRight:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}}]})),yt(({theme:n})=>({variants:[{props:{color:"inherit"},style:{color:"inherit"}},...Object.entries(n.palette).filter(Kr()).map(([o])=>({props:{color:o},style:{color:(n.vars||n).palette[o].main}})),...Object.entries(n.palette).filter(Kr()).map(([o])=>({props:{color:o},style:{"--IconButton-hoverBg":n.vars?`rgba(${(n.vars||n).palette[o].mainChannel} / ${n.vars.palette.action.hoverOpacity})`:wt((n.vars||n).palette[o].main,n.palette.action.hoverOpacity)}})),{props:{size:"small"},style:{padding:5,fontSize:n.typography.pxToRem(18)}},{props:{size:"large"},style:{padding:12,fontSize:n.typography.pxToRem(28)}}],[`&.${Vh.disabled}`]:{backgroundColor:"transparent",color:(n.vars||n).palette.action.disabled},[`&.${Vh.loading}`]:{color:"transparent"}}))),Z2=Re("span",{name:"MuiIconButton",slot:"LoadingIndicator"})(({theme:n})=>({display:"none",position:"absolute",visibility:"visible",top:"50%",left:"50%",transform:"translate(-50%, -50%)",color:(n.vars||n).palette.action.disabled,variants:[{props:{loading:!0},style:{display:"flex"}}]})),Xr=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiIconButton"}),{edge:c=!1,children:d,className:f,color:p="default",disabled:g=!1,disableFocusRipple:m=!1,size:y="medium",id:b,loading:x=null,loadingIndicator:D,...M}=l,E=fv(b),z=D??k.jsx(Sv,{"aria-labelledby":E,color:"inherit",size:16}),O={...l,edge:c,color:p,disabled:g,disableFocusRipple:m,loading:x,loadingIndicator:z,size:y},C=W2(O);return k.jsxs(X2,{id:x?E:b,className:Se(C.root,f),centerRipple:!0,focusRipple:!m,disabled:g||x,ref:i,...M,ownerState:O,children:[typeof x=="boolean"&&k.jsx("span",{className:C.loadingWrapper,style:{display:"contents"},children:k.jsx(Z2,{className:C.loadingIndicator,ownerState:O,children:x&&z})}),d]})}),Q2=dn(k.jsx("path",{d:"M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"}));function K2(n){return it("MuiDivider",n)}at("MuiDivider",["root","absolute","fullWidth","inset","middle","flexItem","light","vertical","withChildren","withChildrenVertical","textAlignRight","textAlignLeft","wrapper","wrapperVertical"]);const J2=n=>{const{absolute:o,children:i,classes:l,flexItem:c,light:d,orientation:f,textAlign:p,variant:g}=n;return ft({root:["root",o&&"absolute",g,d&&"light",f==="vertical"&&"vertical",c&&"flexItem",i&&"withChildren",i&&f==="vertical"&&"withChildrenVertical",p==="right"&&f!=="vertical"&&"textAlignRight",p==="left"&&f!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",f==="vertical"&&"wrapperVertical"]},K2,l)},eC=Re("div",{name:"MuiDivider",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.absolute&&o.absolute,o[i.variant],i.light&&o.light,i.orientation==="vertical"&&o.vertical,i.flexItem&&o.flexItem,i.children&&o.withChildren,i.children&&i.orientation==="vertical"&&o.withChildrenVertical,i.textAlign==="right"&&i.orientation!=="vertical"&&o.textAlignRight,i.textAlign==="left"&&i.orientation!=="vertical"&&o.textAlignLeft]}})(yt(({theme:n})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(n.vars||n).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:n.vars?`rgba(${n.vars.palette.dividerChannel} / 0.08)`:wt(n.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:n.spacing(2),marginRight:n.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:n.spacing(1),marginBottom:n.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:o})=>!!o.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:o})=>o.children&&o.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(n.vars||n).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:o})=>o.orientation==="vertical"&&o.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(n.vars||n).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:o})=>o.textAlign==="right"&&o.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:o})=>o.textAlign==="left"&&o.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),tC=Re("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.wrapper,i.orientation==="vertical"&&o.wrapperVertical]}})(yt(({theme:n})=>({display:"inline-block",paddingLeft:`calc(${n.spacing(1)} * 1.2)`,paddingRight:`calc(${n.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${n.spacing(1)} * 1.2)`,paddingBottom:`calc(${n.spacing(1)} * 1.2)`}}]}))),Ed=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiDivider"}),{absolute:c=!1,children:d,className:f,orientation:p="horizontal",component:g=d||p==="vertical"?"div":"hr",flexItem:m=!1,light:y=!1,role:b=g!=="hr"?"separator":void 0,textAlign:x="center",variant:D="fullWidth",...M}=l,E={...l,absolute:c,component:g,flexItem:m,light:y,orientation:p,role:b,textAlign:x,variant:D},z=J2(E);return k.jsx(eC,{as:g,className:Se(z.root,f),role:b,ref:i,ownerState:E,"aria-orientation":b==="separator"&&(g!=="hr"||p==="vertical")?p:void 0,...M,children:d?k.jsx(tC,{className:z.wrapper,ownerState:E,children:d}):null})});Ed&&(Ed.muiSkipListHighlight=!0);const xv=Jy({themeId:Ms}),nC={contentTitle:"#1976D2",contentSubtitle:"#2196F3",drawerTitle:"#0D47A1",drawerSection:"#1565C0",textPrimary:"#222",textSecondary:"#444",background:"#F5F7FA",backgroundLight:"#FFFFFF",drawerBg:"#F5F7FA",tocTitle:"#1976D2",tocText:"#222",accent:"#2196F3",border:"#e0e0e0",inlineCodeBg:"rgba(120,120,120,0.10)",inlineCodeText:"#c7254e",error:"#D32F2F",success:"#388E3C",warning:"#FFA000",codeBg:"#f5f5f5",codeText:"#222",appBarBg:"#102840",appBarText:"#FFFFFF"},aC={contentTitle:"#fff",contentSubtitle:"#64B5F6",drawerTitle:"#1976D2",drawerSection:"#fff",textPrimary:"#F3F6FB",textSecondary:"#AAB4BE",background:"#181C23",backgroundLight:"#232936",drawerBg:"#181C23",tocTitle:"#64B5F6",tocText:"#F3F6FB",accent:"#2196F3",border:"#232936",inlineCodeBg:"rgba(120,120,120,0.22)",inlineCodeText:"#ffcb6b",error:"#FF5370",success:"#43D39E",warning:"#FFB300",codeBg:"#23272e",codeText:"#f8f8f2",appBarBg:"#102840",appBarText:"#ffffff"},Ev=A.createContext(),rC=({children:n})=>{const[o,i]=A.useState(()=>localStorage.getItem("themeMode")||"dark"),l=A.useMemo(()=>o==="dark"?aC:nC,[o]),c=()=>{i(d=>{const f=d==="dark"?"light":"dark";return localStorage.setItem("themeMode",f),f})};return A.useEffect(()=>{document.body.classList.remove("dark","light"),document.body.classList.add(o),localStorage.setItem("themeMode",o)},[o]),k.jsx(Ev.Provider,{value:{mode:o,theme:l,toggleTheme:c},children:n})},Xn=()=>A.useContext(Ev),oC=dn(k.jsx("path",{d:"M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"})),Av=dn(k.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"})),Tv=A.createContext();function iC({children:n}){const[o,i]=A.useState(()=>{try{return JSON.parse(localStorage.getItem("studiedLessons")||"[]")}catch{return[]}});A.useEffect(()=>{localStorage.setItem("studiedLessons",JSON.stringify(o))},[o]),A.useEffect(()=>{const c=d=>{if(d.key==="studiedLessons")try{i(JSON.parse(d.newValue||"[]"))}catch{i([])}};return window.addEventListener("storage",c),()=>window.removeEventListener("storage",c)},[]);const l=A.useCallback(c=>{i(d=>{let f;return d.includes(c)?f=d.filter(p=>p!==c):f=[...d,c],f})},[]);return k.jsx(Tv.Provider,{value:{studiedLessons:o,toggleStudied:l},children:n})}function Cv(){return A.useContext(Tv)}const lC=dn(k.jsx("path",{d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"})),Rv="flutter_sidebar_sections_collapsed",sC=()=>{try{return JSON.parse(localStorage.getItem(Rv)||"{}")}catch{return{}}},cC=n=>{localStorage.setItem(Rv,JSON.stringify(n))},Yh=n=>n.trim().toLowerCase(),Wh=240,uC=({children:n,sections:o=[],onOpenMobileNav:i})=>{const l=no(),c=xv(l.breakpoints.down("lg")),[d,f]=A.useState(!1),p=Rn(),{theme:g}=Xn(),{studiedLessons:m,toggleStudied:y}=Cv(),b=A.useRef(null),x=o.filter(R=>R.type==="title").map(R=>Yh(R.label)),[D,M]=A.useState(()=>{const R=sC(),w={};return x.forEach(_=>{w[_]=R[_]??!1}),w});A.useEffect(()=>{cC(D)},[D]);const E=[];let z=null,O=null;o.forEach(R=>{R.type==="title"?(O&&E.push(O),z=Yh(R.label),O={title:R.label,normalized:z,items:[]}):R.type==="lesson"?(O||(O={title:"",normalized:"",items:[]}),O.items.push(R)):R.type==="divider"&&(O&&E.push(O),E.push({type:"divider"}),O=null,z=null)}),O&&E.push(O);const C=k.jsxs(Pe,{sx:{width:260,position:"fixed  ",left:0,zIndex:10,height:"100vh",overflowY:"auto",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},children:[k.jsx(hv,{children:E.map((R,w)=>R.type==="divider"?k.jsx(Ed,{sx:{my:1,backgroundColor:g.border}},`divider-${w}`):k.jsxs(Ft.Fragment,{children:[R.title&&k.jsxs(Pe,{sx:{px:2,py:1,fontWeight:"bold",color:g.drawerTitle,fontSize:"0.75rem",textTransform:"uppercase",mb:"2px",cursor:"pointer",userSelect:"none",display:"flex",alignItems:"center",gap:1.2},onClick:()=>M(_=>({..._,[R.normalized]:!_[R.normalized]})),children:[k.jsx(lC,{sx:{fontSize:18,color:g.drawerTitle,transition:"transform 0.18s",transform:D[R.normalized]?"rotate(0deg)":"rotate(90deg)",opacity:.7,mr:.5}}),R.title]}),!D[R.normalized]&&R.items.map(_=>{const j=m.includes(_.id),G=p.pathname===`/lesson/${_.id}`;return k.jsxs(vv,{component:_d,to:`/lesson/${_.id}`,selected:G,ref:G?b:null,sx:{m:1,color:g.drawerSection,"&.Mui-selected":{backgroundColor:"rgba(100,181,246,0.25)",color:g.drawerTitle},"&:hover":{color:g.drawerTitle,backgroundColor:"rgba(100,181,246,0.25)"},backgroundColor:j&&!G?"rgba(33, 150, 243, 0.08)":void 0,borderRadius:2,display:"flex",alignItems:"center"},onClick:()=>f(!1),children:[k.jsx(bv,{primary:_.label}),k.jsx(Xr,{size:"small",onClick:I=>{I.preventDefault(),I.stopPropagation(),y(String(_.id))},sx:{ml:1},"aria-label":j?"Marcar como no estudiada":"Marcar como estudiada",children:j?k.jsx(Av,{sx:{color:g.accent}}):k.jsx(oC,{sx:{color:G?g.accent:g.border,opacity:G?.8:1}})})]},`lesson-${_.id}`)})]},`section-${R.normalized||w}`))}),k.jsx(Pe,{sx:{height:100}})," "]}),T=()=>{f(!d)};return A.useEffect(()=>{i&&(i.current=()=>f(!0))},[i]),A.useEffect(()=>{b.current&&b.current.scrollIntoView({block:"center",behavior:"smooth"})},[p.pathname]),k.jsxs(Pe,{sx:{display:"flex",minHeight:"100vh"},children:[!c&&k.jsx(Pe,{sx:{width:Wh,flexShrink:0,backgroundColor:g.background,color:"#fff",overflowX:"hidden",position:"fixed",left:0,top:0,height:"100vh",zIndex:1201,display:"flex",flexDirection:"column",pt:"64px"},children:C}),c&&k.jsx(QT,{variant:"temporary",open:d,onClose:T,ModalProps:{keepMounted:!0,disableScrollLock:!1},sx:{"& .MuiDrawer-paper":{width:"85%",maxWidth:260,backgroundColor:g.background,color:g.textPrimary,borderRight:`1px solid ${g.border}`,boxShadow:"4px 0 20px rgba(0,0,0,0.5)",paddingTop:"64px"},"& .MuiBackdrop-root":{backgroundColor:"rgba(0, 0, 0, 0.5)"}},children:C}),k.jsx(Pe,{component:"main",sx:{flex:1,p:c?1:2,pt:c?8:2,width:"100%",boxSizing:"border-box",backgroundColor:g.background,minHeight:"100vh",ml:c?0:`${Wh}px`},children:n})]})},dC=n=>{const o=n.split(`
`);for(const i of o){const l=i.trim();if(l.startsWith("[t]"))return l.slice(3).trim()}return null},fC=`[t] Primeros pasos con Dart
Todo programa en Dart comienza con la función \`main\`. Es el punto de entrada de la aplicación y donde se ejecuta el código por primera vez.

[st] ¿Cómo luce el método main?
[code:dart]
void main() {
  print('Hello, Dart!');
}
[endcode]
[trycode] 70ea035e72b031116992afc88dfb63ae
El código anterior imprime en consola el texto \`Hola, Dart!\`. Puedes ejecutar este programa en cualquier entorno que soporte Dart, como DartPad o tu terminal si tienes Dart instalado.

[st] Declaración de variables y tipos básicos
Dart es un lenguaje tipado, pero permite declarar variables de forma explícita o usando \`var\` y \`dynamic\`.
[code:dart]
void main() {
  int age = 25;
  double height = 1.75;
  String name = 'Ana';
  bool isStudent = true;
  var city = 'Cali'; // Type is inferred
  
  print('Name: $name');
  print('Age: $age');
  print('Height: $height');
  print('Is student: $isStudent');
  print('City: $city');
}
[endcode]
[trycode] 00838af93b7981119311449fbd221205
Usa \`int\` para números enteros, \`double\` para decimales, \`String\` para texto y \`bool\` para valores lógicos.
[list]
\`var\` deja que Dart infiera el tipo según el valor inicial.
\`dynamic\` permite cambiar el tipo de la variable, pero se recomienda solo si es necesario.
[endlist]

[st] Ejemplo práctico: main y variables
[code:dart]
void main() {
  String name = 'Ana';
  int age = 25;
  print('Hello, my name is $name and I am $age years old.');
}
[endcode]
[trycode] ae89df20a06833de993721c7223812d0`,pC=`[t] Operadores numéricos
Los operadores te permiten realizar cálculos y comparaciones con variables numéricas en Dart. Vamos a ver los más importantes.

[st] Operadores aritméticos básicos
[code:dart]
void main() {
  int a = 10;
  int b = 3;
  
  print(a + b);  // Sum: 13
  print(a - b);  // Subtraction: 7
  print(a * b);  // Multiplication: 30
  print(a / b);  // Division: 3.333...
  print(a % b);  // Modulo (remainder): 1
  print(a ~/ b); // Integer division: 3
}
[endcode]
[trycode] 0b724266b8c3b41729324393b1770bf3
\`+\` suma, \`-\` resta, \`*\` multiplica, \`/\` divide (resultado decimal)

\`%\` obtiene el resto de la división

\`~/\` divide y devuelve solo la parte entera

[st] Operadores de asignación
[code:dart]
void main() {
  int x = 5;
  x += 3;  // Equivalent to: x = x + 3
  print(x); // 8
  
  x *= 2;  // Equivalent to: x = x * 2
  print(x); // 16
}
[endcode]
[trycode] e6c00b23687660a44f959f591dff34a4
Los operadores \`+=\`, \`-=\`, \`*=\`, \`/=\` son atajos para modificar una variable.

[st] Operadores de comparación
[code:dart]
void main() {
  int age = 18;
  
  print(age > 16);   // Greater than: true
  print(age < 21);   // Less than: true
  print(age >= 18);  // Greater or equal: true
  print(age <= 20);  // Less or equal: true
  print(age == 18);  // Equal: true
  print(age != 20);  // Not equal: true
}
[endcode]
[trycode] a501a06d10cb1e0a852d138191943569
Estos operadores devuelven \`true\` o \`false\` y son fundamentales para las estructuras de control.

[st] Operadores de incremento y decremento
[code:dart]
void main() {
  int counter = 5;
  
  counter++;  // Increments by 1
  print(counter); // 6
  
  counter--;  // Decrements by 1
  print(counter); // 5
}
[endcode]
[trycode] 9d90271cdc58be19cac8482d9581e22a`,mC=`[t] Trabajando con Strings
Los strings en Dart son secuencias de caracteres que puedes manipular de varias formas. Vamos a ver las más comunes: concatenación e interpolación.

[st] Concatenación de strings
[code:dart]
void main() {
  String firstName = 'Ana';
  String lastName = 'García';
  
  // Concatenation with +
  String fullName = firstName + ' ' + lastName;
  print(fullName); // Ana García
  
  // Concatenation with +
  String greeting = 'Hello ' + firstName;
  print(greeting); // Hello Ana
}
[endcode]
[trycode] 9ea5113dcc307145e4f26950b3770012
La concatenación con \`+\` es la forma más simple de unir strings.
También puedes usar interpolación para unir strings.

[st] Interpolación de strings
[code:dart]
void main() {
  String name = 'Carlos';
  int age = 25;
  
  // Simple interpolation with $
  String message = 'Hello, my name is $name';
  print(message); // Hello, my name is Carlos
  
  // Interpolation with expressions
  String introduction = 'I am $age years old and next year I will be \${age + 1}';
  print(introduction); // I am 25 years old and next year I will be 26
  
  // Interpolation with properties
  String list = 'Shopping list: \${['apples', 'milk', 'bread']}';
  print(list); // Shopping list: [apples, milk, bread]
}
[endcode]
[trycode] 9375d5f2e5afb0049c2deabf728a2102
La interpolación con \`$\` es más legible y eficiente que la concatenación.
Puedes usar \`\${}\` para expresiones más complejas.

[st] Strings multilínea
[code:dart]
void main() {
  // Multiline string with triple quotes
  String poem = '''
  The wind blows
  The leaves fall
  It's autumn
  ''';
  print(poem);
  
  // Multiline string with double quotes
  String letter = """
  Dear Sir:
  
  I am writing to inform you...
  
  Best regards.
  """;
  print(letter);
}
[endcode]
[trycode] fb3770f6687957ed296000cfe5a6e483
Usa comillas triples \`'''\` o \`"""\` para strings que ocupan múltiples líneas.

[st] Métodos útiles de strings
[code:dart]
void main() {
  String text = '  Hello World  ';
  
  print(text.toUpperCase()); //   HELLO WORLD  
  print(text.toLowerCase()); //   hello world  
  print(text.trim()); // Hello World
  print(text.length); // 13
  print(text.contains('World')); // true
  print(text.startsWith('  ')); // true
  print(text.endsWith('  ')); // true
}
[endcode]
[trycode] 4c4d6995aece9660c1b65839437c4c03
\`toUpperCase()\` y \`toLowerCase()\` cambian el caso.

\`trim()\` elimina espacios al inicio y final.

\`contains()\`, \`startsWith()\` y \`endsWith()\` verifican contenido.


`,gC=`[t] Condicionales
Las estructuras de control te permiten tomar decisiones en tu código. En Dart, las principales son \`if\`, \`else\` y \`switch\`.
[st] Estructura if básica
[code:dart]
void main() {
  int age = 18;
  
  if (age >= 18) {
    print('You are an adult');
  }
  
  // if with else
  if (age >= 18) {
    print('You are an adult');
  } else {
    print('You are a minor');
  }
}
[endcode]
[trycode] 56fccc30e3b1cff9300b6df7b413f012
El \`if\` evalúa una condición y ejecuta el código si es verdadera.

El \`else\` ejecuta código alternativo cuando la condición es falsa.

[st] if-else if-else
[code:dart]
void main() {
  int grade = 85;
  
  if (grade >= 90) {
    print('Excellent');
  } else if (grade >= 80) {
    print('Very good');
  } else if (grade >= 70) {
    print('Good');
  } else if (grade >= 60) {
    print('Passed');
  } else {
    print('Failed');
  }
}
[endcode]
[trycode] 0b3b037f5ba9cb2d0dcc6143a32183f6
Usa \`else if\` para evaluar múltiples condiciones en orden. Solo se ejecuta el primer bloque cuya condición sea verdadera.

[st] Operadores lógicos
[code:dart]
void main() {
  int age = 25;
  bool hasLicense = true;
  
  // AND (&&)
  if (age >= 18 && hasLicense) {
    print('You can drive');
  }
  
  // OR (||)
  if (age < 18 || !hasLicense) {
    print('You cannot drive');
  }
  
  // NOT (!)
  if (!hasLicense) {
    print('You need to get a license');
  }
}
[endcode]
[trycode] 2f601504e024daf02cca4f7fc7d37e48
\`&&\` (AND): ambas condiciones deben ser verdaderas.

\`||\` (OR): al menos una condición debe ser verdadera.

\`!\` (NOT): invierte el valor booleano.

[st] Estructura switch
[code:dart]
void main() {
  String day = 'Monday';
  
  switch (day) {
    case 'Monday':
      print('Start of the week');
      break;
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
      print('Workday');
      break;
    case 'Friday':
      print('Friday!');
      break;
    case 'Saturday':
    case 'Sunday':
      print('Weekend');
      break;
    default:
      print('Invalid day');
  }
}
[endcode]
[trycode] ed8a90a9d9800d1aa15f421b3558450c
El \`switch\` evalúa una variable contra múltiples valores.

Usa \`break\` para salir del switch después de cada caso.

El \`default\` se ejecuta si ningún caso coincide.

[st] Switch con expresiones (Dart 3.0+)
[code:dart]
void main() {
  int number = 5;
  
  String result = switch (number) {
    1 => 'One',
    2 => 'Two',
    3 => 'Three',
    _ => 'Other number'
  };
  
  print(result); // Other number
}
[endcode]
[trycode] de38d5d1ed991997ce2fef292fb3e57b
El switch con expresiones es más conciso y devuelve un valor. El \`_\` es el caso por defecto en switch expressions.

`,hC=`[t] Tipos opcionales y null safety
En Dart, los tipos opcionales te permiten manejar valores que pueden ser \`null\`. El sistema de null safety ayuda a prevenir errores comunes.
[st] Tipos opcionales básicos
[code:dart]
void main() {
  // Variable that can be null
  String? name = null;
  print(name); // null
  
  // Assign a value
  name = 'Ana';
  print(name); // Ana
  
  // Variable that cannot be null
  String lastName = 'García'; // Error if you try to assign null
  print(lastName);
}
[endcode]
[trycode] f0fd4d9f795c46529176e86bc4287aaf
Usa \`?\` después del tipo para indicar que puede ser null. Sin \`?\`, la variable nunca puede ser null.

[st] Verificar si es null
[code:dart]
void main() {
  String? email = null;
  
  // Check if it is null
  if (email != null) {
    print('Email: $email');
  } else {
    print('No email');
  }
  
  // Assign email
  email = 'ana@example.com';
  
  if (email != null) {
    print('Email: $email');
  } else {
    print('No email');
  }
}
[endcode]
[trycode] 66405bd35f0f6d4afe60328ba63e2da9
Usa \`!= null\` para verificar si una variable tiene valor. Solo después de verificar puedes usar la variable sin \`?\`.

[st] Operador de acceso seguro (?. )
[code:dart]
void main() {
  String? text = null;
  
  // Safe access - does not cause error if null
  print(text?.length); // null
  
  text = 'Hello';
  print(text?.length); // 4
  
  // Without safe access would cause error
  // print(text.length); // Error if text is null
}
[endcode]
[trycode] 778d63184ff6c07404bdaecf4171b330
El operador \`?.\` accede a propiedades solo si el valor no es null. Si es null, retorna null en lugar de causar error.

[st] Operador de coalescencia nula (??)
[code:dart]
void main() {
  String? name = null;
  String? lastName = 'García';
  
  // Use default value if null
  String fullName = name ?? 'Anonymous';
  print(fullName); // Anonymous
  
  String fullLastName = lastName ?? 'No last name';
  print(fullLastName); // García
  
  // Also works with expressions
  String message = name ?? lastName ?? 'No name';
  print(message); // García
}
[endcode]
[trycode] cebc63befd4e7eb207bb23b20187e7f2
El operador \`??\` proporciona un valor por defecto si la variable es null. Puedes encadenar múltiples \`??\` para fallbacks.

[st] Asignación de coalescencia nula (??=)
[code:dart]
void main() {
  String? name = null;
  
  // Only assigns if the variable is null
  name ??= 'Juan';
  print(name); // Juan
  
  // Does not change if it already has a value
  name ??= 'Pedro';
  print(name); // Juan (did not change)
  
  String? age = null;
  age ??= '25';
  print(age); // 25
}
[endcode]
[trycode] 3aee48062336caac7725347bcd0bf2c4
El operador \`??=\` asigna un valor solo si la variable es null. Es útil para inicializar variables opcionales. `,yC=`[t] Listas y mapas
Las listas y mapas son estructuras de datos fundamentales en Dart. Aprenderás a crearlas y recorrerlas de diferentes formas.
[st] Listas (Arrays)
[code:dart]
void main() {
  // Create a list
  List<String> fruits = ['apple', 'banana', 'orange'];
  
  // Add elements
  fruits.add('grape');
  fruits.addAll(['pear', 'mango']);
  
  // Access by index
  print(fruits[0]); // apple
  print(fruits.length); // 6
}
[endcode]
[trycode] 861f536e05b1f549f3477bbec1af1296
Las listas almacenan elementos ordenados y accesibles por índice.
Usa \`add()\` para un elemento y \`addAll()\` para múltiples.
[st] Recorrer listas con for
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Traditional for with index
  for (int i = 0; i < numbers.length; i++) {
    print('Index $i:  numbers[i]}');
  }
  
  // for-in (foreach)
  for (int number in numbers) {
    print('Number: $number');
  }
  
  // forEach with function
  numbers.forEach((number) {
    print('Value: $number');
  });
}
[endcode]
[trycode] b35f2f1791d67b9d6dd65360f8cdf620
[list]
El \`for\` tradicional te da control del índice.
El \`for-in\` es más simple para recorrer valores.
\`forEach()\` ejecuta una función para cada elemento.
[endlist]
[st] Mapas (Dictionaries)
[code:dart]
void main() {
  // Create a map
  Map<String, int> ages = {
    'Ana': 25,
    'Carlos': 30,
    'María': 28,
  };
  
  // Add elements
  ages['Juan'] = 35;
  
  // Access by key
  print(ages['Ana']); // 25
  print(ages.length); // 4
}
[endcode]
[trycode] ed87a5e54b7b469aa862ec9b4bb7ed36
Los mapas almacenan pares clave-valor. Accede a valores usando la clave como índice.
[st] Recorrer mapas
[code:dart]
void main() {
  Map<String, String> countries = {
    'Colombia': 'Bogotá',
    'Argentina': 'Buenos Aires',
    'México': 'Ciudad de México',
  };
  
  // Iterate keys
  for (String country in countries.keys) {
    print('Country: $country');
  }
  
  // Iterate values
  for (String capital in countries.values) {
    print('Capital: $capital');
  }
  
  // Iterate keys and values
  countries.forEach((country, capital) {
    print('$country - $capital');
  });
}
[endcode]
[trycode] 6d5ee941076ea161b3880ac8ef888664
[list]
Usa \`.keys\` para recorrer solo las claves.
Usa \`.values\` para recorrer solo los valores.
\`forEach()\` te da acceso a clave y valor.
[endlist]

[st] Métodos funcionales: map y filter
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // map: transform each element
  List<String> numbersText = numbers.map((n) => 'Number $n').toList();
  print(numbersText);
  
  // filter: filter elements
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print(evens); // [2, 4, 6, 8, 10]
  
  // Combine map and filter
  List<String> evensText = numbers
      .where((n) => n % 2 == 0)
      .map((n) => 'Even: $n')
      .toList();
  print(evensText);
}
[endcode]
[trycode] 81d33660c5e44ead08be3a817cc33122
[list]
\`map()\` transforma cada elemento de la lista.
\`where()\` (filter) selecciona elementos que cumplan una condición.
Puedes encadenar estos métodos para operaciones complejas. 
[endlist]`,vC=`[t] Métodos en Dart
Los métodos son bloques de código reutilizables. En Dart, puedes crear funciones tradicionales, lambdas (arrow functions) y usar funciones de orden superior.

[st] Funciones básicas
[code:dart]
void main() {
  greet('Ana');
  int result = add(5, 3);
  print('Result: $result');
}
// Function that does not return a value
void greet(String name) {
  print('Hello, $name!');
}
// Function that returns a value
int add(int a, int b) {
  return a + b;
}
[endcode]
[trycode] 68338a515c29a0e4aeace145b03f7b56
Las funciones pueden retornar valores o no (void). Define el tipo de retorno y los tipos de los parámetros.

[st] Parámetros opcionales
[code:dart]
void main() {
  greetPerson('Carlos');
  greetPerson('María', 'Good morning');
  greetPerson('Juan', 'Hello', 'friend');
}
// Optional parameters with []
void greetPerson(String name, [String? greeting, String? lastName]) {
  String message = greeting ?? 'Hello';
  String fullName = lastName != null ? '$name $lastName' : name;
  print('$message, $fullName!');
}
[endcode]
[trycode] 5d5ab9f43ddc1bdeeedff7b1b8621318
Usa \`[]\` para parámetros opcionales. El operador \`??\` proporciona un valor por defecto.

[st] Arrow functions (lambdas)
[code:dart]
void main() {
  // Simple arrow function
  int square(int x) => x * x;
  
  // Arrow function with multiple lines
  String formatName(String name, String lastName) => 
    '\${name.toUpperCase()} \${lastName.toUpperCase()}';
  
  print(square(5)); // 25
  print(formatName('ana', 'garcía')); // ANA GARCÍA
}
[endcode]
[trycode] 434d65b18c81965a6b9b9a97d4c52157
Las arrow functions usan \`=>\` para retornar un valor. Son más concisas que las funciones tradicionales.

[st] Funciones como parámetros
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Pass function as parameter
  processList(numbers, (n) => n * 2);
  processList(numbers, (n) => n + 10);
}
void processList(List<int> list, int Function(int) operation) {
  for (int number in list) {
    int result = operation(number);
    print('$number -> $result');
  }
}
[endcode]
[trycode] 4936efe856a80d0df046d0584523b8c1
Las funciones pueden recibir otras funciones como parámetros. \`int Function(int)\` es el tipo de una función que recibe y retorna int.

[st] High order functions
[code:dart]
void main() {
  List<int> numbers = [1, 2, 3, 4, 5, 6];
  
  // forEach: execute function on each element
  numbers.forEach((n) => print('Number: $n'));
  
  // map: transform each element
  List<String> texts = numbers.map((n) => 'Value $n').toList();
  print(texts);
  
  // where: filter elements
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print(evens);
  
  // reduce: combine elements
  int sum = numbers.reduce((a, b) => a + b);
  print('Total sum: $sum');
}
[endcode]
[trycode] bc57d9043c1423e18fcb0a34399ae8cd
[list]
\`forEach\` ejecuta una función en cada elemento.
\`map\` transforma cada elemento y retorna una nueva lista.
\`where\` filtra elementos según una condición.
\`reduce\` combina todos los elementos en un solo valor. 
[endlist]`,bC=`[t] Clases y objetos en Dart
Las clases son plantillas para crear objetos. En Dart, todo es un objeto, y las clases te permiten definir propiedades y comportamientos.

[st] Crear una clase básica
[code:dart]
void main() {
  // Create an instance of the class
  Person person1 = Person('Ana', 25);
  person1.greet();
  
  Person person2 = Person('Carlos', 30);
  person2.greet();
}

class Person {
  String name;
  int age;
  
  // Constructor
  Person(this.name, this.age);
  
  // Method
  void greet() {
    print('Hi, I am $name and I am $age years old');
  }
}
[endcode]
[trycode] e930ec503d90ef658887d57ace23df94
Las clases definen propiedades (variables) y métodos (funciones). El constructor \`Persona(this.nombre, this.edad)\` inicializa las propiedades.

[st] Getters y setters
[code:dart]
void main() {
  Product product = Product('Laptop', 1200.0);
  
  print(product.name); // Laptop
  print(product.price); // 1200.0
  print(product.priceWithVAT); // 1428.0
  
  product.price = 1000.0; // Use setter
  print(product.priceWithVAT); // 1190.0
}

class Product {
  String name;
  double _price; // Private property
  
  Product(this.name, this._price);
  
  // Getter
  double get price => _price;
  double get priceWithVAT => _price * 1.19;
  
  // Setter
  set price(double value) {
    if (value > 0) {
      _price = value;
    }
  }
}
[endcode]
[trycode] bc1e77ba3975bc12df21b88f17af0ac3
Los getters permiten acceder a propiedades calculadas. Los setters permiten validar datos antes de asignarlos. Las propiedades privadas empiezan con \`_\`.

[st] Herencia
[code:dart]
void main() {
  Student student = Student('María', 20, 'Engineering');
  student.greet();
  student.study();
  
  Teacher teacher = Teacher('Dr. García', 45, 'Mathematics');
  teacher.greet();
  teacher.teach();
}

class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  void greet() {
    print('Hi, I am $name');
  }
}

class Student extends Person {
  String major;
  
  Student(String name, int age, this.major) : super(name, age);
  
  void study() {
    print('$name is studying $major');
  }
}

class Teacher extends Person {
  String subject;
  
  Teacher(String name, int age, this.subject) : super(name, age);
  
  void teach() {
    print('$name teaches $subject');
  }
}
[endcode]
[trycode] 20a0a0bdf3a2f03a8aa519536fe40af2
[list]
\`extends\` permite heredar de otra clase.
\`super()\` llama al constructor de la clase padre.
[endlist]
Cada clase puede tener métodos específicos.

[st] Constructores nombrados
[code:dart]
void main() {
  // Default constructor
  Vehicle car1 = Vehicle('Toyota', 'Corolla');
  
  // Named constructor
  Vehicle car2 = Vehicle.electric('Tesla', 'Model 3');
  Vehicle car3 = Vehicle.used('Ford', 'Focus', 2018);
  
  car1.showInfo();
  car2.showInfo();
  car3.showInfo();
}

class Vehicle {
  String brand;
  String model;
  String? type;
  int? year;
  
  // Default constructor
  Vehicle(this.brand, this.model);
  
  // Named constructor for electric vehicles
  Vehicle.electric(this.brand, this.model) {
    type = 'Electric';
  }
  
  // Named constructor for used vehicles
  Vehicle.used(this.brand, this.model, this.year);
  
  void showInfo() {
    String info = '$brand $model';
    if (type != null) info += ' ($type)';
    if (year != null) info += ' - Year $year';
    print(info);
  }
}
[endcode]
[trycode] 85b89338cd1dec1644ef3814e11d0525
Los constructores nombrados permiten diferentes formas de crear objetos. Son útiles para casos de uso específicos con diferentes parámetros. `,SC=`[t] Constructores
En Dart, los constructores permiten inicializar los objetos de una clase. Puedes definir constructores con parámetros posicionales o nombrados, y usar la palabra \`required\` para obligar a que se pasen ciertos valores al crear una instancia.

[st] Constructor básico y uso de final

[code:dart]
class Person {
  final String name;
  final int age;

  Person(this.name, this.age);
}

void main() {
  var person = Person('Ana', 30);
  print(person.name); // Ana
}
[endcode]
[trycode] 1d4a3fe97b9141abd8f292c68644d573
La palabra \`final\` indica que el valor solo puede ser asignado una vez, normalmente en el constructor.

[st] Parámetros nombrados y required

[code:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, required this.age});
}

void main() {
  var person = Person(name: 'Luis', age: 25);
  print(person.name); // Luis
}
[endcode]
[trycode] e0a448441e7b821d4bcd7cbba36d037b

Los parámetros nombrados (entre \`{}\`) permiten mayor claridad y flexibilidad al crear objetos. La palabra \`required\` obliga a que se pasen esos valores.

[st] Parámetros opcionales y valores por defecto

[code:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, this.age = 18});
}

void main() {
  var person = Person(name: 'Sofía');
  print(person.age); // 18
}
[endcode]
[trycode] f3d26c9e77675dbf1c2e654b759cf8ad

Si no usas \`{}\`, los parámetros son posicionales y deben pasarse en orden. Si usas \`{}\`, puedes pasarlos en cualquier orden y hacerlos opcionales o requeridos. `,xC=`[t] Factory constructors
Un factory constructor en Dart permite devolver una instancia de la clase, pero no necesariamente una nueva. Es útil para patrones como singleton, caché, o lógica de inicialización condicional.

[st] Ejemplo de factory constructor
[code:dart]
class Logger {
  static final Logger _instance = Logger._internal();

  factory Logger() {
    return _instance;
  }

  Logger._internal();

  void log(String message) {
    print('LOG: $message');
  }
}

void main() {
  var logger1 = Logger();
  var logger2 = Logger();
  print(logger1 == logger2); // true
}
[endcode]
[trycode] f8d21d462a74cbc07647642ff564cf30

El factory constructor puede devolver una instancia existente o crear una nueva según la lógica que definas.

[st] Factory para parsear objetos
[code:dart]
class Person {
  final String name;
  final int age;

  Person({required this.name, required this.age});

  factory Person.fromJson(Map<String, dynamic> json) {
    return Person(
      name: json['nombre'],
      age: json['edad'],
    );
  }
}

void main() {
  var data = {'nombre': 'Ana', 'edad': 30};
  var person = Person.fromJson(data);
  print(person.name); // Ana
}
[endcode]
[trycode] 2ab3293d832ed38e1fc2b6afa1447689
El factory constructor es ideal para crear objetos a partir de datos externos, como JSON. `,EC=`[t] Herencia y polimorfismo
Dart permite crear jerarquías de clases usando herencia y polimorfismo. Puedes definir clases abstractas para establecer contratos que otras clases deben implementar.

[st] Herencia básica
[code:dart]
class Animal {
  void makeSound() {
    print('Generic sound');
  }
}

class Dog extends Animal {
  @override
  void makeSound() {
    print('Woof!');
  }
}

void main() {
  var dog = Dog();
  dog.makeSound(); // Woof!
}
[endcode]
[trycode] 4869e28df4f8a68e8c078114a9ac4daa
La herencia permite que una clase derive de otra y sobreescriba sus métodos.

[st] Clases abstractas y métodos abstractos
[code:dart]
abstract class Shape {
  double area();
}

class Circle extends Shape {
  final double radius;
  Circle(this.radius);

  @override
  double area() => 3.14 * radius * radius;
}

void main() {
  Shape shape = Circle(2);
  print(shape.area()); // 12.56
}
[endcode]
[trycode] a7c6ec93deee1c700cac841ac9f82e19
Una clase abstracta puede definir métodos sin implementación. Las clases que la extienden deben implementar esos métodos.

[st] Polimorfismo
[code:dart]
void printArea(Shape shape) {
  print('Area:  {shape.area()}');
}

void main() {
  var circle = Circle(3);
  printArea(circle); // Area: 28.26
}
[endcode]
[trycode] 7000c65bf56e4b4690cdcbb567a70d0b
El polimorfismo permite usar una referencia de tipo abstracto para trabajar con cualquier clase que lo implemente. `,AC=`[t] Futures y funciones async
Un \`Future\` representa un valor que estará disponible en el futuro, normalmente como resultado de una operación asíncrona (por ejemplo, una petición a internet).

[st] Función que retorna un Future
[code:dart]
Future<String> getMessage() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Hello from the future!';
}

void main() async {
  print('Waiting...');
  String message = await getMessage();
  print(message);
}
[endcode]
[trycode] 9ac0073d9828ba3ec7dcd93478b7b98a
La palabra clave \`async\` permite usar \`await\` dentro de la función para esperar el resultado de operaciones asíncronas.

[st] Manejo de errores con Future
[code:dart]
Future<int> divide(int a, int b) async {
  if (b == 0) throw Exception('Cannot divide by zero');
  return a ~/ b;
}

void main() async {
  try {
    int result = await divide(10, 2);
    print(result);
  } catch (e) {
    print('Error: $e');
  }
}
[endcode]
[trycode] f31c9df7ce0bbdac540547a9f08506a0
Puedes usar \`try-catch\` para manejar errores en funciones asíncronas. `,TC=`[t] Streams y funciones async*
Un \`Stream\` es una secuencia de valores que llegan en el tiempo. Es útil para manejar eventos, datos en tiempo real o flujos continuos.

[st] Crear un Stream con async*

[code:dart]
Stream<int> countTo(int max) async* {
  for (int i = 1; i <= max; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;
  }
}

void main() async {
  await for (int value in countTo(3)) {
    print(value);
  }
}
[endcode]
[trycode] f46f338431a59e088e7f637a2f82201e

La función \`async*\` permite usar \`yield\` para emitir valores al stream.

[st] Escuchar un Stream con listen
[code:dart]
Stream<String> messages() async* {
  yield 'Hello';
  await Future.delayed(Duration(seconds: 1));
  yield 'How are you?';
}

void main() {
  messages().listen((message) {
    print(message);
  });
}
[endcode]
[trycode] 3cb0f5348a515f52e2eb1b696fa9b005
Puedes escuchar un stream usando \`await for\` o el método \`listen\`. `,CC=`[t] El Operador de Cascada (..)

El operador de cascada (\`\`..) es una característica única de Dart que te permite realizar una secuencia de operaciones en el mismo objeto. Es una forma concisa y legible de encadenar llamadas a métodos o asignaciones de propiedades sin tener que repetir el nombre del objeto.

[st] ¿Qué es y para qué sirve?

Imagina que tienes un objeto y quieres llamar a varios de sus métodos o establecer varias de sus propiedades. Normalmente, tendrías que referenciar el objeto en cada línea:

[code:dart]
// Sin operador de cascada
var persona = Persona();
persona.nombre = 'Ana';
persona.edad = 30;
persona.saludar();
persona.despedirse();
[endcode]

Con el operador de cascada, puedes hacer todo esto en una sola "cascada" de operaciones:

[code:dart]
// Con operador de cascada
var persona = Persona()
  ..nombre = 'Ana'
  ..edad = 30;
  ..saludar();
  ..despedirse();
[endcode]

El operador \`..\` te permite realizar operaciones en el objeto que resulta de la expresión anterior, pero la expresión en sí misma (en este caso, Persona()) sigue evaluándose a su valor original. Esto significa que persona sigue siendo la instancia de Persona creada, no el resultado de la última operación en la cascada.

[st] Beneficios
[list]
Legibilidad. Hace que el código sea más fácil de leer y entender, ya que agrupa las operaciones relacionadas con un mismo objeto.
Concisión. Reduce la cantidad de código al evitar la repetición del nombre del objeto.
Fluidez. Permite construir objetos y configurarlos de manera más fluida.
[endlist]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que puedes pegar directamente en DartPad para ver el operador de cascada en acción. Demuestra cómo inicializar y configurar objetos utilizando este operador en un entorno de consola.

[code:dart]
class Persona {
  String nombre = '';
  int edad = 0;
  String ciudad = '';

  void saludar() {
    print('Hola, soy $nombre y tengo $edad años.');
  }

  void presentarse() {
    print('Vivo en $ciudad.');
  }
}

class Coche {
  String marca = '';
  String modelo = '';
  int anio = 0;

  void encender() {
    print('El $marca $modelo ($anio) ha encendido.');
  }

  void apagar() {
    print('El $marca $modelo ($anio) se ha apagado.');
  }
}

void main() {
  // Ejemplo con Persona
  var ana = Persona()
    ..nombre = 'Ana'
    ..edad = 25
    ..ciudad = 'Madrid'
    ..saludar()
    ..presentarse();

  print('\\n--- Objeto Persona ---');
  print('Nombre de Ana: \${ana.nombre}');

  // Ejemplo con Coche
  var miCoche = Coche()
    ..marca = 'Toyota'
    ..modelo = 'Corolla'
    ..anio = 2020
    ..encender()
    ..apagar();

  print('\\n--- Objeto Coche ---');
  print('Marca de mi coche: \${miCoche.marca}');
}
[endcode]
.`,RC=`[t] Instalación de Flutter
En esta lección aprenderás a instalar Flutter en tu sistema operativo (Windows, macOS o Linux) y a dejarlo listo para comenzar a desarrollar aplicaciones móviles.
[v] dUMqg_JQsEc

[st] Descargar Flutter
Para comenzar, ve a la página oficial de instalación de Flutter en [link] (la página oficial de instalación de Flutter) https://docs.flutter.dev/get-started/install

[list]
Elige tu sistema operativo (Windows, macOS o Linux) en la página de instalación.

Descarga el archivo ZIP de Flutter, que tiene un tamaño aproximado de 900 MB.

Descomprime el archivo ZIP en una carpeta de tu preferencia. Se recomienda usar un disco local, pero también puedes elegir las carpetas Descargas o Documentos.
[endlist]

[st] Agregar Flutter al PATH del sistema
Para poder ejecutar el comando \`flutter\` desde cualquier terminal, debes agregar la carpeta \`bin\` de Flutter a la variable de entorno PATH.

[st] En Windows
[list]
Busca "Editar las variables de entorno del sistema" en el menú de inicio y ábrelo.

Haz clic en "Variables de entorno".

En la sección "Variables del sistema", busca y selecciona la variable \`Path\` y haz clic en "Editar".

Haz clic en "Nuevo" y agrega la ruta completa a la carpeta \`bin\` de Flutter (por ejemplo, \`C:\\flutter\\bin\`).

Haz clic en "Aceptar" para guardar los cambios.
[endlist]

[st] En macOS/Linux:
[list]
Abre tu terminal.

Edita el archivo de configuración de tu shell (por ejemplo, \`~/.zshrc\` o \`~/.bashrc\`).

Agrega la siguiente línea al final del archivo:
[endlist]

[code:shell]
export PATH="$PATH:/ruta/a/flutter/bin"
[endcode]

[list]
Guarda el archivo y ejecuta \`source ~/.zshrc\` (o el archivo correspondiente) para aplicar los cambios.
[endlist]

[st] Verificar la instalación
Abre una nueva terminal y ejecuta:

[code:shell]
flutter --version
[endcode]

Si ves la versión de Flutter, la instalación fue exitosa. Ahora puedes ejecutar el comando \`flutter\` desde cualquier carpeta.

[st] Usar flutter doctor
Ejecuta el siguiente comando para verificar que todo esté correctamente instalado y ver qué dependencias adicionales necesitas:

[code:shell]
flutter doctor
[endcode]

\`flutter doctor\` te indicará si necesitas instalar Android Studio, Xcode (en Mac), o aceptar licencias. Sigue las instrucciones que aparecen en la terminal.

[st] Instalar Android Studio y Xcode (si aplica)
Descarga e instala Android Studio desde [link] (Android Studio) https://developer.android.com/studio

Abre Android Studio al menos una vez y crea un proyecto para que se configuren las herramientas.

En Android Studio, abre el "SDK Manager" y asegúrate de instalar el "Android SDK Command-line Tools (latest)".

Si usas Mac, instala Xcode desde la App Store y ábrelo al menos una vez.

[st] Instalar extensiones en Visual Studio Code
Si usas VS Code, instala las extensiones "Flutter" y "Dart" desde el marketplace de extensiones para tener soporte completo de desarrollo.

[st] Probar la instalación
Abre una terminal en cualquier carpeta y ejecuta:

[code:shell]
flutter doctor
[endcode]

Si ves todos los checks en verde, ¡ya puedes comenzar a crear proyectos Flutter!`,wC=`[t] Tu primera app Flutter
En esta lección aprenderás a crear tu primer proyecto Flutter desde cero usando el comando \`flutter create\` y a entender la estructura básica del proyecto.
[v] 44JrbFEeMrE

[st] Crear el proyecto con flutter create
Para crear tu primer proyecto, abre una terminal en la carpeta donde quieras guardar tus proyectos y ejecuta:

[code:shell]
flutter create -org com.tuempresa mi_primera_app
[endcode]

Este comando crea una nueva app Flutter en la carpeta \`mi_primera_app\` y configura el identificador de paquete (package name) con el dominio de tu organización (\`com.tuempresa\`).
[list]
Cambia \`com.tuempresa\` por el dominio de tu organización o tu nombre invertido (ejemplo: \`com.ejemplo\`).
Cambia \`mi_primera_app\` por el nombre que quieras para tu proyecto.
El nombre del proyecto y la carpeta debe estar en minúsculas y usar guión bajo para separar palabras (snake_case). Ejemplo: \`first_app\` o \`mi_primera_app\`.
[endlist]

[st] Path del proyecto
Por nada del mundo permitas que el path de tu proyecto tenga non-ASCII characters o espacios. El nombre del proyecto debe ir en minúsculas usando \`snake_case\`

[st] Abrir el proyecto en Visual Studio Code
Abre Visual Studio Code y selecciona la carpeta de tu nuevo proyecto para comenzar a trabajar en él.
[list]
Ve a "File > Open Folder" y selecciona la carpeta creada.
Confirma que confías en los archivos del proyecto.
No te preocupes si ves muchas carpetas y archivos, lo importante es la carpeta \`lib\` donde está el código principal.
[endlist]

[st] Estructura del proyecto Flutter
El proyecto generado tiene varias carpetas
[list]
\`android\` y \`ios\`: aquí puedes editar configuraciones específicas de cada plataforma, como permisos o integraciones nativas.
\`lib\`: aquí va el código principal de tu app (por defecto, el archivo \`main.dart\`).
\`linux\`, \`web\`, \`windows\`: carpetas para soporte multiplataforma (enfoque principal: Android/iOS).
[endlist]

[st] El archivo pubspec.yaml
El archivo \`pubspec.yaml\` es donde se gestionan las dependencias de tu proyecto Flutter, similar a \`package.json\` en Node.js.
[list]
Aquí puedes añadir paquetes y plugins que tu app necesite.
Cada vez que modifiques este archivo, ejecuta \`flutter pub get\` para instalar las dependencias.
¡Listo! Ahora tienes tu primer proyecto Flutter creado, abierto en VS Code y listo para comenzar a desarrollar. 
[endlist]`,MC=`[t] Ejecutar las apps
En esta lección aprenderás a ejecutar tu app Flutter en emuladores Android/iOS y en dispositivos físicos, tanto desde Android Studio como desde la línea de comandos.
[v] RINBqyRgAAU

[st] Crear y lanzar un emulador Android desde Android Studio
Abre Android Studio y ve a "Virtual Device Manager"

[list]
Haz clic en "Create Device" y elige un modelo (por ejemplo, Pixel XL).
Selecciona una versión de Android (recomendado: la más reciente, por ejemplo API 33, API 34, API 35).
Sigue los pasos y haz clic en "Finish" para crear el emulador.
Puedes lanzar el emulador desde el botón de Play en Device Manager.
[endlist]

[st] Consideraciones de hardware

[list]
Los emuladores requieren buena memoria RAM y CPU. Si tu computador es limitado, es mejor usar un dispositivo Android físico conectado por USB.
En Windows, solo puedes emular Android. Para emular iOS necesitas una Mac.
[endlist]

[st] Ejecutar un emulador Android desde la línea de comandos
Asegúrate de que la carpeta \`platform-tools\` de Android esté en tu variable de entorno PATH.
Para listar los emuladores disponibles:

[code:shell]
emulator -list-avds
[endcode]

Para lanzar un emulador específico:

[code:shell]
emulator -avd Pixel_2_API_33
[endcode]

Puedes dedicar una consola aparte para ver los logs del emulador.

[st] Abrir un simulador iOS desde la línea de comandos (solo en Mac)

[code:shell]
open -a simulator
[endcode]

[st] Ejecutar la app en un dispositivo o emulador
Para ver los dispositivos disponibles:

[code:shell]
flutter devices
[endcode]

Un output típico de este comando es
[code:bash]
Domi ➤ flutter devices
Found 3 connected devices:
  Domi iPhone (mobile) • 00008130-001610E03E60001C • ios            • iOS 18.5 22F76
  macOS (desktop)      • macos                     • darwin-arm64   • macOS 15.5 24F74 darwin-arm64
  Chrome (web)         • chrome                    • web-javascript • Google Chrome 138.0.7204.158

No wireless devices were found.
[endcode]

Para ejecutar la app en el dispositivo por defecto:

[code:shell]
flutter run
[endcode]

Para ejecutar la app en un dispositivo específico, usa el ID mostrado por \`flutter devices\`:

[code:shell]
flutter run -d emulator-5554
[endcode]

Por ejemplo, para iOS:

[code:shell]
flutter run -d 833FEF07-C34F-4BE9-944C-DE01BF091C7C
[endcode]

[st] Recomendaciones
[list]
Siempre usa nombres de proyecto y carpetas en minúsculas y con guión bajo (snake_case).
Si tu computador no puede emular Android, conecta un dispositivo físico.
Para iOS, solo puedes emular en Mac.
[endlist]

¡Listo! Ahora sabes cómo ejecutar tu app Flutter en emuladores y dispositivos físicos, tanto desde Android Studio como desde la terminal. `,OC=`[t] Configurando dispositivos virtuales
En esta lección aprenderás a configurar y lanzar emuladores Android e iOS, añadir rutas importantes a tu variable de entorno PATH y recomendaciones clave para tu entorno de desarrollo Flutter.
[v] VbKg1s24mEM

[st] Acceder al SDK Manager en Android Studio
Abre Android Studio y haz clic en el icono del cubo con flecha hacia abajo (SDK Manager). Puedes acceder desde la pantalla principal o desde cualquier proyecto abierto.
La ruta que aparece en el SDK Manager es importante: allí se encuentran las herramientas necesarias para emular dispositivos.

[st] Añadir rutas a la variable PATH
Debes añadir la carpeta \`emulator\` (y opcionalmente \`tools\`, \`platform-tools\`, \`bin\`) de tu instalación de Android SDK a la variable de entorno PATH de tu sistema.
[list]
En Windows, puedes hacerlo desde las variables de entorno del sistema.
En Mac/Linux, edita tu archivo de configuración de shell (por ejemplo, \`~/.zshrc\` o \`~/.bashrc\`).
Después de modificar el PATH, cierra y vuelve a abrir la terminal para que los cambios tengan efecto.
[endlist]

[st] Lanzar emuladores desde la terminal
Los siguientes comandos solo tienen sentido si ya tienes las variables de entorno coniguradas. Si tenías la terminal abierta al momento de añadir las variables de entorno, ciérrala y vuelvela a abrir. Esto es porque al inicio, el shell carga todas la variables de entorno

Para listar los emuladores disponibles

[code:shell]
emulator -list-avds
[endcode]

Para lanzar un emulador específico

[code:shell]
emulator -avd NOMBRE_DEL_EMULADOR
[endcode]

Puedes tener una terminal dedicada para los logs del emulador.

[st] Consideraciones importantes
[list]
Los emuladores requieren buena memoria RAM y CPU. Si tu computador es limitado, usa un dispositivo físico.
No puedes usar el mismo emulador desde Android Studio y la terminal al mismo tiempo: ciérralo en uno antes de abrirlo en el otro.
En Windows solo puedes emular Android. Para iOS necesitas una Mac.
[endlist]

[st] Lanzar el simulador de iOS (solo en Mac)
Asegúrate de haber abierto Xcode al menos una vez. Para abrir el simulador de iOS

[code:shell]
open -a simulator
[endcode]

Esto abrirá la última versión de simulador disponible (por ejemplo, iPhone 14 Pro Max).

[st] Recorderis
Usa el comando

[code:shell]
flutter devices
[endcode]

El segundo parámetro de cada línea es el ID del dispositivo, que puedes usar con

[code:shell]
flutter run -d ID_DEL_DISPOSITIVO
[endcode]

Con esto, puede ejecutar la app en cualquier devices disponible`,_C=`[t] Estructura básica de una app Flutter
En esta lección aprenderás cómo funciona el archivo principal de una app Flutter (\`main.dart\`), cómo crear el widget principal de la aplicación y cómo organizar tu código en carpetas y archivos.

[v] nb5Iqoy073E

Vamos a borrar el contenido de ese archivos con el propósito de entender la función de cada elemento.

[st] El archivo \`main.dart\` y el método \`main()\`

El archivo \`main.dart\` en la carpeta \`lib\` es el punto de entrada de toda app Flutter. El método \`main()\` es el primero que se ejecuta y debe llamar a \`runApp()\` pasando el widget principal de la app.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}
[endcode]

[list]
\`runApp\` recibe el widget raíz de la aplicación.
El widget raíz suele llamarse \`App\` y debe ser un widget especial (puede ser StatelessWidget o StatefulWidget).
[endlist]

[st] Crear el widget principal App
Crea una carpeta \`src\` dentro de \`lib\` y dentro de \`src\` un archivo \`app.dart\` (usa siempre snake_case para los nombres de archivos).

[code:dart]
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First app',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}
[endcode]


[list]
\`MaterialApp\` es el widget que configura el tema, el título y la pantalla inicial (\`home\`).
Usa \`const\` en los constructores siempre que sea posible para mejor performance.
[endlist]

[st] Crear la pantalla principal
Crea una carpeta \`screens\` dentro de \`src\` y dentro de ella un archivo \`main_screen.dart\` (usa snake_case).

[code:dart]
import 'package:flutter/material.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pantalla principal')),
      body: const Center(child: Text('¡Bienvenido a tu primera app Flutter!')),
    );
  }
}
[endcode]

[list]
Todos los widgets visibles en pantalla deben tener un método \`build\`.
Usa \`Scaffold\` para la estructura básica de una pantalla.
[endlist]

[st] Importar y conectar los widgets
En \`app.dart\`, importa el archivo de la pantalla principal

[code:dart]
import 'src/screens/main_screen.dart';
[endcode]

Asegúrate de que el widget \`App\` use \`home: const MainScreen()\`. Así, al ejecutar la app, verás la pantalla principal.
[st] Buenas prácticas
[list]
Usa snake_case para los nombres de archivos y carpetas.
Usa camelCase o PascalCase para los nombres de clases y widgets.
Aprovecha los autocompletadores de tu editor para importar archivos y clases.
Pon \`const\` en los constructores siempre que sea posible.
[endlist]

[st] Ejemplo completo

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First app',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pantalla principal')),
      body: const Center(child: Text('¡Bienvenido a tu primera app Flutter!')),
    );
  }
}
[endcode]
[trycode] 66917ca2b1fdffc1c76f134f47348f67`,BC=`[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'First app',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.purple),
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Pantalla principal')),
      body: const Center(child: Text('¡Bienvenido a tu primera app Flutter!')),
    );
  }
}
[endcode]
[trycode] d95a0b5b9c85b828c94b237be21b1bb9`,DC=`[t] Árbol de widgets y Scaffold
En esta lección aprenderás cómo se estructura el árbol de widgets en una app Flutter y el papel fundamental del widget \`Scaffold\` como base de cualquier pantalla.
[v] M5ZQR5ab8IY

[st] ¿Qué es el árbol de widgets?
En Flutter, toda la interfaz de usuario se construye como un árbol de widgets. Cada widget puede tener hijos y propiedades, y juntos forman la jerarquía visual y funcional de la app.

[st] ¿Qué es Scaffold?
\`Scaffold\` es un widget que provee la estructura visual básica para una pantalla. Sus dos propiedades principales son:
[list]
AppBar: la barra superior de la pantalla.
Body: el contenido principal de la pantalla.
[endlist]

[st] Ejemplo de árbol de widgets y Scaffold
Supongamos que tenemos una app básica con un \`MaterialApp\`, un \`Scaffold\` con \`AppBar\` y un \`body\` centrado:

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Árbol de widgets',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        backgroundColor: Theme.of(context).colorScheme.primary,
      ),
      body: const Center(
        child: Text('Hola mundo'),
      ),
    );
  }
}
[endcode]
[trycode] 884ff75d3d31d4b644ef359c07b23504

[st] Diagrama del árbol de widgets
[v] L84ly8Ef62w
[code:plain]
MaterialApp
 └── home: HomeScreen
      └── Scaffold
           ├── appBar: AppBar
           │     └── title: Text('Home')
           └── body: Center
                 └── Text('Hola mundo')
[endcode]

[list]
AppBar se crea con la clase \`AppBar\` y puede tener un título (usualmente un widget \`Text\`).
Puedes personalizar el color de fondo de la barra usando \`backgroundColor\` y el tema de la app.
El contenido principal se pone en \`body\`. Puedes usar \`Center\` para centrar widgets como \`Text\`.
Scaffold es la base de cualquier pantalla en Flutter.
Cada widget puede tener hijos y propiedades (por ejemplo, \`home\`, \`appBar\`, \`body\`).
El árbol de widgets es dinámico: Flutter lo reconstruye cuando cambian los datos o el estado.
Dividir la app en widgets pequeños y reutilizables facilita el mantenimiento y la escalabilidad.
El identificador \`key\` ayuda a Flutter a rastrear y actualizar widgets de manera eficiente.
[endlist]

¡Listo! Ahora comprendes cómo se compone y por qué es importante el árbol de widgets y el widget Scaffold en Flutter. `,NC=`[t] Layout
En esta lección aprenderás a organizar y personalizar la disposición de los widgets en Flutter usando \`Container\`, \`Row\` y \`Column\`.
[v] 75xXoz6JvdY  
[st] El Widget Container
\`Container\` es un widget versátil que funciona como un "div" en web. Permite personalizar el ancho, alto, color y otros estilos de un área de la pantalla. Solo puede tener un hijo, pero puedes anidar varios containers para lograr diseños complejos.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Container',
      home: Scaffold(
        appBar: AppBar(title: const Text('Ejemplo Container')),
        body: Center(
          child: Container(
            width: 200,
            height: 100,
            color: Colors.blueAccent,
            child: const Center(
              child: Text(
                '¡Hola Container!',
                style: TextStyle(color: Colors.white, fontSize: 20),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] e4cb71b3491e80ceb16a40beea6c10c7

[st] El Widget Column
\`Column\` es un widget que permite organizar varios widgets hijos en una disposición vertical (de arriba a abajo). Es muy parecido a una columna en Flexbox en web.
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Column',
      home: Scaffold(
        appBar: AppBar(title: const Text('Ejemplo Column')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center, // Centra los hijos verticalmente
            crossAxisAlignment: CrossAxisAlignment.center, // Centra los hijos horizontalmente
            children: const [
              Text('Primer Elemento'),
              SizedBox(height: 10), // Espacio entre elementos
              ElevatedButton(onPressed: null, child: Text('Botón')),
              SizedBox(height: 10),
              Text('Tercer Elemento'),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 29b05a170041f34fa042190dfbe58b5e

[st] El Widget Row
\`Row\` es un widget que permite organizar varios widgets hijos en una disposición horizontal (de izquierda a derecha). Es muy parecido a una fila en Flexbox en web.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Row',
      home: Scaffold(
        appBar: AppBar(title: const Text('Ejemplo Row')),
        body: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround, // Distribuye el espacio uniformemente alrededor de los hijos
            crossAxisAlignment: CrossAxisAlignment.center, // Centra los hijos verticalmente
            children: const [
              Text('Elemento A'),
              ElevatedButton(onPressed: null, child: Text('Botón')),
              Text('Elemento B'),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 24cbe0dae7df7765d2fbf4eac5896056

[st] Propiedades de Alineación

Los widgets \`Row\` y \`Column\` comparten propiedades clave para controlar la disposición y alineación de sus hijos:

Un ejemplo práctico de cómo combinar \`Row\` y \`Column\` es la creación de una barra de iconos y texto, como las que se encuentran comúnmente en las aplicaciones móviles.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Barra de Iconos')),
        body: Container(
          color: Colors.black,
          height: double.infinity,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildButtonColumn(Icons.call, 'Llamar'),
              _buildButtonColumn(Icons.near_me, 'Ruta'),
              _buildButtonColumn(Icons.share, 'Compartir'),
            ],
          ),
        ),
      ),
    );
  }

  Column _buildButtonColumn(IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: Colors.blue),
        SizedBox(height: 8), // Espacio entre icono y texto
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w400,
            color: Colors.blue,
          ),
        ),
      ],
    );
  }
}
[endcode]
[trycode] 2bd3986b5a5872e9941399469b4b89e6
Intenta cambiar las propiedades en el código de ejemplo para que veas los diferentes efectos.

\`mainAxisAlignment\`
Controla la alineación de los hijos a lo largo del eje principal (horizontal para \`Row\`, vertical para \`Column\`).
\`MainAxisAlignment.start\`, \`MainAxisAlignment.end\`, \`MainAxisAlignment.center\`, \`MainAxisAlignment.spaceBetween\`, \`MainAxisAlignment.spaceAround\`, \`MainAxisAlignment.spaceEvenly\`.

\`crossAxisAlignment\`
Controla la alineación de los hijos a lo largo del eje secundario (vertical para \`Row\`, horizontal para \`Column\`).
\`CrossAxisAlignment.start\`, \`CrossAxisAlignment.end\`, \`CrossAxisAlignment.center\`, \`CrossAxisAlignment.stretch\`.
`,zC=`[t] Text

El widget \`Text\` es uno de los más fundamentales en Flutter, utilizado para mostrar una cadena de texto en la pantalla. Permite una gran personalización a través de su propiedad \`style\`.

[st] Uso Básico

Para mostrar texto, simplemente pasas una cadena al constructor de \`Text\`.

[code:dart]
Text('Hola, Flutter!')
[endcode]

Pruébalo por ti mismo
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('Hola, Flutter!')
        ),
      ),
    );
  }
}
[endcode]
[trycode] 74982acbc364f84b7004d0d5a7718f43

[st] Estilizando el Texto

La propiedad \`style\` del widget \`Text\` acepta un objeto \`TextStyle\`, que te permite controlar una amplia gama de propiedades visuales del texto, como el color, el tamaño de la fuente, el peso (negrita), y más.

[st] Color del Texto

Para cambiar el color del texto, usa la propiedad \`color\` dentro de \`TextStyle\`.

[code:dart]
Text(
  'Texto Rojo',
  style: TextStyle(color: Colors.red),
)
[endcode]
Pruébalo por ti mismo
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Texto Rojo',
            style: TextStyle(color: Colors.red),
          )
        ),
      ),
    );
  }
}
[endcode]
[trycode] 09f602401b9ec4bf8c1b0c0ab93ced95

[st] Tamaño de la Fuente

La propiedad \`fontSize\` controla el tamaño del texto.

[code:dart]
Text(
  'Texto Grande',
  style: TextStyle(fontSize: 24.0),
)
[endcode]

Pruébalo por ti mismo
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Texto Grande',
            style: TextStyle(fontSize: 24.0),
          )
        ),
      ),
    );
  }
}
[endcode]
[trycode] b0247e8702b421da747b8153b55aae8c

[st] Negrita y Otros Pesos de Fuente

Usa la propiedad \`fontWeight\` para aplicar negrita u otros pesos de fuente. \`FontWeight.bold\` es para negrita.

[code:dart]
Text(
  'Texto en Negrita',
  style: TextStyle(fontWeight: FontWeight.bold),
)
[endcode]

Pruébalo por ti mismo
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
            'Texto en Negrita',
            style: TextStyle(fontWeight: FontWeight.bold),
          )
        ),
      ),
    );
  }
}
[endcode]
[trycode] 6d10a5b938b99ac69f2cc55deb4bad01

[st] Combinando Estilos

Puedes combinar múltiples propiedades de estilo en un solo \`TextStyle\`.

[code:dart]
Text(
  'Texto Azul y Grande',
  style: TextStyle(
    color: Colors.blue,
    fontSize: 22.0,
    fontWeight: FontWeight.w500, // Un peso intermedio
  ),
)
[endcode]

Pruébalo por tu mismo
[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text(
              'Texto Azul y Grande',
              style: TextStyle(
              color: Colors.blue,
              fontSize: 22.0,
              fontWeight: FontWeight.w500, // Un peso intermedio
            ),
          )
        ),
      ),
    );
  }
}
[endcode]
[trycode] 99e8e614431f0a06bfd66ec04ba09295

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que demuestra cómo usar el widget \`Text\` con diferentes estilos.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Text Widget',
      home: Scaffold(
        appBar: AppBar(title: const Text('Widget Text')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: const [
              Text(
                'Texto por defecto',
              ),
              SizedBox(height: 20),
              Text(
                'Texto de color verde',
                style: TextStyle(color: Colors.green),
              ),
              SizedBox(height: 20),
              Text(
                'Texto con tamaño 30',
                style: TextStyle(fontSize: 30.0),
              ),
              SizedBox(height: 20),
              Text(
                'Texto en negrita',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 20),
              Text(
                'Texto morado, grande y en negrita',
                style: TextStyle(
                  color: Colors.purple,
                  fontSize: 25.0,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 407020861ee8301495bb36973b9edc74

.`,LC=`[t] TextField

El widget \`TextField\` es fundamental para permitir a los usuarios introducir texto en tu aplicación. Es altamente personalizable y soporta diversas configuraciones para la entrada de datos.

[st] Uso Básico

El uso más simple de un \`TextField\` es sin ninguna configuración adicional. Esto creará un campo de texto básico.

[code:dart]
TextField()
[endcode]

[st] Controladores de Texto (TextEditingController)

Para obtener el texto introducido por el usuario o para establecer el texto programáticamente, se utiliza un \`TextEditingController\`. Es una buena práctica asociar un controlador a cada \`TextField\`.

[code:dart]
TextEditingController _controller = TextEditingController();
...
TextField(
  controller: _controller,
)
[endcode]

El lugar adecuado para declarar el \`TextEditingController\` es en una clase \`State\` de un \`StatefulWidget\`.

[code:dart]
import 'package:flutter/material.dart';

class FormScreen extends StatefulWidget {
  const FormScreen({super.key});
  @override
  State<FormScreen> createState() => FormScreenState();
}

class FormScreenState extends State<FormScreen> {
  final _controller = TextEditingController();
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: TextField(
          controller: _controller,
          decoration: const InputDecoration(
            labelText: "Escribe algo"
          ),
          onChanged: (text) {
            print('Texto actual: $text');
          },
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const FormScreen()
    );
  }
}

void main() {
  runApp(const MyApp());
}
[endcode]
[trycode] 8d35af6ef04e6ef7045b2ce842028bd4

[st] Extracción de texto
Simplemente usando \`_controller.text\` se puede acceder al texto escrito en el \`TextField\`. Observa este ejemplo.

En el ejemplo se extrae el texto para ser usado como una variable de estado. Ten en cuenta que la variable \`_controller.text\` es en sí misma un estado también, pero no es de solo lectura. Por lo tanto, evita usar la variable de forma directa como si fuera una variable de estado, ya que cuando lo quieras cambiar, no podrías usar el método \`setState\`.

[code:dart]
import 'package:flutter/material.dart';

class FormScreen extends StatefulWidget {
  const FormScreen({super.key});
  @override
  State<FormScreen> createState() => FormScreenState();
}

class FormScreenState extends State<FormScreen> {
  final _controller = TextEditingController();
  String _textoMostrado = "";

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Formulario con Label")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _controller,
              decoration: const InputDecoration(labelText: "Escribe algo"),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _textoMostrado = _controller.text; // 🔹 Guardamos el texto al presionar el botón
                });
              },
              child: const Text("Mostrar texto"),
            ),
            const SizedBox(height: 20),
            Text(
              _textoMostrado,
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: FormScreen());
  }
}

void main() {
  runApp(const MyApp());
}
[endcode]
[trycode] f5c5c94135b2d27e13bd5f50a011288d
[st] InputDecoration

La propiedad \`decoration\` de \`TextField\` acepta un objeto \`InputDecoration\`, que permite añadir etiquetas, texto de ayuda, iconos, bordes y más, para mejorar la experiencia de usuario.

[st] LabelText

\`labelText\` muestra una etiqueta flotante que se anima cuando el campo está en foco.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Nombre de Usuario',
  ),
)
[endcode]

[st] Borde 
Puedes añadir diferentes tipos de bordes, como \`OutlineInputBorder\` para un borde rectangular.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Contraseña',
    border: OutlineInputBorder(),
  ),
  obscureText: true, // Para campos de contraseña
)
[endcode]

[st] Iconos

\`prefixIcon\` y \`suffixIcon\` permiten añadir iconos al inicio o al final del campo de texto.

[code:dart]
TextField(
  decoration: InputDecoration(
    labelText: 'Buscar',
    prefixIcon: Icon(Icons.search),
    suffixIcon: Icon(Icons.clear),
  ),
)
[endcode]

[st] Texto de Ayuda (helperText, hintText)

[list]
\`helperText\`: Texto que aparece debajo del campo de texto.
\`hintText\`: Texto que aparece dentro del campo cuando está vacío.
[endlist]

[code:dart]
TextField(
  decoration: InputDecoration(
    hintText: 'Introduce tu email',
    helperText: 'Nunca compartiremos tu email.',
  ),
)
[endcode]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que demuestra cómo usar el widget \`TextField\` con controladores y diversas decoraciones.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo TextField Widget',
      home: MyTextFieldScreen(),
    );
  }
}

class MyTextFieldScreen extends StatefulWidget {
  const MyTextFieldScreen({super.key});

  @override
  State<MyTextFieldScreen> createState() => _MyTextFieldScreenState();
}

class _MyTextFieldScreenState extends State<MyTextFieldScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Widget TextField')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Nombre Completo',
                hintText: 'Escribe tu nombre aquí',
                prefixIcon: Icon(Icons.person),
                border: OutlineInputBorder(),
              ),
              onChanged: (text) {
                print('Nombre: $text');
              },
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _emailController,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(
                labelText: 'Correo Electrónico',
                hintText: 'ejemplo@dominio.com',
                suffixIcon: Icon(Icons.email),
                helperText: 'Introduce un correo válido',
                border: UnderlineInputBorder(),
              ),
              onChanged: (text) {
                print('Email: $text');
              },
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: const Text('Datos Ingresados'),
                    content: Text(
                      'Nombre: \${_nameController.text}\\nEmail: \${_emailController.text}',
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: const Text('OK'),
                      ),
                    ],
                  ),
                );
              },
              child: const Text('Mostrar Datos'),
            ),
          ],
        ),
      ),
    );
  }
}
[endcode]
[trycode] f9ea28d713db887153bb4fc11d755377
.`,kC=`[t] Button

Los botones son elementos esenciales para la interacción del usuario en cualquier aplicación. Flutter ofrece varios tipos de botones, cada uno diseñado para un propósito y estilo visual específico. En esta lección, exploraremos los botones más comunes y cómo utilizarlos.

[st] ElevatedButton: Botón Elevado

El \`ElevatedButton\` es un botón con una elevación que lo hace parecer que sobresale de la superficie. Es ideal para acciones primarias o destacadas en tu interfaz.

[code:dart]
ElevatedButton(
  onPressed: () {
    // Acción a realizar cuando se presiona el botón
    print('ElevatedButton presionado!');
  },
  child: const Text('Presióname'),
)
[endcode]

[st] TextButton: Botón de Texto

El \`TextButton\` es un botón de texto plano, sin elevación. Es adecuado para acciones menos prominentes, como opciones en un diálogo o enlaces.

[code:dart]
TextButton(
  onPressed: () {
    print('TextButton presionado!');
  },
  child: const Text('Más Información'),
)
[endcode]

[st] OutlinedButton: Botón con Borde

El \`OutlinedButton\` es un botón con un borde delgado y sin relleno. Es útil para acciones secundarias que necesitan ser visibles pero no tan prominentes como un \`ElevatedButton\`.

[code:dart]
OutlinedButton(
  onPressed: () {
    print('OutlinedButton presionado!');
  },
  child: const Text('Ver Detalles'),
)
[endcode]

[st] IconButton: Botón de Icono

El \`IconButton\` es un botón que solo muestra un icono. Es perfecto para acciones que pueden representarse visualmente, como un botón de "me gusta" o un icono de configuración.

[code:dart]
IconButton(
  icon: const Icon(Icons.favorite),
  onPressed: () {
    print('IconButton presionado!');
  },
  color: Colors.red, // Color del icono
  iconSize: 30.0, // Tamaño del icono
)
[endcode]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que demuestra el uso de los diferentes tipos de botones en Flutter.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Botones',
      home: Scaffold(
        appBar: AppBar(title: const Text('Widgets Button')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () {
                  print('ElevatedButton presionado!');
                },
                child: const Text('Botón Elevado'),
              ),
              const SizedBox(height: 20),
              TextButton(
                onPressed: () {
                  print('TextButton presionado!');
                },
                child: const Text('Botón de Texto'),
              ),
              const SizedBox(height: 20),
              OutlinedButton(
                onPressed: () {
                  print('OutlinedButton presionado!');
                },
                child: const Text('Botón con Borde'),
              ),
              const SizedBox(height: 20),
              IconButton(
                icon: const Icon(Icons.settings),
                onPressed: () {
                  print('IconButton presionado!');
                },
                color: Colors.blue,
                iconSize: 40.0,
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () {
                  print('ElevatedButton.icon presionado!');
                },
                icon: const Icon(Icons.add),
                label: const Text('Añadir'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 34399fb97053ae4160c3d796847add65
.`,jC=`[t] Image

El widget \`Image\` es esencial para mostrar elementos visuales en tu aplicación. Flutter te permite cargar imágenes tanto desde los assets de tu proyecto como directamente desde una URL en internet.

[st] Agregar Imágenes desde Assets

Para usar imágenes que vienen con tu aplicación (assets), necesitas configurarlas en el archivo \`pubspec.yaml\` y luego referenciarlas en tu código.

1.  Abre el archivo \`pubspec.yaml\` (ubicado en la raíz de tu proyecto).
2.  Busca la sección \`flutter:\` (no la de \`dependencies\`).
3.  Añade la clave \`assets:\` y especifica la carpeta donde guardarás tus imágenes. Por ejemplo, si tus imágenes están en una carpeta llamada \`assets\` en la raíz de tu proyecto:

[code:yaml]
flutter:
  assets:
    - assets/
[endcode]

4.  Crea la carpeta \`assets\` en la raíz de tu proyecto y coloca allí tus imágenes (por ejemplo, \`logo.png\`).
5.  Ejecuta \`flutter pub get\` en tu terminal para que Flutter reconozca los nuevos assets.

[st] Mostrar una Imagen Local (desde Assets)

Una vez configurados los assets, puedes mostrar una imagen local usando \`Image.asset\`.

[code:dart]
Image.asset(
  'assets/logo.png', // Ruta relativa a la carpeta assets
  width: 200,
  height: 100,
  fit: BoxFit.contain, // Ajusta la imagen dentro de sus límites
)
[endcode]

[st] Mostrar una Imagen desde Internet

Para mostrar imágenes alojadas en una URL, utiliza \`Image.network\`. Flutter las descargará y mostrará automáticamente.

[code:dart]
Image.network(
  'https://flutter.dev/images/flutter-logo-sharing.png', // URL de la imagen
  width: 300,
  fit: BoxFit.cover, // Cubre el área disponible, recortando si es necesario
)
[endcode]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional que demuestra cómo mostrar imágenes desde la red y desde assets (simulando un asset con un \`Container\` de color si no tienes uno real).

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo Image Widget',
      home: Scaffold(
        appBar: AppBar(title: const Text('Widget Image')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text('Imagen desde Internet:'),
              const SizedBox(height: 10),
              Image.network(
                'https://yt3.googleusercontent.com/2__G-ckA66-4JgXPlHTGZvg8CoUIgDU6qYFnJqW-AsVeJvBRT4hCjXz4XMOjIqm4m7v431lT=s900-c-k-c0x00ffffff-no-rj',
                width: 250,
                height: 250,
                fit: BoxFit.cover,
              ),
              const SizedBox(height: 30),
              const Text('Imagen desde Assets (simulada):'),
              const SizedBox(height: 10),
              // Para un ejemplo real con assets, necesitarías:
              // Image.asset('assets/my_local_image.png', width: 200, height: 200),
              Container(
                width: 200,
                height: 200,
                color: Colors.grey[300],
                child: const Center(child: Text('Asset Image Placeholder')),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] ccb80513dd8e632aadd3a499337b055b
.`,UC=`[t] SingleChildScrollView

Cuando el contenido de tu aplicación excede el espacio disponible en la pantalla, Flutter necesita un mecanismo para permitir al usuario desplazarse y ver todo el contenido. El widget \`SingleChildScrollView\` es la solución más sencilla para habilitar el scroll en una única dirección.

[st] ¿Por qué usar SingleChildScrollView?

Si colocas muchos widgets en una \`Column\` o \`Row\` y su tamaño combinado supera el espacio disponible, Flutter generará un error de "overflow" (desbordamiento). \`SingleChildScrollView\` resuelve esto al hacer que su contenido sea desplazable, evitando el error y permitiendo que todo el contenido sea visible.

[st] Uso Básico

Simplemente envuelve el widget que contiene tu contenido (comúnmente una \`Column\`) con un \`SingleChildScrollView\`.

[code:dart]
SingleChildScrollView(
  child: Column(
    children: [
      // Tus widgets aquí
      Text('Contenido muy largo...'),
      // ...
    ],
  ),
)
[endcode]

[st] Dirección del Scroll

Por defecto, \`SingleChildScrollView\` permite el scroll vertical. Puedes cambiar la dirección del scroll usando la propiedad \`scrollDirection\`.

[code:dart]
SingleChildScrollView(
  scrollDirection: Axis.horizontal, // Habilita el scroll horizontal
  child: Row(
    children: [
      // Tus widgets aquí
      Container(width: 200, height: 100, color: Colors.red),
      Container(width: 200, height: 100, color: Colors.green),
      Container(width: 200, height: 100, color: Colors.blue),
    ],
  ),
)
[endcode]

[st] Consideraciones de Rendimiento

\`SingleChildScrollView\` vs \`ListView\`: Si tienes una lista muy larga de elementos similares (como una lista de productos, mensajes de chat, etc.), \`ListView\` es generalmente más eficiente que \`SingleChildScrollView\`. \`ListView\` construye solo los elementos que son visibles en la pantalla, mientras que \`SingleChildScrollView\` construye todos sus hijos a la vez, lo que puede afectar el rendimiento con mucho contenido.

Anidamiento: Evita anidar múltiples widgets de scroll (por ejemplo, un \`SingleChildScrollView\` dentro de otro \`SingleChildScrollView\` o un \`ListView\`) ya que esto puede causar problemas de interacción y rendimiento.

[st] Ejemplo Completo

En el siguiente ejemplo, prueba con diferentes orientaciones del \`SingleChildScrollView\`

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo SingleChildScrollView',
      home: Scaffold(
          appBar: AppBar(title: const Text('Widget SingleChildScrollView')),
          body: SingleChildScrollView(
          scrollDirection: Axis.horizontal, // Habilita el scroll horizontal
          child: Row(
            children: [
              // Tus widgets aquí
              Container(width: 200, height: 100, color: Colors.red),
              Container(width: 200, height: 100, color: Colors.green),
              Container(width: 200, height: 100, color: Colors.blue),
              Container(width: 200, height: 100, color: Colors.black),
            ],
          ),
        )
      ),
    );
  }
}
[endcode]
[trycode] f2b6f19f634bcc8a293f38838c1e491e
.`,$C=`[t] Estado en Flutter

En Flutter, la interfaz de usuario se construye a partir de widgets. Hasta ahora, hemos trabajado principalmente con \`StatelessWidget\`, que son widgets que no cambian con el tiempo una vez que se construyen. Pero, ¿qué pasa cuando necesitamos que nuestra interfaz reaccione a la interacción del usuario o a cambios en los datos? Aquí es donde entran en juego los \`StatefulWidget\` y el concepto de "estado".

[st] ¿Qué es el Estado en Flutter?

El "estado" de un widget es la información que puede cambiar durante la vida útil del widget. Cuando el estado de un \`StatefulWidget\` cambia, Flutter reconstruye (redibuja) solo la parte de la interfaz de usuario que depende de ese estado, haciendo que la UI sea dinámica y reactiva.

[st] StatelessWidget vs. StatefulWidget

[list]
\`StatelessWidget\` Son widgets que no tienen estado interno que pueda cambiar. Su apariencia depende únicamente de los argumentos que se les pasan durante su construcción. Son ideales para elementos estáticos como textos, iconos o imágenes que no necesitan actualizarse.

\`StatefulWidget\` Son widgets que pueden mantener un estado que cambia con el tiempo. Cuando su estado cambia, Flutter llama al método \`build\` nuevamente para redibujar el widget y reflejar los cambios. Son necesarios para elementos interactivos como botones, campos de texto, o cualquier componente que necesite actualizarse visualmente.
[endlist]

[st] Anatomía de un StatefulWidget

Un Widget con estado se compone de dos clases

El \`StatefulWidget\` es la clase pública que hereda de \`StatefulWidget\`. Su principal responsabilidad es crear una instancia de la clase \`State\`.

[code:dart]
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({super.key});
  @override
  State<MyStatefulWidget> createState() => MyStatefulWidgetState();
}
[endcode]

La clase \`State\` es la clase privada que hereda de \`State<TuWidget>\`. Aquí es donde se mantiene el estado mutable del widget y donde se define el método \`build\` que describe la interfaz de usuario.

[code:dart]
class MyStatefulWidgetState extends State<MyStatefulWidget> {
  @override
  Widget build(BuildContext context) {
    return ...;
  }
  @override
  void dispose() {
    super.dispose();
  }
}
[endcode]

También tiene un método \`dispose\` que se ejecuta cuando se desmonta el componente. Útil para liberar recursos que se hayan instanciado para el funcionamiento del componente

[st] Actualizando el Estado con \`setState()\`

Para que Flutter sepa que el estado de un \`StatefulWidget\` ha cambiado y que necesita redibujar la interfaz de usuario, debes llamar al método \`setState()\`. Cualquier cambio de estado que ocurra dentro de una llamada a \`setState()\` provocará que Flutter reconstruya el widget.

[code:dart]
class MyCounterState extends State<MyCounter> {
  int _counter = 0; // El estado del widget

  void _incrementCounter() {
    setState(() {
      _counter++; // Cambiamos el estado
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Contador: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('Incrementar'),
        ),
      ],
    );
  }
}
[endcode]

[st] Ejemplo Completo: Un Contador Simple

Aquí tienes un ejemplo completo y funcional de un contador simple que puedes pegar directamente en DartPad. Cada vez que presiones el botón, el contador se incrementará y la interfaz de usuario se actualizará.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const CounterScreen(),
    );
  }
}

class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _counter = 0; // El estado mutable de este widget

  void _incrementCounter() {
    setState(() {
      _counter++; // Incrementa el contador
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          children: <Widget>[
            Text(
              '$_counter'
            ),
            ElevatedButton(
              onPressed: _incrementCounter,
              child: const Text('Incrementar'),
            ),
          ],
        ),
      ),
    );
  }
}
[endcode]
[trycode] 38fb3f8f0af6f1a2d2bbcc37467f1b6e
.`,qC=`[t] ScaffoldMessenger

El \`ScaffoldMessenger\` es un widget crucial en Flutter que permite mostrar \`SnackBar\`, \`BottomSheet\` y otros mensajes temporales de manera consistente, incluso cuando el \`Scaffold\` subyacente cambia o se reconstruye. Resuelve problemas comunes relacionados con la gestión de \`SnackBar\` en el árbol de widgets.

[st] ¿Por qué necesitamos ScaffoldMessenger?
\`ScaffoldMessenger\` introduce un \`ScaffoldMessengerState\` que persiste a través de los cambios de \`Scaffold\`, proporcionando un \`context\` estable para mostrar mensajes. Esto evita que el contexto se rompa, por ejemplo, cuando hacemos una transición entre pantallas.

[st] Uso Básico de SnackBar con ScaffoldMessenger

La forma más común de usar \`ScaffoldMessenger\` es para mostrar \`SnackBar\`. Puedes acceder a él a través de \`ScaffoldMessenger.of(context)\`.

[code:dart]
// Mostrar un SnackBar simple
ElevatedButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('¡Hola desde un SnackBar!'),
      ),
    );
  },
  child: const Text('Mostrar SnackBar'),
)
[endcode]

[st] SnackBar con Acción

Los \`SnackBar\` pueden incluir una acción, como un botón para deshacer una operación.

[code:dart]
// Mostrar un SnackBar con una acción
ElevatedButton(
  onPressed: () {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: const Text('Elemento eliminado.'),
        action: SnackBarAction(
          label: 'Deshacer',
          onPressed: () {
            // Código para deshacer la acción
            print('Acción deshecha!');
          },
        ),
      ),
    );
  },
  child: const Text('Mostrar SnackBar con Acción'),
)
[endcode]

[st] Gestionar Múltiples SnackBar

Si intentas mostrar varios \`SnackBar\`s rápidamente, por defecto se pondrán en cola. A menudo, querrás que un nuevo \`SnackBar\` reemplace al anterior. Para esto, puedes usar \`removeCurrentSnackBar()\` antes de mostrar el nuevo.

El operador de cascada (\`..\`) es muy útil aquí para encadenar estas operaciones:

[code:dart]
// Reemplazar el SnackBar actual con uno nuevo
ElevatedButton(
  onPressed: () {
    ScaffoldMessenger.of(context)
      ..removeCurrentSnackBar() // Elimina cualquier SnackBar visible
      ..showSnackBar(
        const SnackBar(content: Text('Este es un nuevo mensaje!')),
      );
  },
  child: const Text('Reemplazar SnackBar'),
)
[endcode]

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional para DartPad que demuestra el uso de \`ScaffoldMessenger\` para mostrar diferentes tipos de \`SnackBar\`s.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ScaffoldMessenger Demo',
      home: Builder(
        // Builder es necesario para obtener un contexto que tenga un Scaffold
        builder: (context) => Scaffold(
          appBar: AppBar(title: const Text('ScaffoldMessenger Demo')),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('¡SnackBar simple!'),
                      ),
                    );
                  },
                  child: const Text('Mostrar SnackBar Simple'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: const Text('Elemento eliminado.'),
                        action: SnackBarAction(
                          label: 'Deshacer',
                          onPressed: () {
                            print('Acción deshecha!');
                          },
                        ),
                      ),
                    );
                  },
                  child: const Text('Mostrar SnackBar con Acción'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context)
                      ..removeCurrentSnackBar()
                      ..showSnackBar(
                        const SnackBar(content: Text('¡Este es un nuevo mensaje!')),
                      );
                  },
                  child: const Text('Reemplazar SnackBar'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
[endcode]
[trycode] b84dcf85c28f01a6b3304bd19693944b
.`,PC=`[t] Navegación entre Pantallas

Ya sabemos cómo crear pantallas y los componentes que las componen. El próximo paso es saber cómo navegar entre ellas. Para aprenderlo, necesitamos mínimo dos pantallas. En este ejemplo, usaremos una pantalla de \`LoginScreen\` y una \`MainScreen\`.

[st] Método 1: \`Navigator.push\`

La forma más directa de navegar es usando el widget \`Navigator\`. Este componente nativo del framework nos permite hacer "push" (empujar) una nueva pantalla sobre la actual, creando una pila de navegación.

Para lograrlo, nos ubicamos en el botón de login y usamos el método \`Navigator.push\`. Este método requiere dos parámetros: el \`context\` (que nos indica dónde estamos en el árbol de widgets) y una \`Route\` (la ruta a la nueva pantalla).

[code:dart]
// En el onPressed de un botón, por ejemplo:

onPressed: () {
  Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => MainScreen()),
  );
}
[endcode]
[trycode] 3a7334ba4042e7a960d94bb3b2d2589a

El \`MaterialPageRoute\` es un objeto que construye la nueva pantalla. Su propiedad \`builder\` recibe una función que devuelve una instancia de la pantalla a la que queremos navegar, en este caso, \`MainScreen\`. Al ejecutar esto, Flutter automáticamente añade un botón de "atrás" en la \`AppBar\` para volver a la pantalla anterior.

[st] Método 2: Rutas Nombradas

Una forma más organizada y desacoplada de manejar la navegación es mediante rutas nombradas. En lugar de crear una instancia de la pantalla directamente, le asignamos un identificador (un \`String\`) a cada pantalla y la llamamos usando ese nombre.

Primero, debemos registrar nuestras rutas en el widget \`MaterialApp\` en el archivo \`main.dart\`.

[code:dart]
// En main.dart

MaterialApp(
  // La ruta inicial de la app será la que tenga '/'
  initialRoute: '/',
  routes: {
    '/': (context) => LoginScreen(),
    '/main': (context) => MainScreen(),
  },
);
[endcode]
[trycode] e4328eaa9aadd0ed884801212ed51b7d

Al usar la propiedad \`routes\`, no debemos declarar la propiedad \`home\`. La ruta con el \`String\` \`'/'\` se considera la pantalla principal.

Luego, para navegar, usamos el método \`Navigator.pushNamed\`.

[code:dart]
// En el onPressed del botón de login:

onPressed: () {
  Navigator.pushNamed(context, '/main');
}
[endcode]
[trycode] 4917fff087935b28ff1c4d989cfadb7b

Este enfoque es muy útil porque nos permite reutilizar las rutas en cualquier parte de la aplicación sin necesidad de importar los archivos de las pantallas.

[st] Reemplazar la pantalla actual

A veces, no queremos que el usuario pueda volver a la pantalla anterior, como en el caso de un login. Una vez que el usuario se autentica, la pantalla de login debería desaparecer de la pila de navegación.

Para esto, usamos el método \`pushNamedAndRemoveUntil\`.

[code:dart]
// En el onPressed del botón de login:

onPressed: () {
  Navigator.pushNamedAndRemoveUntil(
    context,
    '/main',
    (Route<dynamic> route) => false, // Esta función elimina todas las rutas anteriores
  );
}
[endcode]
[trycode] bcf8748ee2a473c9f647a3cfedb7b92f

Este método navega a la ruta \`/main\` y luego elimina todas las pantallas anteriores de la pila. El tercer parámetro es una función que determina qué rutas conservar. Al devolver siempre \`false\`, nos aseguramos de que todas las rutas anteriores sean eliminadas. Como resultado, la nueva pantalla no tendrá el botón de "atrás", ya que no hay a dónde regresar.

[st] Ejemplo completo

Aquí tienes un ejemplo completo y funcional que puedes pegar directamente en DartPad. Este código demuestra la navegación entre una pantalla de inicio y una pantalla principal usando rutas nombradas.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ejemplo de Navegación',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/details': (context) => const DetailsScreen(),
      },
    );
  }
}

// Pantalla de Inicio
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pantalla de Inicio'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navegar a la pantalla de detalles
            Navigator.pushNamed(context, '/details');
          },
          child: const Text('Ir a Detalles'),
        ),
      ),
    );
  }
}

// Pantalla de Detalles
class DetailsScreen extends StatelessWidget {
  const DetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pantalla de Detalles'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Regresar a la pantalla de inicio
            Navigator.pop(context);
          },
          child: const Text('Volver al Inicio'),
        ),
      ),
    );
  }
}
[endcode]
[trycode] 56b20c1f38c194fde8c2db1c35bbfcb6
.`,IC=`[t] Navegación Avanzada
En la lección anterior, aprendimos los fundamentos de la navegación. Ahora, exploraremos técnicas más avanzadas que son cruciales para construir aplicaciones complejas: la gestión del historial de navegación y el paso de argumentos entre pantallas.

[st] Limpiar el Historial de Navegación (Backstack)

Como vimos brevemente, hay escenarios donde no queremos que el usuario pueda regresar a la pantalla anterior. El caso más común es después de un inicio de sesión exitoso o al pasar una pantalla de bienvenida (splash screen). En estos casos, la pantalla anterior debe ser eliminada del historial (o "backstack").

Para lograr esto, usamos el método \`Navigator.pushNamedAndRemoveUntil\`. Este método no solo nos lleva a una nueva pantalla, sino que también elimina las anteriores según una condición que nosotros definimos.

[code:dart]
// Ejemplo: Navegar desde Login a Home, eliminando la pantalla de Login del historial.
onPressed: () {
  Navigator.pushNamedAndRemoveUntil(
    context,
    '/home', // La nueva ruta a la que navegamos
    (Route<dynamic> route) => false, // Condición para eliminar las rutas anteriores
  );
}
[endcode]

La clave está en el tercer parámetro. Es una función que se ejecuta para cada una de las rutas en el historial. Si la función devuelve \`false\`, la ruta es eliminada. Al usar \`(route) => false\`, le decimos a Flutter que elimine **todas** las rutas anteriores, dejando únicamente la nueva (\`/home\`) en el historial. Como resultado, el usuario no verá un botón para regresar.

[st] Pasar Argumentos a una Ruta

Es muy común necesitar enviar datos de una pantalla a otra. Por ejemplo, una lista de productos que, al tocar uno, nos lleva a una pantalla de detalles para ese producto específico. Necesitamos pasar el ID o el objeto completo del producto.

El método \`Navigator.pushNamed\` tiene un parámetro opcional llamado \`arguments\` para este propósito.

**Paso 1: Enviar los datos**

Al llamar a \`pushNamed\`, pasamos los datos que queremos enviar en el parámetro \`arguments\`.

[code:dart]
// Enviando un String simple como argumento
onPressed: () {
  Navigator.pushNamed(
    context,
    '/details',
    arguments: 'Hola desde la pantalla de inicio',
  );
}
[endcode]

**Paso 2: Recibir los datos**

En la pantalla de destino, podemos acceder a estos argumentos usando \`ModalRoute\`.

[code:dart]
// En el método build de la pantalla de detalles (DetailsScreen)

@override
Widget build(BuildContext context) {
  // Extraemos los argumentos
  final String message = ModalRoute.of(context)!.settings.arguments as String;

  return Scaffold(
    appBar: AppBar(
      title: const Text('Pantalla de Detalles'),
    ),
    body: Center(
      child: Text(message), // Mostramos el mensaje recibido
    ),
  );
}
[endcode]

Es importante hacer un casting (\`as String\`) porque los argumentos son de tipo \`Object?\`. Debemos asegurarnos de que el tipo que recibimos es el que esperamos.

[st] Pasar Argumentos con un Objeto Personalizado

Enviar un \`String\` es útil, pero a menudo necesitamos enviar objetos más complejos. Podemos crear una clase para encapsular los argumentos y asegurar la consistencia y la seguridad de tipos.

\`Paso 1\` Crear la clase de argumentos

[code:dart]
// Un objeto simple para pasar como argumento
class ScreenArguments {
  final String title;
  final String message;

  ScreenArguments(this.title, this.message);
}
[endcode]

\`Paso 2\` Enviar el objeto

[code:dart]
// Navegar y pasar el objeto ScreenArguments
onPressed: () {
  Navigator.pushNamed(
    context,
    '/details',
    arguments: ScreenArguments(
      'Título Personalizado',
      'Este es un mensaje desde un objeto.',
    ),
  );
}
[endcode]

\`Paso 3\` Recibir y usar el objeto

[code:dart]
// En la pantalla de detalles
@override
Widget build(BuildContext context) {
  final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;

  return Scaffold(
    appBar: AppBar(
      title: Text(args.title), // Usamos el título del objeto
    ),
    body: Center(
      child: Text(args.message), // Usamos el mensaje del objeto
    ),
  );
}
[endcode]

Este método es mucho más robusto y es el recomendado para pasar datos complejos entre pantallas.

[st] Devolver Datos de una Pantalla

Así como enviamos datos hacia adelante, a menudo necesitamos que una pantalla devuelva un resultado a la pantalla que la abrió. Por ejemplo, una pantalla que pide al usuario que elija entre "Sí" o "No" y devuelve esa elección.

Esto se logra combinando \`Navigator.pop()\` en la pantalla secundaria con \`await\` en la llamada de \`Navigator.push()\` en la pantalla principal.

\`Paso 1\` Esperar el resultado

En la pantalla principal, cuando navegamos a la pantalla de selección, usamos \`await\` para pausar la ejecución y esperar a que la pantalla de selección se cierre y devuelva un valor.

[code:dart]
// En la pantalla principal, dentro de un método async

Future<void> _navigateAndDisplaySelection(BuildContext context) async {
  // Esperamos el resultado de la pantalla de selección.
  final result = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => const SelectionScreen()),
  );

  // Después de que la pantalla de selección devuelve un resultado,
  // ¡actualizamos la UI!
  if (context.mounted && result != null) {
    ScaffoldMessenger.of(context)
      ..removeCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text('$result')));
  }
}
[endcode]

\`Paso 2\` Devolver el resultado

En la pantalla de selección, cuando el usuario toma una decisión, usamos \`Navigator.pop()\` para cerrar la pantalla y pasar el resultado de vuelta.

[code:dart]
// En la pantalla de selección, dentro de los botones

// Botón "Sí"
ElevatedButton(
  onPressed: () {
    // Cierra la pantalla y devuelve "¡Sí!" como resultado.
    Navigator.pop(context, '¡Sí!');
  },
  child: const Text('¡Sí!'),
)

// Botón "No"
ElevatedButton(
  onPressed: () {
    // Cierra la pantalla y devuelve "¡No!" como resultado.
    Navigator.pop(context, '¡No!');
  },
  child: const Text('¡No!'),
)
[endcode]

Al presionar un botón, la \`SelectionScreen\` se cierra y el \`String\` correspondiente se devuelve al \`Future\` que estaba esperando en la pantalla principal.

[st] Ejemplo Completo

Aquí tienes un ejemplo completo y funcional para DartPad que demuestra cómo pasar un objeto personalizado de una pantalla a otra y cómo la segunda pantalla puede devolver un dato a la primera.

[code:dart]
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Navegación Avanzada',
      home: HomeScreen(),
    );
  }
}

// --- Pantalla Principal ---
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selection = "Aún no has elegido.";

  // Método para navegar y esperar un resultado
  Future<void> _navigateToSelectionScreen(BuildContext context) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const SelectionScreen()),
    );

    // Si hay un resultado, actualizamos el estado
    if (result != null) {
      setState(() {
        _selection = result;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pantalla Principal'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(_selection, style: const TextStyle(fontSize: 20)),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => _navigateToSelectionScreen(context),
              child: const Text('Abrir pantalla de selección'),
            ),
          ],
        ),
      ),
    );
  }
}

// --- Pantalla de Selección ---
class SelectionScreen extends StatelessWidget {
  const SelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Elige una opción'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Devolver 'Opción A' como resultado
                Navigator.pop(context, 'Has elegido la Opción A');
              },
              child: const Text('Opción A'),
            ),
            ElevatedButton(
              onPressed: () {
                // Devolver 'Opción B' como resultado
                Navigator.pop(context, 'Has elegido la Opción B');
              },
              child: const Text('Opción B'),
            ),
          ],
        ),
      ),
    );
  }
}
[endcode]
.`,HC=`[t] Instalación de Supabase
En esta lección aprenderás a instalar Supabase en modo self-hosted usando Docker Compose. Esto te permitirá tener una instancia local de Supabase con base de datos, autenticación, almacenamiento y la interfaz web Studio.

[st] Pasos para la instalación

[code:bash]
# Clona el repositorio oficial de Supabase
git clone --depth 1 https://github.com/supabase/supabase

# Crea un directorio para tu proyecto Supabase
mkdir supabase-project

# Copia los archivos de Docker al nuevo proyecto
cp -rf supabase/docker/* supabase-project

# Copia las variables de entorno de ejemplo
cp supabase/docker/.env.example supabase-project/.env

# Entra al directorio de tu proyecto
cd supabase-project

# Descarga las imágenes más recientes
docker compose pull

# Inicia los servicios en segundo plano
docker compose up -d
[endcode]

[st] Acceso a la interfaz web
Puedes ingresar a la interfaz web de Supabase en [link] ( http://localhost:8000) http://localhost:8000

Credenciales por defecto
[code:md]
user:supabase
password:this_password_is_insecure_and_should_be_updated
[endcode]

Por seguridad, cambia la contraseña en producción.

[st] Acceso a las APIs
Cada una de las APIs está disponible a través del mismo API gateway:
[list]
REST:     http://\`<your-ip>\`:\`8000\` \`/rest/v1/\` 
Auth:     http://\`<your-domain>\`:\`8000\` \`/auth/v1/\` 
Storage:  http://\`<your-domain>\`:\`8000\` \`/storage/v1/\`
Realtime: http://\`<your-domain>\`:\`8000\` \`/realtime/v1/\`
[endlist]

Reemplaza \`<your-ip>\` o \`<your-domain>\` por la dirección de tu máquina o servidor donde esté corriendo Supabase. 

`,FC=`[t] Programa del curso

[i] logo.png

Bienvenido a su curso de \`Aplicaciones Móviles\`. Este curso brinda a los estudiantes la oportunidad de experimentar un entorno multidisciplinario que refleja los desafíos que se encuentran en su vida profesional. A lo largo de este semestre, se recorrerán todas las etapas del desarrollo de aplicaciones móviles, desde el diseño inicial hasta el despliegue final. Los conceptos adquiridos durante su carrera serán aplicados y se utilizarán herramientas relevantes con el fin de lograr un objetivo común: el lanzamiento de una aplicación móvil innovadora. 

En este programa de estudio, se explorarán los procesos de ideación y prototipado, así como la arquitectura y el diseño de aplicaciones móviles. Además, se adquirirán habilidades para la construcción y despliegue de productos mínimos viables. El uso de herramientas de diseño, bases de datos no relacionales, servicios Cloud y servicios web REST será parte integral de este proceso de aprendizaje. Prepárese para enfrentar los desafíos inherentes al desarrollo de aplicaciones móviles y elevar las habilidades a un nivel superior en este apasionante curso.

[st] Información de la Asignatura
[list]
Nombre de la asignatura: Aplicaciones móviles
Código de la asignatura: 09738 - TIC
Periodo Académico: 202520
Nrc: 10193
Intensidad horaria: 4
Intensidad Semanal: 3
Créditos: 3
Docente: Domiciano Rincón Niño
[endlist]

[st] Formación en competencias
[list]
\`SO1\` Solución de problemas: Identificar, formular y resolver problemas complejos de ingeniería aplicando pensamiento crítico y principios de las ciencias, las matemáticas, la ingeniería y, en particular, de las Ciencias de la Computación y de la Ingeniería de Software.
\`SO3\` Comunicación efectiva: Comunicarse efectivamente de forma oral y escrita, tanto en español como en inglés.
\`SO5\` Trabajar de manera efectiva en equipos, cuyos miembros brinden liderazgo de manera colectiva, creen entornos colaborativos e inclusivos, establezcan metas, planifiquen tareas y logren objetivos, mientras se adaptan a situaciones cambiantes.
[endlist]

[st] Objetivo general de aprendizaje
Desarrollar y aplicar habilidades del diseño, construcción, arquitectura y despliegue de aplicaciones móviles, a través de la participación activa en un equipo de trabajo, siguiendo prácticas ágiles de desarrollo y contribuyendo de manera significativa al logro de los objetivos del proyecto.

[st] Unidades de aprendizaje

\`Unidad 1\` Fundamentos de programación para aplicaciones móviles
[list]
Introducción al curso de Aplicaciones Móviles
Instalación y familiarización con el entorno de desarrollo
Uso del modo de depuración del IDE para identificar y solucionar errores de ejecución
Uso de logs para rastrear y registrar errores durante la ejecución de la aplicación
Estructura de una aplicación móvil y sus componentes principales
Diseño de la interfaz de usuario para aplicaciones móviles
Uso de actividades, fragmentos, persistencia y bases de datos en una aplicación
[endlist]

\`Unidad 2\` Diseño, Ideación y Prototipado
[list]
Estilos de navegación y técnicas de prototipado en el diseño de aplicaciones móviles
Uso de herramientas como Sketch, Wireframe y Mockup para el diseño de interfaces
Creación de prototipos no funcionales para visualizar y validar la experiencia del usuario
Diseño de la experiencia móvil teniendo en cuenta aspectos multidisciplinarios
[endlist]

\`Unidad 3\` Arquitectura de las Aplicaciones Móviles
[list]
Exploración de la arquitectura de soluciones móviles.
Uso del patrón de arquitectura de software MVVM en el desarrollo de aplicaciones móviles.
Utilización de bases de datos no relacionales en el contexto de aplicaciones móviles.
Diseño de bases de datos NO relacionales.
Integración de servicios Cloud utilizando Firebase.
Consumo de Web Services REST y depuración de solicitudes, respuestas y deserialización de datos.
[endlist]

\`Unidad 4\` Construcción y Despliegue
[list]
Desarrollo de un Producto Mínimo Viable (MVP) en el proceso de construcción de una aplicación móvil
Fase de lanzamiento de aplicaciones, considerando aspectos como pruebas, ajustes finales y optimización del rendimiento
Firma digital de aplicaciones para garantizar la autenticidad y seguridad en el despliegue
Preparación de la aplicación previo al lanzamiento en tiendas de aplicaciones como Google Play Store o App Store
[endlist]

[st] Metodologías de aprendizajes
El curso tiene una metodología de trabajo iterativo cuyo eje principal es el proyecto final del curso. Durante el desarrollo de la clase se apropian conceptos que le permitirán trabajar de manera efectiva.
Es responsabilidad del estudiante preparar el material general y el específico por disciplina, porque de eso depende el buen desarrollo de las sesiones con sus coequiperos.
La asistencia es esencial.
El uso de la IA en este curso se define como Uso Colaborativo, lo que implica que la IA participa en la co-creación del aprendizaje junto con el estudiante, respaldada por un proceso de verificación y supervisión activa.

[st] Evaluación de aprendizajes

Pitch
\`10%      \` 
Un pitch elevator junto con su grupo en el que proponga sus ideas de proyecto final

DB
\`15%            \` 
Modelo de la base de datos que deberá presentar mediante diagramas

Proto
\`15%            \`
Prototipo no funcional de alta fidelidad que debe mostrar preliminarmente las funciones de la aplicación. Adicionalmente debe declarar todo los módulos de la aplicación.

Sprint 1
\`15%            \`
De acuerdo al backlog, deberá resolver el módulo de autenticación y autorización de la aplicación. Tenga en cuenta que pueden haber varios roles. Algunas aplicaciones pueden tener un proceso de onboarding más complejo en una app o en otra

Sprint 2
\`15%            \`
De acuerdo al backlog, deberá escoger qué módulos de la aplicación incluirá en el segundo sprint. Esa declaración debe ser presentada en moodle como Kick off del sprint 2.

Sprint 3
\`15%            \`
De acuerdo al backlog, deberá escoger qué módulos de la aplicación incluirá en el segundo sprint. Esa declaración debe ser presentada en moodle como Kick off del sprint 3.

Exhibición
\`15%            \`
La actividad final del curso es exponer su aplicación en una exibición de las funcionalidades alcanzadas

[st] Recursos de apoyo
No es necesario comprar ningún libro para el curso. Todo el material necesario para el curso será suministrado a través de Intu, como los materiales bibliográficos, guías de clases, videos, blogs, cursos en línea y otros.

[st] Enlaces y herramientas relevantes
[link](Documentación oficial de Flutter) https://docs.flutter.dev/get-started/install

[link](Aplicaciones móviles ICESI) https://miro.com/app/board/o9J_I2waJG0=/`,GC=`[t] Pitch Elevator
\`28 de agosto de 2025\`

[st] Consigna
La presentación consiste en hacer un pitch elevator donde usted y su grupo debe presentar tres propuestas de proyecto final para el curso de aplicaciones móviles, de acuerdo a los requerimientos mínimos juntos a este documento en el repositorio de GitHub.
Si su motivación para ver el curso es desarrollar una idea concebida con anterioridad, debe igualmente hacer la exposición.


[st] Contenido
Lea detenidamente las siguientes partes que debe cumplir en la exposición

[st] 1. Propuestas
Usted y su grupo debe presentar al menos tres (3) propuestas que cumplan con los mínimos requeridos en la enunciación del proyecto. Cada propuesta de aplicación móvil debe tener un \`nombre\`.

[st] 2. Identificación del problema
Por cada propuesta, debe describir cuál es el problema que usted y su grupo identificó, cuya solución requiere el diseño e implementación de la aplicación móvil.
Nota: No hay ningún tipo de restricción acerca del contexto o el entorno

[st] 3. Identificación de los roles
Debe plantear qué roles participan o están involucrados en la problemática planteada.

[st] 4. Justificación
Debe argumentar por qué es pertinente el proyecto, cuál es la importancia de resolver el problema, qué oportunidades está aprovechando y de qué forma una aplicación móvil resuelve el problema planteado. Debe hacer énfasis en por qué una solución móvil es lo más adecuado a diferencia de otras soluciones digitales.

[st] 5. Funciones preliminares
Mencione brevemente en qué consiste la aplicación móvil que construirá como solución al problema planteado.
Exponga qué funciones o servicios tendrá a disposición cada uno de los roles identificados.
Si la aplicación sólo tiene un solo rol, debe dotar a este usuario de mínimo 2 funciones principales
Si la aplicación tiene dos roles, cada rol como mínimo debe tener una sola función principal.

[st] Reglas
[list]
La exposición de cada idea debe hacerse en 2 minutos (pitch elevator). En caso que su idea ya esté definida, puede utilizar 6 minutos en total para exponer su única idea.
El tiempo total de exposición es de 10 minutos, 6 minutos para la exposición y 4 minutos para responder preguntas.
No puede plantear la idea de \`Cupos Icesi\`.
Debe usar una presentación por diapositivas. Apoye su discurso usando algunas diapósitivas. Una imagen dice más que mil palabras.
[endlist]
.`,VC=`[t] Planeador

[st] Semana 1 
\`28 de Julio\`
Presentación del curso
Creación de los equipos
Reglas de juego
Presentación del material de apoyo
[link](Semana 1) https://docs.google.com/presentation/d/1N3-4slLFky8rR_Rg5DJf7-Y_g-xP46O5/edit?usp=sharing&ouid=117897710133227559254&rtpof=true&sd=true

Los estudiantes deben preparar la siguiente clase. Para eso deben instalar Flutter, hacer la primera aplicación y estudiar sobre Widgets.

[st] Semana 2
\`4 de Agosto\`
Conformación de equipos
Reglas básicas de diagramación en Flutter
Stateful y Stateless Widgets
Row, Column, TextField, Button, Text, Scaffold, Images, ScrollView
\`Laboratorio de diagramación de pantallas\`
Consumir material sobre statefull widgets, estado y navegación

[st] Semana 3
\`11 de Agosto\`
Navegación entre pantallas
Statefull widget
Indexed Stack
\`Laboratorio de navegación\`
Consumir material sobre listas

[st] Semana 4 
\`18 de Agosto\`
Día destivo, momento para descansar

[st] Semana 5 
\`25 de Agosto\`
\`Pitch Elevator\`
Uso de listas y estrategias de presentación
Producción de APK para test`,YC=`[t] Proyecto final
\`Transcurso del semestre\`

Debe pensar en un problema de su entorno, que pueda ser solucionado a través de una aplicación móvil.

La solución del problema debe consistir en un servicio que se pueda prestar a través de la aplicación móvil, como por ejemplo un servicio de consultoría, de asesoría, de servicios técnicos, de apoyo emocial, de recreación, etc.

Como la aplicación móvil parte de un problema identificado, encuentre la necesidad que está supliendo y decida qué enfoque tendrá su aplicación.

[st] 1. Modelo Cliente - proveedor
[list]
Número mínimo de roles: 2 roles
Los clientes son quienes necesitan el servicio ofrecido por la aplicación.
Los proveedores son quienes pueden ofrecer el servicio.
Cada uno de los actores debe tener un perfil con paneles distintos que les permita usar funciones principales distintas:
A. El cliente puede enviar solicitudes de un servicio ofrecido por los proveedores inscritos en la aplicación.
B. El proveedor puede ver los servicios y atenderlos a través de la interacción con la publicación del cliente. A través de su interfaz puede enviar al solicitante una respuesta.
[endlist]

Por ejemplo, Uber en donde los proveedores serían los dueños de carros dispuestos a ofrecer un servicio de transporte a los usuarios de la plataforma y los clientes son las personas que necesitan el servicio de transporte.
Entonces el cliente solicita ser transportado a través de la aplicación (solicitud) y los proveedores pueden interactuar con la solicitud a través de la aplicación y atender el servicio (respuesta), de modo que tanto el cliente es retroalimentado sobre el resultado de su solicitud.

[st] 2. Modelo de comunidad
[list]
Número mínimo de roles: 1 rol
Cada integrante de la comunidad es capaz de realizar mínimo dos acciones principales usando una interfaz común para todos los miembros de la comunidad:
A. El usuario puede postear, reportar, alertar, generar contenido. Este contenido debe tener algún alcance mínimo de difusión de modo que otros usuarios pueda ver estas publicaciones. La visibilidad o acceso a las publicaciones se define bajo sus propias políticas.
B. La segunda función es poder ver e interactuar con las publicaciones de los demas usuarios de la comunidad. Al tratarse de una comunidad, estas interacciones deben tener la misma visibilidad que la publicación con la que se interactúa.
[endlist]

Por ejemplo Twitter, donde todos los usuarios pueden tuitear (publicación) y cualquiera ver el tuit e interactuar con él: comentar el tuit, retuitear, darle like. (interacción).

En cualquiera de los dos modelos, las dos funciones principales resumen en:
[list]
A. Hacer una publicación (solicitud, post, reporte, alerta, contenido, etc)
B. Interactuar con esa publicación (respuesta de la solicitud, interacción con la publicación)
[endlist]

[st] Requerimientos generales
[list]
A. La idea de aplicación debe resolver un problema identificado en su entorno, por ustedes, mediante un servicio que preste la aplicación.
B. El sistema puede tener dos roles (cliente y proveedor) o uno sólo (miembro de la comunidad). En ambos casos debe programar distintos procesos teniendo en cuenta que mínimo debe tener 2 funciones principales (publicación e interacción con la publicación).
C. En el caso de los dos roles debe preparar una única aplicación de modo que al momento de hacer Log In, de acuerdo al rol ingrese a las funciones de cada rol respectivamente. Cada rol tiene a disposición 1 función principal.
D. En el caso de la comunidad, la aplicación debe verse igual, pero debe poder ofrecerle al usuario dos funciones principales: una de publicación y una de interacción.
[endlist]

[st] Requerimientos técnicos
[list]
A. Debe usar una base de datos de Google Firebase para almacenar las solicitudes, las respuestas y los usuarios.
B. La aplicación tiene, como mínimo las siguientes pantallas:
1. Splash screen
2. Login
3. Registro
Cliente-proveedor: deben haber dos registros, uno para el cliente y otro para el proveedor
Comunidad: único registro para el usuario
4. Resumen del usuario donde debe aparecer su nombre, rol, descripción y calificación.
5. Pantalla publicación: donde el cliente puede llamar, postear, reportar, alertar, publicar.
Cliente-proveedor: es la pantalla donde el usuario puede solicitar un servicio.
Comunidad: es donde el usuario es capaz de generar una publicación.
6. Pantalla de interacción: donde el usaurio puede ver las publicaciones de los demás usaurios (feed de la aplicación) y le permite interactuar con estas publicaciones.
Cliente-proveedor: le permite ver las solicitudes de un usuario y atenderlas.
7. Sistema de notificaciones para avisar a los usuarios mínimos 2 eventos dentro de la aplicación. Por ejemplo: nueva publicación de un usuario de comunidad, nueva solicitud, nueva interacción, nuevo usuario.
[endlist]

Nota: estas vistas pueden componerse de varias actividades o fragmentos, según la complejidad de su propuesta.

Piense en tres ideas preliminares donde haya una justificación, una identificación de roles y el problema que resuelve. Debe presentar estas ideas en el \`Pitch Elevator\`. La guía de esta exposición se puede ver en esta misma sección de \`Asignaciones\`

.`,wv=`[t] Curso
[lesson] lessonZ1.md
[lesson] lessonZ3.md
[t] Asignaciones
[lesson] lessonZ2.md
[lesson] lessonZ4.md
[t] Dart basics
[lesson] lessonA1.md
[lesson] lessonA2.md
[lesson] lessonA3.md
[lesson] lessonA4.md
[lesson] lessonA5.md
[lesson] lessonA6.md
[lesson] lessonA7.md
[lesson] lessonA8.md
[t] Advanced Dart
[lesson] lessonB1.md
[lesson] lessonB2.md
[lesson] lessonB3.md
[lesson] lessonB4.md
[lesson] lessonB5.md
[lesson] lessonB6.md
[t] Flutter · SEMANA 1
[lesson] lessonC1.md
[lesson] lessonC2.md
[lesson] lessonC3.md
[lesson] lessonC4.md
[t] UI · SEMANA 1
[lesson] lessonD1.md
[lesson] lessonD2.md
[lesson] lessonD3.md
[lesson] lessonD5.md
[t] Widgets básicos · SEMANA 1
[lesson] lessonD4A.md
[lesson] lessonD4B.md
[lesson] lessonD4C.md
[lesson] lessonD4D.md
[t] UI Extras
[lesson] lessonD4E.md
[lesson] lessonD6.md
[t] Navegación
[lesson] lessonE1.md
[lesson] lessonE2.md
[t] Supabase
[lesson] lessonX5.md`,Xh=Object.assign({"/src/content/lessonA1.md":fC,"/src/content/lessonA2.md":pC,"/src/content/lessonA3.md":mC,"/src/content/lessonA4.md":gC,"/src/content/lessonA5.md":hC,"/src/content/lessonA6.md":yC,"/src/content/lessonA7.md":vC,"/src/content/lessonA8.md":bC,"/src/content/lessonB1.md":SC,"/src/content/lessonB2.md":xC,"/src/content/lessonB3.md":EC,"/src/content/lessonB4.md":AC,"/src/content/lessonB5.md":TC,"/src/content/lessonB6.md":CC,"/src/content/lessonC1.md":RC,"/src/content/lessonC2.md":wC,"/src/content/lessonC3.md":MC,"/src/content/lessonC4.md":OC,"/src/content/lessonD1.md":_C,"/src/content/lessonD1code.md":BC,"/src/content/lessonD2.md":DC,"/src/content/lessonD3.md":NC,"/src/content/lessonD4A.md":zC,"/src/content/lessonD4B.md":LC,"/src/content/lessonD4C.md":kC,"/src/content/lessonD4D.md":jC,"/src/content/lessonD4E.md":UC,"/src/content/lessonD5.md":$C,"/src/content/lessonD6.md":qC,"/src/content/lessonE1.md":PC,"/src/content/lessonE2.md":IC,"/src/content/lessonX5.md":HC,"/src/content/lessonZ1.md":FC,"/src/content/lessonZ2.md":GC,"/src/content/lessonZ3.md":VC,"/src/content/lessonZ4.md":YC,"/src/content/toc.md":wv}),Si={};for(const n in Xh){const o=n.split("/").pop();Si[o]=Xh[n]}console.log("Imported lesson raw contents:",Si);const WC=async n=>{const o=n.split(`
`).map(c=>c.trim()).filter(c=>c!==""),i=[];let l=0;for(const c of o)if(c.startsWith("[t]")){const d=c.slice(3).trim(),f=d.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");i.push({type:"title",id:f,label:d})}else if(c.startsWith("[d]"))i.push({type:"divider"});else if(c.startsWith("[lesson]")){const d=c.slice(8).trim(),f=++l,p=Si[d];if(p){const g=dC(p);i.push({type:"lesson",id:String(f),label:g||`Lección ${f} (sin título)`,filePath:d})}else console.warn(`[TableOfContentsParser] No se encontró el contenido para la lección: ${d}. Asegúrate de que el archivo existe en la carpeta 'content'.`),i.push({type:"lesson",id:String(f),label:`Error: Lección no encontrada (${d})`,filePath:d})}return i},XC=({children:n})=>{const{theme:o}=Xn();return k.jsx(un,{variant:"h2",component:"h1",sx:{color:o.contentTitle,fontWeight:800,fontSize:{xs:"2.5rem",md:"3.5rem"},letterSpacing:"0.05em",mt:4,mb:2,lineHeight:1.1,textAlign:"left",fontFamily:"'Roboto', sans-serif"},children:n})},ZC=({children:n,id:o})=>{const{theme:i}=Xn();return console.log("LessonSub rendering with ID:",o),k.jsx(un,{id:o,variant:"h4",sx:{color:i.contentSubtitle,fontWeight:600,fontSize:{xs:"1.5rem",md:"2rem"},letterSpacing:"0.02em",textAlign:"left",lineHeight:1.2,fontFamily:"'Roboto', sans-serif"},children:n})},QC=({children:n})=>{const{theme:o}=Xn();return k.jsx(un,{sx:{color:o.textPrimary,fontSize:{xs:"1.05rem",md:"1.18rem"},lineHeight:1.7,fontFamily:"Roboto, Arial, sans-serif"},children:n})};var id={exports:{}},Zh;function KC(){return Zh||(Zh=1,function(n){var o=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var i=function(l){var c=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,f={},p={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function C(T){return T instanceof g?new g(T.type,C(T.content),T.alias):Array.isArray(T)?T.map(C):T.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(C){return Object.prototype.toString.call(C).slice(8,-1)},objId:function(C){return C.__id||Object.defineProperty(C,"__id",{value:++d}),C.__id},clone:function C(T,R){R=R||{};var w,_;switch(p.util.type(T)){case"Object":if(_=p.util.objId(T),R[_])return R[_];w={},R[_]=w;for(var j in T)T.hasOwnProperty(j)&&(w[j]=C(T[j],R));return w;case"Array":return _=p.util.objId(T),R[_]?R[_]:(w=[],R[_]=w,T.forEach(function(G,I){w[I]=C(G,R)}),w);default:return T}},getLanguage:function(C){for(;C;){var T=c.exec(C.className);if(T)return T[1].toLowerCase();C=C.parentElement}return"none"},setLanguage:function(C,T){C.className=C.className.replace(RegExp(c,"gi"),""),C.classList.add("language-"+T)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(w){var C=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(w.stack)||[])[1];if(C){var T=document.getElementsByTagName("script");for(var R in T)if(T[R].src==C)return T[R]}return null}},isActive:function(C,T,R){for(var w="no-"+T;C;){var _=C.classList;if(_.contains(T))return!0;if(_.contains(w))return!1;C=C.parentElement}return!!R}},languages:{plain:f,plaintext:f,text:f,txt:f,extend:function(C,T){var R=p.util.clone(p.languages[C]);for(var w in T)R[w]=T[w];return R},insertBefore:function(C,T,R,w){w=w||p.languages;var _=w[C],j={};for(var G in _)if(_.hasOwnProperty(G)){if(G==T)for(var I in R)R.hasOwnProperty(I)&&(j[I]=R[I]);R.hasOwnProperty(G)||(j[G]=_[G])}var S=w[C];return w[C]=j,p.languages.DFS(p.languages,function(Z,te){te===S&&Z!=C&&(this[Z]=j)}),j},DFS:function C(T,R,w,_){_=_||{};var j=p.util.objId;for(var G in T)if(T.hasOwnProperty(G)){R.call(T,G,T[G],w||G);var I=T[G],S=p.util.type(I);S==="Object"&&!_[j(I)]?(_[j(I)]=!0,C(I,R,null,_)):S==="Array"&&!_[j(I)]&&(_[j(I)]=!0,C(I,R,G,_))}}},plugins:{},highlightAll:function(C,T){p.highlightAllUnder(document,C,T)},highlightAllUnder:function(C,T,R){var w={callback:R,container:C,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};p.hooks.run("before-highlightall",w),w.elements=Array.prototype.slice.apply(w.container.querySelectorAll(w.selector)),p.hooks.run("before-all-elements-highlight",w);for(var _=0,j;j=w.elements[_++];)p.highlightElement(j,T===!0,w.callback)},highlightElement:function(C,T,R){var w=p.util.getLanguage(C),_=p.languages[w];p.util.setLanguage(C,w);var j=C.parentElement;j&&j.nodeName.toLowerCase()==="pre"&&p.util.setLanguage(j,w);var G=C.textContent,I={element:C,language:w,grammar:_,code:G};function S(te){I.highlightedCode=te,p.hooks.run("before-insert",I),I.element.innerHTML=I.highlightedCode,p.hooks.run("after-highlight",I),p.hooks.run("complete",I),R&&R.call(I.element)}if(p.hooks.run("before-sanity-check",I),j=I.element.parentElement,j&&j.nodeName.toLowerCase()==="pre"&&!j.hasAttribute("tabindex")&&j.setAttribute("tabindex","0"),!I.code){p.hooks.run("complete",I),R&&R.call(I.element);return}if(p.hooks.run("before-highlight",I),!I.grammar){S(p.util.encode(I.code));return}if(T&&l.Worker){var Z=new Worker(p.filename);Z.onmessage=function(te){S(te.data)},Z.postMessage(JSON.stringify({language:I.language,code:I.code,immediateClose:!0}))}else S(p.highlight(I.code,I.grammar,I.language))},highlight:function(C,T,R){var w={code:C,grammar:T,language:R};if(p.hooks.run("before-tokenize",w),!w.grammar)throw new Error('The language "'+w.language+'" has no grammar.');return w.tokens=p.tokenize(w.code,w.grammar),p.hooks.run("after-tokenize",w),g.stringify(p.util.encode(w.tokens),w.language)},tokenize:function(C,T){var R=T.rest;if(R){for(var w in R)T[w]=R[w];delete T.rest}var _=new b;return x(_,_.head,C),y(C,_,T,_.head,0),M(_)},hooks:{all:{},add:function(C,T){var R=p.hooks.all;R[C]=R[C]||[],R[C].push(T)},run:function(C,T){var R=p.hooks.all[C];if(!(!R||!R.length))for(var w=0,_;_=R[w++];)_(T)}},Token:g};l.Prism=p;function g(C,T,R,w){this.type=C,this.content=T,this.alias=R,this.length=(w||"").length|0}g.stringify=function C(T,R){if(typeof T=="string")return T;if(Array.isArray(T)){var w="";return T.forEach(function(S){w+=C(S,R)}),w}var _={type:T.type,content:C(T.content,R),tag:"span",classes:["token",T.type],attributes:{},language:R},j=T.alias;j&&(Array.isArray(j)?Array.prototype.push.apply(_.classes,j):_.classes.push(j)),p.hooks.run("wrap",_);var G="";for(var I in _.attributes)G+=" "+I+'="'+(_.attributes[I]||"").replace(/"/g,"&quot;")+'"';return"<"+_.tag+' class="'+_.classes.join(" ")+'"'+G+">"+_.content+"</"+_.tag+">"};function m(C,T,R,w){C.lastIndex=T;var _=C.exec(R);if(_&&w&&_[1]){var j=_[1].length;_.index+=j,_[0]=_[0].slice(j)}return _}function y(C,T,R,w,_,j){for(var G in R)if(!(!R.hasOwnProperty(G)||!R[G])){var I=R[G];I=Array.isArray(I)?I:[I];for(var S=0;S<I.length;++S){if(j&&j.cause==G+","+S)return;var Z=I[S],te=Z.inside,ie=!!Z.lookbehind,re=!!Z.greedy,le=Z.alias;if(re&&!Z.pattern.global){var $=Z.pattern.toString().match(/[imsuy]*$/)[0];Z.pattern=RegExp(Z.pattern.source,$+"g")}for(var J=Z.pattern||Z,K=w.next,ae=_;K!==T.tail&&!(j&&ae>=j.reach);ae+=K.value.length,K=K.next){var N=K.value;if(T.length>C.length)return;if(!(N instanceof g)){var W=1,ee;if(re){if(ee=m(J,ae,C,ie),!ee||ee.index>=C.length)break;var ue=ee.index,ne=ee.index+ee[0].length,oe=ae;for(oe+=K.value.length;ue>=oe;)K=K.next,oe+=K.value.length;if(oe-=K.value.length,ae=oe,K.value instanceof g)continue;for(var me=K;me!==T.tail&&(oe<ne||typeof me.value=="string");me=me.next)W++,oe+=me.value.length;W--,N=C.slice(ae,oe),ee.index-=ae}else if(ee=m(J,0,N,ie),!ee)continue;var ue=ee.index,Ve=ee[0],Te=N.slice(0,ue),Et=N.slice(ue+Ve.length),At=ae+N.length;j&&At>j.reach&&(j.reach=At);var Tt=K.prev;Te&&(Tt=x(T,Tt,Te),ae+=Te.length),D(T,Tt,W);var Aa=new g(G,te?p.tokenize(Ve,te):Ve,le,Ve);if(K=x(T,Tt,Aa),Et&&x(T,K,Et),W>1){var Mn={cause:G+","+S,reach:At};y(C,T,R,K.prev,ae,Mn),j&&Mn.reach>j.reach&&(j.reach=Mn.reach)}}}}}}function b(){var C={value:null,prev:null,next:null},T={value:null,prev:C,next:null};C.next=T,this.head=C,this.tail=T,this.length=0}function x(C,T,R){var w=T.next,_={value:R,prev:T,next:w};return T.next=_,w.prev=_,C.length++,_}function D(C,T,R){for(var w=T.next,_=0;_<R&&w!==C.tail;_++)w=w.next;T.next=w,w.prev=T,C.length-=_}function M(C){for(var T=[],R=C.head.next;R!==C.tail;)T.push(R.value),R=R.next;return T}if(!l.document)return l.addEventListener&&(p.disableWorkerMessageHandler||l.addEventListener("message",function(C){var T=JSON.parse(C.data),R=T.language,w=T.code,_=T.immediateClose;l.postMessage(p.highlight(w,p.languages[R],R)),_&&l.close()},!1)),p;var E=p.util.currentScript();E&&(p.filename=E.src,E.hasAttribute("data-manual")&&(p.manual=!0));function z(){p.manual||p.highlightAll()}if(!p.manual){var O=document.readyState;O==="loading"||O==="interactive"&&E&&E.defer?document.addEventListener("DOMContentLoaded",z):window.requestAnimationFrame?window.requestAnimationFrame(z):window.setTimeout(z,16)}return p}(o);n.exports&&(n.exports=i),typeof Ig<"u"&&(Ig.Prism=i),i.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.languages.markup.doctype.inside["internal-subset"].inside=i.languages.markup,i.hooks.add("wrap",function(l){l.type==="entity"&&(l.attributes.title=l.content.replace(/&amp;/,"&"))}),Object.defineProperty(i.languages.markup.tag,"addInlined",{value:function(c,d){var f={};f["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:i.languages[d]},f.cdata=/^<!\[CDATA\[|\]\]>$/i;var p={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:f}};p["language-"+d]={pattern:/[\s\S]+/,inside:i.languages[d]};var g={};g[c]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return c}),"i"),lookbehind:!0,greedy:!0,inside:p},i.languages.insertBefore("markup","cdata",g)}}),Object.defineProperty(i.languages.markup.tag,"addAttribute",{value:function(l,c){i.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+l+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[c,"language-"+c],inside:i.languages[c]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.xml=i.languages.extend("markup",{}),i.languages.ssml=i.languages.xml,i.languages.atom=i.languages.xml,i.languages.rss=i.languages.xml,function(l){var c=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;l.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+c.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+c.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+c.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+c.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:c,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},l.languages.css.atrule.inside.rest=l.languages.css;var d=l.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))}(i),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{"class-name":[i.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),i.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,i.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:i.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:i.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:i.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:i.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:i.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),i.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:i.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),i.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),i.languages.markup&&(i.languages.markup.tag.addInlined("script","javascript"),i.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),i.languages.js=i.languages.javascript,function(){if(typeof i>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var l="Loading…",c=function(E,z){return"✖ Error "+E+" while fetching file: "+z},d="✖ Error: File does not exist or is empty",f={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},p="data-src-status",g="loading",m="loaded",y="failed",b="pre[data-src]:not(["+p+'="'+m+'"]):not(['+p+'="'+g+'"])';function x(E,z,O){var C=new XMLHttpRequest;C.open("GET",E,!0),C.onreadystatechange=function(){C.readyState==4&&(C.status<400&&C.responseText?z(C.responseText):C.status>=400?O(c(C.status,C.statusText)):O(d))},C.send(null)}function D(E){var z=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(E||"");if(z){var O=Number(z[1]),C=z[2],T=z[3];return C?T?[O,Number(T)]:[O,void 0]:[O,O]}}i.hooks.add("before-highlightall",function(E){E.selector+=", "+b}),i.hooks.add("before-sanity-check",function(E){var z=E.element;if(z.matches(b)){E.code="",z.setAttribute(p,g);var O=z.appendChild(document.createElement("CODE"));O.textContent=l;var C=z.getAttribute("data-src"),T=E.language;if(T==="none"){var R=(/\.(\w+)$/.exec(C)||[,"none"])[1];T=f[R]||R}i.util.setLanguage(O,T),i.util.setLanguage(z,T);var w=i.plugins.autoloader;w&&w.loadLanguages(T),x(C,function(_){z.setAttribute(p,m);var j=D(z.getAttribute("data-range"));if(j){var G=_.split(/\r\n?|\n/g),I=j[0],S=j[1]==null?G.length:j[1];I<0&&(I+=G.length),I=Math.max(0,Math.min(I-1,G.length)),S<0&&(S+=G.length),S=Math.max(0,Math.min(S,G.length)),_=G.slice(I,S).join(`
`),z.hasAttribute("data-start")||z.setAttribute("data-start",String(I+1))}O.textContent=_,i.highlightElement(O)},function(_){z.setAttribute(p,y),O.textContent=_})}}),i.plugins.fileHighlight={highlight:function(z){for(var O=(z||document).querySelectorAll(b),C=0,T;T=O[C++];)i.highlightElement(T)}};var M=!1;i.fileHighlight=function(){M||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),M=!0),i.plugins.fileHighlight.highlight.apply(this,arguments)}}()}(id)),id.exports}var JC=KC();const eR=ps(JC);(function(n){var o=[/\b(?:async|sync|yield)\*/,/\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/],i=/(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,l={pattern:RegExp(i+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}}}};n.languages.dart=n.languages.extend("clike",{"class-name":[l,{pattern:RegExp(i+/[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),lookbehind:!0,inside:l.inside}],keyword:o,operator:/\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/}),n.languages.insertBefore("dart","string",{"string-literal":{pattern:/r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,lookbehind:!0,inside:{punctuation:/^\$\{?|\}$/,expression:{pattern:/[\s\S]+/,inside:n.languages.dart}}},string:/[\s\S]+/}},string:void 0}),n.languages.insertBefore("dart","class-name",{metadata:{pattern:/@\w+/,alias:"function"}}),n.languages.insertBefore("dart","class-name",{generics:{pattern:/<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,inside:{"class-name":l,keyword:o,punctuation:/[<>(),.:]/,operator:/[?&|]/}}})})(Prism);Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(n){var o=n.util.clone(n.languages.javascript),i=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,l=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,c=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function d(g,m){return g=g.replace(/<S>/g,function(){return i}).replace(/<BRACES>/g,function(){return l}).replace(/<SPREAD>/g,function(){return c}),RegExp(g,m)}c=d(c).source,n.languages.jsx=n.languages.extend("markup",o),n.languages.jsx.tag.pattern=d(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),n.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,n.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,n.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,n.languages.jsx.tag.inside.comment=o.comment,n.languages.insertBefore("inside","attr-name",{spread:{pattern:d(/<SPREAD>/.source),inside:n.languages.jsx}},n.languages.jsx.tag),n.languages.insertBefore("inside","special-attr",{script:{pattern:d(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:n.languages.jsx}}},n.languages.jsx.tag);var f=function(g){return g?typeof g=="string"?g:typeof g.content=="string"?g.content:g.content.map(f).join(""):""},p=function(g){for(var m=[],y=0;y<g.length;y++){var b=g[y],x=!1;if(typeof b!="string"&&(b.type==="tag"&&b.content[0]&&b.content[0].type==="tag"?b.content[0].content[0].content==="</"?m.length>0&&m[m.length-1].tagName===f(b.content[0].content[1])&&m.pop():b.content[b.content.length-1].content==="/>"||m.push({tagName:f(b.content[0].content[1]),openedBraces:0}):m.length>0&&b.type==="punctuation"&&b.content==="{"?m[m.length-1].openedBraces++:m.length>0&&m[m.length-1].openedBraces>0&&b.type==="punctuation"&&b.content==="}"?m[m.length-1].openedBraces--:x=!0),(x||typeof b=="string")&&m.length>0&&m[m.length-1].openedBraces===0){var D=f(b);y<g.length-1&&(typeof g[y+1]=="string"||g[y+1].type==="plain-text")&&(D+=f(g[y+1]),g.splice(y+1,1)),y>0&&(typeof g[y-1]=="string"||g[y-1].type==="plain-text")&&(D=f(g[y-1])+D,g.splice(y-1,1),y--),g[y]=new n.Token("plain-text",D,null,D)}b.content&&typeof b.content!="string"&&p(b.content)}};n.hooks.add("after-tokenize",function(g){g.language!=="jsx"&&g.language!=="tsx"||p(g.tokens)})})(Prism);var Qh={},Kh;function tR(){return Kh||(Kh=1,function(n){var o=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,i=/(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,l={pattern:RegExp(/(^|[^\w.])/.source+i+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};n.languages.java=n.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[l,{pattern:RegExp(/(^|[^\w.])/.source+i+/[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),lookbehind:!0,inside:l.inside},{pattern:RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source+i+/[A-Z]\w*\b/.source),lookbehind:!0,inside:l.inside}],keyword:o,function:[n.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),n.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),n.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":l,keyword:o,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(/(\bimport\s+)/.source+i+/(?:[A-Z]\w*|\*)(?=\s*;)/.source),lookbehind:!0,inside:{namespace:l.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(/(\bimport\s+static\s+)/.source+i+/(?:\w+|\*)(?=\s*;)/.source),lookbehind:!0,alias:"static",inside:{namespace:l.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,function(){return o.source})),lookbehind:!0,inside:{punctuation:/\./}}})}(Prism)),Qh}tR();Prism.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/};(function(n){var o="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",i={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},l={bash:i,environment:{pattern:RegExp("\\$"+o),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+o),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};n.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+o),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:l},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:i}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:l},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:l.entity}}],environment:{pattern:RegExp("\\$?"+o),alias:"constant"},variable:l.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},i.inside=n.languages.bash;for(var c=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],d=l.variable[1].inside,f=0;f<c.length;f++)d[c[f]]=n.languages.bash[c[f]];n.languages.sh=n.languages.bash,n.languages.shell=n.languages.bash})(Prism);var Jh={},ey;function nR(){return ey||(ey=1,function(n){var o=[/"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,/'[^']*'/.source,/\$'(?:[^'\\]|\\[\s\S])*'/.source,/<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source].join("|");n.languages["shell-session"]={command:{pattern:RegExp(/^/.source+"(?:"+(/[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/.source+"|"+/[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source)+")?"+/[$#%](?=\s)/.source+/(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(/<<str>>/g,function(){return o}),"m"),greedy:!0,inside:{info:{pattern:/^[^#$%]+/,alias:"punctuation",inside:{user:/^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,punctuation:/:/,path:/[\s\S]+/}},bash:{pattern:/(^[$#%]\s*)\S[\s\S]*/,lookbehind:!0,alias:"language-bash",inside:n.languages.bash},"shell-symbol":{pattern:/^[$#%]/,alias:"important"}}},output:/.(?:.*(?:[\r\n]|.$))*/},n.languages["sh-session"]=n.languages.shellsession=n.languages["shell-session"]}(Prism)),Jh}nR();Prism.languages.http={method:{pattern:/\b(?:GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\b/i,alias:"keyword"},url:{pattern:/\/[^\s\n]+/,alias:"string"},header:{pattern:/^[A-Z][a-zA-Z0-9-]*:/m,alias:"property"},"status-code":{pattern:/\b\d{3}\b/,alias:"number"},version:{pattern:/HTTP\/\d\.\d/,alias:"string"},punctuation:/[{}[\];(),.:]/,operator:/[=<>]/,comment:{pattern:/#.*$/m,greedy:!0}};Prism.languages.sql={comment:{pattern:/--.*/,greedy:!0},string:{pattern:/(^|[^\\'])'(?:[^'\\]|\\.)*'/,lookbehind:!0,greedy:!0},keyword:/\b(?:ADD|ALL|ALTER|AND|ANY|AS|ASC|AUTO_INCREMENT|BETWEEN|BY|CASE|CHECK|COLUMN|CONSTRAINT|CREATE|CROSS|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|DATABASE|DEFAULT|DELETE|DESC|DISTINCT|DROP|ELSE|EXISTS|FOREIGN|FROM|FULL|GROUP|HAVING|IN|INDEX|INNER|INSERT|INTO|IS|JOIN|KEY|LEFT|LIKE|LIMIT|NOT|NULL|ON|OR|ORDER|OUTER|PRIMARY|REFERENCES|RIGHT|SELECT|SET|TABLE|THEN|UNION|UNIQUE|UPDATE|VALUES|WHEN|WHERE|WITH)\b/i,function:/\b(?:AVG|COUNT|MAX|MIN|SUM)\b/i,boolean:/\b(?:TRUE|FALSE)\b/i,number:/\b\d+(?:\.\d+)?\b/,operator:/[-+*\/=<>!&|]/,punctuation:/[;(),.]/};Prism.languages.java={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(^|[^\\])"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},keyword:/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,"class-name":{pattern:/\b[A-Z]\w*(?:\s*\.\s*[A-Z]\w*)*\b/,inside:{punctuation:/\./}},function:/\b\w+(?=\s*\()/,number:/\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp+-]+|\d*\.?\d+(?:e\d+)?[dfl]?)\b/i,operator:{pattern:/(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,lookbehind:!0},punctuation:/[{}[\];(),.:]/};const aR=dn(k.jsx("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"})),Ad=({children:n,language:o,className:i=""})=>{const l=A.useRef(null);A.useEffect(()=>{l.current&&eR.highlightElement(l.current)},[n,o]);const c=()=>{navigator.clipboard.writeText(n)};return k.jsxs(Pe,{className:`flutter-code ${i}`,sx:{position:"relative",mt:0,mb:0,maxWidth:"100%","& pre":{border:"none !important",boxShadow:"none !important",marginBottom:"0 !important"},"& code":{border:"none !important",boxShadow:"none !important"}},children:[k.jsx(Xr,{onClick:c,sx:{position:"absolute",top:8,right:8,color:"#fff",background:"rgba(0,0,0,0.18)","&:hover":{background:"rgba(0,0,0,0.32)"}},size:"small","aria-label":"Copiar código",children:k.jsx(aR,{fontSize:"small"})}),k.jsx("pre",{style:{margin:0,marginBottom:0,maxWidth:800,overflowX:"auto",paddingBottom:8,scrollbarWidth:"none"},className:"codeblock-pre-hide-scroll",children:k.jsx("code",{className:`language-${o}`,ref:l,children:n})})]})},rR=({videoId:n,title:o="YouTube video"})=>k.jsx(Pe,{sx:{position:"relative",paddingBottom:{lg:"38%",xs:"48%"},height:0,marginLeft:0,marginRight:0,overflow:"hidden",borderRadius:4,boxShadow:3,my:3},children:k.jsx("iframe",{src:`https://www.youtube.com/embed/${n}?vq=hd1080&rel=0`,title:o,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}})}),oR=({src:n,alt:o="Imagen"})=>k.jsx(Pe,{sx:{position:"relative",width:"100%",borderRadius:6,boxShadow:20,overflow:"hidden",my:1},children:k.jsx("img",{src:n,alt:o,style:{width:"100%",height:"auto",display:"block"}})}),iR=({children:n})=>k.jsx(Pe,{sx:{maxWidth:"100%",px:{xs:2,sm:4,md:6},pt:{xs:3,sm:4,md:6},pb:{xs:2,sm:3},width:"100%",boxSizing:"border-box"},children:n}),Mv=({gistId:n,height:o="800px"})=>{const i=`https://dartpad.dev/embed-flutter.html?split=50&theme=dark&id=${n}`;return k.jsx(Pe,{component:"iframe",src:i,width:"100%",height:o,sx:{border:"none",borderRadius:0,my:0,boxShadow:"none"},title:"DartPad Embed"})},lR=({src:n,alt:o="Imagen"})=>k.jsx(Pe,{sx:{position:"relative",width:"100%",overflow:"hidden",my:3},children:k.jsx("img",{src:n,alt:o,style:{width:"100%",height:"auto",display:"block"}})}),sR=dn(k.jsx("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"})),Hr=({displayname:n,url:o})=>{const{theme:i}=Xn();return k.jsxs("a",{href:o,target:"_blank",rel:"noopener noreferrer",style:{color:i.accent,textDecoration:"none",fontWeight:500,display:"inline-flex",alignItems:"center",gap:4,position:"relative",transition:"color 0.2s",marginLeft:2,marginRight:2},onMouseOver:l=>l.currentTarget.style.color=i.contentTitle,onMouseOut:l=>l.currentTarget.style.color=i.accent,children:[k.jsx("span",{style:{lineHeight:1},children:n}),k.jsx(sR,{sx:{fontSize:"1.1em",marginLeft:.5,verticalAlign:"middle"}})]})},cR="/apps/assets/logo-_y-hqQDL.png",uR="/apps/assets/logo-BIUmiWom.svg",dR="/apps/assets/react-CHdo91hT.svg",Ov="/apps/assets/techlogo-g3WgRTn1.svg",fR=Object.assign({"./logo.png":cR,"./logo.svg":uR,"./react.svg":dR,"./techlogo.svg":Ov}),ty=Object.fromEntries(Object.entries(fR).map(([n,o])=>[n.replace("./",""),o]));function pR(n){return it("MuiButton",n)}const Fa=at("MuiButton",["root","text","textInherit","textPrimary","textSecondary","textSuccess","textError","textInfo","textWarning","outlined","outlinedInherit","outlinedPrimary","outlinedSecondary","outlinedSuccess","outlinedError","outlinedInfo","outlinedWarning","contained","containedInherit","containedPrimary","containedSecondary","containedSuccess","containedError","containedInfo","containedWarning","disableElevation","focusVisible","disabled","colorInherit","colorPrimary","colorSecondary","colorSuccess","colorError","colorInfo","colorWarning","textSizeSmall","textSizeMedium","textSizeLarge","outlinedSizeSmall","outlinedSizeMedium","outlinedSizeLarge","containedSizeSmall","containedSizeMedium","containedSizeLarge","sizeMedium","sizeSmall","sizeLarge","fullWidth","startIcon","endIcon","icon","iconSizeSmall","iconSizeMedium","iconSizeLarge","loading","loadingWrapper","loadingIconPlaceholder","loadingIndicator","loadingPositionCenter","loadingPositionStart","loadingPositionEnd"]),mR=A.createContext({}),gR=A.createContext(void 0),hR=n=>{const{color:o,disableElevation:i,fullWidth:l,size:c,variant:d,loading:f,loadingPosition:p,classes:g}=n,m={root:["root",f&&"loading",d,`${d}${ye(o)}`,`size${ye(c)}`,`${d}Size${ye(c)}`,`color${ye(o)}`,i&&"disableElevation",l&&"fullWidth",f&&`loadingPosition${ye(p)}`],startIcon:["icon","startIcon",`iconSize${ye(c)}`],endIcon:["icon","endIcon",`iconSize${ye(c)}`],loadingIndicator:["loadingIndicator"],loadingWrapper:["loadingWrapper"]},y=ft(m,pR,g);return{...g,...y}},_v=[{props:{size:"small"},style:{"& > *:nth-of-type(1)":{fontSize:18}}},{props:{size:"medium"},style:{"& > *:nth-of-type(1)":{fontSize:20}}},{props:{size:"large"},style:{"& > *:nth-of-type(1)":{fontSize:22}}}],yR=Re(Zd,{shouldForwardProp:n=>Os(n)||n==="classes",name:"MuiButton",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,o[i.variant],o[`${i.variant}${ye(i.color)}`],o[`size${ye(i.size)}`],o[`${i.variant}Size${ye(i.size)}`],i.color==="inherit"&&o.colorInherit,i.disableElevation&&o.disableElevation,i.fullWidth&&o.fullWidth,i.loading&&o.loading]}})(yt(({theme:n})=>{const o=n.palette.mode==="light"?n.palette.grey[300]:n.palette.grey[800],i=n.palette.mode==="light"?n.palette.grey.A100:n.palette.grey[700];return{...n.typography.button,minWidth:64,padding:"6px 16px",border:0,borderRadius:(n.vars||n).shape.borderRadius,transition:n.transitions.create(["background-color","box-shadow","border-color","color"],{duration:n.transitions.duration.short}),"&:hover":{textDecoration:"none"},[`&.${Fa.disabled}`]:{color:(n.vars||n).palette.action.disabled},variants:[{props:{variant:"contained"},style:{color:"var(--variant-containedColor)",backgroundColor:"var(--variant-containedBg)",boxShadow:(n.vars||n).shadows[2],"&:hover":{boxShadow:(n.vars||n).shadows[4],"@media (hover: none)":{boxShadow:(n.vars||n).shadows[2]}},"&:active":{boxShadow:(n.vars||n).shadows[8]},[`&.${Fa.focusVisible}`]:{boxShadow:(n.vars||n).shadows[6]},[`&.${Fa.disabled}`]:{color:(n.vars||n).palette.action.disabled,boxShadow:(n.vars||n).shadows[0],backgroundColor:(n.vars||n).palette.action.disabledBackground}}},{props:{variant:"outlined"},style:{padding:"5px 15px",border:"1px solid currentColor",borderColor:"var(--variant-outlinedBorder, currentColor)",backgroundColor:"var(--variant-outlinedBg)",color:"var(--variant-outlinedColor)",[`&.${Fa.disabled}`]:{border:`1px solid ${(n.vars||n).palette.action.disabledBackground}`}}},{props:{variant:"text"},style:{padding:"6px 8px",color:"var(--variant-textColor)",backgroundColor:"var(--variant-textBg)"}},...Object.entries(n.palette).filter(Kr()).map(([l])=>({props:{color:l},style:{"--variant-textColor":(n.vars||n).palette[l].main,"--variant-outlinedColor":(n.vars||n).palette[l].main,"--variant-outlinedBorder":n.vars?`rgba(${n.vars.palette[l].mainChannel} / 0.5)`:wt(n.palette[l].main,.5),"--variant-containedColor":(n.vars||n).palette[l].contrastText,"--variant-containedBg":(n.vars||n).palette[l].main,"@media (hover: hover)":{"&:hover":{"--variant-containedBg":(n.vars||n).palette[l].dark,"--variant-textBg":n.vars?`rgba(${n.vars.palette[l].mainChannel} / ${n.vars.palette.action.hoverOpacity})`:wt(n.palette[l].main,n.palette.action.hoverOpacity),"--variant-outlinedBorder":(n.vars||n).palette[l].main,"--variant-outlinedBg":n.vars?`rgba(${n.vars.palette[l].mainChannel} / ${n.vars.palette.action.hoverOpacity})`:wt(n.palette[l].main,n.palette.action.hoverOpacity)}}}})),{props:{color:"inherit"},style:{color:"inherit",borderColor:"currentColor","--variant-containedBg":n.vars?n.vars.palette.Button.inheritContainedBg:o,"@media (hover: hover)":{"&:hover":{"--variant-containedBg":n.vars?n.vars.palette.Button.inheritContainedHoverBg:i,"--variant-textBg":n.vars?`rgba(${n.vars.palette.text.primaryChannel} / ${n.vars.palette.action.hoverOpacity})`:wt(n.palette.text.primary,n.palette.action.hoverOpacity),"--variant-outlinedBg":n.vars?`rgba(${n.vars.palette.text.primaryChannel} / ${n.vars.palette.action.hoverOpacity})`:wt(n.palette.text.primary,n.palette.action.hoverOpacity)}}}},{props:{size:"small",variant:"text"},style:{padding:"4px 5px",fontSize:n.typography.pxToRem(13)}},{props:{size:"large",variant:"text"},style:{padding:"8px 11px",fontSize:n.typography.pxToRem(15)}},{props:{size:"small",variant:"outlined"},style:{padding:"3px 9px",fontSize:n.typography.pxToRem(13)}},{props:{size:"large",variant:"outlined"},style:{padding:"7px 21px",fontSize:n.typography.pxToRem(15)}},{props:{size:"small",variant:"contained"},style:{padding:"4px 10px",fontSize:n.typography.pxToRem(13)}},{props:{size:"large",variant:"contained"},style:{padding:"8px 22px",fontSize:n.typography.pxToRem(15)}},{props:{disableElevation:!0},style:{boxShadow:"none","&:hover":{boxShadow:"none"},[`&.${Fa.focusVisible}`]:{boxShadow:"none"},"&:active":{boxShadow:"none"},[`&.${Fa.disabled}`]:{boxShadow:"none"}}},{props:{fullWidth:!0},style:{width:"100%"}},{props:{loadingPosition:"center"},style:{transition:n.transitions.create(["background-color","box-shadow","border-color"],{duration:n.transitions.duration.short}),[`&.${Fa.loading}`]:{color:"transparent"}}}]}})),vR=Re("span",{name:"MuiButton",slot:"StartIcon",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.startIcon,i.loading&&o.startIconLoadingStart,o[`iconSize${ye(i.size)}`]]}})(({theme:n})=>({display:"inherit",marginRight:8,marginLeft:-4,variants:[{props:{size:"small"},style:{marginLeft:-2}},{props:{loadingPosition:"start",loading:!0},style:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}},{props:{loadingPosition:"start",loading:!0,fullWidth:!0},style:{marginRight:-8}},..._v]})),bR=Re("span",{name:"MuiButton",slot:"EndIcon",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.endIcon,i.loading&&o.endIconLoadingEnd,o[`iconSize${ye(i.size)}`]]}})(({theme:n})=>({display:"inherit",marginRight:-4,marginLeft:8,variants:[{props:{size:"small"},style:{marginRight:-2}},{props:{loadingPosition:"end",loading:!0},style:{transition:n.transitions.create(["opacity"],{duration:n.transitions.duration.short}),opacity:0}},{props:{loadingPosition:"end",loading:!0,fullWidth:!0},style:{marginLeft:-8}},..._v]})),SR=Re("span",{name:"MuiButton",slot:"LoadingIndicator"})(({theme:n})=>({display:"none",position:"absolute",visibility:"visible",variants:[{props:{loading:!0},style:{display:"flex"}},{props:{loadingPosition:"start"},style:{left:14}},{props:{loadingPosition:"start",size:"small"},style:{left:10}},{props:{variant:"text",loadingPosition:"start"},style:{left:6}},{props:{loadingPosition:"center"},style:{left:"50%",transform:"translate(-50%)",color:(n.vars||n).palette.action.disabled}},{props:{loadingPosition:"end"},style:{right:14}},{props:{loadingPosition:"end",size:"small"},style:{right:10}},{props:{variant:"text",loadingPosition:"end"},style:{right:6}},{props:{loadingPosition:"start",fullWidth:!0},style:{position:"relative",left:-10}},{props:{loadingPosition:"end",fullWidth:!0},style:{position:"relative",right:-10}}]})),ny=Re("span",{name:"MuiButton",slot:"LoadingIconPlaceholder"})({display:"inline-block",width:"1em",height:"1em"}),ay=A.forwardRef(function(o,i){const l=A.useContext(mR),c=A.useContext(gR),d=yi(l,o),f=lt({props:d,name:"MuiButton"}),{children:p,color:g="primary",component:m="button",className:y,disabled:b=!1,disableElevation:x=!1,disableFocusRipple:D=!1,endIcon:M,focusVisibleClassName:E,fullWidth:z=!1,id:O,loading:C=null,loadingIndicator:T,loadingPosition:R="center",size:w="medium",startIcon:_,type:j,variant:G="text",...I}=f,S=fv(O),Z=T??k.jsx(Sv,{"aria-labelledby":S,color:"inherit",size:16}),te={...f,color:g,component:m,disabled:b,disableElevation:x,disableFocusRipple:D,fullWidth:z,loading:C,loadingIndicator:Z,loadingPosition:R,size:w,type:j,variant:G},ie=hR(te),re=(_||C&&R==="start")&&k.jsx(vR,{className:ie.startIcon,ownerState:te,children:_||k.jsx(ny,{className:ie.loadingIconPlaceholder,ownerState:te})}),le=(M||C&&R==="end")&&k.jsx(bR,{className:ie.endIcon,ownerState:te,children:M||k.jsx(ny,{className:ie.loadingIconPlaceholder,ownerState:te})}),$=c||"",J=typeof C=="boolean"?k.jsx("span",{className:ie.loadingWrapper,style:{display:"contents"},children:C&&k.jsx(SR,{className:ie.loadingIndicator,ownerState:te,children:Z})}):null;return k.jsxs(yR,{ownerState:te,className:Se(l.className,ie.root,y,$),component:m,disabled:b||C,focusRipple:!D,focusVisibleClassName:Se(ie.focusVisible,E),ref:i,type:j,id:C?S:O,...I,classes:ie,children:[re,R!=="end"&&J,p,R==="end"&&J,le]})}),xR=({gistId:n,code:o,language:i})=>{console.log("TryCodeButton props:",{code:o,language:i,gistId:n});const[l,c]=A.useState(!1),{theme:d}=Xn();return k.jsxs(Pe,{sx:{my:2},children:[k.jsxs(Pe,{sx:{display:"flex",gap:1,mb:1},children:[k.jsx(ay,{onClick:()=>c(!1),sx:{borderRadius:2,px:2,py:.7,fontSize:"0.95rem",fontWeight:600,backgroundColor:l?"transparent":d.accent,color:l?d.textSecondary:"#fff",border:l?`1px solid ${d.border}`:"none",boxShadow:"none",outline:"none",minWidth:0,transition:"all 0.18s","&:hover":{backgroundColor:l?d.backgroundLight:d.accent,color:l?d.textPrimary:"#fff",border:`1px solid ${d.accent}`}},children:"Código"}),k.jsx(ay,{onClick:()=>c(!0),sx:{borderRadius:2,px:2,py:.7,fontSize:"0.95rem",fontWeight:600,backgroundColor:l?d.accent:"transparent",color:l?"#fff":d.textSecondary,border:l?"none":`1px solid ${d.border}`,boxShadow:"none",outline:"none",minWidth:0,transition:"all 0.18s","&:hover":{backgroundColor:l?d.accent:d.backgroundLight,color:l?"#fff":d.textPrimary,border:`1px solid ${d.accent}`}},children:"Fire it up!"})]}),k.jsx(Pe,{sx:{border:"none",borderRadius:2,overflow:"hidden",mt:0,p:0},children:l?k.jsx(Mv,{gistId:n}):k.jsx(Ad,{language:i,children:o})})]})},ER=dn(k.jsx("path",{d:"m10 17 5-5-5-5z"})),ry=({content:n})=>{const o=n.split(`
`);let i=o.length-1;for(;i>=0&&o[i].trim()==="";)i--;const l=[],c=[];let d=null,f="",p="",g=!1,m="",y=null,b=!1,x=[];const D={fontSize:"1rem",fontFamily:"Roboto, Arial, sans-serif"},M=C=>{g&&(y=k.jsx(Ad,{language:m,children:p},`code-${C}`),g=!1,p="",m="")},E=(C,T,R)=>{T.trim()!==""&&C.push(k.jsx(QC,{children:O(z(T))},`p-${R}`))},z=C=>C.split(/(`[^`]+`)/g).map((R,w)=>{if(R.startsWith("`")&&R.endsWith("`")){const _=R.slice(1,-1);return k.jsx("code",{className:"inline-code",children:_},w)}else return R}),O=C=>typeof C=="string"?C.split(/(\[link\]\s+[^\]]+)/g).map((R,w)=>{if(R.startsWith("[link]")){const _=R.slice(6).trim(),j=_.match(/^\((.*?)\)\s+(.+)$/);if(j){const G=j[1].trim(),I=j[2].trim();return k.jsx(Hr,{displayname:G,url:I},`inline-link-${w}`)}else{const G=_.indexOf(" ");if(G>0){const I=_.slice(0,G).trim(),S=_.slice(G+1).trim();return k.jsx(Hr,{displayname:I,url:S},`inline-link-${w}`)}}return R}else return R}):Array.isArray(C)?C.map((T,R)=>{if(typeof T=="string"){const w=T.split(/(\[link\]\s+[^\]]+)/g);return w.length===1?T:w.map((_,j)=>{if(_.startsWith("[link]")){const G=_.slice(6).trim(),I=G.match(/^\((.*?)\)\s+(.+)$/);if(I){const S=I[1].trim(),Z=I[2].trim();return k.jsx(Hr,{displayname:S,url:Z},`inline-link-${R}-${j}`)}else{const S=G.indexOf(" ");if(S>0){const Z=G.slice(0,S).trim(),te=G.slice(S+1).trim();return k.jsx(Hr,{displayname:Z,url:te},`inline-link-${R}-${j}`)}}return _}else return _})}else return T}).flat():C;for(let C=0;C<=i;C++){const T=o[C],R=T.trim();if(R==="[list]"){E(l,f,C),f="",b=!0,x=[];continue}if(R==="[endlist]"){b=!1,l.push(k.jsx("ul",{style:{margin:"0px 0px 0px 24px",padding:"0px",width:"auto",boxSizing:"border-box",...D},children:x},`list-${C}`)),x=[];continue}if(b){R!==""&&x.push(k.jsxs("li",{style:{margin:0,padding:0,display:"flex",alignItems:"center",gap:1},children:[k.jsx(ER,{sx:{fontSize:20,color:"#42A5F5",mr:.5,alignSelf:"flex-start",mt:"4px"}}),k.jsx(un,{component:"span",sx:{p:0,m:0,color:"inherit",fontSize:{xs:"1rem",md:"1.1rem"},lineHeight:"calc(1.7em)",fontFamily:"Roboto, Arial, sans-serif"},children:O(z(R))})]},`li-${C}`));continue}if(b)continue;const w=R.match(/^\[(t|st|p|v|i|icon|dartpad|trycode|c:|link).*"]$/);if(g&&R==="[end]"){M(C);continue}if(g&&w&&M(C),R.startsWith("[t]")){E(l,f,C),f="";const _=R.slice(3).trim();d||(d=_),l.push(k.jsx(XC,{children:O(z(_))},`title-${C}`));continue}if(R.startsWith("[st]")){E(l,f,C),f="",y&&(l.push(y),y=null);const _=R.slice(4).trim();c.push({id:`subtitle-${C}`,text:_}),l.push(k.jsx(ZC,{id:`subtitle-${C}`,children:O(z(_))},`subtitle-${C}`));continue}if(R.startsWith("[v]")){E(l,f,C),f="";const[_,j]=R.slice(3).split("|").map(G=>G.trim());l.push(k.jsx(rR,{videoId:_,title:j},`video-${C}`));continue}if(R.startsWith("[i]")){E(l,f,C),f="";const[_,j]=R.slice(3).split("|").map(S=>S.trim()),I=_.startsWith("http://")||_.startsWith("https://")?_:ty[_];l.push(k.jsx(oR,{src:I,alt:j},`img-${C}`));continue}if(R.startsWith("[icon]")){E(l,f,C),f="";const[_,j]=R.slice(6).split("|").map(S=>S.trim()),I=_.startsWith("http://")||_.startsWith("https://")?_:ty[_];l.push(k.jsx(lR,{src:I,alt:j},`icon-${C}`));continue}if(R.startsWith("[dartpad]")){E(l,f,C),f="";const _=R.slice(9).trim();l.push(k.jsx(Mv,{gistId:_},`dartpad-${C}`));continue}if(R.startsWith("[code:")){g=!0,m=R.match(/\[code:(.*)\]/)[1].trim(),p="";continue}if(g)if(R==="[endcode]"){const j=(o[C+1]?.trim()||"").startsWith("[trycode");y={code:p.trimEnd(),language:m,noMarginTop:j},g=!1,p="",m="";continue}else{p+=T+`
`;continue}if(R.startsWith("[trycode")&&y){const _=R.replace("[trycode]","").trim();l.push(k.jsx(xR,{code:y.code,language:y.language,gistId:_||void 0,noMarginTop:y.noMarginTop},`trycode-${C}`)),y=null;continue}if(y&&(l.push(k.jsx(Ad,{language:y.language,sx:y.noMarginTop?{mt:0}:{},children:y.code},`code-${C}`)),y=null),R.startsWith("[link]")){E(l,f,C),f="";const _=R.slice(6).trim(),j=_.match(/^\((.*?)\)\s+(.+)$/);if(j){const G=j[1].trim(),I=j[2].trim();l.push(k.jsx(Hr,{displayname:G,url:I},`link-${C}`))}else{const G=_.indexOf(" ");if(G>0){const I=_.slice(0,G).trim(),S=_.slice(G+1).trim();l.push(k.jsx(Hr,{displayname:I,url:S},`link-${C}`))}}continue}!b&&!g&&(T!==""?l.push(k.jsxs(Ft.Fragment,{children:[O(z(T)),k.jsx("br",{},`br-${C}`)]},`line-${C}`)):l.push(k.jsx("br",{},`br-${C}`))),C===i&&(E(l,f,C),y&&(l.push(y),y=null))}return E(l,f,o.length),y&&(l.push(y),y=null),{elements:k.jsx(iR,{children:l}),subtitles:c,lessonTitle:d}};function oy(n){return typeof n=="string"}function AR(n){return it("MuiListItem",n)}at("MuiListItem",["root","container","dense","alignItemsFlexStart","divider","gutters","padding","secondaryAction"]);function TR(n){return it("MuiListItemSecondaryAction",n)}at("MuiListItemSecondaryAction",["root","disableGutters"]);const CR=n=>{const{disableGutters:o,classes:i}=n;return ft({root:["root",o&&"disableGutters"]},TR,i)},RR=Re("div",{name:"MuiListItemSecondaryAction",slot:"Root",overridesResolver:(n,o)=>{const{ownerState:i}=n;return[o.root,i.disableGutters&&o.disableGutters]}})({position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",variants:[{props:({ownerState:n})=>n.disableGutters,style:{right:0}}]}),Bv=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiListItemSecondaryAction"}),{className:c,...d}=l,f=A.useContext(xa),p={...l,disableGutters:f.disableGutters},g=CR(p);return k.jsx(RR,{className:Se(g.root,c),ownerState:p,ref:i,...d})});Bv.muiName="ListItemSecondaryAction";const wR=(n,o)=>{const{ownerState:i}=n;return[o.root,i.dense&&o.dense,i.alignItems==="flex-start"&&o.alignItemsFlexStart,i.divider&&o.divider,!i.disableGutters&&o.gutters,!i.disablePadding&&o.padding,i.hasSecondaryAction&&o.secondaryAction]},MR=n=>{const{alignItems:o,classes:i,dense:l,disableGutters:c,disablePadding:d,divider:f,hasSecondaryAction:p}=n;return ft({root:["root",l&&"dense",!c&&"gutters",!d&&"padding",f&&"divider",o==="flex-start"&&"alignItemsFlexStart",p&&"secondaryAction"],container:["container"]},AR,i)},OR=Re("div",{name:"MuiListItem",slot:"Root",overridesResolver:wR})(yt(({theme:n})=>({display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",width:"100%",boxSizing:"border-box",textAlign:"left",variants:[{props:({ownerState:o})=>!o.disablePadding,style:{paddingTop:8,paddingBottom:8}},{props:({ownerState:o})=>!o.disablePadding&&o.dense,style:{paddingTop:4,paddingBottom:4}},{props:({ownerState:o})=>!o.disablePadding&&!o.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:o})=>!o.disablePadding&&!!o.secondaryAction,style:{paddingRight:48}},{props:({ownerState:o})=>!!o.secondaryAction,style:{[`& > .${Gr.root}`]:{paddingRight:48}}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:o})=>o.divider,style:{borderBottom:`1px solid ${(n.vars||n).palette.divider}`,backgroundClip:"padding-box"}},{props:({ownerState:o})=>o.button,style:{transition:n.transitions.create("background-color",{duration:n.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(n.vars||n).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}}}},{props:({ownerState:o})=>o.hasSecondaryAction,style:{paddingRight:48}}]}))),_R=Re("li",{name:"MuiListItem",slot:"Container"})({position:"relative"}),BR=A.forwardRef(function(o,i){const l=lt({props:o,name:"MuiListItem"}),{alignItems:c="center",children:d,className:f,component:p,components:g={},componentsProps:m={},ContainerComponent:y="li",ContainerProps:{className:b,...x}={},dense:D=!1,disableGutters:M=!1,disablePadding:E=!1,divider:z=!1,secondaryAction:O,slotProps:C={},slots:T={},...R}=l,w=A.useContext(xa),_=A.useMemo(()=>({dense:D||w.dense||!1,alignItems:c,disableGutters:M}),[c,w.dense,D,M]),j=A.useRef(null),G=A.Children.toArray(d),I=G.length&&sA(G[G.length-1],["ListItemSecondaryAction"]),S={...l,alignItems:c,dense:_.dense,disableGutters:M,disablePadding:E,divider:z,hasSecondaryAction:I},Z=MR(S),te=An(j,i),ie=T.root||g.Root||OR,re=C.root||m.root||{},le={className:Se(Z.root,re.className,f),...R};let $=p||"li";return I?($=!le.component&&!p?"div":$,y==="li"&&($==="li"?$="div":le.component==="li"&&(le.component="div")),k.jsx(xa.Provider,{value:_,children:k.jsxs(_R,{as:y,className:Se(Z.container,b),ref:te,ownerState:S,...x,children:[k.jsx(ie,{...re,...!oy(ie)&&{as:$,ownerState:{...S,...re.ownerState}},...le,children:G}),G.pop()]})})):k.jsx(xa.Provider,{value:_,children:k.jsxs(ie,{...re,as:$,ref:te,...!oy(ie)&&{ownerState:{...S,...re.ownerState}},...le,children:[G,O&&k.jsx(Bv,{children:O})]})})}),DR=n=>n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim("-"),iy=({subtitles:n=[],lessonTitle:o,activeSections:i=[],lessonId:l})=>{const{theme:c}=Xn(),{studiedLessons:d,toggleStudied:f}=Cv(),p=d.includes(l),g=m=>{const y=document.getElementById(m);if(y){const b=y.offsetTop;window.scrollTo({top:b-80,behavior:"smooth"});const D=n.find(M=>M.id===m);if(D){const M=DR(D.text);window.history.replaceState(null,null,`#${M}`)}}};return n.length===0?null:k.jsxs(Pe,{sx:{width:"100%",position:"sticky",top:{xs:"56px",sm:"64px"},pt:2,background:{lg:c.background,xs:"none"}},children:[k.jsxs(Pe,{sx:{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",paddingTop:2,paddingBottom:2},children:[l&&k.jsx(Xr,{onClick:()=>f(String(l)),sx:{marginTop:.5,color:p?c.accent:"#fff",p:0},"aria-label":p?"Marcar como no completado":"Marcar como completado",children:k.jsx(Av,{sx:{color:p?c.accent:"#fff"},fontSize:"small"})}),k.jsx(un,{variant:"h6",sx:{marginLeft:1,color:c.textPrimary,fontWeight:700,fontSize:"1.1rem",textTransform:"none",letterSpacing:"0.01em"},children:o})]}),k.jsx(hv,{dense:!0,sx:{p:0},children:n.map(m=>k.jsx(BR,{sx:{p:0,mb:.5},children:k.jsx(vv,{onClick:()=>g(m.id),sx:{borderRadius:1,py:.5,px:1,backgroundColor:i.includes(m.id)?"rgba(66, 165, 245, 0.15)":"transparent",border:i.includes(m.id)?`1px solid ${c.accent}`:"1px solid transparent","&:hover":{backgroundColor:i.includes(m.id)?"rgba(66, 165, 245, 0.22)":"rgba(66, 165, 245, 0.08)"},transition:"all 0.2s ease-in-out"},children:k.jsx(bv,{primary:k.jsx(un,{variant:"body2",sx:{color:i.includes(m.id)?c.primaryTitle:c.textSecondary,fontSize:"0.875rem",fontWeight:i.includes(m.id)?600:400,lineHeight:1.3,transition:"all 0.2s ease-in-out"},children:m.text})})})},m.id))})]})},NR=dn(k.jsx("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})),Ql=n=>n.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9\s-]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim("-"),zR=n=>{const[o,i]=A.useState([]),l=Rn(),c=A.useRef(new Set),d=A.useRef({});return A.useEffect(()=>{if(n.length>0&&o.length===0&&!l.hash){const f=n[0];i([f.id]);const p=Ql(f.text);window.history.replaceState(null,null,`#${p}`)}},[n,o,l.hash]),A.useEffect(()=>{if(!n||n.length===0)return;n.forEach(m=>{const y=document.getElementById(m.id);y&&(d.current[m.id]=y)});const f={root:null,rootMargin:"-64px 0px -64px 0px",threshold:.01},p=new IntersectionObserver(m=>{m.forEach(b=>{b.isIntersecting&&b.intersectionRatio>0?c.current.add(b.target.id):c.current.delete(b.target.id)}),g();const y=m.filter(b=>b.isIntersecting&&b.intersectionRatio>0).sort((b,x)=>x.intersectionRatio-b.intersectionRatio)[0];if(y){const b=y.target.id,x=n.find(D=>D.id===b);if(x){const M=`#${Ql(x.text)}`;l.hash!==M&&window.history.replaceState(null,null,M)}}},f);n.forEach(m=>{const y=d.current[m.id];y&&p.observe(y)});const g=()=>{let m=Array.from(c.current);if(m.length===0){const b=window.scrollY+window.innerHeight*.3;let x=null;for(let D=n.length-1;D>=0;D--){const M=n[D],E=d.current[M.id];if(E&&E.offsetTop<=b){x=M.id;break}}x?m=[x]:n.length>0&&(m=[n[0].id])}i(m)};return window.addEventListener("scroll",g,{passive:!0}),()=>{p.disconnect(),window.removeEventListener("scroll",g)}},[n,l.hash]),A.useEffect(()=>{if(l.hash&&n.length>0){const f=l.hash.substring(1),p=n.find(g=>Ql(g.text)===f);if(p){i([p.id]);const g=d.current[p.id];g&&setTimeout(()=>{const m=g.offsetTop;window.scrollTo({top:m-80,behavior:"smooth"})},100)}else{const g=n[0];i([g.id]);const m=Ql(g.text);window.history.replaceState(null,null,`#${m}`)}}},[l.hash,n]),{activeSections:o}},LR=A.forwardRef(({sections:n},o)=>{const{lessonId:i}=jS(),[l,c]=A.useState(!0),[d,f]=A.useState({elements:null,subtitles:[],lessonTitle:""}),[p,g]=A.useState(!1),{theme:m}=Xn(),{activeSections:y}=zR(d.subtitles),b=A.useMemo(()=>{const x=new Map;return n.forEach(D=>{D.type==="lesson"&&x.set(D.id,D.filePath)}),x},[n]);return A.useEffect(()=>{c(!0);const x=b.get(i);if(x&&Si[x]){const D=Si[x],M=ry({content:D});f(M)}else{const D=`[p]Lo siento, la lección con ID "${i}" no fue encontrada o el archivo "${x}" no existe.`,M=ry({content:D});f(M)}c(!1),window.scrollTo(0,0)},[i,b]),A.useImperativeHandle(o,()=>({openMobileToc:()=>g(!0),closeMobileToc:()=>g(!1)})),l?k.jsx("div",{children:"Cargando contenido de la lección..."}):k.jsxs(Pe,{sx:{display:"flex",width:"100%",flexDirection:{xs:"column",lg:"row"},minWidth:0},children:[k.jsx(Pe,{sx:{flex:1,right:{lg:280,xs:10},left:{lg:280,xs:10},botom:0,top:{lg:0,xs:20},position:"absolute",overflow:"scroll",bottom:0,zIndex:0,scrollbarWidth:"none",msOverflowStyle:"none","&::-webkit-scrollbar":{display:"none",width:0,height:0,background:"transparent"}},children:d.elements}),k.jsx(Pe,{sx:{width:{lg:235},flexShrink:0,display:{xs:"none",lg:"block"},mr:2,position:"fixed",right:0,top:64},children:k.jsx(iy,{subtitles:d.subtitles,lessonTitle:d.lessonTitle,activeSections:y,lessonId:i})}),p&&k.jsxs(Pe,{sx:{position:"fixed",top:0,right:0,width:"85vw",maxWidth:320,height:"100vh",backgroundColor:m.background,zIndex:2e3,boxShadow:6,p:2,display:{xs:"block",lg:"none"}},children:[k.jsx(Pe,{sx:{position:"absolute",top:8,right:8,zIndex:2100},children:k.jsx("button",{onClick:()=>g(!1),style:{background:"none",border:"none",cursor:"pointer",padding:4},"aria-label":"Cerrar TOC",children:k.jsx(NR,{sx:{color:m.primaryTitle,fontSize:28}})})}),k.jsx(Pe,{sx:{pt:4},children:k.jsx(iy,{subtitles:d.subtitles,lessonTitle:d.lessonTitle,activeSections:y,lessonId:i})})]})]})}),kR=dn(k.jsx("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"})),jR=dn(k.jsx("path",{d:"M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"})),UR=dn([k.jsx("path",{d:"M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1m0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5z"},"0"),k.jsx("path",{d:"M17.5 10.5c.88 0 1.73.09 2.5.26V9.24c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99M13 12.49v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26V11.9c-.79-.15-1.64-.24-2.5-.24-1.7 0-3.24.3-4.5.83m4.5 1.84c-1.7 0-3.24.29-4.5.83v1.66c1.13-.64 2.7-.99 4.5-.99.88 0 1.73.09 2.5.26v-1.52c-.79-.16-1.64-.24-2.5-.24"},"1")]),$R=({onOpenMobileToc:n,onOpenMobileNav:o})=>{const{mode:i,toggleTheme:l,theme:c}=Xn(),d=no(),f=xv(d.breakpoints.down("lg"));return k.jsx(L2,{position:"fixed",elevation:0,sx:{background:c.appBarBg,color:c.appBarText,zIndex:1300,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},children:k.jsxs($2,{sx:{minHeight:64,display:"flex",justifyContent:"space-between"},children:[k.jsxs(Pe,{sx:{display:"flex",alignItems:"center",gap:2},children:[f&&k.jsx(Xr,{onClick:o,color:"inherit","aria-label":"Abrir menú de navegación",sx:{mr:1},children:k.jsx(Q2,{sx:{color:c.accent}})}),k.jsx("img",{src:Ov,alt:"Logo",style:{height:36,width:36}}),k.jsx(un,{variant:"h6",sx:{color:c.appBarText,fontWeight:700,letterSpacing:f?"0.01em":"0.04em",fontSize:f?"1rem":"1.25rem",maxWidth:f?120:"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:f?"Apps":"Aplicaciones Móviles"})]}),k.jsxs(Pe,{sx:{display:"flex",alignItems:"center",gap:1},children:[k.jsx(Xr,{onClick:l,color:"inherit","aria-label":"Alternar modo claro/oscuro",children:i==="dark"?k.jsx(kR,{sx:{color:c.accent}}):k.jsx(jR,{sx:{color:c.accent}})}),f&&k.jsx(Xr,{onClick:n,color:"inherit","aria-label":"Mostrar tabla de contenido",children:k.jsx(UR,{sx:{color:c.accent}})})]})]})})};function qR(){const[n,o]=A.useState([]),[i,l]=A.useState(!0),c=Rn(),d=yy(),f=A.useRef(),p=A.useRef();A.useEffect(()=>{(async()=>{try{const y=await WC(wv);o(y)}catch(y){console.error("Error cargando la tabla de contenido:",y)}finally{l(!1)}})()},[]);const g=A.useMemo(()=>{const m=n.find(y=>y.type==="lesson");return m?m.id:null},[n]);return A.useEffect(()=>{if(!i&&n.length>0){const y=new URLSearchParams(c.search).get("p");if(y)d(y,{replace:!0});else if(c.pathname==="/"&&g){const b=localStorage.getItem("lastLesson");b?d(`/lesson/${b}`,{replace:!0}):d(`/lesson/${g}`,{replace:!0})}}},[i,n,c.search,g,d,c.pathname]),i?k.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",fontSize:"1.2em"},children:"Cargando contenido del curso..."}):n.length===0||!g?k.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column"},children:[k.jsx("h2",{children:"No se pudo cargar el contenido del curso."}),k.jsx("p",{children:"Por favor, verifica el archivo `toc.md` y la carpeta `content`."})]}):k.jsxs(iC,{children:[k.jsx($R,{onOpenMobileToc:()=>f.current?.openMobileToc(),onOpenMobileNav:()=>p.current?.()}),k.jsx(uC,{sections:n,onOpenMobileNav:p,children:k.jsxs(KS,{children:[k.jsx(Kl,{path:"/lesson/:lessonId",element:k.jsx(LR,{ref:f,sections:n})}),k.jsx(Kl,{path:"/",element:k.jsxs("div",{style:{padding:"20px",textAlign:"center"},children:[k.jsx("h1",{children:"Iniciando curso..."}),k.jsx("p",{children:"Si esta página persiste, por favor recarga o contacta al administrador."})]})}),k.jsx(Kl,{path:"*",element:k.jsxs("div",{style:{padding:"20px",textAlign:"center"},children:[k.jsx("h1",{children:"404 - Página no encontrada"}),k.jsx("p",{children:"La URL que buscas no existe."})]})})]})})]})}iS.createRoot(document.getElementById("root")).render(k.jsx(Ft.StrictMode,{children:k.jsx(rC,{children:k.jsx(E1,{basename:"/apps/",children:k.jsx(qR,{})})})}));
