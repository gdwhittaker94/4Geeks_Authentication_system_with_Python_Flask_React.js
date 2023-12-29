import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const startUserLogin = (e) => {
		// console.log("pre", e.target[0].value, e.target[1].value)
		e.preventDefault();
		actions.loginUser(e.target[0].value, e.target[1].value)
	}

	useEffect(() => {
		store.userLoggedIn === true? navigate('/private') : null;
		store.userLoggedIn = false;
	}, [store.userLoggedIn])

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
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
			{/* BACK TO SIGN UP */}
			<p className="mt-3">
				Or <Link to={'/'}>
					Return to Sign Up
				</Link>
			</p>
		</div>
	);
};
