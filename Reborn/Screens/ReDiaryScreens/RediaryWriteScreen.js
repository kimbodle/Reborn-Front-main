import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { colors } from "../../theme";
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "@env";
import {
  GrayLine,
  CompleteButton,
  RadioButton,
  Toast
} from "../../components";
import { View, TextInput, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext";
import sunImage from "../../Assets/icons/rediaryimage/sun.png";
import cloudImage from "../../Assets/icons/rediaryimage/cloud.png";
import rainImage from "../../Assets/icons/rediaryimage/rain.png";

const EmotionScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const mode = "Just";

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showToastAnswer, setShowToastAnswer] = useState(false);
  const [answer, setAnswer] = useState("");
  const [title, setTitle] = useState("");

  const emotions = [
    { id: "SUNNY", image: sunImage },
    { id: "CLOUDY", image: cloudImage },
    { id: "RAINY", image: rainImage },
  ];

  useFocusEffect(
    useCallback(() => {
      setSelectedEmotion(null);
      setAnswer("");
      setTitle("");
    }, [])
  );

  const goToNextPage = async () => {
    if (!selectedEmotion) {
      setShowToast(true);
      return;
    }
    setShowToast(false);

    if (!answer || !title) {
      setShowToastAnswer(true);
      return;
    }

    setShowToastAnswer(false);
    const analysisResult = await analyzeEmotion(answer);
    if (analysisResult) {
      navigate("RediaryResult", {
        answer,
        selectedEmotion,
        analysisResult,
        title,
        mode,
      });
    } else {
      alert("감정 분석에 실패했습니다. 다시 시도해주세요.");
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
      <View style={styles.emotionContainer}>
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
      <TitleText>감정일기</TitleText>
      <View style={styles.titleText}>
        <TextInput
          placeholder="7자 이하의 제목을 입력해주세요."
          style={styles.titleInput}
          onChangeText={setTitle}
          value={title}
        />
      </View>
      <TextInputContainer>
        <TextInput
          keyboardType="default"
          onChangeText={setAnswer}
          value={answer}
          placeholder="오늘의 감정은 어떤가요?"
          multiline={true}
          style={styles.answerInput}
        />
      </TextInputContainer>
      {showToast && (
        <ToastContainer>
          <Toast showToast={showToast} message="감정을 선택해주세요" />
        </ToastContainer>
      )}
      {showToastAnswer && (
        <ToastContainer>
          <Toast showToast={showToastAnswer} message="일기를 작성해주세요" />
        </ToastContainer>
      )}
      <CompleteButton text="작성완료" onPress={goToNextPage} />
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
  margin-horizontal: 8%;
`;

const TextInputContainer = styled.View`
  margin: 0% 8% 0% 8%;
  background-color: ${colors.palette.Gray200};
  padding: 3% 4% 80% 4%;
`;

const styles = StyleSheet.create({
  emotionContainer: {
    padding: 20,
    flexDirection: "row",
  },
  titleText: {
    height: 50,
    backgroundColor: colors.palette.Gray200,
    marginHorizontal: "8%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: "5%",
  },
  titleInput: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
  answerInput: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
