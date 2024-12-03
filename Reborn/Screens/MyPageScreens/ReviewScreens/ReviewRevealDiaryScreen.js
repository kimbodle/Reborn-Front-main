import React, { useState, useEffect } from "react";
import { colors } from "../../../theme";
import { View, Text, Image, StyleSheet } from "react-native";

import axios from "axios";
import { useAccessToken } from "../../../context/AccessTokenContext";

const ReviewRevealDiaryScreen = ({ route }) => {
  const { date, id, pickEmotion } = route.params;
  const { accessToken } = useAccessToken();
  const [content, setContent] = useState([]);

  const weatherImages = {
    SUNNY: require("../../../Assets/icons/rediaryimage/sun.png"),
    CLOUDY: require("../../../Assets/icons/rediaryimage/cloud.png"),
    RAINY: require("../../../Assets/icons/rediaryimage/rain.png"),
  };

  useEffect(() => {
    const fetchRevealContent = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/reborn/reveal/view/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data && response.data.result) {
          console.log(response.data);
          setContent(response.data.result.diaryContent);
        }
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${id}`);
      }
    };

    fetchRevealContent();
  }, [id, accessToken]);

  const getImageStyle = (emotion) => {
    return emotion === pickEmotion
      ? styles.weatherImages
      : [styles.weatherImages, styles.grayScale];
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={weatherImages.SUNNY} style={getImageStyle("SUNNY")} />
        <Image source={weatherImages.CLOUDY} style={getImageStyle("CLOUDY")} />
        <Image source={weatherImages.RAINY} style={getImageStyle("RAINY")} />
      </View>
      <Text style={styles.dateText}>DAY {date}</Text>
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "83%",
            borderRadius: 10,
            backgroundColor: colors.palette.Gray200,
          }}
        >
          <Text style={styles.contentText}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewRevealDiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.White,
  },
  textContainer: {
    height: "15%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: "5%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
  },
  weatherImages: {
    width: 80,
    height: 80,
    marginHorizontal: 25,
  },
  grayScale: {
    tintColor: colors.palette.Gray400,
  },
  boldFont: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
  },
  dateText: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: colors.palette.BrownDark,
    textAlign: "left",

    marginLeft: 40,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colors.palette.BrownDark,
    padding: 20,
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
