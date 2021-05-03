import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import SignIn from "./Components/SignIn";
import SignOut from "./Components/SignOut";
import Collections from "./Components/Collections";

import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqhtfjDvHQAzOv4iZ-gNirwoWdaoTxVPY",
  authDomain: "react-firebase-chat-demo-70656.firebaseapp.com",
  projectId: "react-firebase-chat-demo-70656",
  storageBucket: "react-firebase-chat-demo-70656.appspot.com",
  messagingSenderId: "645258239117",
  appId: "1:645258239117:web:a691a7967c34d4262a16c4",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.database();
// const analytics = firebase.analytics();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut auth={auth} />
        <a href="/" className="home">
          Home
        </a>
      </header>

      <section>
        {user ? (
          <Collections firestore={firestore} auth={auth} />
        ) : (
          <SignIn auth={auth} />
        )}
      </section>
    </div>
  );
}

export default App;
