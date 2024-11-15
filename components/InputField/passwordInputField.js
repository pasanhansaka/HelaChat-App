import { StyleSheet, Text, TextInput, View } from "react-native";
import { useFontsContext } from "../Font/loadFont";

export function PasswordInputField({ label, placeHolder, onChangeText, value }) {

    useFontsContext();

    return (

        <View style={styleSheet.inputGroup}>
            <Text style={styleSheet.inputLabel}>{label}</Text>
            <TextInput placeholder={placeHolder} style={styleSheet.inputFiled} numberOfLines={1} cursorColor={"red"} onChangeText={onChangeText} value={value} secureTextEntry={true} />
        </View>

    );

}

const styleSheet = StyleSheet.create(
    {
        inputGroup: {
            marginVertical: 10,
        },

        inputLabel: {
            fontFamily: "inputLabel",
            fontSize: 25,
            color: "#fec89a",
            marginStart: 5,
        },

        inputFiled: {
            height: 60,
            width: "100%",
            fontSize: 16,
            color: "#454545",
            backgroundColor: "#ffd7ba",
            paddingHorizontal: 10,
            borderRadius: 14,
            borderBottomWidth: 5,
            borderWidth: 1,
            borderTopColor: "#832161",
            borderLeftColor: "#832161",
            borderRightColor: "#832161",
            borderBottomColor: "#ef745c",
        },
    }
);
