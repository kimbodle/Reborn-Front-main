import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";

import { colors } from "../theme";

import RediaryMainScreen from "../Screens/ReDiaryScreens/RediaryMainScreen";
import RediaryWriteScreen from "../Screens/ReDiaryScreens/RediaryWriteScreen";
import ReDiaryModifyScreen from "../Screens/ReDiaryScreens/ReDiaryModifyScreen";
import RediaryResultScreen from "../Screens/ReDiaryScreens/RediaryResultScreen";

const RediaryStacks = createNativeStackNavigator();

const RediaryTitle = () => (
  <Text>
    <Text
      style={{
        color: colors.palette.Brown,
        fontFamily: "Poppins-Bold",
        fontSize: 20,
      }}
    >
      RE:
    </Text>
    <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}> DIARY</Text>
  </Text>
);

const RediaryStack = () => (
  <RediaryStacks.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <RediaryStacks.Screen
      name="RediaryMain"
      component={RediaryMainScreen}
      options={{ headerTitle: () => <RediaryTitle /> }}
    />
    <RediaryStacks.Screen
      name="RediaryWrite"
      component={RediaryWriteScreen}
      options={{ headerTitle: () => <RediaryTitle /> }}
    />
    <RediaryStacks.Screen
      name="RediaryModify"
      component={ReDiaryModifyScreen}
      options={{ headerTitle: () => <RediaryTitle /> }}
    />
    <RediaryStacks.Screen
      name="RediaryResult"
      component={RediaryResultScreen}
      options={{ headerTitle: () => <RediaryTitle /> }}
    />
  </RediaryStacks.Navigator>
);

export default RediaryStack;
