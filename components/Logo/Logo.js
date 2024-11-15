import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { useFontsContext } from "../Font/loadFont";

export default function Logo() {

    useFontsContext();

    return (

        <View style={styleSheet.header}>
            <Image source={require("../../assets/images/logo.svg")} style={styleSheet.headerLogo} transition={1000} />
            <Text style={styleSheet.headerText}>HelaChat</Text>
        </View>

    );

}

const styleSheet = StyleSheet.create(
    {
        header: {
            width: "100%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            columnGap: 10,
            marginBottom: 5,
            paddingVertical: 10,
            backgroundColor: "#dda15e",
            borderBottomStartRadius: 30,
            borderBottomEndRadius: 30,
            borderBottomWidth: 4,
            borderBottomColor: "#832161",
        },

        headerLogo: {
            width: 40,
            height: 40,
        },

        headerText: {
            fontFamily: "logo",
            fontSize: 35,
            color: "#0077b6",
        },
    }
);
