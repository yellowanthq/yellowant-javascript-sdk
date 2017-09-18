/**
 * A module with the main YellowAnt client class {@link module:index~YellowAnt}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

export default class YellowAnt {
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
}
