export default function(instance, path, fallbackValue) {
  try {
    const evalExpression = `instance.${path}`;
    const returnValue = eval(evalExpression) || fallbackValue;
    return returnValue;
  } catch (_) {
    return fallbackValue;
  }
};
