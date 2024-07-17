import { reactive, toRefs } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const usePiniaStore = defineStore("backendAdminStore", () => {
  const state = reactive({
    lists: {
      hasNext: 0,
      hasPrev: 0,
      path: "",
      page: 1,
      data: []
    },
    item: {
      data: null,
      path: ""
    }
  });
  const getAdminList = async (config) => {
    if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/backend/admin/list", { ...config, path: void 0, cache: true });
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
  const getAdminItem = async (config) => {
    const { code, data } = await useHttp().$get("/api/backend/admin/item", { ...config, path: void 0 });
    if (code === 200 && data) {
      state.item = {
        data,
        ...config
      };
    }
  };
  const updateAdminItem = (payload) => {
    state.item.data = payload;
    const index = state.lists.data.findIndex((ii) => ii._id === payload._id);
    if (index > -1) {
      state.lists.data.splice(index, 1, payload);
    }
  };
  const deleteAdmin = (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 1
      });
    }
  };
  const recoverAdmin = (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 0
      });
    }
  };
  return {
    ...toRefs(state),
    getAdminList,
    getAdminItem,
    updateAdminItem,
    deleteAdmin,
    recoverAdmin
  };
});
const useBackendAdminStore = usePiniaStore;

export { useBackendAdminStore as u };
//# sourceMappingURL=use-backend-admin-store-D-iqSnH7.mjs.map
