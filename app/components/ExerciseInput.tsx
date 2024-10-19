import { useState } from "react";
import { View, TextInput } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styled } from "nativewind";

type Exercise = {
  name: string;
};

const StyledTextInput = styled(TextInput);

const ExerciseInput = () => {
  const [exercise, setExercise] = useState<Exercise>({ name: "" });

  const handleInput = async (exerciseName: string) => {
    try {
      await firestore().collection("Exercises").add({
        name: exerciseName,
      });
      setExercise({ name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <StyledTextInput
        className="flex border"
        onBlur={() => handleInput(exercise.name)}
        value={exercise.name ?? ""}
        onChangeText={(text) => setExercise({ name: text })}
      />
    </View>
  );
};

export { ExerciseInput };
