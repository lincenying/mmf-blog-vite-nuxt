import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { u as useRoute, b as useRouter, s as storeToRefs, a as useHead } from './server.mjs';
import { u as useRouteQuery } from './nuxt-C0QUSFdb.mjs';
import { u as useBackendUserStore } from './use-backend-user-store-DhRzqet0.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, reactive, watch, ref, resolveComponent, mergeProps, withCtx, unref, withDirectives, createVNode, vModelText, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { u as useToggle } from './index-BQFAlylH.mjs';
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
import './index-DWBeqOQ2.mjs';
import 'lodash-unified';
import '@vue/shared';
import 'md5';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackendUserModify"
  },
  __name: "modify",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const id = useRouteQuery("id");
    const backendUserStore = useBackendUserStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-user-modify", () => backendUserStore.getUserItem({
      id: id.value,
      path: route.fullPath,
      from: "backend"
    }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(backendUserStore), item = toRef(__$temp_1, "item");
    useToggle(false);
    const body = reactive({
      id: id.value,
      username: "",
      email: "",
      password: ""
    });
    watch(item.value, (val) => {
      if (val.data) {
        body.username = val.data.username;
        body.email = val.data.email;
      }
    }, {
      immediate: true,
      deep: true
    });
    const headTitle = ref("\u7528\u6237\u7F16\u8F91 - M.M.F \u5C0F\u5C4B");
    useHead({
      // Can be static or computed
      title: headTitle,
      meta: [
        {
          name: "description",
          content: headTitle
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_input = _sfc_main$1;
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-main card" }, _attrs))}><div class="settings-main-content"><form>`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u6635\u79F0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).username)} type="text" placeholder="\u6635\u79F0" class="base-input" name="username"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u6635\u79F0</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).username = $event,
                type: "text",
                placeholder: "\u6635\u79F0",
                class: "base-input",
                name: "username"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).username]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u6635\u79F0")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u90AE\u7BB1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).email)} type="text" placeholder="\u90AE\u7BB1" class="base-input" name="email"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u90AE\u7BB1</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).email = $event,
                type: "text",
                placeholder: "\u90AE\u7BB1",
                class: "base-input",
                name: "email"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).email]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u90AE\u7BB1")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u5BC6\u7801" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).password)} type="password" placeholder="\u5BC6\u7801" class="base-input" name="password"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u5BC6\u7801</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).password = $event,
                type: "password",
                placeholder: "\u5BC6\u7801",
                class: "base-input",
                name: "password"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).password]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u5BC6\u7801")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">\u7F16\u8F91\u7528\u6237</a>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/user/list",
        class: "btn btn-blue"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u8FD4\u56DE`);
          } else {
            return [
              createTextVNode("\u8FD4\u56DE")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/user/modify.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=modify-BxPBaCCu.mjs.map
