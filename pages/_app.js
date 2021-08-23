import React, { useEffect } from "react";
import firebase from "firebase/app";

import "../styles/globals.css";
import "../styles/milligram.css";
import "../styles/huddles.css";

function MyApp({ Component, pageProps }) {
  const FirebaseAuthContext = React.createContext(undefined);
  const [user, setUser] = React.useState(null);
  const value = { user };

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
  //   return unsubscribe;
  // }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      <Component {...pageProps} />
    </FirebaseAuthContext.Provider>
  );
}

export default MyApp;
