const getState = ({ getStore, setStore, getActions }) => {
	return {

		store: {
			
			// FOR CURRENT TOURNAMENT ACTION
			action: null,

			// CURRENT PROFILE
			my_profile:{},

			// CURRENT PROFILE
			my_trackers:[],
			
      // OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profileView:[ ],

      // ALL TOURNAMETS, FILTERED BY FIRST 10 RESULTS
			tournaments:[ ],

			userToken: null

		},

		actions: {
			
			buy_in:{

				// get: async() => {
				// 	try {
				// 		const id = getStore().my_profile.id
				// 		console.log('id',id)
				// 		const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins/' + id
				// 		const accessToken = getStore().userToken.jwt ;
				// 		let response = await fetch(url, {
				// 			method: 'GET',
				// 			headers: {
				// 				'Authorization': 'Bearer ' + accessToken,
				// 				'Content-Type':'application/json'
				// 			}, 
				// 		})
				// 		let buyinList = await response.json()
				// 		console.log('e', buyinList)
				// 		getActions().buy_in.store(buyinList)

				// 	} catch (error) {
				// 		console.log('some went wrong with getting buyins:', error)
				// 	}
				// },
				
				// store: async(buyin_data) => {
				// 	try {
				// 		setStore({my_buyins: buyin_data})
				// 		console.log('My Buyins:', getStore().my_buyins)
				// 	} catch (error) {
				// 		console.log('some went wrong with storing buyins:', error)
				// 	}
				// },

				add: async ( a_flight_id, a_table, a_seat, some_chips, navigation ) => {
					
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
						.then(getActions().buy_in.get())
						.then(getActions().tournament.getAll())
						.finally(navigation.navigate('TournamentDashboard'))

					} catch(error) {
						console.log("Some went wrong in adding a buyin", error)
					}
				},

				edit: async ( a_flight_id, a_table, a_seat, some_chips, navigation) => {
					try{
						
						const url = 'https://swapprofit-test.herokuapp.com/me/buy_ins/' + a_flight_id
						let accessToken = getStore().userToken.jwt

						let data = {
							id: a_flight_id,
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
						.then(getActions().buy_in.get())
						.then(navigation.goBack())
						

					}catch(error){
						console.log('Something went wrong with editing a buyin', error)
					}
				}

			},

			coin:{},

			profile:{
				
				add: async ( userName, firstName, lastName, a_hendon, profilePic, navigation ) => {
					
					try{
						
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles'

						data = {
							username: userName,
							first_name: firstName,
							last_name: lastName,
							hendon_url: a_hendon,
							profile_pic_url: profilePic
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
						getActions().profile.get()
						getActions().tournament.getAll()
						navigation.navigate('LogIn')
					} catch(error) {
						console.log("Something went wrong in adding a profile", error)
					}
				},

				changePicture: async() => {

					try{
						const accessToken = getStore().userToken.jwt;
						const url = 'https://swapprofit-test.herokuapp.com/profiles/me/image'

						let response = await fetch(url, {
							method: 'PUT',
							body: JSON.stringify(data),
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => resppnse.json)

					}catch(error){
						console.log('Something went wrong with changing the profile picture', error)
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

						getActions().profile.store(profileData)
					} catch(error){
						console.log('Something went wrong in getting profile', error)
					}
				},

				store: async(profileData) => {
					try {
						setStore({ my_profile: profileData })
						console.log('my profile', getStore().my_profile)
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
						setStore({my_trackers: trackerData})
						
					}catch(error){
						console.log('something went wrong in tracker.getCurrent', error)
					}

				}
				
			},

			swap: {

				// get: async() => {
				// 	try {
				// 		const url = 'https://swapprofit-test.herokuapp.com/me/swaps'
				// 		const accessToken = getStore().userToken.jwt ;
				// 		let response = await fetch(url, {
				// 			method: 'GET',
				// 			headers: {
				// 				'Authorization': 'Bearer ' + accessToken,
				// 				'Content-Type':'application/json'
				// 			}, 
				// 		})
				// 		let buyinList = response.json()

				// 	} catch (error) {
				// 		console.log('some went wrong with getting swaps:', error)
				// 	}
				// },

				// store: async(buyin_data) => {
				// 	try {
				// 		setStore({my_buyins: buyin_data})
				// 		console.log('My Buyins:', getStore(my_buyins))
				// 	} catch (error) {
				// 		console.log('some went wrong with storing buyins:', error)
				// 	}
				// },

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

				statusChange: async ( a_tournament_id, a_recipient_id, is_paid, a_status, a_percentage, navigation ) => {
					try{
						const url = 'https://swapprofit-test.herokuapp.com/me/swaps'
						let accessToken = getStore().userToken.jwt

						let data = {
							tournament_id: a_tournament_id,
							recipient_id: a_recipient_id,
							paid: is_paid,
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

					}
					catch(error){
						console.log('Something went wrong with swap.statusChange'
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
					// 	.then(response => response.json)
					// 	.then(data => console.log('DATA',data))
						// console.log('each tournament', response.json)

					} catch(error){
						console.log('Something went wrong with tournament.get', error)
					}

				},
			
				getSpecific: async ( searchInput ) => {
					try{
						if(searchInput =='') {
							getActions().tournament.getAll()
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

				getAll: async () => {
					try{
						
						const url = 'https://swapprofit-test.herokuapp.com/tournaments/all'
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
						
						getActions().tournament.storeAll(tournaments)
						
					} catch(error){
						console.log('Something went wrong with tournament.getAll', error)
					}
				},

				storeAll: async(data) => {
					try{
						setStore({tournaments: data})
						console.log('current tournaments', getStore().tournaments)
					}catch(error){
						console.log('something went wtong with tournamentstoreall',error)}
				},

				getAction: ( tournament_id ) => {
					// return new Promise((resolve, reject) => 
					// {
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
							.then(data => {
								setStore({action: data})
								// resolve(data)
							})
							
	
							// console.log('action:', response.json)
	
							// console.log('what:', getStore().action.swaps)
	
						} catch(error){
							console.log('something went wrong in tournament.getAction', error)
						}
					// })

				}
			},

			user: {

				add: async ( an_email, a_password ) => {

					try{
						const url = 'https://swapprofit-test.herokuapp.com/users'

						data = {
							email: an_email,
							password: a_password
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
								if(getStore().my_profile.message != 'User not found' ){
									
										getActions().tournament.getAll()
										.then(() => getActions().tracker.getAll())
										.then(() => loading)
										.then(() => navigation.navigate('Swaps'))
								;
								} else { 
									navigation.navigate('ProfileCreation');
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

				forgotPassword: async( an_email, a_password, a_new_password ) => {

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