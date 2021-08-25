import { useState } from "react";
import Link from "next/link";
import firebase from "../../firebase/firebase";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user.email);
    }
  });

  return (
    <header id="header">
      <span className="nav-heading nav-brand">
        <Link href="/">Huddle</Link>{" "}
      </span>
      <input type="checkbox" className="menu-toggle" id="menu-toggle" />
      <nav className="header">
        <ul>
          {currentUser ? null : (
            <li>
              <Link href="/auth">
                <a> Login </a>
              </Link>
            </li>
          )}
          {currentUser ? null : (
            <li>
              <Link href="/auth/register">
                <a> Register </a>
              </Link>
            </li>
          )}
          <li className="nav-header">
            <Link href="/huddles">
              <a> Huddles </a>
            </Link>
          </li>
          <li>
            <Link href="/huddles/create">
              <a> Create Huddle </a>
            </Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="menu-toggle" className="menu-nav-toggle">
        <span> </span>
      </label>
    </header>
  );
};
export default Header;
