/**
 * A module with the YellowAnt message attachment field 
 * class {@link module:MessageAttachmentField~MessageAttachmentField}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

export default class MessageAttachmentField {
  /**
   * YellowAnt Message Attachment Field
   * @public
   * 
   * @param {Object} attachmentField Init values to pass to the message attachment field
   * @param {string} attachmentField.short UI size of the attachment field. 0 or 1
   * @param {string} attachmentField.title Title text
   * @param {string} attachmentField.value Value text
   */
  constructor({
    short = 1,
    title,
    value
  }) {
    this.short = short;
    this.title = title;
    this.value = value;
  }
}
