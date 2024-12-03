import React, { useState, useEffect } from "react";
import {View, Text, Button,TouchableOpacity, StyleSheet, FlatList, Image, Alert} from "react-native";
import axios from "axios";

import { colors } from "../../theme";
import { GrayLine, ViewStyles, buttonStyles } from "../../components";
import { useAccessToken, useGlobalNickname } from '../../context/AccessTokenContext';

import ReDiaryItem from '../../components/ReDiaryItem';

const RediaryMainScreen = ({navigation} ) => {
    const { accessToken } = useAccessToken();
    const [rediaryData, setRediaryData] = useState([]);
    const [result, setResult] = useState();
    const { globalNickname } = useGlobalNickname();
    //{globalNickname}

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getRediary();
        });
    
        // 첫 마운트 시에도 getRediary() 호출
        getRediary();
    
        // 컴포넌트가 언마운트 되거나, 네비게이션 포커스 리스너가 더 이상 필요 없을 때 제거
        return unsubscribe;
    }, [navigation]);

    const getRediary = async () => {
        try {
            const response = await axios.get(
                "http://reborn.persi0815.site/rediary/list",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data && response.data.result) {
                //console.log(response.data)
                const mappedData = response.data.result.map(item => ({
                    rediaryId: item.rediaryId,
                    rediaryCreatedAt: item.rediaryCreatedAt,
                    rediaryTitle: item.rediaryTitle,
                    rediaryContent: item.rediaryContent,
                    pickEmotion: item.pickEmotion,
                    resultEmotion: item.resultEmotion,
                }));
                setRediaryData(mappedData);
            }
        } catch (e) {
            console.error(e);
        }
    }
    const getRediaryCheck = async () => {
        try {
            const response = await axios.get(
                "http://reborn.persi0815.site/rediary/check",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if(response.data){
                //console.log(response.data.result);
                const latestResult = response.data.result;
                //setResult(latestResult);
                navigateToRediaryWrite(latestResult);
            }
        } catch (e) {
            console.error(e);
        }
    }

    // const [rediaryDatas, setrediaryDatas] = useState([
    //     { rediaryId: '1', rediaryTitle: '발표하는날', rediaryCreatedAt: '2024-05-13', rediaryContent: '오늘은 발표하는날이다.', pickEmotion: 'SUNNY', resultEmotion: 'RED', },
    //     { rediaryId: '2', rediaryTitle: '산학하는날', rediaryCreatedAt: '2024-04-01', rediaryContent: '오늘은 산학을 했다.', pickEmotion: 'CLOUDY', resultEmotion: 'YELLOW', },
    //     { rediaryId: '3', rediaryTitle: '산책을 했다.', rediaryCreatedAt: '2024-04-17', rediaryContent: '밖에 나가 산책을 했더니 기분이 좋았다.', pickEmotion: 'RAINY', resultEmotion: 'BLUE', },
    //     { rediaryId: '4', rediaryTitle: '축제', rediaryCreatedAt: '2024-04-18', rediaryContent: '학교 축제를 했다 시끄러웠다.', pickEmotion: 'CLOUDY', resultEmotion: 'RED', },
    //   ]);

    const navigateToRediaryWrite = (latestResult) => {
        //console.log(result);
    if (latestResult) {
        // result가 true일 경우에만 RediaryWrite로 이동
        navigation.navigate("RediaryStack", { screen: "RediaryWrite" });
    } else {
        Alert.alert(
            "아쉽네요",
            "감정일기는 하루에 한번만 작성이 가능합니다.",
            [
              { 
                text: "내일 다시 만나요~", 
                onPress: () => console.log("삭제 취소"),
                style: "cancel",
              },
            ],
            { cancelable: false } //밖을 누르면 취소가 되는데 그거 금지
          );
        console.log("result가 false이므로 RediaryWrite로 이동할 수 없습니다.");
        }
    };

    return(
        <View style={{paddingHorizontal: 20, backgroundColor: colors.background, flex: 1,}}>
            <View>
                <Text style={styles.DiaryTitle}><Text style={{color: colors.palette.Brown}}>RE</Text>DIARY:</Text>
                <View style={{flexDirection: 'row'}}>
                    <Image source={require('../../Assets/icons/rediaryimage/Writeicon.png')}/>
                    <Text style={{fontFamily: 'Poppins-Bold', marginLeft: '5%'}}>오늘 하루 반려동물과 무슨 일이 있었나요?</Text>
                </View>
                <TouchableOpacity style={[buttonStyles.buttonYellow, {marginBottom: 20,}]} onPress={getRediaryCheck}>
                    <Text style={{color: "white",fontFamily: 'Poppins-Bold'}}>오늘의 감정일기 쓰러 가기</Text>
                </TouchableOpacity>
            </View>
            <GrayLine></GrayLine>
            <View style={styles.container}>
                <FlatList  data={rediaryData}
                    renderItem={({item}) => (
                        <ReDiaryItem 
                            rediaryId={item.rediaryId}
                            rediaryCreatedAt={item.rediaryCreatedAt}
                            rediaryTitle={item.rediaryTitle}
                            rediaryContent={item.rediaryContent} 
                            pickEmotion={item.pickEmotion} 
                            resultEmotion={item.resultEmotion} 
                            navigation={navigation}
                        />
                    )}
                />
            </View>
        </View>
    );    
};

export default RediaryMainScreen;


const styles = StyleSheet.create({
    DiaryTitle: {
        fontSize: 30,
        marginVertical: 20,
        fontFamily: 'Poppins-Bold',
    },
    container: {
        flex: 1,
    },
});