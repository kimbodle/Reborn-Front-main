import React, { createContext, useContext, useState } from "react";

const AccessTokenContext = createContext();
const GlobalNicknameContext = createContext();
const GlobalPetNameContext = createContext();
const DeviceToKenContext = createContext();

export const useAccessToken = () => useContext(AccessTokenContext);
export const useGlobalNickname = () => useContext(GlobalNicknameContext);
export const useGlobalPetName = () => useContext(GlobalPetNameContext);
export const useDeviceToken = () => useContext(DeviceToKenContext);

export const AccessTokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const GlobalNicknameProvider = ({ children }) => {
  const [globalNickname, setGlobalNickname] = useState(null);

  return (
    <GlobalNicknameContext.Provider
      value={{ globalNickname, setGlobalNickname }}
    >
      {children}
    </GlobalNicknameContext.Provider>
  );
};

export const GlobalPetNameProvider = ({ children }) => {
  const [globalPetName, setGlobalPetName] = useState(null);

  return (
    <GlobalPetNameContext.Provider value={{ globalPetName, setGlobalPetName }}>
      {children}
    </GlobalPetNameContext.Provider>
  );
};

export const DeviceTokenProvider = ({ children }) => {
  const [deviceToken, setDeviceToken] = useState(null);

  return (
    <DeviceToKenContext.Provider value={{ deviceToken, setDeviceToken }}>
      {children}
    </DeviceToKenContext.Provider>
  );
};
