import React from "react";
import "./App.css";

import Home from "./Components/Home";
import ChatRoom from "./Components/ChatRoom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// import SignIn from "./SignIn";
// import SignOut from "./SignOut";

// import { useAuthState } from "react-firebase-hooks/auth";

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

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <h1>⚛️🔥💬</h1>
          {/* <SignOut auth={auth} /> */}
          <Link to="/" className="home">
            Home
          </Link>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home firestore={firestore} auth={auth} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/rooms/:id">
            <ChatRoom firestore={firestore} auth={auth} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
