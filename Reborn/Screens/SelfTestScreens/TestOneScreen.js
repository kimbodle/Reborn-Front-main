import React, { useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors} from "../../theme";
import { ViewStyles, buttonStyles } from "../../components"

const questions = [
    { question: '1. 나는 반려동물의 살리지 못한 수의사에게 화가 난다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['1/16'] },
    { question: '2. 나는 반려동물의 죽음이 매우 속상하다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['2/16'] },
    { question: '3. 반려동물이 없는 나의 삶은 비어있는 것 같다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['3/16'] },
    { question: '4. 나는 반려동물의 죽음에 대한 악몽을 꾸고 있다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['4/16'] },
    { question: '5. 나는 반려동물이 없는데 대해 외로움을 느낀다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['5/16'] },
    { question: '6. 나는 반려동물에게 뭔가 나쁜 일이 일어나고 있다는 사실을 알았어야만 했다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['6/16'] },
    { question: '7. 나는 반려동물이 너무나도 그립다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['7/16'] },
    { question: '8. 나는 반려동물을 좀 더 잘 돌보지 못한데 대한 죄책감을 느낀다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['8/16'] },
    { question: '9. 나는 반려동물을 살리고자 더 많은 행동을 하지 않았던 것에 낙담하였다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['9/16'] },
    { question: '10. 나는 반려동물을 생각하면 눈물이 난다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['10/16'] },
    { question: '11. 나는 반려동물의 죽음에 영향을 준 사람들에 대해서 화가 난다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['11/16'] },
    { question: '12. 나는 반려동물의 죽음에 대해서 큰 슬픔을 느낀다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['12/16'] },
    { question: '13. 나는 도움이 되지 않았던 친구/가족에게 화가 난다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['13/16'] },
    { question: '14. 반려동물의 마지막 순간에 대한 기억들이 뇌리에서 떠나지 않는다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['14/16'] },
    { question: '15. 나는 반려동물의 상실을 극복하지 못할 것 같다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['15/16'] },
    { question: '16. 나는 반려동물을 더 많이 사랑해 주었다면 좋았을 것이라고 생각한다.', answers: ['매우 그렇지 않다.', '그렇지 않다.', '그렇다.', '매우 그렇다.'], scores: [0, 1, 2, 3], index: ['16/16'] },
];

const RadioButton = ({ isSelected, onPress, label }) => {
  return (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
      <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
        {isSelected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}; //개고생한 체크

export default function TestScreen({ navigation }) {
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // 선택된 답변 인덱스를 위한 상태

    const handleNextQuestion = () => {
        if (selectedAnswerIndex !== null) { //선택된 답변일때
            const score = questions[currentQuestionIndex].scores[selectedAnswerIndex];
            setTotalScore(totalScore + score);
            setSelectedAnswerIndex(null); //다음 질문일때

            if (currentQuestionIndex < questions.length - 1) {
                setcurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                console.log(totalScore + score); //점수 합산ㅇ
                // 마지막 질문에 답한 후, TestResultScreen으로 이동하면서 점수를 파라미터로 전달
                navigation.navigate('TestResult', { score: totalScore + score });
            }
        }
    };

    return (
      <View style={ViewStyles.container}>
          <View style={[ViewStyles.greyBox, {marginTop: '15%',}]}>
            <View>
              <Text style={styles.questionText}>
                {questions[currentQuestionIndex].question}
              </Text>
            </View>
            <View>
              <View style={{ paddingHorizontal: 20 }}>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <RadioButton
                    key={index}
                    isSelected={selectedAnswerIndex === index}
                    onPress={() => setSelectedAnswerIndex(index)}
                    label={answer}
                  />
                ))}
              </View>
            </View>
            <Text style={{marginTop: 20,}}>{questions[currentQuestionIndex].index}</Text>
          </View>
          <TouchableOpacity style={[buttonStyles.buttonBrown]} onPress={handleNextQuestion}>
            <Text style={{color: "white"}}>다음으로</Text>
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      marginRight: "30%",
    },
    radioButton: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
    radioButtonSelected: {
      borderColor: colors.palette.BrownDark,
    },
    radioButtonInner: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: colors.palette.Brown,
    },
    radioButtonLabel: {
      fontSize: 16,
    },
    questionText: {
      fontSize: 16,
      marginBottom: '15%',
      paddingHorizontal: 35,
    },
});