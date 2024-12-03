import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../Screens/AccountScreens/LoginScreen";

const NativeAccountStack = createNativeStackNavigator();

const AccountStack = () => 
    <NativeAccountStack.Navigator screenOptions={{headerShown: false}}>
        <NativeAccountStack.Screen name ='Login' component={LoginScreen} />
    </NativeAccountStack.Navigator>;

export default AccountStack;