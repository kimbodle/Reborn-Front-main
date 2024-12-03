import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import ReconnectScreen from "../Screens/RebornScreens/ReconnectScreens/ReconnectScreen";

import { colors } from "../theme/colors";

const ReconnectStacks = createNativeStackNavigator();

const ReconnectTitle = () => (
  <Text>
    <Text
      style={{
        color: colors.palette.Brown,
        fontFamily: "Poppins-Bold",
        fontSize: 18,
      }}
    >
      RE:
    </Text>
    <Text
      style={{
        fontFamily: "Poppins-Bold",
        color: colors.palette.BrownDark,
        fontSize: 20,
      }}
    >
      {" "}
      반려동물과 작별하기
    </Text>
  </Text>
);

const ReconnectStack = () => (
  <ReconnectStacks.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <ReconnectStacks.Screen
      name="ReconnectProfile"
      component={ReconnectScreen}
      options={{ headerTitle: () => <ReconnectTitle /> }}
    />
  </ReconnectStacks.Navigator>
);

export default ReconnectStack;
