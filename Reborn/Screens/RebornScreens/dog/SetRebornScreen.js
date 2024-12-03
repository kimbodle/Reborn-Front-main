import React, { useState, useContext } from "react";
import { Text, ImageBackground, Modal, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../theme";
import {
  textStyles,
  ButtonBrownBottom,
  ButtonYellow,
  Toast,
} from "../../../components";
import AppContext from "./AppContext";
import {
  useAccessToken,
  useGlobalNickname,
  useGlobalPetName,
} from "../../../context/AccessTokenContext";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import axios from "axios";

import dogimageURL from "../../../Assets/Images/dog/dog_clothes.png";
import catimageURL from "../../../Assets/Images/cat/cat_clothes.png";

import ribbon_blackimageURL from "../../../Assets/stuffs/ribbon_black.png";
import ribbon_yellowimageURL from "../../../Assets/stuffs/ribbon_yellow.png";
import letterPaperimageURL from "../../../Assets/stuffs/letterPaper.png";

const SetRebornScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const { globalNickname } = useGlobalNickname();
  const { globalPetName } = useGlobalPetName();
  const myContext = useContext(AppContext);

  const [petImage] = useState(
    myContext.petType === "CAT" ? catimageURL : dogimageURL
  );

  const [modalVisible, setmodalVisible] = useState(true); // Reborn Modal
  const [letterVisible, setletterVisible] = useState(false); // Letter Modal
  const [isBlack, setIsBlack] = useState(true); // true -> black, false -> yellow
  const [isEnd, setIsEnd] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // reborn submit
  const [isOutroSubmitted, setIsOutroSubmitted] = useState(false); // outro submit

  const text = `
  안녕? 나의 생애에서 가장 소중하고 특별한존재인 너에게 이 편지를 남기려고 해. 
  우리가 처음 만났을 때의설레는 순간, 나의 작은 몸으로 너에게 다가갔던 모습이 기억에 남아있어. 너의 따뜻한 손길, 미소, 그 모든 순간들이 내 삶을 행복하게 만들었어. 
  내가 힘들거나 아플 때도 너가 내 곁에 있어주면서 나를 위로해 주어서 정말 고마워. 
  더이상 함께할 수 없어서 미안해. 하지만 나는 너와 있었던 모든 순간들을 기억하고 감사하며, 영원히 너의 마음 속에 남을거야. 그러니 내가 떠난 후에도 너가 꼭 행복했으면 좋겠어. 내가 너를 사랑했던 만큼 너도 행복하길 바라! 사랑해 
`;

  // send data to Server
  const requestWrite = async () => {
    if (isSubmitted) {
      return; // for prevent double click
    }
    setIsSubmitted(true); // lock submit click
    try {
      const response = await fetch(
        "http://reborn.persi0815.site:8080/reborn/reborn/set",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rebornType: isBlack ? "BLACK" : "YELLOW",
          }),
        }
      );
      const data = await response.json();
      if (!data) {
        throw new Error("Something went wrong");
      }
      console.log(data);
      alert("저장되었습니다!");
    } catch (error) {
      setIsSubmitted(false); // release submit click
      console.error(error);
      alert("저장 실패:" + error);
    }
  };

  // call Outro API
  const handleSubmit = async () => {
    if (!isOutroSubmitted) {
      setIsOutroSubmitted(true); // lock double click
      try {
        await requestPostProgress(
          "http://reborn.persi0815.site/reborn/reborn/outro",
          accessToken
        );
        navigate("Outtro");
      } catch (error) {
        setIsOutroSubmitted(false); // release double click
      }
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_living(2).png")}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Text style={textStyles.contentsTextBox}>
          <Text style={{ color: colors.palette.Brown }}>RE</Text>BORN: 나의
          반려동물과 작별하기
        </Text>
        <DogImage source={petImage} resizeMode="center" />

        <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <BlackContainer>
            <QAPopTextBox>
              <TitleText>
                <Text style={{ color: colors.palette.Brown }}>RE</Text>BORN:
                리본 선택하기
              </TitleText>
              <SubText>00이에게 달아줄 리본을 선택하세요</SubText>
              <RebornView>
                <SelectReborn
                  source={ribbon_blackimageURL}
                  text={"검은색 리본"}
                  borderColor={
                    isBlack ? colors.palette.Yellow : colors.palette.Gray400
                  }
                  onPress={() => setIsBlack(true)}
                  petType={myContext.petType}
                />
                <SelectReborn
                  source={ribbon_yellowimageURL}
                  text={"노란색 리본"}
                  borderColor={
                    !isBlack ? colors.palette.Yellow : colors.palette.Gray400
                  }
                  onPress={() => setIsBlack(false)}
                  petType={myContext.petType}
                />
              </RebornView>
              <ToastContainer>
                {showToast ? (
                  <Toast showToast={showToast} message="리본을 선택해주세요" />
                ) : (
                  ""
                )}
              </ToastContainer>
              <ButtonYellow
                text={"리본 달아주기"}
                onPress={() => {
                  requestWrite(), setmodalVisible(false);
                }}
              />
            </QAPopTextBox>
          </BlackContainer>
        </Modal>
        <Modal animationType="fade" visible={letterVisible} transparent={true}>
          <CenteredView>
            <ImageBackground
              source={letterPaperimageURL}
              style={{
                width: "95%",
                height: "98%",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "-15%",
              }}
            >
              <LetterText
                style={{
                  textShadowColor: "white",
                  textShadowOffset: { width: 0.7, height: 0.7 },
                  textShadowRadius: 10,
                }}
              >
                To. 내가 사랑하는 {globalNickname}
              </LetterText>
              <LetterText
                style={{
                  textShadowColor: "white",
                  textShadowOffset: { width: 0.7, height: 0.7 },
                  textShadowRadius: 10,
                }}
              >
                {text}
              </LetterText>
              <LetterText
                style={{
                  textShadowColor: "white",
                  textShadowOffset: { width: 0.7, height: 0.7 },
                  textShadowRadius: 10,
                }}
              >
                From. 영원한 너의 가족 {globalPetName}
              </LetterText>
            </ImageBackground>
            <ButtonYellow
              text={"사랑해"}
              onPress={() => {
                setletterVisible(false), setIsEnd(true);
              }}
            />
          </CenteredView>
        </Modal>

        <RebornImage
          source={isBlack ? ribbon_blackimageURL : ribbon_yellowimageURL}
          resizeMode="center"
          petType={myContext.petType}
        />
        <ButtonBrownBottom
          text={isEnd ? "작별하기" : "편지 열람하기"}
          onPress={() => {
            if (isEnd) {
              handleSubmit();
            } else {
              setletterVisible(true);
            }
          }}
        />
      </ImageBackground>
    </Container>
  );
};

export default SetRebornScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const DogImage = styled.Image`
  width: 50%;
  height: 50%;
  margin: 55% 0% 0% 30%;
`;

const RebornImage = styled.Image`
  width: 15%;
  height: 15%;
  position: absolute;
  margin: ${({ petType }) =>
    petType === "CAT" ? "80% 0% 0% 33%" : "85% 0% 0% 39%"};
`;

const BlackContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-family: "Poppins-Bold";
  margin: 10% 0% 0% 0%;
  text-align: center;
  font-size: 20px;
`;

const SubText = styled.Text`
  font-family: "Poppins-Regular";
  color: ${colors.palette.Gray500};
  text-align: center;
  font-size: 16px;
`;

const RebornText = styled.Text`
  font-family: "Poppins-Regular";
  color: ${colors.palette.Gray500};
  text-align: center;
  font-size: 14px;
`;

const LetterText = styled.Text`
  font-family: "Poppins-Bold";
  padding: 0% 18% 0% 18%;
`;

const QAPopTextBox = styled.View`
  background-color: ${colors.palette.White};
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  height: 50%;
  border-radius: 20px;
  margin: -50% 20% 0% 20%;
  padding: 10px;
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ToastContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  align-items: flex-end;
`;

const RebornContainer = styled.Pressable`
  width: 46%;
  height: 86%;
  margin: 0% 3% 10% 3%;
  border-radius: 10px;
  background-color: ${colors.palette.White};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

const RebornView = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin: 5% 5% 0% 5%;
`;

const SelectReborn = ({ source, text, borderColor, onPress }) => {
  return (
    <RebornContainer
      style={{ borderColor: borderColor }}
      onPress={() => {
        onPress();
      }}
    >
      <Image
        source={source}
        style={{ width: "55%", height: "55%" }}
        resizeMode="contain"
      ></Image>
      <RebornText>{text}</RebornText>
    </RebornContainer>
  );
};
