import React, { useContext, useState, useEffect } from 'react';
import { TextInput, View } from 'react-native'
import { Container, Content, Button, Text, Toast, List, ListItem, Switch } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

export default ConfigureNotifications = () => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()



  const [coinSetting, setCoinSetting] = useState(store.settings.coinUpdate)
  const [swapSetting, setSwapSetting] = useState(store.settings.swapUpdate)
  const [tournamentSetting, setTournamentSetting] = useState(store.settings.tournamentUpdate)

  const toggleIt = async( oldValue, onPage, asyncd ) => {
    onPage(!oldValue)
    var newValue = (!oldValue).toString()
    var ax = await AsyncStorage.setItem(asyncd, newValue)
    var bx = await AsyncStorage.getItem(asyncd)
    console.log(asyncd + ' is now: ' + bx)
  }

  return(
    <Container>
      <Content contentContainerStyle={{paddingTop:50,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        <List>
          <ListItem>
            <Text>Update Coins</Text>
            <Switch value={coinSetting} 
              onValueChange={() => toggleIt(coinSetting, setCoinSetting, 'coinUpdate')}/>
          </ListItem>
          <ListItem>
            <Text>Swap Updates</Text>
            <Switch value={swapSetting}
              onValueChange={() => toggleIt(swapSetting, setSwapSetting, 'swapUpdate')}/>
          </ListItem>
          <ListItem>
            <Text>Tournament Updates</Text>
            <Switch value={tournamentSetting}
              onValueChange={() => toggleIt(tournamentSetting, setTournamentSetting, 'tournamentUpdate')} />
          </ListItem>
        </List>
      </Content>  
    </Container>
  )
}