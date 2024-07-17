import { reactive, toRefs } from 'vue';
import { a as useHttp } from './use-http-CG7gaNE4.mjs';
import { d as defineStore } from './server.mjs';

const usePiniaStore = defineStore("globalCommentStore", () => {
  const state = reactive({
    lists: {
      data: [],
      hasNext: 0,
      hasPrev: 0,
      page: 1,
      path: ""
    }
  });
  const getCommentList = async (config) => {
    if (config.path === state.lists.path && config.page === 1) {
      return;
    }
    const { code, data } = await useHttp().$get("/api/frontend/comment/list", { ...config, path: void 0, cache: true });
    if (code === 200 && data) {
      const {
        list = [],
        path = "",
        hasNext = 0,
        hasPrev = 0,
        page = 1
      } = {
        ...config,
        ...data
      };
      state.lists = {
        data: page === 1 ? list : state.lists.data.concat(list),
        hasNext,
        hasPrev,
        page,
        path
      };
    }
  };
  const insertCommentItem = (payload) => {
    state.lists.data = [payload].concat(state.lists.data);
  };
  const deleteComment = (id) => {
    const index = state.lists.data.findIndex((ii) => ii._id === id);
    if (index > -1) {
      state.lists.data.splice(index, 1, {
        ...state.lists.data[index],
        is_delete: 1
      });
    }
  };
  const recoverComment = (id) => {
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
    getCommentList,
    insertCommentItem,
    deleteComment,
    recoverComment
  };
});
const useGlobalCommentStore = usePiniaStore;

export { useGlobalCommentStore as u };
//# sourceMappingURL=use-global-comment-store-myl8p1Ys.mjs.map
