import React, { Component } from 'react'

const getState = ({ getStore, setStore, getActions }) => {
	return {
		
		store: {
			
			buy_ins: [
				{
					id: 1,
					user_id: 1,
					flight_id: 1,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 2,
					user_id: 1,
					flight_id: 1,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 3,
					user_id: 2,
					flight_id: 1,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 4,
					user_id: 2,
					flight_id: 2,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 5,
					user_id: 3,
					flight_id: 1,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 6,
					user_id: 3,
					flight_id: 3,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 7,
					user_id: 3,
					flight_id: 4,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id: 8,
					user_id: 3,
					flight_id: 5,
					receipt_img_url: "http://lorempixel.com/400/200/",
					swaps:[ 1, 2 ],
					action: 12,
					bullet: 0,
					still_in: true,
					table: 23,
					seat: 4,
					current_chips: 10000,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				}
			],

			flights:[
				{
					id: 1,
					start_at: "Wed, 11 Oct 2019 16:00:00 GMT",
					end_at: "Wed, 11 Oct 2019 21:00:00 GMT",
					tournament_id: 1,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [1,2,3,5]
				},
				{
					id: 2,
					start_at: "Wed, 11 Oct 2019 16:00:00 GMT",
					end_at: "Wed, 11 Oct 2019 21:00:00 GMT",
					tournament_id: 1,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [4]
				},
				{
					id: 3,
					start_at: "Mon, 30 Sep 2019 12:00:00 GMT",
					end_at: "Mon, 30 Sep 2019 21:00:00 GMT",
					tournament_id: 2,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [6]
				},
				{
					id: 4,
					start_at: "Tue, 1 Oct 2019 12:00:00 GMT",
					end_at: "Tue, 1 Oct 2019 21:00:00 GMT",
					tournament_id: 2,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [7]
				},
				{
					id: 5,
					start_at: "Wed, 11 Oct 2019 12:00:00 GMT",
					end_at: "Wed, 11 Oct 2019 16:00:00 GMT",
					tournament_id: 3,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [8]
				},
			],

			profiles:[
				{
					id: 1,
					first_name: "Cary",
					last_name: "Katz",
					username: "KAT",
					email: "katz234@gmail.com",
					hendon_url: "https://pokerdb.thehendonmob.com/player.php?a=r&n=26721",
					profile_picture_url: "https://pokerdb.thehendonmob.com/pictures/carykatzpic.png",
					transactions: "list of transactions",
					created_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					updated_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					tokens: 12,
					swaps: [1,2,3,4],
					buy_ins: [1,2]
				},
				{
					id: 2,
					first_name: "Kate",
					last_name: "Hoang",
					username: "Qwang",
					email: "hoang234@gmail.com",
					hendon_url: "https://pokerdb.thehendonmob.com/player.php?a=r&n=421758",
					profile_picture_url: "https://pokerdb.thehendonmob.com/pictures/Hoang_2.jpg",
					transactions: "list of transactions",
					created_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					updated_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					tokens: 0,
					swaps: [5,6,7],
					buy_ins: [3,4]
				},
				{
					id: 3,
					first_name: "Nikita",
					last_name: "Bodyakovskiy",
					username: "Mikita",
					email: "bodyakov@gmail.com",
					hendon_url: "https://pokerdb.thehendonmob.com/player.php?a=r&n=159100",
					profile_picture_url: "https://pokerdb.thehendonmob.com/pictures/NikitaBadz18FRh.jpg",
					transactions: "list of transactions",
					created_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					updated_at: "Tue, 17 Sep 2019 04:23:59 GMT",
					tokens: 5,
					swaps: [8,9,10,11],
					buy_ins: [5,6,7,8]
				}
			],
			
			swaps:[
				{
					id:1,
					tournament_id: 1,
					sender_id: 1,
					recipient_id: 2,
					percentage: 5,
					state:'pending',
					winning_chips: null,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:2,
					tournament_id: 1,
					sender_id: 2,
					recipient_id: 1,
					percentage: 5,
					state:'recieved',
					winning_chips: null,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:3,
					tournament_id: 1,
					sender_id: 2,
					recipient_id: 3,
					percentage: 10,
					state:'rejected',
					winning_chips: null,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:4,
					tournament_id: 1,
					sender_id: 3,
					recipient_id: 2,
					percentage: 10,
					state:'rejected',
					winning_chips: null,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:5,
					tournament_id: 2,
					sender_id: 1,
					recipient_id: 3,
					percentage: 12,
					state:'pending',
					winning_chips: null,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
			
				{
					id:6,
					tournament_id: 2,
					sender_id: 2,
					recipient_id: 1,
					percentage: 3,
					winning_chips: 1000,
					state:'agreed',
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:7,
					tournament_id: 2,
					sender_id: 1,
					recipient_id: 2,
					percentage: 3,
					winning_chips: 300,
					state:'agreed',
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:8,
					tournament_id: 3,
					sender_id: 2,
					recipient_id: 3,
					percentage: 20,
					state:'agreed',
					winning_chips: 500,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:9,
					tournament_id: 3,
					sender_id: 3,
					recipient_id: 2,
					percentage: 20,
					state:'agreed',
					winning_chips: 0,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:10,
					tournament_id: 3,
					sender_id: 1,
					recipient_id: 3,
					percentage: 16,
					state: 'agreed',
					winning_chips: 500,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				},
				{
					id:11,
					tournament_id: 3,
					sender_id: 3,
					recipient_id: 1,
					percentage: 16,
					state:'agreed',
					winning_chips: 600,
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07"
				}
			]
			,

			tokens:[
				{
					id:1,
					token:'s3224323edtvc44c',
					expires_at:'2021-01-01T15:30:00+0400',
					user_id:1,
					created_at:'2020-01-01T15:30:00+0400',
					updated_at:'2020-01-01T18:30:00+0400',
				}
			],

			tournaments:[
				{
					id: 1,
					name: "Heartland Poker Tour - HPT Colorado, Black Hawk",
					abbreviation: 'HPT Col. BH #19',
					venue:'Golden Gates Casino',
					address: "261 Main St, Black Hawk, CO 80422",
					start_at: "Wed, 11 Oct 2019 12:00:00 GMT",
					end_at: "Wed, 11 Oct 2019 21:00:00 GMT",
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [ 1, 2, 3, 4 ],
					flights: [ 1, 2 ]
				},
				{
					id: 2,
					name: "Stones Live Fall Poker Series",
					abbreviation: 'SLFPS 2019',
					venue:'Stones Gambling Hall',
					address: "6510 Antelope Rd, Citrus Heights, CA 95621",
					start_at: "Mon, 30 Sep 2019 11:00:00 GMT",
					end_at: "Tue, 1 Oct 2019 22:00:00 GMT",
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [ 5, 6 , 7 ],
					flights: [ 3, 4 ]
				},
				{
					id: 3,
					name: "WPT DeepStacks - WPTDS Sacramento",
					abbreviation: 'WPTDS S 2019',
					venue:'Thunder Valley Casino Resort',
					address: "1200 Athens Ave, Lincoln, CA 95648",
					start_at: "Wed, 2 Oct 2019 12:00:00 GMT",
					end_at: "Wed, 2 Oct 2019 21:00:00 GMT",
					created_at: "Mon, 16 Sep 2019, 14:55:32",
					updated_at: "Tue, 17 Sep 2019, 22:44:07",
					buy_ins: [ 8, 9, 10, 11 ],
					flights: [ 5 ]
				}
			],

			transactions:[
				{
					id:1,
					amount_in_coins:0,
					amount_in_dollars:1,
					user_id:1,
					created_at:'2020-01-02T15:30:00+0400',
					updated_at:'2020-01-02T16:30:00+0400'
				}
			],

			users:{
				id:1,
				email: 'gherndon5@hotmail.com',
				password:'lol',
				created_at:'2020-01-01T12:00:00+0400',
				updated_at:'2020-01-01T12:06:00+0400'
			},

		},

		actions: {
			
			buy_in:{

				add: ( userID, flightID, receiptURL ) => {

				},

				update: () => {

				}
			},

			flights:{
				
				add: ( tournamentID, startTime, endTime ) => {

				},

				update: ( tournamentID, startTime, endTime ) => {

				}
			},

			profile:{
				
				add: ( userID, firstName, lastName, hendonURL, pictureURL ) => {

				},

				get: () => {

				},

				getAll: () => {

				},

				update: ( firstName, lastName, hendonURL, pictureURL ) => {

				}
			},
			
			
			// (navigation, aName) => {
			// 	navigation.navigate('Profile', {
			// 		name: aName,
			// 		state: 'public'
			// 	})
			// },

			receipt:{

				add: () => {

				},

			},
			
			swap: {

				add: () => {

				},

				getAll: () => {

				}

			},
		
			tournament:{

				add: ( a_name, an_address, startTime, endTime ) => {

				},

				get: ( id ) => {

				},

				getAll: () => {

				},

				update: ( a_name, an_address, startTime, endTime ) => {

				},

			},

			token:{

				buy: () => {

				},

				spend: () => {

				}

			},

			transactions:{

				add: ( user, dollars, coins ) => {

				}

			},

			user: {
				
				delete:( id )=>{
				},

				get:( id )=>{

				},

				login: ( an_email, a_password ) => {

				},

				logout: () => {

				},

				signup: ( an_email, a_password, a_firstName, a_lastName, a_hendon, a_picture ) => {

				},

				update: ( id, an_email, a_password ) => {

				}

			},

			userToken: {

				get: async( data ) => {
					try{
						const url = 'https://assets.breatheco.de/apis/credentials/auth'
						let response1 = await fetch(url, {
							method: 'POST',
							body: JSON.stringify(data),
							headers: {
								'Authorization':'application/json',
								'Content-Type':'application/json'
							}, 
						});
						// console.log(response)
						let res = await response1.json();
						if (response1.status >= 200 && response1.status < 300) {
							data.error = "";
							let user = res;
							console.log('userToken: ', user, typeof(user))
							getActions().userToken.store(user);
						} else {
							let error = res;
							console.log("something went wrong in getting userToken", error, getStore().userToken);
							return false;
							throw error;
						}
						
					} catch(error) {
						{() => getActions().userToken.remove()};
						console.log("Email: ", data.username);
						console.log("Password: ", data.password);
						console.log("Error: ", error);
						throw data.error;
					}
				} ,

				// During Login, Stores User Information in the Store
				store: async( user ) => {

					try {
						// console.log('userToken in store funvtion: ', user, typeof(user))

						setStore({userToken: user});
						// console.log('userToken in store gerneral: ', getStore().userToken)

					} catch(error) {
						console.log('something went wrong in storing userToken', error)
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

		},
	}
}

export default getState;