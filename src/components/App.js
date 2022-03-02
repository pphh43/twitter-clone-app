import React, {useEffect, useState} from "react";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { authService } from "fbase";
import AppRouter from "components/Router"

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      //console.log(user)
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true) // init === ture ? router hide
    })
  },[])

  return ( 
    <>
      <header></header>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer> &copy; twitter { new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
