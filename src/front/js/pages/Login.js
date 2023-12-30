import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const startUserLogin = (e) => {
		console.log("pre", e.target[0].value, e.target[1].value)
		e.preventDefault();
		if(e.target[0].value.trim() === "" || e.target[1].value.trim() === ""){
			alert("Please fill in all fields")
		} else {
			actions.loginUser(e.target[0].value, e.target[1].value);
			// actions.accessPrivateArea()
		}
		return
	}

	// useEffect(() => {
	// 	store.userLoggedIn === true? navigate('/private') : null;
	// 	store.userLoggedIn = false;
	// }, [store.userLoggedIn])

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<p>Already have an account? Please log in</p>
			<form onSubmit={startUserLogin} id="loginForm">
			<label
				htmlFor="email"
				className="me-1"
			>
				Email:
			</label>
			<input
				type="text"
				id="email"
				name="email"
				className="my-3"
			/>
			<br></br>
			<label
				htmlFor="password"
				className="me-1"
			>
				Password:
			</label>
			<input
				type="password"
				id="password"
				name="password"
				className="mb-3"
			/>
			<br></br>
			<input
				type="submit"
				value="Submit"
			/>
		</form>
		{/* SIGN UP */}
		<Link to={'/signup'}>
			<p className="mt-3">
				Or create an account here 
			</p>
		</Link>
		</div>


		// ----------------------------------------
	// 	store.token && store.token !='' && store.token != undefined? 
	// 	<div className="text-center mt-5">
	// 		<h1>Login</h1>
	// 		<p>You are already logged in</p>
	// 		<p className="mt-3">
	// 			<Link to={'/private'}>
	// 				Go to your private area
	// 			</Link>
	// 		</p>
	// 		{/* BACK TO SIGN UP */}
	// 		<p className="mt-3">
	// 			Or 
	// 			<br></br>
	// 			<Link to={'/'}>
	// 				Return to Home Page
	// 			</Link>
	// 		</p>
	// 	</div>
	// 	:
	// 	<div className="text-center mt-5">
	// 	<h1>Login</h1>
		
		
	// </div>
		
	);
};
