import Taro, { FunctionComponent } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { AtAvatar } from "taro-ui";
import { CommonStateType } from "@/models/common";

import "./index.scss";

type IStateProps = {
  mState: CommonStateType
};
type IDispatchProps = {
  dispatchWxLogin: (payload: any) => void
};
type IOwnProps = { test: number };
type IProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = ({ common }: any): IStateProps => ({
  mState: common,
});
const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  dispatchWxLogin(payload) {
    dispatch({ type: "common/wxLogin", payload });
  },
});

const Login: FunctionComponent<IProps> = (props) => {
  const { dispatchWxLogin } = props;
  return (
    <View className='login flex__column flex--center'>
      <AtAvatar
        className='mg-t20 logo'
        circle
        image='https://jdc.jd.com/img/200'
      ></AtAvatar>
      <View className='mg-t40 fz24'>
        <Text>XXXX直通车</Text>
      </View>
      <View className='mg-t20 w100'>
        <Button
          type='primary'
          loading={false}
          disabled={false}
          lang='zh_CN'
          openType='getUserInfo'
          onGetUserInfo={dispatchWxLogin}
        >
          微信用户一键登录
        </Button>
      </View>
    </View>
  );
};
Login.config = {
  navigationBarTitleText: "登录",
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login as any) as FunctionComponent<IOwnProps>;
