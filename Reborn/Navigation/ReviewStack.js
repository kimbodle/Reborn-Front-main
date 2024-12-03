import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReviewReconnectScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewReconnectScreen";
import ReviewRemindScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRemindScreen";
import ReviewRevealScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRevealScreen";
import ReviewRememberScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRememberScreen";
import ReviewRebornScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRebornScreen";
import ReviewMainScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewMainScreen";
import ReviewRevealDiaryScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRevealDiaryScreen";
import ReviewRememberDiaryScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewRememberDiaryScreen";

import { colors } from "../theme/colors";

const NativeStack = createNativeStackNavigator();

const CustomHeaderTitle = () => (
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
    <Text
      style={{
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: colors.palette.BrownDark,
      }}
    >
      {" "}
      VIEW
    </Text>
  </Text>
);

const ReviewStack = () => (
  <NativeStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <NativeStack.Screen
      name="ReviewMain"
      component={ReviewMainScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewReconnect"
      component={ReviewReconnectScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewRemind"
      component={ReviewRemindScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewReveal"
      component={ReviewRevealScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewRevealDiary"
      component={ReviewRevealDiaryScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewRemember"
      component={ReviewRememberScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewRememberDiary"
      component={ReviewRememberDiaryScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewReborn"
      component={ReviewRebornScreen}
      options={{ headerTitle: () => <CustomHeaderTitle /> }}
    />
  </NativeStack.Navigator>
);

export default ReviewStack;
