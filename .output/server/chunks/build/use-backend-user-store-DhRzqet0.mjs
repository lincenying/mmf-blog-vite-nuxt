import { reactive, toRefs } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const usePiniaStore = defineStore("backendUserStore", () => {
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
  const getUserList = async (config) => {
    if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/backend/user/list", { ...config, path: void 0, cache: true });
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
  const getUserItem = async (config) => {
    const { code, data } = await useHttp().$get("/api/backend/user/item", { ...config, path: void 0 });
    if (code === 200 && data) {
      state.item = {
        data,
        ...config
      };
    }
  };
  const updateUserItem = (payload) => {
    state.item.data = payload;
    const index = state.lists.data.findIndex((ii) => ii._id === payload._id);
    if (index > -1) {
      state.lists.data.splice(index, 1, payload);
    }
  };
  const deleteUser = (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 1
      });
    }
  };
  const recoverUser = (id) => {
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
    getUserList,
    getUserItem,
    updateUserItem,
    deleteUser,
    recoverUser
  };
});
const useBackendUserStore = usePiniaStore;

export { useBackendUserStore as u };
//# sourceMappingURL=use-backend-user-store-DhRzqet0.mjs.map
