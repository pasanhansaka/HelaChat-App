import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFontsContext } from "../Font/loadFont";

export default function SignInButton({ onPress, label }) {

    useFontsContext();

    return (

        <TouchableOpacity style={styleSheet.ContinueButton} onPress={onPress}>
            <LinearGradient colors={['#ffc49b', '#ee964b']} style={styleSheet.ContinueButton}>
                <Text style={styleSheet.ContinueButtonText}>{label}</Text>
                <FontAwesome6 name={"right-to-bracket"} size={20} color={"#461220"} />
            </LinearGradient>
        </TouchableOpacity>

    );

}

const styleSheet = StyleSheet.create(
    {
        ContinueButton: {
            width: "100%",
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 15,
            marginTop: 10,
            borderRadius: 30,
        },

        ContinueButtonText: {
            fontFamily:"continue",
            fontSize: 20,
            color: "#461220",
        },

    }
);
