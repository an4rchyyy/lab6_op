const compose = (...fns) => {
  const handlers = {};
  const fn = (x) => {
    try {
      for (let i = fns.length - 1; i >= 0; i--) x = fns[i](x);
      return x;
    } catch (err) {
      for (const h of handlers.error || []) h(err);
      return undefined;
    }
  };
  fn.on = (name, cb) => ((handlers[name] = handlers[name] || []).push(cb), fn);
  return fn;
};