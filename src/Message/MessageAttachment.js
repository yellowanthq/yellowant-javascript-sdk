/**
 * A module with the YellowAnt message attachment class {@link module:MessageAttachment~MessageAttachment}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

import MessageAttachmentField from "./MessageAttachmentField";
import MessageAttachmentButton from "./MessageAttachmentButton";


export default class MessageAttachment {
  /**
   * YellowAnt Message Attachment
   * @public
   * 
   * @param {Object} attachment Init values to pass to the message attachment
   * @param {string} attachment.authorIcon Author thumbnail URL
   * @param {string} attachment.authorLink Author web link
   * @param {string} attachment.authorName Author name text
   * @param {string} attachment.color Attachment left side vertical highlight color
   * @param {string} attachment.footer Footer text
   * @param {string} attachment.footerIcon Footer thumbnail URL
   * @param {string} attachment.imageUrl Image URL
   * @param {string} attachment.pretext Text before the attachment
   * @param {number} attachment.status ---
   * @param {string} attachment.text Main text
   * @param {string} attachment.thumbUrl Thumbnail URL
   * @param {string} attachment.title Title text
   * @param {string} attachment.titleLink Title web link
   * @param {number} attachment.ts Timestamp
   */
  constructor({
    authorIcon,
    authorLink,
    authorName,
    color,
    footer,
    footerIcon,
    imageUrl,
    pretext,
    status = 0,
    text,
    thumbUrl,
    title,
    titleLink,
    ts = 0
  }) {
    this.authorIcon = authorIcon;
    this.authorLink = authorLink;
    this.authorName = authorName;
    this.buttons = [];
    this.color = color;
    this.fields = [];
    this.footer = footer;
    this.footerIcon = footerIcon;
    this.imageUrl = imageUrl;
    this.pretext = pretext;
    this.status = status;
    this.text = text;
    this.thumbUrl = thumbUrl;
    this.title = title;
    this.titleLink = titleLink;
    this.ts = ts;
  }

  addField = (attachmentField) => {
    if (attachmentField instanceof MessageAttachmentField) {
      this.fields.push(attachmentField);
    }
  }

  addButton = (attachmentButton) => {
    if (attachmentButton instanceof MessageAttachmentButton) {
      this.buttons.push(attachmentButton);
    }
  }
}
