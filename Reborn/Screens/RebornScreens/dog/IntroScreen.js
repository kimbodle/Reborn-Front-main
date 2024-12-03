import React, { useState, useContext, useEffect } from "react";
import { Text, ImageBackground } from "react-native";
import { colors } from "../../../theme";
import {
  ButtonBrownBottom,
  textStyles,
  TutorialModal,
} from "../../../components";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import styled from "styled-components/native";
import AppContext from "./AppContext";

import {
  useAccessToken,
  useGlobalPetName,
} from "../../../context/AccessTokenContext";
import { useFocusEffect } from "@react-navigation/native";
import Sound from "react-native-sound";

import dogimageURL from "../../../Assets/Images/dog/dog_idle.png";
import catimageURL from "../../../Assets/Images/cat/cat_idle.png";

const IntroScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const { globalPetName } = useGlobalPetName();
  const myContext = useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(true);
  const [petImage] = useState(
    myContext.petType === "CAT" ? catimageURL : dogimageURL
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [music, setMusic] = useState(null);

  // Initialize sound
  useEffect(() => {
    const sound = new Sound("intro.mp3", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Error loading sound: " + error);
        return;
      }
      sound.setNumberOfLoops(-1); // Infinite loop
      setMusic(sound);
    });

    return () => {
      if (music) {
        music.release();
      }
    };
  }, []);

  // Play and stop music on screen focus
  useFocusEffect(
    React.useCallback(() => {
      if (music) {
        music.play();
      }
      return () => {
        if (music) {
          music.stop(() => {
            music.setCurrentTime(0); // Reset to the beginning
          });
        }
      };
    }, [music])
  );

  const handleSubmit = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true); // lock double click
      try {
        await requestPostProgress(
          "http://reborn.persi0815.site/reborn/remind/create",
          accessToken
        );
        myContext.plusDay();
        navigate("ReIntro");
      } catch (error) {
        setIsSubmitted(false); // release double click
      }
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_blossom.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Text style={textStyles.contentsTextBox}>
          <Text style={{ color: colors.palette.Brown }}>RE</Text>
          CONNECT: 나의 반려동물과 만나기
        </Text>
        <DogImage source={petImage} resizeMode="center" />
        {modalVisible ? (
          <TutorialModal
            text={`${globalPetName}(이)가 친구들을 만나러 가기 전 당신을 왔습니다.\n15일 동안 ${globalPetName}(이)와 충분한 추억을 쌓고\n건강한 작별 인사를 나누어 주세요.`}
            modalStyles={modalVisible}
            onPress={() => setModalVisible(false)}
          />
        ) : null}
        <ButtonBrownBottom text="다음날로 넘어가기" onPress={handleSubmit} />
      </ImageBackground>
    </Container>
  );
};

export default IntroScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const DogImage = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 30%;
  margin-top: 55%;
`;
