import { h as useNuxtApp, i as asyncDataDefaults, j as createError, k as fetchDefaults } from './server.mjs';
import { u as useRequestHeaders, E as ElMessage, a as useRequestFetch } from './index-DWBeqOQ2.mjs';
import { ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, computed, unref, toValue, reactive } from 'vue';
import { v as hash } from '../runtime.mjs';
import md5 from 'md5';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = options.server ?? true;
  options.default = options.default ?? getDefault;
  options.getCachedData = options.getCachedData ?? getDefaultCachedData;
  options.lazy = options.lazy ?? false;
  options.immediate = options.immediate ?? true;
  options.deep = options.deep ?? asyncDataDefaults.deep;
  options.dedupe = options.dedupe ?? "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_b = nuxtApp.payload._errors)[key] ?? (_b[key] = asyncDataDefaults.errorValue);
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(options.getCachedData(key, nuxtApp) ?? options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer(opts.dedupe ?? options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function useNuxtData(key) {
  const nuxtApp = useNuxtApp();
  if (!(key in nuxtApp.payload.data)) {
    nuxtApp.payload.data[key] = asyncDataDefaults.value;
  }
  return {
    data: computed({
      get() {
        var _a;
        return ((_a = nuxtApp._asyncData[key]) == null ? void 0 : _a.data.value) ?? nuxtApp.payload.data[key];
      },
      set(value) {
        if (nuxtApp._asyncData[key]) {
          nuxtApp._asyncData[key].data.value = value;
        } else {
          nuxtApp.payload.data[key] = value;
        }
      }
    })
  };
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
async function _useFetch(url, params, options) {
  const headers = useRequestHeaders(["cookie"]);
  const method = (options == null ? void 0 : options.method) ?? "GET";
  const body = options == null ? void 0 : options.body;
  return await useFetch(url, {
    key: (options == null ? void 0 : options.key) ?? md5(url),
    method,
    params: { ...params },
    headers: {
      ...headers,
      ...options == null ? void 0 : options.headers
    },
    credentials: "include",
    body: method === "POST" ? body : void 0,
    onRequest() {
    },
    onRequestError({ error }) {
      ElMessage.closeAll();
      error && ElMessage.error("Sorry, The Data Request Failed");
    },
    onResponse({ response }) {
      if (response._data.code !== 200) {
        ElMessage.error(response._data.message);
      }
      return response._data;
    },
    onResponseError({ request }) {
      console.log("\u{1F680} ~ onResponseError ~ request:", request);
    }
  }, "$1EeZ1kGuzP");
}
async function _fetch(url, params, options) {
  const headers = useRequestHeaders(["cookie"]);
  const method = (options == null ? void 0 : options.method) ?? "GET";
  const body = options == null ? void 0 : options.body;
  return await $fetch(url, {
    method,
    params: { ...params },
    headers: {
      ...headers,
      ...options == null ? void 0 : options.headers
    },
    credentials: "include",
    body: method === "POST" ? body : void 0,
    onRequest() {
    },
    onRequestError({ error }) {
      ElMessage.closeAll();
      error && ElMessage.error("Sorry, The Data Request Failed");
    },
    onResponse({ response }) {
      if (response._data.code !== 200) {
        ElMessage.error(response._data.message);
      }
      return response._data;
    },
    onResponseError({ request }) {
      console.log("\u{1F680} ~ onResponseError ~ request:", request);
    }
  });
}
const useHttp = () => {
  return {
    /**
     * $fetch.GET 封装
     * @param url api地址
     * @param params 请求参数
     * @param option 包含 method, headers, body 参数
     * @returns $fetch
     */
    $get: (url, params, option) => {
      return _fetch(url, params, { method: "GET", ...option });
    },
    /**
     * $fetch.POST 封装
     * @param url api地址
     * @param params 请求参数
     * @param option 包含 method, headers, body 参数
     * @returns $fetch
     */
    $post: (url, params, option) => {
      return _fetch(url, params, { method: "POST", ...option });
    },
    /**
     * useFetch.GET 封装
     * @param url api地址
     * @param params 请求参数
     * @param option 包含 method, headers, key, body 参数
     * @returns useFetch
     */
    get: (url, params, option) => {
      return _useFetch(url, params, { method: "GET", ...option });
    },
    /**
     * useFetch.POST 封装
     * @param url api地址
     * @param params 请求参数
     * @param option 包含 method, headers, key, body 参数
     * @returns useFetch
     */
    post: (url, params, option) => {
      return _useFetch(url, params, { method: "POST", ...option });
    }
  };
};

export { useHttp as a, useNuxtData as b, useAsyncData as u };
//# sourceMappingURL=use-http-CG7gaNE4.mjs.map
