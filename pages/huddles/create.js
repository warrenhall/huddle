import { useRouter } from "next/router";
import { Fragment } from "react";
import Header from "../../components/header/header";

const apiUrl =
  "https://huddle-b2842-default-rtdb.europe-west1.firebasedatabase.app/huddles.json";

const toIsoString = (date) => {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? "0" : "") + norm;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(tzo / 60) +
    ":" +
    pad(tzo % 60)
  );
};

export default function CreateHuddle() {
  const router = useRouter();

  const createHuddle = async (event) => {
    event.preventDefault();

    let huddleDateTime = new Date(event.target.datetime.value);
    huddleDateTime = toIsoString(huddleDateTime);

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        name: event.target.name.value,
        description: event.target.description.value,
        datetime: huddleDateTime,
        duration: event.target.duration.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(
      setTimeout(() => {
        router.replace("/huddles");
      }, 1000)
    );
  };

  return (
    <Fragment>
      <Header />
      <div className="container">
        <form onSubmit={createHuddle}>
          <fieldset>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" type="text" required></textarea>
            <label htmlFor="date">Date and Time</label>
            <input id="datetime" name="datetime" type="datetime-local" required />
            <label htmlFor="duration">Duration <i>(Hours)</i></label>
            <input id="duration" name="duration" type="number" required />
            <button type="submit">Create Huddle</button>
          </fieldset>
        </form>
      </div>
    </Fragment>
  );
}
