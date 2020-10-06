// // @flow
// import React, { useState, useEffect } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

// import Fire from './Fire';
// import { useRoute, useNavigation } from '@react-navigation/native';


// export default ChatScreen = () => {

//   const [messages, setMessages] = useState([])
// 	const navigation = useNavigation()
// 	const route = useRoute()
// 	const name = 'pauk'

// 	useEffect(() => {
// 		Fire.shared.on(message =>
//       setMessages(previousState => (GiftedChat.append(previousState.messages, message)),
//       )
// 		);
// 		console.log("messages", messages)
// 		console.log("user", user)

// 		return () => {
// 			Fire.shared.off();
// 		}
// 	}, [false])

//   let user = {
// 		name: name,
// 		_id: Fire.shared.uid,
// 	};



  
// 	return (
// 		<GiftedChat
// 			messages={messages}
// 			onSend={Fire.shared.send}
// 			user={user} />
// 	)
// }



import React, { useState, useCallback, useEffect } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import OtherHeader from '../../View-Components/OtherHeader';
import Fire from './Fire';
 
export default ChatScreen = (props) => {
  const [messages, setMessages] = useState([{
    _id: 1, // Message Id
    text: 'Hello developer', // Actual test
    createdAt: new Date(), //Fine
    user: {
      _id: 2, // Fire store ID
      name: 'React Native', // Profile Name their_Profile.name
      avatar: 'https://placeimg.com/140/140/any', // Profile Pic theirProifle.pic
    },
  }]);


  useEffect(() => {
    Fire.shared.on(message => 
      setMessages(previousState => GiftedChat.append(previousState.messages, message))
    );
    Fire.shared.on(message => console.log('message in store',message))
    console.log('messahes', messages)

    // setMessages([
    //   {
    //     _id: 1, // Message Id
    //     text: 'Hello developer', // Actual test
    //     createdAt: new Date(), //Fine
    //     user: {
    //       _id: 2, // Fire store ID
    //       name: 'React Native', // Profile Name their_Profile.name
    //       avatar: 'https://placeimg.com/140/140/any', // Profile Pic theirProifle.pic
    //     },
    //   },
    // ])
    return () => {
      Fire.shared.off();
    }
  }, [true])

 
  const onSend = useCallback((messages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <View style={{flex:1}}>
      <OtherHeader title={'Chat'}/>

      <GiftedChat
        messages={messages}
        // onSend={messages => onSend(messages)}
        onSend={() => {
          Fire.shared.send
          console.log('ummm', Fire.shared.send)
        }}
        user={{
          _id: Fire.shared.uid,
          name:"Gabe",
          avatar:'https://i.gadgets360cdn.com/large/Gabe_Newell_1484763796244.jpg', 
           }} />
    </View>
    
  )
}