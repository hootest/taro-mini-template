import "promise-prototype-finally";
import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import dva from "./utils/dva";
import models from "./models";

import Index from "./pages/index";

import "./app.scss";

// 如果需要在 h5 环境中开启 React Devtools 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/index/index",
      // 'pages/category/index',
      // 'pages/cart/index',
      "pages/user/index",
      "pages/login/index",
    ],
    tabBar: {
      color: "#808080",
      selectedColor: "#333333",
      borderStyle: "black",
      backgroundColor: "#ffffff",
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "assets/tab-home.png",
          selectedIconPath: "assets/tab-home-active.png",
          text: "首页",
        },
        {
          //   pagePath: 'pages/category/index',
          //   iconPath: 'assets/tab-category.png',
          //   selectedIconPath: 'assets/tab-category-active.png',
          //   text: '分类'
          // }, {
          //   pagePath: 'pages/cart/index',
          //   iconPath: 'assets/tab-cart.png',
          //   selectedIconPath: 'assets/tab-cart-active.png',
          //   text: '购物车'
          // }, {
          pagePath: "pages/user/index",
          iconPath: "assets/tab-user.png",
          selectedIconPath: "assets/tab-user-active.png",
          text: "我的",
        },
      ],
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "Taro Mini",
      navigationBarTextStyle: "black",
    },
    debug: process.env.NODE_ENV === "development",
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
