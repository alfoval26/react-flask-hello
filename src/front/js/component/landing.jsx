import React from "react";
import { Link } from "react-router-dom";

export function LandingPage () {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{minHeight:"85vh"}}>
            <div className="container d-flex align-items-center justify-content-evenly flex-column">
                <h1>
                    Demo Landing Page
                </h1>
                <img className="rounded" src="https://jwt.io/img/logo-asset.svg" alt="JWT Auth Logo" width="600" height="200" style={{objectFit:"none"}}></img>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <h5 className="m-3">¿Eres nuevo en la plataforma?</h5>
                    <Link to="/signup">
                        <button type="button" className="btn btn-dark">Registrar Nuevo Usuario</button>
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <h5 className="m-3">¿Ya tienes una cuenta?</h5>
                    <Link to="/login">
                        <button type="button" className="btn btn-dark">Iniciar Sesión</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}