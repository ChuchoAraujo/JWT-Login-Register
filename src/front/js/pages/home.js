import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	const holaQue = () => {
		fetch("https://3001-4geeksacade-reactflaskh-nu38xw0twfo.ws-eu94.gitpod.io/api/user/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + localStorage.getItem("token"),
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((result) => {
				console.log(result)
			})
			.catch(error => console.log('error', error));
	}

	return (
		<div className="text-center mt-5">
			<form onSubmit={(e) => e.preventDefault()}>
				<h1>Registro</h1>
				<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
				<button onClick={holaQue} className="btn btn-success">Entrar</button>
			</form>

			<form onSubmit={(e) => e.preventDefault()}>
				<h1>Login</h1>
				<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
				<button onClick={holaQue} className="btn btn-success">Entrar</button>
			</form>

		</div>
	);
};
