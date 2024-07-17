import { useSSRContext, defineComponent, resolveComponent, mergeProps, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "AsideAccount"
  },
  __name: "aside-account",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-me" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/user/account",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u5E10\u53F7 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u5E10\u53F7 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/user/password",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u5BC6\u7801 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u5BC6\u7801 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="javascript:;" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-menu-articles"></i>\u9000\u51FA </a></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aside-account.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendUser"
  },
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtChild = resolveComponent("NuxtChild");
      const _component_aside_account = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main wrap" }, _attrs))}><div class="main-left">`);
      _push(ssrRenderComponent(_component_NuxtChild, null, null, _parent));
      _push(`</div><div class="main-right">`);
      _push(ssrRenderComponent(_component_aside_account, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=user-D6rE03FM.mjs.map
