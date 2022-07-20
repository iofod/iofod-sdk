let appid;
const handles = {};
const channels = {};
const GlobalMethods = [
  "EditorUndo",
  "EditorRedo",
  "EditorPreview",
  "EditorExitPreview"
];
function on(event, fn) {
  if (typeof fn != "function")
    return;
  if (handles[event]) {
    handles[event].push(fn);
  } else {
    handles[event] = [fn];
  }
  if (!channels[event]) {
    const eventName = GlobalMethods.includes(event) ? event : appid + ":" + event;
    channels[event] = new BroadcastChannel(eventName);
    channels[event].onmessage = (e) => {
      handles[event].forEach((fn2) => {
        fn2(e.data);
      });
    };
  }
}
function off(event, fn) {
  if (!handles[event])
    return;
  if (typeof fn == "function" && handles[event].includes(fn)) {
    handles[event].splice(handles[event].indexOf(fn), 1);
    if (!handles[event].length) {
      channels[event].close();
    }
  } else {
    delete handles[event];
    channels[event].close();
    delete channels[event];
  }
}
function once(event, fn) {
  const callback = (e) => {
    fn(e);
    setTimeout(() => {
      off(event, callback);
    }, 0);
  };
  on(event, callback);
}
function setContext(param) {
  if (!appid) {
    appid = param;
  }
}
const PLUS_TYPE = "PLUS:";
const S4 = () => ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
const uuid = () => {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
};
function call(type, payload, fn) {
  const id = uuid();
  postMessage({ type: PLUS_TYPE + type, payload, id });
  if (typeof fn == "function") {
    once(id, fn);
  }
  return id;
}
function checkAccess(ql) {
  return new Promise((done) => {
    if (!ql)
      return done(false);
    call("ACCESS:CHECK", { ql }, (data) => {
      done(data);
    });
  });
}
function checkAccessList() {
  return new Promise((done) => {
    call("ACCESS:CHECK", { ql: "ALL" }, (data) => {
      done(data);
    });
  });
}
function requestAccess(list = []) {
  return new Promise((done) => {
    call("ACCESS:REQUEST", { list }, (data) => {
      done(data);
    });
  });
}
async function withAccess(list = []) {
  const accessList = await checkAccessList();
  if (list.every((access) => accessList.includes(access))) {
    return true;
  }
  const res = await requestAccess(list);
  if (res.code == 0) {
    return true;
  }
  return false;
}
const randomStr = () => Math.random().toString(36).substring(2);
function suid(prefix = "W") {
  return prefix + Math.round((Date.now() - new Date("2020/02/02").getTime()) / 1e3) + randomStr().substring(0, 3);
}
function pullStruct(path = "CTT") {
  return new Promise((done) => {
    call("DATA:GET", { path }, (data) => {
      done(data);
    });
  });
}
function setStruct(path = "CTT", value = {}) {
  return new Promise((done) => {
    call("DATA:SET", { path, payload: value }, (data) => {
      done(data);
    });
  });
}
function getCurrentStyle() {
  return new Promise((done) => {
    call("DATA:GET_CURRENT_STYLE", { payload: {} }, (data) => {
      done(data);
    });
  });
}
function setCurrentStyle(payload) {
  return new Promise((done) => {
    call("DATA:SET_CURRENT_STYLE", { payload }, (data) => {
      done(data);
    });
  });
}
function log(...arg) {
  return new Promise((done) => {
    call("DEBUG:LOG", { value: [...arg] }, (data) => {
      done(data);
    });
  });
}
function genStruct(tag, config, hook = "") {
  let struct = {
    tag
  };
  if (config instanceof Object) {
    struct = {
      tag,
      value: "",
      ...config
    };
  } else {
    struct.value = config;
  }
  struct.hook = hook;
  return struct;
}
const store = {
  state: {}
};
function writeObj(obj, paths, value) {
  return new Function("obj", "obj." + paths + "=" + JSON.stringify(value) + ";return obj")(obj);
}
function setState(payload, sync = true) {
  try {
    for (const road in payload) {
      writeObj(store.state, road, payload[road]);
    }
    if (sync) {
      call("STATE:SET", payload);
    }
    return true;
  } catch (e) {
    console.warn(e);
    return false;
  }
}
function getState(key) {
  return store.state[key];
}
let inited = false;
function init(config = {}) {
  const { state = {}, persisted } = config;
  return new Promise((done) => {
    if (inited) {
      return done(getState);
    }
    call("STATE:INIT", config, (data) => {
      if (persisted) {
        store.state = data;
      } else {
        store.state = state;
      }
      inited = true;
      done(getState);
    });
  });
}
function reinit() {
  inited = false;
  return true;
}
function render(struct) {
  return new Promise((done) => {
    call("STRUCT:INIT", { struct }, (data) => {
      done(data);
    });
  });
}
const toast = {
  success(message) {
    call("UI:TOAST", { type: "success", message });
  },
  error(message) {
    call("UI:TOAST", { type: "error", message });
  },
  info(message) {
    call("UI:TOAST", { type: "info", message });
  },
  warning(message) {
    call("UI:TOAST", { type: "warning", message });
  },
  log(message) {
    call("UI:TOAST", { type: "log", message });
  }
};
function pullCache(method, key) {
  return new Promise((done) => {
    call("CACHE:" + method, {
      key
    }, (e) => {
      done(e);
    });
  });
}
function callCache(method, key, value) {
  return new Promise((done) => {
    call("CACHE:" + method, {
      key,
      value
    }, (e) => {
      done(e);
    });
  });
}
const cache = {
  getLocal(key) {
    return pullCache("getLocal", key);
  },
  saveLocal(key, value) {
    return callCache("saveLocal", key, value);
  },
  removeLocal(key) {
    return callCache("removeLocal", key);
  },
  getSession(key) {
    return pullCache("getSession", key);
  },
  saveSession(key, value) {
    return callCache("saveSession", key, value);
  },
  removeSession(key) {
    return callCache("removeSession", key);
  }
};
const components = {
  Container(config, hook) {
    config.children = config.children || [];
    return genStruct("Container", config, hook);
  },
  Text(config, hook) {
    return genStruct("Text", config, hook);
  },
  Tabs(config, hook) {
    return genStruct("Tabs", config, hook);
  },
  Button(config, hook) {
    return genStruct("Button", config, hook);
  },
  ButtonGroup(config, hook) {
    return genStruct("ButtonGroup", config, hook);
  },
  SwitchItem(config, hook) {
    return genStruct("SwitchItem", config, hook);
  },
  Checkbox(config, hook) {
    return genStruct("Checkbox", config, hook);
  },
  SelectItem(config, hook) {
    return genStruct("SelectItem", config, hook);
  },
  InputItem(config, hook) {
    return genStruct("InputItem", config, hook);
  },
  Canvas(config, hook) {
    return genStruct("Canvas", config, hook);
  },
  SliderItem(config, hook) {
    return genStruct("SliderItem", config, hook);
  },
  Divider() {
    return genStruct("Divider", "");
  },
  SubHeader(config, hook) {
    return genStruct("SubHeader", config, hook);
  },
  Header(config, hook) {
    return genStruct("Header", config, hook);
  },
  Loading(config, hook) {
    return genStruct("Loading", config, hook);
  },
  Link(config, hook) {
    return genStruct("Link", config, hook);
  },
  Image(config, hook) {
    return genStruct("Image", config, hook);
  },
  Textarea(config, hook) {
    return genStruct("Textarea", config, hook);
  },
  UploadItem(config, hook) {
    return genStruct("UploadItem", config, hook);
  },
  IFstructContainer(config, hook) {
    return genStruct("IFstructContainer", config, hook);
  },
  Code(config, hook) {
    return genStruct("Code", config, hook);
  }
};
const Version = "1.0.4";
export { Version, cache, call, checkAccess, checkAccessList, components, genStruct, getCurrentStyle, getState, init, log, off, on, once, pullStruct, reinit, render, requestAccess, setContext, setCurrentStyle, setState, setStruct, suid, toast, withAccess };
