import React, { useRef, useState, useEffect, useContext } from "react";
import {
  Text,
  ImageBackground,
  Animated,
  PanResponder,
  Easing,
} from "react-native";
import { colors } from "../../../theme";
import { textStyles, ButtonBrownBottom } from "../../../components";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import { useFocusEffect } from "@react-navigation/native";
import { useAccessToken } from "../../../context/AccessTokenContext";
import styled from "styled-components/native";

import AppContext from "./AppContext";

import dogimageURL from "../../../Assets/Images/dog/dog_idle.png";
import catimageURL from "../../../Assets/Images/cat/cat_idle.png";

import dogsnackimageURL from "../../../Assets/Images/dog/dog_snack.png";
import catsnackimageURL from "../../../Assets/Images/cat/cat_snack.png";

import dogsnack_oneimageURL from "../../../Assets/Images/dog/dog_eat_snack1.png";
import dogsnack_twoimageURL from "../../../Assets/Images/dog/dog_eat_snack2.png";

import catsnack_oneimageURL from "../../../Assets/Images/cat/cat_eat_snack1.png";
import catsnack_twoimageURL from "../../../Assets/Images/cat/cat_eat_snack2.png";

const SnackScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const myContext = useContext(AppContext);

  const [snackImage] = useState(
    myContext.petType === "CAT" ? catsnackimageURL : dogsnackimageURL
  );

  const [petImage] = useState(
    myContext.petType === "CAT" ? catimageURL : dogimageURL
  );
  const [animationImageOne] = useState(
    myContext.petType === "CAT" ? catsnack_oneimageURL : dogsnack_oneimageURL
  );
  const [animationImageTwo] = useState(
    myContext.petType === "CAT" ? catsnack_twoimageURL : dogsnack_twoimageURL
  );
  const [isFeed, setisFeed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // refresh
  useFocusEffect(
    React.useCallback(() => {
      setisFeed(false);
      setIsSubmitted(false);
    }, [])
  );

  const destinationMap = {
    2: "Diary",
    3: "Diary",
    4: "Diary",
    5: "Diary",
    6: "Diary",
    7: "Emotion",
    8: "Emotion",
    9: "Emotion",
    10: "Emotion",
    11: "Emotion",
    12: "ImageDiary",
    13: "ImageDiary",
    14: "ImageDiary",
  };

  const getDestination = (day) => {
    return destinationMap[day];
  };

  // Server Link for sending data
  const linkArray = [
    "http://reborn.persi0815.site/reborn/remind/snack",
    "http://reborn.persi0815.site/reborn/reveal/snack",
    "http://reborn.persi0815.site/reborn/remember/snack",
  ];

  // RE:MIND & RE:VEAL & RE:MEMBER& RE:BORN what day? => Post Link
  const handleLink = (day) => {
    if (day >= 2 && day <= 6) {
      return linkArray[0];
    } else if (day >= 7 && day <= 11) {
      return linkArray[1];
    }
    return linkArray[2];
  };

  const handleSubmit = async () => {
    if (!isSubmitted) {
      setIsSubmitted(true); // lock double click
      try {
        await requestPostProgress(
          handleLink(myContext.contentsDay),
          accessToken
        );
        const screen = getDestination(myContext.contentsDay);
        navigate(screen);
      } catch (error) {
        setIsSubmitted(false); // release double click
      }
    }
  };

  return (
    <Container>
      <ImageBackground
        source={require("./../../../Assets/Images/bg/bg_living(3).png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Text style={textStyles.contentsTextBox}>
          충분한 대화 나누기 :{" "}
          <Text style={{ color: colors.palette.Red }}>간식주기</Text>
        </Text>
        <AnimatedDogImage
          isFeed={isFeed}
          petImage={petImage}
          animationImageOne={animationImageOne}
          animationImageTwo={animationImageTwo}
        />
        {isFeed ? (
          ""
        ) : (
          <DraggableImage
            source={snackImage}
            style={{
              width: "50%",
              height: "50%",
              position: "absolute",
              marginLeft: "50%",
            }}
            isFeed={isFeed}
            setisFeed={setisFeed}
          />
        )}
        {myContext.petType === "CAT" && isFeed ? (
          <SnackImage source={catsnackimageURL} resizeMode="center" />
        ) : (
          ""
        )}
        {isFeed ? (
          <ButtonBrownBottom text="거실로 돌아가기" onPress={handleSubmit} />
        ) : (
          ""
        )}
      </ImageBackground>
    </Container>
  );
};

export default SnackScreen;

const AnimatedDogImage = ({
  isFeed,
  petImage,
  animationImageOne,
  animationImageTwo,
}) => {
  const [currentImage, setCurrentImage] = useState(petImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isFeed && !isAnimating) {
      setIsAnimating(true);
      animationRef.current = setInterval(() => {
        setCurrentImage((prevImage) =>
          prevImage === animationImageOne
            ? animationImageTwo
            : animationImageOne
        );
      }, 200); // Change image every 200ms

      setTimeout(() => {
        clearInterval(animationRef.current);
        setCurrentImage(animationImageOne);
        setIsAnimating(false);
      }, 2000); // End animation after 2 seconds
    } else {
      setCurrentImage(petImage);
    }
  }, [isFeed]);

  return <DogImage source={currentImage} resizeMode="center" />;
};

const DraggableImage = ({ source, style, isFeed, setisFeed }) => {
  // Values
  const opacity = useRef(new Animated.Value(1)).current;
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
  const onDropScale = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const onDropOpacity = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        // console.log({ dx, dy });
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dx, dy }) => {
        if (dx > -150 && dy > 200 && dx < -10 && dy < 350) {
          setisFeed(!isFeed);
          Animated.sequence([
            Animated.parallel([onDropScale, onDropOpacity]),
            Animated.timing(position, {
              toValue: 0,
              duration: 50,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          Animated.parallel([onPressOut, goHome]).start();
        }
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

const SnackImage = styled.Image`
  width: 50%;
  height: 45%;
  position: absolute;
  margin: 72% 0% 0% 10%;
`;
