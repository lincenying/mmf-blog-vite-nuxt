import { useSSRContext, reactive, toRefs, defineComponent, toRef, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "AsideTrending"
  },
  __name: "aside-trending",
  __ssrInlineRender: true,
  props: {
    trending: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), trending = toRef(__$temp_1, "trending");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card-trending" }, _attrs))}><h2 class="card-title">\u70ED\u95E8\u6587\u7AE0</h2><div class="card-content"><!--[-->`);
      ssrRenderList(trending.value, (item, index) => {
        _push(`<div class="trending-item"><span class="trending-rank-num">${ssrInterpolate(index + 1)}</span>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: `/article/${item._id}`,
          class: "trending-title"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="trending-meta"><div class="trending-meta-item"><i class="icon icon-action-voteup"></i>${ssrInterpolate(item.like)}</div><div class="trending-meta-item"><i class="icon icon-action-comment"></i>${ssrInterpolate(item.comment_count)}</div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/aside-trending.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function getInitList() {
  return {
    data: [],
    path: "",
    hasNext: 0,
    hasPrev: 0,
    page: 1
  };
}
const pageTypeArr = ["lists", "visit", "category", "search"];
const usePiniaStore = defineStore("frontendArticleStore", () => {
  const state = reactive({
    lists: getInitList(),
    visit: getInitList(),
    category: getInitList(),
    search: getInitList(),
    item: {
      data: null,
      path: ""
    },
    trending: []
  });
  const getArticleList = async (config, pageType = "lists") => {
    if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/frontend/article/list", { ...config, path: void 0, cache: true });
    if (code === 200 && data) {
      const {
        list = [],
        path,
        hasNext = 0,
        hasPrev = 0,
        page
      } = {
        ...data,
        path: config.path,
        page: config.page
      };
      state[pageType] = {
        data: page === 1 ? list : state.lists.data.concat(list),
        hasNext,
        hasPrev,
        page: (page || 1) + 1,
        path
      };
    }
  };
  const getArticleItem = async (config) => {
    const { code, data } = await useHttp().$get("/api/frontend/article/item", { ...config, path: void 0, markdown: 1, cache: true });
    if (code === 200 && data) {
      state.item = {
        data,
        ...config,
        isLoad: true
      };
    }
  };
  const getTrending = async () => {
    if (state.trending.length) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/frontend/trending", { cache: true });
    if (code === 200 && data) {
      state.trending = data.list;
    }
  };
  const modifyLikeStatus = (payload) => {
    const { id, status } = payload;
    if (state.item.data && state.item.data._id === id) {
      if (status) {
        state.item.data.like++;
      } else {
        state.item.data.like--;
      }
      state.item.data.like_status = status;
    }
    pageTypeArr.forEach((page) => {
      const index = state[page].data.findIndex((item) => item._id === id);
      if (index > -1) {
        const obj = Object.assign({}, state.lists.data[index]);
        if (status) {
          obj.like++;
        } else {
          obj.like--;
        }
        obj.like_status = status;
        state[page].data.splice(index, 1, obj);
      }
    });
  };
  return {
    ...toRefs(state),
    getArticleList,
    getArticleItem,
    getTrending,
    modifyLikeStatus
  };
});
const useFrontendArticleStore = usePiniaStore;

export { _sfc_main as _, useFrontendArticleStore as u };
//# sourceMappingURL=use-frontend-article-store-Dl3TMqoh.mjs.map
