import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFontsContext } from "../Font/loadFont";

export default function WelcomeButton({ onPress, label }) {

    useFontsContext();

    return (

        <TouchableOpacity style={styleSheet.ContinueButton} onPress={onPress}>
            <LinearGradient colors={['#ff930f', '#fff95b']} style={styleSheet.ContinueButton}>
                <Text style={styleSheet.ContinueButtonText}>{label}</Text>
                <FontAwesome6 name={"hand-point-right"} size={20} color={"#461220"} />
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
            fontFamily:"welcome",
            fontSize: 20,
            color: "#461220",
        },

    }
);
