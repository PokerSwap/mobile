
import { Alert, Platform } from 'react-native'
import { Toast } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { CommonActions } from '@react-navigation/native';
import moment from 'moment-timezone'

import firebase from 'firebase'; // 4.8.1
var databaseURL

// Platform.OS == 'ios' ?
// 	databaseURL = 'http://gabriels-imac.local:3000/' : databaseURL = 'http://10.0.2.2:3000/'


databaseURL = 'https://swapprofit-beta.herokuapp.com/'


var errorMessage = (error) => {
	Toast.show({
		text:error, 
		duration:3000, 
		position:'bottom',
		style:{bottom: "20%",backgroundColor:'red'}
	})
}

var customMessage = (custom) => {
	Toast.show({
		text:custom, duration:3000, position:'bottom',
		style:{bottom: "50%",backgroundColor:'green'}
	})
}

const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			// FOR CURRENT ACTION IN A TOURNAMENT
			currentAction: null,
			// CURRENT BUYIN ON SCREEN
			currentBuyin:{},
			// CURRENT CHAT
			currentChat:[],
			// CURRENT CHAT ID, USED FOR REFRESH
			currentChatID:[],
			// CURRENT PAGE, USED FOR NOTIFICATION USAGE
			currentPage:"",
			// CURRENT SWAP ON SCREEN
			currentSwap:{},
			currentLobby:[],
			currentResult:[],
			// CURRENT TOURNAMENT ON SCREEN
			currentTournament:null,
			// MY DEVICE TOKEN
			deviceToken: null,
			// REFRESH ON SWAP

			refreshOffer:false,
			refreshChat:false,
			refreshEvent:false,
			refreshResult:false,
			refreshDashboard:false,
			
			// MY CHATS
			myChats:[],
			// MY PROFILE
			myProfile:null, 
			// LIVE AND UPCOMING SWAP TRACKER
			myCurrentTrackers:[{message:'suck it'}],
			// LIVE AND UPCOMING SWAP TRACKER
			myUpcomingTrackers:[],
			// ALL PAST SWAP TRACKER
			myPastTrackers:[],
			// ALL PAST TRACKERS WITH POSTED RESULTS
			myPendingResultsTrackers:[],
			// ALL PAST TRACKERS WITH POSTED RESULTS
			myConfirmedResultsTrackers:[],
			// Users that have been naughty
			naughtyList:[],
			// FOR MOST RECENT NOTIFICATION, TO GO TO PAGE
			notificationData: {},
			// LISTS ALL RECIEVED NOTIFICATIONS
			notificationList:[],
			nowLoading:'',
	  	// OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],
	  	// ALL TOURNAMENTS, FILTERED BY FIRST 10 RESULTS
			tournamentList:[],
			// CURRENT UI MODE
			uiMode: null,
			// USED TO GET PROFILE AND ACCESS ALL REQUESTS IN THE APP
			userToken: null,
		},
		actions: {
			refresh:{
				chat: (x) => {
					setStore({refreshChat: x})
				},
				dashboard: (x) => {
					setStore({refreshDashboard: x})
				},
				offer:(x) => {
					setStore({refreshOffer: x})
				},
				event: (x) => {
					setStore({refreshEvent: x})
				},
				result:(x) => {
					setStore({refreshResult: x})
				},

			},
			// BUY IN ACTIONS
			buy_in:{
				// CREATING A BUYIN AND (RE)-BUYING-IN INTO A TOURNAMENT
				add: async ( image, a_table, a_seat, some_chips, a_tournament, a_tournament_id, navigation) => {
					try{	
						console.log('a_tournament', a_tournament)
						// console.log('flight_id', a_flight_id)
						// PREVENTS EMPTY PICTURE SUBMISSION
						if (image == 3){
							return customMessage('You need to select an image of your buyin ticket')
						}
						// PREVENTS EMPTY FIELDS
						if (a_table == '' || a_seat == '' || some_chips == ''){
							return customMessage('You need to fill in all the fields listed')

						}

						if (some_chips == 0){
							return customMessage('You can not enter with zero chips')

						}
						// BUYIN DATA SETUP
						var newBuyin
						let accessToken = getStore().userToken
						const imageURL = databaseURL + 'me/buy_ins/flight/'+ a_tournament.id +'/image'	
						console.log('eeee', imageURL)
	
						const imageData = new FormData();
						imageData.append("image", {
								uri: image.uri,
								type: image.type,
								name: image.name
						});
						console.log('imageData', image.uri, image.type, image.name)
						let response = await fetch(imageURL, {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: imageData,
						})
						.then(response => response.json())
						.then((responseJson) => {
							console.log('responseJson',responseJson)
								newBuyin = responseJson;
								console.log('newBuyined',newBuyin)
						})
						.catch((error) => {
							console.log('error in json of image',error);
							
						});
						// console.log('newBuyin', response.json())

						// PREVENTS WRONG PICTURE UPLOADED
						if (newBuyin.message && newBuyin.message == 'Take another photo'){
							// var eee = await getActions().buy_in.delete(newBuyin.buyin_id)
							console.log('lol', newBuyin)
							return errorMessage(newBuyin.message)
						}else{null}
						console.log('newBuyin',newBuyin)
						// if(a_tournament_id !== 882){
						// 	null
						// }else{
						// 	if (newBuyin.receipt_data.table !== a_table || newBuyin.receipt_data.seat !== a_seat){
						// 		var eee = await getActions().buy_in.delete(newBuyin.buyin_id)
						// 		return errorMessage("One of the fields is not correct")
						// 	}else{null}
	
						// 	if(newBuyin.receipt_data.casino.includes(a_casino)){
						// 		console.log('go ahead')
						// 	}else{
						// 		console.log('Stop')
						// 	}
	
						// 	if(newBuyin.ocr_data.includes('Tournament Date:')){
						// 		var x = newBuyin.ocr_data.indexOf('Tournament Date:')
						// 		var a = x+17, b = x +27, c=x -9, d=x-1 ;
						// 		var alls = newBuyin.ocr_data.substring(a,b) +' '+ newBuyin.ocr_data.substring(c,d) + 'GMT'
						// 		var x = new Date(alls)
						// 		var y = new Date(a_tournament_start)
						// 		console.log('x',x)
						// 		console.log('y',y)
	
								
						// 	}else{
						// 		console.log('not c')
						// 	}
	
						// 	if(newBuyin.validation.first_name.valid && newBuyin.validation.last_name.valid){
						// 		console.log("All is valid")
						// 	}else{
						// 		return(console.log("Not All is valid"))
						// 	}
						// }

						
			 
						// if(newBuyin.ocr_data.includes('Name:')){
							// var aw = newBuyin.ocr_data.indexOf('Name:') + 5
							// var bw = newBuyin.ocr_data.indexOf('\nPlayer') 
							// var cw = newBuyin.ocr_data.substring(aw, bw)
							// console.log('cw',cw)
							// var firstName = getStore().myProfile.first_name 
							// var lastName = getStore().myProfile.last_name
							// var nickName

							
							// if (getStore().myProfile.nickname){
							// 	nickName= cw.includes(getStore().myProfile.nickname)
							// } else{ nickname = false}
							// if ( nickName || cw.includes(firstName) || cw.includes(lastName)){
							// 	return(console.log('it matcges', fullName, nickName))
							// }else{
							// 	return(console.log('it doesnt matcges', fullName, nickName))
							// }
						// }else{
						// 	return(console.log('no cw'))
						// }


						// if (!newBuyin.receipt_data.player_name.includes(store.myProfile.username) ){
						// 	return errorMessage("The name in the buyin is the not the same as your profile")
						// }else{null}

						// VALIDATING BUYIN (DONE ONCE)
						var validatingBuyin = await getActions().buy_in.edit(newBuyin.buyin_id, a_table, a_seat, some_chips, a_tournament.tournament_id, true)
						console.log("CHECK THIS BITCH ASS",a_tournament)
						var enteringTournament = await navigation.push('Event Lobby', {
							tournament: a_tournament,
							tournament_id: a_tournament_id
						})
						getActions().refresh.dashboard(true)
						getActions().refresh.dashboard(false)

						

					} catch(error) {
						console.log("Some went wrong in adding a buyin", error)
						return errorMessage(error.message)
					}
				},
				// YOUR BUYIN HAS BUSTED (REACHED 0 COINS)
				busted: async ( a_buyin_id, a_place, some_cash, a_tournament_id ) => {
					try{
						let url = databaseURL + 'buy_ins/' + a_buyin_id
						let accessToken = getStore().userToken
						let data = {
							place: parseInt(a_place),
							winnings: some_cash.toString()
						}
	
						let response = await fetch(url, {
							method: 'PUT',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var bustedBuyinResponse = await response.json()
						console.log("Busted Buyin Response:", bustedBuyinResponse)


						var gettingTournament = await getActions().tournament.getCurrent(a_tournament_id)
						console.log('current Tournament buyins', getStore().currentTournament.buyins)				
						
						// CLOSING ALL UNCONFIRMED SWAPS PROCESS
						var swapsToClose = []
						
						var checkOtherSwaps = getStore().currentTournament.buyins.forEach(buyin => 
							buyin.other_swaps.forEach(swap => swapsToClose.push({...swap, buyinID: buyin.recipient_buyin.id})))
						console.log('Current Unconfirmed Swaps:', swapsToClose)						
						
						var closingAllSwaps = swapsToClose.forEach( swap => {
							if( swap.status == 'pending' ){
								getActions().swap.statusChange( swap.tournament_id, swap.id, swap.buyinID, 'pending', "canceled")
								getActions().swapToken.buy(1)
							}else if(swap.status == 'incoming'){
								getActions().swap.statusChange( swap.tournament_id, swap.id, swap.buyinID, 'incoming', "rejected" )
							}else if( swap.status == 'counter_incoming' ){
								getActions().swap.statusChange( swap.tournament_id, swap.id, swap.buyinID, 'counter_incoming', "rejected" )
								getActions().swapToken.buy(1)
							}else{
								null
							}
						})
						// REFRESH APP INFO
						var refreshingTracker = await getActions().tracker.getCurrent()
						var refreshingTracker2 = await getActions().tracker.getUpcoming()

						var refreshingProfile = await getActions().tournament.getInitial()
						var refreshingProfile = await getActions().profile.get()
						
						return( customMessage('All unconfirmed swaps have been closed and your tokens returned'))
					}catch(error){
						console.log('Something went wrong with busting my buyin', error)
					}
				},
				delete: async ( a_buyin_id ) => {
					const accessToken = getStore().userToken
					var url = databaseURL + 'buy_ins/' + a_buyin_id 


					let response = await fetch(url, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + accessToken,
						}
					})
					var weeee = await response.json()

					console.log('incorrect buyin deleted:', weeee)
				},
				// EDITING YOUR BUYIN
				edit: async ( a_buyin_id, a_table, a_seat, some_chips, a_tournament_id, special) => {
					try{
						const accessToken = getStore().userToken
						let url
						special == true ?
							url = databaseURL + 'me/buy_ins/' + a_buyin_id  + '?validate=true'
							: url = databaseURL + 'me/buy_ins/' + a_buyin_id  

						let data= {
							table: a_table.toString(),
							seat: parseInt(a_seat),
							chips: parseInt(some_chips),
						}
						console.log('special', special)

						console.log('data', data)

						let response = await fetch(url, {
							method: 'PUT',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: JSON.stringify(data),
						})
						.then(response => response.json())
						.then((responseJson) => {
							console.log('edited buy_in', responseJson.buy_in.id)
						})
						.catch((error) => {
							console.log('error in json of edit buyin',error);
						});

						var refreshTrackers = await getActions().tracker.getCurrent()
						var refreshingTracker2 = await getActions().tracker.getUpcoming()

						var refreshTournaments = await getActions().tournament.getInitial()
						var refreshAction = await getActions().tournament.getAction(a_tournament_id)
						var refreshBuyin = await getActions().tournament.getCurrent(a_tournament_id)
						// var refreshSwap = await getActions().buy_in.getCurrent(a_buyin_id)
						return customMessage('Your status has been updated.')

					}catch(error){
						console.log('Something went wrong with editing a buyin', error)
					}
				},
				// RETRIEVING INFORMATION OF BUYIN YOU'RE VIEWING
				getCurrent: async ( a_buyin_id ) => {
					try{
						var url = databaseURL + 'buy_ins/' + a_buyin_id
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						})
						var theBuyin = await response.json()	
						// console.log('theBuyin', theBuyin)					
						setStore({currentBuyin: theBuyin})
					}catch(error){
						console.log('problem with getting the current buyin:', error)
					}
				},
			},
			// CHAT ACTIONS
			chat:{
				wipe: async() => {
					setStore({currentChat:[]})
					setStore({currentChatID:[]})
				},
				getCurrent: async ( a_chat_id ) => {
					try {
						setStore({ currentChatID: a_chat_id})
						let url = databaseURL + 'chats/' + a_chat_id
						let accessToken = getStore().userToken

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var currentChatResponse = await response.json()
						// console.log("Current Chat Response:", currentChatResponse)
						// {
						// 	_id: 1, #message id
						// 	text: 'Hello developer',
						// 	createdAt: new Date(), #message time
						// 	user: {
						// 		_id: 2, #user id
						// 		name: nickname,
						// 		avatar: a_avatar,
						// 	},
						

						var xx = await getActions().profile.retrieve(currentChatResponse.user1_id)
						var yy = await getActions().profile.retrieve(currentChatResponse.user2_id)
						

						
						var newChatData = currentChatResponse.messages.map(message => {
							var whoDis
							var thisMe
							if (message.user_id == xx.id){
								whoDis = xx.profile_pic_url
								thisMe = xx.first_name
							}else{
								whoDis = yy.profile_pic_url
								thisMe= yy.first_name
							}
							
							return(
								{
									_id: message.id,
									text:message.message,
									createdAt:message.created_at,
									user:{
										_id: message.user_id,
										name: thisMe,
										avatar: whoDis
									}
								}
							)
						})
						newChatData.sort((a,b) => {
							return new Date(b.createdAt) - new Date(a.createdAt);
						})
						//console.log('newChatData', newChatData)

						setStore({currentChat:newChatData})
						// console.log('Chat In Store:', newChatData)

					} catch (error) {
						console.log("Getting current chat with this user did not work:", error)
					}
				},
				getMine: async () => {
					try {
						let url = databaseURL + 'me/chats'
						let accessToken = getStore().userToken

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var AllChatsResponse = await response.json()

						var getIds = AllChatsResponse.map(chat => {
							if(chat.user2_id !== getStore().myProfile.id){
								return chat.user2_id
							
							}else{return chat.user1_id}
						})
						// console.log('dddds', getIds)
						const asyncRes = await Promise.all(getIds.map(async (i) => {
							 var e = await getActions().profile.retrieve(i);
							return e;
						}));

						var getTimes = AllChatsResponse.map(chat => moment(chat.updated_at).fromNow())

						const asyncRex = await Promise.all(getTimes.map(async (i) => {
							 var e = await getActions().time.convertShort(i);
							return e;
						}));
						
						var newChatData = AllChatsResponse.map((chat, index)=> {						
							return({
								...chat,
								chat_user:asyncRes[index],
								since: asyncRex[index]
							})
						})




						setStore({myChats: newChatData})

					} catch (error) {
						console.log("Something went wrong in getting all of your chats", error)
					}
				},
				retrieve: async( a_user2 ) => {
					try {
						let url = databaseURL + 'chats/me/users/' + a_user2
						let accessToken = getStore().userToken

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var currentChatResponse = await response.json()
						// console.log('check',currentChatResponse)
						if (currentChatResponse.messages){
							return currentChatResponse.id
						}else{
							return false
						}
					} catch (error) {
						console.log('2id', a_user2)
						console.log('Simething went wrong with retrieving cgat', error)
					}
				},
				open: async( their_id, a_message ) => {
					try {
						let url = databaseURL + 'me/chats'
						let accessToken = getStore().userToken

						let data = {
							user1_id: getStore().myProfile.id,
							user2_id: their_id,
							message: a_message
						}

						let response = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var openChatResponse = await response.json()
						//console.log("Open Chat Response:", openChatResponse)
						setStore({currentChatID:openChatResponse.id})

						var ert = await getActions().chat.getCurrent(getStore().currentChatID)
						var xee = await getActions().refresh.chat(true)
						var eeewe = await getActions().chat.getMine()

						return getStore().currentChatID
					} catch (error) {
						console.log('eeee', a_message, their_id)
						console.log("Opening a chat with user did not work:", error)
					}
				},
				sendMessage: async( a_chat_id, their_user_id, a_message ) => {
					try {
						let url = databaseURL + 'messages/me/chats/' + a_chat_id
						let accessToken = getStore().userToken
						console.log('message', a_message)
						let data = {
							user_id: getStore().myProfile.id, 
							message: a_message,
							their_id: their_user_id
						}

						let response = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var sendMessageResponse = await response.json()
						//console.log("Send Message Response:", sendMessageResponse)
						console.log('message sent', sendMessageResponse.messages[sendMessageResponse.messages.length - 1].message)
					} catch (error) {
						console.log("Sending a message to this user did not work:", error)
					}
				}
			},
			// USER DEVICE TOKEN ACTIONS
			deviceToken:{

				get: async( aDeviceToken ) => {
					try {
						if (aDeviceToken){
							setStore({deviceToken: aDeviceToken})
							// console.log('Current Device Token', getStore().deviceToken)
						} else{
							getActions().deviceToken.retrieve(getStore().myProfile.id)
						}										
					} catch (error) {
						console.log('Something went wrong with getting device token', error)
					}
				},

				remove: async() => {
					try {
						const accessToken = getStore().userToken;
						const url = databaseURL + 'users/me/devices' 

						const data = {device_token: getStore().deviceToken}
						console.log('Device Token Being removed: ', data)

						let response = await fetch(url, {
							method:'DELETE',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							},
							body:JSON.stringify(data)
						})
						.then(response => response.json())
						var removingDeviceToken = await AsyncStorage.removeItem('deviceToken')
						setStore({deviceToken: null})

					}catch(error){
						console.log('Something went wrong with removing device token', error)
					}
				},

				retrieve: async( user_id ) => {
					try{
						var url =  databaseURL + 'users/' + user_id + '/devices'
						var accessToken = getStore().userToken
						
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var answer = await response.json()
						setStore({deviceToken: aDeviceToken})
						var removingDeviceToken = await AsyncStorage.setItem('deviceToken', aDeviceToken)

					}catch(error){
						console.log('error in retrieiving deviceToken', error)
					}
				},
			},
			// USED FOR CHAT NETWORK
			firebase:{
				login: async ( data ) => {
					try {
						var wwd = await firebase
						.auth()
						.signInWithEmailAndPassword(data.email, data.password)
						// .then(() => console.log("firebase login success", firebase.auth().currentUser))
					} catch (error) {
						console.log('error on firebase login', error)
					}
				},
				logout: async (  ) => {
					try {
						 var e = await firebase
							.auth()
							.signOut()
							.then(() => console.log("firebase login success"))
					} catch (error) {
						console.log('error', error)
					}
				},
				
				signup: async ( email, password, name, username ) => {
					var signingUpWithFirebase =  await firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(() => console.log('created user successfully. User email:' + email + ' name:' + name ))
						.then(() =>	{ 
							var userf = firebase.auth().currentUser;
							var x
							if (username.length !== 0){x = username}else{x = name}
							userf.updateProfile({ displayName: x })
							console.log('Updated displayName successfully. name:' + x)
						} )
						.catch( error => console.error('got error in signup firebase:' + typeof error + ' string:' + error.message))
				},
						
				updateAvatar: async ( url ) => {
					try {
						var userf = firebase.auth().currentUser;
						console.log('userf',userf)
						if (userf != null) {
							try {
								userf.updateProfile({ photoURL: url })
								console.log('Updated avatar successfully. url:' + url)
							} catch (error) {
								console.log("Error:", error.message) }
						} else {
							console.log("can't update avatar, user is not login.");
						}
					} catch (error) {
						console.log('error in update avater', error)
					}
				}
			},
			// SWAP TOKEN ACTIONS
			swapToken:{

				buy: async ( some_tokens ) => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + 'me/transactions'

						let data = {
							coins: some_tokens
						}

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json)
						.then(() => getActions().profile.get())
						
						return response

					}catch(error){
						console.log('Something went wrong with buying tokens', error)
					}
				},

				return: async ( ) => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + 'me/transactions'

						let data = {
							coins: 1
						}

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json)

					}catch(error){
						console.log('Something went wrong with buying tokens', error)
					}
				},
				
				spend: async() => {
					
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + 'me/transactions'

						let data = {
							coins: -1
						}

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json())
						console.log('respond', response)
						var x = await getActions().profile.get()

					}catch(error){
						console.log('Something went wrong with spending tokens', error)
					}
				}
			},
			// NAVIGATION ACTIONS
			navigate:{
				toChat: async(data, navigation) => {
					try {
						// NAVIGATION ACTION
						var ecd = await getActions().profile.retrieve(data.sender)
						var answerParams = {
							a_avatar: ecd.profile_pic_url,
							nickname: ecd.first_name,
							their_id: ecd.id,
							chat_id: data.id
						}

						var navigateAction = CommonActions.navigate({
							name: data.finalPath,
							params: answerParams
						});

						setStore({notificationData:null})

						try{
							navigation.push("Chat",answerParams);
							console.log('dispatch succesgul')
						} catch(error){
							console.log('Cant navigate to event', error)
							navigation.navigate('Contacts');
						}
					} catch (error) {
						console.log("Something went wrong with going to chat", error)
					}
				},
				// NAVIGATING TO EVENT AFTER NOTIFICATION
				toEvent: async(data, navigation) => {
					try {
						// GETTING TOURNAMENT JSON
						var gettingTournament = await getActions().tournament.getCurrent(data.id);
						var currentTournament = await getStore().currentTournament
						var answerParams = {
							tournament: currentTournament.tournament,
							// tournament_name: currentTournament.tournament.name,
							tournament_id: currentTournament.tournament.id,
							// tournament_start: currentTournament.tournament.start_at,
							// flight_id: currentTournament.my_buyin.flight_id,
						}
						console.log('Notification Event Parameters: ', answerParams)

						// PREVENTS ENTERING CLOSED TOURNAMENT
						if (currentTournament.tournament.tournament_status !== 'open'){
							setStore({notificationData:null})
							var e = await navigation.navigate('Active Swaps')
							return errorMessage('This event is not open')
						}

						// NAVIGATION ACTION
						var navigateAction = CommonActions.navigate({
							name: data.finalPath,
							params: answerParams
						});

						setStore({notificationData:null})

						try{
							navigation.dispatch(navigateAction);
							console.log('dispatch succesgul')
						} catch(error){
							console.log('Cant navigate to event', error)
							navigation.navigate('Active Swaps');
						}
					}catch(error){
						console.log("Something went wrong with navigating to event:", error)
						setStore({notificationData:null})
						navigation.navigate('Active Swaps')
					}
				},
				// NAVIGATING TO SWAP AFTER NOTIFICATION
				toSwap: async( data, navigation ) => {
					try {
						// GETTING SWAP JSON
						console.log('New Swap Notification Data:', data)
						var gettingBuyin = await getActions().buy_in.getCurrent(data.buyin_id)
						var gettingSwap = await getActions().swap.getCurrent(data.id)
						var gettingTournament = await getActions().tournament.getCurrent(getStore().currentSwap.tournament_id)

						// if (getStore().currentTournament.tournament.tournament_status !== 'open'){
						// 	setStore({notificationData:null})
						// 	navigation.navigate('SwapDashboard')
						// 	return errorMessage('This event is not open')
						// }
						// GETS MOST CURRENT BUYIN OF OTHER USER
						var theirBuyin

						var settingCurrentBuyin = getStore().currentTournament.tournament.buy_ins.forEach(buyin => {
							if(buyin.user_id == getStore().currentBuyin.id){
								theirBuyin = buyin
								setStore({currentBuyin: theirBuyin})
							}
						})
						// PREVENTS SWAP IF OTHER USER HAS 0 CHIPS
						if(getStore().currentBuyin.chips == 0){
							navigation.navigate('Active Swaps')
							setStore({notificationData:null})
							console.log("The user you're trying to was busted out")
							return errorMessage("This user has busted out")
						}
						// PREVENTS SWAP IF I HAVE NO CHIPS
						if(getStore().currentTournament.my_buyin.chips == 0){
							navigation.navigate('Active Swaps')
							setStore({notificationData:null})
							console.log("You cannot swap while busted out")
							return errorMessage('You cannot swap while busted out')
						}
						// SWAP TIME CONVERSION
						var labelTime = await getActions().time.convertLong(getStore().currentSwap.updated_at)
						
						setStore({notificationData:null})

						// NAVIGATION SETUP
						var answerParams = {
							status: getStore().currentSwap.status,
							swap: getStore().currentSwap,
							swapID: getStore().currentSwap.id,
							buyin: getStore().currentBuyin,
							updated_at: labelTime,
							tournament: getStore().currentTournament.tournament
						}

						var navigateAction = CommonActions.navigate({
							name: 'Swap Offer',
							params:  answerParams 
						});

						// NAVIGATION ACTION
						try{
							setStore({currentSwap: answerParams.swap})
							navigation.dispatch(navigateAction);
						} catch(error){
							console.log('cant navigate', error)
						}

						var refreshingCurrentTrackers = await getActions().tracker.getCurrent()
						var refreshingUpcomingTrackers = await getActions().tracker.getUpcoming()

					}catch(error){
						console.log("Something went wrong with navigating to swap:", error)
					}
					setStore({notificationData:null})
				},
				toResult: async ( data, navigation ) => {
					try {
						var currentTournament = await getActions().tracker.getPastSpecific(data.id)
						console.log('currentTournament', currentTournament)
						// var answerParams = {
						// 	tournament: currentTournament[0].tournament,
						// 	my_buyin: currentTournament[0].my_buyin,
						// 	buyins: currentTournament[0].buyins,
						// 	final_profit: currentTournament[0].final_profit,
						// 	tournament_end: currentTournament[0].tournament_end
						// }
						// console.log('Buyin Parameter: ', answerParams.buyins)

						

						// NAVIGATION ACTION
						navigation.push(data.finalPath,{
							tournament: currentTournament.tournament,
							my_buyin: currentTournament.my_buyin,
							buyins: currentTournament.buyins,
							final_profit: currentTournament.final_profit,
							results_link: currentTournament.tournament.results_link,
							tournament_end: currentTournament.tournament_end
						});

						setStore({notificationData:null})

						// try{
						// 	navigation.dispatch(navigateAction);
						// 	console.log('dispatch succesgul')
						// } catch(error){
						// 	console.log('Cant navigate to event results', error)
						// 	navigation.navigate('Event Results');
						// }

					} catch (error) {
						console.log("Something went wrong with navigating to event:", error)
						setStore({notificationData:null})
						navigation.navigate('Event Results')
					}
				},
				toBuyin: async ( data, navigation ) => {
					try {
						console.log('New Buyin Notification Data:', data)

					} catch (error) {
						
					}
				},
				currentPage: async( name ) => {
					try {
						setStore({currentPage: name})
						// console.log('currentPage is ', getStore().currentPage)
					} catch (error) {
						console.log("Something went wrong with getting page name", error)
					}
				}
			},
			// PUSH NOTIFICATION ACTIONS
			notification:{
				// CHECKING FOR NOTIFICATION JSON ON AUTO-LOGIN
				check: async( notification, navigation ) => {
					try {
						console.log('Notification in Store:', getStore().notificationData.id)
						console.log('Notification Coming In', notification.id)

						if(getStore().notificationData.id){
							null
						}else{
							setStore({notificationData: notification })
						}

						console.log('Notification in Store Now:', getStore().notificationData)


						// NEW NOTIFICATION RECIEVED
						if(getStore().notificationData.id){
							var type = getStore().notificationData.type
							if (type == 'event'){
								var startGoToEvent = await getActions().navigate.toEvent(getStore().notificationData, navigation)
							} else if(type == 'swap'){
								var startGoToSwap = await getActions().navigate.toSwap(getStore().notificationData, navigation)
							} else{
								console.log('No Notification Recieved or Error: ')
								setStore({notificationData:null})
								navigation.navigate('Active Swaps')		

							}
						}
						// NO NEW NOTIFICATION RECIEVED
						else{
							setStore({notificationData:{}})
							navigation.navigate('Active Swaps')		
						}
					} catch(error) {
						console.log('Something went wrong checking notification data', error)
						setStore({notificationData:null})
						navigation.navigate('Active Swaps')
					}
				},

				store: async(notification) => {
					setStore({notificationData: notification})
				}
				
			},
			// PROFILE ACTIONS
			profile:{
				// AFTER COMPLETING SIGN UP, CREATES PROFILE
				add: async ( a_nickname, firstName, lastName, a_hendon_url, a_Picture, navigation ) => {
					const accessToken = getStore().userToken;
					const url = databaseURL + 'profiles'
					const a_devicetoken = getStore().deviceToken
					let data = {
						nickname: a_nickname,
						first_name: firstName,
						last_name: lastName,
						hendon_url: a_hendon_url,
						device_token: a_devicetoken
					}

					var full_name = firstName + ' ' + lastName
					var an_user = await AsyncStorage.getItem('loginInfo')
					var uuser = JSON.parse(an_user)

					let response = await fetch(url, {
						method:'POST',
						body: JSON.stringify(data),
						headers: {
							'Authorization': 'Bearer ' + accessToken,
							'Content-Type':'application/json'
						}, 
					})
					var addedProfile = await response.json()
					console.log('Added Profile response', addedProfile)

					return new Promise(resolve =>
						resolve(getActions().profile.uploadPhoto(a_Picture)
						.then(() => getActions().profile.get())
						// .then(() => getActions().firebase.signup(uuser.email, uuser.password, full_name, a_nickname))
						// .then(() => getActions().firebase.login(uuser))
						// .then(() => getActions().firebase.updateAvatar(getStore().myProfile.profile_pic_url))
						.then(() => navigation.navigate('Drawer', { screen: 'Categories' }))
						.catch((error) => console.log(error))
						))
				},
				// USED ON LOGIN, BUY AND SPEND TOKEN
				get: async () => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + 'profiles/me';

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let profileData = await response.json()
						// console.log('Profile data', profileData)
						profileData !== 'User not found' ?	
							getActions().profile.store(profileData)
							:
							console.log('this means you couldnt store your profile')
						
						// console.log('profileData', profileData)
						return profileData

					} catch(error){
						console.log('Something went wrong in getting profile', error)
						setStore({myProfile:'Error'})
					}
				},
				// ON LOG OUT, REMOVES PROFILE FROM ASYNCSTORAGE AND STORE
				remove: async () => {
					try {
						setStore({myProfile: null})
					} catch(error) {
						console.log('Something went wrong in removing userToken', error)
					}
				},
				retrieve: async (id) => {
					try {
						const accessToken = getStore().userToken;
						const url = databaseURL + 'profiles/' + id;

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let profileData = await response.json()
						return profileData
					} catch (error) {
						console.log("something went wrong in retrieving file")
					}
				},
				// WHILE LOGGED IN, STORES PROFILE DATA IN STORE
				store: async( profileData ) => {
					try {
						setStore({ myProfile: profileData })
					} catch (error) {
						console.log('Something went wrong in storing profile', error)
					}
		        },
		        // CHANGE NICKNAME
		        changeNickName: async( a_nickname, navigation ) => {
		          try{
		            const url = databaseURL + 'profiles/me'
								const accessToken = getStore().userToken;
		            var data = {
		              nickname: a_nickname
		            }

		            let response = await fetch(url,{
						method:"PUT",
						body: JSON.stringify(data),
						headers:{
							'Authorization': 'Bearer ' + accessToken,
							'Content-Type':'application/json'
						}
					})
					.then(response => response.json())
					.then(() => getActions().profile.get())
					.then(() => navigation.goBack())
					return customMessage('Your nickname change was successful')   

		          }catch(error) {
		            console.log('Something went wrong with changing nickname:', error)
		          }
				},
				changeNotificationSetting: async ( type ) => {
					try {
						const url = databaseURL + 'me/notification/setting/update'
						const accessToken = getStore().userToken;
			            var data = {
			              notification_type: type
			            }

			            let response = await fetch(url,{
										method:"PUT",
										body: JSON.stringify(data),
										headers:{
											'Authorization': 'Bearer ' + accessToken,
											'Content-Type':'application/json'
										}
									})
									.then(response => response.json())
									.then(() => getActions().profile.get())

								} catch (error) {
									console.log("error: soemthign went worng with changing notifiaction setting", error)
								}
							},
				// UPLOAD FIRST PROFILE PHOTO
				uploadPhoto: async ( image ) => {
					try {
						console.log('image', image.uri, image.type)
						const url = databaseURL + 'profiles/image'
						const accessToken = getStore().userToken;
						const imageData = new FormData();

						imageData.append("image", {
							uri: image.uri,
							type: image.type,
							name: "example.jpg"
						});

						console.log("Image's Data:", imageData)

						var xee = await fetch(url, {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: imageData,
						})
						.then(response => response.json())
						.then((responseJson) => {
							console.log('Upload Photo Response:',responseJson);
							// return responseJson;
						})
						.then(()=> getActions().profile.get())
						.catch((error) => {
							console.log('error in json of profile pic',error);
						});
					} catch(error) {
						return errorMessage(error.message)
					}
				},
				// CHANGE PROFILE PHOTO
				changePhoto: async ( image, navigation ) => {
					try {
						const url = databaseURL + 'profiles/image'
						const accessToken = getStore().userToken;
						const imageData = new FormData();

						imageData.append("image", {
							uri: image.uri,
							type: image.type,
							name: "example"
						});

						// console.log("Image's Data:", imageData)

						var xee = await fetch(url, {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: imageData,
						})
						.then(response => response.json())
						.then((responseJson) => {
							console.log('responseJson',responseJson);
							// return responseJson;
						})
						.then(()=> getActions().profile.get())
						.then(() => navigation.goBack())
						.catch((error) => {
							console.log('error in json of profile pic',error);
						});
					} catch(error) {
						return errorMessage(error.message)
					}
				},
				// STORED IN STORE FOR USER PROFILE YOUR CURRENTLY VIEWING
				view: async( a_user_id ) => {
					
					try {
						const accessToken = getStore().userToken;
						const url = databaseURL + 'profiles/'+ a_user_id

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let profileInfo = await response.json()
						setStore({profileView: profileInfo})
						
					} catch (error) {
						console.log("Something went wrong with viewing a profile", error)
					}
					
				}
			},
			// SWAP ACTIONS
			swap: {
				// STARTING INACTIVE SWAP WITH ANOTHER USER
				add: async ( a_tournament_id, a_recipient_id, a_buyin_id,  a_percentage, a_counter_percentage ) => {
					try{
						const url = databaseURL + 'me/swaps'
						let accessToken = getStore().userToken
						let data

						a_counter_percentage ?
							data = {
								tournament_id: a_tournament_id,
								recipient_id: a_recipient_id,
								percentage: a_percentage,
								counter_percentage: a_counter_percentage
							}
							:
							data = {
								tournament_id: a_tournament_id,
								recipient_id: a_recipient_id,
								percentage: a_percentage
							}

						// console.log('data', data)

						let response = await fetch(url,{
							method:"POST",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						
						console.log('Swap Creation Response: ', response)
						if(response.message && response.message.includes("Swap percentage too large.")){
							return errorMessage(response.message)}

						if(response.message && response.message.includes("Swap percentage too large for recipient.")){
							return errorMessage(response.message)}
						
						// var spendToken = await getActions().swapToken.spend()
						var refreshingTournament = await getActions().tournament.getCurrent(a_tournament_id)
						var refreshingTracker = await getActions().tracker.getCurrent()
						var refreshingTracker2 = await getActions().tracker.getUpcoming()

						var refreshingSwap = await getActions().swap.getCurrent(response.swap_id)
						// var refreshingBuyin = await getActions().buy_in.getCurrent(response.swap_id)

						console.log('\n1. After creating a swap, this is the response: ', response)
						console.log('\n2. Current Swap in Store:', {
							"swap_id": getStore().currentSwap.id, 
							'swap_owner':getStore().currentSwap.recipient_user.first_name,
							'status': getStore().currentSwap.status,
							'percentage': getStore().currentSwap.percentage, 
							'counter_percentage': getStore().currentSwap.counter_percentage
						})
						console.log('\n3. Current Buyin in Store:', {
							"buyin_id": getStore().currentBuyin.id, 
							'chips': getStore().currentBuyin.chips
						})

					}catch(error){
						console.log('Something went wrong with adding a swap', error)
						return errorMessage(error.message)
					}
				},
				// RETIREVES SWAP YOU ARE CURRENTLY VIEWING
				getCurrent: async ( a_swap_id ) => {
					try{

						const url = databaseURL + 'swaps/' + a_swap_id;
						const accessToken = getStore().userToken ;
						
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						
						var answer = await response.json()
						console.log('currentSwap', {
							"swap_id":answer.id, 
							"swap_owner": answer.recipient_user.first_name,
							'status': answer.status,
							'percentage':answer.percentage, 
							'counter_percentage': answer.counter_percentage
						})
						setStore({currentSwap:answer})
					}catch(error){
						console.log("Something went wrong with getting the current swap: ", error)
					}
				},
				returnCurrent: async ( a_swap_id ) => {
					try{
						const url = databaseURL + 'swaps/' + a_swap_id;
						const accessToken = getStore().userToken ;
						
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						
						var answer = await response.json()
						console.log('currentSwap', {
							'swap_id':answer.id, 
							'owner': answer.recipient_user.id,
							'status': answer.status,
							'percentage': answer.percentage,
							'counter_percentage': answer.counter_percentage,
						})
						return answer
					}catch(error){
						console.log("Something went wrong with getting the current swap: ", error)
					}
				},
				removeCurrent: async() => {
					setStore({currentSwap:{}})
					console.log('removed', getStore().currentSwap)
				},

				// YOU AND OTHER USER CONFIRMS PAYMENT
				confirmed: async ( a_tournament_id, a_recipient_id, a_swap_id) => {
					try{
						const url = databaseURL + 'users/me/swaps/'+ a_swap_id.toString() + '/confirmed'
						
						let accessToken = getStore().userToken
						let data = {
							tournament_id: parseInt(a_tournament_id),
							recipient_id: parseInt(a_recipient_id)
						}

						let response = await fetch(url,{
							method:"PUT",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						console.log('Confirmed Swap Response:', response)
						if(response.hasOwnProperty('message') && response.message.includes('has been confirmed') ){
							var x = await getActions().tracker.getPast()
							return true
						}else{
							return false
						}
						
					}catch(error){
						console.log('Something went wrong with paying a swap: ', error)
					}
				},
				// YOU AND OTHER USER CONFIRMS PAYMENT
				paid: async ( a_tournament_id, a_recipient_id, a_swap_id) => {
					try{
						const url = databaseURL + 'users/me/swaps/'+ a_swap_id.toString() + '/paid'
						// console.log('pay check', a_tournament_id.typeOf(), a_recipient_id.typeOf(), a_swap_id.typeOf())
						// console.log('ur', url)
						let accessToken = getStore().userToken
						let data = {
							tournament_id: parseInt(a_tournament_id),
							recipient_id: parseInt(a_recipient_id)
						}

						let response = await fetch(url,{
							method:"PUT",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						console.log('You Paid Swap Response:', response)
						if(response.hasOwnProperty('message') && response.message.includes('has been paid') ){
							var x = await getActions().tracker.getPast()
							return true
						}else{
							return false
						}
						
					}catch(error){
						console.log('Something went wrong with paying a swap: ', error)
					}
				},
				// REMOVES CURRENT SWAP FROM STORE
				// removeCurrent: async ( ) => {
				// 	setStore({currentSwap:null})
				// 	console.log('Current Swap in Store: ',getStore().currentSwap )
				// },
				// ANY CHANGE TO SWAP IS DONE HERE
				statusChange: async ( a_tournament_id, my_swap_id, a_buyin_id, a_current_status, a_new_status, a_percentage, a_counter_percentage ) => {
					try{
						const url = databaseURL + 'me/swaps/' + my_swap_id
						let accessToken = getStore().userToken
						let data 
						
						!a_percentage ?
						 	data = { status: a_new_status }
							: 
							a_counter_percentage ?
								data ={
									status: a_new_status,
									percentage: a_percentage,
									counter_percentage: a_counter_percentage
								}
								:
								data = {
									status: a_new_status,
									percentage: a_percentage
								}

							// console.log('data',data)

						let response = await fetch(url,{
							method:"PUT",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						
						console.log('Swap Status Change Result:\n', 
							{'me':response[0].recipient_user.first_name,
							'status':response[0].status,
							'percentage':response[0].percentage,
							}, '\n',
							{'swap_owner':response[1].recipient_user.first_name,
							'status':response[1].status,
							'percentage':response[1].percentage,
							})
						
						if(response.message){
							if(response.message.includes("Cannot agree")){
							return errorMessage(response.message)
						}else{null}}

						var refreshingTournament = await getActions().tournament.getCurrent(a_tournament_id)
						var refreshingAction = await getActions().tournament.getAction(a_tournament_id)			
						var refreshingTracker = await getActions().tracker.getCurrent()
						var refreshingupTracker = await getActions().tracker.getUpcoming()
						var refreshingBuyin = await getActions().buy_in.getCurrent(a_buyin_id)
						var refreshingSwap = await getActions().swap.getCurrent(my_swap_id)

						console.log('\n1. After ' + a_new_status + ' swap, this is the response: ', {
							'swap_id':response[0].id, 
							'swap_owner':response[0].recipient_user.first_name,
							'status':response[0].status,
							'percentage':response[0].percentage,
							'counter_percentage':response[0].counter_percentage,
						})
						console.log('\n2. Current Swap in Store:', {
							'swap_id':getStore().currentSwap.id, 
							'swap_owner':response[0].recipient_user.first_name,
							'status':getStore().currentSwap.status,
							'percentage':getStore().currentSwap.percentage,
							'counter_percentage':getStore().currentSwap.counter_percentage,
						})
						console.log('\n3. Current Buyin in Store:', {
							'buyin_owner':response[0].recipient_user.first_name,
							'buyin_id':getStore().currentBuyin.id,
							'chips':getStore().currentBuyin.chips
						})

						// if (a_current_status == 'incoming'){
						// 	var a = await getActions().swapToken.spend()
						// }else{null}

						// if (a_current_status == 'counter_incoming'){
						// 	if(a_new_status =='rejected'){
						// 		var a = await getActions().swapToken.return()
						// 	} else{null}
						// }else{null}

						// if(a_new_status == 'canceled'){
						// 	console.log('repsonse if canceled', response[1].recipient_user.id )
						// 	if(response[1].status == 'counter_incoming'){
						// 		var a = await getActions().swapToken.return()
						// 	}else{null}
						// }	
						
					
					}catch(error){
						console.log("Something went wrong with the swap's status change:",error)
						errorMessage(error.message)
					}
				},
			},
			stripe:{
				purchase: async() => {

				}
			},
			// TIME CONVERSION ACTIONS
			time: {
				// Time Conversion used for Buyins
				convertShort: async ( time ) => {
					try {
						// console.log('time', time)
						var y, since;
						if (time.includes('a ') || time.includes('an ')) { 
							y = '1'
						} else{
							y = parseInt(time.replace(/[^0-9\.]/g, ''), 10);
						}
						if (time.includes('second')) { since = 'Just Now' } 
						else if(time.includes('minute')){ since = y + 'm' } 
						else if(time.includes('hour')){ since = y + 'h' } 
						else if(time.includes('day')){ since = y + 'd' } 
						else if(time.includes('week')){ since = y + 'w' }
						else if(time.includes('month')){ since = y + 'M' }
						else if(time.includes('year')){ since = y + 'Y' }
						else{ null }
						// console.log('Converted Small Time of: ' + since)
						
						if (since != 'Just Now'){
							return (since + ' ago')
						}else{
							return(since)
						}
					}catch(error){
						console.log('Something went wrong with converting short time: ', error)
					}
				},
				// Time Conversion used for Swaps
				convertLong: async ( time ) => {
					try {
						var day_name = time.substring(0,3)
						var startMonth = time.substring(8,11)
						var startDay = time.substring(5,7)
						var startTime = time.substring(16,22)
						var startYear = time.substring(12,16)
				
						var startHour = parseInt(time.substring(16,19))
						var startM 
						if (startHour % 12!==0){
							if(startHour/12 >= 1){
								startM = ' P.M.', startHour%=12
							}else{
								startM = ' A.M.'
							}
						} else{
							if(startHour == 0){
								startM = ' A.M.', startHour=12
							}else{
								startM = ' P.M.'
							}
						}
						
						var startDate =  day_name + '. ' + startMonth + '. ' + startDay
						var startTime = startHour + ':' + time.substring(20,22) + startM
						// console.log('sss', startDate + '  ' +   startTime)

						return startDate + ', ' + startYear + ' ' +   startTime
					
					}catch(error){
						console.log('Something went wrong with converting long time: ', error)
					}
				}
			},
			// EVENT ACTIONS
			tournament:{
				// GETTING ACTION FOR TOURNAMENT YOU'RE VIEWING
				getAction: async ( a_tournament_id ) => {
					try{
						const url = databaseURL + 'swaps/me/tournament/' + a_tournament_id;
						const accessToken = getStore().userToken ;
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var aCurrentAction = await response.json()
						setStore({currentAction: aCurrentAction})
					} catch(error){
						console.log('Something went wrong in getting action from a tournament: ', error)
					}
				},		
				// GETTING INFORMATION ON TOURNAMENT YOU'RE VIEWING
				getCurrent: async( a_tournament_id ) => {
					try{
						const url = databaseURL + 'tournaments/' + a_tournament_id;
						const accessToken = getStore().userToken ;
						
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						
						var aCurrentTournament = await response.json()
						setStore({currentTournament: aCurrentTournament})
						return(aCurrentTournament)
					} catch(error){
						console.log('Something went wrong with getting a current tournament: ', error)
						return errorMessage(error.message)
					}
				},
				// RETRIEVES INITIAL TOURNAMENTS IN THE EVENTS DASHBOARD
				getInitial: async ( key1, value1, key2, value2 ) => {
					try {
						setStore({tournamentList: null})
						var base_url =databaseURL + 'tournaments/all?asc=true&limit=12&page=1'
						var full_url
						key1 !== undefined ?
							key2 !== undefined ?
								full_url = base_url + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2
								:
								full_url = base_url + '&' + key1 + '=' + value1
							:
							full_url = base_url

							// console.log('full url', full_url)

						const accessToken = getStore().userToken ;
						
						let response = await fetch(full_url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var initialTournaments = await response.json()
						// console.log('iii', initialTournaments)
						console.log(initialTournaments[0].tournament_id)

						var aaaa = []

						var allInitialTournaments =  initialTournaments.forEach(tournament =>{
							var x, special;
							tournament.day !== null ? 
								x = ' - Day '+ tournament.day : x = ''
							var action =null
							// console.log('lol',typeOf(tournament.tournament_id))
							if(tournament.buyin){
								 action = getActions().tournament.retrieveAction(tournament.tournament_id.toString())}
							
							
								 
							aaaa.push({
								'action': action,
								'name': tournament.tournament + x,
								'local': moment(tournament.start_at).tz(tournament.casino.time_zone).format('h:mm A z'),
								...tournament
							})
							// console.log('aaaa',aaaa)
						})
						// var now = moment()
						// var aaaab = aaaa.filter(x => now.isBefore(moment(x.start_at).add(17, 'hours')))
						setStore({tournamentList: aaaa})
						// console.log('tournaments inital', getStore().tournamentList)
					} catch(error) {
						console.log('Something went wrong with getting initial tournaments: ', error)
						setStore({tournamentList: "There are no events at the moment"})
					}
				},
				// RETRIEVES ADDITIONAL TOURNAMENTS IN THE EVENTS DASHBOARD
				getMore: async ( page, key1, value1, key2, value2 ) => {
					try{
						var base_url = databaseURL + 'tournaments/all?asc=true&limit=12&page='
						var full_url
						key1 !== undefined ?
							key2 !== undefined ?
								full_url = base_url + page + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2
								:
								full_url = base_url + page + '&' + key1 + '=' + value1
							:
							full_url = base_url + page

						const accessToken = getStore().userToken ;
						let response = await fetch(full_url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						console.log()

						var tournamentData = getStore().tournamentList
						let newData = await response.json()


						var aaaa = []

						if(newData != []){ 
							var allInitialTournaments =  newData.forEach(tournament => {
									var x, special;
									tournament.day !== null ? 
										x = ' - Day '+ tournament.day : x = ''
									
									var action =null
									if(tournament.buyin){
								 		action = getActions().tournament.retrieveAction(tournament.tournament_id)}
						
									aaaa.push({
										'action': action,
										'name': tournament.tournament + x,
										...tournament
									})
								
							})
							// var now = moment()
							// var aaaab = aaaa.filter(x => now.isBefore(moment(x.start_at).add(17, 'hours')))
							var currentTournaments = [...tournamentData, ...aaaa]
							setStore({tournamentList: currentTournaments})
						}else{
							console.log('No more tournaments')}

					} catch(error){
						console.log('Something went wrong with getting more tournaments: ', error)
					}
				},
				// RETRIEVES CURRENT ACTION FOR FORMULA USE 
				retrieveAction: async ( a_tournament_id ) => {
					try{
						// console.log('Coming in', a_tournament_id)
						const url = databaseURL + 'swaps/me/tournament/' + a_tournament_id;
						const accessToken = getStore().userToken ;
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var aCurrentAction = await response.json()
						return(aCurrentAction)
					} catch(error){
						console.log('Something went wrong in retreiving action from a tournament: ', error)
					}
				},
				setCurrentLobby: async (eVent, tOurnament) => {
					// console.log(eVent, tOurnament)
					// FLIGHT SCHEDUELE MAPPER
					console.log('eVent', eVent)
					console.log('tOurnament', Object.keys(tOurnament))

					  if(eVent && tOurnament){
						var toFilterOne  = []
						var addToFilter = eVent.buyins.forEach((buyin) => 
						  toFilterOne.push(buyin.recipient_user.id));
						var toFilter2 = [eVent.my_buyin.user_id, ...toFilterOne]  
					
						let tournamentBuyins 
						if (tOurnament.buy_ins.length !== 0){
						  tournamentBuyins = tOurnament.buy_ins.filter( buyin => 
							toFilter2.includes(buyin.user_id) != true)
						}else{
						  tournamentBuyins = []
						}
						var flightSet =[]
						// FLIGHT SCHEDUELE RENDER METHOD
						tOurnament.flights.forEach((flight, index) => {       
						  var myBuyInFlight
						  eVent.my_buyin.flight_id == flight.id ? 
							myBuyInFlight = eVent.my_buyin : myBuyInFlight = []
						  
						  var swappedBuyins =[]
						  var addingtoSwappedBuyins = eVent.buyins.forEach(buyin => {
							buyin.recipient_buyin.flight_id == flight.id ?
							  swappedBuyins.push(buyin) : null
						  })
						  
						  var unswappedBuyins = []
						  var addingtoSwappedBuyins = tournamentBuyins.forEach(buyin => {
							buyin.flight_id == flight.id ?
							  unswappedBuyins.push(buyin) : null
						});
						var result = {
						  "flight":flight,
						  "tournamentBuyins": tournamentBuyins,
						  "myBuyInFlight": myBuyInFlight,
						  "swapped_buyins": swappedBuyins, 
						  "unswapped_buyins": unswappedBuyins,}
						  flightSet.push(result)
						
					
					  })
					  setStore({currentLobby: flightSet})
					  var xdxr = getActions().tracker.getCurrent()
					
					  }else{
						null
					  }
				},
				
			},
			// SWAP RESULTS ACTIONS
			tracker: {
				// RETRIEVES CURRENT SWAP TRACKERS FOR ACTIVE SWAPS DASHBOARD
				getCurrent: async() => {
					try{
						const url = databaseURL + 'me/swap_tracker'
						let accessToken = getStore().userToken
						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()
						// console.log('trackerData',trackerData)
						
						var getIds = trackerData.map(tracker => tracker.tournament.id)
						
						const asyncRes = await Promise.all(getIds.map(async (i) => {
							 
							console.log("TOURNAMENT ID", i)
							var e = await getActions().tournament.retrieveAction(i);
							return e;
						}));
						
						var newTrackerData = trackerData.map((tracker, index)=> {						
							var a_countdown = moment(tracker.tournament.start_at).fromNow()
							return({
								...tracker,
								action:asyncRes[index],
								countdown: a_countdown
							})
						})
						var xp
						var currentList = newTrackerData.filter(tracker => 
							moment().isAfter(moment(tracker.tournament.start_at)))
						console.log('cruent list', currentList)
						
						var xss = await console.log('jellp')
						currentList.length == 0 ? xp=[{message:true}] : xp=currentList
						setStore({myCurrentTrackers: xp})
						console.log("HERE HERE HER", Object.keys(getStore().myCurrentTrackers[0]))
						var x = await getActions().refresh.dashboard(true)
    					// var eeee = await getActions().refresh.dashboard(false) 
						// setStore({myTrackers: newTrackerData})
						
					} catch(error){
						console.log('Something went wrong in getting current trackers: ', error)
					}

				},
				// RETRIEVES PAST SWAP TRACKERS FOR SWAP RESULTS DASHBOARD
				getPast: async() => {
					try{
						const url = databaseURL + 'me/swap_tracker?history=true'
						let accessToken = getStore().userToken

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()

						// console.log('tracker', trackerData)
						var newTrackerData = trackerData.map((tracker, index)=> {			
							var latest = null
							console.log('CHECK HERE', Object.keys(tracker))
							var deded = tracker.tournament.flights.forEach(flight =>{
								var thisTime = flight.start_at
								// console.log('thisTime', thisTime)

								if(latest || moment(thisTime).isBefore(latest)){
									null
								}else
								latest = thisTime
							})
							var new_latest = new Date(latest)
							new_latest.setHours( new_latest.getHours() + 17)
							var true_end = moment(new_latest).format('llll')
							// console.log('tracker', tracker)
							var agreedBuyins = tracker.buyins.filter(buyin => buyin.agreed_swaps.length > 0)
							var allPaid = []
								var allConfirmed = []
							if (agreedBuyins.length !== 0){
								
								var eee = tracker.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allPaid.push(swap.paid)))
								var xxx = tracker.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allConfirmed.push(swap.confirmed)))
								const isTrues = (currentValue) => currentValue ==true;
								allPaid.every(isTrues) ? allPaid = true : allPaid = false
								allConfirmed.every(isTrues) ? allConfirmed = true : allConfirmed = false
							} else{ 
								allPaid= null
								allConfirmed= null
							}
							// console.log('EEEE', true_end)
							return({
								...tracker,
								allPaid:allPaid,
								allConfirmed:allConfirmed,
								tournament_end: true_end,
								agreed_buyins: agreedBuyins,
								results_link: tracker.tournament.results_link,
							})
						})
						var xp

						setStore({myPastTrackers: newTrackerData})
						// console.log('myPastTrackers', getStore().myPastTrackers)
						var x = newTrackerData.filter(tracker => !tracker.tournament.results_link)
						x.length == 0 ? x = [{message:true}] : null

						var y = newTrackerData.filter(tracker => tracker.tournament.results_link)
						y.length == 0 ? y = [{message:true}] : null

						setStore({myPendingResultsTrackers: x})
						setStore({myConfirmedResultsTrackers: y})

					}catch(error){
						console.log('Something went wrong in getting past trackers: ', error)
					}

				},
				getPastSpecific: async( specificID) => {
					try{
						const url = databaseURL + 'me/swap_tracker?history=true'
						let accessToken = getStore().userToken

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()

						// console.log('tracker', trackerData)

						var x = trackerData.filter(tracker => tracker.tournament.id == specificID)

						var newTrackerData = x.map( (tracker, index)=> {			
							var latest = null
							var deded = tracker.tournament.flights.forEach(flight =>{
								var thisTime = flight.start_at
								// console.log('thisTime', thisTime)

								if(latest || moment(thisTime).isBefore(latest)){
									null
								}else
								latest = thisTime
							})
							var new_latest = new Date(latest)
							new_latest.setHours( new_latest.getHours() + 17)
							var true_end = moment(new_latest).format('llll')
							var agreedBuyins = tracker.buyins.filter(buyin => buyin.agreed_swaps.length > 0)
							// console.log('agreedBuyuins', agreedBuyins)
							var allPaid = []
								var allConfirmed = []
							if (agreedBuyins.length !== 0){
								
								var eee = tracker.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allPaid.push(swap.paid)))
								var xxx = tracker.buyins.forEach(buyin => buyin.agreed_swaps.forEach(swap => allConfirmed.push(swap.confirmed)))
								const isTrues = (currentValue) => currentValue ==true;
								allPaid.every(isTrues) ? allPaid = true : allPaid = false
								allConfirmed.every(isTrues) ? allConfirmed = true : allConfirmed = false
							} else{ 
								allPaid= null
								allConfirmed= null
							}
							console.log(allPaid)
							console.log(allConfirmed)
							

							return({
								...tracker,
								results_link: tracker.tournament.results_link,
								allPaid:allPaid,
								allConfirmed:allConfirmed,
								tournament_end: true_end,
								agreed_buyins: agreedBuyins
							})
						})

						// console.log( 'NEWST TEKX', newTrackerData[0])
						setStore({currentResult:newTrackerData[0]})
						// console.log('newZTeackerSDat', newTrackerData)
						return newTrackerData[0]
						// console.log('myPastTrackers', getStore().myPastTrackers)
						

					}catch(error){
						console.log('Something went wrong in getting past trackers: ', error)
					}

				},
				//
				getUpcoming: async() => {
					try{
						const url = databaseURL + 'me/swap_tracker'
						let accessToken = getStore().userToken
						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()
						// console.log('trackerData',trackerData)
						
						var getIds = trackerData.map(tracker => tracker.tournament.tournament_id)
						
						const asyncRes = await Promise.all(getIds.map(async (i) => {
							 var e = await getActions().tournament.retrieveAction(i);
							return e;
						}));
						
						
						var newTrackerData = trackerData.map((tracker, index)=> {		
							
							var a_countdown = moment(tracker.tournament.start_at).fromNow()
							return({
								...tracker,
								action:asyncRes[index],
								countdown: a_countdown
							})
						})
						var upcomingList = newTrackerData.filter(tracker => 
							moment().isBefore(moment(tracker.tournament.start_at)))
						var xp
						upcomingList.length == 0 ? xp=[{message:true}] : xp=upcomingList
						setStore({myUpcomingTrackers: xp})

						var x = await getActions().refresh.dashboard(true)
    					// getActions().refresh.dashboard(false) 
						
					} catch(error){
						console.log('Something went wrong in getting upcoming trackers: ', error)
					}

				},
				
			},
			// USER ACTIONS
			user: {
				// CREATE A USER AND SENDS A VERIFICATION EMAIL
				add: async ( myEmail, myPassword ) => {
					try{
						// DATA SETUP
						const url = databaseURL + 'users'
						const data = {
							email: myEmail,
							password: myPassword
						}

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json'
							}, 
						})
						var x = await response.json()
						console.log('Added User Response: ', response)
						return true
					} catch(error) {
						console.log("Something went wrong with adding user: ", error)
						return errorMessage("Sorry, this email address is already taken")
					}
				},
				// LOGIN PROCESS
				login: async ( data, navigation ) => {
					var wwx = await AsyncStorage.getItem('notificationData')
					var wew = JSON.parse(wwx)
					// console.log('Notification storedd', wwx)


					return new Promise(resolve =>
						resolve(getActions().userToken.get(data, navigation)
						.then(() => setStore({nowLoading: 'Logging In...'}))
						.then(() => getActions().deviceToken.get(data.device_token))
						.then(()=> getActions().profile.get())
						.then(()=> {
							// console.log('Profile', getStore().myProfile.first_name + ' ' + getStore().myProfile.last_name  )
							if(getStore().userToken  && getStore().myProfile !== "Error"){
								if(getStore().myProfile.message !== "Profile not found"){
									var ww = AsyncStorage.getItem('uiMode')
									.then(async() => {
										if (ww == undefined || ww== null){
											var ww = await AsyncStorage.setItem('uiMode', 'false')
										}else{
											var xe
											ww == 'true' ? xe=true : xe=false
											getActions().uiMode.change(xe)
										}
									})
									.then(() => getActions().tracker.getPast())
									.catch(() => "somthing went wrong here")
									// console.log('got through half')
									if (getStore().myProfile.naughty == true){
										navigation.navigate('Drawer', {screen: 'Home'} )
									}else{
										getActions().tournament.getInitial()
										// .then(() => getActions().firebase.login( data ))
										.then(() => getActions().chat.getMine())
										.then(() => setStore({nowLoading: 'Loading Swaps...'}))
										.then(() => getActions().tracker.getCurrent())
										.then(() => getActions().tracker.getUpcoming())
										.then(() => setStore({nowLoading: ''}))
										// .then(() => console.log('hello'))
										.then(() => navigation.navigate('Drawer', {screen: 'Home'} ))
										.then(() => {
											if(wew !== null){
												// console.log('wew', wew)
												if(wew.data.type=='swap'){
													getActions().navigate.toSwap(wew.data, navigation)
												}else if(wew.data.type=='event'){
													getActions().navigate.toEvent(wew.data, navigation)
												}else if(wew.data.type=='chat'){
													getActions().navigate.toChat(wew.data, navigation)
												}else if(wew.data.type=='result'){
													getActions().navigate.toResult(wew.data, navigation)
												}else if(wew.data.type=='buyin'){
													getActions().navigate.toBuyin(wew.data, navigation)
												}else{null}
												AsyncStorage.removeItem('notificationData')
											}else{
												null
											}
										})
										.catch((err) => console.log('err',err))
									}
									
								} else { 
									AsyncStorage.setItem('loginInfo', JSON.stringify(data))
									var x  = AsyncStorage.getItem('loginInfo')
									// console.log("x",x)
									navigation.navigate('Profile Creation')
								}									
							}else{
								console.log("There is an error with userToken or the profile returns error");
								// return errorMessage("You did not login correctly")
							}
						})
						.catch((error)=> console.log('Something went wrong in logging in: ', error))
					))
				},
				// LOGOUT FUNCTION
				logout: async( navigation ) => {
					navigation.navigate('Auth', {screen:'Login'})
					getActions().deviceToken.remove()
					// getActions().firebase.logout()
					setStore({currentSwap:{}})
					setStore({currentBuyin:{}})
					setStore({myCurrentTrackers:{}})
					setStore({myUpcomingTrackers:{}})
					setStore({myPastTrackers:{}})
					setStore({myConfirmedResultsTrackers:{}})
					setStore({myPendingResultsTrackers:{}})
					setStore({userToken:{}})
					// setStore({ myProfile: null })

					AsyncStorage.removeItem('userToken')
					AsyncStorage.removeItem('loginInfo')
					AsyncStorage.removeItem('deviceToken')
				},
				// IN CHANGE SETTINGS, CHANGE YOUR EMAIL
				changeEmail: async ( myEmail, myPassword, myNewEmail, navigation ) => {
					try {
						let data = {
							email: myEmail,
							password: myPassword,
							new_email: myNewEmail
						}
	
						let accessToken = getStore().userToken;
	
						const url = databaseURL + 'users/me/email'
	
						let response = await fetch(url, {
							method:'PUT',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json',
								'Authorization': 'Bearer ' + accessToken
							}, 
						})
						.then(response => response.json())
						console.log('Change Email Response: ',response)
						Toast.show({
							text:response.message,
							position:'top',
							duration:3000,
						})
						if (response.message == "Please verify your new email"){
							getActions().user.logout(navigation)
						}else{
							console.log('You did not return to login')
						}
					}catch(error){
						console.log('Something went wrong with changing your email', error)
						return errorMessage("Something went wrong with your email address change")
					}
				},
				// IN CHANGE SETTINGS, CHANGE YOUR PASSWORD
				changePassword: async( myEmail, myPassword, myNewPassword, navigation ) => {
					try {
						let data = {
							email: myEmail,
							password: myPassword,
							new_password: myNewPassword
						} 
	
						let accessToken = getStore().userToken;
						const url = databaseURL + 'users/me/password'
	
						let response = await fetch(url, {
							method:'PUT',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json',
								'Authorization': 'Bearer ' + accessToken
							}, 
						})
						.then(response => response.json())
						console.log('Change Password Response: ', response)
						Toast.show({
							text:response.message,
							position:'top',
							duration:3000,
						})
						if (response.message == "Your password has been changed"){
							getActions().user.logout(navigation)
						}else{
							console.log('You did not return to login')
						}
					}catch(error){
						console.log('Something went wrong with changing your password: ', error)
						return errorMessage("Something went wrong with your password change")
					}
				},
				// (NOT SURE IF THIS IS USED OR PROFILE/UPLOADPICTURE IS)
				changePicture: async(image) => {
					try {
						let accessToken = getStore().userToken;

						const imageURL = databaseURL + 'profiles/image'
						const imageData = new FormData();
							imageData.append("image", {
									uri: image.uri,
									type: image.type,
									name: image.name
							});
						// console.log('imageData', imageData)
						let response = await fetch(imageURL, {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: imageData,
						})
						.then(response => response.json())
						.then((responseJson) => {
							console.log('Change Profile Picture Response: ', responseJson)
						})
						.catch((error) => {
							console.log('Something went wrong in changing profile picture: ',error);
						});
						var errew = await getActions().profile.get()
						return(customMessage("Your profile picture was changed"))
					}catch(error) {
						console.log("Something went wrong with changing your profile picture", error)
						return errorMessage("Something went wrong with changing your profile picture")
					}
					
						
				},
				// ON LOGIN PAGE, SEND AN EMAIL FOR A PASSWORD RESET
				forgotPassword: async( myEmail ) => {
					try {
						const url = databaseURL + 'users/me/password?forgot=true'
						let data = { email: myEmail }

						let response = await fetch(url, {
							method:'PUT',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json',
							}, 
						})
						.then(response => response.json())
						console.log('Forgot Password Response:', response)
						return customMessage(response.message)
					}catch(error){
						console.log('Something went wrong with forgot password: ', error)
						return errorMessage('Something went wrong with resetting your forgot password')
					}
				}
			},
			// USER TOKEN ACTIONS
			userToken: {
				check: async( myUserToken ) => {
			          try {      
			            const taskURL = databaseURL + "profiles/me" 
			                           
			            let response = await fetch(taskURL, { 
			              method: 'GET',
			              cache: 'no-cache',
			              headers: {
			                'Authorization': 'Bearer ' + myUserToken,
			                'Content-Type': 'application/json',
			                'Cache-Control': 'no-cache'},
			              body: JSON.stringify(),
			            });
			            let checkedResponse = await response.json();

			            let isValid;
			            if(checkedResponse.id){
			              isValid = true;
			              setStore({userToken: myUserToken})
			            }else{
			              isValid = false
			              AsyncStorage.removeItem('userToken')
			              AsyncStorage.removeItem('loginInfo')
			            }
			            // console.log('Is it a valid token:', isValid)
			            return isValid
			          }catch(error){
			            console.log('something went wrong in gchecking access token', error)
					}
				} ,

				get: async( data ) => {
					try{
						const url = databaseURL + 'users/token'
						// console.log("this url", url, data)
						let response1 = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json'
							}, 
						});

						let res = await response1.json();
						// console.log('res', res, response1)
						if (response1.status >= 200 && response1.status < 300) {
							data.error = "";
							setStore({userToken: res.jwt});
							var x = await AsyncStorage.setItem('loginInfo', JSON.stringify(data))
							var cx = await AsyncStorage.setItem('userToken', res.jwt)

						} else {
							let error = res;
							setStore({userToken: null})
							console.log("Something went wrong in getting userToken: ", error, getStore().userToken);
							return errorMessage(error.message)
						}
						
					} catch(error) {
							setStore({userToken: null})
							console.log("Email: ", data.email);
							console.log("Password: ", data.password);
							console.log("Error: ", error);
							throw data.error;
					}
				} ,
			},
			// USER INTERACTION MODE
			uiMode: {
				change: (value) => {
					setStore({uiMode: value})
				}
			}
		}
	}
}

export default getState;