import React from "react";

export default function Conversation() {
  return (
    <>
      <header>
        <div className="avatar">LT</div>
        <span>Lucas Teixeira</span>
      </header>
      <div className="content">
        <div className="receiver">
          <span className="message">Olá, tudo bom com você?</span>
          <span className="time">8:00</span>
        </div>
        <div className="sender">
          <span className="message">Oi, tudo bom com você?</span>
          <span className="time">8:00</span>
        </div>
      </div>
      <div className="input">
        <form>
          <input type="input" placeholder="Digite uma mensagem" />
          <button type="submit" className="dn" />
        </form>
      </div>
    </>
  );
}
