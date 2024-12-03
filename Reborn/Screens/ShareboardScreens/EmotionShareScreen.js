import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import { useAccessToken } from '../../context/AccessTokenContext';
import { colors } from "../../theme";
import { GrayLine } from "../../components/viewStyles";
import ShareBoardFeedItem from "../../components/ShareBoardFeedItem";

const EmotionShareScreen = ({navigation} ) => {
    const { accessToken } = useAccessToken();
    const [feedItemData, setFeedItemData] = useState([]);
    const [selectedScreen, setSelectedScreen] = useState('all');

    const getFeedItem = useCallback(async () => {
        try {
            const baseUrl = "http://reborn.persi0815.site/board/list";
            const urlMap = {
                all: `${baseUrl}?type=ALL&way=time`,
                bookmarked: `${baseUrl}/bookmark?type=ALL&way=time`,
                mine: `${baseUrl}/my?type=ALL&way=time`,
                like: `${baseUrl}?type=ALL&way=like`,
            };
            const response = await axios.get(urlMap[selectedScreen], {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (response.data && response.data.result) {
                const mappedData = response.data.result.boardList.map(item => ({
                    id: item.id,
                    boardCreatedAt: item.boardCreatedAt,
                    boardWriter: item.boardWriter,
                    boardContent: item.boardContent,
                    likeCount: item.likeCount,
                    commentCount: item.commentCount,
                    boardImage: item.boardImage,
                    writerProfileImage: item.writerProfileImage,
                }));
                setFeedItemData(mappedData);
            }
        } catch (e) {
            console.error(e);
        }
    }, [accessToken, selectedScreen]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                await getFeedItem();
            };
            fetchData();
        }, [getFeedItem])
    );

    const renderItem = ({ item }) => (
        <ShareBoardFeedItem 
            id={item.id}
            boardWriter={item.boardWriter}
            boardCreatedAt={`${item.boardCreatedAt.split('T')[0]} ${item.boardCreatedAt.split('T')[1].slice(0, 5)}`}
            boardContent={item.boardContent}
            navigation={navigation}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            boardImage={item.boardImage}
            writerProfileImage={item.writerProfileImage}
        />
    );

    const renderHeader = () => (
        <View style={styles.header}>
            {["all", "bookmarked", "mine", "like"].map(screen => (
                <TouchableOpacity key={screen} onPress={() => setSelectedScreen(screen)}>
                    <View style={selectedScreen === screen ? styles.selectedItem : {}}>
                        <Text style={{ ...styles.btnText, color: selectedScreen === screen ? colors.palette.BrownDark : colors.palette.Gray400 }}>
                            {screen === 'all' ? '전체글' : screen === 'bookmarked' ? '북마크' : screen === 'mine' ? 'MY글' : '인기글'}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}
            <GrayLine />
            <FlatList
                data={feedItemData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
            <TouchableOpacity style={styles.writeButton} onPress={() => navigation.navigate("ShareWrite")}>
                <Image source={require('../../Assets/icons/ShareBoard/write.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default EmotionShareScreen;


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.palette.White,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        marginTop: 20,
        paddingHorizontal: '8%',
    },
    btnText: {
        fontSize: 23,
        marginHorizontal: 5,
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: '2%',
    },
    selectedItem: {
        borderBottomWidth: 2,
        borderBottomColor: colors.palette.BrownDark,
        paddingBottom: 5,
    },
    listContent: {
        paddingBottom: 200,
    },
    writeButton: {
        position: 'absolute',
        right: '5%',
        bottom: '3%',
    },
});
