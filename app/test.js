import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react"

async () => {
    const [getName, setName] = useState("");

    const user = {
        mobile: "0701769147",
        name: "Pasan",
    }

    await AsyncStorage.setItem("user",JSON.stringify(user));
}
