import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import { Context } from '../../Store/appContext';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';

import { AppState, RefreshControl, Text, View, StatusBar } from 'react-native'
import { Container, Content, Card } from 'native-base';
import { Grid, Row, Col } from 'react-native-easy-grid'
import Spinner from 'react-native-loading-spinner-overlay'

import AgreedPath from './Paths/agreed';
import CanceledPath from './Paths/canceled';
import IncomingPath from './Paths/incoming';
import CounterIncomingPath from './Paths/counter_incoming';
import EditPath from './Paths/edit';
import InactivePath from './Paths/inactive';
import RejectedPath from './Paths/rejected';
import PendingPath from './Paths/pending';

import BounceColorWrapper from '../../Functional/BounceColorWrapper'
import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default SwapOffer = (props) => {
    const { store, actions } = useContext(Context)

    var currentStyle
    store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle

    const route = useRoute();
    const { status, swap, buyin, tournament, buyinSince } = route.params;
    const [ loading, setLoading ] = useState(false)
    const [ currentSwap, setCurrentSwap ] = useState(swap)
    const [ aStatus, setAStatus ] = useState(status)
    const [ currentBuyin, setCurrentBuyin ] = useState(buyin)
    const [ sTime, setSTime ] = useState(null)
    const [ bTime, setBTime ] = useState(buyinSince)
    const [ refreshing, setRefreshing ] = useState(false);



    var getBuyin = async() => {
        var x = await actions.buy_in.getCurrent(buyin.id)
        setCurrentBuyin(store.currentBuyin)
    }

    var getSwap = async() => {

        if (aStatus !== 'edit'){
            console.log('currentSwap', currentSwap)
            if (currentSwap !== undefined){
                console.log('getting swap from SwapOffer', store.currentSwap)
                var x = await actions.swap.getCurrent(currentSwap.id)
            } else {
                null
            }
            if (store.currentSwap.id !== undefined){
                setCurrentSwap(store.currentSwap)
                setAStatus(store.currentSwap.status)
            } else {
                return setAStatus('inactive')
            }
        } else {
            setAStatus('edit') 
        }
    }

    function wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        console.log('Refresh from Page')

        getBuyin()
        getSwap()
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);


    // YOUR SWAP VIEW
    if (store.myProfile.id == buyin.user_id){ 
        currentPath = 
            <EditPath 
                setLoading={setLoading} onRefresh={onRefresh} 
                setRefreshing={setRefreshing} 
                buyin={buyin} tournament={tournament}/>
    }    
    // INCOMING SWAP VIEW
    else if (aStatus == 'incoming'){
        currentPath = 
            <IncomingPath 
                setLoading={setLoading} onRefresh={onRefresh}
                tournament_status={tournament.tournament_status}
                swap={currentSwap} buyin={buyin}
                tournament_id={tournament.id}  />
    } 
    // COUNTER INCOMING SWAP VIEW
    else if (aStatus == 'counter_incoming'){
        currentPath = 
            <CounterIncomingPath 
                setLoading={setLoading} onRefresh={onRefresh}
                swap={currentSwap} buyin={buyin}
                tournament_status={tournament.tournament_status}
                tournament_id={tournament.id}  />
    }
    // PENDING SWAP VIEW
    else if (aStatus == 'pending'){
        currentPath = 
            <PendingPath 
                setLoading={setLoading} onRefresh={onRefresh}
                tournament_status={tournament.tournament_status}
                swap={currentSwap} buyin={buyin}
                tournament={tournament} />
    } 
    // AGREED SWAP VIEW
    else if (aStatus == 'agreed'){
        currentPath = 
            <AgreedPath 
                setLoading={setLoading} setRefreshing={setRefreshing} 
                tournament_status={tournament.tournament_status} 
                tournament={tournament} 
                swap={currentSwap} buyin={buyin}/>
    }
    // REJECTED SWAP VIEW 
    else if (aStatus == 'rejected'){
        currentPath = 
            <RejectedPath 
                setLoading={setLoading} setRefreshing={setRefreshing}
                tournament_status={tournament.tournament_status} 
                buyin={buyin} swap={currentSwap}/>
    }
    // CANCELED SWAP VIEW 
    else if (aStatus == 'canceled'){
        currentPath = 
            <CanceledPath 
                setLoading={setLoading} setRefreshing={setRefreshing}
                tournament_status={tournament.tournament_status}
                swap={currentSwap} buyin={buyin}/>
    }
    // INACTIVE SWAP VIEW
    else {
        currentPath = 
        <InactivePath 
            setAStatus={setAStatus} swap={currentSwap} setCurrentSwap ={setCurrentSwap}
            setLoading={setLoading} setRefreshing={setRefreshing} onRefresh={onRefresh}
            tournament_status={tournament.tournament_status}
            tournament={tournament} buyin={buyin}/>
    }



    useEffect(() => {
        setRefreshing(true)
        getBuyin()
        getSwap()
        console.log('Refresh from store')
        actions.refresh.offer(false)
        setRefreshing(false)
    }, [store.refreshOffer])

    let currentPath;

    return(
        <View style={{flex:1,  backgroundColor:currentStyle.background.color}}>
            <View style={{height:20,  backgroundColor:currentStyle.header.color}}>
                <StatusBar StatusBarAnimation={'fade'} barStyle={'light-content'}
                backgroundColor={'rgb(38, 171, 75)'}/>
            </View>
            <OtherHeader title={'Swap Offer'} />
            <Spinner visible={loading}/>
            <Content contentContainerStyle={{backgroundColor:currentStyle.background.color}}  
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                
                {/* EVENT HEADER */}
                <Card transparent style={{marginVertical:40, width:'90%', alignSelf:'center', 
                    flexDirection:'column', backgroundColor:currentStyle.background.color}}>
                    <Text style={{marginVertical:10, fontSize:20, fontWeight:'bold', 
                        textAlign:'center', color: currentStyle.text.color}}>
                        {tournament.name}
                    </Text>
                </Card>
            
                {/* CURRENT STATUS OF BUYIN */}
                <Card style={{alignSelf:'center', flex:1, width:'90%', 
                    paddingTop:15, backgroundColor:'rgb(38, 171, 75)'}}>
                    {/* USERNAME */}
                    <Row style={{justifyContent:'center', marginBottom:10}}>
                        <Text style={{color:'white', textAlign:'center', fontSize:30}}>
                            {buyin.user_name}
                        </Text>
                    </Row>

                    {/* BUYIN INFO */}
                    <Row>
                        {/* TABLE */}
                        <Col style={{justifyContent:'center'}}>
                            <Text style={{color:'white', textAlign:'center', fontSize:18}}>
                                Table:
                            </Text>
                            <Text style={{color:'white', textAlign:'center', fontSize:24}}>
                                {currentBuyin.table}
                            </Text>
                        </Col>
                        {/* SEAT */}
                        <Col style={{justifyContent:'center'}}>
                            <Text style={{color:'white', textAlign:'center', fontSize:18}}>
                                Seat:
                            </Text>
                            <Text style={{color:'white', textAlign:'center', fontSize:24}}>
                                {currentBuyin.seat}
                            </Text>
                        </Col>
                        {/* CHIPS */}
                        <Col style={{justifyContent:'center'}}>
                            <Text style={{color:'white', textAlign:'center', fontSize:18}}>
                                Chips:
                            </Text>
                            <Text style={{color:'white', textAlign:'center', fontSize:24}}>
                                {currentBuyin.chips}
                            </Text>
                        </Col>
                    </Row>
                    
                    {/* BUYIN LAST UPDATED TIME */}
                    <Row style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
                        <Text style={{color:'white', fontWeight:'bold', paddingVertical:10, 
                            paddingRight:10, textAlign:'right', fontSize:12}}>
                            Updated: {moment(currentBuyin.updated_at).fromNow()}
                        </Text>
                    </Row>
                </Card>

                {/* SWAP BODY PATH */}
                {currentPath}

            </Content>
        </View>
      
    )
}
