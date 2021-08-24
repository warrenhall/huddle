import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/header/header";
import { google } from "calendar-link";

const apiUrl =
  "https://huddle-b2842-default-rtdb.europe-west1.firebasedatabase.app/huddles.json";

function getID() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function googleCalendarLink() {
  const event = {
    title: "My birthday party",
    description: "Be there!",
    start: "2019-12-29 18:00:00 +0100",
    duration: [3, "hour"],
  };

  // Then fetch the link
  console.log(google(event));
}

export default function Huddles() {
  const [huddles, setHuddles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Is Loading
    setIsLoading(true);
    // Fetch Huddles
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        let huddleArray = [];
        try {
          for (const [id, huddle] of Object.entries(data)) {
            const huddleTime = new Date(huddle.datetime);
            console.log(huddle.datetime);
            huddleArray.push({
              id: huddle.id,
              name: huddle.name,
              description: huddle.description,
              date: huddleTime.toDateString(),
              time: huddleTime.toLocaleTimeString(),
              duration: huddle.duration,
            });
          }
        } catch (error) {
          console.error(error);
        }
        setHuddles(huddleArray);
        setIsLoading(false);
      });
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        {!isLoading &&
          huddles.map((huddle) => (
            <div className="card" key={huddle.id}>
              <h4>{huddle.name}</h4>
              <em>{huddle.description}</em>
              <span className="huddle-pill" onClick={googleCalendarLink()}>
                {huddle.date} - {huddle.time}
              </span>
              <br /><br />
              <Link href="/huddles/rsvp/1">
                <a className="button">RSVP</a>
              </Link>
            </div>
          ))}
      </div>
    </Fragment>
  );
}
