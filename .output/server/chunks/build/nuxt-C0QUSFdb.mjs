import { u as useRoute } from './server.mjs';
import { computed } from 'vue';

function useRouteParam(name, init) {
  const route = useRoute();
  const params = route.params;
  return computed(() => params[name] ?? init);
}
function useRouteQuery(name, init) {
  const route = useRoute();
  return computed(() => route.query[name] ?? init);
}

export { useRouteParam as a, useRouteQuery as u };
//# sourceMappingURL=nuxt-C0QUSFdb.mjs.map
