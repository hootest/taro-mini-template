import Taro from "@tarojs/taro";

export default class Tips {
  static toast(option: string | Taro.showToast.Option) {
    if (typeof option !== "object") {
      option = { title: option };
    }
    Taro.showToast({
      title: "",
      icon: "none",
      mask: true,
      duration: 1500,
      ...option,
    });
  }
}
