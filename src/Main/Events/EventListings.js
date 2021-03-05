import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext';

import { Text, Content,  Segment, Spinner, Tabs, Tab, TabHeading } from 'native-base';
import {  RefreshControl, FlatList, View, StatusBar, SafeAreaView} from 'react-native'
 
import HomeHeader from "../../View-Components/HomeHeader";
import EventBody from './Components/EventBody';
import OfficialEventSearchBar from './Components/OfficialEventSearchBar';
import CustomEventSearchBar from './Components/CustomEventSearchBar';

import BounceColorWrapper from '../../Functional/BounceColorWrapper'


import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'
 
export default EventListings = (props, navigation) => {
    const { store, actions } = useContext(Context)

    const [refreshing, setRefreshing] = useState(false);
    const [refreshingCustom, setRefreshingCustom] = useState(false);

    const [page, setPage] = useState(1)
    const [pageCustom, setPageCustom] = useState(1)

    // 3 modes orderByDistance, byZip, ByLocation
    const [mode, setMode] = useState('byDate')
    const [myCoords, setMyCoords] = useState({})

    // REFRESH TIMER FOR NEW TOURNAMENTS
    const wait = (timeout) => {
        return new Promise(resolve => {
        setTimeout(resolve, timeout);
        });
    }
    // REFRESH FUNCTION FOR NEW TOURNAMENTS
    const onRefresh = async() => {
        setRefreshing(true);
        setPage(1)
        setMode('byDate')
        var answer = await actions.tournament.getInitial('/official')
        wait(2000).then(() => setRefreshing(false));
    }

    const onRefreshCustom = async() => {
        setRefreshingCustom(true);
        setPageCustom(1)
        setMode('byDate')
        var answer = await actions.tournament.getInitial('/custom')
        wait(2000).then(() => setRefreshingCustom(false));
    }
    // FUNCTION TO GET MORE TOURNAMENTS
    const getMore = async( currentPage ) => {
        currentPage += 12
        setPage(currentPage)
        if (mode == 'byLocation'){
        var answer1 = await actions.tournament.getMore(
            currentPage,  '/official','lon', myCoords.longitude, 'lat', myCoords.latitude)
        }else {
        var answer2 = await actions.tournament.getMore(currentPage, '/official')
        }
    }

    // FUNCTION TO GET MORE TOURNAMENTS
    const getMoreCustom = async( currentPageCustom ) => {
        currentPageCustom += 12
        setPageCustom(currentPageCustom)
        if (mode == 'byLocation'){
        var answer1 = await actions.tournament.getMore(
            currentPageCustom, '/custom','lon', myCoords.longitude, 'lat', myCoords.latitude)
        }else {
        var answer2 = await actions.tournament.getMore(currentPageCustom, '/custom')
        }
    }

    // COMPONENT FOR TOURNAMENT BODY
    var EventRow = ({item, index}) => {
        console.log('eee', store.eventListCustom)
        return(
        <EventBody key={index} 
            mode={mode} myCoords={myCoords} event={item} />
        )
    }

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
    
    return(
        <View style={{flex:1, backgroundColor:currentStyle.background.color}}>
            <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                        backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
            <SafeAreaView style={{flex:1,backgroundColor:currentStyle.header.color}}>

            <HomeHeader title={'Event Listings'} />
            <View style={{backgroundColor:currentStyle.background.color, flex:1}}>

            
            <Tabs tabBarUnderlineStyle={{backgroundColor:'white'}}
                    tabBarTextStyle={{fontWeight:'bold', color:'white'}}>
                    <Tab  heading={
                        <TabHeading style={{backgroundColor:'green'}} >
                            <Text  style={{color:'white'}}>OFFICIAL</Text>
                        </TabHeading>}>
                        <BounceColorWrapper style={{flex: 1}}
                            mainColor={currentStyle.background.color}>
                        {/* <Content contentContainerStyle={{
                            backgroundColor:currentStyle.background.color}} 
                            refreshControl={
                                <RefreshControl 
                                refreshing={refreshing} onRefresh={onRefresh}/>}> */}
                            {/* {flatlist(store.myPendingResultsTrackers, "have pending")} */}

                        {/* SEARCH BAR COMPONENT */}
                        <Segment style={{backgroundColor:currentStyle.background.color, 
                            marginVertical:5}}>
                            <OfficialEventSearchBar setMyCoords={setMyCoords} 
                                setMode={setMode} setPage={setPage} />
                        </Segment>
                        
                        {/* MAIN TOURNAMENT COMPONENT */}
                        {store.tournamentList != null && !store.myProfile.naughty ?
                            store.tournamentList.length != 0 && typeof(store.tournamentList) != 'string' ?
                                // TOURNAMENT LIST GENERATOR 
                                <FlatList
                                    data={store.tournamentList}
                                    renderItem={EventRow}
                                    keyExtractor={(content, index) => index.toString()}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh} 
                                            title="Refreshing Event Listings..."
                                            tintColor={currentStyle.text.color}
                                            titleColor={currentStyle.text.color}/>}
                                    onEndReachedThreshold={0.99}
                                    onEndReached ={()=>getMore(page) }
                                    ListFooterComponent={<Text style={{textAlign:'center'}}></Text>} />
                                :
                                // CONDITION IF NO TOURNAMENTS ARE FOUND UNDER FIELDS
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh} 
                                            title="Refreshing Event Listings..."
                                            tintColor={currentStyle.text.color}
                                            titleColor={currentStyle.text.color}/>}
                                    ListFooterComponent={
                                        <Segment style={{ width:'80%', marginTop:20, alignSelf:'center', 
                                            backgroundColor:'rgba(0,0,0,0)'}}>
                                            <Text style={{textAlign:'center', color:currentStyle.text.color, 
                                                fontSize:18, justifyContent:'center'}}> 
                                                An error occured. Please make sure you are connected to the internet
                                            </Text>
                                        </Segment>} />
                            
                            // CONDITION USED WHILE LOADING THE TOURNAMENTS
                        :
                        !store.myProfile.naughty ?
                            <Spinner /> 
                            :
                            <Text style={{color:currentStyle.text.color, width:'80%', alignSelf:'center', 
                                marginTop:20, textAlign:'center', fontSize:18}}>
                                You've been put on the naughty list.{'\n'}{'\n'}
                                To start swapping again,{'\n'}
                                please pay your overdue swaps and have the other users confirm payment.
                            </Text> }
                            {/* </Content> */}
                        </BounceColorWrapper>

                    </Tab>
                    <Tab  heading={
                        <TabHeading style={{backgroundColor:'orange'}} >
                            <Text  style={{color:'white'}}>CUSTOM</Text>
                        </TabHeading>}>
                        <BounceColorWrapper style={{flex: 1}}
                            mainColor={currentStyle.background.color}>
                        {/* <Content contentContainerStyle={{
                            backgroundColor:currentStyle.background.color}} 
                            refreshControl={
                                <RefreshControl 
                                refreshing={refreshing} onRefresh={onRefresh}/>}> */}
                            {/* {flatlist(store.myPendingResultsTrackers, "have pending")} */}

                        {/* SEARCH BAR COMPONENT */}
                        <Segment style={{backgroundColor:currentStyle.background.color, 
                            marginVertical:15}}>
                            <CustomEventSearchBar setMyCoords={setMyCoords} 
                                setMode={setMode} setPage={setPageCustom} />
                        </Segment>
                        
                        {/* MAIN TOURNAMENT COMPONENT */}
                        {store.eventListCustom != null && !store.myProfile.naughty ?
                            store.eventListCustom.length != 0 && typeof(store.eventListCustom) != 'string' ?
                                // TOURNAMENT LIST GENERATOR 
                                <FlatList
                                    
                                    data={store.eventListCustom}
                                    renderItem={EventRow}
                                    keyExtractor={(content, index) => index.toString()}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshingCustom}
                                            onRefresh={onRefreshCustom} 
                                            title="Refreshing Custom Listings..."
                                            tintColor={currentStyle.text.color}
                                            titleColor={currentStyle.text.color}/>}
                                    onEndReachedThreshold={0.99}
                                    onEndReached ={()=>getMoreCustom(pageCustom) }
                                    ListFooterComponent={<Text style={{textAlign:'center', marginBottom:10, backgroundColor:'red'}}></Text>} />
                                :
                                // CONDITION IF NO TOURNAMENTS ARE FOUND UNDER FIELDS
                                <FlatList
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshingCustom}
                                            onRefresh={onRefreshCustom} 
                                            title="Refreshing Custom Events..."
                                            tintColor={currentStyle.text.color}
                                            titleColor={currentStyle.text.color}/>}
                                    ListFooterComponent={
                                        <Segment style={{ width:'80%', marginTop:20, alignSelf:'center', 
                                            backgroundColor:'rgba(0,0,0,0)'}}>
                                            <Text style={{textAlign:'center', color:currentStyle.text.color, 
                                                fontSize:18, justifyContent:'center'}}> 
                                                An error occured. Please make sure you are connected to the internet
                                            </Text>
                                        </Segment>} />
                            
                            // CONDITION USED WHILE LOADING THE TOURNAMENTS
                        :
                        !store.myProfile.naughty ?
                            <Spinner /> 
                            :
                            <Text style={{color:currentStyle.text.color, width:'80%', alignSelf:'center', 
                                marginTop:20, textAlign:'center', fontSize:18}}>
                                You've been put on the naughty list.{'\n'}{'\n'}
                                To start swapping again,{'\n'}
                                please pay your overdue swaps and have the other users confirm payment.
                            </Text> }
                            {/* </Content> */}
                        </BounceColorWrapper>   

                    </Tab>
                </Tabs>
                </View>
                
                </SafeAreaView>
        </View>
    )
}