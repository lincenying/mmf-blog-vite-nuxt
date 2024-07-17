import { reactive, toRefs } from 'vue';
import { d as defineStore } from './server.mjs';

var define_import_meta_env_default = { BASE_URL: "/", MODE: "production", DEV: false, PROD: true, SSR: true };
const usePiniaStore = defineStore("globalStore", () => {
  const state = reactive({
    loading: false,
    cookies: {},
    showLoginModal: false,
    showRegisterModal: false,
    ISDEV: define_import_meta_env_default.VITE_APP_ENV === "development",
    ISPRE: define_import_meta_env_default.VITE_APP_ENV === "pre-release",
    ISPROD: define_import_meta_env_default.VITE_APP_ENV === "production"
  });
  const setLoginModal = (payload) => {
    state.showLoginModal = payload;
  };
  const setRegisterModal = (payload) => {
    state.showRegisterModal = payload;
  };
  const setCookies = (cookies) => {
    state.cookies = cookies;
  };
  return {
    ...toRefs(state),
    setLoginModal,
    setRegisterModal,
    setCookies
  };
});
const useGlobalStore = usePiniaStore;

export { useGlobalStore as u };
//# sourceMappingURL=use-global-store-DkFj5j6p.mjs.map
