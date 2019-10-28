import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

import api from "../../services/api";

import Contact from "./Contact";
import Conversation from "./Conversation";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("@wpp: user"));

  const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3333", {
    query: { user: user._id }
  });

  const [contacts, setContacts] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await api.get("/users");
      setContacts(data);
    }
    fetchContacts();
  }, []);

  return localStorage.getItem("@wpp: user") ? (
    <div className="dashboard">
      <div className="dashboard-card">
        <header className="contacts-list">
          <div className="avatar">{user.name[0].toUpperCase()}</div>
        </header>
        <div className="contacts-list">
          {contacts
            .filter(contact => contact._id !== user._id)
            .map(contact => (
              <Contact
                key={contact._id}
                contact={contact}
                activeConversation={activeConversation}
                setActiveConversation={setActiveConversation}
              />
            ))}
        </div>
        <div className="conversation">
          <Conversation
            socket={socket}
            activeConversation={activeConversation}
          />
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}
