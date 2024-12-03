import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { colors } from "../../../theme";
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "@env";
import {
  GrayLine,
  CompleteButton,
  RadioButton,
  Toast,
} from "../../../components";
import { View, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppContext from "./AppContext";
import axios from "axios";

import { useAccessToken } from "../../../context/AccessTokenContext";

import sunImage from "../../../Assets/icons/rediaryimage/sun.png";
import cloudImage from "../../../Assets/icons/rediaryimage/cloud.png";
import rainImage from "../../../Assets/icons/rediaryimage/rain.png";

const EmotionScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const myContext = useContext(AppContext);

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showToast, setShowToast] = useState(false); // for Emotion
  const [showToast_answer, setShowToast_answer] = useState(false); // for answer
  const [answer, onChangeAnswer] = React.useState("");

  const emotions = [
    { id: "SUNNY", image: sunImage },
    { id: "CLOUDY", image: cloudImage },
    { id: "RAINY", image: rainImage },
  ];

  // refresh when Screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSelectedEmotion(null);
      onChangeAnswer("");
    }, [])
  );

  // go to Result Page
  const goToNextPage = async () => {
    if (!selectedEmotion) {
      setShowToast(true);
    } else {
      setShowToast(false);
      if (answer) {
        setShowToast_answer(false);
        const analysisResult = await analyzeEmotion(answer);
        if (analysisResult) {
          console.log(analysisResult);
          navigate("EmotionResult", {
            answer,
            selectedEmotion,
            analysisResult,
          });
        } else {
          alert("감정 분석에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        setShowToast_answer(true);
        console.log(showToast_answer);
      }
    }
  };

  const analyzeEmotion = async (text) => {
    try {
      const response = await axios.post(
        API_URL,
        { content: text },
        {
          headers: {
            "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
            "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("감정 분석 중 에러 발생: ", error);
      return null;
    }
  };

  return (
    <Container>
      <TitleText style={{ marginTop: "8%", marginHorizontal: "5%" }}>
        감정일기 작성법
      </TitleText>
      <MiddleText style={{ marginBottom: "8%" }}>
        반려동물의 생애를 다섯 단계로 나누어 처음 만난 날부터 떠나보낸 날까지 각
        단계에 대한 감정 일기를 작성합니다.{"\n"}
        {"\n"} 1. 매일 반려동물과 함께 했던 시간의 5분의 1동안 있었던 일을
        기록합니다.{"\n"} 2. 그상황에서 내가 느낀 신체 변화, 감정, 생각 등을
        기억나는대로 적어봅니다. {"\n"} 3. 본 글은 비밀이 보장되며, 아무도 볼 수
        없다는 생각으로 편안한 마음으로 적어주세요.
      </MiddleText>
      <GrayLine />
      <TitleText style={{ textAlign: "center" }}>감정일기</TitleText>
      <GrayLine />
      <View style={{ padding: 20, flexDirection: "row" }}>
        {emotions.map((emotion) => (
          <RadioButton
            key={emotion.id}
            isSelected={selectedEmotion === emotion.id}
            onPress={() => {
              setSelectedEmotion(emotion.id);
              setShowToast(false);
            }}
            image={emotion.image}
          />
        ))}
      </View>
      <TitleText style={{ marginHorizontal: "8%" }}>
        Day {myContext.contentsDay} 감정일기
      </TitleText>
      <TextInputContainer>
        <TextInput
          keyboardType="default"
          onChangeText={onChangeAnswer}
          value={answer}
          placeholder="어떤 일이 있었고, 어떤 감정을 느꼈는지 기록해보세요"
          multiline={true}
        ></TextInput>
      </TextInputContainer>
      <ToastContainer>
        {showToast ? (
          <Toast showToast={showToast} message="감정을 선택해주세요" />
        ) : (
          ""
        )}
      </ToastContainer>
      <ToastContainer>
        {showToast_answer ? (
          <Toast showToast={showToast_answer} message="일기를 작성해주세요" />
        ) : (
          ""
        )}
      </ToastContainer>
      <CompleteButton text="작성완료" onPress={goToNextPage}></CompleteButton>
    </Container>
  );
};

export default EmotionScreen;

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const ToastContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  align-items: flex-end;
`;

const TitleText = styled.Text`
  font-family: "Poppins-ExtraBold";
  font-size: 20px;
`;

const MiddleText = styled.Text`
  font-family: "Poppins-Medium";
  font-size: 16px;
  margin: 2% 5% 0% 5%;
`;

const TextInputContainer = styled.View`
  margin: 0% 8% 0% 8%;
  background-color: ${colors.palette.Gray200};
  padding: 3% 4% 80% 4%;
`;
