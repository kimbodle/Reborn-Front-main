//App.js
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./Navigation/Root";

import AppContext from "./Screens/RebornScreens/dog/AppContext";
import {
  AccessTokenProvider,
  GlobalNicknameProvider,
  GlobalPetNameProvider,
  DeviceTokenProvider,
  useDeviceToken,
} from "./context/AccessTokenContext";

import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const AppContent = () => {
  const { setDeviceToken } = useDeviceToken();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'info', //'success', 'error', 'info'
        text1: remoteMessage.notification.title,
        text2: remoteMessage.notification.body,
        visibilityTime: 3000,
      });
    });

    return unsubscribe;
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      //console.log('권한 상태:', authStatus);
    }
  }

  async function getToken() {
    await requestUserPermission();
    const token = await messaging().getToken();
    //console.log('디바이스 토큰:', token);
    setDeviceToken(token); // 디바이스 토큰 설정
  }

  // 앱이 실행될 때 토큰을 얻기 위해 함수 호출
  useEffect(() => {
    getToken();
  }, []);

  const [contentsDay, setContentsDay] = useState(1);
  const [petType, setPetType] = useState("DOG");

  const setDay = (day) => {
    setContentsDay(day);
  };

  const plusDay = () => {
    setContentsDay(contentsDay + 1);
  };

  const resetDay = () => {
    setContentsDay(1);
  };

  const changePetType = (type) => {
    setPetType(type);
  };

  const contextValues = {
    // ----- RE:BORN Progress ----
    contentsDay,
    setDay,
    resetDay,
    plusDay,
    // ----- Pet Type -----
    petType,
    changePetType,
  };

  return (
    <>
      <AppContext.Provider value={contextValues}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </AppContext.Provider>
      <Toast />
    </>
  );
};

export default function App() {
  return (
    <AccessTokenProvider>
      <DeviceTokenProvider>
        <GlobalNicknameProvider>
          <GlobalPetNameProvider>
            <AppContent />
          </GlobalPetNameProvider>
        </GlobalNicknameProvider>
      </DeviceTokenProvider>
    </AccessTokenProvider>
  );
}
