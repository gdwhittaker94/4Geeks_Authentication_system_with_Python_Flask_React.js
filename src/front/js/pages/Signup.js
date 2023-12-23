import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

// Get the body for the POST Request 
// Make the create user request
// when the user signs up handle the Response message
// if successfull navigate to your login page

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function startCreateUser(e) {
		// console.log(e.target[0].value, e.target[1].value)
		e.preventDefault();
		actions.createUser(e.target[0].value, e.target[1].value);
	}

	useEffect(() => {
		store.userSignedUp === true? navigate('/login') : null;
		store.userSignedUp = false;
	}, [store.userSignedUp])

	return (
		<div className="text-center mt-5">
			<h1>Create User</h1>
			{/* FORM */}
			<form onSubmit={startCreateUser} id="signupForm">
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
			{/* LOGIN ALTERNATIVE */}
			<p className="mt-3">
				Or <Link to={'/Login'}>
					Login Here
				</Link>
			</p>
			{/* <div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div> */}
		</div>
	);
};
