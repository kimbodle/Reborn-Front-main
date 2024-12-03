import React, { useState, useContext, useEffect } from "react";
import { Text, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../theme";
import {
  textStyles,
  ButtonBrownBottom,
  TutorialModal,
} from "../../../components";
import { useFocusEffect } from "@react-navigation/native";
import AppContext from "./AppContext";

import dogimageURL from "../../../Assets/Images/dog/dog_idle.png";
import catimageURL from "../../../Assets/Images/cat/cat_idle.png";

const ReIntroScreen = ({ navigation: { navigate } }) => {
  const ModalTextArray = [
    `오늘부터 5일 동안 반려동물과\n충분한 대화를 나누어보세요. \n대화한 내용은 모두 ‘RE:VIEW’에\n저장됩니다.`,
    `오늘부터 5일 동안 
  감정 일기를 통해 나 자신과
  충분한 대화를 나누어보세요.
  작성한 감정 일기는 모두 
  RE:VIEW에 저장됩니다.`,
    `오늘부터 3일 동안 
  갤러리를 살펴보며 
  꼭 기억하고 싶은 순간이 담긴 
  사진이나 영상을 업로드하고 
  그 날 있었던 일에 대해 기록해보세요.
  작성한 감정 일기는 모두 
  RE:VIEW에 저장됩니다.`,
    `오늘은 작별하는 날입니다.
  마지막으로 하고 싶은 말을 전하고, 예쁘고 멋진 모습으로 보내주세요.`,
  ];
  const myContext = useContext(AppContext);

  const [petImage] = useState(
    myContext.petType === "CAT" ? catimageURL : dogimageURL
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [daymodalVisible, setDayModalVisible] = useState(true);

  const titleArray = [
    `MIND : 충분한 대화 나누기`,
    `VEAL: 나의 감정 들여다보기`,
    `MEMBER: 건강한 작별 준비하기`,
    `BORN: 나의 반려동물과 작별하기`,
  ];

  // refresh
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setDayModalVisible(true);
    }, [])
  );

  // RE:MIND & RE:VEAL & RE:MEMBER what day? => modal text
  const getDayValue = (day) => {
    if (day >= 2 && day <= 6) {
      return 0;
    } else if (day >= 7 && day <= 11) {
      return 1;
    } else if (day >= 12 && day <= 14) {
      return 2;
    }
    return 3;
  };

  useEffect(() => {
    // set Tutorial Modal Visible true
    if (
      myContext.contentsDay == 2 ||
      myContext.contentsDay == 7 ||
      myContext.contentsDay == 12 ||
      myContext.contentsDay == 15
    ) {
      setModalVisible(true);
    }
    setDayModalVisible(true);
  }, [myContext.contentsDay]);

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_veranda(1).png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Text style={textStyles.contentsTextBox}>
          <Text style={{ color: colors.palette.Brown }}>RE</Text>
          {titleArray[getDayValue(myContext.contentsDay)]}
        </Text>
        <DogImage source={petImage} resizeMode="center" />
        {daymodalVisible ? (
          <TutorialModal
            text={"Day" + myContext.contentsDay}
            modalStyles={daymodalVisible}
            onPress={() => {
              setDayModalVisible(false);
            }}
          />
        ) : (
          ""
        )}
        {modalVisible ? (
          <TutorialModal
            text={ModalTextArray[getDayValue(myContext.contentsDay)]}
            modalStyles={modalVisible}
            onPress={() => {
              {
                setModalVisible(false);
              }
            }}
          />
        ) : (
          ""
        )}
        <ButtonBrownBottom
          text={"쓰다듬으러 가기"}
          onPress={() => {
            navigate("Pet");
          }}
        />
      </ImageBackground>
    </Container>
  );
};

export default ReIntroScreen;

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
