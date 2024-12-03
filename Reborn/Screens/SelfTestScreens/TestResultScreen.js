import React from "react";
import {View, Text,Button,TouchableOpacity, Image} from "react-native";
import { buttonStyles,ViewStyles } from "../../components";
import { colors } from "../../theme";

const TestResultScreen = ({navigation, route} ) => {
    // TestScreen에서 전달한 점수
    const { score } = route.params;

    return (
        <View style={ViewStyles.container}>
            <View style={[ViewStyles.greyBox, {marginBottom:"20%"}]}>
                <View>
                    <Image style={{width: 200, height: 200, marginBottom:'5%',}} source={require('../../Assets/icons/human_dog_icon.png')}/> 
                </View>
                <View>
                    <Text style={{textAlign:"left",fontFamily: "Poppins-Regular"}}>
                        <Text>당신의 <Text style={{color: colors.palette.Brown, fontFamily:"Poppins-Bold"}}>반려동물애도 설문지 검사(TCQ)</Text>결과{"\n"}</Text>
                        <Text>당신의 점수는 : {score >=36 ? <Text style={{fontSize: 30, fontWeight: "bold", color: colors.palette.Red}}>{score}점</Text> 
                        : <Text style={{fontSize: 30, fontWeight: "bold", color: colors.palette.Blue}}>{score}점</Text> } 입니다.{"\n"}{"\n"}</Text>
                    </Text>
                    <Text style={{textAlign:"left",fontFamily: "Poppins-Regular"}}>
                        {score >= 36 ? 
                        <Text style={{fontFamily: "Poppins-Bold"}}>총 36점 이상이므로,{"\n"}
                            <Text style={{color: colors.palette.Red}}>
                            펫로스 증후군 상태에 있음을</Text> 
                            {"\n"}의심해 볼 수 있습니다 {"\n"}{"\n"}<Text style={{fontFamily: "Poppins-ExtraBold"}}>
                                </Text>나 자신을 한번 돌아보는 시간을 가져보세요.</Text> 
                            : <Text>총 36점 미만이므로,{"\n"}
                            <Text style={{ color: colors.palette.Blue, fontFamily: "Poppins-Bold"}}>
                            펫로스 증후군 상태에 있지 않습니다.</Text>{"\n"}{"\n"}<Text style={{fontFamily: "Poppins-ExtraBold"}}>
                                앞으로도 지금처럼 건강한 삶을 유지하세요!
                            </Text>
                        </Text>}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default TestResultScreen;