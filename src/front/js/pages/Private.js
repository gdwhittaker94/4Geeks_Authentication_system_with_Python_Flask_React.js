import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-5 text-center">
			<h1>Welcome to your Private Page</h1>
			<img src="https://t3.ftcdn.net/jpg/05/81/36/68/360_F_581366810_bNe4QcjrSKUvPaPGQiBsrMl34nwGviuQ.jpg" alt="Cat At The Beach Images"/>
			<hr className="my-4" />
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Log Out
				</span>
			</Link>
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};
