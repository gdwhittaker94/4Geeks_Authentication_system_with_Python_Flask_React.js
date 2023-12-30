const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			////////////// MY STORE/STATE //////////////
			userSignedUp: false,
			userLoggedIn: false,
			permissionGranted: false,
			token: "",
		},
		actions: {
			/////////////// MY FUNCTIONS ///////////////

			// LOGIN
			loginUser: async (email, password) => {
				const store = getStore()
				// console.log("login values received:", email, password)

				// fetch
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/login', {
						method: 'POST',
						headers: { 'Content-type': 'application/json' },
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					console.log("response:", response)

					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}
					const responseData = await response.json()
					console.log("Access Token:", responseData.access_token)

					// Further actions
					localStorage.setItem('token', responseData.access_token)
					console.log("localStorage:", localStorage)
					setStore({ userLoggedIn: true })
					// setStore({ token: localStorage.getItem('token') })
					// console.log("store token:", store.token)
				} catch (error) {
					console.error(error)
				}
			},

			// PRIVATE AREA ACCESS
			accessPrivateArea: async () => {
				const storedToken = localStorage.getItem('token');
	   
				const response = await fetch(process.env.BACKEND_URL + "/api/private", {
				   method: 'GET',
				   headers: { 
					 "Content-Type": "application/json",
					 "Authorization": 'Bearer '+ storedToken
				   } 
				})

				if (!response.ok) {
					console.error(response.text)
					throw new Error(response.statusText);
				}
				
				const responseData = await response.json();
				console.log("responseData:", responseData);

				// further actions
				setStore({ permissionGranted: true });
		   },

			// SIGNUP - CREATE NEW USER IN DB
			createUser: async (email, password) => {
				// console.log("values received:", email, password)

				// fetch
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: email,
							password: password
						})
					});
					console.log("response:", response)
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText);
					}
					const responseData = await response.json()
					console.log("responseData:", responseData)

					// further actions
					setStore({ userSignedUp: true });

				} catch (error) {
					console.error(error);
				}
			},

			// TOKEN SYNC 
			// syncTokenFromStorage: () => {
			// 	const token = localStorage.getItem('token')
			// 	if (token && token != '' && token != undefined) {
			// 		setStore({ token: token })
			// 	}
			// 	console.log("current token value in store:", token)
			// },

			// LOGOUT
			logOut: () => {
				localStorage.removeItem('token')
				console.log("localStorage:", localStorage)
				setStore({ token: null })
				console.log("current token value in store:", token)
			},
		}
	}
};

export default getState;