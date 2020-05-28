import React, { useContext } from 'react';
import { Text, List, ListItem } from 'native-base';

import { Context } from '../../../Store/appContext'

import MyProfileHistoryCard from './MyProfileHistoryCard'
import ProfileHistoryCard from './ProfileHistoryCard'

export default HistoryList = (props) => {
  const { store, actions } = useContext(Context)
  const { navigation } = props;

  var history =[]
  if(id !== store.myProfile.id ){
    var checkingHistory = past.forEach(
      tracker =>  {
        var y = tracker.buyins.filter(buyin => 
          buyin.recipient_user.id == id)
        if (y.length !== 0) {
          y[0]["tournament_name"] = tracker.tournament.name
          history.push(...y)
         }else {null}
      }
    )
  } else{
    history = store.myPastTrackers
  }

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
  
  return(
    <List style={{justifyContent:'center'}}>
      <ListItem noIndent itemHeader style={{ justifyContent:'center' }}>
        <Text style={{ textAlign:'center', fontWeight:'600', fontSize:24}}>
          History
        </Text>
      </ListItem>
      {id !== store.myProfile.id ?
        history ?
          theirHistory : <Text>You have not swapped with this user</Text>
        : 
        history  ?
          myHistory : <Text>Start Swapping Today!</Text>}
    </List>  
  )
}
