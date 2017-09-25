## YellowAnt Javascript SDK

YellowAnt SDK for building an application for the YellowAnt ecosystem on a javascript platform

## Getting Started

These instructions will help you getting started with the SDK in a Node environment

### Prerequisites

```
Node ">=4.2.0"
```
IMPORTANT: This SDK has currently been tested for use as a client on a node server, but it might work out of the box as a browser based client.

### Installation

NOTE: This project comes with prebuilt with the following module formats:

* UMD - /dist/
* CommonJS - /lib/
* ES import - /es/

You can start using the code from the above folders, according to your development enviroment, right away.

In case you wish to develop on the code, simply run:

```
yarn install # install dependencies for the project
```

The following command watches and builds files on the fly:

```
yarn run build:commonjs:watch # build:umd:watch or build:es:watch
```

## Simple Example

```
// import all SDK exports
var sdk = require("yellowant-sdk");

// SDK client class for interacting with the YellowAnt API
var Yellowant = sdk.Yellowant;

// Class to build a chat message for the user
var Message = sdk.Message;

var client = new Yellowant({
  appKey: "APP-CLIENT-ID" // App client ID from the YellowAnt Developer Console
  appSecret: "APP-CLIENT-SECRET" // App client secret from the YellowAnt Developer Console
  redirectUri: "APP-REDIRECT-URI" // App redirect URI set in the app settings page in the YellowAnt Developer Console
  apiUrl: "APP-API-URL" // App API endpoint set in the app settings page in the YellowAnt Developer Console
});

/**
Generate a random string (STATE) to manage oauth code response for a user. Save this STATE along with any other essential user info in a database to follow up with a redirect response from Yellowant.

Get OAuth code for a YellowAnt user by directing the user to the following URL:
https://USER-TEAM-SUBDOMAIN.yellowant.com/api/oauth2/authorize/?state=STATE&client_id=APP-CLIENT-ID&response_type=code&redirect_url=APP-REDIRECT-URI

The YellowAnt server will return a generated OAuth code along with the STATE you provided to the APP-REDIRECT-URI on your app server.

Retrieve user info from the database based on the STATE value, and generate an OAuth access token for the user with the help of this code
*/

// code value from the HTTP request on APP-REDIRECT-URI. This variable assignment might be different based on what node middleware you might be using
var code = req.param("code");

// Generate an access token for the user from the OAuth code
client.getAccessToken(code); // This access token value is saved inside the client instance automatically

// Connect the user's app account with an integration on the YellowAnt platform
var userIntegration;
client.createUserIntegration().then(function(data) {
  userIntegration = data; // Also save this info in a database
});

// Construct a simple chat message to be sent to the user
var message = new Message("Hey, this is a simple text message from my app");

// Send this message to the user through the API
client.sendMessage(userIntegration.user_application, message.toJSON());
```

## License

GPL-3.0+