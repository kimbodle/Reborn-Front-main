import React from "react";
import { TouchableOpacity, Dimensions } from "react-native";
import { colors } from "../theme";
import styled from "styled-components/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RememberDiaryItem = ({ date, id, rememberImage, title, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ReviewStack", {
          screen: "ReviewRememberDiary",
          params: {
            date,
            id,
            rememberImage,
            title,
          },
        })
      }
    >
      <ItemContainer>
        <StyledImage source={{ uri: rememberImage }}>
          <WhiteContainer></WhiteContainer>
          <DayText>DAY {date}</DayText>
          <TitleText>{title}</TitleText>
        </StyledImage>
      </ItemContainer>
    </TouchableOpacity>
  );
};

const StyledImage = styled.ImageBackground`
  width: ${windowWidth * 0.9}px;
  height: ${windowHeight * 0.3}px;
  margin-bottom: 6px;
  border-radius: 10px;
  justify-content: flex-end;
  overflow: hidden;
`;

const ItemContainer = styled.View`
  width: 100%;
  height: ${windowHeight * 0.35}px;
`;

const WhiteContainer = styled.View`
  background-color: ${colors.palette.White};
  border-radius: 10px;
  opacity: 0.7;
  width: 100%;
  height: ${windowHeight * 0.12}px;
  position: absolute;
  justify-content: flex-end;
`;

const DayText = styled.Text`
  font-family: "Poppins-ExtraBold";
  font-size: 24px;
  color: ${colors.palette.Brown};
  margin: 0% 0% -2% 4%;
`;

const TitleText = styled.Text`
  font-family: "Poppins-ExtraBold";
  font-size: 22px;
  color: ${colors.palette.BrownDark};
  margin: 0% 0% 1% 4%;
`;

export default RememberDiaryItem;
