import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { u as useRoute, b as useRouter, s as storeToRefs, a as useHead } from './server.mjs';
import { u as useRouteQuery } from './nuxt-C0QUSFdb.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
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
    name: "BackendCategoryModify"
  },
  __name: "modify",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const id = useRouteQuery("id");
    const globalCategoryStore = useGlobalCategoryStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-category-list", () => globalCategoryStore.getCategoryItem({ path: route.fullPath, id: id.value }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCategoryStore), item = toRef(__$temp_1, "item");
    useToggle(false);
    const body = reactive({
      id: id.value,
      cate_name: "",
      cate_order: ""
    });
    watch(item.value, (val) => {
      if (val.data) {
        body.cate_name = val.data.cate_name;
        body.cate_order = val.data.cate_order;
      }
    }, {
      immediate: true,
      deep: true
    });
    const headTitle = ref("\u7F16\u8F91\u5206\u7C7B - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-main card" }, _attrs))}><div class="settings-main-content">`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u5206\u7C7B\u540D\u79F0" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).cate_name)} type="text" placeholder="\u5206\u7C7B\u540D\u79F0" class="base-input" name="cate_name"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).cate_name = $event,
                type: "text",
                placeholder: "\u5206\u7C7B\u540D\u79F0",
                class: "base-input",
                name: "cate_name"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).cate_name]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, { title: "\u5206\u7C7B\u6392\u5E8F" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).cate_order)} type="text" placeholder="\u5206\u7C7B\u6392\u5E8F" class="base-input" name="cate_order"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u5206\u7C7B\u6392\u5E8F</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).cate_order = $event,
                type: "text",
                placeholder: "\u5206\u7C7B\u6392\u5E8F",
                class: "base-input",
                name: "cate_order"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).cate_order]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u5206\u7C7B\u6392\u5E8F")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="settings-footer"><a href="javascript:;" class="btn btn-yellow">\u7F16\u8F91\u5206\u7C7B</a>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/category/list",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/category/modify.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=modify-CqhA7gYR.mjs.map
