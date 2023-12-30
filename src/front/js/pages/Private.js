import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = props => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function startLogOut() {
		actions.logOut()
	}

	return (
		// hasToken === false? 
		// <>
		// 	<p>You do not have permission to access this page.</p>
		// 	<p> You will now be redirected to the home page</p>
		// </>
		// :
		<div className="mt-5 text-center">
			<h1>Welcome to your Private Page</h1>
			<img src="https://t3.ftcdn.net/jpg/05/81/36/68/360_F_581366810_bNe4QcjrSKUvPaPGQiBsrMl34nwGviuQ.jpg" alt="Cat At The Beach Images"/>
			<hr className="my-4" />
			<p className="mt-3">
				<Link to={'/'}>
					Return to log in page
				</Link>
			</p>
			<p className="mt-3" onClick={startLogOut}>
				<Link to={'/'}>
					Log Out
				</Link>
			</p>
		</div>
	);
};

