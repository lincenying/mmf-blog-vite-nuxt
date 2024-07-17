import { u as useRoute, s as storeToRefs, a as useHead } from './server.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, resolveComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { u as useAutoScroll } from './scroll-BC3PxWrq.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
    name: "BackendCategoryList"
  },
  __name: "list",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const globalCategoryStore = useGlobalCategoryStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-category-list", () => globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCategoryStore), category = toRef(__$temp_1, "lists");
    useAutoScroll("backend-category-list");
    const headTitle = ref("\u5206\u7C7B\u5217\u8868 - M.M.F \u5C0F\u5C4B");
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
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card settings-main" }, _attrs))}><div class="settings-main-content"><div class="list-section list-header"><div class="list-title">\u5206\u7C7B\u540D\u79F0</div><div class="list-date">\u5206\u7C7B\u6392\u5E8F</div><div class="list-action">\u64CD\u4F5C</div></div><!--[-->`);
      ssrRenderList(category.value, (item) => {
        _push(`<div class="list-section"><div class="${ssrRenderClass([item.is_delete ? "text-red-500 line-through" : "", "list-title"])}">${ssrInterpolate(item.cate_name)}</div><div class="list-date">${ssrInterpolate(item.cate_order)}</div><div class="list-action">`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/_backend/category/modify?id=${item._id}`,
          class: "badge badge-success"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u7F16\u8F91`);
            } else {
              return [
                createTextVNode("\u7F16\u8F91")
              ];
            }
          }),
          _: 2
        }, _parent));
        if (!item.cate_num) {
          _push(`<!--[-->`);
          if (item.is_delete) {
            _push(`<a href="javascript:;">\u6062\u590D</a>`);
          } else {
            _push(`<a href="javascript:;">\u5220\u9664</a>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/category/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-B20G2isO.mjs.map
