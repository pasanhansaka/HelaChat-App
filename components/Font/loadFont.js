import { useFonts } from "expo-font";
import { createContext, useContext, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen"

SplashScreen.preventAutoHideAsync();

const FontsContext = createContext();

export default function LoadFonts({ children }) {

    const [loaded, error] = useFonts(
        {
            "chatContent": require("../../assets/fonts/chatContent.ttf"),
            "chatMessage": require("../../assets/fonts/chatMessage.ttf"),
            "chatName": require("../../assets/fonts/chatName.ttf"),
            "continue": require("../../assets/fonts/continue.ttf"),
            "inputLabel": require("../../assets/fonts/inputLabel.otf"),
            "loading": require("../../assets/fonts/loading.otf"),
            "logo": require("../../assets/fonts/logo.ttf"),
            "logout": require("../../assets/fonts/logout.otf"),
            "profileMobile": require("../../assets/fonts/profileMobile.otf"),
            "profileName": require("../../assets/fonts/profileName.ttf"),
            "profileText": require("../../assets/fonts/profileText.ttf"),
            "welcome": require("../../assets/fonts/welcome.ttf"),
        }
    );

    useEffect(
        () => {
            if (loaded || error) {
                SplashScreen.hideAsync();
            }
        }, [loaded, error]
    );

    if (!loaded && !error) {
        return null;
    }

    const fonts = { loaded, error };

    return (

        <FontsContext.Provider value={fonts}>
            {loaded || error ? children : null}
        </FontsContext.Provider>

    );

}

export const useFontsContext = () => {
    return useContext(FontsContext);
};
