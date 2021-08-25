import { useState, useEffect, Fragment } from "react";
import firebase from "../firebase/firebase";
import Header from "../components/header/header";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user.email);
    }
  });

  return (
    <Fragment>
      <Header />
      <div className="container">
        <h2>Welcome to Huddle {currentUser ? ` - ${currentUser}` : null}</h2>
        <p>
          Huddle is a tool for assisting RP Gamers by creating Huddles. What is
          a Huddle? <br />A Huddle is a space where Players can RSVP with the GM
          ahead of time, for a more seamless gaming experience.
        </p>
      </div>
    </Fragment>
  );
}
