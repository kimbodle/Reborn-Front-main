import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { colors } from "../../../theme";
import { useAccessToken } from "../../../context/AccessTokenContext";
import axios from "axios";
import dogImage from "../../../Assets/Images/dog/dog_profile.jpg";
import catImage from "../../../Assets/Images/cat/cat_profile.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ChatBubble = ({ text, isMe, petType }) => {
  const profileImage = petType === "DOG" ? dogImage : catImage;
  return (
    <View>
      {!isMe && (
        <View style={[styles.profileImageContainer]}>
          <Image source={profileImage} style={styles.smallProfileImage} />
        </View>
      )}
      <View
        style={
          isMe ? styles.rightMessageContainer : styles.leftMessageContainer
        }
      >
        <View style={[isMe ? styles.rightBubble : styles.leftBubble]}>
          <Text style={styles.bubbleText}>{text}</Text>
        </View>
      </View>
    </View>
  );
};

const ReviewRemindScreen = ({ route }) => {
  const { petId } = route.params;
  const { accessToken } = useAccessToken();
  const [messages, setMessages] = useState([]);
  const [petType, setPetType] = useState("DOG");

  useEffect(() => {
    const fetchRemind = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/remind/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = response.data.result;

        if (result.length > 0) {
          setPetType(result[0].petType);
        }

        const updatedMessages = result.flatMap((entry, index) => [
          { id: index * 2 + 1, text: entry.question, sender: "pet" },
          { id: index * 2 + 2, text: entry.answer, sender: "me" },
        ]);

        setMessages(updatedMessages);
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchRemind();
  }, [petId, accessToken]);

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={styles.boldFont}>
          <Text style={styles.reColor}>RE</Text>MIND:
        </Text>
        <Text style={styles.normalFont}>충분한 대화 나누기</Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            text={msg.text}
            isMe={msg.sender === "me"}
            petType={petType}
          />
        ))}
      </ScrollView>
    </>
  );
};
export default ReviewRemindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    height: windowHeight * 0.15,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: windowWidth * 0.05,
    backgroundColor: colors.palette.White,
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

  contentContainer: {
    paddingHorizontal: windowWidth * 0.025,
    paddingVertical: windowHeight * 0.015,
  },
  profileImageContainer: {
    marginBottom: -30,
    zIndex: 1,
  },
  leftMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: windowHeight * 0.03,
  },
  rightMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  smallProfileImage: {
    width: windowWidth * 0.17,
    height: windowHeight * 0.09,
    borderRadius: 40,
    borderColor: colors.palette.White,
    borderWidth: 2,
    marginLeft: windowWidth * 0.01,
  },

  leftBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
    marginLeft: windowWidth * 0.01,
  },
  rightBubble: {
    backgroundColor: "#E0EDC2",
    alignSelf: "flex-end",
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
    marginRight: 5,
  },
  bubbleText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colors.palette.BrownDark,
  },
});
