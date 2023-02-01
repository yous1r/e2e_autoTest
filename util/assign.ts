function assign<V>(data: object, key: string, value: V) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      return data[key];
    },
    set(v) {
      v = value;
      const initData = data[key];
      console.log(initData);
      data[key] = v;
    },
  });
}
