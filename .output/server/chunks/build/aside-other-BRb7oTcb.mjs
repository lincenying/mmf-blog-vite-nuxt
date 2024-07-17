import { defineComponent, toRefs, toRef, computed, mergeProps, useSSRContext, resolveComponent, withCtx, createVNode, toDisplayString } from 'vue';
import { u as useGlobalStore } from './use-global-store-DkFj5j6p.mjs';
import { u as useFrontendArticleStore } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { b as useLockFn, s as showMsg } from './index-BqSLzvE5.mjs';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "ItemActions"
  },
  __name: "item-actions",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), item = toRef(__$temp_1, "item");
    const globalStore = useGlobalStore();
    const __$temp_2 = toRefs(globalStore), cookies = toRef(__$temp_2, "cookies");
    const frontendArticleStore = useFrontendArticleStore();
    const isLogin = computed(() => !!cookies.value.user);
    useLockFn(async () => {
      if (!isLogin.value) {
        showMsg("\u8BF7\u5148\u767B\u5F55!");
        globalStore.setLoginModal(true);
        return;
      }
      let url = "/api/frontend/like";
      if (item.value.like_status) {
        url = "/api/frontend/unlike";
      }
      const { code, message } = await useHttp().$get(url, { id: item.value._id });
      if (code === 200) {
        showMsg({ type: "success", content: message });
        frontendArticleStore.modifyLikeStatus({
          id: item.value._id,
          status: !item.value.like_status
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "actions-wrap" }, _attrs))}>`);
      if (item.value.like_status) {
        _push(`<a href="javascript:;" class="action-item active"><i class="icon icon-action-voteup-active"></i><span class="text">${ssrInterpolate(item.value.like)} \u8D5E</span></a>`);
      } else {
        _push(`<a href="javascript:;" class="action-item"><i class="icon icon-action-voteup"></i><span class="text">${ssrInterpolate(item.value.like)} \u8D5E</span></a>`);
      }
      _push(`<a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">${ssrInterpolate(item.value.comment_count)} \u8BC4\u8BBA</span></a><a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><span class="text">${ssrInterpolate(item.value.visit)} \u6D4F\u89C8</span></a><a href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">\u5206\u4EAB</span></a></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/item-actions.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "data:image/png;base64,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";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "AsideCategory"
  },
  __name: "aside-category",
  __ssrInlineRender: true,
  props: {
    category: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), category = toRef(__$temp_1, "category");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-topics" }, _attrs))}><!--[-->`);
      ssrRenderList(category.value, (item) => {
        _push(ssrRenderComponent(_component_router_link, {
          key: item._id,
          to: `/category/${item._id}`,
          class: "topic-item"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="avatar-link"${_scopeId}><img${ssrRenderAttr("src", _imports_0)} class="avatar-image" alt=""${_scopeId}></span><div${_scopeId}><h3 class="topic-title"${_scopeId}>${ssrInterpolate(item.cate_name)}</h3><p class="topic-meta"${_scopeId}>${ssrInterpolate(item.cate_num || 0)} \u7BC7\u6587\u7AE0</p><i class="icon icon-arrow-right"${_scopeId}></i></div>`);
            } else {
              return [
                createVNode("span", { class: "avatar-link" }, [
                  createVNode("img", {
                    src: _imports_0,
                    class: "avatar-image",
                    alt: ""
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "topic-title" }, toDisplayString(item.cate_name), 1),
                  createVNode("p", { class: "topic-meta" }, toDisplayString(item.cate_num || 0) + " \u7BC7\u6587\u7AE0", 1),
                  createVNode("i", { class: "icon icon-arrow-right" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aside-category.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "AsideOther"
  },
  __name: "aside-other",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-other" }, _attrs))}><div class="card-content"><ul class="other-item"><li>\u5F53\u524D\u7248\u672C: v3.0.0</li><li>\u9879\u76EE\u5F00\u6E90\u5730\u5740: <a href="https://github.com/lincenying/mmf-blog-vite-vue3" target="_blank">Vue3\u7248(Spa+Pwa)</a></li><li>\u9879\u76EE\u5F00\u6E90\u5730\u5740: <a href="https://github.com/lincenying/mmf-blog-vite-vue3-ssr" target="_blank">\u670D\u52A1\u7AEF\u6E32\u67D3\u7248(Ssr+Pwa)</a></li><li>\u7F51\u7AD9\u5907\u6848\u53F7: <a href="http://beian.miit.gov.cn" target="_blank">\u6D59ICP\u590715010753\u53F7-1</a></li></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aside-other.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main$1 as a, _sfc_main as b };
//# sourceMappingURL=aside-other-BRb7oTcb.mjs.map
