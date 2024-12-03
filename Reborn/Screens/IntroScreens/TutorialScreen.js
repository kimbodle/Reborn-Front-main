import React, { useEffect, useState } from "react";
import { View, Text,StyleSheet,TouchableOpacity, Button, Image } from "react-native";

import { CommonActions } from '@react-navigation/native';

import { colors } from "../../theme"
import { buttonStyles } from "../../components";

const TutorialScreen = ({navigation: {navigate}}) => {
    //버튼을 누른 횟숫
    const [pressCount, setPressCount] = useState(0);
    //text관리
    const [tutoText, setTutoText] = useState("안녕하세요, REBORN은 반려동물"+"\n"+" 추모앱으로 보호자들이 마음을 정리할 수"+"\n"+" 있도록 도와주는 애플리케이션입니다.");
    
    navigateToMainStack = () => {
        navigate("IntroStack", { screen: "NickName" })
        //navigate("Tabs", { screen: "main" })
        /*
        navigate.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Main' },], // 메인 스택의 처음으로
          })
        );
        */
    };
    //여기 사라져

    //버튼을 누를때마다 호출됨
    const handlePress = () => {
        setPressCount(pressCount + 1); //버튼 클릭 횟수 증가
    };
    //pressCount 상태가 변경될때마다 실행됨
    useEffect(()=> {
        if (pressCount === 1){
            setTutoText("반려동물과 작별하신 보호자님께서는"+"\n"+" 15일 동안 '작별하기'를 통해 마음을"+"\n"+"정리할 수 있습니다.");
        }
        else if (pressCount === 2){
            setTutoText("반려동물과 함께 계신 보호자님께서도"+"\n"+" 감정일기 작성과 게시판 활동을 통해"+"\n"+" 반려동물과의 추억을 저장할 수 있습니다.");
        }
        else if (pressCount === 3){
            setTutoText("궁금한 내용은 챗봇 RETURN에게"+"\n"+" 이야기를 해보세요. 애플리케이션의 기능을 100% 사용할 수 있도록 도와드립니다.");
        }
        else if (pressCount === 4) {
            //navigation.navigate('Main');
            navigateToMainStack();
        }
    }, [pressCount]); //pressCount가 변경될때만 실행. state

    return(
        <View style={styles.container}>
            <View style={{}}>
                <Text style={styles.tutoTitle}>PET <Text style={{color: colors.palette.Yellow}}>RE</Text>BORN{"\n"}시작하기.</Text>
            </View>
            <View style={{flex:1.2, alignItems: 'center'}}>
                <Image style={{width: 300, height: 300,}} source={require('../../Assets/Images/Intro/Intro_Image.png')}/>  
            </View>
            <View style={{flex:0.8}}>
                <Text style={styles.tutoText}>
                    {tutoText}
                </Text>
            </View>
            <View style={{position: 'absolute', top: "87%", bottom: "5%",}}>
                <TouchableOpacity style={buttonStyles.buttonYellow} onPress={handlePress}>
                    <Text> 다음으로 </Text>
                </TouchableOpacity>
            </View>
            
        </View>
        
    );
} //뷰 반환

export default TutorialScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tutoTitle: {
        fontSize: 30,
        textAlign: "left",
        paddingLeft: 20,
        marginTop: 30,
        fontFamily: 'Poppins-Bold',
        paddingVertical: 20,
        //backgroundColor: "red",
        marginRight: 200,
    },
    tutoText: {
        color: colors.palette.Gray400,
        fontSize: 20,
        fontFamily: "Poppins-Reguler",
        textAlign: "center",
        paddingHorizontal: 20,
    },
  });