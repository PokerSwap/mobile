
import { Alert } from 'react-native'
import {Toast} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions, NavigationActions } from 'react-navigation';

import moment from 'moment';

var databaseURL = 'https://swapprofit-beta.herokuapp.com/'

var errorMessage = (error) => {
	Toast.show({
		text:error, 
		duration:3000, 
		style:{bottom:90,backgroundColor:'red'}

	})
}

var customMessage = (custom) => {
	Toast.show({
		text:custom, duration:3000, position:'top'
	})
}

var alertMessage = (alert) => {
	Alert.alert(
		"Alert",
		alert,
		[
			{
				text: 'OK', onPress: () => console.log('OK')
			},
		]
	)
}

const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			// FOR CURRENT ACTION IN A TOURNAMENT
			currentAction: null,
			// CURRENT BUYIN ON SCREEN
			currentBuyin:{},
			// CURRENT SWAP ON SCREEN
			currentSwap:{},
			// CURRENT BUYIN ON SCREEN
			currentTournament:{},
			// MY DEVICE TOKEN
			deviceToken: null,
			// MY PROFILE
			myProfile:{},
			// LIVE AND UPCOMING SWAP TRACKER
			myTrackers:[],
			// ALL PAST SWAP TRACKER
			myPastTrackers:[],
			// ALL WINNING TRACKERS
			myWinningsTrackers:[],
			// FOR MOST RECENT NOTIFICATION, TO GO TO PAGE
			notificationData: {},
			// LISTS ALL RECIEVED NOTIFICATIONS
			notificationList:[],
	  	// OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],
	  	// ALL TOURNAMENTS, FILTERED BY FIRST 10 RESULTS
			tournamentList:[],
			// USED TO GET PROFILE AND ACCESS ALL REQUESTS IN THE APP
			userToken: null
		},
		actions: {
			// BUY IN ACTIONS
			buy_in:{
				// CREATING A BUYIN AND (RE)-BUYING-IN INTO A TOURNAMENT
				add: async ( image, a_table, a_seat, some_chips, a_flight_id, a_tournament_id, a_tournament_name, a_tournament_start, navigation) => {
					try{	
						// PREVENTS EMPTY PICTURE SUBMISSION
						if (image == 3){
							return customMessage('You need to select an image of your buyin ticket')
						}
						// PREVENTS EMPTY FIELDS
						if (a_table == '' || a_seat == '' || some_chips == ''){
							return customMessage('You need to fill in all the fields listed')

						}
						// BUYIN DATA SETUP
						var newBuyin
						let accessToken = getStore().userToken
						const imageURL = databaseURL + 'me/buy_ins/flight/'+ a_flight_id +'/image'		
						const imageData = new FormData();
						imageData.append("image", {
								uri: image.uri,
								type: image.type,
								name: image.name
						});
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
								console.log('newBuyin',newBuyin)
						})
						.catch((error) => {
							console.log('error in json of image',error);
						});

						// PREVENTS WRONG PICTURE UPLOADED
						if (newBuyin.message == 'Take another photo'){
							var eee = await getActions().buy_in.delete(newBuyin.buyin_id)
							return errorMessage(newBuyin.message)
						}else{null}


						if (newBuyin.receipt_data.table !== a_table || newBuyin.receipt_data.seat !== a_seat){
							var eee = await getActions().buy_in.delete(newBuyin.buyin_id)
							return errorMessage("One of the fields is not correct")
						}else{null}
			 
						// if (!newBuyin.receipt_data.player_name.includes(store.myProfile.username) ){
						// 	return errorMessage("The name in the buyin is the not the same as your profile")
						// }else{null}

						// VALIDATING BUYIN (DONE ONCE)
						var validatingBuyin = await getActions().buy_in.edit(newBuyin.buyin_id, a_table, a_seat, some_chips, a_tournament_id, true)

						var enteringTournament = await navigation.push('EventLobby', {
							tournament_name: a_tournament_name,
							tournament_id: a_tournament_id,
							tournament_start: a_tournament_start,
							action: null
						})

					} catch(error) {
						console.log("Some went wrong in adding a buyin", error)
						return errorMessage(error.message)
					}
				},
				// YOUR BUYIN HAS BUSTED (REACHED 0 COINS)
				busted: async ( a_buyin_id, a_place, some_cash, a_tournament_id ) => {
					try{
						let url = databaseURL + '/buy_ins/' + a_buyin_id
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
						var refreshingProfile = await getActions().tournament.getInitial()
						var refreshingProfile = await getActions().profile.get()
						
						return( customMessage('All unconfirmed swaps have been closed and your tokens returned'))
					}catch(error){
						console.log('Something went wrong with busting my buyin', error)
					}
				},
				delete: async ( a_buyin_id ) => {
					const accessToken = getStore().userToken
					var url = databaseURL + '/buy_ins/' + a_buyin_id 


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
							console.log('added buyin', responseJson)
						})
						.catch((error) => {
							console.log('error in json of edit buyin',error);
						});

						var refreshTrackers = await getActions().tracker.getCurrent()
						var refreshTournaments = await getActions().tournament.getInitial()
						var refreshAction = await getActions().tournament.getAction(a_tournament_id)
						var refreshBuyin = await getActions().tournament.getCurrent(a_tournament_id)
						var refreshSwap = await getActions().buy_in.getCurrent(a_buyin_id)
						return customMessage('Your buyin has been updated.')

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
			// USER DEVICE TOKEN ACTIONS
			deviceToken:{

				get: async() => {
					try {
						var storedDeviceToken = await AsyncStorage.getItem('deviceToken')
						setStore({deviceToken: storedDeviceToken})
						// console.log('Current Device Token', getStore().deviceToken)
					} catch (error) {
						console.log('Something went wrong with getting device token', error)
					}
				},

				remove: async() => {
					try {
						const accessToken = getStore().userToken;
						const url = databaseURL + 'users/me/devices' 

						const data = {device_token: getStore().deviceToken}

						let response = await fetch(url, {
							method:'DELETE',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							},
							body:JSON.stringify(data)
						})
						.then(response => response.json)

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
						return answer[0].token

					}catch(error){
						console.log('error in retrieiving deviceToken', error)
					}
				},

				store: async(device_token) => {
					try{
						console.log('Storing this', device_token)
						var storingDeviceToken = await AsyncStorage.setItem('deviceToken', device_token)
						setStore({deviceToken: device_token})
					}catch(error){
						console.log('Something went wrong with storing device token', error)
					}
				}
			},
			// SWAP TOKEN ACTIONS
			swapToken:{

				buy: async ( some_tokens ) => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + '/me/transactions'

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

					}catch(error){
						console.log('Something went wrong with buying tokens', error)
					}
				},

				return: async ( ) => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + '/me/transactions'

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
						const url = databaseURL + '/me/transactions'

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
				// NAVIGATING TO EVENT AFTER NOTIFICATION
				toEvent: async(data, navigation) => {
					try {
						// GETTING TOURNAMENT JSON
						var gettingTournament = await getActions().tournament.getAction(data.id);
						var currentTournament = getStore().currentTournament
						var answerParams = {
							tournament_name: currentTournament.tournament.name,
							tournament_id: currentTournament.tournament.id,
							tournament_start: currentTournament.tournament.start_at,
							flight_id: currentTournament.my_buyin.flight_id,
						}
						console.log('Notification Event Parameters: ', answerParams)

						// PREVENTS ENTERING CLOSED TOURNAMENT
						if (currentTournament.tournament.status !== 'open'){
							setStore({notificationData:null})
							navigation.navigate('SwapDashboard')
							return errorMessage('This event is not open')
						}

						// NAVIGATION ACTION
						var navigateAction = NavigationActions.navigate({
							routeName: data.finalPath,
							params: answerParams
						});

						setStore({notificationData:null})

						try{
							navigation.dispatch(navigateAction);
						} catch(error){
							console.log('Cant navigate to event', error)
							navigation.navigate('SwapDashboard');
						}
					}catch(error){
						console.log("Something went wrong with navigating to event:", error)
						setStore({notificationData:null})
						navigation.navigate('SwapDashboard')
					}
				},
				// NAVIGATING TO SWAP AFTER NOTIFICATION
				toSwap: async( data, navigation ) => {
					try {
						// GETTING SWAP JSON
						console.log('data', data)
						var gettingSwap = await getActions().swap.getCurrent(data.id)
						var gettingTournament = await getActions().tournament.getCurrent(getStore().currentSwap.tournament_id)

						// if (getStore().currentTournament.tournament.tournament_status !== 'open'){
						// 	setStore({notificationData:null})
						// 	navigation.navigate('SwapDashboard')
						// 	return errorMessage('This event is not open')
						// }
						// GETS MOST CURRENT BUYIN OF OTHER USER
						var theirBuyin
						var fg = getStore().currentTournament.tournament.buy_ins.forEach(buyin => {
							if(buyin.user_id == getStore().currentSwap.recipient_user.id){
								theirBuyin = buyin
								setStore({currentBuyin: theirBuyin})
								console.log('theirBuyin', theirBuyin)
							}
						})
						// PREVENTS SWAP IF OTHER USER HAS 0 CHIPS
						if(theirBuyin.chips == 0){
							navigation.navigate('SwapDashboard')
							setStore({notificationData:null})
							return errorMessage("This user has busted out")
						}
						// PREVENTS SWAP IF I HAVE NO CHIPS
						if(getStore().currentTournament.my_buyin.chips == 0){
							navigation.navigate('SwapDashboard')
							setStore({notificationData:null})
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

						var navigateAction = NavigationActions.navigate({
							routeName: 'SwapOffer',
							params:  answerParams 
						});

						// NAVIGATION ACTION
						try{
							navigation.dispatch(navigateAction);
						} catch(error){
							console.log('cant navigate', error)
						}
					}catch(error){
						console.log("Something went wrong with navigating to event:", error)
					}
					setStore({notificationData:null})
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
								navigation.navigate('SwapDashboard')		

							}
						}
						// NO NEW NOTIFICATION RECIEVED
						else{
							setStore({notificationData:{}})
							navigation.navigate('SwapDashboard')		
						}
					} catch(error) {
						console.log('Something went wrong checking notification data', error)
						setStore({notificationData:null})
						navigation.navigate('SwapDashboard')
					}
				},

				store: async(notification) => {
					setStore({notificationData: notification})
				}
				
			},
			// PROFILE ACTIONS
			profile:{
				// AFTER COMPLETING SIGN UP, CREATES PROFILE
				add: async ( a_username, firstName, lastName, a_hendon_url, a_Picture, navigation ) => {
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + 'profiles'
						const a_devicetoken = getStore().deviceToken
						let data = {
							username: a_username,
							first_name: firstName,
							last_name: lastName,
							hendon_url: a_hendon_url,
							device_token: a_devicetoken
						}
						console.log('New Profile data:', data)

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var addedProfile = await response.json()
						console.log('Added Profile Response:', addedProfile)
						
						var uploadedPicture = await getActions().profile.uploadPhoto(a_Picture)
						var gettingProfile = await getActions().profile.get();
						var deeec = await navigation.navigate('Categories');
					} catch(error) {
						console.log("Something went wrong in adding a profile", error)
					}
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
				// WHILE LOGGED IN, STORES PROFILE DATA IN STORE
				store: async( profileData ) => {
					
					try {
						
						setStore({ myProfile: profileData })
						// console.log('my profile', getStore().myProfile)
					
					} catch (error) {
						console.log('Something went wrong in storing profile', error)
					}
				},
				// UPLOAD NEW PROFILE PHOTO
				uploadPhoto: async ( image ) => {
					try {
						console.log('image in store', image)

						const url = databaseURL + 'profiles/image'
						const accessToken = getStore().userToken;
						const imageData = new FormData();

						imageData.append("image", {
							uri: image.uri,
							type: image.type,
							name: image.name
						});

						console.log('data', imageData)
						

						let response = await fetch(url, {
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
						.catch((error) => {
							console.log('error in json of profile pic',error);
						});
							
							var eecsrc = await getActions().profile.get()
							// return(Toast.show({
							// 	text:'Profile Picture Change',
							// 	duration:3000,
							// 	position:'top'
							// }))
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

						console.log('data', data)

						let response = await fetch(url,{
							method:"POST",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						
						console.log('response should be here', response)
						if(response.message.includes("Swap percentage too large for recipient.")){
							return errorMessage(response.message)}
						
						var spendToken = await getActions().swapToken.spend()
						var refreshingProfile = await getActions().profile.get()
						var refreshingTrackers = await getActions().tracker.getCurrent()
						var refreshingTournament = await getActions().tournament.getCurrent(a_tournament_id)		
						var refreshingBuyin = await getActions().swap.getCurrent(response.swap_id)		
						var refreshingSwap = await getActions().buy_in.getCurrent(a_buyin_id)		

						var answer3 = await getActions().tournament.getAction(a_tournament_id)	
						// var gettingRecipeintID = await getActions().deviceToken.retrieve(a_recipient_id)
						
						// var notifData = {
						// 	id: a_tournament_id,
						// 	type: 'swap',
						// 	initialPath: 'SwapDashboard', 
						// 	finalPath: 'SwapOffer'
						// }
						// console.log('Notif Data', notifData)
						// var title = 'New Swap'
						// var body = getStore().myProfile.first_name + ' ' + getStore().myProfile.last_name
						// 	+ ' just sent you a swap'
						// var answer5 = await getActions().notification.send( 
						// 	answer4, title, body, notifData )
						// var ss = await getActions().swap.getCurrent(response[0].swap_id) 
						// return responseMessage("Your swap was sent")
						
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
						console.log('currentSwap', answer)
						setStore({currentSwap:answer})
					}catch(error){
						console.log("Something went wrong with getting the current swap: ", error)
					}
				},
				// YOU AND OTHER USER CONFIRMS PAYMENT
				paid: async ( a_tournament_id, a_recipient_id, a_swap_id) => {
					try{
						const url = databaseURL + 'users/me/swaps/'+ a_swap_id + '/done'
						let accessToken = getStore().userToken
						let data = {
							tournament_id: a_tournament_id,
							recipient_id: a_recipient_id
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

						var x = await getActions().tracker.getPast()

					}catch(error){
						console.log('Something went wrong with paying a swap: ', error)
					}
				},
				// REMOVES CURRENT SWAP FROM STORE
				removeCurrent: async ( ) => {
					setStore({currentSwap:null})
					console.log('Current Swap in Store: ',getStore().currentSwap )
				},
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
						console.log('Swap Status Change Result:', response)
						
						if(response.message){
							if(response.message.includes("Cannot agree")){
							return errorMessage(response.message)
						}else{null}}

						if (a_current_status == 'incoming'){
							var a = await getActions().swapToken.spend()
						}else{null}

						if (a_current_status == 'counter_incoming'){
							if(a_new_status =='rejected'){
								var a = await getActions().swapToken.return()
							} else{null}
						}else{null}

						if(a_new_status == 'canceled'){
							console.log('repsonse if canceled', response )
							// if(response[1].status == 'counter_incoming'){
								var a = await getActions().swapToken.return()
							// }else{null}
						}
						// var refreshingSwap = await getActions().swap.getCurrent(my_swap_id)
						var refreshingProfile = await getActions().profile.get()
						var refreshingTrackers = await getActions().tracker.getCurrent()
						// var refreshingBuyin = await getActions().swap.getCurrent(my_swap_id)		
						// var refreshingSwap = await getActions().buy_in.getCurrent(a_buyin_id)	
						var refreshingTournament = await getActions().tournament.getCurrent(a_tournament_id)
						var refreshingAction = await getActions().tournament.getAction(a_tournament_id)			
					}
					catch(error){
						console.log("Something went wrong with the swap's status change:",error)
						errorMessage(error.message)
					}
				},
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
						var aaaa = []

						var allInitialTournaments =  initialTournaments.forEach(tournament =>{
							var x, special;
							tournament.day !== null ? 
								x = ' - Day '+ tournament.day : x = ''
							var action =null

							if(tournament.buyin){
								 action = getActions().tournament.retrieveAction(tournament.id)}
							aaaa.push({
								'action': action,
								'name': tournament.tournament + x,
								...tournament
							})
						})
						// var now = moment()
						// var aaaab = aaaa.filter(x => now.isBefore(moment(x.start_at).add(17, 'hours')))
						setStore({tournamentList: aaaa})
						// console.log('tournaments inital', getStore().tournamentList)
					} catch(error) {
						console.log('Something went wrong with getting initial tournaments: ', error)
						return errorMessage(error.message)
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
								 		action = getActions().tournament.retrieveAction(tournament.id)}
						
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
							 var e = await getActions().tournament.retrieveAction(i);
							return e;
						}));
						
						var newTrackerData = trackerData.map((tracker, index)=> {						
							return({
								...tracker,
								action:asyncRes[index]
							})
						})

						setStore({myTrackers: newTrackerData})
						
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
						setStore({myPastTrackers: trackerData})
						// console.log('myPastTrackers', getStore().myPastTrackers)
						
					}catch(error){
						console.log('Something went wrong in getting past trackers: ', error)
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
					} catch(error) {
						console.log("Something went wrong with adding user: ", error)
						return errorMessage(error.message)
					}
				},
				// IF PREVIOUSLY LOGGED IN, USED TO LOGIN AUTOMATICALLY
				auto_login: async(notification, navigation) => {
					try{
						return new Promise(resolve =>
							resolve( getActions().deviceToken.get()
							.then(() => getActions().tournament.getInitial())	
							.then(() => getActions().tracker.getCurrent())
							.then(() => getActions().tracker.getPast())
							.then(() => getActions().notification.check(notification, navigation))
							)
						)
					}catch(error){
						console.log('Something went wrong with auto-login: ', error)
						navigation.navigate('Login')
					}
				},
				// LOGIN PROCESS
				login: async ( myEmail, myPassword, myDeviceID, navigation ) => {
					// 20 DAY EXPIRATION
					var time = (1000*60*60*24*20)
					var data = {
						email: myEmail,
						password: myPassword,
						device_token: myDeviceID,
						exp: time
					};
					// console.log('loginData', data)

					return new Promise(resolve =>
						resolve(getActions().userToken.get(data)
						.then(() => getActions().deviceToken.store(myDeviceID))
						.then(()=> getActions().profile.get())
						.then(()=> myPassword = '')
						.then(()=> {
							if(getStore().userToken){
								if(getStore().myProfile.message !== "Profile not found"){
									getActions().deviceToken.store(myDeviceID)
									.then(() => getActions().tournament.getInitial())
									.then(() => getActions().tracker.getCurrent())
									.then(() => getActions().tracker.getPast())
									.then(() => navigation.navigate('Swaps'))
								} else { 
									navigation.navigate('ProfileCreation')
								}									
							}else{
								console.log("You did not login");
							}
						})
						.catch((error)=> console.log('Something went wrong in logging in: ', error))
					))
				},
				// LOGOUT FUNCTION
				logout: async( navigation ) => {
					const resetAction = StackActions.reset({
						index: 0,
						actions: [
							NavigationActions.navigate({ routeName: 'Auth' })
					],
					});
					navigation.dispatch(resetAction);
					var ase = await getActions().deviceToken.remove()
					var asss = await getActions().userToken.remove()
					// var asss = await getActions().profile.remove()
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
						return errorMessage(error.message)
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
						return errorMessage(error.message)
					}
					
				},
				// (NOT SURE IF THIS IS USED OR PROFILE/UPLOADPICTURE IS)
				changePicture: async(image) => {

					let accessToken = getStore().userToken;

					const imageURL = databaseURL + '/profiles/image'
					const imageData = new FormData();
						imageData.append("image", {
								uri: image.uri,
								type: image.type,
								name: image.name
						});
						console.log('imageData', imageData)
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
						return(Toast({
							position:'top',
							text:'Profile Picture Changed',
							duration:3000
						}))
						
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
					Toast.show({
						text:response.message,
						position:'top',
						duration:3000,

					})
				
					}catch(error){
						console.log('Something went wrong with forgot password: ', error)
						return errorMessage(error.message)
					}
				}					
			},
			// USER TOKEN ACTIONS
			userToken: {
				get: async( data ) => {
					try{
						const url = databaseURL + 'users/token'

						let response1 = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Content-Type':'application/json'
							}, 
						});

						let res = await response1.json();
						
						if (response1.status >= 200 && response1.status < 300) {
							data.error = "";
							let user = res;
							console.log('userToken is now: ', user, typeof(user))
							getActions().userToken.store(user.jwt);
						} else {
							let error = res;
							getActions().userToken.remove();
							console.log("Something went wrong in getting userToken: ", error, getStore().userToken);
							return errorMessage(error.message)
						}
						
					} catch(error) {
							{() => getActions().userToken.remove()};
							console.log("Email: ", data.email);
							console.log("Password: ", data.password);
							console.log("Error: ", error);
							throw data.error;
					}
				} ,
				// STORES THE TOKEN IN ASYNC STORAGE AND STORE
				store: async( myUserToken ) => {
					try {
						// console.log('userToken',myUserToken)
						setStore({userToken: myUserToken});
						var aaasss = await AsyncStorage.setItem('userToken', myUserToken)
					} catch(error) {
						console.log('Something went wrong in storing userToken: ', error)
					}
				},
				// WHILE LOGGING OUT, REMOVES TOKEN FROM STORE AND ASYNC STORAGE
				remove: async() => {
					try {
						setStore({userToken: null})
						var ann = await AsyncStorage.removeItem('userToken')
						var ss = await  AsyncStorage.getItem('userToken')
						console.log('userToken after logout is: ', ss, getStore().userToken)
					} catch(error) {
						console.log('Something went wrong in removing userToken: ', error)
					}
				},
			},
		}
	}
}

export default getState;