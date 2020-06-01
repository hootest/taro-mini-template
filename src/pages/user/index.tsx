import Taro, { FunctionComponent } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { CommonStateType } from "@/models/common";

import "./index.scss";

type IStateProps = {
  mState: CommonStateType
};
type IDispatchProps = {
  dispatchLogin: (payload) => any
};
type IOwnProps = {};
type IProps = IStateProps & IDispatchProps & IOwnProps;

const mapStateToProps = ({ common }): IStateProps => ({
  mState: common,
});
const mapDispatchToProps = (dispatch): IDispatchProps => ({
  dispatchLogin(payload) {
    dispatch({ type: "common/login", payload });
  },
});

const User: FunctionComponent<IProps> = (props) => {
  const { dispatchLogin } = props;
  return (
    <View className='user'>
      <Button
        className='dec_btn'
        onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
      >
        login
      </Button>
      <Button
        className='dec_btn'
        onClick={() =>
          dispatchLogin({
            // eslint-disable-next-line @typescript-eslint/camelcase
            ads_id: "050301",
            platform: "touch",
          })
        }
      >
        我的
      </Button>
      <View>
        <Text>{JSON.stringify(this.props.mState.userInfo)}</Text>
      </View>
      <View>
        <Text>Hello, World</Text>
      </View>
    </View>
  );
};
User.config = {
  navigationBarTitleText: "我的",
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User as any) as FunctionComponent<IOwnProps>;
