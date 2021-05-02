import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ChatRoom from "./ChatRoom";

export default function Collections({ firestore, auth }) {
  const [room, setRoom] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleDocument = (document) => {
    setRoom(document.name);
    console.log("hello", document);
  };

  useEffect(() => {
    const res = [
      {
        id: 1,
        name: "messages",
      },
      {
        id: 2,
        name: "messages1",
      },
      {
        id: 3,
        name: "messages2",
      },
      {
        id: 4,
        name: "messages3",
      },
    ];

    setDocuments(res);
  }, []);

  return (
    <>
      <BrowserRouter>
        {room ? (
          <Switch>
            <Route path="/rooms/:name">
              <ChatRoom firestore={firestore} auth={auth} collection={room} />
            </Route>
          </Switch>
        ) : (
          <div className="collections">
            <h2> Choose Rooms </h2>
            <ul>
              {documents.map((document) => (
                <li key={document.id} onClick={() => handleDocument(document)}>
                  <Link to={"rooms/" + document.name}>{document.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}
