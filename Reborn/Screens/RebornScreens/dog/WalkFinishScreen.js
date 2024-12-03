import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { Text, ImageBackground } from "react-native";
import { colors } from "../../../theme";
import { ButtonBrownBottom, textStyles } from "../../../components";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import { useAccessToken } from "../../../context/AccessTokenContext";

import AppContext from "./AppContext";

import dogimageURL from "../../../Assets/Images/dog/dog_idle.png";

const WalkFinishScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const myContext = useContext(AppContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Server Link for sending data
  const linkArray = [
    "http://reborn.persi0815.site/reborn/remind/walk",
    "http://reborn.persi0815.site/reborn/reveal/walk",
    "http://reborn.persi0815.site/reborn/remember/walk",
  ];

  // RE:MIND & RE:VEAL & RE:MEMBER& RE:BORN what day? => Post Link
  const handleLink = (day) => {
    if (day >= 2 && day <= 6) {
      return linkArray[0];
    } else if (day >= 7 && day <= 11) {
      return linkArray[1];
    }
    return linkArray[2];
  };

  const handleSubmit = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true); // lock double click
      try {
        await requestPostProgress(
          handleLink(myContext.contentsDay),
          accessToken
        );
        navigate("Snack");
      } catch (error) {
        setIsSubmitted(false); // release double click
      }
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_park.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Text style={textStyles.contentsTextBox}>
          충분한 대화 나누기 :{" "}
          <Text style={{ color: colors.palette.Red }}>산책하기</Text>
        </Text>
        <DogImage source={dogimageURL} resizeMode="center" />
        <ButtonBrownBottom text="간식주러 가기" onPress={handleSubmit} />
      </ImageBackground>
    </Container>
  );
};

export default WalkFinishScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.Black};
`;

const DogImage = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 30%;
  margin-top: 50%;
`;
