
import { Alert } from 'react-native'
import {Toast} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions, NavigationActions } from 'react-navigation';

import moment from 'moment'

var databaseURL = 'https://swapprofit-beta.herokuapp.com/'

var errorMessage = (error) => {
	Toast.show({
		text:error, 
		duration:3000, 
		style:{bottom:90,backgroundColor:'red'}

	})
}

var responseMessage = (response) => {
	Toast.show({
		text:response, 
		duration:3000, 
		style:{bottom:90,backgroundColor:'#008000'}

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
			notificationData: null,

			// LISTS ALL RECIEVED NOTIFICATIONS
			notificationList:[],
			
	  	// OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],

	  	// ALL TOURNAMETS, FILTERED BY FIRST 10 RESULTS
			tournamentList:[],

			// USED TO GET PROFILE AND ACCESS ALL REQUESTS IN THE APP
			userToken: null

		},

		actions: {
			
			buy_in:{

				add: async ( image, a_table, a_seat, some_chips, a_flight_id, a_tournament_id, a_tournament_name, a_tournament_start, navigation) => {
					try{	
						if (image == 3){
							return customMessage('You need to select an image of your buyin ticket')
						}

						if (a_table == '' || a_seat == '' || some_chips == ''){
							return customMessage('You need to fill in all the fields listed')

						}

						var newBuyin

						let accessToken = getStore().userToken
						const imageURL = databaseURL + 'me/buy_ins/flight/'+ a_flight_id +'/image'		

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
							console.log('responseJson',responseJson)
								newBuyin = responseJson;
								console.log('newBuyin',newBuyin)
						})
						.catch((error) => {
							console.log('error in json of image',error);
						});

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
						var aaa = await response.json()
						

						var answer0 = await getActions().tracker.getCurrent()
						var answer1 = await getActions().tournament.getInitial()
						var answer3 = await getActions().tournament.getCurrent(a_tournament_id)
					}catch(error){
						console.log('Something went wrong with busting my buyin', error)
					}
				},

				entry: async( a_buyin_id, a_place, some_cash, a_tournament_id ) => {
					try {
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
						var aaa = await response.json()

						var answer0 = await getActions().tracker.getPast()
						return customMessage('Your place and winnings have been updated.')
						
					}catch(error){
						
					}
				},

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
						console.log('theBuyin', theBuyin)					
						setStore({currentBuyin: theBuyin})
					}catch(error){
						console.log('problem with getting the current buyin:', error)
					}
				},

			},

			deviceToken:{

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

				get: async() => {
					try {
						var storedDeviceToken = await AsyncStorage.getItem('deviceToken')
						setStore({deviceToken: storedDeviceToken})
						console.log('Current Device Token', getStore().deviceToken)
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

			coin:{

				buy: async ( some_coins ) => {
					
					try{
						const accessToken = getStore().userToken;
						const url = databaseURL + '/me/transactions'

						let data = {
							coins: some_coins
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
						console.log('Something went wrong with spending coins', error)
					}
				}

			},

			navigate:{
				toEvent: async(data, navigation) => {
					try {
						var anAction = await getActions().tournament.getAction(data.id);
							theAnswer = await getActions().tournament.getCurrent(data.id);
							var currentTournament = getStore().currentTournament
							answerParams = {
								action: getStore().currentAction,
								tournament: currentTournament.tournament,
								buyins: currentTournament.buyins,
								flights: currentTournament.tournament.flights,
								my_buyin: currentTournament.my_buyin,
								navigation: navigation
							}
					}catch(error){
						console.log("Something went wrong with navigating to event:", error)
					}

				},
				toSwap: async( data, navigation ) => {
					try {

						var gettingBuyin = await getActions().buy_in.getCurrent(data.buyin_id)
						var gettingSwap = await getActions().swap.getCurrent(data.id)
						var gettingTournament = await getActions().tournament.getCurrent(getStore().currentBuyin.tournament_id)
						var labelTime = await getActions().swap.convertTime(getStore().currentSwap.updated_at)
						var answerParams = {
							status: getStore().currentSwap.status,
							swap: getStore().currentSwap,
							buyin: getStore().currentBuyin,
							updated_at: labelTime,
							tournament: getStore().currentTournament
						}

						var navigateAction = NavigationActions.navigate({
							routeName: 'SwapOffer',
							params:  answerParams 
						});

						try{
							navigation.dispatch(navigateAction);
							console.log('did it work')

						} catch(error){
							console.log('cant navigate', error)
						}
 						var answerrr = await getActions().notification.remove();
					}catch(error){
						console.log("Something went wrong with navigating to event:", error)
					}
				}
			},

			notification:{
				
				check: async(navigation) => {
					try {
						var prenotificationData = await AsyncStorage.getItem('notification')
						var notificationData = JSON.parse(prenotificationData)
						console.log('notificationData', notificationData, typeof(notificationData))
						setStore({notificationData: notificationData})

						if(notificationData !== null){

							var type = notificationData.type

							if (type == 'event'){
								getActions().navigate.toEvent(notificationData, navigation)
							}else if(type == 'swap'){
								getActions().navigate.toSwap(notificationData, navigation)
							}else{
								console.log('there was an error in getting notification')
							}

						}else{
							navigation.navigate('SwapDashboard')
							getActions().notification.remove()
		
						}
						
					} catch(error) {
						console.log('nevermind', error)
						getActions().notification.remove()
						navigation.navigate('Login')
					}
					
				},

				remove: async() => {
					var aaa = await AsyncStorage.removeItem('notification')
					setStore({notificationData:null})

				},

			},

			profile:{
			
				add: async ( a_username, firstName, lastName, a_hendon_url, a_Picture ) => {
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

						let response = await fetch(url, {
							method:'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json())
						.then(() => console.log('profile resposen',response))
						
						var aaa = await getActions().profile.uploadPhoto(a_Picture)
						var dec = await getActions().profile.get();

					} catch(error) {
						console.log("Something went wrong in adding a profile", error)
					}
				},

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

				store: async( profileData ) => {
					
					try {
						
						setStore({ myProfile: profileData })
						// console.log('my profile', getStore().myProfile)
					
					} catch (error) {
						console.log('Something went wrong in storing profile', error)
					}
				},

				remove: async () => {
					try {
						setStore({myProfile: null})
					} catch(error) {
						console.log('Something went wrong in removing userToken', error)
					}
				},

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
							return responseJson;
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
			
			swap: {

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

						var gettingProfile = await getActions().profile.get()
						var gettingAllTrackers = await getActions().tracker.getCurrent()
						var gettingAllTrackers = await getActions().tournament.getCurrent(a_tournament_id)		
						var gettingBuyin = await getActions().swap.getCurrent(response.swap_id)		
						var gettingSwap = await getActions().buy_in.getCurrent(a_buyin_id)		

						var answer3 = await getActions().tournament.getAction(a_tournament_id)	
						// var answer4 = await getActions().deviceToken.retrieve(a_recipient_id)
						// var notifData = {
						// 	id: a_tournament_id,
						// 	type: 'swap',
						// 	initialPath: 'SwapDashboard', 
						// 	finalPath: 'SwapOffer'
						// }
						// var title = 'New Swap'
						// var body = getStore().myProfile.first_name + ' ' + getStore().myProfile.last_name
						// 	+ ' just sent you a swap'
						// var answer4 = await getActions().notification.send( 
						// 	answer4, title, body, notifData )
						// var ss = await getActions().swap.getCurrent(response[0].id) 
						return responseMessage("Your swap was sent")
						
					}catch(error){
						console.log('Something went wrong with adding a swap', error)
						return errorMessage(error.message)
					}
				},

				convertTime: async ( swapTime ) => {

					var day_name = swapTime.substring(0,3)
					var startMonth = swapTime.substring(8,11)
					var startDay = swapTime.substring(5,7)
					var startTime = swapTime.substring(16,22)
			
					var startHour = parseInt(swapTime.substring(16,19))
					var startM 
					if (startHour/12 >= 1){
						startM = ' P.M.', startHour%=12
					}  else{
						startM = ' A.M.'
					}
					
					var startDate =  day_name + '. ' + startMonth + '. ' + startDay
					var startTime = startHour + ':' + swapTime.substring(20,22) + startM
					console.log(startDate + ', ' +   startTime)
					return(startDate + ', ' +   startTime)

				},

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
						console.log("SOmething went wrong with getting a swap", error)
					}
				},

				statusChange: async ( a_tournament_id, my_swap_id, a_buyin_id, a_status, a_percentage, a_counter_percentage ) => {
					try{
						const url = databaseURL + 'me/swaps/' + my_swap_id
						let accessToken = getStore().userToken
						let data 
						
						!a_percentage ?
						 	data = { status: a_status }
							: 
							a_counter_percentage ?
								data ={
									status: a_status,
									percentage: a_percentage,
									counter_percentage: a_counter_percentage
								}
								:
								data = {
									status: a_status,
									percentage: a_percentage
								}

							console.log('data',data)

						let response = await fetch(url,{
							method:"PUT",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						console.log('response actually here',response)
						if (a_status == 'canceled'){
							var a = await getActions().coin.spend()
						}else{null}
						var getSwap = await getActions().swap.getCurrent(my_swap_id)
						var getProfule = await getActions().profile.get()
						var getCurrentTrackers = await getActions().tracker.getCurrent()
						var gettingBuyin = await getActions().swap.getCurrent(my_swap_id)		
						var gettingSwap = await getActions().buy_in.getCurrent(a_buyin_id)	
						var getCurrentTournament = await getActions().tournament.getCurrent(a_tournament_id)
						var getCurrentAction = await getActions().tournament.getAction(a_tournament_id)
						// console.log('eee', response.message, typeof(response.message))
						var f
						if (response.message !== undefined){
							return alertMessage(response.message)
						}else if (a_status == 'agreed'){
							f = 'You agreed to this swap offer'
						}else if (a_status == 'pending'){
							f = 'Your swap offer was sent'
						}else if (a_status == 'rejected'){
							f = 'You rejected this swap offer'
						}else if (a_status == 'canceled'){
							f = 'You canceled this swap offer'
						}else if (a_status == 'counter'){
							f = 'You countered this swap offer'
						}else if (a_status == 'agreed'){
						}else if (a_status == 'agreed'){}else{}
						return responseMessage(f)
			
					}
					catch(error){
						console.log('Something went wrong with the staus change of a swap',error)
						errorMessage(error.message)
					}
				},
		
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
						console.log('response why', response)

						var x = await getActions().tracker.getPast()

					}catch(error){
						console.log('Something went wrong with paying a swap', error)
					}
				},
				
				remove: async ( ) => {
					setStore({currentSwap:null})
					console.log('cureent swap in the sotew',getStore().currentSwap )
				}
			},

			time: {
				
				convertShort: async ( time ) => {
					try {
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
						console.log('Converted Small Time of: ' + since)
						
						if (since != 'Just Now'){
							return (since + ' ago')
						}else{
							return(since)
						}
					}catch(error){
						console.log('Something went wrong with converting short time', error)
					}
				},

				convertLong: async ( time ) => {
					try {
						console.log(time)
					}catch(error){
						console.log('Something went wrong with converting long time', error)
					}
				}
			},
		
			tournament:{

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
						console.log('Something went wrong in getting action from a tournament', error)
					}
				},	
				
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
						console.log('Something went wrong in getting action from a tournament', error)
					}
				},	

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
						console.log('Something went wrong with getting currents tournaments', error)
						return errorMessage(error.message)
					}
				},
			
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
							
							aaaa.push({
								'name': tournament.tournament + x,
								...tournament
							})
						})
						// var now = moment()
						// var aaaab = aaaa.filter(x => now.isBefore(moment(x.start_at).add(17, 'hours')))
						setStore({tournamentList: aaaa})
						// console.log('tournaments inital', getStore().tournamentList)
					} catch(error) {
						console.log('Something went wrong with getting initial tournaments', error)
						return errorMessage(error.message)
					}
				},

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
									aaaa.push({
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
						console.log('Something went wrong with getting more tournaments', error)
					}
				},

			},

			tracker: {

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
						console.log('trackerData',trackerData)
						
						var getIds = trackerData.map(tracker => tracker.tournament.id)
						
						const asyncRes = await Promise.all(getIds.map(async (i) => {
							 var e = await getActions().tournament.retrieveAction(i);
							return e;
						}));
						
						var newTrackerData = trackerData.map((tracker, index)=> {						
							return({
								...tracker,
								action:asyncRes[index].actions
							})
						})

						setStore({myTrackers: newTrackerData})
						
					} catch(error){
						console.log('Something went wrong in getting all trackers', error)
					}

				},

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
						console.log('Something went wrong in getting past trackers', error)
					}

				},
				
			},

			user: {

				add: async ( myEmail, myPassword ) => {
					try{
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
						.then(response => response.json())
						console.log('added user',response)

						Toast.show({
							text:response.message,
							position:'top',
							duration:3000
						})
	
					} catch(error) {
						console.log("Something went wrong in adding user", error)
						return errorMessage(error.message)
					}
				},

				auto_login: async(navigation) => {
					try{
						return new Promise(resolve =>
						resolve(
						getActions().deviceToken.get()
						.then(() => getActions().tournament.getInitial())	
						.then(() => getActions().tracker.getCurrent())
						.then(() => getActions().tracker.getPast())
						.then(() => getActions().notification.check(navigation))
							))
					}catch(error){
						console.log('Something went wrong with autologin',error)
						navigation.navigate('Login')
					}
				},

				login: async ( myEmail, myPassword, myDeviceID, navigation ) => {
					console.log('myEmail', myEmail)
					// 20 DAY EXPIRATION
					var time = (1000*60*60*24*20)
					// console.log('deviceID', deviceID)
					var data = {
						email: myEmail,
						password: myPassword,
						// device_token: myDeviceID,
						device_token: 'lol',
						exp: time
					};

					console.log('loginData', data)

					return new Promise(resolve =>
						resolve(getActions().userToken.get(data)
						.then(() => getActions().deviceToken.store(myDeviceID))

						.then(()=> getActions().profile.get())
						.then(()=> myPassword = '')
						.then(()=> {
							if(getStore().userToken){
								if(getStore().myProfile != 'error' && getStore().myProfile){
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
						.catch((error)=> console.log('Something went wrong in logging in', error))
					))

				},
			
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
						console.log('changeMeail',response)
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
						console.log('change password', response)
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
						console.log('Something went wrong with changing your password', error)
						return errorMessage(error.message)
					}
					
				},

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
							console.log('responseJson',responseJson)
						})
						.catch((error) => {
							console.log('error in changing json',error);
						});
						var errew = await getActions().profile.get()
						return(Toast({
							position:'top',
							text:'Profile Picture Changed',
							duration:3000
						}))
						
				},

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
						console.log('Something went wrong with forgot password', error)
						return errorMessage(error.message)
					}
				}					
			},

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
							console.log('userToken: ', user, typeof(user))
							getActions().userToken.store(user.jwt);
						} else {
							let error = res;
							getActions().userToken.remove();
							console.log("Something went wrong in getting userToken", error, getStore().userToken);
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

				// During Login, Stores User Information in the Store
				store: async( myUserToken ) => {
					try {
						console.log('userToken',myUserToken)
						setStore({userToken: myUserToken});
						var aaasss = await AsyncStorage.setItem('userToken', myUserToken)
					} catch(error) {
						console.log('Something went wrong in storing userToken', error)
					}
				},

				// During logout, Removes User Information in the Store
				remove: async() => {
					try {
						setStore({userToken: null})
						var ann = await AsyncStorage.removeItem('userToken')
						var ss = await  AsyncStorage.getItem('userToken')
						console.log('userToken after logout is', ss, getStore().userToken)
					} catch(error) {
						console.log('Something went wrong in removing userToken')
					}
				},

			},
		}
	}
}

export default getState;