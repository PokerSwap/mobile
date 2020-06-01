import React, { useContext, useState, useEffect } from 'react';
import { Text, List, ListItem } from 'native-base';

import { Context } from '../../../Store/appContext'

import MyProfileHistoryCard from './MyProfileHistoryCard'
import ProfileHistoryCard from './ProfileHistoryCard'

export default HistoryList = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props;
  const [ history, setHistory ] = useState(null)

  var past = store.myPastTrackers

  useEffect(() => {
    getHistory()
  }, [])

  const getHistory = () => {
    var aHistory =[]
    if(props.user_id !== store.myProfile.id ){
      var checkingHistory = past.forEach(
        tracker =>  {
          var y = tracker.buyins.filter(buyin => 
            buyin.recipient_user.id == props.user_id)
          if (y.length !== 0) {
            y[0]["tournament_name"] = tracker.tournament.name
            aHistory.push(...y)
            
           }else {null}
        }
      )
      setHistory(aHistory)
    } else{
      setHistory(store.myPastTrackers)
    }
  }

  if(history){
    var myHistory = history.map((content, index) =>{
      return(
        <MyProfileHistoryCard 
          key={index}
          tournament={content.tournament}
          my_buyin={content.my_buyin}
          buyins={content.buyins}
          final_profit={content.final_profit}
        />
      )
    })
  
    var theirHistory = history.map((content, index) => {
      var allSwaps
      var agreed_swaps = content.agreed_swaps
      var other_swaps = content.other_swaps
  
      agreed_swaps !== [] ? 
        other_swaps !== [] ?
          allSwaps = [...agreed_swaps, ...other_swaps] 
          : allSwaps = [...agreed_swaps]
        : 
        other_swaps !== [] ?
          allSwaps = [...other_swaps]
          : allSwaps = null
      
      return(
        <ProfileHistoryCard key={index}
          allSwaps={allSwaps} buyin={content}
          navigation={props.navigation}
          myTrackers={store.myPastTrackers}/>
      )
    })

  }else{
    null
  }

  
  return(
    <List style={{justifyContent:'center'}}>
      <ListItem noIndent itemHeader style={{ justifyContent:'center' }}>
        <Text style={{ textAlign:'center', fontWeight:'600', fontSize:24}}>
          History
        </Text>
      </ListItem>
      {props.user_id !== store.myProfile.id ?
        history ?
          theirHistory : <Text>You have not swapped with this user</Text>
        : 
        history  ?
          myHistory : <Text>Start Swapping Today!</Text>}
    </List>  
  )
}
