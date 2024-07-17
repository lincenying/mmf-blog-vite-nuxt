import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { b as useRouter, a as useHead } from './server.mjs';
import { d as distExports } from '../_/index.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, withDirectives, createVNode, vModelText, useSSRContext } from 'vue';
import { b as useLockFn, s as showMsg } from './index-BqSLzvE5.mjs';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
import 'md5';
import './index-BQFAlylH.mjs';
import './index-DWBeqOQ2.mjs';
import 'lodash-unified';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackendLogin"
  },
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const $loading = distExports.useLoading();
    const body = reactive({
      username: "",
      password: ""
    });
    useLockFn(async () => {
      if (!body.username || !body.password) {
        return showMsg("\u8BF7\u8F93\u5165\u7528\u6237\u540D\u548C\u5BC6\u7801!");
      }
      const loader = $loading.show();
      const { code, data } = await useHttp().$post("/api/backend/admin/login", {}, { body });
      loader.hide();
      if (code === 200 && data) {
        router.push("/_backend/article/list");
      }
    });
    const headTitle = ref("\u7BA1\u7406\u5458\u767B\u5F55 - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-main card" }, _attrs))}><div class="settings-main-content"><form>`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u8D26\u53F7" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).username)} type="text" placeholder="\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u8D26\u53F7" class="base-input" name="username"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u6635\u79F0</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).username = $event,
                type: "text",
                placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u8D26\u53F7",
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
      _push(ssrRenderComponent(_component_a_input, { title: "\u5BC6\u7801" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).password)} type="password" placeholder="\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u5BC6\u7801" class="base-input" name="password"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u5BC6\u7801</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).password = $event,
                type: "password",
                placeholder: "\u8BF7\u8F93\u5165\u7BA1\u7406\u5458\u5BC6\u7801",
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
      _push(`</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">\u767B\u5F55</a></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-up7gvvth.mjs.map
