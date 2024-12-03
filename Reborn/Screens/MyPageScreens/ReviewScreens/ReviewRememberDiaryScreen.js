import React, { useState, useEffect } from "react";
import { colors } from "../../../theme";
import styled from "styled-components/native";
import { GrayLine } from "../../../components";
import { Image, ImageBackground } from "react-native";
import axios from "axios";
import { useAccessToken } from "../../../context/AccessTokenContext";
import imagePickerImage from "../../../Assets/icons/icon_imagePicker.png";

const ReviewRememberDiaryScreen = ({ route }) => {
  const { id } = route.params;
  const { accessToken } = useAccessToken();
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [imageDate, setImageDate] = useState([]);
  const [rememberImage, setRememberImage] = useState("");

  useEffect(() => {
    const fetchRememberDiary = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/reborn/remember/view/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.data && response.data.result) {
          console.log(response.data.result);
          setTitle(response.data.result.title);
          setContent(response.data.result.content);
          setImageDate(response.data.result.imageDate);
          setRememberImage(response.data.result.rememberImage);
        }
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${id}`);
      }
    };

    fetchRememberDiary();
  }, [id, accessToken]);

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/paper.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <DateText>{imageDate}</DateText>

        <GrayLine />

        <TitleText>{title}</TitleText>
        <Image
          source={rememberImage ? { uri: rememberImage } : imagePickerImage}
          style={{
            marginLeft: 11,
            width: "95%",
            height: "32%",
            marginBottom: 5,
          }}
        ></Image>
        <TextContainer>
          <GrayLine />
          <ContentsText multiline={true} style={{ textAlignVertical: "top" }}>
            {content}
          </ContentsText>
        </TextContainer>
      </ImageBackground>
    </Container>
  );
};

export default ReviewRememberDiaryScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const TextContainer = styled.View`
  flex: 1;
  margin: 2%;
  width: 100%;
  background-color: "black";
`;

const DateText = styled.Text`
  font-family: "caligraphy";
  color: ${colors.palette.BrownDark};
  font-size: 32px;
  text-align: center;
  margin: 2% 0% 2% 0%;
`;

const TitleText = styled.Text`
  font-family: "caligraphy";
  color: ${colors.palette.BrownDark};
  font-size: 30px;
  margin: 3% 5% 3% 5%;
`;

const ContentsText = styled.Text`
  font-family: "caligraphy";
  color: ${colors.palette.BrownDark};
  font-size: 26px;
  margin: 3% 5% 0% 5%;
`;
