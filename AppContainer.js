import React from 'react';
import {View} from 'react-native'
import { Icon, Tab } from "native-base";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
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
// import FlightSelection from './src/Main/Events/FlightSelection'

import ProfileScreen from './src/Main/Profile/ProfileScreen'
import WebViewScreen from './src/Misc/WebView'
import TutorialScreen from './src/Misc/Tutorial'
import ChatScreen from './src/Misc/Chat'


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
import FeedbackScreen from './src/Drawer/Feedback'


var Stack = createStackNavigator()
var Drawer = createDrawerNavigator()
var aTab = createBottomTabNavigator()

// LOGIN AND SIGNUP NAVIGATION
// const AuthStack = () => {
//   return(
//   <Stack.Navigator initialRouteName="Login"
//   screenOptions={{ gestureEnabled: false }}>
//     <Stack.Screen name="Splash" component={SplashScreen} />
//     <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
//     <Stack.Screen name="Forgot Password" component={ForgotPassword} />
//     <Stack.Screen name="User Creation" component={CreateUser} />
//     <Stack.Screen name="Profile Creation" component={CreateProfile} />

//   </Stack.Navigator>)
// }
  
    // Splash: {
    //   screen: SplashScreen, 
    //   navigationOptions: {
    //     title: 'Splash',
    //     headerShown: false
    //   }
    // },

    // LogIn: {
    //   screen: LogInScreen,
    //   navigationOptions: {
    //     title: 'Log In',
    //     headerShown: false,
    //     gestureEnabled: false,
    //   }
    // },

  //   UserCreation:{
  //     screen: CreateUser,
  //     navigationOptions: ({navigation}) => ({
  //       title:'Create Email',
  //       headerLeft: () => <HeaderBackButton onPress={() => navigation.pop(2)} />,
  //     })
  //   },

  //   ForgotPassword:{
  //     screen: ForgotPassword,
  //     navigationOptions:{
  //       title:'Forgot Password',
  //       mode:'modal'
  //     }
  //   },

  //   ProfileCreation: {
  //     screen: CreateProfile,
  //     navigationOptions: {
  //       title: 'Create Your Profile',
  //       gestureEnabled: false,
  //     }
  //   },

  //   TermsAndConditions:{
  //     screen: TermsAndConditions,
  //     navigationOptions:{
  //       title: 'Terms And Conditions'
  //     }
  //   }
  // }


// EVENT NAVIGATION
// const EventsStack = createStackNavigator(
//   {
//     EventListings:{
//       screen: EventListings,
//       navigationOptions:{
//         title:"Event Listings",
//         headerMode: 'none',
//         headerShown: false,
//         key:'A'
//       }
//     },
//     VerifyTicket:{
//       screen: VerifyTicket,
//       navigationOptions: ({navigation}) => ({
//         title:'Verify Ticket',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.pop()} />,
//       })
//     }, 
//     EventLobby:{
//       screen: EventLobby,
//       navigationOptions: ({navigation}) => ({
//         title:'Event Lobby',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.pop(2)} />,
//       })
//     },
//     SwapOffer:{
//       screen: SwapOffer,
//       navigationOptions:{
//         title:"Swap Offer"
//       }
//     },
//   },{
//     initialRouteName:'EventListings',
//     headerShown: false
//   }
// )

// SWAP NAVIGATION
// const SwapsStack = createStackNavigator(
//   {
//     SwapDashboard:{
//       screen: SwapDashboard,
//       navigationOptions:{
//         title:"Swap Dashboard",
//         headerShown: false
//       }
//     },
//     SwapOffer:{
//       screen: SwapOffer,
//       navigationOptions: ({navigation}) => ({
//         title:'Swap Offer',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//       })

//     }, 
//     EventLobby:{
//       screen: EventLobby,
//       navigationOptions: ({navigation}) => ({
//         title:'Event Lobby',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.popToTop()} />,
//       })
//     },
//   }, {
//     headerShown: false,
//   }
// )

// const ResultsStack = () => {
//   <Tab.Navigator>
//     <Stack.Screen name="Home" component={Home} />
//     <Stack.Screen name="Profile" component={Profile} />
//     <Stack.Screen name="Settings" component={Settings} />
//   </Tab.Navigator>  
//     SwapResults:{
//       screen: SwapResults,
//       navigationOptions:{
//         title:"Swap Results",
//         headerShown: false
//       }
//     },
//     ProfitResults:{
//       screen: ProfitResults,
//       navigationOptions: ({navigation}) => ({
//         title:'Profit Results',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//       })
//     }
//   }, {
//     headerShown: false
//   }
// )

// TOURNAMENTS, SWAPS, PROFILE NAVIGATION
// const MainStack = createBottomTabNavigator(
//   {
//     Swaps: { 
//       screen: SwapsStack,
//       navigationOptions:{
//         headerShown: false,
//         title: "Swaps",
//         tabBarIcon: ({ tintColor }) => 
//           <Icon type="FontAwesome5" name="handshake" 
//             size={24} style={{ color: tintColor }}/>
//       }
//     },
//     Events: { 
//       screen: EventsStack,
//       navigationOptions:{
//         headerShown: false,
//         tabBarIcon: ({ tintColor }) => 
//           <Icon type="FontAwesome5"  name="trophy"
//             size={24} style={{ color: tintColor }}/>
//       }
//     },
//     Results: { 
//       screen: ResultsStack ,
//       navigationOptions:{
//         headerShown: false,
//         tabBarIcon: ({ tintColor }) => 
//           <Icon type="FontAwesome5" name="comments-dollar" 
//             size={24} style={{ color: tintColor }}/>
//       }
//     }
//   },
//   {
//     animationEnabled: true,
//     gestureEnabled: false,
//     initialRouteName: "Swaps",
//     tabBarOptions: {
//       activeTintColor: 'orange',
//       inactiveTintColor: 'gray',
//       style: {
//         height: 70
//       },
//     showLabel: false 
//     }
//   }
// )

// const SettingsStack = createStackNavigator({
//   SettingsScreen:{
//     screen: SettingsScreen,
//     navigationOptions:{
//       title:'Settings',
//       headerShown: false
//     }
//   },
//   ChangeEmail:{
//     screen: ChangeEmail,
//     navigationOptions: ({navigation}) => ({
//       title:'Change Email',
//       headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//     })
//   },
//   ChangePassword:{
//     screen: ChangePassword,
//     navigationOptions: ({navigation}) => ({
//       title:'Change Password',
//       headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//     })
//   },
//   ChangePicture:{
//     screen: ChangePicture,
//     navigationOptions: ({navigation}) => ({
//       title:'Change Picture',
//       headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//     })
//   },
// },
// {
//   initialRouteName: 'SettingsScreen',
// })

// DRAWER VIEWS NAVIGATION
// const DrawerNav = createDrawerNavigator(
//   {
//     Home: {
//       screen: MainStack,
//       navigationOptions: {
//         drawerIcon: ({ focused }) => (
//           <Icon 
//           type="FontAwesome5" name="home" size={24} 
//             color={focused ? '#2C2E9B' : 'black'} 
//           />
//         )
//       }
//     },
//     Settings:{
//       screen: SettingsStack,
//       navigationOptions: {
        
//         drawerIcon: ({ focused }) => (
//           <Icon type="FontAwesome5" name="cog" size={24} 
//             color={focused ? '#2C2E9B' : 'black'} />
//         )
//       }
//     },
//     Notifications: { 
//       screen: NotificationsScreen,
//       navigationOptions: {
//         title: 'Notifications',
//         drawerIcon: ({ focused }) => (
//         <Icon type="FontAwesome5" name="bell" size={24} 
//           color={focused ? 'blue' : 'black'} />
//         ),
//       }
//     },
//     PurchaseTokens: { 
//       screen: PurchaseTokens,
//       navigationOptions: {
//         title: 'Purchase Tokens',
//         drawerIcon: ({ focused }) => (
//         <Icon type="FontAwesome5" name="coins" size={24} 
//           color={focused ? 'blue' : 'black'} />
//         ),
//       }
//     },
//     Categories: { 
//       screen: Categories,
//       navigationOptions: {
//         title: 'Categories',
//         drawerIcon: ({ focused }) => (
//         <Icon type="FontAwesome5" name="th-large" size={24} 
//           color={focused ? 'blue' : 'black'} />
//         ),
//       }
//     },


//   },
//   {
//     initialRouteName: 'Home',
//     contentComponent: SideBar,
//     drawerPosition: 'Left',
//     drawerOpenRoute: 'DrawerOpen',
//     drawerCloseRoute: 'DrawerClose',
//     drawerToggleRoute: 'DrawerToggle'
//   }
// )

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
      <Drawer.Screen name="Home" component={MainTabs}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="home" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
      <Drawer.Screen name="Settings" component={SettingsStack}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="cog" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
            <Drawer.Screen name="Purchase Tokens" component={PurchaseTokens}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="coins" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
      <Drawer.Screen name="Categories" component={CategoriesScreen} 
        options={{
                  drawerIcon: ({ focused }) => (
                  <Icon type="FontAwesome5" name="th-large" size={24} 
                    color={focused ? 'blue' : 'black'} />
                  ),
        }}
/>
      <Drawer.Screen name="Notifications" component={NotificationsScreen}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="bell" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
      <Drawer.Screen name="Chat" component={ChatScreen}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="comment-dots" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
            <Drawer.Screen name="Feedback" component={FeedbackScreen}
      options={{
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="users-cog" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
}}
      />
    </Drawer.Navigator>
  )
}

var AuthStack = () => {
  return(
    <Stack.Navigator name="Auth" initialRouteName="Splash"
      screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LogInScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CreateUser" component={CreateUser} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
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

      </Stack.Navigator>
    </NavigationContainer>
  )
}
//   {
//     Auth: AuthStack,
//     Drawer: DrawerNav,    
//     Profile: {
//       screen: ProfileScreen,
//       navigationOptions: ({navigation}) => ({
//         title:'Profile',
//         headerMode:'screen',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
//       })
//     },
//     WebView: {
//       screen: WebViewScreen,
//       navigationOptions: ({navigation}) => ({
//         title:'WebView',
//         headerMode:'screen',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//       })
//     },
//     Tutorial: {
//       screen: TutorialScreen,
//       navigationOptions: ({navigation}) => ({
//         title:'Tutorial',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//       })
//     },
//     Chat: {
//       screen: ChatScreen,
//       navigationOptions: ({navigation}) => ({
//         title:'Chat',
//         headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
//       })
//     }

//   },
//   {
//     initialRouteName: "Auth",
//     headerShown: false,
//     headerMode: 'none'
//   }
// )

// AppContainer = createAppContainer(AppStack);

export default  Store(AppContainer);