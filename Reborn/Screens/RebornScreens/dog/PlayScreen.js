import React, { useState, useRef, useContext, useEffect } from "react";
import { Text, ImageBackground, Animated, PanResponder } from "react-native";
import { colors } from "../../../theme";
import { ButtonBrownBottom, textStyles } from "../../../components";
import { requestPostProgress } from "../../../utiles"; // send data to Server
import styled from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";

import AppContext from "./AppContext";

import catimageURL from "../../../Assets/Images/cat/cat_idle.png";
import cat_PlayOneimageURL from "../../../Assets/Images/cat/cat_play1.png";
import cat_PlayTwoimageURL from "../../../Assets/Images/cat/cat_play2.png";
import handimageURL from "../../../Assets/Images/cat/cat_stick.png";

import { useAccessToken } from "../../../context/AccessTokenContext";

const PlayScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const myContext = useContext(AppContext);

  const [countPlay, setCountPlay] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [PlayImage, setPlayImage] = useState(cat_PlayOneimageURL);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current; // Initialize animated value for translateY

  // Server Link for sending data
  const linkArray = [
    "http://reborn.persi0815.site/reborn/remind/play",
    "http://reborn.persi0815.site/reborn/reveal/play",
    "http://reborn.persi0815.site/reborn/remember/play",
  ];

  // refresh
  useFocusEffect(
    React.useCallback(() => {
      setCountPlay(0);
      setIsPlay(false);
      setIsFinish(false);
      setIsSubmitted(false);
    }, [])
  );

  useEffect(() => {
    if (isPlay) {
      const intervalId = setInterval(() => {
        setPlayImage((prevImage) =>
          prevImage === cat_PlayOneimageURL
            ? cat_PlayTwoimageURL
            : cat_PlayOneimageURL
        );
      }, 300);

      // Start jumping animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -70,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ])
      ).start();

      if (countPlay >= 2) {
        setIsFinish(true);
      } else {
        setCountPlay(countPlay + 1);
      }

      return () => {
        clearInterval(intervalId);
        translateY.setValue(0); // Reset translateY value
      };
    }
  }, [isPlay]);

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
        navigate("Snack");
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
          <Text style={{ color: colors.palette.Red }}>놀아주기</Text>
        </Text>
        {isPlay ? (
          <Animated.View style={{ transform: [{ translateY }] }}>
            <CatPlayImage source={PlayImage} resizeMode="center" />
          </Animated.View>
        ) : (
          <CatImage source={catimageURL} resizeMode="center" />
        )}

        <DraggableImage
          source={handimageURL}
          style={{
            width: "50%",
            height: "50%",
            position: "absolute",
          }}
          setIsPlay={setIsPlay}
        />
        {isFinish ? (
          <ButtonBrownBottom text="간식주러 가기" onPress={handleSubmit} />
        ) : (
          ""
        )}
      </ImageBackground>
    </Container>
  );
};

export default PlayScreen;

const DraggableImage = ({ source, style, setIsPlay }) => {
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
  // Pan Responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        if (dx > 50 && dy > 20 && dx < 160 && dy < 200) {
          setIsPlay(true);
          //Animated.sequence([Animated.parallel([onDropScale])]).start();
        } else {
          setIsPlay(false);
          Animated.parallel([onPressOut, goHome]).start();
        }
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: () => {
        onPressOut.start(() => {
          setIsPlay(false);
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

const CatImage = styled.Image`
  width: 50%;
  height: 50%;
  margin-left: 30%;
  margin-top: 55%;
`;

const CatPlayImage = styled.Image`
  width: 100%;
  height: 100%;
  margin-left: 10%;
  margin-top: 17%;
`;
