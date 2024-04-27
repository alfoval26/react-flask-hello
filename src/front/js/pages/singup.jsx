import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export function SignupPage() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signUpName = event.target.elements.signUpName.value;
    const signUpEmail = event.target.elements.signUpEmail.value;
    const signUpPassword = event.target.elements.signUpPassword.value;
    const signUpData = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    };
    console.log(signUpData);

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
        method: "POST",
        body: JSON.stringify(signUpData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 201) {
        alert("Usuario creado con exito");
        const body = await response.json();
        console.log(body);
        navigate("/login");
      } else {
        alert("Se produjo un error en la creacion de usuario");
        throw new Error(response.status);
      }
    } catch (error) {
      console.log("Estatus de error: ", error);
    }
  };

  useEffect(() => {
    if (store.jwt_token) navigate("/private");
  }, []);

  return (
    <div
      className="container d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: "85vh" }}
    >
      <h2>Registro de Usuario</h2>
      <img
        className="mb-4 mt-1"
        src="https://cdn-icons-png.flaticon.com/512/3534/3534124.png"
        alt="JWT Auth Logo"
        width="100"
        height="100"
        style={{ objectFit: "contain" }}
      ></img>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="signUpName" className="form-label">
            Nombre y Apellido
          </label>
          <input
            type="text"
            className="form-control"
            id="signUpName"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpEmail" className="form-label">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="signUpEmail"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signUpPassword" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="signUpPassword"
            required
          />
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button type="submit" className="btn btn-dark">
            Crear usuario
          </button>
        </div>
      </form>
    </div>
  );
}
