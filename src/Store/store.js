const getState = ({ getStore, setStore, getActions }) => {
	return {

		store: {

      // CURRENT USER
      profile_in_session:{},
      
      // FOR CURRENT TOURNAMENT (or FLIGHTS?)
			buy_ins: [ ],

      // FOR CURRENT TOURNAMENT
			flights:[ ],

      // OTHER PEOPLE'S PROFILES (ON PROFILE VIEW)
			profiles:[ ],
      
      //CURRENT USER'S SWAPS
			swaps:[ ],

			myTournaments:[],

      // ALL TOURNAMETS, FILTERED BY FIRST 10 RESULTS
			tournaments:[ ],

			userToken: null

		},

		actions: {
			
			buy_in:{
				
				add: async ( a_flight_id, some_chips, a_table, a_seat, navigation ) => {
					try{
						
						let accessToken = getStore().userToken.jwt
						const url = 'https://pokerswap.herokuapp.com/buy_ins/me'		
						let data = {
							flight_id: a_flight_id,
							chips: some_chips,
							table: a_table,
							seat: a_seat
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
						.then(getActions().profile.get())
						.then(getActions().tournament.getAll())
						.finally(navigation.navigate('TournamentDashboard'))

					} catch(error) {
						console.log("Some went wrong in buyin.add", error)
					}
				}

			},

			coin:{},

			flight:{

				getAll: async() => {
					const store = getStore();
				}
			},

			profile:{
				
				add: async ( userName, firstName, lastName, a_hendon, profilePic, navigation ) => {
					
					try{
						
						const accessToken = getStore().userToken.jwt;
						const url = 'https://pokerswap.herokuapp.com/profiles'

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
						console.log("Something went wrong in profile.add", error)
					}
				},

				changePicture: async() => {

				},

				get: async () => {
					try{

						const accessToken = getStore().userToken.jwt;
						const url = 'https://pokerswap.herokuapp.com/profiles/me';

						let response = await fetch(url, {
							method:'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let profileData = await response.json()

						setStore({ profile_in_session: profileData })
						console.log('current profile', getStore().profile_in_session)
					} catch(error){
						console.log('Something went wrong in profile.get', error)
					}
				},

				remove: async () => {
					try {
						setStore({profile_in_session: null})
					} catch(error) {
						console.log('Something went wrong in removing userToken')
					}
				}

			},
			
			receipt: {},
			
			swap: {

				add: async ( a_tournament_id, a_recipient_id, a_percentage, navigation ) => {
					
					try{
						const url = 'https://pokerswap.herokuapp.com/swaps/me'
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
						.then(getActions.profile.get())
						.then(navigation.navigate('TourneyLobby'))
						
					}catch(error){
						console.log('Something went wrong with swap.add', error)
					}
				},

				getAll: async() => {

					setStore({ swaps: my_swaps})
				}
			},
		
			tournament:{

				getOne: async ( id ) => {
					try{
						
						const url = 'https://pokerswap.herokuapp.com/tournaments/' + id;
						const accessToken = getStore().userToken.jwt ;

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})
						.then(response => response.json)
						console.log('each tournament', response.json)

					} catch(error){
						console.log('Something went wrong with tournament.get', error)
					}

				},
			
				getAll: async () => {
					try{
						
						const url = 'https://pokerswap.herokuapp.com/tournaments/all'
						const accessToken = getStore().userToken.jwt ;

						let response = await fetch(url, {
							method: 'GET',
							headers: {
								'Authorization': 'Bearer ' + accessToken,
								'Content-Type':'application/json'
							}, 
						})

						let tournamentData = await response.json()
						console.log('response', response)

						setStore({tournaments: tournamentData});
						console.log('current tournaments', getStore().tournaments)
						
					} catch(error){
						console.log('Something went wrong with tournament.getAll', error)
					}
				},

			},

			transaction:{},

			user: {

				add: async ( an_email, a_password ) => {

					try{
						const url = 'https://pokerswap.herokuapp.com/users'

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

				login: async (your_email, your_password, navigation) => {
            
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
								if(getStore().profile_in_session.message != 'User not found' ){
									getActions().tournament.getAll();
										navigation.navigate('Swaps');
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
			
				logout: (navigation) => {
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

					const url = 'https://pokerswap.herokuapp.com/users/me/email'

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

					const url = 'https://pokerswap.herokuapp.com/users/me/password'

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
						const url = 'https://pokerswap.herokuapp.com/users/token'

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