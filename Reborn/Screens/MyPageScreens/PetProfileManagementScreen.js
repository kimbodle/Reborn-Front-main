import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Dimensions,
} from "react-native";
import { buttonStyles } from "../../components/buttonStyles";
import { colors } from "../../theme";
import axios from "axios";
import { useAccessToken } from "../../context/AccessTokenContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RadioButton = ({ isSelected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View
        style={[
          styles.radioButton,
          isSelected ? styles.radioButtonSelected : null,
        ]}
      >
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const checkWhite = require("../../Assets/icons/check_white.png");
const checkBlack = require("../../Assets/icons/check_black.png");

const PetProfileManagementScreen = ({ route }) => {
  const { petId } = route.params;
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [breed, setBreed] = useState("");
  const [animalType, setAnimalType] = useState(null);
  const [color, setColor] = useState("");
  const [petInfo, setPetInifo] = useState(null);
  const { accessToken } = useAccessToken();
  const navigation = useNavigation();

  const colorMap = {
    BLACK: colors.palette.Black,
    BROWN: colors.palette.BrownChoco,
    YELLOWDARK: colors.palette.YellowDark,
    GRAY: colors.palette.Gray500,
    WHITE: colors.palette.White,
  };

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        const response = await axios.get(
          `http://reborn.persi0815.site:8080/mypage/list/${petId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = response.data.result;
        setPetInifo(result);
        setName(result.petName);
        setDate(result.anniversary);
        setAnimalType(result.petType);
        setBreed(result.detailPetType);
        setColor(result.petColor);
      } catch (error) {
        console.error("오류 발생", error);
        console.log(`Fetching info for petId: ${petId}`);
      }
    };

    fetchPetInfo();
  }, [petId]);

  const handleDelete = () => {
    Alert.alert(
      "반려동물 프로필 삭제",
      "정말로 반려동물 프로필을 삭제하시겠습니까?",
      [
        {
          text: "예",
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://reborn.persi0815.site:8080/mypage/delete/${petId}`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );

              const { isSuccess, message } = response.data;
              if (isSuccess) {
                console.log("프로필이 삭제되었습니다.");
                navigation.navigate("PetProfileList");
              } else {
                console.log(`삭제 실패: ${message}`);
              }
            } catch (error) {
              console.error("오류", error);
            }
          },
        },
        {
          text: "아니오",
          onPress: () => console.log("삭제 취소"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.palette.White }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.font}>반려동물 이름</Text>
          <Text style={styles.input}>{name}</Text>
        </View>
        <View>
          <Text style={styles.font}>기일</Text>
          <Text style={styles.input}>{date}</Text>
        </View>
        <View>
          <Text style={styles.font}>동물 종류</Text>
          <RadioButton
            label="강아지"
            isSelected={animalType === "DOG"}
            onPress={() => {}}
          />
          <RadioButton
            label="고양이"
            isSelected={animalType === "CAT"}
            onPress={() => {}}
          />
        </View>
        <View>
          <Text style={styles.font}>견종/묘종</Text>
          <Text style={styles.input}>{breed}</Text>
        </View>
        <Text style={styles.font}>색상</Text>
        <View style={styles.colorContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Object.keys(colorMap)}
            renderItem={({ item }) => {
              const backgroundColor = colorMap[item];
              return (
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: backgroundColor },
                    color === item && styles.selected,
                  ]}
                >
                  {color === item && (
                    <Image
                      style={styles.checkmark}
                      source={item === "WHITE" ? checkBlack : checkWhite}
                    />
                  )}
                </View>
              );
            }}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableOpacity
          style={[buttonStyles.buttonBrownBottom, { top: windowHeight * 0.11 }]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonFont}>삭제하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.03,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.palette.Gray300,
    borderRadius: 16,
    padding: 15,
    marginBottom: windowHeight * 0.03,
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
    marginRight: windowWidth * 0.1,
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
    marginBottom: windowHeight * 0.011,
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
    marginBottom: windowHeight * 0.02,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: windowWidth * 0.02,
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
    top: windowHeight * 0.008,
  },
});

export default PetProfileManagementScreen;
