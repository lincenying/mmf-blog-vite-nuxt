import { reactive, toRefs } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const usePiniaStore = defineStore("globalCategoryStore", () => {
  const state = reactive({
    lists: [],
    item: {
      data: null
    }
  });
  const getCategoryList = async (config) => {
    if (state.lists.length) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/backend/category/list", { ...config, path: void 0, cache: true });
    if (code === 200 && data) {
      state.lists = data.list;
    }
  };
  const getCategoryItem = async (config) => {
    const { code, data } = await useHttp().$get("/api/backend/category/item", { ...config, path: void 0 });
    if (code === 200 && data) {
      state.item = {
        data,
        ...config
      };
    }
  };
  const insertCategoryItem = (payload) => {
    state.lists = [payload].concat(state.lists);
  };
  const updateCategoryItem = (payload) => {
    state.item.data = payload;
    const index = state.lists.findIndex((ii) => ii._id === payload._id);
    if (index > -1) {
      state.lists.splice(index, 1, payload);
    }
  };
  const deleteCategory = (id) => {
    const index = state.lists.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.splice(index, 1, {
        ...state.lists[index],
        is_delete: 1
      });
    }
  };
  const recoverCategory = (id) => {
    const index = state.lists.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.splice(index, 1, {
        ...state.lists[index],
        is_delete: 0
      });
    }
  };
  return {
    ...toRefs(state),
    getCategoryList,
    getCategoryItem,
    insertCategoryItem,
    updateCategoryItem,
    deleteCategory,
    recoverCategory
  };
});
const useGlobalCategoryStore = usePiniaStore;

export { useGlobalCategoryStore as u };
//# sourceMappingURL=use-global-category-store-C8XlrN0b.mjs.map
