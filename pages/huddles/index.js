import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const apiUrl =
  "https://huddle-b2842-default-rtdb.europe-west1.firebasedatabase.app/huddles.json";

function getID() {
  return "_" + Math.random().toString(36).substr(2, 9);
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
            console.log(huddle.datetime)
            huddleArray.push({
              id:huddle.id,
              name: huddle.name,
              description: huddle.name,
              datetime: huddleTime.toString(),
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
    <div class="container">
      <div className="row">
        <br />
        <br />
        <div className="column">
          <h3>Huddles</h3>
        </div>
        <div className="column">
          <a class="button" onClick={() => router.push("/huddles/create")}>
            Create Huddle
          </a>
        </div>
      </div>

      {huddles.map((huddle) => (
        <p key={huddle.id}>
          {huddle.name} at {huddle.description}
          {huddle.name}, description: {huddle.name},
          <span className="huddle-pill">{huddle.datetime}</span>
        </p>
      ))}
    </div>
  );
}
