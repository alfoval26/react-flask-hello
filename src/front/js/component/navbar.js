import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context)
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{minHeight:"7.5vh"}}>
			<div className="container">
				<Link to="/" style={{textDecoration:"none"}}>
					<span className="navbar-brand mb-0 h1">Home Page</span>
				</Link>
				<div className="ml-auto">
					{
						!store.jwt_token ?
							<Link to="/login">
								<button className="btn btn-light">Iniciar Sesión</button>
							</Link>
						:
							<Link to="/login">
								<button onClick={actions.removeToken} className="btn btn-light">Cerrar Sesión</button>
							</Link>
							
					}
				</div>
			</div>
		</nav>
	);
};