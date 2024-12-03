import React, { useState, useEffect, useCallback  } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";

import axios from "axios";
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from "../../theme";
import { GrayLine, ViewStyles } from "../../components/viewStyles";

import { useAccessToken, useGlobalNickname } from "../../context/AccessTokenContext";


import ShareBoardCommentItem from "../../components/ShareBoardCommentItem";


const ShareContentScreen = ({ route, navigation }) => {
  const { id, boardWriter, boardCreatedAt, boardContent, likeCount: initialLikeCount, commentCount, boardImage, writerProfileImage } = route.params;
  const { accessToken } = useAccessToken();
 
  const [isHeart, setIsHeart] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount); // likeCount 상태 추가
  const [isBookmark, setIsBookmark] = useState(false);
  const [commentContent, setcommentContent] = useState("");

  const [commentItemData, setCommentItemData] = useState([]);

  //const [commentItemData, setCommentItemData] = useState([]);
  const getCommentItem = async () => {
    try {
      const response = await axios.get(
        `http://reborn.persi0815.site/board/comment/${id}/list`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (response.data && response.data.result) {
        //리스트
        console.log(response.data.result.commentList);
        const mappedData = response.data.result.commentList.map(item => ({
            id: item.id,
            commentCreatedAt: item.commentCreatedAt,
            commentWriter: item.commentWriter,
            commentContent: item.commentContent,
            writerProfileImage: item.writerProfileImage,
        }));
        setCommentItemData(mappedData);
    }
    } catch (e) {
      console.error(e);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      const getCheckLike = async () => {
        try {
          const response = await axios.get(
            `http://reborn.persi0815.site/board/${id}/check-like`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          //console.log(response.data);
          
          if (response.data && response.data.result === 'liked') {
            setIsHeart(true);
            setLikeCount(initialLikeCount);
           // console.log('좋아요 눌림. 갯수'+initialLikeCount);
          }
          else {
            setIsHeart(false);
            setLikeCount(initialLikeCount);
            //console.log('좋아요 안 눌림. 갯수'+initialLikeCount);
          }
        } catch (e) {
          console.error(e);
        }
      };

      const getCheckBookmark = async () => {
        try {
          const response = await axios.get(
            `http://reborn.persi0815.site/board/${id}/check-bookmark`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          //console.log(response.data);
          if (response.data && response.data.result=== 'bookmarked') {
            setIsBookmark(true);
          } else {
            setIsBookmark(false);
          }
        } catch (e) {
          console.error(e);
        }
      };

      getCommentItem();
      getCheckLike();
      getCheckBookmark();
      setLikeCount(initialLikeCount);
      //console.log(boardImage);
    }, [accessToken, id, initialLikeCount,])
  );

  
  const handleHeartPress = async () => {
    if (!isHeart) {
      try {
        const response = await axios.post(
          `http://reborn.persi0815.site/board/${id}/like/create`, {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.isSuccess) {
          //console.log(response.data.result);
          setLikeCount(response.data.result); // 서버 응답의 result로 likeCount 업데이트
          setIsHeart(true); // 하트 상태를 눌린 상태로 업데이트
        }
      } catch (error) {
        console.log("Error Response Body:", error.response?.data);
      }
    } else {
      // 하트가 현재 눌린 상태라면, DELETE 요청
      try {
        const response = await axios.delete(
          `http://reborn.persi0815.site/board/${id}/like/delete`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.isSuccess) {
          setLikeCount(response.data.result); // likeCount를 감소
          setIsHeart(false); // 하트 상태를 눌리지 않은 상태로 업데이트
        }
      } catch (error) {
        console.log("Error Response Body:", error.response?.data);
      }
    }
  };

  const handleBookmarkPress = async () => {
    if (!isBookmark) {
      try {
        const response = await axios.post(
          `http://reborn.persi0815.site/board/${id}/bookmark/create`, {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.isSuccess) {
          //console.log(response.data);
          setIsBookmark(true); // 북마크 상태를 눌린 상태로 업데이트
        }
      } catch (error) {
        console.log("Error Response Body:", error.response?.data);
      }
    } else {
      // 북마크가 현재 눌린 상태라면, DELETE 요청
      try {
        const response = await axios.delete(
          `http://reborn.persi0815.site/board/${id}/bookmark/delete`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.isSuccess) {
          setIsBookmark(false); // 하트 상태를 눌리지 않은 상태로 업데이트
        }
      } catch (error) {
        console.log("Error Response Body:", error.response?.data);
      }
    }
  };

  const handleBoardDeletePress = () => {
    Alert.alert(
      "게시글 삭제",
      "정말로 게시글을 삭제하시겠습니까?",
      [
        // { 
        //   text: "게시글 나가기", 
        //   onPress: async () => {
        //       navigation.goBack();
        //     }
        //   },
        { 
          text: "예", 
          onPress: async () => {
            try {
              const response = await axios.delete(
                `http://reborn.persi0815.site/board/${id}/delete`,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
              console.log(response.data);
              navigation.goBack();
            } catch (error) {
              console.log("Error Response Body:", error.response?.data);
            }
          },
        },
        {
          text: "아니오",
          onPress: () => console.log("삭제 취소"),
          style: "cancel",
        },
      ],
      { cancelable: false } //밖을 누르면 취소가 되는데 그거 금지
    );
  };

  const postComment = async () => {
    const data = {
      commentContent: commentContent
    };
    try {
      const response = await axios.post(
          `http://reborn.persi0815.site/board/comment/${id}/create`, data, {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
      console.log(response.data);
      setcommentContent("");
      getCommentItem();
      return response;
  }
  catch (error) {
      //console.error("ERROR", error);
      console.log("Error Response Body:", error.response.data);
      throw error; 
    }
  };

const renderHeaderComponent = () => (
      <View>
        <View style={styles.titlecontainer}>
          <Image 
                style={styles.profile} 
                source={writerProfileImage ? { uri: writerProfileImage } : require('../../Assets/icons/profile.png')} 
                />
          <Text
            style={[
              styles.title,
              { color: colors.palette.BrownDark, fontFamily: "Poppins-Bold" },
            ]}
          >
            {boardWriter}
            {"\n"}
            <Text style={styles.date}>{boardCreatedAt}</Text>{" "}
          </Text>
          <TouchableOpacity onPress={handleBoardDeletePress} style={{justifyContent: 'center', position: 'absolute', right: '5%', top: '15%'}}>
            <Image style={{tintColor: colors.palette.Gray400}} source={require('../../Assets/icons/ShareBoard/xicon.png')} />
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={[
              styles.content,
              { color: colors.palette.BrownDark, fontFamily: "Poppins-Medium" },]}
          >
            {boardContent}
          </Text>
          <View style={{alignItems: 'center'}}>
          {boardImage && (
            <Image
              style={styles.boardImage}
              source={{ uri: boardImage }}
            />
          )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 20,
            paddingHorizontal: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" , marginBottom: -3}}>
            <Image
              style={{  width:25, height:26, marginLeft: "5%", tintColor: colors.palette.BrownDark }}
              source={require("../../Assets/icons/ShareBoard/commentIcon.png")}
            />
            <Text
              style={{
                marginLeft: "7%",
                marginTop:3,
                color: colors.palette.BrownDark,
                fontFamily: "Poppins-Bold",
              }}
            >
            {commentCount}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handleHeartPress}> 
            <Image
              style={{ height:24, width:25, resizeMode: 'contain',
                marginRight: "5%",
                tintColor: isHeart ? colors.palette.Red : colors.palette.Gray400
              }}
              source={require("../../Assets/icons/ShareBoard/heartIconGrey.png")}
            />
          </TouchableOpacity>
            <Text
              style={{ width: 10,
                color: colors.palette.BrownDark,fontFamily: "Poppins-Bold",}}>{likeCount}</Text>
            <TouchableOpacity onPress={handleBookmarkPress}>
                <Image
                style={{ marginLeft: 10,
                tintColor: isBookmark ? '#4682B4' : colors.palette.Gray400 }}
                source={require("../../Assets/icons/ShareBoard/bookmarkIconGrey.png")}/>
            </TouchableOpacity>
          </View>
        </View>
        <GrayLine></GrayLine>
      </View>
    );

  return(
    <SafeAreaProvider style={{backgroundColor: colors.background}}>
      <GrayLine></GrayLine>
      <View>
        <FlatList 
          data={commentItemData}
            renderItem={({item}) => (
              <ShareBoardCommentItem
                id={item.id}
                commentCreatedAt={`${item.commentCreatedAt.split('T')[0]} ${item.commentCreatedAt.split('T')[1].slice(0, 5)}`}
                commentWriter={item.commentWriter}
                commentContent={item.commentContent}
                writerProfileImage={item.writerProfileImage}
                ondelete={()=> getCommentItem()}/>
            )} 
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeaderComponent}
          contentContainerStyle={{ paddingBottom: 200 }} />
      </View>
      <KeyboardAvoidingView style={styles.commentView}>
        <TextInput
          placeholder="댓글을 입력해주세요."
          onChangeText={setcommentContent}
          value={commentContent}
          style={styles.commetInput}
        />
        <TouchableOpacity onPress={postComment}>
          <Image style={{tintColor: colors.palette.BrownChoco, marginVertical: 10, resizeMode: 'contain', width: 20} } source={require('../../Assets/icons/ShareBoard/carbon_send.png')} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default ShareContentScreen;

const styles = StyleSheet.create({
  shareItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  titlecontainer: {
    flexDirection: "row",
    paddingLeft: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 20,
  },
  date: {
    fontSize: 14,
    color: "grey",
  },
  content: {
    fontSize: 16,
    marginHorizontal: "5%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  profile: {
    width: 65,
    height: 65,
    resizeMode: 'cover',
    borderRadius: 50,
    marginTop: 10,
  },
  commentView:{
    width: '90%',
    height: 50,
    backgroundColor: colors.palette.White,
    borderRadius: 20,
    borderColor: colors.palette.Brown,
    borderWidth: 1,
    marginHorizontal: '5%',
    position: 'absolute',
    bottom: '3%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  commetInput: {
    fontSize: 14,
    fontFamily: 'Popins-Medium'
  },
  boardImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10, 
    marginBottom: 10,
    borderRadius: 30,
  },
});
