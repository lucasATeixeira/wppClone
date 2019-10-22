import React, { useState, useEffect } from "react";
import moment from "moment";
import io from "socket.io-client";

import api from "../../services/api";

export default function Conversation({ activeConversation }) {
  const user = JSON.parse(localStorage.getItem("@wpp: user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newMessage) return;

    const { data } = await api.post(
      `users/${activeConversation._id}/conversations`,
      { message: newMessage },
      { headers: { user_id: user._id } }
    );

    setMessages(messages => [...messages, data]);
    setNewMessage("");
  }

  useEffect(() => {
    const socket = io(
      process.env.REACT_APP_API_URL || "http://localhost:3333",
      {
        query: { user: user._id }
      }
    );

    socket.on("message", message => {
      if (!activeConversation) return;
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.sender === activeConversation._id) {
        setMessages(messages => [...messages, parsedMessage]);
      }
    });
  }, [activeConversation, user]);

  useEffect(() => {
    async function fetchConversation() {
      const { data } = await api.get(
        `/users/${activeConversation._id}/conversations`,
        { headers: { user_id: user._id } }
      );
      setMessages(data);
    }

    if (activeConversation) {
      fetchConversation();
    }
  }, [activeConversation, user._id]);

  return activeConversation ? (
    <>
      <header className="conversation">
        <div className="avatar">{activeConversation.name[0].toUpperCase()}</div>
        <div className="user-informations">
          <span className="name">{activeConversation.name}</span>
          <span className="status">
            Visto por último{" "}
            {moment(activeConversation.lastSeen).format("DD/MM/YYYY")} às{" "}
            {moment(activeConversation.lastSeen).format("HH")}:
            {moment(activeConversation.lastSeen).format("mm")}
          </span>
        </div>
      </header>
      <div className="content">
        {messages.map(message => (
          <div
            key={message._id}
            className={`card-message ${
              message.receiver === user._id ? "receiver" : "sender"
            }`}
          >
            <span className="message">{message.message}</span>
            <span className="time">8:00</span>
          </div>
        ))}
      </div>
      <div className="footer">
        <form onSubmit={handleSubmit}>
          <input
            type="input"
            placeholder="Digite uma mensagem"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button type="submit" className="dn" />
        </form>
      </div>
    </>
  ) : (
    <div className="no-conversation"></div>
  );
}
