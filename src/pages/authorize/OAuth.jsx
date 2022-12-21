import React from 'react'

const BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const CLIENT_ID = '10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAY08H_Nx0ENqjyZ2tt0qdtwtHQ4BClPmg';
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
const REDIRECT_URI = "http://localhost:5173/callback"
const RESPONSE_TYPE = "response_type=token"


const OAuth = () => {
    const handleAuthorize = () => {
        const url = `${BASE_URL}?scope=${SCOPES}&include_granted_scopes=true&${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`
        console.log(url)
    }
  return (
    <div>
        <button onClick={handleAuthorize}>Authorize</button>
    </div>
  )
}

export default OAuth