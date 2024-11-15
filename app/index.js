import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFontsContext } from "../components/Font/loadFont";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaskedView from "@react-native-masked-view/masked-view";
import Background from "../components/Background/Background";
import WelcomeButton from "../components/Button/welcomeButton";
import Logo from "../components/Logo/Logo";

export default function App() {

    useFontsContext();

    useEffect(
        () => {
            async function checkUserStorage() {
                try {
                    let userJSON = await AsyncStorage.getItem("user");

                    if (userJSON !== null) {
                        router.push("/Home/home");
                    }

                } catch (error) {
                    console.log(error);
                    ToastAndroid.show(error, ToastAndroid.LONG);
                }
            }
            checkUserStorage();
        }, []
    );

    return (

        <Background>

            <Logo />
            <View style={styleSheet.body}>
                <MaskedView style={styleSheet.welcomeTextContainer}
                    maskElement={
                        <View style={styleSheet.welcomeTextMask}>
                            <Text style={styleSheet.welcomeText}>Welcome</Text>
                        </View>
                    }
                >
                    <LinearGradient
                        colors={['#ff930f', '#fff95b']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ flex: 1 }}
                    />
                </MaskedView>


                <WelcomeButton label={"Welcome"} style={styleSheet.welcomeButton} onPress={
                    () => {
                        router.replace("./SignIn/mobile");
                        // router.push("./Splash/splash");
                    }
                } />
            </View>

        </Background>

    );
}

const styleSheet = StyleSheet.create(
    {
        body: {
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 15,
        },

        welcomeTextContainer: {
            height: 500,
            width: "100%",
            flexDirection: 'row',
        },

        welcomeTextMask: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
            marginBottom: 300,
        },

        welcomeText: {
            fontFamily: "welcome",
            fontSize: 72,
        },
    }
);
