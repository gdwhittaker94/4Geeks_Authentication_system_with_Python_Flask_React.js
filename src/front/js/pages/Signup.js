import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import token from "../../img/token.png"

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
		store.userSignedUp === true ? (alert("User Successfully Created"), navigate('/')) : null;
		store.userSignedUp = false;
	}, [store.userSignedUp])

	// console.log("store userLoggedIn:", store.userLoggedIn)

	return (
		<div className="text-center mt-5">
			<h1 className="fw-bold">Create User</h1>
			{/* FORM */}
			<form onSubmit={startCreateUser} id="signupForm" className="d-flex flex-column align-items-center">
				<label
					htmlFor="email"
					className="fw-bold pb-1"
				>
					Email:
				</label>
				<input
					type="text"
					id="email"
					name="email"
					className="text-center rounded-pill border border-light bg-warning-subtle ps-2"
				/>
				<br></br>
				<label
					htmlFor="password"
					className="fw-bold pb-1"
				>
					Password:
				</label>
				<input
					type="password"
					id="password"
					name="password"
					className="text-center rounded-pill border border-light bg-warning-subtle ps-2"
				/>
				<br></br>
				<input
					type="submit"
					value="Submit"
					className="fw-bold text-white bg-black border border-light rounded-2 px-2 py-1 submit-button"
				/>
			</form>
			{/* LOGIN ALTERNATIVE */}
			<Link to={'/'} className="page-link">
				<p className="mt-3 text-white">
					Back to Login
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
	);
};
