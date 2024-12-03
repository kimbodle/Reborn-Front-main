import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import IntroScreen from "../Screens/RebornScreens/dog/IntroScreen";
import OuttroScreen from "../Screens/RebornScreens/dog/OuttroScreen";
import ReIntroScreen from "../Screens/RebornScreens/dog/ReIntroScreen";
import FeedScreen from "../Screens/RebornScreens/dog/FeedScreen";
import PetScreen from "../Screens/RebornScreens/dog/PetScreen";
import SnackScreen from "../Screens/RebornScreens/dog/SnackScreen";
import WalkScreen from "../Screens/RebornScreens/dog/WalkScreen";
import WalkFinishScreen from "../Screens/RebornScreens/dog/WalkFinishScreen";
import DiaryScreen from "../Screens/RebornScreens/dog/DiaryScreen";
import EmotionScreen from "../Screens/RebornScreens/dog/EmotionScreen";
import EmotionResultScreen from "../Screens/RebornScreens/dog/EmotionResultScreen";
import ReFinishScreen from "../Screens/RebornScreens/dog/ReFinishScreen";
import ImageScreen from "../Screens/RebornScreens/dog/ImageScreen";
import CleanScreen from "../Screens/RebornScreens/dog/CleanScreen";
import WashScreen from "../Screens/RebornScreens/dog/WashScreen";
import ClothesScreen from "../Screens/RebornScreens/dog/ClothesScreen";
import LetterScreen from "../Screens/RebornScreens/dog/LetterScreen";
import SetRebornScreen from "../Screens/RebornScreens/dog/SetRebornScreen";

import PlayScreen from "../Screens/RebornScreens/dog/PlayScreen";

import { Image } from "react-native";

import AppContext from "../Screens/RebornScreens/dog/AppContext";

const NativeRebornDogStack = createNativeStackNavigator();

const RebornDogStack = ({ navigation: { navigate } }) => {
  const myContext = useContext(AppContext);

  return (
    <NativeRebornDogStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerLeft: () => (
          <ImageButton onPress={() => navigation.navigate("Main")} />
        ),
      })}
    >
      <NativeRebornDogStack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Outtro"
        component={OuttroScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="ReIntro"
        component={ReIntroScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />

      <NativeRebornDogStack.Screen
        name="Pet"
        component={PetScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Snack"
        component={SnackScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Walk"
        component={WalkScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="WalkFinish"
        component={WalkFinishScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Play"
        component={PlayScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Diary"
        component={DiaryScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Emotion"
        component={EmotionScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="EmotionResult"
        component={EmotionResultScreen}
        options={{ title: `감정 일기 분석 결과` }}
      />
      <NativeRebornDogStack.Screen
        name="ImageDiary"
        component={ImageScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Clean"
        component={CleanScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="ReFinish"
        component={ReFinishScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Wash"
        component={WashScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Clothes"
        component={ClothesScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="Letter"
        component={LetterScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
      <NativeRebornDogStack.Screen
        name="SetReborn"
        component={SetRebornScreen}
        options={{ title: `Day ${myContext.contentsDay}` }}
      />
    </NativeRebornDogStack.Navigator>
  );
};

export default RebornDogStack;

const GoToMainButton = styled.Pressable`
  margin-left: 3%;
`;
const ImageButton = ({ onPress }) => {
  return (
    <GoToMainButton onPress={onPress}>
      <Image source={require("../Assets/icons/tabIcons/back.png")} />
    </GoToMainButton>
  );
};
