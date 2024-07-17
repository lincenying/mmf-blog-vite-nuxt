import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { u as useGlobalStore } from './use-global-store-DkFj5j6p.mjs';
import { defineComponent, toRefs, toRef, ref, reactive, mergeProps, withCtx, unref, createVNode, withDirectives, isRef, vModelText, useSSRContext } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { b as useLockFn, s as showMsg } from './index-BqSLzvE5.mjs';
import { a as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
import 'md5';
import './index-BQFAlylH.mjs';
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
    name: "FrontendUserAccount"
  },
  __name: "account",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGlobalStore();
    const __$temp_1 = toRefs(globalStore), cookies = toRef(__$temp_1, "cookies");
    let username = ref("");
    let email = ref("");
    useLockFn(async () => {
      const reg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z0-9_-]+)$/i;
      if (!email.value) {
        showMsg("\u8BF7\u586B\u5199\u90AE\u7BB1\u5730\u5740!");
        return;
      } else if (!reg.test(email.value)) {
        showMsg("\u90AE\u7BB1\u683C\u5F0F\u9519\u8BEF!");
        return;
      }
      const body = reactive({
        email: email.value,
        username: username.value,
        id: cookies.value.userid
      });
      const { code, message } = await useHttp().$post("/api/frontend/user/account", {}, { body });
      if (code === 200) {
        globalStore.setCookies({
          ...cookies.value,
          useremail: email.value
        });
        showMsg({ type: "success", content: message });
      } else {
        showMsg(message);
      }
    });
    const headTitle = ref("\u5E10\u53F7 - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cards-wrap home-feeds" }, _attrs))}><div class="card settings-main"><div class="settings-main-content"><form>`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u6635\u79F0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input type="text"${ssrRenderAttr("value", unref(username))} placeholder="\u6635\u79F0" class="base-input" name="username" readonly${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u6635\u79F0</span>`);
          } else {
            return [
              createVNode("input", {
                type: "text",
                value: unref(username),
                placeholder: "\u6635\u79F0",
                class: "base-input",
                name: "username",
                readonly: ""
              }, null, 8, ["value"]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u6635\u79F0")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u90AE\u7BB1" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(email))} type="text" placeholder="\u90AE\u7BB1" class="base-input" name="email"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u90AE\u7BB1</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : email = $event,
                type: "text",
                placeholder: "\u90AE\u7BB1",
                class: "base-input",
                name: "email"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(email)]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u90AE\u7BB1")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/account.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=account-DO8rgk8K.mjs.map
