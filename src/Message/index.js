/**
 * A module with the YellowAnt message builder class {@link module:Message~Message}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

import MessageAttachment from "./MessageAttachment";
import MessageLog from "./MessageLog";


export default class Message {
  /**
   * YellowAnt Message
   * 
   * This class allows you to construct a message for a user with the message
   * text and any attachments along with it.
   * @param {string} text Text to be displayed in message
   */
  constructor(text = "") {
    this.attachments = [];
    this.data = {};
    this.error = {};
    this.logs = [];
    this.text = text;
  }

  /**
   * Add an attachment to a YellowAnt message
   * @public
   * 
   * @param {MessageAttachment} attachment A MessageAttachment instance
   */
  addAttachment = (attachment) => {
    if (attachment instanceof MessageAttachment) {
      this.attachments.push(attachment);
    }
  }

  /**
   * Add a log to a YellowAnt message
   * @public
   * 
   * @param {MessageLog} log A MessageLog instance
   */
  addLog = (log) => {
    if (log instanceof MessageLog) {
      this.logs.push(log);
    }
  }
  
  /**
   * Convert the message to a format recognized by YellowAnt.
   * 
   * Use this method before sending the data to YellowAnt
   * @public
   * 
   * @return {Object} A message object fit for being sent to YellowAnt through
   * sendMessage() or sendWebhookMessage() from the main SDK class
   */
  toJSON = () => ({
    attachments: this.attachments.map(attachment => this.prepareAttachmentJSON(attachment)),
    data: this.data,
    error: this.error,
    logs: this.logs,
    message_text: this.text
  })

  /**
   * Prepare the message attachment for converting to readable JSON
   * @private
   * 
   * @return {Object} An attachment data in JSON object
   */
  prepareAttachmentJSON = (attachment) => ({
    author_icon: attachment.authorIcon,
    author_link: attachment.authorLink,
    author_name: attachment.authorName,
    buttons: attachment.buttons.map(attachmentButton => this.prepareAttachmentButtonJSON(attachmentButton)),
    color: attachment.color,
    fields: attachment.fields.map(attachmentField => this.prepareAttachmentFieldJSON(attachmentField)),
    footer: attachment.footer,
    footer_icon: attachment.footerIcon,
    image_url: attachment.imageUrl,
    pretext: attachment.pretext,
    status: attachment.status,
    text: attachment.text,
    thumb_url: attachment.thumbUrl,
    title: attachment.title,
    title_link: attachment.titleLink,
    ts: attachment.ts
  })

  /**
   * Prepare the message attachment field for converting to readable JSON
   * @private
   * 
   * @return {Object} An attachment field data in JSON object
   */
  prepareAttachmentFieldJSON = (attachmentField) => ({
    short: attachmentField.short,
    title: attachmentField.title,
    value: attachmentField.value
  })

  /**
   * Prepare the message attachment button for converting to readable JSON
   * @private
   * 
   * @return {Object} An attachment button data in JSON object
   */
  prepareAttachmentButtonJSON = (attachmentButton) => ({
    command: attachmentButton.command,
    name: attachmentButton.name,
    text: attachmentButton.text,
    value: attachmentButton.value
  })
}
