import React, { useEffect, useState } from 'react'
import { gapi, loadAuth2, loadAuth2WithProps, loadClientAuth2  } from 'gapi-script'
const CLIENT_ID = '10431894352-fabqe9s4hirpe4hiou6464gt646mnf27.apps.googleusercontent.com';
const API_KEY = 'AIzaSyAY08H_Nx0ENqjyZ2tt0qdtwtHQ4BClPmg';
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
let tokenClient;
      let gapiInited = false;
      let gisInited = false;
const Index = () => { 

  useEffect(() => {
    getGapi()
  },[])

  const getGapi =async () => {
    let auth2 = await loadAuth2(gapi, CLIENT_ID, SCOPES);
  }
  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
  }

  /**
   * Callback after Google Identity Services are loaded.
   */
  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
  }



  /**
   * Enables user interaction after all libraries are loaded.
   */
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      document.getElementById('signout_button').style.visibility = 'visible';
      document.getElementById('authorize_button').innerText = 'Refresh';
      await listFiles();
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({prompt: ''});
    }
  }
  return (
    <div>
      <button onClick={() => handleAuthClick()}>Open Picker</button>
    </div>
  )
}

export default Index