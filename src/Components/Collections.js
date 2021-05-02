import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { getRooms } from "../Services/rooms";
import ChatRoom from "./ChatRoom";

const formatResponse = function (response) {
  try {
    if ("data" in response === false) return [];

    const res = response.data;

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

    return documents;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default function Collections({ firestore, auth }) {
  const [room, setRoom] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleDocument = (document) => {
    setRoom(document.liveUrl);
    console.log("hello", document);
  };

  useEffect(() => {
    getRooms()
      .then((response) => {
        const rooms = formatResponse(response?.data?.data);
        console.log(rooms);
        setDocuments(rooms);
      })
      .catch((err) => {
        console.error(err);
        setDocuments([]);
      });
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
            <div className="rooms-container">
              {documents.map((document) => (
                <div
                  className="room"
                  key={document.liveUrl}
                  onClick={() => handleDocument(document)}
                >
                  <Link to={"rooms/" + document.liveUrl}>
                    <img src={document.thumbnail.high.url} alt="rooms" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}
