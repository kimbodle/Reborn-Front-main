import React from "react";
import {View, Text,StyleSheet, Image, TouchableOpacity} from "react-native";
import { colors } from "../../theme";

const IntroScreen = ({navigation: {navigate}}) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigate("Tutorial")}>
            <View>
                <Text style={styles.introTitle}>PET <Text style={{color: colors.palette.Yellow}}>RE</Text>BORN{"\n"}시작하기.</Text>
            </View>
            <View style={{flex:1.2,marginBottom: 30, alignItems: 'center',marginBottom:30,}}>
                <Image style={{width: 320, height: 320,}} source={require('../../Assets/Images/Intro/Intro_Image.png')}/>  
            </View>
            <View style={{flex:0.8}}>
                <Text style={styles.introText}>
                    안녕하세요. 저희는 반려동물 추모 앱 REBORN입니다. {"\n"}
                </Text>
            </View>
        </TouchableOpacity>
        </View>
); //뷰 반환

export default IntroScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    introTitle: {
        fontSize: 30,
        textAlign: "left",
        paddingLeft: 20,
        marginTop: 30,
        paddingVertical: 20,
        fontFamily:'Poppins-Bold',
    },
    introText: {
        color: "lightgrey",
        fontSize: 20,
        textAlign: "center",
        paddingHorizontal: '10%',
        marginTop: 10,
        fontFamily:'Poppins-Medium',
    },
});