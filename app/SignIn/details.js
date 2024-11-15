import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { NormalInputField } from "../../components/InputField/normalInputField";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import Background from "../../components/Background/Background";
import Logo from "../../components/Logo/Logo";
import SignInButton from "../../components/Button/signInButton";

export default function Details() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const { mobile, register, login } = useLocalSearchParams();
    const [getProfileImage, setProfileImage] = useState(null);
    const [getFirstName, setFirstName] = useState("");
    const [getLastName, setLastName] = useState("");

    return (

        <Background>

            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>
                <ScrollView style={styleSheet.scrollView}>

                    {/* Profile Image Selector Area */}
                    <TouchableOpacity style={styleSheet.profileImageContainer} onPress={
                        async () => {
                            let result = await ImagePicker.launchImageLibraryAsync(
                                {
                                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                    aspect: [4, 3],
                                    quality: 1,
                                }
                            );

                            if (!result.canceled) {
                                setProfileImage(result.assets[0].uri);
                            }

                        }
                    }>
                        {
                            getProfileImage === null ?
                                <FontAwesome6 name={"plus"} size={50} />
                                :
                                <Image source={getProfileImage} style={styleSheet.profileImage} transition={1000} />
                        }
                    </TouchableOpacity>
                    {/* Profile Image Selector Area */}

                    {/* Name Filling Area */}
                    <NormalInputField label={"First Name"} value={getFirstName} placeHolder={"Enter First Name"} onChangeText={
                        (text) => {
                            setFirstName(text);
                        }
                    } />

                    <NormalInputField label={"Last Name"} value={getLastName} placeHolder={"Enter Last Name"} onChangeText={
                        (text) => {
                            setLastName(text);
                        }
                    } />
                    {/* Name Filling Area */}

                    {/* Continue Button Area */}
                    <SignInButton label={"Continue"} onPress={
                        async () => {
                            if (getFirstName === "" | getLastName === "") {
                                console.log("Please Enter Your " + (getFirstName === "" ? "First" : "Last") + " Name.");
                                ToastAndroid.show("Please Enter Your " + (getFirstName === "" ? "First" : "Last") + " Name.", ToastAndroid.LONG);

                            } else {
                                if (getProfileImage === null) {
                                    router.replace(
                                        {
                                            pathname: "./verify",
                                            params: {
                                                mobile: mobile,
                                                firstName: getFirstName,
                                                lastName: getLastName,
                                                register: register,
                                                login: login,
                                                profileImage: "false",
                                            },
                                        }
                                    );

                                } else {

                                    let formData = new FormData();
                                    if (getProfileImage !== null) {
                                        formData.append("mobile", mobile);
                                        formData.append("profileImage",
                                            {
                                                name: "profileImage",
                                                type: "image/png",
                                                uri: getProfileImage,
                                            }
                                        );
                                    }

                                    let response = await fetch(serverURL + "/UploadProfileImage",
                                        {
                                            method: "POST",
                                            body: formData,
                                        }
                                    );

                                    if (response.ok) {

                                        let json = await response.json();

                                        if (json.Uploaded) {
                                            router.replace(
                                                {
                                                    pathname: "./verify",
                                                    params: {
                                                        mobile: mobile,
                                                        firstName: getFirstName,
                                                        lastName: getLastName,
                                                        register: register,
                                                        login: login,
                                                        profileImage: "true",
                                                    },
                                                }
                                            );
                                            console.log(json.message);

                                        } else {
                                            console.log(json.message);
                                            ToastAndroid.show(json.message, ToastAndroid.LONG);
                                        }
                                    } else {
                                        console.log("Somthing went wrong.Try again.");
                                        ToastAndroid.show("Somthing went wrong.Try again.", ToastAndroid.LONG);
                                    }

                                }

                            }
                        }
                    } />
                    {/* Continue Button Area */}

                </ScrollView>
            </View >
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

        profileImageContainer: {
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

        profileImage: {
            width: "100%",
            height: "100%",
            borderRadius: 100,
        },

        scrollView: {
            height: "100%",
            width: "100%",
        },
    }
);
