import { getCurrentInstance } from 'vue';
import md5 from 'md5';
import { u as useToggle } from './index-BQFAlylH.mjs';
import { E as ElMessage } from './index-DWBeqOQ2.mjs';

function useGlobal() {
  const ins = getCurrentInstance();
  const ctx = ins.appContext.config.globalProperties;
  const options = ins.type;
  return {
    ctx,
    options
  };
}
function useLockFn(fn, autoUnlock = "auto") {
  const [lock, toggleLock] = useToggle(false);
  return async (...args) => {
    if (lock.value) {
      return;
    }
    toggleLock(true);
    try {
      const $return = await fn(...args);
      if (autoUnlock === true || autoUnlock === "auto" && $return !== false) {
        toggleLock(false);
      }
    } catch (e) {
      toggleLock(false);
      throw e;
    }
  };
}
function useAvatar(email, width) {
  email = email || "123456";
  email = decodeURIComponent(email);
  width = width || 256;
  return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`;
}
function showMsg(config) {
  let content, type;
  if (!config) {
    content = "\u63A5\u53E3\u8FD4\u56DE\u6570\u636E\u9519\u8BEF";
    type = "error";
  } else if (typeof config === "string") {
    content = config;
    type = "error";
  } else {
    content = config.content;
    type = config.type;
  }
  ElMessage[type](content);
}
function utilsParseCookies(cookies) {
  const cookieArr = cookies.split(";");
  const cookieObj = {};
  cookieArr.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    if (key && value) {
      const cookieKey = key.trim();
      const cookieValue = decodeURIComponent(value.trim());
      cookieObj[cookieKey] = cookieValue;
    }
  });
  return cookieObj;
}

export { useGlobal as a, useLockFn as b, utilsParseCookies as c, showMsg as s, useAvatar as u };
//# sourceMappingURL=index-BqSLzvE5.mjs.map
