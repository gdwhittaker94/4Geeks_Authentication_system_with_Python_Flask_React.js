import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Create User</h1>
			<form action="/signup" id="signupForm">
				<label htmlFor="email" className="me-1">Email:</label>
				<input type="text" id="email" name="email" className="my-3"/><br></br>
				<label htmlFor="password" className="me-1">Password:</label>
				<input type="password" id="password" name="password" className="mb-3"/><br></br>
				<input type="submit" value="Submit" onClick={actions.createUser()}/>
			</form>
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
