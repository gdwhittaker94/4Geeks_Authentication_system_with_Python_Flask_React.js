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
					console.log("login response:", response)

					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}
					const responseData = await response.json()
					// console.log("Access Token:", responseData.access_token)

					// Further actions
					// Store token in Session Storage
					sessionStorage.setItem('token', responseData.access_token)
					console.log("sessionStorage:", sessionStorage)

					// Store Token in Store
					setStore({ token: sessionStorage.getItem('token') })
					// console.log("store token:", store.token)

					// Change Boolean Value 
					setStore({ userLoggedIn: true })
					// console.log("userLoggedIn:", store.userLoggedIn)

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
					console.log("private response:", response)

					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText);
					}

					const responseData = await response.json();
					console.log("private responseData:", responseData);

					// further actions
					setStore({ user: responseData.user})
					console.log("user:", store.user)

					setStore({ allowedAccess: true });
					// console.log("allowedAccess:", store.allowedAccess)
					
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

			// LOGOUT
			logOut: () => {
				const store = getStore();

				sessionStorage.removeItem('token')
				console.log("sessionStorage:", sessionStorage)

				setStore({ token: "" })
				// console.log("store token:", store.token)

				setStore({ userLoggedIn: false })
				// console.log("userLoggedIn:", store.userLoggedIn)
			},
		}
	}
};

export default getState;