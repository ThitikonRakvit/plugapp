import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, ActivityIndicator } from "react-native";
import { useFonts, LexendDeca_400Regular } from "@expo-google-fonts/lexend-deca";

import LogIn from "./LogIn";
import signup from "./signup"

import otp2 from "./otp2"
import selectcar from "./selectcar";
import HomeScreen from "./HomeScreen";
import Setting from "./Setting";
import SettingDark from "./SettingDark";
import Planned from "./Planned";
import Page2 from "./page2";
import plantrip2 from "./plantrip2";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    LexendDeca: LexendDeca_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6DFBCE" />
        <Text style={{ fontFamily: "Arial", fontSize: 16, marginTop: 10 }}>
          Loading fonts...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="signup" component={signup} />
        
        <Stack.Screen name="otp2" component={otp2} />
        <Stack.Screen name = "selectcar" component={selectcar}/>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="SettingDark" component={SettingDark} />
        <Stack.Screen name="Planned" component={Planned} />
        <Stack.Screen name = "plantrip2" component={plantrip2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
