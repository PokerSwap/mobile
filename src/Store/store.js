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
				tokens: 32
			},

			tournamentList: [
				{
					id:22,
					date_created: 'Feb 1, 2019 9:00AM',
					date_modified: 'Feb 9, 2019 8:00AM',
					status:'completed',
					full_title:'Sharp Pole Tournament #12',
					title:'SHRPO #12',
					address:'1231 SW 123rd St Hollywood, Fl 33199',
					date:'Sep 13',
					year:'2019',
					buyIn:'$100',
					swaps:[33,43,34]
				}
			],


			mySwaps:[
				{
					name:'Gabe',
					receipt_id: 23,
					tournament_id: 23,
					table: 10,
					seat: 3,
					chips: 5000,
					action: 5,
					stillIn:'Yes',
					winnings:3333,
					exhanges: [ 212, 234, 322 ]
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