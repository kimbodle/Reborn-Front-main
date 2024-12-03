import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../theme";
import styled from "styled-components/native";

export const ViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  greyBox: {
    width: "85%",
    height: 500,
    backgroundColor: colors.palette.Gray200,
    marginTop: "15%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const GrayLine = styled.View`
  width: 90%;
  height: 1px;
  margin: 0% 2% 0% 2%;
  align-self: center;
  background-color: ${colors.palette.Gray300};
`;

export const RadioButton = ({ isSelected, onPress, image }) => {
  return (
    <Icon onPress={onPress}>
      <Image
        source={image}
        style={{
          width: 100,
          height: 100,
          tintColor: isSelected ? colors.palette.Brown : colors.palette.Gray400,
        }}
      />
    </Icon>
  );
};

const Icon = styled.Pressable`
  width: 110px;
  height: 110px;
  margin: 4% 2% 0% 2%;
  justify-content: center;
  align-items: center;
`;
