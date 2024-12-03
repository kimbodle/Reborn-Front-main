import React from "react";
import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountManagementScreen from "../Screens/MyPageScreens/AccountManagementScreens/AccountManagementScreen";
import PetProfileListScreen from "../Screens/MyPageScreens/PetProfileListScreen";
import PetProfileManagementScreen from "../Screens/MyPageScreens/PetProfileManagementScreen";
import ReviewPetListScreen from "../Screens/MyPageScreens/ReviewScreens/ReviewPetListScreen";

import { colors } from "../theme/colors";

const NativeStack = createNativeStackNavigator();

const ReviewPetListTitle = () => (
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
        color: colors.palette.BrownDark,
        fontSize: 20,
      }}
    >
      {" "}
      VIEW
    </Text>
  </Text>
);

const AccountTitle = () => (
  <Text
    style={{
      fontFamily: "Poppins-Bold",
      color: colors.palette.BrownDark,
      fontSize: 20,
    }}
  >
    계정 관리
  </Text>
);

const PetTitle = () => (
  <Text
    style={{
      fontFamily: "Poppins-Bold",
      color: colors.palette.BrownDark,
      fontSize: 20,
    }}
  >
    반려동물 프로필 관리
  </Text>
);

const MypageStack = () => (
  <NativeStack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
    <NativeStack.Screen
      name="AccountManagement"
      component={AccountManagementScreen}
      options={{ headerTitle: () => <AccountTitle /> }}
    />
    <NativeStack.Screen
      name="PetProfileList"
      component={PetProfileListScreen}
      options={{ headerTitle: () => <PetTitle /> }}
    />
    <NativeStack.Screen
      name="PetProfileManagement"
      component={PetProfileManagementScreen}
      options={{ headerTitle: () => <PetTitle /> }}
    />
    <NativeStack.Screen
      name="ReviewPetList"
      component={ReviewPetListScreen}
      options={{ headerTitle: () => <ReviewPetListTitle /> }}
    />
  </NativeStack.Navigator>
);

export default MypageStack;
