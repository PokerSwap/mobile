import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../../Store/appContext'
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Button, Text, Toast, List, ListItem, Switch } from 'native-base';

import darkStyle from '../../Themes/dark.js'
import lightStyle from '../../Themes/light.js'

export default ConfigureNotifications = () => {
  const { store, actions } = useContext(Context)
  const navigation = useNavigation()

  const [buyinSetting, setBuyinSetting] = useState(store.myProfile.buyin_update)
  const [swapSetting, setSwapSetting] = useState(store.myProfile.swap_update)
  const [eventSetting, setEventSetting] = useState(store.myProfile.event_update)
  const [chatSetting, setChatSetting] = useState(store.myProfile.chat_update)
  var currentStyle
  store.uiMode ? currentStyle = lightStyle : currentStyle = darkStyle
  
  const toggleIt = async( oldValue, onPage, attribute ) => {
    onPage(!oldValue)
    var e = await actions.profile.changeNotificationSetting(attribute)
  }

  return(
    <Container>
      <Content contentContainerStyle={{paddingTop:50, backgroundColor:currentStyle.background.color,
        justifyContent:'flex-start', alignItems:'center', flex:1, flexDirection:'column'}}>
        <List>
          <ListItem>
            <Text style={{color:currentStyle.text.color}}>Update Coins</Text>
            <Switch value={buyinSetting} 
              onValueChange={() => toggleIt(buyinSetting, setBuyinSetting, 'buyin')}/>
          </ListItem>
          <ListItem>
            <Text style={{color:currentStyle.text.color}}>Swap Updates</Text>
            <Switch value={swapSetting}
              onValueChange={() => toggleIt(swapSetting, setSwapSetting, 'swap')}/>
          </ListItem>
          <ListItem>
            <Text style={{color:currentStyle.text.color}}>Tournament Updates</Text>
            <Switch value={eventSetting}
              onValueChange={() => toggleIt(eventSetting, setEventSetting, 'event')} />
          </ListItem>
          <ListItem>
            <Text style={{color:currentStyle.text.color}}>Tournament Updates</Text>
            <Switch value={chatSetting}
              onValueChange={() => toggleIt(chatSetting, setChatSetting, 'chat')} />
          </ListItem>
        </List>
      </Content>  
    </Container>
  )
}