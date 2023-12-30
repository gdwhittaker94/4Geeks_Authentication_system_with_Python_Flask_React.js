import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	function startCreateUser(e) {
		e.preventDefault();

		// console.log(e.target[0].value, e.target[1].value)

		if (e.target[0].value.trim() === "" || e.target[1].value.trim() === "") {
			alert("Please fill in all fields")
		} else {
			actions.createUser(e.target[0].value, e.target[1].value);
		}
	}

	useEffect(() => {
		store.userSignedUp === true? alert("User Successfully Created") : null;
		store.userSignedUp = false;
		navigate('/')
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
				Or <Link to={'/'}>
					Login Here
				</Link>
			</p>
		</div>
	);
};
