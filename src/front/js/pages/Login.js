import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import token from "../../img/token.png"

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
				<Link to={'/private'} className="page-link">
					<p className="mt-3 text-white">
						Go to your private area ➜
					</p>
				</Link>
				<Link to={'/'} className="page-link" onClick={startLogOut}>
					<p className="mt-3 text-white">
						Log out
					</p>
				</Link>
				<div className="d-flex flex-column token-cntr">
					<p className="token-text">Token Status</p>
					{store.token === ""?
					<span className="no-token">[Empty]</span>
					:
					<div className="token-img">
						<img src={token} alt="Gold Token Coin" className="img-fluid"></img>
					</div>
					}
				</div>
			</div>
			:
			<div className="text-center mt-5">
				<h1 className="fw-bold">Login</h1>
				<p>Already have an account? Please log in</p>
				<form onSubmit={startUserLogin} id="loginForm" className="d-flex flex-column align-items-center">
					<label
						htmlFor="email"
						className="fw-bold pb-1"
					>
						Email
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
						Password
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
				{/* SIGN UP */}
				<Link to={'/signup'} className="page-link">
					<p className="mt-3 text-white">
						Create a new account
					</p>
				</Link>
				<div className="d-flex flex-column token-cntr">
					<p className="token-text">Token Status</p>
					{store.token === ""?
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
