import React from "react";

export default function Contact({
  contact,
  setActiveConversation,
  activeConversation
}) {
  function handleActiveConversation() {
    setActiveConversation(contact);
  }

  return (
    <div
      onClick={handleActiveConversation}
      className={`contact ${activeConversation === contact ? "active" : ""}`}
    >
      <div className="user-informations">
        <div className="avatar">{contact.name[0].toUpperCase()}</div>
        <div className="name-message">
          <span className="name">{contact.name}</span>
          <p className="last-message">
            Olá, coloando muitas mensagens para ver como vai ficar quando eu ver
            quantas palavras tiverem ali
          </p>
        </div>
      </div>
      <span className="last-seen">8:00</span>
    </div>
  );
}
