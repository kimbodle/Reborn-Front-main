import React from "react";
import styled from "styled-components/native";
import { colors } from "../theme";
import { Modal, Text } from "react-native";

export const PopTextBox = styled.Pressable`
  //position: 'absolute';
  background-color: ${colors.palette.White};
  justify-content: center;
  width: 70%;
  border-radius: 20px;
  margin: 0% 20% 0% 20%;
  padding: 5% 5% 5% 5%;
`;

export const BlackContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const TutorialModal = ({text, modalVisible, onPress}) => {
    return (
        <Modal animationType="fade" visible={modalVisible} transparent={true}>
          <BlackContainer>
            <PopTextBox onPress={onPress}>
              <Text style={{ textAlign: "center" }}>{text}</Text>
            </PopTextBox>
          </BlackContainer>
        </Modal>
    );
};

