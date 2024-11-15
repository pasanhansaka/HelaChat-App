import { useState } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { PasswordInputField } from "../../components/InputField/passwordInputField";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";
import SignInButton from "../../components/Button/signInButton";

export default function Verify() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const { mobile, firstName, lastName, profileImage, register, login, profileImageIsFound, profileImageText } = useLocalSearchParams();
    const [getPassword, setPassword] = useState("");
    const [getConfirmPassword, setConfirmPassword] = useState("");

    return (

        <Background>
            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>

                {/* SignUp Profile Image Area */}
                {
                    register === "true" ? (
                        <View style={styleSheet.ProfilePicContainer}>
                            {
                                profileImage === "false" ?
                                    <Text style={styleSheet.ProfileText}>{firstName.charAt(0) + "" + lastName.charAt(0)}</Text>
                                    :
                                    <Image source={serverURL + "/ProfileImages/" + mobile + ".png"} style={styleSheet.ProfilePic} transition={1000} />
                            }
                        </View>
                    ) : null
                }
                {/* SignUp Profile Image Area */}

                {/* SignIn Profile Image Area */}
                {
                    login === "true" ? (
                        <View style={styleSheet.ProfilePicContainer}>
                            {
                                profileImageIsFound === "true" ?
                                    <Image source={serverURL + "/ProfileImages/" + mobile + ".png"} style={styleSheet.ProfilePic} transition={1000} />
                                    :
                                    <Text style={styleSheet.ProfileText}>{profileImageText}</Text>
                            }
                        </View>
                    ) : null
                }
                {/* SignIn Profile Image Area */}

                {/* SignUp Password Field */}
                {
                    register === "true" ? (
                        <View>
                            <PasswordInputField
                                label="Enter Password"
                                placeHolder="Enter Your Password"
                                value={getPassword}
                                onChangeText={(text) => setPassword(text)}
                            />

                            <PasswordInputField
                                label="Confirm Password"
                                placeHolder="Confirm Your Password"
                                value={getConfirmPassword}
                                onChangeText={(text) => setConfirmPassword(text)}
                            />
                        </View>
                    ) : null
                }
                {/* SignUp Password Field */}

                {/* SignIn Password Field */}
                {
                    login === "true" ? (
                        <View>
                            <PasswordInputField
                                label="Enter Password"
                                placeHolder="Enter Your Password"
                                value={getPassword}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                    ) : null
                }
                {/* SignIn Password Field */}



                {/* Register Button Area */}
                {
                    register === "true" ? (
                        <SignInButton
                            label={"Register"}
                            onPress={
                                async () => {
                                    if (getPassword === "" | getConfirmPassword === "") {
                                        console.log("Please " + (getPassword === "" ? "Enter" : "Confirm") + " Your Password.");
                                        ToastAndroid.show("Please " + (getPassword === "" ? "Enter" : "Confirm") + " Your Password.", ToastAndroid.LONG);

                                    } else {

                                        if (getPassword === getConfirmPassword) {

                                            let user = {
                                                mobile: mobile,
                                                firstName: firstName,
                                                lastName: lastName,
                                                password: getPassword,
                                                cpassword: getConfirmPassword,
                                            }

                                            let response = await fetch(serverURL + "/SignUp",
                                                {
                                                    method: "POST",
                                                    body: JSON.stringify(user),
                                                    headers: { "Content-Type": "application/json" }
                                                }
                                            );

                                            if (response.ok) {
                                                let json = await response.json();

                                                if (json.success) {
                                                    let user = json.user;
                                                    let profileImage = json.profileImage;

                                                    try {
                                                        await AsyncStorage.setItem("user", JSON.stringify(user));
                                                        await AsyncStorage.setItem("profileImage", JSON.stringify(profileImage));
                                                        router.replace("../Home/home");

                                                    } catch (error) {
                                                        console.error("Error storing user:", error);
                                                        ToastAndroid.show("Failed to store user. Please try again.", ToastAndroid.LONG);
                                                    }

                                                } else {
                                                    console.log(json.message);
                                                    ToastAndroid.show(json.message, ToastAndroid.LONG);

                                                }
                                            } else {
                                                console.log("Somthing went wrong.Try again.");
                                                ToastAndroid.show("Somthing went wrong.Try again.", ToastAndroid.LONG);

                                            }

                                        } else {
                                            console.log("Passwords does not match.");
                                            ToastAndroid.show("Passwords does not match.", ToastAndroid.LONG);

                                        }
                                    }
                                }
                            } />
                    ) : null
                }
                {/* Register Button Area */}

                {/* SignIn Button Area */}
                {
                    login === "true" ? (
                        <SignInButton
                            label={"Login"}
                            onPress={
                                async () => {
                                    let response = await fetch(serverURL + "/SignIn",
                                        {
                                            method: "POST",
                                            body: JSON.stringify(
                                                {
                                                    mobile: mobile,
                                                    password: getPassword,
                                                }
                                            ),
                                            headers: { "Content-Type": "application/json" }
                                        }
                                    );

                                    if (response.ok) {
                                        let json = await response.json();

                                        if (json.success) {
                                            let user = json.user;
                                            let profileImage = json.profileImage;

                                            try {
                                                await AsyncStorage.setItem("user", JSON.stringify(user));
                                                await AsyncStorage.setItem("profileImage", JSON.stringify(profileImage));
                                                router.replace("../Home/home");

                                            } catch (error) {
                                                console.error("Error storing user:", error);
                                                ToastAndroid.show("Failed to store user. Please try again.", ToastAndroid.LONG);
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
                    ) : null
                }
                {/* SignIn Button Area */}


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
            borderRadius: 50,
        },

        ProfileText: {
            fontSize: 45,
            color: "white",
        },
    }
);
