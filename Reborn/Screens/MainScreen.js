import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import axios from "axios";
import AppContext from "./RebornScreens/dog/AppContext";

import { colors } from "../theme";
import styled from "styled-components/native";
import {
  useAccessToken,
  useGlobalNickname,
  useGlobalPetName,
} from "../context/AccessTokenContext";
import { useFocusEffect } from "@react-navigation/native";

const MainScreen = ({ navigation: { navigate } }) => {
  const myContext = useContext(AppContext);
  const { accessToken } = useAccessToken();

  const [nickname, setNickname] = useState("");
  const { setGlobalNickname } = useGlobalNickname();
  const { setGlobalPetName } = useGlobalPetName();

  const [profileImage, setProfileImage] = useState(
    require("../Assets/icons/profile.png")
  );

  useFocusEffect(
    React.useCallback(() => {
      const getNicknameProfileImage = async () => {
        try {
          const timestamp = new Date().getTime();
          const nickNameProfileImageResponse = await axios.get(
            `http://reborn.persi0815.site/users/main?timestamp=${timestamp}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          //console.log(nickNameProfileImageResponse.data);
          //console.log(nickNameProfileImageResponse.data.result.nickname);
          if (nickNameProfileImageResponse.data.result.nickname) {
            if (
              nickNameProfileImageResponse.data.result.nickname &&
              nickNameProfileImageResponse.data.result.profileImage
            ) {
              setNickname(nickNameProfileImageResponse.data.result.nickname);
              setProfileImage({
                uri: nickNameProfileImageResponse.data.result.profileImage,
              });
              setGlobalNickname(
                nickNameProfileImageResponse.data.result.nickname
              );
            }
            setNickname(nickNameProfileImageResponse.data.result.nickname);
            setGlobalNickname(
              nickNameProfileImageResponse.data.result.nickname
            );
          }
        } catch (error) {
          console.error("Profile image fetch error:", error);
        }
      };
      getNicknameProfileImage();
    }, [])
  );

  const { globalNickname } = useGlobalNickname();
  const { globalPetName } = useGlobalPetName();

  // get RE:BORN progess
  const fetchGoodbye = async () => {
    try {
      const response = await axios.get(
        `http://reborn.persi0815.site/reborn/reconnect/goodbye`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data.result); // do not remove

      if (response.data.result) {
        if (response.data.result.rebornDate === 1) {
          navigate("RebornDogStack", { screen: "Intro" });
        } else {
          // Contents is already progressed
          myContext.setDay(response.data.result.rebornDate); // set Day
          myContext.changePetType(response.data.result.petType); // set PetType
          setGlobalPetName(response.data.result.petName);

          // handle navigation according to progress
          switch (response.data.result.progressState) {
            case "INTRO":
              navigate("RebornDogStack", { screen: "ReIntro" });
              break;
            case "PAT":
              navigate("RebornDogStack", { screen: "Pet" });
              break;
            case "FEED":
              navigate("RebornDogStack", { screen: "Feed" });
              break;
            case "WALK":
              navigate("RebornDogStack", { screen: "Walk" });
              break;
            case "PLAY":
              navigate("RebornDogStack", { screen: "Play" });
              break;
            case "SNACK":
              navigate("RebornDogStack", { screen: "Snack" });
              break;
            case "FINISH":
              navigate("RebornDogStack", { screen: "ReFinish" });
              break;
            case "DIARY":
              navigate("RebornDogStack", { screen: "Diary" });
              break;
            case "EMOTION":
              navigate("RebornDogStack", { screen: "Emotion" });
              break;
            case "IMAGE":
              navigate("RebornDogStack", { screen: "ImageDiary" });
              break;
            case "CLEAN":
              navigate("RebornDogStack", { screen: "Clean" });
              break;
            case "WASH":
              navigate("RebornDogStack", { screen: "Wash" });
              break;
            case "CLOTHES":
              navigate("RebornDogStack", { screen: "Clothes" });
              break;
            case "LETTER":
              navigate("RebornDogStack", { screen: "Letter" });
              break;
            case "SETREBORN":
              navigate("RebornDogStack", { screen: "SetReborn" });
              break;
            case "OUTRO":
              navigate("RebornDogStack", { screen: "Outtro" });
              break;
            default:
          }
        }
      } else {
        navigate("ReconnectStack", { screen: "ReconnectProfile" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>
        <Text style={{ color: colors.palette.Yellow }}>RE:</Text> BORN
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.profileImage}
          //     { width: "25%", resizeMode: "contain" }
          // }
          source={profileImage}
        />
        <Text style={styles.helloText}>
          안녕하세요,{"\n"}
          <Text style={{ color: colors.palette.Brown }}>{nickname}</Text>님
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20, marginBottom: -20 }}>
        <Text style={styles.boxtext}>
          <Text style={{ color: colors.palette.Brown }}>
            펫로스 증후군, {"\n"}
          </Text>
          사랑하는 가족이었던 반려동물이 내 곁을 영영 떠나가게 되면서 느끼게
          되는 자연스러운 우울감, 상실감입니다.
        </Text>
      </View>
      <View style={styles.removerButton}>
        <Text style={styles.boxtext22}>
          <Text style={{ color: colors.palette.Brown }}>
            RE:TURN에게 물어보세요! {"\n"}
          </Text>
          앱 기능 관련 설명이나, 심리 상담소 정보가 필요하면 RE:TURN과
          대화해보세요!
        </Text>
        <TouchableOpacity
          onPress={() => navigate("ReturnStack", { screen: "Return" })}
        >
          <Text style={{ marginLeft: "38%" }}>
            RE:TURN과 대화하러 가기{" "}
            <Image source={require("../Assets/icons/mainimages/arrow.png")} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginTop: -10 }}>
        <TouchableOpacity
          style={styles.TestButton}
          onPress={() => navigate("SelfTestStack", { screen: "TestIntro" })}
        >
          <Text style={styles.boxtext}>
            <Text style={{ color: colors.palette.Brown }}>
              펫로스 증후군 {"\n"}
            </Text>
            자가진단 하러 가기
          </Text>
          <Image
            style={{ position: "absolute", bottom: "20%", left: "20%" }}
            source={require("../Assets/icons/mainimages/arrow.png")}
          />
          <Image
            style={{ position: "absolute", bottom: -10, right: -10 }}
            source={require("../Assets/icons/mainimages/dog.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rebornButton}
          onPress={() => {
            fetchGoodbye();
          }}
        >
          <Text style={styles.boxtext}>
            <Text style={{ color: colors.palette.Brown }}>RE: {"\n"}</Text>
            작별하러 가기
          </Text>
          <Image
            style={{ position: "absolute", bottom: "20%", left: "20%" }}
            source={require("../Assets/icons/mainimages/arrow.png")}
          />
          <Image
            style={{ position: "absolute", bottom: -10, right: -10 }}
            source={require("../Assets/icons/mainimages/rainbow.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.palette.White,
    paddingHorizontal: "5%",
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-Bold",
    marginTop: "5%",
    color: colors.palette.BrownDark,
  },
  helloText: {
    fontSize: 20,
    fontFamily: "Poppins-ExtraBold",
    color: colors.palette.BrownDark,
    marginTop: 20,
    marginLeft: "5%",
    textAlign: "left",
  },
  removerButton: {
    height: "22%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: colors.palette.Gray200,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    paddingHorizontal: 20,
  },
  TestButton: {
    height: "55%",
    width: "40%",
    borderRadius: 10,
    backgroundColor: "#FCF1F1",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    paddingHorizontal: 20,
  },
  rebornButton: {
    height: "55%",
    width: "40%",
    borderRadius: 10,
    backgroundColor: "#FFF6EB",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  boxtext22: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: colors.palette.BrownDark,
    marginBottom: 5,
    marginTop: 10,
  },
  boxtext: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: colors.palette.BrownDark,
    marginBottom: 20,
    marginTop: 10,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginLeft: "2%",
  },
});

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
  padding: 5% 5% 0% 5%;
`;
