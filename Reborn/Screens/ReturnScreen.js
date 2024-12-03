import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import axios from "axios";
import { colors } from "../theme";

const ReturnScreen = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAIResponse = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      role: "user",
      content: inputText,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setIsLoading(true);

    const loadingMessage = {
      role: "bot",
      content: "요청 내용을 확인했어요! 답변을 준비해볼게요!",
    };

    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    try {
      const response = await axios.post("http://13.124.4.242:5000", {
        message: inputText,
      });

      const botResponse = {
        role: "bot",
        content: response.data,
      };

      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? botResponse : msg
        )
      );
    } catch (error) {
      console.error("응답 가져오기 실패: ", error.message);
      const errorMessage = {
        role: "system",
        content: "error",
      };
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 ? errorMessage : msg
        )
      );
    }
    setIsLoading(false);
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={msg.role === "user" ? styles.userMessage : styles.botMessage}
          >
            {msg.role === "bot" && (
              <View style={styles.botProfilePicContainer}>
                <Image
                  source={require("../Assets/icons/return.png")}
                  style={styles.botProfilePic}
                />
              </View>
            )}
            <Text style={styles.messageText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메시지를 입력하세요!"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={fetchAIResponse}
          />
          <TouchableOpacity style={styles.sendButton} onPress={fetchAIResponse}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: colors.palette.BrownDark,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#E0EDC2",
    marginBottom: 15,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: colors.palette.BrownDark,
  },
  sendButton: {
    backgroundColor: colors.palette.Yellow,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  botProfilePicContainer: {
    position: "absolute",
    top: -30,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2,
    overflow: "hidden",
  },
  botProfilePic: {
    width: "100%",
    height: "100%",
  },
});

export default ReturnScreen;
