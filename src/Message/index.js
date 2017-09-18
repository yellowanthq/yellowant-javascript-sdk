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

  addAttachment = (attachment) => {
    if (attachment instanceof MessageAttachment) {
      this.attachments.push(attachment);
    }
  }

  addLog = (log) => {
    if (log instanceof MessageLog) {
      this.logs.push(log);
    }
  }
  
  getPayload = () => ({
    attachments: this.attachments.map(attachment => this.prepareAttachmentPayload(attachment)),
    data: this.data,
    error: this.error,
    logs: this.logs,
    message_text: this.text
  })

  prepareAttachmentPayload = (attachment) => ({
    author_icon: attachment.authorIcon,
    author_link: attachment.authorLink,
    author_name: attachment.authorName,
    buttons: attachment.buttons.map(attachmentButton => this.prepareAttachmentButtonPayload(attachmentButton)),
    color: attachment.color,
    fields: attachment.fields.map(attachmentField => this.prepareAttachmentFieldPayload(attachmentField)),
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

  prepareAttachmentFieldPayload = (attachmentField) => ({
    short: attachmentField.short,
    title: attachmentField.title,
    value: attachmentField.value
  })

  prepareAttachmentButtonPayload = (attachmentButton) => ({
    command: attachmentButton.command,
    name: attachmentButton.name,
    text: attachmentButton.text,
    value: attachmentButton.value
  })
}
