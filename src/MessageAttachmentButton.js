/**
 * A module with the YellowAnt message attachment button 
 * class {@link module:MessageAttachmentButton~MessageAttachmentButton}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

export default class MessageAttachmentButton {
  /**
   * Command info for Message attachment button
   * 
   * @name Command
   * 
   * @typedef {Object} MessageAttachmentButton.Command
   * @property {number} called_function The YellowAnt function ID to be called on click
   * @property {number} service_application The user integration ID associated with this button
   * @property {Object} data Arguments and values pairs to be passed to the called_function  
   */

  /**
   * YellowAnt Message Attachment Button
   * @public
   * 
   * @param {Object} attachmentButton Init values to pass to the message attachment button
   * @param {MessageAttachmentButton.Command} attachmentButton.command The command to be called on click
   * @param {string} attachmentButton.name Name text
   * @param {string} attachmentButton.text Button text
   * @param {string} attachmentButton.value Value text
   */
  constructor({
    command,
    name,
    text,
    value
  }) {
    this.command = command;
    this.name = name;
    this.text = text;
    this.value = value;
  }
}
