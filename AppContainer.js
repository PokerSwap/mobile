import React from 'react';
import { Icon } from "native-base";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Store from './src/Store/appContext';

// AUTH VIEWS
import SplashScreen from './src/Auth/Splash'
import LogInScreen from './src/Auth/Login'
import CreateProfile from './src/Auth/SignUp/CreateProfile'
import TermsAndConditions from './src/Auth/SignUp/Terms&Conditions'
import CreateUser from './src/Auth/SignUp/CreateUser'
import ForgotPassword from './src/Auth/ForgotPassword'

// MAIN VIEWS
import TournamentDashboard from './src/Main/Tournaments/TournamentDashboard'
import SwapDashboard from './src/Main/Swaps/SwapDashboard'
import WinningsDashboard from './src/Main/Winnings/WinningsDashboard'
import SwapPot from './src/Main/Winnings/SwapPot'

// TOURNAMENT VIEWS
import TourneyLobby from './src/Main/Tournaments/TourneyLobby'
import VerifyTicket from './src/Main/Tournaments/VerifyTicket';
import SwapOffer from './src/Main/SwapOffer/SwapOffer';

import ProfileScreen from './src/Main/Profile/ProfileScreen'
import WebViewScreen from './src/Main/Shared/WebView'
import TutorialScreen from './src/Main/Shared/Tutorial'


// DRAWER VIEWS
import SideBar from './src/View-Components/sidebar'
import SettingsScreen from './src/Drawer/Settings'
import NotificationsScreen from './src/Drawer/Notifications'
import PurchaseTokens from './src/Drawer/PurchaseTokens'
import ChangeEmail from './src/Drawer/ChangeEmail';

// LOGIN AND SIGNUP NAVIGATION
const AuthStack = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen, 
      navigationOptions: {
        title: 'Splash',
        header: null
      }
    },

    LogIn: {
      screen: LogInScreen,
      navigationOptions: {
        title: 'Log In',
        header: null,
        gesturesEnabled: false,
      }
    },

    UserCreation:{
      screen: CreateUser,
      navigationOptions: {
        title:'Create User'
      }
    },

    ForgotPassword:{
      screen: ForgotPassword,
      navigationOptions:{
        title:'Forgot Password'
      }
    },

    ProfileCreation: {
      screen: CreateProfile,
      navigationOptions: {
        title: 'Create Your Profile',
        gesturesEnabled: false,
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
    gesturesEnabled: false,
  }
)

// TOURNAMENT NAVIGATION
const TournamentsStack = createStackNavigator(
  {
    TournamentDashboard:{
      screen: TournamentDashboard,
      navigationOptions:{
        title:"TournamentDashboard",
        headerMode: 'none',
        header: null,
      }
    },
    VerifyTicket:{
      screen: VerifyTicket,
      navigationOptions:{
        title:"Verify Ticket",
      }
    },
    TourneyLobby:{
      screen: TourneyLobby,
      navigationOptions:{
        title:"Tourney Lobby"
      }
    },
    SwapOffer:{
      screen: SwapOffer,
      navigationOptions:{
        title:"Swap Offer"
      }
    },
  },{
    initialRouteName:'TournamentDashboard',
    header: null
  }
)

// SWAP NAVIGATION
const SwapsStack = createStackNavigator(
  {
    SwapDashboard:{
      screen: SwapDashboard,
      navigationOptions:{
        title:"Swap Dashboard",
        header: null
      }
    },
    SwapOffer:{
      screen: SwapOffer,
      navigationOptions:{
        title:'Swap Offer',
        header: null
      }
    }
  }, {
    header: null,
  }
)

const WinningsStack = createStackNavigator(
  {
    WinningsDashboard:{
      screen: WinningsDashboard,
      navigationOptions:{
        title:"Winnings Dashboard",
        header: null
      }
    },
    SwapPot:{
      screen: SwapPot,
      navigationOptions:{
        title:'Swap Pot',
        header: null
      }
    }
  }, {
    header: null,
  }
)

// TOURNAMENTS, SWAPS, PROFILE NAVIGATION
const MainStack = createBottomTabNavigator(
  {
    Swaps: { 
      screen: SwapsStack,
      navigationOptions:{
        header: null,
        title: "Swaps",
        tabBarIcon: ({ tintColor }) => 
          <Icon 
            type="FontAwesome5" 
            name="handshake" 
            size={24} 
            style={{ color: tintColor }}
          />
      }
    },
    Tournaments: { 
      screen: TournamentsStack,
      navigationOptions:{
        header: null,
        tabBarIcon: ({ tintColor }) => 
          <Icon
            type="FontAwesome5"
            name="trophy"
            size={24}
            style={{ color: tintColor }}          />
      }
    },
    Winnings: { 
      screen: WinningsStack ,
      navigationOptions:{
        header: null,
        tabBarIcon: ({ tintColor }) => 
          <Icon 
            type="FontAwesome5" 
            name="comments-dollar" 
            size={24} 
            style={{ color: tintColor }}
          />
      }
    }
  },
  {
    animationEnabled: true,
    gesturesEnabled: false,
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
      title:'Settings'
    }
  },
  ChangeEmail:{
    screen: ChangeEmail,
    navigationOptions:{
      title:'Change Email'
    }
  }
},
{
  initialRouteName: 'Settings',
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
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: ({ focused }) => (
          <Icon 
            name="cog" size={24} 
            color={focused ? '#2C2E9B' : 'black'} 
          />
        )
      }
    },
    Notifications: { 
      screen: NotificationsScreen,
      navigationOptions: {
        title: 'Notifications',
        drawerIcon: ({ focused }) => (
        <Icon 
          name="ios-notifications" size={24} 
          color={focused ? 'blue' : 'black'} 
        />
        ),
      }
    },
    PurchaseTokens: { 
      screen: PurchaseTokens,
      navigationOptions: {
        title: 'Purchase Tokens',
        drawerIcon: ({ focused }) => (
        <Icon 
          type="FontAwesome5" name="coins" size={24} 
          color={focused ? 'blue' : 'black'} 
        />
        ),
      }
    }
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
      navigationOptions: {
        title: 'Profile Screen'
      }
    },
    WebView: {
      screen: WebViewScreen,
      navigationOptions: {
        title: 'Profile Screen'
      }
    },
    Tutorial: {
      screen: TutorialScreen,
      navigationOptions: {
        title: 'Profile Screen'
      }
    }

  },
  {
    initialRouteName: "Auth",
    header: null,
    headerMode: 'none'
  }
)

AppContainer = createAppContainer(AppStack);

export default Store(AppContainer);