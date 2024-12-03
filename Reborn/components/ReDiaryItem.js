import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const weatherImages = {
  SUNNY: require("../Assets/icons/rediaryimage/sun.png"),
  CLOUDY: require("../Assets/icons/rediaryimage/cloud.png"),
  RAINY: require("../Assets/icons/rediaryimage/rain.png"),
};

const backgroundImages = {
  bluebox: require("../Assets/icons/rediaryimage/blueBox.png"),
  yellowbox: require("../Assets/icons/rediaryimage/yellowBox.png"),
  redbox: require("../Assets/icons/rediaryimage/redBox.png"),
};

const ReDiaryItem = ({
  rediaryId,
  rediaryCreatedAt,
  rediaryTitle,
  rediaryContent,
  pickEmotion,
  resultEmotion,
  navigation,
}) => {
  let backgroundImage;
  if (resultEmotion === "BLUE") {
    backgroundImage = backgroundImages.bluebox;
  } else if (resultEmotion === "RED") {
    backgroundImage = backgroundImages.redbox;
  } else if (resultEmotion === "YELLOW") {
    backgroundImage = backgroundImages.yellowbox;
  } else {
    // 기본 배경 이미지 설정
    backgroundImage = require("../Assets/icons/rediaryimage/redBox.png");
  }

  const truncatedTitle =
    rediaryTitle.length > 7 ? `${rediaryTitle.slice(0, 6)}...` : rediaryTitle;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RediaryStack", {
          screen: "RediaryModify",
          params: {
            rediaryId,
            rediaryTitle,
            rediaryCreatedAt,
            rediaryContent,
            pickEmotion,
            resultEmotion,
          },
        })
      }
    >
      <View style={styles.item}>
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
        >
          <View style={styles.container}>
            <Image source={weatherImages[pickEmotion]} style={styles.image} />
            <Text style={styles.date}>
              {truncatedTitle} {"\n"}
              {rediaryCreatedAt}
            </Text>
            <Image
              source={require("../Assets/icons/rediaryimage/arrow2.png")}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    marginBottom: windowHeight * 0.01,
    marginLeft: windowWidth * 0.01,
    resizeMode: "contain",
  },
  date: {
    fontSize: 16,
    fontFamily: "Poppins-ExtraBold",
    marginHorizontal: windowWidth * 0.1,
  },
  item: {
    height: windowHeight * 0.21,
    width: windowWidth * 0.9,
    marginVertical: windowHeight * 0.015,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "stretch",
  },
});

export default ReDiaryItem;
