import { u as useRoute, s as storeToRefs, a as useHead } from './server.mjs';
import { u as useRouteQuery } from './nuxt-C0QUSFdb.mjs';
import { u as useGlobalCommentStore } from './use-global-comment-store-myl8p1Ys.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, resolveComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { u as useAvatar } from './index-BqSLzvE5.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { getDateDiff } from '@lincy/utils';
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
    name: "BackendArticleComment"
  },
  __name: "comment",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = useRouteQuery("id");
    const globalCommentStore = useGlobalCommentStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("backend-article-comment", () => globalCommentStore.getCommentList({
      page: 1,
      path: route.fullPath,
      all: 1,
      id: id.value
    }))), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCommentStore), lists = toRef(__$temp_1, "lists");
    const [loading, toggleLoading] = useToggle(false);
    const headTitle = ref("\u8BC4\u8BBA\u5217\u8868 - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="comments"><div class="comment-back">`);
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
      _push(`</div><div class="comment-items-wrap"><!--[-->`);
      ssrRenderList(lists.value.data, (item) => {
        _push(`<div class="comment-item"><a href="javascript:;" class="comment-author-avatar-link"><img${ssrRenderAttr("src", ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))(item.email))} alt="" class="avatar-img"></a><div class="comment-content-wrap"><span class="comment-author-wrap"><a href="javascript:;" class="comment-author">${ssrInterpolate(item.username)}</a></span><div class="comment-content">${ssrInterpolate(item.content)}</div><div class="comment-footer"><span class="comment-time">${ssrInterpolate(unref(getDateDiff)(`${item.timestamp}`))}</span>`);
        if (item.is_delete) {
          _push(`<a href="javascript:;" class="comment-action-item comment-reply">\u6062\u590D</a>`);
        } else {
          _push(`<a href="javascript:;" class="comment-action-item comment-reply">\u5220\u9664</a>`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (lists.value.hasNext) {
        _push(`<div class="load-more-wrap">`);
        if (!unref(loading)) {
          _push(`<a href="javascript:;" class="comments-load-more">\u52A0\u8F7D\u66F4\u591A</a>`);
        } else {
          _push(`<a href="javascript:;" class="comments-load-more">\u52A0\u8F7D\u4E2D...</a>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/_backend/article/comment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=comment-r0IrXfch.mjs.map
