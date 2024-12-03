import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { colors } from "../theme";
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Props {
  showToast: boolean;
  message?: string;
}

export const Toast = ({ showToast, message }: Props): JSX.Element => {
    const positionY = useSharedValue(100); // for slide up animation
    const [toastWidth, setToastWidth] = useState(40); // width

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(positionY.value) }],
    };
  });

  useEffect(() => {
    if (showToast && message) {
      const calculatedWidth = Math.min(Math.max(message.length * 10 + 40, 100), 300); // min 40, max 300
      setToastWidth(calculatedWidth);
    }
  }, [showToast, message]);

  if (showToast) {
      positionY.value = -16;
  } else {
      positionY.value = 100;
  }

  return (
    <Animated.View
      style={[
        styles.commonToastStyle,
        styles.bottomToastStyle,
        animatedStyle,
        { width: toastWidth }, // dynamic width according to message's length
      ]}
    >
      <Text style={{color: colors.palette.White, textAlign:"center"}}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    commonToastStyle: {
      height: 40,
      borderRadius: 24,
      margin: 8,
      padding: 8,
      elevation: 4,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      right: 0,
      left: 0,
      zIndex: 100,
    },
    bottomToastStyle: {
      backgroundColor: '#C85A55',
      opacity: 0.72,
      bottom: 0,
    },
});
