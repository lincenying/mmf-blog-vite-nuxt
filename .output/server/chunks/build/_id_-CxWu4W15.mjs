import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$4 } from './aside-other-BRb7oTcb.mjs';
import { useSSRContext, defineComponent, withAsyncContext, toRef, computed, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, toRefs, reactive } from 'vue';
import { u as useGlobalStore } from './use-global-store-DkFj5j6p.mjs';
import { u as useGlobalCommentStore } from './use-global-comment-store-myl8p1Ys.mjs';
import { u as useRoute, s as storeToRefs, a as useHead } from './server.mjs';
import { b as useLockFn, s as showMsg, u as useAvatar } from './index-BqSLzvE5.mjs';
import { u as useAsyncData, a as useHttp } from './use-http-CG7gaNE4.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useToggle } from './index-BQFAlylH.mjs';
import { u as useFrontendArticleStore, _ as _sfc_main$3 } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { a as useRouteParam } from './nuxt-C0QUSFdb.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
import { u as useAutoScroll } from './scroll-BC3PxWrq.mjs';
import { ContentLoader } from 'vue-content-loader';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendComment"
  },
  __name: "frontend-comment",
  __ssrInlineRender: true,
  props: {
    comments: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), comments = toRef(__$temp_1, "comments");
    const globalStore = useGlobalStore();
    const __$temp_2 = toRefs(globalStore), cookies = toRef(__$temp_2, "cookies");
    const globalCommentStore = useGlobalCommentStore();
    const [loading, toggleLoading] = useToggle(false);
    const route = useRoute();
    const body = reactive({
      id: route.query.id,
      content: ""
    });
    const user = computed(() => cookies.value.user);
    const userEmail = computed(() => cookies.value.useremail);
    useLockFn(async () => {
      if (!user.value) {
        showMsg("\u8BF7\u5148\u767B\u5F55!");
        globalStore.setLoginModal(true);
      } else if (body.content === "") {
        showMsg("\u8BF7\u8F93\u5165\u8BC4\u8BBA\u5185\u5BB9!");
      } else {
        const { code, data } = await useHttp().$post("/api/frontend/comment/insert", {}, { body });
        if (code === 200) {
          body.content = "";
          showMsg({ type: "success", content: "\u8BC4\u8BBA\u53D1\u5E03\u6210\u529F!" });
          globalCommentStore.insertCommentItem(data);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="comments"><div class="comment-post-wrap"><img${ssrRenderAttr("src", ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))(userEmail.value))} alt="" class="avatar-img"><div class="comment-post-input-wrap base-textarea-wrap"><textarea id="content" class="base-input textarea-input" cols="30" rows="4">${ssrInterpolate(unref(body).content)}</textarea></div><div class="comment-post-actions"><a href="javascript:;" class="btn btn-blue">\u53D1\u8868\u8BC4\u8BBA</a></div></div><div class="comment-items-wrap"><!--[-->`);
      ssrRenderList(comments.value.data, (item) => {
        _push(`<div class="comment-item"><a href="javascript:;" class="comment-author-avatar-link"><img${ssrRenderAttr("src", ("useAvatar" in _ctx ? _ctx.useAvatar : unref(useAvatar))(item.userid.email))} alt="" class="avatar-img"></a><div class="comment-content-wrap"><span class="comment-author-wrap"><a href="javascript:;" class="comment-author">${ssrInterpolate(item.userid.username)}</a></span><div class="comment-content">${ssrInterpolate(item.content)}</div><div class="comment-footer"><span class="comment-time">${ssrInterpolate(item.creat_date)}</span><a href="javascript:;" class="comment-action-item comment-reply">\u56DE\u590D</a></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (comments.value.hasNext) {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/frontend-comment.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendArticle"
  },
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const id = useRouteParam("id");
    const path = route.fullPath;
    const globalCategoryStore = useGlobalCategoryStore();
    const frontendArticleStore = useFrontendArticleStore();
    const globalCommentStore = useGlobalCommentStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData(`frontend-article-detail-${id.value}`, () => Promise.all([
      globalCommentStore.getCommentList({ id: id.value, path, page: 1, limit: 10 }),
      frontendArticleStore.getArticleItem({ id: id.value, path })
    ]))), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-article-category", () => globalCategoryStore.getCategoryList({}))), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-article-trending", () => frontendArticleStore.getTrending())), await __temp, __restore();
    const __$temp_1 = storeToRefs(globalCategoryStore), category = toRef(__$temp_1, "lists");
    const __$temp_2 = storeToRefs(frontendArticleStore), item = toRef(__$temp_2, "item"), trending = toRef(__$temp_2, "trending");
    const __$temp_3 = storeToRefs(globalCommentStore), comments = toRef(__$temp_3, "lists");
    const isLoad = computed(() => item.value.isLoad);
    const articleData = computed(() => item.value.data);
    useAutoScroll(`frontend-article-detail-${id.value}`);
    function addTarget(content) {
      if (!content) {
        return "";
      }
      return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http');
    }
    const headTitle = computed(() => {
      var _a;
      let title = "M.M.F \u5C0F\u5C4B";
      title = ((_a = articleData.value) == null ? void 0 : _a.title) ? `${articleData.value.title} - M.M.F \u5C0F\u5C4B` : "M.M.F \u5C0F\u5C4B";
      return title;
    });
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
      const _component_item_actions = _sfc_main$2;
      const _component_frontend_comment = _sfc_main$1;
      const _component_aside_category = _sfc_main$1$1;
      const _component_aside_trending = _sfc_main$3;
      const _component_aside_other = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main wrap" }, _attrs))}><div class="main-left">`);
      if (!isLoad.value) {
        _push(`<div class="card card-content-loader">`);
        _push(ssrRenderComponent(unref(ContentLoader), {
          height: 160,
          width: 660,
          speed: 2,
          "primary-color": "#f3f3f3",
          "secondary-color": "#ecebeb"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<rect x="70" y="15" rx="4" ry="4" width="117" height="6.4"${_scopeId}></rect> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4"${_scopeId}></rect><rect x="0" y="80" rx="3" ry="3" width="550" height="6.4"${_scopeId}></rect> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4"${_scopeId}></rect><rect x="0" y="120" rx="3" ry="3" width="401" height="6.4"${_scopeId}></rect> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4"${_scopeId}></rect><circle cx="30" cy="30" r="30"${_scopeId}></circle>`);
            } else {
              return [
                createVNode("rect", {
                  x: "70",
                  y: "15",
                  rx: "4",
                  ry: "4",
                  width: "117",
                  height: "6.4"
                }),
                createTextVNode(),
                createVNode("rect", {
                  x: "70",
                  y: "35",
                  rx: "3",
                  ry: "3",
                  width: "85",
                  height: "6.4"
                }),
                createVNode("rect", {
                  x: "0",
                  y: "80",
                  rx: "3",
                  ry: "3",
                  width: "550",
                  height: "6.4"
                }),
                createTextVNode(),
                createVNode("rect", {
                  x: "0",
                  y: "100",
                  rx: "3",
                  ry: "3",
                  width: "620",
                  height: "6.4"
                }),
                createVNode("rect", {
                  x: "0",
                  y: "120",
                  rx: "3",
                  ry: "3",
                  width: "401",
                  height: "6.4"
                }),
                createTextVNode(),
                createVNode("rect", {
                  x: "0",
                  y: "140",
                  rx: "3",
                  ry: "3",
                  width: "501",
                  height: "6.4"
                }),
                createVNode("circle", {
                  cx: "30",
                  cy: "30",
                  r: "30"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (articleData.value) {
        _push(`<!--[--><div class="card card-question-head"><div class="question-content">`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/category/${articleData.value.category}`,
          class: "topic-link-item"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(articleData.value.category_name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(articleData.value.category_name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h2 class="question-title">`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/article/${articleData.value._id}`,
          class: "question-title-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(articleData.value.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(articleData.value.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h2></div></div><div class="card card-answer"><div class="answer-content"><div class="markdown-body vuepress-markdown-body github-markdown-body article-content">${addTarget(articleData.value.html) ?? ""}</div></div>`);
        _push(ssrRenderComponent(_component_item_actions, { item: articleData.value }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_frontend_comment, { comments: comments.value }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<div class="card card-answer"><div class="answer-content">\u8BE5\u6587\u7AE0\u4E0D\u5B58\u5728, \u6216\u8005\u8BE5\u6587\u7AE0\u5DF2\u7ECF\u88AB\u5220\u9664</div></div>`);
      }
      _push(`</div><div class="main-right">`);
      _push(ssrRenderComponent(_component_aside_category, { category: category.value }, null, _parent));
      _push(ssrRenderComponent(_component_aside_trending, { trending: trending.value }, null, _parent));
      _push(ssrRenderComponent(_component_aside_other, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/article/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CxWu4W15.mjs.map
