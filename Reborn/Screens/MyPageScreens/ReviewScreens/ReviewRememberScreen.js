import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { colors } from "../../../theme";
import axios from "axios";
import { useAccessToken } from "../../../context/AccessTokenContext";
import RememberDiaryItem from "../../../components/RememberDiaryItem";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewRememberScreen = ({ route, navigation }) => {
  const { petId } = route.params;
  const { accessToken } = useAccessToken();
  const [rememberData, setRememberData] = useState([]);

  useEffect(() => {
    const fetchRemember = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/remember/${petId}`,
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
            rememberImage: item.rememberImage,
            title: item.title,
          }));

          setRememberData(mappedData);
        }
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchRemember();
  }, [petId]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.boldFont}>
          <Text style={styles.reColor}>RE</Text>MEMBER:
        </Text>
        <Text style={styles.normalFont}>건강한 작별 준비하기</Text>
      </View>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <FlatList
          data={rememberData}
          renderItem={({ item }) => (
            <RememberDiaryItem
              date={item.date}
              id={item.id}
              rememberImage={item.rememberImage}
              title={item.title}
              navigation={navigation}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ReviewRememberScreen;

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
