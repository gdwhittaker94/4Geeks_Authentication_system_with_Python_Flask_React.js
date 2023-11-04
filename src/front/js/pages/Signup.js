import React, { useContext } from "react";
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

	function change(e) {
		console.log(e.target.value)
	}

	async function handleClick(e) {
		e.preventDefault();
		await actions.createUser()
		//if(data.status === 200) {
		//	navigate("/Login")	
		// }
	}

	return (
		<div className="text-center mt-5">
			<h1>Create User</h1>
			<form onSubmit={handleClick} id="signupForm">
				<label htmlFor="email" className="me-1">Email:</label>
				<input type="text" id="email" name="email" className="my-3" onChange={change}/>
				<br></br>
				<label htmlFor="password" className="me-1">Password:</label>
				<input type="password" id="password" name="password" className="mb-3" onChange={change}/>
				<br></br>
				<input type="submit" value="Submit"/>
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
