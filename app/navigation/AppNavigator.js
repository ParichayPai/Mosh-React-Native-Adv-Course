import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

import ListingEditScreen from "../screens/ListingEditScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";
import { TouchableOpacity } from "react-native";
import routes from "./routes";
import useNotifications from "../hooks/useNotifications";
import expoPushTokens from "../api/expoPushTokens";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  useNotifications(() => console.log("Notification"));
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Listings Edit"
        component={ListingEditScreen}
        options={({ navigation }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity {...props}>
              <NewListingButton
                onPress={() => navigation.navigate(routes.LISTINGS_EDIT)}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
              onPress={() => navigation.navigate(routes.LISTINGS_EDIT)}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
