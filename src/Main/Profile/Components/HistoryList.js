import React, { useContext, useState, useEffect } from 'react';
import { Text, List, ListItem, Spinner } from 'native-base';

import { Context } from '../../../Store/appContext'
import MyProfileHistoryCard from './MyProfileHistoryCard'
import TheirProfileHistoryCard from './TheirProfileHistoryCard'

export default HistoryList = (props) => {
  const { store, actions } = useContext(Context)
  const [ history, setHistory ] = useState(null)

  useEffect(() => {
    getHistory()
  }, [null])

  // RETRIEVING RELATED SWAP HISTORY
  const getHistory = () => {
    var aHistory =[]
    if(props.user_id !== store.myProfile.id ){
      var checkingHistory = store.myPastTrackers.forEach(
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

  // MAPPING HISTORY COMPONENT
  if(history){
    var myHistory = history.map((content, index) =>{
      return(
        <MyProfileHistoryCard 
          key={index}
          tournament={content.tournament}
          my_buyin={content.my_buyin}
          buyins={content.buyins}
          final_profit={content.final_profit}/>
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
        <TheirProfileHistoryCard key={index}
          allSwaps={allSwaps} buyin={content}
          navigation={props.navigation}
          myTrackers={store.myPastTrackers}/>
      )
    })
  }else{
    null
  }

  // EMPTY HISTORY COMPONENT
  var emptyHistory = (message) => {
    return(
      <ListItem style={{justifyContent:'center', marginTop:-20}} noIndent>
        <Text style={{textAlign:'center', fontSize:20, fontWeight:'600'}}>
          {message}
        </Text>
      </ListItem>
    )
  }
  
  return(
    <List style={{justifyContent:'center'}}>
      {/* HISTORY HEADER */}
      <ListItem noIndent itemHeader style={{ justifyContent:'center' }}>
        <Text style={{ textAlign:'center', fontWeight:'600', fontSize:24}}>
          History
        </Text>
      </ListItem>
      {/* HISTORY LIST */}
      {history ?
        props.user_id !== store.myProfile.id ?
          history.length !== 0 ?
            theirHistory : emptyHistory("You have not swapped with this user!")
        : history.length !== 0 ?
            myHistory : emptyHistory("Start Swapping Today!")
      : <Spinner />}
    </List>  
  )
}
