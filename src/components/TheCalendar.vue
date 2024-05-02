<template>
  <div @click="handleAuthClick">Click here</div>
</template>

<script setup>
import { onMounted } from 'vue';

const CLIENT_ID = '309001192493-sf3prlfgmrj6tn37go04cjv1pldbqujb.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDtIpTa84gVdMUwfufVdlV7taCc3DOlSro';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
  window.gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await window.gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

function gisLoaded() {
  console.log('gisLoaded')
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '',
  });
  gisInited = true;
  maybeEnableButtons();
}

function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    console.log('GAPI initialised')
  }
}

function handleAuthClick() {
  if (gapiInited && gisInited) {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      await listUpcomingEvents();
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }
}

function handleSignoutClick() {
  const token = window.gapi.client.getToken();
  if (token !== null) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken('');
  }
}

async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await window.gapi.client.calendar.events.list(request);
  } catch (err) {
    console.log('GAPI error:' + err.message)
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    console.log('GAPI: No events found.')
    return;
  }
  const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
  console.log('GAPI: ' + output)
}

onMounted(()=>{
  let gapiScript = document.createElement('script')
  gapiScript.defer = true
  gapiScript.async = true
  gapiScript.onreadystatechange = gapiScript.onload = function () {
    const interval = setInterval(function () {
      if (!gapiScript.readyState || /loaded|complete/.test(gapiScript.readyState)) {
        clearInterval(interval)
        if (window.gapi) {
          gapiLoaded()
        } else {
          console.log('Failed to load gapi')
        }
      }
    }, 100)
  }
  gapiScript.src = 'https://apis.google.com/js/api.js'
  document.head.appendChild(gapiScript)

  let gisScript = document.createElement('script')
  gisScript.defer = true
  gisScript.async = true
  gisScript.onreadystatechange = gisScript.onload = function () {
    const interval = setInterval(function () {
      if (!gisScript.readyState || /loaded|complete/.test(gisScript.readyState)) {
        clearInterval(interval)
        if (window.google && window.google.accounts) {
          gisLoaded()
        } else {
          console.log('Failed to load gis')
        }
      }
    }, 100)
  }
  gisScript.src = 'https://accounts.google.com/gsi/client'
  document.head.appendChild(gisScript)
})

</script>

<style></style>