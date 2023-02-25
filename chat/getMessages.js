import { detectUrlAndImage } from "./regex.js";
import { baseUrl } from "./constants.js";

const createSingleMessage = (user, text, created_on) => {
  // TODO add messageContainerStyle
  const messageContainer = document.createElement("li");
  messageContainer.setAttribute("name", user);
  messageContainer.style.cssText = `   
      background-color: #16122b;
      transition: box-shadow .3s;  
      border: 1px solid #3a3172;
      margin-bottom: 10px;
      margin-top: 10px;
      padding: 20px 20px 10px 20px;
      //clip-path: polygon(99% 100%, 100% 90%, 100% 0, 1% 0, 0 10%, 0 100%);
      width: fit-content;
      max-width: 70%;
  `;
  // messageContainer.style.alignSelf = "flex-start";

  // TODO add userContainerStyle
  const userContainer = document.createElement("span");
  userContainer.style.cssText = `  
      font-size: 16px;
      font-family: 'Bebas Neue', cursive;
      opacity: 0.8;
  `;

  // TODO add textContainerStyle
  const textContainer = document.createElement("p");
  textContainer.style.cssText = `
      font-size: 15px;
      line-height: 1.6;
      opacity: 0.9;
      font-family: 'Inconsolata', monospace;
      color: f3f3f4;
  `;

  // TODO add dateContainerStyle
  const dateContainer = document.createElement("div");
  dateContainer.style.cssText = `    
      font-size: 14px;  
      text-align: right;
      font-family: 'Bebas Neue', cursive;
      opacity: 0.5;
  `;

  userContainer.append(user);
  const formattedText = detectUrlAndImage(text.replace(/\n/g, " <br> "));
  //textContainer.innerHTML = text.replace(/\n/g, "<br>");
  formattedText.forEach((element) => {
    textContainer.append(element);
  });
  dateContainer.append(created_on);

  messageContainer.append(userContainer);
  messageContainer.append(textContainer);
  messageContainer.append(dateContainer);
  return messageContainer;
};

const getMessages = async (messagesContainer) => {
  const messagesResponseLength = messagesContainer.children.length;
  const response = await fetch(baseUrl + "/messages");
  const messages = await response.json();

  const newMessagesList = messages.slice(messagesResponseLength);

  newMessagesList.forEach((message) => {
    const newMessage = createSingleMessage(
      message.user,
      message.text,
      message.created_on
    );
    messagesContainer.append(newMessage);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  return messagesContainer;
};

const refreshMessages = async (messagesContainer) => {
  const messagesResponseLength = messagesContainer.children.length;
  const response = await fetch(baseUrl + "/messages");
  const messages = await response.json();

  const newMessagesList = messages.slice(messagesResponseLength);

  newMessagesList.forEach((message) => {
    const newMessage = createSingleMessage(
      message.user,
      message.text,
      message.created_on
    );
    messagesContainer.append(newMessage);
  });
  return messagesContainer;
};

export { getMessages, refreshMessages };
