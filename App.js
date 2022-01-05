import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";

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
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

{
  /* <TabNavigator /> */
  /* <StackNavigator /> */
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
