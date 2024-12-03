import React, { useState, useEffect, useRef } from "react";
import { Text, ImageBackground, Animated, Easing } from "react-native";
import { colors } from "../../../theme";
import {
  textStyles,
  TutorialModal,
  ButtonBrownBottom,
} from "../../../components";
import styled from "styled-components/native";

import dogIdleImageURL from "../../../Assets/Images/dog/dog_idle.png";
import dogWalkOneImageURL from "../../../Assets/Images/dog/dog_walk1.png";
import dogWalkTwoImageURL from "../../../Assets/Images/dog/dog_walk2.png";

import bgImageURL from "../../../Assets/Images/bg/bg_park.png";

import { Pedometer } from "expo-sensors";

const WalkScreen = ({ navigation: { navigate } }) => {
  const ModalText = `휴대전화를 들고 걸어보세요.\n반려동물과 같이 산책했던 곳을 걸어보아도 좋고,\n여건이 안 된다면 집 안에서 움직여도 좋습니다.\n\n만보기의 숫자가 50이 되면 다음 단계로 넘어갑니다.`;
  const maxMoveDistance = 112.2; // max distance to move per step count update

  const [currentImage, setCurrentImage] = useState(dogIdleImageURL);
  const [modalVisible, setModalVisible] = useState(true);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [countTouch, setCountTouch] = useState(0); // for emulator
  const [isWalkOne, setIsWalkOne] = useState(true); // flag to alternate images

  const [translateX] = useState(new Animated.Value(-300)); // initialize position, for emulator set -300 / for phone set -267

  const AnimatedBGImage = Animated.createAnimatedComponent(ImageBackground);
  const inactivityTimer = useRef(null);

  const moveBackground = (stepsDifference) => {
    const moveDistance = Math.min(
      stepsDifference * maxMoveDistance,
      maxMoveDistance
    );

    const nextPosition = translateX._value - moveDistance;

    if (countTouch === 1) {
      navigate("WalkFinish");
    } else if (Math.abs(nextPosition) >= 1417) {
      translateX.setValue(-300);
      Animated.timing(translateX, {
        toValue: -379.2,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    } else {
      // Alternate the dog walking images
      setCurrentImage(isWalkOne ? dogWalkOneImageURL : dogWalkTwoImageURL);
      setIsWalkOne(!isWalkOne);
      Animated.timing(translateX, {
        toValue: nextPosition,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.ease,
      }).start();
    }
  };

  useEffect(() => {
    let subscription;
    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();

      if (isAvailable) {
        subscription = Pedometer.watchStepCount((result) => {
          const stepsDifference = result.steps - currentStepCount;
          if (stepsDifference > 0) {
            setCurrentStepCount(result.steps);
            if (stepsDifference >= 1) {
              moveBackground(stepsDifference);
            }
            if (result.steps >= 15) {
              navigate("WalkFinish");
            }
          }
        });
      }
    };

    subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
      }
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [currentStepCount]);

  return (
    <Container>
      <AnimatedBGImage
        style={{
          width: 2012,
          height: "100%",
          position: "absolute",
          transform: [{ translateX }],
        }}
        resizeMode="contain"
        source={bgImageURL}
      />
      <Text style={textStyles.contentsTextBox}>
        충분한 대화 나누기 :{" "}
        <Text style={{ color: colors.palette.Red }}>산책하기</Text>
      </Text>
      <TutorialModal
        text={ModalText}
        modalVisible={modalVisible}
        onPress={() => {
          setModalVisible(!modalVisible);
          moveBackground(1);
        }}
      ></TutorialModal>
      <DogImage source={currentImage} resizeMode="center" />
      <ButtonBrownBottom
        text={`걸음 수: ${currentStepCount} / 50`}
        onPress={() => {
          moveBackground(1);
          setCountTouch(countTouch + 1);
        }}
      />
    </Container>
  );
};

export default WalkScreen;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const DogImage = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 30%;
  margin-top: 50%;
`;
