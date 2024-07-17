import { reactive, toRefs } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const usePiniaStore = defineStore("backendArticleStore", () => {
  const state = reactive({
    lists: {
      data: [],
      path: "",
      hasNext: 0,
      hasPrev: 0,
      page: 1
    },
    item: {
      data: null,
      path: ""
    }
  });
  const getArticleList = async (config) => {
    if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/backend/article/list", { ...config, path: void 0, cache: true });
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
      state.lists = {
        data: page === 1 ? list : state.lists.data.concat(list),
        hasNext,
        hasPrev,
        page: (page || 1) + 1,
        path
      };
    }
  };
  const getArticleItem = async (config) => {
    const { code, data } = await useHttp().$get("/api/backend/article/item", { ...config, path: void 0 });
    if (code === 200 && data) {
      state.item = {
        data,
        ...config
      };
    }
  };
  const deleteArticle = async (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 1
      });
    }
  };
  const recoverArticle = async (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 0
      });
    }
  };
  const insertArticleItem = (payload) => {
    if (state.lists.path) {
      state.lists.data = [payload].concat(state.lists.data);
    }
  };
  const updateArticleItem = (payload) => {
    const index = state.lists.data.findIndex((ii) => ii._id === payload._id);
    if (index > -1) {
      state.lists.data.splice(index, 1, payload);
    }
  };
  return {
    ...toRefs(state),
    getArticleList,
    getArticleItem,
    deleteArticle,
    recoverArticle,
    insertArticleItem,
    updateArticleItem
  };
});
const useBackendArticleStore = usePiniaStore;

export { useBackendArticleStore as u };
//# sourceMappingURL=use-backend-article-store-BLhVf-dd.mjs.map
