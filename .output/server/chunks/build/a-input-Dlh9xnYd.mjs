import { defineComponent, toRefs, toRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "AInput"
  },
  __name: "a-input",
  __ssrInlineRender: true,
  props: {
    title: null,
    classes: null
  },
  setup(__props) {
    const props = __props;
    const __$temp_1 = toRefs(props), title = toRef(__$temp_1, "title"), classes = toRef(__$temp_1, "classes");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "settings-section" }, _attrs))}><div class="settings-item with-input"><h4 class="settings-title">${ssrInterpolate(title.value)}</h4><div class="${ssrRenderClass([classes.value, "settings-item-content"])}"><div class="settings-input-wrap">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/a-input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=a-input-Dlh9xnYd.mjs.map
