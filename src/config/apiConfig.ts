import { BaseUrl } from ".";

export const baseUrl =
  process.env.NODE_ENV === "development" && process.env.TARO_ENV === "h5"
    ? BaseUrl.dev
    : BaseUrl.prod;

export const httpStatus = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  CLIENT_ERROR: 400,
  AUTHENTICATE: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const httpCode = {
  SUCCESS: 0,
  AUTH: 403,
  UNKNOW: "unkonw",
  UNKNOW_MSG: "未知错误",
  SUCCESS_MSG: "",
};

export const mapCodeMsgKey = ["code", "message"];

/**http请求时loading的时机，小于以下值不显示ms单位 */
export const lazyLoadingTimeout = 0;

/**授权失败回调 */
export function onAuthAction(res: any) {
  console.log(res);
}
