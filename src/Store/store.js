import React, { Component } from 'react'

const getState = ({ getStore, setStore, getActions }) => {
	return {
		
		store: {
			
			user:{
				id:43,
				email:'gherndon5@gmail.com',
				password:'Tryagain5!',
				first_name:'Gabriel',
				last_name:'Herndon',
				hendon:'https://pokerdb.thehendonmob.com/player.php?a=r&n=110693',
				swaps:[ 123, 321, 500 ],
				tournaments:[ 22, 32, 44 ],
				receipts:[ 123, 321, 500 ],
				tokens:[ 110, 111, 112, 113, 114 ]
			},

			tournamentList: [
				{
					id:22,
					full_title:'Sharp Pole Tournament #12',
					title:'SHRPO #12',
					address:'1231 SW 123rd St Hollywood, Fl 33199',
					date:'Sep 13',
					year:'2019',
					buyIn:'$100',
					buyInTime:'9:00AM',
					buyOutTime:'12:00PM',
					users:[]
				}
			],

			mySwaps: [
				{
					offer: 223,
					user_id: 43,
					state:'inactive',
					percent:0,

				}
			],

			myOffers:[
				{
					offer_id: 223,
					tournament_id: 23,
					table: 10,
					seat: 3,
					chips: 5000,
					stillIn:'Yes',
					swap: [ 212, 234, 322 ],
					action: 12
				}
			],

			myReceipts: [
				{
					id: 233,
					date_created: '2019-03-32',
					time_created:'13:12',
					tournament_id: 33,
					url: 'www.lolol.com/2222'
				}
			],

			tokens:[
				{
					id: 12,
					user_id: 0, 
					time_bought:'15:32',
					date_bought: '2019-02-01',
					time_spent: '16:22',
					date_spent: '2019-02-01',
					state: 'bought'
				}
			]
		},

		actions: {
			
			user: {
				
				signup: (an_email, a_password, a_firstName, a_lastName, a_hendon, a_picture) => {},

				login: (an_email, a_password) => {},

				logout: () => {},

				profile: (a_navigation, a_Name) => {	}
			},

			userToken: {

				get: () => {},

				store: () => {},

				remove: () => {}
			},

			swap: {

				add: () => {},

				offer: () => {},

				edit:() => {},
			},
		
			tournament:{

				add: () => {},

				update: () => {},

			},

			receipt:{
				add: () => {},

			},

			token:{

				buy: () => {},

				spend: () => {}

			},
			swap:(navigation, aName) => {
				navigation.navigate('Profile', {
					name: aName,
					state: 'public'
				})
			},


		},
	}
}

export default getState;