import { StyleSheet } from "react-native";
import { colors } from "../theme";
import styled from "styled-components/native";
import React from "react";

export const buttonStyles = StyleSheet.create({
    buttonYellow: {
        backgroundColor: colors.palette.Yellow,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        marginVertical: '5%',
        marginBottom: '20%',
        borderRadius: 30,
        height: 50,
    },
    buttonBrown: {
        backgroundColor: colors.palette.Brown,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
        marginVertical: '5%',
        marginBottom: '15%',
        borderRadius: 30,
        height: 50,
    },
    buttonLogin: {
        backgroundColor: colors.palette.NaverGreen,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '8%',
        marginVertical: '5%',
        borderRadius: 16,
        height: 55,
    },
    buttonWhiteBrown: {
        backgroundColor: colors.palette.White,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '20%',
        marginVertical: '10%',
        borderRadius: 30.5,
        height: 55,
        borderColor: colors.palette.Brown,
        borderWidth: 1,
    },
    buttonBrownBottom: {
        backgroundColor: colors.palette.Brown,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -50,
        borderRadius: 30,
        height: 50,
        marginHorizontal: 100,
    },
});

const PressableBrownBottom = styled.Pressable`
    background-color: ${colors.palette.Brown};
    justify-content: center;
    align-items: center;
    margin: -12% 30% 0% 30%;
    border-radius: 30px;
    height: 45px;
`;

const ButtonText = styled.Text`
    font-family: 'Poppins-Regular';
    font-size: 16px;
    color: ${colors.palette.White};
    justify-content: center;
    text-align: center;
`;

export const ButtonBrownBottom = ({text, onPress}) => {
    return (
    <PressableBrownBottom onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </PressableBrownBottom>
    );
};

const PressableBrown = styled.Pressable`
    background-color: ${colors.palette.Brown};
    justify-content: center;
    align-items: center;
    width: 300px;
    border-radius: 30px;
    height: 50px;
`;

const PressableYellow = styled.Pressable`
    background-color: ${colors.palette.Yellow};
    justify-content: center;
    align-items: center;
    width: 90%;
    border-radius: 30px;
    height: 50px;
    margin: 0% 0% 5% 0%;
`;


export const ButtonBrown = ({text, onPress}) => {
    return (
    <PressableBrown onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </PressableBrown>
    );
};

export const ButtonYellow = ({text, onPress}) => {
    return (
    <PressableYellow onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </PressableYellow>
    );
};



const CompletePressable = styled.Pressable`
    font-family: 'Poppins-Regular';
    background-color: ${colors.palette.Green};
    padding: 2%;
    margin: 5% 8% 5% 68%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;


export const CompleteButton = ( {text, onPress} ) => {
    return (
        <CompletePressable onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </CompletePressable>
    );
};