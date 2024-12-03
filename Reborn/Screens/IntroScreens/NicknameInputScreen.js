import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Image, KeyboardAvoidingView, Platform, Keyboard } from "react-native";

import axios from "axios";

import { colors } from "../../theme";
import { buttonStyles } from "../../components";

import { useAccessToken, useGlobalNickname } from "../../context/AccessTokenContext";

const NicknameInputScreen = ({ navigation: { navigate } }) => {
    const [keyboardShown, setKeyboardShown] = useState(false);
    const { accessToken } = useAccessToken();
    const { setGlobalNickname } = useGlobalNickname();

    const requestPostNickname = async () => {
        const data = {
            nickname: nickname
        };
    
        try {
            const response = await axios.post(
                'http://reborn.persi0815.site/users/nickname', data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            console.log(response.data);
            return response; //함수에서 서버 응답 반환
        }
        catch (error) {
            //console.error("ERROR", error);
            console.log("Error Response Body:", error.response.data);
            throw error; //에러를 다시 던져서 외부에서 처리할 수 있게 함
        }
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardShown(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardShown(false);
        });
    
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const [nickname, setNickname] = useState('');

    const navigateToNextScreen = async () => {
        if (nickname.trim().length > 0) {
            try {
                const response = await requestPostNickname(); //서버 응답
                
                // isSuccess 값 확인
                if(response.data.isSuccess) {
                    //console.log(response.data.isSuccess + "if안에 있음");
                    setGlobalNickname(nickname);
                    navigate("Tabs", { screen: "main" }); // isSuccess가 true일 경우에만 네비게이션 이동
                } else {
                    // isSuccess가 false인 경우
                    Alert.alert("오류", response.data.message);
                }
            } catch (error) {
                // 네트워크 에러나 기타 에러 처리
                //console.error("Navigation Error", error);
                Alert.alert("중복", "별명이 중복입니다. 다시 해주세용");
            }
        } else {
            Alert.alert("별명 입력", "사용자 별명을 입력해주세요.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Text style={styles.tutoTitle}>PET <Text style={{color: colors.palette.Yellow}}>RE</Text>BORN{"\n"}시작하기.</Text>
            </View>
            <View style={{flex:1, alignItems: 'center',}}>
            {!keyboardShown && (
                    <Image style={{width: 300, height: 300,}} source={require('../../Assets/Images/Intro/Intro_Image.png')}/>  
                    )}
                
            </View>
                <KeyboardAvoidingView
                style={styles.nickNamecontainer}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
                <Text style={styles.nickNameText}>
                    별명을 입력해주세요.
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNickname}
                    value={nickname}
                    placeholder="    별명을 입력하세요    "
                />
                </KeyboardAvoidingView>
                <View style={{position: 'absolute', top: "85%", bottom: "5%",}}>
                {!keyboardShown && (
                    <TouchableOpacity
                        style={buttonStyles.buttonYellow}
                        onPress={navigateToNextScreen}
                    >
                        <Text> 다음으로 </Text>
                    </TouchableOpacity>
                    )}
                </View>
        </View>
    );
}

export default NicknameInputScreen;

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
        marginBottom: -10,
        fontFamily: 'Poppins-Bold',
        paddingVertical: 20,
        marginRight: 200,
    },
    nickNameText: {
        color: colors.palette.Gray400,
        fontSize: 20,
        fontFamily: "Poppins-Reguler",
        textAlign: "center",
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    nickNamecontainer:{
        marginBottom: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    input: { // 닉네임 입력 스타일
        backgroundColor: 'white',
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "80%", // 입력 필드 너비 조정
        borderColor: "grey", // 경계선 색상
        borderRadius: 5, // 경계선 둥글기
        
    },
});
