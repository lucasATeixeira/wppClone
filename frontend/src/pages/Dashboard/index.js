import React from "react";
import Contact from "./Contact";
import Conversation from "./Conversation";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="contacts-list">
          <Contact />
          <Contact />
          <Contact />
        </div>
        <div className="conversation">
          <Conversation />
        </div>
      </div>
    </div>
  );
}
