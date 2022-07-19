var PLUS=function(r){"use strict";let d;const o={},a={},I=["EditorUndo","EditorRedo","EditorPreview","EditorExitPreview"];function C(e,t){if(typeof t=="function"&&(o[e]?o[e].push(t):o[e]=[t],!a[e])){const n=I.includes(e)?e:d+":"+e;a[e]=new BroadcastChannel(n),a[e].onmessage=u=>{o[e].forEach(l=>{l(u.data)})}}}function A(e,t){!o[e]||(typeof t=="function"&&o[e].includes(t)?(o[e].splice(o[e].indexOf(t),1),o[e].length||a[e].close()):(delete o[e],a[e].close(),delete a[e]))}function h(e,t){const n=u=>{t(u),setTimeout(()=>{A(e,n)},0)};C(e,n)}function L(e){d||(d=e)}const P="PLUS:",s=()=>((1+Math.random())*65536|0).toString(16).substring(1),b=()=>s()+s()+"-"+s()+"-"+s()+"-"+s()+"-"+s()+s()+s();function c(e,t,n){const u=b();return postMessage({type:P+e,payload:t,id:u}),typeof n=="function"&&h(u,n),u}function y(e){return new Promise(t=>{if(!e)return t(!1);c("ACCESS:CHECK",{ql:e},n=>{t(n)})})}function w(){return new Promise(e=>{c("ACCESS:CHECK",{ql:"ALL"},t=>{e(t)})})}function E(e=[]){return new Promise(t=>{c("ACCESS:REQUEST",{list:e},n=>{t(n)})})}async function U(e=[]){const t=await w();return!!(e.every(u=>t.includes(u))||(await E(e)).code==0)}const O=()=>Math.random().toString(36).substring(2);function k(e="W"){return e+Math.round((Date.now()-new Date("2020/02/02").getTime())/1e3)+O().substring(0,3)}function D(e="CTT"){return new Promise(t=>{c("DATA:GET",{path:e},n=>{t(n)})})}function H(e="CTT",t={}){return new Promise(n=>{c("DATA:SET",{path:e,payload:t},u=>{n(u)})})}function G(){return new Promise(e=>{c("DATA:GET_CURRENT_STYLE",{payload:{}},t=>{e(t)})})}function M(e){return new Promise(t=>{c("DATA:SET_CURRENT_STYLE",{payload:e},n=>{t(n)})})}function R(...e){return new Promise(t=>{c("DEBUG:LOG",{value:[...e]},n=>{t(n)})})}function i(e,t,n=""){let u={tag:e};return t instanceof Object?u={tag:e,value:"",...t}:u.value=t,u.hook=n,u}const S={state:{}};function _(e,t,n){return new Function("obj","obj."+t+"="+JSON.stringify(n)+";return obj")(e)}function j(e,t=!0){try{for(const n in e)_(S.state,n,e[n]);return t&&c("STATE:SET",e),!0}catch(n){return console.warn(n),!1}}function T(e){return S.state[e]}let m=!1;function B(e={}){const{state:t={},persisted:n}=e;return new Promise(u=>{if(m)return u(T);c("STATE:INIT",e,l=>{n?S.state=l:S.state=t,m=!0,u(T)})})}function N(){return m=!1,!0}function v(e){return new Promise(t=>{c("STRUCT:INIT",{struct:e},n=>{t(n)})})}const F={success(e){c("UI:TOAST",{type:"success",message:e})},error(e){c("UI:TOAST",{type:"error",message:e})},info(e){c("UI:TOAST",{type:"info",message:e})},warning(e){c("UI:TOAST",{type:"warning",message:e})},log(e){c("UI:TOAST",{type:"log",message:e})}};function g(e,t){return new Promise(n=>{c("CACHE:"+e,{key:t},u=>{n(u)})})}function f(e,t,n){return new Promise(u=>{c("CACHE:"+e,{key:t,value:n},l=>{u(l)})})}const Y={getLocal(e){return g("getLocal",e)},saveLocal(e,t){return f("saveLocal",e,t)},removeLocal(e){return f("removeLocal",e)},getSession(e){return g("getSession",e)},saveSession(e,t){return f("saveSession",e,t)},removeSession(e){return f("removeSession",e)}},q={Container(e,t){return e.children=e.children||[],i("Container",e,t)},Text(e,t){return i("Text",e,t)},Tabs(e,t){return i("Tabs",e,t)},Button(e,t){return i("Button",e,t)},ButtonGroup(e,t){return i("ButtonGroup",e,t)},SwitchItem(e,t){return i("SwitchItem",e,t)},Checkbox(e,t){return i("Checkbox",e,t)},SelectItem(e,t){return i("SelectItem",e,t)},InputItem(e,t){return i("InputItem",e,t)},Canvas(e,t){return i("Canvas",e,t)},SliderItem(e,t){return i("SliderItem",e,t)},Divider(){return i("Divider","")},SubHeader(e,t){return i("SubHeader",e,t)},Header(e,t){return i("Header",e,t)},Loading(e,t){return i("Loading",e,t)},Link(e,t){return i("Link",e,t)},Image(e,t){return i("Image",e,t)},Textarea(e,t){return i("Textarea",e,t)},UploadItem(e,t){return i("UploadItem",e,t)},IFstructContainer(e,t){return i("IFstructContainer",e,t)},Code(e,t){return i("Code",e,t)}},K="1.0.3";return r.Version=K,r.cache=Y,r.call=c,r.checkAccess=y,r.checkAccessList=w,r.components=q,r.genStruct=i,r.getCurrentStyle=G,r.getState=T,r.init=B,r.log=R,r.off=A,r.on=C,r.once=h,r.pullStruct=D,r.reinit=N,r.render=v,r.requestAccess=E,r.setContext=L,r.setCurrentStyle=M,r.setState=j,r.setStruct=H,r.suid=k,r.toast=F,r.withAccess=U,Object.defineProperties(r,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),r}({});