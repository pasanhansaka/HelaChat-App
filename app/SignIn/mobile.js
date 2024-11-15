import { StyleSheet, ToastAndroid, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { MobileInputField } from "../../components/InputField/mobileInputField";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import Background from "../../components/Background/Background";
import SignInButton from "../../components/Button/signInButton";
import Logo from "../../components/Logo/Logo";

export default function Mobile() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const [getMobile, setMobile] = useState("");

    return (

        <Background>

            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>

                {/* Common Image Area */}
                <View style={styleSheet.ProfilePicContainer}>
                    <Image source={require("../../assets/images/profilePic.gif")} style={styleSheet.ProfilePic} transition={1000} />
                </View>
                {/* Common Image Area */}

                {/* Mobile Password Field */}
                <MobileInputField label={"Mobile"} value={getMobile} placeHolder={"Enter Mobile Number"} onChangeText={
                    (text) => {
                        setMobile(text)
                    }}
                />
                {/* Mobile Password Field */}

                {/* Continue Button Area */}
                <SignInButton label={"Continue"} onPress={
                    async () => {
                        let response = await fetch(serverURL + "/CheckUser",
                            {
                                method: "POST",
                                body: JSON.stringify({ mobile: getMobile }),
                                headers: { "Content-Type": "application/json" }
                            }
                        );

                        if (response.ok) {
                            let json = await response.json();

                            if (json.success) {

                                if (json.userFound) {
                                    router.replace(
                                        {
                                            pathname: "./verify",
                                            params: {
                                                mobile: getMobile,
                                                register: json.register,
                                                login: json.login,
                                                profileImageIsFound: json.profileImage.user_ProfileImageFound,
                                                profileImageText: json.profileImage.user_ProfileText,
                                            }
                                        }
                                    );
                                } else {
                                    router.replace(
                                        {
                                            pathname: "./details",
                                            params: {
                                                mobile: getMobile,
                                                register: json.register,
                                                login: json.login,
                                            }
                                        }
                                    );
                                }

                            } else {
                                console.log(json.message);
                                ToastAndroid.show(json.message, ToastAndroid.LONG);
                            }
                        } else {
                            console.log("Somthing went wrong.Try again.");
                            ToastAndroid.show("Somthing went wrong.Try again.", ToastAndroid.LONG);
                        }
                    }
                } />
                {/* Continue Button Area */}

            </View>
            {/* Body Area */}

        </Background >

    );

}

const styleSheet = StyleSheet.create(
    {
        body: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 15,
        },

        ProfilePicContainer: {
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "grey",
            borderWidth: 5,
            borderRadius: 100,
            marginVertical: 20,
        },

        ProfilePic: {
            width: "100%",
            height: "100%",
            borderRadius:50,
        },
    }
);
