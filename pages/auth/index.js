import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "../../firebase/clientApp";
import Header from "../../components/header/header";

export default function AuthHome() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const registerUser = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };

  return (
    <Fragment>
      <Header/>
    <div className="container flex-center">
      <div className="row">
        <form onSubmit={(e) => registerUser(e)}>
          <h4>Login to Huddle</h4>
          <fieldset>
            <label htmlFor="nameField">Email</label>
            <input type="text" onChange={(e) => setUserEmail(e.target.value)} />

            <label htmlFor="nameField">Password</label>
            <input
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <input className="button-primary" type="submit" value="Login" />
          </fieldset>
          <p>
            <Link href="/auth/register">
              <a> Register Here </a>
            </Link>
          </p>
        </form>
      </div>
    </div>
    </Fragment>
  );
}
