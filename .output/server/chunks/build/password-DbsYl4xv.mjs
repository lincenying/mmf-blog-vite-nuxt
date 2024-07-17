import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, withDirectives, createVNode, vModelText, useSSRContext } from 'vue';
import { b as useLockFn, s as showMsg } from './index-BqSLzvE5.mjs';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { a as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'md5';
import './index-BQFAlylH.mjs';
import './index-DWBeqOQ2.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'lodash-unified';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendUserPassword"
  },
  __name: "password",
  __ssrInlineRender: true,
  setup(__props) {
    const body = reactive({
      old_password: "",
      password: "",
      re_password: ""
    });
    useLockFn(async () => {
      if (!body.password || !body.old_password || !body.re_password) {
        return showMsg("\u8BF7\u5C06\u8868\u5355\u586B\u5199\u5B8C\u6574!");
      } else if (body.password !== body.re_password) {
        return showMsg("\u4E24\u6B21\u5BC6\u7801\u8F93\u5165\u4E0D\u4E00\u81F4!");
      }
      const { code, message } = await useHttp().$post("/api/frontend/user/password", {}, { body });
      if (code === 200) {
        showMsg({ type: "success", content: message });
        body.old_password = "";
        body.password = "";
        body.re_password = "";
      }
    });
    const headTitle = ref("\u5BC6\u7801 - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-feeds cards-wrap" }, _attrs))}><div class="settings-main card"><div class="settings-main-content"><form>`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u5F53\u524D\u5BC6\u7801" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).old_password)} type="password" placeholder="\u5F53\u524D\u5BC6\u7801" class="base-input" name="old_password" autocomplete="off"${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).old_password = $event,
                type: "password",
                placeholder: "\u5F53\u524D\u5BC6\u7801",
                class: "base-input",
                name: "old_password",
                autocomplete: "off"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).old_password]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u65B0\u7684\u5BC6\u7801" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).password)} type="password" placeholder="\u65B0\u7684\u5BC6\u7801" class="base-input" name="password" autocomplete="off"${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).password = $event,
                type: "password",
                placeholder: "\u65B0\u7684\u5BC6\u7801",
                class: "base-input",
                name: "password",
                autocomplete: "off"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).password]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u786E\u8BA4\u5BC6\u7801" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).re_password)} type="password" placeholder="\u786E\u8BA4\u5BC6\u7801" class="base-input" name="re_password" autocomplete="off"${_scopeId}>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).re_password = $event,
                type: "password",
                placeholder: "\u786E\u8BA4\u5BC6\u7801",
                class: "base-input",
                name: "re_password",
                autocomplete: "off"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).re_password]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">\u4FDD\u5B58\u8BBE\u7F6E</a></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=password-DbsYl4xv.mjs.map
