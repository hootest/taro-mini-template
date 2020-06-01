import Taro from "@tarojs/taro";
import { baseUrl } from "@/config/apiConfig";

/**请求全路径 */
function getFullUrl(url: string): string {
  return `${baseUrl}${url}`;
}

function getCommonHeader() {
  return {};
}

/**公共请求参数 */
function getCommonParams() {
  return {
    t: Date.now(),
    v: "1.0.0",
  };
}

export type RequestOptions = Taro.request.Option;

export function request(opts: RequestOptions) {
  const options: RequestOptions = {
    ...opts,
    url: getFullUrl(opts.url),
    method: (opts.method || "GET").toUpperCase() as any,
    header: { ...getCommonHeader(), ...opts.header },
    data: { ...getCommonParams(), ...opts.data },
  };

  return Taro.request(options);
}
