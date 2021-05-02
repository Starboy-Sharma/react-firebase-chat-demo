import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { getRooms } from "../Services/rooms";
import ChatRoom from "./ChatRoom";

const formatResponse = function (response) {
  if ("data" in response === false) return [];

  const res = response.data;
  let room_data = [];

  // console.log(res)

  const videoJsons = res.map((item) => {
    return { videoObj: JSON.parse(item.videoJson), liveUrl: item.liveUrl };
  });

  // thumbnail - default, title, livevideourl
  const documents = videoJsons.map((video) => {
    let items = video?.videoObj?.items;

    if (items.length > 0) {
      let document = {
        liveUrl: video.liveUrl,
        title: items[0]?.snippet?.title,
        thumbnail: items[0]?.snippet?.thumbnails,
      };

      return document;
    }
  });
  console.log(documents);
};

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

    getRooms()
      .then((response) => {
        formatResponse(response?.data?.data);
      })
      .catch((err) => console.error(err));

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
