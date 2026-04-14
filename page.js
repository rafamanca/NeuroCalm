'use client'
import React, { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi, I'm NeuroCalm 🌿 How are you feeling?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", text: data.reply }]);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>NeuroCalm 🌿</h1>
      <div style={{ height: 400, overflowY: "scroll", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.role}:</b> {m.text}</div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
