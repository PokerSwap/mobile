
import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import { View } from 'react-native'
import { Text, Button, Icon, Toast } from 'native-base';
import { Col } from 'react-native-easy-grid'

export default TourSwapButton = (props) => {
    const { store, actions } = useContext(Context)
    const [ busted, setBusted ] = useState(false)

    const [disabled, setDisabled] = useState(false)
    const navigation = useNavigation();

    useEffect(() => {
        props.buyin.chips == 0 ? setBusted(true) : setBusted(false)
        
    }, [busted])



    var lastCol, buttonColor, path, swap;
    

    lastCol = 
        <Icon type="FontAwesome5" name="handshake" 
            style={{alignSelf:'center', fontSize:24}} />;
    path = "inactive";
    swap={}
    buttonColor = 'rgb(56,68,165)';
    

    const preliminary = async() => {
        // CHECKS IF MY USER IS BUSTED
        if(props.my_buyin.chips !== 0){
            // CHECKS IF CURRENT BUYIN IS BUSTED
            if (props.buyin.chips !== 0){
                enterSwapOffer()
            } 
            // BUSTED BUYIN
            else {
                console.log("You can't swap with a busted user")
            }
        }
        // YOU'RE BUSTED
        else {
            // REBUYING BACK INTO THE TOURNAMENT
            if(path == 'edit'){
                navigation.push('Verify Ticket',{
                    tournament: props.tournament,
                    tournament_id: props.tournament.id,
                }) 
            } 
            // YOU CANNOT SWAP WHILE BUSTED
            else { 
                console.log('You cannot swap while busted')
            }
        }
    }

    const enterSwapOffer = async() => {
        // CHECKING IF ITS MY BUYIN
        if( props.buyin.user_id !== store.myProfile){
            // SWAPPING WITH ACTION LEFT
            if( props.action.actions !== 50 ){


                if (path !== 'inactive') {
                
                navigation.push('Swap Offer',{
                    status: path,
                    buyin: props.buyin,
                    tournament: props.tournament,
                    buyinSince: props.buyinSince,
                    swap: swap
                })
                } else {
                actions.swap.removeCurrent()
                console.log('this inactive')
                navigation.push('Swap Offer',{
                    status: 'inactive',
                    buyin: props.buyin,
                    tournament: props.tournament,
                    buyinSince: props.buyinSince,
                    swap: swap
                })
                }
                
            }
            // SWAPPING WITH NO ACTION LEFT
            else {
                if ( path == 'pending' || path == 'counter_incoming' ){
                    navigation.push('Swap Offer',{
                        status: path,
                        buyin: props.buyin,
                        tournament: props.tournament,
                        buyinSince: props.buyinSince,
                        swap: swap
                    })
                } else {
                    Toast.show(
                        {text:'Insufficient action in this event to create swap', 
                            duration:3000, position:'bottom'})
                }
            }
        }
        // CHANGING BUYIN IF ITS MINE
        else {
            navigation.push('Swap Offer',{
                status: path,
                buyin: props.buyin,
                tournament: props.tournament,
                buyinSince: props.buyinSince,
                swap: swap
            })
        }
    }
      
    const handler = () => {
        setDisabled(true)
        preliminary();
        setTimeout(()=>{setDisabled(false)}, 2000)
    }

    return(
        <Col style={{ justifyContent:'center', marginLeft:10, textAlign:'center'}}>
            {/* SWAP BUTTON */}
            <Button disabled={disabled} onPress={()=> handler()}
                style={{backgroundColor:buttonColor, width:70, height:70,
                justifyContent:'center', alignSelf:'center'}}>
                {lastCol}
            </Button>
            {/* LAST UPDATE DESCRIPTOR */}
            <Text style={{marginTop:10, color:props.txt,textAlign:'center', alignSelf:'center'}}>
                {props.buyinSince}
            </Text>
        </Col>
    )
}