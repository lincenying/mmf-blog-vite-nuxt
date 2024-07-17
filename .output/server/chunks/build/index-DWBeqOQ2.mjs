import { x as getRequestHeaders } from '../runtime.mjs';
import { shallowReactive, warn, isVNode } from 'vue';
import { h as useNuxtApp } from './server.mjs';
import { fromPairs } from 'lodash-unified';
import { isObject, hasOwn, isString, isFunction } from '@vue/shared';

function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
function useRequestFetch() {
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
}
const isElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!isObject(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const mutable = (val) => val;
const messageTypes = ["success", "info", "warning", "error"];
const messageDefaults = mutable({
  customClass: "",
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: void 0
});
buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  center: {
    type: Boolean,
    default: messageDefaults.center
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const instances = shallowReactive([]);
const normalizeOptions = (params) => {
  const options = !params || isString(params) || isVNode(params) || isFunction(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  if (!normalized.appendTo) {
    normalized.appendTo = (void 0).body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = (void 0).querySelector(normalized.appendTo);
    if (!isElement(appendTo)) {
      appendTo = (void 0).body;
    }
    normalized.appendTo = appendTo;
  }
  return normalized;
};
const message = (options = {}, context) => {
  return { close: () => void 0 };
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type });
  };
});
function closeAll(type) {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}
message.closeAll = closeAll;
message._context = null;
const ElMessage = withInstallFunction(message, "$message");

export { ElMessage as E, useRequestFetch as a, useRequestHeaders as u };
//# sourceMappingURL=index-DWBeqOQ2.mjs.map
