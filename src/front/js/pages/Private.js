import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(true);

	function returnHome() {
		const timeoutId = setTimeout(() => { navigate('/') }, 2000);;
		return () => clearTimeout(timeoutId)
	}

	function startLogOut() {
		actions.logOut()
		setLoggedIn(false)
		setLoading(true)
	}

	useEffect(() => {
		store.userLoggedIn ? actions.accessPrivateArea() : returnHome();
	}, [])

	useEffect(() => {
		store.allowedAccess ? setLoading(false) : null;
	}, [store.allowedAccess])

	return (
		<div className="mt-5 text-center">
			{!store.userLoggedIn &&
				(<h1>Please log in to access this area</h1>)
			}

			{!store.userLoggedIn && loggedIn && loading &&
				(<p>Returning you to the log in page</p>)
			}

			{store.userLoggedIn && loggedIn && loading &&
				(<p>LOADING</p>)
			}

			{loggedIn && !loading &&
				(
					<>
						<h1>Welcome to your Private Page</h1>
						<p>{store.user === undefined ? null : store.user}</p>
						<img src="https://t3.ftcdn.net/jpg/05/81/36/68/360_F_581366810_bNe4QcjrSKUvPaPGQiBsrMl34nwGviuQ.jpg" alt="Cat At The Beach Images" />
						<hr className="my-4" />
						<p className="mt-3">
							<Link to={'/'}>
								Return to log in page
							</Link>
						</p>
						<Link to={'/'} className="mt-3">
							<p onClick={startLogOut}>
								Log Out
							</p>
						</Link>
					</>
				)
			}
		</div>
	);
};