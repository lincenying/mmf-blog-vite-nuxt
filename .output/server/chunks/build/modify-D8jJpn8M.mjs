import { _ as _sfc_main$1 } from './a-input-Dlh9xnYd.mjs';
import { u as useRoute, b as useRouter, s as storeToRefs, a as useHead, c as __nuxt_component_4 } from './server.mjs';
import { a as useGlobal } from './index-BqSLzvE5.mjs';
import { u as useRouteQuery } from './nuxt-C0QUSFdb.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
import { u as useAsyncData, b as useNuxtData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, reactive, watch, ref, resolveComponent, mergeProps, withCtx, unref, withDirectives, createVNode, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, createTextVNode, useSSRContext } from 'vue';
import { u as useBackendArticleStore } from './use-backend-article-store-BLhVf-dd.mjs';
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
import 'md5';
import './index-DWBeqOQ2.mjs';
import 'lodash-unified';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "BackendArticleModify"
  },
  __name: "modify",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useGlobal();
    const route = useRoute();
    useRouter();
    const id = useRouteQuery("id");
    const globalCategoryStore = useGlobalCategoryStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-category-list", () => globalCategoryStore.getCategoryItem({ path: route.fullPath, id: id.value }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCategoryStore), lists = toRef(__$temp_1, "lists");
    const backendArticleStore = useBackendArticleStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-article-modify", () => backendArticleStore.getArticleItem({ id: id.value }))), await __temp, __restore();
    const __$temp_2 = storeToRefs(backendArticleStore), item = toRef(__$temp_2, "item");
    const body = reactive({
      id: id.value,
      title: "",
      category: "",
      category_name: "",
      category_old: "",
      content: "",
      html: ""
    });
    watch(
      () => body.category,
      (val) => {
        const obj = lists.value.find((item2) => item2._id === val);
        if (obj) {
          body.category_name = obj.cate_name;
        }
      }
    );
    watch(
      () => item.value,
      (val) => {
        if (val.data) {
          body.title = val.data.title;
          body.category_old = val.data.category;
          body.category = val.data.category;
          body.content = val.data.content;
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
    useToggle(false);
    const frontHtml = ref(true);
    useNuxtData("backend-article-list");
    const headTitle = ref("\u7F16\u8F91\u6587\u7AE0 - M.M.F \u5C0F\u5C4B");
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
      const _component_router_link = resolveComponent("router-link");
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
            ssrRenderList(lists.value, (val) => {
              _push2(`<option${ssrRenderAttr("value", val._id)}${_scopeId}>${ssrInterpolate(val.cate_name)}</option>`);
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
                (openBlock(true), createBlock(Fragment, null, renderList(lists.value, (val) => {
                  return openBlock(), createBlock("option", {
                    key: val._id,
                    value: val._id
                  }, toDisplayString(val.cate_name), 9, ["value"]);
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
      _push(`<div class="settings-section"><div id="modify-content" class="settings-item-content">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></div></div><div class="settings-footer"><label mr-10px inline-flex items-center><input${ssrIncludeBooleanAttr(Array.isArray(unref(frontHtml)) ? ssrLooseContain(unref(frontHtml), "1") : unref(frontHtml)) ? " checked" : ""} type="checkbox" value="1"><span ml-5px>\u4F7F\u7528\u524D\u7AEF\u751F\u6210Html?</span></label><a href="javascript:;" class="btn btn-yellow">\u7F16\u8F91\u6587\u7AE0</a>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/_backend/article/list",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/article/modify.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=modify-D8jJpn8M.mjs.map
