import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroScreen from "../Screens/IntroScreens/IntroScreen";
import TutorialScreen from "../Screens/IntroScreens/TutorialScreen";
import NicknameInputScreen from "../Screens/IntroScreens/NicknameInputScreen";

const NativeIntroStack = createNativeStackNavigator();

const IntroStack = () => 
    <NativeIntroStack.Navigator screenOptions={{headerShown: false}}>
        <NativeIntroStack.Screen name ='Intro' component={IntroScreen} />
        <NativeIntroStack.Screen name ='Tutorial' component={TutorialScreen} />
        <NativeIntroStack.Screen name ='NickName' component={NicknameInputScreen} />
    </NativeIntroStack.Navigator>;

export default IntroStack;