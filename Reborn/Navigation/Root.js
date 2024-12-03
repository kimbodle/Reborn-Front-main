import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import Tabs from "./Tabs";
import SelfTestStack from "./SelfTestStack";
import IntroStack from "./InstroStack";
import ShareDrawers from "./ShareDrawer";
import MypageStack from "./MypageStack";
import ReviewStack from "./ReviewStack";
import AccountStack from "./AccountStack";
import RebornDogStack from "./RebornDogStack";
import ReturnStack from "./ReturnStack";
import ReconnectStack from "./ReconnectStack";
import RediaryStack from "./RediaryStack";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator initialRouteName='AccoutStack' screenOptions={{ headerShown: false }}>
    <Nav.Screen name="AccountStack" component={AccountStack} />
    <Nav.Screen name="IntroStack" component={IntroStack} />
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="SelfTestStack" component={SelfTestStack} />
    <Nav.Screen name="ShareDrawers" component={ShareDrawers} />
    <Nav.Screen name="MypageStack" component={MypageStack} />
    <Nav.Screen name="ReviewStack" component={ReviewStack} />
    <Nav.Screen name="RebornDogStack" component={RebornDogStack} />
    <Nav.Screen name="ReturnStack" component={ReturnStack} />
    <Nav.Screen name="ReconnectStack" component={ReconnectStack} />
    <Nav.Screen name="RediaryStack" component={RediaryStack} />
  </Nav.Navigator>
);
export default Root;
