import { useState, useEffect, Fragment } from "react";
import firebase from "../firebase/clientApp";
import Header from '../components/header/header'
export default function Home() {
  return (
<Fragment>
      <Header/>
      <div className="container">
        <h2>Welcome to Huddle</h2>
        <p>
          Huddle is a tool for assisting RP Gamers by creating Huddles. What is a Huddle? <br/>
          A Huddle is a space where Players can RSVP with the GM ahead of time, for a more seamless gaming experience.
        </p>
      </div>
      </Fragment>
  );
}
