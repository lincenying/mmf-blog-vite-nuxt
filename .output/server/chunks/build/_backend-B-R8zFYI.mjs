import { u as useRoute, _ as __nuxt_component_0 } from './server.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, unref, resolveComponent, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackendMenu"
  },
  __name: "backend-menu",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-right" }, _attrs))}><div class="card card-me">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/admin/list",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u7BA1\u7406\u5E10\u53F7 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u7BA1\u7406\u5E10\u53F7 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/user/list",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u7528\u6237\u5217\u8868 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u7528\u6237\u5217\u8868 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="card card-me">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/category/insert",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u6DFB\u52A0\u5206\u7C7B `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u6DFB\u52A0\u5206\u7C7B ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/category/list",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u7BA1\u7406\u5206\u7C7B `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u7BA1\u7406\u5206\u7C7B ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/article/insert",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u53D1\u5E03\u6587\u7AE0 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u53D1\u5E03\u6587\u7AE0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/article/list",
        "active-class": "active",
        class: "side-entry"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-right"${_scopeId}></i><i class="icon icon-menu-articles"${_scopeId}></i>\u7BA1\u7406\u6587\u7AE0 `);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-right" }),
              createVNode("i", { class: "icon icon-menu-articles" }),
              createTextVNode("\u7BA1\u7406\u6587\u7AE0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/backend-menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackendIndex"
  },
  __name: "_backend",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isLoginPage = computed(() => ["/_backend/login", "/_backend/login/"].includes(route.path));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      const _component_backend_menu = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrap main" }, _attrs))}><div class="main-left"><div class="cards-wrap home-feeds">`);
      _push(ssrRenderComponent(_component_NuxtPage, { class: "app-view" }, null, _parent));
      _push(`</div></div>`);
      if (!unref(isLoginPage)) {
        _push(ssrRenderComponent(_component_backend_menu, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_backend-B-R8zFYI.mjs.map
