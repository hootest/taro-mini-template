import { Effect, Reducer } from "@/types/dva-core";
import { MapObj } from "@/types";
import WxApi from "@/service/wx";

export interface CommonModelType {
  namespace: string
  state: CommonStateType
  effects: {
    wxLogin: Effect
  }
  reducers: {
    save: Reducer<CommonStateType, any>
    reset: Reducer<CommonStateType, any>
  }
}

export interface CommonStateType {
  userInfo: MapObj
}

const initState: CommonStateType = { userInfo: {} };
const CommonModel: CommonModelType = {
  namespace: "common",

  state: initState,

  effects: {
    *wxLogin({ payload }, { call, put, select }) {
      const { data } = yield call(WxApi.login, payload);
      console.log(data);
      const mState = yield select((state) => state.common);
      yield put({
        type: "save",
        payload: {
          userInfo: {
            ...mState.userInfo,
            ...data,
          },
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    reset() {
      return { ...initState };
    },
  },
};

export default CommonModel;
