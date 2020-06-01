import Taro from "@tarojs/taro";
import {
  httpStatus,
  mapCodeMsgKey,
  httpCode,
  onAuthAction,
} from "@/config/apiConfig";

export const statusInterceptor: Taro.interceptor = (chain) => {
  const requestParams = chain.requestParams;

  return chain.proceed(requestParams).then((res: any) => {
    if (res.statusCode === httpStatus.SUCCESS) {
      const { data } = res;
      // 业务成功数据
      const [codeKey] = mapCodeMsgKey;
      if (data && data[codeKey] === httpCode.SUCCESS) {
        return data;
      }
      // 登录
      if (data && data[codeKey] === httpCode.AUTH) {
        setTimeout(() => {
          onAuthAction(data);
        }, 0);
      }
      return Promise.reject(data);
    }
    return Promise.reject(res);
  });
};

/**默认未启用 */
export const businessInterceptor = (chain) =>
  chain.proceed(chain.requestParams);
