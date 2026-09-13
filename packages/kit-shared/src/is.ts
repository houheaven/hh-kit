
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export {
  isString,
  isFunction,
  isObject,
};
