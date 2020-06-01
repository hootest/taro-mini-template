/* eslint-disable import/no-commonjs */
const BaseUrl = {
  prod: "http://localhost:3721",
  dev: "/dev-api",
};

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {
    devServer: {
      proxy: {
        // detail: https://cli.vuejs.org/config/#devserver-proxy
        [BaseUrl.dev]: {
          target: BaseUrl.prod,
          changeOrigin: true,
          pathRewrite: {
            [`^${BaseUrl.dev}`]: "",
          },
        },
      },
    },
  },
};
