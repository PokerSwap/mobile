import {Toast} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { StackActions, NavigationActions } from 'react-navigation';


const getState = ({ getStore, setStore, getActions }) => {
	
	return {

		store: {
			
			// FOR CURRENT TOURNAMENT ACTION
			action: null,

			// CURRENT PROFILE
			myProfile:{},

			// LIVE AND UPCOMING SWAP TRACKER
			myTrackers:[],

			// FOR MOST RECENT NOTIFICATION, TO GO TO PAGE
			notificationData: null,

			// LISTS ALL RECIEVED NOTIFICATIONS
			notificationList:[],

			// PAST/WINNINGS SWAP TRACKER
			myPastTrackers:[],

			myWinningsTrackers:[],
			
	  	// OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],

	  	// ALL TOURNAMETS, FILTERED BY FIRST 10 RESULTS
			tournaments:[],

			// USED TO GET PROFILE AND ACCESS ALL REQUESTS IN THE APP
			userToken: null

		},

		actions: {
			
			buy_in:{

				add: async ( image, a_flight_id, a_tournament_id, navigation) => {
					try{	
						
						if (image == 3){
							return Toast.show({
								text:'You need to select a photo of your buyin ticket before submitting',
								position:'top', 
								duration:3000
							})
						}
						let accessToken = getStore().userToken.jwt
						const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins/flight/'+ a_flight_id +'/image'		
						const data = new FormData();
												
						data.append('image', {
								uri: image.uri,
								type: image.type,
								name: image.name
						});
						console.log('wee', data)
			
						var postData = {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: data,
						}
				
						let response = await fetch(url, postData)
						.then(response => response.json())
						.then((responseJson) => {
							console.log('responseJson',responseJson);
							return responseJson;
						})
						.catch((error) => {
							console.log('error in json',error);
						});


						

						var a2 = await getActions().tracker.getAll()
						var a3 = await getActions().tournament.getInitial()
						var action = await getActions().tournament.getAction(a_tournament_id)
						var tournament = await getActions().tournament.getOne(a_tournament_id)
						console.log('tournament', tournament)


						var a5 = await navigation.push('TourneyLobby', {
							action: action,
							tournament_id: tournament.id,
							name: tournament.name,
							address: tournament.address,
							city: tournament.city,
							state: tournament.state,
							longitude: tournament.longitude,
							latitude: tournament.latitude,
							start_at: tournament.start_at,
							buy_ins: tournament.buy_ins,
							swaps: tournament.swaps,
							flights: tournament.flights,
							navigation: navigation
						})
					

					} catch(error) {
						console.log("Some went wrong in adding a buyin", error)
						// return(Toast.show({
						// 	text:'Sorry, you need to enter all fields correctly',
						// 	duration:3000,
						// 	position:'top'}))
					}
				},

				edit: async ( a_buyin_id, a_table, a_seat, some_chips) => {
					
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins/' + a_buyin_id
						let accessToken = getStore().userToken.jwt

						let data = {
							chips: some_chips,
							table: a_table,
							seat: a_seat
						}

						let response = await fetch(url, {
							method: 'PUT',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json)
						.then(getActions().tracker.getAll())
						

					}catch(error){
						console.log('Something went wrong with editing a buyin', error)
					}
				},

				getMostRecent: async() => {
					
					try {
						const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins/'
						let accessToken = getStore().userToken.jwt
	
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						
						let buyinList = await response.json()
						return buyinList
					
					} catch(error) {
						console.log('Something went wrong with getting most recent buyin:', error)
					}
				},

				// uploadPhoto: async ( image ) => {
					
				// 	try {
				// 		const data = new FormData();
				// 		var an_id = await getActions().buy_in.getMostRecent()
				// 		var url ='https://swapprofit-test.herokuapp.com/me/buy_ins/' + an_id + '/image'
				// 		const accessToken = getStore().userToken.jwt ;
						
				// 		data.append('Image', {
				// 				uri: image.uri,
				// 				type: image.type,
				// 				name: image.name
				// 		});
				// 		console.log('wee', data)

				
				// 		let response = await fetch(url, {
				// 			method: 'PUT',
				// 			headers: {
				// 				'Content-Type': 'multipart/form-data',
				// 				'Authorization': 'Bearer ' + accessToken,
				// 			},
				// 			body: data,
				// 		})

				// 		.then(response => response.json())
				// 		.then((responseJson) => {
				// 			console.log('responseJson',responseJson);
				// 			return responseJson;
				// 		})
				// 		.catch((error) => {
				// 			console.log('error in json',error);
				// 		});
				
				// 	} catch(error) {
				// 		console.log("Something went wrong with uploading buyin photo:", error)
				// 	}
				// }

			},

			coin:{

				buy: async (some_dollars, some_coins) => {
					
					try{
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/users/me/transaction'

						let data = {
							dollars: some_dollars,
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
						console.log('something went wrong with buying tokens', error)
					}
				},
				
				spend: async() => {
					
					try{
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/users/me/transaction'

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
						.then(response => response.json)
						.then(() => getActions().profile.get())

					}catch(error){
						console.log('something went wrong with spending coins', error)
					}
				}

			},

			notification:{
				
				check: async(navigation) => {
					var prenotificationData = await AsyncStorage.getItem('notification')
					var notificationData = JSON.parse(prenotificationData)
					console.log('notificationData', notificationData, typeof(notificationData))
					setStore({notificationData: notificationData})

					if(notificationData !== null){

						var id = notificationData.id
						var type = notificationData.type
						var initialPath = notificationData.initialPath
						var finalPath = notificationData.finalPath
	
						var theAnswer
						var answerParams;
						if (type == 'tournament') {
							theAnswer = await getActions().tournament.getOne(id)
							answerParams = {
									action: getStore().action,
									tournament_id: theAnswer.id,
									name: theAnswer.name,
									address: theAnswer.address,
									city: theAnswer.city,
									state: theAnswer.state,
									longitude: theAnswer.longitude,
									latitude: theAnswer.latitude,
									start_at: theAnswer.start_at,
									buy_ins: theAnswer.buy_ins,
									swaps: theAnswer.swaps,
									flights: theAnswer.flights
							}
						} else if(type == 'swap'){
							theAnswer = await getActions().swap.getOne(id)
							answerParams = {
								buyin_id: theAnswer.buyin.id,
								user_id: theAnswer.buyin.user_id,
								user_name: theAnswer.buyin.user_name, 
								table: theAnswer.buyin.table,
								seat: theAnswer.buyin.seat,
								chips: theAnswer.buyin.chips,

								swap_id: theAnswer.swap.id,
								status: theAnswer.swap.status,
								percentage: theAnswer.swap.percentage,
								counter_percentage: theAnswer.swap.counter_percentage,
								swap_updated_at: theAnswer.swap.updated_at,

								tournament_name: theAnswer.tournament.name,
								tournament_id: theAnswer.tournament.id,
								address: theAnswer.tournament.address,
								city: theAnswer.tournament.city,
								state: theAnswer.tournament.state,
								start_at: theAnswer.tournament.start_at,
							}
						} else if(type == 'winnings'){
							console.log('under construction')
						} else{
							console.log('so what now?')
						}
	
						var tournamentz = getStore().notificationData;
						console.log('tournamentz', tournamentz, typeof(tournamentz))
	
						var action = await getActions().tournament.getAction(id);
						var answer4 = console.log('answer', tournamentz)
						console.log('action', action)
						
						const navigateAction = NavigationActions.navigate({
							routeName: initialPath,
							params: {},				
							action: StackActions.push({ 
								routeName: finalPath,
								params: answerParams
							 }),
						});
						navigation.dispatch(navigateAction);
						getActions().notification.remove()
					}else{
						navigation.navigate('Swaps')
						getActions().notification.remove()
	
					}
				},

				getList: async() => {
					// setStore({notificationList:data})
				},

				remove: async() => {
					var aaa = await AsyncStorage.removeItem('notification')
					setStore({notificationData:null})

				}
			},

			profile:{
				
				add: async ( nickName, firstName, lastName, a_hendon_url, a_Picture ) => {
					
					try{
						
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles'

						let data = {
							nickname: nickName,
							first_name: firstName,
							last_name: lastName,
							hendon_url: a_hendon_url
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
						
						var aaa = await getActions().profile.uploadPhoto(a_Picture)


					} catch(error) {
						console.log("Something went wrong in adding a profile", error)
					}
				},

				get: async () => {
					try{

						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles/me';

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let profileData = await response.json()
						console.log('progile data', profileData)
						profileData !== 'User not found' ?	
							getActions().profile.store(profileData)
							:
							console.log('this means you couldnt store your profile')

					} catch(error){
						console.log('Something went wrong in getting profile', error)
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

				uploadPhoto: async ( photo ) => {
					try {
						const url ='https://swapprofit-test.herokuapp.com/profiles/image'
						const accessToken = getStore().userToken.jwt ;
						const data = new FormData();

						data.append('image', {
							uri: photo.uri,
							type: photo.type,
							name: photo.name
						});
						
						const postData = {
							method: 'PUT',
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': 'Bearer ' + accessToken,
							},
							body: data,
						}
				
						let response = await fetch(url, postData)
							.then(response => response.json())
							.then((responseJson) => {
								console.log('responseJson',responseJson);
								return responseJson;
							})
							.catch((error) => {
								console.log('error in json of profile pic',error);
							});
					} catch(error) {
						console.log('Something went wrong with uploading photo:', error)
					}
				},

				view: async( a_user_id ) => {
					
					try {
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles/'+ a_user_id

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

				add: async ( a_tournament_id, a_recipient_id, a_percentage, navigation ) => {
					
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swaps'
						let accessToken = getStore().userToken.jwt

						let data = {
							tournament_id: a_tournament_id,
							recipient_id: a_recipient_id,
							percentage: a_percentage
						}

						let response = await fetch(url,{
							method:"POST",
							body: JSON.stringify(data),
							headers:{
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}
						})
						.then(response => response.json())
						.then(getActions().profile.get())
						.then(navigation.navigate('TourneyLobby'))
						
					}catch(error){
						console.log('Something went wrong with swap.add', error)
					}
				},

				counter: async () => {},

				statusChange: async ( my_swap_id, a_status, a_percentage ) => {
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swaps/' + my_swap_id
						let accessToken = getStore().userToken.jwt
						console.log('the url', my_swap_id)
						let data 
						
						a_percentage == undefined ?
						 	data = {
								status: a_status,
							}
							:
							data = {
								status: a_status,
								percentage: a_percentage
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
						console.log('statuschange',response)
						var aaa = await getActions().tournament.getInitial()
						var ddd = await getActions().tracker.getAll()
						return(
							Toast.show({
								text:'You swapped with XX',
								duration:3000,
								position:'top'
							})
						)

					}
					catch(error){
						console.log('Something went wrong with swap.statusChange',error
					)}
				},
		
				paid: async ( a_tournament_id, a_recipient_id, is_paid, navigation) => {
					try{
						const url = 'https://swapprofit-test.herokuapp.com/users/me/swaps/4/done'
						let accessToken = getStore().userToken.jwt

						let data = {
							tournament_id: a_tournament_id,
							recipient_id: a_recipient_id,
							paid: is_paid
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

					}catch(error){
						console.log('something went wrong with swap.paid', error)
					}
				}
			},
		
			tournament:{

				getAction: ( tournament_id ) => {
					try{

						const url = "https://swapprofit-test.herokuapp.com/swaps/me/tournament/" + tournament_id;
						const accessToken = getStore().userToken.jwt ;

						fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json())
						.then(data => setStore({action: data})
					)
					} catch(error){
						console.log('something went wrong in tournament.getAction', error)
					}
				},

				getOne: async ( tournament_id ) => {
					
					try{
		
						const url = 'https://swapprofit-test.herokuapp.com/tournaments/' + tournament_id;
						const accessToken = getStore().userToken.jwt ;

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						return response.json()

					} catch(error){
						console.log('Something went wrong with tournament.get', error)
					}

				},
			
				getInitial: async ( key1, value1, key2, value2 ) => {
					try {

						setStore({tournaments: null})

						var base_url ='https://swapprofit-test.herokuapp.com/tournaments/all?asc=true&limit=8&page=1'
						var full_url
						key1 !== undefined ?
							key2 !== undefined ?
								full_url = base_url + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2
								:
								full_url = base_url + '&' + key1 + '=' + value1
							:
							full_url = base_url

						console.log('full url', full_url)
						const accessToken = getStore().userToken.jwt ;
						
						let response = await fetch(full_url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						var initialTournaments = await response.json()
						
						setStore({tournaments: initialTournaments})
						console.log('initialTournametns:',getStore().tournaments)
					} catch(error) {
						console.log('something went wrong with getting initial tournaments', error)
					}
				},

				getMore: async ( page, key1, value1, key2, value2 ) => {

					try{
						var base_url = 'https://swapprofit-test.herokuapp.com/tournaments/all?asc=true&limit=8&page='
						
						var full_url
						key1 !== undefined ?
							key2 !== undefined ?
								full_url = base_url + page + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2
								:
								full_url = base_url + page + '&' + key1 + '=' + value1
							:
							full_url = base_url + page

						console.log('full updated url', full_url)
						const accessToken = getStore().userToken.jwt ;
						let response = await fetch(full_url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						let newData = await response.json()
						// console.log('newData', newData)
						var tournamentData = getStore().tournaments
						newData != [] ?
							newData.forEach(tournament => tournamentData.push(tournament))
							:
							console.log('No more tournaments')
						setStore({tournaments: tournamentData})
						console.log('tournaments',getStore().tournaments)
					} catch(error){
						console.log('Something went wrong with to', error)
					}
				},

			},

			tracker: {

				getAll: async() => {
					
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swap_tracker'
						let accessToken = getStore().userToken.jwt

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()
						setStore({myTrackers: trackerData})
						console.log('currnetTackers', trackerData)
						
					} catch(error){
						console.log('something went wrong in tracker.getAll', error)
					}

				},

				getPast: async() => {
					
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swap_tracker?history=true'
						let accessToken = getStore().userToken.jwt

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let trackerData = await response.json()
						setStore({myPastTrackers: trackerData})
						console.log('myPastTrackers', getStore().myPastTrackers)
						
					}catch(error){
						console.log('something went wrong in trackerpast', error)
					}

				},

				getWinnings: async() => {

				}
				
			},

			user: {

				add: async ( myEmail, myPassword ) => {

					try{
						const url = 'https://swapprofit-test.herokuapp.com/users'

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


						
					} catch(error) {
						console.log("Something went wrong in user.add", error)
					}
				},

				auto_login: async(navigation) => {
					try{
						return new Promise(resolve =>
						resolve(getActions().tournament.getInitial()
						.then(() => getActions().tracker.getAll())
						.then(() => getActions().tracker.getPast())
						.then(() => getActions().notification.check(navigation))
							))
					}catch(error){
						console.log('Something went wrong with autologin',error)
						navigation.navigate('Login')
					}
				},

				login: async ( myEmail, myPassword, myDeviceID, navigation ) => {
					
					// 20 DAY EXPIRATION
					var time = (1000*60*60*24*20)

					var data = {
						email: myEmail,
						password: myPassword,
						device_token: myDeviceID,
						exp: time
					};

					return new Promise(resolve =>
						resolve(getActions().userToken.get(data)
						.then(()=> getActions().profile.get())
						.then(()=> your_password = '')
						.then(()=> {
							if(getStore().userToken){
								if(getStore().myProfile.message !== "Profile not found" ){
									getActions().tournament.getInitial()
									.then(() => getActions().tracker.getAll())
									.then(() => getActions().tracker.getPast())
									.then(() => navigation.navigate('Swaps'))
								} else { 
									navigation.navigate('ProfileCreation')
								}
											
							}else{
								console.log("You did not login");
							}
						})
						.catch((error)=> console.log('something wehnt wrong in login', error))
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
	
						let accessToken = getStore().userToken.jwt;
	
						const url = 'https://swapprofit-test.herokuapp.com/users/me/email'
	
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
						console.log('Something went wrong with changing email', error)
						Toast.show({
							text:error.message,
							position:'top',
							duration:3000,
						})
					}
					
				},

				changePassword: async( myEmail, myPassword, myNewPassword, navigation ) => {
					try {
						let data = {
							email: myEmail,
							password: myPassword,
							new_password: myNewPassword
						}
	
						let accessToken = getStore().userToken.jwt;
	
						const url = 'https://swapprofit-test.herokuapp.com/users/me/password'
	
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
						console.log('Something went wrong with changing password', error)
						return(Toast.show({
							text:error.message,
							position:'top',
							duration:3000,

						}))
					}
					
				},

				changePicture: async() => {},

				forgotPassword: async( myEmail ) => {

					const url = 'https://swapprofit-test.herokuapp.com/users/me/password?forgot=true'

					let data = {
						email: myEmail
					}

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
				}
			},

			userToken: {

				get: async( data ) => {
					try{
						const url = 'https://swapprofit-test.herokuapp.com/users/token'

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
							getActions().userToken.store(user);
						} else {
							let error = res;
							getActions().userToken.remove();
							console.log("something went wrong in userToken.get", error, getStore().userToken);
							Toast.show({
								position:'top',
								text:error.message,
								duration:3000
							})
							return false;
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
						setStore({userToken: myUserToken});
						console.log('userToken saved',myUserToken, typeof(myUserToken))
						var aaasss = await AsyncStorage.setItem('loginToken', myUserToken.jwt)
					} catch(error) {
						console.log('something went wrong in userToken.store', error)
					}
				},

				// During logout, Removes User Information in the Store
				remove: async() => {
					try {
						setStore({userToken: null})
						var ann = await AsyncStorage.removeItem('loginToken')
					} catch(error) {
						console.log('Something went wrong in removing userToken')
					}
				},

			},
		}
	}
}

export default getState;