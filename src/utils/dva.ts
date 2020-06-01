import { create } from "dva-core";
import { createLogger } from "redux-logger";
import createLoading from "dva-loading";

let [app, store, dispatch, registered]: any[] = [];

function createApp(opt: any) {
  // redux日志
  opt.onAction = [createLogger()];
  opt.onError = (e: any) => {
    e.preventDefault && e.preventDefault();
    console.error(e);
  };

  app = create(opt);
  app.use(createLoading({}));

  if (!registered) opt.models.forEach((model: any) => app.model(model));
  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
