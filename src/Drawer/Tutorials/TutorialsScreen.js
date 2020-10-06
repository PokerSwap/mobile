import React, { useContext, useState } from 'react';
import { Container, Header } from 'native-base'
import CheckYourResultsScreen from './CheckYourResults'
import HowToSwapScreen from './HowToSwap'
import EnterATournamentScreen from './EnterATournament'
import ProfileTutorialScreen from './ProfileTutorial'



import { useNavigation, useRoute } from '@react-navigation/native'


export default TutorialsScreen = (props) => {
  const navigation = useNavigation()
  const route = useRoute()
  const {tutorial} = route.params

  var currentTutorial


  
  return(
    <Container>
      {currentTutorial}
    </Container>
  )
}