import { _ as _sfc_main$1 } from './topics-list-OShYHJHR.mjs';
import { u as useRoute, s as storeToRefs } from './server.mjs';
import { u as useFrontendArticleStore } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, mergeProps, unref, useSSRContext } from 'vue';
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
    name: "FrontendIndex"
  },
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const frontendArticleStore = useFrontendArticleStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-index", () => frontendArticleStore.getArticleList(getConfig(), "lists"))), await __temp, __restore();
    const __$temp_1 = storeToRefs(frontendArticleStore), topics = toRef(__$temp_1, "lists");
    function getConfig(page = 1) {
      const path = route.path;
      return {
        page,
        limit: 10,
        path
      };
    }
    useAutoScroll("frontend-index");
    const [loading, toggleLoading] = useToggle(false);
    async function loadMore(page) {
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
        "page-type": "lists",
        onLoadMore: loadMore
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D2Nhdrtn.mjs.map
