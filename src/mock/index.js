/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
const delay = require("mocker-api/lib/delay");

const proxyModules = require("require-all")({
  dirname: __dirname,
  filter: /[^(index)\.js]/,
  resolve: (proxy) => proxy,
});

const proxy = {
  _proxy: {},
  ...Object.values(proxyModules).reduce((o, v) => ({ ...o, ...v }), {}),
};

module.exports = delay(proxy, 1000);
