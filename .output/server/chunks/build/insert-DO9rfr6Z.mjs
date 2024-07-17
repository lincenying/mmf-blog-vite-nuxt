import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { u as useRoute, b as useRouter, s as storeToRefs, a as useHead, c as __nuxt_component_4 } from './server.mjs';
import { d as distExports } from '../_/index.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
import { u as useAsyncData, b as useNuxtData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, reactive, mergeProps, withCtx, unref, withDirectives, createVNode, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    name: "BackendArticleInsert"
  },
  __name: "insert",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    distExports.useLoading();
    const route = useRoute();
    useRouter();
    const globalCategoryStore = useGlobalCategoryStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-insert", () => globalCategoryStore.getCategoryList({
      limit: 99,
      path: route.fullPath
    }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCategoryStore), lists = toRef(__$temp_1, "lists");
    useNuxtData("backend-article-list");
    ref(false);
    const frontHtml = ref(true);
    useToggle(false);
    const body = reactive({
      title: "",
      category: "",
      content: "",
      html: ""
    });
    const headTitle = ref("\u53D1\u5E03\u6587\u7AE0 - M.M.F \u5C0F\u5C4B");
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
      const _component_client_only = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-main card" }, _attrs))}><div class="settings-main-content">`);
      _push(ssrRenderComponent(_component_a_input, { title: "\u6807\u9898" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<input${ssrRenderAttr("value", unref(body).title)} type="text" placeholder="\u6807\u9898" class="base-input" name="title"${_scopeId}><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u6807\u9898</span>`);
          } else {
            return [
              withDirectives(createVNode("input", {
                "onUpdate:modelValue": ($event) => unref(body).title = $event,
                type: "text",
                placeholder: "\u6807\u9898",
                class: "base-input",
                name: "title"
              }, null, 8, ["onUpdate:modelValue"]), [
                [vModelText, unref(body).title]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u6807\u9898")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_a_input, {
        title: "\u5206\u7C7B",
        classes: "select-item-wrap"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon icon-arrow-down"${_scopeId}></i><select class="select-item" name="category"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(body).category) ? ssrLooseContain(unref(body).category, "") : ssrLooseEqual(unref(body).category, "")) ? " selected" : ""}${_scopeId}>\u8BF7\u9009\u62E9\u5206\u7C7B</option><!--[-->`);
            ssrRenderList(lists.value, (item) => {
              _push2(`<option${ssrRenderAttr("value", `${item._id}|${item.cate_name}`)}${_scopeId}>${ssrInterpolate(item.cate_name)}</option>`);
            });
            _push2(`<!--]--></select><span class="input-info error"${_scopeId}>\u8BF7\u8F93\u5165\u5206\u7C7B</span>`);
          } else {
            return [
              createVNode("i", { class: "icon icon-arrow-down" }),
              withDirectives(createVNode("select", {
                "onUpdate:modelValue": ($event) => unref(body).category = $event,
                class: "select-item",
                name: "category"
              }, [
                createVNode("option", { value: "" }, "\u8BF7\u9009\u62E9\u5206\u7C7B"),
                (openBlock(true), createBlock(Fragment, null, renderList(lists.value, (item) => {
                  return openBlock(), createBlock("option", {
                    key: item._id,
                    value: `${item._id}|${item.cate_name}`
                  }, toDisplayString(item.cate_name), 9, ["value"]);
                }), 128))
              ], 8, ["onUpdate:modelValue"]), [
                [vModelSelect, unref(body).category]
              ]),
              createVNode("span", { class: "input-info error" }, "\u8BF7\u8F93\u5165\u5206\u7C7B")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="settings-section"><div id="post-content" class="settings-item-content">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></div></div><div class="settings-footer"><label mr-10px inline-flex items-center><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontHtml)) ? ssrLooseContain(unref(frontHtml), "1") : unref(frontHtml)) ? " checked" : ""} type="checkbox" value="1"><span ml-5px>\u4F7F\u7528\u524D\u7AEF\u751F\u6210Html?</span></label><a href="javascript:;" class="btn btn-yellow">\u6DFB\u52A0\u6587\u7AE0</a></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/article/insert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=insert-DO9rfr6Z.mjs.map
