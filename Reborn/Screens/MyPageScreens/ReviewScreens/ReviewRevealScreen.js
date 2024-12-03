import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { colors } from "../../../theme";
import { useAccessToken } from "../../../context/AccessTokenContext";
import axios from "axios";
import RevealDiaryItem from "../../../components/RevealDiaryItem";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewRevealScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { accessToken } = useAccessToken();
  const [revealData, setRevealData] = useState([]);

  useEffect(() => {
    const fetchReveal = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/reveal/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data && response.data.result) {
          const mappedData = response.data.result.map((item) => ({
            date: item.date,
            id: item.id,
            pickEmotion: item.pickEmotion,
            resultEmotion: item.resultEmotion,
          }));
          setRevealData(mappedData);
        }
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchReveal();
  }, [petId]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldFont}>
          <Text style={styles.reColor}>RE</Text>VEAL:
        </Text>
        <Text style={styles.normalFont}>나의 감정 들여다보기</Text>
      </View>
      <View style={{ paddingHorizontal: windowWidth * 0.07, flex: 1 }}>
        <FlatList
          data={revealData}
          renderItem={({ item }) => (
            <RevealDiaryItem
              date={item.date}
              id={item.id}
              pickEmotion={item.pickEmotion}
              resultEmotion={item.resultEmotion}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
export default ReviewRevealScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.White,
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
