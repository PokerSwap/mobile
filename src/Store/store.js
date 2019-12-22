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
						.then(getActions().tournament.getInitial())
					

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
					console.log('lool',buyinList)
					return buyinList
				},

				uploadPhoto: async ( image ) => {

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
				
				add: async ( userName, firstName, lastName, a_hendon ) => {
					
					try{
						
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles'

						let data = {
							nickname: userName,
							first_name: firstName,
							last_name: lastName,
							hendon_url: a_hendon
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

					const data = new FormData();
					
					var url ='https://swapprofit-test.herokuapp.com/profiles/image'
					const accessToken = getStore().userToken.jwt ;
					data.append('image', {
							uri: photo.uri,
							type: photo.type,
        			name: photo.name
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

						if (profileData !== 'User not found'){
							getActions().profile.store(profileData)
						}else{
							console.log('hey noew')
						}

						
					} catch(error){
						console.log('Something went wrong in getting profile', error)
					}
				},

				store: async(profileData) => {
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
						console.log('Something went wrong in removing userToken')
					}
				},

				view: async( a_user_id ) => {
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
				}

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
						
					}catch(error){
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
			
				getSpecific: async ( searchInput ) => {
					try{
						if(searchInput =='') {
							getActions().tournament.getInitial()
						} else{
						const url = "https://swapprofit-test.herokuapp.com/tournaments/" + searchInput;
						const accessToken = getStore().userToken.jwt ;

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let specificTournaments = await response.json()
						
						if (specificTournaments.message == "Tournament not found"){
							setStore({tournaments: null})
						}else{
							setStore({tournaments: specificTournaments})
							console.log('specificData:', specificData)
						}
					}
					} catch(error){

						console.log('something went wrong in tournament.getAction', error)
					}
				
				},

				getInitial: async (page) => {
					try{
						
						const url = 'https://swapprofit-test.herokuapp.com/tournaments/all?page=1+&limit=5'
						const accessToken = getStore().userToken.jwt ;
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						let tournamentData = await response.json()
						var tournaments =  tournamentData.map(function(tournament, i){

							return({
							  ...tournament
							})
						  })
						
						setStore({tournaments: tournaments})
						
					} catch(error){
						console.log('Something went wrong with tournament.getAll', error)
					}
				},

				getUpdated: async(data) => {
					try{

						const url = 'https://swapprofit-test.herokuapp.com/tournaments/all?page=1+&limit=2'
						const accessToken = getStore().userToken.jwt ;
						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						let tournamentData = await response.json()


						var newList = []
						var tournaments = getStore().tournaments.forEach(
							tournament => newList.push(tournament)
						)
						
						setStore({tournaments: b})
						console.log('current tournaments', getStore().tournaments)
					}catch(error){
						console.log('something went wtong with tournamentstoreall',error)}
				},

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
				}

			},

			user: {

				add: async ( an_email, a_password, a_deviceID ) => {

					try{
						const url = 'https://swapprofit-test.herokuapp.com/users'

						const data = {
							email: an_email,
							password: a_password,
							device_token: a_deviceID
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

				auto_login: async(stored_token, navigation) => {

					var data = {
						jwt: stored_token
					}
					
						return new Promise(resolve =>
							resolve(getActions().userToken.store(data)
							.then(()=> getActions().profile.get())
							.then(()=> {
								if(getStore().userToken){
									console.log('FFF',getStore().userToken)
									console.log('RRR',getStore().myProfile)
									if(getStore().myProfile.message !== "User not found" || getStore().myProfile.message !== 'Not enough segments'){
										() => console.log('EEE',getStore().myProfile.message)
										.then(() => getActions().tournament.getInitial())
										.then(() => console.log('Auto Success'))
										.then(() => getActions().tracker.getAll())
										.then(() => navigation.navigate('Swaps'))
									} else { 
										() => navigation.navigate('LogIn')
										console.log('logged in')
									}
								}else{
										console.log("You did not login");
								}
							}
								
						)))
				},

				login: async (your_email, your_password, navigation, loading) => {
            
					var time = (1000*60*60*24*20)

					var data = {
						email: your_email,
						password: your_password,
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

				changeEmail: async ( an_email, a_password, a_new_email ) => {

					let data = {
						email: an_email,
						password: a_password,
						new_email: a_new_email
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

				resetPassword: async( an_email, a_password, a_new_password ) => {

					let data = {
						email: an_email,
						password: a_password,
						new_password: a_new_password
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

				forgotPassword: async( an_email ) => {

					const url = 'https://swapprofit-test.herokuapp.com/users/me/password?forgot=true'

					let data = {
						email: an_email
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
				store: async( user ) => {
					try {
						setStore({userToken: user});
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