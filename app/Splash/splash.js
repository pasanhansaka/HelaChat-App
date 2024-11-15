import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useFontsContext } from "../../components/Font/loadFont";
import MaskedView from "@react-native-masked-view/masked-view";
import LottieView from "lottie-react-native";
import Logo from "../../components/Logo/Logo";
import Background from "../../components/Background/Background";

export default function SplashSCreen() {

    useFontsContext();

    return (

        <Background>

            {/* Header Area */}
            <Logo />
            <StatusBar style="light" backgroundColor="#1A1A1A" translucent={true} />
            {/* Header Area */}

            {/* Body Area */}
            <View style={styleSheet.body}>
                <MaskedView style={styleSheet.splashScreenTextContainer}
                    maskElement={
                        <View style={styleSheet.splashScreenTextMask}>
                            <Text style={styleSheet.splashScreenText}>Please Wait...</Text>
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

                <View style={styleSheet.container}>
                    <LottieView
                        source={require('../../assets/images/loader1.json')}
                        autoPlay
                        loop
                        style={styleSheet.animation}
                    />
                </View>
            </View>
            {/* Body Area */}

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

        splashScreenTextContainer: {
            height: 300,
            width: "100%",
            flexDirection: 'row',
        },

        splashScreenTextMask: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 150,
        },

        splashScreenText: {
            fontFamily: "loading",
            fontSize: 50,
        },

        container: {
            alignItems: 'center',
        },

        animation: {
            width: 100,
            height: 100,
        },
    }
);
