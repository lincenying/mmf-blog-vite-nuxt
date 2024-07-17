import { u as useFrontendArticleStore, _ as _sfc_main$1 } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, mergeProps, useSSRContext } from 'vue';
import { s as storeToRefs, a as useHead } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
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
import 'md5';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _imports_0 = publicAssetsURL("/static/images/error_1.jpg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "404Page"
  },
  __name: "[...all]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const frontendArticleStore = useFrontendArticleStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("404", () => frontendArticleStore.getTrending())), await __temp, __restore();
    const __$temp_1 = storeToRefs(frontendArticleStore), trending = toRef(__$temp_1, "trending");
    const headTitle = ref("Page Not Found - M.M.F \u5C0F\u5C4B");
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
      const _component_aside_trending = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wrap main" }, _attrs))}><div class="main-left"><div class="card card-answer"><div class="answer-content"><div class="flex justify-center py-40px"><img${ssrRenderAttr("src", _imports_0)} alt=""></div></div></div></div><div class="main-right">`);
      _push(ssrRenderComponent(_component_aside_trending, { trending: trending.value }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...all].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...all_-BwuyTPjS.mjs.map
