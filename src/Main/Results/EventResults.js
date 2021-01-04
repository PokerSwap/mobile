import React, {useContext, useState, useCallback, useEffect, useRef} from 'react';
import { Context } from '../../Store/appContext'

import { AppState, RefreshControl,  FlatList, View, StatusBar } from 'react-native'
import { Button, Container, Content, Icon, Text, Tabs, Tab, TabHeading} from 'native-base';
import { useNavigation } from '@react-navigation/native'


import HomeHeader from '../../View-Components/HomeHeader'
import ResultsTracker from './Components/ResultsTracker'

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default EventResults = (props) => {
  const {store, actions} = useContext(Context)

  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  var navigation = useNavigation()

  useEffect(() => {  
    const unsubscribe = navigation.addListener('focus', () => {
      actions.tracker.getPast()
    });
    return () => {
      unsubscribe
    }
  }, [refreshing])

  const [ refreshing, setRefreshing ] = useState(false);

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    actions.tracker.getPast()
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // REFRESH AFTER REOPENING FROM BACKGROUND (START)

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground! on Event Results");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    actions.tracker.getPast()    
    console.log("AppState", appState.current);
  };

  // REFRESH AFTER REOPENING FROM BACKGROUND (END)

  // EMPTY CURRENT TRACKER COMPONENT
  let noTracker = (status) => {
    return(
      <FlatList

        ListHeaderComponent={
          <Text style={{ color:currentStyle.text.color,
            justifyContent:'center', textAlign:'center', 
            fontSize:20, width:'80%'}}> 
            You have no past events that{'\n'}{status} results. 
          </Text>}
        ListHeaderComponentStyle={{alignSelf:'center', marginTop:20}}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginTop:20}}
      />

    )
  }

  var aTracker = ({item, index}) => {
    return(
      <ResultsTracker key={index} event={item} tournament_end={item.tournament_end}
        my_buyin= {item.my_buyin} buyins = {item.buyins} final_profit={item.final_profit}
        tournament={item.tournament} action={item.action}/>
    )
  }

  var flatlist = (a_data) => {
    return(
      <FlatList contentContainerStyle={{ alignSelf: 'stretch', backgroundColor: currentStyle.background.color }}
        data={a_data}
        renderItem={aTracker}
        keyExtractor={(content, index) => index.toString()}
        ListFooterComponent={
          <Button iconLeft style={{borderRadius:100}} onPress={() => onRefresh()}>
            <Icon type='FontAwesome' name='refresh'/>
            <Text>Refresh</Text>
          </Button>}
        ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
        stickyHeaderIndices={[0]}
/>
    )
  }
    
  var pendingResultsTracker, confirmedResultsTracker;

  if( store.myPendingResultsTrackers !== [] && store.myPendingResultsTrackers.length !== 0){
    pendingResultsTracker = flatlist(store.myPendingResultsTrackers)}  
  else {
    pendingResultsTracker = noTracker('are pending')
  } 

  if( store.myConfirmedResultsTrackers !== [] && store.myConfirmedResultsTrackers.length !== 0){
    confirmedResultsTracker = flatlist(store.myConfirmedResultsTrackers)}  
  else {
    confirmedResultsTracker = noTracker('have confirmed')
  } 


  
  return(
    <Container contentContainerStyle={{backgroundColor:currentStyle.background.color}}>
      <View style={{height:20,  backgroundColor:currentStyle.background.color}}>
      <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
				backgroundColor={currentStyle.background.color}/>
      </View>
      <HomeHeader title={'Event Results'} />
       <Content contentContainerStyle={{flex:1, backgroundColor:currentStyle.background.color}}>
         <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}
         tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
           <Tab  heading={
            <TabHeading style={{backgroundColor:'orange'}} >
              <Text  style={{color:'white'}}>PENDING</Text>
            </TabHeading>}>
            <BounceColorWrapper style={{flex: 1}}
              mainColor={currentStyle.background.color}>
              <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {pendingResultsTracker}
              </Content>
            </BounceColorWrapper>
           </Tab>
           <Tab  heading={
            <TabHeading style={{backgroundColor:'rgb(38, 171, 75)'}}>
              <Text style={{color:'white'}}>CONFIRMED</Text>
            </TabHeading>}>
            <BounceColorWrapper style={{flex: 1}}
              mainColor={currentStyle.background.color}>
              <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {confirmedResultsTracker}
              </Content>
            </BounceColorWrapper>

           </Tab>
         </Tabs>
        </Content>
    </Container>
  )
}
