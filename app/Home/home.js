import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";

export default function Home() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const [getChatArray, setChatArray] = useState([]);
    const [getSearchUser, setSearchUser] = useState("");

    async function loadHomeData() {
        try {
            let userJSON = await AsyncStorage.getItem("user");
            let user = JSON.parse(userJSON);

            let response = await fetch(serverURL + "/LoadHomeData?user_id=" + user.id + "&searchText=" + getSearchUser);

            if (response.ok) {
                let json = await response.json();

                if (json.success) {
                    let chatArray = json.chatJsonArray;
                    setChatArray(chatArray);

                } else {
                    console.log(json.message);
                    ToastAndroid.show(json.message, ToastAndroid.LONG);

                }
            } else {
                console.log("Somthing went wrong.Try again.");
                ToastAndroid.show("Somthing went wrong.Try again.", ToastAndroid.LONG);

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            loadHomeData();
        }, []
    );

    return (

        <Background>

            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Search Bar Area */}
            <View style={styleSheet.searchContainer}>
                <TextInput style={styleSheet.searchInputField} value={getSearchUser} cursorColor={"red"} placeholder={"Search User..."} onChangeText={
                    (text) => {
                        setSearchUser(text);
                    }
                } onKeyPress={
                    () => {
                        loadHomeData();
                    }
                } />
                <TouchableOpacity onPress={
                    () => {
                        loadHomeData();
                    }
                }>
                    <FontAwesome6 name={"magnifying-glass"} size={20} color={"#f1e7ea"} />
                </TouchableOpacity>
            </View>
            {/* Search Bar Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>
                <FlashList
                    data={getChatArray}
                    renderItem={
                        ({ item }) =>
                            <TouchableOpacity style={styleSheet.chatCard} onPress={
                                () => {
                                    router.push(
                                        {
                                            pathname: "../Chat/chat",
                                            params: item,
                                        }
                                    );
                                }
                            }>
                                <View style={item.otherUser_status === 1 ? styleSheet.chatCardProfilePicContainerOnline : styleSheet.chatCardProfilePicContainerOffline}>
                                    {
                                        item.otherUser_ProfileImageFound ?
                                            <Image source={serverURL + "/ProfileImages/" + item.otherUser_mobile + ".png"} style={styleSheet.chatCardProfilePic} transition={1000} />
                                            :
                                            <Text style={styleSheet.chatCardProfileText}>{item.otherUser_ProfileText}</Text>
                                    }
                                </View>
                                <View style={styleSheet.chatCardProfileTextContainer}>
                                    <Text style={styleSheet.chatCardName} numberOfLines={1}>{item.otherUser_name}</Text>
                                    <Text style={styleSheet.chatCardMessage} numberOfLines={1}>{item.message}</Text>
                                    <View style={styleSheet.chatCardDateContainer}>
                                        <Text style={styleSheet.chatCardDateText} numberOfLines={1}>{item.dateTime}</Text>
                                        <FontAwesome6 name={"check-to-slot"} size={14} color={item.chatStatus_id === 1 ? "green" : "grey"} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                    }
                    estimatedItemSize={200}
                />
            </View >
            {/* Body Area */}

            {/* Footer Navigation Bar Area */}
            <View style={styleSheet.footer}>
                <TouchableOpacity style={styleSheet.footerHomeButton}>
                    <Image source={require("../../assets/images/home_2.svg")} style={styleSheet.footerProfileIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styleSheet.footerProfileButton} onPress={
                    () => {
                        router.replace("../Profile/profile");
                    }
                }>
                    <Image source={require("../../assets/images/user_1.svg")} style={styleSheet.footerProfileIcon} />
                </TouchableOpacity>
            </View>
            {/* Footer Navigation Bar Area */}

        </Background >

    );

}

const styleSheet = StyleSheet.create(
    {
        searchContainer: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 5,
            paddingHorizontal: 30,
            columnGap: 10,
        },

        searchInputField: {
            width: "100%",
            height: 40,
            fontSize: 16,
            backgroundColor: "#dadad3",
            color: "#22223b",
            borderWidth: 2,
            borderRadius: 25,
            paddingHorizontal: 10,
        },

        body: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 10,
        },

        chatCard: {
            width: "100%",
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fec89a",
            borderRadius: 10,
            paddingHorizontal: 8,
            paddingVertical: 10,
            columnGap: 10,
            marginBottom: 5,
        },

        chatCardProfilePicContainerOffline: {
            width: 60,
            height: 60,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            borderWidth: 3,
            borderColor: "red",
        },

        chatCardProfilePicContainerOnline: {
            width: 60,
            height: 60,
            backgroundColor: "grey",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "green",
        },

        chatCardProfilePic: {
            width: "100%",
            height: "100%",
            borderRadius: 50,
        },

        chatCardProfileText: {
            fontFamily: "profileText",
            fontSize: 25,
        },

        chatCardProfileTextContainer: {
            flex: 1,
        },

        chatCardName: {
            fontFamily: "chatName",
            fontSize: 20,
        },

        chatCardMessage: {
            fontFamily: "chatMessage",
            fontSize: 12,
        },

        chatCardDateContainer: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            columnGap: 10,
        },

        chatCardDateText: {
            fontSize: 10,
        },

        footer: {
            flexDirection: "row",
            width: "100%",
            height: 50,
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
