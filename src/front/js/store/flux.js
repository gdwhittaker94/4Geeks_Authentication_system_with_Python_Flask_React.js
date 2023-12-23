const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			////////////// MY STORE/STATE //////////////
			userSignedUp: false,

		},
		actions: {
			/////////////// MY FUNCTIONS ///////////////

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
		}
	}
};

export default getState;