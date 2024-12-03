import React from "react";
import {View, Text,TouchableOpacity,StyleSheet,Image} from "react-native";

import { colors, palette} from "../../theme";

import {ViewStyles,buttonStyles } from "../../components";


const TestIntroScreen = ({navigation: {navigate}}) => (
    <View style={ViewStyles.container}>
            <View style={ViewStyles.greyBox}>
                <View>
                    <Image style={{width: 200, height: 200, marginBottom:'5%',}} source={require('../../Assets/Images/Intro/Intro_Image.png')}/> 
                </View>
                <View style={{paddingHorizontal: 20,}}>
                    <Text style={{textAlign:"center", fontFamily:"Poppins-Bold",marginBottom:'5%',}}>
                        <Text style={{color:palette.Brown}}>반려동물애도 설문지 검사(PDQ)</Text>는{"\n"}
                    펜실베니아 심리학과에서 개발된{"\n"} <Text style={{color:palette.Brown}}>펫로스 증후군</Text> 상태를 알아보는 데,{"\n"}
                    도움을 줄 수 있는 설문지 검사입니다. {"\n"}{"\n"}
                    지금부터 <Text style={{color:palette.Brown}}>반려동물애도 설문지 검사</Text>를 통해{"\n"}
                    당신의 <Text style={{color:palette.Brown}}>펫로스 증후군 상태</Text>를 알아보겠습니다.
                    {"\n"}
                    {"\n"}
                    문제를 잘 읽고{"\n"}
                    신중히 선택해 주시기 바랍니다.
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={buttonStyles.buttonBrown} onPress={() => navigate("TestOne")}>
                    <Text style={{color: "white"}}>자가진단 하러가기</Text>
                </TouchableOpacity>
            </View>
        </View>
); //뷰 반환

export default TestIntroScreen;


const styles = StyleSheet.create({
    // testBox: {
    //     width: "85%",
    //     height: 500,
    //     backgroundColor: colors.palette.Gray200,
    //     marginTop: 10,
    //     marginBottom: 20,
    //     borderRadius: 20,
    //     justifyContent: "center",
    //     alignItems:"center",
    // },
    testTitle: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 10,
    },
});