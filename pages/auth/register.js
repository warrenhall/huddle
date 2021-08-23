import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import firebase from "../../firebase/clientApp";
import Header from "../../components/header/header";

export default function AuthRegister() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const authUser = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, userpassword)
      .then((userCredential) => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(function () {
            router.replace("/");
          })
          .catch(function (error) {
            // Error occurred. Inspect error.code.
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  return (
    <Fragment>
      <Header />
      <div className="container flex-center">
        <div className="row">
          <form onSubmit={(e) => authUser(e)}>
            <h4>Register for Huddle</h4>
            <fieldset>
              <label htmlFor="nameField">Email</label>
              <input
                type="text"
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <label htmlFor="nameField">Password</label>
              <input
                type="password"
                onChange={(e) => setUserPassword(e.target.value)}
              />

              <input
                className="button-primary"
                type="submit"
                value="Register"
              />
            </fieldset>
            <p>
              <Link href="/auth">
                <a> Login </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
