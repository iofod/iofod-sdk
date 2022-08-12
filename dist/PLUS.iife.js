var PLUS=function(r){"use strict";let d;const c={},a={},I=["EditorUndo","EditorRedo","EditorPreview","EditorExitPreview"];function m(e,t){if(typeof t=="function"&&(c[e]?c[e].push(t):c[e]=[t],!a[e])){const n=I.includes(e)?e:d+":"+e;a[e]=new BroadcastChannel(n),a[e].onmessage=i=>{c[e].forEach(l=>{l(i.data)})}}}function A(e,t){!c[e]||(typeof t=="function"&&c[e].includes(t)?(c[e].splice(c[e].indexOf(t),1),c[e].length||a[e].close()):(delete c[e],a[e].close(),delete a[e]))}function h(e,t){const n=i=>{t(i),setTimeout(()=>{A(e,n)},0)};m(e,n)}function L(e){d||(d=e)}const P="PLUS:",s=()=>((1+Math.random())*65536|0).toString(16).substring(1),b=()=>s()+s()+"-"+s()+"-"+s()+"-"+s()+"-"+s()+s()+s();function o(e,t,n){const i=b();return postMessage({type:P+e,payload:t,id:i}),typeof n=="function"&&h(i,n),i}function y(e){return new Promise(t=>{if(!e)return t(!1);o("ACCESS:CHECK",{ql:e},n=>{t(n)})})}function w(){return new Promise(e=>{o("ACCESS:CHECK",{ql:"ALL"},t=>{e(t)})})}function E(e=[]){return new Promise(t=>{o("ACCESS:REQUEST",{list:e},n=>{t(n)})})}async function U(e=[]){const t=await w();return!!(e.every(i=>t.includes(i))||(await E(e)).code==0)}const O=()=>Math.random().toString(36).substring(2);function k(e="W"){return e+Math.round((Date.now()-new Date("2020/02/02").getTime())/1e3)+O().substring(0,3)}function D(e="CTT"){return new Promise(t=>{o("DATA:GET",{path:e},n=>{t(n)})})}function G(e="CTT",t={}){return new Promise(n=>{o("DATA:SET",{path:e,payload:t},i=>{n(i)})})}function H(){return new Promise(e=>{o("DATA:GET_CURRENT_STYLE",{payload:{}},t=>{e(t)})})}function M(e){return new Promise(t=>{o("DATA:SET_CURRENT_STYLE",{payload:e},n=>{t(n)})})}function R(...e){return new Promise(t=>{o("DEBUG:LOG",{value:[...e]},n=>{t(n)})})}function u(e,t,n=""){let i={tag:e};return t instanceof Object?i={tag:e,value:"",...t}:i.value=t,i.hook=n,i}const S={state:{}};function _(e,t,n){return new Function("obj","obj."+t+"="+JSON.stringify(n)+";return obj")(e)}function j(e,t=!0){try{for(const n in e)_(S.state,n,e[n]);return t&&o("STATE:SET",e),!0}catch(n){return console.warn(n),!1}}function T(e){return S.state[e]}let C=!1;function B(e={}){const{state:t={},persisted:n}=e;return new Promise(i=>{if(C)return i(T);o("STATE:INIT",e,l=>{n?S.state=l:S.state=t,C=!0,i(T)})})}function N(){return C=!1,!0}function p(e){return new Promise(t=>{o("STRUCT:INIT",{struct:e},n=>{t(n)})})}const v={success(e){o("UI:TOAST",{type:"success",message:e})},error(e){o("UI:TOAST",{type:"error",message:e})},info(e){o("UI:TOAST",{type:"info",message:e})},warning(e){o("UI:TOAST",{type:"warning",message:e})},log(e){o("UI:TOAST",{type:"log",message:e})}};function g(e,t){return new Promise(n=>{o("CACHE:"+e,{key:t},i=>{n(i)})})}function f(e,t,n){return new Promise(i=>{o("CACHE:"+e,{key:t,value:n},l=>{i(l)})})}const F={getLocal(e){return g("getLocal",e)},saveLocal(e,t){return f("saveLocal",e,t)},removeLocal(e){return f("removeLocal",e)},getSession(e){return g("getSession",e)},saveSession(e,t){return f("saveSession",e,t)},removeSession(e){return f("removeSession",e)}},Y={Container(e,t){return e.children=e.children||[],u("Container",e,t)},Text(e,t){return u("Text",e,t)},Tabs(e,t){return u("Tabs",e,t)},Button(e,t){return u("Button",e,t)},ButtonGroup(e,t){return u("ButtonGroup",e,t)},SwitchItem(e,t){return u("SwitchItem",e,t)},Checkbox(e,t){return u("Checkbox",e,t)},SelectItem(e,t){return u("SelectItem",e,t)},OptionGroup(e,t){return u("OptionGroup",e,t)},InputItem(e,t){return u("InputItem",e,t)},Canvas(e,t){return u("Canvas",e,t)},SliderItem(e,t){return u("SliderItem",e,t)},Divider(){return u("Divider","")},SubHeader(e,t){return u("SubHeader",e,t)},Header(e,t){return u("Header",e,t)},Loading(e,t){return u("Loading",e,t)},Link(e,t){return u("Link",e,t)},Image(e,t){return u("Image",e,t)},Textarea(e,t){return u("Textarea",e,t)},UploadItem(e,t){return u("UploadItem",e,t)},IFstructContainer(e,t){return u("IFstructContainer",e,t)},Code(e,t){return u("Code",e,t)},ColorPicker(e,t){return u("ColorPicker",e,t)}},q="1.0.4";return r.Version=q,r.cache=F,r.call=o,r.checkAccess=y,r.checkAccessList=w,r.components=Y,r.genStruct=u,r.getCurrentStyle=H,r.getState=T,r.init=B,r.log=R,r.off=A,r.on=m,r.once=h,r.pullStruct=D,r.reinit=N,r.render=p,r.requestAccess=E,r.setContext=L,r.setCurrentStyle=M,r.setState=j,r.setStruct=G,r.suid=k,r.toast=v,r.withAccess=U,Object.defineProperties(r,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),r}({});
