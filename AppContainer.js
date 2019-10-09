import React from 'react';
import { Icon } from "native-base";
import { createStackNavigator, createBottomTabNavigator,
createDrawerNavigator, createAppContainer } from "react-navigation";
import Store, {Context} from './src/Store/appContext'

// AUTH VIEWS
import SplashScreen from './src/Auth/Splash'
import LogInScreen from './src/Auth/Login'
import CreateProfile from './src/Auth/SignUp/CreateProfile'
import TermsAndConditions from './src/Auth/SignUp/Terms&Conditions'
import CreateUser from './src/Auth/SignUp/CreateUser'

// MAIN VIEWS
import TournamentDashboard from './src/Main/Tournaments/TournamentDashboard'
import SwapDashboard from './src/Main/Swaps/SwapDashboard'
import ProfileScreen from './src/Main/Profile/ProfileScreen'

// TOURNAMENT VIEWS
import TourneyLobby from './src/Main/Tournaments/TourneyLobby'
import VerifyTicket from './src/Main/Tournaments/VerifyTicket';
import SwapOffer from './src/Main/Tournaments/SwapOffer';

// SWAPS VIEWS
// 
 
// DRAWER VIEWS
import SideBar from './src/View-Components/sidebar'
import SettingsScreen from './src/Drawer/Settings'
import NotificationsScreen from './src/Drawer/Notifications'
import AddCoinsScreen from './src/Drawer/AddCoins'
import LogOutScreen from './src/Drawer/Logout'

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
        header: null
      }
    },

    UserCreation:{
      screen: CreateUser,
      navigationOptions: {
        title:'Create User'
      }
    },

    ProfileCreation: {
      screen: CreateProfile,
      navigationOptions: {
        title: 'Create Your Profile'
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
    initialRouteName: "Splash"
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
        tabBarLabel: 'Swaps',
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
      screen: TournamentsStack,//TournamentsStack
      navigationOptions:{
        header: null,
        tabBarLabel: 'Tournaments',
        tabBarIcon: ({ tintColor }) => 
          <Icon
            type="FontAwesome5"
            name="trophy"
            size={24}
            style={{ color: tintColor }}          />
      }
    },
    Profile: { 
      screen: ProfileScreen ,
      navigationOptions:{
        header: null,
        title:"Profile",
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => 
          <Icon 
            type="FontAwesome5" 
            name="user" 
            size={24} 
            style={{ color: tintColor }}
          />
      }
    }
  },
  {
    animationEnabled: true,
    initialRouteName: "Profile",
    tabBarOptions: {
      activeTintColor: 'orange',
      inactiveTintColor: 'gray',
      style: {
        height: 70
      },
    }
  }
)


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
    Settings: { 
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        drawerIcon: ({ focused }) => (
        <Icon 
          name="cog" size={24} 
          color={focused ? 'blue' : 'black'} 
        />
        ),
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
    AddCoins: { 
      screen: AddCoinsScreen,
      navigationOptions: {
        title: 'Add Coins',
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
    Pub: { 
      screen: ProfileScreen,
      navigationOptions: {
        title: "PublicProfile",
        headerMode: 'on'
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