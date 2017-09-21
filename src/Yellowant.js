/**
 * A module with the main YellowAnt client class {@link module:Yellowant~Yellowant}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */
const {
  fetch
} = require("fetch-ponyfill")();

const URLSearchParams = URLSearchParams || require("url").URLSearchParams; // eslint-disable-line no-use-before-define global-require


export default class Yellowant {
  /**
   * YellowAnt SDK client
   * @public
   * 
   * @param {Object} options Options to pass to the client
   * @param {string} options.accessToken YellowAnt access token
   * @param {string} options.apiUrl Default - YellowAnt API endpoint.
   * @param {string} options.appKey YellowAnt client ID
   * @param {string} options.appSecret YellowAnt client secret
   * @param {Object} options.clientArgs Client arguments to be used for request headers
   * @param {number} options.oauthVersion Version of YellowAnt OAuth to use
   * @param {string} options.redirectUri YellowAnt redirect URI
   * @param {string} options.tokenType Token type for oauth
   */
  constructor({
    accessToken,
    apiUrl = "https://api.yellowant.com/api/",
    appKey,
    appSecret,
    redirectUri
  }) {
    this.accessToken = accessToken;
    this.apiUrl = apiUrl;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.redirectUri = redirectUri;
  }

  _get = (endpoint, data = {}) => {
    const options = {
      method: "get",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    };

    return fetch(`${this.apiUrl}${endpoint}`, options).then(response => response.json());
  }

  _post = (endpoint, data = {}, contentType = "application/x-www-form-urlencoded") => {
    const bodyData = new URLSearchParams();
    Object.keys(data).forEach(key => bodyData.set(key, data[key]));
    bodyData.set("access_token", this.accessToken);
    const options = {
      method: "post",
      body: bodyData.toString(),
      headers: { "Content-Type": contentType }
    };

    return fetch(`${this.apiUrl}${endpoint}`, options).then(response => response.json());
  }

  getUserProfile = () => this._get("user/profile/")

  createUserIntegration = () => this._post("user/integration/")

  getAccessToken = (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: this.appKey,
      client_secret: this.appSecret,
      code,
      redirect_uri: this.redirectUri
    };

    this._post("oauth2/token/", data)
      .then(response => {
        this.accessToken = response.access_token;
      });
  }
}

