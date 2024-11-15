import { useState, useEffect } from "react";
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";

export default function Profile() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const [getFirstName, setFirstName] = useState("");
    const [getLastName, setLastName] = useState("");
    const [getMobile, setMobile] = useState("");
    const [getProfileImageIsFound, setProfileImageIsFound] = useState(false);
    const [getProfileText, setProfileText] = useState("");

    useEffect(
        () => {
            async function checkUserStorage() {
                try {
                    let userJSON = await AsyncStorage.getItem("user");
                    let profileImageJSON = await AsyncStorage.getItem("profileImage");

                    let user = JSON.parse(userJSON);
                    let profileImage = JSON.parse(profileImageJSON);

                    setFirstName(user.first_name);
                    setLastName(user.last_name);
                    setMobile(user.mobile);
                    setProfileImageIsFound(profileImage.user_ProfileImageFound);
                    setProfileText(profileImage.user_ProfileText);
                } catch (error) {
                    console.log(error);
                }
            }
            checkUserStorage();
        }, []
    );

    return (

        <Background>

            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>

                <View style={styleSheet.profileImageContainer}>
                    {
                        getProfileImageIsFound ?
                            <Image source={serverURL + "/ProfileImages/" + getMobile + ".png"} style={styleSheet.profileImage} transition={1000} />
                            :
                            <Text style={styleSheet.profileText}>{getProfileText}</Text>
                    }
                </View>

                <Text style={styleSheet.profileName}>{getFirstName + " " + getLastName}</Text>
                <Text style={styleSheet.profileNumber}>{getMobile}</Text>


                <TouchableOpacity style={styleSheet.logOutButton} onPress={
                    async () => {

                        let response = await fetch(serverURL + "/LogOut?mobile=" + getMobile);

                        if (response.ok) {
                            let json = await response.json();

                            if (json.success) {
                                try {
                                    await AsyncStorage.removeItem("user");;
                                    await AsyncStorage.removeItem("profileImage");
                                    ToastAndroid.show("You have been Logged Out Successfully.", ToastAndroid.LONG);
                                    router.replace("/");

                                } catch (error) {
                                    console.error("Error storing user:", error);
                                    ToastAndroid.show("Failed to Remove user. Please try again.", ToastAndroid.LONG);
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
                }>
                    <FontAwesome6 name={"right-from-bracket"} size={20} color={"#fec89a"} />
                    <Text style={styleSheet.logOutText}>Log Out</Text>
                </TouchableOpacity>

            </View >
            {/* Body Area */}

            {/* Footer Navigation Bar Area */}
            <View style={styleSheet.footer}>
                <TouchableOpacity style={styleSheet.footerHomeButton} onPress={
                    () => {
                        router.replace("../Home/home");
                    }
                }>
                    <Image source={require("../../assets/images/home_1.svg")} style={styleSheet.footerProfileIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styleSheet.footerProfileButton} >
                    <Image source={require("../../assets/images/user_2.svg")} style={styleSheet.footerProfileIcon} />
                </TouchableOpacity>
            </View>
            {/* Footer Navigation Bar Area */}

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
            width: 200,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#adb5bd",
            borderWidth: 5,
            borderColor: "#5a189a",
            borderRadius: 100,
            marginVertical: 20,
        },

        profileImage: {
            width: "100%",
            height: "100%",
            borderRadius: 100,
        },

        profileText: {
            fontFamily: "profileText",
            fontSize: 100,
        },

        profileName: {
            fontFamily: "profileName",
            fontSize: 30,
            textTransform: "uppercase",
            alignSelf: "center",
            color: "#f4f0bb",
            marginTop: 20,
        },

        profileNumber: {
            fontFamily: "profileMobile",
            fontSize: 23,
            alignSelf: "center",
            color: "#faf0ca",
        },

        logOutButton: {
            width: "100%",
            height: 50,
            backgroundColor: "#d00000",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            columnGap: 15,
            marginTop: 100,
        },

        logOutText: {
            fontFamily: "logout",
            fontSize: 25,
            color: "#fec89a",
        },

        footer: {
            width: "100%",
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
            backgroundColor: "#ef745c",
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            borderTopWidth: 4,
            borderTopColor: "#832161",
            columnGap: 1,
        },

        footerHomeButton: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRightWidth: 1,
            borderRightColor: "#FFD700",
            backgroundColor: "#dda15e",
            borderTopStartRadius: 50,
        },

        footerProfileButton: {
            flex: 1,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 1,
            borderLeftColor: "#FFD700",
            backgroundColor: "#dda15e",
            borderTopEndRadius: 50,
        },

        footerProfileIcon: {
            width: 30,
            height: 30,
        },
    }
);
