import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Toast } from "../../../components";
import AppContext from "../../RebornScreens/dog/AppContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "../../../theme";
import {
  useAccessToken,
  useGlobalPetName,
} from "../../../context/AccessTokenContext";

const RadioButton = ({ isSelected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={[styles.radioButton, isSelected]}>
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={{ color: colors.palette.BrownDark }}>{label}</Text>
    </TouchableOpacity>
  );
};

const checkWhite = require("../../../Assets/icons/check_white.png");
const checkBlack = require("../../../Assets/icons/check_black.png");

const ReconnectScreen = ({ navigation: { navigate } }) => {
  const { accessToken } = useAccessToken();
  const { globalPetName, setGlobalPetName } = useGlobalPetName();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [breed, setBreed] = useState("");
  const [animalType, setAnimalType] = useState(null);
  const [color, setColor] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigation = useNavigation();
  const myContext = useContext(AppContext);

  const colorsChoice = [
    colors.palette.Black,
    colors.palette.BrownChoco,
    colors.palette.YellowDark,
    colors.palette.Gray500,
    colors.palette.White,
  ];

  const colorNameMap = {
    [colors.palette.Black]: "BLACK",
    [colors.palette.BrownChoco]: "BROWN",
    [colors.palette.YellowDark]: "YELLOWDARK",
    [colors.palette.Gray500]: "GRAY",
    [colors.palette.White]: "WHITE",
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate(date.toLocaleDateString("ko-KR", options));
    hideDatePicker();
  };

  const handleSubmit = async () => {
    if (isSubmitted) {
      return; // for prevent double click
    }
    if (!name || !date || !breed || !animalType || !color) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3초 후에 showToast를 false로 변경
    } else {
      setShowToast(false);
      setIsSubmitted(true); // lock submit click
      try {
        setGlobalPetName(name);
        const petType = animalType === "강아지" ? "DOG" : "CAT";
        myContext.changePetType(petType);
        console.log(myContext.petType);
        let colorName = colorNameMap[color] || "";

        const response = await fetch(
          "http://reborn.persi0815.site:8080/reborn/reconnect/create",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              petName: name,
              anniversary: date,
              petType: petType,
              detailPetType: breed,
              petColor: colorName,
            }),
          }
        );
        const data = await response.json();
        if (!data) {
          setIsSubmitted(false); // release submit click
          throw new Error("Something went wrong");
        }

        console.log(data);

        navigate("RebornDogStack", { screen: "Intro" }); // go to Day1, start RE:BORN
        myContext.resetDay(); // reset Day, start from 1
      } catch (error) {
        console.error(error);
        alert("저장 실패:" + error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.font}>반려동물 이름</Text>
        <TextInput style={styles.input} onChangeText={setName} value={name} />
      </View>
      <View>
        <Text style={styles.font}>기일</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text style={styles.font}>{date || "날짜 선택"}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View>
        <Text style={styles.font}>동물 종류</Text>
        <RadioButton
          label="강아지"
          isSelected={animalType === "강아지"}
          onPress={() => setAnimalType("강아지")}
        />
        <RadioButton
          label="고양이"
          isSelected={animalType === "고양이"}
          onPress={() => setAnimalType("고양이")}
        />
      </View>
      <View>
        <Text style={styles.font}>견종/묘종</Text>
        <TextInput style={styles.input} onChangeText={setBreed} value={breed} />
      </View>
      <Text style={styles.font}>색상</Text>
      <View style={styles.colorContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={colorsChoice}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.colorCircle,
                { backgroundColor: item },
                color === item && styles.selected,
              ]}
              onPress={() => setColor(item)}
            >
              {color === item && (
                <Image
                  style={styles.checkmark}
                  source={
                    item === colors.palette.White ? checkBlack : checkWhite
                  }
                />
              )}
            </Pressable>
          )}
          keyExtractor={(item) => item}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonBrownBottom, { top: "14.5%" }]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonFont}>저장하기</Text>
      </TouchableOpacity>
      <ToastContainer>
        {showToast ? (
          <Toast showToast={showToast} message="프로필을 작성해주세요" />
        ) : (
          ""
        )}
      </ToastContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.palette.White,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.palette.Gray300,
    borderRadius: 16,
    padding: 15,
    marginBottom: "3%",
    height: 60,
  },

  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 42,
    borderColor: colors.palette.Black,
    borderWidth: 1,
  },

  selected: {
    borderWidth: 2,
    borderColor: colors.palette.Black,
  },

  font: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginBottom: "3%",
    color: colors.palette.BrownDark,
  },
  buttonFont: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: colors.palette.White,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.palette.BrownDark,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.palette.Brown,
  },
  checkmark: {
    position: "absolute",
    alignSelf: "center",
    top: "10%",
  },
  buttonBrownBottom: {
    backgroundColor: colors.palette.Brown,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    borderRadius: 30,
    height: 50,
    marginHorizontal: 100,
  },
});

const ToastContainer = styled.View`
  position: absolute;
  bottom: 50px;
  left: 34%;
  align-items: "center";
`;

export default ReconnectScreen;
