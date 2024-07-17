import { u as useRoute, s as storeToRefs, a as useHead } from './server.mjs';
import { u as useBackendUserStore } from './use-backend-user-store-DhRzqet0.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, resolveComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { u as useAutoScroll } from './scroll-BC3PxWrq.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { UTC2Date } from '@lincy/utils';
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
    name: "BackendUserList"
  },
  __name: "list",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const backendUserStore = useBackendUserStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-user-list", () => backendUserStore.getUserList({ page: 1, path: route.fullPath }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(backendUserStore), lists = toRef(__$temp_1, "lists");
    useAutoScroll("backend-user-list");
    const [loading, toggleLoading] = useToggle(false);
    const headTitle = ref("\u7528\u6237\u5217\u8868 - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-main card" }, _attrs))}><div class="settings-main-content"><div class="list-section list-header"><div class="list-username">\u7528\u6237\u540D</div><div class="list-email">\u90AE\u7BB1</div><div class="list-date">\u65F6\u95F4</div><div class="list-action">\u64CD\u4F5C</div></div><!--[-->`);
      ssrRenderList(lists.value.data, (item) => {
        _push(`<div class="list-section"><div class="${ssrRenderClass([item.is_delete ? "text-red-500 line-through" : "", "list-username"])}">${ssrInterpolate(item.username)}</div><div class="list-email">${ssrInterpolate(item.email)}</div><div class="list-date">${ssrInterpolate(unref(UTC2Date)(item.update_date))}</div><div class="list-action">`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/_backend/user/modify?id=${item._id}`,
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
        if (item.is_delete) {
          _push(`<a href="javascript:;">\u6062\u590D</a>`);
        } else {
          _push(`<a href="javascript:;">\u5220\u9664</a>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
      if (lists.value.hasNext) {
        _push(`<div class="settings-footer">`);
        if (!unref(loading)) {
          _push(`<a class="admin-load-more" href="javascript:;">\u52A0\u8F7D\u66F4\u591A</a>`);
        } else {
          _push(`<a class="admin-load-more" href="javascript:;">\u52A0\u8F7D\u4E2D...</a>`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/user/list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-62x3dT7q.mjs.map
