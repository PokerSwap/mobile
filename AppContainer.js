import React from 'react';
import {View} from 'react-native'
import { Icon } from "native-base";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
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
import FlightSelection from './src/Main/Events/FlightSelection'

import ProfileScreen from './src/Main/Profile/ProfileScreen'
import WebViewScreen from './src/Misc/WebView'
import TutorialScreen from './src/Misc/Tutorial'


// DRAWER VIEWS
import FAQScreen from './src/Drawer/FAQ'
import SideBar from './src/View-Components/sidebar'
import SettingsScreen from './src/Drawer/Settings'
import NotificationsScreen from './src/Drawer/Notifications'
import PurchaseTokens from './src/Drawer/PurchaseTokens'
import ChangeEmail from './src/Drawer/ChangeEmail'
import ChangePassword from './src/Drawer/ChangePassword'
import ChangePicture from './src/Drawer/ChangePicture'

// LOGIN AND SIGNUP NAVIGATION
const AuthStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen, 
      navigationOptions: {
        title: 'Splash',
        headerShown: false
      }
    },

    LogIn: {
      screen: LogInScreen,
      navigationOptions: {
        title: 'Log In',
        headerShown: false,
        gestureEnabled: false,
      }
    },

    UserCreation:{
      screen: CreateUser,
      navigationOptions: ({navigation}) => ({
        title:'Create Email',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.pop(2)} />,
      })
    },

    ForgotPassword:{
      screen: ForgotPassword,
      navigationOptions:{
        title:'Forgot Password',
        mode:'modal'
      }
    },

    ProfileCreation: {
      screen: CreateProfile,
      navigationOptions: {
        title: 'Create Your Profile',
        gestureEnabled: false,
      }
    },

    TermsAndConditions:{
      screen: TermsAndConditions,
      navigationOptions:{
        title: 'Terms And Conditions'
      }
    }
  },
  {
    initialRouteName: "Splash",
    gestureEnabled: false,
  }
)

// EVENT NAVIGATION
const EventsStack = createStackNavigator(
  {
    EventListings:{
      screen: EventListings,
      navigationOptions:{
        title:"Event Listings",
        headerMode: 'none',
        headerShown: false,
        key:'A'
      }
    },
    VerifyTicket:{
      screen: VerifyTicket,
      navigationOptions:{
        title:"Verify Ticket",
      }
    }, 
    FlightSelection:{
      screen: FlightSelection,
      navigationOptions: ({navigation}) => ({
        title:'Flight Selection',
        headerLeft: () => <HeaderBackButton text='Back' onPress={() => navigation.goBack(null)} />,
      })
    },
    EventLobby:{
      screen: EventLobby,
      navigationOptions: ({navigation}) => ({
        title:'Event Lobby',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.pop(2)} />,
      })
    },
    SwapOffer:{
      screen: SwapOffer,
      navigationOptions:{
        title:"Swap Offer"
      }
    },
  },{
    initialRouteName:'EventListings',
    headerShown: false
  }
)

// SWAP NAVIGATION
const SwapsStack = createStackNavigator(
  {
    SwapDashboard:{
      screen: SwapDashboard,
      navigationOptions:{
        title:"Swap Dashboard",
        headerShown: false
      }
    },
    SwapOffer:{
      screen: SwapOffer,
      navigationOptions: ({navigation}) => ({
        title:'Swap Offer',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      })

    }, 
    EventLobby:{
      screen: EventLobby,
      navigationOptions: ({navigation}) => ({
        title:'Event Lobby',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.popToTop()} />,
      })
    },
  }, {
    headerShown: false,
  }
)

const ResultsStack = createStackNavigator(
  {
    SwapResults:{
      screen: SwapResults,
      navigationOptions:{
        title:"Swap Results",
        headerShown: false
      }
    },
    ProfitResults:{
      screen: ProfitResults,
      navigationOptions: ({navigation}) => ({
        title:'Profit Results',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      })
    }
  }, {
    headerShown: false
  }
)

// TOURNAMENTS, SWAPS, PROFILE NAVIGATION
const MainStack = createBottomTabNavigator(
  {
    Swaps: { 
      screen: SwapsStack,
      navigationOptions:{
        headerShown: false,
        title: "Swaps",
        tabBarIcon: ({ tintColor }) => 
          <Icon type="FontAwesome5" name="handshake" 
            size={24} style={{ color: tintColor }}/>
      }
    },
    Events: { 
      screen: EventsStack,
      navigationOptions:{
        headerShown: false,
        tabBarIcon: ({ tintColor }) => 
          <Icon type="FontAwesome5"  name="trophy"
            size={24} style={{ color: tintColor }}/>
      }
    },
    Results: { 
      screen: ResultsStack ,
      navigationOptions:{
        headerShown: false,
        tabBarIcon: ({ tintColor }) => 
          <Icon type="FontAwesome5" name="comments-dollar" 
            size={24} style={{ color: tintColor }}/>
      }
    }
  },
  {
    animationEnabled: true,
    gestureEnabled: false,
    initialRouteName: "Swaps",
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      style: {
        height: 70
      },
    showLabel: false 
    }
  }
)

const SettingsStack = createStackNavigator({
  SettingsScreen:{
    screen: SettingsScreen,
    navigationOptions:{
      title:'Settings',
      headerShown: false
    }
  },
  ChangeEmail:{
    screen: ChangeEmail,
    navigationOptions: ({navigation}) => ({
      title:'Change Email',
      headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })
  },
  ChangePassword:{
    screen: ChangePassword,
    navigationOptions: ({navigation}) => ({
      title:'Change Password',
      headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })
  },
  ChangePicture:{
    screen: ChangePicture,
    navigationOptions: ({navigation}) => ({
      title:'Change Picture',
      headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
    })
  },
},
{
  initialRouteName: 'SettingsScreen',
})

// DRAWER VIEWS NAVIGATION
const DrawerNav = createDrawerNavigator(
  {
    Home: {
      screen: MainStack,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Icon 
            name="home" size={24} 
            color={focused ? '#2C2E9B' : 'black'} 
          />
        )
      }
    },
    Settings:{
      screen: SettingsStack,
      navigationOptions: {
        
        drawerIcon: ({ focused }) => (
          <Icon name="cog" size={24} 
            color={focused ? '#2C2E9B' : 'black'} />
        )
      }
    },
    Notifications: { 
      screen: NotificationsScreen,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({ focused }) => (
        <Icon name="ios-notifications" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
      }
    },
    PurchaseTokens: { 
      screen: PurchaseTokens,
      navigationOptions: {
        title: 'Purchase Tokens',
        drawerIcon: ({ focused }) => (
        <Icon type="FontAwesome5" name="coins" size={24} 
          color={focused ? 'blue' : 'black'} />
        ),
      }
    },
    // FAQs:{
    //   screen: FAQScreen,
    //   navigationOptions: {
    //     title: 'FAQs',
    //     drawerIcon: ({ focused }) => (
    //     <Icon 
    //       type="FontAwesome5" name="wqq" size={24} 
    //       color={focused ? 'blue' : 'black'} 
    //     />
    //     ),
    //   }
    // }
  },
  {
    initialRouteName: 'Home',
    contentComponent: SideBar,
    drawerPosition: 'Left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  }
)



// MAIN NAVIGATION STACK
const AppStack = createStackNavigator(
  {
    Auth: AuthStack,
    Drawer: DrawerNav,    
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({navigation}) => ({
        title:'Profile',
        header:<View style={{ height:20,backgroundColor:'blue' }} ></View>,
        headerMode:'float',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack()} />,
      })
    },
    WebView: {
      screen: WebViewScreen,
      navigationOptions: ({navigation}) => ({
        title:'WebView',
        headerMode:'screen',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      })
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: ({navigation}) => ({
        title:'Tutorial',
        headerLeft: () => <HeaderBackButton onPress={() => navigation.goBack(null)} />,
      })
    }

  },
  {
    initialRouteName: "Auth",
    headerShown: false,
    headerMode: 'none'
  }
)

AppContainer = createAppContainer(AppStack);

export default Store(AppContainer);