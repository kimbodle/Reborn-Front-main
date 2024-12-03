import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { colors } from "../../../theme";
import { useAccessToken } from "../../../context/AccessTokenContext";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewReconnectScreen = ({ route }) => {
  const { petId } = route.params;
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [breed, setBreed] = useState("");
  const [animalType, setAnimalType] = useState(null);
  const [color, setColor] = useState("");
  const [petInfo, setPetInifo] = useState(null);
  const { accessToken } = useAccessToken();

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/list/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = response.data.result;
        setPetInifo(result);
        setName(result.petName);
        setDate(result.anniversary);
        setAnimalType(result.petType);
        setBreed(result.detailPetType);
        setColor(result.petColor);
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchPetInfo();
  }, [petId]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldFont}>
          <Text style={styles.reColor}>RE</Text>CONNECT:
        </Text>
        <Text style={styles.normalFont}>나의 반려동물과 만나기</Text>
      </View>
      <ImageBackground
        source={require("../../../Assets/Images/bg/bg_blossom.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Image
          source={
            animalType === "DOG"
              ? require("../../../Assets/Images/dog/dog_idle.png")
              : require("../../../Assets/Images/cat/cat_idle.png")
          }
          style={styles.overlayImage}
          resizeMode="center"
        />
      </ImageBackground>
    </View>
  );
};

export default ReviewReconnectScreen;

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
    marginTop: windowHeight * 0.4,
  },

  textContainer: {
    height: windowHeight * 0.15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: windowWidth * 0.05,
  },

  boldFont: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
  },

  normalFont: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
  },

  reColor: {
    color: colors.palette.Brown,
  },
});
