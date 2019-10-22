import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../services/api";

export default function Login({ history }) {
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const { data: user } = await api.post("/users", { name });

    localStorage.setItem("@wpp: user", JSON.stringify(user));

    history.push("/dashboard");
  }

  return localStorage.getItem("@wpp: user") ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="login">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            placeholder="Digite seu nome..."
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
