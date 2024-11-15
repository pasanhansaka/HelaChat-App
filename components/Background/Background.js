import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import LoadFonts from "../Font/loadFont";

export default function Background({ children }) {

    return (

        <LoadFonts>
            <LinearGradient colors={['#ef745c', '#34073d']} style={styleSheet.InnerScreen}>
                <View style={styleSheet.screenSize}>
                    {children}
                </View>
            </LinearGradient>
        </LoadFonts>

    );

}

const styleSheet = StyleSheet.create(
    {
        screenSize: {
            flex: 1,
        },

        InnerScreen: {
            width: "100%",
            height: "100%",
        },
    }
);
