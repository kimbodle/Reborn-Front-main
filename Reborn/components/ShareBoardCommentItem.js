import React from 'react';
import {View, Text, Alert, Image, StyleSheet, ImageBackground, Touchable, TouchableOpacity, TextInput, Button } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../theme';
import { GrayLine, ViewStyles } from './viewStyles';

import axios from "axios";
import { useAccessToken } from "../context/AccessTokenContext";

const ShareBoardCommentItem = ({id, commentCreatedAt, commentWriter, commentContent, writerProfileImage, ondelete}) => {
	const { accessToken } = useAccessToken();

    const handlecommentDeletePress  = () => {
        Alert.alert(
            "댓글 삭제",
            "정말로 댓글을 삭제하시겠습니까?",
            [
                {
                    text: "아니오",
                    onPress: () => console.log("삭제 취소"),
                    style: "cancel"
                },
                { text: "예", onPress: () => deleteComment() }
            ],
            { cancelable: false }
        );
    };

    const deleteComment = async () => {
        console.log(id);
        try {
            const response = await axios.delete(
              `http://reborn.persi0815.site/board/comment/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            console.log(response.data);
            ondelete();
            Alert.alert("댓글 삭제", "댓글이 성공적으로 삭제되었습니다.");
        } catch (error) {
            console.error(error);
            Alert.alert("댓글 삭제 실패", "댓글 삭제에 실패하였습니다.");
        }
    };
    
    return (
        <View style={styles.shareItem}>
            <TouchableOpacity onPress={handlecommentDeletePress} style={{position: 'absolute', right: '5%', top: '20%', zIndex: 1}}>
                <Image style={{width: 20, height: 20}} source={require('../Assets/icons/ShareBoard/xicon.png')}/>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handlecommentDeletePress} style={{position: 'absolute', right: '5%', top: '20%'}}>
                <Image style={{width: 20, height: 20}} source={require('../Assets/icons/ShareBoard/xicon.png')}/>
            </TouchableOpacity> */}
            <View style={styles.titlecontainer}>
                <Image 
                    style={styles.profile} 
                    source={writerProfileImage ? { uri: writerProfileImage } : require('../Assets/icons/profile.png')} 
                />
                <Text style={[styles.title, {color: colors.palette.BrownDark, fontFamily: 'Poppins-Bold'}]}>{commentWriter}{'\n'}
                    <Text style={styles.content}>{commentContent}{'\n'}</Text>
                    <Text style={[styles.date, {fontFamily: 'Poppins-Medium'}]}>{commentCreatedAt}</Text>
                </Text>
            </View>
            {/* <TouchableOpacity style={{justifyContent: 'flex-end'}}>
                <Text style={styles.recomment}>답글 쓰기</Text>
            </TouchableOpacity> */}
            <View style={{paddingVertical: 15,}}>
            </View>
            <GrayLine></GrayLine>
        </View>
    );
};

const styles=StyleSheet.create({
	shareItem: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 1,
    },
    titlecontainer: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    title: {
    	fontSize: 18,
        paddingLeft: 10,
        marginTop: 20,
        paddingHorizontal: 110,
    },
    date: {
        fontSize: 12,
        color: "grey",
    },  
    content: {
    	fontSize: 18,
        marginHorizontal: '5%',
        paddingHorizontal: 50,
        color: colors.palette.BrownDark,
        fontFamily: 'Poppins-Medium'
    },
    profile:{
        width: 60,
        height: 60,
        borderRadius: 50,
        marginTop: 20,
    },
    recomment:{
        color: colors.palette.Gray300,
        marginLeft: 10,
        marginBottom: '5%',
        fontFamily: 'Poppins-Bold',
        //backgroundColor: 'red',
        position: 'absolute', right: '5%', bottom: -20,
    },
});

export default ShareBoardCommentItem;