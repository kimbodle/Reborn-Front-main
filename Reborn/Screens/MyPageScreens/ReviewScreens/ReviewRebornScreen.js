import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { colors } from "../../../theme";
import styled from "styled-components/native";
import { ButtonYellow } from "../../../components";
import letterPaperimageURL from "../../../Assets/stuffs/letterPaper.png";
import {
  useAccessToken,
  useGlobalNickname,
} from "../../../context/AccessTokenContext";
import axios from "axios";

import dogYellowImage from "../../../Assets/Images/dog/dog_cloth_ribbon_yellow.png";
import dogBlackImage from "../../../Assets/Images/dog/dog_cloth_ribbon_black.png";
import catYellowImage from "../../../Assets/Images/cat/cat_cloth_yellow.png";
import catBlackImage from "../../../Assets/Images/cat/cat_cloth_black.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewRebornScreen = ({ route }) => {
  const { globalNickname } = useGlobalNickname();
  const { petId } = route.params;
  const { accessToken } = useAccessToken();
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [rebornShape, setRebornShape] = useState("");
  const [Reborn, setReborn] = useState(null);

  const text = `
  안녕? 나의 생애에서 가장 소중하고 특별한존재인 너에게 이 편지를 남기려고 해. 
  우리가 처음 만났을 때의 설레는 순간, 나의 작은 몸으로 너에게 다가갔던 모습이 기억에 남아있어. 너의 따뜻한 손길, 미소, 그 모든 순간들이 내 삶을 행복하게 만들었어. 
  내가 힘들거나 아플 때도 너가 내 곁에 있어주면서 나를 위로해 주어서 정말 고마워. 
  더 이상 함께할 수 없어서 미안해. 하지만 나는 너와 있었던 모든 순간들을 기억하고 감사하며, 영원히 너의 마음 속에 남을거야. 그러니 내가 떠난 후에도 너가 꼭 행복했으면 좋겠어. 내가 너를 사랑했던 만큼 너도 행복하길 바라! 사랑해 
`;
  useEffect(() => {
    const fetchReborn = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/reborn/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = response.data.result;
        setReborn(result);
        setName(result.petName);
        setAnimalType(result.petType);
        setRebornShape(result.rebornType);
        console.log(response.data.result);
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchReborn();
  }, [petId]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldFont}>
          <Text style={styles.reColor}>RE</Text>BORN:
        </Text>
        <Text style={styles.normalFont}>나의 반려동물과 작별하기</Text>
      </View>
      <ImageBackground
        source={require("../../../Assets/Images/bg/bg_blossom.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.letterButton}
        >
          <Image
            source={require("../../../Assets/icons/letter.png")}
            style={styles.letterImage}
          />
        </TouchableOpacity>

        {animalType === "DOG" && rebornShape === "YELLOW" && (
          <Image
            source={dogYellowImage}
            style={styles.overlayImage}
            resizeMode="center"
          />
        )}
        {animalType === "DOG" && rebornShape === "BLACK" && (
          <Image
            source={dogBlackImage}
            style={styles.overlayImage}
            resizeMode="center"
          />
        )}
        {animalType === "CAT" && rebornShape === "YELLOW" && (
          <Image
            source={catYellowImage}
            style={styles.overlayImage}
            resizeMode="center"
          />
        )}
        {animalType === "CAT" && rebornShape === "BLACK" && (
          <Image
            source={catBlackImage}
            style={styles.overlayImage}
            resizeMode="center"
          />
        )}
      </ImageBackground>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <CenteredView>
          <ImageBackground
            source={letterPaperimageURL}
            style={styles.modalImageBackground}
          >
            <LetterText style={styles.letterText}>
              To. 내가 사랑하는 {globalNickname}
            </LetterText>
            <LetterText style={styles.letterText}>{text}</LetterText>
            <LetterText style={styles.letterText}>
              From. 영원한 너의 가족 {name}
            </LetterText>
          </ImageBackground>
          <ButtonYellow
            text={"사랑해"}
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </CenteredView>
      </Modal>
    </View>
  );
};

export default ReviewRebornScreen;

const LetterText = styled.Text`
  font-family: "Poppins-Bold";
  padding: 0% 18% 0% 18%;
`;
const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.White,
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlayImage: {
    marginTop: windowHeight * 0.3,
  },

  textContainer: {
    height: windowHeight * 0.15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: windowWidth * 0.05,
  },

  boldFont: {
    fontSize: windowWidth * 0.06,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
  },

  normalFont: {
    fontSize: windowWidth * 0.04,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
  },

  reColor: {
    color: colors.palette.Brown,
  },

  letterButton: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.107,
    top: windowHeight * 0.25,
    left: windowWidth * 0.3,
  },

  letterImage: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
  },

  modalImageBackground: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.98,
    justifyContent: "center",
    alignContent: "center",
    marginBottom: windowHeight * -0.1,
  },

  letterText: {
    textShadowColor: "white",
    textShadowOffset: { width: 0.7, height: 0.7 },
    textShadowRadius: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.15,
  },

  modalView: {
    margin: windowWidth * 0.05,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: colors.palette.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },

  button: {
    paddingHorizontal: windowWidth * 0.06,
    top: windowHeight * 0.03,
    left: windowWidth * 0.35,
  },

  textStyle: {
    color: "white",
    fontFamily: "Poppins-Bold",
    fontSize: windowWidth * 0.04,
    textAlign: "center",
  },
  modalText: {
    marginBottom: windowHeight * 0.1,
    fontFamily: "Poppins-Bold",
    fontSize: windowWidth * 0.04,
  },
});
