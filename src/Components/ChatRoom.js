import React, { useRef, useState, useEffect } from "react";

import ChatMessage from "./ChatMessage";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

function ChatRoom({ firestore, auth, collection }) {
  const dummy = useRef();
  const messagesRef = firestore.ref(collection);

  useEffect(() => {
    messagesRef.on("value", (snapshot) => {
      let chats = [];
      snapshot.forEach((snap) => {
        chats.push(snap.val());
      });
      console.log(chats);
      setMessages(chats);
    });
  }, []);

  const [formValue, setFormValue] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.push({
      text: formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} auth={auth} message={msg} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
