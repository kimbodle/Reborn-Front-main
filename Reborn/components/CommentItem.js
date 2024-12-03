import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Touchable, TouchableOpacity } from 'react-native';
import styled from "styled-components/native";
import { colors } from '../theme';
const CommentItem = ({ navigation, id, title, content, date}) => {
	return (
        <TouchableOpacity onPress={() => navigation.navigate("ShareContent",{ id, title, date, content})}>
            <View style={styles.shareItem}>
                <View style={styles.titlecontainer}>
                    <Image style={styles.profile} source={require('../Assets/icons/profile.png')} />
                    <Text style={[styles.title, {color: colors.palette.BrownDark, fontFamily: 'Poppins-Bold'}]}>{title}{'\n'}<Text style={styles.date}>{date}</Text> </Text>
                    
                </View>
                <View>
                    <Text style={[styles.content, {color: colors.palette.BrownDark, fontFamily: 'Poppins-Medium'}]}>{content}</Text>
                </View>
                <View style={{flexDirection:'row', paddingVertical: 20, paddingHorizontal: 20, justifyContent: 'space-between'}}>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles=StyleSheet.create({
	shareItem: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    titlecontainer: {
        flexDirection: 'row',
        paddingLeft: 20,
    },
    title: {
    	fontSize: 20,
        paddingLeft: 10,
        marginTop: 20,
    },
    date: {
        fontSize: 14,
        color: "grey",
    },  
    content: {
    	fontSize: 16,
        marginHorizontal: '5%',
    },
    profile:{
        width: '20%',
        resizeMode: 'contain',
    },
});

export default CommentItem;