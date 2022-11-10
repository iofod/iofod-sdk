let S;
const s = {}, c = {}, C = [
  "EditorUndo",
  "EditorRedo",
  "EditorPreview",
  "EditorExitPreview"
];
function E(e, t) {
  if (typeof t == "function" && (s[e] ? s[e].push(t) : s[e] = [t], !c[e])) {
    const r = C.includes(e) ? e : S + ":" + e;
    c[e] = new BroadcastChannel(r), c[e].onmessage = (n) => {
      s[e].forEach((a) => {
        a(n.data);
      });
    };
  }
}
function p(e, t) {
  !s[e] || (typeof t == "function" && s[e].includes(t) ? (s[e].splice(s[e].indexOf(t), 1), s[e].length || c[e].close()) : (delete s[e], c[e].close(), delete c[e]));
}
function I(e, t) {
  const r = (n) => {
    t(n), setTimeout(() => {
      p(e, r);
    }, 0);
  };
  E(e, r);
}
function U(e) {
  S || (S = e);
}
const w = "PLUS:", i = () => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1), A = () => i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i();
function u(e, t, r) {
  const n = A();
  return postMessage({ type: w + e, payload: t, id: n }), typeof r == "function" && I(n, r), n;
}
function b(e) {
  return new Promise((t) => {
    if (!e)
      return t(!1);
    u("ACCESS:CHECK", { ql: e }, (r) => {
      t(r);
    });
  });
}
function h() {
  return new Promise((e) => {
    u("ACCESS:CHECK", { ql: "ALL" }, (t) => {
      e(t);
    });
  });
}
function L(e = []) {
  return new Promise((t) => {
    u("ACCESS:REQUEST", { list: e }, (r) => {
      t(r);
    });
  });
}
async function O(e = []) {
  const t = await h();
  return !!(e.every((n) => t.includes(n)) || (await L(e)).code == 0);
}
const P = () => Math.random().toString(36).substring(2);
function y(e = "W") {
  return e + Math.round((Date.now() - new Date("2020/02/02").getTime()) / 1e3) + P().substring(0, 3);
}
function R(e = "CTT") {
  return new Promise((t) => {
    u("DATA:GET", { path: e }, (r) => {
      t(r);
    });
  });
}
function D(e = "CTT", t = {}) {
  return new Promise((r) => {
    u("DATA:SET", { path: e, payload: t }, (n) => {
      r(n);
    });
  });
}
function G() {
  return new Promise((e) => {
    u("DATA:GET_CURRENT_STYLE", { payload: {} }, (t) => {
      e(t);
    });
  });
}
function k(e) {
  return new Promise((t) => {
    u("DATA:SET_CURRENT_STYLE", { payload: e }, (r) => {
      t(r);
    });
  });
}
function x(e) {
  return new Promise((t) => {
    u("UI:REGISTER_MODEL_HELPER", { payload: e }, (r) => {
      t(r);
    });
  });
}
function H(e) {
  return new Promise((t) => {
    u("UI:REGISTER_MODEL_TOOLTIP", { payload: e }, (r) => {
      t(r);
    });
  });
}
function M(...e) {
  return new Promise((t) => {
    u("DEBUG:LOG", { value: [...e] }, (r) => {
      t(r);
    });
  });
}
function o(e, t, r = "") {
  let n = {
    tag: e
  };
  return t instanceof Object ? n = {
    tag: e,
    value: "",
    ...t
  } : n.value = t, n.hook = r, n;
}
const f = {
  state: {}
};
function g(e, t, r) {
  return new Function(
    "obj",
    "obj." + t + "=" + JSON.stringify(r) + ";return obj"
  )(e);
}
function _(e, t = !0) {
  try {
    for (const r in e)
      g(f.state, r, e[r]);
    return t && u("STATE:SET", e), !0;
  } catch (r) {
    return console.warn(r), !1;
  }
}
function d(e) {
  return f.state[e];
}
let T = !1;
function B(e = {}) {
  const { state: t = {}, persisted: r } = e;
  return new Promise((n) => {
    if (T)
      return n(d);
    u("STATE:INIT", e, (a) => {
      r ? f.state = a : f.state = t, T = !0, n(d);
    });
  });
}
function N() {
  return T = !1, !0;
}
function j(e) {
  return new Promise((t) => {
    u("STRUCT:INIT", { struct: e }, (r) => {
      t(r);
    });
  });
}
const F = {
  success(e) {
    u("UI:TOAST", { type: "success", message: e });
  },
  error(e) {
    u("UI:TOAST", { type: "error", message: e });
  },
  info(e) {
    u("UI:TOAST", { type: "info", message: e });
  },
  warning(e) {
    u("UI:TOAST", { type: "warning", message: e });
  },
  log(e) {
    u("UI:TOAST", { type: "log", message: e });
  }
};
function m(e, t) {
  return new Promise((r) => {
    u(
      "CACHE:" + e,
      {
        key: t
      },
      (n) => {
        r(n);
      }
    );
  });
}
function l(e, t, r) {
  return new Promise((n) => {
    u(
      "CACHE:" + e,
      {
        key: t,
        value: r
      },
      (a) => {
        n(a);
      }
    );
  });
}
const Y = {
  getLocal(e) {
    return m("getLocal", e);
  },
  saveLocal(e, t) {
    return l("saveLocal", e, t);
  },
  removeLocal(e) {
    return l("removeLocal", e);
  },
  getSession(e) {
    return m("getSession", e);
  },
  saveSession(e, t) {
    return l("saveSession", e, t);
  },
  removeSession(e) {
    return l("removeSession", e);
  }
}, K = {
  Container(e, t) {
    return e.children = e.children || [], o("Container", e, t);
  },
  Text(e, t) {
    return o("Text", e, t);
  },
  Tabs(e, t) {
    return o("Tabs", e, t);
  },
  Button(e, t) {
    return o("Button", e, t);
  },
  ButtonGroup(e, t) {
    return o("ButtonGroup", e, t);
  },
  SwitchItem(e, t) {
    return o("SwitchItem", e, t);
  },
  Checkbox(e, t) {
    return o("Checkbox", e, t);
  },
  SelectItem(e, t) {
    return o("SelectItem", e, t);
  },
  OptionGroup(e, t) {
    return o("OptionGroup", e, t);
  },
  InputItem(e, t) {
    return o("InputItem", e, t);
  },
  Canvas(e, t) {
    return o("Canvas", e, t);
  },
  SliderItem(e, t) {
    return o("SliderItem", e, t);
  },
  Divider() {
    return o("Divider", "");
  },
  SubHeader(e, t) {
    return o("SubHeader", e, t);
  },
  Header(e, t) {
    return o("Header", e, t);
  },
  Loading(e, t) {
    return o("Loading", e, t);
  },
  Link(e, t) {
    return o("Link", e, t);
  },
  Image(e, t) {
    return o("Image", e, t);
  },
  Textarea(e, t) {
    return o("Textarea", e, t);
  },
  UploadItem(e, t) {
    return o("UploadItem", e, t);
  },
  IFstructContainer(e, t) {
    return o("IFstructContainer", e, t);
  },
  Code(e, t) {
    return o("Code", e, t);
  },
  ColorPicker(e, t) {
    return o("ColorPicker", e, t);
  }
}, q = "1.0.7";
export {
  q as Version,
  Y as cache,
  u as call,
  b as checkAccess,
  h as checkAccessList,
  K as components,
  o as genStruct,
  G as getCurrentStyle,
  d as getState,
  B as init,
  M as log,
  p as off,
  E as on,
  I as once,
  R as pullStruct,
  x as registerModelHelper,
  H as registerModelTooltip,
  N as reinit,
  j as render,
  L as requestAccess,
  U as setContext,
  k as setCurrentStyle,
  _ as setState,
  D as setStruct,
  y as suid,
  F as toast,
  O as withAccess
};
