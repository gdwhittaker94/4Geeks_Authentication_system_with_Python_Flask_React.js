import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<form action="/private">
				<label htmlFor="email" className="me-1">Email:</label>
				<input type="text" id="email" name="email" className="my-3"/><br></br>
				<label htmlFor="password" className="me-1">Password:</label>
				<input type="password" id="password" name="password" className="mb-3"/><br></br>
				<input type="submit" value="Submit" onClick={actions.createUser}/>
			</form>
			<Link to={'/'}>
				<button className="btn btn-primary mt-3">Back to Sign Up Page</button>
			</Link>
			{/* <div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div> */}
		</div>
	);
};
