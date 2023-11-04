const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			////////////// MY STORE/STATE //////////////
			

			////////////// DEMO STORE/STATE //////////////
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			/////////////// MY FUNCTIONS ///////////////
			createUser: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", {
						method: 'POST',
						body: {
							email: "ss@gmail.com",
							password: "pass123"
						}
					});
					console.log(await response.json())
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
				} catch (error) {
				  console.error('Error:', error);
				}
			},		
				

			////////////// DEMO FUNCTIONS //////////////
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
