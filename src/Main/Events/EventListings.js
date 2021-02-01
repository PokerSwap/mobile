import React, { useContext, useState } from 'react';
import { Context } from '../../Store/appContext';

import { Text,  Segment, Spinner, ListItem } from 'native-base';
import {  RefreshControl, FlatList, View, StatusBar} from 'react-native'
 
import HomeHeader from "../../View-Components/HomeHeader";
import EventBody from './Components/EventBody';
import EventSearchBar from './Components/EventSearchBar';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'
 
export default EventListings = (props, navigation) => {
    const { store, actions } = useContext(Context)

    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1)
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
        var answer = await actions.tournament.getInitial()
        wait(2000).then(() => setRefreshing(false));
    }
    // FUNCTION TO GET MORE TOURNAMENTS
    const getMore = async( currentPage ) => {
        currentPage += 12
        setPage(currentPage)
        if (mode == 'byLocation'){
        var answer1 = await actions.tournament.getMore(
            currentPage, 'lon', myCoords.longitude, 'lat', myCoords.latitude)
        }else {
        var answer2 = await actions.tournament.getMore(currentPage)
        }
    }
    // COMPONENT FOR TOURNAMENT BODY
    var EventRow = ({item, index}) => {
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
            <HomeHeader title={'Event Listings'} />
            
            {/* SEARCH BAR COMPONENT */}
            <Segment style={{backgroundColor:currentStyle.background.color, 
                marginVertical:5}}>
                <EventSearchBar setMyCoords={setMyCoords} 
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
                                onRefresh={onRefresh} />}
                        onEndReachedThreshold={0.99}
                        onEndReached ={()=>getMore(page) }
                        ListFooterComponent={<Text style={{textAlign:'center'}}></Text>} />
                    :
                    // CONDITION IF NO TOURNAMENTS ARE FOUND UNDER FIELDS
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} />}
                        ListFooterComponent={
                            <Segment style={{ width:'80%', marginTop:20, alignSelf:'center', 
                                backgroundColor:'rgba(0,0,0,0)'}}>
                                <Text style={{textAlign:'center', color:currentStyle.text.color, 
                                    fontSize:18, justifyContent:'center'}}> 
                                    There are no tournamnents under that name in our database
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
        </View>
    )
}