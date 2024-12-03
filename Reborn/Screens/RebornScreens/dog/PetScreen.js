import React, { useState, useRef, useContext, useEffect } from "react";
import { Text, ImageBackground, Animated, PanResponder } from "react-native";
import { colors } from "../../../theme";
import { ButtonBrownBottom, textStyles } from "../../../components";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

import AppContext from "./AppContext";

import dogimageURL from "../../../Assets/Images/dog/dog_idle.png";
import dog_petOneimageURL from "../../../Assets/Images/dog/dog_hand1.png";
import dog_petTwoimageURL from "../../../Assets/Images/dog/dog_hand2.png";

import catimageURL from "../../../Assets/Images/cat/cat_idle.png";
import cat_petOneimageURL from "../../../Assets/Images/cat/cat_hand1.png";
import cat_petTwoimageURL from "../../../Assets/Images/cat/cat_hand2.png";

import handimageURL from "../../../Assets/stuffs/hand.png";

import { useAccessToken } from "../../../context/AccessTokenContext";

const PetScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const myContext = useContext(AppContext);

  const [countPet, setCountPet] = useState(0);
  const [isPet, setIsPet] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [petImageIdle] = useState(
    myContext.petType === "CAT" ? catimageURL : dogimageURL
  );
  const [animationImage, setAnimationImage] = useState(
    myContext.petType === "CAT" ? cat_petOneimageURL : dog_petOneimageURL
  );
  const [animationToggle, setAnimationToggle] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Server Link for sending data
  const linkArray = [
    "http://reborn.persi0815.site/reborn/remind/pat",
    "http://reborn.persi0815.site/reborn/reveal/pat",
    "http://reborn.persi0815.site/reborn/remember/pat",
    "http://reborn.persi0815.site/reborn/reborn/pat",
  ];

  // refresh
  useFocusEffect(
    React.useCallback(() => {
      setCountPet(0);
      setIsPet(false);
      setIsFinish(false);
      setAnimationToggle(false);
      setIsSubmitted(false);
    }, [])
  );

  useEffect(() => {
    if (isPet) {
      const intervalId = setInterval(() => {
        setAnimationToggle((prev) => !prev);
      }, 300);

      return () => clearInterval(intervalId);
    }
  }, [isPet]);

  useEffect(() => {
    if (isPet) {
      if (animationToggle) {
        setAnimationImage(
          myContext.petType === "CAT" ? cat_petOneimageURL : dog_petOneimageURL
        );
      } else {
        setAnimationImage(
          myContext.petType === "CAT" ? cat_petTwoimageURL : dog_petTwoimageURL
        );
      }

      if (countPet >= 2) {
        setIsFinish(true);
      } else {
        setCountPet(countPet + 1);
      }
    }
  }, [animationToggle]);

  // RE:MIND & RE:VEAL & RE:MEMBER& RE:BORN what day? => Post Link
  const handleLink = (day) => {
    if (day >= 2 && day <= 6) {
      return linkArray[0];
    } else if (day >= 7 && day <= 11) {
      return linkArray[1];
    } else if (day >= 12 && day <= 14) {
      return linkArray[2];
    }
    return linkArray[3];
  };

  const handleSubmit = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true); // lock double click
      try {
        await requestPostProgress(
          handleLink(myContext.contentsDay),
          accessToken
        );
        navigate("Feed");
      } catch (error) {
        setIsSubmitted(false); // release double click
      }
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_living(1).png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Text style={textStyles.contentsTextBox}>
          충분한 대화 나누기 :{" "}
          <Text style={{ color: colors.palette.Red }}>쓰다듬기</Text>
        </Text>
        <DogImage
          source={isPet ? animationImage : petImageIdle}
          resizeMode="center"
        />
        <DraggableImage
          source={handimageURL}
          style={{
            width: "50%",
            height: "50%",
            position: "absolute",
            marginLeft: "50%",
          }}
          setIsPet={setIsPet}
        />
        {isFinish ? (
          <ButtonBrownBottom text="밥주러 가기" onPress={handleSubmit} />
        ) : (
          ""
        )}
      </ImageBackground>
    </Container>
  );
};

export default PetScreen;

const DraggableImage = ({ source, style, setIsPet }) => {
  // Values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goHome = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        if (dx > -120 && dy > 180 && dx < 25 && dy < 400) {
          setIsPet(true);
        } else {
          setIsPet(false);
          Animated.parallel([onPressOut, goHome]).start();
        }
        // console.log({ dx, dy });
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: () => {
        onPressOut.start(() => {
          setIsPet(false);
          goHome.start();
        });
      },
    })
  ).current;

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={source}
      style={[
        style,
        {
          transform: [...position.getTranslateTransform(), { scale }],
        },
      ]}
      resizeMode="center"
    />
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${colors.palette.White};
`;

const DogImage = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 30%;
  margin-top: 55%;
`;
