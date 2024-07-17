import { defineComponent, toRefs, toRef, computed, resolveComponent, mergeProps, withCtx, createVNode, unref, useSSRContext, reactive, ref, watch } from 'vue';
import { u as useGlobalStore } from './use-global-store-DkFj5j6p.mjs';
import { b as useRouter } from './server.mjs';
import { u as useAvatar, b as useLockFn, s as showMsg } from './index-BqSLzvE5.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { strLen } from '@lincy/utils';
import { n as noop, t as toValue, i as isObject, a as tryOnScopeDispose } from './index-BQFAlylH.mjs';

function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useWindowScroll(options = {}) {
  const { window: window2 = defaultWindow, behavior = "auto" } = options;
  if (!window2) {
    return {
      x: ref(0),
      y: ref(0)
    };
  }
  const internalX = ref(window2.scrollX);
  const internalY = ref(window2.scrollY);
  const x = computed({
    get() {
      return internalX.value;
    },
    set(x2) {
      scrollTo({ left: x2, behavior });
    }
  });
  const y = computed({
    get() {
      return internalY.value;
    },
    set(y2) {
      scrollTo({ top: y2, behavior });
    }
  });
  useEventListener(
    window2,
    "scroll",
    () => {
      internalX.value = window2.scrollX;
      internalY.value = window2.scrollY;
    },
    {
      capture: false,
      passive: true
    }
  );
  return { x, y };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    name: "GlobalNavigation"
  },
  __name: "global-navigation",
  __ssrInlineRender: true,
  props: {
    isBackend: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), isBackend = toRef(__$temp_1, "isBackend");
    const globalStore = useGlobalStore();
    const __$temp_2 = toRefs(globalStore), cookies = toRef(__$temp_2, "cookies");
    const isLogin = computed(() => !!cookies.value.user);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "global-nav" }, _attrs))}><div class="wrap"><div class="left-part">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        "active-class": "current",
        exact: "",
        class: "logo-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-nav-logo"${_scopeId}></i><span class="hidden"${_scopeId}>M.M.F \u5C0F\u5C4B</span>`);
          } else {
            return [
              createVNode("i", { class: "icon icon-nav-logo" }),
              createVNode("span", { class: "hidden" }, "M.M.F \u5C0F\u5C4B")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="main-nav">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        "active-class": "current",
        exact: "",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-nav-home"${_scopeId}></i><span class="text"${_scopeId}>\u9996\u9875</span>`);
          } else {
            return [
              createVNode("i", { class: "icon icon-nav-home" }),
              createVNode("span", { class: "text" }, "\u9996\u9875")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/trending/visit",
        "active-class": "current",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-nav-explore"${_scopeId}></i><span class="text"${_scopeId}>\u70ED\u95E8</span>`);
          } else {
            return [
              createVNode("i", { class: "icon icon-nav-explore" }),
              createVNode("span", { class: "text" }, "\u70ED\u95E8")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/about",
        "active-class": "current",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-nav-features"${_scopeId}></i><span class="text"${_scopeId}>\u5173\u4E8E</span>`);
          } else {
            return [
              createVNode("i", { class: "icon icon-nav-features" }),
              createVNode("span", { class: "text" }, "\u5173\u4E8E")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="https://handle.mmxiaowu.com/" target="_blank" class="nav-link"><i class="icon icon-nav-game"></i><span class="text">\u6C49\u515C</span></a></div></div>`);
      if (!isBackend.value) {
        _push(`<div class="right-part"><span class="nav-search"><i class="icon icon-search-white"></i><input placeholder="\u8BB0\u5F97\u6309\u56DE\u8F66\u54E6" name="search" class="nav-search-input"></span>`);
        if (unref(isLogin)) {
          _push(`<span class="nav-me">`);
          _push(ssrRenderComponent(_component_router_link, {
            to: "/user/account",
            class: "nav-me-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))(cookies.value.useremail, 100))} class="nav-avatar-img"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))(cookies.value.useremail, 100),
                    class: "nav-avatar-img"
                  }, null, 8, ["src"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</span>`);
        } else {
          _push(`<span class="nav-me"><a href="javascript:;" class="nav-me-link"><img${ssrRenderAttr("src", ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))("noavatar"))} class="nav-avatar-img"></a></span>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global-navigation.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "SignIn"
  },
  __name: "sign-in",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), show = toRef(__$temp_1, "show");
    useGlobalStore();
    const body = reactive({
      username: "",
      password: ""
    });
    useLockFn(async () => {
      if (!body.username || !body.password) {
        return showMsg("\u8BF7\u5C06\u8868\u5355\u586B\u5199\u5B8C\u6574!");
      }
      const { code, message } = await useHttp().$post("/api/frontend/user/login", {}, { body });
      if (code === 200) {
        showMsg({ type: "success", content: message });
        (void 0).location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["modal-wrap modal-sign-in-wrap", show.value ? "active" : ""]
      }, _attrs))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">\u767B\u5F55</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).username)} type="text" placeholder="\u6635\u79F0" class="base-input" name="username"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).password)} type="password" placeholder="\u5BC6\u7801" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">\u786E\u8BA4\u767B\u5F55</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">\u6211\u8981\u6CE8\u518C</a></form></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sign-in.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "SignUp"
  },
  __name: "sign-up",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), show = toRef(__$temp_1, "show");
    const globalStore = useGlobalStore();
    const body = reactive({
      username: "",
      email: "",
      password: "",
      re_password: ""
    });
    function handleLogin() {
      globalStore.setLoginModal(true);
      globalStore.setRegisterModal(false);
    }
    useLockFn(async () => {
      const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i;
      if (!body.username || !body.password || !body.email) {
        return showMsg("\u8BF7\u5C06\u8868\u5355\u586B\u5199\u5B8C\u6574!");
      } else if (strLen(body.username) < 4) {
        return showMsg("\u7528\u6237\u957F\u5EA6\u81F3\u5C11 2 \u4E2A\u4E2D\u6587\u6216 4 \u4E2A\u82F1\u6587!");
      } else if (!reg.test(body.email)) {
        return showMsg("\u90AE\u7BB1\u683C\u5F0F\u9519\u8BEF!");
      } else if (strLen(body.password) < 8) {
        return showMsg("\u5BC6\u7801\u957F\u5EA6\u81F3\u5C11 8 \u4F4D!");
      } else if (body.password !== body.re_password) {
        return showMsg("\u4E24\u6B21\u8F93\u5165\u7684\u5BC6\u7801\u4E0D\u4E00\u81F4!");
      }
      const { code, message } = await useHttp().$post("/api/frontend/user/insert", {}, { body });
      if (code === 200) {
        showMsg({ type: "success", content: message });
        handleLogin();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["modal-wrap modal-signup-wrap", show.value ? "active" : ""]
      }, _attrs))}><span class="center-helper"></span><div class="modal modal-signup"><h2 class="modal-title">\u6CE8\u518C</h2><a href="javascript:;" class="modal-close"><i class="icon icon-close-black"></i></a><div class="modal-content"><form class="sign-up-form"><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).username)} type="text" placeholder="\u6635\u79F0" class="base-input" name="username"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).email)} type="text" placeholder="\u90AE\u7BB1" class="base-input" name="email"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).password)} type="password" placeholder="\u5BC6\u7801" class="base-input" autocomplete="off" name="password"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><div class="input-wrap"><input${ssrRenderAttr("value", unref(body).re_password)} type="password" placeholder="\u91CD\u590D\u5BC6\u7801" class="base-input" autocomplete="off" name="re_password"><p class="error-info input-info hidden">\u957F\u5EA6\u81F3\u5C11 6 \u4F4D</p></div><a href="javascript:;" class="btn sign-up-btn btn-yellow">\u786E\u8BA4\u6CE8\u518C</a><a href="javascript:;" class="btn sign-up-btn btn-blue block">\u76F4\u63A5\u767B\u5F55</a></form></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/sign-up.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackTop"
  },
  __name: "back-top",
  __ssrInlineRender: true,
  setup(__props) {
    const { y: scrollTop } = useWindowScroll();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: unref(scrollTop) > 500 ? null : { display: "none" },
        class: "back-top"
      }, _attrs))}><a href="javascript:;"></a></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/back-top.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
//# sourceMappingURL=back-top-DU-xg8TT.mjs.map
