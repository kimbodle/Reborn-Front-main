import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { colors } from "../../theme/colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MypageMainScreen = ({ navigation: { navigate } }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate("MypageStack", "AccountManagement")}
    >
      <View style={styles.row}>
        <Image
          source={require("../../Assets/icons/account_manage.png")}
          style={styles.icon}
        />
        <Text style={styles.font}>계정 관리</Text>
        <View style={styles.flexSpacer} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate("MypageStack", { screen: "PetProfileList" })}
    >
      <View style={styles.row}>
        <Image
          source={require("../../Assets/icons/pet_profile.png")}
          style={styles.icon}
        />
        <Text style={styles.font}>반려동물 프로필 관리</Text>
        <View style={styles.flexSpacer} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate("MypageStack", { screen: "ReviewPetList" })}
    >
      <View style={styles.row}>
        <Image
          source={require("../../Assets/icons/review.png")}
          style={styles.icon}
        />
        <Text style={styles.font}>
          <Text style={styles.reColor}>RE:</Text>
          <Text> VIEW</Text>
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default MypageMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: windowWidth * 0.08,
    backgroundColor: colors.palette.White,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    marginVertical: windowWidth * 0.08,
  },

  font: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    top: windowHeight * 0.002,
    color: colors.palette.BrownDark,
  },

  reColor: {
    color: colors.palette.Brown,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },

  icon: {
    marginRight: windowWidth * 0.05,
  },
});
