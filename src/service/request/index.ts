import Taro from "@tarojs/taro";
import { statusInterceptor } from "./interceptors";

/**
 * 拦截器
 */
const interceptors = [statusInterceptor, Taro.interceptors.logInterceptor];
interceptors.forEach((interceptor) => Taro.addInterceptor(interceptor));

export { request } from "./request";

export * from "./decorator";
