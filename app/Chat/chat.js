import { Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlashList } from "@shopify/flash-list";
import { useFontsContext } from "../../components/Font/loadFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from "../../components/Background/Background";

export default function Chat() {

    useFontsContext();

    const serverURL = process.env.EXPO_PUBLIC_URL;
    const parameters = useLocalSearchParams();
    const [getChatArray, setChatArray] = useState([]);
    const [getMessage, setMessage] = useState("");

    useEffect(
        () => {
            async function loadChatData() {
                try {
                    let userJSON = await AsyncStorage.getItem("user");
                    let user = JSON.parse(userJSON);

                    let response = await fetch(serverURL + "/LoadChatData?user_id=" + user.id + "&otherUser_id=" + parameters.otherUser_id);

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
                    ToastAndroid.show(error, ToastAndroid.LONG);
                }
            }
            loadChatData();

            setInterval(() => { loadChatData(); }, 5000);
        }, []
    );

    return (

        <Background>

            {/* Header Area */}
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            <View style={styleSheet.header}>
                <View style={styleSheet.headerProfile}>
                    <Pressable style={styleSheet.headerBackButton} onPress={
                        () => {
                            router.back();
                        }
                    }>
                        <FontAwesome6 name={"arrow-left"} size={25} color={"#f2f2f2"} />
                    </Pressable>
                    <View style={parameters.otherUser_status === "1" ? styleSheet.headerProfilePicContainerOnline : styleSheet.headerProfilePicContainerOffline}>
                        {
                            parameters.otherUser_ProfileImageFound === "true" ?
                                <Image source={serverURL + "/ProfileImages/" + parameters.otherUser_mobile + ".png"} style={styleSheet.headerProfilePic} transition={1000} />
                                :
                                <Text style={styleSheet.headerProfileText}>{parameters.otherUser_ProfileText}</Text>
                        }
                    </View>
                </View>
                <View>
                    <Text style={styleSheet.headerName}>{parameters.otherUser_name}</Text>
                    <Text style={styleSheet.headerStatus}>{parameters.otherUser_status === "1" ? "Online" : "Offline"}</Text>
                </View>
            </View>
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>
                <FlashList
                    data={getChatArray}
                    renderItem={
                        ({ item }) =>
                            <View style={item.side === "right" ? styleSheet.bodyRightMsgBox : styleSheet.bodyLeftMsgBox}>
                                <Text style={styleSheet.bodyMsgText}>{item.message}</Text>
                                <View style={styleSheet.bodyDateContainer}>
                                    <Text style={styleSheet.bodyDateText}>{item.datetime}</Text>
                                    {
                                        item.side === "right" ?
                                            <FontAwesome6 name={"check-to-slot"} size={14} color={item.status === "1" ? "green" : "grey"} />
                                            :
                                            null
                                    }
                                </View>
                            </View>
                    }
                    estimatedItemSize={200}
                />
            </View>
            {/* Body Area */}

            {/* Footer Navigation Bar Area */}
            <View style={styleSheet.footer}>
                <TextInput style={styleSheet.footerInputField} value={getMessage} cursorColor={"red"} placeholder={"Enter Your Message..."} onChangeText={
                    (text) => {
                        setMessage(text);
                    }
                } />
                <TouchableOpacity style={styleSheet.footerSendButton} onPress={
                    async () => {
                        if (getMessage == "") {
                            console.log("Please Enter a Message.");
                            ToastAndroid.show("Please Enter a Message.", ToastAndroid.LONG);
                        } else {
                            try {
                                let userJSON = await AsyncStorage.getItem("user");
                                let user = JSON.parse(userJSON);

                                let response = await fetch(serverURL + "/SendChat?user_id=" + user.id + "&otherUser_id=" + parameters.otherUser_id + "&message=" + getMessage);

                                if (response.ok) {
                                    let json = await response.json();

                                    if (json.success) {
                                        console.log(json.message);
                                        setMessage("");

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
                    }
                }>
                    <FontAwesome6 name={"paper-plane"} size={20} />
                </TouchableOpacity>
            </View>
            {/* Footer Navigation Bar Area */}

        </Background >

    );

}

const styleSheet = StyleSheet.create(
    {
        header: {
            width: "100%",
            height: 70,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#2a324b",
            paddingHorizontal: 8,
        },

        headerProfile: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
            marginHorizontal: 10,
        },

        headerProfilePicContainerOffline: {
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "red",
        },

        headerProfilePicContainerOnline: {
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "grey",
            borderRadius: 50,
            borderWidth: 3,
            borderColor: "green",
        },

        headerBackButton: {
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
        },

        headerProfilePic: {
            width: "100%",
            height: "100%",
            borderRadius: 50,
        },

        headerProfileText: {
            fontFamily: "profileText",
            fontSize: 23,
            color: "#f2f2f2",
        },

        headerName: {
            fontFamily: "chatName",
            fontSize: 22,
            color: "#f2f2f2",
        },

        headerStatus: {
            fontFamily: "chatMessage",
            fontSize: 13,
            color: "#f2f2f2",
        },

        body: {
            flex: 1,
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 15,
            rowGap: 10,
        },

        bodyRightMsgBox: {
            fontFamily: "chatMessage",
            maxWidth: 300,
            height: "auto",
            alignSelf: "flex-end",
            backgroundColor: "#fec89a",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            borderBottomStartRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginBottom: 5,
        },

        bodyLeftMsgBox: {
            fontFamily: "chatMessage",
            maxWidth: 300,
            height: "auto",
            alignSelf: "flex-start",
            backgroundColor: "#edede9",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            borderBottomEndRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 5,
            marginBottom: 5,
        },

        bodyMsgText: {
            fontFamily: "chatContent",
            fontSize: 18,
        },

        bodyDateContainer: {
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-end",
            columnGap: 10,
        },

        bodyDateText: {
            fontSize: 10,
        },

        footer: {
            flexDirection: "row",
            width: "100%",
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 35,
            columnGap: 5,
            marginBottom: 10,
        },

        footerInputField: {
            width: "100%",
            height: 55,
            fontSize: 16,
            backgroundColor: "#edede9",
            color: "#22223b",
            borderWidth: 2,
            borderRadius: 25,
            paddingHorizontal: 10,
        },

        footerSendButton: {
            width: 55,
            height: 55,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#d5bdaf",
            borderRadius: 50,
        },

    }
);
