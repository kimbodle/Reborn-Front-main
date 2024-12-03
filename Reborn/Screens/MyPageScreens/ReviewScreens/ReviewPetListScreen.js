import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { colors } from "../../../theme";
import { useAccessToken } from "../../../context/AccessTokenContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewPetListScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get(
        "http://reborn.persi0815.site:8080/mypage/list",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.isSuccess) {
        setPets(response.data.result);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("API 호출 중 에러 발생:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pets.map((pet) => (
        <TouchableOpacity
          key={pet.petId}
          onPress={() =>
            navigate("ReviewStack", {
              screen: "ReviewMain",
              params: { petId: pet.petId },
            })
          }
        >
          <View style={styles.imageTextContainer}>
            <View style={styles.imageContainer}>
              <Image source={require("../../../Assets/icons/expert_box.png")} />
              <Image
                source={require("../../../Assets/icons/ribbon.png")}
                style={styles.ribbonImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.imageText}>{pet.petName}</Text>
                <Text style={styles.font}>{pet.anniversary}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ReviewPetListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    backgroundColor: colors.palette.White,
  },

  imageTextContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.03,
    marginBottom: windowHeight * 0.01,
  },

  imageContainer: {
    position: "relative",
  },

  ribbonImage: {
    position: "absolute",
    width: windowWidth * 0.3,
    height: windowHeight * 0.06,
    resizeMode: "contain",
    marginTop: "9.7%",
  },

  textContainer: {
    position: "absolute",
    marginLeft: windowWidth * 0.25,
    marginTop: windowHeight * 0.03,
  },

  imageText: {
    fontFamily: "Poppins-Bold",
    fontSize: 23,
    textAlign: "left",
    color: colors.palette.BrownDark,
  },

  font: {
    fontSize: 17,
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    color: colors.palette.BrownDark,
  },

  reColor: {
    color: colors.palette.Brown,
  },
});
