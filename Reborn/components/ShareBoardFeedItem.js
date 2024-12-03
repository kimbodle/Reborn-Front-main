import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../theme';
import { GrayLine } from './viewStyles';
const ShareBoardFeedItem = ({ navigation, id, boardWriter, boardContent, boardCreatedAt, likeCount, commentCount, boardImage, writerProfileImage }) => {
	return (
        <TouchableOpacity onPress={() => navigation.navigate("ShareContent",{ id, boardWriter, boardCreatedAt, boardContent, likeCount, commentCount, boardImage, writerProfileImage })}>
            <View style={styles.shareItem}>
                <View style={styles.titlecontainer}>
                <Image 
                    style={styles.profile} 
                    source={writerProfileImage ? { uri: writerProfileImage } : require('../Assets/icons/profile.png')} 
                />
                    <Text style={[styles.title, {color: colors.palette.BrownDark, fontFamily: 'Poppins-Bold'}]}>{boardWriter}{'\n'}<Text style={styles.date}>{boardCreatedAt}</Text> </Text>
                    
                </View>
                <View>
                    <Text style={[styles.content, {color: colors.palette.BrownDark, fontFamily: 'Poppins-Regular'}]}>{boardContent}</Text>
                </View>
                <View style={{alignItems: 'center',}}>
                {boardImage && (
                    <Image
                    style={styles.boardImage}
                    source={{ uri: boardImage }}
                    />
                )}
                </View>
                <View style={{flexDirection:'row', paddingVertical: 10, paddingHorizontal: 20, justifyContent: 'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{marginLeft: '5%', tintColor: colors.palette.BrownDark}} source={require('../Assets/icons/ShareBoard/commentIcon.png')}/>
                        <Text style={{marginLeft: '7%', marginTop: '3%', color: colors.palette.BrownDark, fontFamily: 'Poppins-Bold'}}>{commentCount}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Image style={{width: 23.7, height:22, marginRight: '5%',marginTop: '3%', tintColor: colors.palette.Yellow}} source={require('../Assets/icons/ShareBoard/heartIconGrey.png')}/>
                        <Text style={{color: colors.palette.BrownDark, marginTop: '3%', fontFamily: 'Poppins-Bold'}}>{likeCount}</Text>
                    </View>
                </View>
            </View>
            <GrayLine></GrayLine>
        </TouchableOpacity>
        
    );
};

const styles=StyleSheet.create({
	shareItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        backgroundColor: colors.palette.backgroundColor,
        // borderColor: colors.palette.Yellow,
        // borderBlockColor: 'yellow',
        // borderWidth: 2,
        // borderRadius: 20,
    },
    titlecontainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        marginTop: 10,
    },
    title: {
    	fontSize: 20,
        paddingLeft: 10,
        marginTop: 10,
    },
    date: {
        fontSize: 14,
        color: "grey",
    },  
    content: {
    	fontSize: 16,
        marginHorizontal: '5%',
        marginTop: 10,
    },
    profile:{
        width: 70,
        height: 70,
        //resizeMode: 'contain',
        borderRadius: 50,
    },
    boardImage: {
        width: '90%',
        height: 200,
        resizeMode: 'cover',
        marginTop: 10, 
        marginBottom: 10,
        borderRadius: 20,
      },
});

export default ShareBoardFeedItem;