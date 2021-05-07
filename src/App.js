import React from "react";
import "./App.css";

import Home from "./Components/Home";
import ChatRoom from "./Components/ChatRoom";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
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
