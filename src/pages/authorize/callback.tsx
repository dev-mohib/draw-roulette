import React, { useEffect, useState } from 'react'


const Callback = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      // alert (hash);
      const access_token = hash.split("=")[1].split('&')[0]
      setToken(access_token)
      sendTokenToServer(access_token)
  } else {
      console.log("No hash found")
  }
  },[])
const sendTokenToServer = async(access_token : any) => {
  fetch(`http://localhost:8000?access_token=${access_token}`).then(res => res.text())
  .then(response => {
    window.location.href = "/";
  }).catch(error => {
    console.log({error});
  })
  }
  return (
    <div>
      <h1>
        <b>Please wait...</b>
      </h1>
      <p>Do not close this page</p>
    </div>
  )
}

export default Callback