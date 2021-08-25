import React from "react";
import Link from "next/link";

const HuddleCard = (props) => {
  return (
    <div className="card" key={props.huddle.id}>
      <h4>{props.huddle.name}</h4>
      <em>{props.huddle.description}</em>
      <span className="props.huddle-pill">
        {props.huddle.date} - {props.huddle.time}
      </span>
      <br />
      <br />
      <Link href="/props.huddles/rsvp/1">
        <a className="button">RSVP</a>
      </Link>
    </div>
  );
};

export default HuddleCard;
