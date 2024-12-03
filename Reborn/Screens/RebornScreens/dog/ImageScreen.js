import React, { useState } from "react";
import styled from "styled-components/native";
import { colors } from "../../../theme";
import { GrayLine, CompleteButton, Toast } from "../../../components";
import { ImageBackground, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import { useAccessToken } from "../../../context/AccessTokenContext";

import imagePickerImage from "../../../Assets/icons/icon_imagePicker.png";

const ImageScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");
  const [title, onChangeTitle] = React.useState("");
  const [contents, onChangeContents] = React.useState(""); // contents
  const [showToast, setShowToast] = useState(false);

  const [imageFile, setImageFile] = useState(""); // image
  const [uploadedImage, setUploadedImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // is answer writed -> toast
  const CheckWrited = async () => {
    if (!date || !title || !contents || !isImageUploaded) {
      setShowToast(true);
    } else {
      setShowToast(false);
      requestWrite();
      navigate("Clean");
    }
  };

  // refresh
  useFocusEffect(
    React.useCallback(() => {
      setIsImageUploaded(false);
      setDate("");
      onChangeTitle("");
      onChangeContents("");
      setImageFile("");
      setUploadedImage("");
      setIsSubmitted(false);
    }, [])
  );

  // For picking date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(date.toLocaleDateString("ko-KR", options));
    hideDatePicker();
  };

  // get Image
  const Gallery = () => {
    launchImageLibrary(
      {
        madiaType: "photo",
        includeBase64: true,
      },
      (response) => {
        //console.log(response.fileName);
        if (response.didCancel) {
          return;
        } else if (response.errorCode) {
          console.log("Image Error : " + response.errorCode);
        }
        setIsImageUploaded(true); // image upload success
        const source = { uri: response.assets[0].uri };
        setImageFile(source); // store image
        setUploadedImage(response.assets[0].base64);
      }
    );
  };

  // send Data to Server
  const requestWrite = async () => {
    if (isSubmitted) {
      return; // for prevent double click
    }
    setIsSubmitted(true); // lock submit click
    const formData = new FormData();
    const jsonData = JSON.stringify({
      title: title,
      content: contents,
      imageDate: date,
    });
    formData.append("data", jsonData);

    console.log(imageFile.uri);
    if (imageFile && imageFile.uri) {
      formData.append("remember", {
        uri: imageFile.uri,
        type: "image/jpeg",
        name: "remember.jpg",
      });
    }
    try {
      const response = await fetch(
        "http://reborn.persi0815.site/reborn/remember/write",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const jsonResponse = await response.json();
      console.log("Post response:", jsonResponse);
    } catch (error) {
      setIsSubmitted(false); // release submit click
      console.error("Post content error:", error);
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/paper.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <PickDate
          onPress={() => {
            showDatePicker();
          }}
        >
          <DateText>{date || "사진 찍은 날짜를 선택하세요"}</DateText>
        </PickDate>
        <GrayLine />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <KeyboardAvoidingView
          style={{ width: "100%", height: "10%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TitleText
            keyboardType="default"
            placeholder="제목을 입력하세요"
            onChangeText={onChangeTitle}
            value={title}
          ></TitleText>
        </KeyboardAvoidingView>
        <ImagePicker
          onPress={Gallery}
          source={isImageUploaded ? uploadedImage : imagePickerImage}
          isImageUploaded={isImageUploaded}
        ></ImagePicker>
        <TextContainer>
          <GrayLine />
          <ContentsText
            keyboardType="default"
            placeholder="내용을 입력하세요"
            multiline={true}
            style={{ textAlignVertical: "top" }}
            onChangeText={onChangeContents}
            value={contents}
          ></ContentsText>
        </TextContainer>
        <ToastContainer>
          {showToast ? (
            <Toast showToast={showToast} message="일기를 작성해주세요" />
          ) : (
            ""
          )}
        </ToastContainer>
        <CompleteButton
          text="저장하기"
          onPress={() => {
            CheckWrited();
          }}
        />
      </ImageBackground>
    </Container>
  );
};

export default ImageScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const ImagePickerContainer = styled.Pressable`
  height: 32%;
  margin: 0% 2% 0% 2%;
  align-items: center;
  justify-content: center;
`;

const ImageIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const PickDate = styled.Pressable`
  background: ${colors.palette.Gray200};
  opacity: 0.7;
  padding: 2%;
  margin: 2% 20% 2% 20%;
  height: 8%;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.View`
  flex: 1;
  margin: 2%;
`;

const ToastContainer = styled.View`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  align-items: flex-end;
`;

const DateText = styled.Text`
  font-family: "caligraphy";
  font-size: 30px;
`;

const TitleText = styled.TextInput`
  font-family: "Poppins-Bold";
  font-size: 26px;
  width: 100%;
  height: 100%;
  margin: 0% 5% 0% 5%;
`;

const ContentsText = styled.TextInput`
  flex: 1;
  font-family: "Poppins-Regular";
  font-size: 20px;
  width: 90%;
  margin: 2% 5% 0% 5%;
`;

const ImagePicker = ({ onPress, source, isImageUploaded }) => {
  const imageSource = isImageUploaded
    ? { uri: `data:image/jpeg;base64,${source}` }
    : source;
  return (
    <ImagePickerContainer onPress={onPress}>
      <ImageIcon source={imageSource} resizeMode="cover"></ImageIcon>
    </ImagePickerContainer>
  );
};
