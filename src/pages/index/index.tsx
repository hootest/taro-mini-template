import Taro, { Component, Config, ComponentClass } from "@tarojs/taro";
import { View, Swiper, SwiperItem } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import UserApi from "@/service/user";

import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type IStateProps = {};
type IDispatchProps = {};
type IOwnProps = {};
type IProps = IStateProps & IDispatchProps & IOwnProps;

type IState = {};

const mapStateToProps = (): IStateProps => ({});

const mapDispatchToProps = (): IDispatchProps => ({});

class Index extends Component<IProps, IState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页",
  };

  componentDidMount() {
    UserApi.info();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='index'>
        <Swiper
          className='swiper'
          indicatorDots
          indicatorColor='#999'
          indicatorActiveColor='#333'
          autoplay
          circular
        >
          <SwiperItem>
            <View className='swiper-item'>1</View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='swiper-item'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index) as ComponentClass<IOwnProps, IState>;
