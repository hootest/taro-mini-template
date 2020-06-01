import { request, RequestLoading, ResponseCache } from "./request";

@ResponseCache()
@RequestLoading()
export default class UserApi {
  static async info() {
    return request({
      url: "/user/info",
      data: {
        username: "sai1",
      },
      method: "GET",
    });
  }
}
