import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../theme";

import TestIntroScreen from "../Screens/SelfTestScreens/TestIntroScreen";
import MainScreen from "../Screens/MainScreen";
import ShareBoardScreen from "../Screens/ShareboardScreens/MainShareScreen";
import RediaryMain from "../Screens/ReDiaryScreens/RediaryMainScreen";
import MypageMainScreen from "../Screens/MyPageScreens/MypageMainScreen";

import ShareDrawers from "./ShareDrawer";

const Tab = createBottomTabNavigator();

const ReDiaryTitle = () => (
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
      DIARY
    </Text>
  </Text>
);

const MypageTitle = () => (
    <Text
      style={{
        fontFamily: "Poppins-Bold",
        color: colors.palette.BrownDark,
        fontSize: 20,
      }}
    >
      {" "}
      마이페이지
    </Text>
);
//headerTitle: () => <ReDiaryTitle/>}

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: colors.palette.Brown,
      headerTitleAlign: "center",
    }}
  >
    <Tab.Screen
      name="Main"
      component={MainScreen}
      options={{
        tabBarLabel: "메인화면",
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../Assets/icons/tabIcons/homeIcon2.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: color,
              //backgroundColor: 'red',
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Shared"
      component={ShareDrawers}
      options={{
        headerShown: false,
        tabBarLabel: "나눔게시판",
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../Assets/icons/tabIcons/shareboardicon.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: color,
            }}
          />
        ),
      }}
    />
    <Tab.Screen
      name="RediaryMain"
      component={RediaryMain}
      options={({ navigation }) => ({
        title: "RE: DIARY",
        headerShown: true,
        headerTitle: () => <ReDiaryTitle />,
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../Assets/icons/tabIcons/rediaryicon.png")}
            style={{
              width: 19,
              height: 22,
              resizeMode:'contain',
              tintColor: color,
            }}
          />
        ),
      })}
    />
    <Tab.Screen
      name="MypageMain"
      component={MypageMainScreen}
      options={({ navigation }) => ({
        title: "마이페이지",
        headerShown: true,
        headerTitle: () => <MypageTitle />,
        tabBarIcon: ({ color }) => (
          <Image
            source={require("../Assets/icons/tabIcons/mypageicon.png")}
            style={{
              width: 21,
              height: 20,
              tintColor: color,
            }}
          />
        ),
      })}
    />
  </Tab.Navigator>
);

export default Tabs;

// tabBarStyle: { display: "none" }

// headerLeft: () => (
//   <TouchableOpacity onPress={() => navigation.goBack()}>
//     <Image
//         source={require('../Assets/icons/tabIcons/homeicon.png')}
//         style={{marginLeft: "5%",width: 25, height: 25, tintColor: colors.palette.Brown}}
//       />
//   </TouchableOpacity>
// ),
