import Taro from "@tarojs/taro";

export default class Local {
  static getToken(): string {
    return Taro.getStorageSync("token") || "";
  }
  static setToken(value: string): void {
    Taro.setStorageSync("token", value);
  }
  static removeToken(): void {
    Taro.removeStorageSync("token");
  }
}
