import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const startUserLogin = (e) => {
		// console.log("pre:", e.target[0].value, e.target[1].value)

		e.preventDefault();
		if (e.target[0].value.trim() === "" || e.target[1].value.trim() === "") {
			alert("Please fill in all fields")
		} else {
			actions.loginUser(e.target[0].value, e.target[1].value);
		}
	}

	function startLogOut() {
		actions.logOut()
	}

	return (
		store.userLoggedIn?
			<div className="text-center mt-5">
				<h1>You are logged in!</h1>
				<p className="mt-3">
					<Link to={'/private'}>
						Go to your private area
					</Link>
				</p>
				<p className="mt-3">
					<Link to={'/'} onClick={startLogOut}>
						Log out
					</Link>
				</p>
			</div>
			:
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

	);
};
