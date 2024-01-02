import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import token from "../../img/token.png"

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
		// setLoggedIn(false)
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
				(
					<>
						<p>Returning you to the log in page</p>
						<div className="d-flex flex-column token-cntr">
							<p className="token-text">Token Status</p>
							{store.token === "" ?
								<span className="no-token">[Empty]</span>
								:
								<div className="token-img">
									<img src={token} alt="Gold Token Coin" className="img-fluid"></img>
								</div>
							}
						</div>
					</>
				)
			}

			{store.userLoggedIn && loggedIn && loading &&
				(
					<>
						<span className="loader"></span>
						<div className="d-flex flex-column token-cntr">
							<p className="token-text">Token Status</p>
							{store.token === "" ?
								<span className="no-token">[Empty]</span>
								:
								<div className="token-img">
									<img src={token} alt="Gold Token Coin" className="img-fluid"></img>
								</div>
							}
						</div>
					</>
				)
			}

			{loggedIn && !loading &&
				(
					<div className="d-flex flex-column align-items-center gap-1">
						<h1>Welcome to your Private Page</h1>
						<p>{store.user === undefined ? null : store.user}</p>
						<div className="img-cntr">
							<img
								src="https://t3.ftcdn.net/jpg/05/81/36/68/360_F_581366810_bNe4QcjrSKUvPaPGQiBsrMl34nwGviuQ.jpg"
								alt="Cat At The Beach Images"
								className="img-fluid border border-white rounded-1"
							/>
						</div>
						<Link to={'/'} className="page-link page-link2">
							<p className="mt-3 text-white fw-bold">
								Return to Login Page
							</p>
						</Link>
						<Link to={'/'} className="page-link page-link2" onClick={startLogOut}>
							<p className="mt-2 text-white fw-bold">
								Log Out
							</p>
						</Link>
						<div className="d-flex flex-column token-cntr">
							<p className="token-text">Token Status</p>
							{store.token === "" ?
								<span className="no-token">[Empty]</span>
								:
								<div className="token-img">
									<img src={token} alt="Gold Token Coin" className="img-fluid"></img>
								</div>
							}
						</div>

					</div>
				)
			}
		</div>
	);
};