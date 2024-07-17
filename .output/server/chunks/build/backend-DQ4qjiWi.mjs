import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './back-top-DU-xg8TT.mjs';
import { c as __nuxt_component_4 } from './server.mjs';
import { u as useGlobalStore } from './use-global-store-DkFj5j6p.mjs';
import { defineComponent, toRefs, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './index-BqSLzvE5.mjs';
import 'md5';
import './index-BQFAlylH.mjs';
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
import './use-http-CG7gaNE4.mjs';
import '@lincy/utils';
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
    name: "AppRootBackend"
  },
  __name: "backend",
  __ssrInlineRender: true,
  setup(__props) {
    const globalStore = useGlobalStore();
    const { showLoginModal, showRegisterModal } = toRefs(globalStore);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_global_navigation = _sfc_main$3;
      const _component_sign_in = _sfc_main$2;
      const _component_sign_up = _sfc_main$1;
      const _component_back_top = _sfc_main$4;
      const _component_client_only = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "backend" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_global_navigation, { "is-backend": true }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_sign_in, { show: unref(showLoginModal) }, null, _parent));
      _push(ssrRenderComponent(_component_sign_up, { show: unref(showRegisterModal) }, null, _parent));
      _push(ssrRenderComponent(_component_back_top, null, null, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/backend.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=backend-DQ4qjiWi.mjs.map
