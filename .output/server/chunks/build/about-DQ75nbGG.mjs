import { u as useFrontendArticleStore, _ as _sfc_main$1 } from './use-frontend-article-store-Dl3TMqoh.mjs';
import { u as useAsyncData } from './use-http-CG7gaNE4.mjs';
import { defineComponent, withAsyncContext, toRef, ref, mergeProps, useSSRContext } from 'vue';
import { s as storeToRefs, a as useHead } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
    name: "FrontendAbout"
  },
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const frontendArticleStore = useFrontendArticleStore();
    [__temp, __restore] = withAsyncContext(() => useAsyncData("frontend-article-trending", () => frontendArticleStore.getTrending())), await __temp, __restore();
    const __$temp_1 = storeToRefs(frontendArticleStore), trending = toRef(__$temp_1, "trending");
    const headTitle = ref("\u5173\u4E8E - M.M.F \u5C0F\u5C4B");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main wrap" }, _attrs))}><div class="main-left"><div class="card card-answer card-about"><div class="answer-content"><div class="article-content"><h3 class="about-title">\u5173\u4E8E\u4F5C\u8005</h3><div class="flex-item"><div class="flex-label">\u59D3\u540D:</div><div class="flex-content">\u6797\u5C91\u5F71</div></div><div class="flex-item"><div class="flex-label">\u5E74\u9F84:</div><div class="flex-content">1987.09</div></div><div class="flex-item"><div class="flex-label">\u804C\u4E1A:</div><div class="flex-content">\u524D\u7AEF\u5F00\u53D1</div></div><div class="flex-item"><div class="flex-label">Github:</div><div class="flex-content"><a href="https://github.com/lincenying" target="_blank">@lincenying</a></div></div><div class="flex-item"><div class="flex-label">\u6280\u80FD:</div><div class="flex-content"><ul class="about-ul"><li>HTML5 + CSS3</li><li>NodeJS</li><li>React</li><li>Vue</li><li>ES6</li><li>Gulp</li><li>WebPack</li><li>jQuery</li><li>PHP</li></ul></div></div><h3 class="about-title">\u5173\u4E8E\u7F51\u7AD9</h3><p> \u6E90\u4EE3\u7801: <a href="https://github.com/lincenying/mmf-blog-vite-vue3-ssr" target="_blank">mmf-blog-vite-vue3-ssr</a> \u6B22\u8FCE\u6536\u85CF\u52A0\u661F </p><p>\u672C\u7AD9\u670D\u52A1\u7AEF\u91C7\u7528 express + mongoDB \u642D\u5EFA, \u5BA2\u6237\u7AEF\u91C7\u7528 Vue3 \u6E32\u67D3\u642D\u5EFA</p><p>\u7F51\u7AD9\u5206\u6210\u524D\u53F0\u548C\u540E\u53F0, \u524D\u53F0\u91C7\u7528 SSR \u6A21\u5F0F\u6E32\u67D3, \u540E\u53F0\u91C7\u7528 SPA \u6A21\u5F0F</p><p>\u4E3B\u8981\u529F\u80FD\u5305\u62EC: \u7BA1\u7406\u5458, \u7528\u6237, \u5206\u7C7B, \u6587\u7AE0, \u8BC4\u8BBA, \u6587\u7AE0\u70B9\u8D5E</p><p>\u4E3B\u8981\u6280\u672F\u6808: pwa, vite4, unocss, eslint, express, mongoose, vue3, vue-router4, pinia</p></div></div></div></div><div class="main-right">`);
      _push(ssrRenderComponent(_component_aside_trending, { trending: trending.value }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DQ75nbGG.mjs.map
