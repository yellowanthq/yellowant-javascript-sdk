/**
 * A module with the YellowAnt message log class {@link module:MessageLog~MessageLog}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

export default class MessageLog {
  /**
   * YellowAnt Message Log
   * @public
   * 
   * @param {Object} messageLog Init values to pass to the message log
   * @param {string} messageLog.name Name for the log
   * @param {string} messageLog.tag log tag
   * @param {string} messageLog.text log text
   */
  constructor({
    name,
    tag,
    text
  }) {
    this.name = name;
    this.tag = tag;
    this.text = text;
  }
}
