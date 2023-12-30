const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			////////////// MY STORE/STATE //////////////
			userSignedUp: false,
			userLoggedIn: false,
			allowedAccess: false,
			token: "",
			user: ""
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
					// Store token in Session Storage
					sessionStorage.setItem('token', responseData.access_token)
					console.log("sessionStorage:", sessionStorage)

					// Store Token in Store
					setStore({ token: sessionStorage.getItem('token') })
					console.log("store token:", store.token)

					// Change Boolean Value 
					setStore({ userLoggedIn: true })

				} catch (error) {
					console.error(error)
				}
			},

			// PRIVATE AREA ACCESS
			accessPrivateArea: async () => {
				const store = getStore();

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/private", {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": 'Bearer ' + store.token
						}
					})
					console.log("response:", response)

					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText);
					}

					const responseData = await response.json();
					console.log("responseData:", responseData);

					// further actions
					setStore({ allowedAccess: true });
					setStore({ user: responseData.user})
				} catch (error) {
					console.error(error)
				}
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
			// 	const token = sessionStorage.getItem('token')
			// 	if (token && token != '' && token != undefined) {
			// 		setStore({ token: token })
			// 	}
			// 	console.log("current token value in store:", token)
			// },

			// LOGOUT
			logOut: () => {
				const store = getStore();
				sessionStorage.removeItem('token')
				console.log("sessionStorage:", sessionStorage)
				setStore({ token: null })
				console.log("current token value in store:", store.token)
			},
		}
	}
};

export default getState;