import { g as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useRequestHeaders } from './index-DWBeqOQ2.mjs';
import { c as utilsParseCookies } from './index-BqSLzvE5.mjs';
import 'vue';
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
import 'vue/server-renderer';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@kangc/v-md-editor/lib/theme/vuepress.js';
import 'prismjs';
import 'lodash-unified';
import '@vue/shared';
import 'md5';
import './index-BQFAlylH.mjs';

const backendAuth = defineNuxtRouteMiddleware(() => {
  {
    const headers = useRequestHeaders(["cookie"]);
    const cookies = utilsParseCookies(headers.cookie || "");
    if (!cookies.b_user) {
      return navigateTo("/_backend/login");
    }
  }
});

export { backendAuth as default };
//# sourceMappingURL=backend-auth-BDPQIhPS.mjs.map
