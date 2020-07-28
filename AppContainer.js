import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Store from './src/Store/appContext';

// AUTH VIEWS
import SplashScreen from './src/Auth/Splash'
import LogInScreen from './src/Auth/Login'
import CreateProfile from './src/Auth/SignUp/CreateProfile'
import TermsAndConditions from './src/Auth/SignUp/Terms&Conditions'
import CreateUser from './src/Auth/SignUp/CreateUser'
import ForgotPassword from './src/Auth/ForgotPassword'

// MAIN VIEWS
import EventListings from './src/Main/Events/EventListings'
import SwapDashboard from './src/Main/Swaps/SwapDashboard'
import SwapResults from './src/Main/Results/SwapResults'
import ProfitResults from './src/Main/Results/ProfitResults'

// TOURNAMENT VIEWS
import EventLobby from './src/Main/Events/EventLobby'
import VerifyTicket from './src/Main/Events/VerifyTicket';
import SwapOffer from './src/Main/SwapOffer/SwapOffer';

import ProfileScreen from './src/Main/Profile/ProfileScreen'
import WebViewScreen from './src/Misc/WebView'
import TutorialScreen from './src/Misc/Tutorial'
import ChatScreen from './src/Main/Chat/Chat'

// DRAWER VIEWS
import FAQScreen from './src/Drawer/FAQ'
import SideBar from './src/View-Components/sidebar'
import SettingsScreen from './src/Drawer/Settings'
import NotificationsScreen from './src/Drawer/Notifications'
import PurchaseTokens from './src/Drawer/PurchaseTokens'
import ChangeEmail from './src/Drawer/ChangeEmail'
import ChangePassword from './src/Drawer/ChangePassword'
import ChangePicture from './src/Drawer/ChangePicture'
import CategoriesScreen from './src/Drawer/Categories'
import ContactsScreen from './src/Main/Chat/Contacts'

var Stack = createStackNavigator()
var Drawer = createDrawerNavigator()
var aTab = createBottomTabNavigator()

var MainTabs = () => {
  return(
    <aTab.Navigator initialRouteName="Active Swaps" tabBarOptions= {{
      showLabel: false, activeTintColor: 'orange',
      inactiveTintColor: 'gray', style: {height: 70}}} >
      <aTab.Screen name="Active Swaps" component={SwapsStack} 
        options={{
          tabBarIcon: ({ color }) => 
            <Icon type="FontAwesome5" name="handshake" 
              size={24} style={{ color: color }}/>
        }}/>
      <aTab.Screen name="Event Listings" component={EventsStack} options={{
          tabBarIcon: ({ color }) => 
            <Icon type="FontAwesome5" name="trophy" 
              size={24} style={{ color: color }}/>
        }}/>
      <aTab.Screen name="Swap Results" component={ResultsStack} options={{
          tabBarIcon: ({ color }) => 
            <Icon type="FontAwesome5" name="comments-dollar" 
              size={24} style={{ color: color }}/>
        }}/>
    </aTab.Navigator>
  )
}

var SwapsStack = () => {
  return(
    <Stack.Navigator initialRouteName="Active Swaps" 
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Active Swaps" component={SwapDashboard}/>
      <Stack.Screen name="Swap Offer" component={SwapOffer} 
        options={{ gestureEnabled: false, headerShown: true }}/>
      <Stack.Screen name="Event Lobby" component={EventLobby} 
        options={{ gestureEnabled: false, headerShown: true }}/>
    </Stack.Navigator>
  )
}

var EventsStack = () => {
  return(
    <Stack.Navigator initialRouteName="Event Listings" screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Event Listings" component={EventListings}/>
      <Stack.Screen name="Verify Ticket" component={VerifyTicket} options={{ gestureEnabled: false, headerShown: true }}/>
      <Stack.Screen name="Event Lobby" component={EventLobby} options={{ gestureEnabled: false, headerShown: true }}/>
      <Stack.Screen name="Swap Offer" component={SwapOffer} options={{ gestureEnabled: false, headerShown: true }}/>
    </Stack.Navigator>
  )
}

var ResultsStack = () => {
  return(
    <Stack.Navigator initialRouteName="Swap Results" 
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Swap Results" component={SwapResults}/>
      <Stack.Screen name="Profit Results" component={ProfitResults} 
        options={{ gestureEnabled: false, headerShown: true }}/>
    </Stack.Navigator>
  )
}

var MainDrawer = () => {
  return(
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{ gestureEnabled: false }}>
      {/* HOME DRAWER TAB */}
      <Drawer.Screen name="Home" component={MainTabs}
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="home" size={24} 
            color={focused ? 'blue' : 'black'} />
        )}}/>
      {/* SETTINGS DRAWER TAB */}
      <Drawer.Screen name="Settings" component={SettingsStack}
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="cog" size={24} 
            color={focused ? 'blue' : 'black'} />
        )}}/>
      {/* PURCHASE TOKENS DRAWER TAB */}
      <Drawer.Screen name="Purchase Tokens" component={PurchaseTokens}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon type="FontAwesome5" name="coins" size={24} 
              color={focused ? 'blue' : 'black'} />
        )}}/>
      {/* CATEGORIES DRAWER TAB */}
      <Drawer.Screen name="Categories" component={CategoriesScreen} 
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="th-large" size={24} 
            color={focused ? 'blue' : 'black'} />
          ),
        }}/>
      {/* NOTIFICATIONS DRAWER TAB */}
      <Drawer.Screen name="Notifications" component={NotificationsScreen}
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="bell" size={24} 
            color={focused ? 'blue' : 'black'} />
        )}}/>
      {/* CHAT SCREEN TAB */}
      <Drawer.Screen name="Chat" component={ContactsScreen}
      screenOptions={{ gestureEnabled: false, headerShown: true }}
      options={{
        params:{name:"Gabe"},
        headerShown:true,
        drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="comment-dots" size={24} 
            color={focused ? 'blue' : 'black'} />
      )}} />
    </Drawer.Navigator>
  )
}

var SettingsStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen}/>
      <Stack.Screen name="Change Picture" component={ChangePicture}/>
      <Stack.Screen name="Change Email" component={ChangeEmail}/>
      <Stack.Screen name="Change Password" component={ChangePassword}/>
    </Stack.Navigator>
  )
}

var AuthStack = () => {
  return(
    <Stack.Navigator name="Auth" initialRouteName="Splash"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Forgot Password" component={ForgotPassword} options={{ headerShown: true }}/>
      <Stack.Screen name="User Creation" component={CreateUser} options={{ headerShown: true }}/>
      <Stack.Screen name="Terms and Conditions" component={TermsAndConditions} options={{ headerShown: true }}/>
      <Stack.Screen name="Profile Creation" component={CreateProfile} options={{ headerShown: true }}/>
    
    </Stack.Navigator>
  )
}


// MAIN NAVIGATION STACK
 const AppContainer = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator name="Root" initialRouteName="Auth"
        screenOptions={{ gestureEnabled: false, headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Drawer" component={MainDrawer}/>
        <Stack.Screen name="Web View" component={WebViewScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} 
              screenOptions={{ gestureEnabled: false, headerShown: true }}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Store(AppContainer);