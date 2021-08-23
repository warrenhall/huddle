import { useState } from "react";

export default function Home() {
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const stats = ["STR", "DEX", "INT", "CON", "APP", "POW", "SIZ", "EDU"];
  const pointsMax = 460;
  const setPointsHandler = (e, index) => {
    let newPoints = [...points];
    newPoints[index] = e.target.value;
    setPoints(newPoints);
  };
  const pointsTotal = points.reduce(
    (total, amount) => parseInt(total) + parseInt(amount)
  );

  return (
    <div className="container">
      <div className="row">
        {stats.map((stat, index) => (
          <div className="stat-block" key={index}>
            <p>
              {stat}
              <br />
              <input
                type="text"
                value={points[index]}
                onChange={(e) => setPointsHandler(e, index)}
              />
            </p>
          </div>
        ))}
      </div>
      <h1>
      {pointsTotal<=pointsMax?(<span className="total">{pointsTotal}</span>):(<span className="total red">{pointsTotal}</span>)}
      /
      {pointsMax}
      </h1>




    </div>
  );
}
