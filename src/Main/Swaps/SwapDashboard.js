import React, {useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

import { AppState, FlatList, Platform, RefreshControl, View, StatusBar, Alert } from 'react-native';
import { Button, Container, Content, Icon, Tabs, Tab, 
TabHeading, Text, Toast } from 'native-base';

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import HomeHeader from '../../View-Components/HomeHeader'
import SwapTracker from './Components/SwapTracker';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

const customMessage = (x) => {
    Toast.show({text:x, duration:3000, position:'top'})}
  
export default SwapDashboard = (props) => {
    
    const { store, actions } = useContext(Context) 
    const navigation = useNavigation()

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
    
    const goToThing = async(remoteMessage) => {
        // IF SWAP IS RECIEVED IN FOREGROUND
        if (remoteMessage.data.type == 'swap' && store.currentPage =="Swap Offer" 
            && remoteMessage.data.id == store.currentSwap.id ){
        
            var sw = await actions.refresh.offer(true)
            return customMessage(remoteMessage.data.alert)
        } else if (remoteMessage.data.type == 'swap' && 
            store.currentPage =="Swap Offer"){
            var e = await actions.swap.getCurrent(remoteMessage.data.id)
            var x = await actions.tournament.getCurrent(store.currentSwap.tournament_id)
            var ree = x.buyins.filter(buyin => 
                buyin.recipient_user.id == store.currentSwap.recipient_user.id)
            var dwer = await actions.buy_in.getCurrent(ree[0].recipient_buyin.id)
            
            navigation.push("Swap Offer",{
                status: store.currentSwap.status,
                buyin: store.currentBuyin,
                tournament: store.currentTournament,
                buyinSince: store.currentBuyin.updated_at,
                swap: store.currentSwap
            })

            return customMessage(remoteMessage.data.alert)
            
        } else if (remoteMessage.data.type == 'swap'){
            var cc = await actions.navigate.toSwap(remoteMessage.data, navigation)
        } else {
            null
        }
    
        if (remoteMessage.data.type == 'event'){
            var cc = await actions.navigate.toEvent(remoteMessage.data, navigation)
        } else if (remoteMessage.data.type == 'chat'){
            var cc = await actions.navigate.toChat(remoteMessage.data, navigation)
        } else if (remoteMessage.data.type == 'buyin'){
            var cc = await actions.navigate.toBuyin(remoteMessage.data, navigation)
        } else {
            null
        }

        if(remoteMessage.data.type == 'result' && store.currentPage =="Swap Results"){

        } else if (remoteMessage.data.type == 'result'){
            var cc = await actions.navigate.toResult(remoteMessage.data, navigation)
        } else {
            null
        }
    }

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
        // console.log('Authorization status:', authStatus);
        }
    }

    //BACKGROUND
    useEffect(() => {
        requestUserPermission()

        //Background IOS
        if(Platform.OS == 'ios'){
            messaging().onNotificationOpenedApp(async remoteMessage => {
                try {
                    console.log('Getting from Background IOS',remoteMessage); 
                    if (remoteMessage.data.type=='swap'){
                        var e = await actions.navigate.toSwap(
                            remoteMessage.data, navigation)
                    } else if (remoteMessage.data.type=='chat'){
                        var e = await actions.navigate.toChat(
                            remoteMessage.data, navigation)
                    } else if (remoteMessage.data.type=='event'){
                        var e = await actions.navigate.toEvent(
                            remoteMessage.data, navigation)
                    } else if (remoteMessage.data.type=='result'){
                        var e = await actions.navigate.toResult(
                            remoteMessage.data, navigation)
                    } else if (remoteMessage.data.type=='coin'){
                        var e = await actions.navigate.toCoin(
                            remoteMessage.data, navigation)
                    } else if (remoteMessage.data.type=='buyin'){
                        var e = await actions.navigate.toBuyin(
                            remoteMessage.data, navigation)
                    } else {null}  
            
                } catch (error) {
                    console.log('error', error)
                }})
        } else {
        //Background Android
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            try {
                console.log('Getting from Background Android', remoteMessage)

                if (remoteMessage.data.type=='swap'){
                    var e = await actions.navigate.toSwap(
                        remoteMessage.data, navigation)
                } else if (remoteMessage.data.type=='chat'){
                    if (store.currentPage == "Chat"){
                        var x = actions.refresh.chat(true)
                    } else {
                        var e = await actions.navigate.toChat(
                            remoteMessage.data, navigation)
                    }
                } else if (remoteMessage.data.type=='event'){
                    var e = await actions.navigate.toChat(
                        remoteMessage.data, navigation)
                } else if (remoteMessage.data.type=='buyin'){
                    var e = await actions.navigate.toBuyin(
                        remoteMessage.data, navigation)
                } else if (remoteMessage.data.type=='result'){
                    var e = await actions.navigate.toResult(
                        remoteMessage.data, navigation)
                } else if (remoteMessage.data.type=='coin'){
                    var e = await actions.navigate.toCoin(
                        remoteMessage.data, navigation)
                } else {
                    null
                }

            } catch (err){
                console.log('back err', err)
            }
        })
        }
        
        return () => {
            // cleanup
        }
    }, [false])

    if (Platform.OS == 'ios'){
        messaging().getInitialNotification()
        .then(remoteMessage => {
        if (remoteMessage && store.notificationData) {
            goToThing(remoteMessage)
            console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
            );
        }
        });
    } else {
        null
    }

    // FOREGROUND BOTH
    useEffect(() => {

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Recieved in Foreground', remoteMessage)
        if (remoteMessage.data.type == 'swap'){
            var xee = await actions.tracker.getCurrent()
            var xeee = await actions.tracker.getUpcoming()
            var e = await actions.swap.returnCurrent(remoteMessage.data.id)
            var x = await actions.tournament.getCurrent(e.tournament_id)
            
            // UPDATING THE CURRENT SWAP
            if (store.currentPage =="Swap Offer" && 
                remoteMessage.data.id==store.currentSwap.id){
            console.log('refreshing here UPDATING THE CURRENT SWAP')

            var s = actions.refresh.offer(true)
            var e = await actions.swap.getCurrent(remoteMessage.data.id)
            var sw = actions.refresh.offer(false)
            return customMessage(remoteMessage.data.alert)
            } 
            // UPDATING SWAP OFFER ON INACTIVE SWAP
            else if (store.currentPage =="Swap Offer" && 
                remoteMessage.data.buyin_id==store.currentBuyin.id){
            console.log('refreshing here UPDATING SWAP OFFER ON INACTIVE SWAP')
            var e = await actions.swap.getCurrent(remoteMessage.data.id)
            var sw = actions.refresh.offer(true)

            return customMessage(remoteMessage.data.alert)

            } else {
                null
            }

            if (store.currentPage =="Event Lobby"){
            console.log('in event lobby')

            var e = await actions.swap.returnCurrent(remoteMessage.data.id)
            var x = await actions.tournament.getCurrent(e.tournament_id)
            var xr = await actions.tournament.setCurrentLobby(x, x.tournament)
            return customMessage(remoteMessage.data.alert)
            }
        }
        var checkPress = (reason) => {
            console.log(reason)

            if (reason =='user'){
            goToThing(remoteMessage)
            } else {null}
        }
        if (remoteMessage.data.type == 'buyin'){

        }
        if(store.currentPage == "Chat"  && remoteMessage.data.type == 'chat'){
            console.log('refresh chat now [lease')
            return actions.refresh.chat(true)
        }
        else if (store.currentPage == "Contacts"  && remoteMessage.data.type == 'chat'){
            return actions.chat.getMine()
        }
        else if (remoteMessage.data.type == 'chat'){
            actions.refresh.chat(true)
            return Toast.show({
                style: {
                backgroundColor: "rgb(10,132,255)"},
                duration:3000,
                buttonText: "Go To",
                buttonTextStyle: { color: "#008000" },
                buttonStyle: { backgroundColor: "#5cb85c" },
                onClose: (reason)=> checkPress(reason),
                text:remoteMessage.notification.title+ ':  ' + remoteMessage.data.alert, 
                position:'top'})
        }
        else {null}

        if (store.currentPage == "Swap Results" && remoteMessage.data.type == 'result'){
            return actions.refresh.result(true)
        }
        else if (store.currentPage = "Event Results" && remoteMessage.data.type == 'result'){
            var xee = await actions.tracker.getPast()
        }
        else if (remoteMessage.data.type == 'result'){
            var xee = await actions.tracker.getPast()
        } else {
            null
        }

        Alert.alert(
            remoteMessage.notification.title, 
            remoteMessage.notification.body,
            [
                { text: 'Open', onPress: () => goToThing(remoteMessage) },
                { text: 'Close', onPress: () => console.log("Cancel Pressed"), }
            ]
        );
        });

        return () => {
        unsubscribe()
        }
    }, []);

    const [ refreshing, setRefreshing ] = useState(false);

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    // LIVE EVENT REFRESH
    const onRefresh1 = useCallback(() => {
        setRefreshing(true);
        actions.tracker.getCurrent()
        console.log(store.myCurrentTrackers)
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    // UPCOMING EVENT REFRESH
    const onRefresh2 = useCallback(() => {
        setRefreshing(true);
        
        actions.tracker.getUpcoming()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    // OCCUPIED CURRENT TRACKER COMPONENT
    var aTracker = ({item, index}) => {
        var y
        if (item.message && item.message == true){
            return(null)
        } else {
            var x
            item.countdown.includes('ago') ? x = 'Started' : x = 'Starts'
            return(<SwapTracker  key={index}  event={item} 
            countdown={item.countdown} timeBy={x}
            my_buyin= {item.my_buyin} buyins = {item.buyins}
            tournament={item.tournament} action={item.action}/>)
        }   
    }

    useEffect(() => {
        setCurrent(store.myCurrentTrackers)
        actions.refresh.dashboard(false)
        
    }, [store.refreshDashboard])

    const [current, setCurrent] = useState(store.myCurrentTrackers)
  

    var aflatlist = () => {

        return(
            <FlatList contentContainerStyle={{ alignSelf: 'stretch', flex:1, }}
                style={{flex:1}}
                data={current}
                extraData={refreshing}
                renderItem={aTracker}
                keyExtractor={(content, index) => index.toString()}
                ListFooterComponent={
                    <View style={{alignSelf:'center', justifyContent:'center', paddingBottom:100}}>
                        {!store.myProfile.naughty ?
                            Object.keys(store.myCurrentTrackers[0])[0] == 'message' ?
                                <Text style={[styles.noTracker.text, {color:currentStyle.text.color}]}> 
                                    You have no live tournaments{'\n'} at the moment. 
                                </Text>
                                :
                                null
                            :
                            <Text style={{color:currentStyle.text.color, width:'80%', 
                                alignSelf:'center', marginTop:20, textAlign:'center', fontSize:18}}>
                                You've been put on the naughty list.{'\n'}{'\n'}
                                To start swapping again,{'\n'}
                                please pay your overdue swaps and have the other users confirm payment.
                            </Text>}
                        <Button iconLeft onPress={() => onRefresh1()}
                            style={{alignSelf:'center', borderRadius:100, marginVertical:10}} >
                            <Icon type='FontAwesome' name='refresh'/>
                            <Text>Refresh</Text>
                        </Button>
                    </View>
                    }
                ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
                stickyHeaderIndices={[0]} />
        )
    }

    var bflatlist = () => {
        return(
            <FlatList contentContainerStyle={{ alignSelf: 'stretch', flex:1 }}
                data={store.myUpcomingTrackers}
                renderItem={aTracker}
                keyExtractor={(content, index) => index.toString()}
                ListFooterComponent={
                    <View style={{alignSelf:'center', 
                        justifyContent:'center', paddingBottom:100}}>
                        {!store.myProfile.naughty ?
                            Object.keys(store.myUpcomingTrackers[0])[0] == 'message' ?
                                <Text style={[styles.noTracker.text, 
                                    {color:currentStyle.text.color}]}> 
                                    You have no upcoming tournaments{'\n'} at the moment. 
                                </Text>
                                :
                                null
                            :
                            <Text style={{color:currentStyle.text.color, width:'80%', 
                                alignSelf:'center', marginTop:20, 
                                textAlign:'center', fontSize:18}}>
                                You've been put on the naughty list.{'\n'}{'\n'}
                                To start swapping again,{'\n'}
                                please pay your overdue swaps and 
                                have the other users confirm payment.
                            </Text>}
                        <Button iconLeft onPress={() => onRefresh2()}
                            style={{alignSelf:'center', borderRadius:100, marginVertical:20}}>
                            <Icon type='FontAwesome' name='refresh'/>
                            <Text>Refresh</Text>
                        </Button>
                    </View> }
                ListFooterComponentStyle={{alignSelf:'center', marginVertical:20}}
                stickyHeaderIndices={[0]} />
        )
    } 

    // REFRESHING AFTER COMING FROM BACKGROUND - START
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
        console.log("App has come to the foreground on Swap Dashboard!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        actions.tracker.getUpcoming()
        actions.tracker.getCurrent()

        console.log("AppState", appState.current);
    };
    // REFRESHING AFTER COMING FROM BACKGROUND - END

    return(
        <Container style={{position:'absolute'}}>

            <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                    backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
      
        <HomeHeader title={'Active Swaps'} />
            <Tabs  tabBarUnderlineStyle={{backgroundColor:'white'}}
                tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
                
                {/* LIVE SWAPTRACKER - START */}
                <Tab tabBarUnderlineStyle='white' 
                    heading={
                    <TabHeading tabBarUnderlineStyle='white' 
                        style={{backgroundColor:'#174502'}}>
                        <Text style={{color:'white'}}>LIVE</Text>
                    </TabHeading>}>
                    <BounceColorWrapper style={{flex: 1}}
                        mainColor={currentStyle.background.color}>
                        <Content contentContainerStyle={{
                            backgroundColor:currentStyle.background.color, display:'flex'}}
                            refreshControl={ 
                                <RefreshControl 
                                    onRefresh={onRefresh1} refreshing={refreshing} />}>
                            {aflatlist()}
                        </Content>
                    </BounceColorWrapper>
                </Tab>
                {/* LIVE SWAPTRACKER - END */}

                {/* UPCOMING SWAPTRACKER - START */}
                <Tab heading={
                    <TabHeading style={{backgroundColor:'#000099'}}>
                        <Text style={{color:'white'}}>UPCOMING</Text>
                    </TabHeading>}>
                    <BounceColorWrapper style={{flex: 1}}
                    mainColor={currentStyle.background.color}>
                        <Content contentContainerStyle={{
                            backgroundColor:currentStyle.background.color, display:'flex'}} 
                            refreshControl={
                                <RefreshControl 
                                    onRefresh={onRefresh2} refreshing={refreshing} />}>
                            {bflatlist()}
                        </Content>
                    </BounceColorWrapper>
                </Tab>
                {/* UPCOMING SWAPTRACKER - END */}
                
            </Tabs>  
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