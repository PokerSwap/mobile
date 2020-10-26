import React, { useEffect, useRef, useContext } from 'react';
import Store from './src/Store/appContext';

import { LogBox } from 'react-native';
import { Icon, Text } from "native-base";

import darkStyle from './src/Themes/dark.js'
import lightStyle from './src/Themes/light.js'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
import ConfigureNotifications from './src/Drawer/Settings/ConfigureNotifications'

import PurchaseTokens from './src/Drawer/PurchaseTokens'
import CardFieldTextScreen from './src/Drawer/PayScenes/CardFieldTextScreen'
import CardFormScreen from './src/Drawer/PayScenes/CardFormScreen'
import CustomCardScreen from './src/Drawer/PayScenes/CustomCardScreen'

import { Context } from './src/Store/appContext'

var Stack = createStackNavigator()
var Drawer = createDrawerNavigator()
var aTab = createBottomTabNavigator()

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

var MainTabs = () => {
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
    <aTab.Navigator initialRouteName="Active Swaps" tabBarOptions= {{
      showLabel: false, activeTintColor: 'orange',
      inactiveTintColor: 'gray', style: {height: 70, paddingTop:10, backgroundColor:currentStyle.background.color}}} >
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
    <Stack.Navigator initialRouteName="Swap Dashboard" 
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Swap Dashboard" component={SwapDashboard}/>
      <Stack.Screen name="Swap Offer" component={SwapOffer} 
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Verify Ticket" component={VerifyTicket} 
        options={{ gestureEnabled: false,  headerShown: true, headerBackTitle:''}}/>
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
        options={{ gestureEnabled: false,  headerShown: true, headerBackTitle:''}}/>
      <Stack.Screen name="Event Lobby" component={EventLobby}  
        options={{ gestureEnabled: false }} />
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
  const { store, actions } = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  return(
    <Drawer.Navigator initialRouteName="Home" 
    drawerContentOptions={{
      activeTintColor: currentStyle.text.color,
      inactiveTintColor:currentStyle.text.color,
    }}
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{ gestureEnabled: true }}>
      {/* HOME DRAWER TAB */}
      <Drawer.Screen name="Home" component={MainTabs}
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="home" style={{fontSize:26, color:currentStyle.text.color}}
            color={currentStyle.text.color} />)}}/>
      {/* SETTINGS DRAWER TAB */}
      <Drawer.Screen name="Settings" component={SettingsStack}
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        options={{
          component:()=>(<Text>"aaaa"</Text>),
          drawerIcon: ({ focused }) => (
            
            <Icon type="FontAwesome5" name="cog" style={{fontSize:26, color:currentStyle.text.color}}
              color={focused ? 'blue' : 'black'} />)}}/>
      {/* CATEGORIES DRAWER TAB */}
      <Drawer.Screen name="Categories" component={CategoriesScreen} 
        options={{
          drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="th-large" style={{fontSize:24, color:currentStyle.text.color}}
            color={focused ? 'blue' : 'black'} />)}}/>
      {/* CHAT SCREEN TAB */}
      <Drawer.Screen name="Chat" component={ChatStack}
      screenOptions={{ gestureEnabled: false, headerShown: true }}
      options={{
        params:{name:store.myProfile.first_name},
        headerShown:true,
        drawerIcon: ({ focused }) => (
          <Icon type="FontAwesome5" name="comment-dots" size={24} style={{fontSize:24, color:currentStyle.text.color}} 
            color={focused ? 'blue' : 'black'} />
      )}} />
      {/* HELP DRAWER TAB */}
      <Drawer.Screen name="Help" component={HelpStack}
        screenOptions={{ gestureEnabled: false, headerShown: false }}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon type="FontAwesome5" name="question-circle" style={{fontSize:24, color:currentStyle.text.color}} 
              color={focused ? 'blue' : 'black'} />)}}/>
    </Drawer.Navigator>
  )
}

var ChatStack = () => {
  return(
    <Stack.Navigator initialRouteName="Contacts" 
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
    )
}

var SettingsStack = () => {

  return(
    <Stack.Navigator initialRouteName="Settings Screen"  screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Settings Screen" component={SettingsScreen} 
        screenOptions={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Picture" component={ChangePicture}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Email" component={ChangeEmail}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Password" component={ChangePassword}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Change Nickname" component={ChangeNickname}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
      <Stack.Screen name="Configure Notifications" component={ConfigureNotifications}
        options={{ gestureEnabled: false, headerShown: true, headerBackTitle:'' }}/>
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
      <Stack.Screen name="Purchase Tokens" component={PurchaseTokens} 
      options={{ gestureEnabled: false, headerShown: false, headerBackTitle:''}}/>
      <Stack.Screen name="Card Form" component={CardFormScreen} />
      <Stack.Screen name="Card Field Text" component={CardFieldTextScreen} />
      <Stack.Screen name="Custom Card" component={CustomCardScreen} />
    </Stack.Navigator>
  )
}

const NavContainer = () => {
  return(
<Stack.Navigator name="Root" initialRouteName="Auth"
        screenOptions={{ gestureEnabled: false, headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Drawer" component={MainDrawer}/>
        <Stack.Screen name="Home" component={MainTabs}/>
        <Stack.Screen name="Web View" component={WebViewScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}} />
        <Stack.Screen name="Purchase Tokens" component={TokenStack} 
          options={{ gestureEnabled: false, headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
        {/* <Stack.Screen name="Notifications" component={NotificationsScreen} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/> */}
        <Stack.Screen name="Swap Offer" component={SwapOffer} 
          options={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}}/>
        <Stack.Screen name="Chat" component={ChatScreen} 
          screenOptions={{ gestureEnabled: false, headerShown: true, headerBackTitle:''}} />
      </Stack.Navigator>
  )

}

// MAIN NAVIGATION STACK
const AppContainer = () => {

  const { store, actions } = useContext(Context)

  LogBox.ignoreLogs(['VirtualizedLists', 'Warning: Picker', 'Warning: Async']); // Ignore log notification by message

  const routeNameRef = useRef();
  const navigationRef = useRef();
  
  return(
    <NavigationContainer
      ref={navigationRef}
      onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
      onStateChange={() => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name
        actions.navigate.currentPage(currentRouteName)
        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
    >
      <NavContainer />
    </NavigationContainer>
  )
}

export default Store(AppContainer);