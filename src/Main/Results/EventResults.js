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
        if (appState.current.match(/inactive|background/) &&
            nextAppState === "active" ) {
            console.log("App has come to the foreground! on Event Results");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        actions.tracker.getPast()    
        console.log("AppState", appState.current);
    };

    // REFRESH AFTER REOPENING FROM BACKGROUND (END)


    var aTracker = ({item, index}) => {
        var y
        if (item.message && item.message == true){
            return(null)
        } else {
            return(
                <ResultsTracker key={index} event={item} 
                allPaid={item.allPaid} allConfirmed={item.allConfirmed} 
                results_link={item.results_link} final_profit={item.final_profit}
                my_buyin= {item.my_buyin} agreed_buyins = {item.agreed_buyins} 
                tournament={item.tournament} tournament_end={item.tournament_end} 
                action={item.action}/>
            )
        }

    
    }

    var flatlist = (a_data, if_none) => {
        return(
            <FlatList contentContainerStyle={{ alignSelf: 'stretch', 
                backgroundColor: currentStyle.background.color }}
                data={a_data}
                renderItem={aTracker}
                keyExtractor={(content, index) => index.toString()}
                ListFooterComponent={
                    <View style={{alignSelf:'center', 
                        justifyContent:'center', paddingBottom:100}}>
                        {!store.myProfile.naughty ?
                            Object.keys(a_data[0])[0] == 'message' ?
                                <Text style={[styles.noTracker.text, 
                                    {color:currentStyle.text.color}]}> 
                                    You have no past events that{'\n'}
                                    {if_none} results. 
                                </Text>
                                :
                                null
                            :
                            <Text style={{color:currentStyle.text.color, width:'80%', 
                                alignSelf:'center', marginTop:20, 
                                textAlign:'center', fontSize:18}}>
                                You've been put on the naughty list.{'\n'}{'\n'}
                                To start swapping again,{'\n'}
                                please pay your overdue swaps and have the other users 
                                confirm payment.
                            </Text>}
                        <Button iconLeft style={{alignSelf:'center', borderRadius:100,
                             marginVertical:20}} onPress={() => onRefresh()}>
                            <Icon type='FontAwesome' name='refresh'/>
                            <Text>Refresh</Text>
                        </Button>
                    </View>}
                ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
                stickyHeaderIndices={[0]}/>
        )
    }
    


  
    return(
        <Container contentContainerStyle={{backgroundColor:currentStyle.header.color}}>
            <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                    backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
            <HomeHeader title={'Event Results'} />
            <Content contentContainerStyle={{flex:1, 
                    backgroundColor:currentStyle.background.color}}>
                <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}
                    tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
                    <Tab  heading={
                        <TabHeading style={{backgroundColor:'orange'}} >
                        <Text  style={{color:'white'}}>PENDING</Text>
                        </TabHeading>}>
                        <BounceColorWrapper style={{flex: 1}}
                        mainColor={currentStyle.background.color}>
                        <Content contentContainerStyle={{
                            backgroundColor:currentStyle.background.color}} 
                            refreshControl={
                                <RefreshControl 
                                refreshing={refreshing} onRefresh={onRefresh}/>}>
                            {flatlist(store.myPendingResultsTrackers, "have pending")}
                        </Content>
                        </BounceColorWrapper>
                    </Tab>
                    <Tab  heading={
                        <TabHeading style={{backgroundColor:'rgb(38, 171, 75)'}}>
                            <Text style={{color:'white'}}>
                                CONFIRMED
                            </Text>
                        </TabHeading>}>
                        <BounceColorWrapper style={{flex: 1}}
                            mainColor={currentStyle.background.color}>
                            <Content contentContainerStyle={{
                                backgroundColor:currentStyle.background.color}}  
                                refreshControl={
                                    <RefreshControl 
                                        refreshing={refreshing} onRefresh={onRefresh}/>}>
                                {flatlist(store.myConfirmedResultsTrackers, "have confirmed")}
                            </Content>
                        </BounceColorWrapper>

                    </Tab>
                </Tabs>
            </Content>
        </Container>
    )
}
const styles = {
    separator:{
        live:{
            height:48, backgroundColor:'rgb(56,68,165)' },
        upcoming:{
            height:48, backgroundColor:'gray'},
        text:{
            fontSize:20, fontWeight:'600', textAlign:'center' }
    },
    noTracker:{
        listItem:{
            justifyContent:'center'},
        text:{
            justifyContent:'center', textAlign:'center', 
            fontSize:18, width:'90%', marginVertical: 5}
    }
}