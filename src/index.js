/**
 * A module which exports all publicly available classes {@link module:Yellowant~Yellowant}
 * @module
 * @author Manik Singh <maniksingh92@gmail.com>
 */

import Yellowant from "./Yellowant";
import Message from "./Message";
import MessageAttachment from "./Message/MessageAttachment";
import MessageAttachmentButton from "./Message/MessageAttachmentButton";
import MessageAttachmentField from "./Message/MessageAttachmentField";

export default {
  Yellowant, // Base SDK for interacting with the YellowAnt API
  Message, // Message building class
  MessageAttachment, // Attachment for a Message class object, addAttachment()
  MessageAttachmentButton, // Buttons for a MessageAttachment class object, addButton()
  MessageAttachmentField, // Data field for a MessageAttachment class object, addField()
};
