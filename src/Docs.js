import React from "react";

var CLIENT_ID =
  "929967817437-2je3vfkt1hs4kfraqn6fgsvpa1ehvsbd.apps.googleusercontent.com";
var API_KEY = "AIzaSyCoQoOqB9hh3tkxf-u-BE15qPJwxObEJ4k";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  "https://docs.googleapis.com/$discovery/rest?version=v1&key=AIzaSyCoQoOqB9hh3tkxf-u-BE15qPJwxObEJ4k"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/documents.readonly";

// var authorizeButton = document.getElementById("authorize_button");
// var signoutButton = document.getElementById("signout_button");

/**
 *  On load, called to load the auth2 library and API client library.
 */
let gapi;
function handleClientLoad() {
  gapi = window.gapi;
  console.log("gapi", gapi);
  gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(function() {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      // authorizeButton.onclick = handleAuthClick;
      // signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  var authorizeButton = document.getElementById("authorize_button");
  var signoutButton = document.getElementById("signout_button");

  if (isSignedIn) {
    authorizeButton.style.display = "none";
    signoutButton.style.display = "block";
    printDocTitle();
  } else {
    authorizeButton.style.display = "block";
    signoutButton.style.display = "none";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById("content");
  var textContent = document.createTextNode(message + "\n");
  pre.appendChild(textContent);
}

/**
 * Prints the title of a sample doc:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 */
function printDocTitle() {
  gapi.client.docs.documents
    .get({
      documentId: "195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE"
    })
    .then(
      function(response) {
        var doc = response.result;
        var title = doc.title;
        appendPre('Document "' + title + '" successfully found.\n');
      },
      function(response) {
        appendPre("Error: " + response.result.error.message);
      }
    );
}
const Docs = () => {
  return (
    <React.Fragment>
      <button
        id="load_button"
        onClick={handleClientLoad}
        style={{ display: "block" }}
      >
        Load
      </button>

      <button
        id="authorize_button"
        onClick={handleAuthClick}
        style={{ display: "none" }}
      >
        Authorize
      </button>
      <button
        id="signout_button"
        onClick={handleSignoutClick}
        style={{ display: "none" }}
      >
        Sign Out
      </button>
      <pre id="content" />
    </React.Fragment>
  );
};

export default Docs;
