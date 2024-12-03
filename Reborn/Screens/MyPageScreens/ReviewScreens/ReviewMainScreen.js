import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../../theme/colors";
import axios from "axios";
import { useAccessToken } from "../../../context/AccessTokenContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ReviewMainScreen = ({ navigation, route }) => {
  const { petId } = route.params;
  const { accessToken } = useAccessToken();
  const [showRemind, setShowRemind] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showRemember, setShowRemember] = useState(false);
  const [showReborn, setShowReborn] = useState(false);

  const fetchData = async (type, setShow) => {
    try {
      const response = await axios.get(
        `http://reborn.persi0815.site:8080/mypage/${type}/check/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.result === true) {
        setShow(true);
      }
    } catch (error) {
      console.error(`API 요청 중 오류 발생: ${type}`, error);
    }
  };

  useEffect(() => {
    fetchData("remind", setShowRemind);
    fetchData("reveal", setShowReveal);
    fetchData("remember", setShowRemember);
    fetchData("reborn", setShowReborn);
  }, [petId]);

  return (
    <View style={{ backgroundColor: colors.palette.White, flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ReviewStack", {
              screen: "ReviewReconnect",
              params: { petId },
            })
          }
        >
          <View style={styles.imageTextContainer}>
            <Image source={require("../../../Assets/icons/review_album.png")} />
            <Text style={styles.imageText}>
              <Text style={styles.reColor}>RE</Text>CONNECT:
            </Text>
            <Text style={styles.font}>나의 반려동물과 만나기</Text>
          </View>
        </TouchableOpacity>
        {showRemind && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewStack", {
                screen: "ReviewRemind",
                params: { petId },
              })
            }
          >
            <View style={styles.imageTextContainer}>
              <Image
                source={require("../../../Assets/icons/review_album.png")}
              />
              <Text style={styles.imageText}>
                <Text style={styles.reColor}>RE</Text>MIND:
              </Text>
              <Text style={styles.font}>충분한 대화 나누기</Text>
            </View>
          </TouchableOpacity>
        )}
        {showReveal && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewStack", {
                screen: "ReviewReveal",
                params: { petId },
              })
            }
          >
            <View style={styles.imageTextContainer}>
              <Image
                source={require("../../../Assets/icons/review_album.png")}
              />
              <Text style={styles.imageText}>
                <Text style={styles.reColor}>RE</Text>VEAL:
              </Text>
              <Text style={styles.font}>나의 감정 들여다보기</Text>
            </View>
          </TouchableOpacity>
        )}
        {showRemember && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewStack", {
                screen: "ReviewRemember",
                params: { petId },
              })
            }
          >
            <View style={styles.imageTextContainer}>
              <Image
                source={require("../../../Assets/icons/review_album.png")}
              />
              <Text style={styles.imageText}>
                <Text style={styles.reColor}>RE</Text>MEMBER:
              </Text>
              <Text style={styles.font}>건강한 작별 준비하기</Text>
            </View>
          </TouchableOpacity>
        )}
        {showReborn && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReviewStack", {
                screen: "ReviewReborn",
                params: { petId },
              })
            }
          >
            <View style={styles.imageTextContainer}>
              <Image
                source={require("../../../Assets/icons/review_album.png")}
              />
              <Text style={styles.imageText}>
                <Text style={styles.reColor}>RE</Text>BORN:
              </Text>
              <Text style={styles.font}>나의 반려동물과 작별하기</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewMainScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.palette.White,
  },

  imageTextContainer: {
    position: "relative",
    alignItems: "center",
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.02,
  },

  imageText: {
    position: "absolute",
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    marginTop: windowHeight * 0.02,
    marginLeft: windowWidth * 0.05,
    textAlign: "left",
    left: 0,
    color: colors.palette.BrownDark,
  },

  font: {
    position: "absolute",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginTop: windowHeight * 0.07,
    marginLeft: windowWidth * 0.05,
    textAlign: "left",
    color: colors.palette.BrownDark,
    left: 0,
  },

  reColor: {
    color: colors.palette.Brown,
  },
});
