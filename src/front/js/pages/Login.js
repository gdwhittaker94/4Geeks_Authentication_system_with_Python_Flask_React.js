import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const startUserLogin = (e) => {
		console.log(e.target[0].value, e.target[1].value)
		e.preventDefault();
	}

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
