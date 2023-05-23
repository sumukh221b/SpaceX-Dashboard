import React, { useState, useEffect } from "react";
import './App.css'
import LaunchTable from "./components/launchTable";

const App = (props) => {
  // const [userLoggedIn, setUserLoggedIn] = useState(false)

  // const handleAuth = () => {
  //   setUserLoggedIn(!userLoggedIn)
  // }

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     handleAuth()
  //   }
  // }, [])

  return (
    <div className="container">
      <div className="d-flex justify-content-center" >
        <div style={{ backgroundImage: `url('data:image/png;base64,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')`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '20vh', width: '25vw' }}> </div>
      </div>
      <div className="mt-3">
        <LaunchTable />
      </div>
    </div>
  )
}

export default App