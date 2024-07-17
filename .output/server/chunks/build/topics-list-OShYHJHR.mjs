import { a as _sfc_main$1$1, b as _sfc_main$4, _ as _sfc_main$2$1 } from './aside-other-BRb7oTcb.mjs';
import { useSSRContext, defineComponent, toRefs, toRef, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, resolveComponent, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { u as useFrontendArticleStore, _ as _sfc_main$3 } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { u as useGlobalCategoryStore } from './use-global-category-store-C8XlrN0b.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { s as storeToRefs, a as useHead } from './server.mjs';
import { ContentLoader } from 'vue-content-loader';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "TopicsItem"
  },
  __name: "topics-item",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), item = toRef(__$temp_1, "item");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_item_actions = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card feed" }, _attrs))}><div class="feed-content"><div class="feed-source-time"><span class="feed-source">\u6765\u81EA\u5206\u7C7B `);
      _push(ssrRenderComponent(_component_router_link, {
        to: `/category/${item.value.category}`,
        class: "feed-minor-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.value.category_name)}`);
          } else {
            return [
              createTextVNode(toDisplayString(item.value.category_name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span class="feed-time">${ssrInterpolate(item.value.update_date)}</span></div><div class="feed-main-link-wrap">`);
      _push(ssrRenderComponent(_component_router_link, {
        to: `/article/${item.value._id}`,
        class: "feed-main-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(item.value.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(item.value.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="feed-desc-wrap"><div class="feed-article-content markdown-body">${ssrInterpolate(item.value.content)}</div></div></div>`);
      _push(ssrRenderComponent(_component_item_actions, { item: item.value }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topics-item.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...{
    name: "TopicsItemNone"
  },
  __name: "topics-item-none",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card feed" }, _attrs))}><div class="feed-content"><div class="feed-desc-wrap"><div class="feed-article-content markdown-body">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topics-item-none.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendTopicList"
  },
  __name: "topics-list",
  __ssrInlineRender: true,
  props: {
    topics: null,
    loading: { type: Boolean },
    pageType: null,
    categoryId: null,
    searchKey: null
  },
  emits: ["loadMore"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const props = __props;
    const __$temp_1 = toRefs(props), topics = toRef(__$temp_1, "topics"), pageType = toRef(__$temp_1, "pageType"), categoryId = toRef(__$temp_1, "categoryId"), searchKey = toRef(__$temp_1, "searchKey");
    const globalCategoryStore = useGlobalCategoryStore();
    const frontendArticleStore = useFrontendArticleStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-article-category", () => globalCategoryStore.getCategoryList({}))), await __temp, __restore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-article-trending", () => frontendArticleStore.getTrending())), await __temp, __restore();
    const __$temp_2 = storeToRefs(globalCategoryStore), category = toRef(__$temp_2, "lists");
    const __$temp_3 = storeToRefs(frontendArticleStore), trending = toRef(__$temp_3, "trending");
    const headTitle = computed(() => {
      let title = "M.M.F \u5C0F\u5C4B";
      if (pageType.value === "category") {
        const obj = category.value.find((item) => item._id === categoryId.value);
        if (obj) {
          title = `${obj.cate_name} - ${title}`;
        }
      } else if (pageType.value === "search") {
        title = `\u641C\u7D22: ${searchKey.value} - ${title}`;
      } else if (pageType.value === "visit") {
        title = `\u70ED\u95E8 - ${title}`;
      }
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
      const _component_TopicsItem = _sfc_main$2;
      const _component_topics_item_none = _sfc_main$1;
      const _component_aside_category = _sfc_main$1$1;
      const _component_aside_trending = _sfc_main$3;
      const _component_aside_other = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main wrap" }, _attrs))}><div class="main-left"><div class="cards-wrap home-feeds">`);
      if (!topics.value.path) {
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
      } else if (topics.value.data.length > 0) {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(topics.value.data, (item) => {
          _push(ssrRenderComponent(_component_TopicsItem, {
            key: item._id,
            item
          }, null, _parent));
        });
        _push(`<!--]--><div class="load-more-wrap">`);
        if (topics.value.hasNext) {
          _push(`<a href="javascript:;" class="${ssrRenderClass([__props.loading ? "loading" : "", "load-more"])}">${ssrInterpolate(__props.loading ? "\u52A0\u8F7D\u4E2D" : "\u66F4\u591A")} <i class="icon icon-circle-loading"></i></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_topics_item_none, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`\u5F53\u524D\u5206\u7C7B\u8FD8\u6CA1\u6709\u6587\u7AE0...`);
            } else {
              return [
                createTextVNode("\u5F53\u524D\u5206\u7C7B\u8FD8\u6CA1\u6709\u6587\u7AE0...")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div><div class="main-right">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/topics-list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=topics-list-OShYHJHR.mjs.map
