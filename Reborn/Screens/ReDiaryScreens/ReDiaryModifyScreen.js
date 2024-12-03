import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { colors } from "../../theme";
import { API_URL, CLIENT_ID, CLIENT_SECRET } from "@env";
import { GrayLine, ModifyButton ,CompleteButton,DelateButton, RadioButton, Toast } from "../../components";
import { View, TextInput, Text,Button,TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

import { useAccessToken } from "../../context/AccessTokenContext";

import sunImage from "../../Assets/icons/rediaryimage/sun.png";
import cloudImage from "../../Assets/icons/rediaryimage/cloud.png";
import rainImage from "../../Assets/icons/rediaryimage/rain.png";

const ReDiaryModifyScreen = ({route, navigation}) => {
  const { rediaryId, rediaryTitle, rediaryCreatedAt, rediaryContent, pickEmotion, resultEmotion } = route.params;

  const mode = "Edit";

  const { accessToken } = useAccessToken();

  const [selectedEmotion, setSelectedEmotion] = useState(pickEmotion);
  const [showToast, setShowToast] = useState(false); // for Emotion
  const [showToast_answer, setShowToast_answer] = useState(false); // for answer
  const [answer, onChangeAnswer] = React.useState("");
  const [title, onChangeTitle] = React.useState("");

  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [text, setText] = useState(""); // 입력된 텍스트

  const today = new Date();
  const todayStr = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
  
  const toggleEdit = () => {
      // 오늘 날짜와 date가 같을 때만 수정 모드 토글
      if(rediaryCreatedAt === todayStr) {
        console.log(rediaryId);
          setIsEditing(!isEditing);
      } else {
        Alert.alert(
          "아쉽네요",
          "감정일기는 작성 당일에만 수정할 수 있습니다.",
          [
            {
              text: "예",
              onPress: () => console.log("삭제 취소"),
              style: "cancel",
            },
          ],
          { cancelable: false } //밖을 누르면 취소가 되는데 그거 금지
        );
      }
  };

  const emotions = [
    { id: "SUNNY", image: sunImage },
    { id: "CLOUDY", image: cloudImage },
    { id: "RAINY", image: rainImage },
  ];

  // refresh when Screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setSelectedEmotion(pickEmotion);
      onChangeAnswer(rediaryContent);
      onChangeTitle(rediaryTitle);
    }, [])
  );

  // go to Result Page
  const goToNextPage = async () => {
    if (!selectedEmotion) {
      setShowToast(true);
    } else {
      setShowToast(false);
      if (answer && title) {
        setShowToast_answer(false);
        const analysisResult = await analyzeEmotion(answer);
        if (analysisResult) {
          console.log(analysisResult);
          navigation.navigate("RediaryResult", {
            answer,
            selectedEmotion,
            analysisResult,
            title,
            mode,
            rediaryId,
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

  const rediaryDeletePress = () => {
    Alert.alert(
      "감정일기 삭제",
      "정말로 감정일기를 삭제하시겠습니까?",
      [
        { 
          text: "예", 
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://reborn.persi0815.site/rediary/${rediaryId}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              console.log(response.data);
              navigation.goBack();
            } catch (error) {
              console.log("Error Response Body:", error.response?.data);
            }
          },
        },
        {
          text: "아니오",
          onPress: () => console.log("삭제 취소"),
          style: "cancel",
        },
      ],
      { cancelable: false } //밖을 누르면 취소가 되는데 그거 금지
    );
  };

  return (
    <Container>
      <TouchableOpacity 
            style={[styles.ReModifyButtun, rediaryCreatedAt === todayStr ? {} : styles.buttonDisabled]} 
            onPress={toggleEdit} 
            //disabled={rediaryCreatedAt !== todayStr}
        >
            <Text style={styles.buttonText}>수정 하기</Text>
        </TouchableOpacity>
        <View style={{ padding: 20, flexDirection: "row", marginTop: -20,}}>
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
        감정일기
      </TitleText>
      <View style={styles.titleText}>
          {isEditing ? (
          <TextInput
          placeholder="제목을 입력하세요"
          style={styles.titleInput}
          onChangeText={onChangeTitle}
          value={title}
          />
          ) : (
          <Text style={styles.dataText}>{rediaryTitle}</Text>
          )}
      </View>
      <TextInputContainer>
      {isEditing ? (
        <TextInput
          keyboardType="default"
          style={styles.textInput}
          onChangeText={onChangeAnswer}
          value={answer}
          placeholder="오늘의 감정일기를 수정해보세요"
          multiline={true}
        />
        ) : (
          <Text style={styles.dataText2}>{rediaryContent}</Text>
          )}
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,}}>
            <TouchableOpacity style={styles.ReCompleteButtun} onPress={rediaryDeletePress}>
            <Text style={styles.buttonText}>
                삭제 하기
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.ReCompleteButtun, isEditing ? styles.analyzeButtonEnabled : styles.analyzeButtonDisabled]}
                onPress={goToNextPage}
                disabled={!isEditing}
                >
          <Text style={styles.buttonText}>분석하기</Text>
        </TouchableOpacity>
        </View>
    </Container>
  );
};


export default ReDiaryModifyScreen;

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
const styles = StyleSheet.create({
  ReModifyButtun: {
      height: 40,
      backgroundColor: colors.palette.Blue,
      width: '25%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      marginVertical: 10,
      marginLeft: '70%',
      marginTop: '5%',
  },
  ReCompleteButtun: {
      height: 40,
      backgroundColor: colors.palette.Red,
      width: '25%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: '10%',
      marginTop: '5%',
  },
  buttonText: {
      fontFamily: 'Poppins-Bold',
      color: colors.palette.White,
      marginTop: 3,
  },
  ReDelateButton: {
      height: 40,
      //backgroundColor: colors.palette.Green,
      width: '25%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: '10%',
      marginTop: '5%',
  },
  analyzeButtonEnabled: {
      backgroundColor: colors.palette.Green,
    },
  analyzeButtonDisabled: {
      backgroundColor: colors.palette.Gray300,
  },
  titleText:{
      height: 60,
      backgroundColor: colors.palette.Gray200,
      marginHorizontal: '8%',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: '5%',
      borderRadius: 5
    },
    titleInput: {
      fontSize: 18,
      fontFamily: 'Popins-Medium'
    },
    textInput: {
      fontSize: 18,
      fontFamily: 'Popins-Medium'
    },
    dataText: {
      fontSize: 18,
      paddingVertical: '5%',
      fontFamily: 'Poppins-Bold'
    },
    dataText2: {
      fontSize: 18,
      paddingVertical: '5%',
      fontFamily: 'Poppins-Bold',
      marginTop: -10,
    },
    buttonDisabled: {
      backgroundColor: colors.palette.Gray300,
  },
    
});



