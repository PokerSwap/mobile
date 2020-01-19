const getState = ({ getStore, setStore, getActions }) => {
	
	return {

		store: {
			
			// FOR CURRENT TOURNAMENT ACTION
			action: null,

			// CURRENT PROFILE
			myProfile:{},

			// LIVE AND UPCOMING SWAP TRACKER
			myTrackers:[],

			// PAST/WINNINGS SWAP TRACKER
			pastTrackers:[],
			
	  		// OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],

	  		// ALL TOURNAMETS, FILTERED BY FIRST 10 RESULTS
			tournaments:[ ],

			userToken: null

		},

		actions: {
			
			buy_in:{

				add: async ( a_flight_id, a_table, a_seat, some_chips ) => {
					
					try{	
						let accessToken = getStore().userToken.jwt
						const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins'		
						let data = {
							flight_id: a_flight_id,
							table: a_table,
							seat: a_seat,
							chips: some_chips
						}

						let response = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json)
						.then(getActions().tracker.getAll())
						.then(getActions().tournament.getMore())
					

					} catch(error) {
						console.log("Some went wrong in adding a buyin", error)
					}
				},

				edit: async ( a_buyin_id, a_table, a_seat, some_chips, navigation) => {
					
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
						.then(navigation.goBack())
						

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

				uploadPhoto: async ( image ) => {
					
					try {
						const data = new FormData();
						var an_id = await getActions().buy_in.getMostRecent()
						var url ='https://swapprofit-test.herokuapp.com/me/buy_ins/' + an_id + '/image'
						const accessToken = getStore().userToken.jwt ;
						
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
				
					} catch(error) {
						console.log("Something went wrong with uploading buyin photo:", error)
					}
				}

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

			profile:{
				
				add: async ( userName, firstName, lastName, a_hendon_link ) => {
					
					try{
						
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles'

						let data = {
							nickname: userName,
							first_name: firstName,
							last_name: lastName,
							hendon_url: a_hendon_link
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
					} catch(error) {
						console.log("Something went wrong in adding a profile", error)
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
								console.log('error in json',error);
							});
					} catch(error) {
						console.log('Something went wrong with uploading photo:', error)
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

						profileData !== 'User not found' ?	
							getActions().profile.store(profileData)
							:
							console.log('hey noew')

					} catch(error){
						console.log('Something went wrong in getting profile', error)
					}
				},

				store: async( profileData ) => {
					
					try {
						
						setStore({ myProfile: profileData })
						console.log('my profile', getStore().myProfile)
					
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

				counter: async () => {

				},

				statusChange: async ( a_tournament_id, a_recipient_id, is_paid, a_status, a_percentage, a_counter_percentage ) => {
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swaps'
						let accessToken = getStore().userToken.jwt

						let data = {
							tournament_id: a_tournament_id,
							recipient_id: a_recipient_id,
							paid: is_paid,
							status: a_status,
							percentage: a_percentage,
							counter_percentage: a_counter_percentage
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
						console.log(response)

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

					} catch(error){
						console.log('Something went wrong with tournament.get', error)
					}

				},
			
				getInitial: async ( key1, value1, key2, value2 ) => {
					try {

						setStore({tournaments: null})

						var base_url ='https://swapprofit-test.herokuapp.com/tournaments/all?asc=true&limit=8&page=1'
						console.log(key1)
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
						var base_url = 'https://swapprofit-test.herokuapp.com/tournaments/all?page='
						
						var full_url
						key1 !== undefined ?
							key2 !== undefined ?
								full_url = base_url + page + '&' + key1 + '=' + value1 + '&' + key2 + '=' + value2
								:
								full_url = base_url + page + '&' + key1 + '=' + value1
							:
							full_url = base_url

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
						console.log('newData', newData)
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
						
					} catch(error){
						console.log('something went wrong in tracker.getCurrent', error)
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
						setStore({pastTrackers: trackerData})
						
					}catch(error){
						console.log('something went wrong in tracker.getCurrent', error)
					}

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
						console.log(response)


						
					} catch(error) {
						console.log("Something went wrong in user.add", error)
					}
				},

				auto_login: async( navigation ) => {
					return new Promise(resolve =>
							getActions().tournament.getInitial()
							.then(() => getActions().tracker.getAll())
							.then(() => getActions().tracker.getPast())
							.then(() => navigation.navigate('Swaps'))	
					)
				},

				login: async ( myEmail, myPassword, myDeviceID, navigation, loading ) => {
					
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
								if(getStore().myProfile.message !== "User not found" ){
									getActions().tournament.getInitial()
									.then(() => getActions().tracker.getAll())
									.then(() => getActions().tracker.getPast())
									.then(() => loading)
									.then(() => navigation.navigate('Swaps'))
								} else { 
									navigation.navigate('ProfileCreation')
								}
											
							}else{
									console.log("You did not login");
							}
						})
						.catch(()=> console.log('something wehnt wrong in login'))
					))

				},
			
				logout: ( navigation ) => {
					getActions().userToken.remove();
					getActions().profile.remove()
					navigation.navigate("Login")	
				},

				changeEmail: async ( myEmail, myPassword, myNewEmail ) => {

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
					console.log(response)
				},

				resetPassword: async( myEmail, myPassword, myNewPassword ) => {

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
					console.log(response)
				},

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
					console.log(response)
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
					} catch(error) {
						console.log('something went wrong in userToken.store', error)
					}
				},

				// During logout, Removes User Information in the Store
				remove: async() => {
					try {
						setStore({userToken: null})
					} catch(error) {
						console.log('Something went wrong in removing userToken')
					}
				},

			},
		}
	}
}

export default getState;