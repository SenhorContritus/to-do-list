import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Pages/Main"
import Config from "./Pages/Config";

const Stack = createNativeStackNavigator()

export default function App(){
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Main}
      />
      <Stack.Screen 
        name="config"
        component={Config}
      />
    </Stack.Navigator>
  </NavigationContainer>
}