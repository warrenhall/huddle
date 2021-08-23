import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
  console.log(google(event))
}

export default function Huddles() {
  const router = useRouter();
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
              description: huddle.name,
              datetime: huddleTime.toLocaleString(),
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <br />
          <br />
          <div className="column">
            <h3>Huddles</h3>
          </div>
        </div>

        {huddles.map((huddle) => (
          <p key={huddle.id}>
            {huddle.name} at {huddle.description}
            {huddle.name}, description: {huddle.name},
            <span className="huddle-pill" onClick={googleCalendarLink()}>{huddle.datetime}</span>
          </p>
        ))}
      </div>
    </Fragment>
  );
}
