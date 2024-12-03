import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Image } from 'react-native';

import TestOneScreen from '../Screens/SelfTestScreens/TestOneScreen';
import TestResultScreen from "../Screens/SelfTestScreens/TestResultScreen";
import TestIntroScreen from "../Screens/SelfTestScreens/TestIntroScreen";
import { colors } from "../theme";
import styled from "styled-components/native";

const NativeStack = createNativeStackNavigator();

const SelfTestStack = () =>
  <NativeStack.Navigator screenOptions={({ navigation }) => ({
    headerTitleAlign: "center",
    headerLeft: () => (
      <ImageButton onPress={() => navigation.navigate("Main")} />
    ),
    headerBackVisible: false // 기본 뒤로 가기 버튼 숨기기
  })}>
    <NativeStack.Screen name='TestIntro' component={TestIntroScreen} options={{
      title: '펫로스 증후군 자가 진단',
      headerTitle: () => (
        <Text style={{ marginTop: 4, fontFamily: 'Poppins-ExtraBold', fontSize: 20, color: colors.palette.BrownDark }}>
          펫로스 증후군 자가 진단하기
        </Text>
      ),
    }} />
    <NativeStack.Screen name='TestOne' component={TestOneScreen} options={{
      title: '펫로스 증후군 자가 진단',
      headerTitle: () => (
        <Text style={{ marginTop: 4, fontFamily: 'Poppins-ExtraBold', fontSize: 20, color: colors.palette.BrownDark }}>
          펫로스 증후군 자가 진단하기
        </Text>
      ),
    }} />
    <NativeStack.Screen name='TestResult' component={TestResultScreen} options={{
      title: '펫로스 증후군 자가 진단 결과',
      headerTitle: () => (
        <Text style={{ marginTop: 4, fontFamily: 'Poppins-ExtraBold', fontSize: 20, color: colors.palette.BrownDark }}>
          펫로스 증후군 자가 진단하기
        </Text>
      ),
    }} />
  </NativeStack.Navigator>;

export default SelfTestStack;

const GoToMainButton = styled.Pressable`
  margin-left: 3%;
`;
const ImageButton = ({ onPress }) => {
  return (
    <GoToMainButton onPress={onPress}>
      <Image source={require("../Assets/icons/tabIcons/back.png")} />
    </GoToMainButton>
  );
};
