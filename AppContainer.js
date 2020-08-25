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

// MISC VIEWS
import ProfileScreen from './src/Main/Profile/ProfileScreen'
import WebViewScreen from './src/Misc/WebView'
import ChatScreen from './src/Main/Chat/Chat'
import NotificationsScreen from './src/Misc/Notifications'

// DRAWER VIEWS
import SideBar from './src/View-Components/sidebar'
import SettingsScreen from './src/Drawer/Settings'
import ChangeEmail from './src/Drawer/Settings/ChangeEmail'
import ChangePassword from './src/Drawer/Settings/ChangePassword'
import ChangePicture from './src/Drawer/Settings/ChangePicture'
import CategoriesScreen from './src/Drawer/Categories'
import ContactsScreen from './src/Main/Chat/Contacts'
import TutorialsScreen from './src/Drawer/Tutorials/TutorialsScreen'
import TutorialListScreen from './src/Drawer/TutorialList'
import ChangeNickname from './src/Drawer/Settings/ChangeNickname'

import PurchaseTokens from './src/Drawer/PurchaseTokens'
import AndroidPayScreen from './src/Drawer/PayScenes/AndroidPayScreen'
import ApplePayScreen from './src/Drawer/PayScenes/ApplePayScreen'
import CardFieldTextScreen from './src/Drawer/PayScenes/CardFieldTextScreen'
import CardFormScreen from './src/Drawer/PayScenes/CardFormScreen'
import CustomBankScreen from './src/Drawer/PayScenes/CustomBankScreen'
import CustomCardScreen from './src/Drawer/PayScenes/CustomCardScreen'
import SourceScreen from './src/Drawer/PayScenes/SourceScreen'


import HowToSwapScreen from './src/Drawer/Tutorials/HowToSwap'

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
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Event Lobby" component={EventLobby} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
    </Stack.Navigator>
  )
}

var EventsStack = () => {
  return(
    <Stack.Navigator initialRouteName="Event Listings" screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Event Listings" component={EventListings}/>
      <Stack.Screen name="Verify Ticket" component={VerifyTicket} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Event Lobby" component={EventLobby} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Swap Offer" component={SwapOffer} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
        <Stack.Screen name="Profile" component={ProfileScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
    </Stack.Navigator>
  )
}

var ResultsStack = () => {
  return(
    <Stack.Navigator initialRouteName="Swap Results" 
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Swap Results" component={SwapResults}/>
      <Stack.Screen name="Profit Results" component={ProfitResults} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
    </Stack.Navigator>
  )
}

var MainDrawer = () => {
  return(
    <Drawer.Navigator initialRouteName="Home" 
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{ gestureEnabled: true }}>
      {/* HOME DRAWER TAB */}
      <Drawer.Screen name="Home" component={MainTabs}
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="home" style={{fontSize:26}}
            color={focused ? 'blue' : 'black'} />)}}/>
      {/* SETTINGS DRAWER TAB */}
      <Drawer.Screen name="Settings" component={SettingsStack}
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon type="FontAwesome5" name="cog" size={24} 
              color={focused ? 'blue' : 'black'} />)}}/>
      {/* CATEGORIES DRAWER TAB */}
      <Drawer.Screen name="Categories" component={CategoriesScreen} 
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="th-large" size={24} 
            color={focused ? 'blue' : 'black'} />)}}/>
      {/* CHAT SCREEN TAB */}
      {/* <Drawer.Screen name="Chat" component={ContactsScreen}
      screenOptions={{ gestureEnabled: false, headerShown: true }}
      options={{
        params:{name:"Gabe"},
        headerShown:true,
        drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="comment-dots" size={24} 
            color={focused ? 'blue' : 'black'} />
      )}} /> */}
      {/* HELP DRAWER TAB */}
      <Drawer.Screen name="Help" component={HelpStack}
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon type="FontAwesome5" name="question-circle" size={24} 
              color={focused ? 'blue' : 'black'} />)}}/>
    </Drawer.Navigator>
  )
}

var SettingsStack = () => {
  return(
    <Stack.Navigator  screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} 
        screenOptions={{ gestureEnabled: false, headerShown: false }}/>
      <Stack.Screen name="Change Picture" component={ChangePicture}
        options={{ gestureEnabled: true, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Email" component={ChangeEmail}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Password" component={ChangePassword}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Nickname" component={ChangeNickname}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
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

var HelpStack = () => {
  return(
    <Stack.Navigator name="Help" initialRouteName="TutorialsScreen"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Tutorial List" component={TutorialListScreen} />
      <Stack.Screen name="Tutorial Screen" component={TutorialsScreen} />
    </Stack.Navigator>
  )
}

var TokenStack = () => {
  return(
    <Stack.Navigator name="Tokens" initialRouteName="Purchase Tokens">
      <Stack.Screen name="Purchase Tokens" component={PurchaseTokens} />
      <Stack.Screen name="Card Form" component={CardFormScreen} />
      <Stack.Screen name="Card Field Text" component={CardFieldTextScreen} />
      <Stack.Screen name="Source" component={SourceScreen} />
      <Stack.Screen name="Apple Pay" component={ApplePayScreen} />
      <Stack.Screen name="Android Pay" component={AndroidPayScreen} />
      <Stack.Screen name="Custom Card" component={CustomCardScreen} />
      <Stack.Screen name="Custom Bank" component={CustomBankScreen} />
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
        <Stack.Screen name="Home" component={MainTabs}/>

        <Stack.Screen name="Web View" component={WebViewScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}} />
        <Stack.Screen name="Purchase Tokens" component={TokenStack} 
          options={{ gestureEnabled: false, headerShown: false, headerBackTitle:''}} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
        {/* <Stack.Screen name="Notifications" component={NotificationsScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/> */}
        <Stack.Screen name="Swap Offer" component={SwapOffer} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
        {/* <Stack.Screen name="Chat" component={ChatScreen} 
          screenOptions={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Store(AppContainer);