import React from "react";

export default function Login() {
  return (
    <div className="login">
      <div className="login-card">
        <form>
          <label htmlFor="name">Nome</label>
          <input id="name" placeholder="Digite seu nome..." type="text" />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}
