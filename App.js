import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import { Text } from "react-native";
import OfflineNotice from "./app/components/OfflineNotice";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "dodgerblue" },
      headerTintColor: "white",
    }}
  >
    <Stack.Screen
      name="Tweets"
      component={Tweets}
      options={{
        headerStyle: { backgroundColor: "tomato" },
        headerTintColor: "white",
        // headerShown: false,
      }}
    />
    <Stack.Screen
      name="TweetDetails"
      component={TweetDetails}
      // options={{ title: "Tweet Details" }}  // Can have direct obj or func returning obj
      options={({ route }) => ({ title: route.params.id })}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: "tomato",
      tabBarActiveTintColor: "white",
      tabBarInactiveBackgroundColor: "#eee",
      tabBarInactiveTintColor: "black",
    }}
  >
    <Tab.Screen
      name="Feed"
      component={Tweets}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen name="Account" component={Account} />
  </Tab.Navigator>
);
// In order for Tab navigator to access the tweet details page we put Stack Navigator as component to a screen
// This is called Nesting Navigators

export default function App() {
  return (
    <>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

{
  /* <TabNavigator /> */
  /* <StackNavigator /> */
  /* <AuthNavigator /> */
}

// componentDidMount
// const unsubscribe = NetInfo.addEventListener((netInfo) =>
//   console.log(netInfo)
// );
// // componentWillMount
// unsubscribe();

// useNetInfo();

// const demo = async () => {
//     try {
//       await AsyncStorage.setItem("person", JSON.stringify({ id: 1 }));
//       const value = await AsyncStorage.getItem("person");
//       const person = JSON.parse(value);
//       console.log(person);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   demo();
//   return <Text>Test</Text>;
