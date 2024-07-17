import { f as useState, o as onBeforeRouteLeave } from './server.mjs';

function useAutoScroll(key) {
  const scrollTop = useState(key, "$3y0SBeIdHi");
  function onScroll(event) {
    scrollTop.value = event.scrollTop;
  }
  onBeforeRouteLeave((to, from, next) => {
    scrollTop.value = Math.max((void 0).scrollY, (void 0).documentElement.scrollTop, (void 0).body.scrollTop);
    next();
  });
  return {
    onScroll
  };
}

export { useAutoScroll as u };
//# sourceMappingURL=scroll-BC3PxWrq.mjs.map
