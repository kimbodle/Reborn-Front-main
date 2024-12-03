import React, { useState } from "react";
import styled from "styled-components/native";
import { Pressable } from "react-native";
import { colors } from "../../../theme";
import { ButtonBrown, Toast } from "../../../components";
import axios from "axios";
import Sound from "react-native-sound";

import {
  useAccessToken,
  useGlobalNickname,
} from "../../../context/AccessTokenContext";

import sunImage from "../../../Assets/icons/rediaryimage/sun.png";
import cloudImage from "../../../Assets/icons/rediaryimage/cloud.png";
import rainImage from "../../../Assets/icons/rediaryimage/rain.png";

const EmotionResultScreen = ({ route, navigation: { navigate } }) => {
  const music = new Sound("holymoly.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("Error loading sound: " + error);
      return;
    }
  });
  const { accessToken } = useAccessToken();
  const { globalNickname } = useGlobalNickname();

  const { answer, selectedEmotion, analysisResult } = route.params;

  const [isVisible, setIsVisible] = useState(false); // AI result visible
  const [showToast, setShowToast] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [percentageOfSentiment, SetPercentageOfSentiment] = useState(0);

  const weather = [
    { id: "SUNNY", text: "'맑음'", image: sunImage },
    { id: "CLOUDY", text: "'흐림'", image: cloudImage },
    { id: "RAINY", text: "'비'", image: rainImage },
  ];

  const selectedWeather = weather.find(
    (weather) => weather.id === selectedEmotion
  );

  const weatherTocolor = (sentiment) => {
    if (sentiment === "positive") {
      return "RED";
    }
    if (sentiment === "negative") {
      return "BLUE";
    }
    return "YELLOW"; // defult is YELLOW, neutral also Yellow
  };

  // send to Server
  const requestWrite = async (sentiment) => {
    try {
      const response = await fetch(
        "http://reborn.persi0815.site:8080/reborn/reveal/write",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diaryContent: answer,
            pickEmotion: selectedEmotion,
            resultEmotion: weatherTocolor(sentiment),
          }),
        }
      );
      const data = await response.json();
      if (!data) {
        throw new Error("Something went wrong");
      }
      console.log(data);
      SetPercentageOfSentiment(data.result);
      setIsAnalyzed(true);
      alert("저장되었습니다!");
    } catch (error) {
      console.error(error);
      alert("저장 실패:" + error);
    }
  };

  // go to Result Page
  const goToNextPage = async () => {
    if (!isAnalyzed) {
      setShowToast(true);
    } else {
      setShowToast(false);
      navigate("ReFinish");
    }
  };

  return (
    <Container>
      <Icon source={selectedWeather.image} />
      <ContentsText style={{ marginTop: "3%" }}>
        {globalNickname} 님이 선택한{"\n"}감정의 날씨는
        <WeatherText>
          {selectedWeather ? selectedWeather.text : "정보 없음"}
        </WeatherText>
        이네요
      </ContentsText>
      {isVisible ? (
        <GrayBox>
          <ContentsText style={{ color: colors.palette.Brown }}>
            보호자 님의 감정 분석 결과
          </ContentsText>
          <ContentsText style={{ color: "#F09BB4" }}>
            긍정표현 {analysisResult.document.confidence.positive.toFixed(1)}%
          </ContentsText>
          <ContentsText style={{ color: "#F4C681" }}>
            중립표현 {analysisResult.document.confidence.neutral.toFixed(1)}%
          </ContentsText>
          <ContentsText style={{ color: colors.palette.Blue }}>
            부정표현 {analysisResult.document.confidence.negative.toFixed(1)}%
          </ContentsText>
          <ContentsText>입니다</ContentsText>
          <GrayText>
            오늘 사용자의 {percentageOfSentiment.toFixed(0)}%가 함께 느낀
            감정이에요
          </GrayText>
        </GrayBox>
      ) : (
        <YellowBox>
          <ShowResult
            onPress={() => {
              music.play();
              setIsVisible(true);
              setShowToast(false);
              requestWrite(analysisResult.document.sentiment);
            }}
          />
        </YellowBox>
      )}
      <ToastContainer>
        {showToast ? (
          <Toast showToast={showToast} message="분석 결과 보기를 눌러주세요" />
        ) : (
          ""
        )}
      </ToastContainer>
      <ButtonBrown text={"다음으로"} onPress={goToNextPage} />
    </Container>
  );
};

export default EmotionResultScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
  align-items: center;
  justify-content: center;
`;

const ContentsText = styled.Text`
  font-size: 20px;
  text-align: center;
  font-family: "Poppins-Bold";
`;

const WeatherText = styled.Text`
  font-size: 24px;
  text-align: center;
  font-family: "Poppins-Bold";
  color: ${colors.palette.Blue};
`;

const GrayText = styled.Text`
  font-size: 16px;
  text-align: center;
  font-family: "Poppins-Regular";
  color: ${colors.palette.Gray500};
`;

const Icon = styled.Image`
  width: 110px;
  height: 110px;
  justify-content: center;
  align-items: center;
`;

const GrayBox = styled.View`
  background-color: ${colors.palette.Gray200};
  width: 80%;
  height: 38%;
  margin: 2% 0% 10% 0%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const YellowBox = styled.View`
  background-color: ${colors.palette.Gray200};
  width: 70%;
  height: 26%;
  margin: 5% 0% 12% 0%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const ToastContainer = styled.View`
  position: absolute;
  bottom: 110px;
  left: 0;
  right: 0;
  align-items: center;
`;

const ShowResult = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ width: "100px", height: "45px" }}>
      <ContentsText style={{ color: colors.palette.BrownDark }}>
        분석 결과 보기
      </ContentsText>
    </Pressable>
  );
};
