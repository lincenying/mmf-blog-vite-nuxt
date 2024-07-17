import { _ as _sfc_main$1 } from './topics-list-OShYHJHR.mjs';
import { u as useRoute, s as storeToRefs } from './server.mjs';
import { a as useRouteParam } from './nuxt-C0QUSFdb.mjs';
import { u as useFrontendArticleStore } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { defineComponent, toRef, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { u as useAutoScroll } from './scroll-BC3PxWrq.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useToggle } from './index-BQFAlylH.mjs';
import './aside-other-BRb7oTcb.mjs';
import './use-global-store-DkFj5j6p.mjs';
import './index-BqSLzvE5.mjs';
import 'md5';
import './index-DWBeqOQ2.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'lodash-unified';
import '@vue/shared';
import './use-global-category-store-C8XlrN0b.mjs';
import 'vue-content-loader';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "FrontendIndexSearch"
  },
  __name: "[key]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const key = useRouteParam("key");
    const frontendArticleStore = useFrontendArticleStore();
    const __$temp_1 = storeToRefs(frontendArticleStore), topics = toRef(__$temp_1, "search");
    function getConfig(page = 1) {
      const path = route.path;
      const key2 = useRouteParam("key");
      return {
        page,
        limit: 10,
        path,
        key: key2.value
      };
    }
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-index-search", () => frontendArticleStore.getArticleList(getConfig(), "search"))), await __temp, __restore();
    useAutoScroll("frontend-index-search");
    const [loading, toggleLoading] = useToggle(false);
    async function loadMore(page = topics.value.page) {
      if (loading.value) {
        return;
      }
      toggleLoading(true);
      await frontendArticleStore.getArticleList(getConfig(page));
      toggleLoading(false);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_topics_list = _sfc_main$1;
      _push(ssrRenderComponent(_component_topics_list, mergeProps({
        topics: topics.value,
        loading: unref(loading),
        "page-type": "search",
        "search-key": unref(key),
        onLoadMore: loadMore
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/[key].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_key_-B3CjOog4.mjs.map
