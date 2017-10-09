/**
 * A module with the main YellowAnt client class {@link module:Yellowant~Yellowant}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */
const {
  fetch
} = require("fetch-ponyfill")();

const querystring = require("querystring");

//const URLSearchParams = URLSearchParams || require("url").URLSearchParams; // eslint-disable-line no-use-before-define global-require


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

  /**
   * GET call wrapper
   * @private
   * 
   * @param {string} endpoint The API url suffix
   * @param {Object} data Any data to be sent in the body of the request
   * 
   * @return {Promise} Return a fetch promise
   */
  _get = (endpoint, data = {}) => {
    const options = {
      method: "get",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    };

    return fetch(`${this.apiUrl}${endpoint}`, options).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  }

  /**
   * POST call wrapper
   * @private
   * 
   * @param {string} endpoint The API url suffix
   * @param {Object} payload Any data to be sent in the body of the request
   * @param {string} contentType The content type for the request
   * 
   * @return {Promise} Return a fetch promise
   */
  _post = (endpoint, payload = {}, contentType = "application/json") => {
    let body;
    const headers = { "Content-Type": contentType };
    if (contentType === "application/x-www-form-urlencoded") {      
      body = querystring.stringify({
        ...payload,
        access_token: this.accessToken
      });
    } else {
      body = JSON.stringify(payload);
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const options = {
      method: "post",
      body,
      headers
    };

    return fetch(`${this.apiUrl}${endpoint}`, options).then(response => {
      if (!response.ok) throw response;
      return response.json();
    });
  }

  /**
   * Get the user access token to perform operations on behalf of the YellowAnt user
   * @public
   * 
   * @param {string} code Code from the OAuth authentication flow of YellowAnt
   * 
   * @return {Promise} Response containing the access token data
   */
  getAccessToken = (code) => {
    const data = {
      grant_type: "authorization_code",
      client_id: this.appKey,
      client_secret: this.appSecret,
      code,
      redirect_uri: this.redirectUri
    };

    return this._post("oauth2/token/", data, "application/x-www-form-urlencoded")
      .then(response => {
        this.accessToken = response.access_token;
        return response;
      });
  }

  /**
   * Get the user profile for the access token
   * @public
   * 
   * @return {Promise} Response containing the user profile data
   */
  getUserProfile = () => this._get("user/profile/")

  /**
   * Create a new integration with the user access token
   * @public
   * 
   * @return {Promise} Response containing the new created user integration data
   */
  createUserIntegration = () => this._post("user/integration/", {}, "application/x-www-form-urlencoded")

  /**
   * Send a message for a user to all chat interface through YellowAnt
   * @public
   * 
   * @param {number} yellowantIntegrationId The YellowAnt user integration ID
   * @param {Object} message An object built from the toJSON() method of a Message class instance
   * 
   * @return {Promise} Response containing the successfully created message through YellowAnt
   */
  sendMessage = (yellowantIntegrationId, message) =>
    this._post("user/message/", {
      ...message,
      requester_application: yellowantIntegrationId
    })
  
  /**
   * Send data and any optional message for a crumb workflow to YellowAnt
   * @public
   * 
   * @param {number} yellowantIntegrationId The YellowAnt user integration ID
   * @param {}
   * @param {Object} message An object built from the toJSON() method of a Message class instance
   * 
   * @return {Promise} Response from the YellowAnt server
   */
  sendWebhookMessage = (yellowantIntegrationId, webhookSubscriptionId, message) =>
    this._post(`user/application/webhook/${webhookSubscriptionId}/`, {
      ...message,
      webhook_id: webhookSubscriptionId,
      requester_application: yellowantIntegrationId
    })
}
